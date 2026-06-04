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
      code: `// каррирование используется, чтобы
// нам было удобно вызывать и в композиции
// также же используется классический
// бесточечный стиль

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
    // функцию первого класса
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
// с трамплина чтобы стэк не переполнился
// надеюсь вы прочитали раздел про рекурсию
// mapR :: (a -> b) -> [a] -> [b]
const mapR = (fn) => (arr, acc = []) => {

  // базовый случай
  // когда массив пуст возвращаем аккумулятор
  if (!arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трапмплина
  // вырезаем первый элемент массива
  // в аккумулятор кладем результат который пропустили через функцию
  return () => mapR (fn)
                    (
                      arr.slice(1),
                      acc = [...acc, fn (arr[0])]
                    )
}

const mapTrampoline = trampoline(mapR)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = mapD (v => v * 2) (data)

console.log (result) // [2, 4, 6, 8, 10]
// ===================================`,
    },
    {
      type: 'text',
      ru: "filter --------------------",
      en: "filter --------------------",
    },
    {
      type: 'text',
      ru: "Функция filter возвращает новый объект того же типа данных, пропуская каждый элемент через функцию предикат, которая вернет элемент в объект, если предикат вернет true (тип итерируемый).",
      en: "The filter function returns a new object of the same data type, passing each element through a predicate function that returns the element into the object if the predicate returns true (the type is iterable).",
    },
    {
      type: 'text',
      ru: "Функция предикат - это функция, которая возвращает true или false. Она обычно используется как функция первого класса, то есть кладется в другую функцию высшего порядка как filter.",
      en: "A predicate is a function that returns true or false. It is typically used as a first-class function, meaning it is passed into another higher-order function such as filter.",
    },
    {
      type: 'text',
      ru: "Давайте реализуем функцию filter различными способами.",
      en: "Let's implement the filter function in several different ways.",
    },
    {
      type: 'code',
      code: `// каррирование используется, чтобы
// нам было удобно вызывать и в композиции
// также же используется классический
// бесточечный стиль

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
    // функцию предикат
    // если она вернет true кладем ее
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
// с трамплина чтобы стэк не переполнился
// надеюсь вы прочитали раздел про рекурсию
// filterR :: (a -> Boolean) -> [a] -> [a]
const filterR = (fn) => (arr, acc = []) => {

  // базовый случай
  // когда массив пуст возвращаем аккумулятор
  if (!arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трапмплина
  return () => {
     // первый элемент и остальные
     const [head, ...tail] = arr

     // в аккумулятор кладем элемент
     // если функцию предикат вернула true
     // иначе возвращаем текущий аккумулятор
     // без добавления значения
     const nextAcc = fn (head)
                            ? [...acc, head]
                            : [...acc]

     return filterR (fn)(tail, nextAcc)
  }
}

const filterTrampoline = trampoline(filterR)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = filterD (v => v > 3) (data)

console.log (result) // [4, 5]
// ===================================`,
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
      code: `// каррирование используется, чтобы
// нам было удобно вызывать и в композиции
// также же используется классический
// бесточечный стиль

// ==== реализация декларативная ====
// reduceD :: ((a, b) → a) → a → [b] → a
const reduceD = (fn) => (init) => (arr) => arr.reduce(fn, init)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// reduceI :: ((a, b) → a) → a → [b] → a
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
// reduceIq :: ((a, b, Number, [b]) → a) → a → [b] → a
const reduceIq = (fn) => (init) => (arr) => {

  let accumulator = init

  for (let i = 0; i < arr.length; i++ ) {
    accumulator = fn (accumulator, arr[i], i, arr)
  }

  return accumulator
}
// ===================================

// ==== реализация рекурсивная ====
// с трамплина чтобы стэк не переполнился
// надеюсь вы прочитали раздел про рекурсию
// reduceR :: ((a, b) → a) → a → [b] → a
const reduceR = (fn) => (init) => (arr) => {

  // базовый случай
  // когда массив пуст возвращаем аккумулятор
  if (!arr.length) {
    return init
  }

  // рекурсивный случай
  // возвращаем функцию для трапмплина
  return () => {
     // первый элемент и остальные
     const [head, ...tail] = arr

     // аккумулятор который будем возвращать
     // пропускаем через функцию
     // старый аккумулятор и текущее значение
     const nextInit = fn (init, head)

     // вызываем заново функцию
     // со старой функций
     // новым аккумулятором пропущенным через функцию
     // и срезаем массив с данными
     return reduceR (fn) (nextInit) (tail)
  }
}

const reduceTrampoline = trampoline(reduceR)
// ===================================

// ==== запуск ====
const data = [1, 2, 3]

const result = reduceD ((a, b) => a + b) (0) (data)

console.log (result) // 6
// ===================================`,
    },
  ],
}

export default lesson
