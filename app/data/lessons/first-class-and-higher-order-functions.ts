import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'first-class-and-higher-order-functions',
  title: {
    ru: "Функции первого класса и высшего порядка",
    en: "First-class and higher-order functions",
  },
  blocks: [
    {
      type: 'text',
      ru: "Функции в JavaScript могут быть как функциями первого класса, так и функциями высшего порядка.",
      en: "Functions in JavaScript can be both first-class functions and higher-order functions.",
    },
    {
      type: 'text',
      ru: "Функциями первого класса принято называть функции, которые выступают в качестве аргумента для другой функции.",
      en: "First-class functions is the term commonly used for functions that are passed as an argument to another function.",
    },
    {
      type: 'text',
      ru: "Функциями высшего порядка принято называть функции, которые принимают другие функции в качестве аргумента.",
      en: "Higher-order functions is the term commonly used for functions that accept other functions as arguments.",
    },
    {
      type: 'code',
      code: `// Простой пример
// ===============================
const data = [1, 2, 3, 4]

// эта функция первого класса
// потому что она выступает в качестве
// аргумента для другой функции
// multiply :: Number -> Number
const multiply = (v) => v * 2

// функция map это функция
// высшего порядка
// потому что принимает другую функцию
// в качестве аргумента
const result = data.map(multiply)

console.log (result) // [2, 4, 6, 8]`,
    },
    {
      type: 'text',
      ru: "Если коротко, принимающая функция это функция высшего порядка, а функция, которая попадает при вызове функции, это функция первого класса.",
      en: "In short, the receiving function is the higher-order function, and the function that is passed in when the function is called is the first-class function.",
    },
    {
      type: 'text',
      ru: "Во Vue JS и React JS компоненты сами могут выступать как функциями высшего порядка, так и функциями первого класса, так как компоненты это и есть функции.",
      en: "In Vue JS and React JS, components themselves can act as both higher-order functions and first-class functions, since components are in fact functions.",
    },
    {
      type: 'code',
      code: `// Простой пример
// ===============================

// hof :: (* -> *) -> * -> *
const hof = (fc) => (...args) => fc (...args)

// функция hof - это функция высшего порядка
// так как в качестве первого аргумента принимает
// функцию первого класса

// функция fc - функция первого класса
// так как она способна выступать в качестве
// аргумента для функции

// Пример из Vue JS
// HOF (HOC)
// Higher Order Function (Higher Order Component)
// Функция высшего порядка (Компонент высшего порядка)
// принимает в слот другой компонент
// под капотом
function MyComponent({ main, default: def } = {}) {
  const greetingMessage = 'hello'

  if (main) {
    return \`<div>main - \${ main (greetingMessage)}</div>\`
  }

  if (def) {
    return \`default - \${def(greetingMessage)}\`
  }

  return 'нет компонентов'
}

// вызов hof
const templateMain = MyComponent({
  main: (text) => \`XXX\${text}XXX\`
})

const templateDefault = MyComponent({
  default: (text) => \`\${text}\`
})

console.log(templateMain)    // main - XXXhelloXXX
console.log(templateDefault) // default - hello`,
    },
  ],
}

export default lesson
