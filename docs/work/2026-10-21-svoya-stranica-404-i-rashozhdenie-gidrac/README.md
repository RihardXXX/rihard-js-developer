# 9. Своя страница 404 и расхождение гидрации на / при ru

<!-- crew:auto:meta -->
вид: bug · уровень: L · вердикт: assumptions · ветка: fix/svoya-stranica-404-i-rashozhdenie-gidrac · фаза: QA пройдено
<!-- /crew:auto -->

## Задача

страница 404 сейчас стандартная от Nuxt и по-английски; на / при русском языке браузера есть расхождение гидрации; поправь

## Причина (отладчик)

Отладчик воспроизвёл оба дефекта в headless Chromium на локальной сборке nuxt4 (7f8bf96), Метрика заблокирована. Код не правил. Прод не проверял.

### Дефект 1. Страница 404 стандартная от Nuxt и по-английски

**Воспроизведение.** Собрать сайт, отдать сервером как у GitHub Pages и открыть 4 адреса при ru-RU и en-US. Результат одинаков при обоих языках браузера:

| адрес | HTTP | `<html lang>` | title | текст |
|---|---|---|---|---|
| /course/nope/ | 404 | en-US | `404 - lesson not found \| Nuxt` | `404 / lesson not found / lesson not found / Go back home` |
| /ru/course/nope/ | 404 | ru-RU | то же | то же, по-английски |
| /ru/nope/ | 404 | ru-RU | `404 - Page not found: /ru/nope/ \| Nuxt` | `Page not found: /ru/nope/` дважды, `Go back home` |
| /nope/ | 404 | en-US | `404 - Page not found: /nope/ \| Nuxt` | то же |

- Шапки и подвала нет.
- Единственная ссылка, «Go back home», ведёт на `/`, даже с `/ru/...`.
- В сыром 404.html есть `noindex, nofollow`.

**Ожидается.** Своя страница в оформлении сайта, на языке адреса, со ссылкой на главную этого языка.

**Причина.**
- В проекте нет `app/error.vue`, поэтому Nuxt берёт свою страницу (`nuxt/dist/index.mjs:8336`):
  - она по-английски (`error-404.vue:4-23`);
  - в title подставляет «Nuxt»;
  - ссылка ведёт на `/` (`error-404.vue:41`).
- Страница ошибки рисуется вместо всего приложения (`nuxt-root.vue:4-7`). Поэтому нет layout, titleTemplate и `useLocaleHead` из app.vue.
- «lesson not found» берётся из `app/pages/course/[slug].vue:39` и выводится дважды: как `statusMessage` и как `message` (`nuxt-error-page.vue:21-22`).
- Для неизвестных маршрутов «Page not found: …» ставит роутер Nuxt (`pages/runtime/plugins/router.js:226-236`).
- `lang="ru-RU"` на `/ru/...` ставит nuxt-seo-utils по локали (`applyDefaults.js:13-16, 52-53`). Отсюда lang русский, а текст английский.
- Локаль на 404.html берётся из префикса пути (`@nuxtjs/i18n` `kit/routing.js:35-36`): `/ru/...` даёт ru, всё остальное — en.

**Прототип** `app/error.vue` с `<NuxtLayout>`, `useI18n` и `useLocalePath` во временной копии. Что работает:
- шапка и подвал на месте, на `/ru/...` тексты русские;
- ссылка ведёт на `/ru/`, клик снимает ошибку (`router.js:107-108`).

Два подвоха:
1. На неизвестных маршрутах `switchLocalePath()` возвращает пустую строку. Тогда ссылки в `app/components/ui/LangSwitch.vue:45` и `app/components/layout/TheFooter.vue:44` остаются без `href`.
2. Там же title из `useHead` в error.vue перебивается запасным заголовком nuxt-seo-utils `404 - <message>` (`nuxt-seo-utils/dist/runtime/app/plugins/titles.js:15`, `useFallbackTitle.js:15-16`). На `/course/nope/` свой title победил. Почему на неизвестных маршрутах иначе, не выяснено.

В Nuxt 4.4 `statusCode`/`statusMessage` у ошибки помечены устаревшими, вместо них `status`/`statusText` (`nuxt/dist/app/composables/error.d.ts:11-14`).

**Варианты.**
1. **Рекомендован.** `app/error.vue` с `<NuxtLayout>`:
   - тексты из en.json/ru.json по `error.status` (404 или прочее);
   - ссылки через `localePath('/')`, можно и `localePath('/course/')`;
   - свой title с проверкой на неизвестных маршрутах;
   - в LangSwitch и TheFooter запасной путь `switchLocalePath(code) || localePath('/', code)`.
2. `app/error.vue` без layout. Дешевле, но без шапки и подвала.

**Как проверить.**
- По Node:
  - в 404.html остаётся `noindex, nofollow`;
  - ключи ошибки одинаковы в en.json и ru.json.
- В браузере, матрица 4 адреса × ru-RU/en-US:
  - HTTP 404;
  - язык текста совпадает с префиксом;
  - есть `header.header` и `footer`;
  - ссылка на главную — `/ru/` или `/`;
  - у ссылок LangSwitch есть `href`;
  - в title нет «Nuxt»;
  - клик по ссылке на главную снимает ошибку.

### Дефект 2. Расхождение гидрации на `/` при русском языке браузера

**Воспроизведение.** Открыть `/` с locale ru-RU без cookie. Итоговый адрес `/ru/`, в консоли `Hydration completed but contains mismatches.`. При en-US расхождений нет.

С `debug: { hydration: true }` 140 сообщений:
- 72 текстовых (`Rihard Alikhanov` / `Рихард Алиханов`);
- атрибуты: `href="/"` против `"/ru/"`, `href="/course/"` против `"/ru/course/"`, английские `alt`;
- классы: в LangSwitch и подвале активен English.

**Видимое следствие.** Vue в проде расхождения атрибутов и классов не исправляет. После перехода на `/ru/` в DOM остаются:
- логотип с `href="/"`;
- ссылка `/course/`;
- английские `alt`;
- активный English в переключателе.

При прямом заходе на `/ru/` всё правильно.

**Причина.** Детекция языка i18n в статической сборке срабатывает до монтирования:
- `nuxt.config.ts:104-108` — `detectBrowserLanguage { useCookie, redirectOn: 'root' }`.
- `@nuxtjs/i18n/dist/runtime/plugins/route-locale-detect.js:19-24` до монтирования выбирает язык (cookie → navigator, `utils.js:179-183`). Во время гидрации смена применяется сразу (`context.js:100-101`).
- Middleware того же плагина (`route-locale-detect.js:30-34`) на первой навигации до монтирования (`router.js:238-256`) перенаправляет на `/ru/` (`utils.js:215-219`).
- Vue гидрирует русскую `/ru/` поверх английского HTML страницы `/`.

Отладочный плагин показал порядок:
```
user plugin setup: locale=ru route=/ isHydrating=true
i18n:beforeLocaleSwitch: ru->ru initialSetup=true
router.beforeEach: / -> /ru/
app:beforeMount: locale=ru route=/ru/ isHydrating=true
[Vue warn] Hydration text content mismatch … server: Rihard Alikhanov / client: Рихард Алиханов
```

Подтверждено предсказанием по cookie:

| navigator | cookie | итог | сообщений о гидрации |
|---|---|---|---|
| ru-RU | `i18n_locale=en` | `/` | 0 |
| en-US | `i18n_locale=ru` | `/ru/` | 140 |
| ru-RU | нет | `/ru/` | 140 |
| en-US | нет | `/` | 0 |

Cookie `ru` ставится уже при первом визите. Значит, русскоязычный читатель получает расхождение при каждом заходе на `/`.

**Исключено.**
- Тема: en-US с тёмной схемой даёт 0 расхождений.
- Другие адреса: `/course/`, `/course/closures/`, `/ru/` при ru-RU дают 0 расхождений.
- LangSwitch, дата и `useLocaleHead` — только следствия смены языка.

