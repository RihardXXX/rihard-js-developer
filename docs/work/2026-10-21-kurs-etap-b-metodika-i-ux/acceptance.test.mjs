// Приёмка этапа B по собранному сайту: сначала соберите сайт (npm run generate),
// затем `node --test <этот файл>`. Страницы читаются из .output/public, данные курса — из app/data.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import module from 'node:module'
import { gzipSync } from 'node:zlib'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve } from 'node:path'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../..')
const PUBLIC = resolve(ROOT, '.output/public')
const HOST = 'https://rihard-developer.ru'

// Уроки лежат в app/data/lessons/*.ts, в course.ts импорты без расширения: дописываем .ts.
module.registerHooks({
  resolve: (specifier, context, next) =>
    next(/^\.\.?\//.test(specifier) && !/\.\w+$/.test(specifier) ? `${specifier}.ts` : specifier, context),
})
const course = await import(pathToFileURL(resolve(ROOT, 'app/data/course.ts')).href)
const lessons = course.lessons
const introSections = course.introSections
const sections = [...introSections, ...lessons]

const readLocale = (name) => JSON.parse(readFileSync(resolve(ROOT, `i18n/locales/${name}.json`), 'utf8'))
const i18n = { ru: readLocale('ru'), en: readLocale('en') }

// ---------- эталоны ----------

const INTRO = ['for-whom', 'not-for-whom']
// Утверждённый порядок 18 уроков: номера 01–18 в оглавлении идут в этом порядке.
const LESSON_ORDER = [
  'imperative-vs-declarative',
  'functional-programming',
  'first-class-and-higher-order-functions',
  'pure-functions',
  'hindley-milner-type-notation',
  'composition',
  'currying',
  'partial-application',
  'currying-and-asynchrony',
  'recursion',
  'function-map-filter-reduce',
  'performance',
  'lenses',
  'side-effects-in-composition-functions',
  'category-theory',
  'fantasy-land',
  'neural-networks',
  'selecting-library',
]
const ALL_SLUGS = [...INTRO, ...LESSON_ORDER]
// 18 уроков из данных, в утверждённом порядке (чего нет в данных, того нет и здесь).
const numbered = LESSON_ORDER.flatMap((slug) => sections.filter((s) => s.slug === slug))

// Подписи, которые видит читатель. По-русски — слова из задания, по-английски — из en.json.
const RU_LABELS = { goal: 'Цель урока', summary: 'Главное', showSolution: 'Показать решение' }

const PAGES = [
  { where: '/course/', file: 'course/index.html', locale: 'en', lang: 'en-US' },
  { where: '/ru/course/', file: 'ru/course/index.html', locale: 'ru', lang: 'ru-RU' },
]
const HOME_PAGES = [
  { where: '/', file: 'index.html' },
  { where: '/ru/', file: 'ru/index.html' },
]

// Первая строка редактора песочницы до первого взаимодействия.
const INITIAL_CODE_FIRST_LINE = '// Доступные библиотеки — в чипах выше. Добавляй свои кнопкой «+».'

// Фразы из первого урока: по ним видно, чьи тексты лежат в JS страницы и в payload.
const PHRASE = { ru: 'Императивный код говорит вам', en: 'Imperative code tells you' }

// Следы библиотек песочницы в собранном JS. Пока ramda, sanctuary и загрузчик Monaco
// импортируются статически, все они лежат в предзагружаемом чанке страницы курса.
const MARKERS = {
  ramda: ['@@functional/placeholder'],
  sanctuary: ['sanctuary-def/Type@1'],
  '@monaco-editor/loader': ['operation is manually canceled', 'cdn.jsdelivr.net/npm/monaco-editor'],
}

// Вес JS в предзагрузке страниц курса до этапа B (на обеих страницах один набор чанков), байты.
const BASE_JS = { raw: 721963, gzip: 224193 }

// Эталоны сняты со сборки до этапа B: узлы Person, WebSite и WebPage не должны измениться.
const PERSON = {
  '@id': 'https://rihard-developer.ru/#identity',
  '@type': 'Person',
  alternateName: 'Rihard Alikhanov',
  email: 'yusupa.akaeva@yandex.ru',
  jobTitle: 'Fullstack JavaScript Developer',
  name: 'Рихард Алиханов',
  url: 'https://rihard-developer.ru',
  image: { '@id': 'https://rihard-developer.ru/#/schema/image/1' },
  knowsAbout: [
    'Effect-TS',
    'Functional Programming',
    'Vue.js',
    'Nuxt',
    'React',
    'Node.js',
    'TypeScript',
    'JavaScript',
    'GraphQL',
    'SSR',
    'AI-assisted development',
    'Claude Code',
    'Multi-agent orchestration',
    'Model Context Protocol',
    'Agent Skills',
    'Claude API',
    'OpenAI Codex',
  ],
  sameAs: [
    'https://github.com/RihardXXX',
    'https://t.me/FrontendDeveloper05',
    'https://vk.com/github05',
  ],
}

const WEBSITE = {
  en: {
    '@id': 'https://rihard-developer.ru/#website',
    '@type': 'WebSite',
    inLanguage: 'en-US',
    name: 'Rihard Alikhanov — Fullstack JavaScript Engineer (Vue, Nuxt, React, Node)',
    url: 'https://rihard-developer.ru/',
    publisher: { '@id': 'https://rihard-developer.ru/#identity' },
    workTranslation: [
      { '@id': 'https://rihard-developer.ru/#website' },
      { '@id': 'https://rihard-developer.ru/ru/#website' },
    ],
  },
  ru: {
    '@id': 'https://rihard-developer.ru/#website',
    '@type': 'WebSite',
    inLanguage: 'ru-RU',
    name: 'Рихард Алиханов — Fullstack JavaScript разработчик (Vue, Nuxt, React, Node)',
    url: 'https://rihard-developer.ru/',
    publisher: { '@id': 'https://rihard-developer.ru/#identity' },
    translationOfWork: { '@id': 'https://rihard-developer.ru/#website' },
  },
}

const WEBPAGE = {
  '/': {
    '@id': 'https://rihard-developer.ru/#webpage',
    '@type': 'WebPage',
    description:
      'Fullstack JavaScript engineer, 10+ years. Focus: Effect-TS and functional backends in TypeScript. AI-agent development (Claude Code, MCP). Vue, Nuxt.',
    name: 'Rihard Alikhanov — Fullstack JavaScript Engineer (Vue, Nuxt, React, Node)',
    url: 'https://rihard-developer.ru/',
    about: { '@id': 'https://rihard-developer.ru/#identity' },
    isPartOf: { '@id': 'https://rihard-developer.ru/#website' },
    potentialAction: [{ '@type': 'ReadAction', target: ['https://rihard-developer.ru/'] }],
  },
  '/ru/': {
    '@id': 'https://rihard-developer.ru/ru/#webpage',
    '@type': 'WebPage',
    description:
      'Fullstack JavaScript разработчик, 10+ лет. Фокус — Effect-TS и функциональный бэкенд на TypeScript; разработка с ИИ-агентами (Claude Code, MCP). Vue, Nuxt.',
    name: 'Рихард Алиханов — Fullstack JavaScript разработчик (Vue, Nuxt, React, Node)',
    url: 'https://rihard-developer.ru/ru/',
    about: { '@id': 'https://rihard-developer.ru/#identity' },
    isPartOf: { '@id': 'https://rihard-developer.ru/ru/#website' },
    potentialAction: [{ '@type': 'ReadAction', target: ['https://rihard-developer.ru/ru/'] }],
  },
  '/course/': {
    '@id': 'https://rihard-developer.ru/course/#webpage',
    '@type': 'WebPage',
    description:
      'A course with a code editor right in the browser: write and run examples in plain JS with the ramda and sanctuary libraries. FP explained in practice.',
    name: 'Interactive course on functional programming in JS',
    url: 'https://rihard-developer.ru/course/',
    about: { '@id': 'https://rihard-developer.ru/#identity' },
    isPartOf: { '@id': 'https://rihard-developer.ru/#website' },
    potentialAction: [{ '@type': 'ReadAction', target: ['https://rihard-developer.ru/course/'] }],
  },
  '/ru/course/': {
    '@id': 'https://rihard-developer.ru/ru/course/#webpage',
    '@type': 'WebPage',
    description:
      'Курс с редактором кода прямо в браузере: пишешь и запускаешь примеры на чистом JS с библиотеками ramda и sanctuary. Объясняю ФП на практике.',
    name: 'Интерактивный курс по функциональному программированию на JS',
    url: 'https://rihard-developer.ru/ru/course/',
    about: { '@id': 'https://rihard-developer.ru/#identity' },
    isPartOf: { '@id': 'https://rihard-developer.ru/ru/#website' },
    potentialAction: [{ '@type': 'ReadAction', target: ['https://rihard-developer.ru/ru/course/'] }],
  },
}

// Адреса из sitemap: две карты по локалям и четыре страницы. Новых URL курс не добавляет.
const SITEMAP_LOCS = [
  `${HOST}/`,
  `${HOST}/__sitemap__/en-US.xml`,
  `${HOST}/__sitemap__/ru-RU.xml`,
  `${HOST}/course/`,
  `${HOST}/ru/`,
  `${HOST}/ru/course/`,
]

// SEO страниц курса не должен измениться (литералы те же, что в приёмке прошлого этапа).
const SEO = {
  en: {
    title: 'Interactive course on functional programming in JS · Rihard Alikhanov',
    description:
      'A course with a code editor right in the browser: write and run examples in plain JS with the ramda and sanctuary libraries. FP explained in practice.',
    canonical: `${HOST}/course/`,
  },
  ru: {
    title: 'Интерактивный курс по функциональному программированию на JS · Рихард Алиханов',
    description:
      'Курс с редактором кода прямо в браузере: пишешь и запускаешь примеры на чистом JS с библиотеками ramda и sanctuary. Объясняю ФП на практике.',
    canonical: `${HOST}/ru/course/`,
  },
}
const HREFLANG = {
  'x-default': `${HOST}/course/`,
  en: `${HOST}/course/`,
  'en-US': `${HOST}/course/`,
  ru: `${HOST}/ru/course/`,
  'ru-RU': `${HOST}/ru/course/`,
}

// ---------- разбор HTML сборки ----------

const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'])
const RAW = new Set(['script', 'style'])
const TOKEN =
  /<!--[\s\S]*?-->|<!doctype[^>]*>|<\/([a-zA-Z][^\s>]*)\s*>|<([a-zA-Z][^\s/>]*)((?:\s+[^\s=>/]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+))?)*)\s*(\/?)>/gi
