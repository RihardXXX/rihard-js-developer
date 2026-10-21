# 3. /sitemap.xml отдаёт HTML-редирект вместо XML

<!-- crew:auto:meta -->
вид: bug · уровень: L · вердикт: ready · ветка: fix/sitemap-xml-otdaet-html-redirekt-vmesto · фаза: сдано
<!-- /crew:auto -->

## Задача

По задаче 1 пункты 1. не дефект 2. Да 3. да.

## Бриф

### Коротко

В Яндекс.Вебмастере заведён `/sitemap.xml`, а сайт отвечает на этот адрес 301 на `/sitemap.xml/`, а оттуда отдаёт HTML с meta-refresh на `/sitemap_index.xml`. XML Яндекс не получает. Чиним в `nuxt.config.ts`: `/sitemap.xml` не пререндерим как страницу, а после генерации sitemap кладём в `sitemap.xml` копию индекса. Плюс проверка перед деплоем. `/sitemap_index.xml` (его читает GSC) и `robots.txt` не меняются. Вердикт: ready, уровень L.

### Что просят

Владелец ответил «да» на вопрос 3 задачи №1: в Яндекс.Вебмастере sitemap заведён как `/sitemap.xml`. Нужно, чтобы по этому адресу сразу отдавался XML-sitemap, без редиректа и HTML. Адрес `https://rihard-developer.ru/sitemap_index.xml` отправлен в GSC (статус «Успешно»), его ломать нельзя.

### Как воспроизвести

1. `npm run generate`. Можно взять и готовую `.output/public` от 20.10 23:23.
2. `ls -la .output/public/sitemap.xml` покажет каталог, а не файл. Внутри лежит `index.html` на 104 байта:
   `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=/sitemap_index.xml"></head></html>`.
3. В выкладке то же самое: `git ls-tree origin/gh-pages sitemap.xml` даёт `tree` (деплой 8699ff7 от 13.09.2026), внутри `sitemap.xml/index.html`.
4. `node /private/tmp/claude-501/-Users-rihard-projects-portfolio-nuxt3/4dc60d21-7622-4f9a-b93a-f5adf853a571/scratchpad/check-sitemap.mjs .output/public` возвращает FAIL (скрипт отладчика).
5. Прод, по выводу отладчика: `/sitemap.xml` отвечает 301 с Location `/sitemap.xml/`, затем 200 `text/html` с meta-refresh.

**Ожидаемое:** `GET /sitemap.xml` отвечает 200 с XML: начинается с `<?xml`, внутри `<sitemapindex>` со ссылками на `/__sitemap__/en-US.xml` и `/__sitemap__/ru-RU.xml`. Редиректа нет.
**Фактическое:** 301, потом HTML-заглушка с meta-refresh. Так во всех деплоях с 396a304 (04.06.2026).

### Причина

Цепочка, каждое звено проверено в коде:
- При двух локалях (`prefix_except_default`, en/ru) модуль sitemap переходит на несколько sitemap (`en-US`, `ru-RU`): `node_modules/@nuxtjs/sitemap/dist/module.mjs:669-705`. Для этого режима он ставит `routeRules['/sitemap.xml'] = { redirect: '/sitemap_index.xml' }`: `module.mjs:754-755`.
- Для каждого redirect-routeRule Nuxt добавляет страницу-заглушку: `node_modules/nuxt/dist/index.mjs:1560-1575`. i18n её локализует (`@nuxtjs/i18n/dist/module.mjs:701`), а плагин пререндера ставит её в очередь: `nuxt/dist/pages/runtime/plugins/prerender.server.js:17-19`. Копию `/ru/sitemap.xml` уже отсекает `nuxt.config.ts:65`, а `/sitemap.xml` никто не отсекает.
- Nitro получает ответ с `content-type: text/html` и при `autoSubfolderIndex: true` пишет его в `sitemap.xml/index.html`: `nitropack/dist/core/index.mjs:2122-2126`. GitHub Pages отдаёт каталог через 301 на адрес со слешем.
- `trailingSlash` на дефект не влияет (проверил отладчик).

### Известно точно

