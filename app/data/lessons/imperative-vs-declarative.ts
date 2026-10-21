import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'imperative-vs-declarative',
  title: { ru: "Императивность и декларативность", en: "Imperative vs declarative" },
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

// filter :: (a -> Boolean, [a]) -> [a]
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

// filter :: (a -> Boolean, [a]) -> [a]
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
}

export default lesson
