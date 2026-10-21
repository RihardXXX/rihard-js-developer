import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'function-map-filter-reduce',
  title: {
    ru: "Функции map, filter, reduce",
    en: "The map, filter, and reduce functions",
  },
  blocks: [
    {
      type: 'text',
      ru: "Наиболее часто используемыми функциями в функциональном программировании и продакшен коде являются map, filter, reduce.",
      en: "The most frequently used functions in functional programming and production code are map, filter, and reduce.",
    },
    {
      type: 'text',
      ru: "Эти функции обеспечивают мощный функционал работы с данными.",
      en: "These functions provide powerful capabilities for working with data.",
    },
    {
      type: 'text',
      ru: "map --------------------",
      en: "map --------------------",
    },
    {
      type: 'text',
      ru: "Функция map возвращает новый объект того же типа данных, пропуская каждый элемент, если тип итерируемый, через функцию, которую получает в качестве аргумента. Если тип не итерируемый, то просто содержимое с данными пропускается через функцию.",
      en: "The map function returns a new object of the same data type, passing each element through the function it receives as an argument when the type is iterable. If the type is not iterable, the contained data is simply passed through the function.",
    },
    {
      type: 'text',
      ru: "Давайте реализуем функцию map различными способами.",
      en: "Let's implement the map function in several different ways.",
    },
    {
      type: 'code',
      code: {
        ru: `// каррирование и данные последним аргументом нужны,
// чтобы функции было удобно использовать в композиции
// в бесточечном стиле, не называя данные:
// pipe (mapD (f), filterD (g))

// ==== реализация декларативная ====
// mapD :: (a -> b) -> [a] -> [b]
const mapD = (fn) => (arr) => arr.map(fn)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// mapI :: (a -> b) -> [a] -> [b]
const mapI = (fn) => (arr) => {
  // массив результирующий
  // который будем возвращать
  let result = []

  for (const item of arr) {
    // каждый элемент пропускаем через
    // переданную функцию
    result.push(fn(item)) // или result = [ ...result, fn (item) ]
  }

  return result
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// mapIq :: (a -> b) -> [a] -> [b]
const mapIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    result.push(fn(arr[i], i, arr)) // или result = [ ...result, fn (arr[i], i, arr) ]
  }

  return result
}
// ===================================

// ==== реализация рекурсивная ====
// через трамплин, чтобы стек не переполнился
// надеюсь, вы прочитали раздел про рекурсию

// trampoline :: ((...args -> *) -> (...args -> *))
// вызывает функцию и, пока результат — функция (thunk),
// вызывает его снова: шаги идут в цикле, стек не растёт
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// mapR возвращает либо готовый массив,
// либо функцию без аргументов (thunk) со следующим шагом
const mapR = (fn) => (arr, i = 0, acc = []) => {

  // базовый случай
  // когда элементы закончились возвращаем аккумулятор
  if (i === arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трамплина
  // в аккумулятор кладем результат который пропустили через функцию
  // и переходим к следующему элементу
  // индекс вместо arr.slice(1) и push вместо [...acc, x]:
  // копирование массива на каждом шаге дало бы O(n²),
  // а acc создаётся заново при каждом запуске и снаружи не виден
  return () => {
    acc.push(fn (arr[i]))
    return mapR (fn) (arr, i + 1, acc)
  }
}

// mapTrampoline :: (a -> b) -> [a] -> [b]
// снаружи передаём только массив: индекс и аккумулятор внутренние
const mapTrampoline = (fn) => (arr) => trampoline (mapR (fn)) (arr)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = mapD (v => v * 2) (data)

console.log (result) // [2, 4, 6, 8, 10]
// ===================================`,
        en: `// currying and taking the data as the last argument
// make these functions easy to use in composition
// in point-free style, without naming the data:
// pipe (mapD (f), filterD (g))

// ==== declarative implementation ====
// mapD :: (a -> b) -> [a] -> [b]
const mapD = (fn) => (arr) => arr.map(fn)
// ===================================

// ==== imperative implementation ====
// without the iteration index and context
// mapI :: (a -> b) -> [a] -> [b]
const mapI = (fn) => (arr) => {
  // the resulting array
  // that we will return
  let result = []

  for (const item of arr) {
    // pass each element through
    // the given function
    result.push(fn(item)) // or result = [ ...result, fn (item) ]
  }

  return result
}
 // ===================================

// ==== imperative implementation ====
// with the iteration index and context
// mapIq :: (a -> b) -> [a] -> [b]
const mapIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    result.push(fn(arr[i], i, arr)) // or result = [ ...result, fn (arr[i], i, arr) ]
  }

  return result
}
// ===================================

// ==== recursive implementation ====
// through a trampoline, so the stack does not overflow
// I hope you have read the lesson on recursion

// trampoline :: ((...args -> *) -> (...args -> *))
// calls the function and, while the result is a function (a thunk),
// calls it again: the steps run in a loop, the stack does not grow
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// mapR returns either the finished array
// or a function with no arguments (a thunk) holding the next step
const mapR = (fn) => (arr, i = 0, acc = []) => {

  // base case
  // when the elements run out, return the accumulator
  if (i === arr.length) {
    return acc
  }

  // recursive case
  // return a function for the trampoline
  // put the result of passing the element through the function into the accumulator
  // and move on to the next element
  // an index instead of arr.slice(1) and push instead of [...acc, x]:
  // copying the array on every step would make it O(n²),
  // and acc is created anew on every run and is not visible outside
  return () => {
    acc.push(fn (arr[i]))
    return mapR (fn) (arr, i + 1, acc)
  }
}

// mapTrampoline :: (a -> b) -> [a] -> [b]
// from the outside we pass only the array: the index and the accumulator are internal
const mapTrampoline = (fn) => (arr) => trampoline (mapR (fn)) (arr)
// ===================================

// ==== run ====
const data = [1, 2, 3, 4, 5]

const result = mapD (v => v * 2) (data)

console.log (result) // [2, 4, 6, 8, 10]
// ===================================`,
      },
    },
    {
      type: 'text',
      ru: "filter --------------------",
      en: "filter --------------------",
    },
    {
      type: 'text',
      ru: "Функция filter возвращает новый объект того же типа данных, пропуская каждый элемент через функцию-предикат и оставляя только те элементы, для которых предикат вернул true (тип итерируемый).",
      en: "The filter function returns a new object of the same data type, passing each element through a predicate function and keeping only the elements for which the predicate returned true (the type is iterable).",
    },
    {
      type: 'text',
      ru: "Функция-предикат — это функция, которая возвращает true или false. Обычно её передают аргументом в функцию высшего порядка, такую как filter: в JavaScript функции — значения первого класса, их можно передавать, как любые другие значения.",
      en: "A predicate is a function that returns true or false. It is usually passed as an argument to a higher-order function such as filter: in JavaScript functions are first-class values, so they can be passed around like any other value.",
    },
    {
      type: 'text',
      ru: "Давайте реализуем функцию filter различными способами.",
      en: "Let's implement the filter function in several different ways.",
    },
    {
      type: 'code',
      code: {
        ru: `// каррирование и данные последним аргументом нужны,
// чтобы функции было удобно использовать в композиции
// в бесточечном стиле, не называя данные:
// pipe (mapD (f), filterD (g))

// ==== реализация декларативная ====
// filterD :: (a -> Boolean) -> [a] -> [a]
const filterD = (fn) => (arr) => arr.filter(fn)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// filterI :: (a -> Boolean) -> [a] -> [a]
const filterI = (fn) => (arr) => {
  // массив результирующий
  // который будем возвращать
  let result = []

  for (const item of arr) {
    // каждый элемент пропускаем через
    // функцию-предикат
    // если она вернет true кладем элемент
    // в результирующий массив
    if (fn(item)) {
      result.push(item) // или result = [ ...result, item ]
    }
  }

  return result
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// filterIq :: (a -> Boolean) -> [a] -> [a]
const filterIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    const value = arr[i]

    if (fn(value, i, arr)) {
      result.push(value) // или result = [ ...result, value ]
    }

  }

  return result
}
// ===================================

// ==== реализация рекурсивная ====
// через трамплин, чтобы стек не переполнился
// надеюсь, вы прочитали раздел про рекурсию

// trampoline :: ((...args -> *) -> (...args -> *))
// вызывает функцию и, пока результат — функция (thunk),
// вызывает его снова: шаги идут в цикле, стек не растёт
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// filterR возвращает либо готовый массив,
// либо функцию без аргументов (thunk) со следующим шагом
const filterR = (fn) => (arr, i = 0, acc = []) => {

  // базовый случай
  // когда элементы закончились возвращаем аккумулятор
  if (i === arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трамплина
  return () => {
     // текущий элемент
     const head = arr[i]

     // в аккумулятор кладем элемент
     // если функция-предикат вернула true
     // иначе аккумулятор остаётся прежним
     if (fn (head)) {
       acc.push(head)
     }

     // переходим к следующему элементу
     // индекс и push вместо [head, ...tail] и [...acc, head]:
     // копирование массива на каждом шаге дало бы O(n²)
     return filterR (fn) (arr, i + 1, acc)
  }
}

// filterTrampoline :: (a -> Boolean) -> [a] -> [a]
// снаружи передаём только массив: индекс и аккумулятор внутренние
const filterTrampoline = (fn) => (arr) => trampoline (filterR (fn)) (arr)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = filterD (v => v > 3) (data)

console.log (result) // [4, 5]
// ===================================`,
        en: `// currying and taking the data as the last argument
// make these functions easy to use in composition
// in point-free style, without naming the data:
// pipe (mapD (f), filterD (g))

// ==== declarative implementation ====
// filterD :: (a -> Boolean) -> [a] -> [a]
const filterD = (fn) => (arr) => arr.filter(fn)
// ===================================

// ==== imperative implementation ====
// without the iteration index and context
// filterI :: (a -> Boolean) -> [a] -> [a]
const filterI = (fn) => (arr) => {
  // the resulting array
  // that we will return
  let result = []

  for (const item of arr) {
    // pass each element through
    // the predicate function
    // if it returns true, put the element
    // into the resulting array
    if (fn(item)) {
      result.push(item) // or result = [ ...result, item ]
    }
  }

  return result
}
 // ===================================

// ==== imperative implementation ====
// with the iteration index and context
// filterIq :: (a -> Boolean) -> [a] -> [a]
const filterIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    const value = arr[i]

    if (fn(value, i, arr)) {
      result.push(value) // or result = [ ...result, value ]
    }

  }

  return result
}
// ===================================

// ==== recursive implementation ====
// through a trampoline, so the stack does not overflow
// I hope you have read the lesson on recursion

// trampoline :: ((...args -> *) -> (...args -> *))
// calls the function and, while the result is a function (a thunk),
// calls it again: the steps run in a loop, the stack does not grow
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// filterR returns either the finished array
// or a function with no arguments (a thunk) holding the next step
const filterR = (fn) => (arr, i = 0, acc = []) => {

  // base case
  // when the elements run out, return the accumulator
  if (i === arr.length) {
    return acc
  }

  // recursive case
  // return a function for the trampoline
  return () => {
     // the current element
     const head = arr[i]

     // put the element into the accumulator
     // if the predicate function returned true,
     // otherwise the accumulator stays the same
     if (fn (head)) {
       acc.push(head)
     }

     // move on to the next element
     // an index and push instead of [head, ...tail] and [...acc, head]:
     // copying the array on every step would make it O(n²)
     return filterR (fn) (arr, i + 1, acc)
  }
}

// filterTrampoline :: (a -> Boolean) -> [a] -> [a]
// from the outside we pass only the array: the index and the accumulator are internal
const filterTrampoline = (fn) => (arr) => trampoline (filterR (fn)) (arr)
// ===================================

// ==== run ====
const data = [1, 2, 3, 4, 5]

const result = filterD (v => v > 3) (data)

console.log (result) // [4, 5]
// ===================================`,
      },
    },
    {
      type: 'text',
      ru: "reduce --------------------",
      en: "reduce --------------------",
    },
    {
      type: 'text',
      ru: "Функция reduce возвращает любой тип данных, она в качестве аргументов принимает функцию и аккумулятор.",
      en: "The reduce function can return any data type; it takes a function and an accumulator as its arguments.",
    },
    {
      type: 'text',
      ru: "Функция в качестве аргумента принимает аккумулятор (инициализации или последующих вызовов) и текущий элемент, пропускает через логику функции эти данные и возвращает новый аккумулятор или вносит в текущий аккумулятор изменения.",
      en: "As arguments, the function takes the accumulator (from the initial value or from subsequent calls) and the current element, passes this data through the function's logic, and returns a new accumulator or applies changes to the current accumulator.",
    },
    {
      type: 'text',
      ru: "Аккумулятором (значением при инициализации) может быть любое значение.",
      en: "The accumulator (the initial value) can be any value.",
    },
    {
      type: 'text',
      ru: "Функцией reduce можно сымитировать любое кастомное поведение, а также поведение map и filter. Но обычно оно используется для сбора конкретно каких-то данных по определенной логике из итерируемого типа объекта.",
      en: "With reduce you can emulate any custom behavior, as well as the behavior of map and filter. But it is usually used to collect specific data according to a particular logic from an iterable object type.",
    },
    {
      type: 'code',
      code: {
        ru: `// каррирование и данные последним аргументом нужны,
// чтобы функции было удобно использовать в композиции
// в бесточечном стиле, не называя данные:
// pipe (mapD (f), filterD (g))

// ==== реализация декларативная ====
// reduceD :: ((a, b) -> a) -> a -> [b] -> a
const reduceD = (fn) => (init) => (arr) => arr.reduce(fn, init)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// reduceI :: ((a, b) -> a) -> a -> [b] -> a
const reduceI = (fn) => (init) => (arr) => {

  // значение которое будем возвращать
  // устанавливаем ему инициализационное значение
  let accumulator = init

  for (const item of arr) {
    // вызываем функцию
    // с первым аргументом аккумулятором
    // вторым аргументом текущим элементом массива
    // результат вызова кладем в аккумулятор
    // чтобы при след вызове результат предыдущего сохранялся
    accumulator = fn (accumulator, item)
  }

  return accumulator
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// reduceIq :: ((a, b, Number, [b]) -> a) -> a -> [b] -> a
const reduceIq = (fn) => (init) => (arr) => {

  let accumulator = init

  for (let i = 0; i < arr.length; i++ ) {
    accumulator = fn (accumulator, arr[i], i, arr)
  }

  return accumulator
}
// ===================================

// ==== реализация рекурсивная ====
// через трамплин, чтобы стек не переполнился
// надеюсь, вы прочитали раздел про рекурсию

// trampoline :: ((...args -> *) -> (...args -> *))
// вызывает функцию и, пока результат — функция (thunk),
// вызывает его снова: шаги идут в цикле, стек не растёт
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// reduceR возвращает либо итоговое значение,
// либо функцию без аргументов (thunk) со следующим шагом
const reduceR = (fn) => (init) => (arr, i = 0) => {

  // базовый случай
  // когда элементы закончились возвращаем аккумулятор
  if (i === arr.length) {
    return init
  }

  // рекурсивный случай
  // возвращаем функцию для трамплина
  return () => {
     // аккумулятор который будем возвращать
     // пропускаем через функцию
     // старый аккумулятор и текущее значение
     const nextInit = fn (init, arr[i])

     // вызываем заново функцию
     // с той же функцией
     // новым аккумулятором пропущенным через функцию
     // и следующим индексом: индекс вместо [head, ...tail],
     // чтобы не копировать массив на каждом шаге
     return reduceR (fn) (nextInit) (arr, i + 1)
  }
}

// reduceTrampoline :: ((a, b) -> a) -> a -> [b] -> a
// снаружи передаём только массив: индекс внутренний
// ограничение трамплина: если итоговое значение само функция,
// трамплин примет его за следующий шаг и вызовет
const reduceTrampoline = (fn) => (init) => (arr) => trampoline (reduceR (fn) (init)) (arr)
// ===================================

// ==== запуск ====
const data = [1, 2, 3]

const result = reduceD ((a, b) => a + b) (0) (data)

console.log (result) // 6
// ===================================`,
        en: `// currying and taking the data as the last argument
// make these functions easy to use in composition
// in point-free style, without naming the data:
// pipe (mapD (f), filterD (g))

// ==== declarative implementation ====
// reduceD :: ((a, b) -> a) -> a -> [b] -> a
const reduceD = (fn) => (init) => (arr) => arr.reduce(fn, init)
// ===================================

// ==== imperative implementation ====
// without the iteration index and context
// reduceI :: ((a, b) -> a) -> a -> [b] -> a
const reduceI = (fn) => (init) => (arr) => {

  // the value we will return
  // starts with the initial value
  let accumulator = init

  for (const item of arr) {
    // call the function
    // with the accumulator as the first argument
    // and the current array element as the second
    // store the result in the accumulator
    // so the next call builds on the previous result
    accumulator = fn (accumulator, item)
  }

  return accumulator
}
 // ===================================

// ==== imperative implementation ====
// with the iteration index and context
// reduceIq :: ((a, b, Number, [b]) -> a) -> a -> [b] -> a
const reduceIq = (fn) => (init) => (arr) => {

  let accumulator = init

  for (let i = 0; i < arr.length; i++ ) {
    accumulator = fn (accumulator, arr[i], i, arr)
  }

  return accumulator
}
// ===================================

// ==== recursive implementation ====
// through a trampoline, so the stack does not overflow
// I hope you have read the lesson on recursion

// trampoline :: ((...args -> *) -> (...args -> *))
// calls the function and, while the result is a function (a thunk),
// calls it again: the steps run in a loop, the stack does not grow
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// reduceR returns either the final value
// or a function with no arguments (a thunk) holding the next step
const reduceR = (fn) => (init) => (arr, i = 0) => {

  // base case
  // when the elements run out, return the accumulator
  if (i === arr.length) {
    return init
  }

  // recursive case
  // return a function for the trampoline
  return () => {
     // the accumulator we will return:
     // pass the old accumulator and the current value
     // through the function
     const nextInit = fn (init, arr[i])

     // call the function again
     // with the same function,
     // the new accumulator
     // and the next index: an index instead of [head, ...tail],
     // so the array is not copied on every step
     return reduceR (fn) (nextInit) (arr, i + 1)
  }
}

// reduceTrampoline :: ((a, b) -> a) -> a -> [b] -> a
// from the outside we pass only the array: the index is internal
// a limitation of the trampoline: if the final value is itself a function,
// the trampoline takes it for the next step and calls it
const reduceTrampoline = (fn) => (init) => (arr) => trampoline (reduceR (fn) (init)) (arr)
// ===================================

// ==== run ====
const data = [1, 2, 3]

const result = reduceD ((a, b) => a + b) (0) (data)

console.log (result) // 6
// ===================================`,
      },
    },
  ],
}

export default lesson
