import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'recursion',
  title: { ru: "Рекурсия", en: "Recursion" },
  goal: {
    ru: "Научиться писать рекурсивные функции с базовым и рекурсивным случаем и понять, почему глубокая рекурсия в JS переполняет стек и как этого избежать с помощью трамплина.",
    en: "Learn to write recursive functions with a base case and a recursive case, and understand why deep recursion in JS overflows the stack and how a trampoline avoids it.",
  },
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
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Базовый случай. Это логика, при которой рекурсия должна прекращаться. Базовое условие, которое прекращает вызов функцией самой себя.",
          en: "The base case. This is the logic at which the recursion must stop — the base condition that stops the function from calling itself.",
        },
        {
          ru: "Рекурсивный случай. Это логика, при которой функция вызывает саму себя, обычно с небольшими изменениями в аргументах.",
          en: "The recursive case. This is the logic in which the function calls itself, usually with small changes to the arguments.",
        },
      ],
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
// recurAgeAverage :: ([a], Number, Number) -> Number
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
        en: `// our goal is to get the average age of the users

// ================================
// declarative style without recursion

// list of users
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// pipe from the "Function composition" lesson: passes each function's result to the next one
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

// getAgeAverage :: [a] -> Number
const getAgeAverage = (users) => pipe (
  (users) => [
    users.reduce ((init, { age }) => init + age, 0),
    users.length
    ], // get the total age and the number of users
  ([allAges, quantity]) => Math.round (allAges / quantity), // compute the average age
  console.log // log the result
) (users)

fetchAllUsers().then(getAgeAverage)
// ================================

// Recursive example
// ================================
// this recursive function is written with a tail call:
// the sum accumulates in the arguments, and in the base case the function
// returns the result right away, with no computation on the way back
// but we'll talk about that later

// now let's do the same thing with recursion
// recurAgeAverage :: ([a], Number, Number) -> Number
const recurAgeAverage = (
    users, // array of user data
    sumAges = 0, // sum of the users' ages
    quantityUsers = users.length // initial number of users
  ) => {

  // base case, the exit condition:
  // the array is already empty
  if (!users.length) {
    // divide the sum of all ages by the number of users
    // to get the average age of the users
    return sumAges / quantityUsers
  }

  // recursive case: the function calls itself
  // while the array still has elements
  return recurAgeAverage (
      users.slice(1), // the array without its first element
      sumAges = sumAges + users[0]?.age, // add up each user's age
      quantityUsers // pass along the previously saved number of users
    )
}
// ================================

// Let's rewrite our function as a one-liner and call it
const recurAgeAverageF = (users, sumAges = 0, quantityUsers = users.length) =>
                          !users.length
                              ? sumAges / quantityUsers
                              : recurAgeAverageF (
                                  users.slice(1),
                                  sumAges = sumAges + users[0]?.age,
                                  quantityUsers
                                )

// the semicolon before the parenthesis is required: without it JS joins
// this parenthesis to the expression above and tries to call its result
;( async () => {
  const users = await fetchAllUsers () // get the list of users
  const averageAge = recurAgeAverageF (users) // get the average age recursively
  console.log (averageAge) // log the result: 25.25
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
        en: `// Our goal is to get the total rating of the users,
// that is, the sum of their ratings

const users = [
  { name: 'John', rating: 4.5 },
  { name: 'Angel', rating: 4 },
  { name: 'Michel', rating: 3 },
  { name: 'Anna', rating: 5 },
]

// sumRating :: [a] -> Number
const sumRating = (users) => {
  // base case, the exit condition: the array is empty
  if (!users.length) {
    return 0
  }

  // recursive case:
  // the rating of the first element is added
  // to the call of the same function on the array without that element
  return users[0].rating + sumRating (users.slice(1))
}

// let's shorten the syntax
const rateSum = (users) =>
                      !users.length
                        ? 0
                        :  users[0] + rateSum (users.slice(1))

