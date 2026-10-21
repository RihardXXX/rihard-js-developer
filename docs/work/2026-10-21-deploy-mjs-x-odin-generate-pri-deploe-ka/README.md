# 4. deploy.mjs +x, один generate при деплое, карточки в docs/work

<!-- crew:auto:meta -->
вид: change · уровень: M · вердикт: ready · ветка: feat/deploy-mjs-x-odin-generate-pri-deploe-ka · фаза: ревью пройдено
<!-- /crew:auto -->

## Задача

1. Да добавь 2. Убери 3. Перенеси

## Бриф

**Коротко.** Три мелкие правки без нового кода: `scripts/deploy.mjs` получает режим 100755 (шебанг уже на месте),
`deploy:app` становится `npm run deploy`, и тогда generate идёт один раз; три карточки задач 1–3 из резервной копии
коммитятся в `docs/work`. Открыты три побочных решения, ни одно не мешает начать: npm-run-all, Gmail-ссылка в публичном репозитории, ai-skills.test.mjs.

### Что просят

Это ответы владельца на три вопроса после задач 1–3:
1. «Да добавь» — сделать `scripts/deploy.mjs` исполняемым, как check-slash.mjs и check-sitemap.mjs.
2. «Убери» — `npm run deploy:app` должен запускать `nuxt generate` один раз, а не два. Порядок не меняется: generate → check-slash → check-sitemap → push в gh-pages.
3. «Перенеси» — вернуть в репозиторий карточки задач 1–3, которые удалил `crew retire`, и закоммитить их в `docs/work`.

### Известно точно

- `scripts/deploy.mjs` хранится в git с режимом `100644`, строка 1 — `#!/usr/bin/env node`. Соседи `check-slash.mjs` и `check-sitemap.mjs` — `100755`. `core.filemode = true`, так что git увидит смену режима.
- Двойной generate подтверждён по коду. `deploy:app` = `npm-run-all predeploy deploy`. npm-run-all запускает каждое имя через `npm run`
  (node_modules/npm-run-all/lib/run-task.js:157–161). `npm run predeploy` даёт generate №1, затем `npm run deploy` сам вызывает хук
  `predeploy`, и это generate №2. Хуки не отключены: в `~/.npmrc` стоит `ignore-scripts=false`, `.npmrc` в проекте нет.
- `npm-run-all` нигде, кроме `deploy:app`, не используется: `git grep` находит его только в package.json:16 и :32. CI в репозитории нет, `.github` отсутствует.
- Владелец деплоит руками через `npm run deploy` (карточка задачи 3: «после ручного `npm run deploy`»), а это уже один generate.
  Значит, `npm run deploy` должен остаться как есть.