**Варианты.**
1. **Рекомендован, если автопереход на `/ru/` нужен.** Inline-скрипт в `<head>` рядом со скриптом темы (`nuxt.config.ts:134-141`):
   - работает только на `pathname === '/'`;
   - берёт cookie `i18n_locale`, иначе первый элемент `navigator.languages` с основным тегом `en` или `ru` (правило i18n из `kit/browser.js:1-31`);
   - при `ru` делает `location.replace('/ru/' + search + hash)`;
   - `detectBrowserLanguage` остаётся и ведёт cookie.

   Цена:
   - правило продублировано, и при расхождении скрипта с i18n дефект вернётся;
   - лишний HTML-запрос для русскоязычных, зато без мелькания английского.
2. **Самый дешёвый.** `detectBrowserLanguage: false`. Причина уходит полностью, но на голом домене читатель остаётся на английском, пока не нажмёт RU.
3. **Не рекомендован.** Откладывать детекцию через `i18n:beforeLocaleSwitch`. Это опора на внутренности модуля (`route-locale-detect.js:32`), и английский всё равно мелькнёт.

**Как проверить.**
- По Node:
  - для варианта 1 inline-скрипт стоит в `<head>` index.html раньше `type="module"`;
  - юнит-тест правила против `findBrowserLocale` из `kit/browser.js`: `['ru-RU']`→ru, `['en-GB','ru-RU']`→en, `['uk','ru']`→ru, плюс приоритет cookie;
  - для варианта 2 в `__NUXT__.config` index.html стоит `detectBrowserLanguage:false`.
- В браузере:
  - матрица по cookie выше: 0 сообщений «Hydration» во всех 4 случаях;
  - после перехода `href` логотипа — `/ru/`, активен Русский.

### Не проверено
- Прод.
- context7 — сверено по установленному коду Nuxt 4.4.7 и @nuxtjs/i18n 10.4.
- Почему title из error.vue проигрывает запасному заголовку nuxt-seo-utils только на неизвестных маршрутах.

## Бриф

### Коротко

Два независимых дефекта. Первый: страница 404 стандартная от Nuxt. Делаем `app/error.vue` в оформлении сайта, на языке адреса. Второй: при русском языке браузера `/` даёт расхождение гидрации. Делаем inline-скрипт в `<head>`, он до запуска Nuxt переводит на `/ru/` (решение владельца). Уровень L: правки входа на сайт для всех русскоязычных, шапки и подвала на всех страницах, плюс последствия для Метрики и поисковиков. Вердикт assumptions: код писать можно. Открыт один вопрос: что делать с источником перехода в Метрике.

### Решения владельца

- **Гидрация.** Ответ на вопрос отладчика, дословно: «Перевод на /ru/ (Recommended)». Это вариант 1 отладчика: inline-скрипт в `<head>` до запуска Nuxt переводит на `/ru/` по cookie `i18n_locale` или `navigator.languages`, `detectBrowserLanguage` остаётся.
- **404.** Выбор аналитика (владелец его не делал): вариант 1 отладчика, `app/error.vue` с `<NuxtLayout>`. Почему: без шапки и подвала (вариант 2) у страницы нет переключателя языка и навигации, это тупик. Разница в цене небольшая: два запасных пути по одной строке (LangSwitch, TheFooter) и приоритет title.

### Что просят

1. Вместо английской заглушки Nuxt нужна своя страница ошибки: шапка и подвал сайта, текст на языке адреса (`/ru/...` по-русски, остальное по-английски), ссылка на главную этого языка, свой title без «Nuxt».
2. Русскоязычный читатель, открывший `/`, попадает на `/ru/` без расхождения гидрации. Логотип, ссылки, `alt` и переключатель после перехода должны быть русскими.

### Как воспроизвести (bug)

- Сборка `npm run generate` в W. `.output/public` отдаёт сервер как у GitHub Pages: `404.html` на неизвестные адреса с HTTP 404, 301 для каталога без слэша.
- Браузер headless Chromium, Метрика заблокирована до первой загрузки.
- **404.** Открыть `/nope/`, `/ru/nope/`, `/course/nope/`, `/ru/course/nope/` при ru-RU и при en-US.
  - Ожидается: страница сайта на языке префикса со ссылкой на главную этого языка.
  - Фактически: английская заглушка Nuxt без шапки и подвала; title `404 - … | Nuxt`; единственная ссылка ведёт на `/` (таблица в «Причина (отладчик)»).
- **Гидрация.** Свежий контекст с locale ru-RU без cookie, открыть `/`.
  - Ожидается: `/ru/`, 0 сообщений «Hydration» в консоли.
  - Фактически: `/ru/`, в консоли `Hydration completed but contains mismatches.` (140 расхождений). В DOM остаются логотип `href="/"`, ссылка `/course/`, английские `alt` и активный English.
  - Так же ведёт себя en-US с cookie `i18n_locale=ru`.

### Причина (файл:строка, по отладчику, сверено в W)

- **404.**
  - `app/error.vue` нет, поэтому Nuxt берёт свою страницу (`node_modules/nuxt/dist/index.mjs:8336`). Она рисуется вместо всего приложения, так что layout и head из `app/app.vue` на ней нет.
  - Тексты ошибки задают `app/pages/course/[slug].vue:39` («lesson not found») и роутер Nuxt («Page not found: …»).
  - Запасной заголовок nuxt-seo-utils `404 - <message>` (`nuxt-seo-utils/dist/runtime/app/composables/useFallbackTitle.js:15-16`) ставится с приоритетом 101 (`plugins/titles.js:11-15`).
- **Гидрация.**
  - `nuxt.config.ts:104-108` (`detectBrowserLanguage`, `redirectOn: 'root'`).
  - Детекция i18n выбирает ru до монтирования (`@nuxtjs/i18n/dist/runtime/utils.js:178-196`: cookie, только если локаль поддерживается, иначе navigator) и перенаправляет на `/ru/` на первой навигации (`utils.js:215-219`).
  - В итоге Vue гидрирует русскую `/ru/` поверх английского HTML страницы `/`.

### Известно точно

- `404.html` в статической сборке — пустая SPA-оболочка без SSR: `/404.html` входит в `PRERENDER_NO_SSR_ROUTES` (`node_modules/@nuxt/nitro-server/dist/runtime/utils/renderer/app.mjs:9-13, 28`). В собранном файле `<div id="__nuxt"></div>` пуст и стоит `data-ssr="false"`. Поэтому тексты, шапку и title страницы 404 Node-тестом по HTML не проверить, только браузером.
- В `404.html` уже есть `<meta name="robots" content="noindex, nofollow">` (nuxt-robots, `robotsDisabledValue`).
- `app.head.script` из `nuxt.config.ts` попадает в `<head>` всех страниц, включая `404.html`. Он стоит раньше `<link rel="modulepreload">` и `<script type="module">`: так в собранных `index.html` и `404.html` стоит скрипт темы.
- Сборка минифицирует inline-скрипты: скрипт темы в `.output/public/404.html` переписан (обратные кавычки, `catch{}`). Тест должен выполнять скрипт, а не сравнивать текст.
- Правило i18n для языка браузера (`kit/browser.js:1-31`): выигрывает первый элемент `navigator.languages`, у которого основной тег `en` или `ru`. Совпадений нет, значит локаль по умолчанию (en).
- Cookie `i18n_locale`: путь `/`, срок 365 дней, значение `en` или `ru`. i18n пишет её при каждой установке локали, в том числе при первом заходе на любую страницу (`context.js:17-26, 94, 105-108`). Неподдерживаемое значение (например, `de` от удалённых локалей) детекция пропускает (`utils.js:192-194`).
- `__NUXT__.config.public.i18n` в собранном `index.html` содержит `locales` (code, language) и `detectBrowserLanguage.cookieKey: "i18n_locale"`. Тест может взять правило из этих данных, а не из копии.
- В Nuxt 4.4 `error.status` — геттер над `statusCode` (`nuxt/dist/app/composables/error.js:41-44`), `statusCode` помечен устаревшим (`error.d.ts:11-14`).
- Переход по ссылке со страницы ошибки снимает ошибку (`nuxt/dist/pages/runtime/plugins/router.js:106-108`).
- Проверка равенства ключей en/ru уже есть: `scripts/course.test.mjs:1045-1053`. Новые ключи она охватит сама.
- `location.replace` по спецификации HTML передаёт новой странице referrer страницы, с которой ушли (`https://rihard-developer.ru/`). Исходный внешний referrer до `/ru/` не доходит. Сейчас i18n переводит через `history`, без перезагрузки, и `document.referrer` остаётся внешним.

