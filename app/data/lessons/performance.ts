import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'performance',
  title: { ru: "Производительность (Performance — Перфоманс)", en: "Performance" },
  blocks: [
    {
      type: 'text',
      ru: "Следует отметить, что в типичных случаях императивный код работает немного быстрее, однако разница обычно незначительна. Иногда функциональный код может показывать даже те же или лучшие результаты благодаря оптимизациям движка JavaScript. Если на одной чаше весов удобство сопровождения кода, надёжность кода, правильная архитектура, то безусловно лучше выбирать функциональный код.",
      en: "It is worth noting that in typical cases imperative code runs slightly faster, but the difference is usually negligible. Sometimes functional code can even show the same or better results thanks to optimizations in the JavaScript engine. If maintainability, reliability, and a sound architecture are on one side of the scales, then functional code is undoubtedly the better choice.",
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
      code: `// Произведем небольшие замеры
// ===============================
// функция, которая генерирует массив чисел от 1 до числа n включительно
// createArray :: Number -> [a]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// функция которая декларативно складывает числа в массиве
// sumD :: [a] -> Number
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

// вычисление дельты и логирования
console.log('Время выполнения декларативного кода ' + (endT - startT) + 'миллисекунд. Результат: ' + resultD)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// это тестирование не особо точное
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.4274640000000005миллисекунд. Результат: 5000050000
// ===============================

// только подряд сразу не тестируйте )))

// замер времени императивного кода
// ===============================
const startI = performance.now() // стартовое время
const resultI = sumN (dataNumber) // выполняемый код
const endI = performance.now() // конечное время

// вычисление дельты и логирования
console.log('Время выполнения императивного кода ' + (endI - startI) + 'миллисекунд. Результат: ' + resultI)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.2674640000000005миллисекунд. Результат: 5000050000
// 2.380783000000008миллисекунд. Результат: 5000050000
// 2.600783000000008миллисекунд. Результат: 5000050000
// ===============================

// Неожиданно даже reduce код работает быстрее ХАХА
// Это нам говорит о том создатели движков работают над этим
// Даже если мы перепишем sumN через цикл while
// оно будет иметь почти такую же скорость
// reduce уже по сути нативное решение ))
// Это не противоречие моим словам выше это просто нативное улучшение
// Наши абстракции будут чуть больше использовать`,
    },
    {
      type: 'text',
      ru: "Из вышесказанного можно сделать вывод, что нативные решения более эффективны.",
      en: "From the above we can conclude that native solutions are more efficient.",
    },
    {
      type: 'text',
      ru: "А давайте напишем небольшую утилиту для замеров. И проведём тесты скорости выполнения.",
      en: "Let's write a small utility for measurements and run some execution-speed tests.",
    },
    {
      type: 'code',
      code: `// Утилита замера скорости
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
// массив чисел 1 - 10 000
const dataNumbers = createNumberArray (100000)

// обертка для императивной функция
// и декларативной функции
// sumImperative :: ([a] -> Number) -> [a] -> (* -> Number) -> Number
const sumWrap = (fn) => (arr) => () => fn(arr)

// императивная функция складывания
const sumImperative = sumWrap (sumN) (dataNumbers)

// декларативная функция складывания
const sumDeclarative = sumWrap (sumD) (dataNumbers)

// Внимание одновременно обе функции сразу не прогоняйте
// в начале запустите одну, а потом через какое то время вторую

// замер императивной функции
const resultImperative = benchmark (sumImperative) (1000) ('замер завершён')
console.log (resultImperative) // 0.15482687300000053
// замер декларативной функции
const resultDeclarative = benchmark (sumDeclarative) (1000) ('замер завершён')
console.log (resultDeclarative) // 1.2971963320000012

// вот тут мы и выяснили, что все таки императивный код быстрее )))`,
    },
  ],
}

export default lesson
