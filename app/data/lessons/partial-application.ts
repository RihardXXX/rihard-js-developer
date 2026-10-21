import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'partial-application',
  title: { ru: "Частичное применение", en: "Partial application" },
  goal: {
    ru: "Понять, чем частичное применение отличается от каррирования, и научиться заранее фиксировать часть аргументов функции, чтобы получать из неё новые функции.",
    en: "Understand how partial application differs from currying, and learn to fix some of a function's arguments in advance to derive new functions from it.",
  },
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
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Частичное применение фиксирует часть аргументов за один шаг: получается функция, которой оставшиеся аргументы передают одним вызовом, и она сразу вычисляет результат. Каррированная функция возвращает новую функцию после каждого вызова, пока не получит все аргументы.",
          en: "Partial application fixes some of the arguments in one step: the result is a function that takes the remaining arguments in a single call and immediately computes the result. A curried function returns a new function after each call until it has received all of its arguments.",
        },
        {
          ru: "Количество аргументов, передаваемых в функцию при частичном применении, может быть несколько, а в классическом каррировании обычно одно.",
          en: "The number of arguments passed to the function in partial application can be several, whereas in classic currying it is usually one.",
        },
      ],
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
  summary: [
    {
      ru: "Частичное применение фиксирует часть аргументов функции заранее, и получается новая функция, которая ждёт остальные аргументы.",
      en: "Partial application fixes some of a function's arguments in advance, producing a new function that waits for the remaining arguments.",
    },
    {
      ru: "Функция, полученная частичным применением, принимает оставшиеся аргументы одним вызовом и сразу вычисляет результат, а каррированная функция возвращает новую функцию после каждого вызова, пока не получит все аргументы.",
      en: "The function produced by partial application takes the remaining arguments in a single call and immediately computes the result, whereas a curried function returns a new function after each call until it has received all of its arguments.",
    },
    {
      ru: "При частичном применении в функцию можно передать сразу несколько аргументов, а в классическом каррировании обычно передают один.",
      en: "In partial application several arguments can be passed to the function at once, whereas in classic currying it is usually one.",
    },
    {
      ru: "Функция partial из урока применяет частичное применение к любой обычной функции: если аргументов хватает, она сразу вызывает функцию, иначе второй вызов запускает её в любом случае.",
      en: "The partial function from the lesson applies partial application to any regular function: if there are enough arguments, it calls the function right away; otherwise the second call runs it no matter what.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "С помощью partial зафиксируйте у функции formatMoney(currency, digits, amount) сразу два аргумента — валюту и число знаков в дробной части — и получите toUsd и toBtc. Затем получите toEur, зафиксировав только валюту: число знаков и сумму передайте ей одним вызовом. Выведите суммы из заготовки.",
        en: "Use partial to fix two arguments of formatMoney(currency, digits, amount) at once — the currency and the number of decimal places — and get toUsd and toBtc. Then get toEur by fixing only the currency: pass it the number of decimal places and the amount in a single call. Print the amounts from the starter.",
      },
      starter: {
        ru: `// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// ваш код

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`,
        en: `// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// your code

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`,
      },
      solution: {
        ru: `// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// валюта и число знаков зафиксированы одним вызовом
const toUsd = partial(formatMoney)('USD', 2)
const toBtc = partial(formatMoney)('BTC', 6)
// зафиксирована только валюта: число знаков и сумма придут одним вызовом
const toEur = partial(formatMoney)('EUR')

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`,
        en: `// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// the currency and the number of decimal places are fixed in one call
const toUsd = partial(formatMoney)('USD', 2)
const toBtc = partial(formatMoney)('BTC', 6)
// only the currency is fixed: the decimal places and the amount come in one call
const toEur = partial(formatMoney)('EUR')

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`,
      },
      expected: {
        ru: "19.90 USD\n5.00 USD\n0.001500 BTC\n7.50 EUR",
        en: "19.90 USD\n5.00 USD\n0.001500 BTC\n7.50 EUR",
      },
    },
    {
      task: {
        ru: "Сравните частичное применение и каррирование на функции volume(length, width, height). Получите volumePartial через partial и volumeCurried через curry из Ramda. Посчитайте обеими функциями объём 2 × 3 × 4: передайте сначала 2, а остальные аргументы — так, как позволяет каждая из них. Затем выведите volumePartial(2)(3) и тип значения volumeCurried(2)(3) и объясните, почему результаты разные.",
        en: "Compare partial application and currying on volume(length, width, height). Get volumePartial with partial and volumeCurried with curry from Ramda. Compute the volume 2 × 3 × 4 with both: pass 2 first and the remaining arguments the way each function allows. Then print volumePartial(2)(3) and the type of volumeCurried(2)(3), and explain why the results differ.",
      },
      starter: {
        ru: `// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

// ваш код`,
        en: `// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

// your code`,
      },
      solution: {
        ru: `// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

const volumePartial = partial(volume)
const volumeCurried = R.curry(volume)

// остальные аргументы — одним вызовом
console.log(volumePartial(2)(3, 4))
// по одному аргументу за вызов
console.log(volumeCurried(2)(3)(4))

// второй вызов partial запускает volume в любом случае:
// height = undefined, а 2 * 3 * undefined — это NaN
console.log(volumePartial(2)(3))
// каррированная функция ждёт все аргументы и пока возвращает новую функцию
console.log(typeof volumeCurried(2)(3))`,
        en: `// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

const volumePartial = partial(volume)
const volumeCurried = R.curry(volume)

// the remaining arguments in a single call
console.log(volumePartial(2)(3, 4))
// one argument per call
console.log(volumeCurried(2)(3)(4))

// the second call of partial runs volume no matter what:
// height = undefined, and 2 * 3 * undefined is NaN
console.log(volumePartial(2)(3))
// the curried function waits for all arguments and returns a new function for now
console.log(typeof volumeCurried(2)(3))`,
      },
      expected: {
        ru: "24\n24\nNaN\nfunction",
        en: "24\n24\nNaN\nfunction",
      },
    },
  ],
}

export default lesson