// let's visualize the calls
// to keep it simple, use an array of numbers instead of the rating key
rateSum ([4.5, 4, 3, 5]) // returns 4.5 + rateSum ([4, 3, 5])
rateSum ([4, 3, 5]) // returns 4 + rateSum ([3, 5])
rateSum ([3, 5]) // returns 3 + rateSum ([5])
rateSum ([5]) // returns 5 + rateSum ([])
rateSum ([]) // returns 0: we reached the base case

// and here comes the key part: the calls on the stack return one by one
rateSum ([5]) // returns 5 + 0
rateSum ([3, 5]) // returns 3 + 5
rateSum ([4, 3, 5]) // returns 4 + 8
rateSum ([4.5, 4, 3, 5]) // returns 4.5 + 12
// final result: 16.5`,
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
// и глубина стека не растёт; но они работают только в строгом режиме,
// а из браузеров есть только в Safari: в V8 и SpiderMonkey их нет
// этот пример написан без 'use strict', поэтому его стек растёт везде,
// даже в Safari, так же, как без хвостового вызова`,
        en: `// === Tail recursion optimization ====
// Let's rewrite the function so that the recursive call becomes a tail call
const rateSum = (users, result = 0) => {
  // base case, the exit condition: the array is empty
  // return the second argument, where we accumulate
  // the results of all the calls
  if (!users.length) {
    return result
  }

  // recursive case, while the array has elements:
  // on each call we add to the result in the second argument
  // and keep calling, and in the base case we return the result
  // the call is in tail position: after it the function has nothing left to do
  return rateSum (users.slice(1), result = result + users[0])
}

// let's rewrite it all as a one-liner
const sum = (users, result = 0) => !users.length
                                ? result
                                : sum (users.slice(1), result = result + users[0])

// let's visualize the calls
// to keep it simple, use an array of numbers instead of the rating key
sum ([4.5, 4, 3, 5], 0) // returns sum ([4, 3, 5], 0 + 4.5)
sum ([4, 3, 5], 4.5) // returns sum ([3, 5], 4.5 + 4)
sum ([3, 5], 8.5) // returns sum ([5], 8.5 + 3)
sum ([5], 11.5) // returns sum ([], 11.5 + 5)
sum ([], 16.5) // returns result 16.5
// the calls stop here: the result is already in the accumulator,
// and there is nothing left to compute on the way back
// there are as many calls as in rateSum without the accumulator: five
// with proper tail calls the engine keeps no frames of waiting calls,
// and the stack depth does not grow; but they only work in strict mode,
// and among browsers only Safari has them: V8 and SpiderMonkey don't
// this example is written without 'use strict', so its stack grows everywhere,
// even in Safari, just as it does without a tail call`,
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
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Сделать код асинхронным, не блокировать поток и освобождать стек",
          en: "Make the code asynchronous, avoid blocking the thread, and free up the stack",
        },
        {
          ru: "Использовать трамплин. Thunk («санка») — функция без аргументов, которая откладывает вычисление; трамплин — цикл, который вызывает thunk'и, пока результат — функция. Рекурсивные вызовы превращаются в цикл, и стек не растёт.",
          en: "Use a trampoline. A thunk is a function with no arguments that defers a computation; a trampoline is a loop that keeps calling thunks while the result is a function. The recursive calls turn into a loop, so the stack does not grow.",
        },
      ],
    },
    {
      type: 'code',
      code: {
        ru: `// === 1. Асинхронный вызов рекурсии ====

// обратите внимание, что рекурсивный случай оборачивается в таймер
// sumD :: ([Number], Number, (Number -> *)) -> Undefined
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
// то лучше вынести их в веб-воркер, чтобы не блокировать основной поток;
// на многоядерном процессоре расчёт к тому же пойдёт параллельно`,
        en: `// === 1. Asynchronous recursive call ====

// note that the recursive case is wrapped in a timer
// sumD :: ([Number], Number, (Number -> *)) -> Undefined
const sumD = (users, result = 0, callback) => {

  // base case, the exit condition:
  // once the array is empty, pass the result to the callback
  if (!users.length) {
    callback (result)
    return
  }

  // the recursive case is called asynchronously,
  // through a timer, so that the stack does not overflow
  setTimeout (
    () => sumD (users.slice(1), result = result + users[0], callback),
    0
  )
}

// let's shorten it
const sum = (users, result = 0, callback) =>
  !users.length
    ? callback (result)
    : setTimeout (
        () => sum (users.slice(1), result = result + users[0], callback),
        0
      )

// let's try calling it
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // 16.5

// let's visualize the calls
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // schedules sum ([4, 3, 5], 0 + 4.5, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([4, 3, 5], 4.5, (total) => console.log(total)) // schedules sum ([3, 5], 4.5 + 4, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([3, 5], 8.5, (total) => console.log(total)) // schedules sum ([5], 8.5 + 3, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([5], 11.5, (total) => console.log(total)) // schedules sum ([], 11.5 + 5, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([], 16.5, (total) => console.log(total)) // calls callback with result

// Downsides of this approach
// Execution speed (performance) is low
// If you need long-running synchronous computations,
// it's better to move them to a web worker so they don't block the main thread;
// on a multi-core CPU the computation will also run in parallel`,
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
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Трамплин — это функция-обёртка, которая придаёт нашей основной функции особенное поведение.",
          en: "A trampoline is a wrapper function that gives our main function special behavior.",
        },
        {
          ru: "Функция-трамплин возвращает другую функцию, которая принимает аргументы.",
          en: "The trampoline function returns another function that accepts arguments.",
        },
        {
          ru: "Внутри она один раз вызывает основную функцию с этими аргументами.",
          en: "Inside, it calls the main function once with these arguments.",
        },
        {
          ru: "Пока возвращаемое значение — функция, трамплин в цикле вызывает её. Как только результат не функция, цикл останавливается и трамплин возвращает результат.",
          en: "While the returned value is a function, the trampoline calls it in a loop. As soon as the result is not a function, the loop stops and the trampoline returns the result.",
        },
        {
          ru: "Основная функция в базовом случае должна возвращать результат.",
          en: "In the base case the main function must return a result.",
        },
        {
          ru: "Основная функция в рекурсивном случае должна обязательно возвращать функцию без аргументов (thunk), которая делает следующий шаг.",
          en: "In the recursive case the main function must return a function with no arguments (a thunk) that performs the next step.",
        },
      ],
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
// sumD :: ([Number], Number) -> (Number | (() -> *))
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
// sum :: ([Number], Number) -> (Number | (() -> *))
const sum = (users, result = 0) =>
      !users.length
       ? result
       : () => sum (users.slice(1), result = result + users[0])

