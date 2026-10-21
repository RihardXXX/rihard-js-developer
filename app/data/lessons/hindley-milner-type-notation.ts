import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'hindley-milner-type-notation',
  title: {
    ru: "Нотация типов Хиндли–Милнера",
    en: "Hindley–Milner type notation",
  },
  goal: {
    ru: "Научиться читать сигнатуры в нотации Хиндли–Милнера — какие аргументы принимает функция, что возвращает и каррирована ли она — и писать функцию по ее сигнатуре.",
    en: "Learn to read Hindley–Milner signatures — which arguments a function takes, what it returns and whether it is curried — and to write a function from its signature.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Нотацию типов Хиндли–Милнера вы уже встречали в коде. Над функциями, в блоке комментариев.",
      en: "You have already come across Hindley–Milner type notation in the code — above functions, in comment blocks.",
    },
    {
      type: 'text',
      ru: "Эта нотация типов используется в Haskell и других языках с функциональным уклоном. В JS она помогает нам писать более абстрактный код, а также помогает сопровождать этот код.",
      en: "This type notation is used in Haskell and other languages with a functional bent. In JS it helps us write more abstract code, and it also helps maintain that code.",
    },
    {
      type: 'text',
      ru: "Даёт объяснение, какие типы аргументов принимает функция и что возвращает.",
      en: "It explains which argument types a function accepts and what it returns.",
    },
    {
      type: 'code',
      code: {
        ru: `// без нотации
const foo = (a, b) => a + b

// в функции выше мы не можем понять, это функция сложения или конкатенации
//  конечно, мы можем правильно назвать функцию foo

// конечно, мы можем написать функцию вот так
const concat = (a, b) => a + b // конкатенация
const add = (a, b) => a + b // сложение

// с нотацией
// Название функции :: Тип первого аргумента -> Тип второго аргумента -> Тип результата
// так записывают каррированную функцию: она принимает аргументы по одному

// addCurried :: Number -> Number -> Number
const addCurried = (a) => (b) => a + b // сложение

// у некаррированной функции типы аргументов перечисляют в скобках через запятую
// add :: (Number, Number) -> Number
// concat :: (String, String) -> String

// map :: (a -> b) -> [a] -> [b]
const map = (mappable) => (arr) => arr.map(mappable)

// то же самое, но в более общем виде, принятом в теории категорий
// и спецификации Fantasy-land; не пугайтесь, об этом поговорим позже
// Спойлер: функтор — это любой тип, который реализовал интерфейс map
// и соблюдает его законы (о них — в уроке «Fantasy-land»),
// поэтому эта же функция map работает не только с массивом, но и с любым значением, у которого есть метод map
// читается так: для любого функтора f принимает функцию a -> b, затем f a и возвращает f b
// map :: Functor f => (a -> b) -> f a -> f b

// Как читать нотацию
// a, b, c          переменные типа: любой тип, но одна буква в пределах одной сигнатуры означает один и тот же тип
// a -> b -> c      каррированная функция: принимает a и возвращает функцию b -> c
// (a, b) -> c      некаррированная функция двух аргументов
// *                любой тип
// a | b            значение типа a или типа b
// () -> a          функция без аргументов
// ...args          любое число аргументов
// [a]              массив значений типа a
// Maybe a          значение типа a или его отсутствие
// Functor f =>     ограничение: f должен быть функтором
// f a ~> (a -> b) -> f b    ~> означает метод: он вызывается у значения типа f a, например u.map(fn)`,
        en: `// without the notation
const foo = (a, b) => a + b

// from the function above we can't tell whether it adds or concatenates
//  of course, we could give foo a proper name

// of course, we could write the functions like this
const concat = (a, b) => a + b // concatenation
const add = (a, b) => a + b // addition

// with the notation
// functionName :: FirstArgumentType -> SecondArgumentType -> ResultType
// this is how a curried function is written: it takes its arguments one at a time

// addCurried :: Number -> Number -> Number
const addCurried = (a) => (b) => a + b // addition

// for an uncurried function, the argument types are listed in parentheses, separated by commas
// add :: (Number, Number) -> Number
// concat :: (String, String) -> String

// map :: (a -> b) -> [a] -> [b]
const map = (mappable) => (arr) => arr.map(mappable)

// the same thing, but in the more general form used in category theory
// and the Fantasy-land specification; don't worry, we will get to that later
// Spoiler: a functor is any type that implements the map interface
// and obeys its laws (more on them in the "Fantasy-land" lesson),
// so this same map function works not only with an array but with any value that has a map method
// it reads like this: for any functor f, it takes a function a -> b, then f a, and returns f b
// map :: Functor f => (a -> b) -> f a -> f b

// How to read the notation
// a, b, c          type variables: any type, but within a single signature, the same letter always means the same type
// a -> b -> c      a curried function: takes a and returns a function b -> c
// (a, b) -> c      an uncurried function of two arguments
// *                any type
// a | b            a value of type a or of type b
// () -> a          a function with no arguments
// ...args          any number of arguments
// [a]              an array of values of type a
// Maybe a          a value of type a, or its absence
// Functor f =>     a constraint: f must be a functor
// f a ~> (a -> b) -> f b    ~> denotes a method: it is called on a value of type f a, e.g. u.map(fn)`,
      },
    },
  ],
  summary: [
    {
      ru: "Нотация Хиндли–Милнера в комментарии над функцией объясняет, какие типы аргументов функция принимает и что возвращает. В JS она помогает писать более абстрактный код и сопровождать его.",
      en: "Hindley–Milner notation in a comment above a function explains which argument types the function accepts and what it returns. In JS it helps write more abstract code and maintain it.",
    },
    {
      ru: "По коду (a, b) => a + b не понять, складывает функция числа или склеивает строки. Сигнатуры add :: (Number, Number) -> Number и concat :: (String, String) -> String это говорят.",
      en: "From the code (a, b) => a + b you can't tell whether the function adds numbers or concatenates strings. The signatures add :: (Number, Number) -> Number and concat :: (String, String) -> String tell you.",
    },
    {
      ru: "a -> b -> c — каррированная функция: принимает a и возвращает функцию b -> c. У некаррированной функции типы аргументов перечисляют в скобках через запятую: (a, b) -> c.",
      en: "a -> b -> c is a curried function: it takes a and returns a function b -> c. For an uncurried function, the argument types are listed in parentheses, separated by commas: (a, b) -> c.",
    },
    {
      ru: "a, b, c — переменные типа: любой тип, но одна буква в пределах одной сигнатуры означает один и тот же тип. [a] — массив значений типа a, Maybe a — значение типа a или его отсутствие.",
      en: "a, b, c are type variables: any type, but within a single signature the same letter always means the same type. [a] is an array of values of type a, Maybe a is a value of type a or its absence.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Напишите функции по сигнатурам из заготовки. between принимает нижнюю границу, верхнюю границу и число и отвечает, лежит ли число между ними включительно. countWhere принимает предикат и массив и возвращает, сколько элементов подходят под предикат. По сигнатуре between видно, что between(18)(65) — уже предикат Number -> Boolean.",
        en: "Write the functions from the signatures in the starter. between takes a lower bound, an upper bound and a number, and tells whether the number lies between them, inclusive. countWhere takes a predicate and an array and returns how many elements match the predicate. The signature of between shows that between(18)(65) is already a Number -> Boolean predicate.",
      },
      starter: {
        ru: `// between :: Number -> Number -> Number -> Boolean
// ваш код

// countWhere :: (a -> Boolean) -> [a] -> Number
// ваш код

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`,
        en: `// between :: Number -> Number -> Number -> Boolean
// your code

// countWhere :: (a -> Boolean) -> [a] -> Number
// your code

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`,
      },
      solution: {
        ru: `// between :: Number -> Number -> Number -> Boolean
const between = (min) => (max) => (x) => x >= min && x <= max

// countWhere :: (a -> Boolean) -> [a] -> Number
const countWhere = (predicate) => (arr) => arr.filter(predicate).length

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
// два аргумента из трех переданы: осталась функция Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`,
        en: `// between :: Number -> Number -> Number -> Boolean
const between = (min) => (max) => (x) => x >= min && x <= max

// countWhere :: (a -> Boolean) -> [a] -> Number
const countWhere = (predicate) => (arr) => arr.filter(predicate).length

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
// two of the three arguments are passed: what is left is a function Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`,
      },
      expected: { ru: "3\nfunction", en: "3\nfunction" },
    },
    {
      task: {
        ru: "Сигнатура safeDivide :: Number -> Number -> Maybe Number говорит, что результата может не быть. Напишите safeDivide: она делит a на b и возвращает S.Just(частное), а если b равно нулю — S.Nothing. Затем достаньте значение с запасным 0 через S.fromMaybe, как в уроке «Функциональное программирование».",
        en: "The signature safeDivide :: Number -> Number -> Maybe Number says that there may be no result. Write safeDivide: it divides a by b and returns S.Just(quotient), or S.Nothing if b is zero. Then take the value out with a fallback of 0 using S.fromMaybe, as in the \"Functional programming\" lesson.",
      },
      starter: {
        ru: `// safeDivide :: Number -> Number -> Maybe Number
// ваш код

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`,
        en: `// safeDivide :: Number -> Number -> Maybe Number
// your code

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`,
      },
      solution: {
        ru: `// safeDivide :: Number -> Number -> Maybe Number
// Maybe Number: значение типа Number или его отсутствие
const safeDivide = (a) => (b) => b === 0 ? S.Nothing : S.Just(a / b)

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`,
        en: `// safeDivide :: Number -> Number -> Maybe Number
// Maybe Number: a value of type Number, or its absence
const safeDivide = (a) => (b) => b === 0 ? S.Nothing : S.Just(a / b)

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`,
      },
      expected: { ru: "Just (5)\nNothing\n0", en: "Just (5)\nNothing\n0" },
    },
  ],
}

export default lesson