const ATTR = /([^\s=>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g

const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')

// Дерево элементов: { tag, attrs, children, parent }; текст — узлы { tag: '#text', text }.
const parse = (html) => {
  const root = { tag: '#root', attrs: {}, children: [], parent: null }
  let cur = root
  let last = 0
  const pushText = (text) => {
    if (text) cur.children.push({ tag: '#text', text: decode(text), parent: cur })
  }
  TOKEN.lastIndex = 0
  for (let m; (m = TOKEN.exec(html)); ) {
    pushText(html.slice(last, m.index))
    last = TOKEN.lastIndex
    if (m[1]) {
      const name = m[1].toLowerCase()
      for (let n = cur; n && n.tag !== '#root'; n = n.parent) {
        if (n.tag === name) {
          cur = n.parent
          break
        }
      }
    } else if (m[2]) {
      const tag = m[2].toLowerCase()
      const attrs = {}
      for (const a of m[3].matchAll(ATTR)) attrs[a[1].toLowerCase()] = decode(a[2] ?? a[3] ?? a[4] ?? '')
      const node = { tag, attrs, children: [], parent: cur }
      cur.children.push(node)
      if (RAW.has(tag)) {
        const end = html.toLowerCase().indexOf(`</${tag}`, last)
        const stop = end < 0 ? html.length : end
        node.children.push({ tag: '#text', text: html.slice(last, stop), parent: node })
        const close = html.indexOf('>', stop)
        last = TOKEN.lastIndex = close < 0 ? html.length : close + 1
      } else if (!VOID.has(tag) && !m[4]) cur = node
    }
  }
  pushText(html.slice(last))
  return root
}

const walk = (node, fn) => {
  for (const child of node.children ?? []) {
    fn(child)
    walk(child, fn)
  }
}
// Элементы поддерева в порядке документа.
const all = (node, pred) => {
  const found = []
  walk(node, (n) => n.tag !== '#text' && pred(n) && found.push(n))
  return found
}
const classesOf = (n) => (n.attrs.class ?? '').split(/\s+/).filter(Boolean)
const hasClass = (n, name) => classesOf(n).includes(name)
const byTag = (node, tag) => all(node, (n) => n.tag === tag)
const byClass = (node, name) => all(node, (n) => hasClass(n, name))
const byId = (node, id) => all(node, (n) => n.attrs.id === id)
const textOf = (n) => (n.tag === '#text' ? n.text : n.children.map(textOf).join(''))
const flat = (n) => textOf(n).replace(/\s+/g, ' ').trim()
const isHeading = (n) => /^h[1-6]$/.test(n.tag)
const levelOf = (n) => Number(n.tag[1])
const fromHref = (n) => (n.attrs.href ?? '').replace(/^#/, '')

const readPublic = (rel) => {
  const file = resolve(PUBLIC, rel)
  if (!existsSync(file)) {
    throw new Error(`нет собранного сайта: ${file} не найден, сначала соберите сайт (npm run generate)`)
  }
  return readFileSync(file)
}

const pages = new Map()
// Страница из сборки: разобрана один раз; order — позиция узла в документе.
const load = (file) => {
  if (!pages.has(file)) {
    const html = readPublic(file).toString('utf8')
    const doc = parse(html)
    const order = new Map()
    let i = 0
    walk(doc, (n) => order.set(n, i++))
    pages.set(file, { html, doc, order })
  }
  return pages.get(file)
}

const sectionOf = (doc, slug) => byId(doc, slug).find((n) => n.tag === 'section')
const lessonSections = (doc) => LESSON_ORDER.map((slug) => ({ slug, section: sectionOf(doc, slug) }))
const titleOf = (slug, locale) => sections.find((s) => s.slug === slug).title[locale]
const tocOf = (doc) => {
  const [toc] = byId(doc, 'course-toc')
  assert.ok(toc, 'на странице нет оглавления с id="course-toc": ссылке «К содержанию» некуда вести')
  return toc
}
// Ссылки оглавления: [{ slug, num, text }] в порядке страницы.
const tocLinks = (doc) =>
  all(tocOf(doc), (n) => n.tag === 'a' && (n.attrs.href ?? '').startsWith('#')).map((a) => {
    const m = flat(a).match(/^(\d+)\s+(.*)$/)
    return { slug: fromHref(a), num: m?.[1], text: m?.[2] ?? flat(a) }
  })

const label = (locale, key) => {
  if (locale === 'ru') return RU_LABELS[key]
  const value = i18n[locale].course?.[key]
  assert.equal(typeof value, 'string', `в ${locale}.json нет course.${key}`)
  return value
}

// JS, который браузер скачивает до первого взаимодействия: modulepreload (и prefetch), входной скрипт.
const preloadedChunks = (doc) => {
  const hrefs = new Set([
    ...all(
      doc,
      (n) =>
        n.tag === 'link' &&
        (n.attrs.rel === 'modulepreload' || (n.attrs.rel === 'prefetch' && (n.attrs.href ?? '').split('?')[0].endsWith('.js'))),
    ).map((n) => n.attrs.href),
    ...all(doc, (n) => n.tag === 'script' && n.attrs.type === 'module' && n.attrs.src).map((n) => n.attrs.src),
  ])
  return [...hrefs].map((href) => {
    const bytes = readPublic(`.${href.split('?')[0]}`)
    return { href, bytes, content: bytes.toString('utf8') }
  })
}

const graphOf = (doc) =>
  all(doc, (n) => n.tag === 'script' && n.attrs.type === 'application/ld+json').flatMap((script) => {
    const json = JSON.parse(textOf(script))
    return json['@graph'] ?? [json]
  })
const typesOf = (node) => [].concat(node['@type'])
const nodesOfType = (graph, type) => graph.filter((n) => typesOf(n).includes(type))

// Код блоков урока: id `.cb` задаёт номер блока среди блоков кода урока (псевдокод считается), id упражнений — их номер.
const expectedCodeIds = () =>
  sections.flatMap((s) => {
    let n = 0
    const blocks = s.blocks.flatMap((b) => {
      if (b.type !== 'code') return []
      n += 1
      return [{ id: `${s.slug}-code-${n}`, pseudo: !!b.pseudo, noRun: !!b.noRun }]
    })
    const exercises = (s.exercises ?? []).flatMap((exercise, i) => [
      ...(exercise.starter ? [{ id: `${s.slug}-exercise-${i + 1}-starter`, pseudo: false, noRun: false }] : []),
      { id: `${s.slug}-exercise-${i + 1}-solution`, pseudo: false, noRun: false },
    ])
    return [...blocks, ...exercises]
  })

const accessibleName = (button) => (button.attrs['aria-label'] ?? '').trim() || flat(button)

const run = (script, args) =>
  new Promise((done) => {
    execFile(process.execPath, [resolve(ROOT, 'scripts', script), ...args], (error, stdout, stderr) => {
      done({ code: error ? error.code : 0, out: `${stdout}${stderr}` })
    })
  })

test('сборка на месте: .output/public существует', () => {
  assert.ok(existsSync(PUBLIC), `нет собранного сайта: ${PUBLIC} не найден, сначала соберите сайт (npm run generate)`)
})

// ---------- порядок уроков и вводные разделы в данных ----------

test('данные курса: 18 уроков идут в утверждённом порядке', () => {
  assert.deepEqual(
    lessons.map((l) => l.slug),
    LESSON_ORDER,
    'порядок или состав нумерованных уроков не совпадает с утверждённым',
  )
})

test('данные курса: вводные разделы — for-whom и not-for-whom', () => {
  assert.deepEqual(
    introSections.map((s) => s.slug),
    INTRO,
    'в course.ts нет introSections с «Для кого» и «Кому не подойдёт»',
  )
})

// ---------- якоря и оглавление ----------

for (const { where, file } of PAGES) {
  test(`${where}: у каждого из 20 slug ровно один элемент с таким id`, () => {
    const { doc } = load(file)
    const wrong = ALL_SLUGS.map((slug) => [slug, byId(doc, slug).length]).filter(([, n]) => n !== 1)
    assert.deepEqual(wrong, [], `ссылки ${where}#slug ведут не к одному уроку: slug и число элементов с таким id`)
  })

  test(`${where}: ровно один элемент с id="course-toc", и он не совпадает ни с одним slug`, () => {
    const { doc } = load(file)
    assert.equal(byId(doc, 'course-toc').length, 1, 'у оглавления должен быть один id="course-toc"')
    assert.ok(!ALL_SLUGS.includes('course-toc'), 'id оглавления совпал со slug урока')
  })

  test(`${where}: все id на странице уникальны`, () => {
    const { doc } = load(file)
    const ids = all(doc, (n) => 'id' in n.attrs).map((n) => n.attrs.id)
    const repeated = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))]
    assert.deepEqual(repeated, [], 'повторяющийся id ломает якоря и подписи aria')
  })

  test(`${where}: «Для кого» и «Кому не подойдёт» стоят до оглавления`, () => {
    const { doc, order } = load(file)
    const toc = order.get(tocOf(doc))
    const positions = INTRO.map((slug) => order.get(sectionOf(doc, slug)))
    assert.ok(positions.every((p) => p !== undefined && p < toc), 'вводные разделы должны идти до оглавления')
    assert.ok(positions[0] < positions[1], '«Для кого» должен идти раньше «Кому не подойдёт»')
  })

  test(`${where}: у вводных разделов нет номера`, () => {
    const { doc } = load(file)
    const numbered = INTRO.filter((slug) => {
      const section = sectionOf(doc, slug)
      return !section || byClass(section, 'lesson__num').length > 0
    })
    assert.deepEqual(numbered, [], 'вводный раздел отсутствует или выведен под номером урока')
  })

  test(`${where}: в оглавлении 18 ссылок на уроки в утверждённом порядке`, () => {
    const { doc } = load(file)
    assert.deepEqual(
      tocLinks(doc).map((l) => l.slug),
      LESSON_ORDER,
      'оглавление ведёт к урокам не в том порядке или не ко всем',
    )
  })

  test(`${where}: номера в оглавлении идут подряд от 01 до 18`, () => {
    const { doc } = load(file)
    assert.deepEqual(
      tocLinks(doc).map((l) => l.num),
      LESSON_ORDER.map((_, i) => String(i + 1).padStart(2, '0')),
      'номера в оглавлении не 01–18 подряд',
    )
  })

  test(`${where}: номер в заголовке урока совпадает с номером в оглавлении`, () => {
    const { doc } = load(file)
    const nums = new Map(tocLinks(doc).map((l) => [l.slug, l.num]))
    const wrong = lessonSections(doc).flatMap(({ slug, section }) => {
      const num = section && byClass(section, 'lesson__num')[0]
      const actual = num && flat(num)
      return actual === nums.get(slug) ? [] : [`${slug}: в заголовке ${actual}, в оглавлении ${nums.get(slug)}`]
    })
    assert.deepEqual(wrong, [], 'читатель видит разные номера одного урока')
  })
}