### Не знаем

- Почему на неизвестных маршрутах title из error.vue проигрывает запасному заголовку nuxt-seo-utils, а на `/course/nope/` выигрывает (отладчик не выяснил).
- Как Метрика 97775681 запишет источник визита, если первый хит пришёл с referrer собственного сайта. Скорее всего, «Внутренние переходы»: догадка, в Метрике не проверено.
- Какой `navigator.languages` у рендерера YandexBot. Если `ru`, он увидит на `/` JS-переход на `/ru/`. Googlebot, по общему знанию, рендерит с en-US; это тоже не проверено.
- Прод: отладчик проверял только локальную сборку.

### Где в коде

- `nuxt.config.ts:134-141` — `app.head.script`, образец: скрипт темы (try/catch, `tagPosition: 'head'`). Сюда идёт скрипт перевода на `/ru/`. `nuxt.config.ts:104-108` не трогаем.
- `app/error.vue` — **новый**. Образцы:
  - `app/app.vue:66-70` — `<NuxtLayout>`;
  - `app/pages/course/[slug].vue:12-13, 47-50` — `useI18n`, `useLocalePath`, `useSeoMeta`;
  - `app/components/sections/CourseSection.vue:23` — `AppButton :to="localePath(...)"`;
  - `app/components/ui/AppSection.vue`.

  Title — полной строкой `<заголовок> · <brand.name>` по формату `titleTemplate` из `app/app.vue:13-17`: на странице ошибки `app.vue` не рисуется.
- `app/components/ui/LangSwitch.vue:45` и `app/components/layout/TheFooter.vue:44` — запасной путь `switchLocalePath(l.code) || localePath('/', l.code)`.
- `i18n/locales/en.json`, `i18n/locales/ru.json` — новый верхний блок `error`, по образцу блока `footer` (`en.json:208-213`).
- Тесты:
  - `scripts/*.test.mjs` на `node:test`; образец чтения сборки — `scripts/check-slash.mjs:9-27`; образец импорта `.ts` из Node — `scripts/course.test.mjs:6`.
  - Правило i18n для сверки — `node_modules/@nuxtjs/i18n/dist/runtime/kit/browser.js`: чистый ESM без импортов, импортируется по пути.
- Не меняем: `app/pages/course/[slug].vue:34-40` (броски ошибок), `app/plugins/metrika.client.ts` (до ответа на вопрос 1).

### Критерии готовности

**404.** Адреса `/nope/`, `/course/nope/`, `/ru/nope/`, `/ru/course/nope/`, каждый при ru-RU и при en-US (8 сценариев):

1. HTTP 404. Есть `header.header` и `footer`, то есть шапка и подвал сайта.
2. Без `/ru/`: `<html lang="en-US">`, заголовок «Page not found», текст английский, ссылки «Back home» → `/` и на содержание курса → `/course/`. Title «Page not found · Rihard Alikhanov».
3. С `/ru/`: `lang="ru-RU"`, «Страница не найдена», текст русский, ссылки → `/ru/` и `/ru/course/`. Title «Страница не найдена · Рихард Алиханов».
4. Ни в title, ни на странице нет «Nuxt», «lesson not found», «Page not found: /…» и сырых ключей `error.*`.
5. У ссылок LangSwitch и подвала на всех 8 сценариях есть `href`: на неизвестных маршрутах `/` и `/ru/`, на `/course/nope/` — `/course/nope/` и `/ru/course/nope/`.
6. Клик по ссылке на главную снимает ошибку и показывает главную того же языка без перезагрузки.
7. Статус, отличный от 404: заголовок «Something went wrong» или «Что-то пошло не так» и та же ссылка на главную.
8. В `.output/public/404.html` остаётся `noindex, nofollow`.
9. Ключи `error.*` — непустые строки в en.json и ru.json, наборы ключей совпадают.
10. На всех пререндеренных страницах ссылки LangSwitch и подвала те же, что до правки: страница `/X/` ссылается на `/X/` и `/ru/X/`.

**Гидрация.** Свежий контекст, заход на `/`:

11. Матрица отладчика:

    | язык браузера | cookie | итог |
    |---|---|---|
    | ru-RU | нет | `/ru/` |
    | en-US | нет | `/` |
    | ru-RU | `i18n_locale=en` | `/` |
    | en-US | `i18n_locale=ru` | `/ru/` |

    Во всех четырёх случаях 0 сообщений «Hydration» в консоли. После перехода на `/ru/` у логотипа `href="/ru/"`, активен «Русский».
12. Cookie с неподдерживаемым значением (`de`) не учитывается, решает язык браузера.
13. Решение скрипта совпадает с `findBrowserLocale` i18n:
    - `['ru-RU']` → `/ru/`;
    - `['en-GB','ru-RU']` → `/`;
    - `['uk','ru']` → `/ru/`;
    - `['de']` → `/`;
    - пустой список → `/`.
14. `?query` и `#hash` сохраняются: `/?utm_source=x#contact` → `/ru/?utm_source=x#contact`.
15. Переход через `location.replace`: «Назад» после перехода не возвращает на `/`.
16. Скрипт ничего не делает на других путях (`/ru/`, `/course/`, `/index.html`, `404.html` на `/nope/`) и не бросает исключение, если чтение `document.cookie` или `navigator.languages` падает.
17. В `.output/public/index.html` скрипт стоит в `<head>` раньше первого `<script type="module">`. Имя cookie и коды локалей в нём совпадают с `__NUXT__.config.public.i18n` того же файла.
18. Без регрессий:
    - `/ru/`, `/course/`, `/course/closures/` дают 0 сообщений «Hydration» при ru-RU и en-US;
    - зелёные `node scripts/check-slash.mjs`, `node scripts/check-sitemap.mjs`, `node --test "scripts/*.test.mjs"`, `npm run lint`, `npm run typecheck`.

### Как проверим починку: сначала красный тест

- **Node, по `.output/public` после `nuxt generate`.** Покрывает критерии 8, 9, 10, 12, 13, 14, 16 (в части путей и исключений) и 17.
  - Скрипт достаём из `index.html` и выполняем в `node:vm` с подставными `document.cookie`, `navigator.languages`, `location` (`pathname`, `search`, `hash`, `replace`). Проверяем, куда и с каким адресом вызван `replace`.
  - Эталон — `findBrowserLocale` из установленного i18n, данные — `__NUXT__.config` того же файла. Если правило в i18n или конфиге разойдётся со скриптом, тест покраснеет.
  - До починки красные 9 (нет ключей), 13, 14, 16 и 17 (нет скрипта). 8 и 10 зелёные: они страхуют от регрессии.
- **Только браузер.** Критерии 1–7, 11, 15 и гидрационная часть 18.
  - Почему не Node: `404.html` — пустая SPA-оболочка, а расхождение гидрации видно только в консоли живой страницы.
  - До починки красные 1–5, 11 (отладчик это уже показал).
  - Сценарий 7: на любой странице подставить ошибку через `__vue_app__.config.globalProperties.$nuxt.payload.error = { status: 500, statusCode: 500, message: 'test' }`. Если так не выйдет, проверить ревью кода.
