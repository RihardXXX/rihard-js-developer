import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'closures',
  title: { ru: "Замыкания", en: "Closures" },
  description: {
    ru: "Замыкания в JavaScript: как функция помнит переменные места создания, фабрики функций, приватное состояние, ловушка var в цикле и утечки памяти.",
    en: "Closures in JavaScript: how a function remembers variables from where it was created, function factories, private state, the var loop trap and memory leaks.",
  },
  goal: {
    ru: "Понять, как функция запоминает переменные того места, где она создана, и научиться применять замыкания для фабрик функций и приватного состояния, не попадая в ловушку var в цикле.",
    en: "Understand how a function remembers the variables of the place where it was created, and learn to use closures for function factories and private state without falling into the var-in-a-loop trap.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Замыкание — это функция вместе с переменными того места, где она была создана. В уроке «Функции первого класса и высшего порядка» функции возвращали другие функции. Возвращённая функция продолжает пользоваться переменными внешней функции, даже когда та уже завершилась: она их «помнит». В JavaScript замыкание получает каждая функция в момент создания, специального синтаксиса для него нет.",
      en: "A closure is a function together with the variables of the place where it was created. In the \"First-class and higher-order functions\" lesson, functions returned other functions. The returned function keeps using the variables of the outer function even after that function has finished: it \"remembers\" them. In JavaScript every function gets a closure at the moment it is created; there is no special syntax for it.",
    },
    {
      type: 'heading',
      ru: "Лексическое окружение",
      en: "The lexical environment",
    },
    {
      type: 'text',
      ru: "Каждый вызов функции, а также каждый блок с объявлениями let и const, создаёт лексическое окружение — запись с локальными переменными и ссылкой на внешнее окружение. Функция при создании сохраняет ссылку на окружение, в котором её написали: в спецификации это внутреннее поле [[Environment]]. Когда функции нужна переменная, движок ищет её в собственном окружении функции, затем во внешнем и так далее до глобального. «Лексическое» значит, что цепочку определяет место функции в тексте программы, а не место её вызова.",
      en: "Every function call, as well as every block with let and const declarations, creates a lexical environment: a record of local variables plus a reference to the outer environment. When a function is created, it stores a reference to the environment in which it was written; the specification calls this internal slot [[Environment]]. When the function needs a variable, the engine looks for it in the function's own environment, then in the outer one, and so on up to the global one. \"Lexical\" means that the chain is determined by where the function appears in the program text, not by where it is called.",
    },
    {
      type: 'code',
      code: {
        ru: `// Область видимости определяется местом, где функция написана
// ===============================
const place = 'снаружи'

// readPlace :: () -> String
// readPlace написана на верхнем уровне и видит верхнюю place
const readPlace = () => place

const callFromInside = () => {
  const place = 'внутри'
  // вызываем изнутри, но readPlace ищет place там, где её написали
  return readPlace()
}

console.log(callFromInside()) // снаружи

// Функция помнит переменные после завершения внешней функции
// ===============================
// makeGreeting :: String -> (() -> String)
const makeGreeting = (name) => {
  const greeting = \`Привет, \${name}\`
  // makeGreeting завершится, а greeting останется доступна возвращённой функции
  return () => greeting
}

const greetAnna = makeGreeting('Анна')
console.log(greetAnna()) // Привет, Анна

// Замыкание хранит ссылку на переменную, а не копию значения
// ===============================
let count = 0
const readCount = () => count

count = 5
console.log(readCount()) // 5: функция видит текущее значение count`,
        en: `// Scope is determined by the place where the function is written
// ===============================
const place = 'outside'

// readPlace :: () -> String
// readPlace is written at the top level and sees the top-level place
const readPlace = () => place

const callFromInside = () => {
  const place = 'inside'
  // we call it from inside, but readPlace looks up place where it was written
  return readPlace()
}

console.log(callFromInside()) // outside

// A function remembers variables after the outer function has finished
// ===============================
// makeGreeting :: String -> (() -> String)
const makeGreeting = (name) => {
  const greeting = \`Hello, \${name}\`
  // makeGreeting will finish, but greeting stays available to the returned function
  return () => greeting
}

const greetAnna = makeGreeting('Anna')
console.log(greetAnna()) // Hello, Anna

// A closure keeps a reference to the variable, not a copy of its value
// ===============================
let count = 0
const readCount = () => count

count = 5
console.log(readCount()) // 5: the function sees the current value of count`,
      },
    },
    {
      type: 'text',
      ru: "Обратите внимание на последний пример: замыкание хранит не снимок значений, а ссылку на сами переменные. Если переменную изменить после создания функции, функция увидит новое значение. На этом построены и полезные приёмы, и самая известная ловушка с замыканиями, о ней ниже.",
      en: "Note the last example: a closure keeps not a snapshot of values but a reference to the variables themselves. If a variable changes after the function was created, the function sees the new value. Both useful techniques and the best-known closure trap are built on this; the trap is covered below.",
    },
    {
      type: 'heading',
      ru: "Фабрики функций",
      en: "Function factories",
    },
    {
      type: 'text',
      ru: "Фабрика функций — это функция, которая создаёт и возвращает новые функции, настроенные её аргументами. Каждый вызов фабрики создаёт новое окружение, поэтому полученные функции независимы: у каждой свои значения переменных.",
      en: "A function factory is a function that creates and returns new functions configured by its arguments. Every call of the factory creates a new environment, so the resulting functions are independent: each one has its own values of the variables.",
    },
    {
      type: 'code',
      code: {
        ru: `// Фабрика функций
// ===============================
// makeMultiplier :: Number -> (Number -> Number)
const makeMultiplier = (factor) => (x) => x * factor

// каждый вызов фабрики создаёт новое окружение со своим factor
const double = makeMultiplier(2)
const triple = makeMultiplier(3)

console.log([1, 2, 3].map(double)) // [2, 4, 6]
console.log([1, 2, 3].map(triple)) // [3, 6, 9]

// makePriceLabel :: String -> (Number -> String)
const makePriceLabel = (currency) => (amount) => \`\${amount} \${currency}\`

const inRubles = makePriceLabel('RUB')
const inEuros = makePriceLabel('EUR')

console.log(inRubles(1500)) // 1500 RUB
console.log(inEuros(15)) // 15 EUR`,
        en: `// A function factory
// ===============================
// makeMultiplier :: Number -> (Number -> Number)
const makeMultiplier = (factor) => (x) => x * factor

// every call of the factory creates a new environment with its own factor
const double = makeMultiplier(2)
const triple = makeMultiplier(3)

console.log([1, 2, 3].map(double)) // [2, 4, 6]
console.log([1, 2, 3].map(triple)) // [3, 6, 9]

// makePriceLabel :: String -> (Number -> String)
const makePriceLabel = (currency) => (amount) => \`\${amount} \${currency}\`

const inRubles = makePriceLabel('RUB')
const inEuros = makePriceLabel('EUR')

console.log(inRubles(1500)) // 1500 RUB
console.log(inEuros(15)) // 15 EUR`,
      },
    },
    {
      type: 'heading',
      ru: "Приватное состояние",
      en: "Private state",
    },
    {
      type: 'text',
      ru: "Переменные внешней функции недоступны снаружи: прочитать или изменить их можно только через функции, которые она вернула. Так в JavaScript получают приватное состояние без классов. У классов для этого с ES2022 есть поля с решёткой (#count), но замыкания по-прежнему встречаются повсюду: в модулях, обработчиках событий, хуках React и композаблах Vue.",
      en: "The variables of the outer function cannot be reached from outside: they can be read or changed only through the functions it returned. This is how JavaScript gets private state without classes. Since ES2022 classes have hash-prefixed fields for this (#count), but closures are still everywhere: in modules, event handlers, React hooks and Vue composables.",
    },
    {
      type: 'code',
      code: {
        ru: `// Счётчик с приватным состоянием
// ===============================
// createCounter :: Number -> Object
const createCounter = (start) => {
  let count = start // снаружи до count не добраться

  return {
    increment: () => {
      count += 1
      return count
    },
    reset: () => {
      count = start
      return count
    },
    value: () => count,
  }
}

const first = createCounter(0)
const second = createCounter(100)

first.increment()
first.increment()
second.increment()

console.log(first.value()) // 2
console.log(second.value()) // 101: у каждого счётчика своё окружение
console.log(first.count) // undefined: count не свойство объекта, а переменная в замыкании

first.reset()
console.log(first.value()) // 0`,
        en: `// A counter with private state
// ===============================
// createCounter :: Number -> Object
const createCounter = (start) => {
  let count = start // there is no way to reach count from outside

  return {
    increment: () => {
      count += 1
      return count
    },
    reset: () => {
      count = start
      return count
    },
    value: () => count,
  }
}

const first = createCounter(0)
const second = createCounter(100)

first.increment()
first.increment()
second.increment()

console.log(first.value()) // 2
console.log(second.value()) // 101: each counter has its own environment
console.log(first.count) // undefined: count is not a property of the object but a variable in the closure

first.reset()
console.log(first.value()) // 0`,
      },
    },
    {
      type: 'text',
      ru: "Такие функции не чистые: increment() без аргументов каждый раз возвращает новое число. Это допустимо, когда состояние спрятано в небольшом модуле и меняется только через его функции, — подробнее об этом в уроке «Чистые функции». Но чем больше функций разделяют одно изменяемое состояние, тем труднее понять, кто и когда его поменял.",
      en: "Functions like these are not pure: increment() with no arguments returns a new number every time. This is acceptable when the state is hidden inside a small module and changes only through its functions; the \"Pure functions\" lesson says more about this. But the more functions share one piece of mutable state, the harder it is to tell who changed it and when.",
    },
    {
      type: 'heading',
      ru: "Замыкания в каррировании и частичном применении",
      en: "Closures in currying and partial application",
    },
    {
      type: 'text',
      ru: "Каррирование и частичное применение целиком держатся на замыканиях. Каррированная функция получает аргументы по частям и, пока их не хватает, возвращает новую функцию, которая помнит уже полученные. Частичное применение заранее фиксирует часть аргументов, и они хранятся в замыкании до последнего вызова. Подробно оба приёма разобраны в уроках «Каррирование» и «Частичное применение», а здесь важно увидеть, где именно хранятся аргументы.",
      en: "Currying and partial application rest entirely on closures. A curried function takes its arguments in parts and, while some are missing, returns a new function that remembers the ones already received. Partial application fixes some of the arguments in advance, and they are kept in a closure until the final call. Both techniques are covered in detail in the \"Currying\" and \"Partial application\" lessons; here the point is to see where exactly the arguments are stored.",
    },
    {
      type: 'code',
      code: {
        ru: `// Каррирование: a хранится в замыкании, пока не придёт b
// ===============================
// add :: Number -> Number -> Number
const add = (a) => (b) => a + b

const add10 = add(10) // add завершилась, но a = 10 запомнено
console.log(add10(5)) // 15

// Частичное применение: fixed хранится в замыкании
// ===============================
// fixArgs :: ((a, b, ...) -> x, a, ...) -> ((b, ...) -> x)
const fixArgs = (fn, ...fixed) => (...rest) => fn(...fixed, ...rest)

// greet :: (String, String) -> String
const greet = (greeting, name) => \`\${greeting}, \${name}!\`

const sayHello = fixArgs(greet, 'Привет')
console.log(sayHello('Анна')) // Привет, Анна!
console.log(sayHello('Олег')) // Привет, Олег!`,
        en: `// Currying: a is kept in the closure until b arrives
// ===============================
// add :: Number -> Number -> Number
const add = (a) => (b) => a + b

const add10 = add(10) // add has finished, but a = 10 is remembered
console.log(add10(5)) // 15

// Partial application: fixed is kept in the closure
// ===============================
// fixArgs :: ((a, b, ...) -> x, a, ...) -> ((b, ...) -> x)
const fixArgs = (fn, ...fixed) => (...rest) => fn(...fixed, ...rest)

// greet :: (String, String) -> String
const greet = (greeting, name) => \`\${greeting}, \${name}!\`

const sayHello = fixArgs(greet, 'Hello')
console.log(sayHello('Anna')) // Hello, Anna!
console.log(sayHello('Oleg')) // Hello, Oleg!`,
      },
    },
    {
      type: 'heading',
      ru: "Ловушка: var в цикле",
      en: "The trap: var in a loop",
    },
    {
      type: 'text',
      ru: "Классическая ошибка с замыканиями — колбэки, созданные в цикле с var. Область видимости var — вся функция, поэтому на весь цикл приходится одна переменная i. Все три колбэка замыкают одну и ту же переменную, а setTimeout вызывает их, когда цикл уже закончился и i равна 3. С let в заголовке цикла for на каждой итерации создаётся новая переменная со значением с предыдущего шага, и каждый колбэк получает свою.",
      en: "The classic closure mistake is callbacks created in a loop with var. The scope of a var is the whole function, so the entire loop has a single variable i. All three callbacks close over the same variable, and setTimeout calls them after the loop has finished and i equals 3. With let in the header of a for loop, every iteration gets a new variable holding the value from the previous step, so each callback gets its own.",
    },
    {
      type: 'code',
      code: {
        ru: `// var: одна переменная i на весь цикл
// ===============================
const withVar = () => {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(\`var: \${i}\`), 0)
  }
}

// let: на каждой итерации своя переменная i
// ===============================
const withLet = () => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(\`let: \${i}\`), 0)
  }
}

withVar()
withLet()
// колбэки запускаются после того, как оба цикла закончились:
// var: 3
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2`,
        en: `// var: a single variable i for the whole loop
// ===============================
const withVar = () => {
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(\`var: \${i}\`), 0)
  }
}

// let: every iteration has its own variable i
// ===============================
const withLet = () => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(\`let: \${i}\`), 0)
  }
}

withVar()
withLet()
// the callbacks run after both loops have finished:
// var: 3
// var: 3
// var: 3
// let: 0
// let: 1
// let: 2`,
      },
    },
    {
      type: 'text',
      ru: "До появления let в ES2015 ошибку исправляли функцией: колбэк создавали внутри другой функции, которой передавали текущее значение i, — сразу вызванной (IIFE) или фабрики. Каждый вызов такой функции создавал новое окружение, и колбэк запоминал своё значение. Этот способ вы опробуете в упражнении.",
      en: "Before let arrived in ES2015, the mistake was fixed with a function: the callback was created inside another function that received the current value of i, either an immediately invoked one (IIFE) or a factory. Every call of that function created a new environment, and the callback remembered its own value. You will try this approach in the exercise.",
    },
    {
      type: 'heading',
      ru: "Замыкания и память",
      en: "Closures and memory",
    },
    {
      type: 'text',
      ru: "Пока функция достижима, её окружение тоже остаётся в памяти: сборщик мусора не может освободить переменные, которые она может прочитать. Само по себе это не утечка: когда на функцию не остаётся ссылок, освобождается и окружение. Утечка начинается, когда функция живёт дольше, чем нужно, и держит большие данные: обработчик события, который забыли снять, setInterval без clearInterval, массив колбэков в модуле, который только растёт.",
      en: "As long as a function is reachable, its environment stays in memory too: the garbage collector cannot free variables the function might read. That alone is not a leak: once nothing references the function, its environment is freed as well. A leak starts when a function lives longer than needed and holds on to large data: an event handler nobody removed, a setInterval without clearInterval, an array of callbacks in a module that only grows.",
    },
    {
      type: 'text',
      ru: "Чтобы замыкание не держало лишнего, снимайте обработчики и таймеры, когда они больше не нужны, и не захватывайте большие объекты целиком: возьмите из них нужные значения до создания функции. Движки помогают, но не во всём. V8, например, сохраняет только переменные, которые использует хотя бы одна вложенная функция, но эти переменные общие для всех функций, созданных при одном вызове внешней. Если одна из них читает большой массив, массив останется в памяти, пока жива хоть одна функция из того же вызова, даже та, что его не читает.",
      en: "To keep a closure from holding on to too much, remove handlers and timers once they are no longer needed, and do not capture large objects whole: take the values you need out of them before creating the function. Engines help, but not with everything. V8, for example, keeps only the variables that at least one inner function uses, but those variables are shared by all the functions created during one call of the outer function. If one of them reads a large array, the array stays in memory while any function from that call is alive, even one that never reads it.",
    },
  ],
  summary: [
    {
      ru: "Замыкание — функция вместе с переменными места, где она создана. Функция помнит их и после того, как внешняя функция завершилась.",
      en: "A closure is a function together with the variables of the place where it was created. The function remembers them even after the outer function has finished.",
    },
    {
      ru: "Область видимости лексическая: переменная ищется там, где функция написана, а не там, где её вызвали. Замыкание хранит ссылку на переменную, а не копию значения.",
      en: "Scope is lexical: a variable is looked up where the function is written, not where it is called. A closure keeps a reference to the variable, not a copy of its value.",
    },
    {
      ru: "Каждый вызов внешней функции создаёт новое окружение, поэтому фабрики функций выдают независимые функции, а состояние в замыкании недоступно снаружи. На том же механизме держатся каррирование и частичное применение.",
      en: "Every call of the outer function creates a new environment, so function factories produce independent functions, and state in a closure cannot be reached from outside. Currying and partial application rest on the same mechanism.",
    },
    {
      ru: "var в цикле — одна переменная на все итерации, поэтому колбэки setTimeout видят последнее значение; let создаёт новую переменную на каждой итерации.",
      en: "A var in a loop is one variable for all iterations, so setTimeout callbacks see the last value; let creates a new variable on every iteration.",
    },
    {
      ru: "Замыкание держит окружение в памяти, пока функция достижима: снимайте обработчики и таймеры и не захватывайте большие объекты целиком.",
      en: "A closure keeps its environment in memory as long as the function is reachable: remove handlers and timers, and do not capture large objects whole.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Напишите функцию высшего порядка once: она принимает функцию fn и возвращает новую функцию, которая вызывает fn только в первый раз, а при следующих вызовах возвращает запомненный результат. Признак «уже вызывали» и результат храните в замыкании.",
        en: "Write a higher-order function once: it takes a function fn and returns a new function that calls fn only the first time and returns the remembered result on later calls. Keep the \"already called\" flag and the result in a closure.",
      },
      starter: {
        ru: `// once :: (a -> b) -> (a -> b)
// ваш код

let calls = 0

// loadSettings :: String -> String
const loadSettings = (name) => {
  calls += 1
  return \`настройки \${name}\`
}

const loadOnce = once(loadSettings)

console.log(loadOnce('app'))
console.log(loadOnce('admin')) // loadSettings не вызывается, возвращается первый результат
console.log(\`loadSettings вызвана: \${calls}\`)`,
        en: `// once :: (a -> b) -> (a -> b)
// your code

let calls = 0

// loadSettings :: String -> String
const loadSettings = (name) => {
  calls += 1
  return \`settings for \${name}\`
}

const loadOnce = once(loadSettings)

console.log(loadOnce('app'))
console.log(loadOnce('admin')) // loadSettings is not called, the first result is returned
console.log(\`loadSettings called: \${calls}\`)`,
      },
      solution: {
        ru: `// once :: (a -> b) -> (a -> b)
// done и result живут в замыкании возвращённой функции
const once = (fn) => {
  let done = false
  let result

  return (...args) => {
    if (!done) {
      done = true
      result = fn(...args)
    }
    return result
  }
}

let calls = 0

// loadSettings :: String -> String
const loadSettings = (name) => {
  calls += 1
  return \`настройки \${name}\`
}

const loadOnce = once(loadSettings)

console.log(loadOnce('app'))
console.log(loadOnce('admin')) // loadSettings не вызывается, возвращается первый результат
console.log(\`loadSettings вызвана: \${calls}\`)`,
        en: `// once :: (a -> b) -> (a -> b)
// done and result live in the closure of the returned function
const once = (fn) => {
  let done = false
  let result

  return (...args) => {
    if (!done) {
      done = true
      result = fn(...args)
    }
    return result
  }
}

let calls = 0

// loadSettings :: String -> String
const loadSettings = (name) => {
  calls += 1
  return \`settings for \${name}\`
}

const loadOnce = once(loadSettings)

console.log(loadOnce('app'))
console.log(loadOnce('admin')) // loadSettings is not called, the first result is returned
console.log(\`loadSettings called: \${calls}\`)`,
      },
      expected: {
        ru: "настройки app\nнастройки app\nloadSettings вызвана: 1",
        en: "settings for app\nsettings for app\nloadSettings called: 1",
      },
    },
    {
      task: {
        ru: "Цикл должен напечатать «задача 1», «задача 2» и «задача 3», а печатает «задача 4» трижды. Не меняя var на let, исправьте его: напишите фабрику makeTask(n), которая возвращает колбэк для setTimeout, и передавайте в setTimeout makeTask(i). Строка после цикла показывает, чему равна i, когда колбэки ещё не запускались.",
        en: "The loop should print \"task 1\", \"task 2\" and \"task 3\", but it prints \"task 4\" three times. Without changing var to let, fix it: write a factory makeTask(n) that returns a callback for setTimeout, and pass makeTask(i) to setTimeout. The line after the loop shows what i equals before any callback has run.",
      },
      starter: {
        ru: `// makeTask :: Number -> (() -> undefined)
// ваш код

// сейчас все колбэки видят одну и ту же i и печатают «задача 4»
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(\`задача \${i}\`), 0)
}

console.log(\`цикл закончился, i = \${i}\`)`,
        en: `// makeTask :: Number -> (() -> undefined)
// your code

// right now every callback sees the same i and prints "task 4"
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(\`task \${i}\`), 0)
}

console.log(\`the loop has finished, i = \${i}\`)`,
      },
      solution: {
        ru: `// makeTask :: Number -> (() -> undefined)
// каждый вызов makeTask создаёт новое окружение со своим n
const makeTask = (n) => () => console.log(\`задача \${n}\`)

for (var i = 1; i <= 3; i++) {
  setTimeout(makeTask(i), 0)
}

console.log(\`цикл закончился, i = \${i}\`)`,
        en: `// makeTask :: Number -> (() -> undefined)
// every call of makeTask creates a new environment with its own n
const makeTask = (n) => () => console.log(\`task \${n}\`)

for (var i = 1; i <= 3; i++) {
  setTimeout(makeTask(i), 0)
}

console.log(\`the loop has finished, i = \${i}\`)`,
      },
      expected: {
        ru: "цикл закончился, i = 4\nзадача 1\nзадача 2\nзадача 3",
        en: "the loop has finished, i = 4\ntask 1\ntask 2\ntask 3",
      },
    },
  ],
}

export default lesson
