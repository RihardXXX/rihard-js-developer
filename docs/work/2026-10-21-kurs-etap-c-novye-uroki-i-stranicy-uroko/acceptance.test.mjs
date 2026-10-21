// Приёмка этапа C по собранному сайту: сначала соберите сайт (npm run generate),
// затем `node --test <этот файл>`. Страницы читаются из .output/public, данные курса — из app/data.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import module from 'node:module'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { isDeepStrictEqual } from 'node:util'
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
const lessons = course.lessons ?? []
const introSections = course.introSections ?? []
const sections = [...introSections, ...lessons]

const readLocale = (name) => JSON.parse(readFileSync(resolve(ROOT, `i18n/locales/${name}.json`), 'utf8'))
const i18n = { ru: readLocale('ru'), en: readLocale('en') }

// ---------- эталоны ----------

const INTRO = ['for-whom', 'not-for-whom']
// Утверждённый порядок 25 уроков: номера 01–25 в оглавлении идут в этом порядке.
// Урок fp-in-typescript-and-effect (между neural-networks и selecting-library) ждёт тезисов владельца
// и придёт отдельной задачей, она вернёт его в этот список.
// Весь файл считает по этому списку: убрать урок из него — значит убрать его из приёмки.
const LESSON_ORDER = [
  'imperative-vs-declarative',
  'functional-programming',
  'first-class-and-higher-order-functions',
  'closures',
  'pure-functions',
  'immutability',
  'hindley-milner-type-notation',
  'composition',
  'currying',
  'partial-application',
  'point-free',
  'currying-and-asynchrony',
  'recursion',
  'function-map-filter-reduce',
  'performance',
  'memoization',
  'transducers',
  'lenses',
  'side-effects-in-composition-functions',
  'category-theory',
  'functors',
  'fantasy-land',
  'maybe-either',
  'neural-networks',
  'selecting-library',
]
const TOTAL = LESSON_ORDER.length

const LOCALES = [
  { locale: 'en', prefix: '/', lang: 'en-US', brand: 'Rihard Alikhanov' },
  { locale: 'ru', prefix: '/ru/', lang: 'ru-RU', brand: 'Рихард Алиханов' },
]
const MENU = ['about', 'skills', 'experience', 'projects', 'certificates', 'course', 'contact']
const DESCRIPTION_MAX = 160

const listPath = (prefix) => `${prefix}course/`
const lessonPath = (prefix, slug) => `${prefix}course/${slug}/`
const fileOf = (path) => `${path.slice(1)}index.html`
const urlOf = (path) => `${HOST}${path}`
const lessonOf = (slug) => lessons.find((l) => l.slug === slug)
const neighbours = (slug) => {
  const i = LESSON_ORDER.indexOf(slug)
  return { prev: LESSON_ORDER[i - 1], next: LESSON_ORDER[i + 1] }
}

// Страницы-списки: SEO, hreflang и узел Course остаются теми же, что принимал этап B (литералы, не данные).
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
const LIST_HREFLANG = {
  'x-default': `${HOST}/course/`,
  en: `${HOST}/course/`,
  'en-US': `${HOST}/course/`,
  ru: `${HOST}/ru/course/`,
  'ru-RU': `${HOST}/ru/course/`,
}

// Следы библиотек песочницы в собранном JS. Пока ramda, sanctuary и загрузчик Monaco
// не нужны странице, их нет в предзагружаемых чанках.
const MARKERS = {
  ramda: ['@@functional/placeholder'],
  sanctuary: ['sanctuary-def/Type@1'],
  '@monaco-editor/loader': ['operation is manually canceled', 'cdn.jsdelivr.net/npm/monaco-editor'],
}

// Классы разметки прогресса чтения: в SSR-HTML их быть не должно, они появляются после монтирования.
const PROGRESS_CLASSES = ['progress', 'read-badge', 'read-toggle']
// Строки интерфейса прогресса. По-русски — слова из задания; по-английски и остальные — из ключей course.* в локалях.
const PROGRESS_KEYS = ['progressCount', 'progressContinue', 'progressStart', 'progressReset']
const PROGRESS_RU = [/Пройден/, /Продолжить/, /Сбросить прогресс/, /Начать с первого урока/]

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
    .replace(/&nbsp;/g, ' ')
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
// Текст, который видит читатель: без script и style.
const visibleText = (n) =>
  n.tag === '#text' ? n.text : RAW.has(n.tag) ? '' : n.children.map(visibleText).join(' ')

const readPublic = (rel) => {
  const file = resolve(PUBLIC, rel)
  if (!existsSync(file)) {
    throw new Error(`нет собранного сайта: ${file} не найден, сначала соберите сайт (npm run generate)`)
  }
  return readFileSync(file)
}

const listPublic = (rel) => {
  readPublic('index.html')
  return readdirSync(resolve(PUBLIC, rel))
}

