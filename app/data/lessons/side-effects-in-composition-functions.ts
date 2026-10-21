import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'side-effects-in-composition-functions',
  title: {
    ru: "Side effects (побочные эффекты) в композиции функций",
    en: "Side effects in function composition",
  },
  blocks: [
    {
      type: 'text',
      ru: "Исходя из принципов функционального программирования можно подумать, что создавать побочные эффекты в композиции функций нельзя. Но на самом деле любая программа и в особенности веб разработка в любом случае создаст какой-нибудь побочный эффект (операции с DOM, операции ввода и вывода, логирование и тому подобное ...).",
      en: "Based on the principles of functional programming, one might think that creating side effects within function composition is forbidden. But in reality, any program, and especially web development, will create some side effect no matter what (DOM operations, input/output operations, logging, and so on ...).",
    },
    {
      type: 'text',
      ru: "В реальных кейсах побочные эффекты в композиции функций нам могут пригодиться в основном в двух ситуациях:",
      en: "In real-world cases, side effects within function composition can be useful to us mainly in two situations:",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Отладка композиции и её логирование, в случае ошибок или вообще, чтобы понимать поток выполнения и изменения входных данных в композиции функции.",
          en: "Debugging the composition and logging it, in case of errors or simply to understand the execution flow and how the input data changes within the function composition.",
        },
        {
          ru: "Создание побочного эффекта в рамках программы согласно её логике и продолжение выполнения композиции функций.",
          en: "Creating a side effect within the program according to its logic and continuing the execution of the function composition.",
        },
      ],
    },
    {
      type: 'text',
      ru: "Попробуем с вами проверить промежуточные результаты в композиции функций, создав побочный эффект в виде лога данных.",
      en: "Let's try to inspect the intermediate results within a function composition by creating a side effect in the form of logging the data.",
    },
    {
      type: 'code',
      code: {
        ru: `// Программа, которая берет деньги
// пользователя и сравнивает с ценой товара
// сообщает хватает ли ему денег на покупку товара
// ===============================
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) =>
                              fns
                                .reduce((init, fn) => fn(init), data)

// пользователь тестовый с 10 000$
const dataUser = {
  name: 'John',
  money: 10000,
}

// товар с ценой 8 000$
const product = {
  name: 'car',
  model: 'toyota',
  price: 8000
}

// prop :: String -> Record -> a
const prop = (prop) => (data) => data[prop]

// lte :: Number -> Number -> Boolean
const lte = (a) => (b) => a <= b

const pipeline = pipe(
  prop ('money'), // получаем деньги пользователя
  lte (prop ('price') (product)), // проверяем, что цена товара не больше денег пользователя
  (success) => success ? 'the product can be purchased' : "you don't have enough money"
  // сообщаем может ли купить товар или не хватает денег
)

// запускаем композицию
const resultMsg = pipeline (dataUser)

console.log(resultMsg) // the product can be purchased`,
        en: `// A program that takes the user's money,
// compares it with the product price
// and reports whether the user can afford the product
// ===============================
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) =>
                              fns
                                .reduce((init, fn) => fn(init), data)

// a test user with $10,000
const dataUser = {
  name: 'John',
  money: 10000,
}

// a product priced at $8,000
const product = {
  name: 'car',
  model: 'toyota',
  price: 8000
}

// prop :: String -> Record -> a
const prop = (prop) => (data) => data[prop]

// lte :: Number -> Number -> Boolean
const lte = (a) => (b) => a <= b

const pipeline = pipe(
  prop ('money'), // get the user's money
  lte (prop ('price') (product)), // check that the product price is not greater than the user's money
  (success) => success ? 'the product can be purchased' : "you don't have enough money"
  // report whether the user can buy the product or lacks the money
)

// run the composition
const resultMsg = pipeline (dataUser)

console.log(resultMsg) // the product can be purchased`,
      },
    },
    {
      type: 'text',
      ru: "Но как же нам получить результаты вызовов каждой функции в pipeline (prop ('money') ...), если даже не будет ошибок в композиции, мы просто хотим отладить код.",
      en: "But how do we obtain the results of each function call in pipeline (prop ('money') ...), if there won't even be any errors in the composition and we simply want to debug the code.",
    },
    {
      type: 'text',
      ru: "Давайте напишем универсальную утилиту для любого кейса в цепочке вызовов композиции.",
      en: "Let's write a universal utility for any case in the chain of composition calls.",
    },
    {
      type: 'code',
      noRun: 'previous-block',
      code: {
        ru: `// Утилита которая вызовет функцию в аргументе
// и прокинет аргумент дальше по композиции
// ===============================
// tapD :: (a -> *) -> a -> a
const tapD = (fn) => (arg) => {

  // делаем проверку
  // действительно ли первый аргумент функция
  if (typeof fn === 'function') {
    // вызываем функцию с аргументом
    fn (arg)
  }

  // не забываем дальше прокинуть аргумент
  // для вызова в композиции функций
  return arg
}

// можно сократить в одну строку
// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn (arg), arg)

// а теперь давайте подготовим утилиту
// для логирования данных
// после каждого вызова в композиции

// стандартный вывод в консоль
const log = console.log

// создаем логгер
const logger = tap (log)

// вводим логгер в цепочку вызовов функций
// сразу запустим цепочку
pipe(
  prop ('money'),
  logger, // 10000
  lte (prop ('price') (product)),
  logger, // true
  (success) => success ? 'the product can be purchased' : "you don't have enough money",
  logger, // 'the product can be purchased'
) (dataUser)`,
        en: `// A utility that calls the function it was given
// and passes the argument further down the composition
// ===============================
// tapD :: (a -> *) -> a -> a
const tapD = (fn) => (arg) => {

  // check that the first argument
  // really is a function
  if (typeof fn === 'function') {
    // call the function with the argument
    fn (arg)
  }

  // don't forget to pass the argument on
  // to the next call in the composition
  return arg
}

// it can be shortened to one line
// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn (arg), arg)

// now let's prepare a utility
// that logs the data
// after each call in the composition

// standard console output
const log = console.log

// create the logger
const logger = tap (log)

// put the logger into the chain of function calls
// and run the chain right away
pipe(
  prop ('money'),
  logger, // 10000
  lte (prop ('price') (product)),
  logger, // true
  (success) => success ? 'the product can be purchased' : "you don't have enough money",
  logger, // 'the product can be purchased'
) (dataUser)`,
      },
    },
  ],
}

export default lesson