// протестируем код

// пропускаем нашу функцию через трамплин
const sumTrampoline = trampoline (sum)

// теперь на самом деле в цикле будут запускаться функции
console.log (sumTrampoline ([4.5, 4, 3, 5], 0)) // 16.5`,
        en: `// === Recursion via a trampoline ====

// note: the first call takes the function,
// and the second takes its arguments, which starts the computation
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  // run the function with the given arguments
  let result = fn(...args)

  // keep looping while the function
  // returns another function
  while (typeof result == 'function') {
    // store the result of the call in the variable
    // and check what it returned
    // result() *** remember this mark, we'll show later what this function is
    result = result()
  }

  // as soon as the result of the call
  // is not a function, return it
  return result
}

// let's shorten the notation
// sumD :: ([Number], Number) -> (Number | (() -> *))
const sumD = (users, result = 0) => {

  // if the array is empty, return the result
  if (!users.length) {
    return result
  }

  // note: here we must return a function with no arguments (a thunk)
  // mark *** this is the function the trampoline calls inside the loop
  return () => sumD (users.slice(1), result = result + users[0])
}

// let's rewrite the function as a one-liner
// sum :: ([Number], Number) -> (Number | (() -> *))
const sum = (users, result = 0) =>
      !users.length
       ? result
       : () => sum (users.slice(1), result = result + users[0])

// let's test the code

// pass our function through the trampoline
const sumTrampoline = trampoline (sum)

// now the functions will actually run in a loop
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
        en: `// now let's visualize the calls
