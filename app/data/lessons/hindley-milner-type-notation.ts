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
      code: `// без нотации
const foo = (a, b) => a + b

// в функции выше мы не можем понять, это функция по сложению или конкатенации
//  конечно мы можем назвать правильно функцию foo

// конечно мы можем написать функцию вот так
const concat = (a, b) => a + b // конкатенация
const add = (a, b) => a + b // сложение

// с нотацией
// Название функции :: Первый аргумент -> Второй аргумент -> Возвращаемое значение

// add :: Number -> Number -> Number
const add = (a, b) => a + b // сложение

// map :: (a -> b) -> [a] -> [b]
const map = (mappable) => (arr) => arr.map(mappable)

// тоже самое но более классический подход в рамках теории категории
// и Спецификации Fantasy-land не пугаемся об этом поговорим позже
// Тип Функтор => Принимает функцию (a значение превращает в b) -> Функтор a аргумент -> Функтор b возвращает
// Спойлер )) функтор это любой тип, который реализовал интерфейс map
// Functor f => (a → b) → f a → f b
const map = (mappable) => (arr) => arr.map(mappable)`,
    },
  ],
}

export default lesson
