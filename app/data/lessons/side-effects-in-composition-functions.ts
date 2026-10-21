import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'side-effects-in-composition-functions',
  title: {
    ru: "Side effects (побочные эффекты) в композиции функций",
    en: "Side effects in function composition",
  },
  goal: {
    ru: "Научиться добавлять в композицию функций побочные эффекты — логирование для отладки и действия по логике программы — так, чтобы данные шли дальше по цепочке без изменений.",
    en: "Learn to add side effects to a function composition, such as logging for debugging or actions the program logic requires, so that the data keeps flowing down the chain unchanged.",
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
  summary: [
    {
      ru: "Любая программа, и особенно веб-разработка, создаёт побочные эффекты: операции с DOM, ввод и вывод, логирование.",
      en: "Any program, and especially web development, creates side effects: DOM operations, input and output, logging.",
    },
    {
      ru: "В композиции функций побочные эффекты нужны в основном в двух случаях: для отладки и логирования и для действий, которых требует логика программы, после чего композиция продолжает выполняться.",
      en: "In function composition, side effects are needed mainly in two cases: for debugging and logging, and for actions the program logic requires, after which the composition keeps running.",
    },
    {
      ru: "Утилита tap :: (a -> *) -> a -> a вызывает переданную функцию с аргументом и возвращает тот же аргумент, поэтому следующая функция в композиции получает данные без изменений.",
      en: "The tap :: (a -> *) -> a -> a utility calls the given function with the argument and returns that same argument, so the next function in the composition receives the data unchanged.",
    },
    {
      ru: "Логгер tap (console.log), вставленный между шагами pipe, печатает промежуточный результат после каждого вызова.",
      en: "A logger built as tap (console.log) and placed between the steps of pipe prints the intermediate result after each call.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Чтобы отладить конвейер total, в него вставили console.log прямо между шагами, и конвейер сломался: console.log возвращает undefined, и следующий шаг получает его вместо данных. Напишите tap и логгер с подписью tapLog :: String -> a -> a: он печатает строку «подпись: значение» (значение через JSON.stringify) и возвращает аргумент без изменений. Поставьте tapLog после каждого шага total вместо console.log, с подписями «позиции», «сумма» и «со скидкой».",
        en: "To debug the total pipeline, someone put console.log straight between its steps, and the pipeline broke: console.log returns undefined, and the next step receives it instead of the data. Write tap and a labelled logger tapLog :: String -> a -> a that prints the line \"label: value\" (the value via JSON.stringify) and returns its argument unchanged. Put tapLog after each step of total instead of console.log, with the labels \"items\", \"sum\" and \"discounted\".",
      },
      starter: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// корзина: цена и количество каждой позиции
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// ваш код: tap и tapLog

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // стоимость каждой позиции
  console.log, // отладка: печатает, но возвращает undefined
  (sums) => sums.reduce((sum, x) => sum + x, 0), // общая сумма
  (sum) => (sum > 100 ? sum - 10 : sum), // скидка 10, если сумма больше 100
)

console.log(total(cart))`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// the cart: price and quantity of each item
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// your code: tap and tapLog

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // the cost of each item
  console.log, // debugging: prints, but returns undefined
  (sums) => sums.reduce((sum, x) => sum + x, 0), // the total sum
  (sum) => (sum > 100 ? sum - 10 : sum), // a discount of 10 if the sum is over 100
)

console.log(total(cart))`,
      },
      solution: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// корзина: цена и количество каждой позиции
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// логгер с подписью: печатает значение и возвращает его без изменений
// tapLog :: String -> a -> a
const tapLog = (label) => tap((value) => console.log(\`\${label}: \${JSON.stringify(value)}\`))

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // стоимость каждой позиции
  tapLog('позиции'),
  (sums) => sums.reduce((sum, x) => sum + x, 0), // общая сумма
  tapLog('сумма'),
  (sum) => (sum > 100 ? sum - 10 : sum), // скидка 10, если сумма больше 100
  tapLog('со скидкой'),
)

console.log(total(cart))`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// the cart: price and quantity of each item
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// a labelled logger: prints the value and returns it unchanged
// tapLog :: String -> a -> a
const tapLog = (label) => tap((value) => console.log(\`\${label}: \${JSON.stringify(value)}\`))

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // the cost of each item
  tapLog('items'),
  (sums) => sums.reduce((sum, x) => sum + x, 0), // the total sum
  tapLog('sum'),
  (sum) => (sum > 100 ? sum - 10 : sum), // a discount of 10 if the sum is over 100
  tapLog('discounted'),
)

console.log(total(cart))`,
      },
      expected: {
        ru: "позиции: [40,20,50]\nсумма: 110\nсо скидкой: 100\n100",
        en: "items: [40,20,50]\nsum: 110\ndiscounted: 100\n100",
      },
    },
    {
      task: {
        ru: "Второй случай — побочный эффект по логике программы. Напишите tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a: она вызывает функцию-эффект, только если предикат вернул true, и в любом случае возвращает аргумент. С её помощью добавьте в начало конвейера checkout запись имени пользователя в журнал declined, если денег не хватает на товар. Композиция при этом должна дойти до конца и вернуть сообщение.",
        en: "The second case is a side effect the program logic requires. Write tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a: it calls the effect function only if the predicate returned true, and returns the argument in any case. Use it at the start of the checkout pipeline to add the user's name to the declined log when they don't have enough money for the product. The composition must still run to the end and return a message.",
      },
      starter: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// ваш код: tapWhen

// товар
const product = { name: 'car', price: 8000 }

// журнал: кому не хватило денег
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  // ваш код: запись в журнал declined
  (user) => user.money >= product.price, // хватает ли денег
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`не хватило денег: \${declined.join(', ')}\`)`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// your code: tapWhen

// the product
const product = { name: 'car', price: 8000 }

// the log: who didn't have enough money
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  // your code: add to the declined log
  (user) => user.money >= product.price, // is there enough money
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`not enough money: \${declined.join(', ')}\`)`,
      },
      solution: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// эффект срабатывает только по условию, аргумент идёт дальше всегда
// tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a
const tapWhen = (pred) => (fn) => tap((arg) => {
  if (pred(arg)) fn(arg)
})

// товар
const product = { name: 'car', price: 8000 }

// журнал: кому не хватило денег
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  tapWhen((user) => user.money < product.price)((user) => declined.push(user.name)),
  (user) => user.money >= product.price, // хватает ли денег
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`не хватило денег: \${declined.join(', ')}\`)`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// the effect fires only on the condition; the argument always moves on
// tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a
const tapWhen = (pred) => (fn) => tap((arg) => {
  if (pred(arg)) fn(arg)
})

// the product
const product = { name: 'car', price: 8000 }

// the log: who didn't have enough money
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  tapWhen((user) => user.money < product.price)((user) => declined.push(user.name)),
  (user) => user.money >= product.price, // is there enough money
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`not enough money: \${declined.join(', ')}\`)`,
      },
      expected: {
        ru: "the product can be purchased\nyou don't have enough money\nthe product can be purchased\nне хватило денег: Anna",
        en: "the product can be purchased\nyou don't have enough money\nthe product can be purchased\nnot enough money: Anna",
      },
    },
  ],
}

export default lesson
