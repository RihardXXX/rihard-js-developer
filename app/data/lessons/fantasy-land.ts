import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'fantasy-land',
  title: {
    ru: "Fantasy-land (Страна фантазий)",
    en: "Fantasy-land",
  },
  goal: {
    ru: "Понять, что такое спецификация Fantasy-land, и научиться реализовывать по ней функтор: метод fantasy-land/map и два закона, которые функтор должен соблюдать.",
    en: "Understand what the Fantasy Land specification is and learn to implement a functor according to it: the fantasy-land/map method and the two laws a functor must obey.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Спецификация Fantasy-land (Страна фантазий) — это набор правил и публичных интерфейсов, описывающих абстракции из алгебры и теории категорий.",
      en: "The Fantasy Land specification is a set of rules and public interfaces describing abstractions from algebra and category theory.",
    },
    {
      type: 'text',
      ru: "Эти правила и законы описывают алгебраические структуры.",
      en: "These rules and laws describe algebraic structures.",
    },
    {
      type: 'text',
      ru: "По сути, реализуя эти интерфейсы и законы, мы следуем спецификации Fantasy-land (Страна фантазий).",
      en: "In essence, by implementing these interfaces and laws, we follow the Fantasy Land specification.",
    },
    {
      type: 'code',
      pseudo: true,
      code: {
        ru: `// Вот как она выглядит

Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
(equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
    |           |           |           \\         / | | | | \\
    |           |           |            \\       /  | | | |  \\
    |           |           |             \\     /   | | | |   \\
    |           |           |              \\   /    | | | |    \\
    |           |           |               \\ /     | | | |     \\
  Ord      Category     Monoid         Traversable | | | |      \\
  (lte)       (id)       (empty)        (traverse)  / | | \\       \\
                            |                      /  | |  \\       \\
                            |                     /   / \\   \\       \\
                            |             Profunctor /   \\ Bifunctor \\
                            |              (promap) /     \\ (bimap)   \\
                            |                      /       \\           \\
                          Group                   /         \\           \\
                        (invert)               Alt        Apply      Extend
                                              (alt)        (ap)     (extend)
                                                /           / \\           \\
                                              /           /   \\           \\
                                              /           /     \\           \\
                                            /           /       \\           \\
                                            /           /         \\           \\
                                          Plus    Applicative    Chain      Comonad
                                        (zero)       (of)      (chain)    (extract)
                                            \\         / \\         / \\
                                            \\       /   \\       /   \\
                                              \\     /     \\     /     \\
                                              \\   /       \\   /       \\
                                                \\ /         \\ /         \\
                                            Alternative    Monad     ChainRec
                                                                    (chainRec)`,
        en: `// This is what it looks like

Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
(equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
    |           |           |           \\         / | | | | \\
    |           |           |            \\       /  | | | |  \\
    |           |           |             \\     /   | | | |   \\
    |           |           |              \\   /    | | | |    \\
    |           |           |               \\ /     | | | |     \\
  Ord      Category     Monoid         Traversable | | | |      \\
  (lte)       (id)       (empty)        (traverse)  / | | \\       \\
                            |                      /  | |  \\       \\
                            |                     /   / \\   \\       \\
                            |             Profunctor /   \\ Bifunctor \\
                            |              (promap) /     \\ (bimap)   \\
                            |                      /       \\           \\
                          Group                   /         \\           \\
                        (invert)               Alt        Apply      Extend
                                              (alt)        (ap)     (extend)
                                                /           / \\           \\
                                              /           /   \\           \\
                                              /           /     \\           \\
                                            /           /       \\           \\
                                            /           /         \\           \\
                                          Plus    Applicative    Chain      Comonad
                                        (zero)       (of)      (chain)    (extract)
                                            \\         / \\         / \\
                                            \\       /   \\       /   \\
                                              \\     /     \\     /     \\
                                              \\   /       \\   /       \\
                                                \\ /         \\ /         \\
                                            Alternative    Monad     ChainRec
                                                                    (chainRec)`,
      },
    },
    {
      type: 'text',
      ru: "Давайте мы попробуем с вами создать Functor (функтор) согласно спецификации Fantasy-land (Страна фантазий). Кроме метода fantasy-land/map, функтор должен соблюдать два закона. Тождество: u['fantasy-land/map'](a => a) эквивалентно u. Композиция: u['fantasy-land/map'](x => f(g(x))) эквивалентно u['fantasy-land/map'](g)['fantasy-land/map'](f).",
      en: "Let's try to create a Functor according to the Fantasy Land specification. Besides the fantasy-land/map method, a functor must obey two laws. Identity: u['fantasy-land/map'](a => a) is equivalent to u. Composition: u['fantasy-land/map'](x => f(g(x))) is equivalent to u['fantasy-land/map'](g)['fantasy-land/map'](f).",
    },
    {
      type: 'code',
      code: {
        ru: `// Сигнатура
// fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b

// Создание функтора
// ==== синтаксис es5 ======

// подготавливаем прототип для функции-конструктора
// без наследования от Object.prototype, которое есть по умолчанию
var prototypeFunctor = Object.create(null)

// Название строки функции и метода согласно спецификации
var FANTASY_LAND_MAP = 'fantasy-land/map'

// создаем функцию-конструктор
function Functor(value) {
  this.value = value
}

// создаем правильные связи между прототипом и функцией-конструктором
Functor.prototype = prototypeFunctor
prototypeFunctor.constructor = Functor

//  а вот теперь самое главное: реализуем интерфейс функтора
prototypeFunctor[FANTASY_LAND_MAP] = function (fn) {
  return new Functor(fn(this.value))
}

// Давайте разделим ключевую логику на части
// return new Functor(fn(this.value))
// 1. Текущее содержимое контейнера мы пропускаем через функцию
// fn(this.value)
// 2. Возвращаем новый экземпляр типа функтор уже с новым значением
// return new Functor(тут результат инструкции выше)

// Пример
var functorObj = new Functor(5)

var functorResult = functorObj[FANTASY_LAND_MAP](function (value) { return value * 2 })

// отсутствуют мутации
// реализован интерфейс спецификации
console.log(functorObj.value) // 5
console.log(functorResult.value) // 10

// =========================

// Полифил
// как устроен примерно внутри Object.create(objectProto)
// (упрощенно: без второго аргумента и без поддержки null)
var createObjectProto = function (obj) {
  // для создания экземпляра формируем конструктор
  function XXX() {}

  // устанавливаем правильные ссылки
  XXX.prototype = obj || Object.prototype
  // constructor не переписываем: иначе мы изменили бы переданный obj,
  // а без аргумента — общий для всех объектов Object.prototype

  // создаем экземпляр и возвращаем
  return new XXX()
}`,
        en: `// Signature
// fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b

// Creating a functor
// ==== es5 syntax ======

// prepare the prototype for the constructor function
// without the inheritance from Object.prototype that is there by default
var prototypeFunctor = Object.create(null)

// The method name as defined by the specification
var FANTASY_LAND_MAP = 'fantasy-land/map'

// create the constructor function
function Functor(value) {
  this.value = value
}

// wire up the prototype and the constructor function correctly
Functor.prototype = prototypeFunctor
prototypeFunctor.constructor = Functor

//  and now the most important part: implement the functor interface
prototypeFunctor[FANTASY_LAND_MAP] = function (fn) {
  return new Functor(fn(this.value))
}

// Let's break the key logic into parts
// return new Functor(fn(this.value))
// 1. We pass the current contents of the container through the function
// fn(this.value)
// 2. We return a new functor instance that holds the new value
// return new Functor(the result of the step above)

// Example
var functorObj = new Functor(5)

var functorResult = functorObj[FANTASY_LAND_MAP](function (value) { return value * 2 })

// no mutations
// the specification interface is implemented
console.log(functorObj.value) // 5
console.log(functorResult.value) // 10

// =========================

// Polyfill
// roughly how Object.create(objectProto) works inside
// (simplified: no second argument and no support for null)
var createObjectProto = function (obj) {
  // build a constructor to create the instance
  function XXX() {}

  // set up the correct links
  XXX.prototype = obj || Object.prototype
  // we don't overwrite constructor: otherwise we would change the obj passed in,
  // or, without an argument, Object.prototype, which all objects share

  // create the instance and return it
  return new XXX()
}`,
      },
    },
    {
      type: 'code',
      code: {
        ru: `// ==== синтаксис es6 ======
// тут все гораздо проще
// тут в прототипе мы также можем уничтожить дефолтное наследование Object.prototype
const FANTASY_LAND_MAP = 'fantasy-land/map'

class Functor {
  constructor (value) {
    this.value = value
  }

  // этот метод и так уже будет храниться по дефолту в прототипе
  [FANTASY_LAND_MAP] (fn) {
    return new Functor(fn(this.value))
  }
}

// Пример, описанный выше, также сработает
const functorObj = new Functor(5)
// =========================


// ==== через чистые функции ======
// Создание функтора без создания экземпляров
// через чистые функции
const functor = value => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value))
})

// создали объект и вернули его
const objA = functor(10)
const objB = objA[FANTASY_LAND_MAP](value => value - 5)

console.log(objA.value) // 10
console.log(objB.value) // 5

// =========================`,
        en: `// ==== es6 syntax ======
// everything is much simpler here
// here we can also remove the default inheritance from Object.prototype in the prototype
const FANTASY_LAND_MAP = 'fantasy-land/map'

class Functor {
  constructor (value) {
    this.value = value
  }

  // this method is stored in the prototype by default anyway
  [FANTASY_LAND_MAP] (fn) {
    return new Functor(fn(this.value))
  }
}

// The example described above will work as well
const functorObj = new Functor(5)
// =========================


// ==== with pure functions ======
// Creating a functor without creating instances
// using pure functions
const functor = value => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value))
})

// we created an object and returned it
const objA = functor(10)
const objB = objA[FANTASY_LAND_MAP](value => value - 5)

console.log(objA.value) // 10
console.log(objB.value) // 5

// =========================`,
      },
    },
  ],
  summary: [
    {
      ru: "Fantasy-land — спецификация: набор правил и публичных интерфейсов, описывающих абстракции из алгебры и теории категорий. Реализуя эти интерфейсы и законы, мы следуем спецификации.",
      en: "Fantasy Land is a specification: a set of rules and public interfaces describing abstractions from algebra and category theory. By implementing these interfaces and laws, we follow the specification.",
    },
    {
      ru: "Функтор реализует метод fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b: пропускает содержимое контейнера через функцию и возвращает новый функтор с новым значением.",
      en: "A functor implements the fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b method: it passes the contents of the container through the function and returns a new functor that holds the new value.",
    },
    {
      ru: "Кроме метода, функтор соблюдает два закона: тождество — u['fantasy-land/map'](a => a) эквивалентно u — и композицию — u['fantasy-land/map'](x => f(g(x))) эквивалентно u['fantasy-land/map'](g)['fantasy-land/map'](f).",
      en: "Besides the method, a functor obeys two laws: identity, where u['fantasy-land/map'](a => a) is equivalent to u, and composition, where u['fantasy-land/map'](x => f(g(x))) is equivalent to u['fantasy-land/map'](g)['fantasy-land/map'](f).",
    },
    {
      ru: "map не мутирует исходный функтор: у него остаётся прежнее значение.",
      en: "map does not mutate the original functor: it keeps its previous value.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "По образцу функтора на чистых функциях из урока реализуйте функтор list для массивов: list(items) возвращает объект с полем items и методом fantasy-land/map, который применяет функцию к каждому элементу и возвращает новый list. Примените к списку слов два map подряд: сначала переведите слова в верхний регистр, затем замените их длинами. Убедитесь, что исходный list не изменился.",
        en: "Following the pure-function functor from the lesson, implement a list functor for arrays: list(items) returns an object with an items field and a fantasy-land/map method that applies the function to every element and returns a new list. Apply two maps in a row to a list of words: first convert the words to upper case, then replace them with their lengths. Make sure the original list has not changed.",
      },
      starter: {
        ru: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// ваш код: list :: [a] -> List a

const names = list(['map', 'filter', 'reduce'])
const upper = names[FANTASY_LAND_MAP]((word) => word.toUpperCase())
const lengths = upper[FANTASY_LAND_MAP]((word) => word.length)

console.log(JSON.stringify(names.items))
console.log(JSON.stringify(upper.items))
console.log(JSON.stringify(lengths.items))`,
        en: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// your code: list :: [a] -> List a

const names = list(['map', 'filter', 'reduce'])
const upper = names[FANTASY_LAND_MAP]((word) => word.toUpperCase())
const lengths = upper[FANTASY_LAND_MAP]((word) => word.length)

console.log(JSON.stringify(names.items))
console.log(JSON.stringify(upper.items))
console.log(JSON.stringify(lengths.items))`,
      },
      solution: {
        ru: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// list :: [a] -> List a
const list = (items) => ({
  items,
  // применяем функцию к каждому элементу и возвращаем новый list
  [FANTASY_LAND_MAP]: (fn) => list(items.map(fn)),
})

const names = list(['map', 'filter', 'reduce'])
const upper = names[FANTASY_LAND_MAP]((word) => word.toUpperCase())
const lengths = upper[FANTASY_LAND_MAP]((word) => word.length)

console.log(JSON.stringify(names.items)) // исходный list не изменился
console.log(JSON.stringify(upper.items))
console.log(JSON.stringify(lengths.items))`,
        en: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// list :: [a] -> List a
const list = (items) => ({
  items,
  // apply the function to every element and return a new list
  [FANTASY_LAND_MAP]: (fn) => list(items.map(fn)),
})

const names = list(['map', 'filter', 'reduce'])
const upper = names[FANTASY_LAND_MAP]((word) => word.toUpperCase())
const lengths = upper[FANTASY_LAND_MAP]((word) => word.length)

console.log(JSON.stringify(names.items)) // the original list has not changed
console.log(JSON.stringify(upper.items))
console.log(JSON.stringify(lengths.items))`,
      },
      expected: {
        ru: "[\"map\",\"filter\",\"reduce\"]\n[\"MAP\",\"FILTER\",\"REDUCE\"]\n[3,6,6]",
        en: "[\"map\",\"filter\",\"reduce\"]\n[\"MAP\",\"FILTER\",\"REDUCE\"]\n[3,6,6]",
      },
    },
    {
      task: {
        ru: "Напишите checkLaws(name, u, f, g): она проверяет для контейнера u оба закона функтора и печатает две строки — для тождества и для композиции, например «functor — тождество: true» и «functor — композиция: true». Контейнеры сравнивайте через JSON.stringify: он пропускает методы, поэтому сравниваются только данные. Проверьте функтор functor из урока и контейнер counted, который при каждом map увеличивает счётчик вызовов count. Почему counted — не функтор, хотя метод fantasy-land/map у него есть?",
        en: "Write checkLaws(name, u, f, g): it checks both functor laws for the container u and prints two lines, one for identity and one for composition, for example \"functor — identity: true\" and \"functor — composition: true\". Compare containers via JSON.stringify: it skips methods, so only the data is compared. Check the functor from the lesson and a counted container that increases its count of calls on every map. Why is counted not a functor even though it has a fantasy-land/map method?",
      },
      starter: {
        ru: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// функтор из урока
const functor = (value) => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value)),
})

