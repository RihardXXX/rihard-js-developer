import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'composition',
  title: {
    ru: "Композиция функций",
    en: "Function composition",
  },
  blocks: [
    {
      type: 'text',
      ru: "Композиция функций — это объединение функций в новую функцию, которая вызывает их последовательно: результат одной функции передаётся следующей.",
      en: "Function composition combines functions into a new function that calls them in sequence: the result of one function is passed to the next.",
    },
    {
      type: 'text',
      ru: "Композиция функций — это одно из фундаментальных понятий, на которых основана теория категорий.",
      en: "Function composition is one of the fundamental concepts on which category theory is based.",
    },
    {
      type: 'code',
      code: {
        ru: `// === композиция из 3 функций ===
// compose :: ((c -> z), (b -> c), (a -> b)) -> a -> z
const compose = (f3, f2, f1) => (...args) => f3(f2(f1(...args)))

// использование функции
// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Их имена
// 3. Вывести список имён в лог

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

fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
    compose( // результат бросаем в композицию функций
        console.log, // логируем результаты
        (usersActive) => usersActive.map(user => user.name), // собираем имена
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
      )
    )

// та же самая композиция, только в рамках типа Array
// не совсем классический функциональный подход
fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
      (data) => console.log(
          data
            .filter(user => user.status === 'online')
            .map(user => user.name)
        )
    )

// ===============================`,
        en: `// === composing 3 functions ===
// compose :: ((c -> z), (b -> c), (a -> b)) -> a -> z
const compose = (f3, f2, f1) => (...args) => f3(f2(f1(...args)))

// using the function
// our goal
// 1. Get the users whose status is online
// 2. Take their names
// 3. Log the list of names

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

fetchAllUsers() // simulate a request
  .then( // wait for the response
    compose( // pass the result into the composed function
        console.log, // log the results
        (usersActive) => usersActive.map(user => user.name), // collect the names
        (data) => data.filter(user => user.status === 'online'), // filter by status
      )
    )

// the same composition, but within the Array type
// not quite the classic functional approach
fetchAllUsers() // simulate a request
  .then( // wait for the response
      (data) => console.log(
          data
            .filter(user => user.status === 'online')
            .map(user => user.name)
        )
    )

// ===============================`,
      },
    },
    {
      type: 'text',
      ru: "Если вы заметили в примере выше, порядок выполнения функций был справа налево — с точки зрения математики это нормально. Но часто читателю удобнее читать код слева направо.",
      en: "If you noticed in the example above, the functions executed from right to left — mathematically that's fine. But it is often more convenient for the reader to read code from left to right.",
    },
    {
      type: 'text',
      ru: "Поэтому код выше мы можем переписать.",
      en: "So we can rewrite the code above.",
    },
    {
      type: 'code',
      code: {
        ru: `// === композиция из 3 функций в человекочитаемом формате ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), (c -> z)) -> a -> z
const pipe = (f1, f2, f3) => (...args) => f3(f2(f1(...args)))

// Теперь композицию удобнее читать слева направо

fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
    pipe( // результат бросаем в композицию функций
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
        (usersActive) => usersActive.map(user => user.name), // собираем имена
        console.log, // логируем результаты
      )
    )

// Внимание

// compose порядок выполнения функций
// 3 <- 2 <- 1

// pipe
// 1 -> 2 -> 3

// ===============================`,
        en: `// === composing 3 functions in a human-readable order ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), (c -> z)) -> a -> z
const pipe = (f1, f2, f3) => (...args) => f3(f2(f1(...args)))

// Now the composition is easier to read, left to right

fetchAllUsers() // simulate a request
  .then( // wait for the response
    pipe( // pass the result into the composed function
        (data) => data.filter(user => user.status === 'online'), // filter by status
        (usersActive) => usersActive.map(user => user.name), // collect the names
        console.log, // log the results
      )
    )

// Note

// compose: order in which the functions run
// 3 <- 2 <- 1

// pipe
// 1 -> 2 -> 3

// ===============================`,
      },
    },
    {
      type: 'text',
      ru: "А теперь представим ситуацию, когда количество функций более 3.",
      en: "Now imagine a situation where the number of functions is more than 3.",
    },
    {
      type: 'text',
      ru: "В реальных проектах используйте compose или pipe из готовых библиотек. Мы попробуем создать pipe несколькими способами: императивно, декларативно и рекурсивно.",
      en: "In real projects, use compose or pipe from existing libraries. We will try to build pipe in several ways: imperatively, declaratively and recursively.",
    },
    {
      type: 'code',
      code: {
        ru: `// === композиция функций в нестрого заданном количестве функций ===

// === Способ императивный ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (...args) => {

  // дробим массив функций на голову и хвост
  const [ head, ...tail ] = fns

  // переменная с результатом выполнения
  // первой и остальных функций и результата
  let result = head(...args)

  // в цикле вызываем остальные функции и перезаписываем результат
  // в переменную
  for (const fn of tail) {
    result = fn(result)
  }

  // возвращаем итоговый результат
  return result
}

// ===============================`,
        en: `// === composing an arbitrary number of functions ===

// === Imperative approach ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (...args) => {

  // split the array of functions into head and tail
  const [ head, ...tail ] = fns

  // variable holding the result of the first function
  // and then of each of the remaining ones
  let result = head(...args)

  // call the remaining functions in a loop and overwrite
  // the variable with each result
  for (const fn of tail) {
    result = fn(result)
  }

  // return the final result
  return result
}

// ===============================`,
      },
    },
    {
      type: 'text',
      ru: "А теперь давайте реализуем в функциональном стиле, декларативно.",
      en: "Now let's implement it in a functional style, declaratively.",
    },
    {
      type: 'code',
      code: {
        ru: `// === композиция функций в нестрого заданном количестве функций ===

// === Способ декларативный ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce(
    (init, fn) => fn(init), // накопленное значение (на первом шаге — arg) передаём в функцию
    arg // аргумент первого вызова
  )

// на первый взгляд с этой функцией всё в порядке
// и с точки зрения функционального подхода аргумент лучше и правильнее когда один
// но может быть ситуация когда при первом запуске аргументов 2 и более
const pipeMultiArgs = (...fns) => (...args) => fns.reduce(
    (init, fn, i) => i === 0 ? fn(...init) : fn(init) , // проверка первый вызов или остальные
    args // аргументы первого вызова
)

// ===============================`,
        en: `// === composing an arbitrary number of functions ===

// === Declarative approach ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce(
    (init, fn) => fn(init), // pass the accumulated value (arg on the first step) to the function
    arg // argument of the first call
  )

// at first glance this function is fine,
// and from a functional point of view a single argument is better and more correct,
// but the first call may need 2 or more arguments
const pipeMultiArgs = (...fns) => (...args) => fns.reduce(
    (init, fn, i) => i === 0 ? fn(...init) : fn(init) , // first call or a later one?
    args // arguments of the first call
)

// ===============================`,
      },
    },
    {
      type: 'text',
      ru: "Мы также можем реализовать композицию функций рекурсивно. Вызов pipe(...tail)(head(arg)) стоит в хвостовой позиции, но число вызовов от этого не уменьшается. При proper tail calls (ES2015, только в строгом режиме) хвостовой вызов не увеличивает глубину стека, но из браузерных движков это есть только в JavaScriptCore (Safari): в V8 (Chrome, Node.js) это было за флагом и удалено, в SpiderMonkey (Firefox) этого нет. Поэтому для глубокой рекурсии в JS нужен трамплин — о нём в уроке «Рекурсия». Для pipe из нескольких функций глубина стека не проблема.",
      en: "We can also implement function composition recursively. The call pipe(...tail)(head(arg)) is in tail position, but that does not reduce the number of calls. With proper tail calls (ES2015, strict mode only) a tail call does not grow the stack, but among browser engines only JavaScriptCore (Safari) implements them: V8 (Chrome, Node.js) had them behind a flag and removed them, and SpiderMonkey (Firefox) does not have them. That is why deep recursion in JS needs a trampoline — more on it in the \"Recursion\" lesson. For a pipe of a few functions, stack depth is not a problem.",
    },
    {
      type: 'code',
      code: {
        ru: `// === композиция функций в нестрого заданном количестве функций ===

// === Способ рекурсивный ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => {

  // базовый случай — одна функция осталась
  if (fns.length === 1) {
    return fns[0](arg)
  }

  // разбиваем голову и хвост
  // первая функция и остальные
  const [head, ...tail] = fns

  // рекурсивно вызываем pipe для хвоста
  // а первую функцию вызываем с аргументом текущим
  return pipe(...tail)(head(arg))
}

// ===============================`,
        en: `// === composing an arbitrary number of functions ===

// === Recursive approach ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => {

  // base case: only one function is left
  if (fns.length === 1) {
    return fns[0](arg)
  }

  // split into head and tail:
  // the first function and the rest
  const [head, ...tail] = fns

  // call pipe recursively for the tail,
  // and call the first function with the current argument
  return pipe(...tail)(head(arg))
}

// ===============================`,
      },
    },
  ],
}

export default lesson