const pages = new Map()
// Страница из сборки: разобрана один раз.
const load = (file) => {
  if (!pages.has(file)) {
    const html = readPublic(file).toString('utf8')
    pages.set(file, { html, doc: parse(html), file })
  }
  return pages.get(file)
}

// Страницы уроков одной локали, которые есть в сборке. Если нет ни одной, проверять нечего: тест красный.
// Какие из страниц уроков не собраны, говорит проверка наличия страниц.
const lessonPages = (prefix) => {
  readPublic('index.html')
  const found = LESSON_ORDER.flatMap((slug) => {
    const path = lessonPath(prefix, slug)
    return existsSync(resolve(PUBLIC, fileOf(path))) ? [{ slug, path, ...load(fileOf(path)) }] : []
  })
  if (!found.length) {
    throw new Error(`в сборке нет ни одной страницы урока: ${urlOf(lessonPath(prefix, LESSON_ORDER[0]))} и остальные не собраны`)
  }
  return found
}
const listPage = (prefix) => ({ path: listPath(prefix), ...load(fileOf(listPath(prefix))) })

// JS, который браузер скачивает до первого взаимодействия: modulepreload (и prefetch), входной скрипт.
const chunks = new Map()
const chunkOf = (href) => {
  const file = `.${href.split('?')[0]}`
  if (!chunks.has(file)) {
    const bytes = readPublic(file)
    chunks.set(file, { href, content: bytes.toString('utf8') })
  }
  return chunks.get(file)
}
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
  return [...hrefs].map(chunkOf)
}

const graphOf = (doc) =>
  all(doc, (n) => n.tag === 'script' && n.attrs.type === 'application/ld+json').flatMap((script) => {
    const json = JSON.parse(textOf(script))
    return json['@graph'] ?? [json]
  })
const typesOf = (node) => [].concat(node['@type'])
const nodesOfType = (graph, type) => graph.filter((n) => typesOf(n).includes(type))

const titleTag = (doc) => {
  const [title] = byTag(doc, 'title')
  return title && flat(title)
}
const metaDescription = (doc) => byTag(doc, 'meta').find((t) => t.attrs.name === 'description')?.attrs.content
const canonicalOf = (doc) => byTag(doc, 'link').find((t) => t.attrs.rel === 'canonical')?.attrs.href
const hreflangOf = (doc) =>
  Object.fromEntries(
    byTag(doc, 'link')
      .filter((t) => t.attrs.rel === 'alternate' && t.attrs.hreflang)
      .map((t) => [t.attrs.hreflang, t.attrs.href]),
  )

// ---------- фразы-маркеры: чьи тексты лежат в HTML, payload и JS страницы ----------