- Версии: `@nuxtjs/sitemap` 8.0.15 (через `@nuxtjs/seo` ^5.1.3), nuxt 4.4.7, nitropack 2.13.4, `@nuxtjs/i18n` 10.4.0.
- `robots.txt` указывает на `Sitemap: https://rihard-developer.ru/sitemap_index.xml` (`module.mjs:707-709`).
- Хук `sitemap:prerender:done` типизирован (`@nuxtjs/sitemap/dist/module.d.mts:16`). Модуль вызывает его из nitro-хука `prerender:done` (`module.mjs:114-122`), когда все sitemap уже записаны. В `ctx.sitemaps[]` у каждого элемента есть `name`: для индекса это `'/sitemap_index.xml'`. Есть и `content`, это геттер, читающий файл с диска (`module.mjs:136-141`).
- В `prerender.ignore` строка работает как `startsWith` (`nitropack/dist/core/index.mjs:1889-1892`). Значит, `'/sitemap.xml'` отсекает `/sitemap.xml` и `/sitemap.xml/`, но не задевает `/sitemap_index.xml`. Индекс модуль пререндерит своим `$fetch`, мимо очереди nitro (`module.mjs:146-170`).
- Sitemap пререндерится только при `nuxt generate` (`module.mjs:732`). Гейт crew (`npm run build`, `.claude/crew.json`) этот путь не проходит, поэтому одного гейта для проверки мало.
- Отладчик прогнал вариант A на копии: проверка зелёная, `sitemap.xml` побайтно совпадает с `sitemap_index.xml`, каталога нет.

### Не знаем

- Сколько Яндекс будет перечитывать `/sitemap.xml` после деплоя. Это вне нашего контроля, проверяется в приёмке.
- Сохранится ли хук `sitemap:prerender:done` при обновлении модуля. Если пропадёт, фикс молча перестанет работать. Это ловит проверка в `deploy.mjs` (критерий 6).
- Индекс sitemap по адресу `/sitemap.xml` соответствует протоколу sitemaps.org, и Яндекс поддерживает файлы индекса. Это не допущение о нашем коде, но окончательно подтвердит только статус в Вебмастере.

### Решение: вариант A (выбран), остальные отклонены

- **A.** Правим только `nuxt.config.ts`. В `nitro.prerender.ignore` добавляем `'/sitemap.xml'`. Через хук `nitro:init` запоминаем `nitro.options.output.publicDir`. Хук `sitemap:prerender:done` пишет содержимое `/sitemap_index.xml` из `ctx.sitemaps` в `<publicDir>/sitemap.xml`. Без `any`, импорты только из `node:`.
- **B (отклонён).** `sitemap.sitemaps: false` плюс статический `public/sitemap_index.xml`. Тогда `robots.txt` переключится на `/sitemap.xml`, а `/__sitemap__/en-US.xml` и `ru-RU.xml` будут отдавать 404, пока GSC не перечитает индекс. Домен окажется зашит в ручной файл. Это нарушает условие «sitemap_index.xml не ломать».
- **Копировать файл в `deploy.mjs` (отклонён).** Вывод `generate` останется сломанным, а сам фикс окажется в неочевидном месте.

### Где в коде

- `nuxt.config.ts:61-67`, блок `nitro.prerender.ignore`. Образец — `'/ru/sitemap.xml'` в `:65`. Комментарий `:63-64` обновить, чтобы он объяснял оба адреса.
- `nuxt.config.ts`, новый ключ `hooks`. Своих хуков в конфиге пока нет. Образец контракта — `module.d.mts:16`. Так же publicDir берёт сам модуль: `nitro.options.output.publicDir` в `module.mjs:161`.
- `scripts/check-sitemap.mjs` (новый). Образец — `scripts/check-slash.mjs` из ветки задачи №1: `DIR` из `argv[2]`, по умолчанию `../.output/public`; сообщения `✗/✓`; при ошибке `exit 1`. Логику брать из скрипта отладчика.
- `scripts/check-sitemap.test.mjs` (новый). Образец — `scripts/check-slash.test.mjs` из ветки №1: `node:test` и временный каталог через `withSite`.
- `scripts/deploy.mjs`. Вызов ставим рядом с вызовом check-slash из ветки №1 (`spawnSync(process.execPath, [CHECK, DIR], { stdio: 'inherit' })`), до `git init`/push.
- `package.json` не меняется: `deploy` уже `node scripts/deploy.mjs`.

### Критерии готовности

1. После `npm run generate` в `.output/public/sitemap.xml` лежит **файл**. Он начинается с `<?xml`, содержит `<sitemapindex` и `<loc>` на `https://rihard-developer.ru/__sitemap__/en-US.xml` и `.../ru-RU.xml`. Содержимое побайтно совпадает с `sitemap_index.xml` той же сборки.
2. Каталога `.output/public/sitemap.xml/` и файла `sitemap.xml/index.html` нет. Нет и `ru/sitemap.xml*`.
3. `sitemap_index.xml`, `__sitemap__/en-US.xml`, `__sitemap__/ru-RU.xml`, `__sitemap__/style.xsl` на месте. По содержанию они такие же, как до правки, разница только в метке времени в комментарии.
4. `robots.txt` не изменился: `Sitemap: https://rihard-developer.ru/sitemap_index.xml`.
5. `node scripts/check-sitemap.mjs <dir>` проверяет: `sitemap.xml` — файл, начинается с `<?xml`, содержит `<sitemapindex` или `<urlset`; `sitemap_index.xml` — файл с `<sitemapindex`; `sitemap.xml/index.html` нет. На текущей сборке скрипт выходит с кодом 1 и пишет понятное сообщение, после фикса — с кодом 0.
6. `scripts/check-sitemap.test.mjs` (`node --test`) покрывает случаи. Должны падать: каталог вместо файла, `sitemap.xml` с HTML, нет `sitemap.xml`, нет `sitemap_index.xml` или в нём нет `<sitemapindex`. Должна проходить корректная пара. До появления скрипта тест красный.
7. `npm run deploy` запускает check-sitemap до push. Если проверка провалилась: `exit 1`, ветка `gh-pages` не тронута.
8. `npm run build` (гейт crew) проходит. В `nuxt.config.ts` нет `any`. Новые скрипты — `.mjs` только на `node:`-модулях.
9. QA на проде после деплоя:
   - `curl -sI https://rihard-developer.ru/sitemap.xml`: 200, `content-type` с `xml`, без `Location`. Тело начинается с `<?xml` и содержит `<sitemapindex`.
   - `curl -sI https://rihard-developer.ru/sitemap_index.xml`: 200, как раньше.
   - `curl -sI https://rihard-developer.ru/sitemap.xml/`: 404.
