// Проверка собранного сайта: сначала `npm run generate`, затем `node --test <этот файл>`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../..')
const PUBLIC = resolve(ROOT, '.output/public')
const HOST = 'https://rihard-developer.ru'
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
const MENU_IDS = ['about', 'skills', 'experience', 'projects', 'certificates', 'course', 'contact']
const CYRILLIC = /[А-Яа-яЁё]/

// Эталоны сняты со сборки коммита 0a43999 (до правок курса): страница курса не должна их потерять.
const COURSE = {
  en: {
    file: 'course/index.html',
    title: 'Interactive course on functional programming in JS · Rihard Alikhanov',
    description:
      'A course with a code editor right in the browser: write and run examples in plain JS with the ramda and sanctuary libraries. FP explained in practice.',
    canonical: `${HOST}/course/`,
  },
  ru: {
    file: 'ru/course/index.html',
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

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")

const read = (rel) => {
  const file = resolve(PUBLIC, rel)
  if (!existsSync(file)) {
    throw new Error(`нет собранного сайта: ${file} не найден, сначала соберите сайт (npm run generate)`)
  }
  return readFileSync(file, 'utf8')
}

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`))
  return m ? decode(m[1]) : undefined
}
const tags = (html, name) => html.match(new RegExp(`<${name}\\b[^>]*>`, 'g')) ?? []

const menuHrefs = (html) =>
  tags(html, 'a')
    .filter((tag) => /\bclass="nav__link"/.test(tag))
    .map((tag) => attr(tag, 'href'))

const hreflangs = (html) =>
  Object.fromEntries(
    tags(html, 'link')
      .filter((tag) => attr(tag, 'rel') === 'alternate' && attr(tag, 'hreflang'))
      .map((tag) => [attr(tag, 'hreflang'), attr(tag, 'href')]),
  )

const codeBlocks = (html) => [...html.matchAll(/<pre class="cb__pre"[^>]*>([\s\S]*?)<\/pre>/g)].map((m) => m[1])

test('сборка на месте: .output/public существует', () => {
  assert.ok(existsSync(PUBLIC), `нет собранного сайта: ${PUBLIC} не найден, сначала соберите сайт (npm run generate)`)
})

// ---------- меню шапки (критерий 6) ----------

const menu = (name, file, prefix) =>
  test(`меню шапки на ${name}: пункты ведут на секции главной (${prefix}#about ... ${prefix}#contact)`, () => {
    assert.deepEqual(
      menuHrefs(read(file)),
      MENU_IDS.map((id) => `${prefix}#${id}`),
      `пункты меню на ${name} должны вести на секции главной, иначе клик по ним ничего не делает`,
    )
  })

menu('/course/', 'course/index.html', '/')
menu('/ru/course/', 'ru/course/index.html', '/ru/')
menu('главной /', 'index.html', '')
menu('главной /ru/', 'ru/index.html', '')

// ---------- SEO страницы курса (критерий 7) ----------

for (const [locale, page] of Object.entries(COURSE)) {
  const where = locale === 'ru' ? '/ru/course/' : '/course/'

  test(`${where}: title не изменился`, () => {
    const m = read(page.file).match(/<title[^>]*>([^<]*)<\/title>/)
    assert.equal(m && decode(m[1]), page.title, `заголовок страницы ${where} изменился`)
  })

  test(`${where}: description не изменился`, () => {
    const tag = tags(read(page.file), 'meta').find((t) => attr(t, 'name') === 'description')
    assert.equal(tag && attr(tag, 'content'), page.description, `описание страницы ${where} изменилось`)
  })

  test(`${where}: canonical не изменился`, () => {
    const tag = tags(read(page.file), 'link').find((t) => attr(t, 'rel') === 'canonical')
    assert.equal(tag && attr(tag, 'href'), page.canonical, `canonical страницы ${where} изменился`)
  })

  test(`${where}: hreflang (ru, ru-RU, en, en-US, x-default) не изменились`, () => {
    assert.deepEqual(hreflangs(read(page.file)), HREFLANG, `языковые альтернативы страницы ${where} изменились`)
  })
}

// ---------- якоря уроков ----------

for (const [locale, page] of Object.entries(COURSE)) {
  const where = locale === 'ru' ? '/ru/course/' : '/course/'

  test(`${where}: у всех 20 уроков есть id="slug"`, () => {
    const html = read(page.file)
    const missing = SLUGS.filter((slug) => !html.includes(`id="${slug}"`))
    assert.deepEqual(missing, [], `внешние ссылки ${where}#slug не найдут уроки: ${missing.join(', ')}`)
  })

  test(`${where}: в оглавлении есть href="#slug" для всех 20 уроков`, () => {
    const html = read(page.file)
    const missing = SLUGS.filter((slug) => !html.includes(`href="#${slug}"`))
    assert.deepEqual(missing, [], `оглавление ${where} не ведёт к урокам: ${missing.join(', ')}`)
  })
}

// ---------- код по локали (решение 4) ----------

test('/course/: в блоках кода нет кириллицы', () => {
  const blocks = codeBlocks(read(COURSE.en.file))
  assert.ok(blocks.length > 0, 'на странице нет ни одного блока кода: разметка изменилась')
  const russian = blocks.filter((code) => CYRILLIC.test(code)).length
  assert.equal(russian, 0, `англоязычный читатель видит русский в ${russian} из ${blocks.length} блоков кода`)
})

test('/ru/course/: в блоках кода есть русские комментарии', () => {
  const blocks = codeBlocks(read(COURSE.ru.file))
  assert.ok(blocks.length > 0, 'на странице нет ни одного блока кода: разметка изменилась')
  assert.ok(
    blocks.some((code) => CYRILLIC.test(code)),
    'русскоязычный читатель не видит русских комментариев в коде',
  )
})