- **Условия браузера.**
  - Только headless: `playwright-core` из кэша npx, скрипты в scratchpad, в репозиторий не добавляются. Новых зависимостей нет.
  - Свежий контекст на каждый сценарий. `mc.yandex.ru` и `mc.yandex.com` блокируются на уровне контекста до первого `goto`.
  - Сервер как у GitHub Pages.

### Вне рамок

- Вариант 2 (`detectBrowserLanguage: false`) и вариант 3 (`i18n:beforeLocaleSwitch`).
- Серверный редирект по `Accept-Language`: на GitHub Pages его нет.
- Правка `app/plugins/metrika.client.ts` — только по ответу на вопрос 1.
- Перевод `createError` в `[slug].vue` на `status`/`statusText`: устаревшее поле работает, геттер `status` есть.
- hreflang и canonical на странице ошибки: она `noindex`.
- 404 для файлов (`/_nuxt/...`, картинки), редизайн, другие локали.
- Проверка на проде — после выкладки, отдельным шагом QA.

### Зависимости

- Других задач и миграций нет.
- Внешнее:
  - GitHub Pages отдаёт `404.html` с кодом 404 на любой неизвестный адрес; так и остаётся.
  - Метрика: источник перехода, см. вопрос 1.
  - Поисковики: JS-переход на `/`, см. «Риски».
- Выкладка — `npm run deploy`. Перед ней скрипт `scripts/deploy.mjs` запускает `check-slash` и `check-sitemap`.

### Цена ошибки и риски

- **Скрипт неверно читает cookie.** Русскоязычный читатель, выбравший English, при каждом заходе на `/` будет отброшен на `/ru/`, и английская главная станет для него недоступна. Ловят критерии 11 и 13.
- **Скрипт бросает исключение или стоит после Nuxt.** Возвращается текущее расхождение. Ловят критерии 16 и 17.
- **Правило продублировано.** Если i18n поменяет правило при обновлении, дефект вернётся. Страховка — тест 13 против установленного `findBrowserLocale` и данных из `__NUXT__.config`.
- **Сломанный `error.vue`.** Он показывается на любой ошибке, включая сбои загрузки чанков. Если сломается он сам, читатель увидит белый экран, а это хуже нынешней заглушки. Ловят критерии 1–7.
- **LangSwitch и TheFooter на всех страницах.** Если сломать основной путь, локализованные страницы потеряют входящие ссылки (комментарий в `LangSwitch.vue:39-41`), пострадает индексация. Ловит критерий 10.
- **Title на неизвестных маршрутах** может снова проиграть запасному заголовку nuxt-seo-utils. Тогда поднимаем приоритет `useHead` в error.vue (`tagPriority`). Это внутри задачи, но может съесть время на разбор.
- **Поисковики.** Робот с русским языком и JS увидит `/` как переход на `/ru/`. hreflang и canonical не меняются. После выкладки смотрим статус `/` в Вебмастере и Search Console.
- **Метрика.** Источник перехода у русскоязычных, пришедших на голый `/` (например, по ссылке из резюме), потеряется. UTM-метки сохранятся благодаря критерию 14. См. вопрос 1.
- Для русскоязычных на `/` будет лишний HTML-запрос. Это принято владельцем вместе с вариантом 1.

### Вопросы

1. **Источник перехода в Метрике.** После `location.replace` первый хит на `/ru/` уйдёт с referrer `https://rihard-developer.ru/` вместо внешнего (hh.ru, поисковик, Telegram).
   - (а) Принять. Отчёт по источникам для русскоязычных на голом `/` станет беднее, UTM-метки сохранятся.
   - (б) Сохранить. Скрипт кладёт `document.referrer` в `sessionStorage`. `metrika.client.ts` откладывает первый хит (`defer: true`) и шлёт его с сохранённым `referer`. Это API Метрики по документации, в коде не подтверждено. Плюс один файл, примерно 20 строк, и браузерная проверка запроса `watch` (с перехватом и блокировкой).

   Почему спрашиваем: это аналитика владельца, у варианта 1 такой цены в списке не было. Вариант (б) меняет учёт хитов на всех страницах.

### Допущения и цена пересмотра

- **По вопросу 1 работаем по (а): Метрику не трогаем.** Если ответ (б): отдельный шаг в той же ветке — `metrika.client.ts` плюс 2–3 строки в скрипте и браузерная проверка. Примерно полдня. Сделанное не переделывается.
- **Тексты 404 предлагаю такие** (ключи `error.*`, имена уточнит план):
  - en: «Page not found» / «There is no page at this address. The link may be broken or the page has moved.»; «Something went wrong» / «The page failed to load. Try reloading it or go back home.»; «Back home»; «Course contents»;
  - ru: «Страница не найдена» / «По этому адресу ничего нет. Возможно, в ссылке ошибка или страница переехала.»; «Что-то пошло не так» / «Страница не загрузилась. Обновите её или вернитесь на главную.»; «На главную»; «Содержание курса».

  Другая формулировка — правка двух json, минуты.
- **На 404 кроме ссылки на главную есть ссылка на содержание курса:** чаще всего с опечаткой набирают адрес урока. Если владелец её не хочет — убрать 1 строку и 2 ключа.
- **Прод ведёт себя как локальный сервер, имитирующий GitHub Pages.** Файлы те же. Если на проде окажется иначе, код не меняется: дело в проверке после выкладки.

## План

Обозначения: `W` — `.claude/worktrees/fix-svoya-stranica-404-i-rashozhdenie-gidrac`, `S` — `<scratchpad сессии>`. В командах пишутся полные пути, а не `W/…` и не переменные.

### Что план решает сверх брифа

1. **Метрика — вариант (а).** `app/plugins/metrika.client.ts` не трогаем. Потерю внешнего referrer у русскоязычных на голом `/` записать в «Итог».
2. **Ключи `error.*`.** Плоский блок по образцу `footer`: `notFoundTitle`, `notFoundText`, `failedTitle`, `failedText`, `home`, `course`. Тексты — из «Допущений» брифа без изменений.
3. **Критерий 4 и подвал.** В подвале остаётся «built with Nuxt» / «сделано на Nuxt» (`footer.built`), а подвал на странице обязателен по критерию 1. Поэтому отсутствие «Nuxt» проверяем в `title` и в `<main>`, а не во всём документе. Подвал не правим.
4. **Тема на странице ошибки.** `app.vue` на ней не рисуется, значит `useTheme().init` (`app/app.vue:3-4`) не вызывается. В тёмной теме ThemeToggle покажет луну, и первый клик ничего не сменит. В `error.vue` добавляем те же две строки, в браузерном тесте есть проверка.
5. **Ссылка на содержание курса — только при 404.** Ссылка на главную есть при любой ошибке.
6. **Правило скрипта перевода.** Работает только при `location.pathname === '/'`. Если cookie `i18n_locale` равна `en` или `ru`, берём её. Иначе берём первый элемент `navigator.languages`, у которого основной тег (до `-`, без учёта регистра) — `en` или `ru`. Только при итоге `ru` вызываем `location.replace('/ru/' + location.search + location.hash)`. Весь код внутри `try/catch`. Скрипт — отдельный элемент `app.head.script`, со скриптом темы не сливаем.
   - С `findBrowserLocale` из i18n (точное совпадение и совпадение по основному тегу) это правило даёт один и тот же ответ, пока в `navigator.languages` меньше 1000 элементов. Тест сверяет их на матрице.
7. **Lint и typecheck.** `npm run lint` и `npm run typecheck` в проекте не работают: нет `eslint.config` и `vue-tsc` (так же записано в задаче 7). Установка — новая зависимость, её не делаем. Команды прогоняем, результат пишем в «Итог» как отступление от критерия 18.
8. **Параллельность — два потока.** 404 (5 файлов) и гидрация (`nuxt.config.ts`) не делят файлов, и у каждой своя неизвестная: у 404 — приоритет title, у гидрации — гонка `location.replace` с запуском Nuxt. Выигрыш умеренный: поток B займёт около часа и идёт параллельно с A. Общие тесты пишутся до развилки. Карточку правит только интегратор в `W`.

