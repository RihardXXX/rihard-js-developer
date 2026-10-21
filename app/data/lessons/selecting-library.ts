import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'selecting-library',
  title: {
    ru: "Vanilla JS, Lodash, Ramda, Sanctuary -> что выбрать",
    en: "Vanilla JS, Lodash, Ramda, Sanctuary -> which one to choose",
  },
  blocks: [
    {
      type: 'text',
      ru: "Когда перед вами стоит выбор, что выбрать из выше описанных библиотек или ванильного решения, не стоит опираться на следующие принципы, которые я часто встречал в своей практике при коммерческой разработке. Не стоит придерживаться следующего:",
      en: "When you face the choice of which of the libraries described above, or a vanilla solution, to pick, you should not rely on the following principles, which I have often encountered in my own commercial development practice. You should not stick to the following:",
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
          ru: "Кто работает с тобой в команде и сколько вас человек. Для малых команд с глубокими знаниями в JS. Порой это будет эффективнее, чем большие команды с поверхностными знаниями в JS, которые рассчитывают, что TypeScript сам защитит их от ошибок.",
          en: "Who works with you on the team and how many of you there are. For small teams with deep knowledge of JS. At times this will be more effective than large teams with shallow knowledge of JS who count on TypeScript alone to protect them from errors.",
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
      ru: "Можно себе представить приверженность к функциональному программированию.",
      en: "One can picture the degree of commitment to functional programming.",
    },
    {
      type: 'text',
      ru: "Vanilla JS (присутствует) -> Lodash (не полноценное) -> Ramda (полноценное) -> Sanctuary (полноценное и строгое)",
      en: "Vanilla JS (present) -> Lodash (not full-fledged) -> Ramda (full-fledged) -> Sanctuary (full-fledged and strict)",
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
      ],
      rows: [
        [
          { ru: "Бюджет", en: "Budget" },
          { ru: "Малый / Средний", en: "Small / Medium" },
          { ru: "Любой", en: "Any" },
          { ru: "Любой", en: "Any" },
          { ru: "Средний / Высокий", en: "Medium / High" },
        ],
        [
          { ru: "Этап проекта", en: "Project stage" },
          { ru: "Любой", en: "Any" },
          { ru: "Начальный", en: "Early" },
          { ru: "Любой", en: "Any" },
          { ru: "Начальный", en: "Early" },
        ],
        [
          { ru: "Размер команды", en: "Team size" },
          { ru: "Малая", en: "Small" },
          { ru: "Любая", en: "Any" },
          { ru: "Любая", en: "Any" },
          { ru: "Любая (профи)", en: "Any (pros)" },
        ],
        [
          { ru: "Качество", en: "Quality" },
          { ru: "Среднее", en: "Medium" },
          { ru: "Среднее", en: "Medium" },
          { ru: "Высокое", en: "High" },
          { ru: "Высокое", en: "High" },
        ],
        [
          { ru: "Производительность", en: "Performance" },
          { ru: "4 из 5", en: "4 out of 5" },
          { ru: "3 из 5", en: "3 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
        ],
        [
          { ru: "Строгость ФП", en: "FP strictness" },
          { ru: "1 из 5", en: "1 out of 5" },
          { ru: "2 из 5", en: "2 out of 5" },
          { ru: "3 из 5", en: "3 out of 5" },
          { ru: "4 из 5", en: "4 out of 5" },
        ],
        [
          { ru: "Порог входа", en: "Barrier to entry" },
          { ru: "Низкий", en: "Low" },
          { ru: "Низкий", en: "Low" },
          { ru: "Средний", en: "Medium" },
          { ru: "Высокий", en: "High" },
        ],
        [
          { ru: "Философия", en: "Philosophy" },
          { ru: "Свобода выбора", en: "Freedom of choice" },
          { ru: "Утилитарность", en: "Utility" },
          { ru: "Практичное ФП", en: "Practical FP" },
          { ru: "Академичное ФП", en: "Academic FP" },
        ],
      ],
    },
  ],
}

export default lesson
