import { test } from 'node:test'
import assert from 'node:assert/strict'
import module, { createRequire } from 'node:module'
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { SANDBOX_GLOBALS, createPlaygroundRunner } from '../app/utils/playground-runner.ts'

// Уроки лежат в app/data/lessons/*.ts, в course.ts импорты без расширения: дописываем .ts.
// Типы Node стирает сам.
module.registerHooks({
  resolve: (specifier, context, next) =>
    next(/^\.\.?\//.test(specifier) && !/\.\w+$/.test(specifier) ? `${specifier}.ts` : specifier, context),
})
const { lessons, introSections } = await import('../app/data/course.ts')
// Все разделы страницы: вводные без номера и нумерованные уроки.
const sections = [...introSections, ...lessons]

// Библиотеки песочницы берём из node_modules проекта, как их берёт CoursePlayground.vue
const require = createRequire(import.meta.url)
const R = require('ramda')
const sanctuary = require('sanctuary')
const S = sanctuary.create({ checkTypes: false, env: sanctuary.env })
const LIBS = [
  { alias: 'R', mod: R },
  { alias: 'S', mod: S },
]

const VARIANTS = ['ru', 'en']
const CYRILLIC = /[А-Яа-яЁё]/
const INTRO_SLUGS = ['for-whom', 'not-for-whom']
// нумерованные уроки: всё, что не вводные разделы (порядок и число уроков здесь не закрепляем)
const numbered = lessons.filter((lesson) => !INTRO_SLUGS.includes(lesson.slug))
const BLOCK_TYPES = ['text', 'heading', 'list', 'table', 'code']
// ключи course.* в ru.json и en.json, которые нужны навигации, упражнениям, кнопке «Открыть в песочнице»,
// страницам уроков и прогрессу чтения
const NEW_KEYS = [
  'goal',
  'summary',
  'exercises',
  'exercise',
  'starter',
  'expected',
  'showSolution',
  'backToToc',
  'nextLesson',
  'openInPlayground',
  'backToExample',
  'exampleLabel',
  'starterLabel',
  'solutionLabel',
  'editorLabel',
  'home',
  'breadcrumbs',
  'lessonNav',
  'prevLesson',
  'read',
  'markRead',
  'unmarkRead',
  'progressCount',
  'progressContinue',
  'progressStart',
  'progressReset',
  'progressResetConfirm',
  'progressNote',
]
// Блоки, которые нельзя запустить в песочнице как есть: чего им не хватает.
// needle — подстрока ru-варианта кода, по ней блок находится однозначно.
const NO_RUN = [
  { slug: 'composition', needle: 'человекочитаемом формате', reason: 'previous-block' },
  { slug: 'currying-and-asynchrony', needle: 'базовую функцию для запросов', reason: 'network' },
  { slug: 'currying-and-asynchrony', needle: 'плохо пахнет', reason: 'dom' },
  { slug: 'currying-and-asynchrony', needle: 'декларативный код', reason: 'dom' },
  { slug: 'currying-and-asynchrony', needle: 'возьмемся за дело', reason: 'dom' },
  { slug: 'performance', needle: 'Утилита замера скорости', reason: 'previous-block' },
  { slug: 'side-effects-in-composition-functions', needle: 'tapD', reason: 'previous-block' },
]
// Как выглядит текстовая имитация заголовка, таблицы и списка.
const IMITATIONS = [
  [/-{5,}/, 'ряд дефисов вместо подзаголовка или таблицы'],
  [/^\|.*\|/, 'строка таблицы из «|»'],
  [/(^|\s)1\. .+\s2\. /, 'список «1. … 2. …» в одном абзаце'],
  [/^\d+\.\s/, 'абзац или пункт, начинающийся с «N. »'],
]
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

const codeBlocks = sections.flatMap((lesson) =>
  lesson.blocks.flatMap((block, i) => (block.type === 'code' ? [{ lesson, block, i, id: `${lesson.slug}#${i}` }] : [])),
)

// Код упражнений: заготовка (если есть) и решение.
// У вводных разделов упражнений нет; что они есть у каждого урока, проверяет отдельный тест.
const exercisesOf = (section) => section.exercises ?? []
const exerciseCode = sections.flatMap((section) =>
  exercisesOf(section).flatMap((exercise, index) => {
    const part = (name, noun, genitive) => ({
      kind: name,
      id: `${section.slug} упражнение ${index + 1} ${noun}`,
      label: `${genitive} упражнения ${section.slug}#${index + 1}`,
      code: exercise[name],
    })
    return [
      ...(exercise.starter ? [part('starter', 'заготовка', 'заготовки')] : []),
      part('solution', 'решение', 'решения'),
    ]
  }),
)
// Весь код курса, который читатель может скопировать: блоки уроков и код упражнений.
const allCode = [
  ...codeBlocks.map(({ id, block }) => ({ id, label: `блока ${id}`, code: block.code, pseudo: block.pseudo, lang: block.lang })),
  ...exerciseCode,
]

// Блок урока, в ru-варианте которого есть needle; совпадение должно быть одно.
// По индексу не ищем: при разделении блоков индексы сдвигаются.
const findBlock = (slug, needle) => {
  const lesson = sections.find((l) => l.slug === slug)
  assert.ok(lesson, `в курсе нет урока ${slug}`)
  const found = lesson.blocks.filter((b) => b.type === 'code' && !b.pseudo && b.code.ru.includes(needle))
  assert.equal(found.length, 1, `в уроке ${slug} должен быть ровно один исполняемый блок с «${needle}», найдено ${found.length}`)
  return found[0]
}

// Тексты раздела, которые читает человек: заголовок, описание, цель, «главное», абзацы, подзаголовки,
// пункты списков, подпись и ячейки таблиц, условия и ожидаемый вывод упражнений, оба языка.
// kind 'output' — вывод песочницы: в нём вполне может быть «1. » или «---», на имитации он не проверяется.
const textFields = (section) => {
  const at = (where, pair, kind = 'prose') =>
    VARIANTS.map((v) => ({
      where: `${section.slug}${where} ${v}`,
      v,
      kind,
      text: typeof pair?.[v] === 'string' ? pair[v] : '',
    }))
  const blocks = section.blocks.flatMap((block, i) => {
    const id = `#${i}`
    if (block.type === 'text') return at(`${id} текст`, block)
    if (block.type === 'heading') return at(`${id} подзаголовок`, block)
    if (block.type === 'list') return (block.items ?? []).flatMap((item, k) => at(`${id} пункт ${k + 1}`, item))
    if (block.type === 'table') {
      return [
        ...at(`${id} подпись таблицы`, block.caption),
        ...(block.columns ?? []).flatMap((column, c) => at(`${id} столбец ${c + 1}`, column)),
        ...(block.rows ?? []).flatMap((row, r) =>
          row.flatMap((cell, c) => at(`${id} ячейка ${r + 1}.${c + 1}`, cell)),
        ),
      ]
    }
    return []
  })
  return [
    ...at(' заголовок', section.title),
    ...(section.description ? at(' описание', section.description) : []),
    ...(section.goal ? at(' цель', section.goal) : []),
    ...(Array.isArray(section.summary) ? section.summary : []).flatMap((item, k) => at(` главное ${k + 1}`, item)),
    ...blocks,
    ...exercisesOf(section).flatMap((exercise, k) => [
      ...at(` упражнение ${k + 1} условие`, exercise.task),
      ...at(` упражнение ${k + 1} ожидаемый вывод`, exercise.expected, 'output'),
    ]),
  ]
}

// Комментарии в коде блоков и упражнений обоих языков.
const codeComments = () =>
  [...codeBlocks.map(({ id, block }) => ({ id, code: block.code })), ...exerciseCode].flatMap(({ id, code }) =>
    VARIANTS.flatMap((v) =>
      scan(typeof code?.[v] === 'string' ? code[v] : '').comments.map((text) => ({
        where: `${id} комментарий ${v}`,
        text,
      })),
    ),
  )

// Все места с авторским текстом: тексты раздела и комментарии в коде.
const prose = () => [...sections.flatMap(textFields), ...codeComments()]

const unpairedClose = (text) => {
  let depth = 0
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '(') depth++
    else if (text[i] === ')' && depth-- === 0) return i
  }
  return -1
}