### Файлы

- `app/error.vue` — **новый**, потому что Nuxt берёт свою страницу ошибки только из этого файла:
  - разметка — `<NuxtLayout>` → `AppSection` → h1, абзац и `AppButton` «на главную» → `localePath('/')`; при 404 ещё `AppButton variant="ghost"` → `localePath('/course/')`;
  - проп `error: NuxtError` (`import type { NuxtError } from '#app'`), ветка по `error.status === 404`;
  - `useI18n`, `useLocalePath`, `useHead({ title: () => \`${заголовок} · ${t('brand.name')}\` })`, `onMounted(init)` из `useTheme`;
  - `error.message` и `statusMessage` не выводятся. Ошибку снимает сам роутер при переходе по NuxtLink, `clearError` не нужен;
  - небольшой scoped SCSS: отступы, h1 размером как `course__title`, ряд кнопок с `gap`.
- `app/components/ui/LangSwitch.vue` — `const localePath = useLocalePath()`, в `:45` `:to="switchLocalePath(l.code) || localePath('/', l.code)"`.
- `app/components/layout/TheFooter.vue` — то же в `:44`.
- `i18n/locales/en.json`, `i18n/locales/ru.json` — блок `error` последним, после `footer`.
- `nuxt.config.ts` — второй элемент `app.head.script` после скрипта темы (`:134-141`): `innerHTML` по правилу п. 6, `tagPosition: 'head'`, однострочный комментарий о том, зачем он нужен (Vue иначе гидрирует `/ru/` поверх HTML `/`).
- `docs/work/2026-10-21-svoya-stranica-404-i-rashozhdenie-gidrac/acceptance.test.mjs` — **новый**: Node-приёмка по `.output/public`, как у задач 5–7. В `scripts/*.test.mjs` не кладём: те тесты идут без сборки.
- Карточка — «Ход работы», «Итог».

Помощники лежат в `S/k9/` рядом со скриптами отладчика и в репозиторий не идут:
- `S/k9/lib.mjs` — **новый**, по образцу `S/qa7b/lib.mjs`:
  - headless Chromium из `<кэш npx>/node_modules/playwright-core/index.mjs`;
  - свежий контекст с `locale`, cookie и `colorScheme`;
  - `context.route(/mc\.yandex\.(ru|com)/, abort)` до первого `goto`;
  - сбор console и `pageerror`, счётчик сообщений `/Hydration/`;
  - `S/tools/k7n-serve-pages.mjs` запускается дочерним процессом и останавливается в конце.
- `S/k9/browser-404.mjs` — **новый**, на `node:test`, собран из `S/k9/notfound.mjs` и `S/k9/error-spike.mjs`. Аргументы: `<public> <port>`.
- `S/k9/browser-hydration.mjs` — **новый**, на `node:test`, собран из `S/k9/cookie-predict.mjs` и `S/k9/hydration.mjs`. Аргументы те же.
- `S/k9/spike-inject.mjs` — **новый**: копирует `<public>` в `<out>` и вставляет черновик скрипта в `<head>` файла `index.html` перед первым `<link rel="modulepreload">`.
- `S/k9/worktrees.mjs` и `S/k9/remove-worktrees.mjs` — копии `S/tools/k7-worktrees.mjs` и `S/tools/k7-remove-worktrees.mjs` с префиксом `k9`. При создании копия кладёт ещё симлинк `node_modules` → `node_modules`, как у `W` (через `fs.symlink`).

Порты: 4391 — `W`, 4392 — поток A, 4393 — поток B. Порт 4317, на котором по умолчанию запускается `k7n-serve-pages.mjs`, не занимаем: им может пользоваться QA задачи 8.

### Шаги

Сборка везде одна: `node S/tools/generate-local-builddir.mjs <рабочая копия>`, вывод — в лог в `S/k9/`. Успех определяем по строке «prerender errors» в логе: код выхода ненадёжен. `npm run generate` и `npm run build` вручную не запускать.

**0. Общий шаг в `W`.** Один исполнитель, он же интегратор.
1. Базовая сборка `W`, лог `S/k9/build-base.log`. На ней приёмка этапа C (`W/docs/work/2026-10-21-kurs-etap-c-novye-uroki-i-stranicy-uroko/acceptance.test.mjs`) должна быть зелёной: так проверяем, что окружение рабочее.
2. Написать `acceptance.test.mjs` (см. «Тесты») и прогнать на базовой сборке. Красными должны быть ровно 9, 12–14, 16 и 17, зелёными — 8 и 10. Если 10 красный, это прежний дефект: записать и спросить владельца, не чинить. Коммит `test: acceptance for the site error page and the root locale redirect`, его хеш — база потоков.
3. Написать `S/k9/lib.mjs`, `browser-404.mjs` и `browser-hydration.mjs`, прогнать на базовой сборке, порт 4391.
   - Ожидаемо красные: 1–7; в 11 строки «ru-RU без cookie», «en-US + ru» и «ru-RU + de»; «повторный заход».
   - Ожидаемо зелёные: строки «en-US без cookie», «ru-RU + en» и регресс 18.
   - Фактический расклад по каждому критерию записать в «Ход работы».
4. `node S/k9/worktrees.mjs <W> <хеш п. 2> 404 hydration`. Получатся `.claude/worktrees/k9-404` (ветка `k9/404`) и `.claude/worktrees/k9-hydration` (ветка `k9/hydration`).

**Поток A «404»** (worktree `k9-404`; файлы `en.json`, `ru.json`, `LangSwitch.vue`, `TheFooter.vue`, `error.vue`).
1. `feat(i18n): error page texts` — блок `error`. Проверка без сборки: `node --test ".claude/worktrees/k9-404/scripts/*.test.mjs"` зелёный. Паритет ключей проверяет `scripts/course.test.mjs:1045-1053`.
2. `fix(layout): language links fall back to the locale home on unknown routes` — LangSwitch и TheFooter.
3. `feat: error page in the site layout, in the language of the address` — `app/error.vue`.
4. Сборка `k9-404`, лог `S/k9/build-404.log`.
   - Приёмка: зелёные 8, 9, 10. Пункты 12–17 остаются красными, они за потоком B.
   - `browser-404.mjs` на порту 4392 — всё зелёное.
   - Приёмка этапа C зелёная: она проверяет переключатель языка на уроках и запускает `check-slash`.
5. Если на неизвестных маршрутах title остаётся `404 - …`:
   - сначала проверить, что строка заголовка не пустая в момент `setup`: пустой title unhead отбрасывает, а сообщения i18n могли ещё не загрузиться;
   - затем — `useHead(…, { tagPriority: 'high' })`. Запасной заголовок nuxt-seo-utils ставится с `tagPriority: 101` (`nuxt-seo-utils/dist/runtime/app/plugins/titles.js:11-15`).

   Найденную причину передать интегратору для «Ход работы».

**Поток B «гидрация»** (worktree `k9-hydration`; файл `nuxt.config.ts`).
1. Пробник без правки кода:
   - `node S/k9/spike-inject.mjs <W>/.output/public S/k9/spike-public` с черновиком скрипта по п. 6;
   - `browser-hydration.mjs S/k9/spike-public 4393` — всё зелёное, в том числе «повторный заход».

   Если есть сообщения «Hydration» от уходящей страницы `/`, это риск 1: остановиться и решить до кода. Пробник заодно доказывает, что тест вообще может позеленеть.
2. `fix(i18n): send Russian readers from / to /ru/ before Nuxt starts` — скрипт в `nuxt.config.ts`.
3. Сборка `k9-hydration`, лог `S/k9/build-hydration.log`.
   - Приёмка: зелёные 8, 10, 12–14, 16 и 17. Пункт 9 красный, он за потоком A.
   - `browser-hydration.mjs` на порту 4393 — всё зелёное.

