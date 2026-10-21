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
      code: {
        ru: `// наша цель получить средний возраст пользователей

// ================================
// декларативный стиль без рекурсии

// список пользователей
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// pipe из урока «Композиция функций»: передаёт результат каждой функции следующей
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

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
// эта рекурсивная функция написана с хвостовым вызовом:
// сумма копится в аргументах, и в базовом случае функция
// сразу возвращает результат, без вычислений на обратном пути
// но про это мы поговорим еще позже

// а теперь то же самое сделаем с помощью рекурсии
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
const recurAgeAverageF = (users, sumAges = 0, quantityUsers = users.length) =>
                          !users.length
                              ? sumAges / quantityUsers
                              : recurAgeAverageF (
                                  users.slice(1),
                                  sumAges = sumAges + users[0]?.age,
                                  quantityUsers
                                )

// точка с запятой перед скобкой обязательна: без неё JS склеит
// эту скобку с выражением выше и попробует вызвать его результат
;( async () => {
  const users = await fetchAllUsers () // получаем список пользователей
  const averageAge = recurAgeAverageF (users) // получаем средний возраст рекурсивно
  console.log (averageAge) // логируем результат 25.25
}
)()`,
        en: `// наша цель получить средний возраст пользователей

// ================================
// декларативный стиль без рекурсии

// список пользователей
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// pipe из урока «Композиция функций»: передаёт результат каждой функции следующей
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

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
// эта рекурсивная функция написана с хвостовым вызовом:
// сумма копится в аргументах, и в базовом случае функция
// сразу возвращает результат, без вычислений на обратном пути
// но про это мы поговорим еще позже

// а теперь то же самое сделаем с помощью рекурсии
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
const recurAgeAverageF = (users, sumAges = 0, quantityUsers = users.length) =>
                          !users.length
                              ? sumAges / quantityUsers
                              : recurAgeAverageF (
                                  users.slice(1),
                                  sumAges = sumAges + users[0]?.age,
                                  quantityUsers
                                )

// точка с запятой перед скобкой обязательна: без неё JS склеит
// эту скобку с выражением выше и попробует вызвать его результат
;( async () => {
  const users = await fetchAllUsers () // получаем список пользователей
  const averageAge = recurAgeAverageF (users) // получаем средний возраст рекурсивно
  console.log (averageAge) // логируем результат 25.25
}
)()`,
      },
    },
    {
      type: 'text',
      ru: "Пример выше с рекурсией, возможно, для некоторых не прост. Поэтому мы напишем пример проще и визуализируем вызовы. Главное, не волнуйтесь, если сразу вам что-то непонятно.",
      en: "The example above with recursion may not be simple for some. So we will write a simpler example and visualize the calls. The main thing is, don't worry if something isn't clear right away.",
    },
    {
      type: 'code',
      code: {
        ru: `// Наша цель собрать общий рейтинг пользователей
// То есть сумму рейтингов

const users = [
  { name: 'John', rating: 4.5 },
  { name: 'Angel', rating: 4 },
  { name: 'Michel', rating: 3 },
  { name: 'Anna', rating: 5 },
]

// sumRating :: [a] -> Number
const sumRating = (users) => {
  // базовый случай, условие выхода когда массив пуст
  if (!users.length) {
    return 0
  }

  // рекурсивный случай
  // рейтинг первого элемента складывается
  // с вызовом самой же функции для массива без этого элемента
  return users[0].rating + sumRating (users.slice(1))
}

// давайте сократим синтаксис
const rateSum = (users) =>
                      !users.length
                        ? 0
                        :  users[0] + rateSum (users.slice(1))

// визуализируем вызовы
// и для понимания представим массив чисел вместо ключа rating
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + rateSum ([4, 3, 5])
rateSum ([4, 3, 5]) // возвращает 4 + rateSum ([3, 5])
rateSum ([3, 5]) // возвращает 3 + rateSum ([5])
rateSum ([5]) // возвращает 5 + rateSum ([])
rateSum ([]) // возвращает 0 достигли базового случая

// и тут самое главное идут возвраты от вызовов в стеке
rateSum ([5]) // возвращает 5 + 0
rateSum ([3, 5]) // возвращает 3 + 5
rateSum ([4, 3, 5]) // возвращает 4 + 8
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + 12
// итоговый результат 16.5`,
        en: `// Наша цель собрать общий рейтинг пользователей
// То есть сумму рейтингов

const users = [
  { name: 'John', rating: 4.5 },
  { name: 'Angel', rating: 4 },
  { name: 'Michel', rating: 3 },
  { name: 'Anna', rating: 5 },
]

// sumRating :: [a] -> Number
const sumRating = (users) => {
  // базовый случай, условие выхода когда массив пуст
  if (!users.length) {
    return 0
  }

  // рекурсивный случай
  // рейтинг первого элемента складывается
  // с вызовом самой же функции для массива без этого элемента
  return users[0].rating + sumRating (users.slice(1))
}

// давайте сократим синтаксис
const rateSum = (users) =>
                      !users.length
                        ? 0
                        :  users[0] + rateSum (users.slice(1))

// визуализируем вызовы
// и для понимания представим массив чисел вместо ключа rating
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + rateSum ([4, 3, 5])
rateSum ([4, 3, 5]) // возвращает 4 + rateSum ([3, 5])
rateSum ([3, 5]) // возвращает 3 + rateSum ([5])
rateSum ([5]) // возвращает 5 + rateSum ([])
rateSum ([]) // возвращает 0 достигли базового случая

// и тут самое главное идут возвраты от вызовов в стеке
rateSum ([5]) // возвращает 5 + 0
rateSum ([3, 5]) // возвращает 3 + 5
rateSum ([4, 3, 5]) // возвращает 4 + 8
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + 12
// итоговый результат 16.5`,
      },
    },
    {
      type: 'text',
      ru: "В примере выше у функции \"rateSum\" есть один существенный недостаток: каждый вызов ждёт результат следующего, чтобы прибавить к нему своё число. Поэтому глубина стека вызовов растёт вместе с длиной массива. Посмотрим, что здесь меняет хвостовая рекурсия.",
      en: "The \"rateSum\" function in the example above has one significant drawback: each call waits for the result of the next one so it can add its own number to it. So the depth of the call stack grows with the length of the array. Let's see what tail recursion changes here.",
    },
    {
      type: 'text',
      ru: "Зачем нам это нужно. Пока вызов не завершился, его кадр (аргументы, локальные переменные и место, куда вернуть результат) лежит в стеке вызовов. Размер стека ограничен, поэтому на большом массиве синхронная рекурсия падает с ошибкой переполнения стека (в Chrome и Node.js — RangeError: Maximum call stack size exceeded).",
      en: "Why do we need this? Until a call finishes, its frame (arguments, local variables and the place to return the result to) stays on the call stack. The stack size is limited, so on a large array synchronous recursion fails with a stack overflow error (in Chrome and Node.js it is RangeError: Maximum call stack size exceeded).",
    },
    {
      type: 'code',
      code: {
        ru: `// === Оптимизация хвостовой рекурсии ====
// Перепишем функцию так, чтобы рекурсивный вызов стал хвостовым
const rateSum = (users, result = 0) => {
  // базовый случай условие выхода когда массив пуст
  // возвращаем второй аргумент где аккумулируем
  // результаты всех вызовов
  if (!users.length) {
    return result
  }

  // рекурсивный случай пока в массиве элементы
  // при каждом вызове результат складываем во второй аргумент
  // и вызываем дальше, а в базовом случае возвращаем результат
  // вызов стоит в хвостовой позиции: после него функции больше нечего делать
  return rateSum (users.slice(1), result = result + users[0])
}

// давайте все перепишем в одну строку
const sum = (users, result = 0) => !users.length
                                ? result
                                : sum (users.slice(1), result = result + users[0])

// визуализируем вызовы
// и для понимания представим массив чисел вместо ключа rating
sum ([4.5, 4, 3, 5], 0) // возвращает sum ([4, 3, 5], 0 + 4.5)
sum ([4, 3, 5], 4.5) // возвращает sum ([3, 5], 4.5 + 4)
sum ([3, 5], 8.5) // возвращает sum ([5], 8.5 + 3)
sum ([5], 11.5) // возвращает sum ([], 11.5 + 5)
sum ([], 16.5) // возвращает result 16.5
// дальше вызовы прекращаются: результат уже в аккумуляторе,
// и на обратном пути досчитывать нечего
// вызовов столько же, сколько у rateSum без аккумулятора, — пять
// при proper tail calls движок не хранит кадры ожидающих вызовов,
// и глубина стека не растёт; но в V8 и SpiderMonkey этого нет,
// там стек растёт так же, как без хвостового вызова`,
        en: `// === Оптимизация хвостовой рекурсии ====
// Перепишем функцию так, чтобы рекурсивный вызов стал хвостовым
const rateSum = (users, result = 0) => {
  // базовый случай условие выхода когда массив пуст
  // возвращаем второй аргумент где аккумулируем
  // результаты всех вызовов
  if (!users.length) {
    return result
  }

  // рекурсивный случай пока в массиве элементы
  // при каждом вызове результат складываем во второй аргумент
  // и вызываем дальше, а в базовом случае возвращаем результат
  // вызов стоит в хвостовой позиции: после него функции больше нечего делать
  return rateSum (users.slice(1), result = result + users[0])
}

// давайте все перепишем в одну строку
const sum = (users, result = 0) => !users.length
                                ? result
                                : sum (users.slice(1), result = result + users[0])

// визуализируем вызовы
// и для понимания представим массив чисел вместо ключа rating
sum ([4.5, 4, 3, 5], 0) // возвращает sum ([4, 3, 5], 0 + 4.5)
sum ([4, 3, 5], 4.5) // возвращает sum ([3, 5], 4.5 + 4)
sum ([3, 5], 8.5) // возвращает sum ([5], 8.5 + 3)
sum ([5], 11.5) // возвращает sum ([], 11.5 + 5)
sum ([], 16.5) // возвращает result 16.5
// дальше вызовы прекращаются: результат уже в аккумуляторе,
// и на обратном пути досчитывать нечего
// вызовов столько же, сколько у rateSum без аккумулятора, — пять
// при proper tail calls движок не хранит кадры ожидающих вызовов,
// и глубина стека не растёт; но в V8 и SpiderMonkey этого нет,
// там стек растёт так же, как без хвостового вызова`,
      },
    },
    {
      type: 'text',
      ru: "Хвостовой вызов не уменьшает число вызовов. Он позволяет движку не хранить кадр вызывающей функции: стандарт ES2015 требует этого в строгом режиме (proper tail calls), и тогда глубина стека не растёт. Из браузерных движков это реализовано только в JavaScriptCore (Safari); в V8 (Chrome, Node.js) поддержка была за флагом и удалена, в SpiderMonkey (Firefox) её нет. Поэтому в JS для глубокой рекурсии нужен трамплин. В продакшен-коде не рассчитывайте на хвостовую рекурсию, если не знаете точно, сколько будет вызовов.",
      en: "A tail call does not reduce the number of calls. It lets the engine drop the caller's stack frame: ES2015 requires this in strict mode (proper tail calls), and then the stack depth does not grow. Among browser engines, only JavaScriptCore (Safari) implements it; V8 (Chrome, Node.js) had it behind a flag and removed it, and SpiderMonkey (Firefox) does not have it. That is why deep recursion in JS needs a trampoline. In production code, don't rely on tail recursion unless you know exactly how many calls there will be.",
    },
    {
      type: 'text',
      ru: "Далее в разделе рекурсии мы будем использовать приёмы, при помощи которых можно безопасно использовать рекурсию в продакшен-коде без подсчёта количества вызовов.",
      en: "Further on in the recursion section we will use techniques that let you safely use recursion in production code without counting the number of calls.",
    },
    {
      type: 'text',
      ru: "Так как же нам освободить стек вызовов без его переполнения в продакшен-коде?",
      en: "So how do we free up the call stack without overflowing it in production code?",
    },
    {
      type: 'text',
      ru: "1. Сделать код асинхронным, не блокировать поток и освобождать стек",
      en: "1. Make the code asynchronous, avoid blocking the thread, and free up the stack",
    },
    {
      type: 'text',
      ru: "2. Использовать трамплин. Thunk («санка») — функция без аргументов, которая откладывает вычисление; трамплин — цикл, который вызывает thunk'и, пока результат — функция. Рекурсивные вызовы превращаются в цикл, и стек не растёт.",
      en: "2. Use a trampoline. A thunk is a function with no arguments that defers a computation; a trampoline is a loop that keeps calling thunks while the result is a function. The recursive calls turn into a loop, so the stack does not grow.",
    },
    {
      type: 'code',
      code: {
        ru: `// === 1. Асинхронный вызов рекурсии ====

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
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // запланирует через таймер sum ([4, 3, 5], 0 + 4.5, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([4, 3, 5], 4.5, (total) => console.log(total)) // запланирует через таймер sum ([3, 5], 4.5 + 4, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([3, 5], 8.5, (total) => console.log(total)) // запланирует через таймер sum ([5], 8.5 + 3, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([5], 11.5, (total) => console.log(total)) // запланирует через таймер sum ([], 11.5 + 5, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([], 16.5, (total) => console.log(total)) // вызовет callback с result

// Минусы этого подхода
// Скорость выполнения (производительность) низкая
// Если вам нужны длительные синхронные вычисления,
// то лучше вынести их в веб-воркер, в отдельный поток,
// при условии, что у процессора больше одного ядра`,
        en: `// === 1. Асинхронный вызов рекурсии ====

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
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // запланирует через таймер sum ([4, 3, 5], 0 + 4.5, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([4, 3, 5], 4.5, (total) => console.log(total)) // запланирует через таймер sum ([3, 5], 4.5 + 4, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([3, 5], 8.5, (total) => console.log(total)) // запланирует через таймер sum ([5], 8.5 + 3, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([5], 11.5, (total) => console.log(total)) // запланирует через таймер sum ([], 11.5 + 5, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([], 16.5, (total) => console.log(total)) // вызовет callback с result

// Минусы этого подхода
// Скорость выполнения (производительность) низкая
// Если вам нужны длительные синхронные вычисления,
// то лучше вынести их в веб-воркер, в отдельный поток,
// при условии, что у процессора больше одного ядра`,
      },
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
      ru: "3. Внутри она один раз вызывает основную функцию с этими аргументами.",
      en: "3. Inside, it calls the main function once with these arguments.",
    },
    {
      type: 'text',
      ru: "4. Пока возвращаемое значение — функция, трамплин в цикле вызывает её. Как только результат не функция, цикл останавливается и трамплин возвращает результат.",
      en: "4. While the returned value is a function, the trampoline calls it in a loop. As soon as the result is not a function, the loop stops and the trampoline returns the result.",
    },
    {
      type: 'text',
      ru: "5. Основная функция в базовом случае должна возвращать результат.",
      en: "5. In the base case the main function must return a result.",
    },
    {
      type: 'text',
      ru: "6. Основная функция в рекурсивном случае должна обязательно возвращать функцию без аргументов (thunk), которая делает следующий шаг.",
      en: "6. In the recursive case the main function must return a function with no arguments (a thunk) that performs the next step.",
    },
    {
      type: 'code',
      code: {
        ru: `// === Рекурсия через трамплин ====

// обратите внимание: первым вызовом передаём функцию,
// а вторым — её аргументы, и тогда запускается вычисление
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  // запускаем функцию с переданными аргументами
  let result = fn(...args)

  // крутим цикл, пока функция
  // возвращает другую функцию
  while (typeof result == 'function') {
    // результат вызова сохраняем в переменную
    // и проверяем что оно вернуло
    // result() *** запомните эту метку, дальше покажем, что это за функция
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

  // внимание: тут обязательно возвращаем функцию без аргументов (thunk)
  // метка *** именно её трамплин вызывает внутри цикла
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
console.log (sumTrampoline ([4.5, 4, 3, 5], 0)) // 16.5`,
        en: `// === Рекурсия через трамплин ====

// обратите внимание: первым вызовом передаём функцию,
// а вторым — её аргументы, и тогда запускается вычисление
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  // запускаем функцию с переданными аргументами
  let result = fn(...args)

  // крутим цикл, пока функция
  // возвращает другую функцию
  while (typeof result == 'function') {
    // результат вызова сохраняем в переменную
    // и проверяем что оно вернуло
    // result() *** запомните эту метку, дальше покажем, что это за функция
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

  // внимание: тут обязательно возвращаем функцию без аргументов (thunk)
  // метка *** именно её трамплин вызывает внутри цикла
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
console.log (sumTrampoline ([4.5, 4, 3, 5], 0)) // 16.5`,
      },
    },
    {
      type: 'code',
      pseudo: true,
      code: {
        ru: `// давайте теперь визуализируем вызовы
// логика внутри трамплина для sumTrampoline ([4.5, 4, 3, 5], 0)

//  === первый вызов, до цикла =====
let result = sum ([4.5, 4, 3, 5], 0)
// вернет в result () => sum ([4, 3, 5], 0 + 4.5)
// =======================

//  === цикл while: каждая итерация вызывает одну функцию =====
result = result () // вызывает sum ([4, 3, 5], 4.5)
// вернет в result () => sum ([3, 5], 4.5 + 4)

result = result () // вызывает sum ([3, 5], 8.5)
// вернет в result () => sum ([5], 8.5 + 3)

result = result () // вызывает sum ([5], 11.5)
// вернет в result () => sum ([], 11.5 + 5)

result = result () // вызывает sum ([], 16.5)
// вернет в result 16.5, это уже не функция, и цикл завершается
// =======================

//  === выход из трамплина =====
return result // 16.5
// =======================


// визуализация через схему
// это как связный список функций, который заранее не готов,
// а формируется в процессе: следующий элемент появляется,
// когда вызывают предыдущий
[
  sum ([4.5, 4, 3, 5], 0), // первый вызов let result = fn(...args)
  () => sum ([4, 3, 5], 4.5), // result = result() внутри цикла
  () => sum ([3, 5], 8.5), // result = result() внутри цикла
  () => sum ([5], 11.5), // result = result() внутри цикла
  () => sum ([], 16.5), // result = result() внутри цикла
  16.5 // цикл завершается return result
]`,
        en: `// давайте теперь визуализируем вызовы
// логика внутри трамплина для sumTrampoline ([4.5, 4, 3, 5], 0)

//  === первый вызов, до цикла =====
let result = sum ([4.5, 4, 3, 5], 0)
// вернет в result () => sum ([4, 3, 5], 0 + 4.5)
// =======================

//  === цикл while: каждая итерация вызывает одну функцию =====
result = result () // вызывает sum ([4, 3, 5], 4.5)
// вернет в result () => sum ([3, 5], 4.5 + 4)

result = result () // вызывает sum ([3, 5], 8.5)
// вернет в result () => sum ([5], 8.5 + 3)

result = result () // вызывает sum ([5], 11.5)
// вернет в result () => sum ([], 11.5 + 5)

result = result () // вызывает sum ([], 16.5)
// вернет в result 16.5, это уже не функция, и цикл завершается
// =======================

//  === выход из трамплина =====
return result // 16.5
// =======================


// визуализация через схему
// это как связный список функций, который заранее не готов,
// а формируется в процессе: следующий элемент появляется,
// когда вызывают предыдущий
[
  sum ([4.5, 4, 3, 5], 0), // первый вызов let result = fn(...args)
  () => sum ([4, 3, 5], 4.5), // result = result() внутри цикла
  () => sum ([3, 5], 8.5), // result = result() внутри цикла
  () => sum ([5], 11.5), // result = result() внутри цикла
  () => sum ([], 16.5), // result = result() внутри цикла
  16.5 // цикл завершается return result
]`,
      },
    },
  ],
}

export default lesson