// ---------- заголовки ----------

for (const { where, file, locale } of PAGES) {
  test(`${where}: на странице один h1`, () => {
    assert.equal(byTag(load(file).doc, 'h1').length, 1)
  })

  test(`${where}: h2 «${i18n[locale].course.lessonsTitle}» стоит перед первым уроком`, () => {
    const { doc, order } = load(file)
    const text = i18n[locale].course.lessonsTitle
    const found = all(doc, (n) => n.tag === 'h2' && flat(n) === text)
    assert.equal(found.length, 1, `над уроками должен быть один h2 «${text}», найдено ${found.length}`)
    const first = order.get(sectionOf(doc, LESSON_ORDER[0]))
    assert.ok(order.get(found[0]) < first, `h2 «${text}» стоит после первого урока`)
  })

  test(`${where}: заголовки нумерованных уроков — h3`, () => {
    const { doc } = load(file)
    const wrong = lessonSections(doc).flatMap(({ slug, section }) => {
      const heading = section && all(section, isHeading)[0]
      return heading?.tag === 'h3' ? [] : [`${slug}: ${heading?.tag ?? 'нет заголовка'}`]
    })
    assert.deepEqual(wrong, [], 'урок должен начинаться с h3')
  })

  test(`${where}: заголовки вводных разделов — h2`, () => {
    const { doc } = load(file)
    const wrong = INTRO.flatMap((slug) => {
      const section = sectionOf(doc, slug)
      const heading = section && all(section, isHeading)[0]
      return heading?.tag === 'h2' ? [] : [`${slug}: ${heading?.tag ?? 'нет заголовка'}`]
    })
    assert.deepEqual(wrong, [], 'вводный раздел должен начинаться с h2 без номера')
  })

  test(`${where}: уровни заголовков идут без пропусков`, () => {
    const levels = all(load(file).doc, isHeading).map((h) => ({ level: levelOf(h), text: flat(h).slice(0, 40) }))
    const jumps = levels.flatMap((h, i) => (i > 0 && h.level - levels[i - 1].level > 1 ? [`h${levels[i - 1].level} -> h${h.level}: ${h.text}`] : []))
    assert.deepEqual(jumps, [], 'заголовки пропускают уровень, программы чтения с экрана теряют структуру')
  })
}