const around = (text, at) => JSON.stringify(text.slice(Math.max(0, at - 25), at + 10))

// ---------- вводные разделы и якоря ----------

test('вводные разделы: «Для кого» и «Кому не подойдёт» вынесены в introSections', () => {
  assert.ok(
    Array.isArray(introSections),
    'в course.ts нет introSections: «Для кого» и «Кому не подойдёт» остаются уроками 01 и 02',
  )
  assert.deepEqual(
    introSections.map((s) => s.slug).sort(),
    [...INTRO_SLUGS].sort(),
    'вводными должны быть ровно for-whom и not-for-whom',
  )
})

test('вводные разделы: нет цели, «главного» и упражнений', () => {
  assert.ok(Array.isArray(introSections), 'в course.ts нет introSections')
  const extra = introSections.flatMap((s) =>
    ['goal', 'summary', 'exercises'].filter((field) => field in s).map((field) => `${s.slug}.${field}`),
  )
  assert.deepEqual(extra, [], 'у вводного раздела не должно быть цели, «главного» и упражнений: это не урок')
})

test('нумерованные уроки: вводных разделов среди них нет', () => {
  const slugs = lessons.map((l) => l.slug).filter((slug) => INTRO_SLUGS.includes(slug))
  assert.deepEqual(slugs, [], 'вводные разделы остались в lessons: читатель видит их под номерами 01 и 02')
})

test('уроки курса: все прежние slug-якоря на месте и не повторяются', () => {
  const slugs = sections.map((l) => l.slug)
  const missing = SLUGS.filter((slug) => !slugs.includes(slug))
  assert.deepEqual(missing, [], 'ссылки вида /ru/course/#slug перестанут вести к уроку, если якорь пропал')
  assert.equal(new Set(slugs).size, slugs.length, `slug повторяется: ${slugs.join(', ')}`)
})

// ---------- типы блоков и их форма ----------

test('блоки: только text, heading, list, table и code', () => {
  const unknown = sections.flatMap((s) =>
    s.blocks.flatMap((b, i) => (BLOCK_TYPES.includes(b.type) ? [] : [`${s.slug}#${i}: ${String(b.type)}`])),
  )
  assert.deepEqual(unknown, [], 'рендер урока не знает такого блока и не покажет его читателю')
})

test('подзаголовки: ru и en непустые', () => {
  const bad = sections.flatMap((s) =>
    s.blocks.flatMap((b, i) =>
      b.type === 'heading' ? VARIANTS.filter((v) => !String(b[v] ?? '').trim()).map((v) => `${s.slug}#${i} ${v}`) : [],
    ),
  )
  assert.deepEqual(bad, [], 'пустой подзаголовок выведет пустой h4')
})

test('списки: не меньше двух непустых пунктов на ru и en, признак ordered задан', () => {
  const bad = sections.flatMap((s) =>
    s.blocks.flatMap((b, i) => {
      if (b.type !== 'list') return []
      const problems = []
      if (typeof b.ordered !== 'boolean') problems.push('ordered не boolean')
      if (!Array.isArray(b.items) || b.items.length < 2) problems.push('меньше двух пунктов')
      else {
        for (const [k, item] of b.items.entries()) {
          for (const v of VARIANTS) if (!String(item?.[v] ?? '').trim()) problems.push(`пункт ${k + 1} (${v}) пуст`)
        }
      }
      return problems.map((p) => `${s.slug}#${i}: ${p}`)
    }),
  )
  assert.deepEqual(bad, [], 'список из одного пункта или с пустым пунктом — не список')
})