10. Приёмка (владелец):
    - В Яндекс.Вебмастере, раздел «Файлы Sitemap», `/sitemap.xml` после перепроверки без ошибок.
    - В GSC `sitemap_index.xml` по-прежнему «Успешно».

### Зависимости

- **Задача №1** на ревью, ветка `fix/gsc-stranicy-s-pereadresaciey-ne-indeksi`, в неё ещё приходят коммиты (последний 88ad4ab). Она добавляет `scripts/check-slash.mjs` и вызов в `scripts/deploy.mjs`, а №3 правит соседние строки `deploy.mjs` (импорт, константа, вызов).
  - Начинать №3 лучше после слияния №1 в `nuxt4`. Иначе при слиянии будет конфликт в `deploy.mjs` на 2–3 строки, разрешать его вручную.
  - После №3 устареет комментарий `check-slash.mjs:20` («prerender emits a sitemap.xml/ directory»). Фильтр `isFile` при этом остаётся нужным. Если №1 уже слита, правим комментарий одной строкой в №3, если нет — пишем замечание на ревью №1.
  - check-slash новый файл `sitemap.xml` пропустит: `<loc>` в нём указывают на `/__sitemap__/*.xml`, а пути с `/_` check-slash не проверяет.
- **Задача №2** с №3 не пересекается. `nuxt.config.ts`, `package.json` и `scripts/*` у неё в «Вне рамок» (её README.md:185-186), в её диффе только тест в `docs/work/`.
- **Внешние системы.** После деплоя владелец вручную перепроверяет sitemap в Яндекс.Вебмастере. Миграций нет.

### Цена ошибки

- Если сломать `sitemap_index.xml` или `__sitemap__/*.xml`, GSC потеряет sitemap со статусом «Успешно», и Google медленнее найдёт новые страницы. Пострадает владелец, на проде. Защита — критерии 3–5 и check-sitemap перед push.
- Если хук не сработает (модуль обновили или переименовали хук), `sitemap.xml` не появится, и Яндекс получит 404. Это не лучше нынешнего HTML-редиректа. Защита — критерий 7: деплой не пройдёт.
- `robots.txt` не трогаем. Если он изменится, Google и Яндекс увидят другой адрес sitemap.

### Вне рамок

- `nuxt dev` и `nuxt preview` в серверном режиме: там `/sitemap.xml` по-прежнему HTTP-редирект на `/sitemap_index.xml`. Сайт статический, на прод это не влияет.
- Плоский `<urlset>` в `/sitemap.xml` вместо индекса: индекс по протоколу допустим.
- Варианты B и копирование в `deploy.mjs` (см. «Решение»).
- Ремонт `npm run lint` и `npm run typecheck`: нет `eslint.config.*`, не установлен `vue-tsc`, сейчас оба не проходят независимо от задачи.
- Обновление `@nuxtjs/seo`/`@nuxtjs/sitemap`.

### Вопросы

Нет. Выбор между A и B решает условие владельца «`sitemap_index.xml` не ломать», а B его нарушает. Порядок с задачей №1 указан в «Зависимостях», решение за владельцем.

## План

`W` = `/Users/rihard/projects/portfolio-nuxt3/.claude/worktrees/fix-sitemap-xml-otdaet-html-redirekt-vmesto`. Ветка построена поверх ветки №1 (88ad4ab), поэтому check-slash и его вызов в `deploy.mjs` в ней уже есть. План сверен с установленными версиями: `@nuxtjs/sitemap` 8.0.15, nuxt 4.4.7, nitropack 2.13.4. Готового помощника в базе нет: `git grep sitemap` находит только `nuxt.config.ts:65` и check-slash, ключа `hooks` в конфиге нет.

### Файлы

