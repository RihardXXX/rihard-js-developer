import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'lenses',
  title: {
    ru: "Линзы",
    en: "Lenses",
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
}

export default lesson
