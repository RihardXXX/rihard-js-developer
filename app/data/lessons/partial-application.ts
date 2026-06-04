import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'partial-application',
  title: { ru: "Частичное применение", en: "Partial application" },
  blocks: [
    {
      type: 'text',
      ru: "Частичное применение — это один из приёмов, используемых в функциональном программировании, при котором вычисление функции происходит только при полном получении всех аргументов.",
      en: "Partial application is one of the techniques used in functional programming, in which the function is evaluated only once all of its arguments have been supplied.",
    },
    {
      type: 'text',
      ru: "Частичное применение очень похоже на каррирование, но есть отличия.",
      en: "Partial application is very similar to currying, but there are differences.",
    },
    {
      type: 'text',
      ru: "1. При частичном применении количество отложенных вызовов обычно не больше двух.",
      en: "1. With partial application the number of deferred calls is usually no more than two.",
    },
    {
      type: 'text',
      ru: "2. Количество аргументов, передаваемых в функцию при частичном применении, может быть несколько, а в классическом каррировании обычно одно.",
      en: "2. The number of arguments passed to the function in partial application can be several, whereas in classic currying it is usually one.",
    },
    {
      type: 'code',
      code: `//  пример функции с частичным применением
// partialSumA :: Number -> Number -> Number -> Number
const partialSumA = (a) => (b, c) => a + b + c
// partialSumB :: Number -> Number -> Number -> Number
const partialSumB = (a, b) => (c) => a + b + c

// давайте теперь вызовем эти функции
console.log ( partialSumA (1) (1, 1) ) // 3
console.log ( partialSumB (1, 1) (1) ) // 3

// А давайте напишем функцию, которая применяет
// частичное применение к любой обычной функции

// ((a, b, c, …, n) → x) → [a, b, c, …] → ((d, e, f, …, n) → x)
// partial:: (a -> b) -> (a ->b)
const partial = (fn) => {

  // количество аргументов у вызываемой функции
  const lengthArgs = fn.length

  // возвращаемая функция
  const innerPartial = (...firstArgs) => {
    // если количество входящих аргументов
    // больше или равно чем у функции вызывающей
    // значит сразу можно ее вызвать
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

// sum :: Number -> Number -> Number -> Number
const sum = (a, b, c) => a + b + c

// возвращаем функцию с супер способностями )
const sumPartial = partial (sum)

// теперь мы можем вызывать возвращенную функцию
console.log ( sumPartial (1) (1, 1) ) // 3
console.log ( sumPartial (1, 1) (1) ) // 3`,
    },
  ],
}

export default lesson
