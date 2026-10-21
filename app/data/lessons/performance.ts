import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'performance',
  title: { ru: "Производительность (Performance — Перфоманс)", en: "Performance" },
  blocks: [
    {
      type: 'text',
      ru: "Следует отметить, что в микробенчмарках императивный цикл бывает в разы быстрее, но в абсолютных числах разница обычно незначительна. Иногда функциональный код может показывать даже те же или лучшие результаты благодаря оптимизациям движка JavaScript. Если на одной чаше весов удобство сопровождения кода, надёжность кода, правильная архитектура, то безусловно лучше выбирать функциональный код.",
      en: "It is worth noting that in microbenchmarks an imperative loop can be several times faster, but in absolute terms the difference is usually negligible. Sometimes functional code can even show the same or better results thanks to optimizations in the JavaScript engine. If maintainability, reliability, and a sound architecture are on one side of the scales, then functional code is undoubtedly the better choice.",
    },
    {
      type: 'text',
      ru: "За улучшение скорости работы функционального кода в первую очередь отвечают разработчики движков JavaScript. То есть разработчики движков проводят улучшения, оптимизации компилятора, сборщика мусора.",
      en: "Improving the speed of functional code is primarily the responsibility of the developers of JavaScript engines. That is, engine developers carry out improvements and optimizations of the compiler and the garbage collector.",
    },
    {
      type: 'text',
      ru: "Каждая абстракция создаёт дополнительный небольшой расход ресурсов, зачастую он не критичен.",
      en: "Every abstraction introduces a small additional resource cost, which is often not critical.",
    },
    {
      type: 'text',
      ru: "В проектах, где критически важна скорость и количество элементов достигает нескольких десятков тысяч и даже сотен тысяч при синхронном выполнении кода, и мы не можем создать отдельный поток в силу отсутствия мощностей железа, а именно свободного ядра процессора, мы можем прибегнуть к низкоуровневым императивным инструментам.",
      en: "In projects where speed is critical and the number of elements reaches several tens of thousands or even hundreds of thousands during synchronous execution, and we cannot spawn a separate thread due to a lack of hardware resources — namely a free CPU core — we can resort to low-level imperative tools.",
    },
    {
      type: 'text',
      ru: "В 98% задач скорость работы вашего приложения скорее определяется правильной логикой построения программы, а не лишней абстракцией.",
      en: "In 98% of cases the performance of your application is determined more by the correct logic of how the program is built than by an extra abstraction.",
    },
    {
      type: 'code',
      code: {
        ru: `// Произведем небольшие замеры
// ===============================
// функция, которая генерирует массив чисел от 1 до числа n включительно
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// функция которая декларативно складывает числа в массиве
// sumD :: [Number] -> Number
const sumD = (arr) => arr.reduce((acc, curr) => acc + curr)

// функция которая императивно складывает числа в массиве
const sumN = (arr) => {
  let result = 0
  const length = arr.length

  for (let i = 0; i < length; i += 1) {
    result = result + arr[i]
  }

  return result
}
// ===============================

// начнем тестировать
// ===============================
// создаем данные массив из 100 000 чисел
const dataNumber = createNumberArray (100000)

// замер времени декларативного кода
// ===============================
const startT = performance.now() // стартовое время
const resultD = sumD (dataNumber) // выполняемый код
const endT = performance.now() // конечное время

// вычисление дельты и логирование
console.log('Время выполнения декларативного кода ' + (endT - startT) + ' миллисекунд. Результат: ' + resultD)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// это тестирование не особо точное
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.4274640000000005миллисекунд. Результат: 5000050000
// ===============================

// второй замер лучше запускать отдельно, а не сразу после первого

// замер времени императивного кода
// ===============================
const startI = performance.now() // стартовое время
const resultI = sumN (dataNumber) // выполняемый код
const endI = performance.now() // конечное время

// вычисление дельты и логирование
console.log('Время выполнения императивного кода ' + (endI - startI) + ' миллисекунд. Результат: ' + resultI)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.2674640000000005миллисекунд. Результат: 5000050000
// 2.380783000000008миллисекунд. Результат: 5000050000
// 2.600783000000008миллисекунд. Результат: 5000050000
// ===============================

// Времена получились близкими, и от запуска к запуску
// впереди может оказаться любой из вариантов
// В одиночном замере движок ещё не успел прогреться и оптимизировать код,
// а на время влияют сборщик мусора и фоновые задачи
// Поэтому по одному замеру выводы делать нельзя: нужны повторы`,
        en: `// Let's take a few small measurements
// ===============================
// a function that generates an array of numbers from 1 to n inclusive
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// a function that sums the numbers in an array declaratively
// sumD :: [Number] -> Number
const sumD = (arr) => arr.reduce((acc, curr) => acc + curr)

// a function that sums the numbers in an array imperatively
const sumN = (arr) => {
  let result = 0
  const length = arr.length

  for (let i = 0; i < length; i += 1) {
    result = result + arr[i]
  }

  return result
}
// ===============================

// let's start testing
// ===============================
// create the data: an array of 100,000 numbers
const dataNumber = createNumberArray (100000)

// timing the declarative code
// ===============================
const startT = performance.now() // start time
const resultD = sumD (dataNumber) // the code being measured
const endT = performance.now() // end time

// compute the delta and log it
console.log('Declarative code run time: ' + (endT - startT) + ' milliseconds. Result: ' + resultD)
// the run time of course depends on your device and on how warmed up the hardware is
// this test is not very precise
// the main thing here is to catch the difference between imperative and declarative code
// 2.4274640000000005 milliseconds. Result: 5000050000
// ===============================

// it's better to run the second measurement separately, not right after the first one

// timing the imperative code
// ===============================
const startI = performance.now() // start time
const resultI = sumN (dataNumber) // the code being measured
const endI = performance.now() // end time

// compute the delta and log it
console.log('Imperative code run time: ' + (endI - startI) + ' milliseconds. Result: ' + resultI)
// the run time of course depends on your device and on how warmed up the hardware is
// the main thing here is to catch the difference between imperative and declarative code
// 2.2674640000000005 milliseconds. Result: 5000050000
// 2.380783000000008 milliseconds. Result: 5000050000
// 2.600783000000008 milliseconds. Result: 5000050000
// ===============================

// The times came out close, and from run to run
// either version may come out ahead
// In a single measurement the engine hasn't warmed up and optimized the code yet,
// and the garbage collector and background tasks affect the time
// So you can't draw conclusions from one measurement: you need repetitions`,
      },
    },
    {
      type: 'text',
      ru: "Из одного такого замера вывод сделать нельзя: разница в пределах погрешности. Чтобы сравнение было честнее, функцию нужно вызвать много раз и усреднить время.",
      en: "A single measurement like this proves nothing: the difference is within the margin of error. For a fairer comparison, call the function many times and average the time.",
    },
    {
      type: 'text',
      ru: "А давайте напишем небольшую утилиту для замеров. И проведём тесты скорости выполнения.",
      en: "Let's write a small utility for measurements and run some execution-speed tests.",
    },
    {
      type: 'code',
      code: {
        ru: `// Утилита замера скорости
// createNumberArray, sumN и sumD — из предыдущего блока,
// поэтому запускайте этот блок вместе с ним
// ===============================
const benchmark = (fn) => (n = 100) => (msg = '') => {
  // итоговый средний результат
  let total = 0

  // количество итераций вызова нашей функции
  for (let i = 0; i < n; i++) {
    // стартовый замер перед началом вызова функции
    const start = performance.now()

    // вызов функции
    fn()

    // аккумулируем результат дельты конечного и стартового результата
    total += performance.now() - start
  }

  console.log(msg) // текст лога

  // далее итоговое время делим на количество вызовов
  // функции и выводим среднее арифметическое
  return total / n
}

// создаем две функции
// для работы с массивом чисел
// подготовка данных
// ======================
// массив чисел 1 - 100 000
const dataNumbers = createNumberArray (100000)

// обертка для императивной функции
// и декларативной функции
// sumWrap :: ([Number] -> Number) -> [Number] -> (() -> Number)
const sumWrap = (fn) => (arr) => () => fn(arr)

// императивная функция складывания
const sumImperative = sumWrap (sumN) (dataNumbers)

// декларативная функция складывания
const sumDeclarative = sumWrap (sumD) (dataNumbers)

// Внимание одновременно обе функции сразу не прогоняйте
// в начале запустите одну, а потом через какое-то время вторую

// замер императивной функции
const resultImperative = benchmark (sumImperative) (1000) ('замер завершён')
console.log (resultImperative) // 0.15482687300000053
// замер декларативной функции
const resultDeclarative = benchmark (sumDeclarative) (1000) ('замер завершён')
console.log (resultDeclarative) // 1.2971963320000012

// в этом замере императивный цикл оказался в несколько раз быстрее reduce
// причина в накладных расходах: reduce на каждом элементе вызывает функцию-колбэк,
// а в цикле for на каждом шаге только сравнение и сложение,
// которые движок превращает в компактный машинный код
// движки умеют частично убирать такие расходы, поэтому разница зависит
// от движка, его версии и данных: микробенчмарк — ориентир, а не закон
// в абсолютных числах в замере выше это около миллисекунды на 100 000 элементов:
// заметно в горячем коде, который выполняется много раз, а в остальном обычно нет`,
        en: `// Speed measurement utility
// createNumberArray, sumN and sumD come from the previous block,
// so run this block together with it
// ===============================
const benchmark = (fn) => (n = 100) => (msg = '') => {
  // running total of the measured time
  let total = 0

  // number of times we call our function
  for (let i = 0; i < n; i++) {
    // take the start time before the call
    const start = performance.now()

    // call the function
    fn()

    // add the difference between the end and start times
    total += performance.now() - start
  }

  console.log(msg) // log message

  // then divide the total time by the number of calls
  // and return the arithmetic mean
  return total / n
}

// let's create two functions
// for working with an array of numbers
// preparing the data
// ======================
// array of numbers 1 - 100,000
const dataNumbers = createNumberArray (100000)

// a wrapper for the imperative function
// and the declarative function
// sumWrap :: ([Number] -> Number) -> [Number] -> (() -> Number)
const sumWrap = (fn) => (arr) => () => fn(arr)

// imperative summing function
const sumImperative = sumWrap (sumN) (dataNumbers)

// declarative summing function
const sumDeclarative = sumWrap (sumD) (dataNumbers)

// Note: don't run both functions at the same time
// run one first, and then the second one some time later

// measuring the imperative function
const resultImperative = benchmark (sumImperative) (1000) ('measurement finished')
console.log (resultImperative) // 0.15482687300000053
// measuring the declarative function
const resultDeclarative = benchmark (sumDeclarative) (1000) ('measurement finished')
console.log (resultDeclarative) // 1.2971963320000012

// in this measurement the imperative loop turned out several times faster than reduce
// the reason is overhead: reduce calls a callback function for every element,
// while each step of the for loop is just a comparison and an addition,
// which the engine turns into compact machine code
// engines can partly remove this overhead, so the difference depends
// on the engine, its version and the data: a microbenchmark is a guide, not a law
// in absolute terms, in the measurement above it's about a millisecond per 100,000 elements:
// noticeable in hot code that runs many times, but usually not elsewhere`,
      },
    },
  ],
}

export default lesson
