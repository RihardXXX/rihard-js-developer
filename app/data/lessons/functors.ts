import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'functors',
  title: {
    ru: "Функтор и его законы",
    en: "Functors and their laws",
  },
  description: {
    ru: "Функтор в JavaScript: контейнер с map, сохраняющим структуру. Массив, Maybe-подобный контейнер и промис, законы тождества и композиции в коде.",
    en: "Functors in JavaScript: a container whose map keeps the structure. Arrays, a Maybe-like container and promises, the identity and composition laws in code.",
  },
  goal: {
    ru: "Понять, что такое функтор — контейнер с map, который меняет значения и сохраняет структуру, — научиться проверять законы тождества и композиции в коде и опираться на них при рефакторинге.",
    en: "Understand what a functor is, a container whose map changes the values and keeps the structure, learn to check the identity and composition laws in code and rely on them when refactoring.",
  },
  blocks: [
    {
      type: 'text',
      ru: "В уроке «Функции map, filter, reduce» map работал с массивами, а в уроке «Нотация типов Хиндли–Милнера» встречалась сигнатура map :: Functor f => (a -> b) -> f a -> f b. Вместо массива в ней стоит f — любой функтор. Разберёмся, что это за f и почему map можно доверять.",
      en: "In the \"The map, filter, and reduce functions\" lesson map worked with arrays, and in the \"Hindley–Milner type notation\" lesson we came across the signature map :: Functor f => (a -> b) -> f a -> f b. Instead of an array it has f, which stands for any functor. Let's find out what this f is and why map can be trusted.",
    },
    {
      type: 'text',
      ru: "Функтор — это контейнер, у которого есть map. map принимает обычную функцию a -> b, применяет её к значениям внутри контейнера и возвращает новый контейнер того же вида. Главное свойство map — он сохраняет структуру: из массива из трёх элементов получается массив из трёх элементов в том же порядке, меняются только сами значения. Исходный контейнер при этом остаётся прежним.",
      en: "A functor is a container that has map. map takes an ordinary function a -> b, applies it to the values inside the container and returns a new container of the same kind. The key property of map is that it keeps the structure: an array of three elements becomes an array of three elements in the same order, and only the values themselves change. The original container stays as it was.",
    },
    {
      type: 'code',
      code: {
        ru: `// Массив — самый знакомый функтор
// map :: (a -> b) -> [a] -> [b]
const words = ['functor', 'map', 'law']
const lengths = words.map((word) => word.length)

console.log(JSON.stringify(lengths)) // [7,3,3]
// структура та же: три элемента в том же порядке, поменялись только значения
console.log(words.length === lengths.length) // true
// исходный массив не изменился
console.log(JSON.stringify(words)) // ["functor","map","law"]

// Box — самый простой функтор: контейнер ровно для одного значения
// Box :: a -> Box a
const Box = (value) => ({
  value,
  // map :: Box a ~> (a -> b) -> Box b
  map: (fn) => Box(fn(value)),
})

const box = Box('functor')
  .map((word) => word.toUpperCase())
  .map((word) => word.length)
console.log(box.value) // 7

// одна и та же функция работает с любым функтором: о контейнере она ничего не знает
// double :: Number -> Number
const double = (x) => x * 2
console.log(JSON.stringify([1, 2, 3].map(double))) // [2,4,6]
console.log(Box(21).map(double).value) // 42

// R.map принимает любой функтор: если у объекта есть метод map, R.map вызывает его
console.log(R.map(double, Box(21)).value) // 42`,
        en: `// An array is the most familiar functor
// map :: (a -> b) -> [a] -> [b]
const words = ['functor', 'map', 'law']
const lengths = words.map((word) => word.length)

console.log(JSON.stringify(lengths)) // [7,3,3]
// the structure is the same: three elements in the same order, only the values changed
console.log(words.length === lengths.length) // true
// the original array has not changed
console.log(JSON.stringify(words)) // ["functor","map","law"]

// Box is the simplest functor: a container for exactly one value
// Box :: a -> Box a
const Box = (value) => ({
  value,
  // map :: Box a ~> (a -> b) -> Box b
  map: (fn) => Box(fn(value)),
})

const box = Box('functor')
  .map((word) => word.toUpperCase())
  .map((word) => word.length)
console.log(box.value) // 7

// the same function works with any functor: it knows nothing about the container
// double :: Number -> Number
const double = (x) => x * 2
console.log(JSON.stringify([1, 2, 3].map(double))) // [2,4,6]
console.log(Box(21).map(double).value) // 42

// R.map accepts any functor: if the object has a map method, R.map calls it
console.log(R.map(double, Box(21)).value) // 42`,
      },
    },
    {
      type: 'text',
      ru: "Box сам по себе бесполезен, зато показывает, что map — не только про массивы. Функция double ничего не знает о контейнере, а как добраться до значений, решает map самого контейнера: у массива — пройти по всем элементам, у Box — взять одно значение. Поэтому R.map из Ramda работает и с массивом, и с Box.",
      en: "Box is useless on its own, but it shows that map is not only about arrays. The double function knows nothing about the container, and it is the container's own map that decides how to reach the values: for an array, visit every element; for Box, take the single value. That is why R.map from Ramda works with both an array and a Box.",
    },
    {
      type: 'text',
      ru: "Интереснее контейнер, в котором значения может не быть. Just хранит значение, Nothing означает его отсутствие. map у Just применяет функцию, а у Nothing ничего не делает: применять функцию не к чему. Проверка на отсутствие живёт в одном месте, в map, а функции в цепочке работают с обычными значениями. Структура сохраняется и здесь: Just после map остаётся Just, Nothing остаётся Nothing. Готовый Maybe из библиотеки Sanctuary разобран в уроке «Maybe и Either».",
      en: "A more interesting container is one that may hold no value at all. Just holds a value, Nothing means it is absent. map on Just applies the function, while map on Nothing does nothing: there is nothing to apply the function to. The check for absence lives in one place, in map, and the functions in the chain work with ordinary values. The structure is kept here too: Just stays Just after map, and Nothing stays Nothing. The ready-made Maybe from the Sanctuary library is covered in the \"Maybe and Either\" lesson.",
    },
    {
      type: 'code',
      code: {
        ru: `// Maybe-подобный контейнер: значение есть (Just) или его нет (Nothing)

// Just :: a -> Maybe a
const Just = (value) => ({
  // применяем функцию и кладём результат обратно в Just
  map: (fn) => Just(fn(value)),
  // getOrElse :: Maybe a ~> a -> a
  getOrElse: () => value,
})

// Nothing :: Maybe a
const Nothing = {
  // применять функцию не к чему: Nothing остаётся Nothing
  map: () => Nothing,
  getOrElse: (fallback) => fallback,
}

const users = [
  { id: 1, name: 'ann' },
  { id: 2, name: 'bob' },
]

// findUser :: Number -> Maybe Object
const findUser = (id) => {
  const user = users.find((u) => u.id === id)
  return user === undefined ? Nothing : Just(user)
}

// greet :: Number -> String
// функции в цепочке не проверяют, нашёлся ли пользователь: это делает map
const greet = (id) =>
  findUser(id)
    .map((user) => user.name)
    .map((name) => name.toUpperCase())
    .map((name) => \`Привет, \${name}\`)
    .getOrElse('Пользователь не найден')

console.log(greet(2)) // Привет, BOB
console.log(greet(7)) // Пользователь не найден`,
        en: `// A Maybe-like container: there is a value (Just) or there is none (Nothing)

// Just :: a -> Maybe a
const Just = (value) => ({
  // apply the function and put the result back into Just
  map: (fn) => Just(fn(value)),
  // getOrElse :: Maybe a ~> a -> a
  getOrElse: () => value,
})

// Nothing :: Maybe a
const Nothing = {
  // there is nothing to apply the function to: Nothing stays Nothing
  map: () => Nothing,
  getOrElse: (fallback) => fallback,
}

const users = [
  { id: 1, name: 'ann' },
  { id: 2, name: 'bob' },
]

// findUser :: Number -> Maybe Object
const findUser = (id) => {
  const user = users.find((u) => u.id === id)
  return user === undefined ? Nothing : Just(user)
}

// greet :: Number -> String
// the functions in the chain don't check whether the user was found: map does that
const greet = (id) =>
  findUser(id)
    .map((user) => user.name)
    .map((name) => name.toUpperCase())
    .map((name) => \`Hello, \${name}\`)
    .getOrElse('User not found')

console.log(greet(2)) // Hello, BOB
console.log(greet(7)) // User not found`,
      },
    },
    {
      type: 'heading',
      ru: "Законы функтора",
      en: "The functor laws",
    },
    {
      type: 'text',
      ru: "Одного метода map мало, чтобы контейнер стал функтором: map должен выполнять два закона. Тождество: u.map(x => x) эквивалентно u — если функция ничего не меняет, то и map ничего не меняет. Композиция: u.map(x => f(g(x))) эквивалентно u.map(g).map(f) — один проход с композицией даёт то же, что два прохода подряд. В нотации Хиндли–Милнера их записывают короче: map(id) = id и map(f . g) = map(f) . map(g).",
      en: "A map method alone is not enough to make a container a functor: map must obey two laws. Identity: u.map(x => x) is equivalent to u, so if the function changes nothing, map changes nothing either. Composition: u.map(x => f(g(x))) is equivalent to u.map(g).map(f), so one pass with the composition gives the same as two passes in a row. In Hindley–Milner notation they are written more briefly: map(id) = id and map(f . g) = map(f) . map(g).",
    },
    {
      type: 'code',
      code: {
        ru: `// Законы функтора на массиве
// тождество:  u.map(x => x) эквивалентно u
// композиция: u.map(x => f(g(x))) эквивалентно u.map(g).map(f)

// id :: a -> a
const id = (x) => x
// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f, g) => (x) => f(g(x))
// «эквивалентно» — та же структура и те же значения
// same :: (a, a) -> Boolean
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const inc = (x) => x + 1
const tenTimes = (x) => x * 10
const u = [1, 2, 3]

console.log(u.map(id) === u) // false: map вернул новый массив
console.log(same(u.map(id), u)) // true: тождество выполняется
console.log(same(u.map(compose(tenTimes, inc)), u.map(inc).map(tenTimes))) // true: композиция тоже

// «Удобный» map, который заодно выбрасывает пустые результаты
// compactMap :: (a -> b) -> [a] -> [b]
const compactMap = (fn) => (arr) => arr.map(fn).filter((x) => x != null)

// тождество нарушено: было три элемента, стало два, и 30 сдвинулось с индекса 2 на 1
const scores = [10, null, 30]
console.log(JSON.stringify(compactMap(id)(scores))) // [10,30]
console.log(same(compactMap(id)(scores), scores)) // false

// композиция тоже нарушена: склеить два прохода в один уже нельзя
const hideBig = (x) => (x > 15 ? null : x) // большие значения прячем
const orZero = (x) => (x == null ? 0 : x) // пустое заменяем нулём
const values = [10, 30]
console.log(JSON.stringify(compactMap(compose(orZero, hideBig))(values))) // [10,0]
console.log(JSON.stringify(compactMap(orZero)(compactMap(hideBig)(values)))) // [10]`,
        en: `// The functor laws on an array
// identity:    u.map(x => x) is equivalent to u
// composition: u.map(x => f(g(x))) is equivalent to u.map(g).map(f)

// id :: a -> a
const id = (x) => x
// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f, g) => (x) => f(g(x))
// "equivalent" means the same structure and the same values
// same :: (a, a) -> Boolean
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const inc = (x) => x + 1
const tenTimes = (x) => x * 10
const u = [1, 2, 3]

console.log(u.map(id) === u) // false: map returned a new array
console.log(same(u.map(id), u)) // true: identity holds
console.log(same(u.map(compose(tenTimes, inc)), u.map(inc).map(tenTimes))) // true: so does composition

// A "convenient" map that also throws away empty results
// compactMap :: (a -> b) -> [a] -> [b]
const compactMap = (fn) => (arr) => arr.map(fn).filter((x) => x != null)

// identity is broken: there were three elements, now there are two, and 30 moved from index 2 to 1
const scores = [10, null, 30]
console.log(JSON.stringify(compactMap(id)(scores))) // [10,30]
console.log(same(compactMap(id)(scores), scores)) // false

// composition is broken too: two passes can no longer be merged into one
const hideBig = (x) => (x > 15 ? null : x) // hide the big values
const orZero = (x) => (x == null ? 0 : x) // replace an empty value with zero
const values = [10, 30]
console.log(JSON.stringify(compactMap(compose(orZero, hideBig))(values))) // [10,0]
console.log(JSON.stringify(compactMap(orZero)(compactMap(hideBig)(values)))) // [10]`,
      },
    },
    {
      type: 'text',
      ru: "«Эквивалентно» значит та же структура и те же значения, а не тот же объект: map всегда возвращает новый контейнер, поэтому u.map(id) === u даёт false. Законы гарантируют, что map меняет значения и больше ничего: не выбрасывает элементы, не переставляет их и не меняет форму контейнера. compactMap нарушает оба закона, и код, который рассчитывает на длину массива или на индексы, после такого map ломается.",
      en: "\"Equivalent\" means the same structure and the same values, not the same object: map always returns a new container, so u.map(id) === u gives false. The laws guarantee that map changes the values and nothing else: it does not throw elements away, does not reorder them and does not change the shape of the container. compactMap breaks both laws, and code that relies on the array length or on indexes breaks after such a map.",
    },
    {
      type: 'heading',
      ru: "Законы и рефакторинг",
      en: "Laws and refactoring",
    },
    {
      type: 'text',
      ru: "Закон композиции — это правило рефакторинга: map(f) . map(g) = map(f . g). Цепочку из двух map можно склеить в один проход без промежуточного массива, а длинную функцию внутри map — разбить на несколько map. Результат не изменится, и проверять это на каждом примере не нужно: это гарантирует закон. С compactMap так нельзя, что и показал пример выше.",
      en: "The composition law is a refactoring rule: map(f) . map(g) = map(f . g). A chain of two maps can be merged into one pass without an intermediate array, and a long function inside map can be split into several maps. The result will not change, and there is no need to check it on every example: the law guarantees it. With compactMap this is not possible, as the example above showed.",
    },
    {
      type: 'code',
      code: {
        ru: `// Закон композиции как правило рефакторинга:
// map(f) . map(g) = map(f . g)

const orders = [
  { id: 1, total: 1200 },
  { id: 2, total: 450 },
  { id: 3, total: 3100 },
]

// журнал вызовов: в каком порядке работают функции
let journal = []
// traced :: (String, (a -> b)) -> a -> b
const traced = (name, fn) => (x) => {
  journal.push(name)
  return fn(x)
}

// getTotal :: Object -> Number
const getTotal = traced('getTotal', (order) => order.total)
// format :: Number -> String
const format = traced('format', (total) => total.toFixed(2))

// два прохода: два обхода и промежуточный массив сумм
const twoPasses = R.map(format, R.map(getTotal, orders))
console.log(journal.join(' '))
// getTotal getTotal getTotal format format format

journal = []
// один проход: композиция внутри map, R.compose выполняет функции справа налево
const onePass = R.map(R.compose(format, getTotal), orders)
console.log(journal.join(' '))
// getTotal format getTotal format getTotal format

// результат тот же
console.log(JSON.stringify(onePass)) // ["1200.00","450.00","3100.00"]
console.log(R.equals(twoPasses, onePass)) // true`,
        en: `// The composition law as a refactoring rule:
// map(f) . map(g) = map(f . g)

const orders = [
  { id: 1, total: 1200 },
  { id: 2, total: 450 },
  { id: 3, total: 3100 },
]

// a call journal: the order in which the functions run
let journal = []
// traced :: (String, (a -> b)) -> a -> b
const traced = (name, fn) => (x) => {
  journal.push(name)
  return fn(x)
}

// getTotal :: Object -> Number
const getTotal = traced('getTotal', (order) => order.total)
// format :: Number -> String
const format = traced('format', (total) => total.toFixed(2))

// two passes: two traversals and an intermediate array of totals
const twoPasses = R.map(format, R.map(getTotal, orders))
console.log(journal.join(' '))
// getTotal getTotal getTotal format format format

journal = []
// one pass: the composition inside map; R.compose runs the functions right to left
const onePass = R.map(R.compose(format, getTotal), orders)
console.log(journal.join(' '))
// getTotal format getTotal format getTotal format

// the result is the same
console.log(JSON.stringify(onePass)) // ["1200.00","450.00","3100.00"]
console.log(R.equals(twoPasses, onePass)) // true`,
      },
    },
    {
      type: 'text',
      ru: "Посмотрите на журнал: результат одинаковый, а порядок вызовов разный. Два прохода вызывают сначала все getTotal, потом все format, а один проход их чередует. Для чистых функций порядок не важен — об этом урок «Чистые функции». Если же функции пишут в лог или меняют внешние данные, после такого рефакторинга эффекты пойдут в другом порядке.",
      en: "Look at the journal: the result is the same, but the order of calls is different. Two passes call all the getTotal calls first and then all the format calls, while one pass interleaves them. For pure functions the order does not matter, as the \"Pure functions\" lesson explains. But if the functions write to a log or change outside data, after such a refactoring the effects will happen in a different order.",
    },
    {
      type: 'text',
      ru: "Метод then у промиса похож на map: он применяет функцию к значению, когда оно появится, и возвращает новый промис. Но строгим функтором промис не является. Если функция возвращает промис или любой другой объект с методом then, then не кладёт его внутрь, а разворачивает и ждёт его значения. Промиса внутри промиса не бывает, и закон композиции нарушается. Поэтому библиотеки, которые строго следуют законам, например Sanctuary, промис функтором не считают: S.map с ним не работает.",
      en: "A promise's then method looks like map: it applies the function to the value once the value arrives and returns a new promise. But a promise is not a strict functor. If the function returns a promise, or any other object with a then method, then does not put it inside but unwraps it and waits for its value. There is no such thing as a promise inside a promise, and the composition law is broken. That is why libraries that follow the laws strictly, Sanctuary for example, do not treat a promise as a functor: S.map does not work with it.",
    },
    {
      type: 'code',
      code: {
        ru: `// then у промиса похож на map: применяет функцию к значению внутри
Promise.resolve(21)
  .then((x) => x * 2)
  .then((x) => console.log(x)) // 42

// но then разворачивает промис, который вернула функция
// f :: a -> Promise a
const f = (x) => Promise.resolve(x)
// g :: a -> Boolean — пришёл ли на вход промис
const g = (value) => value instanceof Promise

const p = Promise.resolve(1)
Promise.all([
  p.then(f).then(g), // then развернул промис из f, и g получила 1
  p.then((x) => g(f(x))), // а здесь g получила сам промис
]).then(([twoThens, composed]) => {
  console.log(twoThens) // false
  console.log(composed) // true
  // результаты разные: для then закон композиции не выполняется
})`,
        en: `// a promise's then looks like map: it applies the function to the value inside
Promise.resolve(21)
  .then((x) => x * 2)
  .then((x) => console.log(x)) // 42

// but then unwraps the promise that the function returned
// f :: a -> Promise a
const f = (x) => Promise.resolve(x)
// g :: a -> Boolean, whether a promise came in
const g = (value) => value instanceof Promise

const p = Promise.resolve(1)
Promise.all([
  p.then(f).then(g), // then unwrapped the promise from f, so g got 1
  p.then((x) => g(f(x))), // and here g got the promise itself
]).then(([twoThens, composed]) => {
  console.log(twoThens) // false
  console.log(composed) // true
  // the results differ: the composition law does not hold for then
})`,
      },
    },
    {
      type: 'text',
      ru: "Название «функтор» пришло из теории категорий. В уроке «Теория категорий» категория — это типы-объекты и функции-морфизмы между ними. Функтор отображает одну категорию в другую: каждому типу a ставит в соответствие тип F a (типу Number — тип [Number]), а каждой функции f :: a -> b — функцию map(f) :: F a -> F b. Законы функтора говорят ровно о том, что такое отображение сохраняет тождественные морфизмы и композицию. В программировании функтор переводит типы языка в типы того же языка, поэтому его называют эндофунктором. Это идеализация: она верна для чистых функций, которые завершаются без исключений.",
      en: "The name \"functor\" comes from category theory. In the \"Category theory\" lesson a category is types as objects and functions as morphisms between them. A functor maps one category to another: it assigns to each type a a type F a (to the type Number, the type [Number]), and to each function f :: a -> b a function map(f) :: F a -> F b. The functor laws say exactly that this mapping preserves identity morphisms and composition. In programming a functor takes the language's types to types of the same language, which is why it is called an endofunctor. This is an idealization: it holds for pure functions that finish without exceptions.",
    },
  ],
  summary: [
    {
      ru: "Функтор — контейнер с map: map применяет функцию к значениям внутри и возвращает новый контейнер той же структуры. Массив, Box и Maybe-подобный контейнер — функторы.",
      en: "A functor is a container with map: map applies a function to the values inside and returns a new container with the same structure. An array, Box and a Maybe-like container are functors.",
    },
    {
      ru: "Законы функтора: тождество — u.map(x => x) эквивалентно u, композиция — u.map(x => f(g(x))) эквивалентно u.map(g).map(f). Метод map без законов функтором контейнер не делает.",
      en: "The functor laws: identity, where u.map(x => x) is equivalent to u, and composition, where u.map(x => f(g(x))) is equivalent to u.map(g).map(f). A map method without the laws does not make a container a functor.",
    },
    {
      ru: "Закон композиции — правило рефакторинга: map(f) . map(g) = map(f . g). Два прохода можно склеить в один, результат не изменится, а порядок вызовов изменится, поэтому функции должны быть чистыми.",
      en: "The composition law is a refactoring rule: map(f) . map(g) = map(f . g). Two passes can be merged into one: the result stays the same but the order of calls changes, so the functions must be pure.",
    },
    {
      ru: "then у промиса похож на map, но разворачивает промис, который вернула функция, поэтому промис — не строгий функтор.",
      en: "A promise's then looks like map, but it unwraps a promise returned by the function, so a promise is not a strict functor.",
    },
    {
      ru: "В теории категорий функтор отображает типы и функции между ними, сохраняя тождество и композицию.",
      en: "In category theory a functor maps types and the functions between them, preserving identity and composition.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Дерево — тоже функтор. Узел дерева — объект { value, children }, где children — массив узлов. Напишите mapTree(fn, tree): она применяет fn к value каждого узла и возвращает новое дерево той же формы — у каждого узла столько же детей в том же порядке. Пригодятся рекурсия из урока «Рекурсия» и map массива. Заготовка печатает дерево после mapTree и проверяет на нём оба закона функтора.",
        en: "A tree is a functor too. A tree node is an object { value, children }, where children is an array of nodes. Write mapTree(fn, tree): it applies fn to the value of every node and returns a new tree of the same shape, where every node has as many children as before, in the same order. Recursion from the \"Recursion\" lesson and the array's map will come in handy. The starter prints the tree after mapTree and checks both functor laws on it.",
      },
      starter: {
        ru: `// mapTree :: ((a -> b), Tree a) -> Tree b
// ваш код

const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] },
  ],
}

const id = (x) => x
const inc = (x) => x + 1
const double = (x) => x * 2
// same :: (a, a) -> Boolean
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

console.log(JSON.stringify(mapTree(double, tree)))
console.log(\`тождество: \${same(mapTree(id, tree), tree)}\`)
console.log(\`композиция: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`,
        en: `// mapTree :: ((a -> b), Tree a) -> Tree b
// your code

const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] },
  ],
}

const id = (x) => x
const inc = (x) => x + 1
const double = (x) => x * 2
// same :: (a, a) -> Boolean
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

console.log(JSON.stringify(mapTree(double, tree)))
console.log(\`identity: \${same(mapTree(id, tree), tree)}\`)
console.log(\`composition: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`,
      },
      solution: {
        ru: `// mapTree :: ((a -> b), Tree a) -> Tree b
const mapTree = (fn, tree) => ({
  value: fn(tree.value),
  // те же дети в том же порядке: map массива сохраняет структуру
  children: tree.children.map((child) => mapTree(fn, child)),
})

const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] },
  ],
}

const id = (x) => x
const inc = (x) => x + 1
const double = (x) => x * 2
// same :: (a, a) -> Boolean
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

console.log(JSON.stringify(mapTree(double, tree)))
console.log(\`тождество: \${same(mapTree(id, tree), tree)}\`)
console.log(\`композиция: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`,
        en: `// mapTree :: ((a -> b), Tree a) -> Tree b
const mapTree = (fn, tree) => ({
  value: fn(tree.value),
  // the same children in the same order: the array's map keeps the structure
  children: tree.children.map((child) => mapTree(fn, child)),
})

const tree = {
  value: 1,
  children: [
    { value: 2, children: [] },
    { value: 3, children: [{ value: 4, children: [] }] },
  ],
}

const id = (x) => x
const inc = (x) => x + 1
const double = (x) => x * 2
// same :: (a, a) -> Boolean
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

console.log(JSON.stringify(mapTree(double, tree)))
console.log(\`identity: \${same(mapTree(id, tree), tree)}\`)
console.log(\`composition: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`,
      },
      expected: {
        ru: "{\"value\":2,\"children\":[{\"value\":4,\"children\":[]},{\"value\":6,\"children\":[{\"value\":8,\"children\":[]}]}]}\nтождество: true\nкомпозиция: true",
        en: "{\"value\":2,\"children\":[{\"value\":4,\"children\":[]},{\"value\":6,\"children\":[{\"value\":8,\"children\":[]}]}]}\nidentity: true\ncomposition: true",
      },
    },
    {
      task: {
        ru: "В заготовке список товаров проходит через три map подряд: взять цену, применить скидку 10 % и отформатировать строку. Счётчик passes считает, сколько раз обходили массив. Опираясь на закон композиции, получите тот же результат after за один проход: один вызов map с композицией трёх функций через R.pipe или R.compose. После рефакторинга счётчик должен показать 1, а результат совпасть с прежним.",
        en: "In the starter a list of products goes through three maps in a row: take the price, apply a 10 % discount and format the string. The passes counter counts how many times the array was traversed. Relying on the composition law, get the same result after in a single pass: one call to map with the composition of the three functions via R.pipe or R.compose. After the refactoring the counter should show 1, and the result should match the previous one.",
      },
      starter: {
        ru: `const products = [
  { title: 'keyboard', price: 1000 },
  { title: 'mouse', price: 450 },
  { title: 'cable', price: 120 },
]

// сколько раз обходили массив
let passes = 0
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => {
  passes += 1
  return arr.map(fn)
}

// getPrice :: Object -> Number
const getPrice = (product) => product.price
// discount :: Number -> Number — скидка 10 %
const discount = (price) => price * 0.9
// format :: Number -> String
const format = (price) => price.toFixed(2)

// три прохода
const before = map(format)(map(discount)(map(getPrice)(products)))
const passesBefore = passes

passes = 0
// ваш код: after — тот же результат за один проход

console.log(JSON.stringify(before))
console.log(\`проходов до: \${passesBefore}\`)
console.log(\`проходов после: \${passes}\`)
console.log(\`результат тот же: \${JSON.stringify(after) === JSON.stringify(before)}\`)`,
        en: `const products = [
  { title: 'keyboard', price: 1000 },
  { title: 'mouse', price: 450 },
  { title: 'cable', price: 120 },
]

// how many times the array was traversed
let passes = 0
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => {
  passes += 1
  return arr.map(fn)
}

// getPrice :: Object -> Number
const getPrice = (product) => product.price
// discount :: Number -> Number, a 10 % discount
const discount = (price) => price * 0.9
// format :: Number -> String
const format = (price) => price.toFixed(2)

// three passes
const before = map(format)(map(discount)(map(getPrice)(products)))
const passesBefore = passes

passes = 0
// your code: after, the same result in a single pass

console.log(JSON.stringify(before))
console.log(\`passes before: \${passesBefore}\`)
console.log(\`passes after: \${passes}\`)
console.log(\`same result: \${JSON.stringify(after) === JSON.stringify(before)}\`)`,
      },
      solution: {
        ru: `const products = [
  { title: 'keyboard', price: 1000 },
  { title: 'mouse', price: 450 },
  { title: 'cable', price: 120 },
]

// сколько раз обходили массив
let passes = 0
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => {
  passes += 1
  return arr.map(fn)
}

// getPrice :: Object -> Number
const getPrice = (product) => product.price
// discount :: Number -> Number — скидка 10 %
const discount = (price) => price * 0.9
// format :: Number -> String
const format = (price) => price.toFixed(2)

// три прохода
const before = map(format)(map(discount)(map(getPrice)(products)))
const passesBefore = passes

passes = 0
// map(format) . map(discount) . map(getPrice) = map(format . discount . getPrice)
// R.pipe выполняет функции слева направо: сначала getPrice, затем discount и format
const after = map(R.pipe(getPrice, discount, format))(products)

console.log(JSON.stringify(before))
console.log(\`проходов до: \${passesBefore}\`)
console.log(\`проходов после: \${passes}\`)
console.log(\`результат тот же: \${JSON.stringify(after) === JSON.stringify(before)}\`)`,
        en: `const products = [
  { title: 'keyboard', price: 1000 },
  { title: 'mouse', price: 450 },
  { title: 'cable', price: 120 },
]

// how many times the array was traversed
let passes = 0
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => {
  passes += 1
  return arr.map(fn)
}

// getPrice :: Object -> Number
const getPrice = (product) => product.price
// discount :: Number -> Number, a 10 % discount
const discount = (price) => price * 0.9
// format :: Number -> String
const format = (price) => price.toFixed(2)

// three passes
const before = map(format)(map(discount)(map(getPrice)(products)))
const passesBefore = passes

passes = 0
// map(format) . map(discount) . map(getPrice) = map(format . discount . getPrice)
// R.pipe runs the functions left to right: getPrice first, then discount and format
const after = map(R.pipe(getPrice, discount, format))(products)

console.log(JSON.stringify(before))
console.log(\`passes before: \${passesBefore}\`)
console.log(\`passes after: \${passes}\`)
console.log(\`same result: \${JSON.stringify(after) === JSON.stringify(before)}\`)`,
      },
      expected: {
        ru: "[\"900.00\",\"405.00\",\"108.00\"]\nпроходов до: 3\nпроходов после: 1\nрезультат тот же: true",
        en: "[\"900.00\",\"405.00\",\"108.00\"]\npasses before: 3\npasses after: 1\nsame result: true",
      },
    },
  ],
}

export default lesson