test('таблицы: есть подпись, столбцы и строки, длина строки равна числу столбцов', () => {
  const bad = sections.flatMap((s) =>
    s.blocks.flatMap((b, i) => {
      if (b.type !== 'table') return []
      const problems = []
      for (const v of VARIANTS) if (!String(b.caption?.[v] ?? '').trim()) problems.push(`подпись (${v}) пуста`)
      if (!Array.isArray(b.columns) || b.columns.length < 1) problems.push('нет столбцов')
      else {
        for (const [c, column] of b.columns.entries()) {
          for (const v of VARIANTS) if (!String(column?.[v] ?? '').trim()) problems.push(`заголовок столбца ${c + 1} (${v}) пуст`)
        }
      }
      if (!Array.isArray(b.rows) || b.rows.length < 1) problems.push('нет строк')
      else {
        for (const [r, row] of b.rows.entries()) {
          if (!Array.isArray(row) || row.length !== b.columns?.length) problems.push(`в строке ${r + 1} ячеек не столько, сколько столбцов`)
        }
      }
      return problems.map((p) => `${s.slug}#${i}: ${p}`)
    }),
  )
  assert.deepEqual(bad, [], 'таблица без подписи или с кривой строкой не соберётся в <table> с заголовками')
})

// ---------- заголовки, списки и таблицы — блоками, а не текстом ----------

for (const section of sections) {
  test(`урок ${section.slug}: нет имитаций заголовков, списков и таблиц в тексте`, () => {
    const found = textFields(section)
      .filter(({ kind }) => kind !== 'output')
      .flatMap(({ where, text }) =>
        IMITATIONS.filter(([pattern]) => pattern.test(text)).map(([, what]) => `${where}: ${what}`),
      )
    assert.deepEqual(found, [], 'читатель видит «1. …», «----» и «| … |» как текст, а не как заголовок, список или таблицу')
  })
}

test('selecting-library: сравнительная таблица — блок table из 7 столбцов и 8 строк', () => {
  const lesson = sections.find((s) => s.slug === 'selecting-library')
  const tables = lesson.blocks.filter((b) => b.type === 'table')
  assert.equal(tables.length, 1, `в уроке должна быть одна таблица, найдено ${tables.length}`)
  assert.equal(tables[0].columns?.length, 7, 'в таблице выбора должно быть 7 столбцов: «Критерий», Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts, Effect')
  assert.equal(tables[0].rows?.length, 8, 'строки: от «Бюджет» до «Философия»')
})

test('selecting-library: последние три столбца таблицы — Sanctuary, fp-ts, Effect', () => {
  const lesson = sections.find((s) => s.slug === 'selecting-library')
  const table = lesson.blocks.find((b) => b.type === 'table')
  for (const v of VARIANTS) {
    assert.deepEqual(
      (table.columns ?? []).slice(-3).map((column) => column[v]),
      ['Sanctuary', 'fp-ts', 'Effect'],
      `читатель /${v === 'ru' ? 'ru/' : ''}course/ не найдёт fp-ts и Effect рядом с остальными библиотеками в таблице выбора`,
    )
  }
})

test('selecting-library: у fp-ts и Effect есть свои подзаголовки', () => {
  const lesson = sections.find((s) => s.slug === 'selecting-library')
  const headings = lesson.blocks.filter((b) => b.type === 'heading')
  const missing = ['fp-ts', 'Effect'].filter((name) => !headings.some((h) => VARIANTS.every((v) => h[v].includes(name))))
  assert.deepEqual(missing, [], 'разбора по критериям нет: владелец решил добавить fp-ts и Effect в «Что выбрать» наравне с остальными')
})

test('selecting-library: нет реплики, что «TypeScript сам защитит» команду от ошибок', () => {
  const lesson = sections.find((s) => s.slug === 'selecting-library')
  const found = textFields(lesson)
    .filter(({ text }) => /TypeScript\s+сам(?:\s+по\s+себе)?\s+защит|TypeScript\s+alone/i.test(text))
    .map(({ where }) => where)
  assert.deepEqual(found, [], 'в уроке осталась реплика против TypeScript: владелец решил переписать её нейтрально')
})

test('selecting-library: сравнение библиотек не осталось абзацем', () => {
  const lesson = sections.find((s) => s.slug === 'selecting-library')
  const stillText = lesson.blocks.flatMap((b, i) =>
    b.type === 'text'
      ? VARIANTS.filter((v) => /Vanilla JS [—-] .+Lodash [—-] .+Ramda [—-] /.test(b[v])).map((v) => `#${i} ${v}`)
      : [],
  )
  assert.deepEqual(stillText, [], 'таблица из 8 критериев на 4 библиотеки по-прежнему сплошной абзац')
})

// ---------- синтаксис блоков ----------