// Слова без знаков препинания и регистра: так фраза находится в тексте без тегов, в JSON и в минифицированном JS.
const WORDS = /[\p{L}\p{N}][\p{L}\p{N}-]*/gu
const normalize = (text) => (text.match(WORDS) ?? []).join(' ').toLowerCase()
// Сырой JSON или JS: сначала снять экранирование, иначе «\n» склеит соседние слова.
const normalizeRaw = (raw) =>
  normalize(
    raw
      .replace(/\\u([0-9a-fA-F]{4})/g, (_, h) => String.fromCharCode(parseInt(h, 16)))
      .replace(/\\[nrt"'\\/]/g, ' '),
  )
const MARKER_WORDS = 6
const MARKER_MIN_WORDS = 4

// Фраза урока: первые слова его первого текстового блока на языке страницы.
const markerOf = (section, locale) => {
  const block = section.blocks.find((b) => b.type === 'text')
  return block ? normalize(block[locale] ?? '').split(' ').slice(0, MARKER_WORDS).join(' ') : ''
}
const textsOf = (section, v) =>
  [
    section.title?.[v],
    section.description?.[v],
    section.goal?.[v],
    ...(section.summary ?? []).map((item) => item[v]),
    ...section.blocks.flatMap((b) => {
      if (b.type === 'list') return b.items.map((item) => item[v])
      if (b.type === 'table') return [b.caption[v], ...b.columns.map((c) => c[v]), ...b.rows.flat().map((c) => c[v])]
      if (b.type === 'code') return [b.code[v]]
      return [b[v]]
    }),
    ...(section.exercises ?? []).flatMap((e) => [e.task[v], e.starter?.[v], e.solution[v], e.expected[v]]),
  ].filter((s) => typeof s === 'string')
const fullTexts = new Map()
const fullTextOf = (section, v) => {
  const key = `${section.slug}:${v}`
  if (!fullTexts.has(key)) fullTexts.set(key, normalize(textsOf(section, v).join(' ')))
  return fullTexts.get(key)
}
// Уроки из утверждённого порядка, которые уже есть в данных.
const knownLessons = () => LESSON_ORDER.flatMap((slug) => (lessonOf(slug) ? [lessonOf(slug)] : []))

// Чужие тексты на странице: [{ source, slugs }]. own — slug урока этой страницы (на списке его нет).
const foreignTexts = ({ doc, file }, locale, own) => {
  const sources = [
    { source: 'HTML', text: normalize(visibleText(doc)) },
    { source: '_payload.json', text: normalizeRaw(readPublic(file.replace('index.html', '_payload.json')).toString('utf8')) },
    ...preloadedChunks(doc).map(({ href, content }) => ({ source: `JS ${href}`, text: normalizeRaw(content) })),
  ]
  return sources.flatMap(({ source, text }) => {
    const slugs = knownLessons()
      .filter((l) => l.slug !== own)
      .filter((l) => {
        const marker = markerOf(l, locale)
        return marker && text.includes(marker)
      })
      .map((l) => l.slug)
    return slugs.length ? [{ source, slugs }] : []
  })
}
const describeForeign = (found) => found.map(({ source, slugs }) => `${source}: ${slugs.length} чужих уроков (${slugs.slice(0, 3).join(', ')}…)`)

const run = (script, args) =>
  new Promise((done) => {
    execFile(process.execPath, [resolve(ROOT, 'scripts', script), ...args], (error, stdout, stderr) => {
      done({ code: error ? error.code : 0, out: `${stdout}${stderr}` })
    })
  })

// ---------- сборка и данные ----------

test('сборка на месте: .output/public существует', () => {
  assert.ok(existsSync(PUBLIC), `нет собранного сайта: ${PUBLIC} не найден, сначала соберите сайт (npm run generate)`)
})

test(`данные курса: ${TOTAL} уроков идут в утверждённом порядке`, () => {
  assert.deepEqual(
    lessons.map((l) => l.slug),
    LESSON_ORDER,
    'порядок или состав нумерованных уроков не совпадает с утверждённым списком уроков',
  )
})

// ---------- страницы уроков есть в сборке ----------

for (const { prefix } of LOCALES) {
  test(`${listPath(prefix)}: у каждого из ${TOTAL} уроков есть своя страница`, () => {
    const missing = LESSON_ORDER.filter((slug) => !existsSync(resolve(PUBLIC, fileOf(lessonPath(prefix, slug)))))
    assert.deepEqual(missing, [], `нет файла ${prefix.slice(1)}course/<slug>/index.html: ссылка на урок вела бы в пустоту`)
  })

  test(`${listPath(prefix)}: у вводных разделов «Для кого» и «Кому не подойдёт» своих страниц нет`, () => {
    const found = INTRO.filter((slug) => existsSync(resolve(PUBLIC, fileOf(lessonPath(prefix, slug)))))
    assert.deepEqual(found, [], 'у вводных разделов 200 и 94 знака: это тонкие страницы, которые поиск не индексирует')
  })
}

// ---------- SEO страницы урока ----------

for (const { locale, prefix, lang, brand } of LOCALES) {
  const where = `страницы уроков ${listPath(prefix)}<slug>/`

  test(`${where}: ровно один h1, в нём название урока`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const title = lessonOf(slug)?.title[locale]
      const h1 = byTag(doc, 'h1')
      if (h1.length !== 1) return [`${slug}: h1 на странице ${h1.length}`]
      return title && flat(h1[0]).includes(title) ? [] : [`${slug}: в h1 «${flat(h1[0])}», а название урока «${title}»`]
    })
    assert.deepEqual(wrong, [], 'у страницы урока должен быть один заголовок h1 с названием урока на языке страницы')
  })

  test(`${where}: title — название урока и бренд`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const expected = `${lessonOf(slug)?.title[locale]} · ${brand}`
      return titleTag(doc) === expected ? [] : [`${slug}: «${titleTag(doc)}», а нужно «${expected}»`]
    })
    assert.deepEqual(wrong, [], 'в выдаче и во вкладке урок должен называться своим названием')
  })

  test(`${where}: meta description — описание урока из данных`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const expected = lessonOf(slug)?.description?.[locale]
      return expected && metaDescription(doc) === expected ? [] : [`${slug}: «${metaDescription(doc)}», а в данных «${expected}»`]
    })
    assert.deepEqual(wrong, [], 'у страницы урока в meta description должно быть описание этого урока')
  })

  test(`${where}: meta description не длиннее ${DESCRIPTION_MAX} знаков`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const description = metaDescription(doc) ?? ''
      return description && description.length <= DESCRIPTION_MAX ? [] : [`${slug}: ${description.length} знаков`]
    })
    assert.deepEqual(wrong, [], 'поиск обрежет описание длиннее 160 знаков, пустое подставит сам')
  })

  test(`${where}: canonical — адрес самой страницы со слешем`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, path, doc }) =>
      canonicalOf(doc) === urlOf(path) ? [] : [`${slug}: «${canonicalOf(doc)}», а нужно «${urlOf(path)}»`],
    )
    assert.deepEqual(wrong, [], 'canonical урока должен вести на сам урок, иначе поиск склеит его со списком')
  })

  test(`${where}: hreflang (en, en-US, ru, ru-RU, x-default) ведут на тот же урок в другой локали`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const en = urlOf(lessonPath('/', slug))
      const ru = urlOf(lessonPath('/ru/', slug))
      const expected = { 'x-default': en, en, 'en-US': en, ru, 'ru-RU': ru }
      return isDeepStrictEqual(hreflangOf(doc), expected) ? [] : [`${slug}: ${JSON.stringify(hreflangOf(doc))}`]
    })
    assert.deepEqual(wrong, [], 'без пары hreflang поиск перепутает русскую и английскую страницу урока')
  })

  test(`${where}: <html lang> — ${lang}`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const html = byTag(doc, 'html')[0]
      return html?.attrs.lang === lang ? [] : [`${slug}: lang="${html?.attrs.lang}"`]
    })
    assert.deepEqual(wrong, [], 'язык документа не совпал с локалью страницы')
  })
}