- `scripts/check-sitemap.test.mjs` (новый) — тест проверки по образцу `scripts/check-slash.test.mjs`.
- `scripts/check-sitemap.mjs` (новый, режим `100755`, как у check-slash) — проверяет, что `sitemap.xml` и `sitemap_index.xml` в выводе `generate` — XML-файлы. В `check-slash.mjs` не встраиваем: у того одна задача (слеши в ссылках) и свои тесты, а эта проверка падает по другой причине и с другим сообщением.
- `scripts/deploy.mjs` — константа пути рядом с `CHECK` (:14) и второй вызов `spawnSync` сразу после check-slash (:23-24).
- `nuxt.config.ts` — импорты `writeFile` (`node:fs/promises`) и `join` (`node:path`) у строки :1; переменная `publicDir` на уровне модуля; `'/sitemap.xml'` в `nitro.prerender.ignore` (:65) и новый текст комментария :63-64; новый ключ `hooks` сразу после блока `nitro` (:61-67).
- `scripts/check-slash.mjs` — только комментарий в строке :20 (шаг 7).

### Шаги и коммиты

1. **Тест, красный.** Создать `scripts/check-sitemap.test.mjs`. Помощники `run`, `withSite` (префикс `check-sitemap-`), `notMissingScript` и `passes` скопировать из `check-slash.test.mjs:12-45`. Импортировать их нельзя: при импорте выполнятся и тесты того файла. Общий модуль для них не заводим. Кейсы перечислены в разделе «Тесты». Проверка: `node --test <W>/scripts/check-sitemap.test.mjs` — все кейсы падают с «скрипт проверки не найден».
   Коммит: `test: check-sitemap must reject a sitemap.xml directory or HTML`.
2. **Скрипт.** Создать `scripts/check-sitemap.mjs` по образцу `check-slash.mjs`:
   - Шебанг и шапка в 2–3 строки: Яндекс читает `/sitemap.xml`, а каталог с таким именем GitHub Pages отдаёт через 301 и HTML.
   - `DIR = process.argv[2] ?? fileURLToPath(new URL('../.output/public', import.meta.url))`. Импорты только из `node:fs/promises`, `node:path`, `node:url`.
   - Логику взять из скрипта отладчика `/private/tmp/claude-501/-Users-rihard-projects-portfolio-nuxt3/4dc60d21-7622-4f9a-b93a-f5adf853a571/scratchpad/check-sitemap.mjs`. Каждый файл проходит через `stat` и четыре отказа: «нет файла», «каталог, а не файл», «после `trimStart` не начинается с `<?xml`», «нет нужного тега». Для `sitemap.xml` нужен `<sitemapindex` или `<urlset`, для `sitemap_index.xml` — `<sitemapindex`.
   - Отдельный `stat` на `sitemap.xml/index.html` не нужен, этот случай ловит отказ «каталог, а не файл». В сообщении об этом отказе написать, что GitHub Pages ответит 301 на `/sitemap.xml/`.
   - Вывод как у check-slash. На каждую ошибку `console.error('✗ …')`, затем итоговая строка с подсказкой про `npm run generate` и `process.exit(1)`. При успехе `console.log('✓ OK: …')`.
   - Отсутствие самого `DIR` отдельно не обрабатываем: оба файла попадут в «нет файла», код 1.

   Проверка: тест из шага 1 зелёный.
3. **deploy.mjs.** Добавить константу `CHECK_SITEMAP`, `CHECK` не переименовывать. Сразу после :24, до `rm(GIT_DIR)` и `git init`, поставить строку `if (spawnSync(process.execPath, [CHECK_SITEMAP, DIR], { stdio: 'inherit' }).status !== 0) process.exit(1)` с однострочным комментарием сверху. Проверка — фикстура из раздела «Тесты», критерий 7.
   Коммит для шагов 2–3: `feat: block deploy when /sitemap.xml is not an XML file`.