// ---------- ссылки «к содержанию» и «следующий урок» ----------

for (const { where, file, locale } of PAGES) {
  test(`${where}: в каждом из 18 уроков есть ссылка «К содержанию»`, () => {
    const { doc } = load(file)
    const without = lessonSections(doc)
      .filter(({ section }) => !section || !all(section, (n) => n.tag === 'a' && n.attrs.href === '#course-toc').length)
      .map(({ slug }) => slug)
    assert.deepEqual(without, [], 'в конце этих уроков нет ссылки обратно к оглавлению')
  })

  test(`${where}: в уроках 1–17 есть ссылка на следующий урок с его названием`, () => {
    const { doc } = load(file)
    const wrong = lessonSections(doc)
      .slice(0, -1)
      .flatMap(({ slug, section }, i) => {
        const next = LESSON_ORDER[i + 1]
        const link = section && all(section, (n) => n.tag === 'a' && n.attrs.href === `#${next}`)[0]
        return link && flat(link).includes(titleOf(next, locale)) ? [] : [`${slug} -> ${next}`]
      })
    assert.deepEqual(wrong, [], 'у этих уроков нет ссылки «Следующий урок: название»')
  })

  test(`${where}: в последнем уроке нет ссылки на следующий`, () => {
    const { doc } = load(file)
    const section = sectionOf(doc, LESSON_ORDER.at(-1))
    assert.ok(section, 'нет последнего урока')
    const links = all(section, (n) => n.tag === 'a' && ALL_SLUGS.includes(fromHref(n))).map((n) => n.attrs.href)
    assert.deepEqual(links, [], 'у последнего урока не должно быть «Следующего урока»')
  })

  test(`${where}: во вводных разделах нет ссылок «К содержанию» и «Следующий урок»`, () => {
    const { doc } = load(file)
    const found = INTRO.flatMap((slug) => {
      const section = sectionOf(doc, slug)
      return section
        ? all(section, (n) => n.tag === 'a' && (n.attrs.href === '#course-toc' || ALL_SLUGS.includes(fromHref(n)))).map(() => slug)
        : []
    })
    assert.deepEqual(found, [], 'вводный раздел — не урок, навигации у него нет')
  })
}