// Все страницы курса, которые есть в сборке: два списка и страницы уроков обеих локалей.
const courseDocs = () =>
  LOCALES.flatMap(({ prefix }) => [
    { where: listPath(prefix), doc: listPage(prefix).doc },
    ...lessonPages(prefix).map(({ path, doc }) => ({ where: path, doc })),
  ])
const repeatedOn = (pick) => {
  const seen = new Map()
  for (const { where, doc } of courseDocs()) seen.set(pick(doc), [...(seen.get(pick(doc)) ?? []), where])
  return [...seen].filter(([, wheres]) => wheres.length > 1).map(([value, wheres]) => `«${value}»: ${wheres.join(', ')}`)
}

test('title не повторяется ни на одной другой странице курса', () => {
  assert.deepEqual(repeatedOn(titleTag), [], 'у разных страниц курса одинаковый title: во вкладках и в выдаче они неотличимы')
})

test('description не повторяется ни на одной другой странице курса', () => {
  assert.deepEqual(repeatedOn(metaDescription), [], 'у разных страниц курса одинаковое описание: в выдаче они неотличимы')
})

// ---------- тексты других уроков не попадают на страницу ----------

test('фразы-маркеры: у каждого урока есть своя фраза из 4–6 слов, которой нет в других разделах', () => {
  const wrong = LOCALES.flatMap(({ locale }) =>
    knownLessons().flatMap((lesson) => {
      const marker = markerOf(lesson, locale)
      if (marker.split(' ').length < MARKER_MIN_WORDS) return [`${lesson.slug} (${locale}): в первом текстовом блоке меньше ${MARKER_MIN_WORDS} слов`]
      const others = sections.filter((s) => s.slug !== lesson.slug && fullTextOf(s, locale).includes(marker))
      return others.length ? [`${lesson.slug} (${locale}): фраза «${marker}» есть ещё в ${others.map((s) => s.slug).join(', ')}`] : []
    }),
  )
  assert.deepEqual(wrong, [], 'по такой фразе нельзя понять, чьи тексты лежат на странице: начните урок с другого абзаца')
})

test('фразы-маркеры: тексты уроков лежат в собранном JS (иначе проверка предзагрузки ничего не значит)', () => {
  const files = listPublic('_nuxt').filter((name) => name.endsWith('.js'))
  const built = files.map((name) => normalizeRaw(readPublic(`_nuxt/${name}`).toString('utf8')))
  const first = knownLessons()[0]
  const missing = LOCALES.map(({ locale }) => locale).filter((locale) => !built.some((text) => text.includes(markerOf(first, locale))))
  assert.deepEqual(missing, [], `фраза урока ${first.slug} не найдена ни в одном чанке: проверка не заметила бы чужие тексты в JS`)
})

for (const { locale, prefix } of LOCALES) {
  const where = `страницы уроков ${listPath(prefix)}<slug>/`

  test(`${where}: на странице есть текст своего урока`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const lesson = lessonOf(slug)
      const marker = lesson ? markerOf(lesson, locale) : ''
      return marker && normalize(visibleText(doc)).includes(marker) ? [] : [slug]
    })
    assert.deepEqual(wrong, [], 'на странице нет первого абзаца урока: страница пустая или показывает другой урок')
  })

  test(`${where}: нет текстов других уроков ни в HTML, ни в payload, ни в JS предзагрузки`, () => {
    const wrong = lessonPages(prefix).flatMap((page) =>
      describeForeign(foreignTexts(page, locale, page.slug)).map((line) => `${page.slug} / ${line}`),
    )
    assert.deepEqual(wrong, [], 'страница урока тянет тексты соседей: она повторяет куски других страниц и тяжелее, чем нужно')
  })
}

