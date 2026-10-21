import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'pure-functions',
  title: { ru: "Чистые функции", en: "Pure functions" },
  blocks: [
    {
      type: 'text',
      ru: "Чистые функции крайне важны. При этом чистая функция не обязательно идемпотентна: x => x + 1 чистая, но, применив ее к собственному результату, мы получим новое значение. Если вам нужны сайд эффекты, то группируйте их в отдельные функции и отделяйте от чистых функций. Любая программа, особенно в вебе, нуждается в сайд эффектах (изменение DOM дерева (tree), запросы к серверу (fetch), чтение из файла (readFile) и т. п.)",
      en: "Pure functions are extremely important. A pure function is not necessarily idempotent, though: x => x + 1 is pure, but applying it to its own result gives a new value. If you need side effects, group them into separate functions and keep them apart from pure functions. Every program, especially on the web, needs side effects (mutating the DOM tree, requests to the server (fetch), reading from a file (readFile), and so on).",
    },
    {
      type: 'code',
      code: {
        ru: `// НЕчистая функция
// ===============================
let user = { name: 'John', age: 25 }

const changeAge = () => user.age = 30

// мы мутируем внешнюю переменную и создаем сайд эффекты
// программа будет вести себя непредсказуемо, так как с этой
// переменной могут работать несколько функций, и отловить ошибку будет сложнее
changeAge()
console.log(user) // { name: 'John', age: 30 }
// ===============================`,
        en: `// An IMpure function
// ===============================
let user = { name: 'John', age: 25 }

const changeAge = () => user.age = 30

// we mutate an outer variable and create side effects
// the program will behave unpredictably, since several functions
// may work with this variable, and a bug will be harder to track down
changeAge()
console.log(user) // { name: 'John', age: 30 }
// ===============================`,
      },
    },
    {
      type: 'code',
      code: {
        ru: `// Такой код допустим, если мы создаем независимые модули с собственным замыканием
// ===============================
// useChangeUser :: Object -> Object
const useChangeUser = (user) => {

  let userBase = structuredClone(user) // обязательно клонируем

  const changeAge = (newAge) => userBase.age = newAge

  // для работы снаружи с данными
  return {
    userBase,
    changeAge
  }
}

// Но даже в этом случае лучше делать так
// useImmutableUser :: Object -> Object
const useImmutableUser = (user) => {

  let userBase = structuredClone(user) // обязательно клонируем

  const changeAge = (newAge) => userBase = ({
    ...userBase, // или structuredClone(userBase) или JSON.parse(JSON.stringify(userBase))
    age: newAge
  })

  // для работы снаружи с данными
  // getUser каждый раз отдает актуальный объект: changeAge заменяет его новым
  return {
    getUser: () => userBase,
    changeAge
  }
}

const john = useImmutableUser({ name: 'John', age: 25 })
const before = john.getUser()
john.changeAge(30)
console.log(john.getUser()) // { name: 'John', age: 30 } изменение видно снаружи
console.log(before) // { name: 'John', age: 25 } прежний объект не изменился
// ===============================`,
        en: `// Code like this is acceptable if we create independent modules with their own closure
// ===============================
// useChangeUser :: Object -> Object
const useChangeUser = (user) => {

  let userBase = structuredClone(user) // be sure to clone

  const changeAge = (newAge) => userBase.age = newAge

  // to work with the data from outside
  return {
    userBase,
    changeAge
  }
}

// But even in this case it is better to do this
// useImmutableUser :: Object -> Object
const useImmutableUser = (user) => {

  let userBase = structuredClone(user) // be sure to clone

  const changeAge = (newAge) => userBase = ({
    ...userBase, // or structuredClone(userBase) or JSON.parse(JSON.stringify(userBase))
    age: newAge
  })

  // to work with the data from outside
  // getUser always returns the current object: changeAge replaces it with a new one
  return {
    getUser: () => userBase,
    changeAge
  }
}

const john = useImmutableUser({ name: 'John', age: 25 })
const before = john.getUser()
john.changeAge(30)
console.log(john.getUser()) // { name: 'John', age: 30 } the change is visible from outside
console.log(before) // { name: 'John', age: 25 } the previous object has not changed
// ===============================`,
      },
    },
    {
      type: 'code',
      code: {
        ru: `// А теперь давайте поправим пример выше
// ===============================
let user = { name: 'John', age: 25 }

// Чистая функция
// changeAge :: (Number, Object) -> Object
const changeAge = (newAge, user) => ({
  ...user,
  age: newAge
})

//  улучшим
// или если требуется глубокое клонирование и каррирование

// changeAgeCurried :: Number -> Object -> Object
const changeAgeCurried = (newAge) => (user) => ({
  ...structuredClone(user), // или JSON.parse(JSON.stringify(user))
  age: newAge
})

// тут мы проверим все
const changedUser = changeAgeCurried (30) (user)

console.log(user) // { name: 'John', age: 25 } сохранил первоначальное состояние
console.log(changedUser) // { name: 'John', age: 30 } получили нового пользователя без побочных эффектов
// ===============================`,
        en: `// Now let's fix the example above
// ===============================
let user = { name: 'John', age: 25 }

// A pure function
// changeAge :: (Number, Object) -> Object
const changeAge = (newAge, user) => ({
  ...user,
  age: newAge
})

//  let's improve it
// in case we need deep cloning and currying

// changeAgeCurried :: Number -> Object -> Object
const changeAgeCurried = (newAge) => (user) => ({
  ...structuredClone(user), // or JSON.parse(JSON.stringify(user))
  age: newAge
})

// let's check everything here
const changedUser = changeAgeCurried (30) (user)

console.log(user) // { name: 'John', age: 25 } kept its original state
console.log(changedUser) // { name: 'John', age: 30 } we got a new user without side effects
// ===============================`,
      },
    },
  ],
}

export default lesson