// ---------- сравнительная таблица ----------

const comparisonTable = () => {
  const block = sections.find((s) => s.slug === 'selecting-library').blocks.find((b) => b.type === 'table')
  assert.ok(block, 'в данных selecting-library нет блока table')
  return block
}

for (const { where, file, locale } of PAGES) {
  const tableOf = (doc) => {
    const section = sectionOf(doc, 'selecting-library')
    const [table] = section ? byTag(section, 'table') : []
    assert.ok(table, 'в уроке selecting-library нет <table>')
    return table
  }

  test(`${where}: таблица selecting-library имеет подпись <caption>`, () => {
    const caption = byTag(tableOf(load(file).doc), 'caption')[0]
    assert.ok(caption, 'у таблицы нет <caption>')
    assert.equal(flat(caption), comparisonTable().caption[locale])
  })

  test(`${where}: у таблицы th scope="col" по числу столбцов и th scope="row" по числу строк`, () => {
    const table = tableOf(load(file).doc)
    const block = comparisonTable()
    const scopes = (scope) => all(table, (n) => n.tag === 'th' && n.attrs.scope === scope).length
    assert.equal(scopes('col'), block.columns.length, 'число <th scope="col"> не равно числу столбцов')
    assert.equal(scopes('row'), block.rows.length, 'число <th scope="row"> не равно числу строк')
  })

  test(`${where}: обёртка таблицы получает фокус с клавиатуры (tabindex="0")`, () => {
    const wrapper = tableOf(load(file).doc).parent
    assert.equal(wrapper.attrs.tabindex, '0', 'на узком экране таблицу не прокрутить с клавиатуры')
  })

  test(`${where}: у обёртки таблицы есть доступное имя из подписи`, () => {
    const { doc } = load(file)
    const wrapper = tableOf(doc).parent
    const target = byId(doc, wrapper.attrs['aria-labelledby'] ?? '')[0]
    assert.ok(target, 'aria-labelledby обёртки не ведёт на существующий элемент')
    assert.equal(flat(target), comparisonTable().caption[locale])
  })
}