4. **Эталон до фикса.** Запустить `node /private/tmp/claude-501/-Users-rihard-projects-portfolio-nuxt3/4dc60d21-7622-4f9a-b93a-f5adf853a571/scratchpad/tools/generate-local-builddir.mjs <W>`. Это тот же `nuxt generate`, только с `buildDir=<W>/.nuxt`. Обычный `npm run generate` в worktree с симлинком `node_modules` при повторном запуске падает. Затем `node <W>/scripts/check-sitemap.mjs <W>/.output/public` должен выйти с кодом 1 и сообщением, что `sitemap.xml` — каталог. Скопировать `<W>/.output/public` в scratchpad (`…/public-before`): это эталон для критериев 3–4.
5. **Фикс в `nuxt.config.ts`.**
   - `ignore: ['/sitemap.xml', '/ru/sitemap.xml']`. Комментарий :63-64 переписать. Смысл: модуль sitemap делает `/sitemap.xml` страницей-редиректом на `/sitemap_index.xml`, i18n зеркалит её под `/ru/`, GitHub Pages отдаёт такой каталог через 301 и HTML. Настоящий XML кладёт хук ниже.
   - Рядом с `sharedScss`/`utilShim` объявить `let publicDir = ''` с комментарием в одну строку.
   - В `hooks` добавить `'nitro:init'(nitro)`, который пишет `publicDir = nitro.options.output.publicDir`. Тот же путь берёт сам модуль (`module.mjs:161`).
   - Там же async-хук `'sitemap:prerender:done'({ sitemaps })`. Он ищет элемент с `name === '/sitemap_index.xml'`. Если не нашёл — `throw new Error(…)`: generate упадёт сразу, если модуль переименует индекс. Иначе — `await writeFile(join(publicDir, 'sitemap.xml'), index.content)`.
   - Типы параметров выводятся из `NuxtHooks`: `nitro:init` — из `@nuxt/nitro-server`, sitemap-хук — из `@nuxtjs/sitemap/dist/module.d.mts:16`. Аннотации не нужны, `any` нет.
   - Над `hooks` комментарий в 1–2 строки: почему копия индекса. Яндекс заведён на `/sitemap.xml`, GSC читает `/sitemap_index.xml`.
   - Порядок безопасен. Хуки конфига регистрируются раньше модулей (`nuxt/dist/index.mjs:6967`), но `publicDir` нужен только в `sitemap:prerender:done`. Этот хук вызывается из nitro `prerender:done`, когда очередь пререндера закрыта (`nitropack/dist/core/index.mjs:2178`) и индекс уже записан (`module.mjs:114-122`).

   Коммит: `fix: serve the sitemap index at /sitemap.xml instead of a redirect page`.
6. **Сборка после фикса.** Снова `generate-local-builddir.mjs <W>`, затем проверить:
   - В логе generate нет строки `/sitemap.xml/`. Есть `/sitemap_index.xml`, `/__sitemap__/en-US.xml`, `/__sitemap__/ru-RU.xml` и `Failing Pages: 0`.
   - `node <W>/scripts/check-sitemap.mjs <W>/.output/public` → код 0 (критерий 5).
   - `cmp <W>/.output/public/sitemap.xml <W>/.output/public/sitemap_index.xml` ничего не выводит (критерий 1).
   - `find <W>/.output/public -name 'sitemap.xml*'` находит только `<W>/.output/public/sitemap.xml`. Значит, нет ни каталога, ни `ru/sitemap.xml*` (критерий 2).
   - `diff -I 'generated by @nuxtjs/sitemap' <before>/<f> <W>/.output/public/<f>` пуст для `sitemap_index.xml`, `__sitemap__/en-US.xml`, `__sitemap__/ru-RU.xml` и `__sitemap__/style.xsl` (критерий 3).
   - `diff <before>/robots.txt <W>/.output/public/robots.txt` пуст (критерий 4).
   - `node <W>/scripts/check-slash.mjs <W>/.output/public` → `✓ OK`: новый файл check-slash не ломает.
   - `git -C <W> status --short` не показывает `sitemap.xml` в корне репозитория. Он появился бы там, если бы `publicDir` остался пустым.
   - Типы: `/Users/rihard/projects/portfolio-nuxt3/node_modules/.bin/tsc --noEmit -p <W>/.nuxt/tsconfig.node.json`. В строках с хуками ошибок нет; чужие ошибки, если появятся, только записать в «Проверки». `git -C <W> diff 88ad4ab -- nuxt.config.ts scripts | grep -nw any` ничего не находит (критерий 8).
7. **Комментарий `check-slash.mjs:20`.** Решение: правим в №3 одной строкой. Ложной строку делает именно №3: «prerender emits a sitemap.xml/ directory» перестаёт быть правдой. Ветка №3 стоит поверх №1, так что при слиянии по порядку конфликта не будет. Фильтр `isFile()` остаётся: `readdir` отдаёт и каталоги. Новый текст по смыслу: `// Files only: readdir lists directories too, and one may carry a file-like name.` Пример `(sitemap.xml/)` в :44-45 по-прежнему верен как пример, его не трогаем.
   Коммит: `docs: check-slash comment no longer claims prerender emits sitemap.xml/`.
8. **Гейт.** `npm --prefix <W> run build` проходит (критерий 8). `node --test <W>/scripts/check-slash.test.mjs <W>/scripts/check-sitemap.test.mjs` — всё зелёное.

### Тесты

