import { test } from 'node:test'
import assert from 'node:assert/strict'
import module, { createRequire } from 'node:module'
import vm from 'node:vm'
import { SANDBOX_GLOBALS } from '../app/utils/playground-runner.ts'

// Уроки лежат в app/data/lessons/*.ts, в course.ts импорты без расширения: дописываем .ts.
// Типы Node стирает сам.
module.registerHooks({
  resolve: (specifier, context, next) =>
    next(/^\.\.?\//.test(specifier) && !/\.\w+$/.test(specifier) ? `${specifier}.ts` : specifier, context),
})
const { lessons } = await import('../app/data/course.ts')

// Библиотеки песочницы берём из node_modules проекта, как их берёт CoursePlayground.client.vue
const require = createRequire(import.meta.url)
const R = require('ramda')
const sanctuary = require('sanctuary')
const S = sanctuary.create({ checkTypes: false, env: sanctuary.env })

const VARIANTS = ['ru', 'en']
const CYRILLIC = /[А-Яа-яЁё]/
const SLUGS = [
  'for-whom',
  'not-for-whom',
  'imperative-vs-declarative',
  'functional-programming',
  'pure-functions',
  'hindley-milner-type-notation',
  'category-theory',
  'fantasy-land',
  'composition',
  'currying',
  'currying-and-asynchrony',
  'partial-application',
  'recursion',
  'performance',
  'neural-networks',
  'function-map-filter-reduce',
  'first-class-and-higher-order-functions',
  'lenses',
  'side-effects-in-composition-functions',
  'selecting-library',
]
// утверждённый список блоков-иллюстраций: slug -> сколько блоков помечено pseudo
const PSEUDO = { 'fantasy-land': 1, 'category-theory': 1, recursion: 1, 'neural-networks': 1 }

// ---------- токенизатор: комментарии и строки отдельно от кода ----------

// Возвращает код без комментариев и с пустыми строками ('' вместо содержимого,
// текстовые части шаблонов пусты, выражения ${...} остаются кодом) и список комментариев.
const scan = (src) => {
  let i = 0
  let code = ''
  const comments = []

  const skipString = (quote) => {
    i++
    while (i < src.length && src[i] !== quote && src[i] !== '\n') i += src[i] === '\\' ? 2 : 1
    i++
  }
  const skipRegex = () => {
    i++
    let inClass = false
    while (i < src.length && src[i] !== '\n') {
      if (src[i] === '\\') {
        i += 2
        continue
      }
      if (src[i] === '[') inClass = true
      else if (src[i] === ']') inClass = false
      else if (src[i] === '/' && !inClass) break
      i++
    }
    i++
  }
  const template = () => {
    code += '`'
    i++
    while (i < src.length && src[i] !== '`') {
      if (src[i] === '\\') i += 2
      else if (src[i] === '$' && src[i + 1] === '{') {
        i += 2
        code += '${'
        readCode(true)
        code += '}'
      } else i++
    }
    i++
    code += '`'
  }
  const readCode = (inExpression) => {
    let depth = 0
    while (i < src.length) {
      const ch = src[i]
      if (ch === '/' && src[i + 1] === '/') {
        const end = src.indexOf('\n', i)
        const stop = end < 0 ? src.length : end
        comments.push(src.slice(i + 2, stop))
        i = stop
      } else if (ch === '/' && src[i + 1] === '*') {
        const end = src.indexOf('*/', i + 2)
        comments.push(src.slice(i + 2, end < 0 ? src.length : end))
        i = end < 0 ? src.length : end + 2
      } else if (ch === "'" || ch === '"') {
        skipString(ch)
        code += ch + ch
      } else if (ch === '`') {
        template()
      } else if (ch === '/' && /(?:^|[(,=:[!&|?{};])$/.test(code.trimEnd().slice(-1))) {
        // деление или regex: после значащего символа-оператора это литерал
        skipRegex()
        code += '/re/'
      } else if (ch === '}' && inExpression && depth === 0) {
        i++
        return
      } else {
        if (ch === '{') depth++
        if (ch === '}') depth--
        code += ch
        i++
      }
    }
  }
  readCode(false)
  return { code, comments }
}

const strip = (src) => scan(src).code.replace(/\s+/g, '')

// ---------- помощники по данным курса ----------

const codeBlocks = lessons.flatMap((lesson) =>
  lesson.blocks.flatMap((block, i) => (block.type === 'code' ? [{ lesson, block, i, id: `${lesson.slug}#${i}` }] : [])),
)

// Блок урока, в ru-варианте которого есть needle; совпадение должно быть одно.
// По индексу не ищем: при разделении блоков индексы сдвигаются.
const findBlock = (slug, needle) => {
  const lesson = lessons.find((l) => l.slug === slug)
  assert.ok(lesson, `в курсе нет урока ${slug}`)
  const found = lesson.blocks.filter((b) => b.type === 'code' && !b.pseudo && b.code.ru.includes(needle))
  assert.equal(found.length, 1, `в уроке ${slug} должен быть ровно один исполняемый блок с «${needle}», найдено ${found.length}`)
  return found[0]
}

// Все места с авторским текстом: заголовки, абзацы и комментарии в коде обоих языков.
const prose = () =>
  lessons.flatMap((lesson) => [
    ...VARIANTS.map((v) => ({ where: `${lesson.slug} заголовок ${v}`, text: lesson.title[v] })),
    ...lesson.blocks.flatMap((block, i) =>
      block.type === 'text'
        ? VARIANTS.map((v) => ({ where: `${lesson.slug}#${i} текст ${v}`, text: block[v] }))
        : VARIANTS.flatMap((v) =>
            scan(block.code[v]).comments.map((text) => ({ where: `${lesson.slug}#${i} комментарий ${v}`, text })),
          ),
    ),
  ])

const unpairedClose = (text) => {
  let depth = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '(') depth++
    else if (text[i] === ')' && depth-- === 0) return i
  }
  return -1
}

const around = (text, at) => JSON.stringify(text.slice(Math.max(0, at - 25), at + 10))

// ---------- якоря уроков ----------

test('уроки курса: все прежние slug-якоря на месте и не повторяются', () => {
  const slugs = lessons.map((l) => l.slug)
  const missing = SLUGS.filter((slug) => !slugs.includes(slug))
  assert.deepEqual(missing, [], 'ссылки вида /ru/course/#slug перестанут вести к уроку, если якорь пропал')
  assert.equal(new Set(slugs).size, slugs.length, `slug повторяется: ${slugs.join(', ')}`)
})

// ---------- синтаксис блоков ----------

for (const { id, block } of codeBlocks) {
  if (block.pseudo) continue
  for (const v of VARIANTS) {
    test(`синтаксис блока ${id} ${v}`, () => {
      assert.doesNotThrow(
        () => new vm.Script(block.code[v]),
        `блок ${id} (${v}) не разбирается как скрипт: его нельзя скопировать и запустить`,
      )
      assert.doesNotThrow(
        () => new Function(...SANDBOX_GLOBALS, 'R', 'S', block.code[v]),
        `блок ${id} (${v}) не разбирается в песочнице: имя конфликтует с ${[...SANDBOX_GLOBALS, 'R', 'S'].join(', ')}`,
      )
    })
  }
}

test('блоки-иллюстрации: помечены pseudo ровно те четыре, что утверждены', () => {
  const actual = {}
  for (const { lesson, block } of codeBlocks) if (block.pseudo) actual[lesson.slug] = (actual[lesson.slug] ?? 0) + 1
  assert.deepEqual(actual, PSEUDO, 'пометку pseudo нельзя ставить или снимать без решения: блок выпадает из проверок')
})

test('блоки-иллюстрации: помечены именно схема иерархии и аналогия «лёд -> вода -> пар»', () => {
  const marked = (slug, needle) =>
    codeBlocks.some(({ lesson, block }) => lesson.slug === slug && block.pseudo && block.code.ru.includes(needle))
  assert.ok(marked('fantasy-land', 'Setoid'), 'схема иерархии Fantasy Land должна быть помечена pseudo')
  assert.ok(marked('category-theory', 'лёд -> вода'), 'аналогия «лёд -> вода -> пар» должна быть помечена pseudo')
})

// ---------- паритет ru/en: код один, различаются комментарии и строки ----------

for (const { id, block } of codeBlocks) {
  if (block.pseudo) continue
  test(`паритет кода ${id}: ru и en различаются только комментариями и строками`, () => {
    assert.equal(strip(block.code.en), strip(block.code.ru), `код блока ${id} разошёлся между /ru/course/ и /course/`)
  })
}

test('английский вариант кода: нет кириллицы', () => {
  const bad = codeBlocks.filter(({ block }) => CYRILLIC.test(block.code.en)).map(({ id }) => id)
  assert.deepEqual(bad, [], `читатель /course/ видит русский в коде: ${bad.join(', ')}`)
})

test('английские заголовки и тексты уроков: нет кириллицы', () => {
  const bad = lessons.flatMap((lesson) => [
    ...(CYRILLIC.test(lesson.title.en) ? [`${lesson.slug} заголовок`] : []),
    ...lesson.blocks.flatMap((b, i) => (b.type === 'text' && CYRILLIC.test(b.en) ? [`${lesson.slug}#${i}`] : [])),
  ])
  assert.deepEqual(bad, [], `читатель /course/ видит русский в тексте: ${bad.join(', ')}`)
})

// ---------- тон: без «)))», «ХАХА» и эмодзи ----------

test('тон: нет непарных «)» — «)))» и смайлов — в текстах и комментариях', () => {
  const bad = prose()
    .map(({ where, text }) => ({ where, at: unpairedClose(text), text }))
    .filter(({ at }) => at >= 0)
    .map(({ where, at, text }) => `${where}: ${around(text, at)}`)
  assert.deepEqual(bad, [], `в курсе остались разговорные скобки-смайлы (${bad.length})`)
})

test('тон: нет «ХАХА», «топчик», «Остапа понесло»', () => {
  const bad = prose()
    .filter(({ text }) => /ХАХА|топчик|Остапа понесло/i.test(text))
    .map(({ where }) => where)
  assert.deepEqual(bad, [], 'в курсе остались шутки автора, от которых владелец решил избавиться')
})

test('тон: нет эмодзи в текстах и комментариях', () => {
  const bad = prose()
    .filter(({ text }) => /\p{Extended_Pictographic}/u.test(text))
    .map(({ where }) => where)
  assert.deepEqual(bad, [], 'в курсе остались эмодзи')
})

// ---------- токенизатор: юнит-кейсы ----------

test('токенизатор: // внутри строки не комментарий', () => {
  const { code, comments } = scan("const u = 'http://x.y' // ссылка")
  assert.equal(code.replace(/\s+/g, ''), "constu=''")
  assert.deepEqual(comments, [' ссылка'])
})

test('токенизатор: /* */ внутри строки не комментарий', () => {
  const { code, comments } = scan('const s = "/* не комментарий */"; f()')
  assert.equal(code.replace(/\s+/g, ''), 'consts="";f()')
  assert.deepEqual(comments, [])
})

test('токенизатор: экранированная кавычка не закрывает строку', () => {
  const { code, comments } = scan("const s = 'it\\'s // тоже строка'; g()")
  assert.equal(code.replace(/\s+/g, ''), "consts='';g()")
  assert.deepEqual(comments, [])
})

test('токенизатор: апостроф в комментарии не открывает строку', () => {
  const { code, comments } = scan("// don't stop\nconst a = 1")
  assert.equal(code.replace(/\s+/g, ''), 'consta=1')
  assert.deepEqual(comments, [" don't stop"])
})

test('токенизатор: ${} с вложенными скобками остаётся кодом, текст шаблона стирается', () => {
  const { code } = scan('`текст ${ { b: { c: 1 } }.b.c } ещё`')
  assert.equal(code.replace(/\s+/g, ''), '`${{b:{c:1}}.b.c}`')
})

test('токенизатор: шаблон внутри ${} разбирается рекурсивно', () => {
  const { code } = scan('`a ${ `b ${c} d` } e`')
  assert.equal(code.replace(/\s+/g, ''), '`${`${c}`}`')
})

test('токенизатор: деление не принимается за regex и не прячет комментарий', () => {
  const { code, comments } = scan('const r = a / b // дальше\nf()')
  assert.equal(code.replace(/\s+/g, ''), 'constr=a/bf()')
  assert.deepEqual(comments, [' дальше'])
})

test('токенизатор: strip равен для кода с разными комментариями и строками', () => {
  assert.equal(strip("f('да') // раз\n"), strip("f('yes') /* one */"))
})

test('токенизатор: strip различает разный код, в том числе внутри ${}', () => {
  assert.notEqual(strip('a + b'), strip('a - b'))
  assert.notEqual(strip('`x ${a}`'), strip('`x ${b}`'))
})

// ---------- пробы исполнения: примеры дают то, что обещают комментарии ----------

// Блок исполняется в отдельном realm (vm.createContext): порча Object.prototype
// полифилом не задевает сам тест. Сети нет: fetch отвечает заглушкой и считает вызовы.
const withSession = async (fn) => {
  const calls = []
  const fetchCalls = []
  const timers = new Set()
  const sandbox = {
    console: {
      log: (...args) => calls.push(args),
      info: (...args) => calls.push(args),
      warn: (...args) => calls.push(args),
      error: (...args) => calls.push(args),
    },
    R,
    S,
    structuredClone,
    prompt: () => '1',
    // отклонённый промис в коде урока опрокинул бы весь node:test, поэтому ответ успешный
    fetch: (...args) => {
      fetchCalls.push(args)
      return Promise.resolve({ ok: true, status: 200, json: async () => ({}), text: async () => '' })
    },
    setTimeout: (cb, ms, ...args) => {
      const id = setTimeout(() => {
        try {
          cb(...args)
        } catch (error) {
          calls.push([`Error: ${error.message}`])
        }
      }, ms)
      timers.add(id)
      return id
    },
    clearTimeout: (id) => clearTimeout(id),
  }
  const ctx = vm.createContext(sandbox)
  const session = {
    logs: () => calls.flat(),
    fetchCalls,
    clearLogs: () => calls.splice(0),
    // исполняет блок: синхронное исключение (SyntaxError, TypeError...) — провал пробы
    load: (code) => {
      try {
        vm.runInContext(code, ctx, { timeout: 2000 })
      } catch (error) {
        assert.fail(`блок не исполняется: ${error.name}: ${error.message}`)
      }
    },
    // выражение-проба в том же контексте: const верхнего уровня блока ему видны
    evaluate: (expr, timeout = 2000) => vm.runInContext(expr, ctx, { timeout }),
    // даём пройти микрозадачам и таймерам блока
    settle: () => new Promise((resolve) => setTimeout(resolve, 20)),
  }
  try {
    await fn(session)
  } finally {
    for (const id of timers) clearTimeout(id)
  }
}

const probe = (name, slug, needle, check) => {
  for (const v of VARIANTS) {
    test(`проба ${name} (${v})`, () =>
      withSession(async (session) => {
        session.load(findBlock(slug, needle).code[v])
        await session.settle()
        await check(session)
      }))
  }
}

const has = (session, expected) =>
  session.logs().some((item) => JSON.stringify(item) === JSON.stringify(expected))

probe('currying: конвейер печатает ["Angel"] и самодостаточен', 'currying', 'adultsUsers', (s) => {
  assert.ok(has(s, ['Angel']), `в консоли нет ["Angel"], есть: ${JSON.stringify(s.logs())}`)
})

probe('recursion: однострочник печатает 25.25', 'recursion', 'recurAgeAverageF', (s) => {
  assert.ok(has(s, 25.25), `в консоли нет 25.25, есть: ${JSON.stringify(s.logs())}`)
})

probe('functional-programming: печатает "John" без import и await', 'functional-programming', 'searchOnlineUsers', (s) => {
  assert.ok(has(s, 'John'), `в консоли нет "John", есть: ${JSON.stringify(s.logs())}`)
})

probe('lenses: самописная линза — x остаётся массивом', 'lenses', 'xLens', (s) => {
  assert.equal(s.evaluate('resultView'), 2, 'view по линзе должен вернуть 2')
  assert.equal(
    s.evaluate('JSON.stringify(resultSet)'),
    '{"x":[{"y":1,"z":3},{"y":4,"z":5}]}',
    'после set x должен остаться массивом с y: 1',
  )
  assert.equal(
    s.evaluate('JSON.stringify(resultOver)'),
    '{"x":[{"y":5,"z":3},{"y":4,"z":5}]}',
    'после over x должен остаться массивом с y: 5',
  )
})

probe('map через трамплин на [1,2,3]', 'function-map-filter-reduce', 'mapTrampoline', (s) => {
  assert.equal(s.evaluate('JSON.stringify(mapTrampoline(v => v * 2)([1, 2, 3]))'), '[2,4,6]')
})

probe('filter через трамплин на [1,2,3]', 'function-map-filter-reduce', 'filterTrampoline', (s) => {
  assert.equal(s.evaluate('JSON.stringify(filterTrampoline(v => v > 2)([1, 2, 3]))'), '[3]')
})

probe('reduce через трамплин на [1,2,3]', 'function-map-filter-reduce', 'reduceTrampoline', (s) => {
  assert.equal(s.evaluate('reduceTrampoline((a, b) => a + b)(0)([1, 2, 3])'), 6)
})

// Глубина, на которой обычная рекурсия в этом процессе уже падает; считаем сами, она зависит от окружения.
const overflowDepth = () => {
  const naive = (i, n) => (i === n ? 0 : 1 + naive(i + 1, n))
  for (let n = 15000; n <= 120000; n *= 2) {
    try {
      naive(0, n)
    } catch (error) {
      if (error instanceof RangeError) return n
      throw error
    }
  }
  return 120000
}

for (const [name, needle, expr, expected] of [
  ['map', 'mapTrampoline', 'mapTrampoline(v => v)(ARR).length', 'N'],
  ['filter', 'filterTrampoline', 'filterTrampoline(() => true)(ARR).length', 'N'],
  ['reduce', 'reduceTrampoline', 'reduceTrampoline((a, b) => a + 1)(0)(ARR)', 'N'],
]) {
  for (const v of VARIANTS) {
    test(`проба ${name} через трамплин: стек не переполняется там, где падает обычная рекурсия (${v})`, () =>
      withSession(async (session) => {
        const n = overflowDepth()
        session.load(findBlock('function-map-filter-reduce', needle).code[v])
        const result = session.evaluate(`(() => { const ARR = Array.from({ length: ${n} }, (_, i) => i); return ${expr} })()`, 60000)
        assert.equal(result, n, `трамплин на ${n} элементах должен вернуть ${expected}=${n}`)
      }))
  }
}

probe('pure-functions: изменённый возраст виден снаружи', 'pure-functions', 'useChangeUser', (s) => {
  assert.equal(
    s.evaluate(`(() => {
      const user = useImmutableUser({ name: 'John', age: 25 })
      const before = user.getUser()
      user.changeAge(30)
      return JSON.stringify([user.getUser().age, before.age])
    })()`),
    '[30,25]',
    'после changeAge(30) getUser() должен вернуть 30, а снимок до изменения — остаться 25',
  )
})

probe('fantasy-land: полифил без аргумента не портит Object.prototype', 'fantasy-land', 'createObjectProto', (s) => {
  assert.equal(
    s.evaluate('(() => { createObjectProto(); return ({}).constructor === Object })()'),
    true,
    'после createObjectProto() у обычного объекта constructor перестал быть Object',
  )
})

probe('fantasy-land: полифил с аргументом не мутирует его', 'fantasy-land', 'createObjectProto', (s) => {
  assert.equal(
    s.evaluate(`(() => {
      const proto = { a: 1 }
      createObjectProto(proto)
      return Object.prototype.hasOwnProperty.call(proto, 'constructor')
    })()`),
    false,
    'createObjectProto(proto) добавил в переданный объект собственное свойство constructor',
  )
})

probe('side-effects: денег ровно на цену — покупка возможна', 'side-effects-in-composition-functions', 'resultMsg', (s) => {
  assert.equal(s.evaluate("pipeline({ name: 'John', money: 8000 })"), 'the product can be purchased')
})

probe('side-effects: денег меньше цены — не хватает', 'side-effects-in-composition-functions', 'resultMsg', (s) => {
  assert.equal(s.evaluate("pipeline({ name: 'John', money: 7999 })"), "you don't have enough money")
})

for (const v of VARIANTS) {
  test(`проба side-effects: блок с tap после первого логирует 10000, true и сообщение (${v})`, () =>
    withSession(async (session) => {
      const slug = 'side-effects-in-composition-functions'
      session.load(findBlock(slug, 'resultMsg').code[v])
      session.clearLogs()
      session.load(findBlock(slug, 'tapD').code[v])
      await session.settle()
      assert.deepEqual(
        session.logs(),
        [10000, true, 'the product can be purchased'],
        'логгер в композиции должен напечатать три значения по порядку',
      )
    }))
}

probe('neural-networks: сеть решает XOR', 'neural-networks', 'getAnswer', (s) => {
  assert.deepEqual(
    s.logs().map(String),
    ['0 XOR 0 = 0', '0 XOR 1 = 1', '1 XOR 0 = 1', '1 XOR 1 = 0'],
    'сеть из урока должна печатать таблицу XOR, как обещает комментарий',
  )
})

probe('currying-and-asynchrony: блок исполняется и делает 2 запроса', 'currying-and-asynchrony', 'getAllBooks', (s) => {
  assert.equal(s.fetchCalls.length, 2, 'getAllUser() и getAllBooks() должны вызвать fetch по разу')
})
