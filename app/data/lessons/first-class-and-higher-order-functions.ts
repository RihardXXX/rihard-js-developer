import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'first-class-and-higher-order-functions',
  title: {
    ru: "Функции первого класса и высшего порядка",
    en: "First-class and higher-order functions",
  },
  description: {
    ru: "Функции первого класса как свойство JavaScript и функции высшего порядка, которые принимают или возвращают функции: map, HOC в React и слоты во Vue.",
    en: "First-class functions as a property of JavaScript, and higher-order functions that take or return functions: map, React HOCs and Vue slots.",
  },
  goal: {
    ru: "Понять разницу между функциями первого класса — свойством языка — и функциями высшего порядка, которые принимают или возвращают функции, и научиться писать свои функции высшего порядка.",
    en: "Understand the difference between first-class functions, a property of the language, and higher-order functions, which take or return functions, and learn to write your own higher-order functions.",
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
      ru: "В React компонент — это значение (функция или класс), поэтому его можно передать в функцию: компонент высшего порядка (HOC) — это функция, которая принимает компонент и возвращает новый компонент. Во Vue компонент обычно описывается объектом опций, а не функцией (обычной функцией бывает только функциональный компонент), но идея та же: компоненты и слоты передаются как значения, а слоты в render-функциях — это функции, которые получают данные и возвращают виртуальные узлы (vnodes).",
      en: "In React a component is a value (a function or a class), so it can be passed to a function: a higher-order component (HOC) is a function that takes a component and returns a new component. In Vue a component is usually described by an options object rather than a function (only a functional component is a plain function), but the idea is the same: components and slots are passed around as values, and in render functions slots are functions that receive data and return virtual nodes (vnodes).",
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
  summary: [
    {
      ru: "Функции первого класса — свойство языка: в JavaScript функции такие же значения, как числа или строки. Функцию можно присвоить переменной, передать аргументом в другую функцию и вернуть из функции.",
      en: "First-class functions are a property of the language: in JavaScript, functions are values just like numbers or strings. A function can be assigned to a variable, passed as an argument to another function, and returned from a function.",
    },
    {
      ru: "Функция высшего порядка принимает другую функцию в качестве аргумента или возвращает функцию. map — функция высшего порядка, потому что принимает другую функцию.",
      en: "A higher-order function takes another function as an argument or returns a function. map is a higher-order function because it takes another function.",
    },
    {
      ru: "«Первого класса» — это не роль функции в вызове, а свойство языка. Именно благодаря ему в JavaScript можно писать функции высшего порядка.",
      en: "\"First-class\" is not the role a function plays in a call but a property of the language. It is what makes higher-order functions possible in JavaScript.",
    },
    {
      ru: "Компонент высшего порядка (HOC) в React — функция, которая принимает компонент и возвращает новый компонент. Во Vue слоты в render-функциях — это функции, которые получают данные и возвращают виртуальные узлы.",
      en: "A higher-order component (HOC) in React is a function that takes a component and returns a new component. In Vue render functions, slots are functions that receive data and return virtual nodes.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Напишите функцию высшего порядка twice: она принимает функцию fn и возвращает новую функцию, которая применяет fn к значению дважды. Проверьте ее на add3 и double, а затем передайте в twice результат самой twice.",
        en: "Write a higher-order function twice: it takes a function fn and returns a new function that applies fn to a value twice. Check it with add3 and double, then pass the result of twice back into twice.",
      },
      starter: {
        ru: `// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// ваш код

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice вернула функцию, ее можно снова передать в twice`,
        en: `// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// your code

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice returned a function, so it can be passed to twice again`,
      },
      solution: {
        ru: `// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// принимает функцию fn и возвращает новую функцию
const twice = (fn) => (x) => fn(fn(x))

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice вернула функцию, ее можно снова передать в twice`,
        en: `// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// takes the function fn and returns a new function
const twice = (fn) => (x) => fn(fn(x))

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice returned a function, so it can be passed to twice again`,
      },
      expected: { ru: "16\n20\n48", en: "16\n20\n48" },
    },
    {
      task: {
        ru: "Напишите функцию высшего порядка withLog: она принимает имя, затем функцию и возвращает новую функцию, которая возвращает тот же результат, что и исходная, и печатает строку вида «double(1) = 2». Передайте обернутую функцию в map, как multiply в уроке.",
        en: "Write a higher-order function withLog: it takes a name, then a function, and returns a new function that returns the same result as the original one and prints a line like \"double(1) = 2\". Pass the wrapped function to map, as multiply is passed in the lesson.",
      },
      starter: {
        ru: `// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// ваш код

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`,
        en: `// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// your code

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`,
      },
      solution: {
        ru: `// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// withLog(name) принимает функцию fn и возвращает новую: тот же результат плюс строка в консоли
const withLog = (name) => (fn) => (x) => {
  const value = fn(x)
  console.log(\`\${name}(\${x}) = \${value}\`)
  return value
}

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`,
        en: `// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// withLog(name) takes the function fn and returns a new one: the same result plus a line in the console
const withLog = (name) => (fn) => (x) => {
  const value = fn(x)
  console.log(\`\${name}(\${x}) = \${value}\`)
  return value
}

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`,
      },
      expected: {
        ru: "double(1) = 2\ndouble(2) = 4\ndouble(3) = 6\n[\n  2,\n  4,\n  6\n]",
        en: "double(1) = 2\ndouble(2) = 4\ndouble(3) = 6\n[\n  2,\n  4,\n  6\n]",
      },
    },
  ],
}

export default lesson
