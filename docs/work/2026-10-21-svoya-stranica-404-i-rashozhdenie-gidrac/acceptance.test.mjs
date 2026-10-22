// Приёмка задачи 9 по собранному сайту: сначала соберите сайт (generate), затем `node --test <этот файл>`.
// Страницы читаются из .output/public. Критерии 1-7, 11, 15 и гидрационная часть 18 проверяются только в браузере.
import { test, describe } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync, readdirSync, statSync } from 'node:fs'
import vm from 'node:vm'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { resolve, join, relative, sep } from 'node:path'

const ROOT = resolve(fileURLToPath(new URL('.', import.meta.url)), '../../..')
const PUBLIC = resolve(ROOT, '.output/public')

const read = (file) => readFileSync(resolve(PUBLIC, file), 'utf8')
const readLocale = (name) => JSON.parse(readFileSync(resolve(ROOT, `i18n/locales/${name}.json`), 'utf8'))
const locales = { en: readLocale('en'), ru: readLocale('ru') }

const { findBrowserLocale } = await import(
  pathToFileURL(resolve(ROOT, 'node_modules/@nuxtjs/i18n/dist/runtime/kit/browser.js')).href
)

// ---------- разбор HTML ----------

const scriptsOf = (html) =>
  [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)].map((m) => ({
    attrs: m[1],
    text: m[2],
    index: m.index,
  }))

const headEnd = (html) => html.indexOf('</head>')

// Конфиг i18n берём из того же файла, что и скрипт: это литерал JS, а не JSON, поэтому выполняем его.
const i18nConfig = (html) => {
  const script = scriptsOf(html).find((s) => s.text.includes('window.__NUXT__.config'))
  assert.ok(script, 'в index.html нет скрипта с window.__NUXT__.config')
  const sandbox = { window: {} }
  vm.runInNewContext(script.text, sandbox)
  return sandbox.window.__NUXT__.config.public.i18n
}

const indexHtml = read('index.html')
const notFoundHtml = read('404.html')
const config = i18nConfig(indexHtml)
const COOKIE = config.detectBrowserLanguage.cookieKey
const DEFAULT = config.defaultLocale
const CODES = Array.from(config.locales, (l) => l.code)

// Скрипт перехода: inline-скрипт в <head> без src и без type, в котором есть имя cookie из конфига.
const redirectScripts = (html) =>
  scriptsOf(html).filter(
    (s) => s.index < headEnd(html) && !/\bsrc=|\btype=/.test(s.attrs) && s.text.includes(COOKIE),
  )

const redirectScript = (html) => {
  const found = redirectScripts(html)
  assert.equal(found.length, 1, `скрипт перехода на /ru/ не найден в <head> (найдено ${found.length})`)
  return found[0].text
}

// ---------- запуск скрипта в vm ----------

// Исполняет скрипт перехода с подставными document.cookie, navigator.languages и location.
// cookie и languages можно передать функцией, которая бросает исключение.
const runRedirect = (script, { pathname = '/', search = '', hash = '', cookie = '', languages = [] }) => {
  const calls = []
  const sandbox = {}
  sandbox.window = sandbox
  const ctx = vm.createContext(sandbox)
  const fromJson = (value) => vm.runInContext(`(${JSON.stringify(value)})`, ctx)
  const value = (v) => (typeof v === 'function' ? v() : v)
  const document = {}
  Object.defineProperty(document, 'cookie', { get: () => value(cookie) })
  const navigator = {}
  Object.defineProperty(navigator, 'languages', { get: () => fromJson(value(languages)) })
  const location = {
    pathname,
    search,
    hash,
    replace: (url) => calls.push(String(url)),
    assign: (url) => calls.push(String(url)),
  }
  Object.assign(sandbox, { document, navigator, location, localStorage: {}, matchMedia: () => ({ matches: false }) })
  let thrown = null
  try {
    vm.runInContext(script, ctx)
  } catch (error) {
    thrown = error
  }
  return { calls, thrown }
}

// Эталон: cookie, если её значение среди кодов локалей, иначе findBrowserLocale, иначе локаль по умолчанию.
const expectedLocale = ({ cookieValue, languages }) =>
  cookieValue && CODES.includes(cookieValue)
    ? cookieValue
    : findBrowserLocale(config.locales, languages) || DEFAULT

const expectedTarget = ({ cookieValue, languages, search = '', hash = '' }) => {
  const code = expectedLocale({ cookieValue, languages })
  return code === DEFAULT ? null : `/${code}/${search}${hash}`
}

const cookieString = (value) => (value ? `${COOKIE}=${value}` : '')

// ---------- 8: noindex на странице 404 ----------

test('8. 404.html остаётся закрытой от индексации: в нём есть robots noindex, nofollow', () => {
  assert.match(notFoundHtml, /<meta name="robots" content="noindex, nofollow"\s*\/?>/, 'у страницы 404 пропал noindex, nofollow')
})

// ---------- 9: тексты ошибки ----------

