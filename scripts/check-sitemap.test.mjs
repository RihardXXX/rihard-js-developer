import { test } from 'node:test'
import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const script = fileURLToPath(new URL('./check-sitemap.mjs', import.meta.url))
const HOST = 'https://rihard-developer.ru'

const run = (dir) =>
  new Promise((resolve) => {
    execFile(process.execPath, [script, dir], (error, stdout, stderr) => {
      resolve({ code: error ? error.code : 0, out: `${stdout}${stderr}` })
    })
  })

const withSite = async (files, fn) => {
  const dir = await mkdtemp(join(tmpdir(), 'check-sitemap-'))
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

const IDX =
  `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
  `<sitemap><loc>${HOST}/__sitemap__/en-US.xml</loc></sitemap>` +
  `<sitemap><loc>${HOST}/__sitemap__/ru-RU.xml</loc></sitemap></sitemapindex>`
const URLSET =
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
  `<url><loc>${HOST}/ru/</loc></url></urlset>`
const STUB = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/sitemap_index.xml"></head></html>`

const notMissingScript = (out) =>
  assert.ok(!/Cannot find module|MODULE_NOT_FOUND/.test(out), `скрипт проверки не найден: ${out}`)

const passes = (name, files) =>
  test(name, () =>
    withSite(files, async (dir) => {
      const { code, out } = await run(dir)
      notMissingScript(out)
      assert.equal(code, 0, `проверка не должна падать на корректных sitemap, вывод: ${out}`)
      assert.match(out, /\bOK\b/, 'при корректных sitemap должно быть напечатано OK')
    }),
  )

const fails = (name, files, mention, why) =>
  test(name, () =>
    withSite(files, async (dir) => {
      const { code, out } = await run(dir)
      notMissingScript(out)
      assert.equal(code, 1, why)
      assert.ok(out.trim().length > 0, 'должно быть понятное сообщение об ошибке')
      assert.ok(!/\bOK\b/.test(out), 'нельзя печатать OK при сломанном sitemap')
      if (mention) assert.match(out, mention, 'в выводе должно быть названо, что именно сломано')
    }),
  )

passes('sitemap.xml и sitemap_index.xml оба индекс: код 0 и OK', {
  'sitemap.xml': IDX,
  'sitemap_index.xml': IDX,
})

passes('sitemap.xml с urlset допустим при корректном sitemap_index.xml', {
  'sitemap.xml': URLSET,
  'sitemap_index.xml': IDX,
})

fails(
  'sitemap.xml это каталог с index.html (текущий дефект): код 1',
  { 'sitemap.xml/index.html': STUB, 'sitemap_index.xml': IDX },
  /sitemap\.xml/,
  'Яндекс получит 301 и HTML вместо XML: деплой должен остановиться (код 1)',
)

fails(
  'sitemap.xml это HTML-заглушка: код 1',
  { 'sitemap.xml': STUB, 'sitemap_index.xml': IDX },
  /sitemap\.xml/,
  'HTML вместо XML по адресу /sitemap.xml должен останавливать деплой (код 1)',
)

fails(
  'нет sitemap.xml: код 1',
  { 'sitemap_index.xml': IDX },
  /sitemap\.xml/,
  'без /sitemap.xml Яндекс получит 404, деплой должен остановиться (код 1)',
)

fails(
  'нет sitemap_index.xml: код 1',
  { 'sitemap.xml': IDX },
  /sitemap_index\.xml/,
  'без /sitemap_index.xml сломается GSC, деплой должен остановиться (код 1)',
)

fails(
  'sitemap_index.xml без sitemapindex (urlset): код 1',
  { 'sitemap.xml': IDX, 'sitemap_index.xml': URLSET },
  /sitemap_index\.xml/,
  'sitemap_index.xml без <sitemapindex> должен останавливать деплой (код 1)',
)

fails(
  'sitemap.xml без <?xml в начале: код 1',
  { 'sitemap.xml': IDX.replace(/^<\?xml[^>]*\?>\s*/, ''), 'sitemap_index.xml': IDX },
  /sitemap\.xml/,
  'sitemap.xml без XML-декларации должен останавливать деплой (код 1)',
)

test('каталога нет: код 1 с сообщением, а не ложный OK', async () => {
  const dir = join(tmpdir(), 'check-sitemap-missing-dir-does-not-exist')
  const { code, out } = await run(dir)
  notMissingScript(out)
  assert.equal(code, 1, 'несуществующий каталог должен давать код 1')
  assert.ok(out.trim().length > 0, 'должно быть понятное сообщение об ошибке')
  assert.ok(!/\bOK\b/.test(out), 'нельзя печатать OK для несуществующего каталога')
})
