import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'point-free',
  title: { ru: "Бесточечный стиль", en: "Point-free style" },
  description: {
    ru: "Бесточечный стиль в JavaScript: функции без упоминания аргументов через pipe, compose и каррированные функции Ramda, ловушка map(parseInt) и отладка через tap.",
    en: "Point-free style in JavaScript: functions without named arguments via pipe, compose and curried Ramda functions, the map(parseInt) trap and debugging with tap.",
  },
  goal: {
    ru: "Научиться записывать функции в бесточечном стиле через pipe, compose и каррированные функции, понять, почему ['1', '2', '3'].map(parseInt) даёт [1, NaN, NaN], отлаживать такие конвейеры через tap и видеть, когда явный аргумент читается лучше.",
    en: "Learn to write functions in point-free style with pipe, compose and curried functions, understand why ['1', '2', '3'].map(parseInt) gives [1, NaN, NaN], debug such pipelines with tap, and see when a named argument reads better.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Бесточечный стиль (point-free style, его ещё называют tacit programming) — это способ определить функцию, не упоминая её аргументы. Новая функция собирается из других функций через композицию, каррирование и частичное применение. Вместо «возьми пользователя и верни его имя» мы пишем «это R.prop('name')».",
      en: "Point-free style (also called tacit programming) is a way to define a function without mentioning its arguments. The new function is assembled from other functions through composition, currying and partial application. Instead of \"take a user and return their name\" we write \"this is R.prop('name')\".",
    },
    {
      type: 'text',
      ru: "«Точка» здесь — не символ точки в user.name, а аргумент функции. Термин пришёл из математики: в топологии функции действуют на пространства, которые состоят из точек, и бесточечное определение функции не называет точки, то есть значения, к которым она применяется. Поэтому R.prop('name') — бесточечная запись, хотя символ точки в ней есть.",
      en: "A \"point\" here is not the dot in user.name but a function argument. The term comes from mathematics: in topology, functions act on spaces made of points, and a point-free definition of a function does not name the points, that is, the values it is applied to. So R.prop('name') is point-free even though it contains a dot.",
    },
    {
      type: 'text',
      ru: "Стиль опирается на то, что мы уже умеем: каррированная функция возвращает новую функцию, пока не получит все аргументы, а pipe и compose собирают функции в конвейер. В Ramda функции каррированы и, как правило, принимают данные последним аргументом, поэтому R.filter(isOnline) — уже готовая функция, которая ждёт список.",
      en: "The style relies on what we already know: a curried function returns a new function until it has all of its arguments, and pipe and compose chain functions into a pipeline. In Ramda functions are curried and, as a rule, take the data as their last argument, so R.filter(isOnline) is already a ready-made function waiting for a list.",
    },
    {
      type: 'code',
      code: {
        ru: `// Ramda в песочнице курса доступна как R
const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// === с «точками»: аргументы названы явно ===
// getNameP :: Object -> String
const getNameP = (user) => user.name
// isOnlineP :: Object -> Boolean
const isOnlineP = (user) => user.status === 'online'
// onlineNamesP :: [Object] -> [String]
const onlineNamesP = (list) => list.filter((user) => isOnlineP(user)).map((user) => getNameP(user))

// === без «точек»: функции собраны из других функций ===
// getName :: Object -> String
const getName = R.prop('name')
// isOnline :: Object -> Boolean
// в современных версиях Ramda propEq принимает сначала значение, потом ключ,
// в старых порядок был обратным
const isOnline = R.propEq('online', 'status')
// onlineNames :: [Object] -> [String]
const onlineNames = R.pipe(R.filter(isOnline), R.map(getName))
// то же через compose: шаги записаны справа налево
const onlineNamesC = R.compose(R.map(getName), R.filter(isOnline))

console.log(onlineNamesP(users).join(', ')) // John, Angel
console.log(onlineNames(users).join(', ')) // John, Angel
console.log(onlineNamesC(users).join(', ')) // John, Angel

// === свои каррированные функции работают так же ===
// add :: Number -> Number -> Number
const add = (a) => (b) => a + b
// с точкой: обёртка только передаёт n дальше
// incP :: Number -> Number
const incP = (n) => add(1)(n)
// без точки: add(1) уже функция, которая ждёт второе число
// inc :: Number -> Number
const inc = add(1)

console.log(incP(41)) // 42
console.log(inc(41)) // 42`,
        en: `// the course playground exposes Ramda as R
const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// === with "points": the arguments are named explicitly ===
// getNameP :: Object -> String
const getNameP = (user) => user.name
// isOnlineP :: Object -> Boolean
const isOnlineP = (user) => user.status === 'online'
// onlineNamesP :: [Object] -> [String]
const onlineNamesP = (list) => list.filter((user) => isOnlineP(user)).map((user) => getNameP(user))

// === without "points": functions assembled from other functions ===
// getName :: Object -> String
const getName = R.prop('name')
// isOnline :: Object -> Boolean
// in current versions of Ramda propEq takes the value first and then the key,
// older versions had the opposite order
const isOnline = R.propEq('online', 'status')
// onlineNames :: [Object] -> [String]
const onlineNames = R.pipe(R.filter(isOnline), R.map(getName))
// the same with compose: the steps are written right to left
const onlineNamesC = R.compose(R.map(getName), R.filter(isOnline))

console.log(onlineNamesP(users).join(', ')) // John, Angel
console.log(onlineNames(users).join(', ')) // John, Angel
console.log(onlineNamesC(users).join(', ')) // John, Angel

// === your own curried functions work the same way ===
// add :: Number -> Number -> Number
const add = (a) => (b) => a + b
// with a point: the wrapper only passes n along
// incP :: Number -> Number
const incP = (n) => add(1)(n)
// without a point: add(1) is already a function waiting for the second number
// inc :: Number -> Number
const inc = add(1)

console.log(incP(41)) // 42
console.log(inc(41)) // 42`,
      },
    },
    {
      type: 'text',
      ru: "Простейший переход к бесточечной записи — убрать обёртку: (x) => f(x) делает то же, что сама f. В этом и главная ловушка стиля. Обёртка передаёт в f ровно один аргумент, а f без обёртки получает всё, что передаст вызывающий код.",
      en: "The simplest step towards point-free code is dropping a wrapper: (x) => f(x) does the same as f itself. That is also the main trap of the style. The wrapper passes exactly one argument to f, while f without the wrapper receives everything the calling code passes.",
    },
    {
      type: 'heading',
      ru: "Ловушка: лишние аргументы",
      en: "The trap: extra arguments",
    },
    {
      type: 'text',
      ru: "Array.prototype.map вызывает колбэк с тремя аргументами: элементом, его индексом и всем массивом. parseInt принимает два: строку и основание системы счисления. Поэтому ['1', '2', '3'].map(parseInt) на деле вызывает parseInt('1', 0), parseInt('2', 1) и parseInt('3', 2) и возвращает [1, NaN, NaN].",
      en: "Array.prototype.map calls its callback with three arguments: the element, its index and the whole array. parseInt takes two: a string and a radix. So ['1', '2', '3'].map(parseInt) actually calls parseInt('1', 0), parseInt('2', 1) and parseInt('3', 2), and returns [1, NaN, NaN].",
    },
    {
      type: 'code',
      code: {
        ru: `// map передаёт колбэку элемент, индекс и массив,
// а второй параметр parseInt — основание системы счисления
console.log(['1', '2', '3'].map(parseInt)) // [1, NaN, NaN]

// что на самом деле вызывается
// основание 0 значит «не задано»: строка без префикса 0x читается как десятичное число
console.log(parseInt('1', 0)) // 1
// основание 1 недопустимо: parseInt принимает основания от 2 до 36
console.log(parseInt('2', 1)) // NaN
// в двоичной записи нет цифры 3
console.log(parseInt('3', 2)) // NaN

// === как исправить ===
// Number использует только первый аргумент
// он строже parseInt: Number('12px') — NaN, а parseInt('12px', 10) — 12
console.log(['1', '2', '3'].map(Number)) // [1, 2, 3]
// вернуть «точку» и указать основание явно
console.log(['1', '2', '3'].map((str) => parseInt(str, 10))) // [1, 2, 3]
// R.map передаёт колбэку только элемент
console.log(R.map(parseInt, ['1', '2', '3'])) // [1, 2, 3]
// R.unary оставляет функции один аргумент, остальные отбрасывает
console.log(['1', '2', '3'].map(R.unary(parseInt))) // [1, 2, 3]`,
        en: `// map passes the element, the index and the array to its callback,
// and the second parameter of parseInt is the radix
console.log(['1', '2', '3'].map(parseInt)) // [1, NaN, NaN]

// what is actually called
// radix 0 means "not set": a string without the 0x prefix is read as a decimal number
console.log(parseInt('1', 0)) // 1
// radix 1 is invalid: parseInt accepts radixes from 2 to 36
console.log(parseInt('2', 1)) // NaN
// there is no digit 3 in binary
console.log(parseInt('3', 2)) // NaN

// === how to fix it ===
// Number uses only its first argument
// it is stricter than parseInt: Number('12px') is NaN, while parseInt('12px', 10) is 12
console.log(['1', '2', '3'].map(Number)) // [1, 2, 3]
// bring the "point" back and pass the radix explicitly
console.log(['1', '2', '3'].map((str) => parseInt(str, 10))) // [1, 2, 3]
// R.map passes only the element to its callback
console.log(R.map(parseInt, ['1', '2', '3'])) // [1, 2, 3]
// R.unary keeps one argument of a function and drops the rest
console.log(['1', '2', '3'].map(R.unary(parseInt))) // [1, 2, 3]`,
      },
    },
    {
      type: 'text',
      ru: "Так же ведут себя forEach, filter и другие методы массивов. С методами объектов ловушка другая: arr.map(obj.method) вызовет метод без объекта, и this внутри него будет не тем. Есть и отложенный вариант: если функция, которую передают в map без обёртки, позже получит необязательный второй параметр, в него молча начнёт приходить индекс.",
      en: "forEach, filter and other array methods behave the same way. With object methods the trap is different: arr.map(obj.method) calls the method without its object, and this inside it will be wrong. There is also a delayed version: if a function passed to map without a wrapper later gains an optional second parameter, the index will silently start arriving in it.",
    },
    {
      type: 'heading',
      ru: "Читаемость и отладка",
      en: "Readability and debugging",
    },
    {
      type: 'text',
      ru: "Бесточечная запись короче, но не всегда понятнее: чтобы её прочитать, нужно помнить сигнатуру каждой функции. R.lte(18) — это функция age => 18 <= age, а R.gt(18) — age => 18 > age. Поэтому R.filter(R.gt(18)) оставляет тех, кто младше 18, хотя читается как «больше 18».",
      en: "Point-free code is shorter but not always clearer: to read it you have to remember the signature of every function. R.lte(18) is the function age => 18 <= age, and R.gt(18) is age => 18 > age. So R.filter(R.gt(18)) keeps those younger than 18, even though it reads as \"greater than 18\".",
    },
    {
      type: 'code',
      code: {
        ru: `const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// бесточечно: нужно знать, что R.lte(18) — это age => 18 <= age
// isAdultOnline :: Object -> Boolean
const isAdultOnline = R.both(R.propSatisfies(R.lte(18), 'age'), R.propEq('online', 'status'))

// с точкой: условие видно сразу
// isAdultOnlineP :: Object -> Boolean
const isAdultOnlineP = (user) => user.age >= 18 && user.status === 'online'

console.log(users.filter(isAdultOnline).length) // 1
console.log(users.filter(isAdultOnlineP).length) // 1

// R.gt(18) читается как «больше 18», а означает age => 18 > age
// ages :: [Number]
const ages = [10, 18, 20, 30]
console.log(R.filter(R.gt(18), ages).join(', ')) // 10
// с явным аргументом не ошибёшься
console.log(ages.filter((age) => age > 18).join(', ')) // 20, 30`,
        en: `const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// point-free: you need to know that R.lte(18) is age => 18 <= age
// isAdultOnline :: Object -> Boolean
const isAdultOnline = R.both(R.propSatisfies(R.lte(18), 'age'), R.propEq('online', 'status'))

// with a point: the condition is visible at once
// isAdultOnlineP :: Object -> Boolean
const isAdultOnlineP = (user) => user.age >= 18 && user.status === 'online'

console.log(users.filter(isAdultOnline).length) // 1
console.log(users.filter(isAdultOnlineP).length) // 1

// R.gt(18) reads as "greater than 18", but it means age => 18 > age
// ages :: [Number]
const ages = [10, 18, 20, 30]
console.log(R.filter(R.gt(18), ages).join(', ')) // 10
// with a named argument you can't get it wrong
console.log(ages.filter((age) => age > 18).join(', ')) // 20, 30`,
      },
    },
    {
      type: 'text',
      ru: "Вторая цена — отладка. У бесточечной функции нет тела, в него не поставить точку останова или console.log. Сам console.log в конвейер вставлять нельзя: он возвращает undefined, и следующий шаг получит его вместо данных. Выручает tap: она вызывает переданную функцию ради побочного эффекта и возвращает аргумент без изменений. Подробнее о ней — в уроке «Side effects (побочные эффекты) в композиции функций», а в Ramda есть готовая R.tap.",
      en: "The second cost is debugging. A point-free function has no body to put a breakpoint or a console.log in. You can't put console.log itself into the pipeline either: it returns undefined, and the next step receives that instead of the data. tap helps here: it calls the given function for its side effect and returns the argument unchanged. There is more about it in the \"Side effects in function composition\" lesson, and Ramda has a ready-made R.tap.",
    },
    {
      type: 'code',
      code: {
        ru: `const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// tap :: (a -> *) -> a -> a
// вызывает fn ради побочного эффекта и возвращает x без изменений
const tap = (fn) => (x) => {
  fn(x)
  return x
}

// log :: String -> a -> a
const log = (label) => tap((value) => console.log(label + ': ' + JSON.stringify(value)))

// onlineNames :: [Object] -> String
const onlineNames = R.pipe(
  R.filter(R.propEq('online', 'status')),
  log('после filter'), // печатает промежуточный результат
  R.map(R.prop('name')),
  log('после map'),
  R.join(', '),
)

console.log(onlineNames(users))
// после filter: [{"name":"John","status":"online","age":25},{"name":"Angel","status":"online","age":16}]
// после map: ["John","Angel"]
// John, Angel`,
        en: `const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// tap :: (a -> *) -> a -> a
// calls fn for its side effect and returns x unchanged
const tap = (fn) => (x) => {
  fn(x)
  return x
}

// log :: String -> a -> a
const log = (label) => tap((value) => console.log(label + ': ' + JSON.stringify(value)))

// onlineNames :: [Object] -> String
const onlineNames = R.pipe(
  R.filter(R.propEq('online', 'status')),
  log('after filter'), // prints the intermediate result
  R.map(R.prop('name')),
  log('after map'),
  R.join(', '),
)

console.log(onlineNames(users))
// after filter: [{"name":"John","status":"online","age":25},{"name":"Angel","status":"online","age":16}]
// after map: ["John","Angel"]
// John, Angel`,
      },
    },
    {
      type: 'heading',
      ru: "Когда стиль не нужен",
      en: "When not to use it",
    },
    {
      type: 'text',
      ru: "Бесточечный стиль — инструмент, а не цель. Он хорош там, где конвейер читается как перечень шагов: «оставить тех, кто в сети, взять имена». Явный аргумент лучше в таких случаях:",
      en: "Point-free style is a tool, not a goal. It works well where a pipeline reads as a list of steps: \"keep those who are online, take their names\". A named argument is better in these cases:",
    },
    {
      type: 'list',
      ordered: false,
      items: [
        {
          ru: "аргумент нужен в нескольких местах: (user) => user.firstName + ' ' + user.lastName проще, чем та же функция через R.converge;",
          en: "the argument is needed in several places: (user) => user.firstName + ' ' + user.lastName is simpler than the same function built with R.converge;",
        },
        {
          ru: "для бесточечной записи приходится переставлять аргументы через R.flip или заполнитель R.__;",
          en: "a point-free version requires reordering arguments with R.flip or the R.__ placeholder;",
        },
        {
          ru: "функция, которую вы передаёте без обёртки, принимает необязательные параметры или зависит от this, как parseInt и методы объектов;",
          en: "the function you pass without a wrapper takes optional parameters or depends on this, like parseInt and object methods;",
        },
        {
          ru: "имя аргумента объясняет читателю, с какими данными работает функция.",
          en: "the argument's name tells the reader what data the function works with.",
        },
      ],
    },
    {
      type: 'text',
      ru: "Практическое правило: собирайте конвейер из готовых функций без «точек», а если для этого понадобились flip, converge или заполнители, назовите аргумент.",
      en: "A practical rule: build a pipeline out of ready-made functions without \"points\", and if that takes flip, converge or placeholders, name the argument.",
    },
  ],
  summary: [
    {
      ru: "Бесточечный стиль определяет функцию без упоминания её аргументов: она собирается из других функций через композицию и каррирование, например R.pipe(R.filter(isOnline), R.map(R.prop('name'))).",
      en: "Point-free style defines a function without mentioning its arguments: it is assembled from other functions through composition and currying, for example R.pipe(R.filter(isOnline), R.map(R.prop('name'))).",
    },
    {
      ru: "Обёртку (x) => f(x) можно заменить на f, только если f не примет лишних аргументов: ['1', '2', '3'].map(parseInt) даёт [1, NaN, NaN], потому что map передаёт ещё индекс и массив.",
      en: "The wrapper (x) => f(x) can be replaced with f only if f won't take extra arguments: ['1', '2', '3'].map(parseInt) gives [1, NaN, NaN] because map also passes the index and the array.",
    },
    {
      ru: "Ловушку обходят через Number, явную стрелку с основанием, R.map, который передаёт только элемент, или R.unary.",
      en: "The trap is avoided with Number, an explicit arrow function with a radix, R.map, which passes only the element, or R.unary.",
    },
    {
      ru: "Бесточечный конвейер отлаживают через tap: она выполняет побочный эффект и возвращает аргумент без изменений.",
      en: "A point-free pipeline is debugged with tap: it performs a side effect and returns the argument unchanged.",
    },
    {
      ru: "Если для бесточечной записи нужны flip, converge или заполнители либо имя аргумента что-то объясняет, явный аргумент читается лучше.",
      en: "If a point-free version needs flip, converge or placeholders, or the argument's name explains something, a named argument reads better.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Перепишите функции getTitleP, isInStockP, toUpperP и availableTitlesP в бесточечном стиле: getTitle, isInStock, toUpper и availableTitles не должны упоминать свои аргументы. Пригодятся R.prop, R.propEq (сначала значение, потом ключ), R.toUpper, R.filter, R.map и R.pipe. Выведите результат обеих версий и убедитесь, что он совпадает.",
        en: "Rewrite getTitleP, isInStockP, toUpperP and availableTitlesP in point-free style: getTitle, isInStock, toUpper and availableTitles must not mention their arguments. R.prop, R.propEq (value first, then key), R.toUpper, R.filter, R.map and R.pipe will come in handy. Print the result of both versions and make sure it is the same.",
      },
      starter: {
        ru: `const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// версии с «точками»
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// ваш код: getTitle, isInStock, toUpper, availableTitles

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`,
        en: `const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// versions with "points"
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// your code: getTitle, isInStock, toUpper, availableTitles

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`,
      },
      solution: {
        ru: `const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// версии с «точками»
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// getTitle :: Object -> String
const getTitle = R.prop('title')
// isInStock :: Object -> Boolean
const isInStock = R.propEq(true, 'inStock')
// метод строки без обёртки не передать: у Ramda есть функция-аналог
// toUpper :: String -> String
const toUpper = R.toUpper
// availableTitles :: [Object] -> [String]
// для каждого товара два шага подряд — это тоже конвейер
const availableTitles = R.pipe(R.filter(isInStock), R.map(R.pipe(getTitle, toUpper)))

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`,
        en: `const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// versions with "points"
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// getTitle :: Object -> String
const getTitle = R.prop('title')
// isInStock :: Object -> Boolean
const isInStock = R.propEq(true, 'inStock')
// a string method can't be passed without a wrapper: Ramda has a matching function
// toUpper :: String -> String
const toUpper = R.toUpper
// availableTitles :: [Object] -> [String]
// two steps in a row for each product are a pipeline too
const availableTitles = R.pipe(R.filter(isInStock), R.map(R.pipe(getTitle, toUpper)))

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`,
      },
      expected: {
        ru: "BOOK, LAMP, MUG\nBOOK, LAMP, MUG",
        en: "BOOK, LAMP, MUG\nBOOK, LAMP, MUG",
      },
    },
    {
      task: {
        ru: "Функция sumCsv должна складывать числа из строки '10,20,30' и печатать 60, а печатает NaN. В заготовке есть tap и логгер log. Соберите отладочную версию sumCsvDebug: тот же конвейер с log после каждого шага. Найдите шаг, на котором портятся данные, объясните причину и исправьте sumCsv так, чтобы она осталась бесточечной. Выведите результат sumCsvDebug('10,20,30'), затем исправленной sumCsv.",
        en: "sumCsv should add up the numbers in the string '10,20,30' and print 60, but it prints NaN. The starter has tap and a log helper. Build a debug version sumCsvDebug: the same pipeline with log after each step. Find the step where the data goes wrong, explain why, and fix sumCsv so that it stays point-free. Print the result of sumCsvDebug('10,20,30'), then that of the fixed sumCsv.",
      },
      starter: {
        ru: `// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString показывает NaN, а JSON.stringify превратил бы его в null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map в духе урока «Каррирование»: передаёт fn в метод массива как есть
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(parseInt), sum)

// ваш код: sumCsvDebug и исправленная sumCsv

console.log(sumCsv('10,20,30'))`,
        en: `// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString shows NaN, while JSON.stringify would turn it into null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map in the spirit of the "Currying" lesson: passes fn to the array method as is
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(parseInt), sum)

// your code: sumCsvDebug and the fixed sumCsv

console.log(sumCsv('10,20,30'))`,
      },
      solution: {
        ru: `// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString показывает NaN, а JSON.stringify превратил бы его в null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map в духе урока «Каррирование»: передаёт fn в метод массива как есть
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// отладочная версия: тот же конвейер, после каждого шага log
const sumCsvDebug = R.pipe(split(','), log('split'), map(parseInt), log('map'), sum)
console.log(sumCsvDebug('10,20,30'))

// после map данные испорчены: метод массива передаёт parseInt ещё и индекс,
// он становится основанием: parseInt('20', 1) и parseInt('30', 2) дают NaN
// Number использует только первый аргумент, и конвейер остаётся бесточечным
// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(Number), sum)

console.log(sumCsv('10,20,30'))`,
        en: `// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString shows NaN, while JSON.stringify would turn it into null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map in the spirit of the "Currying" lesson: passes fn to the array method as is
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// the debug version: the same pipeline with log after each step
const sumCsvDebug = R.pipe(split(','), log('split'), map(parseInt), log('map'), sum)
console.log(sumCsvDebug('10,20,30'))

// the data breaks after map: the array method also passes the index to parseInt,
// and it becomes the radix: parseInt('20', 1) and parseInt('30', 2) give NaN
// Number uses only its first argument, and the pipeline stays point-free
// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(Number), sum)

console.log(sumCsv('10,20,30'))`,
      },
      expected: {
        ru: "split: [\"10\", \"20\", \"30\"]\nmap: [10, NaN, NaN]\nNaN\n60",
        en: "split: [\"10\", \"20\", \"30\"]\nmap: [10, NaN, NaN]\nNaN\n60",
      },
    },
  ],
}

export default lesson
