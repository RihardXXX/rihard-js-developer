import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'functional-programming',
  title: { ru: "Функциональное программирование", en: "Functional programming" },
  description: {
    ru: "Что такое функциональное программирование в JavaScript: чистые функции, конвейер pipe из небольших функций, Maybe из head и fromMaybe в Sanctuary.",
    en: "What functional programming means in JavaScript: pure functions, a pipeline of small functions with pipe, and Maybe from head and fromMaybe in Sanctuary.",
  },
  goal: {
    ru: "Понять, что такое функциональное программирование: декларативная разработка на основе чистых функций, в которой задача решается конвейером из небольших функций.",
    en: "Understand what functional programming is: declarative development based on pure functions, in which a task is solved by a pipeline of small functions.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Функциональное программирование - это высокоуровневая декларативная разработка на основе чистых функций. Функциональное программирование - парадигма программирования, которая опирается на функции как на основные строительные блоки.",
      en: "Functional programming is high-level, declarative development based on pure functions. Functional programming is a programming paradigm that relies on functions as its primary building blocks.",
    },
    {
      type: 'text',
      ru: "Чистые функции - это функции, которые при одних и тех же аргументах возвращают одинаковый результат и не создают побочных (сайд) эффектов.",
      en: "Pure functions are functions that return the same result for the same arguments and produce no side effects.",
    },
    {
      type: 'code',
      code: {
        ru: `// ==== Внимание ===
// Эти примеры Вам пока могут казаться крайне запутанными и непонятными
// Не пугайтесь и читайте дальше

// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Старше 20 лет
// 3. Первого пользователя из списка
// 4. Получить его имя

// Пример функционального кода
// готовые утилиты из библиотеки Sanctuary: в песочнице курса она подключена как S,
// в своем проекте: import S from 'sanctuary'
const { pipe, prop, equals, filter, head, gt, map, fromMaybe } = S

// fetchAllUsers :: () -> Promise [Object]
const fetchAllUsers = () => new Promise(resolve => resolve([
  {
    name: 'John',
    status: 'online',
    age: 25
  },
  {
    name: 'Alex',
    status: 'offline',
    age: 18
  },
  {
    name: 'Angel',
    status: 'online',
    age: 18
  }
]))

const ONLINE = 'online'

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'), // берем содержимое поля статус у пользователя
  equals(status), // сравниваем поле юзера со статусом, установленным выше
])

// moreAge :: Number -> (a -> Boolean)
const moreAge = age => pipe([
  prop('age'), // берем содержимое поля возраст
  gt(age), // проверяем, что поле юзера больше age
])

// isStatusOnline :: a -> Boolean
const isStatusOnline = isStatus(ONLINE)

//  moreAge20 :: a -> Boolean
const moreAge20 = moreAge(20)

// getName :: a -> String
const getName = prop('name')

// Внимание: необязательно создавать чрезмерную абстракцию,
// это иногда может запутать коллег
// В идеале, конечно, лучше обернуть данные в монаду для защиты от падений композиции
// в случае, если с сервера прилетит что попало. Это защита во время выполнения:
// типы TypeScript сами по себе проверяются только при компиляции и от таких данных не защищают

// searchOnlineUsers :: [a] -> String
const searchOnlineUsers= pipe([
  filter(isStatusOnline), // получаем только пользователей онлайн
  filter(moreAge20), // получаем пользователей старше 20 лет
  head, // получаем первого пользователя в Maybe: Just (пользователь) или Nothing, если список пуст
  map(getName), // получаем имя этого пользователя внутри Maybe
  fromMaybe('') // достаем имя из Maybe, для Nothing будет ''
])

// start программы
fetchAllUsers()
  .then(searchOnlineUsers)
  .then(name => console.log(name)) // 'John'`,
        en: `// ==== Note ===
// These examples may seem very confusing and unclear to you for now
// Don't worry, just keep reading

// our goal
// 1. Get the users whose status is online
// 2. Who are older than 20
// 3. Take the first user from the list
// 4. Get their name

// An example of functional code
// ready-made helpers from the Sanctuary library: in the course playground it is available as S,
// in your own project: import S from 'sanctuary'
const { pipe, prop, equals, filter, head, gt, map, fromMaybe } = S

// fetchAllUsers :: () -> Promise [Object]
const fetchAllUsers = () => new Promise(resolve => resolve([
  {
    name: 'John',
    status: 'online',
    age: 25
  },
  {
    name: 'Alex',
    status: 'offline',
    age: 18
  },
  {
    name: 'Angel',
    status: 'online',
    age: 18
  }
]))

const ONLINE = 'online'

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'), // take the user's status field
  equals(status), // compare it with the status given above
])

// moreAge :: Number -> (a -> Boolean)
const moreAge = age => pipe([
  prop('age'), // take the age field
  gt(age), // check that the user's field is greater than age
])

// isStatusOnline :: a -> Boolean
const isStatusOnline = isStatus(ONLINE)

//  moreAge20 :: a -> Boolean
const moreAge20 = moreAge(20)

// getName :: a -> String
const getName = prop('name')

// Note: you don't have to build excessive abstractions,
// they can sometimes confuse your colleagues
// Ideally, of course, you would wrap the data in a monad so the composition doesn't crash
// when the server sends back something unexpected. That is protection at run time:
// TypeScript types on their own are checked only at compile time and don't protect against such data

// searchOnlineUsers :: [a] -> String
const searchOnlineUsers= pipe([
  filter(isStatusOnline), // keep only the users who are online
  filter(moreAge20), // keep the users older than 20
  head, // take the first user wrapped in Maybe: Just (user), or Nothing if the list is empty
  map(getName), // get that user's name inside the Maybe
  fromMaybe('') // take the name out of the Maybe; for Nothing it is ''
])

// program start
fetchAllUsers()
  .then(searchOnlineUsers)
  .then(name => console.log(name)) // 'John'`,
      },
    },
  ],
  summary: [
    {
      ru: "Функциональное программирование — высокоуровневая декларативная разработка на основе чистых функций. Функции в нем — основные строительные блоки.",
      en: "Functional programming is high-level, declarative development based on pure functions. Functions are its primary building blocks.",
    },
    {
      ru: "Чистые функции при одних и тех же аргументах возвращают одинаковый результат и не создают побочных эффектов.",
      en: "Pure functions return the same result for the same arguments and produce no side effects.",
    },
    {
      ru: "В примере задачу решает конвейер pipe из небольших функций: отобрать пользователей онлайн, затем старше 20 лет, взять первого и получить его имя.",
      en: "In the example, the task is solved by a pipeline of small functions built with pipe: keep the users who are online, then those older than 20, take the first one and get their name.",
    },
    {
      ru: "head возвращает Maybe: Just (пользователь) или Nothing, если список пуст. fromMaybe достает значение из Maybe, а для Nothing подставляет запасное.",
      en: "head returns a Maybe: Just (user), or Nothing if the list is empty. fromMaybe takes the value out of the Maybe and substitutes a fallback for Nothing.",
    },
    {
      ru: "Создавать чрезмерную абстракцию необязательно: она иногда может запутать коллег.",
      en: "You don't have to build excessive abstractions: they can sometimes confuse your colleagues.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Соберите из небольших функций конвейер firstOfflineName: он возвращает имя первого пользователя со статусом offline, а если таких нет — строку «никого нет». Используйте isStatus и getName из заготовки и функции Sanctuary filter, head, map и fromMaybe, как в уроке. Проверьте конвейер на обоих списках.",
        en: "Build a firstOfflineName pipeline out of small functions: it returns the name of the first user whose status is offline, or the string \"nobody\" if there is no such user. Use isStatus and getName from the starter and the Sanctuary functions filter, head, map and fromMaybe, as in the lesson. Check the pipeline on both lists.",
      },
      starter: {
        ru: `// готовые утилиты Sanctuary: в песочнице курса она подключена как S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// здесь все пользователи онлайн
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
// ваш код

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`,
        en: `// ready-made Sanctuary helpers: in the course playground it is available as S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// here every user is online
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
// your code

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`,
      },
      solution: {
        ru: `// готовые утилиты Sanctuary: в песочнице курса она подключена как S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// здесь все пользователи онлайн
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
const firstOfflineName = pipe([
  filter(isStatus('offline')), // только пользователи offline
  head, // первый из них в Maybe: Just (пользователь) или Nothing
  map(getName), // имя внутри Maybe
  fromMaybe('никого нет'), // для Nothing — запасная строка
])

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`,
        en: `// ready-made Sanctuary helpers: in the course playground it is available as S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// here every user is online
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
const firstOfflineName = pipe([
  filter(isStatus('offline')), // only the users who are offline
  head, // the first of them in a Maybe: Just (user) or Nothing
  map(getName), // the name inside the Maybe
  fromMaybe('nobody'), // a fallback string for Nothing
])

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`,
      },
      expected: { ru: "Alex\nникого нет", en: "Alex\nnobody" },
    },
  ],
}

export default lesson
