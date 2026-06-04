import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'functional-programming',
  title: { ru: "Функциональное программирование", en: "Functional programming" },
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
      code: `// ==== Внимание ===
// Эти примеры Вам пока могут казаться крайне запутанными и непонятными
// Не пугайтесь и читайте дальше

// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Старше 20 лет
// 3. Первого пользователя из списка
// 4. Получить его имя

// Пример функционального кода
// импорт готовых утилит с библиотеки
import { pipe, prop, equals, filter, head, gt } from 'sanctuary';

// fetchAllUsers :: * -> Promise a
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
  equals(status), // сравниваем поле юзера со статусом установленным выше
])

// moreAge :: Number -> (a -> Boolean)
const moreAge = age => pipe([
  prop('age'), // берем содержимое поля возраст
  gt(age), // поле юзера было больше age
])

// isStatusOnline :: a -> Boolean
const isStatusOnline = isStatus(ONLINE)

//  moreAge20 :: a -> Boolean
const moreAge20 = moreAge(20)

// getName :: a -> String
const getName = prop('name')

// Внимание необязательно создавать чрезмерную абстракцию
// это иногда может запутать коллег
// В идеале конечно лучше обернуть в монаду для защиты от падений композиции
// в случае если с сервера прилетит, что попало и это будет настоящей защитой
// а не псевдо как в typescript

// searchOnlineUsers :: [a] -> a
const searchOnlineUsers= pipe([
  filter(isStatusOnline), // получаем только пользователей онлайн
  filter(moreAge20), // получаем пользователей старше 20 лет
  head, // получаем первого пользователя из списка
  getName // получить имя этого пользователя
])

// start программы
const onlineUsersByAge = await fetchAllUsers().then(searchOnlineUsers)
console.log(onlineUsersByAge) // 'John'`,
    },
  ],
}

export default lesson
