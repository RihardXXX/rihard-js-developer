import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'composition',
  title: {
    ru: "Композиция функций",
    en: "Function composition",
  },
  blocks: [
    {
      type: 'text',
      ru: "Композиция функций — это способность функций вызываться последовательно, где результат одной функции передаётся следующей.",
      en: "Function composition is the ability of functions to be called in sequence, where the result of one function is passed to the next.",
    },
    {
      type: 'text',
      ru: "Композиция функций — это одно из фундаментальных понятий, на которых основана теория категорий.",
      en: "Function composition is one of the fundamental concepts on which category theory is based.",
    },
    {
      type: 'code',
      code: `// === композиция из 3 функций ===
// compose :: (c -> z) -> (b -> c) -> (a -> b) -> a -> z
const compose = (f3, f2, f1) => (...args) => f3(f2(f1(...args)))

// использование функции
// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Их имена
// 3. Вывезти список имен в лог

// fetchAllUsers :: * -> Promise a
const fetchAllUsers = () => new Promise(resolve => resolve([
  {
    name: 'John',
    status: 'online',
    age: 25
  },
  {
    name: 'Alex',
    status: 'offline',
    age: 18
  },
  {
    name: 'Angel',
    status: 'online',
    age: 18
  }
]))

fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
    compose( // результат бросаем в композицию функций
        console.log, // логируем результаты
        (usersActive) => usersActive.map(user => user.name), /// собираем имена
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
      )
    )

// таже самая композиция только в рамках типа Array
// не совсем классический функциональный подход
fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
      (data) => console.log(
          data
            .filter(user => user.status === 'online')
            .map(user => user.name)
        )
    )

// ===============================`,
    },
    {
      type: 'text',
      ru: "Если вы заметили в примере выше, порядок выполнения функций был справа налево — с точки зрения математики это нормально. Но часто читателю удобнее читать код слева направо.",
      en: "If you noticed in the example above, the functions executed from right to left — mathematically that's fine. But it is often more convenient for the reader to read code from left to right.",
    },
    {
      type: 'text',
      ru: "Поэтому код выше мы можем переписать.",
      en: "So we can rewrite the code above.",
    },
    {
      type: 'code',
      code: `// === композиция из 3 функций в человеко читаемом формате ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> (b -> c) -> (c -> z) -> a -> z
const pipe = (f1, f2, f3) => (...args) => f3(f2(f1(...args)))

// Теперь композицию удобнее читать слева на право

fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
    pipe( // результат бросаем в композицию функций
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
        (usersActive) => usersActive.map(user => user.name), /// собираем имена
        console.log, // логируем результаты
      )
    )

// Внимание

// compose порядок выполнения функций
3 <- 2 <- 1

// pipe
1 -> 2 -> 3

// ===============================`,
    },
    {
      type: 'text',
      ru: "А теперь представим ситуацию, когда количество функций более 3.",
      en: "Now imagine a situation where the number of functions is more than 3.",
    },
    {
      type: 'text',
      ru: "В реальных проектах используйте compose или pipe из готовых библиотек. Мы попробуем создать compose несколькими способами (императивно) (декларативно) (рекурсивно).",
      en: "In real projects, use compose or pipe from existing libraries. We will try to build compose in several ways: (imperatively) (declaratively) (recursively).",
    },
    {
      type: 'code',
      code: `// === композиция функций в нестрого заданном количестве функций ===

// === Способ императивный ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> ..., -> a -> z
const pipe = (...fns) => (...args) => {

  // дробим массив функций на голову и хвост ))
  const [ head, ...tail ] = fns

  // переменная с результатом выполнения
  // первой и остальных функций и результата
  let result = head(...args)

  // в цикле вызываем остальные функции и перезаписываем результат
  // в переменную
  for (const fn of tail) {
    result = fn(result)
  }

  // возвращаем итоговый результат
  return result
}

// ===============================`,
    },
    {
      type: 'text',
      ru: "А теперь давайте реализуем в функциональном стиле, декларативно.",
      en: "Now let's implement it in a functional style, declaratively.",
    },
    {
      type: 'code',
      code: `// === композиция функций в нестрого заданном количестве функций ===

// === Способ декларативный ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> ..., -> a -> z
const pipe = (...fns) => (arg) => fns.reduce(
    (init, fn) => fn(init), // акумм значение или инит бросаем в функцию
    arg // аргумент первого вызова
  )

// на первый взгляд в этой функции все топчик))
// и с точки зрения функционального подхода аргумент лучше и правильнее когда один
// но может быть ситуация когда при первом запуске аргументов 2 и более
const pipe = (...fns) => (...args) => fns.reduce(
    (init, fn, i) => i === 0 ? fn(...init) : fn(init) , // проверка первый вызов или остальные
    args // аргументы первого вызова
)

// ===============================`,
    },
    {
      type: 'text',
      ru: "Мы также можем реализовать композицию функций рекурсивно. Сразу сделаем оптимизацию хвостовой рекурсии и сократим количество вызовов вдвое.",
      en: "We can also implement function composition recursively. We'll apply tail-call optimization right away and cut the number of calls in half.",
    },
    {
      type: 'code',
      code: `// === композиция функций в нестрого заданном количестве функций ===

// === Способ рекурсивный ===
// порядок сменился на слева на право
// pipe ::  (a -> b) -> ..., -> a -> z
const pipe = (...fns) => (arg) => {

  // базовый случай — одна функция осталась
  if (fns.length === 1) {
    return fns[0](arg)
  }

  // разбиваем голову и хвост
  // первая функция и остальные
  const [head, ...tail] = fns

  // рекурсивно вызываем pipe для хвоста
  // а первую функцию вызываем с аргументом текущим
  return pipe(...tail)(head(arg))
}

// ===============================`,
    },
  ],
}

export default lesson