// the logic inside the trampoline for sumTrampoline ([4.5, 4, 3, 5], 0)

//  === first call, before the loop =====
let result = sum ([4.5, 4, 3, 5], 0)
// puts () => sum ([4, 3, 5], 0 + 4.5) into result
// =======================

//  === while loop: each iteration calls one function =====
result = result () // calls sum ([4, 3, 5], 4.5)
// puts () => sum ([3, 5], 4.5 + 4) into result

result = result () // calls sum ([3, 5], 8.5)
// puts () => sum ([5], 8.5 + 3) into result

result = result () // calls sum ([5], 11.5)
// puts () => sum ([], 11.5 + 5) into result

result = result () // calls sum ([], 16.5)
// puts 16.5 into result: it is no longer a function, so the loop ends
// =======================

//  === leaving the trampoline =====
return result // 16.5
// =======================


// visualized as a diagram
// it's like a linked list of functions that isn't built in advance
// but grows as we go: the next element appears
// when the previous one is called
[
  sum ([4.5, 4, 3, 5], 0), // first call: let result = fn(...args)
  () => sum ([4, 3, 5], 4.5), // result = result() inside the loop
  () => sum ([3, 5], 8.5), // result = result() inside the loop
  () => sum ([5], 11.5), // result = result() inside the loop
  () => sum ([], 16.5), // result = result() inside the loop
  16.5 // the loop ends: return result
]`,
      },
    },
  ],
  summary: [
    {
      ru: "У рекурсии два обязательных случая: базовый прекращает вызовы, а рекурсивный вызывает функцию снова, обычно с небольшими изменениями в аргументах.",
      en: "Recursion needs two cases: the base case stops the calls, and the recursive case calls the function again, usually with small changes to the arguments.",
    },
    {
      ru: "Пока вызов не завершился, его кадр лежит в стеке вызовов. Размер стека ограничен, поэтому на большом массиве синхронная рекурсия падает с переполнением стека.",
      en: "Until a call finishes, its frame stays on the call stack. The stack size is limited, so on a large array synchronous recursion fails with a stack overflow.",
    },
    {
      ru: "Хвостовой вызов не уменьшает число вызовов. Не хранить кадр вызывающей функции стандарт ES2015 требует только в строгом режиме (proper tail calls), а из браузерных движков это реализовано только в JavaScriptCore (Safari). Поэтому в продакшен-коде на хвостовую рекурсию не рассчитывают, если не знают точно, сколько будет вызовов.",
      en: "A tail call does not reduce the number of calls. ES2015 requires the engine to drop the caller's stack frame only in strict mode (proper tail calls), and among browser engines only JavaScriptCore (Safari) implements it. So production code should not rely on tail recursion unless you know exactly how many calls there will be.",
    },
    {
      ru: "Стек можно освобождать, вызывая рекурсивный шаг асинхронно через таймер: поток не блокируется, но такой код работает медленно.",
      en: "You can free the stack by running the recursive step asynchronously through a timer: the thread is not blocked, but such code is slow.",
    },
    {
      ru: "Трамплин работает синхронно: в рекурсивном случае функция возвращает thunk — функцию без аргументов со следующим шагом, а трамплин вызывает такие функции в цикле, пока результат — функция. Стек при этом не растёт.",
      en: "A trampoline works synchronously: in the recursive case the function returns a thunk, a function with no arguments holding the next step, and the trampoline calls these functions in a loop while the result is a function. The stack does not grow.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Напишите рекурсивную функцию flatten, которая превращает массив с вложенными массивами любой глубины в плоский массив, не используя встроенный метод flat. Сначала определите базовый случай, затем рекурсивный: что делать, если первый элемент сам массив, и что — если нет.",
        en: "Write a recursive function flatten that turns an array with nested arrays of any depth into a flat array, without using the built-in flat method. Define the base case first, then the recursive case: what to do when the first element is itself an array, and what to do when it is not.",
      },
      starter: {
        ru: `// flatten :: [*] -> [*]