for (const { prefix } of LOCALES) {
  for (const [name, needles] of Object.entries(MARKERS)) {
    test(`${listPath(prefix)} и страницы уроков: ${name} не входит в JS предзагрузки`, () => {
      const targets = [{ where: listPath(prefix), ...listPage(prefix) }, ...lessonPages(prefix).map((p) => ({ where: p.path, ...p }))]
      const hits = targets.flatMap(({ where, doc }) =>
        preloadedChunks(doc)
          .filter(({ content }) => needles.some((needle) => content.includes(needle)))
          .map(({ href }) => `${where}: ${href}`),
      )
      assert.deepEqual(hits, [], `${name} грузится вместе со страницей, хотя нужен только песочнице`)
    })
  }
}

// ---------- sitemap ----------

const sitemapOf = (lang) => {
  const xml = readPublic(`__sitemap__/${lang}.xml`).toString('utf8')
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, body]) => ({
    loc: /<loc>\s*([^<]*?)\s*<\/loc>/.exec(body)?.[1],
    alternates: Object.fromEntries(
      [...body.matchAll(/<xhtml:link\b[^>]*>/g)].map(([tag]) => [/hreflang="([^"]*)"/.exec(tag)?.[1], /href="([^"]*)"/.exec(tag)?.[1]]),
    ),
    hasImage: body.includes('<image:image'),
  }))
}

for (const { prefix, lang } of LOCALES) {
  const where = `__sitemap__/${lang}.xml`

  test(`${where}: есть адреса всех ${TOTAL} уроков`, () => {
    const locs = sitemapOf(lang).map((entry) => entry.loc)
    const missing = LESSON_ORDER.map((slug) => urlOf(lessonPath(prefix, slug))).filter((loc) => !locs.includes(loc))
    assert.deepEqual(missing, [], 'этих уроков нет в sitemap: поиск узнает о них только по ссылкам')
  })

  test(`${where}: записей <url> ровно ${2 + TOTAL}: главная, список и ${TOTAL} уроков`, () => {
    assert.equal(sitemapOf(lang).length, 2 + TOTAL, 'в sitemap лишние или недостающие адреса')
  })

  test(`${where}: у каждого урока есть xhtml:link на пару в другой локали и на x-default`, () => {
    const entries = sitemapOf(lang)
    const expectedPair = (slug) => ({
      'en-US': urlOf(lessonPath('/', slug)),
      'ru-RU': urlOf(lessonPath('/ru/', slug)),
      'x-default': urlOf(lessonPath('/', slug)),
    })
    const found = LESSON_ORDER.flatMap((slug) => entries.filter((entry) => entry.loc === urlOf(lessonPath(prefix, slug))).map((entry) => ({ slug, entry })))
    if (!found.length) throw new Error(`в ${where} нет записей уроков`)
    const wrong = found.flatMap(({ slug, entry }) => {
      return isDeepStrictEqual(entry.alternates, expectedPair(slug)) ? [] : [`${slug}: ${JSON.stringify(entry.alternates)}`]
    })
    assert.deepEqual(wrong, [], 'без пары и x-default поиск перепутает русскую и английскую страницу урока')
  })
}

test('sitemap: картинок (<image:image>) нет', () => {
  const withImages = LOCALES.flatMap(({ lang }) => sitemapOf(lang).filter((entry) => entry.hasImage).map((entry) => `${lang}: ${entry.loc}`))
  assert.deepEqual(withImages, [], 'картинки в sitemap расходуют бюджет сканирования, который уже урезали')
})

// ---------- навигация страницы урока ----------