describe('9. тексты страницы ошибки в en.json и ru.json', () => {
  const KEYS = ['notFoundTitle', 'notFoundText', 'failedTitle', 'failedText', 'home', 'course']
  for (const code of ['en', 'ru']) {
    test(`${code}.json: блок error состоит ровно из шести ключей`, () => {
      assert.ok(locales[code].error, `в ${code}.json нет блока error: страница ошибки останется без своих текстов`)
      assert.deepEqual(Object.keys(locales[code].error).sort(), [...KEYS].sort(), `в ${code}.json в блоке error не те ключи`)
    })
    test(`${code}.json: тексты ошибки непустые строки без |, @ и {`, () => {
      const block = locales[code].error
      assert.ok(block, `в ${code}.json нет блока error`)
      for (const key of KEYS) {
        const text = block[key]
        assert.equal(typeof text, 'string', `error.${key} в ${code}.json не строка`)
        assert.ok(text.trim().length > 0, `error.${key} в ${code}.json пустой`)
        assert.ok(!/[|@{]/.test(text), `error.${key} в ${code}.json содержит |, @ или {: i18n примет их за разметку`)
      }
    })
  }
  test('заголовки ошибок: «Page not found» / «Something went wrong» и по-русски', () => {
    const got = {
      en: [locales.en.error?.notFoundTitle, locales.en.error?.failedTitle],
      ru: [locales.ru.error?.notFoundTitle, locales.ru.error?.failedTitle],
    }
    assert.deepEqual(got.en, ['Page not found', 'Something went wrong'], 'английские заголовки ошибок не такие, как обещано владельцу')
    assert.deepEqual(got.ru, ['Страница не найдена', 'Что-то пошло не так'], 'русские заголовки ошибок не такие, как обещано владельцу')
  })
})

// ---------- 10: ссылки LangSwitch и подвала на пререндеренных страницах ----------

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })

