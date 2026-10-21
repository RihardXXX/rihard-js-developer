import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'imperative-vs-declarative',
  title: { ru: "Императивность и декларативность", en: "Imperative vs declarative" },
  description: {
    ru: "Чем императивный код отличается от декларативного в JavaScript: как заменить цикл с push на filter с предикатом и поднять уровень абстракции через filterBy.",
    en: "How imperative code differs from declarative in JavaScript: swapping a loop with push for filter and a predicate, then raising the abstraction with filterBy.",
  },
  goal: {
    ru: "Понять разницу между императивным кодом, который говорит, как вы это делаете, и декларативным, который говорит, что делает код, и научиться переписывать цикл через filter и предикат.",
    en: "Understand the difference between imperative code, which tells you how you do it, and declarative code, which tells you what the code does, and learn to rewrite a loop with filter and a predicate.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Императивный код говорит вам \"как вы это делаете\". То есть Вам надо вникать в сам код.",
      en: "Imperative code tells you \"how you do it\". In other words, you have to dig into the code itself.",
    },
    {
      type: 'text',
      ru: "Декларативный код Вам говорит, что делает ваш код, он чаще модульный, и вам не нужно вникать в весь код. Если требуются изменения, вы вносите изменения в определенный участок кода модульно.",
      en: "Declarative code tells you what your code does; it is more often modular, and you do not need to dig into the whole codebase. If changes are needed, you make them in a specific section of the code in a modular way.",
    },
    {
      type: 'code',
      code: {
        ru: `// например получить все числа больше 3 из текущего массива

// Императивный код
// ========
let result = [] // массив результирующий

const numbers = [1, 2, 3, 4, 5] // текущий массив

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 3) {
    result.push(numbers[i])
  }
}

console.log(result) // 4, 5
// =========


// Декларативный код
// =========
// isGt3 :: Number -> Boolean
const isGt3 = number => number > 3

const declarativeResult = numbers.filter(isGt3) // мы не вникаем в реализацию, а просто читаем название

console.log(declarativeResult) // 4, 5 тот же результат более декларативен
// =========

// Мы можем пойти дальше и повысить уровень абстракции
// =========
// не пугайтесь, если сразу непонятно, поймете дальше

// filter :: ((a -> Boolean), [a]) -> [a]
const filter = (predicat, arr) => arr.filter(predicat)

// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicat) => (arr) => filter(predicat, arr)

// gt :: Number -> Number -> Boolean
const gt = pointer => number => number > pointer

// теперь мы создаем любые функции предикаты
// для фильтрации
// gt2 :: Number -> Boolean
const gt2 = gt(2) // предикат для фильтрации чисел больше 2
const gt3 = gt(3) // предикат для фильтрации чисел больше 3

// а вот теперь мы можем фильтровать массив по любым предикатам
const arr = [1, 2, 3, 4, 5]

const more2 = filterBy (gt2) (arr) // получаем числа больше 2
const more3 = filterBy (gt3) (arr) // получаем числа больше 3

// мы можем также главную функцию фильтрации подготовить для конвейеров
// не вызывая сразу ее
// filterByGt2 :: [a] -> [a]
const filterByGt2 = filterBy (gt2) // ожидает массива

// filterByGt2 (arr) из названия мы уже понимаем, что идет фильтрация чисел больше 2
const resultGt2 = filterByGt2 (arr) // получаем готовый результат числа больше 2
// ======`,
        en: `// for example, get all numbers greater than 3 from the array

// Imperative code
// ========
let result = [] // the resulting array

const numbers = [1, 2, 3, 4, 5] // the source array

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 3) {
    result.push(numbers[i])
  }
}

console.log(result) // 4, 5
// =========


// Declarative code
// =========
// isGt3 :: Number -> Boolean
const isGt3 = number => number > 3

const declarativeResult = numbers.filter(isGt3) // we don't dig into the implementation, we just read the name

console.log(declarativeResult) // 4, 5: the same result, but more declarative
// =========

// We can go further and raise the level of abstraction
// =========
// don't worry if it isn't clear right away, it will be later

// filter :: ((a -> Boolean), [a]) -> [a]
const filter = (predicat, arr) => arr.filter(predicat)

// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicat) => (arr) => filter(predicat, arr)

// gt :: Number -> Number -> Boolean
const gt = pointer => number => number > pointer

// now we can create any predicate functions
// for filtering
// gt2 :: Number -> Boolean
const gt2 = gt(2) // predicate that keeps numbers greater than 2
const gt3 = gt(3) // predicate that keeps numbers greater than 3

// and now we can filter an array by any predicate
const arr = [1, 2, 3, 4, 5]

const more2 = filterBy (gt2) (arr) // numbers greater than 2
const more3 = filterBy (gt3) (arr) // numbers greater than 3

// we can also prepare the main filtering function for pipelines
// without calling it right away
// filterByGt2 :: [a] -> [a]
const filterByGt2 = filterBy (gt2) // waits for an array

// filterByGt2 (arr): the name already tells us it keeps numbers greater than 2
const resultGt2 = filterByGt2 (arr) // the final result: numbers greater than 2
// ======`,
      },
    },
  ],
  summary: [
    {
      ru: "Императивный код говорит, как вы это делаете: чтобы его понять, нужно вникать в сам код.",
      en: "Imperative code tells you how you do it: to understand it, you have to dig into the code itself.",
    },
    {
      ru: "Декларативный код говорит, что он делает. Он чаще модульный, и изменения вносятся в определенный участок кода.",
      en: "Declarative code tells you what it does. It is more often modular, and changes are made in a specific section of the code.",
    },
    {
      ru: "filter с предикатом isGt3 заменяет цикл с условием и push: мы не вникаем в реализацию, а просто читаем название.",
      en: "filter with the isGt3 predicate replaces a loop with a condition and push: we don't dig into the implementation, we just read the name.",
    },
    {
      ru: "Уровень абстракции можно повысить: gt(2) создает предикат, а filterBy(gt2) — функцию фильтрации, которая ждет массив. Из названия filterByGt2 уже понятно, что она делает.",
      en: "The level of abstraction can be raised further: gt(2) creates a predicate, and filterBy(gt2) creates a filtering function that waits for an array. The name filterByGt2 already tells you what it does.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Перепишите императивный код декларативно: получите из массива words слова длиннее четырех символов с помощью filter и предиката isLonger4. Императивный вариант уже есть в заготовке, оба варианта должны вывести одно и то же.",
        en: "Rewrite the imperative code declaratively: get the words longer than four characters from the words array using filter and an isLonger4 predicate. The imperative version is already in the starter; both versions should print the same result.",
      },
      starter: {
        ru: `const words = ['map', 'filter', 'reduce', 'pipe']

// Императивный код
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Декларативный код
// isLonger4 :: String -> Boolean
// ваш код`,
        en: `const words = ['map', 'filter', 'reduce', 'pipe']

// Imperative code
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Declarative code
// isLonger4 :: String -> Boolean
// your code`,
      },
      solution: {
        ru: `const words = ['map', 'filter', 'reduce', 'pipe']

// Императивный код
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Декларативный код
// isLonger4 :: String -> Boolean
const isLonger4 = word => word.length > 4

const declarativeResult = words.filter(isLonger4) // читаем название, а не реализацию

console.log(declarativeResult) // тот же результат`,
        en: `const words = ['map', 'filter', 'reduce', 'pipe']

// Imperative code
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Declarative code
// isLonger4 :: String -> Boolean
const isLonger4 = word => word.length > 4

const declarativeResult = words.filter(isLonger4) // we read the name, not the implementation

console.log(declarativeResult) // the same result`,
      },
      expected: {
        ru: "[\n  \"filter\",\n  \"reduce\"\n]\n[\n  \"filter\",\n  \"reduce\"\n]",
        en: "[\n  \"filter\",\n  \"reduce\"\n]\n[\n  \"filter\",\n  \"reduce\"\n]",
      },
    },
    {
      task: {
        ru: "По образцу gt из урока напишите функцию divisibleBy: она принимает делитель и возвращает предикат «число делится на него без остатка». С ее помощью и filterBy получите функции filterByDivisibleBy3 и filterByDivisibleBy5 и примените их к массиву numbers.",
        en: "Following the gt example from the lesson, write a divisibleBy function: it takes a divisor and returns a predicate \"the number is divisible by it with no remainder\". Use it with filterBy to get the filterByDivisibleBy3 and filterByDivisibleBy5 functions, and apply them to the numbers array.",
      },
      starter: {
        ru: `// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
// ваш код

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
// ваш код

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`,
        en: `// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
// your code

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
// your code

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`,
      },
      solution: {
        ru: `// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
const divisibleBy = (divisor) => (number) => number % divisor === 0

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
const filterByDivisibleBy3 = filterBy(divisibleBy(3)) // ждет массив
const filterByDivisibleBy5 = filterBy(divisibleBy(5))

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`,
        en: `// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
const divisibleBy = (divisor) => (number) => number % divisor === 0

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
const filterByDivisibleBy3 = filterBy(divisibleBy(3)) // waits for an array
const filterByDivisibleBy5 = filterBy(divisibleBy(5))

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`,
      },
      expected: {
        ru: "[\n  3,\n  9,\n  15\n]\n[\n  5,\n  10,\n  15\n]",
        en: "[\n  3,\n  9,\n  15\n]\n[\n  5,\n  10,\n  15\n]",
      },
    },
  ],
}

export default lesson
