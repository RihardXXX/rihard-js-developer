import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'partial-application',
  title: { ru: "Частичное применение", en: "Partial application" },
  blocks: [
    {
      type: 'text',
      ru: "Частичное применение — это один из приёмов, используемых в функциональном программировании, при котором часть аргументов функции фиксируется заранее и получается новая функция, которая ждёт остальные аргументы.",
      en: "Partial application is one of the techniques used in functional programming, in which some of a function's arguments are fixed in advance, producing a new function that waits for the remaining arguments.",
    },
    {
      type: 'text',
      ru: "Частичное применение очень похоже на каррирование, но есть отличия.",
      en: "Partial application is very similar to currying, but there are differences.",
    },
    {
      type: 'text',
      ru: "1. Частичное применение фиксирует часть аргументов за один шаг: получается функция, которой оставшиеся аргументы передают одним вызовом, и она сразу вычисляет результат. Каррированная функция возвращает новую функцию после каждого вызова, пока не получит все аргументы.",
      en: "1. Partial application fixes some of the arguments in one step: the result is a function that takes the remaining arguments in a single call and immediately computes the result. A curried function returns a new function after each call until it has received all of its arguments.",
    },
    {
      type: 'text',
      ru: "2. Количество аргументов, передаваемых в функцию при частичном применении, может быть несколько, а в классическом каррировании обычно одно.",
      en: "2. The number of arguments passed to the function in partial application can be several, whereas in classic currying it is usually one.",
    },
    {
      type: 'code',
      code: {
        ru: `//  пример функции с частичным применением
// partialSumA :: Number -> (Number, Number) -> Number
const partialSumA = (a) => (b, c) => a + b + c
// partialSumB :: (Number, Number) -> Number -> Number
const partialSumB = (a, b) => (c) => a + b + c

// давайте теперь вызовем эти функции
console.log ( partialSumA (1) (1, 1) ) // 3
console.log ( partialSumB (1, 1) (1) ) // 3

// А давайте напишем функцию, которая применяет
// частичное применение к любой обычной функции

// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => {

  // количество параметров у исходной функции
  const lengthArgs = fn.length

  // возвращаемая функция
  const innerPartial = (...firstArgs) => {
    // если количество входящих аргументов
    // больше или равно количеству параметров fn,
    // значит, её можно вызвать сразу
    if (firstArgs.length >= lengthArgs) {
      return fn (...firstArgs)
    }

    // иначе мы вторым вызовом
    // запускаем функцию в любом случае
    return (...secondArgs) => fn (...firstArgs, ...secondArgs)
  }

  return innerPartial
}

// можем применить нашу функцию
// которая применяет частичное применение
// к любой функции

// sum :: (Number, Number, Number) -> Number
const sum = (a, b, c) => a + b + c

// получаем функцию, которой аргументы можно передать в два вызова
const sumPartial = partial (sum)

// теперь мы можем вызывать возвращенную функцию
console.log ( sumPartial (1) (1, 1) ) // 3
console.log ( sumPartial (1, 1) (1) ) // 3`,
        en: `//  example of functions with partial application
// partialSumA :: Number -> (Number, Number) -> Number
const partialSumA = (a) => (b, c) => a + b + c
// partialSumB :: (Number, Number) -> Number -> Number
const partialSumB = (a, b) => (c) => a + b + c

// now let's call these functions
console.log ( partialSumA (1) (1, 1) ) // 3
console.log ( partialSumB (1, 1) (1) ) // 3

// Now let's write a function that applies
// partial application to any regular function

// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => {

  // number of parameters of the original function
  const lengthArgs = fn.length

  // the returned function
  const innerPartial = (...firstArgs) => {
    // if the number of incoming arguments
    // is greater than or equal to the number of fn's parameters,
    // we can call it right away
    if (firstArgs.length >= lengthArgs) {
      return fn (...firstArgs)
    }

    // otherwise the second call
    // runs the function no matter what
    return (...secondArgs) => fn (...firstArgs, ...secondArgs)
  }

  return innerPartial
}

// we can use our function
// that applies partial application
// to any function

// sum :: (Number, Number, Number) -> Number
const sum = (a, b, c) => a + b + c

// we get a function whose arguments can be passed in two calls
const sumPartial = partial (sum)

// now we can call the returned function
console.log ( sumPartial (1) (1, 1) ) // 3
console.log ( sumPartial (1, 1) (1) ) // 3`,
      },
    },
  ],
}

export default lesson
