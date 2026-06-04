import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'recursion',
  title: { ru: "Рекурсия", en: "Recursion" },
  blocks: [
    {
      type: 'text',
      ru: "Рекурсия — это способность функции вызывать саму себя.",
      en: "Recursion is the ability of a function to call itself.",
    },
    {
      type: 'text',
      ru: "Рекурсия должна отвечать двум основным требованиям, чтобы она корректно работала.",
      en: "Recursion must meet two basic requirements in order to work correctly.",
    },
    {
      type: 'text',
      ru: "1. Базовый случай. Это логика, при которой рекурсия должна прекращаться. Базовое условие, которое прекращает вызов функцией самой себя.",
      en: "1. The base case. This is the logic at which the recursion must stop — the base condition that stops the function from calling itself.",
    },
    {
      type: 'text',
      ru: "2. Рекурсивный случай. Это логика, при которой функция вызывает саму себя, обычно с небольшими изменениями в аргументах.",
      en: "2. The recursive case. This is the logic in which the function calls itself, usually with small changes to the arguments.",
    },
    {
      type: 'text',
      ru: "Рекурсия часто используется в функциональном программировании.",
      en: "Recursion is frequently used in functional programming.",
    },
    {
      type: 'code',
      code: `// наша цель получить средний возраст пользователей

// ================================
// декларативный стиль без рекурсии

// список пользователей
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// getAgeAverage :: [a] -> Number
const getAgeAverage = (users) => pipe (
  (users) => [
    users.reduce ((init, { age }) => init + age, 0),
    users.length
    ], // получаем общий возраст и количество пользователей
  ([allAges, quantity]) => Math.round (allAges / quantity), // вычисляем средний возраст
  console.log // логируем результат
) (users)

fetchAllUsers().then(getAgeAverage)
// ================================

// Рекурсивный пример
// ================================
// эта функций рекурсивная оптимизирована
// она не делает 2 * вызовов
// потому что по достижению базового случая она
// сразу возвращает результат
// но про это мы поговорим еще позже

// а теперь тоже самое сделаем с помощью рекурсии
// recurAgeAverage :: [a] -> Number -> Number -> Number
const recurAgeAverage = (
    users, // массив данных пользователей
    sumAges = 0, // сумма возрастов пользователей
    quantityUsers = users.length // первичное количество пользователей
  ) => {

  // базовый случай, условие выхода
  // когда массив уже пуст
  if (!users.length) {
    // сумму всех лет пользователей делим на количество пользователей
    // чтобы посчитать средний возраст пользователей
    return sumAges / quantityUsers
  }

  // рекурсивный случай, чтобы вызывать самого себя
  // пока в массиве есть элементы
  return recurAgeAverage (
      users.slice(1), // возвращаем массив без первого элемента
      sumAges = sumAges + users[0]?.age, // собираем возраст каждого пользователя
      quantityUsers // передаем ранее сохраненное значение количество пользователей
    )
}
// ================================

// Давайте нашу функцию перепишем в одну строку и вызовем
const recurAgeAverageF = (users, sumAges = 0, quantityUsers)
                          => !users.length
                              ? sumAges / quantityUsers
                              : recurAgeAverageF (
                                  users.slice(1),
                                  sumAges = sumAges + users[0]?.age,
                                  quantityUsers
                                )

( async () => {
  const users = await fetchAllUsers () // получаем список пользователей
  const averageAge = recurAgeAverageF (users) // получаем средний возраст рекурсивно
  console.log (averageAge) // логируем результат 25.25
}
)()`,
    },
    {
      type: 'text',
      ru: "Пример выше с рекурсией, возможно, для некоторых не прост. Поэтому мы напишем пример проще и визуализируем вызовы. Главное, не волнуйтесь, если сразу вам что-то непонятно.",
      en: "The example above with recursion may not be simple for some. So we will write a simpler example and visualize the calls. The main thing is, don't worry if something isn't clear right away.",
    },
    {
      type: 'code',
      code: `// Наша цель собрать общий рейтинг пользователей
// То есть сумму  рейтингов

const users = [
  { name: 'John', rating: 4.5 },
  { name: 'Angel', rating: 4 },
  { name: 'Michel', rating: 3 },
  { name: 'Anna', rating: 5 },
]

// sumRating : [a] -> Number
const sumRating = (users) => {
  // базовый случай, условие выхода когда массив пуст
  if (!users.length) {
    return 0
  }

  // рекурсивный случай
  // рейтинг первого элемента складывается
  // с вызовом самой же функции с вырезанным эти элементом
  return users[0].rating + sumRating (users.slice(1))
}

// давайте сократим синтасис
const rateSum = (users) =>
                      !users.length
                        ? 0
                        :  users[0] + rateSum (users.slice(1))

// визуализируем вызовы
// и для понимания представим массив числе вместо ключа rating
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + rateSum ([4, 3, 5])
rateSum ([4, 3, 5]) // возвращает 4 + rateSum ([3, 5])
rateSum ([3, 5]) // возвращает 3 + rateSum ([5])
rateSum ([5]) // возвращает 5 + rateSum ([])
rateSum ([]) // возвращает 0 достигли базового случая

// и тут самое главное идут возвраты от вызовов в стэке
rateSum ([5]) // возвращает 5 + 0
rateSum ([3, 5]) // возвращает 3 + 5
rateSum ([4, 3, 5]) // возвращает 4 + 8
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + 12
// итоговый результат 16.5`,
    },
    {
      type: 'text',
      ru: "В примере выше в функции \"rateSum\" есть один существенный недостаток. Это количество вызовов, которое можно оптимизировать, используя приём оптимизации хвостовой рекурсии.",
      en: "The example above with the \"rateSum\" function has one significant drawback — the number of calls, which can be optimized using the tail call optimization technique.",
    },
    {
      type: 'text',
      ru: "Зачем нам это нужно. В JS стек вызовов функций при рекурсивном синхронном вызове переполняется, так как функции создаются не лениво, то есть они создаются уже до момента вызова, в отличие от Haskell, где нет циклов и функции создаются лениво в момент фактического вызова.",
      en: "Why do we need this? In JS the call stack overflows during recursive synchronous calls, because functions are not created lazily — that is, they are created before the moment of the call, unlike in Haskell, where there are no loops and functions are created lazily at the moment of the actual call.",
    },
    {
      type: 'code',
      code: `// === Оптимизация хвостовой рекурсии ====
// Давайте избавимся от лишних вызовов
const rateSum = (users, result = 0) => {
  // базовый случай условие выхода когда массив пуст
  // возвращаем второй аргумент где аккумулируем
  // результаты всех вызовов
  if (!users.length) {
    return result
  }

  // рекурсивный случай пока в массиве элементы
  // при каждом вызове результат складываем во второй аргумент
  // и вызываем дальше и при базовой случай возвращаем результат
  // тем самым сокращаем количество вызовов
  return rateSum (users.slice(1), result = result + users[0])
}

// давайте все перепишем в одну строку
const sum = (users, result = 0) => !users.length
                                ? result
                                : sum (users.slice(1), result = result + users[0])

// визуализируем вызовы
// и для понимания представим массив числе вместо ключа rating
sum ([4.5, 4, 3, 5], 0) // возвращает sum ([4, 3, 5], 0 + 4.5)
sum ([4, 3, 5], 4.5) // возвращает sum ([3, 5], 4.5 + 4)
sum ([3, 5], 8.5) // возвращает sum ([5], 8.5 + 3)
sum ([5], 11.5) // возвращает sum ([], 11.5 + 5)
sum ([], 16.5) // возвращает result  16.5
// дальше вызовы прекращаются
// удержания и возвратов нет
// размотки стека нет
// возвращаем итоги
// количество вызовов сократилось вдвое`,
    },
    {
      type: 'text',
      ru: "Оптимизация хвостовой рекурсии на текущий момент времени (2025 год), к сожалению, не реализована в движке Node.js (Chrome). Она была реализована в одной из версий Core JS (Safari), но затем была удалена. В любом случае количество вызовов сокращается. В продакшен-коде старайтесь не использовать её, когда не владеете точной информацией о количестве вызовов в программе.",
      en: "Tail call optimization, as of now (the year 2025), is unfortunately not implemented in the Node.js (Chrome) engine. It was implemented in one of the versions of Core JS (Safari), but was later removed. In any case the number of calls is reduced. In production code, try not to use it when you don't have precise information about the number of calls in the program.",
    },
    {
      type: 'text',
      ru: "Далее в разделе рекурсии мы будем использовать приёмы, при помощи которых можно безопасно использовать рекурсию в продакшен-коде без подсчёта количества вызовов.",
      en: "Further on in the recursion section we will use techniques that let you safely use recursion in production code without counting the number of calls.",
    },
    {
      type: 'text',
      ru: "Так как же нам освободить стек вызовов без его переполнения в продакшен-коде.",
      en: "So how do we free up the call stack without overflowing it in production code.",
    },
    {
      type: 'text',
      ru: "1. Сделать код асинхронным, не блокировать поток и освобождать стек",
      en: "1. Make the code asynchronous, avoid blocking the thread, and free up the stack",
    },
    {
      type: 'text',
      ru: "2. Использовать санку (thunk) — \"трамплин\", фейковую рекурсию",
      en: "2. Use a thunk — a \"trampoline\", a fake recursion",
    },
    {
      type: 'code',
      code: `// === 1. Асинхронный вызов рекурсии ====

// обратите внимание, что рекурсивный случай оборачивается в таймер
// sum :: [a] -> Number -> (Number -> *)
const sumD = (users, result = 0, callback) => {

  // базовый случай условие выхода
  // когда массив уже пустой то результат пробрасываем в колбек
  if (!users.length) {
    callback (result)
    return
  }

  // рекурсивный случай вызываем асинхронно
  // через таймер чтобы стек не переполнялся
  setTimeout (
    () => sumD (users.slice(1), result = result + users[0], callback),
    0
  )
}

// давайте сократим запись
const sum = (users, result = 0, callback) =>
  !users.length
    ? callback (result)
    : setTimeout (
        () => sum (users.slice(1), result = result + users[0], callback),
        0
      )

// попробуем вызвать
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // 16.5

// визуализируем вызовы
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // возвращает sum ([4, 3, 5], 0 + 4.5, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([4, 3, 5], 4.5, (total) => console.log(total)) // возвращает sum ([3, 5], 4.5 + 4, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([3, 5], 8.5, (total) => console.log(total)) // возвращает sum ([5], 8.5 + 3, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([5], 11.5, (total) => console.log(total)) // возвращает sum ([], 11.5 + 5, callback)
// стэк вызовов свободный для микрозадач (промисы) или макро например
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([], 16.5, (total) => console.log(total)) // вызовет callback c result

// Минусы этого подхода
// Скорость выполнения (производительность) низкая
// Если вам необходимы длительные операции вызовы функций синхронные
// То лучше использовать веб воркеры в отдельном потоке
// При условии, что у вас процессор больше одного ядра`,
    },
    {
      type: 'text',
      ru: "Разберём логику использования трамплина, чтобы избежать переполнения стека. Трамплин работает синхронно, в отличие от вызова через таймер.",
      en: "Let's examine the logic of using a trampoline to avoid stack overflow. The trampoline works synchronously, unlike a call through a timer.",
    },
    {
      type: 'text',
      ru: "Рассмотрим основные принципы трамплина.",
      en: "Let's look at the main principles of the trampoline.",
    },
    {
      type: 'text',
      ru: "1. Трамплин — это функция-обёртка, которая придаёт нашей основной функции особенное поведение.",
      en: "1. A trampoline is a wrapper function that gives our main function special behavior.",
    },
    {
      type: 'text',
      ru: "2. Функция-трамплин возвращает другую функцию, которая принимает аргументы.",
      en: "2. The trampoline function returns another function that accepts arguments.",
    },
    {
      type: 'text',
      ru: "3. Внутри она в цикле вызывает основную функцию с аргументом.",
      en: "3. Inside, it calls the main function with an argument in a loop.",
    },
    {
      type: 'text',
      ru: "4. Если возвращаемое значение — функция, то она вызовет её снова, иначе остановит цикл и вернёт результат.",
      en: "4. If the returned value is a function, it will call it again; otherwise it stops the loop and returns the result.",
    },
    {
      type: 'text',
      ru: "5. Основная функция в базовом случае должна возвращать результат.",
      en: "5. In the base case the main function must return a result.",
    },
    {
      type: 'text',
      ru: "6. Основная функция в рекурсивном случае должна обязательно возвращать функцию.",
      en: "6. In the recursive case the main function must necessarily return a function.",
    },
    {
      type: 'code',
      code: `// === Рекурсия через трамплин ====

// обратите внимание первый аргумент это функция
// а вторым аргументом мы по сути запускаем вызов функции
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  // запускаем функцию с первым аргументом
  let result = fn(...args)

  // запускаем цикл бесконечно пока функция
  // возвращает другую функцию
  while (typeof result == 'function') {
    // результат вызова сохраняем в переменную
    // и проверяем что оно вернуло
    // result() *** запомни эту метку дальше покажем что за функция это
    result = result()
  }

  // как только результат вызова функции
  // не функция то возвращаем его
  return result
}

// давайте сократим запись
// sumD :: [a] -> Number -> Number
const sumD = (users, result = 0) => {

  // если массив пустой то возвращаем результат
  if (!users.length) {
    return result
  }

  // внимание тут обязательно возвращаем функцию
  // метка *** эта функция запускаемая в трамплине внутри
  return () => sumD (users.slice(1), result = result + users[0])
}

// давайте перепишем в одну строку функцию
// sum :: [a] -> Number -> Number
const sum = (users, result = 0) =>
      !users.length
       ? result
       : () => sum (users.slice(1), result = result + users[0])

// протестируем код

// пропускаем нашу функцию через трамплин
const sumTrampoline = trampoline (sum)

// теперь на самом деле в цикле будут запускаться функции
console.log (sumTrampoline ([4.5, 4, 3, 5], 0)) // 16.5

// давайте теперь визуализируем вызовы
// логика внутри функции трамплин

//  === первый вызов =====
let result = sum([4.5, 4, 3, 5], 0) //
// вернет в result () => sum ([4, 3, 5], 4.5 + 0)
// =======================

//  === обычные вызовы =====
while (typeof result == 'function') {
  result = result() // () => sum ([4, 3, 5], 4.5 + 0)
  // вернет в result () => sum ([3, 5], 4.5 + 4)
}
// =======================

//  === обычные вызовы =====
while (typeof result == 'function') {
  result = result() // () => sum ([3, 5], 4.5 + 4)
  // вернет в result () => sum ([5], 8.5 + 3)
}
// =======================

//  === обычные вызовы =====
while (typeof result == 'function') {
  result = result() // () => sum ([5], 8.5 + 3)
  // вернет в result () => sum ([], 11.5 + 5)
}
// =======================

//  === последний вызов условие выхода из цикла =====
return result // где result это второй аргумент 16.5
// =======================


// визуализация через схему
// это как тип связный список функций, который заранее не готов
// а формируется в процессе
[(a -> b)] -> [(b -> c)] -> [(c -> d)]
// массив функция где след элемент формируется динамически
[
  ([4.5, 4, 3, 5]) => sum ([4.5, 4, 3, 5], 0), // первый вызов let result = fn(...args)
  () => sum ([4.5, 4, 3, 5], 0), // result = result() внутри цикла
  () => sum ([4, 3, 5], 4.5), // result = result() внутри цикла
  () => sum ([3, 5], 8.5), // result = result() внутри цикла
  () => sum ([5], 11.5), // result = result() внутри цикла
  () => sum ([], 16.5), // result = result() внутри цикла
  16.5 // цикл завершается return result
]`,
    },
  ],
}

export default lesson
