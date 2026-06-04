import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'pure-functions',
  title: { ru: "Чистые функции", en: "Pure functions" },
  blocks: [
    {
      type: 'text',
      ru: "Чистые функции крайне важны и обычно они идемпотентны, но не всегда. Если вам нужны сайд эффекты то группируйте их в отдельные функции и разделяйте от чистых функций. Любая программа особенно в вебе нуждается в сайд эффектах (изменение Dom дерева (tree), запросы к серверу (fetch), чтение из файла (readFile) и тп)",
      en: "Pure functions are extremely important and are usually idempotent, but not always. If you need side effects, group them into separate functions and keep them apart from pure functions. Every program, especially on the web, needs side effects (mutating the DOM tree, requests to the server (fetch), reading from a file (readFile), and so on).",
    },
    {
      type: 'code',
      code: `// НЕчистая функция
// ===============================
let user = { name: 'John', age: 25 }

const changeAge = () => user.age = 30

// мы мутируем внешнюю переменную и создаем сайд эффекты
// программа будет везти себя непредсказуемо так как с этой
// переменной могут работать несколько функций  и отловить ошибку будет сложнее
changeAge()
console.log(user) // { name: 'John', age: 30 }
// ===============================


// Такой код допустим, если мы создаем независимые модули с собственным замыканием
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
// useChangeUser :: Object -> Object
const useChangeUser = (user) => {

  let userBase = structuredClone(user) // обязательно клонируем

  const changeAge = (newAge) => userBase = ({
    ...userBase, // или structuredClone(userBase) или JSON.parse(JSON.stringify(user))
    age: newAge
  })

  // для работы снаружи с данными
  return {
    userBase,
    changeAge
  }
}
// ===============================


// А теперь давайте поправим пример выше
// ===============================
let user = { name: 'John', age: 25 }

// Чистая функция
// changeAge :: Number -> Object -> Object
const changeAge = (newAge, user) => ({
  ...user,
  age: newAge
})

//  улучшим
// или если требуется глубокое клонирование и каррирование

// changeAge :: Number -> Object -> Object
const changeAge = (newAge) => (user) => ({
  ...structuredClone(user), // или JSON.parse(JSON.stringify(user))
  age: newAge
})

// тут мы проверим все
const changedUser = changeAge (30) (user)

console.log(user) // { name: John, age: 25 } сохранил первоначальное состояние
console.log(changedUser) // { name: John, age: 30 } получили нового пользователя без сайд эффектов
// ===============================`,
    },
  ],
}

export default lesson