for (const { locale, prefix } of LOCALES) {
  const where = `страницы уроков ${listPath(prefix)}<slug>/`
  const link = (doc, name) => all(doc, (n) => n.tag === 'a' && hasClass(n, name))
  const neighbourTitle = (slug) => lessonOf(slug)?.title[locale]

  test(`${where}: у первого урока нет «предыдущего», у последнего нет «следующего»`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const { prev, next } = neighbours(slug)
      return [
        ...(!prev && link(doc, 'lesson-nav__prev').length ? [`${slug}: есть «предыдущий урок»`] : []),
        ...(!next && link(doc, 'lesson-nav__next').length ? [`${slug}: есть «следующий урок»`] : []),
      ]
    })
    assert.deepEqual(wrong, [], 'ссылка за края программы ведёт в никуда')
  })

  test(`${where}: «предыдущий урок» ведёт на соседа и называет его`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const { prev } = neighbours(slug)
      if (!prev) return []
      const [a] = link(doc, 'lesson-nav__prev')
      const ok = a && a.attrs.href === lessonPath(prefix, prev) && flat(a).includes(neighbourTitle(prev) ?? '\u0000')
      return ok ? [] : [`${slug}: ${a ? `${a.attrs.href} «${flat(a)}»` : 'ссылки нет'}, а нужен ${lessonPath(prefix, prev)}`]
    })
    assert.deepEqual(wrong, [], 'у этих уроков нет ссылки «Предыдущий урок: название» на правильную страницу')
  })

  test(`${where}: «следующий урок» ведёт на соседа и называет его`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const { next } = neighbours(slug)
      if (!next) return []
      const [a] = link(doc, 'lesson-nav__next')
      const ok = a && a.attrs.href === lessonPath(prefix, next) && flat(a).includes(neighbourTitle(next) ?? '\u0000')
      return ok ? [] : [`${slug}: ${a ? `${a.attrs.href} «${flat(a)}»` : 'ссылки нет'}, а нужен ${lessonPath(prefix, next)}`]
    })
    assert.deepEqual(wrong, [], 'у этих уроков нет ссылки «Следующий урок: название» на правильную страницу')
  })

  test(`${where}: «К содержанию» ведёт на ${listPath(prefix)}#course-toc`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const hrefs = link(doc, 'lesson-nav__toc').map((a) => a.attrs.href)
      return hrefs.length === 1 && hrefs[0] === `${listPath(prefix)}#course-toc` ? [] : [`${slug}: ${JSON.stringify(hrefs)}`]
    })
    assert.deepEqual(wrong, [], 'ссылка на оглавление ведёт не на список курса в той же локали')
  })

  test(`${where}: хлебные крошки — три пункта со ссылками на ${prefix} и ${listPath(prefix)}`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const crumbs = byClass(doc, 'crumbs').filter((n) => n.tag === 'nav')
      const items = crumbs[0] ? all(crumbs[0], (n) => n.tag === 'li') : []
      const hrefs = items.map((li) => all(li, (n) => n.tag === 'a')[0]?.attrs.href)
      if (crumbs.length !== 1 || items.length !== 3) return [`${slug}: nav.crumbs ${crumbs.length}, пунктов ${items.length}`]
      return hrefs[0] === prefix && hrefs[1] === listPath(prefix) ? [] : [`${slug}: ссылки ${JSON.stringify(hrefs)}`]
    })
    assert.deepEqual(wrong, [], 'крошки «Главная → Курс → Урок» должны вести на главную и список курса в той же локали')
  })

  test(`${where}: последняя крошка — название урока с aria-current="page"`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const [nav] = byClass(doc, 'crumbs')
      const last = nav && all(nav, (n) => n.tag === 'li').at(-1)
      const current = last && (last.attrs['aria-current'] === 'page' || all(last, (n) => n.attrs['aria-current'] === 'page').length > 0)
      return last && current && flat(last).includes(lessonOf(slug)?.title[locale] ?? '\u0000') ? [] : [slug]
    })
    assert.deepEqual(wrong, [], 'текущая страница в крошках должна называться как урок и быть отмечена для программ чтения с экрана')
  })

  test(`${where}: в JSON-LD есть BreadcrumbList из трёх пунктов с абсолютными адресами со слешем`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, path, doc }) => {
      const lists = nodesOfType(graphOf(doc), 'BreadcrumbList')
      if (lists.length !== 1) return [`${slug}: узлов BreadcrumbList ${lists.length}`]
      const urls = (lists[0].itemListElement ?? []).map((el) => (typeof el.item === 'string' ? el.item : (el.item?.['@id'] ?? el['@id'])))
      const expected = [urlOf(prefix), urlOf(listPath(prefix)), urlOf(path)]
      return JSON.stringify(urls) === JSON.stringify(expected) ? [] : [`${slug}: ${JSON.stringify(urls)}`]
    })
    assert.deepEqual(wrong, [], 'поиск не получит цепочку «Главная → Курс → Урок» из разметки')
  })

  test(`${where}: переключатель языка в шапке и подвале ведёт на тот же урок в другой локали`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const items = all(doc, (n) => n.tag === 'a' && n.attrs.hreflang && (hasClass(n, 'lang__item') || hasClass(n, 'footer__lang')))
      const bad = items.filter((a) => a.attrs.href !== lessonPath(a.attrs.hreflang === 'ru' ? '/ru/' : '/', slug))
      return items.length && !bad.length ? [] : [`${slug}: ${items.length ? bad.map((a) => `${a.attrs.hreflang} -> ${a.attrs.href}`).join(', ') : 'переключателя нет'}`]
    })
    assert.deepEqual(wrong, [], 'смена языка уводит с урока на другую страницу')
  })

  test(`${where}: меню шапки ведёт к секциям главной в той же локали`, () => {
    const expected = MENU.map((id) => `${prefix}#${id}`)
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => {
      const hrefs = byClass(doc, 'nav__link').map((a) => a.attrs.href)
      return JSON.stringify(hrefs) === JSON.stringify(expected) ? [] : [`${slug}: ${JSON.stringify(hrefs)}`]
    })
    assert.deepEqual(wrong, [], 'с урока меню шапки должно вести на секции главной, а не на якоря этой страницы')
  })

  test(`${where}: узла Course на странице урока нет`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, doc }) => (nodesOfType(graphOf(doc), 'Course').length ? [slug] : []))
    assert.deepEqual(wrong, [], 'разметка Course есть только у списка: урок — часть курса, а не отдельный курс')
  })

  test(`${where}: узел WebPage один, и его url — адрес страницы`, () => {
    const wrong = lessonPages(prefix).flatMap(({ slug, path, doc }) => {
      const pagesNodes = nodesOfType(graphOf(doc), 'WebPage')
      return pagesNodes.length === 1 && pagesNodes[0].url === urlOf(path) ? [] : [`${slug}: ${JSON.stringify(pagesNodes.map((n) => n.url))}`]
    })
    assert.deepEqual(wrong, [], 'в разметке WebPage адрес не совпал с адресом урока')
  })
}

