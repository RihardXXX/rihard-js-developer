#!/usr/bin/env node
// Fail if the prerendered site links to its own pages without a trailing slash
// or over http:// — GitHub Pages answers those with a 301 and Search Console
// reports them as "Page with redirect". Run after `nuxt generate`.
import { readdir, readFile, stat } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const DIR = process.argv[2] ?? fileURLToPath(new URL('../.output/public', import.meta.url))
const HOST = 'https://rihard-developer.ru'
const INSECURE_HOST = 'http://rihard-developer.ru'
const URL_RE = /(?:href|content)="([^"]+)"|<loc>([^<]+)<\/loc>/g

const entries = await readdir(DIR, { recursive: true, withFileTypes: true }).catch(() => null)
if (!entries) {
  console.error(`✗ ${DIR} not found — run \`npm run generate\` first.`)
  process.exit(1)
}

// Files only: prerender emits a sitemap.xml/ directory for the sitemap redirect.
const pages = entries
  .filter((entry) => entry.isFile() && /\.(html|xml)$/.test(entry.name))
  .map((entry) => relative(DIR, join(entry.parentPath, entry.name)))
if (!pages.some((file) => file.endsWith('.html'))) {
  console.error(`✗ No .html in ${DIR} — run \`npm run generate\` first.`)
  process.exit(1)
}

// url → first file it was found in
const bad = new Map()
for (const file of pages) {
  const text = await readFile(join(DIR, file), 'utf8')
  for (const [, attr, loc] of text.matchAll(URL_RE)) {
    const url = (attr ?? loc).split(/[?#]/)[0]
    if (url.startsWith(INSECURE_HOST)) {
      if (!bad.has(url)) bad.set(url, file)
      continue
    }
    // Own pages only: absolute on HOST or root-relative; the bare HOST is the root.
    const path = url.startsWith(HOST) ? url.slice(HOST.length) : url
    if (!path.startsWith('/') || path.startsWith('//')) continue
    // /_nuxt/ and /__sitemap__/ are assets; directories must end with "/".
    if (path.endsWith('/') || path.startsWith('/_')) continue
    // A built file is fine; a built directory redirects even with a dot in its name
    // (sitemap.xml/). Paths outside the build fall back to "has an extension".
    const target = await stat(join(DIR, path)).catch(() => null)
    if (target ? target.isFile() : /\.\w+$/.test(path)) continue
    if (!bad.has(url)) bad.set(url, file)
  }
}

if (bad.size) {
  for (const [url, file] of bad) console.error(`✗ ${url}  (${file})`)
  console.error(`✗ ${bad.size} URL(s) without trailing slash or over http:// — GitHub Pages would redirect them.`)
  process.exit(1)
}

console.log(`✓ OK: ${pages.length} files, own URLs end with a slash`)