- `docs/work` не игнорируется (`.gitignore` про docs молчит). В git под `docs/work` лежит один файл —
  `docs/work/2026-10-20-dobavit-na-stranicu-navyki-raboty-s-ii/ai-skills.test.mjs` (пришёл в nuxt4 с PR #4).
  Он побайтно совпадает с копией в бэкапе (`cmp`), так что переносить нужно только три `README.md`.
- Бэкап карточек: `/private/tmp/claude-501/-Users-rihard-projects-portfolio-nuxt3/4dc60d21-7622-4f9a-b93a-f5adf853a571/scratchpad/cards-backup/`
  — `2026-10-20-gsc-stranicy-s-pereadresaciey-ne-indeksi/README.md` (188 строк), `2026-10-20-dobavit-na-stranicu-navyki-raboty-s-ii/README.md` (224),
  `2026-10-20-sitemap-xml-otdaet-html-redirekt-vmesto/README.md` (281).
- Почему карточки пропали (по коду crew). `crew wt add` переносит неотслеживаемую карточку в дерево задачи (crew/src/cmd/wt.mjs:138–143).
  Шаг 3 гайда ship требует закоммитить её там (crew/guides/ship.md:13). У задач 1–3 этот коммит не сделали, а `crew retire`
  снимает дерево через `git worktree remove --force` (crew/src/cmd/retire.mjs:85), и неотслеживаемая карточка удаляется вместе с ним.
  В crew/src/lib/tasks.mjs:314 прямо сказано: «После уборки карточка живёт в истории git».
- Карточка задачи 4 (этой) сейчас не отслеживается и лежит в главном дереве. При `crew wt add 4` она уедет в рабочую копию.
  Отдельно переносить её не нужно: достаточно выполнить шаг 3 гайда ship, то есть закоммитить карточку в ветке задачи до `crew ship --go`.
- Репозиторий `RihardXXX/rihard-js-developer` публичный (`gh repo view`: PUBLIC), default branch — nuxt4.
- В карточках есть приватные детали. В карточке 1 на строке 9 дословный текст владельца — ссылка на Gmail-ящик (`mail.google.com/mail/u/0/#inbox/…`).
  В карточках 1 и 3 есть локальные пути `/Users/rihard/…` и `/private/tmp/claude-501/…`. Токенов и паролей нет (grep).
- `ai-skills.test.mjs` автоматически не запускается: скрипта `test` в package.json нет, CI тоже. Запускается только руками:
  `node --test <файл>` после `npm run generate`. Если вызвать голый `node --test` из корня, Node 24 по умолчанию подхватит `**/*.test.mjs`,
  то есть этот файл вместе с `scripts/*.test.mjs`. Без `.output/public` он упадёт на `assert.fail` («сначала npm run generate»).
  Переносом карточек это не меняется: файл уже в репозитории.

### Не знаем

- Удалять ли теперь неиспользуемый `npm-run-all` из devDependencies (вопрос 1).
- Можно ли публиковать карточки как есть, вместе с Gmail-ссылкой (вопрос 2).
- Нужен ли `ai-skills.test.mjs` в репозитории дальше (вопрос 3).

### Где в коде

- `package.json:14` — `"predeploy": "nuxt generate"`, не меняется.
- `package.json:15` — `"deploy": "node scripts/deploy.mjs"`, не меняется.
- `package.json:16` — `"deploy:app": "npm-run-all predeploy deploy"` → `"deploy:app": "npm run deploy"`. Это единственная правка строки.
- `package.json:32` — `"npm-run-all": "^4.1.5"` трогаем только при ответе «удалить» на вопрос 1.
- `scripts/deploy.mjs` — меняется только режим (`chmod +x` или `git update-index --chmod=+x`), содержимое не трогаем. Образец — `scripts/check-slash.mjs` и `scripts/check-sitemap.mjs` (100755).
- `docs/work/2026-10-20-*/README.md` — три новых файла, копии из бэкапа.
- Образец теста, если планировщик решит его писать, — `scripts/check-slash.test.mjs` (node:test).

Какие варианты для п. 2 рассмотрены:
- **A (берём).** `deploy:app` → `npm run deploy`. Одна строка. `npm run deploy` и `npm run deploy:app` делают одно и то же: generate один раз, потом проверки и push.
- **B.** Удалить `deploy:app`. Тоже одна строка, но команда, которую владелец не просил убирать, перестанет работать.
- **C.** Убрать хук `predeploy`, а в `deploy:app` вызывать `generate`. Тогда `npm run deploy` перестанет собирать сайт и выложит старый `.output/public` — это ломает привычный ручной деплой. Отклонено.

### Критерии готовности

1. `git ls-files -s scripts/deploy.mjs` показывает `100755`. `git diff <база> -- scripts/deploy.mjs` содержит только `old mode 100644 / new mode 100755`, без правок текста. Строка 1 — `#!/usr/bin/env node`.
2. В `package.json` изменена одна строка: `"deploy:app": "npm run deploy"`. `predeploy`, `deploy`, остальные скрипты и `package-lock.json` не тронуты (если на вопрос 1 ответят «удалить», см. допущения).
3. В логе `npm run deploy:app` строка `> nuxt generate` встречается ровно один раз (до правки — два), дальше идут check-slash, check-sitemap и push.
   Без публикации на прод это проверяется так: первым в `PATH` ставится фиктивный `git`, который перехватывает только `push`, остальные вызовы отдаёт настоящему git.
   Окончательно подтвердит лог следующего настоящего деплоя владельца.
4. `npm run deploy` ведёт себя как раньше: один generate, затем проверки и публикация.
5. Ошибки останавливают деплой, как и раньше. Упал `nuxt generate` — `deploy.mjs` не запускается, код выхода ненулевой. Упала check-slash или check-sitemap — `exit 1`, push не уходит.
6. Три файла `docs/work/2026-10-20-{gsc-stranicy-s-pereadresaciey-ne-indeksi,dobavit-na-stranicu-navyki-raboty-s-ii,sitemap-xml-otdaet-html-redirekt-vmesto}/README.md`
   есть в ветке и побайтно совпадают с бэкапом (`cmp`), если на вопрос 2 не ответят «вычистить». `ai-skills.test.mjs` не изменён.
7. Карточка задачи 4 закоммичена в ветке задачи (шаг 3 гайда ship). После слияния и `crew retire` она лежит в nuxt4 по пути `docs/work/2026-10-21-deploy-mjs-x-odin-generate-pri-deploe-ka/README.md`.
8. `npm run build` зелёный (проверка crew).
9. Дифф ветки против nuxt4: package.json (1 строка), смена режима deploy.mjs, три README.md из бэкапа и карточка задачи 4. Больше ничего.

### Вне рамок

- Удаление `push-dir`. Он тоже мёртвый с e71ccb9 (заменён своим скриптом), но к задаче не относится. Это наблюдение, в этой задаче его не трогаем.
- Ремонт `lint` и `typecheck`, скрипт `test` в package.json, CI.
- Перенос или переписывание `ai-skills.test.mjs` (решает вопрос 3).
- Изменения в crew, в том числе в том, что `retire --force` молча удаляет неотслеживаемую карточку. Это инструмент владельца, отдельная тема.

### Вопросы

1. **npm-run-all** после правки нигде не используется. Варианты: «оставить в devDependencies» / «удалить: `npm uninstall npm-run-all`, правится package.json:32 и package-lock.json».
   _Почему спрашиваем:_ это изменение зависимостей и lock-файла, попутно его не делаем.
2. **Карточки в публичный репозиторий.** В карточке 1 на строке 9 дословно стоит ссылка на ваш Gmail-ящик, в карточках 1 и 3 — локальные пути. Варианты: «коммитить как есть» / «заменить Gmail-ссылку на `(ссылка на письмо Google Search Console)`, остальное как есть».
   _Почему спрашиваем:_ репозиторий публичный, и после push строка останется в истории git навсегда. Решать нужно до коммита.
3. **`ai-skills.test.mjs`** уже лежит в nuxt4 в `docs/work/…/`. Сам он не запускается, а голый `node --test` из корня уронит его, если сайт не собран. Варианты: «оставить как запись задачи 2» / «удалить из репозитория».
   _Почему спрашиваем:_ сейчас это тест, который никто не запускает. Он может запутать того, кто запустит `node --test`.

### Допущения и цена пересмотра

- **Д1.** `npm-run-all` остаётся в devDependencies. Если ответ «удалить» — `npm uninstall npm-run-all` отдельным коммитом `chore:`, это 1 строка в package.json плюс lock-файл, минут пять.
- **Д2.** Карточки коммитятся как есть, побайтно. Если ответ «вычистить» до коммита — правится 1 строка в одном файле. Если после push — строка уже в публичной истории, и убрать её можно только переписыванием истории. Поэтому правильнее ответить до сдачи.
- **Д3.** `ai-skills.test.mjs` не трогаем. Если ответ «удалить» — `git rm` одного файла, один коммит.
- **Д4.** Метод — вариант A. Если владелец предпочтёт B (удалить `deploy:app`) — правится та же строка, цена нулевая.

### Решения владельца

На допущения владелец ответил: «1. Поправь если это лучше». Выбор оставлен ведущему:
- **Д1 → удалить.** Мёртвая зависимость тянула 130 пакетов. Коммит ef40d3a. `npm uninstall` попутно поднял бы платформенные `@esbuild/*` внутри nuxt с 0.28.0 до 0.28.2,
  поэтому lock-файл правился точечно. Из него убраны только npm-run-all и 130 записей, которые держал он один, остальные записи не тронуты.
  Ссылка на npm-run-all из `scripts/deploy.test.mjs` убрана тоже.
- **Д3 → оставить.** `ai-skills.test.mjs` записан в карточке 2 как проверка задачи. Он лежит в `docs/work`, а не среди тестов проекта, и сам не запускается.
  Вред только гипотетический: при голом `node --test` без сборки он упадёт.
- **Д4 → вариант A** без изменений. Находку ревью F1 (ignore-scripts) отклонили, причина записана в «Ревью».
- **Д2 → заменить.** На вопрос о Gmail-ссылке владелец ответил «Заменить (Recommended)». В карточке 1 строка 9 стала такой:
  «(письмо Google Search Console «Страница с переадресацией») нужно сделать правки».
  Ветку ещё не отправляли, поэтому правка внесена в сам коммит с карточками (7cc4cec), чтобы ссылки не было и в истории.
  Остальные четыре коммита переставлены поверх него без изменений.
  Локальные пути `/Users/rihard/…` в карточках оставлены.

### Зависимости и цена ошибки

- **Бэкап карточек лежит в `/private/tmp/…/scratchpad`.** macOS чистит `/private/tmp` при перезагрузке. Переносить нужно до перезагрузки, иначе карточки 1–3 пропадут насовсем.
- **Деплой.** Если ошибиться в `deploy:app` (например, вариант C), сайт либо не соберётся перед публикацией и на прод уйдёт устаревший `.output/public`, либо деплой не запустится вообще. Пострадает rihard-developer.ru.
  Проверки check-slash и check-sitemap живут внутри `deploy.mjs` и при любом варианте не обходятся.
- **Публичность.** Приватная ссылка или пути в истории git публичного репозитория (Д2).
- Миграций и чужих систем нет, задачи 1–3 влиты.

## План

Действуют допущения Д1–Д4. Обозначения в командах ниже: W — `/Users/rihard/projects/portfolio-nuxt3/.claude/worktrees/feat-deploy-mjs-x-odin-generate-pri-deploe-ka`,
B — `/private/tmp/claude-501/-Users-rihard-projects-portfolio-nuxt3/4dc60d21-7622-4f9a-b93a-f5adf853a571/scratchpad/cards-backup`.
При запуске подставлять полный абсолютный путь. Без `cd`: вместо него `git -C`, `npm --prefix`.

### Файлы

- `docs/work/2026-10-20-gsc-stranicy-s-pereadresaciey-ne-indeksi/README.md` — новый файл, побайтная копия из B.
- `docs/work/2026-10-20-dobavit-na-stranicu-navyki-raboty-s-ii/README.md` — новый файл, побайтная копия из B. Лежащий рядом `ai-skills.test.mjs` не трогаем.
- `docs/work/2026-10-20-sitemap-xml-otdaet-html-redirekt-vmesto/README.md` — новый файл, побайтная копия из B.
- `scripts/deploy.mjs` — меняется только режим, 100644 → 100755. Текст не трогаем.
- `package.json:16` — `"deploy:app": "npm-run-all predeploy deploy"` → `"deploy:app": "npm run deploy"`. Других правок нет.
- `scripts/deploy.test.mjs` — новый файл, режим 100644, как у соседних `*.test.mjs`. Почему отдельный файл: `check-slash.test.mjs` и `check-sitemap.test.mjs`
  проверяют каждый свой скрипт, а этот тест проверяет связку npm-скриптов деплоя и режим `deploy.mjs`.
  **Критерий 9 расширяется:** в диффе ветки появляется ещё и этот файл.
- Карточка задачи 4 коммитится на шаге 3 гайда ship (критерий 7), в шаги ниже не входит.

### Шаги и коммиты

1. **Сначала карточки.** Бэкап лежит в `/private/tmp` и не переживёт перезагрузку. Скопировать `cp` три `B/<slug>/README.md` в `W/docs/work/<slug>/README.md`,
   ничего в них не меняя (Д2).
   Проверка: для каждой из трёх `cmp B/<slug>/README.md W/docs/work/<slug>/README.md` молчит и выходит с кодом 0.
   `git -C W diff --quiet -- docs/work/2026-10-20-dobavit-na-stranicu-navyki-raboty-s-ii/ai-skills.test.mjs` тоже выходит с кодом 0.
   Коммит `docs: restore task cards 1-3 in docs/work`, в нём только три README.md.
2. **Тест до кода.** Написать `scripts/deploy.test.mjs` (см. «Тесты») и запустить `node --test W/scripts/deploy.test.mjs`.
   На текущем коде ожидаем два красных теста: т1 (режим 100644) и т2 (лог `nuxt generate, nuxt generate, deploy`, два баннера).
   Тесты т3 и т4 зелёные.
   Если тест красный по другой причине (npm-run-all не найден, ошибка ESM в фикстуре, ENOENT) — чинить тест, а не код. На этом шаге не коммитим.
3. **Режим.** Выполнить `chmod +x W/scripts/deploy.mjs`, затем `git -C W add scripts/deploy.mjs`.
   Одного `git update-index --chmod=+x` мало: при `core.filemode = true` рабочий файл останется 644, и `git status` покажет обратную смену режима.
   Проверка: `git -C W ls-files -s scripts/deploy.mjs` начинается с `100755`. `git -C W diff --cached -- scripts/deploy.mjs` содержит только `old mode 100644` / `new mode 100755`.
   Коммит `chore: make scripts/deploy.mjs executable`.
4. **Один generate.** Поправить `package.json:16` на `"deploy:app": "npm run deploy"`.
   Проверка: в `git -C W diff -- package.json` ровно одна удалённая и одна добавленная строка. `git -C W diff --quiet nuxt4 -- package-lock.json` выходит с кодом 0.
   Коммит `fix: run nuxt generate once in deploy:app`.
5. `node --test W/scripts/deploy.test.mjs` — все четыре теста зелёные.
   Заодно `node --test W/scripts/check-slash.test.mjs W/scripts/check-sitemap.test.mjs` — без изменений, зелёные.
   Коммит `test: deploy:app runs nuxt generate once, deploy.mjs is executable`.
6. **Сверка.** `npm --prefix W run build` зелёный (критерий 8).
   `git -C W diff --stat --summary nuxt4...HEAD` показывает ровно: `package.json` (+1/−1), `mode change 100644 => 100755 scripts/deploy.mjs`,
   `scripts/deploy.test.mjs`, три README.md. После шага 3 гайда ship сюда добавится карточка задачи 4.

### Тесты

Файл `scripts/deploy.test.mjs`: `node:test` + `node:assert/strict`, только встроенные модули. Оформление как в `scripts/check-slash.test.mjs`:
- внешний процесс запускается через `execFile` с массивом аргументов, без shell;
- хелпер создаёт фикстуру через `mkdtemp(join(tmpdir(), 'deploy-'))` и удаляет её `rm` в `finally`;
- `.mjs`, как соседние тесты.

Корень репозитория — `fileURLToPath(new URL('..', import.meta.url))`.

**Фикстура `withProject(fn)`** — временный проект в `os.tmpdir()`:
- `package.json` — копия настоящего из корня. Тест её читает, но ни с чем не сравнивает.
- `fake-nuxt.mjs` (шебанг `#!/usr/bin/env node`, режим 0o755) дописывает строку `nuxt <аргументы>` в файл из env `DEPLOY_TEST_LOG`.
  Выходит с кодом из env `FAKE_NUXT_EXIT`, по умолчанию 0.
- `node_modules/.bin/nuxt` — symlink на `fake-nuxt.mjs`. Благодаря `.mjs` это ESM при любом `"type"`.
- `node_modules/.bin/npm-run-all` — symlink на `<корень>/node_modules/npm-run-all/bin/npm-run-all/index.js`.
  Node берёт realpath главного модуля, поэтому зависимости npm-run-all находятся в настоящем node_modules.
  Ссылка нужна только для того, чтобы старый `deploy:app` краснел из-за двух generate, а не из-за `command not found`.
  После правки она не используется. Если npm-run-all когда-нибудь удалят, висячая ссылка ничему не помешает.
- `scripts/deploy.mjs` — заглушка, дописывает в тот же лог строку `deploy`. Настоящие `deploy.mjs` и git не запускаются, push невозможен в принципе.
- Запуск: `execFile('npm', ['run', <имя>], { cwd: <фикстура>, env: { ...process.env, DEPLOY_TEST_LOG, npm_config_ignore_scripts: 'false', npm_config_loglevel: 'notice', npm_config_update_notifier: 'false' } })`.
  `ignore-scripts=false` задаём явно: при `true` хук `predeploy` не запустится, и старый код ложно покажет «один generate».
  `loglevel=notice` нужен, чтобы npm точно печатал баннер `> <команда>` в stdout.

**Тесты:**
1. **т1 «deploy.mjs исполняемый и с шебангом»** — критерий 1. Вывод `git ls-files -s scripts/deploy.mjs` (cwd — корень) начинается с `100755 `,
   первая строка файла — `#!/usr/bin/env node`. Сейчас красный. Разбираем вывод `-s`, потому что в git 2.34 нет `ls-files --format`.
2. **т2 «npm run deploy:app: generate один раз, затем deploy»** — критерий 3. Код 0, лог равен `['nuxt generate', 'deploy']`,
   а в stdout+stderr npm ровно одно совпадение `/^> nuxt generate$/gm` — это буквальная формулировка критерия.
   Сейчас красный: в логе `['nuxt generate', 'nuxt generate', 'deploy']` и два баннера.
3. **т3 «npm run deploy как раньше»** — критерий 4. Код 0, лог равен `['nuxt generate', 'deploy']`.
   Зелёный и до правки, и после. Страхует от вариантов B и C.
4. **т4 «упавший generate останавливает deploy:app»** — критерий 5, первая половина. При `FAKE_NUXT_EXIT=1` код не 0, лог равен `['nuxt generate']`, deploy не вызван.
   Зелёный до правки и после. Вторая половина критерия (check-slash/check-sitemap → `exit 1`, push не уходит) живёт в тексте `deploy.mjs`.
   Текст не меняется, а сами проверки уже держат `check-slash.test.mjs` и `check-sitemap.test.mjs`.

**Почему тесты не хрупкие.** `package.json` целиком не сравнивается, проверяется поведение npm-скриптов.
Лог пишут фиктивные бинари, и от формата вывода npm он не зависит. От формата npm зависит только баннер `> <команда>`: он печатается в `@npmcli/run-script` с npm 7, а loglevel в тесте зафиксирован.

**Почему не другие способы проверить критерий 3:**
- Фиктивный `nuxt` первым в PATH прямо в W не сработает. `npm run` ставит `<проект>/node_modules/.bin` и `.bin` всех предков впереди PATH
  (`@npmcli/run-script/lib/set-path.js`), и выигрывает настоящий nuxt. В фикстуре своего настоящего nuxt нет, поэтому подмена надёжна.
- `npm run --dry-run` не годится: у `npm run` нет параметра `dry-run` (см. `params` в `npm/lib/commands/run.js`), скрипты выполнятся по-настоящему.
- Фиктивный `git` из критерия 3 брифа требует настоящего generate. Это минуты работы и общий buildDir `node_modules/.cache/nuxt/.nuxt`, из-за которого в worktree бывает 500.
  Вдобавок запускается настоящий `deploy.mjs`. Фикстура обходится и без generate, и без git.
- Окончательное подтверждение — лог следующего настоящего `npm run deploy:app` владельца: в нём одна строка `> nuxt generate`.

**Критерий 6 тестом не ловим.** Эталон для сравнения — бэкап в `/private/tmp`, а он исчезнет. Постоянный тест проверял бы только, что документация лежит на месте.
Состояние до и после показывает `cmp` из шага 1: сейчас `No such file`, после переноса — молчание и код 0.

### Риски

- **Публичность (Д2).** Gmail-ссылка из строки 9 карточки 1 уйдёт в публичную историю при push. Убрать её потом можно только переписыванием истории.
  Перед `crew ship --go` напомнить владельцу.
- **Бэкап.** Карточки пропадут при перезагрузке, поэтому шаг 1 идёт первым.
- **Режим слетит**, если какой-нибудь инструмент перезапишет файл. Это поймает т1.
- **Сборка в worktree.** `npm run build` может упасть с 500 из-за общего buildDir в общем node_modules. Код приложения дифф не трогает.
  Если сборка упала, сначала собрать nuxt4 в главном дереве, и только потом искать причину в ветке.
- **Голый `node --test` из корня** теперь подхватит и `deploy.test.mjs`: несколько секунд на запуски npm, сборка не нужна.
  `ai-skills.test.mjs` без `.output/public` по-прежнему падает — это Д3, к задаче не относится.
- **Окружение теста.** Нужны `npm` и `git` в PATH. Чтобы т2 краснел на старом коде, в node_modules должен быть npm-run-all.
- **Критерий 9** расширен на `scripts/deploy.test.mjs`.

### Не трогаем

- `npm-run-all` в devDependencies и `package-lock.json` (Д1). `push-dir` (вне рамок).
- Текст `scripts/deploy.mjs`. Строки `predeploy`, `deploy`, `generate` в package.json.
- Режим `check-*.test.mjs`: у тестов 100644, так и должно быть.
- `ai-skills.test.mjs` (Д3). Содержимое карточек 1–3, в том числе Gmail-ссылку и локальные пути (Д2).
- Скрипты `test`, `lint`, `typecheck`, CI, crew.

## Проверки

<!-- crew:auto:evidence -->
| проверка | итог | коммит | когда |
|---|---|---|---|
| root:build | зелёная | ef40d3a3 | 2026-10-21 11:34 |
<!-- /crew:auto -->

## Ревью

<!-- crew:auto:findings -->
- ревью: crew:reviewer, находок 1, 2026-10-21 10:01

| № | важность | где | что | кто | исход |
|---|---|---|---|---|---|
| F1 | P2 | package.json:16 | При ignore-scripts=true новый deploy:app (npm run deploy) пропускает хук predeploy, nuxt generate не запускается, в gh-pages уходит прошлая сборка; старый npm-run-all predeploy deploy вызывал predeploy явно. Тест фиксирует только ignore-scripts=false. | crew:reviewer | отклонена: Правка ушла бы в обход правила владельца «в package.json скрипт — одна строка node scripts/<name>.mjs, без цепочек &&» и отменила бы выбранный в брифе вариант A. ignore-scripts у владельца стоит false явно (~/.npmrc). Та же слабость есть у основного пути npm run deploy с самого начала, и в задачу это не входит. Вынесено владельцу как наблюдение. |
<!-- /crew:auto -->

## QA

## Слова владельца

<!-- crew:auto:words -->
- 2026-10-21 09:49 · go · «/crew:go 4»
<!-- /crew:auto -->

## Итог

**Сделано** (ветка `feat/deploy-mjs-x-odin-generate-pri-deploe-ka`, 5 коммитов поверх nuxt4):
- `docs/work`: возвращены карточки задач 1–3. Они побайтно совпадают с бэкапом, кроме строки 9 карточки 1: Gmail-ссылку заменили по решению владельца (Д2).
- `scripts/deploy.mjs` стал исполняемым (100644 → 100755), текст не менялся.
- `package.json`: `deploy:app` теперь `npm run deploy`, `nuxt generate` при деплое запускается один раз.
- npm-run-all удалён из devDependencies. Из lock-файла ушли только он и 130 записей, которые держал он один.
- Новый тест `scripts/deploy.test.mjs`.

**Как проверено:**
- `scripts/deploy.test.mjs`, 4 теста на временном проекте с подставными nuxt и deploy. До правки т1 и т2 падали, теперь проходят. Вместе с check-slash и check-sitemap — 35 из 35.
- `crew gate`: `npm run build` зелёный на ef40d3a. Проверки типов в проекте нет.
- `npm ls --package-lock-only`: package.json и lock-файл согласованы. Сравнение по содержимому: в lock-файле только удаления.
- Ревью: одна находка P2 (F1, ignore-scripts), отклонена с причиной.

**Осталось:**
- Окончательная проверка — лог следующего настоящего `npm run deploy:app`: в нём должна быть одна строка `> nuxt generate`.
- После слияния, чтобы npm-run-all ушёл и из `node_modules` главного дерева, выполнить `npm install`. До этого он просто лежит там без дела.
- Наблюдение, не задача: при `ignore-scripts=true` и `npm run deploy`, и `deploy:app` выложат прошлую сборку (F1). Если когда-нибудь включать `ignore-scripts`, generate стоит перенести внутрь `deploy.mjs`.