// ---------- страница-список: оглавление ----------

for (const { locale, prefix, lang } of LOCALES) {
  const where = listPath(prefix)
  const tocOf = (doc) => {
    const [toc] = byId(doc, 'course-toc')
    assert.ok(toc, `на ${where} нет оглавления с id="course-toc": ссылке «К содержанию» некуда вести`)
    return toc
  }
  // Пункты оглавления: [{ slug, href, num, title, desc }] в порядке страницы.
  const tocItems = (doc) =>
    all(tocOf(doc), (n) => n.tag === 'li' && hasClass(n, 'toc__item')).map((li) => {
      const a = byClass(li, 'toc__link')[0]
      const num = a && byClass(a, 'toc__num')[0]
      const desc = byClass(li, 'toc__desc')[0]
      return {
        slug: li.attrs.id ?? '(нет id)',
        href: a?.attrs.href,
        num: num && flat(num),
        title: a && a.children.filter((c) => c !== num).map(textOf).join('').replace(/\s+/g, ' ').trim(),
        desc: desc && flat(desc),
      }
    })

  test(`${where}: ровно один h1`, () => {
    assert.equal(byTag(listPage(prefix).doc, 'h1').length, 1, 'у списка курса должен остаться один заголовок h1')
  })

  test(`${where}: у каждого из ${TOTAL} slug, у «Для кого», «Кому не подойдёт» и оглавления ровно один элемент с таким id`, () => {
    const { doc } = listPage(prefix)
    const wrong = [...LESSON_ORDER, ...INTRO, 'course-toc']
      .map((id) => [id, byId(doc, id).length])
      .filter(([, n]) => n !== 1)
      .map(([id, n]) => `${id}: элементов ${n}`)
    assert.deepEqual(wrong, [], `старые ссылки ${where}#slug ведут не к одному месту: id и число элементов с таким id`)
  })

  test(`${where}: все id на странице уникальны`, () => {
    const ids = all(listPage(prefix).doc, (n) => 'id' in n.attrs).map((n) => n.attrs.id)
    const repeated = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))]
    assert.deepEqual(repeated, [], 'повторяющийся id ломает якоря и подписи aria')
  })

  test(`${where}: полных текстов уроков нет, разделов-уроков с их id тоже`, () => {
    const { doc } = listPage(prefix)
    const sectionsOfLessons = LESSON_ORDER.filter((slug) => byId(doc, slug).some((n) => n.tag === 'section'))
    assert.deepEqual(sectionsOfLessons, [], 'на списке остались разделы уроков: каждая страница урока повторяла бы кусок списка')
  })

  test(`${where}: нет текстов уроков ни в HTML, ни в payload, ни в JS предзагрузки`, () => {
    const found = foreignTexts(listPage(prefix), locale, null)
    assert.deepEqual(describeForeign(found), [], 'список курса по-прежнему несёт тексты уроков')
  })

  test(`${where}: в оглавлении ${TOTAL} пунктов в утверждённом порядке`, () => {
    assert.deepEqual(tocItems(listPage(prefix).doc).map((item) => item.slug), LESSON_ORDER, 'оглавление ведёт к урокам не в том порядке или не ко всем')
  })

  test(`${where}: номера в оглавлении идут подряд от 01 до ${TOTAL}`, () => {
    assert.deepEqual(
      tocItems(listPage(prefix).doc).map((item) => item.num),
      LESSON_ORDER.map((_, i) => String(i + 1).padStart(2, '0')),
      `номера в оглавлении не 01–${TOTAL} подряд`,
    )
  })

  test(`${where}: у каждого пункта оглавления название урока на языке страницы`, () => {
    const wrong = tocItems(listPage(prefix).doc).flatMap(({ slug, title }) =>
      title === lessonOf(slug)?.title[locale] ? [] : [`${slug}: «${title ?? 'нет'}», а в данных «${lessonOf(slug)?.title[locale] ?? 'нет'}»`],
    )
    assert.deepEqual(wrong, [], 'читатель видит в оглавлении не то название, что у урока')
  })

  test(`${where}: у каждого пункта оглавления есть описание урока`, () => {
    const wrong = tocItems(listPage(prefix).doc).flatMap(({ slug, desc }) => {
      const expected = lessonOf(slug)?.description?.[locale]
      return desc && desc === expected ? [] : [`${slug}: описание «${desc ?? 'нет'}», а в данных «${expected ?? 'нет'}»`]
    })
    assert.deepEqual(wrong, [], 'под названием урока в оглавлении должно быть его описание в одну-две строки')
  })

  test(`${where}: ссылка каждого пункта ведёт на страницу урока со слешем на конце`, () => {
    const wrong = tocItems(listPage(prefix).doc).flatMap(({ slug, href }) =>
      href === lessonPath(prefix, slug) ? [] : [`${slug}: ${href ?? 'ссылки нет'}`],
    )
    assert.deepEqual(wrong, [], 'оглавление должно вести на /<локаль>/course/<slug>/, а не на якорь')
  })

  test(`${where}: SEO списка не изменился (title, description, canonical, hreflang)`, () => {
    const { doc } = listPage(prefix)
    assert.deepEqual(
      { title: titleTag(doc), description: metaDescription(doc), canonical: canonicalOf(doc), hreflang: hreflangOf(doc) },
      { ...SEO[locale], hreflang: LIST_HREFLANG },
      `SEO списка ${where} изменился`,
    )
  })

  test(`${where}: в JSON-LD один узел Course с названием, описанием, языком и провайдером`, () => {
    const { doc } = listPage(prefix)
    const found = nodesOfType(graphOf(doc), 'Course')
    assert.equal(found.length, 1, `на ${where} должен быть один узел Course, найдено ${found.length}`)
    assert.deepEqual(
      { name: found[0].name, description: found[0].description, inLanguage: found[0].inLanguage, provider: found[0].provider?.['@id'] },
      {
        name: i18n[locale].course.title,
        description: i18n[locale].course.desc,
        inLanguage: lang,
        provider: `${HOST}/#identity`,
      },
      'разметка Course списка изменилась',
    )
  })
}

