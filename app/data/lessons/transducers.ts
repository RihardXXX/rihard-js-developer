import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'transducers',
  title: { ru: "Трансдьюсеры", en: "Transducers" },
  description: {
    ru: "Трансдьюсеры в JavaScript: цепочка map и filter без промежуточных массивов, редьюсер и его трансформер, порядок шагов в R.compose, R.transduce и R.into.",
    en: "Transducers in JavaScript: map and filter without intermediate arrays, reducers and reducer transformers, step order in R.compose, R.transduce and R.into.",
  },
  goal: {
    ru: "Понять, почему цепочка map и filter создаёт промежуточные массивы, научиться писать трансдьюсеры как трансформеры редьюсера, композировать их через compose, пользоваться R.transduce и R.into и оценивать, когда это окупается.",
    en: "Understand why a map and filter chain creates intermediate arrays, learn to write transducers as reducer transformers, compose them with compose, use R.transduce and R.into, and judge when it pays off.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Цепочка map и filter читается хорошо, но у неё есть цена. Каждый шаг проходит весь массив и создаёт новый. В filter(isEven), map(square), filter(isBig) три прохода и три новых массива, причём два из них промежуточные: они нужны только как вход для следующего шага. В уроке «Производительность» мы уже считали такие накладные расходы вызовами колбэков, теперь посчитаем и массивы.",
      en: "A map and filter chain reads well, but it has a cost. Each step walks the whole array and creates a new one. filter(isEven), map(square), filter(isBig) means three passes and three new arrays, two of them intermediate: they are needed only as input for the next step. In the \"Performance\" lesson we already counted this overhead in callback calls; now let's count the arrays too.",
    },
    {
      type: 'code',
      code: {
        ru: `// счётчики: сколько массивов создано и сколько раз вызваны шаги
const stats = { arrays: 0, calls: 0 }

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => {
  stats.arrays += 1
  return arr.map((x) => {
    stats.calls += 1
    return fn(x)
  })
}
// filter :: (a -> Boolean) -> [a] -> [a]
const filter = (pred) => (arr) => {
  stats.arrays += 1
  return arr.filter((x) => {
    stats.calls += 1
    return pred(x)
  })
}

// isEven :: Number -> Boolean
const isEven = (n) => n % 2 === 0
// square :: Number -> Number
const square = (n) => n * n
// isBig :: Number -> Boolean
const isBig = (n) => n > 100000

// числа от 1 до 1000
const numbers = R.range(1, 1001)

const result = R.pipe(filter(isEven), map(square), filter(isBig))(numbers)

console.log('чисел в результате: ' + result.length) // чисел в результате: 342
// 1000 вызовов первого filter, 500 вызовов map и 500 вызовов второго filter
console.log('массивов: ' + stats.arrays + ', вызовов: ' + stats.calls) // массивов: 3, вызовов: 2000`,
        en: `// counters: how many arrays were created and how many times the steps were called
const stats = { arrays: 0, calls: 0 }

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => {
  stats.arrays += 1
  return arr.map((x) => {
    stats.calls += 1
    return fn(x)
  })
}
// filter :: (a -> Boolean) -> [a] -> [a]
const filter = (pred) => (arr) => {
  stats.arrays += 1
  return arr.filter((x) => {
    stats.calls += 1
    return pred(x)
  })
}

// isEven :: Number -> Boolean
const isEven = (n) => n % 2 === 0
// square :: Number -> Number
const square = (n) => n * n
// isBig :: Number -> Boolean
const isBig = (n) => n > 100000

// the numbers from 1 to 1000
const numbers = R.range(1, 1001)

const result = R.pipe(filter(isEven), map(square), filter(isBig))(numbers)

console.log('numbers in the result: ' + result.length) // numbers in the result: 342
// 1000 calls of the first filter, 500 calls of map and 500 calls of the second filter
console.log('arrays: ' + stats.arrays + ', calls: ' + stats.calls) // arrays: 3, calls: 2000`,
      },
    },
    {
      type: 'text',
      ru: "Можно склеить все шаги в один reduce, как в упражнении урока «Производительность», но тогда они сольются в один колбэк и перестанут быть отдельными функциями. Трансдьюсеры дают и то и другое: шаги остаются отдельными и композируемыми, а данные проходят через них за один проход, без промежуточных массивов. Идея пришла из языка Clojure, где трансдьюсеры предложил Рич Хикки в 2014 году.",
      en: "You could merge all the steps into a single reduce, as in the exercise of the \"Performance\" lesson, but then they would fuse into one callback and stop being separate functions. Transducers give you both: the steps stay separate and composable, and the data goes through them in a single pass, with no intermediate arrays. The idea comes from Clojure, where Rich Hickey proposed transducers in 2014.",
    },
    {
      type: 'heading',
      ru: "Редьюсер и трансформер редьюсера",
      en: "A reducer and a reducer transformer",
    },
    {
      type: 'text',
      ru: "Редьюсер — функция, которую принимает reduce: (acc, x) => newAcc. Она получает накопленное значение и очередной элемент и возвращает новое накопленное значение. Сумма — редьюсер, добавление элемента в конец массива — тоже редьюсер.",
      en: "A reducer is the function that reduce takes: (acc, x) => newAcc. It receives the accumulated value and the next element and returns the new accumulated value. Summing is a reducer, and so is appending an element to an array.",
    },
    {
      type: 'text',
      ru: "Трансдьюсер — это трансформер редьюсера: функция, которая принимает редьюсер и возвращает новый редьюсер. mapping(f) делает из редьюсера такой, который сначала применяет f к элементу, а filtering(pred) — такой, который пропускает к исходному редьюсеру только подходящие элементы. Ни один из них не знает, что делает редьюсер: копит массив, считает сумму или собирает строку.",
      en: "A transducer is a reducer transformer: a function that takes a reducer and returns a new reducer. mapping(f) turns a reducer into one that applies f to the element first, and filtering(pred) turns it into one that lets only matching elements through to the original reducer. Neither of them knows what the reducer does: collects an array, computes a sum or builds a string.",
    },
    {
      type: 'code',
      code: {
        ru: `// === редьюсеры: (acc, x) -> acc ===
// pushTo :: ([a], a) -> [a]
// меняет только аккумулятор, который мы создали для этой свёртки;
// копия [...acc, x] на каждом шаге дала бы квадратичную работу
const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
// sum :: (Number, Number) -> Number
const sum = (acc, x) => acc + x

// === трансдьюсеры: принимают редьюсер и возвращают редьюсер ===
// mapping :: (a -> b) -> ((acc, b) -> acc) -> ((acc, a) -> acc)
const mapping = (fn) => (reducer) => (acc, x) => reducer(acc, fn(x))
// filtering :: (a -> Boolean) -> ((acc, a) -> acc) -> ((acc, a) -> acc)
const filtering = (pred) => (reducer) => (acc, x) => (pred(x) ? reducer(acc, x) : acc)

// isEven :: Number -> Boolean
const isEven = (n) => n % 2 === 0
// square :: Number -> Number
const square = (n) => n * n

// вручную: mapping оборачивает pushTo, filtering оборачивает то, что получилось
const evenSquaresToArray = filtering(isEven)(mapping(square)(pushTo))
console.log([1, 2, 3, 4, 5, 6].reduce(evenSquaresToArray, []).join(', ')) // 4, 16, 36

// те же шаги с другим редьюсером: сумма вместо массива
const evenSquaresSum = filtering(isEven)(mapping(square)(sum))
console.log([1, 2, 3, 4, 5, 6].reduce(evenSquaresSum, 0)) // 56`,
        en: `// === reducers: (acc, x) -> acc ===
// pushTo :: ([a], a) -> [a]
// changes only the accumulator we created for this fold;
// copying [...acc, x] on every step would mean quadratic work
const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
// sum :: (Number, Number) -> Number
const sum = (acc, x) => acc + x

// === transducers: take a reducer and return a reducer ===
// mapping :: (a -> b) -> ((acc, b) -> acc) -> ((acc, a) -> acc)
const mapping = (fn) => (reducer) => (acc, x) => reducer(acc, fn(x))
// filtering :: (a -> Boolean) -> ((acc, a) -> acc) -> ((acc, a) -> acc)
const filtering = (pred) => (reducer) => (acc, x) => (pred(x) ? reducer(acc, x) : acc)

// isEven :: Number -> Boolean
const isEven = (n) => n % 2 === 0
// square :: Number -> Number
const square = (n) => n * n

// by hand: mapping wraps pushTo, filtering wraps the result
const evenSquaresToArray = filtering(isEven)(mapping(square)(pushTo))
console.log([1, 2, 3, 4, 5, 6].reduce(evenSquaresToArray, []).join(', ')) // 4, 16, 36

// the same steps with another reducer: a sum instead of an array
const evenSquaresSum = filtering(isEven)(mapping(square)(sum))
console.log([1, 2, 3, 4, 5, 6].reduce(evenSquaresSum, 0)) // 56`,
      },
    },
    {
      type: 'heading',
      ru: "Композиция трансдьюсеров",
      en: "Composing transducers",
    },
    {
      type: 'text',
      ru: "Трансдьюсер — функция одного аргумента, поэтому трансдьюсеры композируются через compose. Порядок записи здесь непривычный: в compose(filtering(isEven), mapping(square)) элементы сначала фильтруются и только потом возводятся в квадрат. Шаги выполняются слева направо, как в pipe.",
      en: "A transducer is a function of one argument, so transducers compose with compose. The order of writing is unusual here: in compose(filtering(isEven), mapping(square)) the elements are filtered first and only then squared. The steps run left to right, as in pipe.",
    },
    {
      type: 'text',
      ru: "Почему так. compose действительно применяет функции справа налево, но применяет их к редьюсеру, а не к данным. Сначала mapping(square) оборачивает конечный редьюсер, затем filtering(isEven) оборачивает то, что получилось. Самая левая обёртка оказывается внешней, и каждый элемент первым попадает именно в неё. Обёртки строятся справа налево, а данные проходят через них слева направо.",
      en: "Here is why. compose does apply functions right to left, but it applies them to the reducer, not to the data. First mapping(square) wraps the final reducer, then filtering(isEven) wraps the result. The leftmost wrapper ends up outermost, and every element reaches it first. The wrappers are built right to left, and the data goes through them left to right.",
    },
    {
      type: 'code',
      code: {
        ru: `// compose :: ((y -> z), ..., (a -> b)) -> a -> z
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

// transduce :: (трансдьюсер, редьюсер, acc, [a]) -> acc
const transduce = (xform, reducer, init, arr) => arr.reduce(xform(reducer), init)

// mapping и filtering из предыдущего примера
const mapping = (fn) => (reducer) => (acc, x) => reducer(acc, fn(x))
const filtering = (pred) => (reducer) => (acc, x) => (pred(x) ? reducer(acc, x) : acc)

// счётчики: массивы создаём только через newArray, шаги считает counted
const stats = { arrays: 0, calls: 0 }
const newArray = () => {
  stats.arrays += 1
  return []
}
const counted = (fn) => (x) => {
  stats.calls += 1
  return fn(x)
}

const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
const isEven = (n) => n % 2 === 0
const square = (n) => n * n
const isBig = (n) => n > 100000

// шаги записаны в порядке выполнения: filter, map, filter
const xform = compose(
  filtering(counted(isEven)),
  mapping(counted(square)),
  filtering(counted(isBig)),
)

const result = transduce(xform, pushTo, newArray(), R.range(1, 1001))

console.log('чисел в результате: ' + result.length) // чисел в результате: 342
// один проход, один массив — аккумулятор, а вызовов шагов столько же, сколько в цепочке
console.log('массивов: ' + stats.arrays + ', вызовов: ' + stats.calls) // массивов: 1, вызовов: 2000`,
        en: `// compose :: ((y -> z), ..., (a -> b)) -> a -> z
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

// transduce :: (transducer, reducer, acc, [a]) -> acc
const transduce = (xform, reducer, init, arr) => arr.reduce(xform(reducer), init)

// mapping and filtering from the previous example
const mapping = (fn) => (reducer) => (acc, x) => reducer(acc, fn(x))
const filtering = (pred) => (reducer) => (acc, x) => (pred(x) ? reducer(acc, x) : acc)

// counters: arrays are created only with newArray, counted counts the steps
const stats = { arrays: 0, calls: 0 }
const newArray = () => {
  stats.arrays += 1
  return []
}
const counted = (fn) => (x) => {
  stats.calls += 1
  return fn(x)
}

const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
const isEven = (n) => n % 2 === 0
const square = (n) => n * n
const isBig = (n) => n > 100000

// the steps are written in the order they run: filter, map, filter
const xform = compose(
  filtering(counted(isEven)),
  mapping(counted(square)),
  filtering(counted(isBig)),
)

const result = transduce(xform, pushTo, newArray(), R.range(1, 1001))

console.log('numbers in the result: ' + result.length) // numbers in the result: 342
// one pass, one array (the accumulator), and as many step calls as in the chain
console.log('arrays: ' + stats.arrays + ', calls: ' + stats.calls) // arrays: 1, calls: 2000`,
      },
    },
    {
      type: 'heading',
      ru: "Трансдьюсеры в Ramda",
      en: "Transducers in Ramda",
    },
    {
      type: 'text',
      ru: "В Ramda map, filter, take и ряд других функций списков работают как трансдьюсеры, если вызвать их без данных и передать результат в R.transduce или R.into. R.transduce(xform, reducer, init, list) — свёртка, как наша transduce: редьюсер и начальное значение задаёте вы. R.into(acc, xform, list) выбирает редьюсер по первому аргументу: в массив элементы добавляются, к строке приписываются, а в объект копируются их свойства или пары [ключ, значение]. В документации Ramda трансформером называют объект с методами @@transducer/init, @@transducer/step и @@transducer/result, а трансдьюсером — функцию, которая принимает такой трансформер и возвращает новый. Идея та же, только вместо функции-редьюсера объект.",
      en: "In Ramda, map, filter, take and a number of other list functions work as transducers if you call them without data and pass the result to R.transduce or R.into. R.transduce(xform, reducer, init, list) is a fold like our transduce: you supply the reducer and the initial value. R.into(acc, xform, list) picks the reducer from its first argument: elements are appended to an array, concatenated to a string, or have their properties or [key, value] pairs copied into an object. The Ramda docs call an object with the @@transducer/init, @@transducer/step and @@transducer/result methods a transformer, and a function that takes such a transformer and returns a new one a transducer. The idea is the same, just with an object instead of a reducer function.",
    },
    {
      type: 'code',
      code: {
        ru: `// isEven :: Number -> Boolean
const isEven = (n) => n % 2 === 0
// числа от 1 до 10
const numbers = R.range(1, 11)

// R.filter и R.map без данных — трансдьюсеры
const xform = R.compose(R.filter(isEven), R.map((n) => n * n))

// R.into: результат той же формы, что и первый аргумент
console.log(R.into([], xform, numbers).join(', ')) // 4, 16, 36, 64, 100
console.log(R.into('', R.compose(xform, R.map((n) => n + ';')), numbers)) // 4;16;36;64;100;
// R.transduce: свой редьюсер и начальное значение
console.log(R.transduce(xform, R.add, 0, numbers)) // 220

// === одна композиция, два порядка ===
const incThenKeepEven = R.compose(R.map(R.inc), R.filter(isEven))
// как обычная функция на массиве: compose справа налево — сначала filter, потом map
console.log(incThenKeepEven([1, 2, 3, 4]).join(', ')) // 3, 5
// как трансдьюсер: слева направо — сначала map, потом filter
console.log(R.into([], incThenKeepEven, [1, 2, 3, 4]).join(', ')) // 2, 4

// === ранняя остановка ===
let chainCalls = 0
const chainResult = R.range(1, 1001)
  .map((n) => {
    chainCalls += 1
    return n * n
  })
  .filter((n) => n > 100)
  .slice(0, 3)
console.log(chainResult.join(', ') + ', вызовов map: ' + chainCalls) // 121, 144, 169, вызовов map: 1000

let xformCalls = 0
const firstThree = R.compose(
  R.map((n) => {
    xformCalls += 1
    return n * n
  }),
  R.filter((n) => n > 100),
  R.take(3), // набрал три элемента — свёртка останавливается
)
console.log(R.into([], firstThree, R.range(1, 1001)).join(', ') + ', вызовов map: ' + xformCalls) // 121, 144, 169, вызовов map: 13`,
        en: `// isEven :: Number -> Boolean
const isEven = (n) => n % 2 === 0
// the numbers from 1 to 10
const numbers = R.range(1, 11)

// R.filter and R.map without data are transducers
const xform = R.compose(R.filter(isEven), R.map((n) => n * n))

// R.into: the result has the same shape as the first argument
console.log(R.into([], xform, numbers).join(', ')) // 4, 16, 36, 64, 100
console.log(R.into('', R.compose(xform, R.map((n) => n + ';')), numbers)) // 4;16;36;64;100;
// R.transduce: your own reducer and initial value
console.log(R.transduce(xform, R.add, 0, numbers)) // 220

// === one composition, two orders ===
const incThenKeepEven = R.compose(R.map(R.inc), R.filter(isEven))
// as a plain function on an array: compose goes right to left, filter first, then map
console.log(incThenKeepEven([1, 2, 3, 4]).join(', ')) // 3, 5
// as a transducer: left to right, map first, then filter
console.log(R.into([], incThenKeepEven, [1, 2, 3, 4]).join(', ')) // 2, 4

// === stopping early ===
let chainCalls = 0
const chainResult = R.range(1, 1001)
  .map((n) => {
    chainCalls += 1
    return n * n
  })
  .filter((n) => n > 100)
  .slice(0, 3)
console.log(chainResult.join(', ') + ', map calls: ' + chainCalls) // 121, 144, 169, map calls: 1000

let xformCalls = 0
const firstThree = R.compose(
  R.map((n) => {
    xformCalls += 1
    return n * n
  }),
  R.filter((n) => n > 100),
  R.take(3), // three elements taken: the fold stops
)
console.log(R.into([], firstThree, R.range(1, 1001)).join(', ') + ', map calls: ' + xformCalls) // 121, 144, 169, map calls: 13`,
      },
    },
    {
      type: 'heading',
      ru: "Когда это окупается",
      en: "When it pays off",
    },
    {
      type: 'text',
      ru: "При полном проходе трансдьюсеры не уменьшают число вызовов шагов: каждый элемент проходит через каждый шаг, до которого дошёл, как и в цепочке. Выигрыш в другом. Нет промежуточных массивов и лишних проходов. Свёртку можно остановить раньше, как с R.take. Один и тот же трансформ работает с любым редьюсером и с любым источником, который понимает свёртка Ramda: массивом, итерируемым объектом вроде Set или генератора, объектом с методом reduce.",
      en: "On a full pass transducers don't reduce the number of step calls: every element goes through every step it reaches, just as in the chain. The gain is elsewhere. There are no intermediate arrays and no extra passes. The fold can stop early, as with R.take. The same transformation works with any reducer and any source Ramda's fold understands: an array, an iterable such as a Set or a generator, or an object with a reduce method.",
    },
    {
      type: 'text',
      ru: "Это заметно на больших коллекциях, длинных цепочках и при ранней остановке. Для массива из сотни элементов и двух шагов цепочка map и filter проще читается и работает достаточно быстро. В ES2025 у итераторов появились свои ленивые методы map, filter и take: они тоже обрабатывают элементы по одному, без промежуточных массивов. Трансдьюсеры отличаются тем, что отделяют преобразование и от источника данных, и от способа собрать результат. Выгоду, как и в уроке «Производительность», проверяйте измерением: счётчиком массивов и вызовов или повторными замерами, а не одним запуском.",
      en: "This shows on large collections, long chains and early stopping. For an array of a hundred elements and two steps, a map and filter chain is easier to read and fast enough. ES2025 gave iterators their own lazy map, filter and take methods: they also handle elements one by one, with no intermediate arrays. Transducers differ in that they separate the transformation both from the data source and from the way the result is collected. As in the \"Performance\" lesson, check the gain by measuring: count arrays and calls, or repeat time measurements, rather than relying on a single run.",
    },
  ],
  summary: [
    {
      ru: "Каждый шаг цепочки map и filter проходит массив целиком и создаёт новый массив; промежуточные массивы нужны только как вход для следующего шага.",
      en: "Each step of a map and filter chain walks the whole array and creates a new one; the intermediate arrays are needed only as input for the next step.",
    },
    {
      ru: "Редьюсер — функция (acc, x) => acc, а трансдьюсер — трансформер редьюсера: он принимает редьюсер и возвращает новый, не зная, что тот собирает.",
      en: "A reducer is a function (acc, x) => acc, and a transducer is a reducer transformer: it takes a reducer and returns a new one without knowing what that reducer collects.",
    },
    {
      ru: "compose применяет трансдьюсеры к редьюсеру справа налево, поэтому самая левая обёртка оказывается внешней и данные проходят шаги слева направо.",
      en: "compose applies transducers to the reducer right to left, so the leftmost wrapper ends up outermost and the data goes through the steps left to right.",
    },
    {
      ru: "В Ramda map, filter и take без данных работают как трансдьюсеры: R.transduce сворачивает с вашим редьюсером, R.into собирает результат в массив, строку или объект.",
      en: "In Ramda, map, filter and take without data work as transducers: R.transduce folds with your reducer, and R.into collects the result into an array, a string or an object.",
    },
    {
      ru: "Трансдьюсеры убирают промежуточные массивы и лишние проходы и умеют останавливаться раньше; на маленьких массивах и коротких цепочках обычная цепочка проще.",
      en: "Transducers remove intermediate arrays and extra passes and can stop early; on small arrays and short chains a plain chain is simpler.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Напишите трансдьюсеры mapping и filtering и соберите из них через compose трансдьюсер paidTotals: оставить оплаченные заказы, взять их сумму total, оставить суммы от 1000. Примените его к двум редьюсерам из заготовки: с pushTo получится массив сумм, с sum — их итог. Подумайте, в каком порядке записать шаги в compose.",
        en: "Write the mapping and filtering transducers and use compose to build the paidTotals transducer from them: keep the paid orders, take their total, keep the totals of 1000 and more. Apply it to the two reducers from the starter: with pushTo you get an array of totals, with sum their grand total. Think about the order in which to write the steps in compose.",
      },
      starter: {
        ru: `const orders = [
  { id: 1, total: 1200, paid: true },
  { id: 2, total: 300, paid: false },
  { id: 3, total: 4500, paid: true },
  { id: 4, total: 800, paid: true },
  { id: 5, total: 2500, paid: false },
]

// compose :: ((y -> z), ..., (a -> b)) -> a -> z
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

// редьюсеры
// pushTo :: ([a], a) -> [a]
const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
// sum :: (Number, Number) -> Number
const sum = (acc, x) => acc + x

// ваш код: mapping, filtering и paidTotals

console.log(orders.reduce(paidTotals(pushTo), []).join(', '))
console.log(orders.reduce(paidTotals(sum), 0))`,
        en: `const orders = [
  { id: 1, total: 1200, paid: true },
  { id: 2, total: 300, paid: false },
  { id: 3, total: 4500, paid: true },
  { id: 4, total: 800, paid: true },
  { id: 5, total: 2500, paid: false },
]

// compose :: ((y -> z), ..., (a -> b)) -> a -> z
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

// reducers
// pushTo :: ([a], a) -> [a]
const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
// sum :: (Number, Number) -> Number
const sum = (acc, x) => acc + x

// your code: mapping, filtering and paidTotals

console.log(orders.reduce(paidTotals(pushTo), []).join(', '))
console.log(orders.reduce(paidTotals(sum), 0))`,
      },
      solution: {
        ru: `const orders = [
  { id: 1, total: 1200, paid: true },
  { id: 2, total: 300, paid: false },
  { id: 3, total: 4500, paid: true },
  { id: 4, total: 800, paid: true },
  { id: 5, total: 2500, paid: false },
]

// compose :: ((y -> z), ..., (a -> b)) -> a -> z
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

// редьюсеры
// pushTo :: ([a], a) -> [a]
const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
// sum :: (Number, Number) -> Number
const sum = (acc, x) => acc + x

// mapping :: (a -> b) -> ((acc, b) -> acc) -> ((acc, a) -> acc)
const mapping = (fn) => (reducer) => (acc, x) => reducer(acc, fn(x))
// filtering :: (a -> Boolean) -> ((acc, a) -> acc) -> ((acc, a) -> acc)
const filtering = (pred) => (reducer) => (acc, x) => (pred(x) ? reducer(acc, x) : acc)

// шаги записаны в порядке выполнения: самая левая обёртка внешняя,
// поэтому заказ сначала проверяется на оплату, потом превращается в сумму
const paidTotals = compose(
  filtering((order) => order.paid),
  mapping((order) => order.total),
  filtering((total) => total >= 1000),
)

console.log(orders.reduce(paidTotals(pushTo), []).join(', '))
console.log(orders.reduce(paidTotals(sum), 0))`,
        en: `const orders = [
  { id: 1, total: 1200, paid: true },
  { id: 2, total: 300, paid: false },
  { id: 3, total: 4500, paid: true },
  { id: 4, total: 800, paid: true },
  { id: 5, total: 2500, paid: false },
]

// compose :: ((y -> z), ..., (a -> b)) -> a -> z
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x)

// reducers
// pushTo :: ([a], a) -> [a]
const pushTo = (acc, x) => {
  acc.push(x)
  return acc
}
// sum :: (Number, Number) -> Number
const sum = (acc, x) => acc + x

// mapping :: (a -> b) -> ((acc, b) -> acc) -> ((acc, a) -> acc)
const mapping = (fn) => (reducer) => (acc, x) => reducer(acc, fn(x))
// filtering :: (a -> Boolean) -> ((acc, a) -> acc) -> ((acc, a) -> acc)
const filtering = (pred) => (reducer) => (acc, x) => (pred(x) ? reducer(acc, x) : acc)

// the steps are written in the order they run: the leftmost wrapper is outermost,
// so an order is checked for payment first and then turned into its total
const paidTotals = compose(
  filtering((order) => order.paid),
  mapping((order) => order.total),
  filtering((total) => total >= 1000),
)

console.log(orders.reduce(paidTotals(pushTo), []).join(', '))
console.log(orders.reduce(paidTotals(sum), 0))`,
      },
      expected: {
        ru: "1200, 4500\n5700",
        en: "1200, 4500\n5700",
      },
    },
    {
      task: {
        ru: "В заготовке имена первых трёх активных пользователей ищутся цепочкой filter, map и slice по списку из 1000 пользователей, а счётчик показывает, сколько раз вызывался предикат. Перепишите поиск через R.into, R.compose, R.filter, R.map и R.take, используя предикат isActive, и сравните число вызовов.",
        en: "In the starter, the names of the first three active users are found with a chain of filter, map and slice over a list of 1000 users, and a counter shows how many times the predicate was called. Rewrite the search with R.into, R.compose, R.filter, R.map and R.take using the isActive predicate, and compare the number of calls.",
      },
      starter: {
        ru: `// 1000 пользователей, активен каждый седьмой
const users = R.range(1, 1001).map((id) => ({ id, name: 'user' + id, active: id % 7 === 0 }))

let chainCalls = 0
const isActiveChain = (user) => {
  chainCalls += 1
  return user.active
}
const chainResult = users.filter(isActiveChain).map((user) => user.name).slice(0, 3)
console.log('цепочка: ' + chainResult.join(', ') + ', вызовов: ' + chainCalls)

let xformCalls = 0
const isActive = (user) => {
  xformCalls += 1
  return user.active
}
// ваш код: xformResult через R.into
const xformResult = []

console.log('трансдьюсер: ' + xformResult.join(', ') + ', вызовов: ' + xformCalls)`,
        en: `// 1000 users, every seventh one is active
const users = R.range(1, 1001).map((id) => ({ id, name: 'user' + id, active: id % 7 === 0 }))

let chainCalls = 0
const isActiveChain = (user) => {
  chainCalls += 1
  return user.active
}
const chainResult = users.filter(isActiveChain).map((user) => user.name).slice(0, 3)
console.log('chain: ' + chainResult.join(', ') + ', calls: ' + chainCalls)

let xformCalls = 0
const isActive = (user) => {
  xformCalls += 1
  return user.active
}
// your code: xformResult with R.into
const xformResult = []

console.log('transducer: ' + xformResult.join(', ') + ', calls: ' + xformCalls)`,
      },
      solution: {
        ru: `// 1000 пользователей, активен каждый седьмой
const users = R.range(1, 1001).map((id) => ({ id, name: 'user' + id, active: id % 7 === 0 }))

let chainCalls = 0
const isActiveChain = (user) => {
  chainCalls += 1
  return user.active
}
const chainResult = users.filter(isActiveChain).map((user) => user.name).slice(0, 3)
console.log('цепочка: ' + chainResult.join(', ') + ', вызовов: ' + chainCalls)

let xformCalls = 0
const isActive = (user) => {
  xformCalls += 1
  return user.active
}
// шаги в порядке выполнения: отобрать, взять имя, остановиться на третьем
const firstActiveNames = R.compose(R.filter(isActive), R.map(R.prop('name')), R.take(3))
const xformResult = R.into([], firstActiveNames, users)

// предикат проверил пользователей с 1 по 21: на user21 R.take набрал три имени
console.log('трансдьюсер: ' + xformResult.join(', ') + ', вызовов: ' + xformCalls)`,
        en: `// 1000 users, every seventh one is active
const users = R.range(1, 1001).map((id) => ({ id, name: 'user' + id, active: id % 7 === 0 }))

let chainCalls = 0
const isActiveChain = (user) => {
  chainCalls += 1
  return user.active
}
const chainResult = users.filter(isActiveChain).map((user) => user.name).slice(0, 3)
console.log('chain: ' + chainResult.join(', ') + ', calls: ' + chainCalls)

let xformCalls = 0
const isActive = (user) => {
  xformCalls += 1
  return user.active
}
// the steps in the order they run: select, take the name, stop at the third one
const firstActiveNames = R.compose(R.filter(isActive), R.map(R.prop('name')), R.take(3))
const xformResult = R.into([], firstActiveNames, users)

// the predicate checked users 1 to 21: at user21 R.take had collected three names
console.log('transducer: ' + xformResult.join(', ') + ', calls: ' + xformCalls)`,
      },
      expected: {
        ru: "цепочка: user7, user14, user21, вызовов: 1000\nтрансдьюсер: user7, user14, user21, вызовов: 21",
        en: "chain: user7, user14, user21, calls: 1000\ntransducer: user7, user14, user21, calls: 21",
      },
    },
  ],
}

export default lesson
