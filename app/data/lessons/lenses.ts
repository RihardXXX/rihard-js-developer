import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'lenses',
  title: {
    ru: "Линзы",
    en: "Lenses",
  },
  description: {
    ru: "Как линзы в JavaScript читают и меняют вложенные данные без мутации: view, set и over из Ramda и своя линза из пары функций getter и setter.",
    en: "How JavaScript lenses read and update nested data without mutation: view, set and over from Ramda, and your own lens built from a getter and a setter.",
  },
  goal: {
    ru: "Научиться читать и менять вложенные данные через линзы (view, set, over), не изменяя исходный объект, и понять, как устроена простая линза из пары функций getter и setter.",
    en: "Learn to read and update nested data with lenses (view, set, over) without changing the original object, and understand how a simple lens built from a getter and a setter works.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Линзы — это инструмент (паттерн), который используется в функциональном программировании при работе с данными, обеспечивая иммутабельность данных и чистоту функции.",
      en: "Lenses are a tool (a pattern) used in functional programming when working with data, providing data immutability and function purity.",
    },
    {
      type: 'text',
      ru: "Иммутабельность (неизменяемость) — это когда данные после создания не меняются: вместо изменения создаётся новая копия с нужными правками.",
      en: "Immutability means that data does not change after it is created: instead of modifying it, you create a new copy with the changes applied.",
    },
    {
      type: 'text',
      ru: "Давайте возьмем пример из официальной документации библиотеки Ramda JS.",
      en: "Let's take an example from the official documentation of the Ramda JS library.",
    },
    {
      type: 'code',
      code: {
        ru: `// Lens s a = Functor f => (a -> f a) -> s -> f s
// ===============================
// создаем линзу
// путь к данным
const xHeadYLens = R.lensPath(['x', 0, 'y']);

// запускаем линзу в разных функциях

// тестируемые данные
const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

// функция view получает данные согласно пути линзы
// не меняя ничего в первоначальном объекте
const resultView = R.view(xHeadYLens, data);

// функция set устанавливает новые данные
// по пути линзы, не меняя исходные данные в объекте
// а возвращая новый объект с измененными данными
const resultSet = R.set(xHeadYLens, 1, data);

// over работает с линзой как set
// но вместо данных принимает функцию
// которая примет в качестве аргумента
// данные по пути линзы
const resultOver = R.over(xHeadYLens, R.negate, data);

console.log(resultView) // 2
console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}`,
        en: `// Lens s a = Functor f => (a -> f a) -> s -> f s
// ===============================
// create the lens
// the path to the data
const xHeadYLens = R.lensPath(['x', 0, 'y']);

// use the lens with different functions

// test data
const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

// view reads the data at the lens path
// without changing anything in the original object
const resultView = R.view(xHeadYLens, data);

// set writes new data
// at the lens path without changing the original object,
// returning a new object with the changed data instead
const resultSet = R.set(xHeadYLens, 1, data);

// over works with the lens like set,
// but instead of a value it takes a function
// that receives the data
// at the lens path as its argument
const resultOver = R.over(xHeadYLens, R.negate, data);

console.log(resultView) // 2
console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}`,
      },
    },
    {
      type: 'text',
      ru: "В примерах выше мы с вами увидели, как пользоваться линзами.",
      en: "In the examples above, we saw how to use lenses.",
    },
    {
      type: 'text',
      ru: "А теперь попробуем реализовать свою кастомную линзу. В продакшен коде используйте готовые решения, например линзы из Ramda JS (в Sanctuary JS линз нет).",
      en: "And now let's try to implement our own custom lens. In production code, use ready-made solutions such as the lenses in Ramda JS (Sanctuary JS has no lenses).",
    },
    {
      type: 'code',
      code: {
        ru: `// упрощённая линза: пара функций getter и setter,
// замкнутых на путь к данным
// Lens s a = { getter :: s -> a, setter :: (a | (a -> a)) -> s -> s }
// в Ramda линза закодирована иначе: Functor f => (a -> f a) -> s -> f s
// ===============================
// создаем линзу
// lens :: [String | Number] -> Lens s a
const lens = (path) => {

  // getter :: [String | Number] -> s -> a
  const getter = (path) => (data) => {
    // если в линзу не прокинут путь
    // то возвращаем данные
    if (!path.length) {
      return data
    }

    // первый элемент пути и остальной путь
    const [head, ...tail] = path

    // когда в пути остается один элемент
    // хвост отсутствует
    // вызывается базовый случай
    // и возвращаются данные
    if (!tail.length) {
      return data[head]
    }

    // рекурсивный случай
    // срезанный путь бросаем в качестве первого аргумента
    // в качестве данных бросаем вложенность
    return getter (tail) (data[head])
  }

  // копия узла с новым значением по ключу
  // массив копируем как массив: {...data} превратил бы его
  // в объект с ключами 0, 1 и т. д.
  // assoc :: (String | Number) -> a -> s -> s
  const assoc = (key) => (value) => (data) => {
    const copy = Array.isArray(data) ? [...data] : { ...data }
    copy[key] = value
    return copy
  }

  // setter :: [String | Number] -> (a | (a -> a)) -> s -> s
  const setter = (path) => (v) => (data) => {
    // если в линзу не прокинут путь
    // то возвращаем данные
    if (!path.length) {
      return data
    }

    // первый элемент пути и остальной путь
    const [head, ...tail] = path

    // когда в пути остается один элемент
    // хвост отсутствует
    // вызывается базовый случай
    // и возвращаются данные
    // подменив значение ключа
    if (!tail.length) {

      // проверка чтобы понять
      // вызывается как over или set
      // чисто функция или значение
      // отправлено в качестве аргумента
      // поэтому записать функцию как значение через set нельзя:
      // в Ramda set сделан через over и такого ограничения нет
      const isFunction = typeof v === 'function'

      return assoc (head) (
        isFunction
          ? v (data[head])
          : v
      ) (data)
    }

    // рекурсивный случай
    // срезанный путь бросаем в качестве первого аргумента
    // аргумент изменения оставляем такой же
    // в качестве данных бросаем вложенность
    return assoc (head) (setter (tail) (v) (data[head])) (data)
  }


  // возвращает геттер и сеттер
  // сохраняя в замыкании путь к данным
  return {
    getter: getter (path),
    setter: setter (path),
  }
}

// линза готова
// осталось реализовать view, set, over

// мы просто вызываем геттер у линзы
// и бросаем туда данные для обработки
// view :: Lens s a -> s -> a
const view = (lens) => (data) => lens.getter (data)

// мы просто вызываем сеттер у линзы
// и бросаем туда данные для обработки
// set :: Lens s a -> a -> s -> s
const set = (lens) => (v) => (data) => lens.setter (v) (data)

// аналогичен в реализации set
// over :: Lens s a -> (a -> a) -> s -> s
const over = (lens) => (fn) => (data) => lens.setter (fn) (data)

// тестируем код
// =============
// создаем линзу
const xLens = lens(['x', 0, 'y']);

// тестируемые данные
const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

const resultView = view (xLens) (data)
const resultSet = set (xLens) (1) (data)
// ((a) => (b) => a + b) (3) создается каррированная функция
// которая сразу вызывается и возвращает
// (b) => 3 + b
const resultOver = over (xLens) ( ((a) => (b) => a + b) (3) ) (data)

console.log(resultView) // 2
console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
console.log(resultOver) // {x: [{y: 5, z: 3}, {y: 4, z: 5}]}`,
        en: `// a simplified lens: a pair of getter and setter functions
// closed over the path to the data
// Lens s a = { getter :: s -> a, setter :: (a | (a -> a)) -> s -> s }
// in Ramda a lens is encoded differently: Functor f => (a -> f a) -> s -> f s
// ===============================
// create the lens
// lens :: [String | Number] -> Lens s a
const lens = (path) => {

  // getter :: [String | Number] -> s -> a
  const getter = (path) => (data) => {
    // if no path was passed to the lens,
    // return the data as is
    if (!path.length) {
      return data
    }

    // the first path element and the rest of the path
    const [head, ...tail] = path

    // when one element is left in the path,
    // there is no tail:
    // this is the base case,
    // and we return the data
    if (!tail.length) {
      return data[head]
    }

    // recursive case
    // pass the shortened path as the first argument
    // and the nested value as the data
    return getter (tail) (data[head])
  }

  // a copy of the node with a new value under the key
  // an array is copied as an array: {...data} would turn it
  // into an object with keys 0, 1 and so on
  // assoc :: (String | Number) -> a -> s -> s
  const assoc = (key) => (value) => (data) => {
    const copy = Array.isArray(data) ? [...data] : { ...data }
    copy[key] = value
    return copy
  }

  // setter :: [String | Number] -> (a | (a -> a)) -> s -> s
  const setter = (path) => (v) => (data) => {
    // if no path was passed to the lens,
    // return the data as is
    if (!path.length) {
      return data
    }

    // the first path element and the rest of the path
    const [head, ...tail] = path

    // when one element is left in the path,
    // there is no tail:
    // this is the base case,
    // and we return the data
    // with the key's value replaced
    if (!tail.length) {

      // a check to tell
      // whether we are called as over or as set,
      // that is, whether a function or a value
      // was passed as the argument
      // so set cannot store a function as a value here:
      // in Ramda set is built on top of over and has no such limitation
      const isFunction = typeof v === 'function'

      return assoc (head) (
        isFunction
          ? v (data[head])
          : v
      ) (data)
    }

    // recursive case
    // pass the shortened path as the first argument,
    // keep the change argument the same
    // and pass the nested value as the data
    return assoc (head) (setter (tail) (v) (data[head])) (data)
  }


  // return the getter and the setter,
  // keeping the path to the data in the closure
  return {
    getter: getter (path),
    setter: setter (path),
  }
}

// the lens is ready
// now we need view, set and over

// we simply call the lens getter
// and pass it the data to process
// view :: Lens s a -> s -> a
const view = (lens) => (data) => lens.getter (data)

// we simply call the lens setter
// and pass it the data to process
// set :: Lens s a -> a -> s -> s
const set = (lens) => (v) => (data) => lens.setter (v) (data)

// implemented the same way as set
// over :: Lens s a -> (a -> a) -> s -> s
const over = (lens) => (fn) => (data) => lens.setter (fn) (data)

// testing the code
// =============
// create the lens
const xLens = lens(['x', 0, 'y']);

// test data
const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

const resultView = view (xLens) (data)
const resultSet = set (xLens) (1) (data)
// ((a) => (b) => a + b) (3) creates a curried function
// that is called right away and returns
// (b) => 3 + b
const resultOver = over (xLens) ( ((a) => (b) => a + b) (3) ) (data)

console.log(resultView) // 2
console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
console.log(resultOver) // {x: [{y: 5, z: 3}, {y: 4, z: 5}]}`,
      },
    },
  ],
  summary: [
    {
      ru: "Линзы — паттерн для работы с данными, который обеспечивает иммутабельность данных и чистоту функций.",
      en: "Lenses are a pattern for working with data that keeps the data immutable and the functions pure.",
    },
    {
      ru: "Иммутабельность означает, что данные после создания не меняются: вместо изменения создаётся новая копия с нужными правками.",
      en: "Immutability means that data does not change after it is created: instead of modifying it, you create a new copy with the changes applied.",
    },
    {
      ru: "view читает значение по пути линзы, set записывает новое значение и возвращает новый объект, over делает то же, что set, но принимает функцию от текущего значения. Исходные данные при этом не меняются.",
      en: "view reads the value at the lens path, set writes a new value and returns a new object, and over works like set but takes a function of the current value. The original data stays unchanged.",
    },
    {
      ru: "Простую линзу можно собрать из пары функций getter и setter, замкнутых на путь к данным; при копировании узла массив нужно копировать как массив.",
      en: "A simple lens can be built from a pair of getter and setter functions closed over the path to the data; when a node is copied, an array has to be copied as an array.",
    },
    {
      ru: "В продакшен-коде используйте готовые линзы, например из Ramda; в Sanctuary линз нет.",
      en: "In production code, use ready-made lenses such as the ones in Ramda; Sanctuary has no lenses.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "В состоянии приложения лежат настройки пользователя и корзина. С помощью R.lensPath, R.view, R.set и R.over получите новое состояние, где тема оформления — dark, а количество первого товара в корзине на единицу больше. Соберите оба изменения в одну функцию update через pipe и убедитесь, что исходное состояние не изменилось.",
        en: "The application state holds the user's settings and a cart. Using R.lensPath, R.view, R.set and R.over, get a new state where the theme is dark and the quantity of the first item in the cart has gone up by one. Combine both changes into a single update function with pipe and make sure the original state has not changed.",
      },
      starter: {
        ru: `// pipe берём из Ramda, как в уроке «Каррирование»
const { pipe } = R

const state = {
  user: { name: 'Anna', settings: { theme: 'light', fontSize: 14 } },
  cart: [
    { title: 'Book', qty: 1 },
    { title: 'Pen', qty: 3 },
  ],
}

// ваш код: пути к теме оформления и к количеству первого товара
const themeLens = R.lensPath([])
const firstQtyLens = R.lensPath([])

// ваш код: оба изменения через pipe, R.set и R.over
// update :: Object -> Object
const update = (s) => s

const next = update(state)

console.log('новое: тема ' + R.view(themeLens, next) + ', количество ' + R.view(firstQtyLens, next))
console.log('исходное: тема ' + R.view(themeLens, state) + ', количество ' + R.view(firstQtyLens, state))`,
        en: `// pipe comes from Ramda, as in the "Currying" lesson
const { pipe } = R

const state = {
  user: { name: 'Anna', settings: { theme: 'light', fontSize: 14 } },
  cart: [
    { title: 'Book', qty: 1 },
    { title: 'Pen', qty: 3 },
  ],
}

// your code: the paths to the theme and to the quantity of the first item
const themeLens = R.lensPath([])
const firstQtyLens = R.lensPath([])

// your code: both changes with pipe, R.set and R.over
// update :: Object -> Object
const update = (s) => s

const next = update(state)

console.log('new: theme ' + R.view(themeLens, next) + ', quantity ' + R.view(firstQtyLens, next))
console.log('original: theme ' + R.view(themeLens, state) + ', quantity ' + R.view(firstQtyLens, state))`,
      },
      solution: {
        ru: `// pipe берём из Ramda, как в уроке «Каррирование»
const { pipe } = R

const state = {
  user: { name: 'Anna', settings: { theme: 'light', fontSize: 14 } },
  cart: [
    { title: 'Book', qty: 1 },
    { title: 'Pen', qty: 3 },
  ],
}

// линза к теме оформления
const themeLens = R.lensPath(['user', 'settings', 'theme'])
// линза к количеству первого товара: в пути может стоять индекс массива
const firstQtyLens = R.lensPath(['cart', 0, 'qty'])

// update :: Object -> Object
// каждый шаг возвращает новый объект и передаёт его следующему
const update = pipe(
  (s) => R.set(themeLens, 'dark', s),
  (s) => R.over(firstQtyLens, (qty) => qty + 1, s),
)

const next = update(state)

console.log('новое: тема ' + R.view(themeLens, next) + ', количество ' + R.view(firstQtyLens, next))
console.log('исходное: тема ' + R.view(themeLens, state) + ', количество ' + R.view(firstQtyLens, state))`,
        en: `// pipe comes from Ramda, as in the "Currying" lesson
const { pipe } = R

const state = {
  user: { name: 'Anna', settings: { theme: 'light', fontSize: 14 } },
  cart: [
    { title: 'Book', qty: 1 },
    { title: 'Pen', qty: 3 },
  ],
}

// a lens to the theme
const themeLens = R.lensPath(['user', 'settings', 'theme'])
// a lens to the quantity of the first item: a path can contain an array index
const firstQtyLens = R.lensPath(['cart', 0, 'qty'])

// update :: Object -> Object
// each step returns a new object and passes it to the next one
const update = pipe(
  (s) => R.set(themeLens, 'dark', s),
  (s) => R.over(firstQtyLens, (qty) => qty + 1, s),
)

const next = update(state)

console.log('new: theme ' + R.view(themeLens, next) + ', quantity ' + R.view(firstQtyLens, next))
console.log('original: theme ' + R.view(themeLens, state) + ', quantity ' + R.view(firstQtyLens, state))`,
      },
      expected: {
        ru: "новое: тема dark, количество 2\nисходное: тема light, количество 1",
        en: "new: theme dark, quantity 2\noriginal: theme light, quantity 1",
      },
    },
    {
      task: {
        ru: "В самописной линзе из урока set не может записать функцию как значение: setter принимает любую функцию за преобразование. Напишите линзу lensKey(key) для одного ключа объекта, у которой setter всегда принимает функцию, и функции view, over и set. set постройте через over, как в Ramda, и проверьте, что функция записывается как обычное значение, а исходный объект не меняется.",
        en: "In the hand-written lens from the lesson, set cannot store a function as a value: the setter treats any function as a transformation. Write a lens lensKey(key) for a single object key whose setter always takes a function, plus view, over and set. Build set on top of over, as Ramda does, and check that a function is stored as a plain value and the original object does not change.",
      },
      starter: {
        ru: `// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
// lensKey :: String -> Lens s a
const lensKey = (key) => ({
  getter: (data) => data[key],
  // ваш код: setter возвращает копию data, где по ключу key лежит fn (data[key])
  setter: (fn) => (data) => data,
})

// view :: Lens s a -> s -> a
const view = (lens) => (data) => lens.getter(data)

// over :: Lens s a -> (a -> a) -> s -> s
const over = (lens) => (fn) => (data) => data // ваш код

// set :: Lens s a -> a -> s -> s
const set = (lens) => (v) => (data) => data // ваш код: через over

const user = { name: 'Anna', greet: null }
const nameLens = lensKey('name')
const greetLens = lensKey('greet')

console.log(view(nameLens)(set(nameLens)('Kate')(user)))
console.log(typeof view(greetLens)(set(greetLens)((name) => 'Привет, ' + name)(user)))
console.log(view(nameLens)(over(nameLens)((name) => name.toUpperCase())(user)))
console.log(user)`,
        en: `// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
// lensKey :: String -> Lens s a
const lensKey = (key) => ({
  getter: (data) => data[key],
  // your code: setter returns a copy of data with fn (data[key]) under the key
  setter: (fn) => (data) => data,
})

// view :: Lens s a -> s -> a
const view = (lens) => (data) => lens.getter(data)

// over :: Lens s a -> (a -> a) -> s -> s
const over = (lens) => (fn) => (data) => data // your code

// set :: Lens s a -> a -> s -> s
const set = (lens) => (v) => (data) => data // your code: on top of over

const user = { name: 'Anna', greet: null }
const nameLens = lensKey('name')
const greetLens = lensKey('greet')

console.log(view(nameLens)(set(nameLens)('Kate')(user)))
console.log(typeof view(greetLens)(set(greetLens)((name) => 'Hello, ' + name)(user)))
console.log(view(nameLens)(over(nameLens)((name) => name.toUpperCase())(user)))
console.log(user)`,
      },
      solution: {
        ru: `// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
// lensKey :: String -> Lens s a
const lensKey = (key) => ({
  getter: (data) => data[key],
  // setter всегда принимает функцию и не проверяет, что ему передали
  setter: (fn) => (data) => {
    const copy = { ...data }
    copy[key] = fn(data[key])
    return copy
  },
})

// view :: Lens s a -> s -> a
const view = (lens) => (data) => lens.getter(data)

// over :: Lens s a -> (a -> a) -> s -> s
const over = (lens) => (fn) => (data) => lens.setter(fn)(data)

// set :: Lens s a -> a -> s -> s
// значение заворачиваем в функцию, которая игнорирует текущее значение,
// поэтому v может быть и функцией
const set = (lens) => (v) => over(lens)(() => v)

const user = { name: 'Anna', greet: null }
const nameLens = lensKey('name')
const greetLens = lensKey('greet')

console.log(view(nameLens)(set(nameLens)('Kate')(user)))
console.log(typeof view(greetLens)(set(greetLens)((name) => 'Привет, ' + name)(user)))
console.log(view(nameLens)(over(nameLens)((name) => name.toUpperCase())(user)))
console.log(user)`,
        en: `// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
// lensKey :: String -> Lens s a
const lensKey = (key) => ({
  getter: (data) => data[key],
  // the setter always takes a function and does not check what it got
  setter: (fn) => (data) => {
    const copy = { ...data }
    copy[key] = fn(data[key])
    return copy
  },
})

// view :: Lens s a -> s -> a
const view = (lens) => (data) => lens.getter(data)

// over :: Lens s a -> (a -> a) -> s -> s
const over = (lens) => (fn) => (data) => lens.setter(fn)(data)

// set :: Lens s a -> a -> s -> s
// wrap the value in a function that ignores the current value,
// so v can be a function too
const set = (lens) => (v) => over(lens)(() => v)

const user = { name: 'Anna', greet: null }
const nameLens = lensKey('name')
const greetLens = lensKey('greet')

console.log(view(nameLens)(set(nameLens)('Kate')(user)))
console.log(typeof view(greetLens)(set(greetLens)((name) => 'Hello, ' + name)(user)))
console.log(view(nameLens)(over(nameLens)((name) => name.toUpperCase())(user)))
console.log(user)`,
      },
      expected: {
        ru: "Kate\nfunction\nANNA\n{\n  \"name\": \"Anna\",\n  \"greet\": null\n}",
        en: "Kate\nfunction\nANNA\n{\n  \"name\": \"Anna\",\n  \"greet\": null\n}",
      },
    },
  ],
}

export default lesson