const flatten = (arr) => {
  // ваш код
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`,
        en: `// flatten :: [*] -> [*]
const flatten = (arr) => {
  // your code
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`,
      },
      solution: {
        ru: `// flatten :: [*] -> [*]
const flatten = (arr) => {
  // базовый случай: пустой массив разворачивать нечего
  if (!arr.length) {
    return []
  }

  const [head, ...tail] = arr

  // рекурсивный случай: вложенный массив разворачиваем той же функцией,
  // обычное значение оставляем как есть, а хвост обрабатываем дальше
  return Array.isArray(head)
    ? [...flatten(head), ...flatten(tail)]
    : [head, ...flatten(tail)]
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`,
        en: `// flatten :: [*] -> [*]
const flatten = (arr) => {
  // base case: an empty array has nothing to flatten
  if (!arr.length) {
    return []
  }

  const [head, ...tail] = arr

  // recursive case: flatten a nested array with the same function,
  // keep a plain value as is, and go on with the tail
  return Array.isArray(head)
    ? [...flatten(head), ...flatten(tail)]
    : [head, ...flatten(tail)]
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`,
      },
      expected: {
        ru: "[\n  1,\n  2,\n  3,\n  4,\n  5,\n  6\n]\n[]",
        en: "[\n  1,\n  2,\n  3,\n  4,\n  5,\n  6\n]\n[]",
      },
    },
    {
      task: {
        ru: "Функция sumTo складывает числа от 1 до n обычной рекурсией, и sumTo(100000) в Chrome и Node.js падает с RangeError: Maximum call stack size exceeded. Перепишите её для трамплина из урока: сумму копите в аккумуляторе, а в рекурсивном случае возвращайте thunk со следующим шагом. Проверьте результат на 10 и на 100 000.",
        en: "The sumTo function adds up the numbers from 1 to n with plain recursion, and sumTo(100000) fails in Chrome and Node.js with RangeError: Maximum call stack size exceeded. Rewrite it for the trampoline from the lesson: keep the sum in an accumulator, and in the recursive case return a thunk with the next step. Check the result for 10 and for 100,000.",
      },
      starter: {
        ru: `// трамплин из урока
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// обычная рекурсия: каждый вызов ждёт результат следующего
// sumTo :: Number -> Number
const sumTo = (n) => n === 0 ? 0 : n + sumTo(n - 1)

// sumToStep возвращает либо сумму, либо thunk со следующим шагом
// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) => {
  // ваш код
}

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`,
        en: `// the trampoline from the lesson
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// plain recursion: each call waits for the result of the next one
// sumTo :: Number -> Number
const sumTo = (n) => n === 0 ? 0 : n + sumTo(n - 1)

// sumToStep returns either the sum or a thunk with the next step
// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) => {
  // your code
}

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`,
      },
      solution: {
        ru: `// трамплин из урока
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) =>
  n === 0
    ? acc // базовый случай: сумма уже в аккумуляторе
    : () => sumToStep(n - 1, acc + n) // рекурсивный случай: thunk со следующим шагом

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`,
        en: `// the trampoline from the lesson
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) =>
  n === 0
    ? acc // base case: the sum is already in the accumulator
    : () => sumToStep(n - 1, acc + n) // recursive case: a thunk with the next step

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`,
      },
      expected: {
        ru: "55\n5000050000",
        en: "55\n5000050000",
      },
    },
  ],
}

export default lesson