**Интеграция в `W`.**
1. Слить `k9/404` и `k9/hydration` в ветку задачи через `git -C <W> merge`. Файлы не пересекаются, конфликтов не ждём.
2. Сборка `W`, лог `S/k9/build-final.log`. На ней должны пройти:
   - `node --test` по `acceptance.test.mjs` — всё зелёное;
   - `browser-404.mjs` и `browser-hydration.mjs` на порту 4391 — всё зелёное;
   - `node <W>/scripts/check-slash.mjs <W>/.output/public`, `node <W>/scripts/check-sitemap.mjs <W>/.output/public`, `node --test "<W>/scripts/*.test.mjs"` и приёмка этапа C — зелёные;
   - `npm --prefix <W> run lint` и `npm --prefix <W> run typecheck` — прогнать и записать результат (п. 7).
3. `node S/k9/remove-worktrees.mjs`.
4. Карточка.
   - «Ход работы»: расклад «красное → зелёное» по критериям.
   - «Итог»: Метрика по (а); критерий 4 проверяется по `main`; lint и typecheck; что проверить на проде — `/` в Вебмастере и Search Console, источники визитов в Метрике.

### Тесты

Тест пишется до кода (шаг 0). Ниже — какой критерий каким тестом ловим.

**Node: `docs/work/2026-10-21-svoya-stranica-404-i-rashozhdenie-gidrac/acceptance.test.mjs`**, по `.output/public` своей рабочей копии. `ROOT` — три уровня вверх, как в приёмке этапа C. Запуск: `node --test <файл>`.
- **8.** В `404.html` есть `<meta name="robots" content="noindex, nofollow">`.
- **9.** В en.json и ru.json блок `error` ровно с шестью ключами из п. 2. Значения — непустые строки без `|`, `@` и `{`. В en `notFoundTitle` = «Page not found», `failedTitle` = «Something went wrong»; в ru — «Страница не найдена» и «Что-то пошло не так».
- **10.** Проверяются все `**/index.html` с `id="__nuxt"`; заглушки `de/`, `fr/` и прочие пропускаются. Ссылки `a.lang__item` и `a.footer__lang` с `hreflang` на страницах `/X/` и `/ru/X/` ведут на `/X/` (en) и `/ru/X/` (ru). Атрибуты разбираются регулярным выражением по тегу `<a …>`, полный парсер не нужен.
- **17.** В `index.html` ровно один inline-`<script>` без `src`, в тексте которого есть `cookieKey` из конфига. Он стоит в `<head>` и раньше первого `<script type="module">`. Такой же скрипт есть в `404.html`.
- **12, 13, 14, 16** — этот скрипт выполняется в `node:vm`. Контекст — подставные `document.cookie`, `navigator.languages`, `location` (`pathname`, `search`, `hash`; `replace` записывает вызовы в массив) и `window`, указывающий на сам контекст.
  - Данные берутся из `window.__NUXT__.config.public.i18n` того же файла. Это литерал JS, а не JSON, поэтому его `<script>` тоже выполняется в `vm`, с `{ window: {} }`.
  - Эталон — `findBrowserLocale` из `node_modules/@nuxtjs/i18n/dist/runtime/kit/browser.js`, импорт по пути. Ожидаемая локаль — cookie, если её значение есть среди `locales[].code`. Иначе `findBrowserLocale(locales, languages) || defaultLocale`. Переход нужен, если ожидаемая локаль не `defaultLocale`; адрес — `/${code}/` + search + hash.
  - **13.** Списки `['ru-RU']`, `['en-GB','ru-RU']`, `['uk','ru']`, `['de']`, `[]`, `['RU']`, `['ru-UA','en']`, `['zh-CN','ru-RU','en-US']` — каждый без cookie и с cookie `en` и `ru`.
  - **12.** Cookie `de`; cookie `i18n_locale2=ru` (не должна считаться); нужная cookie в середине строки (`a=1; i18n_locale=ru; b=2`).
  - **14.** `search='?utm_source=x'`, `hash='#contact'` → `/ru/?utm_source=x#contact`.
  - **16.**
    - `pathname` `/ru/`, `/course/`, `/index.html`, `/nope/` при cookie `ru` — `replace` не вызывается.
    - Если геттеры `document.cookie` и `navigator.languages` бросают исключение, скрипт его не пробрасывает.
    - Скрипт из `404.html` на `/nope/` не вызывает `replace`.
  - Заодно: `detectBrowserLanguage.redirectOn === 'root'` и `useCookie === true` — на них держится правило скрипта. Если конфиг поменяют, тест покраснеет.

**Только браузер, headless:** `S/k9/browser-404.mjs` и `S/k9/browser-hydration.mjs`. Свежий контекст на каждый сценарий, Метрика заблокирована до первого `goto`, сервер — `k7n-serve-pages.mjs`. Почему не Node: `404.html` — пустая SPA-оболочка (`data-ssr="false"`), а расхождение гидрации видно только в консоли живой страницы.
- `browser-404.mjs` — адреса `/nope/`, `/course/nope/`, `/ru/nope/`, `/ru/course/nope/`, каждый при ru-RU и при en-US:
  - **1.** HTTP 404; есть `header.header` и `footer.footer`.
  - **2, 3.**
    - `<html lang>`, тексты `main h1` и абзаца — из json по префиксу адреса.
    - Title — `<заголовок> · <brand.name>`.
    - Ссылки «на главную» и «на курс» (ищутся по тексту из json) ведут на `/` и `/course/` или на `/ru/` и `/ru/course/`.
  - **4.** В title и в `main` нет «Nuxt», «lesson not found», «Page not found: /» и `error.`.
  - **5.** У всех `.lang__item` и `.footer__lang` есть `href`. На неизвестных маршрутах — `/` и `/ru/`, на `…/course/nope/` — `/course/nope/` и `/ru/course/nope/`.
  - **6.** Перед кликом `window.__k9 = 1`, затем клик по ссылке на главную. После: адрес `/` или `/ru/`, заголовка страницы ошибки нет, есть `#about`, `window.__k9 === 1` (значит, без перезагрузки).
  - **7.** На `/` и `/ru/` после гидрации в `payload.error` через `document.querySelector('#__nuxt').__vue_app__.config.globalProperties.$nuxt` ставится `{ status: 500, statusCode: 500, message: 'test' }`. Ожидаем h1 «Something went wrong» / «Что-то пошло не так», ссылку на главную и отсутствие ссылки на курс. Если подстановка не срабатывает — отметить и проверить ревью кода, как сказано в брифе.
  - **Тема (п. 4).** Контекст с `colorScheme: 'dark'`, адрес `/nope/`: у `<html>` класс `dark`, один клик по `.theme-toggle` его снимает.
  - В консоли нет `pageerror` и ошибок, кроме строки про HTTP 404 и заблокированной Метрики.
- `browser-hydration.mjs`:
  - **11.** Четыре строки матрицы и строка «ru-RU + cookie `de`» → `/ru/`.
    - Везде 0 сообщений `/Hydration/` за всю жизнь вкладки, включая уходящий документ `/`.
    - После `/ru/` у `a.logo` `href="/ru/"`, у `.lang__item--active` и `.footer__lang--active` — `hreflang="ru"`.
  - **Повторный заход, тёплый кэш.** ru-RU без cookie: `/` → `/ru/`, затем ещё раз `goto('/')` в той же вкладке → `/ru/`. За обе загрузки 0 сообщений. Так приходит вернувшийся читатель.
  - **14.** `/?utm_source=x#contact` при ru-RU → `/ru/?utm_source=x#contact`.
  - **15.** Вкладка открывает `data:text/html,start`, затем `/` при ru-RU → `/ru/`. `goBack()` уводит на `data:`, а не на `/`.
  - **18, гидрация.** `/ru/`, `/course/`, `/course/closures/` при ru-RU и en-US — 0 сообщений.
- **18, остальное** — команды шага интеграции 2.

### Риски

