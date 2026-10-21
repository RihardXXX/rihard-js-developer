import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'memoization',
  title: { ru: "Мемоизация", en: "Memoization" },
  description: {
    ru: "Мемоизация в JavaScript: кэш результатов чистой функции в замыкании, ключ кэша, R.memoizeWith из Ramda, числа Фибоначчи, цена памяти и инвалидация кэша.",
    en: "Memoization in JavaScript: caching pure function results in a closure, cache keys, Ramda's R.memoizeWith, recursive Fibonacci, memory cost and invalidation.",
  },
  goal: {
    ru: "Понять, как мемоизация кэширует результаты чистой функции, научиться писать свою memoize и пользоваться R.memoizeWith, выбирать ключ кэша, ускорять рекурсию и учитывать цену памяти и инвалидацию.",
    en: "Understand how memoization caches the results of a pure function, learn to write your own memoize and use R.memoizeWith, choose a cache key, speed up recursion, and account for memory cost and invalidation.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Мемоизация — это кэширование результатов функции по её аргументам. При первом вызове функция считает результат и запоминает его, а при повторном вызове с теми же аргументами возвращает сохранённое значение и не считает заново. Термин ввёл британский исследователь Дональд Мичи в 1968 году.",
      en: "Memoization is caching a function's results by its arguments. On the first call the function computes the result and remembers it, and on a repeated call with the same arguments it returns the stored value without computing it again. The term was coined by the British researcher Donald Michie in 1968.",
    },
    {
      type: 'text',
      ru: "Кэш живёт в замыкании: функция memoize возвращает обёртку, и хранилище результатов доступно только этой обёртке. Для кэша удобен Map: ключом в нём может быть любое значение, а ключи сравниваются почти как через ===, только NaN считается равным NaN.",
      en: "The cache lives in a closure: memoize returns a wrapper, and only that wrapper can reach the stored results. A Map is a convenient cache: any value can be a key, and keys are compared almost as with ===, except that NaN is considered equal to NaN.",
    },
    {
      type: 'code',
      code: {
        ru: `// memoize :: (a -> b) -> (a -> b)
// для функций одного аргумента: ключ кэша — сам аргумент
const memoize = (fn) => {
  // кэш в замыкании: снаружи до него не добраться
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// счётчик показывает, сколько раз функция действительно считала;
// это побочный эффект, он здесь только для наглядности
let calls = 0

// countDivisors :: Number -> Number
// перебирает все числа от 1 до n: чем больше n, тем дольше
const countDivisors = (n) => {
  calls += 1
  return R.range(1, n + 1).filter((i) => n % i === 0).length
}

const countDivisorsMemo = memoize(countDivisors)

console.log(countDivisorsMemo(360)) // 24
console.log(countDivisorsMemo(360)) // 24, из кэша
console.log(countDivisorsMemo(1000)) // 16
console.log('вычислений: ' + calls) // вычислений: 2`,
        en: `// memoize :: (a -> b) -> (a -> b)
// for functions of one argument: the cache key is the argument itself
const memoize = (fn) => {
  // the cache lives in the closure: nothing outside can reach it
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// the counter shows how many times the function actually computed;
// it is a side effect, here only for illustration
let calls = 0

// countDivisors :: Number -> Number
// checks every number from 1 to n: the larger n, the longer it takes
const countDivisors = (n) => {
  calls += 1
  return R.range(1, n + 1).filter((i) => n % i === 0).length
}

const countDivisorsMemo = memoize(countDivisors)

console.log(countDivisorsMemo(360)) // 24
console.log(countDivisorsMemo(360)) // 24, from the cache
console.log(countDivisorsMemo(1000)) // 16
console.log('computations: ' + calls) // computations: 2`,
      },
    },
    {
      type: 'text',
      ru: "Мемоизировать можно только чистые функции. Кэш подменяет вызов сохранённым результатом, а это безопасно, только когда функция при одних и тех же аргументах всегда возвращает одно и то же и ничего не меняет снаружи. Если результат зависит от внешней переменной, кэш вернёт устаревшее значение. Если функция что-то записывает или отправляет, при повторных вызовах этого просто не произойдёт.",
      en: "Only pure functions can be memoized. The cache replaces a call with the stored result, and that is safe only when the function always returns the same thing for the same arguments and changes nothing outside. If the result depends on an outside variable, the cache returns a stale value. If the function writes or sends something, repeated calls simply won't do it.",
    },
    {
      type: 'heading',
      ru: "Ключ кэша",
      en: "The cache key",
    },
    {
      type: 'text',
      ru: "Ключ решает, какие вызовы считать одинаковыми. Для одного аргумента-примитива ключом служит сам аргумент. Объекты Map сравнивает по ссылке: объект с тем же содержимым, но созданный заново, кэш не найдёт, а объект, изменённый на месте, найдёт вместе с устаревшим результатом. Поэтому мемоизация хорошо сочетается с иммутабельными данными из урока «Иммутабельность»: новое значение — новый объект и новый ключ.",
      en: "The key decides which calls count as the same. For a single primitive argument the argument itself is the key. A Map compares objects by reference: an object with the same contents but created anew won't be found, while an object changed in place will be found together with a stale result. That is why memoization goes well with the immutable data from the \"Immutability\" lesson: a new value means a new object and a new key.",
    },
    {
      type: 'code',
      code: {
        ru: `// memoize из предыдущего примера
// memoize :: (a -> b) -> (a -> b)
const memoize = (fn) => {
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// === нечистая функция: результат зависит от внешней переменной ===
let rate = 90
// toRub :: Number -> Number
const toRub = (usd) => usd * rate
const toRubMemo = memoize(toRub)

console.log(toRubMemo(10)) // 900
rate = 100
console.log(toRub(10)) // 1000
console.log(toRubMemo(10)) // 900: курс уже другой, а результат из кэша

// === ключ-объект сравнивается по ссылке ===
let lengthCalls = 0
// nameLength :: Object -> Number
const nameLength = memoize((user) => {
  lengthCalls += 1
  return user.name.length
})

const john = { name: 'John' }
console.log(nameLength(john)) // 4
// то же содержимое, но другой объект: кэш не помог
console.log(nameLength({ name: 'John' })) // 4
console.log('вычислений: ' + lengthCalls) // вычислений: 2

// объект изменили на месте, ссылка та же: из кэша приходит старый ответ
john.name = 'Johnny'
console.log(nameLength(john)) // 4, хотя в имени уже 6 букв`,
        en: `// memoize from the previous example
// memoize :: (a -> b) -> (a -> b)
const memoize = (fn) => {
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// === an impure function: the result depends on an outside variable ===
let rate = 90
// toRub :: Number -> Number
const toRub = (usd) => usd * rate
const toRubMemo = memoize(toRub)

console.log(toRubMemo(10)) // 900
rate = 100
console.log(toRub(10)) // 1000
console.log(toRubMemo(10)) // 900: the rate has changed, but the result comes from the cache

// === an object key is compared by reference ===
let lengthCalls = 0
// nameLength :: Object -> Number
const nameLength = memoize((user) => {
  lengthCalls += 1
  return user.name.length
})

const john = { name: 'John' }
console.log(nameLength(john)) // 4
// the same contents but a different object: the cache didn't help
console.log(nameLength({ name: 'John' })) // 4
console.log('computations: ' + lengthCalls) // computations: 2

// the object was changed in place, the reference is the same: the cache returns the old answer
john.name = 'Johnny'
console.log(nameLength(john)) // 4, although the name now has 6 letters`,
      },
    },
    {
      type: 'text',
      ru: "В Ramda есть R.memoizeWith(keyFn, fn): первая функция строит ключ из аргументов, вторая считает результат. Кэш внутри — обычный объект, поэтому ключ должен быть строкой. Всё остальное приводится к строке, и любой объект превращается в один и тот же ключ «[object Object]». Если аргументов несколько, ключ собирают с разделителем: без него вызовы (1, 23) и (12, 3) дали бы одну строку «123».",
      en: "Ramda has R.memoizeWith(keyFn, fn): the first function builds a key from the arguments, the second computes the result. The cache inside is a plain object, so the key must be a string. Anything else is converted to a string, and every object turns into the same key \"[object Object]\". With several arguments, the key is built with a separator: without it the calls (1, 23) and (12, 3) would give the same string \"123\".",
    },
    {
      type: 'code',
      code: {
        ru: `let calls = 0
// area :: (Number, Number) -> Number
const area = (width, height) => {
  calls += 1
  return width * height
}

// ключ из обоих аргументов с разделителем
const areaMemo = R.memoizeWith((width, height) => width + 'x' + height, area)

console.log(areaMemo(2, 3)) // 6
console.log(areaMemo(2, 3)) // 6, из кэша
console.log(areaMemo(3, 2)) // 6, но ключ другой: 3x2
console.log('вычислений: ' + calls) // вычислений: 2

// === ошибка: ключ-объект ===
// R.identity возвращает сам объект, а в строку он превращается в '[object Object]'
const getName = R.memoizeWith(R.identity, (user) => user.name)
console.log(getName({ id: 1, name: 'John' })) // John
console.log(getName({ id: 2, name: 'Anna' })) // John: чужой результат из кэша

// ключ должен быть строкой, которая различает объекты
const getNameById = R.memoizeWith((user) => String(user.id), (user) => user.name)
console.log(getNameById({ id: 1, name: 'John' })) // John
console.log(getNameById({ id: 2, name: 'Anna' })) // Anna`,
        en: `let calls = 0
// area :: (Number, Number) -> Number
const area = (width, height) => {
  calls += 1
  return width * height
}

// a key built from both arguments with a separator
const areaMemo = R.memoizeWith((width, height) => width + 'x' + height, area)

console.log(areaMemo(2, 3)) // 6
console.log(areaMemo(2, 3)) // 6, from the cache
console.log(areaMemo(3, 2)) // 6, but the key is different: 3x2
console.log('computations: ' + calls) // computations: 2

// === a mistake: an object as the key ===
// R.identity returns the object itself, and as a string it becomes '[object Object]'
const getName = R.memoizeWith(R.identity, (user) => user.name)
console.log(getName({ id: 1, name: 'John' })) // John
console.log(getName({ id: 2, name: 'Anna' })) // John: someone else's result from the cache

// the key must be a string that tells the objects apart
const getNameById = R.memoizeWith((user) => String(user.id), (user) => user.name)
console.log(getNameById({ id: 1, name: 'John' })) // John
console.log(getNameById({ id: 2, name: 'Anna' })) // Anna`,
      },
    },
    {
      type: 'heading',
      ru: "Рекурсия: числа Фибоначчи",
      en: "Recursion: Fibonacci numbers",
    },
    {
      type: 'text',
      ru: "Больше всего мемоизация даёт там, где функция много раз вызывается с одними и теми же аргументами. Классический пример — числа Фибоначчи: fib(n) = fib(n - 1) + fib(n - 2). Наивная рекурсия считает одни и те же значения снова и снова, и число вызовов растёт экспоненциально: для fib(20) их 21 891, для fib(30) — уже 2 692 537.",
      en: "Memoization pays off most where a function is called many times with the same arguments. The classic example is Fibonacci numbers: fib(n) = fib(n - 1) + fib(n - 2). Naive recursion computes the same values again and again, and the number of calls grows exponentially: 21,891 for fib(20) and already 2,692,537 for fib(30).",
    },
    {
      type: 'text',
      ru: "Чтобы мемоизация сработала, рекурсивные вызовы должны идти через мемоизированную версию. Если обернуть готовую функцию снаружи, в кэш попадёт только верхний вызов, а рекурсия внутри пойдёт мимо него.",
      en: "For memoization to work, the recursive calls must go through the memoized version. If you wrap a finished function from the outside, only the top call gets into the cache, and the recursion inside bypasses it.",
    },
    {
      type: 'code',
      code: {
        ru: `// memoize :: (a -> b) -> (a -> b)
const memoize = (fn) => {
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// === наивная рекурсия ===
let naiveCalls = 0
// fib :: Number -> Number
const fib = (n) => {
  naiveCalls += 1
  return n < 2 ? n : fib(n - 1) + fib(n - 2)
}

console.log(fib(20)) // 6765
console.log('вызовов: ' + naiveCalls) // вызовов: 21891

// === обёртка снаружи: рекурсия идёт мимо кэша ===
naiveCalls = 0
const fibWrapped = memoize(fib)
console.log(fibWrapped(20)) // 6765
// fib внутри вызывает саму себя, а не fibWrapped
console.log('вызовов: ' + naiveCalls) // вызовов: 21891
// в кэше только верхний вызов: fibWrapped(20)
console.log(fibWrapped(20)) // 6765
console.log('вызовов: ' + naiveCalls) // вызовов: 21891

// === рекурсия через мемоизированную функцию ===
let memoCalls = 0
// fibMemo :: Number -> Number
const fibMemo = memoize((n) => {
  memoCalls += 1
  return n < 2 ? n : fibMemo(n - 1) + fibMemo(n - 2)
})

console.log(fibMemo(20)) // 6765
// каждое n от 0 до 20 считается один раз
console.log('вычислений: ' + memoCalls) // вычислений: 21
console.log(fibMemo(30)) // 832040
// к ним добавились только n от 21 до 30
console.log('вычислений: ' + memoCalls) // вычислений: 31`,
        en: `// memoize :: (a -> b) -> (a -> b)
const memoize = (fn) => {
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// === naive recursion ===
let naiveCalls = 0
// fib :: Number -> Number
const fib = (n) => {
  naiveCalls += 1
  return n < 2 ? n : fib(n - 1) + fib(n - 2)
}

console.log(fib(20)) // 6765
console.log('calls: ' + naiveCalls) // calls: 21891

// === a wrapper outside: the recursion bypasses the cache ===
naiveCalls = 0
const fibWrapped = memoize(fib)
console.log(fibWrapped(20)) // 6765
// fib calls itself inside, not fibWrapped
console.log('calls: ' + naiveCalls) // calls: 21891
// only the top call is in the cache: fibWrapped(20)
console.log(fibWrapped(20)) // 6765
console.log('calls: ' + naiveCalls) // calls: 21891

// === recursion through the memoized function ===
let memoCalls = 0
// fibMemo :: Number -> Number
const fibMemo = memoize((n) => {
  memoCalls += 1
  return n < 2 ? n : fibMemo(n - 1) + fibMemo(n - 2)
})

console.log(fibMemo(20)) // 6765
// each n from 0 to 20 is computed once
console.log('computations: ' + memoCalls) // computations: 21
console.log(fibMemo(30)) // 832040
// only n from 21 to 30 were added
console.log('computations: ' + memoCalls) // computations: 31`,
      },
    },
    {
      type: 'heading',
      ru: "Цена памяти и инвалидация",
      en: "Memory cost and invalidation",
    },
    {
      type: 'text',
      ru: "Кэш занимает память и сам не очищается. Если аргументы почти не повторяются, например это идентификаторы запросов или текст, который вводит пользователь, кэш растёт с каждым вызовом и ничего не экономит. У R.memoizeWith кэш спрятан в замыкании: ни ограничить, ни очистить его нельзя, можно только создать новую мемоизированную функцию.",
      en: "A cache takes memory and does not clean itself up. If the arguments hardly ever repeat, for example request IDs or text the user types, the cache grows with every call and saves nothing. R.memoizeWith hides its cache in a closure: you can neither limit nor clear it, you can only create a new memoized function.",
    },
    {
      type: 'text',
      ru: "Отсюда два приёма. Первый — ограничить размер. Map помнит порядок вставки, поэтому при переполнении можно удалять первую запись, а запись, к которой обратились, переставлять в конец. Получается кэш LRU (least recently used): он вытесняет то, к чему дольше всего не обращались. Второй — инвалидация. Если результат зависит от данных, которые меняются, их версию включают в ключ или сбрасывают кэш целиком. Для ключей-объектов есть WeakMap: запись в нём не мешает сборщику мусора удалить объект, когда на него больше нет других ссылок.",
      en: "Hence two techniques. The first is to limit the size. A Map remembers insertion order, so when it overflows you can delete the first entry, and move an entry to the end whenever it is accessed. This gives an LRU (least recently used) cache: it evicts whatever was accessed longest ago. The second is invalidation. If the result depends on data that changes, put the data version into the key or drop the whole cache. For object keys there is WeakMap: an entry in it doesn't stop the garbage collector from removing the object once nothing else refers to it.",
    },
    {
      type: 'code',
      code: {
        ru: `// memoizeLimited :: Number -> (a -> b) -> (a -> b)
// кэш LRU на limit записей с ручным сбросом
const memoizeLimited = (limit) => (fn) => {
  const cache = new Map()
  const memoized = (arg) => {
    if (cache.has(arg)) {
      const value = cache.get(arg)
      // переставляем запись в конец: её использовали последней
      cache.delete(arg)
      cache.set(arg, value)
      return value
    }
    const result = fn(arg)
    cache.set(arg, result)
    if (cache.size > limit) {
      // первая запись в Map — та, к которой дольше всего не обращались
      cache.delete(cache.keys().next().value)
    }
    return result
  }
  // инвалидация: сбросить весь кэш
  memoized.clear = () => cache.clear()
  memoized.size = () => cache.size
  return memoized
}

let calls = 0
// square :: Number -> Number
const square = (n) => {
  calls += 1
  return n * n
}

const squareMemo = memoizeLimited(2)(square)

squareMemo(1) // считаем
squareMemo(2) // считаем
squareMemo(1) // из кэша, 1 теперь самая свежая запись
squareMemo(3) // считаем, кэш переполнен: вытесняется 2
squareMemo(1) // из кэша
squareMemo(2) // 2 вытеснена, считаем заново
console.log('вычислений: ' + calls + ', в кэше: ' + squareMemo.size()) // вычислений: 4, в кэше: 2

squareMemo.clear()
squareMemo(1) // после сброса считаем заново
console.log('вычислений: ' + calls + ', в кэше: ' + squareMemo.size()) // вычислений: 5, в кэше: 1`,
        en: `// memoizeLimited :: Number -> (a -> b) -> (a -> b)
// an LRU cache of limit entries with a manual reset
const memoizeLimited = (limit) => (fn) => {
  const cache = new Map()
  const memoized = (arg) => {
    if (cache.has(arg)) {
      const value = cache.get(arg)
      // move the entry to the end: it was used most recently
      cache.delete(arg)
      cache.set(arg, value)
      return value
    }
    const result = fn(arg)
    cache.set(arg, result)
    if (cache.size > limit) {
      // the first entry in the Map is the one accessed longest ago
      cache.delete(cache.keys().next().value)
    }
    return result
  }
  // invalidation: drop the whole cache
  memoized.clear = () => cache.clear()
  memoized.size = () => cache.size
  return memoized
}

let calls = 0
// square :: Number -> Number
const square = (n) => {
  calls += 1
  return n * n
}

const squareMemo = memoizeLimited(2)(square)

squareMemo(1) // computed
squareMemo(2) // computed
squareMemo(1) // from the cache, 1 is now the most recent entry
squareMemo(3) // computed, the cache overflows: 2 is evicted
squareMemo(1) // from the cache
squareMemo(2) // 2 was evicted, computed again
console.log('computations: ' + calls + ', cached: ' + squareMemo.size()) // computations: 4, cached: 2

squareMemo.clear()
squareMemo(1) // computed again after the reset
console.log('computations: ' + calls + ', cached: ' + squareMemo.size()) // computations: 5, cached: 1`,
      },
    },
    {
      type: 'text',
      ru: "Мемоизация окупается, когда функция чистая, считает заметно дольше, чем строится ключ и ищется запись, и вызывается с повторяющимися аргументами. Типичные случаи — рекурсия с перекрывающимися подзадачами, разбор и форматирование одних и тех же строк, вычисление производных данных из состояния. Для дешёвых функций вроде сложения кэш только добавит работы и памяти. Как и в уроке «Производительность», выгоду проверяйте измерением, а не по одному запуску: счётчиком вычислений и попаданий в кэш или повторными замерами времени.",
      en: "Memoization pays off when the function is pure, takes noticeably longer than building a key and looking up an entry, and is called with repeating arguments. Typical cases are recursion with overlapping subproblems, parsing and formatting the same strings, and computing derived data from state. For cheap functions like addition a cache only adds work and memory. As in the \"Performance\" lesson, check the gain by measuring rather than by a single run: count computations and cache hits, or repeat time measurements.",
    },
  ],
  summary: [
    {
      ru: "Мемоизация запоминает результат функции по её аргументам и при повторном вызове с теми же аргументами возвращает его из кэша, который живёт в замыкании.",
      en: "Memoization remembers a function's result by its arguments and, on a repeated call with the same arguments, returns it from a cache that lives in a closure.",
    },
    {
      ru: "Мемоизировать можно только чистые функции: иначе кэш вернёт устаревший результат или пропустит побочный эффект.",
      en: "Only pure functions can be memoized: otherwise the cache returns a stale result or skips a side effect.",
    },
    {
      ru: "Ключ кэша решает, какие вызовы одинаковы: Map сравнивает объекты по ссылке, R.memoizeWith(keyFn, fn) ждёт ключ-строку, а для нескольких аргументов ключ собирают с разделителем.",
      en: "The cache key decides which calls are the same: a Map compares objects by reference, R.memoizeWith(keyFn, fn) expects a string key, and for several arguments the key is built with a separator.",
    },
    {
      ru: "В рекурсии вызовы должны идти через мемоизированную функцию: fib(20) без кэша делает 21 891 вызов, а с кэшем считает 21 значение.",
      en: "In recursion the calls must go through the memoized function: fib(20) without a cache makes 21,891 calls, and with a cache it computes 21 values.",
    },
    {
      ru: "Кэш стоит памяти и сам не очищается: размер ограничивают вытеснением старых записей, а при изменении внешних данных кэш сбрасывают или включают версию данных в ключ.",
      en: "A cache costs memory and doesn't clean itself up: its size is limited by evicting old entries, and when outside data changes the cache is dropped or the data version is put into the key.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Функция paths(rows, cols) считает, сколькими путями можно пройти из левого верхнего угла сетки в правый нижний, если двигаться только вправо или вниз. Наивная рекурсия для сетки 10 на 10 делает сотни тысяч вызовов. Напишите pathsMemo через R.memoizeWith: рекурсивные вызовы должны идти через кэш, а ключ — различать пары аргументов. Сравните число вызовов и вычислений.",
        en: "paths(rows, cols) counts how many paths lead from the top-left corner of a grid to the bottom-right one if you can only move right or down. Naive recursion makes hundreds of thousands of calls for a 10 by 10 grid. Write pathsMemo with R.memoizeWith: the recursive calls must go through the cache, and the key must tell pairs of arguments apart. Compare the number of calls and computations.",
      },
      starter: {
        ru: `let naiveCalls = 0
// paths :: (Number, Number) -> Number
const paths = (rows, cols) => {
  naiveCalls += 1
  if (rows === 0 || cols === 0) return 1
  return paths(rows - 1, cols) + paths(rows, cols - 1)
}

console.log(paths(10, 10))
console.log('без кэша, вызовов: ' + naiveCalls)

let memoCalls = 0
// ваш код: pathsMemo через R.memoizeWith, внутри увеличивайте memoCalls

console.log(pathsMemo(10, 10))
console.log('с кэшем, вычислений: ' + memoCalls)`,
        en: `let naiveCalls = 0
// paths :: (Number, Number) -> Number
const paths = (rows, cols) => {
  naiveCalls += 1
  if (rows === 0 || cols === 0) return 1
  return paths(rows - 1, cols) + paths(rows, cols - 1)
}

console.log(paths(10, 10))
console.log('without a cache, calls: ' + naiveCalls)

let memoCalls = 0
// your code: pathsMemo with R.memoizeWith, increment memoCalls inside

console.log(pathsMemo(10, 10))
console.log('with a cache, computations: ' + memoCalls)`,
      },
      solution: {
        ru: `let naiveCalls = 0
// paths :: (Number, Number) -> Number
const paths = (rows, cols) => {
  naiveCalls += 1
  if (rows === 0 || cols === 0) return 1
  return paths(rows - 1, cols) + paths(rows, cols - 1)
}

console.log(paths(10, 10))
console.log('без кэша, вызовов: ' + naiveCalls)

let memoCalls = 0
// pathsMemo :: (Number, Number) -> Number
// ключ из обоих аргументов с разделителем, рекурсия идёт через pathsMemo
const pathsMemo = R.memoizeWith(
  (rows, cols) => rows + ',' + cols,
  (rows, cols) => {
    memoCalls += 1
    if (rows === 0 || cols === 0) return 1
    return pathsMemo(rows - 1, cols) + pathsMemo(rows, cols - 1)
  },
)

console.log(pathsMemo(10, 10))
// каждая пара (rows, cols) считается один раз
console.log('с кэшем, вычислений: ' + memoCalls)`,
        en: `let naiveCalls = 0
// paths :: (Number, Number) -> Number
const paths = (rows, cols) => {
  naiveCalls += 1
  if (rows === 0 || cols === 0) return 1
  return paths(rows - 1, cols) + paths(rows, cols - 1)
}

console.log(paths(10, 10))
console.log('without a cache, calls: ' + naiveCalls)

let memoCalls = 0
// pathsMemo :: (Number, Number) -> Number
// a key from both arguments with a separator, the recursion goes through pathsMemo
const pathsMemo = R.memoizeWith(
  (rows, cols) => rows + ',' + cols,
  (rows, cols) => {
    memoCalls += 1
    if (rows === 0 || cols === 0) return 1
    return pathsMemo(rows - 1, cols) + pathsMemo(rows, cols - 1)
  },
)

console.log(pathsMemo(10, 10))
// each pair (rows, cols) is computed once
console.log('with a cache, computations: ' + memoCalls)`,
      },
      expected: {
        ru: "184756\nбез кэша, вызовов: 369511\n184756\nс кэшем, вычислений: 120",
        en: "184756\nwithout a cache, calls: 369511\n184756\nwith a cache, computations: 120",
      },
    },
    {
      task: {
        ru: "Функция priceWithTax берёт ставку налога в процентах из внешней переменной taxPercent, поэтому мемоизированная версия после смены ставки возвращает старые цены. Сделайте функцию чистой: ставка должна приходить аргументом. Мемоизируйте её через R.memoizeWith так, чтобы ставка входила в ключ. Вызовите priceMemo для цены 100 дважды при ставке 20% и один раз при 10%, выведите все три цены, а затем число вычислений: его считает calls из заготовки.",
        en: "priceWithTax takes the tax rate in percent from the outside variable taxPercent, so the memoized version returns old prices after the rate changes. Make the function pure: the rate must come in as an argument. Memoize it with R.memoizeWith so that the rate is part of the key. Call priceMemo for the price 100 twice at a 20% rate and once at 10%, print all three prices and then the number of computations, which the calls counter from the starter keeps.",
      },
      starter: {
        ru: `// memoize для функций одного аргумента
// memoize :: (a -> b) -> (a -> b)
const memoize = (fn) => {
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// счётчик показывает, сколько раз функция действительно считала;
// это побочный эффект, он здесь только для наглядности
let calls = 0

let taxPercent = 20
// priceWithTax :: Number -> Number
const priceWithTax = (price) => {
  calls += 1
  return price + (price * taxPercent) / 100
}
const priceMemo = memoize(priceWithTax)

console.log(priceMemo(100))
taxPercent = 10
// ставка уже 10%, а цена старая
console.log(priceMemo(100))

// ваш код`,
        en: `// memoize for functions of one argument
// memoize :: (a -> b) -> (a -> b)
const memoize = (fn) => {
  const cache = new Map()
  return (arg) => {
    if (cache.has(arg)) {
      return cache.get(arg)
    }
    const result = fn(arg)
    cache.set(arg, result)
    return result
  }
}

// the counter shows how many times the function actually computed;
// it is a side effect, here only for illustration
let calls = 0

let taxPercent = 20
// priceWithTax :: Number -> Number
const priceWithTax = (price) => {
  calls += 1
  return price + (price * taxPercent) / 100
}
const priceMemo = memoize(priceWithTax)

console.log(priceMemo(100))
taxPercent = 10
// the rate is 10% now, but the price is old
console.log(priceMemo(100))

// your code`,
      },
      solution: {
        ru: `// счётчик показывает, сколько раз функция действительно считала;
// это побочный эффект, он здесь только для наглядности
let calls = 0
// ставка теперь аргумент: результат зависит только от аргументов, как у чистой функции
// priceWithTax :: (Number, Number) -> Number
const priceWithTax = (percent, price) => {
  calls += 1
  return price + (price * percent) / 100
}

// ставка входит в ключ: новая ставка — новый ключ
const priceMemo = R.memoizeWith((percent, price) => percent + '|' + price, priceWithTax)

let taxPercent = 20
console.log(priceMemo(taxPercent, 100))
// тот же ключ 20|100: из кэша
console.log(priceMemo(taxPercent, 100))
taxPercent = 10
// ключ 10|100: считаем заново
console.log(priceMemo(taxPercent, 100))
console.log('вычислений: ' + calls)`,
        en: `// the counter shows how many times the function actually computed;
// it is a side effect, here only for illustration
let calls = 0
// the rate is an argument now: the result depends only on the arguments, as with a pure function
// priceWithTax :: (Number, Number) -> Number
const priceWithTax = (percent, price) => {
  calls += 1
  return price + (price * percent) / 100
}

// the rate is part of the key: a new rate means a new key
const priceMemo = R.memoizeWith((percent, price) => percent + '|' + price, priceWithTax)

let taxPercent = 20
console.log(priceMemo(taxPercent, 100))
// the same key 20|100: from the cache
console.log(priceMemo(taxPercent, 100))
taxPercent = 10
// the key 10|100: computed again
console.log(priceMemo(taxPercent, 100))
console.log('computations: ' + calls)`,
      },
      expected: {
        ru: "120\n120\n110\nвычислений: 2",
        en: "120\n120\n110\ncomputations: 2",
      },
    },
  ],
}

export default lesson