// ---------- JSON-LD ----------

for (const { where, file, locale, lang } of PAGES) {
  const courseNode = () => {
    const found = nodesOfType(graphOf(load(file).doc), 'Course')
    assert.equal(found.length, 1, `на ${where} должен быть один узел Course, найдено ${found.length}`)
    return found[0]
  }

  test(`${where}: в JSON-LD ровно один узел Course`, () => {
    courseNode()
  })

  test(`${where}: Course называется как курс и описан его description`, () => {
    const node = courseNode()
    assert.equal(node.name, i18n[locale].course.title)
    assert.equal(node.description, i18n[locale].course.desc)
  })

  test(`${where}: Course указывает язык страницы`, () => {
    const graph = graphOf(load(file).doc)
    const [site] = nodesOfType(graph, 'WebSite')
    assert.equal(courseNode().inLanguage, lang, 'язык курса не совпал с языком страницы')
    assert.equal(courseNode().inLanguage, site.inLanguage, 'язык курса не совпал с языком WebSite')
  })

  test(`${where}: Course ссылается на Person как на провайдера`, () => {
    const [person] = nodesOfType(graphOf(load(file).doc), 'Person')
    assert.equal(courseNode().provider?.['@id'], person['@id'], 'provider должен ссылаться на Person')
  })
}

for (const { where, file } of [...HOME_PAGES, ...PAGES]) {
  const locale = where.startsWith('/ru/') ? 'ru' : 'en'

  test(`${where}: узлы Person, WebSite и WebPage не изменились`, () => {
    const graph = graphOf(load(file).doc)
    const pick = (type) => {
      const found = nodesOfType(graph, type)
      assert.equal(found.length, 1, `в JSON-LD ${where} должен быть один узел ${type}`)
      return found[0]
    }
    assert.deepEqual(pick('Person'), PERSON, `узел Person на ${where} изменился`)
    assert.deepEqual(pick('WebSite'), WEBSITE[locale], `узел WebSite на ${where} изменился`)
    assert.deepEqual(pick('WebPage'), WEBPAGE[where], `узел WebPage на ${where} изменился`)
  })
}

for (const { where, file } of HOME_PAGES) {
  test(`${where}: узла Course на главной нет`, () => {
    assert.equal(nodesOfType(graphOf(load(file).doc), 'Course').length, 0)
  })
}

// ---------- ленивая загрузка и вес ----------

test('фразы-маркеры взяты из текстов первого урока (иначе проверки payload ничего не значат)', () => {
  const lesson = sections.find((s) => s.slug === LESSON_ORDER[0])
  for (const locale of ['ru', 'en']) {
    const texts = lesson.blocks.filter((b) => b.type === 'text').map((b) => b[locale])
    assert.ok(texts.some((t) => t.includes(PHRASE[locale])), `в уроке ${lesson.slug} нет фразы «${PHRASE[locale]}»`)
  }
})

for (const { where, file, locale } of PAGES) {
  for (const [name, needles] of Object.entries(MARKERS)) {
    test(`${where}: ${name} не входит в JS предзагрузки`, () => {
      const hits = preloadedChunks(load(file).doc)
        .filter(({ content }) => needles.some((needle) => content.includes(needle)))
        .map(({ href }) => href)
      assert.deepEqual(hits, [], `${name} грузится вместе со страницей, хотя нужен только песочнице`)
    })
  }

  test(`${where}: тексты уроков не входят в JS предзагрузки`, () => {
    const hits = preloadedChunks(load(file).doc)
      .filter(({ content }) => content.includes(PHRASE.ru) || content.includes(PHRASE.en))
      .map(({ href }) => href)
    assert.deepEqual(hits, [], 'тексты и код уроков лежат в предзагружаемом чанке, а не в payload своей локали')
  })

  test(`${where}: payload содержит тексты своей локали и не содержит чужие`, () => {
    const payload = readPublic(file.replace('index.html', '_payload.json')).toString('utf8')
    const other = locale === 'ru' ? 'en' : 'ru'
    assert.ok(payload.includes(PHRASE[locale]), `в payload ${where} нет текстов уроков`)
    assert.ok(!payload.includes(PHRASE[other]), `в payload ${where} лежат тексты чужой локали`)
  })

  test(`${where}: до взаимодействия в песочнице виден INITIAL_CODE в textarea`, () => {
    const areas = byClass(load(file).doc, 'playground__textarea').filter((n) => n.tag === 'textarea')
    assert.equal(areas.length, 1, `textarea.playground__textarea должна быть одна, найдено ${areas.length}`)
    // HTML отбрасывает первый перевод строки в textarea
    const value = textOf(areas[0]).replace(/^\n/, '')
    assert.equal(value.split('\n')[0], INITIAL_CODE_FIRST_LINE)
  })

  test(`${where}: JS предзагрузки легче, чем до этапа B (gzip)`, () => {
    const chunks = preloadedChunks(load(file).doc)
    const gzip = chunks.reduce((sum, { bytes }) => sum + gzipSync(bytes).length, 0)
    const raw = chunks.reduce((sum, { bytes }) => sum + bytes.length, 0)
    assert.ok(
      gzip < BASE_JS.gzip,
      `JS предзагрузки ${where}: ${gzip} байт gzip (${raw} без сжатия), до этапа B было ${BASE_JS.gzip} (${BASE_JS.raw})`,
    )
  })
}