// ---------- прежнее не сломано: проверки сборки, 404, прогресса нет в SSR ----------

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

test('несуществующий урок: страницы /ru/course/nope/ и /course/nope/ не собираются', () => {
  readPublic('index.html')
  const found = LOCALES.map(({ prefix }) => lessonPath(prefix, 'nope')).filter((path) => existsSync(resolve(PUBLIC, fileOf(path))))
  assert.deepEqual(found, [], 'ссылка на несуществующий урок породила страницу: должен быть 404')
})

test('несуществующий урок: GitHub Pages отдаст 404.html', () => {
  assert.ok(readPublic('404.html').length > 0, 'нет 404.html: на неизвестный адрес курса сервер ответит пустотой')
})

test('несуществующий урок: адреса nope нет в sitemap', () => {
  const locs = LOCALES.flatMap(({ lang }) => sitemapOf(lang).map((entry) => entry.loc))
  assert.deepEqual(locs.filter((loc) => /\/nope\//.test(loc)), [], 'в sitemap попал адрес несуществующего урока')
})

// Страницы курса, которые есть в сборке: списки и уроки, если они уже собраны.
const builtCoursePages = () =>
  LOCALES.flatMap(({ locale, prefix }) => [
    { locale, where: listPath(prefix), doc: listPage(prefix).doc },
    ...LESSON_ORDER.filter((slug) => existsSync(resolve(PUBLIC, fileOf(lessonPath(prefix, slug))))).map((slug) => ({
      locale,
      where: lessonPath(prefix, slug),
      doc: load(fileOf(lessonPath(prefix, slug))).doc,
    })),
  ])

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
// Шаблон vue-i18n «Пройдено {done} из {total}» -> регулярное выражение.
const templateRe = (template) => new RegExp(template.split(/\{[^}]*\}/).map(escapeRe).join('\\S+'))
const progressPatterns = (locale) => [
  ...(locale === 'ru' ? PROGRESS_RU : []),
  ...PROGRESS_KEYS.flatMap((key) => {
    const value = i18n[locale].course?.[key]
    return typeof value === 'string' && value.length >= 8 ? [templateRe(value)] : []
  }),
]

test('прогресс чтения: в SSR-HTML нет его разметки (.progress, .read-badge, .read-toggle)', () => {
  const found = builtCoursePages().flatMap(({ where, doc }) =>
    PROGRESS_CLASSES.filter((name) => byClass(doc, name).length).map((name) => `${where}: .${name}`),
  )
  assert.deepEqual(found, [], 'прогресс виден в HTML до монтирования: при гидрации будет расхождение, а читатель без JS увидит чужие отметки')
})

test('прогресс чтения: в SSR-HTML нет строк прогресса', () => {
  const found = builtCoursePages().flatMap(({ locale, where, doc }) => {
    const text = flat({ tag: '#text', text: visibleText(byTag(doc, 'body')[0] ?? doc) })
    return progressPatterns(locale).filter((re) => re.test(text)).map((re) => `${where}: ${re}`)
  })
  assert.deepEqual(found, [], 'строки про прогресс есть в HTML до монтирования: у читателя без JS они будут врать')
})
