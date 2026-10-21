import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'pure-functions',
  title: { ru: "Чистые функции", en: "Pure functions" },
  description: {
    ru: "Как отличить чистую функцию от нечистой в JavaScript и вместо мутации внешних данных возвращать новый объект через spread или structuredClone.",
    en: "How to tell a pure function from an impure one in JavaScript and return a new object with spread or structuredClone instead of mutating outside data.",
  },
  goal: {
    ru: "Научиться отличать чистые функции от нечистых и переписывать нечистые так, чтобы они не мутировали внешние данные, а возвращали новое значение.",
    en: "Learn to tell pure functions from impure ones and to rewrite impure ones so that they return a new value instead of mutating outside data.",
  },
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
  summary: [
    {
      ru: "Чистая функция не обязательно идемпотентна: x => x + 1 чистая, но, применив ее к собственному результату, мы получим новое значение.",
      en: "A pure function is not necessarily idempotent: x => x + 1 is pure, but applying it to its own result gives a new value.",
    },
    {
      ru: "Любая программа, особенно в вебе, нуждается в сайд эффектах: изменение DOM, запросы к серверу, чтение из файла. Группируйте их в отдельные функции и отделяйте от чистых.",
      en: "Every program, especially on the web, needs side effects: mutating the DOM, requests to the server, reading from a file. Group them into separate functions and keep them apart from pure functions.",
    },
    {
      ru: "Функция, которая мутирует внешнюю переменную, создает сайд эффекты: с этой переменной могут работать несколько функций, и отловить ошибку будет сложнее.",
      en: "A function that mutates an outer variable creates side effects: several functions may work with that variable, and a bug will be harder to track down.",
    },
    {
      ru: "Чистая функция не меняет переданный объект, а возвращает новый: через spread, а если требуется глубокое клонирование, — через structuredClone.",
      en: "A pure function does not change the object passed to it but returns a new one: with spread, or with structuredClone if deep cloning is needed.",
    },
    {
      ru: "Даже в модуле с собственным замыканием состояние лучше заменять новым объектом, чем мутировать.",
      en: "Even in a module with its own closure, it is better to replace the state with a new object than to mutate it.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Функция addTagImpure меняет пост, который ей передали. Напишите чистую addTag: она возвращает новый пост с добавленным тегом и не трогает исходный. Учтите, что tags — вложенный массив: если скопировать только сам объект, массив останется общим.",
        en: "The addTagImpure function changes the post passed to it. Write a pure addTag: it returns a new post with the tag added and leaves the original alone. Keep in mind that tags is a nested array: if you copy only the object itself, the array stays shared.",
      },
      starter: {
        ru: `// addTagImpure :: (String, Object) -> Object
// НЕчистая: меняет пост, который ей передали
const addTagImpure = (tag, post) => {
  post.tags.push(tag)
  return post
}

// addTag :: (String, Object) -> Object
// ваш код

const post = { title: 'FP', tags: ['js'] }
const taggedPost = addTag('fp', post)

console.log(post.tags) // исходный пост не изменился
console.log(taggedPost.tags)`,
        en: `// addTagImpure :: (String, Object) -> Object
// IMpure: it changes the post passed to it
const addTagImpure = (tag, post) => {
  post.tags.push(tag)
  return post
}

// addTag :: (String, Object) -> Object
// your code

const post = { title: 'FP', tags: ['js'] }
const taggedPost = addTag('fp', post)

console.log(post.tags) // the original post has not changed
console.log(taggedPost.tags)`,
      },
      solution: {
        ru: `// addTagImpure :: (String, Object) -> Object
// НЕчистая: меняет пост, который ей передали
const addTagImpure = (tag, post) => {
  post.tags.push(tag)
  return post
}

// addTag :: (String, Object) -> Object
// Чистая: новый объект и новый массив tags, исходный пост не меняется
const addTag = (tag, post) => ({
  ...post,
  tags: [...post.tags, tag],
})

const post = { title: 'FP', tags: ['js'] }
const taggedPost = addTag('fp', post)

console.log(post.tags) // исходный пост не изменился
console.log(taggedPost.tags)`,
        en: `// addTagImpure :: (String, Object) -> Object
// IMpure: it changes the post passed to it
const addTagImpure = (tag, post) => {
  post.tags.push(tag)
  return post
}

// addTag :: (String, Object) -> Object
// Pure: a new object and a new tags array, the original post is not changed
const addTag = (tag, post) => ({
  ...post,
  tags: [...post.tags, tag],
})

const post = { title: 'FP', tags: ['js'] }
const taggedPost = addTag('fp', post)

console.log(post.tags) // the original post has not changed
console.log(taggedPost.tags)`,
      },
      expected: {
        ru: "[\n  \"js\"\n]\n[\n  \"js\",\n  \"fp\"\n]",
        en: "[\n  \"js\"\n]\n[\n  \"js\",\n  \"fp\"\n]",
      },
    },
    {
      task: {
        ru: "Результат finalPriceImpure зависит от внешней переменной discount: с тем же аргументом функция возвращает другую цену, если discount изменили. Напишите чистую finalPrice, которая получает процент скидки аргументом. Запустите код и сравните строки до и после изменения discount.",
        en: "The result of finalPriceImpure depends on the outer variable discount: with the same argument, the function returns a different price once discount has changed. Write a pure finalPrice that receives the discount percentage as an argument. Run the code and compare the lines before and after discount changes.",
      },
      starter: {
        ru: `let discount = 10

// finalPriceImpure :: Number -> Number
// НЕчистая: результат зависит от внешней переменной discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// ваш код

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)

discount = 50 // кто-то изменил внешнюю переменную

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)`,
        en: `let discount = 10

// finalPriceImpure :: Number -> Number
// IMpure: the result depends on the outer variable discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// your code

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)

discount = 50 // someone changed the outer variable

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)`,
      },
      solution: {
        ru: `let discount = 10

// finalPriceImpure :: Number -> Number
// НЕчистая: результат зависит от внешней переменной discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// Чистая: все, от чего зависит результат, приходит аргументами
const finalPrice = (percent, price) => price - price * percent / 100

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)

discount = 50 // кто-то изменил внешнюю переменную

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)`,
        en: `let discount = 10

// finalPriceImpure :: Number -> Number
// IMpure: the result depends on the outer variable discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// Pure: everything the result depends on comes in as arguments
const finalPrice = (percent, price) => price - price * percent / 100

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)

discount = 50 // someone changed the outer variable

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)`,
      },
      expected: {
        ru: "нечистая: 180, чистая: 180\nнечистая: 100, чистая: 180",
        en: "impure: 180, pure: 180\nimpure: 100, pure: 180",
      },
    },
  ],
}

export default lesson
