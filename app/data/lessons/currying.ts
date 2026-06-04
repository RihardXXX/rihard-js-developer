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
      code: `//  Пример
// Каррирование
// sum :: Number -> Number -> Number -> Number
const sum  = (a) => (b) => (c) => a + b + c

// функция вычисляется только когда получает все аргументы
// иначе возвращает новая функция
const result = sum (1) (2) (1)

console.log(result) // 4

// Неполные вызовы каррированной функции

// add : Number -> Number -> Number
const add = (a) => (b) => a + b

// в замыкании хранится 10 и ждёт второго аргумента
// возвращается функция
const add10 = add(10)
// после получения второго аргумента
// происходит полное вычисление функции
const resultAdded = add10(5) // 15`,
    },
    {
      type: 'text',
      ru: "Как же нам каррировать любую функцию с n количеством параметров, значение которых мы не знаем. Например, 5 параметров и более у функции.",
      en: "So how do we curry an arbitrary function with n parameters whose values we don't know — for example, a function with 5 or more parameters?",
    },
    {
      type: 'text',
      ru: "Можно использовать автоматическое каррирование любой функции и вызывать её в любом порядке.",
      en: "We can apply automatic currying to any function and call it in any order.",
    },
    {
      type: 'code',
      code: `// Например мы хотим каррировать функцию sum
// sum :: Number -> Number -> Number -> Number
const sum  = (a, b, c) => a + b + c

// функция которая каррирует любую функцию
// curry :: (* -> *) -> * -> (* -> *)
const curry = (fn) => {
  // количество параметров функции
  const lengthFn = fn.length

  // внутренняя функция, которая будет вызываться рекурсивно
  const curried = (...argsFirst) => {
    // если количество входящих аргументов больше или равно
    // количество аргументов функции то мы немедленно вызываем её
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

// теперь можем вызывать ее как угодно
console.log( sumCurry (1) (1) (1) ) // 3
console.log( sumCurry (1, 1) (1) ) // 3
console.log( sumCurry (1) (1, 1) ) // 3
console.log( sumCurry (1, 1, 1) ) // 3`,
    },
    {
      type: 'text',
      ru: "А теперь давайте глянем всю мощь каррирования на примерах композиции функций.",
      en: "Now let's look at the full power of currying through examples of function composition.",
    },
    {
      type: 'code',
      code: `// Например в следующей композиции будут
// =====================================
// использоваться две функции каррированые
// одна каррированая уже
// а другая автоматически каррируем перед вызовом

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

// isMoreAge :: String -> String -> a -> Boolean
const isMoreAge = (age, prop, user) => user[prop] > age

// давайте используя функцию выше мы автокаррируем её
const isMoreAgeCurry = curry(isMoreAge)

// вызовим дважды и создадим абстракцию с понятным названием
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
// представим что pipe функция уже реализована или готова
const pipeline = pipe (
  filter ( isStatus ('online') ('status') ), // только онлайн пользователей получаем
  filter ( isMoreAge30 ), // возрастом старше 30 лет
  map ( getName ), // вернуть имена
)

(async () => {

  // запуск промиса с данными
  // данные бросаем в композицию и запускаем её
  const adultsUsers = await fetchAllUsers()
                                          .then(pipeline)

  console.log(adultsUsers) // ['Angel']
})


// =============================

// в коде выше все круто описано
// но если пользователей несколько десятков тысяч
// и нам нужна оптимизация мы можем сделать так
// чтобы исключить двойной обход массива в рамках filter
const pipeline = pipe (
  filter (
    (user) => (
      isStatus ('online') ('status') (user) && isMoreAge30 (user)
    )
  ), // разовый проход с проверкой по двум предикатам сразу
  map ( getName ), // вернуть имена
)`,
    },
    {
      type: 'text',
      ru: "Мы также можем создавать специализированные функции при помощи каррирования. Это нечто подобное «наследованию» в ООП.",
      en: "We can also create specialized functions with the help of currying. It is somewhat similar to \"inheritance\" in OOP.",
    },
    {
      type: 'text',
      ru: "Берётся базовая каррированная функция, а дальше при помощи вызовов создаются другие функции. Ну хватит болтать)) давайте сразу приступим к примерам.",
      en: "We take a base curried function, and then we build other functions through calls. Enough talking)) let's get straight to the examples.",
    },
    {
      type: 'code',
      code: `// Давайте возьмем каррированную функцию
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
// проверка оффлайн
const isOffline = equalByStatus ('offline')

// проверка женат ли
const isMarried = equalByMarried (true)
// проверка не женат
const isNotMarried = equalByMarried (false)

// мы можем написать хелпер отрицания
// для последних функций
// not :: (a -> Boolean) -> a -> Boolean
const not = (fn) => (...args) => !fn(...args)

// человеко читаемое выражение не онлайн
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
  // что то там делам ...
}`,
    },
  ],
}

export default lesson