1. **Гонка `location.replace` с запуском Nuxt** — главный риск.
   - Суть: скрипт ставит переход, но разбор `/` продолжается. С тёплым кэшем модульный скрипт может успеть загидрировать уходящую страницу, и «Hydration» мелькнёт в консоли.
   - Как заметим: пробник B1 и сценарий «повторный заход».
   - Запасной ход, если поймали: скрипт перед `replace` ставит флаг на `window`. Клиентский плагин `app/plugins/<имя>.client.ts` при этом флаге ждёт промис, который никогда не выполнится, и приложение уходящей страницы не монтируется. Это ещё один файл примерно на 5 строк; решение записать в «Ход работы».
2. **Скрипт неверно читает cookie.** Тогда читатель, выбравший English, не попадёт на английскую главную. Ловят 12 и 13 (Node) и строка «ru-RU + en» в браузере.
3. **Title проигрывает запасному заголовку nuxt-seo-utils** на неизвестных маршрутах. Ловят 2 и 3 в браузере, что делать — шаг A5.
4. **Сломанный `error.vue`.** Белый экран на любой ошибке, включая сбой загрузки чанка. Ловят 1–7 и отсутствие `pageerror`.
5. **Запасной путь в LangSwitch и TheFooter** меняет ссылки на пререндеренных страницах: у локализованных страниц пропадут входящие ссылки. Ловят 10 (Node), приёмка этапа C (переключатель на уроках) и `check-slash.mjs`.
6. **Задача 8 идёт параллельно.**
   - Общих правок нет. Задача 8 правит `scripts/course.test.mjs`, приёмку этапа C (новый урок в `LESSON_ORDER`) и файлы курса; мы их только запускаем.
   - Кто сливается в `nuxt4` вторым, пересобирает сайт и гоняет обе приёмки.
   - Порты — см. «Файлы».
   - Одновременные сборки двух задач и двух потоков нагружают процессор: растёт время, а не меняется результат.
7. **Метрика (вариант а).** У русскоязычных на голом `/` первый хит придёт с referrer `https://rihard-developer.ru/`. UTM-метки сохраняются (критерий 14). После выкладки — отчёт «Источники».
8. **Поисковики.** Робот с русским языком и JS увидит на `/` переход на `/ru/`; hreflang и canonical не меняются. После выкладки — статус `/` в Вебмастере и Search Console: это шаг QA, вне задачи.

### Не трогаем

- `nuxt.config.ts:104-108` (`detectBrowserLanguage`) и скрипт темы `:134-141`: новый скрипт идёт отдельным элементом.
- `app/plugins/metrika.client.ts` — по варианту (а).
- `app/pages/course/[slug].vue:34-40`: `statusCode`/`statusMessage` на `status`/`statusText` не переводим.
- `app/app.vue`: формат title не выносим в общий помощник, `error.vue` повторяет его одной строкой.
- `app/components/layout/TheHeader.vue`: на странице ошибки он работает как есть, это подтвердил прототип отладчика.
- `footer.built` («built with Nuxt»), см. п. 3.
- `scripts/course.test.mjs`, приёмка этапа C, `app/data/**`, `app/components/course/**` — зона задачи 8.
- `public/de|fr|hy|ka|kk/` (заглушки удалённых локалей), `scripts/deploy.mjs`, `scripts/check-slash.mjs`, `scripts/check-sitemap.mjs`.

## Проверки

<!-- crew:auto:evidence -->
| проверка | итог | коммит | когда |
|---|---|---|---|
| root:build | зелёная | fd1a52da | 2026-10-22 17:57 |
<!-- /crew:auto -->

## Ревью

<!-- crew:auto:findings -->
- ревью: crew:reviewer, находок 3, 2026-10-22 17:57