- **Критерии 5–6** — `scripts/check-sitemap.test.mjs`, пишется в шаге 1, до скрипта. Фикстуры: `IDX` — `<?xml …?>` и `<sitemapindex>` с двумя `<loc>${HOST}/__sitemap__/{en-US,ru-RU}.xml</loc>`; `URLSET` — `<?xml …?><urlset>…</urlset>`. Кейсы:
  - проходит: `sitemap.xml` = `sitemap_index.xml` = IDX → код 0 и `OK`;
  - проходит: `sitemap.xml` = URLSET, `sitemap_index.xml` = IDX → код 0 (вариант `<urlset` из критерия 5);
  - падает: каталог `sitemap.xml/index.html` с meta-refresh, как в `check-slash.test.mjs:139`, плюс IDX → код 1, в выводе есть `sitemap.xml`;
  - падает: `sitemap.xml` — HTML-заглушка `<!DOCTYPE html>…` → код 1;
  - падает: нет `sitemap.xml` → код 1;
  - падает: нет `sitemap_index.xml` → код 1, в выводе есть `sitemap_index.xml`;
  - падает: `sitemap_index.xml` = URLSET, то есть без `<sitemapindex` → код 1.

  В каждом падающем кейсе проверяем `notMissingScript`, `code === 1`, непустой вывод и отсутствие `\bOK\b`, как в `check-slash.test.mjs:146-162`. Для них завести помощник `fails(name, files)` рядом с `passes`.
- **Критерии 1–4** — шаг 6 на реальной сборке (`cmp`, `find`, `diff -I`) против эталона из шага 4. Автотестом не ловятся: нужен полный `nuxt generate`.
- **Критерий 7** — ручная фикстура, прод не трогаем.
  - Во временный каталог `<tmp>` скопировать `deploy.mjs`, `check-slash.mjs` и `check-sitemap.mjs` в `<tmp>/scripts/`.
  - Создать `<tmp>/.output/public/index.html` (пустая страница), заглушку `<tmp>/.output/public/sitemap.xml/index.html` и `sitemap_index.xml` = IDX.
  - Запустить `GIT_SSH_COMMAND=false node <tmp>/scripts/deploy.mjs`. Переменная — страховка: даже если проверка не сработает, push по ssh не уйдёт.
  - Ожидаем: check-slash печатает `✓ OK`, check-sitemap — `✗ … sitemap.xml …`. Код выхода 1, `<tmp>/.output/public/.git` не создан, строки `deploy:` в выводе нет.
  - `npm run deploy` для этой проверки не запускать: `predeploy` выполняет `nuxt generate`, и на зелёной сборке скрипт действительно запушит.
- **Критерий 8** — шаг 8, плюс tsc и grep из шага 6.
- **Критерий 9** — прод, раздел ниже.

### Проверка на проде

Делает владелец после ручного `npm run deploy` из `nuxt4`, в который влиты №1 и №3.

До деплоя сохранить эталон: `git -C /Users/rihard/projects/portfolio-nuxt3 show 8699ff7:robots.txt` и `8699ff7:sitemap_index.xml` (8699ff7 — текущий gh-pages). После force-push этот коммит останется только в локальном репозитории. GitHub Pages кэширует ответы примерно на 10 минут: если `curl` показал старый ответ, повторить позже.

- `curl -sI https://rihard-developer.ru/sitemap.xml` → `HTTP/2 200`, `content-type` с `xml`, без `location:`.
- `curl -s https://rihard-developer.ru/sitemap.xml | head -5` → начинается с `<?xml`, есть `<sitemapindex` и `<loc>` на `/__sitemap__/en-US.xml` и `/__sitemap__/ru-RU.xml`.
- `curl -sI https://rihard-developer.ru/sitemap.xml/` → 404.
- `curl -sI https://rihard-developer.ru/sitemap_index.xml` → 200, `xml`. Тело (`curl -s`) совпадает с `8699ff7:sitemap_index.xml`, кроме строки `generated by … at <время>`.
- `curl -sI` на `/__sitemap__/en-US.xml` и `/__sitemap__/ru-RU.xml` → 200.
- `curl -s https://rihard-developer.ru/robots.txt` совпадает с `8699ff7:robots.txt`: `Sitemap: https://rihard-developer.ru/sitemap_index.xml`.
- Дальше приёмка (критерий 10): перепроверить `/sitemap.xml` в Яндекс.Вебмастере и статус `sitemap_index.xml` в GSC.

### Риски