for (const { label, code, pseudo, lang } of allCode) {
  if (pseudo || lang === 'ts') continue
  for (const v of VARIANTS) {
    test(`синтаксис ${label} ${v}`, () => {
      assert.doesNotThrow(
        () => new vm.Script(code[v]),
        `${label} (${v}) не разбирается как скрипт: его нельзя скопировать и запустить`,
      )
      assert.doesNotThrow(
        () => new Function(...SANDBOX_GLOBALS, 'R', 'S', code[v]),
        `${label} (${v}) не разбирается в песочнице: имя конфликтует с ${[...SANDBOX_GLOBALS, 'R', 'S'].join(', ')}`,
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

for (const { id, label, code, pseudo } of allCode) {
  if (pseudo) continue
  test(`паритет кода ${id}: ru и en различаются только комментариями и строками`, () => {
    assert.equal(strip(code.en), strip(code.ru), `код ${label} разошёлся между /ru/course/ и /course/`)
  })
}

test('английский вариант кода: нет кириллицы', () => {
  const bad = allCode.filter(({ code }) => CYRILLIC.test(code.en)).map(({ id }) => id)
  assert.deepEqual(bad, [], `читатель /course/ видит русский в коде: ${bad.join(', ')}`)
})

test('английские заголовки и тексты уроков: нет кириллицы', () => {
  const bad = sections
    .flatMap(textFields)
    .filter(({ v, text }) => v === 'en' && CYRILLIC.test(text))
    .map(({ where }) => where)
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

// ---------- ссылки на уроки: по названию, не по номеру ----------

// «урок 4», «урока 25», «lesson 12»: номер сдвигается, когда в программу вставляют новый урок.
const LESSON_NUMBER = /(урок[а-я]*|lessons?)\s+\d{1,2}\b/i

test('тексты не ссылаются на уроки по номеру', () => {
  const bad = prose()
    .filter(({ text }) => LESSON_NUMBER.test(text))
    .map(({ where, text }) => `${where}: ${around(text, text.search(LESSON_NUMBER))}`)
  assert.deepEqual(bad, [], 'ссылка «урок N» устареет, как только в программу вставят новый урок: называйте урок по названию')
})

// ---------- цель, «главное» и упражнения у каждого урока ----------

const fillError = (name, pair, max) =>
  VARIANTS.flatMap((v) => {
    const value = pair?.[v]
    if (typeof value !== 'string' || !value.trim()) return [`${name} (${v}) пусто`]
    return max && value.length > max ? [`${name} (${v}) длиннее ${max} знаков`] : []
  })

for (const lesson of numbered) {
  test(`урок ${lesson.slug}: цель, главное, упражнения`, () => {
    const problems = [...fillError('цель', lesson.goal, 300)]
    if (!Array.isArray(lesson.summary) || lesson.summary.length < 2 || lesson.summary.length > 5) {
      problems.push('«главное» должно быть из 2–5 пунктов')
    } else {
      lesson.summary.forEach((item, k) => problems.push(...fillError(`главное ${k + 1}`, item)))
    }
    if (!Array.isArray(lesson.exercises) || lesson.exercises.length < 1 || lesson.exercises.length > 2) {
      problems.push('упражнений должно быть 1–2')
    } else {
      lesson.exercises.forEach((exercise, k) => {
        const name = `упражнение ${k + 1}`
        problems.push(...fillError(`${name}: условие`, exercise?.task))
        problems.push(...fillError(`${name}: решение`, exercise?.solution))
        problems.push(...fillError(`${name}: ожидаемый вывод`, exercise?.expected))
        if (exercise?.starter !== undefined) problems.push(...fillError(`${name}: заготовка`, exercise.starter))
      })
    }
    assert.deepEqual(problems, [], 'у урока нет полной цели, «главного» или упражнений с решением и ожидаемым выводом')
  })
}

// ---------- исполнение кода в песочнице ----------

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const SETTLE_MS = 50
const describeError = (error) => `${error?.name ?? 'Error'}: ${error?.message ?? String(error)}`

// Отклонённый промис кода не должен ни упасть мимо теста, ни покраснить соседний: на время прогона
// и ожидания SETTLE_MS обработчик необработанных отклонений наш, потом прежние возвращаются.
const observe = async (run) => {
  const rejections = []
  const onRejection = (reason) => rejections.push(`необработанное отклонение: ${describeError(reason)}`)
  const saved = process.listeners('unhandledRejection')
  process.removeAllListeners('unhandledRejection')
  process.on('unhandledRejection', onRejection)
  try {
    await run()
    await wait(SETTLE_MS)
  } finally {
    process.off('unhandledRejection', onRejection)
    for (const listener of saved) process.on('unhandledRejection', listener)
  }
  return rejections
}

// Исполняет код так, как его исполнит песочница: функция с параметрами SANDBOX_GLOBALS, R и S,
// а остальное — безвредные глобалы браузера. Возвращает список проблем (пустой — код отработал чисто).
const execute = async (code, extraGlobals = {}) => {
  const problems = []
  const timers = new Set()
  const guarded = (callback) => (...args) => {
    try {
      callback(...args)
    } catch (error) {
      problems.push(`ошибка в колбэке: ${describeError(error)}`)
    }
  }
  const track = (id) => {
    timers.add(id)
    return id
  }
  const ctx = vm.createContext({
    console: { log() {}, error() {}, warn() {} },
    setTimeout: (callback, ms, ...args) => track(setTimeout(guarded(callback), ms, ...args)),
    setInterval: (callback, ms, ...args) => track(setInterval(guarded(callback), ms, ...args)),
    clearTimeout,
    clearInterval,
    queueMicrotask: (callback) => queueMicrotask(guarded(callback)),
    structuredClone,
    performance,
    R,
    S,
    ...extraGlobals,
  })
  const params = [...SANDBOX_GLOBALS, 'R', 'S'].join(', ')
  const rejections = await observe(() => {
    try {
      vm.runInContext(`(function (${params}) {\n${code}\n})(${params})`, ctx, { timeout: 2000 })
    } catch (error) {
      problems.push(describeError(error))
    }
  })
  for (const id of timers) {
    clearTimeout(id)
    clearInterval(id)
  }
  return [...problems, ...rejections]
}

// Решение упражнения через тот же раннер, что в песочнице: что увидит читатель в «Результате».
const checkSolution = async (solution, expected) => {
  let output = ''
  const runner = createPlaygroundRunner((text) => {
    output = text
  })
  const rejections = await observe(() => runner.run(solution, LIBS))
  const printed = output
  runner.clear()
  const problems = [...rejections]
  if (printed !== expected) problems.push(`печатает ${JSON.stringify(printed)}, а ожидается ${JSON.stringify(expected)}`)
  if (printed.split('\n').some((line) => line.startsWith('Error:'))) problems.push('в выводе есть строка Error:')
  return problems
}

test('прогон кода: безвредный код с R, S, таймерами и промисами проходит чисто', async () => {
  const problems = await execute(`
    console.log(R.add(1, 2), S.Just(1))
    setTimeout(() => console.log('late'), 5)
    const tick = setInterval(() => console.log('tick'), 5)
    setTimeout(() => clearInterval(tick), 12)
    clearTimeout(setTimeout(() => {}, 1))
    queueMicrotask(() => structuredClone({ a: 1 }))
    Promise.resolve(performance.now()).then(console.log)
  `)
  assert.deepEqual(problems, [], 'исправный код признан ошибочным: тест исполнения ломает зелёные блоки')
})

test('прогон кода: синхронное исключение замечается', async () => {
  const problems = await execute("throw new Error('boom')")
  assert.equal(problems.length, 1, 'исключение в блоке не замечено: сломанный пример прошёл бы тест')
})

test('прогон кода: ReferenceError на отсутствующем имени замечается', async () => {
  const problems = await execute('fetchAllUsers()')
  assert.equal(problems.length, 1, 'пример с именем из другого блока прошёл бы тест')
})

test('прогон кода: ошибка в колбэке таймера замечается', async () => {
  const problems = await execute("setTimeout(() => { throw new Error('late boom') }, 0)")
  assert.equal(problems.length, 1, 'ошибка в таймере не замечена: песочница показала бы её читателю строкой Error')
})

test('прогон кода: отклонённый промис замечается и не краснит соседний тест', async () => {
  const problems = await execute("Promise.reject(new Error('rejected'))")
  assert.equal(problems.length, 1, 'необработанное отклонение не замечено')
})

test('прогон кода: setInterval без clearInterval не переживает прогон', async () => {
  const probe = { hits: 0 }
  await execute('setInterval(() => probe.hits++, 5)', { probe })
  const hits = probe.hits
  await wait(30)
  assert.equal(probe.hits, hits, 'интервал из прогнанного блока продолжает тикать и мешает следующим тестам')
})

test('проверка решения: верный вывод проходит', async () => {
  assert.deepEqual(await checkSolution('console.log(R.add(1, 2))', '3'), [])
})

test('проверка решения: другой вывод замечается', async () => {
  const problems = await checkSolution('console.log(R.add(1, 2))', '4')
  assert.equal(problems.length, 1, 'решение с неверным ожидаемым выводом признано верным')
})

test('проверка решения: исключение в решении замечается', async () => {
  const problems = await checkSolution("throw new Error('boom')", 'Error: boom')
  assert.ok(problems.some((p) => /Error:/.test(p)), 'решение, которое падает, признано верным')
})

test('проверка решения: асинхронный вывод дожидается', async () => {
  assert.deepEqual(await checkSolution("setTimeout(() => console.log('late'), 5)", 'late'), [])
})

for (const { id, block } of codeBlocks) {
  if (block.pseudo || block.noRun || block.lang === 'ts') continue
  for (const v of VARIANTS) {
    test(`исполнение ${id} ${v}`, async () => {
      const problems = await execute(block.code[v])
      assert.equal(
        problems.length,
        0,
        `блок ${id} (${v}) падает в песочнице: ${problems.join('; ')}. Если ему нужен DOM, сеть или имя из прошлого примера, пометьте его noRun, иначе читатель получит кнопку «Открыть в песочнице», которая приводит к ошибке`,
      )
    })
  }
}

for (const { id, kind, label, code } of exerciseCode) {
  if (kind !== 'solution') continue
  for (const v of VARIANTS) {
    test(`исполнение ${id} ${v}`, async () => {
      const problems = await execute(code[v])
      assert.equal(problems.length, 0, `${label} (${v}) падает в песочнице: ${problems.join('; ')}`)
    })
  }
}

// ---------- блоки, которые нельзя запустить как есть ----------

test(`noRun: помечены ровно ${NO_RUN.length} блоков`, () => {
  const marked = codeBlocks.filter(({ block }) => block.noRun).map(({ id }) => id)
  assert.equal(marked.length, NO_RUN.length, `помечены блоки: ${marked.join(', ') || 'ни одного'}`)
})

for (const { slug, needle, reason } of NO_RUN) {
  test(`noRun: ${slug} «${needle}» помечен причиной ${reason}`, () => {
    assert.equal(
      findBlock(slug, needle).noRun,
      reason,
      'без пометки у блока будет кнопка «Открыть в песочнице», а запуск закончится ошибкой',
    )
  })

  for (const v of VARIANTS) {
    test(`noRun: ${slug} «${needle}» (${v}) действительно не исполняется в песочнице`, async () => {
      const problems = await execute(findBlock(slug, needle).code[v])
      assert.ok(problems.length > 0, 'блок исполняется без ошибок: пометка noRun устарела, кнопку «Открыть в песочнице» надо вернуть')
    })
  }
}

// ---------- решения упражнений выводят то, что в данных ----------

for (const section of sections) {
  exercisesOf(section).forEach((exercise, index) => {
    for (const v of VARIANTS) {
      test(`упражнение ${section.slug}#${index + 1} ${v}: решение выводит ожидаемое`, async () => {
        const problems = await checkSolution(exercise.solution[v], exercise.expected[v])
        assert.deepEqual(problems, [], 'читатель сверит свой вывод с ожидаемым и решит, что ошибается курс или он сам')
      })
    }
  })
}

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

// ---------- TS-блоки: TypeScript читают с подсветкой, но не запускают ----------

const TS_LESSON = 'fp-in-typescript-and-effect'
const IMPORT_LINE = /^\s*import\b/
const EFFECT_IMPORT = /^import\s+\{[^}]*\}\s+from\s+(['"])effect\1;?\s*$/
// Имена API Effect 3: в уроке про Effect 4 их быть не должно. Ищем в коде без комментариев и строк.
// Either — подстрокой: в Effect 4 нет ни одного имени с Either, а в Effect 3 есть decodeUnknownEither и подобные.
const V3_NAMES = [
  ['Either', /Either/],
  ['fromNullable', /\bfromNullable\b/],
  ['catchAll', /\bcatchAll\b/],
  ['Effect.either', /\bEffect\.either\b/],
  ['Context.Tag', /\bContext\.Tag\b/],
  ['GenericTag', /\bGenericTag\b/],
  ['Effect.Service', /\bEffect\.Service\b/],
  ['decodeUnknown(', /\bdecodeUnknown\(/],
]

// Что не так с TS-блоком (пустой список — всё так): типы стираются без ошибки (режим strip, то есть
// только стираемый синтаксис, как у `node block.ts`), импорт одной строкой только из 'effect',
// без export и без await верхнего уровня, а то, что осталось после удаления import, разбирается как скрипт.
// await вне фигурных скобок — верхний уровень: скрипт не всегда падает на нём, `await (x)` для него вызов функции await.
const topLevelAwait = (code) => {
  let depth = 0
  for (const [token] of code.matchAll(/[{}]|(?<![\w$.])await(?![\w$])/g)) {
    if (token === '{') depth++
    else if (token === '}') depth--
    else if (depth === 0) return true
  }
  return false
}

const tsProblems = (code) => {
  let js
  try {
    js = module.stripTypeScriptTypes(code)
  } catch (error) {
    return [`типы не стираются: ${error.code ?? error.name}`]
  }
  const problems = code
    .split('\n')
    .filter((line) => IMPORT_LINE.test(line) && !EFFECT_IMPORT.test(line))
    .map((line) => `импорт не одной строкой из 'effect': ${line.trim()}`)
  const body = js
    .split('\n')
    .filter((line) => !IMPORT_LINE.test(line))
    .join('\n')
  if (/(^|[^\w$.])export\b/.test(scan(body).code)) problems.push('есть export')
  if (topLevelAwait(scan(body).code)) problems.push('есть await верхнего уровня')
  try {
    new vm.Script(body)
  } catch (error) {
    problems.push(`после стирания типов не разбирается: ${error.message}`)
  }
  return problems
}

const v3Names = (code) => {
  const bare = scan(code).code
  return V3_NAMES.filter(([, pattern]) => pattern.test(bare)).map(([name]) => name)
}

const tsBlocks = codeBlocks.filter(({ block }) => block.lang !== undefined)

test('TS-блоки: lang бывает только "ts" и только в уроке про Effect', () => {
  const bad = tsBlocks.filter(({ block, lesson }) => block.lang !== 'ts' || lesson.slug !== TS_LESSON).map(({ id }) => id)
  assert.deepEqual(
    bad,
    [],
    'TypeScript-блок вне урока про Effect или с другим lang: без решения владельца код курса остаётся JavaScript',
  )
})

test(`TS-блоки: в уроке ${TS_LESSON} от 3 до 5 блоков lang "ts"`, () => {
  const lesson = sections.find((s) => s.slug === TS_LESSON)
  assert.ok(lesson, `урока ${TS_LESSON} нет в курсе`)
  const count = lesson.blocks.filter((b) => b.type === 'code' && b.lang === 'ts').length
  assert.ok(count >= 3 && count <= 5, `в уроке ${count} TS-блоков, по правилам курса нужно от 3 до 5`)
})

test('TS-блоки: не помечены pseudo и noRun', () => {
  const bad = tsBlocks.filter(({ block }) => block.pseudo || block.noRun).map(({ id }) => id)
  assert.deepEqual(bad, [], 'TS-блок не должен занимать место в утверждённых списках pseudo и noRun: он не запускается по своему lang')
})

test('TS-блоки: у упражнений нет lang, они на чистом JavaScript', () => {
  const bad = sections.flatMap((s) => exercisesOf(s).flatMap((e, k) => ('lang' in e ? [`${s.slug}#${k + 1}`] : [])))
  assert.deepEqual(bad, [], 'упражнение с TypeScript не откроется в песочнице: кнопка запуска приведёт к ошибке')
})

for (const { id, block } of tsBlocks) {
  for (const v of VARIANTS) {
    test(`TS-блок ${id} ${v}: типы стираются, импорт только из 'effect', код разбирается`, () => {
      assert.deepEqual(tsProblems(block.code[v]), [], `TS-блок ${id} (${v}) нельзя скопировать и запустить как TypeScript`)
    })

    test(`TS-блок ${id} ${v}: нет имён Effect 3`, () => {
      assert.deepEqual(v3Names(block.code[v]), [], `TS-блок ${id} (${v}) показывает API Effect 3, а урок написан про Effect 4`)
    })
  }
}

test('tsProblems: строка import из "effect" принимается', () => {
  assert.deepEqual(tsProblems('import { Effect, pipe } from "effect"\nconst a: number = 1\n'), [])
  assert.deepEqual(tsProblems("import { Effect } from 'effect'\nEffect.succeed(1)\n"), [])
})

test('tsProblems: ошибка синтаксиса TypeScript замечается', () => {
  assert.ok(tsProblems('const a: = 1\n').length > 0, 'сломанный TS-блок прошёл бы тест')
})

test('tsProblems: импорт не из "effect" замечается', () => {
  assert.ok(tsProblems("import { pipe } from 'fp-ts/function'\npipe(1)\n").length > 0, 'блок с fp-ts прошёл бы тест')
})

test('tsProblems: импорт в несколько строк замечается', () => {
  assert.ok(tsProblems("import {\n  Effect,\n} from 'effect'\nEffect.succeed(1)\n").length > 0, 'читатель не скопирует такой импорт одной строкой')
})

test('tsProblems: export замечается', () => {
  assert.ok(tsProblems('export const a = 1\n').length > 0, 'блок с export не запустить как скрипт')
})

test('tsProblems: await верхнего уровня замечается', () => {
  assert.ok(tsProblems('await Promise.resolve(1)\n').length > 0, 'блок с await верхнего уровня не запустить как скрипт')
  assert.ok(tsProblems('console.log(await (Promise.resolve(1)))\n').length > 0, 'await со скобкой скрипт принял бы за вызов функции')
})

test('tsProblems: await внутри async-функции проходит', () => {
  assert.deepEqual(tsProblems('const f = async () => {\n  await Promise.resolve(1)\n}\nf()\n'), [])
})

test('tsProblems: код Effect 4 с типами, generator и TaggedError проходит', () => {
  const code = [
    "import { Data, Effect } from 'effect'",
    "class Oops extends Data.TaggedError('Oops')<{ readonly why: string }> {}",
    'const program: Effect.Effect<number, Oops> = Effect.gen(function* () {',
    '  return (yield* Effect.succeed(1)) as number',
    '})',
    'Effect.runPromise(program).then(console.log)',
  ].join('\n')
  assert.deepEqual(tsProblems(code), [])
})

test('v3Names: Effect.catchAll находится', () => {
  assert.ok(v3Names('Effect.catchAll(f)').includes('catchAll'), 'замена Effect.catch на Effect.catchAll не покраснит тест')
})

test('v3Names: остальные имена Effect 3 находятся', () => {
  const found = [
    'Either.right(1)',
    'Option.fromNullable(x)',
    'Effect.either(e)',
    'class A extends Context.Tag("A")<A, {}>() {}',
    'Context.GenericTag("A")',
    'class A extends Effect.Service<A>()("A", {}) {}',
    'Schema.decodeUnknown(User)(raw)',
    'Schema.decodeUnknownEither(User)(raw)',
  ].map((code) => v3Names(code).length)
  assert.deepEqual(found, [1, 1, 1, 1, 1, 1, 1, 1], 'имя из Effect 3 прошло бы в урок про Effect 4')
})

test('v3Names: имена Effect 4 не принимаются за Effect 3', () => {
  assert.deepEqual(v3Names('Effect.catch(f)'), [])
  assert.deepEqual(v3Names('Schema.decodeUnknownEffect(User)'), [])
  assert.deepEqual(v3Names('Option.fromNullishOr(x)'), [])
  assert.deepEqual(v3Names('Effect.result(e)'), [])
})

test('v3Names: имя в комментарии и в строке не считается', () => {
  assert.deepEqual(v3Names('// бывший Either\nconst a = 1'), [])
  assert.deepEqual(v3Names("const s = 'catchAll'"), [])
})

// ---------- урок fp-in-typescript-and-effect: голос, ссылки, факты ----------

const fpLesson = () => {
  const lesson = sections.find((s) => s.slug === TS_LESSON)
  assert.ok(lesson, `урока ${TS_LESSON} нет в курсе`)
  return lesson
}

// Тексты и комментарии кода урока, без ожидаемого вывода.
const lessonProse = (lesson) => [
  ...textFields(lesson).filter(({ kind }) => kind !== 'output'),
  ...codeComments()
    .filter(({ where }) => where.startsWith(lesson.slug))
    .map((item) => ({ ...item, v: item.where.endsWith(' ru') ? 'ru' : 'en' })),
]

// Всё, что читает человек в уроке, вместе с кодом блоков и упражнений (комментарии — в составе кода, один раз).
const lessonEverything = (lesson, v) => [
  ...textFields(lesson).filter((item) => item.kind !== 'output' && item.v === v).map(({ text }) => text),
  ...lesson.blocks.flatMap((b) => (b.type === 'code' ? [b.code[v]] : [])),
  ...exercisesOf(lesson).flatMap((e) => [e.starter?.[v], e.solution?.[v]].filter((code) => typeof code === 'string')),
]

for (const v of VARIANTS) {
  test(`урок ${TS_LESSON}: описание ${v} от 110 до 160 знаков`, () => {
    const value = fpLesson().description?.[v]
    assert.equal(typeof value, 'string', `у урока нет описания (${v})`)
    assert.ok(value.length >= 110 && value.length <= 160, `описание (${v}) ${value.length} знаков, нужно 110–160`)
  })

  test(`урок ${TS_LESSON}: в описании ${v} есть JavaScript и Effect`, () => {
    const value = String(fpLesson().description?.[v] ?? '')
    assert.ok(value.includes('JavaScript') && value.includes('Effect'), `в описании (${v}) должны быть слова JavaScript и Effect: «${value}»`)
  })
}

test(`урок ${TS_LESSON}: в ru нет первого лица`, () => {
  const first = /(?<!\p{L})(я|мне|меня|мой|моя|моё|мои|моих)(?!\p{L})/iu
  const bad = lessonProse(fpLesson())
    .filter(({ v, text }) => v === 'ru' && first.test(text))
    .map(({ where, text }) => `${where}: ${around(text, text.search(first))}`)
  assert.deepEqual(bad, [], 'в уроке под именем автора голос от первого лица: решено писать нейтрально')
})

test(`урок ${TS_LESSON}: в en нет I, my, me`, () => {
  const bad = lessonProse(fpLesson())
    .filter(({ v, text }) => v === 'en' && (/\bI\b/.test(text) || /\b(my|me)\b/i.test(text)))
    .map(({ where }) => where)
  assert.deepEqual(bad, [], 'в английском тексте урока голос от первого лица: решено писать нейтрально')
})

test(`урок ${TS_LESSON}: нет http и www в текстах и коде`, () => {
  const lesson = fpLesson()
  const bad = VARIANTS.flatMap((v) => lessonEverything(lesson, v).filter((text) => /https?:\/\/|www\./i.test(text)).map((text) => `${v}: ${text.slice(0, 40)}`))
  assert.deepEqual(bad, [], 'в уроке есть ссылка: по решению ссылок нет, адрес effect.website только текстом')
})

for (const v of VARIANTS) {
  test(`урок ${TS_LESSON}: effect.website встречается не больше одного раза (${v})`, () => {
    const lesson = fpLesson()
    const count = lessonEverything(lesson, v).reduce((sum, text) => sum + (text.match(/effect\.website/g) ?? []).length, 0)
    assert.ok(count <= 1, `effect.website встречается ${count} раз (${v}), по решению не больше одного`)
  })
}

const FACTS = {
  ru: ['4.0.0', '1 октября 2026 года', 'по данным реестра npm на октябрь 2026 года', '2.16.11', '18 августа 2025 года'],
  en: ['4.0.0', 'October 1, 2026', 'according to the npm registry as of October 2026', '2.16.11', 'August 18, 2025'],
}

for (const v of VARIANTS) {
  test(`урок ${TS_LESSON} и selecting-library: версии и даты совпадают (${v})`, () => {
    const lessons2 = [fpLesson(), sections.find((s) => s.slug === 'selecting-library')]
    const missing = lessons2.flatMap((lesson) => {
      const text = textFields(lesson)
        .filter((item) => item.v === v)
        .map((item) => item.text)
        .join('\n')
      return FACTS[v].filter((fact) => !text.includes(fact)).map((fact) => `${lesson.slug}: «${fact}»`)
    })
    assert.deepEqual(missing, [], `версии и даты в двух уроках разошлись (${v}): читатель увидит разные сведения об Effect и fp-ts`)
  })
}

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

// ---------- ключи i18n ----------

const readLocale = (name) => JSON.parse(readFileSync(new URL(`../i18n/locales/${name}.json`, import.meta.url), 'utf8'))
const locales = { ru: readLocale('ru'), en: readLocale('en') }
const keysOf = (tree, prefix = '') =>
  Object.entries(tree).flatMap(([key, value]) =>
    typeof value === 'object' && value !== null ? keysOf(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  )

test('ключи i18n: ru.json и en.json совпадают на всех уровнях', () => {
  const ru = keysOf(locales.ru)
  const en = keysOf(locales.en)
  assert.deepEqual(
    { onlyRu: ru.filter((key) => !en.includes(key)), onlyEn: en.filter((key) => !ru.includes(key)) },
    { onlyRu: [], onlyEn: [] },
    'ключ есть только в одной локали: на другой языке читатель увидит имя ключа вместо текста',
  )
})

test('ключи i18n: ключи course.* для навигации, упражнений, песочницы, страниц уроков и прогресса есть в ru.json и en.json', () => {
  const missing = VARIANTS.flatMap((v) =>
    NEW_KEYS.filter((key) => typeof locales[v].course?.[key] !== 'string').map((key) => `${v}: course.${key}`),
  )
  assert.deepEqual(missing, [], 'без этих ключей кнопки, подписи и ссылки курса выведут имена ключей')
})

test('ключи i18n: новые строки course.* не пустые и без «|» и «@» (спецсимволов vue-i18n)', () => {
  const bad = VARIANTS.flatMap((v) =>
    NEW_KEYS.flatMap((key) => {
      const value = locales[v].course?.[key]
      if (typeof value !== 'string') return []
      return !value.trim() || /[|@]/.test(value) ? [`${v}: course.${key}`] : []
    }),
  )
  assert.deepEqual(bad, [], 'vue-i18n разберёт «|» как множественное число, а «@» как ссылку на другой ключ')
})

// ---------- описание и название урока: строка под названием в оглавлении и meta description страницы ----------

const DESCRIPTION_MAX = 160

for (const lesson of numbered) {
  test(`урок ${lesson.slug}: описание`, () => {
    const problems = VARIANTS.flatMap((v) => {
      const value = lesson.description?.[v]
      if (typeof value !== 'string' || !value.trim()) return [`описание (${v}) пусто`]
      return [
        ...(value.length > DESCRIPTION_MAX ? [`описание (${v}) длиннее ${DESCRIPTION_MAX} знаков: ${value.length}`] : []),
        ...(/[\r\n]/.test(value) ? [`в описании (${v}) есть перевод строки`] : []),
      ]
    })
    assert.deepEqual(
      problems,
      [],
      'под названием урока в оглавлении пусто, а у страницы урока нет своего meta description, который поисковик не обрежет',
    )
  })
}

// Совпадения в списке { who, text }: текст -> кто его повторяет. Пустой текст тоже повтор: «нет описания».
const repeats = (items) => {
  const byText = new Map()
  for (const { who, text } of items) byText.set(text, [...(byText.get(text) ?? []), who])
  return [...byText].filter(([, whos]) => whos.length > 1).map(([text, whos]) => `${whos.join(', ')}: «${text.slice(0, 50) || 'нет описания'}»`)
}

for (const v of VARIANTS) {
  test(`описания уроков не повторяются и не совпадают с тизером курса на главной (${v})`, () => {
    const teaser = locales[v].course?.desc
    const found = repeats([
      ...numbered.map((lesson) => ({ who: lesson.slug, text: String(lesson.description?.[v] ?? '').trim() })),
      ...(typeof teaser === 'string' ? [{ who: 'course.desc', text: teaser.trim() }] : []),
    ])
    assert.deepEqual(found, [], 'у разных страниц одинаковое описание: в поиске и в оглавлении они неотличимы, а поисковик склеит их')
  })

  test(`названия уроков не повторяются (${v})`, () => {
    const found = repeats(numbered.map((lesson) => ({ who: lesson.slug, text: String(lesson.title?.[v] ?? '').trim().toLowerCase() })))
    assert.deepEqual(found, [], 'два урока с одним названием: читатель не отличит их в оглавлении, а у страниц будет один title')
  })
}
