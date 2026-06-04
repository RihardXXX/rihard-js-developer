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
      type: 'text',
      ru: "1. Мне нравится эта библиотека (хотелки). 2. Это сейчас модно ))) (хотелки). 3. Я главный, я решаю и я так хочу (хотелки). Все выше описанное это не профессиональный подход.",
      en: "1. I like this library (personal wishes). 2. It's trendy right now ))) (personal wishes). 3. I'm in charge, I decide, and that's what I want (personal wishes). Everything described above is not a professional approach.",
    },
    {
      type: 'text',
      ru: "На что следует обратить внимание. Какие критерии важны при выборе:",
      en: "What you should pay attention to. Which criteria matter when choosing:",
    },
    {
      type: 'text',
      ru: "1. Бюджет. Очень важно понять платежеспособность инвестора (клиента) и его планы на будущее. Это очень важный пункт и можно сказать один из основных. 2. Насколько % проект завершён или он находится в начале. Аналогично: если проект написан и все работает корректно, не нужно его переписывать. 3. Кто работает с тобой в команде и сколько вас человек. Нужно понимать процесс онбординга нового разработчика в команду, знаком ли он с данной библиотекой и твоими архитектурными решениями. 4. Качество продукта. Чем выше сложность, тем зачастую качество будет расти. 5. Перфоманс. Это не самый важный фактор, так как зачастую ошибка в логике приложения даст просадку, а не какая-либо библиотека. 6. Парадигма функционального программирования.",
      en: "1. Budget. It is very important to understand the financial capacity of the investor (client) and their plans for the future. This is a very important point and, you could say, one of the main ones. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. Likewise: if the project is already written and everything works correctly, there is no need to rewrite it. 3. Who works with you on the team and how many of you there are. You need to understand the onboarding process for a new developer joining the team, whether they are familiar with this library and with your architectural decisions. 4. Product quality. The higher the complexity, the more the quality tends to grow. 5. Performance. This is not the most important factor, since often it is a flaw in the application's logic that causes a slowdown rather than any particular library. 6. The functional programming paradigm.",
    },
    {
      type: 'text',
      ru: "| Vanilla JS | ----------------",
      en: "| Vanilla JS | ----------------",
    },
    {
      type: 'text',
      ru: "1. Бюджет. Бюджет небольшой или средний. 2. Насколько % проект завершён или он находится в начале. Когда проект уже ранее был начат на JS и вышел за горизонт и финишную прямую. 3. Кто работает с тобой в команде и сколько вас человек. Для малых команд с глубокими знаниями в JS. Порой это будет эффективнее, чем большие команды с поверхностными знаниями в JS, но пишущие якобы без ошибок на TS. 4. Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое. 5. Перфоманс. Будет самый высокий при аналогичном коде относительно библиотек. 6. Парадигма функционального программирования. Полная свобода: процедурный, ООП, ФП и т.п. И каждый как хочет.",
      en: "1. Budget. The budget is small or medium. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. When the project was already started earlier in JS and has passed the horizon and the home stretch. 3. Who works with you on the team and how many of you there are. For small teams with deep knowledge of JS. At times this will be more effective than large teams with shallow knowledge of JS who supposedly write without errors in TS. 4. Product quality. Depends on the team, deadlines, and budget; often not high. 5. Performance. It will be the highest given equivalent code compared to the libraries. 6. The functional programming paradigm. Complete freedom: procedural, OOP, FP, and so on. And everyone does as they please.",
    },
    {
      type: 'text',
      ru: "| Lodash | ----------------",
      en: "| Lodash | ----------------",
    },
    {
      type: 'text',
      ru: "1. Бюджет. Подходит для проектов любого масштаба, но лучше использовать на средних проектах. 2. Насколько % проект завершён или он находится в начале. Только если проект не достиг горизонта, а находится на начальном этапе. 3. Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно знакомых с функциональным программированием, которые хотят упростить рутину. 4. Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое. 5. Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки оптимизирован по размеру. 6. Парадигма функционального программирования. Не совсем функциональна: проблемы с иммутабельностью и передачей аргументов в композиции функций, когда на первом месте функции принимают данные, а потом уже функцию. Для тех, кто только трогает функциональное программирование.",
      en: "1. Budget. Suitable for projects of any scale, but it is best used on medium-sized projects. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. Only if the project has not reached the horizon but is at an early stage. 3. Who works with you on the team and how many of you there are. For teams of any size who are superficially familiar with functional programming and want to simplify their routine. 4. Product quality. Depends on the team, deadlines, and budget; often not high. 5. Performance. It will be lower than vanilla given equivalent code. The library's bundle is optimized for size. 6. The functional programming paradigm. Not entirely functional: there are problems with immutability and with passing arguments in function composition, where the functions take the data first and only then the function. For those who are only just touching functional programming.",
    },
    {
      type: 'text',
      ru: "| Ramda | ----------------",
      en: "| Ramda | ----------------",
    },
    {
      type: 'text',
      ru: "1. Бюджет. Подходит для проектов любого масштаба. 2. Насколько % проект завершён или он находится в начале. На любом этапе, кроме ситуаций, когда проект уже завершается или уже присутствует другая библиотека для работы с данными. 3. Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно или профессионально использующих функциональное программирование, которые хотят упростить рутину. 4. Качество продукта. Качество продукта, как правило, высокое. 5. Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки необходимо оптимизировать, если планируется использование только небольшой части 5-10% функций. 6. Парадигма функционального программирования. Используется полноценное функциональное программирование. Покрывает до 98% кейсов при работе с данными и подойдет для всех проектов. Своя философия в рамках функционального программирования. Проще для новичков в функциональном программировании и задает правильный тон. Нет болячек Lodash.",
      en: "1. Budget. Suitable for projects of any scale. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. At any stage, except for situations when the project is already wrapping up or another data-handling library is already present. 3. Who works with you on the team and how many of you there are. For teams of any size who use functional programming either superficially or professionally and who want to simplify their routine. 4. Product quality. The product quality is, as a rule, high. 5. Performance. It will be lower than vanilla given equivalent code. The library's bundle needs to be optimized if you plan to use only a small part, 5-10%, of its functions. 6. The functional programming paradigm. Full-fledged functional programming is used. It covers up to 98% of cases when working with data and is suitable for all projects. It has its own philosophy within functional programming. It is easier for newcomers to functional programming and sets the right tone. It does not have Lodash's ailments.",
    },
    {
      type: 'text',
      ru: "| Sanctuary | ----------------",
      en: "| Sanctuary | ----------------",
    },
    {
      type: 'text',
      ru: "1. Бюджет. Подходит для масштабных проектов с бюджетом выше среднего. 2. Насколько % проект завершён или он находится в начале. Желательно использовать на начальном этапе. 3. Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, профессионально использующих функциональное программирование и понимающих, что они пишут. 4. Качество продукта. Качество продукта, как правило, высокое. 5. Перфоманс. Будет ниже ванилы при аналогичном коде. 6. Парадигма функционального программирования. Используется полноценное функциональное программирование со своей философией, которая строже придерживается принципов ФП. Полноценное использование монад и прочих абстрактных типов. Высокий порог входа. Для тех, кто действительно в теме функционального программирования. Своя архитектура мышления.",
      en: "1. Budget. Suitable for large-scale projects with an above-average budget. 2. How far along the project is, percentage-wise, or whether it is just at the beginning. It is preferable to use it at the early stage. 3. Who works with you on the team and how many of you there are. For teams of any size who use functional programming professionally and understand what they are writing. 4. Product quality. The product quality is, as a rule, high. 5. Performance. It will be lower than vanilla given equivalent code. 6. The functional programming paradigm. Full-fledged functional programming is used, with its own philosophy that adheres more strictly to FP principles. Full-fledged use of monads and other abstract types. A high barrier to entry. For those who are truly into functional programming. Its own architecture of thinking.",
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
      ru: "Сравнительная таблица. Бюджет: Vanilla JS — Малый / Средний, Lodash — Любой, Ramda — Любой, Sanctuary — Средний / Высокий. Этап проекта: Vanilla JS — Любой, Lodash — Начальный, Ramda — Любой, Sanctuary — Начальный. Размер команды: Vanilla JS — Малая, Lodash — Любая, Ramda — Любая, Sanctuary — Любая (профи). Качество: Vanilla JS — Среднее, Lodash — Среднее, Ramda — Высокое, Sanctuary — Высокое. Производительность: Vanilla JS — 4 из 5, Lodash — 3 из 5, Ramda — 2 из 5, Sanctuary — 2 из 5. Строгость ФП: Vanilla JS — 1 из 5, Lodash — 2 из 5, Ramda — 3 из 5, Sanctuary — 4 из 5. Порог входа: Vanilla JS — Низкий, Lodash — Низкий, Ramda — Средний, Sanctuary — Высокий. Философия: Vanilla JS — Свобода выбора, Lodash — Утилитарность, Ramda — Практичное ФП, Sanctuary — Академичное ФП.",
      en: "Comparison table. Budget: Vanilla JS — Small / Medium, Lodash — Any, Ramda — Any, Sanctuary — Medium / High. Project stage: Vanilla JS — Any, Lodash — Early, Ramda — Any, Sanctuary — Early. Team size: Vanilla JS — Small, Lodash — Any, Ramda — Any, Sanctuary — Any (pros). Quality: Vanilla JS — Medium, Lodash — Medium, Ramda — High, Sanctuary — High. Performance: Vanilla JS — 4 out of 5, Lodash — 3 out of 5, Ramda — 2 out of 5, Sanctuary — 2 out of 5. FP strictness: Vanilla JS — 1 out of 5, Lodash — 2 out of 5, Ramda — 3 out of 5, Sanctuary — 4 out of 5. Barrier to entry: Vanilla JS — Low, Lodash — Low, Ramda — Medium, Sanctuary — High. Philosophy: Vanilla JS — Freedom of choice, Lodash — Utility, Ramda — Practical FP, Sanctuary — Academic FP.",
    },
  ],
}

export default lesson
