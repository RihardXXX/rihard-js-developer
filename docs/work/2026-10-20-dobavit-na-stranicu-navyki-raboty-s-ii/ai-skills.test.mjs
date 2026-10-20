// Проверка собранного сайта: сначала `npm run generate`, затем `node --test <этот файл>`.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { resolve } from 'node:path'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../..')
const PUBLIC = resolve(ROOT, '.output/public')
const PAGES = { en: 'index.html', ru: 'ru/index.html' }
const AI_LABELS = [
  'Claude Code',
  'Multi-agent orchestration',
  'MCP (context7 · Playwright · Figma · Chrome)',
  'Agent Skills',
  'Claude API',
  'OpenAI Codex',
]
const FEATURED = ['Claude Code', 'Multi-agent orchestration']
const KNOWS_ABOUT_NEW = [
  'AI-assisted development',
  'Claude Code',
  'Multi-agent orchestration',
  'Model Context Protocol',
  'Agent Skills',
  'Claude API',
  'OpenAI Codex',
]

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/g, "'")

function page(locale) {
  const file = resolve(PUBLIC, PAGES[locale])
  if (!existsSync(file)) assert.fail(`Нет ${file}: сначала npm run generate`)
  return readFileSync(file, 'utf8')
}

/** Группы секции «Стек»: заголовок, подписи, классы пунктов, src иконок. */
function groups(locale) {
  const html = page(locale)
  const chunks = html.split('<div class="skills__group"').slice(1)
  return chunks.map((chunk) => {
    const body = chunk.slice(0, chunk.indexOf('</ul>'))
    const title = decode((body.match(/<h3 class="skills__title"[^>]*>([^<]*)</) ?? [, ''])[1]).trim()
    const items = [...body.matchAll(/<li class="([^"]*)"[^>]*>([\s\S]*?)<\/li>/g)].map((m) => ({
      classes: m[1].split(/\s+/),
      label: decode((m[2].match(/class="skill__label"[^>]*>([^<]*)</) ?? [, ''])[1]),
      icon: (m[2].match(/<img[^>]*\ssrc="([^"]*)"/) ?? [, null])[1],
      html: m[2],
    }))
    return { title, items, body }
  })
}

function aiGroup(locale) {
  const g = groups(locale).find((x) => x.items.some((i) => i.label === 'Claude Code'))
  if (!g) assert.fail(`[${locale}] В секции «Стек» нет группы с ИИ-навыками (Claude Code)`)
  return g
}

const flatKeys = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatKeys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
const readLocale = (l) => JSON.parse(readFileSync(resolve(ROOT, `i18n/locales/${l}.json`), 'utf8'))

function person(locale) {
  const html = page(locale)
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    const data = JSON.parse(m[1])
    const nodes = data['@graph'] ?? [data]
    const p = nodes.find((n) => [n['@type']].flat().includes('Person'))
    if (p) return p
  }
  assert.fail(`[${locale}] В JSON-LD нет узла Person`)
}

