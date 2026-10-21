import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'currying',
  title: {
    ru: "Каррирование",
    en: "Currying",
  },
  blocks: [
    {
      type: 'text',
      ru: "Каррирование — это один из приёмов, используемых в функциональном программировании, при котором вычисление функции происходит только при полном получении всех аргументов, а при частичном получении аргументов функция возвращает новую функцию.",
      en: "Currying is one of the techniques used in functional programming, in which the function is evaluated only once all of its arguments have been supplied, while given only some of the arguments the function returns a new function.",
    },
    {
      type: 'text',
      ru: "Каррирование может быть использовано:",
      en: "Currying can be used:",
    },
    {
      type: 'text',
      ru: "1. В композиции функций, когда функция в последовательности вызовов ожидает два и более аргумента.",
      en: "1. In function composition, when a function in a chain of calls expects two or more arguments.",
    },
    {
      type: 'text',
      ru: "2. Когда мы хотим создавать специализированные функции на основе базовой функции, меняя значение аргумента в замыкании.",
      en: "2. When we want to create specialized functions based on a base function by changing the value of an argument captured in a closure.",
    },
    {
      type: 'code',
      code: {
        ru: `//  Пример
// Каррирование
// sum :: Number -> Number -> Number -> Number
const sum  = (a) => (b) => (c) => a + b + c

// функция вычисляется только когда получает все аргументы
// иначе возвращает новую функцию
const result = sum (1) (2) (1)

console.log(result) // 4

// Неполные вызовы каррированной функции

// add :: Number -> Number -> Number
const add = (a) => (b) => a + b

// в замыкании хранится 10 и ждёт второго аргумента
// возвращается функция
const add10 = add(10)
// после получения второго аргумента
// происходит полное вычисление функции
const resultAdded = add10(5) // 15`,
        en: `//  Example
// Currying
// sum :: Number -> Number -> Number -> Number
const sum  = (a) => (b) => (c) => a + b + c

// the function is evaluated only once it has all its arguments,
// otherwise it returns a new function
const result = sum (1) (2) (1)

console.log(result) // 4

// Partial calls of a curried function

// add :: Number -> Number -> Number
const add = (a) => (b) => a + b

// 10 is kept in the closure, waiting for the second argument;
// a function is returned
const add10 = add(10)
// once the second argument arrives,
// the function is fully evaluated
const resultAdded = add10(5) // 15`,
      },
    },
    {
      type: 'text',
      ru: "Как же нам каррировать любую функцию с n количеством параметров, значение которых мы не знаем. Например, 5 параметров и более у функции.",
      en: "So how do we curry an arbitrary function with n parameters whose values we don't know — for example, a function with 5 or more parameters?",
    },
    {
      type: 'text',
      ru: "Можно автоматически каррировать любую функцию с фиксированным числом параметров и передавать ей аргументы любыми группами: по одному или по несколько за вызов. Меняется только группировка, порядок аргументов остаётся прежним.",
      en: "We can automatically curry any function with a fixed number of parameters and pass it the arguments in any grouping: one at a time or several per call. Only the grouping changes; the order of the arguments stays the same.",
    },
    {
      type: 'code',
      code: {
        ru: `// Например мы хотим каррировать функцию sum
// sum :: (Number, Number, Number) -> Number
const sum  = (a, b, c) => a + b + c

// функция которая каррирует любую функцию
// curry :: (* -> a) -> (* -> a)
const curry = (fn) => {
  // количество параметров функции
  const lengthFn = fn.length

  // внутренняя функция, которая будет вызываться рекурсивно
  const curried = (...argsFirst) => {
    // если количество входящих аргументов больше или равно
    // количеству параметров функции, то мы немедленно вызываем её
    if (argsFirst.length >= lengthFn) {
      return fn(...argsFirst)
    }

    // если входящих аргументов меньше, чем количество
    // аргументов у функции то возвращаем новую функцию
    // и собираем остальные аргументы
    return (...argsSecond) => curried(...argsFirst, ...argsSecond)
  }

  return curried
}

// каррируем нашу функцию sum
const sumCurry = curry(sum)

// теперь аргументы можно передавать любыми группами
console.log( sumCurry (1) (1) (1) ) // 3
console.log( sumCurry (1, 1) (1) ) // 3
console.log( sumCurry (1) (1, 1) ) // 3
console.log( sumCurry (1, 1, 1) ) // 3`,
        en: `// Say we want to curry the sum function
// sum :: (Number, Number, Number) -> Number
const sum  = (a, b, c) => a + b + c

// a function that curries any function
// curry :: (* -> a) -> (* -> a)
const curry = (fn) => {
  // number of parameters of the function
  const lengthFn = fn.length

  // inner function that will be called recursively
  const curried = (...argsFirst) => {
    // if the number of incoming arguments is greater than or equal to
    // the number of the function's parameters, call it right away
    if (argsFirst.length >= lengthFn) {
      return fn(...argsFirst)
    }

    // if there are fewer incoming arguments than the function
    // has parameters, return a new function
    // that collects the remaining arguments
    return (...argsSecond) => curried(...argsFirst, ...argsSecond)
  }

  return curried
}

// curry our sum function
const sumCurry = curry(sum)

// now the arguments can be passed in any grouping
console.log( sumCurry (1) (1) (1) ) // 3
console.log( sumCurry (1, 1) (1) ) // 3
console.log( sumCurry (1) (1, 1) ) // 3
console.log( sumCurry (1, 1, 1) ) // 3`,
      },
    },
    {
      type: 'text',
      ru: "А теперь давайте глянем всю мощь каррирования на примерах композиции функций.",
      en: "Now let's look at the full power of currying through examples of function composition.",
    },
    {
      type: 'code',
      code: {
        ru: `// Например в следующей композиции будут
// =====================================
// использоваться две каррированные функции:
// одна каррирована заранее,
// а другую каррируем автоматически перед вызовом

// pipe и curry берём из Ramda: в песочнице курса она доступна как R
const { pipe, curry } = R

// данные с которыми будем работать
// список пользователей
// fetchAllUsers :: * -> Promise a
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// Наша задача
// 1. Получить пользователей со статусом онлайн
// 2. Возрастом старше 30 лет
// 3. их имена

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = (fn) => (arr) => arr.filter(fn)

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)

// функция предикат, которая будет проверять статус
// isStatus :: String -> String -> a -> Boolean
const isStatus = (status) => (prop) => (user) => user[prop] === status

// isMoreAge :: (Number, String, a) -> Boolean
const isMoreAge = (age, prop, user) => user[prop] > age

// давайте используя функцию выше мы автокаррируем её
const isMoreAgeCurry = curry(isMoreAge)

// вызовем дважды и создадим абстракцию с понятным названием
// предикат функция которая будет проверять на возраст
const isMoreAge30 = isMoreAgeCurry (30) ('age')

// получение значений по ключу
// getByProp :: String -> a -> String
const getByProp = (prop) => (user) => user[prop]

//  в замыкании сохраняем ключ 'name' и ожидаем объект
// getName :: a -> String
const getName = getByProp('name')

// готовим композицию и при след вызове в качестве аргумента
// ждем массив пользователей
const pipeline = pipe (
  filter ( isStatus ('online') ('status') ), // только онлайн пользователей получаем
  filter ( isMoreAge30 ), // возрастом старше 30 лет
  map ( getName ), // вернуть имена
)

const showAdultsUsers = async () => {

  // запуск промиса с данными
  // данные бросаем в композицию и запускаем её
  const adultsUsers = await fetchAllUsers()
                                          .then(pipeline)

  console.log(adultsUsers) // ['Angel']
}

showAdultsUsers()


// =============================

// в коде выше все круто описано
// но если пользователей несколько десятков тысяч
// и нам нужна оптимизация мы можем сделать так
// чтобы исключить двойной обход массива в рамках filter
const pipelineOnePass = pipe (
  filter (
    (user) => (
      isStatus ('online') ('status') (user) && isMoreAge30 (user)
    )
  ), // разовый проход с проверкой по двум предикатам сразу
  map ( getName ), // вернуть имена
)`,
        en: `// For example, the following composition will
// =====================================
// use two curried functions:
// one is curried in advance,
// and the other we curry automatically before calling it

// pipe and curry come from Ramda: the course playground exposes it as R
const { pipe, curry } = R

// the data we will work with:
// a list of users
// fetchAllUsers :: * -> Promise a
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// Our task
// 1. Get the users whose status is online
// 2. Who are older than 30
// 3. Take their names

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = (fn) => (arr) => arr.filter(fn)

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)

// a predicate function that checks the status
// isStatus :: String -> String -> a -> Boolean
const isStatus = (status) => (prop) => (user) => user[prop] === status

// isMoreAge :: (Number, String, a) -> Boolean
const isMoreAge = (age, prop, user) => user[prop] > age

// let's auto-curry the function above
const isMoreAgeCurry = curry(isMoreAge)

// call it twice and create an abstraction with a clear name:
// a predicate function that checks the age
const isMoreAge30 = isMoreAgeCurry (30) ('age')

// get a value by key
// getByProp :: String -> a -> String
const getByProp = (prop) => (user) => user[prop]

//  keep the key 'name' in the closure and wait for an object
// getName :: a -> String
const getName = getByProp('name')

// prepare the composition; on the next call
// it expects an array of users as the argument
const pipeline = pipe (
  filter ( isStatus ('online') ('status') ), // keep only online users
  filter ( isMoreAge30 ), // older than 30
  map ( getName ), // return the names
)

const showAdultsUsers = async () => {

  // run the promise with the data,
  // pass the data into the composition and run it
  const adultsUsers = await fetchAllUsers()
                                          .then(pipeline)

  console.log(adultsUsers) // ['Angel']
}

showAdultsUsers()


// =============================

// the code above reads nicely,
// but if there are tens of thousands of users
// and we need to optimize, we can avoid
// traversing the array twice with filter
const pipelineOnePass = pipe (
  filter (
    (user) => (
      isStatus ('online') ('status') (user) && isMoreAge30 (user)
    )
  ), // a single pass checking both predicates at once
  map ( getName ), // return the names
)`,
      },
    },
    {
      type: 'text',
      ru: "Мы также можем создавать специализированные функции при помощи каррирования. Это нечто подобное «наследованию» в ООП.",
      en: "We can also create specialized functions with the help of currying. It is somewhat similar to \"inheritance\" in OOP.",
    },
    {
      type: 'text',
      ru: "Берётся базовая каррированная функция, а дальше при помощи вызовов создаются другие функции. Хватит теории — давайте сразу к примерам.",
      en: "We take a base curried function, and then we build other functions through calls. Enough theory — let's get straight to the examples.",
    },
    {
      type: 'code',
      code: {
        ru: `// Давайте возьмем каррированную функцию
// и начнем создавать другие специализированные функции

// Базовая функция сравнения значения по определенному ключу
// equalBy :: String -> * -> a -> Boolean
const equalBy = (prop) => (value) => (obj) => obj[prop] === value

// данные с которыми мы будем работать
const user = { name: 'John', status: 'online', married: true }

// мы бы могли вызвать функцию разом
const onlineStatusUser = equalBy ('status') ('online') (user)

// проверяем онлайн ли статус у пользователя
console.log(onlineStatusUser) // true

// теперь давайте начнем создавать
// специализированные функции из equalBy

// сравнение по ключу статусу
const equalByStatus = equalBy ('status')
// сравнение по ключу женат
const equalByMarried = equalBy ('married')

// создадим еще один слой абстракции
// проверка онлайн
const isOnline = equalByStatus ('online')
// проверка офлайн
const isOffline = equalByStatus ('offline')

// проверка женат ли
const isMarried = equalByMarried (true)
// проверка не женат
const isNotMarried = equalByMarried (false)

// мы можем написать хелпер отрицания
// для последних функций
// not :: (a -> Boolean) -> a -> Boolean
const not = (fn) => (...args) => !fn(...args)

// человекочитаемое выражение «не онлайн»
const offlineUserCheck = not (isOnline)
const notMarriedCheck = not (isMarried)

// а теперь давайте запустим наши спец функции
// и проверим онлайн ли пользователь и женат ли он

// получим статус юзера
const isOnlineUser = isOnline (user)
//  получим его статус женат ли
const isMarriedUser = isMarried (user)

// теперь давайте допускать в наше приложение
// пользователей женатых и которые онлайн

// напишем хелпер
// and :: Boolean -> Boolean -> Boolean
const and = (valueFirst) => (valueSecond) => valueFirst && valueSecond

// обратите внимание код стал человекочитаемым
// и очень абстрактным
// каждая функция делает одну логическую операцию
// код говорит что делает а не как
if (and (isOnlineUser) (isMarriedUser) ) {
  // что-то там делаем ...
}`,
        en: `// Let's take a curried function
// and start building other specialized functions from it

// Base function that compares the value under a given key
// equalBy :: String -> * -> a -> Boolean
const equalBy = (prop) => (value) => (obj) => obj[prop] === value

// the data we will work with
const user = { name: 'John', status: 'online', married: true }

// we could call the function all at once
const onlineStatusUser = equalBy ('status') ('online') (user)

// check whether the user's status is online
console.log(onlineStatusUser) // true

// now let's start building
// specialized functions from equalBy

// compare by the status key
const equalByStatus = equalBy ('status')
// compare by the married key
const equalByMarried = equalBy ('married')

// add one more layer of abstraction
// is online
const isOnline = equalByStatus ('online')
// is offline
const isOffline = equalByStatus ('offline')

// is married
const isMarried = equalByMarried (true)
// is not married
const isNotMarried = equalByMarried (false)

// we can write a negation helper
// for the last functions
// not :: (a -> Boolean) -> a -> Boolean
const not = (fn) => (...args) => !fn(...args)

// a human-readable "not online" expression
const offlineUserCheck = not (isOnline)
const notMarriedCheck = not (isMarried)

// now let's run our specialized functions
// and check whether the user is online and married

// get the user's status
const isOnlineUser = isOnline (user)
//  get whether the user is married
const isMarriedUser = isMarried (user)

// now let's let into our app
// only users who are married and online

// write a helper
// and :: Boolean -> Boolean -> Boolean
const and = (valueFirst) => (valueSecond) => valueFirst && valueSecond

// note that the code has become human-readable
// and highly abstract:
// each function does one logical operation,
// the code says what it does, not how
if (and (isOnlineUser) (isMarriedUser) ) {
  // do something here ...
}`,
      },
    },
  ],
}

export default lesson