// контейнер, который считает вызовы map
const counted = (value, count = 0) => ({
  value,
  count,
  [FANTASY_LAND_MAP]: (fn) => counted(fn(value), count + 1),
})

// JSON.stringify пропускает методы: сравниваем только данные
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// ваш код: checkLaws

const double = (x) => x * 2
const inc = (x) => x + 1

checkLaws('functor', functor(5), double, inc)
checkLaws('counted', counted(5), double, inc)`,
        en: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// the functor from the lesson
const functor = (value) => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value)),
})

// a container that counts the calls to map
const counted = (value, count = 0) => ({
  value,
  count,
  [FANTASY_LAND_MAP]: (fn) => counted(fn(value), count + 1),
})

// JSON.stringify skips methods: we compare only the data
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

// your code: checkLaws

const double = (x) => x * 2
const inc = (x) => x + 1

checkLaws('functor', functor(5), double, inc)
checkLaws('counted', counted(5), double, inc)`,
      },
      solution: {
        ru: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// функтор из урока
const functor = (value) => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value)),
})

// контейнер, который считает вызовы map
const counted = (value, count = 0) => ({
  value,
  count,
  [FANTASY_LAND_MAP]: (fn) => counted(fn(value), count + 1),
})

// JSON.stringify пропускает методы: сравниваем только данные
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const checkLaws = (name, u, f, g) => {
  const map = (container, fn) => container[FANTASY_LAND_MAP](fn)
  // тождество: map(a => a) эквивалентно u
  console.log(\`\${name} — тождество: \${same(map(u, (a) => a), u)}\`)
  // композиция: map(x => f(g(x))) эквивалентно map(g), затем map(f)
  console.log(\`\${name} — композиция: \${same(map(u, (x) => f(g(x))), map(map(u, g), f))}\`)
}

const double = (x) => x * 2
const inc = (x) => x + 1

checkLaws('functor', functor(5), double, inc)
checkLaws('counted', counted(5), double, inc)

// counted не функтор: map меняет не только значение, но и счётчик.
// Поэтому map(a => a) даёт не тот же контейнер, что u,
// а два map подряд дают другой count, чем один map с композицией`,
        en: `const FANTASY_LAND_MAP = 'fantasy-land/map'

// the functor from the lesson
const functor = (value) => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value)),
})

// a container that counts the calls to map
const counted = (value, count = 0) => ({
  value,
  count,
  [FANTASY_LAND_MAP]: (fn) => counted(fn(value), count + 1),
})

// JSON.stringify skips methods: we compare only the data
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b)

const checkLaws = (name, u, f, g) => {
  const map = (container, fn) => container[FANTASY_LAND_MAP](fn)
  // identity: map(a => a) is equivalent to u
  console.log(\`\${name} — identity: \${same(map(u, (a) => a), u)}\`)
  // composition: map(x => f(g(x))) is equivalent to map(g) followed by map(f)
  console.log(\`\${name} — composition: \${same(map(u, (x) => f(g(x))), map(map(u, g), f))}\`)
}

const double = (x) => x * 2
const inc = (x) => x + 1

checkLaws('functor', functor(5), double, inc)
checkLaws('counted', counted(5), double, inc)

// counted is not a functor: map changes not only the value but also the count.
// So map(a => a) does not give the same container as u,
// and two maps in a row give a different count than one map with the composition`,
      },
      expected: {
        ru: "functor — тождество: true\nfunctor — композиция: true\ncounted — тождество: false\ncounted — композиция: false",
        en: "functor — identity: true\nfunctor — composition: true\ncounted — identity: false\ncounted — composition: false",
      },
    },
  ],
}

export default lesson