// ---------- блоки кода, «Открыть в песочнице», доступность ----------

for (const { where, file } of PAGES) {
  const codeBlockOf = (doc, id) => byId(doc, id).find((n) => hasClass(n, 'cb'))

  test(`${where}: «Открыть в песочнице» есть у каждого запускаемого блока, заготовки и решения — и больше ни у кого`, () => {
    const { doc } = load(file)
    const actual = byClass(doc, 'cb')
      .filter((cb) => byClass(cb, 'cb__open').some((n) => n.tag === 'button'))
      .map((cb) => cb.attrs.id)
      .sort()
    const expected = expectedCodeIds()
      .filter(({ pseudo, noRun }) => !pseudo && !noRun)
      .map(({ id }) => id)
      .sort()
    assert.deepEqual(
      { missing: expected.filter((id) => !actual.includes(id)), extra: actual.filter((id) => !expected.includes(id)) },
      { missing: [], extra: [] },
      'кнопка должна быть у блоков без pseudo и noRun, а у псевдокода, DOM, сети и зависимых примеров её нет',
    )
  })

  test(`${where}: псевдокод выводится без подсветки JavaScript`, () => {
    const { doc } = load(file)
    const pseudo = expectedCodeIds().filter((b) => b.pseudo)
    assert.ok(pseudo.length > 0, 'в данных нет блоков pseudo')
    const wrong = pseudo.flatMap(({ id }) => {
      const cb = codeBlockOf(doc, id)
      if (!cb) return [`${id}: нет блока кода с таким id`]
      const highlighted = all(cb, (n) => classesOf(n).some((c) => c.startsWith('hljs-'))).length
      return highlighted ? [`${id}: ${highlighted} подсвеченных токенов`] : []
    })
    assert.deepEqual(wrong, [], 'блок псевдокода не найден по id или подсвечен как JavaScript, хотя это схема, а не код')
  })

  test(`${where}: каждый блок кода получает фокус с клавиатуры (tabindex="0")`, () => {
    const pres = byClass(load(file).doc, 'cb__pre').filter((n) => n.tag === 'pre')
    assert.ok(pres.length > 0, 'на странице нет блоков кода')
    const wrong = pres.filter((pre) => pre.attrs.tabindex !== '0').length
    assert.equal(wrong, 0, `${wrong} из ${pres.length} блоков кода не доходят до фокуса: длинный код не прокрутить с клавиатуры`)
  })

  test(`${where}: у каждого блока кода есть имя и роль, имена не повторяются`, () => {
    const pres = byClass(load(file).doc, 'cb__pre').filter((n) => n.tag === 'pre')
    assert.ok(pres.length > 0, 'на странице нет блоков кода')
    const names = pres.map((pre) => (pre.attrs['aria-label'] ?? '').trim())
    assert.equal(names.filter((name) => !name).length, 0, 'у блоков кода нет aria-label')
    assert.equal(pres.filter((pre) => !pre.attrs.role).length, 0, 'без role="group" имя блока кода не озвучивается')
    assert.deepEqual(
      [...new Set(names.filter((name, i) => names.indexOf(name) !== i))],
      [],
      'одинаковые имена блоков кода: читатель с экранным диктором не отличит «Пример 1» от «Пример 1»',
    )
  })

  test(`${where}: у кнопок на странице нет одинаковых доступных имён`, () => {
    const names = byTag(load(file).doc, 'button').map(accessibleName)
    const repeated = [...new Set(names.filter((name, i) => names.indexOf(name) !== i))]
    assert.deepEqual(repeated, [], '44 кнопки «Копировать» подряд неотличимы для экранного диктора')
  })

  test(`${where}: «Скопировано» объявляется через aria-live у каждого блока кода`, () => {
    const cbs = byClass(load(file).doc, 'cb')
    assert.ok(cbs.length > 0, 'на странице нет блоков кода')
    const wrong = cbs.filter((cb) => !byClass(cb, 'cb__status').some((n) => n.attrs['aria-live'] === 'polite')).length
    assert.equal(wrong, 0, `у ${wrong} из ${cbs.length} блоков кода нет области aria-live="polite" для «Скопировано»`)
  })

  test(`${where}: вывод песочницы объявляется через aria-live`, () => {
    const outputs = byClass(load(file).doc, 'playground__pre').filter((n) => n.tag === 'pre')
    assert.equal(outputs.length, 1, `вывод песочницы должен быть один, найдено ${outputs.length}`)
    assert.equal(outputs[0].attrs['aria-live'], 'polite', 'результат запуска не озвучивается')
  })
}

// ---------- цель, «главное», упражнения ----------

