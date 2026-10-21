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
      ru: "Функции в JavaScript — первого класса, и благодаря этому в нем можно писать функции высшего порядка.",
      en: "Functions in JavaScript are first-class, and that is what makes higher-order functions possible.",
    },
    {
      type: 'text',
      ru: "Функции первого класса — это свойство языка: функции в нем такие же значения, как числа или строки. Функцию можно присвоить переменной, передать аргументом в другую функцию и вернуть из функции.",
      en: "First-class functions are a property of the language: in it, functions are values just like numbers or strings. A function can be assigned to a variable, passed as an argument to another function, and returned from a function.",
    },
    {
      type: 'text',
      ru: "Функциями высшего порядка принято называть функции, которые принимают другие функции в качестве аргумента или возвращают функцию.",
      en: "Higher-order functions is the term commonly used for functions that accept other functions as arguments or return a function.",
    },
    {
      type: 'code',
      code: {
        ru: `// Простой пример
// ===============================
const data = [1, 2, 3, 4]

// multiply можно передать аргументом в другую функцию,
// потому что функции в JavaScript первого класса:
// это такие же значения, как числа или строки
// multiply :: Number -> Number
const multiply = (v) => v * 2

// функция map — это функция
// высшего порядка,
// потому что принимает другую функцию
// в качестве аргумента
const result = data.map(multiply)

console.log (result) // [2, 4, 6, 8]`,
        en: `// A simple example
// ===============================
const data = [1, 2, 3, 4]

// multiply can be passed as an argument to another function,
// because functions in JavaScript are first-class:
// they are values just like numbers or strings
// multiply :: Number -> Number
const multiply = (v) => v * 2

// map is a
// higher-order function,
// because it takes another function
// as an argument
const result = data.map(multiply)

console.log (result) // [2, 4, 6, 8]`,
      },
    },
    {
      type: 'text',
      ru: "Если коротко, функция, которая принимает или возвращает функцию, — это функция высшего порядка. А «первого класса» — это не роль функции в вызове, а свойство языка: в JavaScript любую функцию можно передать или вернуть, как обычное значение.",
      en: "In short, a function that takes or returns a function is a higher-order function. \"First-class\", on the other hand, is not the role a function plays in a call but a property of the language: in JavaScript any function can be passed or returned like an ordinary value.",
    },
    {
      type: 'text',
      ru: "В React функциональный компонент — это функция, поэтому компонент высшего порядка (HOC) — это функция, которая принимает компонент и возвращает новый компонент. Во Vue компонент обычно описывается объектом опций, а не функцией (обычной функцией бывает только функциональный компонент), но идея та же: компоненты и слоты передаются как значения, а слоты в render-функциях — это функции, которые получают данные и возвращают виртуальные узлы (vnodes).",
      en: "In React a function component is a function, so a higher-order component (HOC) is a function that takes a component and returns a new component. In Vue a component is usually described by an options object rather than a function (only a functional component is a plain function), but the idea is the same: components and slots are passed around as values, and in render functions slots are functions that receive data and return virtual nodes (vnodes).",
    },
    {
      type: 'code',
      code: {
        ru: `// Простой пример
// ===============================

// hof :: (* -> *) -> * -> *
const hof = (fc) => (...args) => fc (...args)

// функция hof — это функция высшего порядка:
// она принимает функцию fc и возвращает новую функцию

// fc можно передать в hof, потому что функции
// в JavaScript первого класса

// Пример в духе слотов Vue (и render props в React)
// MyComponent — функция высшего порядка: она принимает функции-слоты
// и вызывает их, передавая им данные, как scoped slot
// Это не компонент высшего порядка (HOC): HOC принимает компонент и возвращает новый компонент
// Упрощенная модель: настоящий Vue возвращает не строки, а виртуальные узлы
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

// вызов функции высшего порядка: передаем ей функции-слоты
const templateMain = MyComponent({
  main: (text) => \`XXX\${text}XXX\`
})

const templateDefault = MyComponent({
  default: (text) => \`\${text}\`
})

console.log(templateMain)    // <div>main - XXXhelloXXX</div>
console.log(templateDefault) // default - hello`,
        en: `// A simple example
// ===============================

// hof :: (* -> *) -> * -> *
const hof = (fc) => (...args) => fc (...args)

// hof is a higher-order function:
// it takes the function fc and returns a new function

// fc can be passed to hof because functions
// in JavaScript are first-class

// An example in the spirit of Vue slots (and render props in React)
// MyComponent is a higher-order function: it takes slot functions
// and calls them, passing data to them, like a scoped slot
// This is not a higher-order component (HOC): a HOC takes a component and returns a new component
// A simplified model: real Vue returns virtual nodes, not strings
function MyComponent({ main, default: def } = {}) {
  const greetingMessage = 'hello'

  if (main) {
    return \`<div>main - \${ main (greetingMessage)}</div>\`
  }

  if (def) {
    return \`default - \${def(greetingMessage)}\`
  }

  return 'no components'
}

// calling the higher-order function: we pass slot functions to it
const templateMain = MyComponent({
  main: (text) => \`XXX\${text}XXX\`
})

const templateDefault = MyComponent({
  default: (text) => \`\${text}\`
})

console.log(templateMain)    // <div>main - XXXhelloXXX</div>
console.log(templateDefault) // default - hello`,
      },
    },
  ],
}

export default lesson