- **Хук перестанет вызываться** после обновления модуля. Тогда `sitemap.xml` не появится и Яндекс получит 404. Заметим по check-sitemap в `deploy.mjs`: деплой не пройдёт. Если модуль переименует индекс, `generate` уронит `throw` в хуке.
- **`ignore` работает по `startsWith`**, поэтому отсекает всё, что начинается с `/sitemap.xml`. `/sitemap_index.xml` и `/__sitemap__/*` он не задевает: у них другой префикс, и модуль пререндерит их своим `$fetch`, мимо очереди. Заметим по логу generate и по `diff` в шаге 6.
- **Пустой `publicDir`.** Если бы `nitro:init` не сработал до пререндера, файл записался бы в cwd. По коду так не бывает: Nuxt вызывает `nitro:init` при создании nitro, до сборки (`@nuxt/nitro-server/dist/index.mjs:708`). Заметим по `git status` в шаге 6 и по check-sitemap.
- **Ветка стоит на №1.** Если в №1 придут коммиты в `deploy.mjs:14-24` или `check-slash.mjs:20`, будет конфликт на 1–3 строки. Если PR №1 вольют squash-ом, ветку №3 надо перенести: `git -C <W> rebase --onto nuxt4 <вершина №1>`. Заметим при открытии PR №3 по чужим коммитам в диффе.
- **`nuxt dev` и `preview`** по-прежнему отвечают на `/sitemap.xml` HTTP-редиректом: routeRule модуля мы не трогаем. Это вне рамок брифа и на статический прод не влияет.
- **Content-type на проде** GitHub Pages выставляет по расширению. Заметим по `curl -sI` при проверке на проде.

### Не трогаем

- В `scripts/check-slash.mjs` — ничего, кроме строки :20.
- `scripts/check-slash.test.mjs`, включая кейс :137 «(prerender-редирект)»: он проверяет устойчивость скрипта, а не текущую сборку.
- В `deploy.mjs` — имя `CHECK` и порядок проверок; проверки в цикл или массив не сводим.
- `routeRules['/sitemap.xml']` модуля, опции `sitemap` (`sitemaps`, `sitemapName`), `robots`, `site.trailingSlash`, i18n.
- `package.json`: скрипты `deploy`, `predeploy`, `deploy:app` и зависимость `push-dir`; ремонт `lint` и `typecheck`.
- Заглушки локалей в `public/` (`de`, `fr` и другие).

## Проверки

<!-- crew:auto:evidence -->
| проверка | итог | коммит | когда |
|---|---|---|---|
| root:build | зелёная | 85d7d992 | 2026-10-21 00:07 |
<!-- /crew:auto -->

## Ревью

<!-- crew:auto:findings -->
- ревью: devops-reviewer, находок 5, 2026-10-21 00:04
- ревью: nuxt-reviewer, находок 3, 2026-10-21 00:04
- ревью: crew:reviewer, находок 0, 2026-10-21 00:06