const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`))?.[1]

test('10. на каждой странице ссылки переключателя языка и подвала ведут на /X/ и /ru/X/', () => {
  const pages = walk(PUBLIC).filter((f) => f.endsWith(`${sep}index.html`))
  const bad = []
  let checked = 0
  for (const file of pages) {
    const html = readFileSync(file, 'utf8')
    if (!html.includes('id="__nuxt"')) continue
    checked++
    const path = '/' + relative(PUBLIC, file).slice(0, -'index.html'.length).split(sep).join('/')
    const base = path.startsWith('/ru/') ? path.slice(3) : path === '/ru/' ? '/' : path
    const want = { en: base, ru: `/ru${base}` }
    const tags = [...html.matchAll(/<a\s[^>]*>/g)]
      .map((m) => m[0])
      .filter((t) => /class="[^"]*\b(lang__item|footer__lang)\b/.test(t) && attr(t, 'hreflang'))
    for (const code of ['en', 'ru']) {
      const hrefs = tags.filter((t) => attr(t, 'hreflang') === code).map((t) => attr(t, 'href'))
      if (hrefs.length < 2 || hrefs.some((h) => h !== want[code])) bad.push(`${path} ${code}: ${hrefs.join(', ') || 'нет ссылок'} (ждём ${want[code]})`)
    }
  }
  assert.ok(checked > 10, `страниц с приложением найдено мало (${checked}): сайт собран?`)
  assert.deepEqual(bad, [], `на пререндеренных страницах сломаны ссылки на другой язык:\n${bad.join('\n')}`)
})

// ---------- 17: где стоит скрипт ----------

describe('17. скрипт перехода в index.html', () => {
  test('в <head> index.html ровно один inline-скрипт перехода с именем cookie из конфига', () => {
    assert.equal(redirectScripts(indexHtml).length, 1, 'в <head> главной нет скрипта, который до запуска Nuxt уводит русскоязычных на /ru/')
  })
  test('скрипт стоит раньше первого <script type="module">', () => {
    const script = redirectScripts(indexHtml)[0]
    assert.ok(script, 'скрипта перехода нет вообще')
    const module = scriptsOf(indexHtml).find((s) => /type="module"/.test(s.attrs))
    assert.ok(module, 'в index.html нет модульного скрипта Nuxt')
    assert.ok(script.index < module.index, 'скрипт перехода стоит после запуска Nuxt: гидрация снова пойдёт поверх английского HTML')
  })
  test('такой же скрипт есть в 404.html', () => {
    assert.equal(redirectScripts(notFoundHtml).length, 1, 'в 404.html нет скрипта перехода')
  })
  test('конфиг i18n держится на правиле скрипта: redirectOn root, useCookie, ключ cookie i18n_locale', () => {
    assert.deepEqual(
      [config.detectBrowserLanguage.redirectOn, config.detectBrowserLanguage.useCookie, COOKIE, CODES],
      ['root', true, 'i18n_locale', ['en', 'ru']],
      'конфиг определения языка изменился: правило скрипта перехода надо пересмотреть',
    )
  })
})

// ---------- 13: правило против findBrowserLocale ----------

describe('13. решение скрипта совпадает с findBrowserLocale i18n', () => {
  const LISTS = [['ru-RU'], ['en-GB', 'ru-RU'], ['uk', 'ru'], ['de'], [], ['RU'], ['ru-UA', 'en'], ['zh-CN', 'ru-RU', 'en-US']]
  for (const languages of LISTS) {
    for (const cookieValue of [undefined, 'en', 'ru']) {
      const target = expectedTarget({ cookieValue, languages })
      const name = `navigator.languages ${JSON.stringify(languages)}, cookie ${cookieValue ?? '-'}: ${target ? `переход на ${target}` : 'остаёмся на /'}`
      test(name, () => {
        const { calls, thrown } = runRedirect(redirectScript(indexHtml), { cookie: cookieString(cookieValue), languages })
        assert.equal(thrown, null, `скрипт бросил исключение: ${thrown?.message}`)
        assert.deepEqual(calls, target ? [target] : [], target ? `читателя не увели на ${target}` : 'читателя без причины увели с /')
      })
    }
  }
})

// ---------- 12: cookie ----------

describe('12. разбор cookie', () => {
  test('cookie с неподдерживаемым значением (de) не учитывается, решает язык браузера: ru', () => {
    const { calls } = runRedirect(redirectScript(indexHtml), { cookie: `${COOKIE}=de`, languages: ['ru-RU'] })
    assert.deepEqual(calls, ['/ru/'], 'cookie de заблокировала переход русскоязычного читателя')
  })
  test('cookie с неподдерживаемым значением (de) не учитывается, решает язык браузера: en', () => {
    const { calls } = runRedirect(redirectScript(indexHtml), { cookie: `${COOKIE}=de`, languages: ['en-US'] })
    assert.deepEqual(calls, [], 'cookie de увела англоязычного читателя на /ru/')
  })
  test('cookie с похожим именем (i18n_locale2=ru) не считается', () => {
    const { calls } = runRedirect(redirectScript(indexHtml), { cookie: `${COOKIE}2=ru`, languages: ['en-US'] })
    assert.deepEqual(calls, [], 'чужая cookie i18n_locale2 увела читателя на /ru/')
  })
  test('нужная cookie в середине строки (a=1; i18n_locale=ru; b=2) читается', () => {
    const { calls } = runRedirect(redirectScript(indexHtml), { cookie: `a=1; ${COOKIE}=ru; b=2`, languages: ['en-US'] })
    assert.deepEqual(calls, ['/ru/'], 'cookie посреди строки не прочитана: читатель, выбравший русский, остался на /')
  })
  test('cookie en побеждает русский язык браузера', () => {
    const { calls } = runRedirect(redirectScript(indexHtml), { cookie: `a=1; ${COOKIE}=en; b=2`, languages: ['ru-RU'] })
    assert.deepEqual(calls, [], 'читателя, выбравшего English, увели на /ru/')
  })
})

// ---------- 14: query и hash ----------

test('14. /?utm_source=x#contact при русском браузере уходит на /ru/?utm_source=x#contact', () => {
  const { calls } = runRedirect(redirectScript(indexHtml), { search: '?utm_source=x', hash: '#contact', languages: ['ru-RU'] })
  assert.deepEqual(calls, ['/ru/?utm_source=x#contact'], 'UTM-метка или якорь потерялись при переходе на /ru/')
})

// ---------- 16: только на «/» и без исключений ----------

describe('16. скрипт перехода безопасен', () => {
  for (const pathname of ['/ru/', '/course/', '/index.html', '/nope/']) {
    test(`на ${pathname} при cookie ru скрипт ничего не делает`, () => {
      const { calls, thrown } = runRedirect(redirectScript(indexHtml), { pathname, cookie: cookieString('ru'), languages: ['ru-RU'] })
      assert.equal(thrown, null, `скрипт бросил исключение: ${thrown?.message}`)
      assert.deepEqual(calls, [], `скрипт увёл читателя со страницы ${pathname}`)
    })
  }
  test('если чтение document.cookie падает, исключение не уходит наружу', () => {
    const { thrown } = runRedirect(redirectScript(indexHtml), {
      cookie: () => {
        throw new Error('cookie запрещены')
      },
      languages: ['ru-RU'],
    })
    assert.equal(thrown, null, 'исключение из document.cookie ломает страницу')
  })
  test('если чтение navigator.languages падает, исключение не уходит наружу', () => {
    const { thrown } = runRedirect(redirectScript(indexHtml), {
      languages: () => {
        throw new Error('нет языков')
      },
    })
    assert.equal(thrown, null, 'исключение из navigator.languages ломает страницу')
  })
  test('скрипт из 404.html на /nope/ не вызывает переход', () => {
    const { calls, thrown } = runRedirect(redirectScript(notFoundHtml), { pathname: '/nope/', cookie: cookieString('ru'), languages: ['ru-RU'] })
    assert.equal(thrown, null, `скрипт бросил исключение: ${thrown?.message}`)
    assert.deepEqual(calls, [], 'на странице 404 скрипт увёл читателя на другой адрес')
  })
})