| № | важность | где | что | кто | исход |
|---|---|---|---|---|---|
| F1 | P2 | docs/work/2026-10-21-svoya-stranica-404-i-rashozhdenie-gidrac/acceptance.test.mjs:227 | Тест cookie с похожим именем проверяет только хвост (i18n_locale2=ru) и прошёл бы без левой привязки regex; при cookie x_i18n_locale=ru и en-US читатель ушёл бы на /ru/, а i18n оставил бы на /. | crew:reviewer | исправлена: fd1a52d: в приёмку добавлены cookie x_i18n_locale=ru при en-US (остаёмся на /) и x_i18n_locale=en; i18n_locale=ru при ru-RU (/ru/); приёмка 50 из 50 |
| F2 | P2 | docs/work/2026-10-21-svoya-stranica-404-i-rashozhdenie-gidrac/acceptance.test.mjs:80 | Подставной location.assign пишет в тот же массив, что replace: переход через assign оставил бы тесты 13, 14, 16 зелёными, а критерий 15 закреплён только браузерным скриптом вне репозитория; с assign «Назад» с /ru/ возвращал бы на / и снова уводил на /ru/. | crew:reviewer | исправлена: fd1a52d: подставной location.assign пишет с меткой assign:, так что переход не через replace краснит 13 и 14 |
| F3 | P2 | nuxt.config.ts:142 | В скрипте жёстко записаны i18n_locale, en, ru и /ru/ — копия i18n.locales и detectBrowserLanguage; комментарий об этой связи молчит, а страховка (тесты 13 и 17) лежит в docs/work и не входит в scripts/*.test.mjs и deploy.mjs. Комментарий около 145 символов в одну строку. | crew:reviewer | исправлена: fd1a52d: комментарий к скрипту в nuxt.config.ts в две строки, сказано, что он повторяет i18n.locales и detectBrowserLanguage и что его стерегут тесты 13 и 17 приёмки задачи 9 |
<!-- /crew:auto -->

## QA

Вердикт: **caveats**. Все 18 критериев выполнены там, где их можно проверить; оговорки ниже. Сборка W/.output/public (HEAD fd1a52d, 117 маршрутов), headless Chromium, Метрика заблокирована до первой загрузки, сервер как у GitHub Pages, порты 4396 и 4397, после прогонов погашены.

| № | требование | как проверено | итог |
|---|---|---|---|
| 1 | HTTP 404, шапка и подвал | browser-404.mjs, 8 сценариев (4 адреса x ru-RU и en-US) | выполнено |
| 2 | без /ru/: lang en-US, «Page not found», ссылки / и /course/, title «Page not found · Rihard Alikhanov» | browser-404.mjs; скриншоты 1440 и 375 | выполнено |
| 3 | с /ru/: lang ru-RU, «Страница не найдена», ссылки /ru/ и /ru/course/, русский title | browser-404.mjs; скриншоты | выполнено |
| 4 | нет «Nuxt» в title и тексте страницы, «lesson not found», «Page not found: /», сырых ключей | browser-404.mjs | выполнено (слово «Nuxt» осталось только в подвале «built with Nuxt», это штатный текст сайта) |
| 5 | href у LangSwitch и подвала на 8 сценариях | browser-404.mjs | выполнено |
| 6 | клик «на главную» снимает ошибку без перезагрузки | browser-404.mjs; руками: «Содержание курса» с /ru/course/nope/ ведёт на /ru/course/, переключатель языка с /ru/nope/ на English ведёт на / | выполнено |
| 7 | статус не 404: «Something went wrong» / «Что-то пошло не так», ссылка на главную, без ссылки на курс | browser-404.mjs (подмена ошибки на / и /ru/) | выполнено |
| 8 | noindex в 404.html | acceptance.test.mjs | выполнено |
| 9 | ключи error.* в en.json и ru.json | acceptance.test.mjs; course.test.mjs (равенство ключей) | выполнено |
| 10 | ссылки языка и подвала на всех страницах не изменились | acceptance.test.mjs | выполнено |
| 11 | матрица язык x cookie, 0 «Hydration», логотип /ru/, активен «Русский» | browser-hydration.mjs, 4 случая + cookie de + повтор | выполнено |
| 12 | cookie de не учитывается | acceptance.test.mjs; browser-hydration.mjs | выполнено |
| 13 | решение скрипта = findBrowserLocale | acceptance.test.mjs (24 комбинации, эталон из установленного i18n) | выполнено |
| 14 | query и hash сохраняются | acceptance.test.mjs; browser-hydration.mjs | выполнено |
| 15 | «Назад» не возвращает на / | browser-hydration.mjs (goBack) | выполнено |
| 16 | скрипт молчит на других путях, не бросает при сбое cookie и languages | acceptance.test.mjs | выполнено |
| 17 | скрипт в head раньше module-скрипта, имя cookie и коды из __NUXT__.config | acceptance.test.mjs | выполнено |
| 18 | без регрессий | гидрация на /ru/, /course/, /course/closures/ при ru-RU и en-US: 0; check-slash, check-sitemap OK; scripts/*.test.mjs по одному файлу: 15+16+13+22+38+1018+4, красных нет; приёмка этапа C: 94 из 94; lint и typecheck: см. оговорку 1 | выполнено, кроме lint и typecheck |

Прогоны: acceptance.test.mjs 50 из 50; browser-404.mjs 120 из 120; browser-hydration.mjs 32 из 32. Пробник гонки race-probe.mjs с тёплым кэшем (5 прогонов x 3 захода) и с медленным HTML 300 мс (4 x 3): всегда /ru/, 0 «Hydration», Vue монтируется только на /ru/, «риск 1 не воспроизведён».

Глазами по скриншотам (1440 и 375, светлая и тёмная, /nope/, /ru/nope/, /ru/course/nope/; для сравнения /course/ и /ru/): страница в оформлении сайта, шапка, подвал, переключатель языка и тема на месте, заголовок и текст читаются, кнопки «На главную» и «Содержание курса» переносятся на 375 без горизонтального скролла, в тёмной теме контраст нормальный. Мобильное меню на 404 открывается. Ссылки шапки на 404 ведут на /#skills и /ru/#skills, нужный язык сохраняется. Длинный адрес (300 символов) и <script> в query: горизонтального скролла нет, текст адреса на странице не выводится. Переключение темы работает.

Оговорки.
1. lint и typecheck не прогнать: в репозитории нет eslint.config.* (на базовом коммите тоже), а `nuxt typecheck` в рабочей копии не находит tsconfig.json. К этой задаче это не относится, но критерий 18 по этим двум пунктам не проверен.
2. Консоль на 404 содержит `[nuxt] error caught during app initialization ... Page not found` (в тестах это отфильтровано как штатная строка Nuxt). Пользователь консоль не видит.
3. Не проверено в этой среде: прод; поведение YandexBot и Googlebot на `/` (по `navigator.languages` рендерера); как Метрика запишет источник после `location.replace` (вопрос 1 брифа, принят вариант (а), Метрика не тронута); реальная латентность GitHub Pages. Это отдельный шаг после выкладки.
4. Приёмка задачи 9 лежит в docs/work, а не в scripts/*.test.mjs, поэтому `crew gate` и deploy.mjs её не гоняют; страховка от расхождения скрипта и i18n держится на ручном запуске (отмечено в комментарии nuxt.config.ts, ревью F3).

Проблем уровня P0, P1 нет.

## Слова владельца

<!-- crew:auto:words -->
- 2026-10-22 17:05 · go · «/crew:go 9»
<!-- /crew:auto -->

## Итог

Своя страница ошибки вместо стандартной от Nuxt и переход русскоязычных с `/` на `/ru/` до запуска Nuxt: расхождения гидрации на `/` больше нет.

**Сделано** (6 коммитов и слияние двух потоков поверх nuxt4, 7 файлов):
- **`app/error.vue`** — страница ошибки в оформлении сайта (`NuxtLayout`: шапка и подвал), на языке адреса:
  - 404: «Page not found» / «Страница не найдена», ссылки на главную и на содержание курса своего языка;
  - другие ошибки: «Something went wrong» / «Что-то пошло не так» и ссылка на главную;
  - title в формате сайта, тема применяется как на остальных страницах.
- **Тексты** — блок `error` в `en.json` и `ru.json`.
- **`LangSwitch.vue`, `TheFooter.vue`** — на неизвестных адресах ссылки языка ведут на главную нужного языка (раньше выходили без `href`); на пререндеренных страницах ссылки прежние.
- **`nuxt.config.ts`** — inline-скрипт в `<head>` после скрипта темы: на `/` берёт cookie `i18n_locale`, иначе первый `en`/`ru` из `navigator.languages` (правило `findBrowserLocale` i18n) и при `ru` делает `location.replace('/ru/' + search + hash)`. Решение владельца: «Перевод на /ru/ (Recommended)».

**Как проверено:**
- Сначала красный тест: приёмка `acceptance.test.mjs` (Node, по собранному сайту) и браузерные скрипты в scratchpad на базе 7f8bf96 — 45 из 48, 93 из 120 и 12 из 32 красных из-за дефектов.
- После починки: приёмка 50 из 50 (скрипт исполняется в `node:vm` и сверяется с `findBrowserLocale` установленного i18n на 24 комбинациях); headless Chromium, Метрика заблокирована: 404 — 120 из 120, гидрация — 32 из 32, пробник гонки с тёплым кэшем — 0 сообщений «Hydration».
- `scripts/*.test.mjs` 1126 из 1126, приёмка этапа C 94 из 94, `check-slash` и `check-sitemap` OK, `crew gate` зелёная.
- `npm run lint` и `npm run typecheck` в проекте не работают (нет `eslint.config`, `tsconfig.json`, `vue-tsc`) — так было и до задачи.
- Ревью — две зоны: страница ошибки без находок; скрипт перехода — 3 P2 (тесты и комментарий), все исправлены. QA — с оговорками (раздел «QA»).

**Чем заплатили:**
- **Title на странице ошибки.** На неизвестном адресе unhead 2.1.15 теряет обновление head (гонка рендера в `app:error` с монтированием `error.vue`), `tagPriority` не помогает. Обход — `head.invalidate()` в `onNuxtReady`; первые ~50 мс во вкладке виден `404 - Page not found: …`.
- **Правило выбора языка продублировано** в скрипте. Сверку с i18n держат тесты 13 и 17 приёмки задачи; `crew gate` и `deploy.mjs` их не запускают — прогонять при обновлении `@nuxtjs/i18n`.
- **Метрика, вариант (а).** У русскоязычных на голом `/` первый хит придёт с referrer `https://rihard-developer.ru/`; UTM-метки сохраняются.

**Осталось:**
- После выкладки: статус `/` в Вебмастере и Search Console, отчёт «Источники» в Метрике.
- Не проверены прод, поисковые роботы, Safari и Firefox.
- Отдельной задачей при желании: рабочие `lint` и `typecheck`; перенос сверки скрипта с i18n в `scripts/` или `deploy.mjs`.

## Ход работы

### 2026-10-21 23:52

- **Сделано.** Задача заведена. Отладчик нашёл и доказал причины обоих дефектов, они в разделе «Причина (отладчик)». Аналитика не запускали: владелец попросил закругляться.
- **Дальше.** Поручить бриф аналитику (`crew role analyst`) по карточке и разделу «Причина», затем `crew task set 9 --verdict … --level …`.
- **Открыто.**
  - Гидрация: оставить автопереход на `/ru/` (inline-скрипт до запуска Nuxt) или выключить `detectBrowserLanguage`. Это вопрос к владельцу.
  - Почему на неизвестных маршрутах title из error.vue проигрывает запасному заголовку nuxt-seo-utils.
  - Прод не проверен.
- **Решения владельца:** пока нет.

### 2026-10-22 18:10

- **Сделано.** Бриф (assumptions, L), план, красные тесты df7b110, потоки 404 и гидрации в отдельных копиях, слияние, ревью, QA с оговорками.
- **Решения владельца:** «Перевод на /ru/ (Recommended)». По вопросу о Метрике работали по (а).
- **Дальше.** Приёмка владельца и снятие допущений (`/crew:accept 9`), затем `/crew:ship 9`.
