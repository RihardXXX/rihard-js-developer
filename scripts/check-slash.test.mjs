import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const script = fileURLToPath(new URL('./check-slash.mjs', import.meta.url))
const HOST = 'https://rihard-developer.ru'

const run = (dir) =>
  new Promise((resolve) => {
    execFile(process.execPath, [script, dir], (error, stdout, stderr) => {
      resolve({ code: error ? error.code : 0, out: `${stdout}${stderr}` })
    })
  })

const withSite = async (files, fn) => {
  const dir = await mkdtemp(join(tmpdir(), 'check-slash-'))
  try {
    for (const [name, content] of Object.entries(files)) {
      const file = join(dir, name)
      await mkdir(dirname(file), { recursive: true })
      await writeFile(file, content)
    }
    await fn(dir)
  } finally {
    await rm(dir, { recursive: true, force: true })
  }
}

const page = (body) => `<!doctype html><html><head>${body}</head><body></body></html>`
const notMissingScript = (out) =>
  assert.ok(!/Cannot find module|MODULE_NOT_FOUND/.test(out), `скрипт проверки не найден: ${out}`)

const passes = (name, files) =>
  test(name, () =>
    withSite(files, async (dir) => {
      const { code, out } = await run(dir)
      notMissingScript(out)
      assert.equal(code, 0, `проверка не должна падать на допустимых адресах, вывод: ${out}`)
      assert.match(out, /\bOK\b/, 'при чистом сайте должно быть напечатано OK')
    }),
  )

test('чистый сайт: код 0 и OK', () =>
  withSite(
    {
      'index.html': page(`<link rel="canonical" href="${HOST}/ru/"><a href="${HOST}/course/">c</a>`),
      'sitemap.xml': `<urlset><url><loc>${HOST}/ru/</loc></url></urlset>`,
    },
    async (dir) => {
      const { code, out } = await run(dir)
      notMissingScript(out)
      assert.equal(code, 0, `чистый сайт не должен ломать деплой, вывод: ${out}`)
      assert.match(out, /\bOK\b/, 'при чистом сайте должно быть напечатано OK')
    },
  ))

test('hreflang без слеша в html: код 1 и адрес /de в выводе', () =>
  withSite(
    { 'index.html': page(`<link rel="alternate" hreflang="de" href="${HOST}/de">`) },
    async (dir) => {
      const { code, out } = await run(dir)
      notMissingScript(out)
      assert.equal(code, 1, 'ссылка на /de без слеша должна останавливать деплой (код 1)')
      assert.match(out, /\/de(?![\w/])/, 'в выводе должен быть перечислен адрес /de')
    },
  ))

test('loc без слеша в xml: код 1 и адрес /ru в выводе', () =>
  withSite({ 'sitemap.xml': `<urlset><url><loc>${HOST}/ru</loc></url></urlset>`, 'index.html': page('') }, async (dir) => {
    const { code, out } = await run(dir)
    notMissingScript(out)
    assert.equal(code, 1, 'адрес в sitemap без слеша должен останавливать деплой (код 1)')
    assert.match(out, /\/ru(?![\w/])/, 'в выводе должен быть перечислен адрес /ru')
  }))

test('относительные ссылки без слеша (/ru, /ru#skills): код 1', () =>
  withSite({ 'index.html': page(`<a href="/ru">ru</a><a href="/ru#skills">s</a>`) }, async (dir) => {
    const { code, out } = await run(dir)
    notMissingScript(out)
    assert.equal(code, 1, 'относительная ссылка без слеша должна останавливать деплой (код 1)')
    assert.match(out, /\/ru(?![\w/])/, 'в выводе должен быть перечислен адрес /ru')
  }))

test('ссылка на каталог с точкой в имени (sitemap.xml/): код 1', () =>
  withSite(
    {
      'index.html': page(`<a href="${HOST}/sitemap.xml">s</a>`),
      'sitemap.xml/index.html': page(`<meta http-equiv="refresh" content="0; url=${HOST}/sitemap_index.xml">`),
    },
    async (dir) => {
      const { code, out } = await run(dir)
      notMissingScript(out)
      assert.equal(code, 1, 'каталог отдаётся с 301 на адрес со слешем, даже если в имени есть точка')
      assert.match(out, /\/sitemap\.xml(?![\w/])/, 'в выводе должен быть перечислен адрес /sitemap.xml')
    },
  ))

passes('якоря и query на адресах со слешем и у ассетов допустимы', {
  'index.html': page(`<a href="/#skills">a</a><a href="/ru/?q=1">b</a><a href="${HOST}/_payload.json?x">c</a>`),
})

test('ссылка http:// на свой домен: код 1', () =>
  withSite({ 'index.html': page(`<a href="http://rihard-developer.ru/ru/">x</a>`) }, async (dir) => {
    const { code, out } = await run(dir)
    notMissingScript(out)
    assert.equal(code, 1, 'ссылка по http:// на свой домен должна останавливать деплой (код 1)')
    assert.match(out, /http:\/\/rihard-developer\.ru/, 'в выводе должна быть указана http-ссылка')
  }))

passes('корень без слеша и со слешем допустим', {
  'index.html': page(`<link rel="canonical" href="${HOST}"><a href="${HOST}/">home</a>`),
})

passes('адреса с расширением файла допустимы (png, xml)', {
  'index.html': page(`<meta property="og:image" content="${HOST}/og.png"><a href="${HOST}/sitemap_index.xml">s</a>`),
  'robots.txt': `Sitemap: ${HOST}/sitemap_index.xml`,
})

passes('пути /_nuxt/ и /__sitemap__/ допустимы', {
  'index.html': page(`<script src="${HOST}/_nuxt/entry"></script><a href="${HOST}/__sitemap__/ru">x</a>`),
})

passes('meta-refresh заглушки на корень допустим', {
  'index.html': page(''),
  'de/index.html': page(`<meta http-equiv="refresh" content="0; url=${HOST}/">`),
})

passes('meta-refresh заглушки без слеша допустим', {
  'index.html': page(''),
  'de/index.html': page(`<meta http-equiv="refresh" content="0; url=${HOST}/ru">`),
})

passes('каталог с именем sitemap.xml/ (prerender-редирект) не ломает проверку', {
  'index.html': page(''),
  'sitemap.xml/index.html': page(`<meta http-equiv="refresh" content="0; url=${HOST}/sitemap_index.xml">`),
})

passes('чужие домены без слеша допустимы', {
  'index.html': page(`<a href="https://github.com/RihardXXX">gh</a><a href="http://example.com/page">e</a>`),
})

test('каталога нет: код 1 с сообщением, а не ложный OK', async () => {
  const dir = join(tmpdir(), 'check-slash-missing-dir-does-not-exist')
  const { code, out } = await run(dir)
  notMissingScript(out)
  assert.equal(code, 1, 'несуществующий каталог должен давать код 1')
  assert.ok(out.trim().length > 0, 'должно быть понятное сообщение об ошибке')
  assert.ok(!/\bOK\b/.test(out), 'нельзя печатать OK для несуществующего каталога')
})

test('в каталоге нет .html: код 1 с сообщением, а не ложный OK', () =>
  withSite({ 'robots.txt': 'User-agent: *', 'sitemap.xml': '<urlset/>' }, async (dir) => {
    const { code, out } = await run(dir)
    notMissingScript(out)
    assert.equal(code, 1, 'пустой вывод generate (без .html) должен давать код 1')
    assert.ok(out.trim().length > 0, 'должно быть понятное сообщение об ошибке')
    assert.ok(!/\bOK\b/.test(out), 'нельзя печатать OK, если нет ни одного .html')
  }))