for (const locale of ['en', 'ru']) {
  test(`[${locale}] в «Стеке» есть группа ИИ с заголовком, а не сырым ключом`, () => {
    const g = aiGroup(locale)
    assert.ok(g.title.length > 0, 'У ИИ-группы пустой заголовок')
    assert.ok(!g.title.startsWith('skills.'), `Вместо заголовка показан сырой ключ: ${g.title}`)
    // groups() builds fresh objects on every call, so compare by content, not identity.
    const others = groups(locale)
      .filter((x) => !x.items.some((i) => i.label === 'Claude Code'))
      .map((x) => x.title)
    assert.ok(!others.includes(g.title), 'Заголовок ИИ-группы совпадает с заголовком другой группы')
  })

  test(`[${locale}] на странице нет сырых ключей skills.groups.*`, () => {
    assert.ok(!/>\s*skills\.groups\./.test(page(locale)), 'На странице виден сырой ключ skills.groups.*')
  })

  test(`[${locale}] ИИ-группа стоит последней, после Frontend/Backend/Tooling`, () => {
    const gs = groups(locale)
    assert.equal(gs.length, 4, `Групп в «Стеке» ${gs.length}, ожидалось 4`)
    assert.ok(gs[3].items.some((i) => i.label === 'Claude Code'), 'ИИ-группа не последняя')
  })

  test(`[${locale}] подписи ИИ-навыков в нужном составе и порядке`, () => {
    assert.deepEqual(aiGroup(locale).items.map((i) => i.label), AI_LABELS)
  })

  test(`[${locale}] подсвечены только Claude Code и Multi-agent orchestration`, () => {
    const featured = aiGroup(locale).items.filter((i) => i.classes.includes('skill--featured')).map((i) => i.label)
    assert.deepEqual(featured, FEATURED)
  })

  test(`[${locale}] у каждого ИИ-навыка есть иконка, и файл иконки существует`, () => {
    const items = aiGroup(locale).items
    assert.equal(items.length, AI_LABELS.length, 'Состав группы неверный, иконки проверять рано')
    for (const i of items) {
      assert.ok(i.icon, `У «${i.label}» нет иконки`)
      assert.match(i.icon, /^\/icons\/tech\/[^/]+\.svg$/, `Странный путь иконки у «${i.label}»: ${i.icon}`)
      assert.ok(existsSync(resolve(PUBLIC, i.icon.slice(1))), `Иконка «${i.label}» даст 404: ${i.icon}`)
    }
  })

  test(`[${locale}] в ИИ-группе нет заглушки «λ»`, () => {
    const g = aiGroup(locale)
    assert.ok(!g.body.includes('λ'), 'У ИИ-навыка показана заглушка «λ» (она означает Effect-TS)')
  })

  test(`[${locale}] Effect-TS остаётся единственным spotlight`, () => {
    assert.equal(page(locale).split('class="spotlight"').length - 1, 1, 'Spotlight-блоков не один')
    assert.match(page(locale), /class="spotlight__name"[^>]*>Effect-TS</, 'Spotlight не про Effect-TS')
  })

  test(`[${locale}] Effect-TS в Backend по-прежнему подсвечен и с «λ»`, () => {
    const backend = groups(locale)[1]
    const eff = backend?.items.find((i) => i.label === 'Effect-TS')
    assert.ok(eff, 'В Backend пропал Effect-TS')
    assert.ok(eff.classes.includes('skill--featured'), 'Effect-TS больше не подсвечен')
    assert.ok(eff.html.includes('λ'), 'У Effect-TS пропал значок «λ»')
  })

  test(`[${locale}] meta description упоминает ИИ`, () => {
    const m = page(locale).match(/<meta name="description" content="([^"]*)"/)
    assert.ok(m, 'Нет meta description')
    assert.match(decode(m[1]), /\bAI\b|ИИ|Claude/, `В description нет упоминания ИИ: ${decode(m[1])}`)
  })

  test(`[${locale}] description по-прежнему упоминает Effect-TS`, () => {
    const m = page(locale).match(/<meta name="description" content="([^"]*)"/)
    assert.ok(m && m[1].includes('Effect-TS'), 'В description пропал Effect-TS')
  })

  test(`[${locale}] knowsAbout в JSON-LD содержит ИИ-навыки, Effect-TS первым`, () => {
    const k = person(locale).knowsAbout
    assert.ok(Array.isArray(k), 'У Person нет knowsAbout')
    assert.equal(k[0], 'Effect-TS', 'Effect-TS больше не первый в knowsAbout')
    for (const s of KNOWS_ABOUT_NEW) assert.ok(k.includes(s), `В knowsAbout нет «${s}»`)
  })
}

test('ключи en.json и ru.json совпадают', () => {
  const en = flatKeys(readLocale('en')).sort()
  const ru = flatKeys(readLocale('ru')).sort()
  assert.deepEqual(en.filter((k) => !ru.includes(k)), [], 'Ключи есть в en, нет в ru')
  assert.deepEqual(ru.filter((k) => !en.includes(k)), [], 'Ключи есть в ru, нет в en')
})

test('локали отличаются от базы nuxt4 ровно ключом skills.groups.ai', () => {
  for (const l of ['en', 'ru']) {
    const base = JSON.parse(execFileSync('git', ['-C', ROOT, 'show', `nuxt4:i18n/locales/${l}.json`], { encoding: 'utf8' }))
    const was = flatKeys(base)
    const now = flatKeys(readLocale(l))
    assert.deepEqual(now.filter((k) => !was.includes(k)), ['skills.groups.ai'], `[${l}] Добавлены не те ключи`)
    assert.deepEqual(was.filter((k) => !now.includes(k)), [], `[${l}] Ключи удалены`)
  }
})
