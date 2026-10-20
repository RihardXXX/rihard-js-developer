#!/usr/bin/env node
// Fail unless /sitemap.xml and /sitemap_index.xml are XML files in the
// prerendered site. Yandex reads /sitemap.xml; a directory of that name is
// answered by GitHub Pages with a 301 and an HTML page. Run after `nuxt generate`.
import { readFile, stat } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = process.argv[2] ?? fileURLToPath(new URL('../.output/public', import.meta.url))

const errors = []

const checkXml = async (name, tags) => {
  const file = join(DIR, name)
  const target = await stat(file).catch(() => null)
  if (!target) return errors.push(`${name} not found`)
  if (!target.isFile()) {
    return errors.push(`${name} is a directory — GitHub Pages would 301 /${name} to /${name}/`)
  }
  const text = (await readFile(file, 'utf8')).trimStart()
  if (!text.startsWith('<?xml')) errors.push(`${name} does not start with <?xml`)
  if (!tags.some((tag) => text.includes(tag))) errors.push(`${name} has none of ${tags.join(', ')}`)
}

await checkXml('sitemap.xml', ['<sitemapindex', '<urlset'])
await checkXml('sitemap_index.xml', ['<sitemapindex'])

if (errors.length) {
  for (const error of errors) console.error(`✗ ${error}`)
  console.error(`✗ Sitemap check failed in ${DIR} — run \`npm run generate\` and look at the sitemap output.`)
  process.exit(1)
}

console.log('✓ OK: sitemap.xml and sitemap_index.xml are XML files')
