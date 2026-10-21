import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'hindley-milner-type-notation',
  title: {
    ru: "Нотация типов Хиндли–Милнера",
    en: "Hindley–Milner type notation",
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
}

export default lesson