for (const { where, file, locale } of PAGES) {
  test(`${where}: у каждого из 18 уроков есть цель с подписью`, () => {
    const { doc } = load(file)
    const wrong = numbered.flatMap((lesson) => {
      const section = sectionOf(doc, lesson.slug)
      const goal = section && byClass(section, 'lesson__goal')[0]
      const text = goal && flat(goal)
      return text?.includes(label(locale, 'goal')) && text.includes(lesson.goal?.[locale] ?? '\u0000') ? [] : [lesson.slug]
    })
    assert.deepEqual(wrong, [], 'у этих уроков под заголовком нет подписи цели и её текста')
  })

  test(`${where}: у каждого из 18 уроков есть заголовок «Главное» и список из 2–5 пунктов`, () => {
    const { doc, order } = load(file)
    const wrong = lessonSections(doc).flatMap(({ slug, section }) => {
      const heading = section && byTag(section, 'h4').find((h) => flat(h) === label(locale, 'summary'))
      if (!heading) return [`${slug}: нет h4 «${label(locale, 'summary')}»`]
      const list = all(section, (n) => n.tag === 'ul' && order.get(n) > order.get(heading))[0]
      const items = list ? list.children.filter((c) => c.tag === 'li').length : 0
      return items >= 2 && items <= 5 ? [] : [`${slug}: пунктов ${items}`]
    })
    assert.deepEqual(wrong, [], 'после «Главного» нет списка из 2–5 пунктов')
  })

  test(`${where}: упражнений в HTML столько же, сколько в данных, и все скрыты под <details>`, () => {
    const { doc } = load(file)
    const wrong = numbered.flatMap((lesson) => {
      const expected = (lesson.exercises ?? []).length
      const details = sectionOf(doc, lesson.slug) ? byTag(sectionOf(doc, lesson.slug), 'details').length : 0
      return expected >= 1 && details === expected ? [] : [`${lesson.slug}: в данных ${expected}, на странице ${details}`]
    })
    assert.deepEqual(wrong, [], 'у урока нет упражнений или их число на странице не совпадает с данными')
  })

  test(`${where}: в каждом <summary> «${label('ru', 'showSolution')}» и внутри <details> есть блок кода решения`, () => {
    const { doc } = load(file)
    const wrong = numbered.flatMap((lesson) => {
      const section = sectionOf(doc, lesson.slug)
      const details = section ? byTag(section, 'details') : []
      if (!details.length) return [`${lesson.slug}: нет <details>`]
      return details.flatMap((d, i) => {
        const summary = byTag(d, 'summary')[0]
        const problems = []
        if (!summary || !flat(summary).includes(label(locale, 'showSolution'))) problems.push('нет подписи на summary')
        if (!byClass(d, 'cb__pre').length) problems.push('нет блока кода решения')
        return problems.map((p) => `${lesson.slug} упражнение ${i + 1}: ${p}`)
      })
    })
    assert.deepEqual(wrong, [], 'решение должно открываться кнопкой «Показать решение» и показывать код')
  })

  test(`${where}: у вводных разделов нет цели, «Главного» и упражнений`, () => {
    const { doc } = load(file)
    const found = INTRO.flatMap((slug) => {
      const section = sectionOf(doc, slug)
      if (!section) return []
      return [
        ...(byClass(section, 'lesson__goal').length ? [`${slug}: цель`] : []),
        ...(byTag(section, 'details').length ? [`${slug}: упражнения`] : []),
        ...(byTag(section, 'h4').some((h) => flat(h) === label(locale, 'summary')) ? [`${slug}: «Главное»`] : []),
      ]
    })
    assert.deepEqual(found, [], 'вводный раздел — не урок, учебного аппарата у него нет')
  })
}

// ---------- прежнее не сломано: SEO, sitemap, проверки сборки ----------

for (const { where, file, locale } of PAGES) {

  test(`${where}: title не изменился`, () => {
    const title = byTag(load(file).doc, 'title')[0]
    assert.equal(title && flat(title), SEO[locale].title, `заголовок страницы ${where} изменился`)
  })

  test(`${where}: description не изменился`, () => {
    const meta = byTag(load(file).doc, 'meta').find((t) => t.attrs.name === 'description')
    assert.equal(meta && meta.attrs.content, SEO[locale].description, `описание страницы ${where} изменилось`)
  })

  test(`${where}: canonical не изменился`, () => {
    const link = byTag(load(file).doc, 'link').find((t) => t.attrs.rel === 'canonical')
    assert.equal(link && link.attrs.href, SEO[locale].canonical, `canonical страницы ${where} изменился`)
  })

  test(`${where}: hreflang (ru, ru-RU, en, en-US, x-default) не изменились`, () => {
    const links = byTag(load(file).doc, 'link').filter((t) => t.attrs.rel === 'alternate' && t.attrs.hreflang)
    assert.deepEqual(
      Object.fromEntries(links.map((t) => [t.attrs.hreflang, t.attrs.href])),
      HREFLANG,
      `языковые альтернативы страницы ${where} изменились`,
    )
  })
}

test('sitemap: набор адресов не изменился, новых URL нет', () => {
  const files = [
    'sitemap.xml',
    'sitemap_index.xml',
    ...(existsSync(resolve(PUBLIC, '__sitemap__'))
      ? readdirSync(resolve(PUBLIC, '__sitemap__'))
          .filter((name) => name.endsWith('.xml'))
          .map((name) => `__sitemap__/${name}`)
      : []),
  ]
  const locs = new Set(
    files.flatMap((rel) => [...readPublic(rel).toString('utf8').matchAll(/<loc>\s*([^<]*?)\s*<\/loc>/g)].map((m) => m[1])),
  )
  assert.deepEqual([...locs].sort(), [...SITEMAP_LOCS].sort(), 'набор адресов в sitemap изменился')
})

test('check-slash.mjs проходит на собранном сайте', async () => {
  readPublic('index.html')
  const { code, out } = await run('check-slash.mjs', [PUBLIC])
  assert.equal(code, 0, `проверка слешей в ссылках не прошла, вывод: ${out}`)
})

test('check-sitemap.mjs проходит на собранном сайте', async () => {
  readPublic('index.html')
  const { code, out } = await run('check-sitemap.mjs', [PUBLIC])
  assert.equal(code, 0, `проверка sitemap не прошла, вывод: ${out}`)
})