| № | важность | где | что | кто | исход |
|---|---|---|---|---|---|
| F1 | P2 | scripts/check-sitemap.mjs:20-23 | Слабая проверка: пустой <urlset/> без <loc> проходит; <?xml-stylesheet…?><html> проходит по startsWith('<?xml'); подстрока тега в комментарии проходит; <sitemapindexfoo проходит | devops-reviewer | исправлена: 85d7d99: декларация строго в начале (только BOM), корень регэкспом <(sitemapindex\|urlset)[\s/>], обязателен <loc>; тесты 0c90f52 |
| F2 | P2 | scripts/check-sitemap.mjs:25-26 | Дочерние sitemap из <loc> индекса (__sitemap__/*.xml) не проверяются | devops-reviewer | отклонена: Вне брифа: дочерние sitemap генерирует сам модуль, критерий 3 сверил их с эталоном (diff пуст); минимальный дифф |
| F3 | P2 | scripts/deploy.mjs:25,28 | При сигнале/ошибке запуска проверки status=null — деплой блокируется, но без сообщения о причине | devops-reviewer | отклонена: Отказ надёжен (status null → exit 1, push не уходит); форма вызова как в задаче 1, план запрещает сводить проверки в функцию |
| F4 | P2 | scripts/deploy.mjs | Файл 100644, а правило владельца — chmod +x для .mjs с шебангом (было до диффа) | devops-reviewer | отклонена: Существующее состояние файла владельца (100644 до диффа), запуск через node scripts/deploy.mjs; доложено владельцу отдельно |
| F5 | P2 | scripts/check-sitemap.test.mjs:1 | Тесты не подключены к npm test; нет кейсов на пустой <urlset/>, BOM/пробелы перед <?xml, sitemap_index.xml-каталог | devops-reviewer | исправлена: 0c90f52: кейсы BOM+xml-stylesheet, пробелы, xml-stylesheet+HTML, пустые urlset/sitemapindex, sitemap_index-каталог; npm test не добавлен — package.json вне рамок плана |
| F6 | P2 | nuxt.config.ts:12-13,79 | publicDir='' — молчаливый запасной путь: если nitro:init не сработает, sitemap.xml запишется в cwd (корень репо) | nuxt-reviewer | исправлена: 85d7d99: throw, если publicDir пуст |
| F7 | P2 | nuxt.config.ts:80 | throw без индекса сработает и при переходе модуля на один sitemap; сообщение не объясняет причину | nuxt-reviewer | исправлена: 85d7d99: сообщение называет ожидаемый multi-sitemap режим |
| F8 | P2 | nuxt.config.ts:70 | ignore '/sitemap.xml' по startsWith отсечёт и будущие /sitemap.xml.gz или /sitemap.xml/... — сейчас таких нет | nuxt-reviewer | отклонена: Заметка ревьюера: менять не нужно, сейчас таких путей нет |
<!-- /crew:auto -->

## QA

вердикт: caveats. Всё, что проверяется локально, выполнено; прод и Вебмастер проверит владелец после деплоя.

| № | требование | как проверено | итог |
|---|---|---|---|
| 1 | `sitemap.xml` — файл, `<?xml`, `<sitemapindex`, `<loc>` на en-US и ru-RU, побайтно равен `sitemap_index.xml` | `generate-local-builddir.mjs` (Failing Pages: 0), `ls -la` (файл 474 байта), `head`, `cmp` | выполнено |
| 2 | нет каталога `sitemap.xml/`, `sitemap.xml/index.html`, `ru/sitemap.xml*` | `find .output/public -name 'sitemap.xml*'` (только файл), `ls ru`; в логе generate нет `/sitemap.xml/` | выполнено |
| 3 | `sitemap_index.xml`, `__sitemap__/en-US.xml`, `ru-RU.xml`, `style.xsl` на месте и без изменений | `diff -I 'generated by @nuxtjs/sitemap'` с эталоном public-before: пусто по всем четырём | выполнено |
| 4 | `robots.txt` не изменился | `diff` с эталоном пуст; `Sitemap: .../sitemap_index.xml` | выполнено |
| 5 | check-sitemap: 1 на старой сборке, 0 на новой | на public-before код 1 («sitemap.xml is a directory…»), на новой код 0; `check-slash` на новой сборке тоже OK | выполнено |
| 6 | тесты check-sitemap | `node --test check-slash.test.mjs check-sitemap.test.mjs`: 31 из 31 | выполнено |
| 7 | deploy блокируется до push | фикстура в scratchpad (`qa-deploy-fixture`, каталог вместо файла), `GIT_SSH_COMMAND=false`: check-slash OK, check-sitemap ✗, код 1, `.git` в public не создан | выполнено |
| 8 | `npm run build` проходит, нет `any`, скрипты на `node:` | build: Build complete; `grep -nw any` по диффу пуст; tsc по `.nuxt/tsconfig.node.json`: одна ошибка `nuxt.config.ts:103` (`optimizeTranslationDirective`), не в строках хуков (проверка ниже) | выполнено, оговорка 2 |
| 9 | прод: 200/xml/без Location, `/sitemap.xml/` 404 | локально статическим сервером (python http.server, порт 8765, остановлен): `/sitemap.xml` 200 application/xml без Location; `/sitemap.xml/` 404; `/sitemap_index.xml`, `/__sitemap__/en-US.xml`, `ru-RU.xml` 200 xml; `/robots.txt` 200. Живой сайт сейчас: `/sitemap.xml` 301 на `/sitemap.xml/` (дефект на месте), `/sitemap_index.xml` 200 xml | локально выполнено; на проде после деплоя, владельцем |
| 10 | Яндекс.Вебмастер без ошибок, GSC «Успешно» | не проверить: нужен деплой и кабинеты | после деплоя, владельцем |

Края: каталог вместо файла, HTML вместо XML, нет файла, нет индекса, пустой urlset, BOM и пробелы перед `<?xml` покрыты тестами (31 зелёный). Повторная сборка: generate отработал без падения. Браузером интерфейс не открывался: у задачи нет UI, проверялись HTTP-ответы.

Оговорки:
1. Прод и Вебмастер (критерии 9–10) локально не проверить. После ручного `npm run deploy` из `nuxt4` (с задачей №1): `curl -sI https://rihard-developer.ru/sitemap.xml` (200, xml, без location), `curl -s .../sitemap.xml | head -5`, `curl -sI .../sitemap.xml/` (404), `curl -sI .../sitemap_index.xml`, `.../__sitemap__/en-US.xml`, `.../ru-RU.xml`, сверка `robots.txt` с `8699ff7:robots.txt`; затем перепроверка `/sitemap.xml` в Яндекс.Вебмастере и статуса `sitemap_index.xml` в GSC. GitHub Pages кэширует около 10 минут.
2. tsc: ошибка `nuxt.config.ts:103` касается ключа `optimizeTranslationDirective` вне диффа задачи; в строках хуков ошибок нет.
3. Python http.server отдаёт `Content-type: application/xml`; GitHub Pages выставляет тип по расширению, ожидается то же, на проде проверит `curl -sI`.
4. Гейт `npm run build` перезаписал `.output` сборкой без пререндера; для повторной проверки пересобрать `generate-local-builddir.mjs`.

## Слова владельца

<!-- crew:auto:words -->
- 2026-10-20 23:53 · go · «3. Задача 3 делай.»
- 2026-10-21 00:10 · accept (acceptance) · owner: «принимаю задачу 3»
<!-- /crew:auto -->

## Итог
