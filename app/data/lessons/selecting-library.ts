import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'selecting-library',
  title: {
    ru: "Как выбрать библиотеку для ФП",
    en: "How to choose an FP library",
  },
  description: {
    ru: "Как выбрать библиотеку для ФП в JavaScript и TypeScript: Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts или Effect — по бюджету, этапу, команде и качеству.",
    en: "How to choose a library for FP in JavaScript and TypeScript: Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts or Effect, by budget, stage, team and quality.",
  },
  goal: {
    ru: "Научиться выбирать между Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts и Effect по критериям проекта и команды — бюджету, этапу, команде, качеству, производительности и парадигме, — а не по вкусу и моде.",
    en: "Learn to choose between Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts and Effect by the criteria of the project and the team (budget, stage, team, quality, performance and paradigm) rather than by taste or fashion.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Когда перед вами стоит выбор, что выбрать из библиотек, описанных в курсе и ниже, или ванильного решения, не стоит опираться на следующие принципы, которые я часто встречал в своей практике при коммерческой разработке. Не стоит придерживаться следующего:",
      en: "When you face the choice of which of the libraries described in the course and below, or a vanilla solution, to pick, you should not rely on the following principles, which I have often encountered in my own commercial development practice. You should not stick to the following:",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Мне нравится эта библиотека (хотелки).",
          en: "I like this library (personal wishes).",
        },
        {
          ru: "Это сейчас модно (хотелки).",
          en: "It's trendy right now (personal wishes).",
        },
        {
          ru: "Я главный, я решаю и я так хочу (хотелки).",
          en: "I'm in charge, I decide, and that's what I want (personal wishes).",
        },
      ],
    },
    {
      type: 'text',
      ru: "Все выше описанное это не профессиональный подход.",
      en: "Everything described above is not a professional approach.",
    },
    {
      type: 'text',
      ru: "На что следует обратить внимание. Какие критерии важны при выборе:",
      en: "What you should pay attention to. Which criteria matter when choosing:",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Бюджет. Очень важно понять платежеспособность инвестора (клиента) и его планы на будущее. Это очень важный пункт и можно сказать один из основных.",
          en: "Budget. It is very important to understand the financial capacity of the investor (client) and their plans for the future. This is a very important point and, you could say, one of the main ones.",
        },
        {
          ru: "Насколько % проект завершён или он находится в начале. Аналогично: если проект написан и все работает корректно, не нужно его переписывать.",
          en: "How far along the project is, percentage-wise, or whether it is just at the beginning. Likewise: if the project is already written and everything works correctly, there is no need to rewrite it.",
        },
        {
          ru: "Кто работает с тобой в команде и сколько вас человек. Нужно понимать процесс онбординга нового разработчика в команду, знаком ли он с данной библиотекой и твоими архитектурными решениями.",
          en: "Who works with you on the team and how many of you there are. You need to understand the onboarding process for a new developer joining the team, whether they are familiar with this library and with your architectural decisions.",
        },
        {
          ru: "Качество продукта. Чем выше сложность, тем зачастую качество будет расти.",
          en: "Product quality. The higher the complexity, the more the quality tends to grow.",
        },
        {
          ru: "Перфоманс. Это не самый важный фактор, так как зачастую ошибка в логике приложения даст просадку, а не какая-либо библиотека.",
          en: "Performance. This is not the most important factor, since often it is a flaw in the application's logic that causes a slowdown rather than any particular library.",
        },
        {
          ru: "Парадигма функционального программирования.",
          en: "The functional programming paradigm.",
        },
      ],
    },
    {
      type: 'heading',
      ru: "Vanilla JS",
      en: "Vanilla JS",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Бюджет. Бюджет небольшой или средний.",
          en: "Budget. The budget is small or medium.",
        },
        {
          ru: "Насколько % проект завершён или он находится в начале. Когда проект уже ранее был начат на JS и вышел за горизонт и финишную прямую.",
          en: "How far along the project is, percentage-wise, or whether it is just at the beginning. When the project was already started earlier in JS and has passed the horizon and the home stretch.",
        },
        {
          ru: "Кто работает с тобой в команде и сколько вас человек. Для малых команд с глубокими знаниями JS. Порой такая команда работает эффективнее большой, где язык знают поверхностно. Глубокое знание JS нужно и в проектах на TypeScript: типы проверяются при компиляции и сами по себе не защищают от ошибок в данных, которые приходят во время выполнения.",
          en: "Who works with you on the team and how many of you there are. For small teams with deep knowledge of JS. At times such a team works more effectively than a large one where the language is known only superficially. Deep knowledge of JS matters in TypeScript projects too: types are checked at compile time and on their own do not protect against errors in data that arrives at runtime.",
        },
        {
          ru: "Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое.",
          en: "Product quality. Depends on the team, deadlines, and budget; often not high.",
        },
        {
          ru: "Перфоманс. Будет самый высокий при аналогичном коде относительно библиотек.",
          en: "Performance. It will be the highest given equivalent code compared to the libraries.",
        },
        {
          ru: "Парадигма функционального программирования. Полная свобода: процедурный, ООП, ФП и т.п. И каждый как хочет.",
          en: "The functional programming paradigm. Complete freedom: procedural, OOP, FP, and so on. And everyone does as they please.",
        },
      ],
    },
    {
      type: 'heading',
      ru: "Lodash",
      en: "Lodash",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Бюджет. Подходит для проектов любого масштаба, но лучше использовать на средних проектах.",
          en: "Budget. Suitable for projects of any scale, but it is best used on medium-sized projects.",
        },
        {
          ru: "Насколько % проект завершён или он находится в начале. Только если проект не достиг горизонта, а находится на начальном этапе.",
          en: "How far along the project is, percentage-wise, or whether it is just at the beginning. Only if the project has not reached the horizon but is at an early stage.",
        },
        {
          ru: "Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно знакомых с функциональным программированием, которые хотят упростить рутину.",
          en: "Who works with you on the team and how many of you there are. For teams of any size who are superficially familiar with functional programming and want to simplify their routine.",
        },
        {
          ru: "Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое.",
          en: "Product quality. Depends on the team, deadlines, and budget; often not high.",
        },
        {
          ru: "Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки оптимизирован по размеру.",
          en: "Performance. It will be lower than vanilla given equivalent code. The library's bundle is optimized for size.",
        },
        {
          ru: "Парадигма функционального программирования. Не совсем функциональна: проблемы с иммутабельностью и передачей аргументов в композиции функций, когда на первом месте функции принимают данные, а потом уже функцию. Эти проблемы снимает модуль lodash/fp: в нем функции каррированы, не мутируют данные и принимают их последним аргументом. Для тех, кто только трогает функциональное программирование.",
          en: "The functional programming paradigm. Not entirely functional: there are problems with immutability and with passing arguments in function composition, where the functions take the data first and only then the function. The lodash/fp module removes these problems: its functions are curried, do not mutate the data, and take it as the last argument. For those who are only just touching functional programming.",
        },
      ],
    },
    {
      type: 'heading',
      ru: "Ramda",
      en: "Ramda",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Бюджет. Подходит для проектов любого масштаба.",
          en: "Budget. Suitable for projects of any scale.",
        },
        {
          ru: "Насколько % проект завершён или он находится в начале. На любом этапе, кроме ситуаций, когда проект уже завершается или уже присутствует другая библиотека для работы с данными.",
          en: "How far along the project is, percentage-wise, or whether it is just at the beginning. At any stage, except for situations when the project is already wrapping up or another data-handling library is already present.",
        },
        {
          ru: "Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно или профессионально использующих функциональное программирование, которые хотят упростить рутину.",
          en: "Who works with you on the team and how many of you there are. For teams of any size who use functional programming either superficially or professionally and who want to simplify their routine.",
        },
        {
          ru: "Качество продукта. Качество продукта, как правило, высокое.",
          en: "Product quality. The product quality is, as a rule, high.",
        },
        {
          ru: "Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки необходимо оптимизировать, если планируется использование только небольшой части 5-10% функций.",
          en: "Performance. It will be lower than vanilla given equivalent code. The library's bundle needs to be optimized if you plan to use only a small part, 5-10%, of its functions.",
        },
        {
          ru: "Парадигма функционального программирования. Используется полноценное функциональное программирование. Покрывает до 98% кейсов при работе с данными и подойдет для всех проектов. Своя философия в рамках функционального программирования. Проще для новичков в функциональном программировании и задает правильный тон. Нет болячек Lodash.",
          en: "The functional programming paradigm. Full-fledged functional programming is used. It covers up to 98% of cases when working with data and is suitable for all projects. It has its own philosophy within functional programming. It is easier for newcomers to functional programming and sets the right tone. It does not have Lodash's ailments.",
        },
      ],
    },
    {
      type: 'heading',
      ru: "Sanctuary",
      en: "Sanctuary",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Бюджет. Подходит для масштабных проектов с бюджетом выше среднего.",
          en: "Budget. Suitable for large-scale projects with an above-average budget.",
        },
        {
          ru: "Насколько % проект завершён или он находится в начале. Желательно использовать на начальном этапе.",
          en: "How far along the project is, percentage-wise, or whether it is just at the beginning. It is preferable to use it at the early stage.",
        },
        {
          ru: "Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, профессионально использующих функциональное программирование и понимающих, что они пишут.",
          en: "Who works with you on the team and how many of you there are. For teams of any size who use functional programming professionally and understand what they are writing.",
        },
        {
          ru: "Качество продукта. Качество продукта, как правило, высокое.",
          en: "Product quality. The product quality is, as a rule, high.",
        },
        {
          ru: "Перфоманс. Будет ниже ванилы при аналогичном коде.",
          en: "Performance. It will be lower than vanilla given equivalent code.",
        },
        {
          ru: "Парадигма функционального программирования. Используется полноценное функциональное программирование со своей философией, которая строже придерживается принципов ФП. Полноценное использование монад и прочих абстрактных типов. Высокий порог входа. Для тех, кто действительно в теме функционального программирования. Своя архитектура мышления. Учтите, что последний релиз Sanctuary, 3.1.0, вышел 9 августа 2020 года (по данным реестра npm на октябрь 2026 года).",
          en: "The functional programming paradigm. Full-fledged functional programming is used, with its own philosophy that adheres more strictly to FP principles. Full-fledged use of monads and other abstract types. A high barrier to entry. For those who are truly into functional programming. Its own architecture of thinking. Keep in mind that the latest Sanctuary release, 3.1.0, came out on August 9, 2020 (according to the npm registry as of October 2026).",
        },
      ],
    },
    {
      type: 'text',
      ru: "Следующие две библиотеки рассчитаны на TypeScript. Из JavaScript их тоже можно вызывать, но основную пользу они дают вместе с проверкой типов: отсутствие значения и возможные ошибки видны в типах, и компилятор проверяет, как код с ними обращается.",
      en: "The next two libraries are designed for TypeScript. They can be called from JavaScript as well, but most of their value comes with type checking: a missing value and possible errors show up in the types, and the compiler checks how the code deals with them.",
    },
    {
      type: 'heading',
      ru: "fp-ts",
      en: "fp-ts",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Бюджет. Подходит для проектов среднего и крупного масштаба с бюджетом не ниже среднего: команде нужно время на обучение.",
          en: "Budget. Suitable for medium and large projects with at least an average budget: the team needs time to learn it.",
        },
        {
          ru: "Насколько % проект завершён или он находится в начале. Прежде всего для проектов, где fp-ts уже используется. Новым пользователям README fp-ts предлагает смотреть на Effect как на преемника fp-ts v2.",
          en: "How far along the project is, percentage-wise, or whether it is just at the beginning. Above all for projects that already use fp-ts. For new users, the fp-ts README points to Effect as the successor to fp-ts v2.",
        },
        {
          ru: "Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, которые пишут на TypeScript и профессионально используют функциональное программирование: нужно понимать Option, Either, Task и классы типов, например функтор и монаду.",
          en: "Who works with you on the team and how many of you there are. For teams of any size who write TypeScript and use functional programming professionally: you need to understand Option, Either, Task and type classes such as functor and monad.",
        },
        {
          ru: "Качество продукта. Качество продукта, как правило, высокое: отсутствие значения и ошибки видны в типах Option и Either, и компилятор напоминает обработать оба случая.",
          en: "Product quality. The product quality is, as a rule, high: a missing value and errors show up in the Option and Either types, and the compiler reminds you to handle both cases.",
        },
        {
          ru: "Перфоманс. Будет ниже ванилы при аналогичном коде: значения заворачиваются в Option и Either, а шаги pipe — это дополнительные вызовы функций. Модули подключаются по отдельности (fp-ts/Option, fp-ts/Either), всю библиотеку тянуть не нужно.",
          en: "Performance. It will be lower than vanilla given equivalent code: values are wrapped in Option and Either, and the steps of pipe are extra function calls. Modules are imported one by one (fp-ts/Option, fp-ts/Either), so there is no need to pull in the whole library.",
        },
        {
          ru: "Парадигма функционального программирования. Полноценное и строгое типизированное функциональное программирование по образцу Haskell, PureScript и Scala: классы типов и эмуляция типов высших родов (higher-kinded types), которые TypeScript сам не поддерживает. Высокий порог входа. Проект fp-ts объявил о слиянии с экосистемой Effect, а его автор, Джулио Канти, присоединился к организации Effect. Учтите, что последний релиз fp-ts, 2.16.11, вышел 18 августа 2025 года (по данным реестра npm на октябрь 2026 года).",
          en: "The functional programming paradigm. Full-fledged and strict typed functional programming modelled on Haskell, PureScript and Scala: type classes and an emulation of higher-kinded types, which TypeScript does not support natively. A high barrier to entry. The fp-ts project has announced that it is merging with the Effect ecosystem, and its author, Giulio Canti, has joined the Effect organization. Keep in mind that the latest fp-ts release, 2.16.11, came out on August 18, 2025 (according to the npm registry as of October 2026).",
        },
      ],
    },
    {
      type: 'heading',
      ru: "Effect",
      en: "Effect",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Бюджет. Подходит для проектов среднего и крупного масштаба, где цена ошибки высока и есть время на обучение команды.",
          en: "Budget. Suitable for medium and large projects where the cost of an error is high and there is time to train the team.",
        },
        {
          ru: "Насколько % проект завершён или он находится в начале. Лучше всего на начальном этапе. В готовый проект Effect можно вводить постепенно: Effect.runPromise возвращает обычный Promise, поэтому новый код уживается со старым.",
          en: "How far along the project is, percentage-wise, or whether it is just at the beginning. Best at the early stage. Effect can be brought into an existing project gradually: Effect.runPromise returns an ordinary Promise, so the new code gets along with the old.",
        },
        {
          ru: "Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, которые пишут на TypeScript и готовы освоить новую модель: тип Effect<A, E, R>, генераторы Effect.gen, сервисы и слои (Layer). Теорию категорий знать не обязательно: код в Effect.gen читается последовательно, почти как async/await.",
          en: "Who works with you on the team and how many of you there are. For teams of any size who write TypeScript and are ready to learn a new model: the Effect<A, E, R> type, Effect.gen generators, services and layers (Layer). Category theory is not required: code inside Effect.gen reads sequentially, much like async/await.",
        },
        {
          ru: "Качество продукта. Качество продукта, как правило, высокое: возможные ошибки и нужные зависимости видны в типе Effect<A, E, R>, а повторы, тайм-ауты, отмена и конкурентность встроены в библиотеку.",
          en: "Product quality. The product quality is, as a rule, high: possible errors and required dependencies show up in the Effect<A, E, R> type, and retries, timeouts, cancellation and concurrency are built into the library.",
        },
        {
          ru: "Перфоманс. Будет ниже ванилы при аналогичном коде: программы выполняет собственный рантайм Effect на файберах. Неиспользуемые модули отсекаются при сборке (tree shaking), а в версии 4 рантайм переписан, чтобы расходовать меньше памяти и работать быстрее.",
          en: "Performance. It will be lower than vanilla given equivalent code: programs are run by Effect's own fiber-based runtime. Unused modules are dropped at build time (tree shaking), and version 4 rewrote the runtime to use less memory and run faster.",
        },
        {
          ru: "Парадигма функционального программирования. Полноценное и строгое типизированное функциональное программирование, нацеленное на продакшен. Эффекты — это значения: Effect только описывает работу и ничего не делает, пока его не запустит рантайм, а возможные ошибки и нужные зависимости записаны в типе Effect<A, E, R>. Кроме того, в библиотеку входят конкурентность на файберах и Schema для проверки данных во время выполнения. Высокий порог входа, но другого рода, чем у fp-ts: осваивать нужно не классы типов, а модель эффектов и большой API. По README fp-ts, Effect можно считать преемником fp-ts v2. Текущая мажорная версия — 4: Effect 4.0.0 вышел 1 октября 2026 года, а ветка 3.x ещё получает исправления (по данным реестра npm на октябрь 2026 года).",
          en: "The functional programming paradigm. Full-fledged and strict typed functional programming aimed at production. Effects are values: an Effect only describes the work and does nothing until the runtime runs it, and possible errors and required dependencies are recorded in the Effect<A, E, R> type. On top of that come fiber-based concurrency and Schema for validating data at runtime. A high barrier to entry, but of a different kind than with fp-ts: you learn the effect model and a large API rather than type classes. According to the fp-ts README, Effect can be regarded as the successor to fp-ts v2. The current major version is 4: Effect 4.0.0 came out on October 1, 2026, and the 3.x line still receives fixes (according to the npm registry as of October 2026).",
        },
      ],
    },
    {
      type: 'text',
      ru: "Можно себе представить приверженность к функциональному программированию.",
      en: "One can picture the degree of commitment to functional programming.",
    },
    {
      type: 'text',
      ru: "Vanilla JS (присутствует) -> Lodash (не полноценное) -> Ramda (полноценное) -> Sanctuary (полноценное и строгое)",
      en: "Vanilla JS (present) -> Lodash (not full-fledged) -> Ramda (full-fledged) -> Sanctuary (full-fledged and strict)",
    },
    {
      type: 'text',
      ru: "В TypeScript рядом с ними стоят fp-ts (полноценное и строгое, на классах типов) и Effect (полноценное и строгое, с эффектами и ошибками в типах).",
      en: "In TypeScript they are joined by fp-ts (full-fledged and strict, built on type classes) and Effect (full-fledged and strict, with effects and errors in the types).",
    },
    {
      type: 'table',
      caption: { ru: "Сравнительная таблица", en: "Comparison table" },
      columns: [
        { ru: "Критерий", en: "Criterion" },
        { ru: "Vanilla JS", en: "Vanilla JS" },
        { ru: "Lodash", en: "Lodash" },
        { ru: "Ramda", en: "Ramda" },
        { ru: "Sanctuary", en: "Sanctuary" },
        { ru: "fp-ts", en: "fp-ts" },
        { ru: "Effect", en: "Effect" },
      ],
      rows: [
        [
          { ru: "Бюджет", en: "Budget" },
          { ru: "Малый / Средний", en: "Small / Medium" },
          { ru: "Любой", en: "Any" },
          { ru: "Любой", en: "Any" },
          { ru: "Средний / Высокий", en: "Medium / High" },
          { ru: "Средний / Высокий", en: "Medium / High" },
          { ru: "Средний / Высокий", en: "Medium / High" },
        ],
        [
          { ru: "Этап проекта", en: "Project stage" },
          { ru: "Любой", en: "Any" },
          { ru: "Начальный", en: "Early" },
          { ru: "Любой", en: "Any" },
          { ru: "Начальный", en: "Early" },
          { ru: "Если fp-ts уже в проекте", en: "If fp-ts is already in use" },
          { ru: "Начальный или любой (постепенно)", en: "Early, or any (gradually)" },
        ],
        [
          { ru: "Размер команды", en: "Team size" },
          { ru: "Малая", en: "Small" },
          { ru: "Любая", en: "Any" },
          { ru: "Любая", en: "Any" },
          { ru: "Любая (профи)", en: "Any (pros)" },
          { ru: "Любая (профи, TS)", en: "Any (pros, TS)" },
          { ru: "Любая (TS)", en: "Any (TS)" },
        ],
        [
          { ru: "Качество", en: "Quality" },
          { ru: "Среднее", en: "Medium" },
          { ru: "Среднее", en: "Medium" },
          { ru: "Высокое", en: "High" },
          { ru: "Высокое", en: "High" },
          { ru: "Высокое", en: "High" },
          { ru: "Высокое", en: "High" },
        ],
        [
          { ru: "Производительность", en: "Performance" },
          { ru: "4 из 5", en: "4 out of 5" },
          { ru: "3 из 5", en: "3 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
        ],
        [
          { ru: "Строгость ФП", en: "FP strictness" },
          { ru: "1 из 5", en: "1 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
          { ru: "3 из 5", en: "3 out of 5" },
          { ru: "4 из 5", en: "4 out of 5" },
          { ru: "4 из 5", en: "4 out of 5" },
          { ru: "4 из 5", en: "4 out of 5" },
        ],
        [
          { ru: "Порог входа", en: "Barrier to entry" },
          { ru: "Низкий", en: "Low" },
          { ru: "Низкий", en: "Low" },
          { ru: "Средний", en: "Medium" },
          { ru: "Высокий", en: "High" },
          { ru: "Высокий", en: "High" },
          { ru: "Высокий", en: "High" },
        ],
        [
          { ru: "Философия", en: "Philosophy" },
          { ru: "Свобода выбора", en: "Freedom of choice" },
          { ru: "Утилитарность", en: "Utility" },
          { ru: "Практичное ФП", en: "Practical FP" },
          { ru: "Академичное ФП", en: "Academic FP" },
          { ru: "ФП в духе Haskell", en: "Haskell-style FP" },
          { ru: "ФП для продакшена", en: "FP for production" },
        ],
      ],
    },
  ],
  summary: [
    {
      ru: "Выбирать библиотеку по принципам «мне нравится», «это модно» и «я главный, я так хочу» — непрофессиональный подход.",
      en: "Choosing a library because \"I like it\", \"it's trendy\" or \"I'm in charge and that's what I want\" is not a professional approach.",
    },
    {
      ru: "Критерии выбора: бюджет, этап проекта, команда и онбординг новых разработчиков, качество продукта, производительность и парадигма функционального программирования.",
      en: "The criteria are the budget, the project stage, the team and the onboarding of new developers, product quality, performance and the functional programming paradigm.",
    },
    {
      ru: "Производительность — не самый важный фактор: просадку чаще даёт ошибка в логике приложения, а не библиотека.",
      en: "Performance is not the most important factor: a slowdown more often comes from a flaw in the application's logic than from a library.",
    },
    {
      ru: "Lodash не совсем функциональна: есть проблемы с иммутабельностью, а функции принимают сначала данные и только потом функцию, что мешает композиции. Эти проблемы снимает модуль lodash/fp: в нём функции каррированы, не мутируют данные и принимают их последним аргументом.",
      en: "Lodash is not entirely functional: there are problems with immutability, and its functions take the data first and only then the function, which gets in the way of composition. The lodash/fp module removes these problems: its functions are curried, do not mutate the data and take it as the last argument.",
    },
    {
      ru: "По приверженности к функциональному программированию варианты выстраиваются так: Vanilla JS (присутствует) -> Lodash (не полноценное) -> Ramda (полноценное) -> Sanctuary (полноценное и строгое). В TypeScript к ним добавляются fp-ts и Effect, а README fp-ts предлагает считать Effect преемником fp-ts v2.",
      en: "By commitment to functional programming the options line up like this: Vanilla JS (present) -> Lodash (not full-fledged) -> Ramda (full-fledged) -> Sanctuary (full-fledged and strict). In TypeScript they are joined by fp-ts and Effect, and according to the fp-ts README, Effect can be regarded as the successor to fp-ts v2.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Из списка заказов получите строку с названиями оплаченных заказов дороже 100 — через запятую, в алфавитном порядке. Решите задачу трижды: на Vanilla JS методами массива, на Ramda (R.pipe, R.filter, R.map и другие) и на Sanctuary (S.pipe со списком функций, S.filter, S.map, S.prop, S.sort, S.joinWith). Сравните, как в каждом варианте передаются данные и как собирается композиция.",
        en: "From the list of orders, get a string with the titles of the paid orders over 100, comma-separated and in alphabetical order. Solve it three times: in Vanilla JS with array methods, in Ramda (R.pipe, R.filter, R.map and others) and in Sanctuary (S.pipe with a list of functions, S.filter, S.map, S.prop, S.sort, S.joinWith). Compare how each version passes the data along and how it builds the composition.",
      },
      starter: {
        ru: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// ваш код: withVanilla, withRamda и withSanctuary :: [Object] -> String

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`,
        en: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// your code: withVanilla, withRamda and withSanctuary :: [Object] -> String

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`,
      },
      solution: {
        ru: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// Vanilla JS: цепочка методов, данные — сам массив
// withVanilla :: [Object] -> String
const withVanilla = (list) =>
  list
    .filter((order) => order.paid && order.total > 100)
    .map((order) => order.title)
    .sort()
    .join(', ')

// Ramda: функции каррированы и принимают данные последним аргументом
// withRamda :: [Object] -> String
const withRamda = R.pipe(
  R.filter(R.prop('paid')),
  R.filter(R.pipe(R.prop('total'), R.lt(100))), // R.lt(100)(total) — это 100 < total
  R.map(R.prop('title')),
  R.sortBy(R.identity),
  R.join(', '),
)

// Sanctuary: S.pipe принимает массив функций, данные тоже идут последним аргументом
// withSanctuary :: [Object] -> String
const withSanctuary = S.pipe([
  S.filter(S.prop('paid')),
  S.filter(S.pipe([S.prop('total'), S.gt(100)])), // S.gt(100)(total) — это total > 100
  S.map(S.prop('title')),
  S.sort,
  S.joinWith(', '),
])

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`,
        en: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// Vanilla JS: a chain of methods, the data is the array itself
// withVanilla :: [Object] -> String
const withVanilla = (list) =>
  list
    .filter((order) => order.paid && order.total > 100)
    .map((order) => order.title)
    .sort()
    .join(', ')

// Ramda: functions are curried and take the data as the last argument
// withRamda :: [Object] -> String
const withRamda = R.pipe(
  R.filter(R.prop('paid')),
  R.filter(R.pipe(R.prop('total'), R.lt(100))), // R.lt(100)(total) means 100 < total
  R.map(R.prop('title')),
  R.sortBy(R.identity),
  R.join(', '),
)

// Sanctuary: S.pipe takes an array of functions, the data also comes last
// withSanctuary :: [Object] -> String
const withSanctuary = S.pipe([
  S.filter(S.prop('paid')),
  S.filter(S.pipe([S.prop('total'), S.gt(100)])), // S.gt(100)(total) means total > 100
  S.map(S.prop('title')),
  S.sort,
  S.joinWith(', '),
])

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`,
      },
      expected: {
        ru: "Vanilla JS: keyboard, laptop\nRamda: keyboard, laptop\nSanctuary: keyboard, laptop",
        en: "Vanilla JS: keyboard, laptop\nRamda: keyboard, laptop\nSanctuary: keyboard, laptop",
      },
    },
    {
      task: {
        ru: "Найдите название первого оплаченного заказа дороже заданной суммы, а если такого нет, верните «нет». Сделайте это на Ramda через R.find и на Sanctuary через S.find, S.map и S.fromMaybe, проверьте на суммах 500 и 1000. Затем выведите, что возвращают сами R.find и S.find, когда подходящего заказа нет. Чем ответ Sanctuary надёжнее?",
        en: "Find the title of the first paid order over a given amount, and if there is none, return \"none\". Do it in Ramda with R.find and in Sanctuary with S.find, S.map and S.fromMaybe, and check it with the amounts 500 and 1000. Then print what R.find and S.find themselves return when there is no matching order. Why is the Sanctuary answer more reliable?",
      },
      starter: {
        ru: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// ваш код: titleWithRamda и titleWithSanctuary :: Number -> [Object] -> String

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)`,
        en: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// your code: titleWithRamda and titleWithSanctuary :: Number -> [Object] -> String

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)`,
      },
      solution: {
        ru: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// Ramda: R.find возвращает заказ или undefined, пустоту проверяем сами
// titleWithRamda :: Number -> [Object] -> String
const titleWithRamda = (limit) => R.pipe(
  R.find(isPaidOver(limit)),
  (order) => (order === undefined ? 'нет' : order.title),
)

// Sanctuary: S.find возвращает Maybe — Just (заказ) или Nothing,
// S.map и S.fromMaybe обрабатывают оба случая
// titleWithSanctuary :: Number -> [Object] -> String
const titleWithSanctuary = (limit) => S.pipe([
  S.find(isPaidOver(limit)),
  S.map(S.prop('title')),
  S.fromMaybe('нет'),
])

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)

// заказа дороже 1000 нет: Ramda возвращает undefined, Sanctuary — Nothing
console.log(R.find(isPaidOver(1000))(orders))
console.log(S.find(isPaidOver(1000))(orders))

// undefined легко пропустить: забытая проверка уронит код дальше,
// например на чтении order.title. Maybe прямо говорит, что результата
// может не быть, и S.map и S.fromMaybe обрабатывают оба случая`,
        en: `const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// Ramda: R.find returns the order or undefined, we check for emptiness ourselves
// titleWithRamda :: Number -> [Object] -> String
const titleWithRamda = (limit) => R.pipe(
  R.find(isPaidOver(limit)),
  (order) => (order === undefined ? 'none' : order.title),
)

// Sanctuary: S.find returns a Maybe, either Just (order) or Nothing,
// and S.map and S.fromMaybe handle both cases
// titleWithSanctuary :: Number -> [Object] -> String
const titleWithSanctuary = (limit) => S.pipe([
  S.find(isPaidOver(limit)),
  S.map(S.prop('title')),
  S.fromMaybe('none'),
])

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)

// there is no order over 1000: Ramda returns undefined, Sanctuary returns Nothing
console.log(R.find(isPaidOver(1000))(orders))
console.log(S.find(isPaidOver(1000))(orders))

// undefined is easy to miss: a forgotten check will crash the code later,
// for example when reading order.title. A Maybe states outright that there
// may be no result, and S.map and S.fromMaybe handle both cases`,
      },
      expected: {
        ru: "Ramda, 500: laptop\nRamda, 1000: нет\nSanctuary, 500: laptop\nSanctuary, 1000: нет\nundefined\nNothing",
        en: "Ramda, 500: laptop\nRamda, 1000: none\nSanctuary, 500: laptop\nSanctuary, 1000: none\nundefined\nNothing",
      },
    },
  ],
}

export default lesson
