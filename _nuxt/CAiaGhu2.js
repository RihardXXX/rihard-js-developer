const e={slug:"for-whom",title:{ru:"Для кого этот курс",en:"Who this course is for"},blocks:[{type:"text",ru:"Этот курс в первую очередь написан для разработчиков с опытом разработки в JS, которые хотят расширить свой кругозор и писать более надежный, декларативный и сопровождаемый код в функциональном стиле.",en:"This course is written primarily for developers with JS experience who want to broaden their horizons and write more reliable, declarative, and maintainable code in a functional style."}]},t={slug:"not-for-whom",title:{ru:"Кому этот курс не подойдет",en:"Who this course is not for"},blocks:[{type:"text",ru:"Этот курс не подойдет начинающим разработчикам, которые только постигают азы разработки на JS.",en:"This course is not suitable for beginner developers who are only just learning the basics of JS development."}]},n={slug:"imperative-vs-declarative",title:{ru:"Императивность и декларативность",en:"Imperative vs declarative"},description:{ru:"Чем императивный код отличается от декларативного в JavaScript: как заменить цикл с push на filter с предикатом и поднять уровень абстракции через filterBy.",en:"How imperative code differs from declarative in JavaScript: swapping a loop with push for filter and a predicate, then raising the abstraction with filterBy."},goal:{ru:"Понять разницу между императивным кодом, который говорит, как вы это делаете, и декларативным, который говорит, что делает код, и научиться переписывать цикл через filter и предикат.",en:"Understand the difference between imperative code, which tells you how you do it, and declarative code, which tells you what the code does, and learn to rewrite a loop with filter and a predicate."},blocks:[{type:"text",ru:'Императивный код говорит вам "как вы это делаете". То есть Вам надо вникать в сам код.',en:'Imperative code tells you "how you do it". In other words, you have to dig into the code itself.'},{type:"text",ru:"Декларативный код Вам говорит, что делает ваш код, он чаще модульный, и вам не нужно вникать в весь код. Если требуются изменения, вы вносите изменения в определенный участок кода модульно.",en:"Declarative code tells you what your code does; it is more often modular, and you do not need to dig into the whole codebase. If changes are needed, you make them in a specific section of the code in a modular way."},{type:"code",code:{ru:`// например получить все числа больше 3 из текущего массива

// Императивный код
// ========
let result = [] // массив результирующий

const numbers = [1, 2, 3, 4, 5] // текущий массив

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 3) {
    result.push(numbers[i])
  }
}

console.log(result) // 4, 5
// =========


// Декларативный код
// =========
// isGt3 :: Number -> Boolean
const isGt3 = number => number > 3

const declarativeResult = numbers.filter(isGt3) // мы не вникаем в реализацию, а просто читаем название

console.log(declarativeResult) // 4, 5 тот же результат более декларативен
// =========

// Мы можем пойти дальше и повысить уровень абстракции
// =========
// не пугайтесь, если сразу непонятно, поймете дальше

// filter :: ((a -> Boolean), [a]) -> [a]
const filter = (predicat, arr) => arr.filter(predicat)

// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicat) => (arr) => filter(predicat, arr)

// gt :: Number -> Number -> Boolean
const gt = pointer => number => number > pointer

// теперь мы создаем любые функции предикаты
// для фильтрации
// gt2 :: Number -> Boolean
const gt2 = gt(2) // предикат для фильтрации чисел больше 2
const gt3 = gt(3) // предикат для фильтрации чисел больше 3

// а вот теперь мы можем фильтровать массив по любым предикатам
const arr = [1, 2, 3, 4, 5]

const more2 = filterBy (gt2) (arr) // получаем числа больше 2
const more3 = filterBy (gt3) (arr) // получаем числа больше 3

// мы можем также главную функцию фильтрации подготовить для конвейеров
// не вызывая сразу ее
// filterByGt2 :: [a] -> [a]
const filterByGt2 = filterBy (gt2) // ожидает массива

// filterByGt2 (arr) из названия мы уже понимаем, что идет фильтрация чисел больше 2
const resultGt2 = filterByGt2 (arr) // получаем готовый результат числа больше 2
// ======`,en:`// for example, get all numbers greater than 3 from the array

// Imperative code
// ========
let result = [] // the resulting array

const numbers = [1, 2, 3, 4, 5] // the source array

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 3) {
    result.push(numbers[i])
  }
}

console.log(result) // 4, 5
// =========


// Declarative code
// =========
// isGt3 :: Number -> Boolean
const isGt3 = number => number > 3

const declarativeResult = numbers.filter(isGt3) // we don't dig into the implementation, we just read the name

console.log(declarativeResult) // 4, 5: the same result, but more declarative
// =========

// We can go further and raise the level of abstraction
// =========
// don't worry if it isn't clear right away, it will be later

// filter :: ((a -> Boolean), [a]) -> [a]
const filter = (predicat, arr) => arr.filter(predicat)

// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicat) => (arr) => filter(predicat, arr)

// gt :: Number -> Number -> Boolean
const gt = pointer => number => number > pointer

// now we can create any predicate functions
// for filtering
// gt2 :: Number -> Boolean
const gt2 = gt(2) // predicate that keeps numbers greater than 2
const gt3 = gt(3) // predicate that keeps numbers greater than 3

// and now we can filter an array by any predicate
const arr = [1, 2, 3, 4, 5]

const more2 = filterBy (gt2) (arr) // numbers greater than 2
const more3 = filterBy (gt3) (arr) // numbers greater than 3

// we can also prepare the main filtering function for pipelines
// without calling it right away
// filterByGt2 :: [a] -> [a]
const filterByGt2 = filterBy (gt2) // waits for an array

// filterByGt2 (arr): the name already tells us it keeps numbers greater than 2
const resultGt2 = filterByGt2 (arr) // the final result: numbers greater than 2
// ======`}}],summary:[{ru:"Императивный код говорит, как вы это делаете: чтобы его понять, нужно вникать в сам код.",en:"Imperative code tells you how you do it: to understand it, you have to dig into the code itself."},{ru:"Декларативный код говорит, что он делает. Он чаще модульный, и изменения вносятся в определенный участок кода.",en:"Declarative code tells you what it does. It is more often modular, and changes are made in a specific section of the code."},{ru:"filter с предикатом isGt3 заменяет цикл с условием и push: мы не вникаем в реализацию, а просто читаем название.",en:"filter with the isGt3 predicate replaces a loop with a condition and push: we don't dig into the implementation, we just read the name."},{ru:"Уровень абстракции можно повысить: gt(2) создает предикат, а filterBy(gt2) — функцию фильтрации, которая ждет массив. Из названия filterByGt2 уже понятно, что она делает.",en:"The level of abstraction can be raised further: gt(2) creates a predicate, and filterBy(gt2) creates a filtering function that waits for an array. The name filterByGt2 already tells you what it does."}],exercises:[{task:{ru:"Перепишите императивный код декларативно: получите из массива words слова длиннее четырех символов с помощью filter и предиката isLonger4. Императивный вариант уже есть в заготовке, оба варианта должны вывести одно и то же.",en:"Rewrite the imperative code declaratively: get the words longer than four characters from the words array using filter and an isLonger4 predicate. The imperative version is already in the starter; both versions should print the same result."},starter:{ru:`const words = ['map', 'filter', 'reduce', 'pipe']

// Императивный код
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Декларативный код
// isLonger4 :: String -> Boolean
// ваш код`,en:`const words = ['map', 'filter', 'reduce', 'pipe']

// Imperative code
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Declarative code
// isLonger4 :: String -> Boolean
// your code`},solution:{ru:`const words = ['map', 'filter', 'reduce', 'pipe']

// Императивный код
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Декларативный код
// isLonger4 :: String -> Boolean
const isLonger4 = word => word.length > 4

const declarativeResult = words.filter(isLonger4) // читаем название, а не реализацию

console.log(declarativeResult) // тот же результат`,en:`const words = ['map', 'filter', 'reduce', 'pipe']

// Imperative code
const imperativeResult = []

for (let i = 0; i < words.length; i++) {
  if (words[i].length > 4) {
    imperativeResult.push(words[i])
  }
}

console.log(imperativeResult)

// Declarative code
// isLonger4 :: String -> Boolean
const isLonger4 = word => word.length > 4

const declarativeResult = words.filter(isLonger4) // we read the name, not the implementation

console.log(declarativeResult) // the same result`},expected:{ru:`[
  "filter",
  "reduce"
]
[
  "filter",
  "reduce"
]`,en:`[
  "filter",
  "reduce"
]
[
  "filter",
  "reduce"
]`}},{task:{ru:"По образцу gt из урока напишите функцию divisibleBy: она принимает делитель и возвращает предикат «число делится на него без остатка». С ее помощью и filterBy получите функции filterByDivisibleBy3 и filterByDivisibleBy5 и примените их к массиву numbers.",en:'Following the gt example from the lesson, write a divisibleBy function: it takes a divisor and returns a predicate "the number is divisible by it with no remainder". Use it with filterBy to get the filterByDivisibleBy3 and filterByDivisibleBy5 functions, and apply them to the numbers array.'},starter:{ru:`// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
// ваш код

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
// ваш код

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`,en:`// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
// your code

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
// your code

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`},solution:{ru:`// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
const divisibleBy = (divisor) => (number) => number % divisor === 0

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
const filterByDivisibleBy3 = filterBy(divisibleBy(3)) // ждет массив
const filterByDivisibleBy5 = filterBy(divisibleBy(5))

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`,en:`// filterBy :: (a -> Boolean) -> [a] -> [a]
const filterBy = (predicate) => (arr) => arr.filter(predicate)

const numbers = [3, 5, 9, 10, 15]

// divisibleBy :: Number -> Number -> Boolean
const divisibleBy = (divisor) => (number) => number % divisor === 0

// filterByDivisibleBy3 :: [Number] -> [Number]
// filterByDivisibleBy5 :: [Number] -> [Number]
const filterByDivisibleBy3 = filterBy(divisibleBy(3)) // waits for an array
const filterByDivisibleBy5 = filterBy(divisibleBy(5))

console.log(filterByDivisibleBy3(numbers))
console.log(filterByDivisibleBy5(numbers))`},expected:{ru:`[
  3,
  9,
  15
]
[
  5,
  10,
  15
]`,en:`[
  3,
  9,
  15
]
[
  5,
  10,
  15
]`}}]},a={slug:"functional-programming",title:{ru:"Функциональное программирование",en:"Functional programming"},description:{ru:"Что такое функциональное программирование в JavaScript: чистые функции, конвейер pipe из небольших функций, Maybe из head и fromMaybe в Sanctuary.",en:"What functional programming means in JavaScript: pure functions, a pipeline of small functions with pipe, and Maybe from head and fromMaybe in Sanctuary."},goal:{ru:"Понять, что такое функциональное программирование: декларативная разработка на основе чистых функций, в которой задача решается конвейером из небольших функций.",en:"Understand what functional programming is: declarative development based on pure functions, in which a task is solved by a pipeline of small functions."},blocks:[{type:"text",ru:"Функциональное программирование - это высокоуровневая декларативная разработка на основе чистых функций. Функциональное программирование - парадигма программирования, которая опирается на функции как на основные строительные блоки.",en:"Functional programming is high-level, declarative development based on pure functions. Functional programming is a programming paradigm that relies on functions as its primary building blocks."},{type:"text",ru:"Чистые функции - это функции, которые при одних и тех же аргументах возвращают одинаковый результат и не создают побочных (сайд) эффектов.",en:"Pure functions are functions that return the same result for the same arguments and produce no side effects."},{type:"code",code:{ru:`// ==== Внимание ===
// Эти примеры Вам пока могут казаться крайне запутанными и непонятными
// Не пугайтесь и читайте дальше

// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Старше 20 лет
// 3. Первого пользователя из списка
// 4. Получить его имя

// Пример функционального кода
// готовые утилиты из библиотеки Sanctuary: в песочнице курса она подключена как S,
// в своем проекте: import S from 'sanctuary'
const { pipe, prop, equals, filter, head, gt, map, fromMaybe } = S

// fetchAllUsers :: () -> Promise [Object]
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

const ONLINE = 'online'

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'), // берем содержимое поля статус у пользователя
  equals(status), // сравниваем поле юзера со статусом, установленным выше
])

// moreAge :: Number -> (a -> Boolean)
const moreAge = age => pipe([
  prop('age'), // берем содержимое поля возраст
  gt(age), // проверяем, что поле юзера больше age
])

// isStatusOnline :: a -> Boolean
const isStatusOnline = isStatus(ONLINE)

//  moreAge20 :: a -> Boolean
const moreAge20 = moreAge(20)

// getName :: a -> String
const getName = prop('name')

// Внимание: необязательно создавать чрезмерную абстракцию,
// это иногда может запутать коллег
// В идеале, конечно, лучше обернуть данные в монаду для защиты от падений композиции
// в случае, если с сервера прилетит что попало. Это защита во время выполнения:
// типы TypeScript сами по себе проверяются только при компиляции и от таких данных не защищают

// searchOnlineUsers :: [a] -> String
const searchOnlineUsers= pipe([
  filter(isStatusOnline), // получаем только пользователей онлайн
  filter(moreAge20), // получаем пользователей старше 20 лет
  head, // получаем первого пользователя в Maybe: Just (пользователь) или Nothing, если список пуст
  map(getName), // получаем имя этого пользователя внутри Maybe
  fromMaybe('') // достаем имя из Maybe, для Nothing будет ''
])

// start программы
fetchAllUsers()
  .then(searchOnlineUsers)
  .then(name => console.log(name)) // 'John'`,en:`// ==== Note ===
// These examples may seem very confusing and unclear to you for now
// Don't worry, just keep reading

// our goal
// 1. Get the users whose status is online
// 2. Who are older than 20
// 3. Take the first user from the list
// 4. Get their name

// An example of functional code
// ready-made helpers from the Sanctuary library: in the course playground it is available as S,
// in your own project: import S from 'sanctuary'
const { pipe, prop, equals, filter, head, gt, map, fromMaybe } = S

// fetchAllUsers :: () -> Promise [Object]
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

const ONLINE = 'online'

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'), // take the user's status field
  equals(status), // compare it with the status given above
])

// moreAge :: Number -> (a -> Boolean)
const moreAge = age => pipe([
  prop('age'), // take the age field
  gt(age), // check that the user's field is greater than age
])

// isStatusOnline :: a -> Boolean
const isStatusOnline = isStatus(ONLINE)

//  moreAge20 :: a -> Boolean
const moreAge20 = moreAge(20)

// getName :: a -> String
const getName = prop('name')

// Note: you don't have to build excessive abstractions,
// they can sometimes confuse your colleagues
// Ideally, of course, you would wrap the data in a monad so the composition doesn't crash
// when the server sends back something unexpected. That is protection at run time:
// TypeScript types on their own are checked only at compile time and don't protect against such data

// searchOnlineUsers :: [a] -> String
const searchOnlineUsers= pipe([
  filter(isStatusOnline), // keep only the users who are online
  filter(moreAge20), // keep the users older than 20
  head, // take the first user wrapped in Maybe: Just (user), or Nothing if the list is empty
  map(getName), // get that user's name inside the Maybe
  fromMaybe('') // take the name out of the Maybe; for Nothing it is ''
])

// program start
fetchAllUsers()
  .then(searchOnlineUsers)
  .then(name => console.log(name)) // 'John'`}}],summary:[{ru:"Функциональное программирование — высокоуровневая декларативная разработка на основе чистых функций. Функции в нем — основные строительные блоки.",en:"Functional programming is high-level, declarative development based on pure functions. Functions are its primary building blocks."},{ru:"Чистые функции при одних и тех же аргументах возвращают одинаковый результат и не создают побочных эффектов.",en:"Pure functions return the same result for the same arguments and produce no side effects."},{ru:"В примере задачу решает конвейер pipe из небольших функций: отобрать пользователей онлайн, затем старше 20 лет, взять первого и получить его имя.",en:"In the example, the task is solved by a pipeline of small functions built with pipe: keep the users who are online, then those older than 20, take the first one and get their name."},{ru:"head возвращает Maybe: Just (пользователь) или Nothing, если список пуст. fromMaybe достает значение из Maybe, а для Nothing подставляет запасное.",en:"head returns a Maybe: Just (user), or Nothing if the list is empty. fromMaybe takes the value out of the Maybe and substitutes a fallback for Nothing."},{ru:"Создавать чрезмерную абстракцию необязательно: она иногда может запутать коллег.",en:"You don't have to build excessive abstractions: they can sometimes confuse your colleagues."}],exercises:[{task:{ru:"Соберите из небольших функций конвейер firstOfflineName: он возвращает имя первого пользователя со статусом offline, а если таких нет — строку «никого нет». Используйте isStatus и getName из заготовки и функции Sanctuary filter, head, map и fromMaybe, как в уроке. Проверьте конвейер на обоих списках.",en:'Build a firstOfflineName pipeline out of small functions: it returns the name of the first user whose status is offline, or the string "nobody" if there is no such user. Use isStatus and getName from the starter and the Sanctuary functions filter, head, map and fromMaybe, as in the lesson. Check the pipeline on both lists.'},starter:{ru:`// готовые утилиты Sanctuary: в песочнице курса она подключена как S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// здесь все пользователи онлайн
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
// ваш код

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`,en:`// ready-made Sanctuary helpers: in the course playground it is available as S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// here every user is online
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
// your code

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`},solution:{ru:`// готовые утилиты Sanctuary: в песочнице курса она подключена как S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// здесь все пользователи онлайн
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
const firstOfflineName = pipe([
  filter(isStatus('offline')), // только пользователи offline
  head, // первый из них в Maybe: Just (пользователь) или Nothing
  map(getName), // имя внутри Maybe
  fromMaybe('никого нет'), // для Nothing — запасная строка
])

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`,en:`// ready-made Sanctuary helpers: in the course playground it is available as S
const { pipe, prop, equals, filter, head, map, fromMaybe } = S

const users = [
  { name: 'John', status: 'online' },
  { name: 'Alex', status: 'offline' },
  { name: 'Angel', status: 'online' },
]

// here every user is online
const onlineUsers = [
  { name: 'John', status: 'online' },
  { name: 'Angel', status: 'online' },
]

// isStatus :: String -> (a -> Boolean)
const isStatus = status => pipe([
  prop('status'),
  equals(status),
])

// getName :: a -> String
const getName = prop('name')

// firstOfflineName :: [a] -> String
const firstOfflineName = pipe([
  filter(isStatus('offline')), // only the users who are offline
  head, // the first of them in a Maybe: Just (user) or Nothing
  map(getName), // the name inside the Maybe
  fromMaybe('nobody'), // a fallback string for Nothing
])

console.log(firstOfflineName(users))
console.log(firstOfflineName(onlineUsers))`},expected:{ru:`Alex
никого нет`,en:`Alex
nobody`}}]},r={slug:"pure-functions",title:{ru:"Чистые функции",en:"Pure functions"},description:{ru:"Как отличить чистую функцию от нечистой в JavaScript и вместо мутации внешних данных возвращать новый объект через spread или structuredClone.",en:"How to tell a pure function from an impure one in JavaScript and return a new object with spread or structuredClone instead of mutating outside data."},goal:{ru:"Научиться отличать чистые функции от нечистых и переписывать нечистые так, чтобы они не мутировали внешние данные, а возвращали новое значение.",en:"Learn to tell pure functions from impure ones and to rewrite impure ones so that they return a new value instead of mutating outside data."},blocks:[{type:"text",ru:"Чистые функции крайне важны. При этом чистая функция не обязательно идемпотентна: x => x + 1 чистая, но, применив ее к собственному результату, мы получим новое значение. Если вам нужны сайд эффекты, то группируйте их в отдельные функции и отделяйте от чистых функций. Любая программа, особенно в вебе, нуждается в сайд эффектах (изменение DOM дерева (tree), запросы к серверу (fetch), чтение из файла (readFile) и т. п.)",en:"Pure functions are extremely important. A pure function is not necessarily idempotent, though: x => x + 1 is pure, but applying it to its own result gives a new value. If you need side effects, group them into separate functions and keep them apart from pure functions. Every program, especially on the web, needs side effects (mutating the DOM tree, requests to the server (fetch), reading from a file (readFile), and so on)."},{type:"code",code:{ru:`// НЕчистая функция
// ===============================
let user = { name: 'John', age: 25 }

const changeAge = () => user.age = 30

// мы мутируем внешнюю переменную и создаем сайд эффекты
// программа будет вести себя непредсказуемо, так как с этой
// переменной могут работать несколько функций, и отловить ошибку будет сложнее
changeAge()
console.log(user) // { name: 'John', age: 30 }
// ===============================`,en:`// An IMpure function
// ===============================
let user = { name: 'John', age: 25 }

const changeAge = () => user.age = 30

// we mutate an outer variable and create side effects
// the program will behave unpredictably, since several functions
// may work with this variable, and a bug will be harder to track down
changeAge()
console.log(user) // { name: 'John', age: 30 }
// ===============================`}},{type:"code",code:{ru:`// Такой код допустим, если мы создаем независимые модули с собственным замыканием
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
// ===============================`,en:`// Code like this is acceptable if we create independent modules with their own closure
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
// ===============================`}},{type:"code",code:{ru:`// А теперь давайте поправим пример выше
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
// ===============================`,en:`// Now let's fix the example above
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
// ===============================`}}],summary:[{ru:"Чистая функция не обязательно идемпотентна: x => x + 1 чистая, но, применив ее к собственному результату, мы получим новое значение.",en:"A pure function is not necessarily idempotent: x => x + 1 is pure, but applying it to its own result gives a new value."},{ru:"Любая программа, особенно в вебе, нуждается в сайд эффектах: изменение DOM, запросы к серверу, чтение из файла. Группируйте их в отдельные функции и отделяйте от чистых.",en:"Every program, especially on the web, needs side effects: mutating the DOM, requests to the server, reading from a file. Group them into separate functions and keep them apart from pure functions."},{ru:"Функция, которая мутирует внешнюю переменную, создает сайд эффекты: с этой переменной могут работать несколько функций, и отловить ошибку будет сложнее.",en:"A function that mutates an outer variable creates side effects: several functions may work with that variable, and a bug will be harder to track down."},{ru:"Чистая функция не меняет переданный объект, а возвращает новый: через spread, а если требуется глубокое клонирование, — через structuredClone.",en:"A pure function does not change the object passed to it but returns a new one: with spread, or with structuredClone if deep cloning is needed."},{ru:"Даже в модуле с собственным замыканием состояние лучше заменять новым объектом, чем мутировать.",en:"Even in a module with its own closure, it is better to replace the state with a new object than to mutate it."}],exercises:[{task:{ru:"Функция addTagImpure меняет пост, который ей передали. Напишите чистую addTag: она возвращает новый пост с добавленным тегом и не трогает исходный. Учтите, что tags — вложенный массив: если скопировать только сам объект, массив останется общим.",en:"The addTagImpure function changes the post passed to it. Write a pure addTag: it returns a new post with the tag added and leaves the original alone. Keep in mind that tags is a nested array: if you copy only the object itself, the array stays shared."},starter:{ru:`// addTagImpure :: (String, Object) -> Object
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
console.log(taggedPost.tags)`,en:`// addTagImpure :: (String, Object) -> Object
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
console.log(taggedPost.tags)`},solution:{ru:`// addTagImpure :: (String, Object) -> Object
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
console.log(taggedPost.tags)`,en:`// addTagImpure :: (String, Object) -> Object
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
console.log(taggedPost.tags)`},expected:{ru:`[
  "js"
]
[
  "js",
  "fp"
]`,en:`[
  "js"
]
[
  "js",
  "fp"
]`}},{task:{ru:"Результат finalPriceImpure зависит от внешней переменной discount: с тем же аргументом функция возвращает другую цену, если discount изменили. Напишите чистую finalPrice, которая получает процент скидки аргументом. Запустите код и сравните строки до и после изменения discount.",en:"The result of finalPriceImpure depends on the outer variable discount: with the same argument, the function returns a different price once discount has changed. Write a pure finalPrice that receives the discount percentage as an argument. Run the code and compare the lines before and after discount changes."},starter:{ru:`let discount = 10

// finalPriceImpure :: Number -> Number
// НЕчистая: результат зависит от внешней переменной discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// ваш код

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)

discount = 50 // кто-то изменил внешнюю переменную

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)`,en:`let discount = 10

// finalPriceImpure :: Number -> Number
// IMpure: the result depends on the outer variable discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// your code

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)

discount = 50 // someone changed the outer variable

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)`},solution:{ru:`let discount = 10

// finalPriceImpure :: Number -> Number
// НЕчистая: результат зависит от внешней переменной discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// Чистая: все, от чего зависит результат, приходит аргументами
const finalPrice = (percent, price) => price - price * percent / 100

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)

discount = 50 // кто-то изменил внешнюю переменную

console.log(\`нечистая: \${finalPriceImpure(200)}, чистая: \${finalPrice(10, 200)}\`)`,en:`let discount = 10

// finalPriceImpure :: Number -> Number
// IMpure: the result depends on the outer variable discount
const finalPriceImpure = (price) => price - price * discount / 100

// finalPrice :: (Number, Number) -> Number
// Pure: everything the result depends on comes in as arguments
const finalPrice = (percent, price) => price - price * percent / 100

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)

discount = 50 // someone changed the outer variable

console.log(\`impure: \${finalPriceImpure(200)}, pure: \${finalPrice(10, 200)}\`)`},expected:{ru:`нечистая: 180, чистая: 180
нечистая: 100, чистая: 180`,en:`impure: 180, pure: 180
impure: 100, pure: 180`}}]},o={slug:"immutability",title:{ru:"Иммутабельность",en:"Immutability"},description:{ru:"Иммутабельность в JavaScript: почему мутации ломают код, spread и structuredClone, Object.freeze, немутирующие методы массивов, R.evolve и цена копий.",en:"Immutability in JavaScript: why mutation breaks code, spread and structuredClone, Object.freeze, non-mutating array methods, R.evolve and the cost of copies."},goal:{ru:"Научиться обновлять объекты и массивы без мутаций — копированием через spread и structuredClone, немутирующими методами массивов и функциями Ramda — и понимать, где копия поверхностная и чего она стоит.",en:"Learn to update objects and arrays without mutation, by copying with spread and structuredClone, with non-mutating array methods and with Ramda functions, and understand where a copy is shallow and what it costs."},blocks:[{type:"text",ru:"Иммутабельные данные не меняются после создания: чтобы «изменить» объект, создают новый, а прежний остаётся как был. В уроке «Чистые функции» так уже делали: changeAge возвращала нового пользователя через spread. Здесь разберём, зачем это нужно, где копия получается поверхностной, как защититься от случайной мутации и во что обходятся копии.",en:'Immutable data does not change after it is created: to "change" an object, you create a new one, and the previous one stays as it was. The "Pure functions" lesson already did this: changeAge returned a new user via spread. Here we look at why this is needed, where a copy turns out shallow, how to guard against accidental mutation, and what copies cost.'},{type:"heading",ru:"Почему мутации ломают предсказуемость",en:"Why mutation breaks predictability"},{type:"text",ru:"Переменная с объектом или массивом хранит ссылку на него, и при присваивании или передаче в функцию копируется ссылка, а не сам объект. Поэтому переменная, аргумент функции и поле другого объекта могут указывать на один и тот же объект. Если одна часть программы его меняет, изменение видят все остальные, и ошибка проявляется далеко от места мутации: чтобы её найти, нужно выяснить, у кого ещё есть ссылка на этот объект.",en:"A variable holding an object or an array holds a reference to it, and assignment or passing it to a function copies the reference, not the object itself. So a variable, a function argument and a field of another object can all point to the same object. If one part of the program changes it, every other part sees the change, and the bug shows up far from where the mutation happened: to find it, you have to work out who else holds a reference to that object."},{type:"code",code:{ru:`// Мутация аргумента
// ===============================
// bestScoreImpure :: [Number] -> Number
// НЕчистая: sort сортирует сам переданный массив
const bestScoreImpure = (scores) => scores.sort((a, b) => b - a)[0]

const scores = [40, 95, 70]
console.log(bestScoreImpure(scores)) // 95
console.log(scores) // [95, 70, 40]: исходный порядок потерян

// Общий объект
// ===============================
const defaults = { theme: 'light', fontSize: 14 }

const userSettings = defaults // копируется ссылка, а не объект
userSettings.theme = 'dark'

console.log(defaults.theme) // dark: значения по умолчанию тоже изменились

// Без мутаций
// ===============================
const baseSettings = { theme: 'light', fontSize: 14 }
const darkSettings = { ...baseSettings, theme: 'dark' } // новый объект

console.log(\`\${baseSettings.theme} -> \${darkSettings.theme}\`) // light -> dark`,en:`// Mutating an argument
// ===============================
// bestScoreImpure :: [Number] -> Number
// IMpure: sort sorts the array that was passed in
const bestScoreImpure = (scores) => scores.sort((a, b) => b - a)[0]

const scores = [40, 95, 70]
console.log(bestScoreImpure(scores)) // 95
console.log(scores) // [95, 70, 40]: the original order is lost

// A shared object
// ===============================
const defaults = { theme: 'light', fontSize: 14 }

const userSettings = defaults // the reference is copied, not the object
userSettings.theme = 'dark'

console.log(defaults.theme) // dark: the defaults have changed too

// Without mutation
// ===============================
const baseSettings = { theme: 'light', fontSize: 14 }
const darkSettings = { ...baseSettings, theme: 'dark' } // a new object

console.log(\`\${baseSettings.theme} -> \${darkSettings.theme}\`) // light -> dark`}},{type:"text",ru:"const здесь не помогает: он запрещает присвоить переменной другое значение, но не мешает менять объект, на который она ссылается. Объявление const defaults не делает объект неизменяемым — для этого нужна копия или Object.freeze.",en:"const does not help here: it forbids assigning another value to the variable but does not prevent changing the object it points to. Declaring const defaults does not make the object immutable; that takes a copy or Object.freeze."},{type:"heading",ru:"Поверхностная и глубокая копия",en:"Shallow and deep copies"},{type:"text",ru:"Spread создаёт новый объект ({ ...obj }) или массив ([...arr]), но копирует только верхний уровень: вложенные объекты и массивы остаются общими с оригиналом. То же верно для Object.assign({}, obj), arr.slice() и Array.from(arr). Чтобы безопасно изменить вложенное поле, копируют каждый уровень на пути к нему, а остальные ветки берут как есть. Это называют структурным разделением: новый объект делит с прежним всё, что не менялось.",en:"Spread creates a new object ({ ...obj }) or array ([...arr]) but copies only the top level: nested objects and arrays stay shared with the original. The same is true of Object.assign({}, obj), arr.slice() and Array.from(arr). To change a nested field safely, you copy every level on the path to it and take the other branches as they are. This is called structural sharing: the new object shares with the old one everything that has not changed."},{type:"code",code:{ru:`// Поверхностная копия
// ===============================
const user = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const shallow = { ...user }
shallow.name = 'Olga' // верхний уровень скопирован: у user имя прежнее
shallow.address.city = 'Kazan' // address общий: город меняется и у user

console.log(user.name) // Anna
console.log(user.address.city) // Kazan

// Копия каждого уровня на пути к изменению
// ===============================
const original = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const moved = {
  ...original,
  address: { ...original.address, city: 'Kazan' },
}

console.log(original.address.city) // Moscow
console.log(moved.address.city) // Kazan
console.log(moved.tags === original.tags) // true: неизменная ветка общая

// Глубокая копия
// ===============================
const deep = structuredClone(original)
deep.tags.push('fp')

console.log(original.tags) // ["js"]
console.log(deep.tags) // ["js", "fp"]`,en:`// A shallow copy
// ===============================
const user = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const shallow = { ...user }
shallow.name = 'Olga' // the top level was copied: user keeps its name
shallow.address.city = 'Kazan' // address is shared: the city changes for user too

console.log(user.name) // Anna
console.log(user.address.city) // Kazan

// Copying every level on the path to the change
// ===============================
const original = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const moved = {
  ...original,
  address: { ...original.address, city: 'Kazan' },
}

console.log(original.address.city) // Moscow
console.log(moved.address.city) // Kazan
console.log(moved.tags === original.tags) // true: the unchanged branch is shared

// A deep copy
// ===============================
const deep = structuredClone(original)
deep.tags.push('fp')

console.log(original.tags) // ["js"]
console.log(deep.tags) // ["js", "fp"]`}},{type:"text",ru:"structuredClone копирует структуру целиком, на любую глубину: вложенные объекты и массивы, Date, Map, Set и даже циклические ссылки. Функции он копировать не умеет и бросает DataCloneError, а экземпляр класса превращается в обычный объект: прототип и методы класса теряются. JSON.parse(JSON.stringify(obj)) теряет больше: Date становится строкой, Map и Set — пустыми объектами, поля со значением undefined и функциями пропадают, NaN превращается в null. structuredClone есть во всех основных браузерах с 2022 года и в Node.js с версии 17.",en:"structuredClone copies the whole structure to any depth: nested objects and arrays, Date, Map, Set and even circular references. It cannot copy functions and throws a DataCloneError, and a class instance turns into a plain object: the class prototype and methods are lost. JSON.parse(JSON.stringify(obj)) loses more: a Date becomes a string, Map and Set become empty objects, fields holding undefined or functions disappear, and NaN turns into null. structuredClone is available in all major browsers since 2022 and in Node.js since version 17."},{type:"heading",ru:"Object.freeze",en:"Object.freeze"},{type:"text",ru:"Object.freeze запрещает добавлять, удалять и менять свойства объекта и возвращает тот же объект. Заморозка поверхностная: вложенные объекты остаются изменяемыми, их замораживают отдельно. Что произойдёт при попытке записи, зависит от режима: в нестрогом режиме присваивание молча игнорируется, в строгом бросается TypeError. Код в песочнице курса исполняется в нестрогом режиме, а код ES-модулей (файлов с import и export) и тел классов всегда строгий: там та же запись бросит TypeError.",en:"Object.freeze forbids adding, deleting and changing an object's properties and returns the same object. Freezing is shallow: nested objects stay mutable and are frozen separately. What happens on an attempt to write depends on the mode: in sloppy (non-strict) mode the assignment is silently ignored, in strict mode a TypeError is thrown. Code in the course playground runs in non-strict mode, while the code of ES modules (files with import and export) and of class bodies is always strict: there the same write throws a TypeError."},{type:"code",code:{ru:`// Object.freeze
// ===============================
const config = Object.freeze({ mode: 'prod', limits: { requests: 100 } })

// нестрогий режим: присваивание молча игнорируется
config.mode = 'dev'
console.log(config.mode) // prod

// строгий режим: та же запись бросает TypeError
const setModeStrict = () => {
  'use strict'
  config.mode = 'dev'
}

try {
  setModeStrict()
} catch (error) {
  console.log(\`строгий режим: \${error.name}\`) // строгий режим: TypeError
}

// методы массива бросают TypeError в любом режиме
const frozenList = Object.freeze([1, 2])

try {
  frozenList.push(3)
} catch (error) {
  console.log(\`push: \${error.name}\`) // push: TypeError
}

// заморозка поверхностная: вложенный объект можно менять
config.limits.requests = 1
console.log(config.limits.requests) // 1
console.log(\`config: \${Object.isFrozen(config)}, limits: \${Object.isFrozen(config.limits)}\`) // config: true, limits: false`,en:`// Object.freeze
// ===============================
const config = Object.freeze({ mode: 'prod', limits: { requests: 100 } })

// non-strict mode: the assignment is silently ignored
config.mode = 'dev'
console.log(config.mode) // prod

// strict mode: the same write throws a TypeError
const setModeStrict = () => {
  'use strict'
  config.mode = 'dev'
}

try {
  setModeStrict()
} catch (error) {
  console.log(\`strict mode: \${error.name}\`) // strict mode: TypeError
}

// array methods throw a TypeError in any mode
const frozenList = Object.freeze([1, 2])

try {
  frozenList.push(3)
} catch (error) {
  console.log(\`push: \${error.name}\`) // push: TypeError
}

// freezing is shallow: the nested object can still be changed
config.limits.requests = 1
console.log(config.limits.requests) // 1
console.log(\`config: \${Object.isFrozen(config)}, limits: \${Object.isFrozen(config.limits)}\`) // config: true, limits: false`}},{type:"text",ru:"Исключение из правила нестрогого режима — встроенные методы: push, sort и другие мутирующие методы на замороженном массиве бросают TypeError всегда, потому что спецификация требует от них ошибки, если запись не удалась. Object.freeze помогает поймать случайную мутацию, но копий не делает: новое значение по-прежнему создаётся через spread или structuredClone.",en:"The exception to the non-strict rule is built-in methods: push, sort and other mutating methods on a frozen array always throw a TypeError, because the specification requires them to fail when a write does not succeed. Object.freeze helps catch accidental mutation, but it makes no copies: a new value is still created with spread or structuredClone."},{type:"heading",ru:"Немутирующие методы массивов",en:"Non-mutating array methods"},{type:"text",ru:"Часть методов массива меняет сам массив: push, pop, shift, unshift, splice, sort, reverse, fill и copyWithin. Другие возвращают новый массив и исходный не трогают: map, filter, concat, slice. В ES2023 появились немутирующие версии сортировки, разворота, splice и замены элемента.",en:"Some array methods change the array itself: push, pop, shift, unshift, splice, sort, reverse, fill and copyWithin. Others return a new array and leave the original alone: map, filter, concat, slice. ES2023 added non-mutating versions of sorting, reversing, splice and replacing an element."},{type:"table",caption:{ru:"Мутирующие методы массива и их замены без мутации",en:"Mutating array methods and their non-mutating replacements"},columns:[{ru:"Задача",en:"Task"},{ru:"Меняет массив",en:"Changes the array"},{ru:"Возвращает новый массив",en:"Returns a new array"}],rows:[[{ru:"Добавить в конец",en:"Append"},{ru:"push(x)",en:"push(x)"},{ru:"concat(x) или [...arr, x]",en:"concat(x) or [...arr, x]"}],[{ru:"Отсортировать",en:"Sort"},{ru:"sort(fn)",en:"sort(fn)"},{ru:"toSorted(fn) или [...arr].sort(fn)",en:"toSorted(fn) or [...arr].sort(fn)"}],[{ru:"Развернуть",en:"Reverse"},{ru:"reverse()",en:"reverse()"},{ru:"toReversed() или [...arr].reverse()",en:"toReversed() or [...arr].reverse()"}],[{ru:"Удалить или вставить элементы",en:"Remove or insert elements"},{ru:"splice(start, count, ...items)",en:"splice(start, count, ...items)"},{ru:"toSpliced(start, count, ...items) или slice и spread",en:"toSpliced(start, count, ...items) or slice and spread"}],[{ru:"Заменить элемент",en:"Replace an element"},{ru:"arr[i] = x",en:"arr[i] = x"},{ru:"with(i, x) или map",en:"with(i, x) or map"}]]},{type:"text",ru:"toSorted, toReversed, toSpliced и with вошли в стандарт ES2023. Их поддерживают Chrome и Edge с версии 110, Firefox со 115, Safari с 16 и Node.js с 20. Если проект должен работать в браузерах старше, копируйте массив и вызывайте мутирующий метод на копии ([...arr].sort(fn)) или подключите полифил.",en:"toSorted, toReversed, toSpliced and with became part of the ES2023 standard. They are supported by Chrome and Edge from version 110, Firefox from 115, Safari from 16 and Node.js from 20. If a project has to run in older browsers, copy the array and call the mutating method on the copy ([...arr].sort(fn)), or add a polyfill."},{type:"code",code:{ru:`// Немутирующие методы массивов
// ===============================
const scores = [40, 95, 70]

// bestScore :: [Number] -> Number
// toSorted из ES2023 сортирует копию; без ES2023 то же: [...list].sort((a, b) => b - a)[0]
const bestScore = (list) => list.toSorted((a, b) => b - a)[0]

console.log(bestScore(scores)) // 95

const added = scores.concat(60) // вместо push
const replaced = scores.with(1, 90) // вместо scores[1] = 90
const withoutFirst = scores.toSpliced(0, 1) // вместо splice(0, 1)
const reversed = scores.toReversed() // вместо reverse()

console.log(added) // [40, 95, 70, 60]
console.log(replaced) // [40, 90, 70]
console.log(withoutFirst) // [95, 70]
console.log(reversed) // [70, 95, 40]
console.log(scores) // [40, 95, 70]: исходный массив не изменился`,en:`// Non-mutating array methods
// ===============================
const scores = [40, 95, 70]

// bestScore :: [Number] -> Number
// toSorted from ES2023 sorts a copy; without ES2023 the same is [...list].sort((a, b) => b - a)[0]
const bestScore = (list) => list.toSorted((a, b) => b - a)[0]

console.log(bestScore(scores)) // 95

const added = scores.concat(60) // instead of push
const replaced = scores.with(1, 90) // instead of scores[1] = 90
const withoutFirst = scores.toSpliced(0, 1) // instead of splice(0, 1)
const reversed = scores.toReversed() // instead of reverse()

console.log(added) // [40, 95, 70, 60]
console.log(replaced) // [40, 90, 70]
console.log(withoutFirst) // [95, 70]
console.log(reversed) // [70, 95, 40]
console.log(scores) // [40, 95, 70]: the original array has not changed`}},{type:"heading",ru:"Ramda: assoc, assocPath и evolve",en:"Ramda: assoc, assocPath and evolve"},{type:"text",ru:"Функции Ramda не меняют свои аргументы. R.assoc(key, value, obj) возвращает копию объекта с новым значением ключа, R.assocPath(path, value, obj) делает то же по вложенному пути, а R.evolve(transformations, obj) применяет функции к перечисленным ключам, в том числе вложенным, и оставляет остальные как есть. Копируются только объекты на пути к изменению, остальные ветки общие с исходным объектом, как при spread вручную. Обобщение этой идеи — линзы, им посвящён урок «Линзы».",en:'Ramda functions do not change their arguments. R.assoc(key, value, obj) returns a copy of the object with the key set to a new value, R.assocPath(path, value, obj) does the same along a nested path, and R.evolve(transformations, obj) applies functions to the listed keys, nested ones included, and leaves the rest as they are. Only the objects on the path to the change are copied; the other branches are shared with the original object, just as with spread by hand. Lenses generalize this idea; they have a lesson of their own, "Lenses".'},{type:"code",code:{ru:`// assoc, assocPath и evolve берём из Ramda: в песочнице курса она доступна как R
// ===============================
const post = {
  title: 'Immutability',
  author: { name: 'Anna', city: 'Moscow' },
  stats: { views: 10, likes: 2 },
  tags: ['js'],
}

// R.assoc: копия с новым значением ключа
const renamed = R.assoc('title', 'Immutable data', post)

// R.assocPath: копия с новым значением по вложенному пути
const moved = R.assocPath(['author', 'city'], 'Kazan', post)

// R.evolve: функции для нужных ключей, остальные ключи без изменений
const viewed = R.evolve({ stats: { views: (n) => n + 1 }, tags: (tags) => [...tags, 'fp'] }, post)

console.log(renamed.title) // Immutable data
console.log(moved.author.city) // Kazan
console.log(viewed.stats.views) // 11
console.log(viewed.tags) // ["js", "fp"]

// исходный пост не изменился
console.log(\`\${post.title}, \${post.author.city}, \${post.stats.views}, \${post.tags.length}\`) // Immutability, Moscow, 10, 1

// неизменные ветки общие с исходным постом
console.log(moved.stats === post.stats) // true
console.log(viewed.author === post.author) // true`,en:`// assoc, assocPath and evolve come from Ramda: the course playground exposes it as R
// ===============================
const post = {
  title: 'Immutability',
  author: { name: 'Anna', city: 'Moscow' },
  stats: { views: 10, likes: 2 },
  tags: ['js'],
}

// R.assoc: a copy with a new value for the key
const renamed = R.assoc('title', 'Immutable data', post)

// R.assocPath: a copy with a new value along a nested path
const moved = R.assocPath(['author', 'city'], 'Kazan', post)

// R.evolve: functions for the keys you need, the other keys stay as they are
const viewed = R.evolve({ stats: { views: (n) => n + 1 }, tags: (tags) => [...tags, 'fp'] }, post)

console.log(renamed.title) // Immutable data
console.log(moved.author.city) // Kazan
console.log(viewed.stats.views) // 11
console.log(viewed.tags) // ["js", "fp"]

// the original post has not changed
console.log(\`\${post.title}, \${post.author.city}, \${post.stats.views}, \${post.tags.length}\`) // Immutability, Moscow, 10, 1

// the unchanged branches are shared with the original post
console.log(moved.stats === post.stats) // true
console.log(viewed.author === post.author) // true`}},{type:"heading",ru:"Цена копирования",en:"The cost of copying"},{type:"text",ru:"Копия не бесплатна: spread проходит по всем ключам или элементам верхнего уровня, structuredClone — по всей структуре. Для одного обновления это незаметно, но в цикле копии складываются. Частая ловушка — reduce с аккумулятором [...acc, x]: на каждом шаге копируется весь накопленный массив, и для n элементов набирается около n²/2 копирований элементов. Для 1000 элементов это 499 500 копирований, для 10 000 — почти 50 миллионов.",en:"A copy is not free: spread walks over every key or element of the top level, and structuredClone over the whole structure. For a single update this goes unnoticed, but in a loop the copies add up. A common trap is reduce with the accumulator [...acc, x]: every step copies the whole accumulated array, so n elements add up to about n²/2 element copies. For 1,000 elements that is 499,500 copies, for 10,000 it is almost 50 million."},{type:"text",ru:"Иммутабельность важна на границах — там, где данные видит кто-то ещё. Массив, который функция создала сама и ещё никому не отдала, можно спокойно наполнять через push: снаружи этого не видно, и функция остаётся чистой. Для больших коллекций, которые часто обновляются, есть библиотеки со структурным разделением: Immutable.js с персистентными структурами данных и Immer, в котором пишут обычный «мутирующий» код для черновика, а получают новый объект.",en:'Immutability matters at the boundaries, where someone else can see the data. An array that a function created itself and has not handed to anyone yet can safely be filled with push: nobody outside can see it, and the function stays pure. For large, frequently updated collections there are libraries built on structural sharing: Immutable.js with persistent data structures, and Immer, where you write ordinary "mutating" code against a draft and get a new object back.'}],summary:[{ru:"При присваивании и передаче в функцию копируется ссылка на объект, а не сам объект: мутация в одном месте видна везде, где есть ссылка на тот же объект. const запрещает переприсваивание, но не изменение объекта.",en:"Assignment and passing to a function copy the reference to an object, not the object itself: a mutation in one place is visible wherever there is a reference to the same object. const forbids reassignment, not changing the object."},{ru:"Spread, Object.assign и slice копируют только верхний уровень. Для вложенного изменения копируют каждый уровень на пути к нему, для полной копии есть structuredClone.",en:"Spread, Object.assign and slice copy only the top level. For a nested change, copy every level on the path to it; for a full copy there is structuredClone."},{ru:"Object.freeze поверхностный: в нестрогом режиме запись в замороженное свойство молча игнорируется, в строгом бросается TypeError.",en:"Object.freeze is shallow: in non-strict mode a write to a frozen property is silently ignored, in strict mode it throws a TypeError."},{ru:"Вместо push, sort, reverse и splice берите concat, slice и spread или методы ES2023 toSorted, toReversed, toSpliced и with. R.assoc, R.assocPath и R.evolve обновляют объекты без мутаций.",en:"Instead of push, sort, reverse and splice, use concat, slice and spread, or the ES2023 methods toSorted, toReversed, toSpliced and with. R.assoc, R.assocPath and R.evolve update objects without mutation."},{ru:"Копии стоят времени и памяти: [...acc, x] в reduce даёт квадратичную сложность. Локальный массив, который ещё никто не видит, можно наполнять через push.",en:"Copies cost time and memory: [...acc, x] in reduce leads to quadratic complexity. A local array that nobody else can see yet may be filled with push."}],exercises:[{task:{ru:"Функции addScoreImpure и topThreeImpure меняют массив, который им передали. Напишите чистые addScore и topThree: первая возвращает новый массив с добавленным результатом, вторая — три лучших результата по убыванию. Исходный массив scores должен остаться прежним.",en:"The addScoreImpure and topThreeImpure functions change the array passed to them. Write pure addScore and topThree: the first returns a new array with the score added, the second returns the three best scores in descending order. The original scores array must stay the same."},starter:{ru:`// addScoreImpure :: ([Number], Number) -> [Number]
// НЕчистая: push меняет переданный массив
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// НЕчистая: sort сортирует переданный массив
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// topThree :: [Number] -> [Number]
// ваш код

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`лучшие три: \${topThree(updated).join(', ')}\`)
console.log(\`исходный массив: \${scores.join(', ')}\`)
console.log(\`новый массив: \${updated.join(', ')}\`)`,en:`// addScoreImpure :: ([Number], Number) -> [Number]
// IMpure: push changes the array passed in
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// IMpure: sort sorts the array passed in
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// topThree :: [Number] -> [Number]
// your code

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`top three: \${topThree(updated).join(', ')}\`)
console.log(\`original array: \${scores.join(', ')}\`)
console.log(\`new array: \${updated.join(', ')}\`)`},solution:{ru:`// addScoreImpure :: ([Number], Number) -> [Number]
// НЕчистая: push меняет переданный массив
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// НЕчистая: sort сортирует переданный массив
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// новый массив вместо push
const addScore = (scores, score) => [...scores, score]

// topThree :: [Number] -> [Number]
// сортируем копию; в ES2023 то же самое делает scores.toSorted((a, b) => b - a)
const topThree = (scores) => [...scores].sort((a, b) => b - a).slice(0, 3)

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`лучшие три: \${topThree(updated).join(', ')}\`)
console.log(\`исходный массив: \${scores.join(', ')}\`)
console.log(\`новый массив: \${updated.join(', ')}\`)`,en:`// addScoreImpure :: ([Number], Number) -> [Number]
// IMpure: push changes the array passed in
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// IMpure: sort sorts the array passed in
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// a new array instead of push
const addScore = (scores, score) => [...scores, score]

// topThree :: [Number] -> [Number]
// we sort a copy; in ES2023 scores.toSorted((a, b) => b - a) does the same
const topThree = (scores) => [...scores].sort((a, b) => b - a).slice(0, 3)

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`top three: \${topThree(updated).join(', ')}\`)
console.log(\`original array: \${scores.join(', ')}\`)
console.log(\`new array: \${updated.join(', ')}\`)`},expected:{ru:`лучшие три: 95, 85, 70
исходный массив: 40, 95, 70, 85
новый массив: 40, 95, 70, 85, 60`,en:`top three: 95, 85, 70
original array: 40, 95, 70, 85
new array: 40, 95, 70, 85, 60`}},{task:{ru:"Функция moveToImpure меняет город прямо в переданном состоянии. Напишите чистую moveTo(city, state): скопируйте через spread каждый уровень на пути state.user.address. Затем напишите moveToRamda с тем же результатом через R.assocPath. Проверьте, что исходное состояние не изменилось, объект user новый, а ветка cart, которую вы не трогали, осталась общей.",en:"The moveToImpure function changes the city right inside the state passed to it. Write a pure moveTo(city, state): use spread to copy every level on the path state.user.address. Then write moveToRamda with the same result using R.assocPath. Check that the original state has not changed, the user object is new, and the cart branch you did not touch is still shared."},starter:{ru:`const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// НЕчистая: меняет переданное состояние
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// moveToRamda :: (String, Object) -> Object
// ваш код: moveTo через spread, moveToRamda через R.assocPath

const next = moveTo('Kazan', state)

console.log(\`было: \${state.user.address.city}, стало: \${next.user.address.city}\`)
console.log(\`user новый: \${next.user !== state.user}\`)
console.log(\`cart общий: \${next.cart === state.cart}\`)
console.log(\`R.assocPath даёт то же: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`,en:`const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// IMpure: it changes the state passed in
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// moveToRamda :: (String, Object) -> Object
// your code: moveTo with spread, moveToRamda with R.assocPath

const next = moveTo('Kazan', state)

console.log(\`before: \${state.user.address.city}, after: \${next.user.address.city}\`)
console.log(\`new user: \${next.user !== state.user}\`)
console.log(\`shared cart: \${next.cart === state.cart}\`)
console.log(\`R.assocPath gives the same: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`},solution:{ru:`const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// НЕчистая: меняет переданное состояние
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// новые объекты только на пути state -> user -> address, cart берём как есть
const moveTo = (city, state) => ({
  ...state,
  user: {
    ...state.user,
    address: { ...state.user.address, city },
  },
})

// moveToRamda :: (String, Object) -> Object
const moveToRamda = (city, state) => R.assocPath(['user', 'address', 'city'], city, state)

const next = moveTo('Kazan', state)

console.log(\`было: \${state.user.address.city}, стало: \${next.user.address.city}\`)
console.log(\`user новый: \${next.user !== state.user}\`)
console.log(\`cart общий: \${next.cart === state.cart}\`)
console.log(\`R.assocPath даёт то же: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`,en:`const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// IMpure: it changes the state passed in
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// new objects only on the path state -> user -> address, cart is taken as it is
const moveTo = (city, state) => ({
  ...state,
  user: {
    ...state.user,
    address: { ...state.user.address, city },
  },
})

// moveToRamda :: (String, Object) -> Object
const moveToRamda = (city, state) => R.assocPath(['user', 'address', 'city'], city, state)

const next = moveTo('Kazan', state)

console.log(\`before: \${state.user.address.city}, after: \${next.user.address.city}\`)
console.log(\`new user: \${next.user !== state.user}\`)
console.log(\`shared cart: \${next.cart === state.cart}\`)
console.log(\`R.assocPath gives the same: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`},expected:{ru:`было: Moscow, стало: Kazan
user новый: true
cart общий: true
R.assocPath даёт то же: true`,en:`before: Moscow, after: Kazan
new user: true
shared cart: true
R.assocPath gives the same: true`}}]},s={slug:"hindley-milner-type-notation",title:{ru:"Нотация типов Хиндли–Милнера",en:"Hindley–Milner type notation"},description:{ru:"Сигнатуры Хиндли–Милнера в JavaScript: как читать a -> b -> c и (a, b) -> c, переменные типа, [a] и Maybe a и как написать функцию по её сигнатуре.",en:"Hindley–Milner signatures in JavaScript: how to read a -> b -> c and (a, b) -> c, type variables, [a] and Maybe a, and write a function from its signature."},goal:{ru:"Научиться читать сигнатуры в нотации Хиндли–Милнера — какие аргументы принимает функция, что возвращает и каррирована ли она — и писать функцию по ее сигнатуре.",en:"Learn to read Hindley–Milner signatures — which arguments a function takes, what it returns and whether it is curried — and to write a function from its signature."},blocks:[{type:"text",ru:"Нотацию типов Хиндли–Милнера вы уже встречали в коде. Над функциями, в блоке комментариев.",en:"You have already come across Hindley–Milner type notation in the code — above functions, in comment blocks."},{type:"text",ru:"Эта нотация типов используется в Haskell и других языках с функциональным уклоном. В JS она помогает нам писать более абстрактный код, а также помогает сопровождать этот код.",en:"This type notation is used in Haskell and other languages with a functional bent. In JS it helps us write more abstract code, and it also helps maintain that code."},{type:"text",ru:"Даёт объяснение, какие типы аргументов принимает функция и что возвращает.",en:"It explains which argument types a function accepts and what it returns."},{type:"code",code:{ru:`// без нотации
const foo = (a, b) => a + b

// в функции выше мы не можем понять, это функция сложения или конкатенации
//  конечно, мы можем правильно назвать функцию foo

// конечно, мы можем написать функцию вот так
const concat = (a, b) => a + b // конкатенация
const add = (a, b) => a + b // сложение

// с нотацией
// Название функции :: Тип первого аргумента -> Тип второго аргумента -> Тип результата
// так записывают каррированную функцию: она принимает аргументы по одному

// addCurried :: Number -> Number -> Number
const addCurried = (a) => (b) => a + b // сложение

// у некаррированной функции типы аргументов перечисляют в скобках через запятую
// add :: (Number, Number) -> Number
// concat :: (String, String) -> String

// map :: (a -> b) -> [a] -> [b]
const map = (mappable) => (arr) => arr.map(mappable)

// то же самое, но в более общем виде, принятом в теории категорий
// и спецификации Fantasy-land; не пугайтесь, об этом поговорим позже
// Спойлер: функтор — это любой тип, который реализовал интерфейс map
// и соблюдает его законы (о них — в уроке «Fantasy-land»),
// поэтому эта же функция map работает не только с массивом, но и с любым значением, у которого есть метод map
// читается так: для любого функтора f принимает функцию a -> b, затем f a и возвращает f b
// map :: Functor f => (a -> b) -> f a -> f b

// Как читать нотацию
// a, b, c          переменные типа: любой тип, но одна буква в пределах одной сигнатуры означает один и тот же тип
// a -> b -> c      каррированная функция: принимает a и возвращает функцию b -> c
// (a, b) -> c      некаррированная функция двух аргументов
// *                любой тип
// a | b            значение типа a или типа b
// () -> a          функция без аргументов
// ...args          любое число аргументов
// [a]              массив значений типа a
// Maybe a          значение типа a или его отсутствие
// Functor f =>     ограничение: f должен быть функтором
// f a ~> (a -> b) -> f b    ~> означает метод: он вызывается у значения типа f a, например u.map(fn)`,en:`// without the notation
const foo = (a, b) => a + b

// from the function above we can't tell whether it adds or concatenates
//  of course, we could give foo a proper name

// of course, we could write the functions like this
const concat = (a, b) => a + b // concatenation
const add = (a, b) => a + b // addition

// with the notation
// functionName :: FirstArgumentType -> SecondArgumentType -> ResultType
// this is how a curried function is written: it takes its arguments one at a time

// addCurried :: Number -> Number -> Number
const addCurried = (a) => (b) => a + b // addition

// for an uncurried function, the argument types are listed in parentheses, separated by commas
// add :: (Number, Number) -> Number
// concat :: (String, String) -> String

// map :: (a -> b) -> [a] -> [b]
const map = (mappable) => (arr) => arr.map(mappable)

// the same thing, but in the more general form used in category theory
// and the Fantasy-land specification; don't worry, we will get to that later
// Spoiler: a functor is any type that implements the map interface
// and obeys its laws (more on them in the "Fantasy-land" lesson),
// so this same map function works not only with an array but with any value that has a map method
// it reads like this: for any functor f, it takes a function a -> b, then f a, and returns f b
// map :: Functor f => (a -> b) -> f a -> f b

// How to read the notation
// a, b, c          type variables: any type, but within a single signature, the same letter always means the same type
// a -> b -> c      a curried function: takes a and returns a function b -> c
// (a, b) -> c      an uncurried function of two arguments
// *                any type
// a | b            a value of type a or of type b
// () -> a          a function with no arguments
// ...args          any number of arguments
// [a]              an array of values of type a
// Maybe a          a value of type a, or its absence
// Functor f =>     a constraint: f must be a functor
// f a ~> (a -> b) -> f b    ~> denotes a method: it is called on a value of type f a, e.g. u.map(fn)`}}],summary:[{ru:"Нотация Хиндли–Милнера в комментарии над функцией объясняет, какие типы аргументов функция принимает и что возвращает. В JS она помогает писать более абстрактный код и сопровождать его.",en:"Hindley–Milner notation in a comment above a function explains which argument types the function accepts and what it returns. In JS it helps write more abstract code and maintain it."},{ru:"По коду (a, b) => a + b не понять, складывает функция числа или склеивает строки. Сигнатуры add :: (Number, Number) -> Number и concat :: (String, String) -> String это говорят.",en:"From the code (a, b) => a + b you can't tell whether the function adds numbers or concatenates strings. The signatures add :: (Number, Number) -> Number and concat :: (String, String) -> String tell you."},{ru:"a -> b -> c — каррированная функция: принимает a и возвращает функцию b -> c. У некаррированной функции типы аргументов перечисляют в скобках через запятую: (a, b) -> c.",en:"a -> b -> c is a curried function: it takes a and returns a function b -> c. For an uncurried function, the argument types are listed in parentheses, separated by commas: (a, b) -> c."},{ru:"a, b, c — переменные типа: любой тип, но одна буква в пределах одной сигнатуры означает один и тот же тип. [a] — массив значений типа a, Maybe a — значение типа a или его отсутствие.",en:"a, b, c are type variables: any type, but within a single signature the same letter always means the same type. [a] is an array of values of type a, Maybe a is a value of type a or its absence."}],exercises:[{task:{ru:"Напишите функции по сигнатурам из заготовки. between принимает нижнюю границу, верхнюю границу и число и отвечает, лежит ли число между ними включительно. countWhere принимает предикат и массив и возвращает, сколько элементов подходят под предикат. По сигнатуре between видно, что between(18)(65) — уже предикат Number -> Boolean.",en:"Write the functions from the signatures in the starter. between takes a lower bound, an upper bound and a number, and tells whether the number lies between them, inclusive. countWhere takes a predicate and an array and returns how many elements match the predicate. The signature of between shows that between(18)(65) is already a Number -> Boolean predicate."},starter:{ru:`// between :: Number -> Number -> Number -> Boolean
// ваш код

// countWhere :: (a -> Boolean) -> [a] -> Number
// ваш код

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`,en:`// between :: Number -> Number -> Number -> Boolean
// your code

// countWhere :: (a -> Boolean) -> [a] -> Number
// your code

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`},solution:{ru:`// between :: Number -> Number -> Number -> Boolean
const between = (min) => (max) => (x) => x >= min && x <= max

// countWhere :: (a -> Boolean) -> [a] -> Number
const countWhere = (predicate) => (arr) => arr.filter(predicate).length

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
// два аргумента из трех переданы: осталась функция Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`,en:`// between :: Number -> Number -> Number -> Boolean
const between = (min) => (max) => (x) => x >= min && x <= max

// countWhere :: (a -> Boolean) -> [a] -> Number
const countWhere = (predicate) => (arr) => arr.filter(predicate).length

const ages = [12, 17, 25, 33, 41, 70]

// isWorkingAge :: Number -> Boolean
// two of the three arguments are passed: what is left is a function Number -> Boolean
const isWorkingAge = between(18)(65)

console.log(countWhere(isWorkingAge)(ages))
console.log(typeof isWorkingAge)`},expected:{ru:`3
function`,en:`3
function`}},{task:{ru:"Сигнатура safeDivide :: Number -> Number -> Maybe Number говорит, что результата может не быть. Напишите safeDivide: она делит a на b и возвращает S.Just(частное), а если b равно нулю — S.Nothing. Последняя строка заготовки достаёт число из Maybe через S.fromMaybe с запасным значением 0, как в уроке «Функциональное программирование».",en:'The signature safeDivide :: Number -> Number -> Maybe Number says that there may be no result. Write safeDivide: it divides a by b and returns S.Just(quotient), or S.Nothing if b is zero. The last line of the starter takes the number out of the Maybe with S.fromMaybe and a fallback of 0, as in the "Functional programming" lesson.'},starter:{ru:`// safeDivide :: Number -> Number -> Maybe Number
// ваш код

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`,en:`// safeDivide :: Number -> Number -> Maybe Number
// your code

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`},solution:{ru:`// safeDivide :: Number -> Number -> Maybe Number
// Maybe Number: значение типа Number или его отсутствие
const safeDivide = (a) => (b) => b === 0 ? S.Nothing : S.Just(a / b)

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`,en:`// safeDivide :: Number -> Number -> Maybe Number
// Maybe Number: a value of type Number, or its absence
const safeDivide = (a) => (b) => b === 0 ? S.Nothing : S.Just(a / b)

console.log(safeDivide(10)(2))
console.log(safeDivide(1)(0))
console.log(S.fromMaybe(0)(safeDivide(1)(0)))`},expected:{ru:`Just (5)
Nothing
0`,en:`Just (5)
Nothing
0`}}]},i={slug:"category-theory",title:{ru:"Теория категорий",en:"Category theory"},description:{ru:"Основы теории категорий для JavaScript-разработчика: типы как объекты, функции как морфизмы и два закона композиции — тождество и ассоциативность.",en:"Category theory basics for JavaScript developers: types as objects, functions as morphisms, and the composition laws of identity and associativity."},goal:{ru:"Понять, что такое категория в программировании — типы как объекты и функции как морфизмы — и какие два закона выполняет их композиция.",en:"Understand what a category is in programming, with types as objects and functions as morphisms, and which two laws their composition obeys."},blocks:[{type:"text",ru:"Существует тесная связь между функциональным программированием и теорией категорий. В функциональном программировании многие абстракции, законы и принципы взяты из теории категорий.",en:"There is a close connection between functional programming and category theory. In functional programming many abstractions, laws and principles are taken from category theory."},{type:"text",ru:"Что же мы знаем о теории категорий. Мы не будем углубляться в основы и академические термины. Мы постараемся объяснить всё это без академических терминов.",en:"So what do we know about category theory? We will not dive into the fundamentals and academic terms. We will try to explain all of this without academic terminology."},{type:"text",ru:"Категория в рамках программирования — это совокупность объектов (типы данных: Array, Object, Number, String ...) и морфизмов между ними (стрелок, то есть функций). Морфизмы f :: a -> b и g :: b -> c можно скомпоновать в g . f :: a -> c (читается «g после f»: сначала f, затем g). Для композиции выполняются два закона. Тождество: у каждого объекта есть тождественный морфизм id :: a -> a, и композиция с ним ничего не меняет (f . id = f, id . f = f). Ассоциативность: h . (g . f) = (h . g) . f, то есть неважно, как расставить скобки.",en:'A category, in the context of programming, is a collection of objects (data types: Array, Object, Number, String, ...) and morphisms between them (arrows, that is, functions). Morphisms f :: a -> b and g :: b -> c can be composed into g . f :: a -> c (read as "g after f": first f, then g). Composition obeys two laws. Identity: every object has an identity morphism id :: a -> a, and composing with it changes nothing (f . id = f, id . f = f). Associativity: h . (g . f) = (h . g) . f, so it does not matter where the parentheses go.'},{type:"code",code:{ru:`//  Пример
// f :: a -> b
// g :: b -> c
// g . f :: a -> c

// a, b, c — это объекты (типы)
// f, g — морфизмы (стрелки), то есть функции
// g . f — композиция: сначала f, затем g

// Практический пример

// concatX :: Number -> String
const concatX = num => \`\${num} X\`

// toArray:: a -> [a]
const toArray = word => [word]

// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // строку превращаем в массив
  concatX // добавляем X и превращаем в строку
  )

// start
pipeline(5) // ['5 X'] результат

// Что же тут произошло
// входной аргумент 5 — значение типа "a" (Number)
// конкатенировали букву X и получили '5 X' — значение типа "b" (String)
// добавили в массив и получили ['5 X'] — значение типа "c" (Array)
// concatX :: Number -> String — морфизм f :: a -> b
// toArray :: String -> [String] — морфизм g :: b -> c
// pipeline = compose(toArray, concatX) :: Number -> [String] — композиция g . f :: a -> c`,en:`//  Example
// f :: a -> b
// g :: b -> c
// g . f :: a -> c

// a, b, c are objects (types)
// f, g are morphisms (arrows), that is, functions
// g . f is composition: first f, then g

// A practical example

// concatX :: Number -> String
const concatX = num => \`\${num} X\`

// toArray:: a -> [a]
const toArray = word => [word]

// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // turn the string into an array
  concatX // append X and turn it into a string
  )

// start
pipeline(5) // ['5 X'] is the result

// So what happened here
// the input argument 5 is a value of type "a" (Number)
// we concatenated the letter X and got '5 X', a value of type "b" (String)
// we put it into an array and got ['5 X'], a value of type "c" (Array)
// concatX :: Number -> String is the morphism f :: a -> b
// toArray :: String -> [String] is the morphism g :: b -> c
// pipeline = compose(toArray, concatX) :: Number -> [String] is the composition g . f :: a -> c`}},{type:"text",ru:"А давайте мы с вами пофантазируем, чтобы глубже понять теорию категорий. Используем аналогии из окружающего нас мира.",en:"Let's use our imagination to understand category theory more deeply. We will draw analogies from the world around us."},{type:"text",ru:"Мы используем природу и напишем псевдокод, иллюстрирующий идеи теории категорий.",en:"We will use nature and write pseudocode that illustrates the ideas of category theory."},{type:"code",pseudo:!0,code:{ru:`//  Пример
твердое -> жидкое -> газообразное
лёд -> вода -> пар

лёд, вода, пар // это объекты
-> // морфизмы: процессы над ними (нагрев и т. п.)
превратитьВПар . превратитьВВоду :: лёд -> пар // композиция процессов

// Практический пример

// превратитьВВоду :: лёд -> вода
const превратитьВВоду = лёд => (держим в комнатной температуре, вода)

// превратитьВПар:: вода -> пар
const превратитьВПар = вода=> (производим сильный нагрев, пар)

// композицияПроцессов :: ((b -> c), (a -> b)) -> a -> c
const композицияПроцессов = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = композицияПроцессов(
  превратитьВПар,
  превратитьВВоду
  )

// start
pipeline(лёд) // пар результат`,en:`//  Example
solid -> liquid -> gas
ice -> water -> steam

ice, water, steam // these are objects
-> // morphisms: processes applied to them (heating and so on)
turnIntoSteam . turnIntoWater :: ice -> steam // composition of processes

// A practical example

// turnIntoWater :: ice -> water
const turnIntoWater = ice => (keep at room temperature, water)

// turnIntoSteam:: water -> steam
const turnIntoSteam = water=> (apply strong heat, steam)

// composeProcesses :: ((b -> c), (a -> b)) -> a -> c
const composeProcesses = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = composeProcesses(
  turnIntoSteam,
  turnIntoWater
  )

// start
pipeline(ice) // steam is the result`}}],summary:[{ru:"В функциональном программировании многие абстракции, законы и принципы взяты из теории категорий.",en:"In functional programming many abstractions, laws and principles are taken from category theory."},{ru:"Категория в программировании — это объекты (типы данных) и морфизмы между ними (стрелки, то есть функции).",en:"A category in programming is a collection of objects (data types) and morphisms between them (arrows, that is, functions)."},{ru:"Морфизмы f :: a -> b и g :: b -> c компонуются в g . f :: a -> c — «g после f»: сначала f, затем g.",en:'Morphisms f :: a -> b and g :: b -> c compose into g . f :: a -> c, read as "g after f": first f, then g.'},{ru:"Композиция выполняет два закона: тождество (f . id = f, id . f = f) и ассоциативность (h . (g . f) = (h . g) . f).",en:"Composition obeys two laws: identity (f . id = f, id . f = f) and associativity (h . (g . f) = (h . g) . f)."}],exercises:[{task:{ru:"Даны три морфизма: words :: String -> [String] разбивает текст на слова, count :: [a] -> Number возвращает длину массива, isLong :: Number -> Boolean проверяет, что число больше трёх. С помощью compose из урока соберите из них морфизм isLongText :: String -> Boolean. Стыкуйте функции по типам: выход каждой функции должна принимать следующая. Помните, что compose(g, f) — это «g после f».",en:'There are three morphisms: words :: String -> [String] splits a text into words, count :: [a] -> Number returns the length of an array, and isLong :: Number -> Boolean checks that a number is greater than three. Using compose from the lesson, build the morphism isLongText :: String -> Boolean out of them. Match the functions by type: the output of each function must be accepted by the next one. Remember that compose(g, f) is "g after f".'},starter:{ru:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// ваш код: isLongText :: String -> Boolean

console.log(isLongText('map filter reduce'))
console.log(isLongText('pipe compose curry tap lens'))`,en:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// your code: isLongText :: String -> Boolean

console.log(isLongText('map filter reduce'))
console.log(isLongText('pipe compose curry tap lens'))`},solution:{ru:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// String -> [String] -> Number -> Boolean:
// сначала words, затем count, затем isLong
// isLongText :: String -> Boolean
const isLongText = compose(isLong, compose(count, words))

console.log(isLongText('map filter reduce')) // 3 слова
console.log(isLongText('pipe compose curry tap lens')) // 5 слов`,en:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// String -> [String] -> Number -> Boolean:
// first words, then count, then isLong
// isLongText :: String -> Boolean
const isLongText = compose(isLong, compose(count, words))

console.log(isLongText('map filter reduce')) // 3 words
console.log(isLongText('pipe compose curry tap lens')) // 5 words`},expected:{ru:`false
true`,en:`false
true`}},{task:{ru:"Проверьте на тех же морфизмах оба закона категории. Напишите тождественный морфизм id :: a -> a и функцию sameOn, которая считает две функции равными, если они дают одинаковый результат на всех строках из списка inputs. Проверки в заготовке сравнивают compose(id, countWords) и compose(countWords, id) с countWords, а затем compose(isLong, compose(count, words)) с compose(compose(isLong, count), words) и выводят по строке на каждую.",en:"Check both category laws on the same morphisms. Write the identity morphism id :: a -> a and a function sameOn that treats two functions as equal if they give the same result on every string in the inputs list. The checks in the starter compare compose(id, countWords) and compose(countWords, id) with countWords, and then compose(isLong, compose(count, words)) with compose(compose(isLong, count), words), printing one line per check."},starter:{ru:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// тождественный морфизм
// id :: a -> a
// ваш код

// входы, на которых сравниваем функции
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// две функции равны, если на всех входах дают одно и то же
// sameOn :: ((a -> b), (a -> b)) -> Boolean
// ваш код

// countWords :: String -> Number
const countWords = compose(count, words)

// тождество: композиция с id ничего не меняет
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// ассоциативность: неважно, как расставить скобки
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`,en:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// the identity morphism
// id :: a -> a
// your code

// the inputs on which we compare functions
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// two functions are equal if they give the same result on every input
// sameOn :: ((a -> b), (a -> b)) -> Boolean
// your code

// countWords :: String -> Number
const countWords = compose(count, words)

// identity: composing with id changes nothing
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// associativity: it does not matter where the parentheses go
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`},solution:{ru:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// тождественный морфизм
// id :: a -> a
const id = (x) => x

// входы, на которых сравниваем функции
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// две функции равны, если на всех входах дают одно и то же
// sameOn :: ((a -> b), (a -> b)) -> Boolean
const sameOn = (f, g) => inputs.every((x) => f(x) === g(x))

// countWords :: String -> Number
const countWords = compose(count, words)

// тождество: композиция с id ничего не меняет
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// ассоциативность: неважно, как расставить скобки
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`,en:`// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// the identity morphism
// id :: a -> a
const id = (x) => x

// the inputs on which we compare functions
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// two functions are equal if they give the same result on every input
// sameOn :: ((a -> b), (a -> b)) -> Boolean
const sameOn = (f, g) => inputs.every((x) => f(x) === g(x))

// countWords :: String -> Number
const countWords = compose(count, words)

// identity: composing with id changes nothing
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// associativity: it does not matter where the parentheses go
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`},expected:{ru:`id . countWords = countWords: true
countWords . id = countWords: true
isLong . (count . words) = (isLong . count) . words: true`,en:`id . countWords = countWords: true
countWords . id = countWords: true
isLong . (count . words) = (isLong . count) . words: true`}}]},c={slug:"functors",title:{ru:"Функтор и его законы",en:"Functors and their laws"},description:{ru:"Функтор в JavaScript: контейнер с map, сохраняющим структуру. Массив и Maybe-подобный контейнер, законы функтора и почему промис нарушает закон композиции.",en:"Functors in JavaScript: a container whose map keeps the structure. Arrays and a Maybe-like container, the functor laws and why a promise breaks composition."},goal:{ru:"Понять, что такое функтор — контейнер с map, который меняет значения и сохраняет структуру, — научиться проверять законы тождества и композиции в коде и опираться на них при рефакторинге.",en:"Understand what a functor is, a container whose map changes the values and keeps the structure, learn to check the identity and composition laws in code and rely on them when refactoring."},blocks:[{type:"text",ru:"В уроке «Функции map, filter, reduce» map работал с массивами, а в уроке «Нотация типов Хиндли–Милнера» встречалась сигнатура map :: Functor f => (a -> b) -> f a -> f b. Вместо массива в ней стоит f — любой функтор. Разберёмся, что это за f и почему map можно доверять.",en:`In the lesson "The map, filter, and reduce functions", map worked with arrays, and in the "Hindley–Milner type notation" lesson we came across the signature map :: Functor f => (a -> b) -> f a -> f b. Instead of an array it has f, which stands for any functor. Let's find out what this f is and why map can be trusted.`},{type:"text",ru:"Функтор — это контейнер, у которого есть map. map принимает обычную функцию a -> b, применяет её к значениям внутри контейнера и возвращает новый контейнер того же вида. Главное свойство map — он сохраняет структуру: из массива из трёх элементов получается массив из трёх элементов в том же порядке, меняются только сами значения. Исходный контейнер при этом остаётся прежним.",en:"A functor is a container that has map. map takes an ordinary function a -> b, applies it to the values inside the container and returns a new container of the same kind. The key property of map is that it keeps the structure: an array of three elements becomes an array of three elements in the same order, and only the values themselves change. The original container stays as it was."},{type:"code",code:{ru:`// Массив — самый знакомый функтор
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
console.log(R.map(double, Box(21)).value) // 42`,en:`// An array is the most familiar functor
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
console.log(R.map(double, Box(21)).value) // 42`}},{type:"text",ru:"Box сам по себе бесполезен, зато показывает, что map — не только про массивы. Функция double ничего не знает о контейнере, а как добраться до значений, решает map самого контейнера: у массива — пройти по всем элементам, у Box — взять одно значение. Поэтому R.map из Ramda работает и с массивом, и с Box.",en:"Box is useless on its own, but it shows that map is not only about arrays. The double function knows nothing about the container, and it is the container's own map that decides how to reach the values: for an array, visit every element; for Box, take the single value. That is why R.map from Ramda works with both an array and a Box."},{type:"text",ru:"Интереснее контейнер, в котором значения может не быть. Just хранит значение, Nothing означает его отсутствие. map у Just применяет функцию, а у Nothing ничего не делает: применять функцию не к чему. Проверка на отсутствие живёт в одном месте, в map, а функции в цепочке работают с обычными значениями. Структура сохраняется и здесь: Just после map остаётся Just, Nothing остаётся Nothing. Готовый Maybe из библиотеки Sanctuary разобран в уроке «Maybe и Either».",en:'A more interesting container is one that may hold no value at all. Just holds a value, Nothing means it is absent. map on Just applies the function, while map on Nothing does nothing: there is nothing to apply the function to. The check for absence lives in one place, in map, and the functions in the chain work with ordinary values. The structure is kept here too: Just stays Just after map, and Nothing stays Nothing. The ready-made Maybe from the Sanctuary library is covered in the "Maybe and Either" lesson.'},{type:"code",code:{ru:`// Maybe-подобный контейнер: значение есть (Just) или его нет (Nothing)

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
console.log(greet(7)) // Пользователь не найден`,en:`// A Maybe-like container: there is a value (Just) or there is none (Nothing)

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
console.log(greet(7)) // User not found`}},{type:"heading",ru:"Законы функтора",en:"The functor laws"},{type:"text",ru:"Одного метода map мало, чтобы контейнер стал функтором: map должен выполнять два закона. Тождество: u.map(x => x) эквивалентно u — если функция ничего не меняет, то и map ничего не меняет. Композиция: u.map(x => f(g(x))) эквивалентно u.map(g).map(f) — один проход с композицией даёт то же, что два прохода подряд. В записи из урока «Теория категорий», где точка означает композицию, их пишут короче: map(id) = id и map(f . g) = map(f) . map(g).",en:'A map method alone is not enough to make a container a functor: map must obey two laws. Identity: u.map(x => x) is equivalent to u, so if the function changes nothing, map changes nothing either. Composition: u.map(x => f(g(x))) is equivalent to u.map(g).map(f), so one pass with the composition gives the same as two passes in a row. In the notation from the "Category theory" lesson, where the dot means composition, they are written more briefly: map(id) = id and map(f . g) = map(f) . map(g).'},{type:"code",code:{ru:`// Законы функтора на массиве и на Box
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

// Box из первого примера
// Box :: a -> Box a
const Box = (value) => ({
  value,
  map: (fn) => Box(fn(value)),
})

// у Box законы тоже выполняются: сравниваем значения внутри
console.log(Box(5).map(id).value === Box(5).value) // true: тождество
console.log(Box(5).map(compose(tenTimes, inc)).value === Box(5).map(inc).map(tenTimes).value) // true: композиция

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
console.log(JSON.stringify(compactMap(orZero)(compactMap(hideBig)(values)))) // [10]`,en:`// The functor laws on an array and on Box
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

// Box from the first example
// Box :: a -> Box a
const Box = (value) => ({
  value,
  map: (fn) => Box(fn(value)),
})

// the laws hold for Box too: we compare the values inside
console.log(Box(5).map(id).value === Box(5).value) // true: identity
console.log(Box(5).map(compose(tenTimes, inc)).value === Box(5).map(inc).map(tenTimes).value) // true: composition

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
console.log(JSON.stringify(compactMap(orZero)(compactMap(hideBig)(values)))) // [10]`}},{type:"text",ru:"«Эквивалентно» значит та же структура и те же значения, а не тот же объект: map всегда возвращает новый контейнер, поэтому u.map(id) === u даёт false. Законы гарантируют, что map меняет значения и больше ничего: не выбрасывает элементы, не переставляет их и не меняет форму контейнера. compactMap нарушает оба закона, и код, который рассчитывает на длину массива или на индексы, после такого map ломается.",en:'"Equivalent" means the same structure and the same values, not the same object: map always returns a new container, so u.map(id) === u gives false. The laws guarantee that map changes the values and nothing else: it does not throw elements away, does not reorder them and does not change the shape of the container. compactMap breaks both laws, and code that relies on the array length or on indexes breaks after such a map.'},{type:"heading",ru:"Законы и рефакторинг",en:"Laws and refactoring"},{type:"text",ru:"Закон композиции — это правило рефакторинга: map(f) . map(g) = map(f . g). Цепочку из двух map можно склеить в один проход без промежуточного массива, а длинную функцию внутри map — разбить на несколько map. Результат не изменится, и проверять это на каждом примере не нужно: это гарантирует закон. С compactMap так нельзя, что и показал пример выше.",en:"The composition law is a refactoring rule: map(f) . map(g) = map(f . g). A chain of two maps can be merged into one pass without an intermediate array, and a long function inside map can be split into several maps. The result will not change, and there is no need to check it on every example: the law guarantees it. With compactMap this is not possible, as the example above showed."},{type:"code",code:{ru:`// Закон композиции как правило рефакторинга:
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
console.log(R.equals(twoPasses, onePass)) // true`,en:`// The composition law as a refactoring rule:
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
console.log(R.equals(twoPasses, onePass)) // true`}},{type:"text",ru:"Посмотрите на журнал: результат одинаковый, а порядок вызовов разный. Два прохода вызывают сначала все getTotal, потом все format, а один проход их чередует. Для чистых функций порядок не важен — об этом урок «Чистые функции». Если же функции пишут в лог или меняют внешние данные, после такого рефакторинга эффекты пойдут в другом порядке.",en:'Look at the journal: the result is the same, but the order of calls is different. With two passes, every getTotal runs first and then every format, while one pass interleaves them. For pure functions the order does not matter, as the "Pure functions" lesson explains. But if the functions write to a log or change outside data, after such a refactoring the effects will happen in a different order.'},{type:"text",ru:"Метод then у промиса похож на map: он применяет функцию к значению, когда оно появится, и возвращает новый промис. Но строгим функтором промис не является. Если функция возвращает промис или любой другой объект с методом then, then не кладёт его внутрь, а разворачивает и ждёт его значения. Промиса внутри промиса не бывает, и закон композиции нарушается. Поэтому библиотеки, которые строго следуют законам, например Sanctuary, промис функтором не считают: S.map с ним не работает.",en:"A promise's then method looks like map: it applies the function to the value once the value arrives and returns a new promise. But a promise is not a strict functor. If the function returns a promise, or any other object with a then method, then does not put it inside but unwraps it and waits for its value. There is no such thing as a promise inside a promise, and the composition law is broken. That is why libraries that follow the laws strictly, Sanctuary for example, do not treat a promise as a functor: S.map does not work with it."},{type:"code",code:{ru:`// then у промиса похож на map: применяет функцию к значению внутри
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
})`,en:`// a promise's then looks like map: it applies the function to the value inside
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
})`}},{type:"text",ru:"Название «функтор» пришло из теории категорий. В уроке «Теория категорий» категория — это типы-объекты и функции-морфизмы между ними. Функтор отображает одну категорию в другую: каждому типу a ставит в соответствие тип F a (типу Number — тип [Number]), а каждой функции f :: a -> b — функцию map(f) :: F a -> F b. Законы функтора говорят ровно о том, что такое отображение сохраняет тождественные морфизмы и композицию. В программировании функтор переводит типы языка в типы того же языка, поэтому его называют эндофунктором. Это идеализация: она верна для чистых функций, которые завершаются без исключений.",en:`The name "functor" comes from category theory. In the "Category theory" lesson a category is types as objects and functions as morphisms between them. A functor maps one category to another: it assigns to each type a a type F a (to the type Number, the type [Number]), and to each function f :: a -> b a function map(f) :: F a -> F b. The functor laws say exactly that this mapping preserves identity morphisms and composition. In programming a functor takes the language's types to types of the same language, which is why it is called an endofunctor. This is an idealization: it holds for pure functions that finish without exceptions.`}],summary:[{ru:"Функтор — контейнер с map: map применяет функцию к значениям внутри и возвращает новый контейнер той же структуры. Массив, Box и Maybe-подобный контейнер — функторы.",en:"A functor is a container with map: map applies a function to the values inside and returns a new container with the same structure. An array, Box and a Maybe-like container are functors."},{ru:"Законы функтора: тождество — u.map(x => x) эквивалентно u, композиция — u.map(x => f(g(x))) эквивалентно u.map(g).map(f). Метод map без законов функтором контейнер не делает.",en:"The functor laws: identity, where u.map(x => x) is equivalent to u, and composition, where u.map(x => f(g(x))) is equivalent to u.map(g).map(f). A map method without the laws does not make a container a functor."},{ru:"Закон композиции — правило рефакторинга: map(f) . map(g) = map(f . g). Два прохода можно склеить в один, результат не изменится, а порядок вызовов изменится, поэтому функции должны быть чистыми.",en:"The composition law is a refactoring rule: map(f) . map(g) = map(f . g). Two passes can be merged into one: the result stays the same but the order of calls changes, so the functions must be pure."},{ru:"then у промиса похож на map, но разворачивает промис, который вернула функция, поэтому промис — не строгий функтор.",en:"A promise's then looks like map, but it unwraps a promise returned by the function, so a promise is not a strict functor."},{ru:"В теории категорий функтор отображает типы и функции между ними, сохраняя тождество и композицию.",en:"In category theory a functor maps types and the functions between them, preserving identity and composition."}],exercises:[{task:{ru:"Дерево — тоже функтор. Узел дерева — объект { value, children }, где children — массив узлов. Напишите mapTree(fn, tree): она применяет fn к value каждого узла и возвращает новое дерево той же формы — у каждого узла столько же детей в том же порядке. Пригодятся рекурсия из урока «Рекурсия» и map массива. Заготовка печатает дерево после mapTree и проверяет на нём оба закона функтора.",en:`A tree is a functor too. A tree node is an object { value, children }, where children is an array of nodes. Write mapTree(fn, tree): it applies fn to the value of every node and returns a new tree of the same shape, where every node has as many children as before, in the same order. Recursion from the "Recursion" lesson and the array's map will come in handy. The starter prints the tree after mapTree and checks both functor laws on it.`},starter:{ru:`// mapTree :: ((a -> b), Tree a) -> Tree b
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
console.log(\`композиция: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`,en:`// mapTree :: ((a -> b), Tree a) -> Tree b
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
console.log(\`composition: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`},solution:{ru:`// mapTree :: ((a -> b), Tree a) -> Tree b
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
console.log(\`композиция: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`,en:`// mapTree :: ((a -> b), Tree a) -> Tree b
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
console.log(\`composition: \${same(mapTree((x) => double(inc(x)), tree), mapTree(double, mapTree(inc, tree)))}\`)`},expected:{ru:`{"value":2,"children":[{"value":4,"children":[]},{"value":6,"children":[{"value":8,"children":[]}]}]}
тождество: true
композиция: true`,en:`{"value":2,"children":[{"value":4,"children":[]},{"value":6,"children":[{"value":8,"children":[]}]}]}
identity: true
composition: true`}},{task:{ru:"В заготовке список товаров проходит через три map подряд: взять цену, применить скидку 10% и отформатировать строку. Счётчик passes считает, сколько раз обходили массив. Опираясь на закон композиции, получите тот же результат after за один проход: один вызов map с композицией трёх функций через R.pipe или R.compose. После рефакторинга счётчик должен показать 1, а результат совпасть с прежним.",en:"In the starter a list of products goes through three maps in a row: take the price, apply a 10% discount and format the string. The passes counter counts how many times the array was traversed. Relying on the composition law, get the same result after in a single pass: one call to map with the composition of the three functions via R.pipe or R.compose. After the refactoring the counter should show 1, and the result should match the previous one."},starter:{ru:`const products = [
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
// discount :: Number -> Number — скидка 10%
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
console.log(\`результат тот же: \${JSON.stringify(after) === JSON.stringify(before)}\`)`,en:`const products = [
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
// discount :: Number -> Number, a 10% discount
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
console.log(\`same result: \${JSON.stringify(after) === JSON.stringify(before)}\`)`},solution:{ru:`const products = [
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
// discount :: Number -> Number — скидка 10%
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
console.log(\`результат тот же: \${JSON.stringify(after) === JSON.stringify(before)}\`)`,en:`const products = [
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
// discount :: Number -> Number, a 10% discount
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
console.log(\`same result: \${JSON.stringify(after) === JSON.stringify(before)}\`)`},expected:{ru:`["900.00","405.00","108.00"]
проходов до: 3
проходов после: 1
результат тот же: true`,en:`["900.00","405.00","108.00"]
passes before: 3
passes after: 1
same result: true`}}]},l={slug:"fantasy-land",title:{ru:"Fantasy-land (Страна фантазий)",en:"Fantasy-land"},description:{ru:"Что описывает спецификация Fantasy-land и как реализовать по ней функтор на JavaScript: метод fantasy-land/map и два закона — тождество и композиция.",en:"What the Fantasy Land specification describes and how to implement a JavaScript functor with fantasy-land/map that obeys the identity and composition laws."},goal:{ru:"Понять, что такое спецификация Fantasy-land, и научиться реализовывать по ней функтор: метод fantasy-land/map и два закона, которые функтор должен соблюдать.",en:"Understand what the Fantasy Land specification is and learn to implement a functor according to it: the fantasy-land/map method and the two laws a functor must obey."},blocks:[{type:"text",ru:"Спецификация Fantasy-land (Страна фантазий) — это набор правил и публичных интерфейсов, описывающих абстракции из алгебры и теории категорий.",en:"The Fantasy Land specification is a set of rules and public interfaces describing abstractions from algebra and category theory."},{type:"text",ru:"Эти правила и законы описывают алгебраические структуры.",en:"These rules and laws describe algebraic structures."},{type:"text",ru:"По сути, реализуя эти интерфейсы и законы, мы следуем спецификации Fantasy-land (Страна фантазий).",en:"In essence, by implementing these interfaces and laws, we follow the Fantasy Land specification."},{type:"code",pseudo:!0,code:{ru:`// Вот как она выглядит

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
                                                                    (chainRec)`,en:`// This is what it looks like

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
                                                                    (chainRec)`}},{type:"text",ru:"Давайте мы попробуем с вами создать Functor (функтор) согласно спецификации Fantasy-land (Страна фантазий). Кроме метода fantasy-land/map, функтор должен соблюдать два закона. Тождество: u['fantasy-land/map'](a => a) эквивалентно u. Композиция: u['fantasy-land/map'](x => f(g(x))) эквивалентно u['fantasy-land/map'](g)['fantasy-land/map'](f).",en:"Let's try to create a Functor according to the Fantasy Land specification. Besides the fantasy-land/map method, a functor must obey two laws. Identity: u['fantasy-land/map'](a => a) is equivalent to u. Composition: u['fantasy-land/map'](x => f(g(x))) is equivalent to u['fantasy-land/map'](g)['fantasy-land/map'](f)."},{type:"code",code:{ru:`// Сигнатура
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
}`,en:`// Signature
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
}`}},{type:"code",code:{ru:`// ==== синтаксис es6 ======
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

// =========================`,en:`// ==== es6 syntax ======
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

// =========================`}}],summary:[{ru:"Fantasy-land — спецификация: набор правил и публичных интерфейсов, описывающих абстракции из алгебры и теории категорий. Реализуя эти интерфейсы и законы, мы следуем спецификации.",en:"Fantasy Land is a specification: a set of rules and public interfaces describing abstractions from algebra and category theory. By implementing these interfaces and laws, we follow the specification."},{ru:"Функтор реализует метод fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b: пропускает содержимое контейнера через функцию и возвращает новый функтор с новым значением.",en:"A functor implements the fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b method: it passes the contents of the container through the function and returns a new functor that holds the new value."},{ru:"Кроме метода, функтор соблюдает два закона: тождество — u['fantasy-land/map'](a => a) эквивалентно u — и композицию — u['fantasy-land/map'](x => f(g(x))) эквивалентно u['fantasy-land/map'](g)['fantasy-land/map'](f).",en:"Besides the method, a functor obeys two laws: identity, where u['fantasy-land/map'](a => a) is equivalent to u, and composition, where u['fantasy-land/map'](x => f(g(x))) is equivalent to u['fantasy-land/map'](g)['fantasy-land/map'](f)."},{ru:"map не мутирует исходный функтор: у него остаётся прежнее значение.",en:"map does not mutate the original functor: it keeps its previous value."}],exercises:[{task:{ru:"По образцу функтора на чистых функциях из урока реализуйте функтор list для массивов: list(items) возвращает объект с полем items и методом fantasy-land/map, который применяет функцию к каждому элементу и возвращает новый list. Примените к списку слов два map подряд: сначала переведите слова в верхний регистр, затем замените их длинами. Убедитесь, что исходный list не изменился.",en:"Following the pure-function functor from the lesson, implement a list functor for arrays: list(items) returns an object with an items field and a fantasy-land/map method that applies the function to every element and returns a new list. Apply two maps in a row to a list of words: first convert the words to upper case, then replace them with their lengths. Make sure the original list has not changed."},starter:{ru:`const FANTASY_LAND_MAP = 'fantasy-land/map'

// ваш код: list :: [a] -> List a

const names = list(['map', 'filter', 'reduce'])
const upper = names[FANTASY_LAND_MAP]((word) => word.toUpperCase())
const lengths = upper[FANTASY_LAND_MAP]((word) => word.length)

console.log(JSON.stringify(names.items))
console.log(JSON.stringify(upper.items))
console.log(JSON.stringify(lengths.items))`,en:`const FANTASY_LAND_MAP = 'fantasy-land/map'

// your code: list :: [a] -> List a

const names = list(['map', 'filter', 'reduce'])
const upper = names[FANTASY_LAND_MAP]((word) => word.toUpperCase())
const lengths = upper[FANTASY_LAND_MAP]((word) => word.length)

console.log(JSON.stringify(names.items))
console.log(JSON.stringify(upper.items))
console.log(JSON.stringify(lengths.items))`},solution:{ru:`const FANTASY_LAND_MAP = 'fantasy-land/map'

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
console.log(JSON.stringify(lengths.items))`,en:`const FANTASY_LAND_MAP = 'fantasy-land/map'

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
console.log(JSON.stringify(lengths.items))`},expected:{ru:`["map","filter","reduce"]
["MAP","FILTER","REDUCE"]
[3,6,6]`,en:`["map","filter","reduce"]
["MAP","FILTER","REDUCE"]
[3,6,6]`}},{task:{ru:"Напишите checkLaws(name, u, f, g): она проверяет для контейнера u оба закона функтора и печатает две строки — для тождества и для композиции, например «functor — тождество: true» и «functor — композиция: true». Контейнеры сравнивайте через JSON.stringify: он пропускает методы, поэтому сравниваются только данные. Проверьте функтор functor из урока и контейнер counted, который при каждом map увеличивает счётчик вызовов count. Почему counted — не функтор, хотя метод fantasy-land/map у него есть?",en:'Write checkLaws(name, u, f, g): it checks both functor laws for the container u and prints two lines, one for identity and one for composition, for example "functor — identity: true" and "functor — composition: true". Compare containers via JSON.stringify: it skips methods, so only the data is compared. Check the functor from the lesson and a counted container that increases its count of calls on every map. Why is counted not a functor even though it has a fantasy-land/map method?'},starter:{ru:`const FANTASY_LAND_MAP = 'fantasy-land/map'

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
checkLaws('counted', counted(5), double, inc)`,en:`const FANTASY_LAND_MAP = 'fantasy-land/map'

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
checkLaws('counted', counted(5), double, inc)`},solution:{ru:`const FANTASY_LAND_MAP = 'fantasy-land/map'

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
// а два map подряд дают другой count, чем один map с композицией`,en:`const FANTASY_LAND_MAP = 'fantasy-land/map'

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
// and two maps in a row give a different count than one map with the composition`},expected:{ru:`functor — тождество: true
functor — композиция: true
counted — тождество: false
counted — композиция: false`,en:`functor — identity: true
functor — composition: true
counted — identity: false
counted — composition: false`}}]},u={slug:"maybe-either",title:{ru:"Maybe и Either",en:"Maybe and Either"},description:{ru:"Maybe и Either в JavaScript на Sanctuary: безопасное чтение вложенных данных, ошибки с причиной вместо исключений и разница между map и chain.",en:"Maybe and Either in JavaScript with Sanctuary: reading nested data safely, errors with a reason instead of exceptions, and when to use map or chain."},goal:{ru:"Научиться обходиться без null-проверок и try/catch в конвейере: Maybe из Sanctuary — для значения, которого может не быть, Either — для ошибки с причиной; понять, когда шагу нужен map, а когда chain.",en:"Learn to do without null checks and try/catch in a pipeline: Maybe from Sanctuary for a value that may be missing, Either for an error with a reason; and understand when a step needs map and when it needs chain."},blocks:[{type:"text",ru:"В JS отсутствие значения обычно выражают через null и undefined, а ошибку — через исключение. Оба способа плохо сочетаются с конвейером из урока «Композиция функций»: обращение к свойству undefined бросает TypeError, а исключение выходит из середины цепочки и пропускает остальные шаги. По сигнатуре cityOf :: Object -> String не видно, что функция может упасть.",en:'In JS a missing value is usually expressed with null and undefined, and an error with an exception. Both fit poorly into the pipeline from the "Function composition" lesson: reading a property of undefined throws a TypeError, and an exception leaves the middle of the chain and skips the remaining steps. The signature cityOf :: Object -> String does not show that the function can crash.'},{type:"code",code:{ru:`// Проблема: значения может не быть
const users = [
  { name: 'Ann', address: { city: 'Riga' } },
  { name: 'Bob' }, // адреса нет
]

// cityOf :: Object -> String
const cityOf = (user) => user.address.city

console.log(cityOf(users[0])) // Riga

try {
  cityOf(users[1]) // у Bob нет address: читаем city у undefined
} catch (error) {
  console.log(error.name) // TypeError
}

// ?. спасает от падения здесь, но undefined уходит дальше
const city = users[1].address?.city
console.log(city) // undefined

try {
  city.toUpperCase() // и программа падает уже в другом месте
} catch (error) {
  console.log(error.name) // TypeError
}

// исключение по сигнатуре тоже не видно: JSON.parse бросает на некорректной строке
try {
  JSON.parse('{ name: Ann }')
} catch (error) {
  console.log(error.name) // SyntaxError
}`,en:`// The problem: the value may be missing
const users = [
  { name: 'Ann', address: { city: 'Riga' } },
  { name: 'Bob' }, // no address
]

// cityOf :: Object -> String
const cityOf = (user) => user.address.city

console.log(cityOf(users[0])) // Riga

try {
  cityOf(users[1]) // Bob has no address: we read city of undefined
} catch (error) {
  console.log(error.name) // TypeError
}

// ?. prevents the crash here, but undefined travels further
const city = users[1].address?.city
console.log(city) // undefined

try {
  city.toUpperCase() // and the program crashes somewhere else
} catch (error) {
  console.log(error.name) // TypeError
}

// an exception is not visible in the signature either: JSON.parse throws on an invalid string
try {
  JSON.parse('{ name: Ann }')
} catch (error) {
  console.log(error.name) // SyntaxError
}`}},{type:"text",ru:"Опциональная цепочка ?. спасает от падения в одном месте, но undefined уходит дальше и ломает программу там, где его не ждут. Проверки вида if (user && user.address) работают, но расползаются по коду, и одну из них легко забыть. Нужен способ сделать отсутствие значения и ошибку частью результата, чтобы о них было трудно забыть.",en:"Optional chaining ?. prevents the crash in one place, but undefined travels further and breaks the program where nobody expects it. Checks like if (user && user.address) work, but they spread across the code and one of them is easy to forget. We need a way to make a missing value and an error part of the result, so that they are hard to forget."},{type:"text",ru:"Maybe делает отсутствие значения частью типа: значение Maybe a — это либо Just (значение), либо Nothing. Вы его уже встречали: в уроке «Функциональное программирование» S.head вернул Maybe, а в уроке «Функтор и его законы» мы написали Maybe-подобный контейнер сами. В Sanctuary есть готовый: S.Just, S.Nothing и функции для работы с ними. Maybe — функтор: S.map применяет функцию только к Just, а Nothing проходит дальше без изменений.",en:'Maybe makes a missing value part of the type: a value of Maybe a is either Just (value) or Nothing. You have met it already: in the "Functional programming" lesson S.head returned a Maybe, and in the "Functors and their laws" lesson we wrote a Maybe-like container ourselves. Sanctuary has a ready-made one: S.Just, S.Nothing and functions to work with them. Maybe is a functor: S.map applies the function only to Just, and Nothing passes through unchanged.'},{type:"code",code:{ru:`// Maybe a: Just (значение) или Nothing
// Sanctuary в песочнице подключена как S

console.log(S.Just(42)) // Just (42)
console.log(S.Nothing) // Nothing

// head :: [a] -> Maybe a — первого элемента может не быть
console.log(S.head(['Riga', 'Oslo'])) // Just ("Riga")
console.log(S.head([])) // Nothing

// map :: (a -> b) -> Maybe a -> Maybe b
// функция применяется только к Just
const shout = (text) => text.toUpperCase()
console.log(S.map(shout)(S.head(['Riga']))) // Just ("RIGA")
console.log(S.map(shout)(S.head([]))) // Nothing, shout не вызывалась

// значение достают один раз, на выходе
// fromMaybe :: a -> Maybe a -> a
console.log(S.fromMaybe('нет города')(S.head([]))) // нет города
// maybe :: b -> (a -> b) -> Maybe a -> b — map и fromMaybe за один шаг
console.log(S.maybe('нет города')(shout)(S.head(['Oslo']))) // OSLO`,en:`// Maybe a: Just (value) or Nothing
// Sanctuary is available in the playground as S

console.log(S.Just(42)) // Just (42)
console.log(S.Nothing) // Nothing

// head :: [a] -> Maybe a, there may be no first element
console.log(S.head(['Riga', 'Oslo'])) // Just ("Riga")
console.log(S.head([])) // Nothing

// map :: (a -> b) -> Maybe a -> Maybe b
// the function is applied only to Just
const shout = (text) => text.toUpperCase()
console.log(S.map(shout)(S.head(['Riga']))) // Just ("RIGA")
console.log(S.map(shout)(S.head([]))) // Nothing, shout was not called

// the value is taken out once, at the exit
// fromMaybe :: a -> Maybe a -> a
console.log(S.fromMaybe('no city')(S.head([]))) // no city
// maybe :: b -> (a -> b) -> Maybe a -> b, map and fromMaybe in one step
console.log(S.maybe('no city')(shout)(S.head(['Oslo']))) // OSLO`}},{type:"text",ru:"Достают значение из Maybe один раз, на выходе из конвейера: S.fromMaybe подставляет запасное значение для Nothing, а S.maybe ещё и применяет функцию к значению из Just — это map и fromMaybe за один шаг. Внутри конвейера значение остаётся в Maybe, и каждый шаг пишется так, будто оно точно есть.",en:"The value is taken out of a Maybe once, at the exit of the pipeline: S.fromMaybe substitutes a fallback for Nothing, and S.maybe also applies a function to the value in Just, which is map and fromMaybe in one step. Inside the pipeline the value stays in the Maybe, and every step is written as if the value is definitely there."},{type:"heading",ru:"map и chain",en:"map and chain"},{type:"text",ru:'Если функция возвращает обычное значение, нужен map. Если она сама возвращает Maybe, как S.head или S.get, map даст Maybe внутри Maybe: Just (Just ("Riga")). Для таких функций есть chain :: (a -> Maybe b) -> Maybe a -> Maybe b: он применяет функцию и снимает лишний слой, а для Nothing ничего не делает. Правило простое: функция возвращает значение — map, возвращает Maybe — chain.',en:'If the function returns an ordinary value, you need map. If it returns a Maybe itself, like S.head or S.get, map gives a Maybe inside a Maybe: Just (Just ("Riga")). For such functions there is chain :: (a -> Maybe b) -> Maybe a -> Maybe b: it applies the function and removes the extra layer, and does nothing for Nothing. The rule is simple: the function returns a value, use map; it returns a Maybe, use chain.'},{type:"code",code:{ru:`// Безопасное чтение вложенных данных

// isObject :: * -> Boolean
const isObject = (x) => typeof x === 'object' && x !== null
// isString :: * -> Boolean
const isString = (x) => typeof x === 'string'

// get :: (* -> Boolean) -> String -> a -> Maybe b
// Just, если свойство есть и его значение проходит предикат, иначе Nothing
const getAddress = S.get(isObject)('address')
const getCity = S.get(isString)('city')

const ann = { name: 'Ann', address: { city: 'Riga' } }
const bob = { name: 'Bob' }

// map: getCity возвращает Maybe, и получается Maybe внутри Maybe
console.log(S.map(getCity)(getAddress(ann))) // Just (Just ("Riga"))
// chain :: (a -> Maybe b) -> Maybe a -> Maybe b — применяет и снимает лишний слой
console.log(S.chain(getCity)(getAddress(ann))) // Just ("Riga")
console.log(S.chain(getCity)(getAddress(bob))) // Nothing

// cityName :: a -> String
const cityName = S.pipe([
  getAddress, // Maybe Object
  S.chain(getCity), // getCity возвращает Maybe — chain
  S.map((city) => city.toUpperCase()), // toUpperCase возвращает строку — map
  S.fromMaybe('город не указан'),
])

console.log(cityName(ann)) // RIGA
console.log(cityName(bob)) // город не указан
console.log(cityName({ address: { city: null } })) // город не указан
console.log(cityName(null)) // город не указан

// для пути целиком есть S.gets
console.log(S.gets(isString)(['address', 'city'])(ann)) // Just ("Riga")

// осторожно: S.prop — для объектов, у которых свойство точно есть
try {
  S.prop('address')(bob)
} catch (error) {
  console.log(error.name) // TypeError: свойства нет
}

// и предикат в S.get — не формальность: S.get находит и свойства прототипа
console.log(S.isJust(S.get(() => true)('toString')(bob))) // true
console.log(S.get(isString)('toString')(bob)) // Nothing`,en:`// Reading nested data safely

// isObject :: * -> Boolean
const isObject = (x) => typeof x === 'object' && x !== null
// isString :: * -> Boolean
const isString = (x) => typeof x === 'string'

// get :: (* -> Boolean) -> String -> a -> Maybe b
// Just if the property exists and its value passes the predicate, Nothing otherwise
const getAddress = S.get(isObject)('address')
const getCity = S.get(isString)('city')

const ann = { name: 'Ann', address: { city: 'Riga' } }
const bob = { name: 'Bob' }

// map: getCity returns a Maybe, so we get a Maybe inside a Maybe
console.log(S.map(getCity)(getAddress(ann))) // Just (Just ("Riga"))
// chain :: (a -> Maybe b) -> Maybe a -> Maybe b, applies and removes the extra layer
console.log(S.chain(getCity)(getAddress(ann))) // Just ("Riga")
console.log(S.chain(getCity)(getAddress(bob))) // Nothing

// cityName :: a -> String
const cityName = S.pipe([
  getAddress, // Maybe Object
  S.chain(getCity), // getCity returns a Maybe: chain
  S.map((city) => city.toUpperCase()), // toUpperCase returns a string: map
  S.fromMaybe('no city given'),
])

console.log(cityName(ann)) // RIGA
console.log(cityName(bob)) // no city given
console.log(cityName({ address: { city: null } })) // no city given
console.log(cityName(null)) // no city given

// for a whole path there is S.gets
console.log(S.gets(isString)(['address', 'city'])(ann)) // Just ("Riga")

// careful: S.prop is for objects that definitely have the property
try {
  S.prop('address')(bob)
} catch (error) {
  console.log(error.name) // TypeError: the property is missing
}

// and the predicate in S.get is not a formality: S.get also finds properties of the prototype
console.log(S.isJust(S.get(() => true)('toString')(bob))) // true
console.log(S.get(isString)('toString')(bob)) // Nothing`}},{type:"text",ru:"S.get принимает предикат, имя свойства и объект и возвращает Just, только если свойство есть и значение проходит предикат. Предикат — не формальность: S.get находит и свойства прототипа, и значение null, поэтому проверяйте тип значения. S.prop возвращает значение без Maybe и бросает TypeError, если свойства нет: он подходит для объектов, у которых свойство точно есть.",en:"S.get takes a predicate, a property name and an object, and returns Just only if the property exists and the value passes the predicate. The predicate is not a formality: S.get also finds properties of the prototype and the value null, so check the type of the value. S.prop returns the value without a Maybe and throws a TypeError if the property is missing: it suits objects that definitely have the property."},{type:"text",ru:"Тип с методами chain и of, которые выполняют свои законы, называют монадой; of кладёт значение в контейнер, у Maybe это S.Just. Maybe — монада, та самая, в которую урок «Функциональное программирование» советовал обернуть данные, чтобы композиция не падала. На схеме из урока «Fantasy-land» Monad стоит под Applicative и Chain.",en:'A type that has chain and of, obeying their laws, is called a monad; of puts a value into the container, and for Maybe it is S.Just. Maybe is a monad, the very kind the "Functional programming" lesson suggested wrapping the data in so that the composition does not crash. On the diagram from the "Fantasy-land" lesson, Monad sits below Applicative and Chain.'},{type:"heading",ru:"Either: ошибка с причиной",en:"Either: an error with a reason"},{type:"text",ru:"Maybe говорит, что значения нет, но не говорит почему. Either a b хранит либо Left с причиной ошибки, либо Right с результатом (right — «правильный»). S.map и S.chain работают с Right, а Left проходит мимо них без изменений, как Nothing. На выходе S.either принимает две функции — для Left и для Right.",en:'Maybe says that there is no value but not why. Either a b holds either a Left with the reason for the error or a Right with the result ("right" as in correct). S.map and S.chain work with Right, while Left passes them by unchanged, like Nothing. At the exit S.either takes two functions, one for Left and one for Right.'},{type:"text",ru:"S.encase превращает функцию, которая бросает исключение, в функцию, которая возвращает Either: Right с результатом или Left с пойманной ошибкой. S.maybeToEither даёт отсутствию причину: Nothing становится Left с переданным значением, Just — Right. S.mapLeft меняет причину ошибки и не трогает Right.",en:"S.encase turns a function that throws into a function that returns an Either: a Right with the result or a Left with the caught error. S.maybeToEither gives a reason to absence: Nothing becomes a Left holding the value passed in, and Just becomes a Right. S.mapLeft changes the reason for the error and leaves Right alone."},{type:"code",code:{ru:`// Either a b: Left (причина ошибки) или Right (результат)
// Разбор ввода: строка -> JSON -> поле age -> проверка диапазона

// isNumber :: * -> Boolean
const isNumber = (x) => typeof x === 'number'

// encase :: (a -> b) -> a -> Either e b — e: то, что бросила функция
// mapLeft :: (e -> c) -> Either e b -> Either c b
// текст ошибки JSON.parse в разных браузерах разный, поэтому берём только имя
// parseJson :: String -> Either String *
const parseJson = (text) =>
  S.mapLeft((error) => \`не JSON: \${error.name}\`)(S.encase(JSON.parse)(text))

// maybeToEither :: a -> Maybe b -> Either a b
// getAge :: * -> Either String Number
const getAge = (data) => S.maybeToEither('нет числового поля age')(S.get(isNumber)('age')(data))

// checkRange :: Number -> Either String Number
const checkRange = (age) =>
  age >= 0 && age <= 150 ? S.Right(age) : S.Left(\`возраст вне диапазона: \${age}\`)

// readAge :: String -> Either String Number
const readAge = S.pipe([
  parseJson,
  S.chain(getAge), // каждый шаг возвращает Either — chain
  S.chain(checkRange),
])

console.log(readAge('{"age": 30}')) // Right (30)
console.log(readAge('{"age": 200}')) // Left ("возраст вне диапазона: 200")

// either :: (a -> c) -> (b -> c) -> Either a b -> c
// report :: Either String Number -> String
const report = S.either((reason) => \`Неверный ввод — \${reason}\`)((age) => \`Возраст: \${age}\`)

const inputs = ['{"age": 30}', '{ age: 30 }', '{"name": "Ann"}', '{"age": 200}', 'null']
inputs.forEach((input) => console.log(report(readAge(input))))
// Возраст: 30
// Неверный ввод — не JSON: SyntaxError
// Неверный ввод — нет числового поля age
// Неверный ввод — возраст вне диапазона: 200
// Неверный ввод — нет числового поля age`,en:`// Either a b: Left (the reason for the error) or Right (the result)
// Parsing input: string -> JSON -> the age field -> range check

// isNumber :: * -> Boolean
const isNumber = (x) => typeof x === 'number'

// encase :: (a -> b) -> a -> Either e b, where e is what the function threw
// mapLeft :: (e -> c) -> Either e b -> Either c b
// the text of a JSON.parse error differs between browsers, so we take only the name
// parseJson :: String -> Either String *
const parseJson = (text) =>
  S.mapLeft((error) => \`not JSON: \${error.name}\`)(S.encase(JSON.parse)(text))

// maybeToEither :: a -> Maybe b -> Either a b
// getAge :: * -> Either String Number
const getAge = (data) => S.maybeToEither('no numeric age field')(S.get(isNumber)('age')(data))

// checkRange :: Number -> Either String Number
const checkRange = (age) =>
  age >= 0 && age <= 150 ? S.Right(age) : S.Left(\`age out of range: \${age}\`)

// readAge :: String -> Either String Number
const readAge = S.pipe([
  parseJson,
  S.chain(getAge), // every step returns an Either: chain
  S.chain(checkRange),
])

console.log(readAge('{"age": 30}')) // Right (30)
console.log(readAge('{"age": 200}')) // Left ("age out of range: 200")

// either :: (a -> c) -> (b -> c) -> Either a b -> c
// report :: Either String Number -> String
const report = S.either((reason) => \`Invalid input — \${reason}\`)((age) => \`Age: \${age}\`)

const inputs = ['{"age": 30}', '{ age: 30 }', '{"name": "Ann"}', '{"age": 200}', 'null']
inputs.forEach((input) => console.log(report(readAge(input))))
// Age: 30
// Invalid input — not JSON: SyntaxError
// Invalid input — no numeric age field
// Invalid input — age out of range: 200
// Invalid input — no numeric age field`}},{type:"text",ru:"Когда что выбирать. Maybe — когда отсутствие значения нормально и причина очевидна: поиск, первый элемент, необязательное поле. Either — когда вызывающему коду нужно знать, что пошло не так: разбор и проверка ввода, бизнес-правила, сообщения пользователю. В обоих случаях отсутствие и ошибка становятся обычными значениями: их видно в сигнатуре, их можно передать дальше и показать, а не ловить через try/catch где-то выше по стеку.",en:"When to choose which. Maybe is for when a missing value is normal and the reason is obvious: a search, the first element, an optional field. Either is for when the calling code needs to know what went wrong: parsing and validating input, business rules, messages to the user. In both cases absence and errors become ordinary values: they are visible in the signature, they can be passed on and shown, instead of being caught with try/catch somewhere up the stack."}],summary:[{ru:"Maybe a — Just (значение) или Nothing. Отсутствие значения становится частью типа вместо null и undefined, а значение достают один раз на выходе через S.fromMaybe или S.maybe.",en:"Maybe a is Just (value) or Nothing. A missing value becomes part of the type instead of null and undefined, and the value is taken out once at the exit with S.fromMaybe or S.maybe."},{ru:"Функция возвращает обычное значение — S.map, возвращает Maybe или Either — S.chain: он применяет функцию и снимает лишний слой.",en:"If the function returns an ordinary value, use S.map; if it returns a Maybe or an Either, use S.chain: it applies the function and removes the extra layer."},{ru:"S.get(предикат)(имя)(объект) читает свойство безопасно и проверяет тип значения, а S.prop бросает TypeError, если свойства нет.",en:"S.get(predicate)(name)(object) reads a property safely and checks the type of the value, while S.prop throws a TypeError if the property is missing."},{ru:"Either a b — Left (причина ошибки) или Right (результат). S.encase превращает исключение в Left, S.maybeToEither даёт причину отсутствию, S.either обрабатывает оба случая на выходе.",en:"Either a b is Left (the reason for the error) or Right (the result). S.encase turns an exception into a Left, S.maybeToEither gives a reason to absence, and S.either handles both cases at the exit."},{ru:"Maybe — когда причина отсутствия очевидна, Either — когда вызывающему коду нужно знать, что пошло не так.",en:"Maybe is for when the reason for absence is obvious, Either for when the calling code needs to know what went wrong."}],exercises:[{task:{ru:"Напишите firstTag: она возвращает первый тег первой статьи автора с решёткой впереди, а если статей или тегов нет — строку «без тегов». Поле posts может отсутствовать, массивы posts и tags могут быть пустыми. Соберите конвейер из S.get, S.head, S.chain, S.map и S.fromMaybe и решите для каждого шага, нужен ли ему map или chain.",en:`Write firstTag: it returns the first tag of the author's first post with a hash in front, or the string "no tags" if there are no posts or no tags. The posts field may be missing, and the posts and tags arrays may be empty. Build a pipeline from S.get, S.head, S.chain, S.map and S.fromMaybe, and decide for each step whether it needs map or chain.`},starter:{ru:`const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
// ваш код

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`,en:`const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
// your code

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`},solution:{ru:`const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
const firstTag = S.pipe([
  S.get(isArray)('posts'), // Maybe [Object]
  S.chain(S.head), // S.head возвращает Maybe — chain
  S.chain(S.get(isArray)('tags')), // S.get тоже возвращает Maybe — chain
  S.chain(S.head), // Maybe String
  S.map((tag) => \`#\${tag}\`), // обычная функция — map
  S.fromMaybe('без тегов'),
])

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`,en:`const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
const firstTag = S.pipe([
  S.get(isArray)('posts'), // Maybe [Object]
  S.chain(S.head), // S.head returns a Maybe: chain
  S.chain(S.get(isArray)('tags')), // S.get returns a Maybe too: chain
  S.chain(S.head), // Maybe String
  S.map((tag) => \`#\${tag}\`), // an ordinary function: map
  S.fromMaybe('no tags'),
])

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`},expected:{ru:`Ann: #fp
Bob: без тегов
Eve: без тегов
Max: без тегов`,en:`Ann: #fp
Bob: no tags
Eve: no tags
Max: no tags`}},{task:{ru:"Порт в форме настроек приходит строкой. Напишите parsePort :: String -> Either String Number: если строка не целое число, верните Left с причиной «не целое число», если число вне диапазона 1–65535 — Left с причиной «вне диапазона 1–65535», иначе Right (порт). S.parseInt(10)(text) возвращает Just (целое число) или Nothing. Используйте S.maybeToEither и S.chain, а строку для каждого ввода соберите в describe через S.either.",en:'A port in a settings form arrives as a string. Write parsePort :: String -> Either String Number: if the string is not an integer, return a Left with the reason "not an integer"; if the number is outside the range 1–65535, a Left with the reason "outside 1–65535"; otherwise a Right (port). S.parseInt(10)(text) returns Just (an integer) or Nothing. Use S.maybeToEither and S.chain, and build the line for each input in describe with S.either.'},starter:{ru:`// parsePort :: String -> Either String Number
// ваш код

// describe :: Either String Number -> String
// ваш код

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`,en:`// parsePort :: String -> Either String Number
// your code

// describe :: Either String Number -> String
// your code

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`},solution:{ru:`// checkRange :: Number -> Either String Number
const checkRange = (port) =>
  port >= 1 && port <= 65535 ? S.Right(port) : S.Left('вне диапазона 1–65535')

// parsePort :: String -> Either String Number
const parsePort = S.pipe([
  S.parseInt(10), // Maybe Number
  S.maybeToEither('не целое число'), // Nothing становится Left с причиной
  S.chain(checkRange), // checkRange возвращает Either — chain
])

// describe :: Either String Number -> String
const describe = S.either((reason) => \`ошибка — \${reason}\`)((port) => \`порт \${port}\`)

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`,en:`// checkRange :: Number -> Either String Number
const checkRange = (port) =>
  port >= 1 && port <= 65535 ? S.Right(port) : S.Left('outside 1–65535')

// parsePort :: String -> Either String Number
const parsePort = S.pipe([
  S.parseInt(10), // Maybe Number
  S.maybeToEither('not an integer'), // Nothing becomes a Left with the reason
  S.chain(checkRange), // checkRange returns an Either: chain
])

// describe :: Either String Number -> String
const describe = S.either((reason) => \`invalid — \${reason}\`)((port) => \`port \${port}\`)

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`},expected:{ru:`8080: порт 8080
http: ошибка — не целое число
70000: ошибка — вне диапазона 1–65535
443: порт 443`,en:`8080: port 8080
http: invalid — not an integer
70000: invalid — outside 1–65535
443: port 443`}}]},h={slug:"composition",title:{ru:"Композиция функций",en:"Function composition"},description:{ru:"Композиция в JavaScript: compose вызывает функции справа налево, pipe — слева направо, а pipe для любого их числа пишется циклом, через reduce и рекурсией.",en:"Composing JavaScript functions with compose (right to left) and pipe (left to right), and writing pipe for any number of functions: loop, reduce, recursion."},goal:{ru:"Понять, что такое композиция функций, и научиться собирать функции в конвейер с помощью compose и pipe — для трёх функций и для любого их числа.",en:"Understand what function composition is and learn to chain functions with compose and pipe, both for three functions and for any number of them."},blocks:[{type:"text",ru:"Композиция функций — это объединение функций в новую функцию, которая вызывает их последовательно: результат одной функции передаётся следующей.",en:"Function composition combines functions into a new function that calls them in sequence: the result of one function is passed to the next."},{type:"text",ru:"Композиция функций — это одно из фундаментальных понятий, на которых основана теория категорий.",en:"Function composition is one of the fundamental concepts on which category theory is based."},{type:"code",code:{ru:`// === композиция из 3 функций ===
// compose :: ((c -> z), (b -> c), (a -> b)) -> a -> z
const compose = (f3, f2, f1) => (...args) => f3(f2(f1(...args)))

// использование функции
// наша цель
// 1. Получить пользователей со статусом онлайн
// 2. Их имена
// 3. Вывести список имён в лог

// fetchAllUsers :: () -> Promise [Object]
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
        (usersActive) => usersActive.map(user => user.name), // собираем имена
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
      )
    )

// та же самая композиция, только в рамках типа Array
// не совсем классический функциональный подход
fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
      (data) => console.log(
          data
            .filter(user => user.status === 'online')
            .map(user => user.name)
        )
    )

// ===============================`,en:`// === composing 3 functions ===
// compose :: ((c -> z), (b -> c), (a -> b)) -> a -> z
const compose = (f3, f2, f1) => (...args) => f3(f2(f1(...args)))

// using the function
// our goal
// 1. Get the users whose status is online
// 2. Take their names
// 3. Log the list of names

// fetchAllUsers :: () -> Promise [Object]
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

fetchAllUsers() // simulate a request
  .then( // wait for the response
    compose( // pass the result into the composed function
        console.log, // log the results
        (usersActive) => usersActive.map(user => user.name), // collect the names
        (data) => data.filter(user => user.status === 'online'), // filter by status
      )
    )

// the same composition, but within the Array type
// not quite the classic functional approach
fetchAllUsers() // simulate a request
  .then( // wait for the response
      (data) => console.log(
          data
            .filter(user => user.status === 'online')
            .map(user => user.name)
        )
    )

// ===============================`}},{type:"text",ru:"Если вы заметили в примере выше, порядок выполнения функций был справа налево — с точки зрения математики это нормально. Но часто читателю удобнее читать код слева направо.",en:"If you noticed in the example above, the functions executed from right to left — mathematically that's fine. But it is often more convenient for the reader to read code from left to right."},{type:"text",ru:"Поэтому код выше мы можем переписать.",en:"So we can rewrite the code above."},{type:"code",noRun:"previous-block",code:{ru:`// === композиция из 3 функций в человекочитаемом формате ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), (c -> z)) -> a -> z
const pipe = (f1, f2, f3) => (...args) => f3(f2(f1(...args)))

// Теперь композицию удобнее читать слева направо

fetchAllUsers() // имитируем запрос
  .then( // дожидаемся ответа
    pipe( // результат бросаем в композицию функций
        (data) => data.filter(user => user.status === 'online'), // фильтруем по статусу
        (usersActive) => usersActive.map(user => user.name), // собираем имена
        console.log, // логируем результаты
      )
    )

// Внимание

// compose порядок выполнения функций
// 3 <- 2 <- 1

// pipe
// 1 -> 2 -> 3

// ===============================`,en:`// === composing 3 functions in a human-readable order ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), (c -> z)) -> a -> z
const pipe = (f1, f2, f3) => (...args) => f3(f2(f1(...args)))

// Now the composition is easier to read, left to right

fetchAllUsers() // simulate a request
  .then( // wait for the response
    pipe( // pass the result into the composed function
        (data) => data.filter(user => user.status === 'online'), // filter by status
        (usersActive) => usersActive.map(user => user.name), // collect the names
        console.log, // log the results
      )
    )

// Note

// compose: order in which the functions run
// 3 <- 2 <- 1

// pipe
// 1 -> 2 -> 3

// ===============================`}},{type:"text",ru:"А теперь представим ситуацию, когда количество функций более 3.",en:"Now imagine a situation where the number of functions is more than 3."},{type:"text",ru:"В реальных проектах используйте compose или pipe из готовых библиотек. Мы попробуем создать pipe несколькими способами: императивно, декларативно и рекурсивно.",en:"In real projects, use compose or pipe from existing libraries. We will try to build pipe in several ways: imperatively, declaratively and recursively."},{type:"code",code:{ru:`// === композиция функций в нестрого заданном количестве функций ===

// === Способ императивный ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (...args) => {

  // дробим массив функций на голову и хвост
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

// ===============================`,en:`// === composing an arbitrary number of functions ===

// === Imperative approach ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (...args) => {

  // split the array of functions into head and tail
  const [ head, ...tail ] = fns

  // variable holding the result of the first function
  // and then of each of the remaining ones
  let result = head(...args)

  // call the remaining functions in a loop and overwrite
  // the variable with each result
  for (const fn of tail) {
    result = fn(result)
  }

  // return the final result
  return result
}

// ===============================`}},{type:"text",ru:"А теперь давайте реализуем в функциональном стиле, декларативно.",en:"Now let's implement it in a functional style, declaratively."},{type:"code",code:{ru:`// === композиция функций в нестрого заданном количестве функций ===

// === Способ декларативный ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce(
    (init, fn) => fn(init), // накопленное значение (на первом шаге — arg) передаём в функцию
    arg // аргумент первого вызова
  )

// на первый взгляд с этой функцией всё в порядке
// и с точки зрения функционального подхода аргумент лучше и правильнее когда один
// но может быть ситуация когда при первом запуске аргументов 2 и более
const pipeMultiArgs = (...fns) => (...args) => fns.reduce(
    (init, fn, i) => i === 0 ? fn(...init) : fn(init) , // проверка первый вызов или остальные
    args // аргументы первого вызова
)

// ===============================`,en:`// === composing an arbitrary number of functions ===

// === Declarative approach ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce(
    (init, fn) => fn(init), // pass the accumulated value (arg on the first step) to the function
    arg // argument of the first call
  )

// at first glance this function is fine,
// and from a functional point of view a single argument is better and more correct,
// but the first call may need 2 or more arguments
const pipeMultiArgs = (...fns) => (...args) => fns.reduce(
    (init, fn, i) => i === 0 ? fn(...init) : fn(init) , // first call or a later one?
    args // arguments of the first call
)

// ===============================`}},{type:"text",ru:"Мы также можем реализовать композицию функций рекурсивно. Вызов pipe(...tail)(head(arg)) стоит в хвостовой позиции, но число вызовов от этого не уменьшается. При proper tail calls (ES2015, только в строгом режиме) хвостовой вызов не увеличивает глубину стека, но из браузерных движков это есть только в JavaScriptCore (Safari): в V8 (Chrome, Node.js) это было за флагом и удалено, в SpiderMonkey (Firefox) этого нет. Поэтому для глубокой рекурсии в JS нужен трамплин — о нём в уроке «Рекурсия». Для pipe из нескольких функций глубина стека не проблема.",en:'We can also implement function composition recursively. The call pipe(...tail)(head(arg)) is in tail position, but that does not reduce the number of calls. With proper tail calls (ES2015, strict mode only) a tail call does not grow the stack, but among browser engines only JavaScriptCore (Safari) implements them: V8 (Chrome, Node.js) had them behind a flag and removed them, and SpiderMonkey (Firefox) does not have them. That is why deep recursion in JS needs a trampoline — more on it in the "Recursion" lesson. For a pipe of a few functions, stack depth is not a problem.'},{type:"code",code:{ru:`// === композиция функций в нестрого заданном количестве функций ===

// === Способ рекурсивный ===
// порядок сменился: слева направо
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
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

// ===============================`,en:`// === composing an arbitrary number of functions ===

// === Recursive approach ===
// the order is now left to right
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => {

  // base case: only one function is left
  if (fns.length === 1) {
    return fns[0](arg)
  }

  // split into head and tail:
  // the first function and the rest
  const [head, ...tail] = fns

  // call pipe recursively for the tail,
  // and call the first function with the current argument
  return pipe(...tail)(head(arg))
}

// ===============================`}}],summary:[{ru:"Композиция функций объединяет функции в новую функцию, которая вызывает их последовательно: результат одной функции передаётся следующей.",en:"Function composition combines functions into a new function that calls them in sequence: the result of one function is passed to the next."},{ru:"Композиция функций — одно из фундаментальных понятий, на которых основана теория категорий.",en:"Function composition is one of the fundamental concepts on which category theory is based."},{ru:"compose вызывает функции справа налево — с точки зрения математики это нормально, а pipe вызывает их слева направо: так код читателю часто удобнее.",en:"compose calls the functions right to left, which is fine from a mathematical point of view, while pipe calls them left to right, which is often easier for the reader."},{ru:"pipe для любого числа функций можно написать императивно (циклом), декларативно (через reduce) и рекурсивно, а в реальных проектах используйте compose или pipe из готовых библиотек.",en:"pipe for any number of functions can be written imperatively (with a loop), declaratively (with reduce) or recursively; in real projects, use compose or pipe from existing libraries."}],exercises:[{task:{ru:"В уроке compose написан только для трёх функций, а pipe — для любого их числа. Напишите compose для любого числа функций: он должен вызывать их справа налево. Проверьте, что compose(square, double, inc) и pipe(inc, double, square) дают одинаковый результат, а compose(inc, double, square) — другой. Подсказка: у массивов есть метод reduceRight — тот же reduce, только он проходит массив справа налево.",en:"In the lesson, compose is written for exactly three functions, while pipe handles any number of them. Write compose for any number of functions: it should call them right to left. Check that compose(square, double, inc) and pipe(inc, double, square) give the same result, while compose(inc, double, square) gives a different one. Hint: arrays have a reduceRight method — the same as reduce, except that it walks the array from right to left."},starter:{ru:`// pipe — декларативный способ из урока
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// compose :: ((y -> z), ..., (b -> c), (a -> b)) -> a -> z
const compose = (...fns) => (arg) => {
  // ваш код
}

// inc :: Number -> Number
const inc = (n) => n + 1
// double :: Number -> Number
const double = (n) => n * 2
// square :: Number -> Number
const square = (n) => n * n

console.log(pipe(inc, double, square)(3))
console.log(compose(square, double, inc)(3))
console.log(compose(inc, double, square)(3))`,en:`// pipe: the declarative approach from the lesson
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// compose :: ((y -> z), ..., (b -> c), (a -> b)) -> a -> z
const compose = (...fns) => (arg) => {
  // your code
}

// inc :: Number -> Number
const inc = (n) => n + 1
// double :: Number -> Number
const double = (n) => n * 2
// square :: Number -> Number
const square = (n) => n * n

console.log(pipe(inc, double, square)(3))
console.log(compose(square, double, inc)(3))
console.log(compose(inc, double, square)(3))`},solution:{ru:`// pipe — декларативный способ из урока
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// compose :: ((y -> z), ..., (b -> c), (a -> b)) -> a -> z
// reduceRight начинает с последней функции, поэтому она вызывается первой
const compose = (...fns) => (arg) => fns.reduceRight((init, fn) => fn(init), arg)

// inc :: Number -> Number
const inc = (n) => n + 1
// double :: Number -> Number
const double = (n) => n * 2
// square :: Number -> Number
const square = (n) => n * n

// inc, затем double, затем square: (3 + 1) * 2 = 8, 8 * 8 = 64
console.log(pipe(inc, double, square)(3))
// тот же порядок вызовов, только записан справа налево
console.log(compose(square, double, inc)(3))
// square, затем double, затем inc: 3 * 3 = 9, 9 * 2 = 18, 18 + 1 = 19
console.log(compose(inc, double, square)(3))`,en:`// pipe: the declarative approach from the lesson
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// compose :: ((y -> z), ..., (b -> c), (a -> b)) -> a -> z
// reduceRight starts with the last function, so it is called first
const compose = (...fns) => (arg) => fns.reduceRight((init, fn) => fn(init), arg)

// inc :: Number -> Number
const inc = (n) => n + 1
// double :: Number -> Number
const double = (n) => n * 2
// square :: Number -> Number
const square = (n) => n * n

// inc, then double, then square: (3 + 1) * 2 = 8, 8 * 8 = 64
console.log(pipe(inc, double, square)(3))
// the same order of calls, just written right to left
console.log(compose(square, double, inc)(3))
// square, then double, then inc: 3 * 3 = 9, 9 * 2 = 18, 18 + 1 = 19
console.log(compose(inc, double, square)(3))`},expected:{ru:`64
64
19`,en:`64
64
19`}},{task:{ru:"Соберите через pipe функцию slugify, которая превращает название урока в якорь для адреса, как у уроков этого курса: «Pure Functions» → pure-functions. Она убирает пробелы по краям, переводит строку в нижний регистр, разбивает на слова и соединяет их дефисом. Каждый шаг — отдельная функция одного аргумента. Подпишите шаги нотацией Хиндли–Милнера и проследите, что тип результата каждого шага совпадает с типом аргумента следующего.",en:'Use pipe to build a slugify function that turns a lesson title into a URL anchor like the ones this course uses: "Pure Functions" → pure-functions. It trims the spaces at both ends, converts the string to lower case, splits it into words and joins them with hyphens. Make each step a separate function of one argument. Annotate the steps with Hindley–Milner notation and check that the result type of each step matches the argument type of the next one.'},starter:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// slugify :: String -> String
const slugify = pipe(
  // ваш код
)

console.log(slugify('Pure Functions'))
console.log(slugify('  Partial Application  '))
console.log(slugify('Imperative vs Declarative'))`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// slugify :: String -> String
const slugify = pipe(
  // your code
)

console.log(slugify('Pure Functions'))
console.log(slugify('  Partial Application  '))
console.log(slugify('Imperative vs Declarative'))`},solution:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// trim :: String -> String
const trim = (str) => str.trim()
// toLower :: String -> String
const toLower = (str) => str.toLowerCase()
// words :: String -> [String]
const words = (str) => str.split(' ')
// joinWithDash :: [String] -> String
const joinWithDash = (list) => list.join('-')

// результат каждого шага — аргумент следующего:
// trim и toLower отдают String, words принимает String и отдаёт [String],
// joinWithDash принимает [String] и отдаёт String
// slugify :: String -> String
const slugify = pipe(trim, toLower, words, joinWithDash)

console.log(slugify('Pure Functions'))
console.log(slugify('  Partial Application  '))
console.log(slugify('Imperative vs Declarative'))`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (arg) => fns.reduce((init, fn) => fn(init), arg)

// trim :: String -> String
const trim = (str) => str.trim()
// toLower :: String -> String
const toLower = (str) => str.toLowerCase()
// words :: String -> [String]
const words = (str) => str.split(' ')
// joinWithDash :: [String] -> String
const joinWithDash = (list) => list.join('-')

// the result of each step is the argument of the next one:
// trim and toLower return a String, words takes a String and returns [String],
// joinWithDash takes [String] and returns a String
// slugify :: String -> String
const slugify = pipe(trim, toLower, words, joinWithDash)

console.log(slugify('Pure Functions'))
console.log(slugify('  Partial Application  '))
console.log(slugify('Imperative vs Declarative'))`},expected:{ru:`pure-functions
partial-application
imperative-vs-declarative`,en:`pure-functions
partial-application
imperative-vs-declarative`}}]},m={slug:"currying",title:{ru:"Каррирование",en:"Currying"},description:{ru:"Каррированная функция в JavaScript ждёт все аргументы: как каррировать вручную и через curry, встраивать в композицию и получать специализированные функции.",en:"How a curried JavaScript function waits for all of its arguments, how to curry by hand and with curry, use it in composition and build specialized functions."},goal:{ru:"Понять, как каррированная функция откладывает вычисление до получения всех аргументов, и научиться каррировать функции вручную и через curry, чтобы встраивать их в композицию и создавать специализированные функции.",en:"Understand how a curried function postpones evaluation until it has all of its arguments, and learn to curry functions by hand and with curry to use them in composition and build specialized functions."},blocks:[{type:"text",ru:"Каррирование — это один из приёмов, используемых в функциональном программировании, при котором вычисление функции происходит только при полном получении всех аргументов, а при частичном получении аргументов функция возвращает новую функцию.",en:"Currying is one of the techniques used in functional programming, in which the function is evaluated only once all of its arguments have been supplied, while given only some of the arguments the function returns a new function."},{type:"text",ru:"Каррирование может быть использовано:",en:"Currying can be used:"},{type:"list",ordered:!0,items:[{ru:"В композиции функций, когда функция в последовательности вызовов ожидает два и более аргумента.",en:"In function composition, when a function in a chain of calls expects two or more arguments."},{ru:"Когда мы хотим создавать специализированные функции на основе базовой функции, меняя значение аргумента в замыкании.",en:"When we want to create specialized functions based on a base function by changing the value of an argument captured in a closure."}]},{type:"code",code:{ru:`//  Пример
// Каррирование
// sum :: Number -> Number -> Number -> Number
const sum  = (a) => (b) => (c) => a + b + c

// функция вычисляется только когда получает все аргументы
// иначе возвращает новую функцию
const result = sum (1) (2) (1)

console.log(result) // 4

// Неполные вызовы каррированной функции

// add :: Number -> Number -> Number
const add = (a) => (b) => a + b

// в замыкании хранится 10 и ждёт второго аргумента
// возвращается функция
const add10 = add(10)
// после получения второго аргумента
// происходит полное вычисление функции
const resultAdded = add10(5) // 15`,en:`//  Example
// Currying
// sum :: Number -> Number -> Number -> Number
const sum  = (a) => (b) => (c) => a + b + c

// the function is evaluated only once it has all its arguments,
// otherwise it returns a new function
const result = sum (1) (2) (1)

console.log(result) // 4

// Partial calls of a curried function

// add :: Number -> Number -> Number
const add = (a) => (b) => a + b

// 10 is kept in the closure, waiting for the second argument;
// a function is returned
const add10 = add(10)
// once the second argument arrives,
// the function is fully evaluated
const resultAdded = add10(5) // 15`}},{type:"text",ru:"Как же нам каррировать любую функцию с n количеством параметров, значение которых мы не знаем. Например, 5 параметров и более у функции.",en:"So how do we curry an arbitrary function with n parameters whose values we don't know — for example, a function with 5 or more parameters?"},{type:"text",ru:"Можно автоматически каррировать любую функцию с фиксированным числом параметров и передавать ей аргументы любыми группами: по одному или по несколько за вызов. Меняется только группировка, порядок аргументов остаётся прежним.",en:"We can automatically curry any function with a fixed number of parameters and pass it the arguments in any grouping: one at a time or several per call. Only the grouping changes; the order of the arguments stays the same."},{type:"code",code:{ru:`// Например мы хотим каррировать функцию sum
// sum :: (Number, Number, Number) -> Number
const sum  = (a, b, c) => a + b + c

// функция которая каррирует любую функцию
// curry :: (* -> a) -> (* -> a)
const curry = (fn) => {
  // количество параметров функции
  const lengthFn = fn.length

  // внутренняя функция, которая будет вызываться рекурсивно
  const curried = (...argsFirst) => {
    // если количество входящих аргументов больше или равно
    // количеству параметров функции, то мы немедленно вызываем её
    if (argsFirst.length >= lengthFn) {
      return fn(...argsFirst)
    }

    // если входящих аргументов меньше, чем количество
    // аргументов у функции то возвращаем новую функцию
    // и собираем остальные аргументы
    return (...argsSecond) => curried(...argsFirst, ...argsSecond)
  }

  return curried
}

// каррируем нашу функцию sum
const sumCurry = curry(sum)

// теперь аргументы можно передавать любыми группами
console.log( sumCurry (1) (1) (1) ) // 3
console.log( sumCurry (1, 1) (1) ) // 3
console.log( sumCurry (1) (1, 1) ) // 3
console.log( sumCurry (1, 1, 1) ) // 3`,en:`// Say we want to curry the sum function
// sum :: (Number, Number, Number) -> Number
const sum  = (a, b, c) => a + b + c

// a function that curries any function
// curry :: (* -> a) -> (* -> a)
const curry = (fn) => {
  // number of parameters of the function
  const lengthFn = fn.length

  // inner function that will be called recursively
  const curried = (...argsFirst) => {
    // if the number of incoming arguments is greater than or equal to
    // the number of the function's parameters, call it right away
    if (argsFirst.length >= lengthFn) {
      return fn(...argsFirst)
    }

    // if there are fewer incoming arguments than the function
    // has parameters, return a new function
    // that collects the remaining arguments
    return (...argsSecond) => curried(...argsFirst, ...argsSecond)
  }

  return curried
}

// curry our sum function
const sumCurry = curry(sum)

// now the arguments can be passed in any grouping
console.log( sumCurry (1) (1) (1) ) // 3
console.log( sumCurry (1, 1) (1) ) // 3
console.log( sumCurry (1) (1, 1) ) // 3
console.log( sumCurry (1, 1, 1) ) // 3`}},{type:"text",ru:"А теперь давайте глянем всю мощь каррирования на примерах композиции функций.",en:"Now let's look at the full power of currying through examples of function composition."},{type:"code",code:{ru:`// Например в следующей композиции будут
// =====================================
// использоваться две каррированные функции:
// одна каррирована заранее,
// а другую каррируем автоматически перед вызовом

// pipe и curry берём из Ramda: в песочнице курса она доступна как R
const { pipe, curry } = R

// данные с которыми будем работать
// список пользователей
// fetchAllUsers :: () -> Promise [Object]
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// Наша задача
// 1. Получить пользователей со статусом онлайн
// 2. Возрастом старше 30 лет
// 3. их имена

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = (fn) => (arr) => arr.filter(fn)

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)

// функция предикат, которая будет проверять статус
// isStatus :: String -> String -> a -> Boolean
const isStatus = (status) => (prop) => (user) => user[prop] === status

// isMoreAge :: (Number, String, a) -> Boolean
const isMoreAge = (age, prop, user) => user[prop] > age

// давайте используя функцию выше мы автокаррируем её
const isMoreAgeCurry = curry(isMoreAge)

// вызовем дважды и создадим абстракцию с понятным названием
// предикат функция которая будет проверять на возраст
const isMoreAge30 = isMoreAgeCurry (30) ('age')

// получение значений по ключу
// getByProp :: String -> a -> String
const getByProp = (prop) => (user) => user[prop]

//  в замыкании сохраняем ключ 'name' и ожидаем объект
// getName :: a -> String
const getName = getByProp('name')

// готовим композицию и при след вызове в качестве аргумента
// ждем массив пользователей
const pipeline = pipe (
  filter ( isStatus ('online') ('status') ), // только онлайн пользователей получаем
  filter ( isMoreAge30 ), // возрастом старше 30 лет
  map ( getName ), // вернуть имена
)

const showAdultsUsers = async () => {

  // запуск промиса с данными
  // данные бросаем в композицию и запускаем её
  const adultsUsers = await fetchAllUsers()
                                          .then(pipeline)

  console.log(adultsUsers) // ['Angel']
}

showAdultsUsers()


// =============================

// код выше хорошо читается,
// но если пользователей несколько десятков тысяч
// и нам нужна оптимизация мы можем сделать так
// чтобы исключить двойной обход массива в рамках filter
const pipelineOnePass = pipe (
  filter (
    (user) => (
      isStatus ('online') ('status') (user) && isMoreAge30 (user)
    )
  ), // разовый проход с проверкой по двум предикатам сразу
  map ( getName ), // вернуть имена
)`,en:`// For example, the following composition will
// =====================================
// use two curried functions:
// one is curried in advance,
// and the other we curry automatically before calling it

// pipe and curry come from Ramda: the course playground exposes it as R
const { pipe, curry } = R

// the data we will work with:
// a list of users
// fetchAllUsers :: () -> Promise [Object]
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// Our task
// 1. Get the users whose status is online
// 2. Who are older than 30
// 3. Take their names

// filter :: (a -> Boolean) -> [a] -> [a]
const filter = (fn) => (arr) => arr.filter(fn)

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)

// a predicate function that checks the status
// isStatus :: String -> String -> a -> Boolean
const isStatus = (status) => (prop) => (user) => user[prop] === status

// isMoreAge :: (Number, String, a) -> Boolean
const isMoreAge = (age, prop, user) => user[prop] > age

// let's auto-curry the function above
const isMoreAgeCurry = curry(isMoreAge)

// call it twice and create an abstraction with a clear name:
// a predicate function that checks the age
const isMoreAge30 = isMoreAgeCurry (30) ('age')

// get a value by key
// getByProp :: String -> a -> String
const getByProp = (prop) => (user) => user[prop]

//  keep the key 'name' in the closure and wait for an object
// getName :: a -> String
const getName = getByProp('name')

// prepare the composition; on the next call
// it expects an array of users as the argument
const pipeline = pipe (
  filter ( isStatus ('online') ('status') ), // keep only online users
  filter ( isMoreAge30 ), // older than 30
  map ( getName ), // return the names
)

const showAdultsUsers = async () => {

  // run the promise with the data,
  // pass the data into the composition and run it
  const adultsUsers = await fetchAllUsers()
                                          .then(pipeline)

  console.log(adultsUsers) // ['Angel']
}

showAdultsUsers()


// =============================

// the code above reads nicely,
// but if there are tens of thousands of users
// and we need to optimize, we can avoid
// traversing the array twice with filter
const pipelineOnePass = pipe (
  filter (
    (user) => (
      isStatus ('online') ('status') (user) && isMoreAge30 (user)
    )
  ), // a single pass checking both predicates at once
  map ( getName ), // return the names
)`}},{type:"text",ru:"Мы также можем создавать специализированные функции при помощи каррирования. Это нечто подобное «наследованию» в ООП.",en:'We can also create specialized functions with the help of currying. It is somewhat similar to "inheritance" in OOP.'},{type:"text",ru:"Берётся базовая каррированная функция, а дальше при помощи вызовов создаются другие функции. Хватит теории — давайте сразу к примерам.",en:"We take a base curried function, and then we build other functions through calls. Enough theory — let's get straight to the examples."},{type:"code",code:{ru:`// Давайте возьмем каррированную функцию
// и начнем создавать другие специализированные функции

// Базовая функция сравнения значения по определенному ключу
// equalBy :: String -> * -> a -> Boolean
const equalBy = (prop) => (value) => (obj) => obj[prop] === value

// данные с которыми мы будем работать
const user = { name: 'John', status: 'online', married: true }

// мы бы могли вызвать функцию разом
const onlineStatusUser = equalBy ('status') ('online') (user)

// проверяем онлайн ли статус у пользователя
console.log(onlineStatusUser) // true

// теперь давайте начнем создавать
// специализированные функции из equalBy

// сравнение по ключу статусу
const equalByStatus = equalBy ('status')
// сравнение по ключу женат
const equalByMarried = equalBy ('married')

// создадим еще один слой абстракции
// проверка онлайн
const isOnline = equalByStatus ('online')
// проверка офлайн
const isOffline = equalByStatus ('offline')

// проверка женат ли
const isMarried = equalByMarried (true)
// проверка не женат
const isNotMarried = equalByMarried (false)

// мы можем написать хелпер отрицания
// для последних функций
// not :: (a -> Boolean) -> a -> Boolean
const not = (fn) => (...args) => !fn(...args)

// человекочитаемое выражение «не онлайн»
const offlineUserCheck = not (isOnline)
const notMarriedCheck = not (isMarried)

// а теперь давайте запустим наши спец функции
// и проверим онлайн ли пользователь и женат ли он

// получим статус юзера
const isOnlineUser = isOnline (user)
//  получим его статус женат ли
const isMarriedUser = isMarried (user)

// теперь давайте допускать в наше приложение
// пользователей женатых и которые онлайн

// напишем хелпер
// and :: Boolean -> Boolean -> Boolean
const and = (valueFirst) => (valueSecond) => valueFirst && valueSecond

// обратите внимание код стал человекочитаемым
// и очень абстрактным
// каждая функция делает одну логическую операцию
// код говорит что делает а не как
if (and (isOnlineUser) (isMarriedUser) ) {
  // что-то там делаем ...
}`,en:`// Let's take a curried function
// and start building other specialized functions from it

// Base function that compares the value under a given key
// equalBy :: String -> * -> a -> Boolean
const equalBy = (prop) => (value) => (obj) => obj[prop] === value

// the data we will work with
const user = { name: 'John', status: 'online', married: true }

// we could call the function all at once
const onlineStatusUser = equalBy ('status') ('online') (user)

// check whether the user's status is online
console.log(onlineStatusUser) // true

// now let's start building
// specialized functions from equalBy

// compare by the status key
const equalByStatus = equalBy ('status')
// compare by the married key
const equalByMarried = equalBy ('married')

// add one more layer of abstraction
// is online
const isOnline = equalByStatus ('online')
// is offline
const isOffline = equalByStatus ('offline')

// is married
const isMarried = equalByMarried (true)
// is not married
const isNotMarried = equalByMarried (false)

// we can write a negation helper
// for the last functions
// not :: (a -> Boolean) -> a -> Boolean
const not = (fn) => (...args) => !fn(...args)

// a human-readable "not online" expression
const offlineUserCheck = not (isOnline)
const notMarriedCheck = not (isMarried)

// now let's run our specialized functions
// and check whether the user is online and married

// get the user's status
const isOnlineUser = isOnline (user)
//  check whether the user is married
const isMarriedUser = isMarried (user)

// now let's only let users who are married and online
// into our app

// write a helper
// and :: Boolean -> Boolean -> Boolean
const and = (valueFirst) => (valueSecond) => valueFirst && valueSecond

// note that the code has become human-readable
// and highly abstract:
// each function does one logical operation,
// the code says what it does, not how
if (and (isOnlineUser) (isMarriedUser) ) {
  // do something here ...
}`}}],summary:[{ru:"Каррированная функция вычисляется только при получении всех аргументов, а при частичном получении аргументов возвращает новую функцию.",en:"A curried function is evaluated only once it has all of its arguments; given only some of them, it returns a new function."},{ru:"Каррирование используют в композиции функций, когда функция в последовательности вызовов ожидает два и более аргумента, и чтобы создавать специализированные функции на основе базовой.",en:"Currying is used in function composition, when a function in a chain of calls expects two or more arguments, and to create specialized functions based on a base function."},{ru:"Любую функцию с фиксированным числом параметров можно каррировать автоматически и передавать ей аргументы любыми группами: меняется только группировка, порядок аргументов остаётся прежним.",en:"Any function with a fixed number of parameters can be curried automatically and given its arguments in any grouping: only the grouping changes, the order of the arguments stays the same."},{ru:"Из базовой каррированной функции вызовами получают специализированные: из equalBy — equalByStatus, из него — isOnline. Это похоже на «наследование» в ООП.",en:'Specialized functions are built from a base curried function through calls: equalByStatus from equalBy, then isOnline from equalByStatus. This is somewhat similar to "inheritance" in OOP.'}],exercises:[{task:{ru:"Напишите вручную каррированную функцию formatLog :: String -> String -> String -> String: она принимает уровень, модуль и сообщение и возвращает строку вида [ERROR] auth: wrong password. Создайте из неё специализированные функции: logError и logInfo с зафиксированным уровнем, а из них — authError и cartInfo с зафиксированным модулем. Выведите через них сообщения из заготовки.",en:"Write a curried function formatLog :: String -> String -> String -> String by hand: it takes a level, a module name and a message and returns a string like [ERROR] auth: wrong password. Build specialized functions from it: logError and logInfo with the level fixed, and from those, authError and cartInfo with the module fixed. Use them to print the messages from the starter."},starter:{ru:`// formatLog :: String -> String -> String -> String
// ваш код

console.log(authError('wrong password'))
console.log(authError('token expired'))
console.log(cartInfo('item added'))`,en:`// formatLog :: String -> String -> String -> String
// your code

console.log(authError('wrong password'))
console.log(authError('token expired'))
console.log(cartInfo('item added'))`},solution:{ru:`// formatLog :: String -> String -> String -> String
const formatLog = (level) => (moduleName) => (message) => \`[\${level}] \${moduleName}: \${message}\`

// уровень сохранён в замыкании, функция ждёт модуль
const logError = formatLog('ERROR')
const logInfo = formatLog('INFO')

// уровень и модуль сохранены, функция ждёт только сообщение
const authError = logError('auth')
const cartInfo = logInfo('cart')

console.log(authError('wrong password'))
console.log(authError('token expired'))
console.log(cartInfo('item added'))`,en:`// formatLog :: String -> String -> String -> String
const formatLog = (level) => (moduleName) => (message) => \`[\${level}] \${moduleName}: \${message}\`

// the level is kept in the closure, the function waits for the module
const logError = formatLog('ERROR')
const logInfo = formatLog('INFO')

// the level and the module are kept, the function waits only for the message
const authError = logError('auth')
const cartInfo = logInfo('cart')

console.log(authError('wrong password'))
console.log(authError('token expired'))
console.log(cartInfo('item added'))`},expected:{ru:`[ERROR] auth: wrong password
[ERROR] auth: token expired
[INFO] cart: item added`,en:`[ERROR] auth: wrong password
[ERROR] auth: token expired
[INFO] cart: item added`}},{task:{ru:"Функция applyDiscount(percent, price) ожидает два аргумента, а map передаёт функции цены по одной. Каррируйте её через curry из Ramda, зафиксируйте скидку 10% и соберите через pipe функцию totalWithDiscount: она берёт цены позиций заказа, применяет к каждой скидку и складывает результат.",en:"applyDiscount(percent, price) expects two arguments, while map hands the function one price at a time. Curry it with curry from Ramda, fix a 10% discount and use pipe to build totalWithDiscount: it takes the prices of the order items, applies the discount to each of them and adds them up."},starter:{ru:`// pipe и curry берём из Ramda
const { pipe, curry } = R

const order = [
  { title: 'Book', price: 400 },
  { title: 'Pen', price: 50 },
  { title: 'Lamp', price: 1200 },
]

// applyDiscount :: (Number, Number) -> Number
const applyDiscount = (percent, price) => price - (price * percent) / 100

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// getByProp :: String -> a -> b
const getByProp = (prop) => (obj) => obj[prop]
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// ваш код

console.log(totalWithDiscount(order))`,en:`// pipe and curry come from Ramda
const { pipe, curry } = R

const order = [
  { title: 'Book', price: 400 },
  { title: 'Pen', price: 50 },
  { title: 'Lamp', price: 1200 },
]

// applyDiscount :: (Number, Number) -> Number
const applyDiscount = (percent, price) => price - (price * percent) / 100

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// getByProp :: String -> a -> b
const getByProp = (prop) => (obj) => obj[prop]
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// your code

console.log(totalWithDiscount(order))`},solution:{ru:`// pipe и curry берём из Ramda
const { pipe, curry } = R

const order = [
  { title: 'Book', price: 400 },
  { title: 'Pen', price: 50 },
  { title: 'Lamp', price: 1200 },
]

// applyDiscount :: (Number, Number) -> Number
const applyDiscount = (percent, price) => price - (price * percent) / 100

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// getByProp :: String -> a -> b
const getByProp = (prop) => (obj) => obj[prop]
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// скидка 10% сохранена в замыкании, функция ждёт цену
// discount10 :: Number -> Number
const discount10 = curry(applyDiscount)(10)

// totalWithDiscount :: [Object] -> Number
const totalWithDiscount = pipe(
  map(getByProp('price')), // цены позиций
  map(discount10), // скидка на каждую цену
  sum, // итог
)

// 360 + 45 + 1080
console.log(totalWithDiscount(order))`,en:`// pipe and curry come from Ramda
const { pipe, curry } = R

const order = [
  { title: 'Book', price: 400 },
  { title: 'Pen', price: 50 },
  { title: 'Lamp', price: 1200 },
]

// applyDiscount :: (Number, Number) -> Number
const applyDiscount = (percent, price) => price - (price * percent) / 100

// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// getByProp :: String -> a -> b
const getByProp = (prop) => (obj) => obj[prop]
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// the 10% discount is kept in the closure, the function waits for a price
// discount10 :: Number -> Number
const discount10 = curry(applyDiscount)(10)

// totalWithDiscount :: [Object] -> Number
const totalWithDiscount = pipe(
  map(getByProp('price')), // item prices
  map(discount10), // discount on each price
  sum, // total
)

// 360 + 45 + 1080
console.log(totalWithDiscount(order))`},expected:{ru:"1485",en:"1485"}}]},p={slug:"currying-and-asynchrony",title:{ru:"Каррирование и Асинхронность (Эволюция)",en:"Currying and asynchrony (evolution)"},description:{ru:"Каррирование в асинхронном JavaScript: специализированные функции запросов и pipeAsync, который сам дожидается промисов и собирает ошибки в один catch.",en:"Currying in asynchronous JavaScript: specialized request functions and a pipeAsync that waits for promises by itself and sends every error to a single catch."},goal:{ru:"Научиться применять каррирование в асинхронном коде: создавать специализированные функции запросов и собирать асинхронные шаги в конвейер, который сам дожидается промисов.",en:"Learn to apply currying to asynchronous code: build specialized request functions and chain asynchronous steps into a pipeline that waits for promises by itself."},blocks:[{type:"text",ru:"Каррирование можно эффективно использовать в асинхронном программировании.",en:"Currying can be used effectively in asynchronous programming."},{type:"list",ordered:!0,items:[{ru:"Создание специализированных функций",en:"Creating specialized functions"},{ru:'Победим "ад колбеков" без промисов',en:'We will defeat "callback hell" without promises'}]},{type:"code",noRun:"network",code:{ru:`//  Давайте создадим базовую функцию для запросов
// baseFetch :: String -> String -> a -> Promise
const baseFetch = (baseUrl) =>
                    (params) =>
                    (config = {}) =>
                      fetch(\`\${baseUrl}/\${params}\`, config)


const BASE_URL = 'https://example.com'
// для работы с базовым url
const useFetch = baseFetch (BASE_URL)

// создадим две специализированные функции
// получение списка всех пользователей
const getAllUser = useFetch ('all-users')
// получение списка всех книг
const getAllBooks = useFetch ('all-books')

// дальше можем вызывать функции и получать данные
getAllUser ().then(console.log)
getAllBooks ().then(console.log)

// вы можете добавить авторизационные токены
// в отдельном замыкании если это необходимо
// xFetch :: String -> b -> String -> a -> Promise
const xFetch = (baseUrl) =>
          (headers) =>
          (params) =>
          (config = {}) =>
            fetch(\`\${baseUrl}/\${params}\`, {
              ...config,
              // общие заголовки с токеном объединяем с заголовками запроса,
              // чтобы config.headers не заменил их целиком
              headers: { ...headers, ...config.headers },
            })

const token = 'xxx'
// для работы с базовым url и сразу с заголовками
const useXFetch = xFetch (BASE_URL) ({
  'Content-Type': 'application/json',
  'authorization': \`Bearer \${token}\`,
})

// создадим две специализированные функции
// получение списка всех пользователей
const getAllUserX = useXFetch ('all-users')
// получение списка всех книг
const getAllBooksX = useXFetch ('all-books')`,en:`//  Let's create a base function for requests
// baseFetch :: String -> String -> a -> Promise
const baseFetch = (baseUrl) =>
                    (params) =>
                    (config = {}) =>
                      fetch(\`\${baseUrl}/\${params}\`, config)


const BASE_URL = 'https://example.com'
// bound to the base url
const useFetch = baseFetch (BASE_URL)

// create two specialized functions
// get the list of all users
const getAllUser = useFetch ('all-users')
// get the list of all books
const getAllBooks = useFetch ('all-books')

// now we can call the functions and get the data
getAllUser ().then(console.log)
getAllBooks ().then(console.log)

// you can add authorization tokens
// in a separate closure if needed
// xFetch :: String -> b -> String -> a -> Promise
const xFetch = (baseUrl) =>
          (headers) =>
          (params) =>
          (config = {}) =>
            fetch(\`\${baseUrl}/\${params}\`, {
              ...config,
              // merge the shared headers (with the token) with the request headers
              // so that config.headers does not replace them entirely
              headers: { ...headers, ...config.headers },
            })

const token = 'xxx'
// bound to the base url and to the headers at once
const useXFetch = xFetch (BASE_URL) ({
  'Content-Type': 'application/json',
  'authorization': \`Bearer \${token}\`,
})

// create two specialized functions
// get the list of all users
const getAllUserX = useXFetch ('all-users')
// get the list of all books
const getAllBooksX = useXFetch ('all-books')`}},{type:"text",ru:"А теперь внизу мы покажем два примера.",en:"Now below we will show two examples."},{type:"text",ru:"Первый код будет императивный на колбеках, а второй будет использовать каррирование и замыкание без промисов.",en:"The first piece of code will be imperative and callback-based, while the second will use currying and closures without promises."},{type:"code",noRun:"dom",code:{ru:`//  код который "плохо пахнет"

// создадим функцию для запросов на основе XMLHttpRequest
// он на событиях без промисов
// можно, конечно, обернуть в промисы, но сейчас у нас тема — каррирование

const fetchXML = (url, callback) => {
  const req = new XMLHttpRequest()
  req.addEventListener('load', () => {
    const data = JSON.parse(req.responseText)
    callback(data)
  })
  req.open('GET', url)
  req.send()
}


// Чего мы хотим
// 1. При клике на кнопку подробнее
// у определенного пользователя мы получим его слаг из дата атрибута
// 2. По слагу сделаем запрос и получим список отзывов,
// 3. Берем слаг последнего отзыва (первый в списке) и делаем запрос
// 4. Получаем подробную информацию об отзыве, берем оттуда текст
// API: /reviews/<слаг пользователя> отдаёт массив отзывов (свежий — первый),
// /review-info/<слаг отзыва> — отзыв с полем text

// текст, который покажем
var textReview = ''

// используем делегирование на всем контейнере с кнопками
document.getElementById('users-wrapper')
  .addEventListener('click', (e) => {
    // получаем элемент
    const el = e.target

    // если клик не по кнопке пользователя, игнорируем его
    if(!el.classList.contains('user-btn')) {
      return
    }

    // получаем слаг пользователя с его кнопки
    const slugUser = el.dataset.slug // 'xksdfjdkhfd' это слаг

    // проверка на слаг
    if(!slugUser) {
      return
    }

    // получаем список отзывов по слагу пользователя
    fetchXML('https://example.com/reviews/' + slugUser, (reviews) => {
      // получаем слаг последнего отзыва
      const slugFirstReview = reviews[0].slug

      // делаем запрос и получаем подробную информацию по отзыву
      fetchXML('https://example.com/review-info/' + slugFirstReview, (review) => {
        textReview = review.text
      })
    })
  })`,en:`//  code that "smells bad"

// create a request function based on XMLHttpRequest:
// it works with events, without promises
// (we could wrap it in promises, of course, but today's topic is currying)

const fetchXML = (url, callback) => {
  const req = new XMLHttpRequest()
  req.addEventListener('load', () => {
    const data = JSON.parse(req.responseText)
    callback(data)
  })
  req.open('GET', url)
  req.send()
}


// What we want
// 1. When the "details" button of a user is clicked,
// we read the user's slug from the data attribute
// 2. Using the slug, we request the list of reviews
// 3. We take the slug of the latest review (first in the list) and make a request
// 4. We get the review details and take its text
// API: /reviews/<user slug> returns an array of reviews (latest first),
// /review-info/<review slug> returns a review with a text field

// the text we will show
var textReview = ''

// use event delegation on the whole container with the buttons
document.getElementById('users-wrapper')
  .addEventListener('click', (e) => {
    // get the element
    const el = e.target

    // if the click is not on a user button, ignore it
    if(!el.classList.contains('user-btn')) {
      return
    }

    // get the user's slug from the button
    const slugUser = el.dataset.slug // 'xksdfjdkhfd' is the slug

    // make sure there is a slug
    if(!slugUser) {
      return
    }

    // get the list of reviews by the user's slug
    fetchXML('https://example.com/reviews/' + slugUser, (reviews) => {
      // get the slug of the latest review
      const slugFirstReview = reviews[0].slug

      // request the review details
      fetchXML('https://example.com/review-info/' + slugFirstReview, (review) => {
        textReview = review.text
      })
    })
  })`}},{type:"text",ru:'Мы используем каррирование без промисов и победим "ад колбеков".',en:'We will use currying without promises and defeat "callback hell".'},{type:"text",ru:"Отрефакторим наш код.",en:"Let's refactor our code."},{type:"code",noRun:"dom",code:{ru:`//  декларативный код
// ==== ВНИМАНИЕ многие функции хелперы уже
// ==== существуют в готовых библиотеках
// ==== тут мы это часто показываем в учебных целях

// создадим функцию для запросов на основе XMLHttpRequest
// он на событиях без промисов
// можно, конечно, обернуть в промисы, но сейчас у нас тема — каррирование

// fetchXML :: String -> String -> String -> (a -> *) -> XMLHttpRequest
const fetchXML = (baseUrl) => (params) => (id) => (callback) => {
  const req = new XMLHttpRequest()
  req.addEventListener('load', () => callback(JSON.parse(req.responseText)))
  req.open('GET', \`\${baseUrl}/\${params}/\${id}\`)
  req.send()
  return req
}

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)


// давайте на основе функции выше создадим спец функции
const BASE_URL = 'https://example.com'
const REVIEWS = 'reviews'
const REVIEW_INFO = 'review-info'

// функция закрепляющая базовый путь
const fetchBaseUrl = fetchXML(BASE_URL)

// функция для получения списка отзывов
const getReviews = fetchBaseUrl(REVIEWS)

// функция для получения подробностей по опред отзыву
const getReviewInfo = fetchBaseUrl(REVIEW_INFO)

// теперь создадим хелпер для события click
// чтобы вызывать в композиции функций
// clickElement :: Element -> (Event -> *) -> Undefined
const clickElement = (element) =>
                      (callback) =>
                        element.addEventListener('click', callback)

// Чего мы хотим
// 1. При клике на кнопку подробнее
// у определенного пользователя мы получим его слаг из дата атрибута
// 2. По слагу сделаем запрос и получим список отзывов,
// 3. Берем слаг последнего отзыва (первый в списке) и делаем запрос
// 4. Получаем подробную информацию об отзыве, берем оттуда текст
// API: /reviews/<слаг пользователя> отдаёт массив отзывов (свежий — первый),
// /review-info/<слаг отзыва> — отзыв с полем text

// head :: [a] -> a
const head = (arr) => arr[0]

// prop :: String -> a -> b
const prop = (prop) => (obj) => obj[prop]

// текст, который покажем
var textReview = ''

// получаем контейнер с кнопками
const btnWrapper =  document.getElementById('users-wrapper')

// запускаем сразу композицию
clickElement (btnWrapper) (pipe(
  (e) => e?.target, // получаем элемент
  (el) => el?.dataset?.slug, // получаем дата атрибут
  (slugUser) => getReviews (slugUser) ( // делаем запрос на получение всех отзывов
        pipe(
          head, // берем первый отзыв
          prop('slug'), // оттуда слаг
          (slug) => getReviewInfo (slug) ( // по слагу делаем запрос на получение инфы
            (review) => {
              textReview = prop ('text') (review) // результат записываем в глобальную переменную
            })
        )
      )
))`,en:`//  declarative code
// ==== NOTE: many of these helper functions already
// ==== exist in ready-made libraries;
// ==== we often write them here for learning purposes

// create a request function based on XMLHttpRequest:
// it works with events, without promises
// (we could wrap it in promises, of course, but today's topic is currying)

// fetchXML :: String -> String -> String -> (a -> *) -> XMLHttpRequest
const fetchXML = (baseUrl) => (params) => (id) => (callback) => {
  const req = new XMLHttpRequest()
  req.addEventListener('load', () => callback(JSON.parse(req.responseText)))
  req.open('GET', \`\${baseUrl}/\${params}/\${id}\`)
  req.send()
  return req
}

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)


// let's build specialized functions on top of the function above
const BASE_URL = 'https://example.com'
const REVIEWS = 'reviews'
const REVIEW_INFO = 'review-info'

// a function with the base path fixed
const fetchBaseUrl = fetchXML(BASE_URL)

// a function that gets the list of reviews
const getReviews = fetchBaseUrl(REVIEWS)

// a function that gets the details of a specific review
const getReviewInfo = fetchBaseUrl(REVIEW_INFO)

// now let's create a helper for the click event
// so that we can use it in function composition
// clickElement :: Element -> (Event -> *) -> Undefined
const clickElement = (element) =>
                      (callback) =>
                        element.addEventListener('click', callback)

// What we want
// 1. When the "details" button of a user is clicked,
// we read the user's slug from the data attribute
// 2. Using the slug, we request the list of reviews
// 3. We take the slug of the latest review (first in the list) and make a request
// 4. We get the review details and take its text
// API: /reviews/<user slug> returns an array of reviews (latest first),
// /review-info/<review slug> returns a review with a text field

// head :: [a] -> a
const head = (arr) => arr[0]

// prop :: String -> a -> b
const prop = (prop) => (obj) => obj[prop]

// the text we will show
var textReview = ''

// get the container with the buttons
const btnWrapper =  document.getElementById('users-wrapper')

// run the composition right away
clickElement (btnWrapper) (pipe(
  (e) => e?.target, // get the element
  (el) => el?.dataset?.slug, // get the data attribute
  (slugUser) => getReviews (slugUser) ( // request all reviews
        pipe(
          head, // take the first review
          prop('slug'), // and its slug
          (slug) => getReviewInfo (slug) ( // request the review details by the slug
            (review) => {
              textReview = prop ('text') (review) // write the result into a global variable
            })
        )
      )
))`}},{type:"text",ru:"Признаюсь: запах плохого кода не пропал. Вдобавок эта версия потеряла проверки из первой: что клик был по кнопке пользователя и что у кнопки есть слаг. Поэтому клик мимо кнопки отправит запрос на /reviews/undefined, а ошибки здесь никак не обрабатываются. Оба недостатка исправим в следующей версии.",en:"I'll admit it: the smell of bad code hasn't gone away. On top of that, this version lost the checks from the first one: that the click was on a user button and that the button has a slug. So a click outside a button sends a request to /reviews/undefined, and errors aren't handled here at all. We'll fix both shortcomings in the next version."},{type:"text",ru:"А что, если мы добавим в код выше мощь промисов и преобразим его?",en:"What if we add the power of promises to the code above and transform it?"},{type:"code",noRun:"dom",code:{ru:`//  А теперь возьмемся за дело
// clickElement, btnWrapper, head, prop и textReview скопируйте из прошлого примера;
// BASE_URL, REVIEWS, REVIEW_INFO, getReviews и getReviewInfo объявлены здесь заново,
// поэтому оба блока одним куском не запустить
// перепишем нашу функцию получения данных
// которая сама возвращает промис

// fetchClassic :: String -> String -> String -> Promise
const fetchClassic = (baseUrl) =>
                        (params) =>
                        (id) =>
                        fetch (\`\${baseUrl}/\${params}/\${id}\`)
                          .then ((res) => {
                            // fetch не отклоняет промис при ответах вроде 404 или 500,
                            // поэтому статус проверяем сами
                            if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
                            return res.json()
                          })

const BASE_URL = 'https://example.com'
const REVIEWS = 'reviews'
const REVIEW_INFO = 'review-info'

// получение списка отзывов и подробностей отзыва
const getReviews = fetchClassic (BASE_URL) (REVIEWS)
const getReviewInfo = fetchClassic (BASE_URL) (REVIEW_INFO)


// У нас будет pipe, который под капотом
// сам дожидается промисов: если шаг вернул промис,
// следующие шаги идут через then, и на выходе тоже промис
// pipeAsync :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipeAsync = (...fns) => (x) => fns.reduce((v, f) => {
  return v instanceof Promise
    ? v.then(f)
    : f(v)
}, x)

// по слагу пользователя получаем текст его свежего отзыва
// loadReviewText :: String -> Promise String
const loadReviewText = pipeAsync(
  getReviews, // делаем запрос на получение всех отзывов
  head, // берем первый отзыв
  prop('slug'), // оттуда слаг
  getReviewInfo, // по слагу делаем запрос на получение инфы отзыва
  prop('text'), // берем поле text
  (text) => textReview = text, // устанавливаем значением в глоб переменную
)

// те же проверки, что в первой версии: клик по кнопке пользователя
// и у кнопки есть слаг, остальные клики игнорируем
// onUserButton :: (String -> *) -> Event -> Undefined
const onUserButton = (handler) => (e) => {
  const el = e.target
  if (!el.classList.contains('user-btn') || !el.dataset.slug) {
    return
  }
  handler(el.dataset.slug)
}

// запускаем улучшенный вариант
// pipeAsync отрабатывает промисы под капотом, а ошибка любого шага
// (сеть, статус ответа, пустой список отзывов) попадает в catch
clickElement (btnWrapper) (onUserButton ((slug) =>
  loadReviewText (slug)
    .catch ((error) => console.error('Не удалось получить отзыв:', error.message))
))`,en:`//  Now let's get down to business
// copy clickElement, btnWrapper, head, prop and textReview from the previous example;
// BASE_URL, REVIEWS, REVIEW_INFO, getReviews and getReviewInfo are declared here again,
// so the two blocks can't be run together as a single piece
// let's rewrite our data-fetching function
// so that it returns a promise itself

// fetchClassic :: String -> String -> String -> Promise
const fetchClassic = (baseUrl) =>
                        (params) =>
                        (id) =>
                        fetch (\`\${baseUrl}/\${params}/\${id}\`)
                          .then ((res) => {
                            // fetch does not reject on responses like 404 or 500,
                            // so we check the status ourselves
                            if (!res.ok) throw new Error(\`HTTP \${res.status}\`)
                            return res.json()
                          })

const BASE_URL = 'https://example.com'
const REVIEWS = 'reviews'
const REVIEW_INFO = 'review-info'

// get the list of reviews and the details of a review
const getReviews = fetchClassic (BASE_URL) (REVIEWS)
const getReviewInfo = fetchClassic (BASE_URL) (REVIEW_INFO)


// We'll have a super pipe that waits for promises
// under the hood: once a step returns a promise,
// the next steps go through then, and the result is a promise too
// pipeAsync :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipeAsync = (...fns) => (x) => fns.reduce((v, f) => {
  return v instanceof Promise
    ? v.then(f)
    : f(v)
}, x)

// get the text of the user's latest review by the user's slug
// loadReviewText :: String -> Promise String
const loadReviewText = pipeAsync(
  getReviews, // request all reviews
  head, // take the first review
  prop('slug'), // and its slug
  getReviewInfo, // request the review details by the slug
  prop('text'), // take the text field
  (text) => textReview = text, // store it in the global variable
)

// the same checks as in the first version: the click is on a user button
// and the button has a slug; other clicks are ignored
// onUserButton :: (String -> *) -> Event -> Undefined
const onUserButton = (handler) => (e) => {
  const el = e.target
  if (!el.classList.contains('user-btn') || !el.dataset.slug) {
    return
  }
  handler(el.dataset.slug)
}

// run the improved version:
// pipeAsync handles promises under the hood, and an error at any step
// (network, response status, empty list of reviews) ends up in catch
clickElement (btnWrapper) (onUserButton ((slug) =>
  loadReviewText (slug)
    .catch ((error) => console.error('Failed to load the review:', error.message))
))`}}],summary:[{ru:"Каррированная базовая функция запросов baseFetch хранит в замыканиях базовый URL и путь, а из неё вызовами получаются специализированные функции вроде getAllUser и getAllBooks. Заголовки с токеном можно хранить в отдельном замыкании, как в xFetch, из которой получаются getAllUserX и getAllBooksX.",en:"The curried base request function baseFetch keeps the base URL and the path in closures, and specialized functions such as getAllUser and getAllBooks are built from it through calls. Headers with a token can be kept in a separate closure, as in xFetch, from which getAllUserX and getAllBooksX are built."},{ru:"Каррирование и pipe без промисов делают код на колбеках декларативным, но запах плохого кода не пропадает: ошибки в такой версии никак не обрабатываются.",en:"Currying and pipe without promises make callback-based code declarative, but the smell of bad code doesn't go away: errors aren't handled in that version at all."},{ru:"pipeAsync сам дожидается промисов: если шаг вернул промис, следующие шаги идут через then, и на выходе тоже промис.",en:"pipeAsync waits for promises by itself: once a step returns a promise, the next steps go through then, and the result is a promise too."},{ru:"В конвейере на промисах ошибка любого шага — сеть, статус ответа, пустой список — попадает в один catch.",en:"In a promise-based pipeline, an error at any step — the network, the response status, an empty list — ends up in a single catch."}],exercises:[{task:{ru:"В заготовке fakeFetch имитирует запрос: через 5 мс он отдаёт ответ из DB по адресу или отклоняет промис, если такого адреса нет. Напишите каррированную базовую функцию createRequest :: String -> String -> Number -> Promise Object, которая принимает базовый URL, ресурс и id. Зафиксируйте в ней базовый URL https://example.com и получите специализированные функции getUser и getBook. Выведите имя пользователя 1 и название книги 7.",en:"In the starter, fakeFetch simulates a request: after 5 ms it returns the response stored in DB under the URL, or rejects the promise if there is no such URL. Write a curried base function createRequest :: String -> String -> Number -> Promise Object that takes a base URL, a resource and an id. Fix the base URL https://example.com in it and derive the specialized functions getUser and getBook. Print the name of user 1 and the title of book 7."},starter:{ru:`// данные фейкового сервера: адрес -> ответ
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// имитация запроса: через 5 мс отдаёт ответ по адресу
// или отклоняет промис, если адреса нет
// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// ваш код`,en:`// fake server data: URL -> response
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// simulated request: after 5 ms it returns the response for the URL
// or rejects the promise if there is no such URL
// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// your code`},solution:{ru:`// данные фейкового сервера: адрес -> ответ
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// имитация запроса: через 5 мс отдаёт ответ по адресу
// или отклоняет промис, если адреса нет
// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// createRequest :: String -> String -> Number -> Promise Object
const createRequest = (baseUrl) => (resource) => (id) => fakeFetch(\`\${baseUrl}/\${resource}/\${id}\`)

// базовый URL сохранён в замыкании
const api = createRequest('https://example.com')

// специализированные функции: ресурс тоже зафиксирован, ждут только id
const getUser = api('users')
const getBook = api('books')

getUser(1).then((user) => console.log(user.name))
getBook(7).then((book) => console.log(book.title))`,en:`// fake server data: URL -> response
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// simulated request: after 5 ms it returns the response for the URL
// or rejects the promise if there is no such URL
// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// createRequest :: String -> String -> Number -> Promise Object
const createRequest = (baseUrl) => (resource) => (id) => fakeFetch(\`\${baseUrl}/\${resource}/\${id}\`)

// the base URL is kept in the closure
const api = createRequest('https://example.com')

// specialized functions: the resource is fixed too, they wait only for an id
const getUser = api('users')
const getBook = api('books')

getUser(1).then((user) => console.log(user.name))
getBook(7).then((book) => console.log(book.title))`},expected:{ru:`John
Structure and Interpretation of Computer Programs`,en:`John
Structure and Interpretation of Computer Programs`}},{task:{ru:"В заготовке уже есть getUser и getBook из первого упражнения. Напишите pipeAsync — pipe, который сам дожидается промисов, — и соберите из него loadFavoriteBook :: Number -> Promise String: по id запросить пользователя, взять поле favoriteBook, запросить эту книгу и вернуть её название. Вывод уже есть в заготовке: showFavoriteBook выводит название любимой книги пользователя 2, затем пробует пользователя 5, которого нет в DB, и перехватывает ошибку в catch.",en:"The starter already has getUser and getBook from the first exercise. Write pipeAsync, a pipe that waits for promises by itself, and use it to build loadFavoriteBook :: Number -> Promise String: request the user by id, take the favoriteBook field, request that book and return its title. The output is already in the starter: showFavoriteBook prints the title of user 2's favorite book, then tries user 5, who is not in DB, and handles the error with catch."},starter:{ru:`// данные фейкового сервера: адрес -> ответ
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// createRequest :: String -> String -> Number -> Promise Object
const createRequest = (baseUrl) => (resource) => (id) => fakeFetch(\`\${baseUrl}/\${resource}/\${id}\`)
const api = createRequest('https://example.com')
const getUser = api('users')
const getBook = api('books')

// ваш код: pipeAsync и loadFavoriteBook

// ошибка любого шага попадает в catch
// showFavoriteBook :: Number -> Promise Undefined
const showFavoriteBook = (userId) =>
  loadFavoriteBook(userId)
    .then((title) => console.log(title))
    .catch((error) => console.log(\`Запрос не удался: \${error.message}\`))

// сначала пользователь 2, потом пользователь 5, которого нет
showFavoriteBook(2).then(() => showFavoriteBook(5))`,en:`// fake server data: URL -> response
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// createRequest :: String -> String -> Number -> Promise Object
const createRequest = (baseUrl) => (resource) => (id) => fakeFetch(\`\${baseUrl}/\${resource}/\${id}\`)
const api = createRequest('https://example.com')
const getUser = api('users')
const getBook = api('books')

// your code: pipeAsync and loadFavoriteBook

// an error at any step ends up in catch
// showFavoriteBook :: Number -> Promise Undefined
const showFavoriteBook = (userId) =>
  loadFavoriteBook(userId)
    .then((title) => console.log(title))
    .catch((error) => console.log(\`Request failed: \${error.message}\`))

// user 2 first, then user 5, who does not exist
showFavoriteBook(2).then(() => showFavoriteBook(5))`},solution:{ru:`// данные фейкового сервера: адрес -> ответ
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// createRequest :: String -> String -> Number -> Promise Object
const createRequest = (baseUrl) => (resource) => (id) => fakeFetch(\`\${baseUrl}/\${resource}/\${id}\`)
const api = createRequest('https://example.com')
const getUser = api('users')
const getBook = api('books')

// prop :: String -> a -> b
const prop = (key) => (obj) => obj[key]

// pipe, который сам дожидается промисов: если шаг вернул промис,
// следующие шаги идут через then
// pipeAsync :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipeAsync = (...fns) => (x) => fns.reduce((v, f) => (v instanceof Promise ? v.then(f) : f(v)), x)

// loadFavoriteBook :: Number -> Promise String
const loadFavoriteBook = pipeAsync(
  getUser, // запрос пользователя
  prop('favoriteBook'), // id его любимой книги
  getBook, // запрос книги
  prop('title'), // её название
)

// ошибка любого шага попадает в catch
// showFavoriteBook :: Number -> Promise Undefined
const showFavoriteBook = (userId) =>
  loadFavoriteBook(userId)
    .then((title) => console.log(title))
    .catch((error) => console.log(\`Запрос не удался: \${error.message}\`))

// сначала пользователь 2, потом пользователь 5, которого нет
showFavoriteBook(2).then(() => showFavoriteBook(5))`,en:`// fake server data: URL -> response
const DB = {
  'https://example.com/users/1': { name: 'John', favoriteBook: 7 },
  'https://example.com/users/2': { name: 'Anna', favoriteBook: 3 },
  'https://example.com/books/3': { title: 'Functional-Light JavaScript' },
  'https://example.com/books/7': { title: 'Structure and Interpretation of Computer Programs' },
}

// fakeFetch :: String -> Promise Object
const fakeFetch = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url in DB) resolve(DB[url])
    else reject(new Error(\`404 \${url}\`))
  }, 5)
})

// createRequest :: String -> String -> Number -> Promise Object
const createRequest = (baseUrl) => (resource) => (id) => fakeFetch(\`\${baseUrl}/\${resource}/\${id}\`)
const api = createRequest('https://example.com')
const getUser = api('users')
const getBook = api('books')

// prop :: String -> a -> b
const prop = (key) => (obj) => obj[key]

// a pipe that waits for promises by itself: once a step returns a promise,
// the next steps go through then
// pipeAsync :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipeAsync = (...fns) => (x) => fns.reduce((v, f) => (v instanceof Promise ? v.then(f) : f(v)), x)

// loadFavoriteBook :: Number -> Promise String
const loadFavoriteBook = pipeAsync(
  getUser, // request the user
  prop('favoriteBook'), // the id of their favorite book
  getBook, // request the book
  prop('title'), // its title
)

// an error at any step ends up in catch
// showFavoriteBook :: Number -> Promise Undefined
const showFavoriteBook = (userId) =>
  loadFavoriteBook(userId)
    .then((title) => console.log(title))
    .catch((error) => console.log(\`Request failed: \${error.message}\`))

// user 2 first, then user 5, who does not exist
showFavoriteBook(2).then(() => showFavoriteBook(5))`},expected:{ru:`Functional-Light JavaScript
Запрос не удался: 404 https://example.com/users/5`,en:`Functional-Light JavaScript
Request failed: 404 https://example.com/users/5`}}]},d={slug:"partial-application",title:{ru:"Частичное применение",en:"Partial application"},description:{ru:"Как частичное применение в JavaScript заранее фиксирует часть аргументов, чем оно отличается от каррирования и как написать свою функцию partial.",en:"How partial application in JavaScript fixes some arguments in advance, how it differs from currying, and how to write your own partial function."},goal:{ru:"Понять, чем частичное применение отличается от каррирования, и научиться заранее фиксировать часть аргументов функции, чтобы получать из неё новые функции.",en:"Understand how partial application differs from currying, and learn to fix some of a function's arguments in advance to derive new functions from it."},blocks:[{type:"text",ru:"Частичное применение — это один из приёмов, используемых в функциональном программировании, при котором часть аргументов функции фиксируется заранее и получается новая функция, которая ждёт остальные аргументы.",en:"Partial application is one of the techniques used in functional programming, in which some of a function's arguments are fixed in advance, producing a new function that waits for the remaining arguments."},{type:"text",ru:"Частичное применение очень похоже на каррирование, но есть отличия.",en:"Partial application is very similar to currying, but there are differences."},{type:"list",ordered:!0,items:[{ru:"Частичное применение фиксирует часть аргументов за один шаг: получается функция, которой оставшиеся аргументы передают одним вызовом, и она сразу вычисляет результат. Каррированная функция возвращает новую функцию после каждого вызова, пока не получит все аргументы.",en:"Partial application fixes some of the arguments in one step: the result is a function that takes the remaining arguments in a single call and immediately computes the result. A curried function returns a new function after each call until it has received all of its arguments."},{ru:"Количество аргументов, передаваемых в функцию при частичном применении, может быть несколько, а в классическом каррировании обычно одно.",en:"The number of arguments passed to the function in partial application can be several, whereas in classic currying it is usually one."}]},{type:"code",code:{ru:`//  пример функции с частичным применением
// partialSumA :: Number -> (Number, Number) -> Number
const partialSumA = (a) => (b, c) => a + b + c
// partialSumB :: (Number, Number) -> Number -> Number
const partialSumB = (a, b) => (c) => a + b + c

// давайте теперь вызовем эти функции
console.log ( partialSumA (1) (1, 1) ) // 3
console.log ( partialSumB (1, 1) (1) ) // 3

// А давайте напишем функцию, которая применяет
// частичное применение к любой обычной функции

// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => {

  // количество параметров у исходной функции
  const lengthArgs = fn.length

  // возвращаемая функция
  const innerPartial = (...firstArgs) => {
    // если количество входящих аргументов
    // больше или равно количеству параметров fn,
    // значит, её можно вызвать сразу
    if (firstArgs.length >= lengthArgs) {
      return fn (...firstArgs)
    }

    // иначе мы вторым вызовом
    // запускаем функцию в любом случае
    return (...secondArgs) => fn (...firstArgs, ...secondArgs)
  }

  return innerPartial
}

// можем применить нашу функцию
// которая применяет частичное применение
// к любой функции

// sum :: (Number, Number, Number) -> Number
const sum = (a, b, c) => a + b + c

// получаем функцию, которой аргументы можно передать в два вызова
const sumPartial = partial (sum)

// теперь мы можем вызывать возвращенную функцию
console.log ( sumPartial (1) (1, 1) ) // 3
console.log ( sumPartial (1, 1) (1) ) // 3`,en:`//  example of functions with partial application
// partialSumA :: Number -> (Number, Number) -> Number
const partialSumA = (a) => (b, c) => a + b + c
// partialSumB :: (Number, Number) -> Number -> Number
const partialSumB = (a, b) => (c) => a + b + c

// now let's call these functions
console.log ( partialSumA (1) (1, 1) ) // 3
console.log ( partialSumB (1, 1) (1) ) // 3

// Now let's write a function that applies
// partial application to any regular function

// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => {

  // number of parameters of the original function
  const lengthArgs = fn.length

  // the returned function
  const innerPartial = (...firstArgs) => {
    // if the number of incoming arguments
    // is greater than or equal to the number of fn's parameters,
    // we can call it right away
    if (firstArgs.length >= lengthArgs) {
      return fn (...firstArgs)
    }

    // otherwise the second call
    // runs the function no matter what
    return (...secondArgs) => fn (...firstArgs, ...secondArgs)
  }

  return innerPartial
}

// we can use our function
// that applies partial application
// to any function

// sum :: (Number, Number, Number) -> Number
const sum = (a, b, c) => a + b + c

// we get a function whose arguments can be passed in two calls
const sumPartial = partial (sum)

// now we can call the returned function
console.log ( sumPartial (1) (1, 1) ) // 3
console.log ( sumPartial (1, 1) (1) ) // 3`}}],summary:[{ru:"Частичное применение фиксирует часть аргументов функции заранее, и получается новая функция, которая ждёт остальные аргументы.",en:"Partial application fixes some of a function's arguments in advance, producing a new function that waits for the remaining arguments."},{ru:"Функция, полученная частичным применением, принимает оставшиеся аргументы одним вызовом и сразу вычисляет результат, а каррированная функция возвращает новую функцию после каждого вызова, пока не получит все аргументы.",en:"The function produced by partial application takes the remaining arguments in a single call and immediately computes the result, whereas a curried function returns a new function after each call until it has received all of its arguments."},{ru:"При частичном применении в функцию можно передать сразу несколько аргументов, а в классическом каррировании обычно передают один.",en:"In partial application several arguments can be passed to the function at once, whereas in classic currying it is usually one."},{ru:"Функция partial из урока применяет частичное применение к любой обычной функции: если аргументов хватает, она сразу вызывает функцию, иначе второй вызов запускает её в любом случае.",en:"The partial function from the lesson applies partial application to any regular function: if there are enough arguments, it calls the function right away; otherwise the second call runs it no matter what."}],exercises:[{task:{ru:"С помощью partial зафиксируйте у функции formatMoney(currency, digits, amount) сразу два аргумента — валюту и число знаков в дробной части — и получите toUsd и toBtc. Затем получите toEur, зафиксировав только валюту: число знаков и сумму передайте ей одним вызовом. Выведите суммы из заготовки.",en:"Use partial to fix two arguments of formatMoney(currency, digits, amount) at once — the currency and the number of decimal places — and get toUsd and toBtc. Then get toEur by fixing only the currency: pass it the number of decimal places and the amount in a single call. Print the amounts from the starter."},starter:{ru:`// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// ваш код

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`,en:`// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// your code

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`},solution:{ru:`// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// валюта и число знаков зафиксированы одним вызовом
const toUsd = partial(formatMoney)('USD', 2)
const toBtc = partial(formatMoney)('BTC', 6)
// зафиксирована только валюта: число знаков и сумма придут одним вызовом
const toEur = partial(formatMoney)('EUR')

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`,en:`// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// formatMoney :: (String, Number, Number) -> String
const formatMoney = (currency, digits, amount) => \`\${amount.toFixed(digits)} \${currency}\`

// the currency and the number of decimal places are fixed in one call
const toUsd = partial(formatMoney)('USD', 2)
const toBtc = partial(formatMoney)('BTC', 6)
// only the currency is fixed: the decimal places and the amount come in one call
const toEur = partial(formatMoney)('EUR')

console.log(toUsd(19.9))
console.log(toUsd(5))
console.log(toBtc(0.0015))
console.log(toEur(2, 7.5))`},expected:{ru:`19.90 USD
5.00 USD
0.001500 BTC
7.50 EUR`,en:`19.90 USD
5.00 USD
0.001500 BTC
7.50 EUR`}},{task:{ru:"Сравните частичное применение и каррирование на функции volume(length, width, height). Получите volumePartial через partial и volumeCurried через curry из Ramda. Выведите объём 2 × 3 × 4, посчитанный сначала volumePartial, затем volumeCurried: передайте первым 2, а остальные аргументы — так, как позволяет каждая из функций. Затем выведите volumePartial(2)(3) и тип значения volumeCurried(2)(3) и объясните, почему результаты разные.",en:"Compare partial application and currying on volume(length, width, height). Get volumePartial with partial and volumeCurried with curry from Ramda. Print the volume 2 × 3 × 4 computed first with volumePartial and then with volumeCurried: pass 2 in the first call and the remaining arguments the way each function allows. Then print volumePartial(2)(3) and the type of volumeCurried(2)(3), and explain why the results differ."},starter:{ru:`// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

// ваш код`,en:`// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

// your code`},solution:{ru:`// partial из урока, записанный короче
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

const volumePartial = partial(volume)
const volumeCurried = R.curry(volume)

// остальные аргументы — одним вызовом
console.log(volumePartial(2)(3, 4))
// по одному аргументу за вызов
console.log(volumeCurried(2)(3)(4))

// второй вызов partial запускает volume в любом случае:
// height = undefined, а 2 * 3 * undefined — это NaN
console.log(volumePartial(2)(3))
// каррированная функция ждёт все аргументы и пока возвращает новую функцию
console.log(typeof volumeCurried(2)(3))`,en:`// partial from the lesson, written more compactly
// partial :: ((a, b, c, ..., n) -> x) -> (a, b, c, ...) -> ((d, e, f, ..., n) -> x)
const partial = (fn) => (...firstArgs) =>
  firstArgs.length >= fn.length
    ? fn(...firstArgs)
    : (...secondArgs) => fn(...firstArgs, ...secondArgs)

// volume :: (Number, Number, Number) -> Number
const volume = (length, width, height) => length * width * height

const volumePartial = partial(volume)
const volumeCurried = R.curry(volume)

// the remaining arguments in a single call
console.log(volumePartial(2)(3, 4))
// one argument per call
console.log(volumeCurried(2)(3)(4))

// the second call of partial runs volume no matter what:
// height = undefined, and 2 * 3 * undefined is NaN
console.log(volumePartial(2)(3))
// the curried function waits for all arguments and returns a new function for now
console.log(typeof volumeCurried(2)(3))`},expected:{ru:`24
24
NaN
function`,en:`24
24
NaN
function`}}]},f={slug:"point-free",title:{ru:"Бесточечный стиль",en:"Point-free style"},description:{ru:"Бесточечный стиль в JavaScript: функции без упоминания аргументов через pipe, compose и каррированные функции Ramda, ловушка map(parseInt) и отладка через tap.",en:"Point-free style in JavaScript: functions without named arguments via pipe, compose and curried Ramda functions, the map(parseInt) trap and debugging with tap."},goal:{ru:"Научиться записывать функции в бесточечном стиле через pipe, compose и каррированные функции, понять, почему ['1', '2', '3'].map(parseInt) даёт [1, NaN, NaN], отлаживать такие конвейеры через tap и видеть, когда явный аргумент читается лучше.",en:"Learn to write functions in point-free style with pipe, compose and curried functions, understand why ['1', '2', '3'].map(parseInt) gives [1, NaN, NaN], debug such pipelines with tap, and see when a named argument reads better."},blocks:[{type:"text",ru:"Бесточечный стиль (point-free style, его ещё называют tacit programming) — это способ определить функцию, не упоминая её аргументы. Новая функция собирается из других функций через композицию, каррирование и частичное применение. Вместо «возьми пользователя и верни его имя» мы пишем «это R.prop('name')».",en:`Point-free style (also called tacit programming) is a way to define a function without mentioning its arguments. The new function is assembled from other functions through composition, currying and partial application. Instead of "take a user and return their name" we write "this is R.prop('name')".`},{type:"text",ru:"«Точка» здесь — не символ точки в user.name, а аргумент функции. Термин пришёл из математики: в топологии функции действуют на пространства, которые состоят из точек, и бесточечное определение функции не называет точки, то есть значения, к которым она применяется. Поэтому R.prop('name') — бесточечная запись, хотя символ точки в ней есть.",en:`A "point" here is not the dot in user.name but a function argument. The term comes from mathematics: in topology, functions act on spaces made of points, and a point-free definition of a function does not name the points, that is, the values it is applied to. So R.prop('name') is point-free even though it contains a dot.`},{type:"text",ru:"Стиль опирается на то, что мы уже умеем: каррированная функция возвращает новую функцию, пока не получит все аргументы, а pipe и compose собирают функции в конвейер. В Ramda функции каррированы и, как правило, принимают данные последним аргументом, поэтому R.filter(isOnline) — уже готовая функция, которая ждёт список.",en:"The style relies on what we already know: a curried function returns a new function until it has all of its arguments, and pipe and compose chain functions into a pipeline. In Ramda functions are curried and, as a rule, take the data as their last argument, so R.filter(isOnline) is already a ready-made function waiting for a list."},{type:"code",code:{ru:`// Ramda в песочнице курса доступна как R
const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// === с «точками»: аргументы названы явно ===
// getNameP :: Object -> String
const getNameP = (user) => user.name
// isOnlineP :: Object -> Boolean
const isOnlineP = (user) => user.status === 'online'
// onlineNamesP :: [Object] -> [String]
const onlineNamesP = (list) => list.filter((user) => isOnlineP(user)).map((user) => getNameP(user))

// === без «точек»: функции собраны из других функций ===
// getName :: Object -> String
const getName = R.prop('name')
// isOnline :: Object -> Boolean
// в современных версиях Ramda propEq принимает сначала значение, потом ключ,
// в старых порядок был обратным
const isOnline = R.propEq('online', 'status')
// onlineNames :: [Object] -> [String]
const onlineNames = R.pipe(R.filter(isOnline), R.map(getName))
// то же через compose: шаги записаны справа налево
const onlineNamesC = R.compose(R.map(getName), R.filter(isOnline))

console.log(onlineNamesP(users).join(', ')) // John, Angel
console.log(onlineNames(users).join(', ')) // John, Angel
console.log(onlineNamesC(users).join(', ')) // John, Angel

// === свои каррированные функции работают так же ===
// add :: Number -> Number -> Number
const add = (a) => (b) => a + b
// с точкой: обёртка только передаёт n дальше
// incP :: Number -> Number
const incP = (n) => add(1)(n)
// без точки: add(1) уже функция, которая ждёт второе число
// inc :: Number -> Number
const inc = add(1)

console.log(incP(41)) // 42
console.log(inc(41)) // 42`,en:`// the course playground exposes Ramda as R
const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// === with "points": the arguments are named explicitly ===
// getNameP :: Object -> String
const getNameP = (user) => user.name
// isOnlineP :: Object -> Boolean
const isOnlineP = (user) => user.status === 'online'
// onlineNamesP :: [Object] -> [String]
const onlineNamesP = (list) => list.filter((user) => isOnlineP(user)).map((user) => getNameP(user))

// === without "points": functions assembled from other functions ===
// getName :: Object -> String
const getName = R.prop('name')
// isOnline :: Object -> Boolean
// in current versions of Ramda propEq takes the value first and then the key,
// older versions had the opposite order
const isOnline = R.propEq('online', 'status')
// onlineNames :: [Object] -> [String]
const onlineNames = R.pipe(R.filter(isOnline), R.map(getName))
// the same with compose: the steps are written right to left
const onlineNamesC = R.compose(R.map(getName), R.filter(isOnline))

console.log(onlineNamesP(users).join(', ')) // John, Angel
console.log(onlineNames(users).join(', ')) // John, Angel
console.log(onlineNamesC(users).join(', ')) // John, Angel

// === your own curried functions work the same way ===
// add :: Number -> Number -> Number
const add = (a) => (b) => a + b
// with a point: the wrapper only passes n along
// incP :: Number -> Number
const incP = (n) => add(1)(n)
// without a point: add(1) is already a function waiting for the second number
// inc :: Number -> Number
const inc = add(1)

console.log(incP(41)) // 42
console.log(inc(41)) // 42`}},{type:"text",ru:"Простейший переход к бесточечной записи — убрать обёртку: (x) => f(x) делает то же, что сама f. В этом и главная ловушка стиля. Обёртка передаёт в f ровно один аргумент, а f без обёртки получает всё, что передаст вызывающий код.",en:"The simplest step towards point-free code is dropping a wrapper: (x) => f(x) does the same as f itself. That is also the main trap of the style. The wrapper passes exactly one argument to f, while f without the wrapper receives everything the calling code passes."},{type:"heading",ru:"Ловушка: лишние аргументы",en:"The trap: extra arguments"},{type:"text",ru:"Array.prototype.map вызывает колбэк с тремя аргументами: элементом, его индексом и всем массивом. parseInt принимает два: строку и основание системы счисления. Поэтому ['1', '2', '3'].map(parseInt) на деле вызывает parseInt('1', 0), parseInt('2', 1) и parseInt('3', 2) и возвращает [1, NaN, NaN].",en:"Array.prototype.map calls its callback with three arguments: the element, its index and the whole array. parseInt takes two: a string and a radix. So ['1', '2', '3'].map(parseInt) actually calls parseInt('1', 0), parseInt('2', 1) and parseInt('3', 2), and returns [1, NaN, NaN]."},{type:"code",code:{ru:`// map передаёт колбэку элемент, индекс и массив,
// а второй параметр parseInt — основание системы счисления
console.log(['1', '2', '3'].map(parseInt)) // [1, NaN, NaN]

// что на самом деле вызывается
// основание 0 значит «не задано»: строка без префикса 0x читается как десятичное число
console.log(parseInt('1', 0)) // 1
// основание 1 недопустимо: parseInt принимает основания от 2 до 36
console.log(parseInt('2', 1)) // NaN
// в двоичной записи нет цифры 3
console.log(parseInt('3', 2)) // NaN

// === как исправить ===
// Number использует только первый аргумент
// он строже parseInt: Number('12px') — NaN, а parseInt('12px', 10) — 12
console.log(['1', '2', '3'].map(Number)) // [1, 2, 3]
// вернуть «точку» и указать основание явно
console.log(['1', '2', '3'].map((str) => parseInt(str, 10))) // [1, 2, 3]
// R.map передаёт колбэку только элемент
console.log(R.map(parseInt, ['1', '2', '3'])) // [1, 2, 3]
// R.unary оставляет функции один аргумент, остальные отбрасывает
console.log(['1', '2', '3'].map(R.unary(parseInt))) // [1, 2, 3]`,en:`// map passes the element, the index and the array to its callback,
// and the second parameter of parseInt is the radix
console.log(['1', '2', '3'].map(parseInt)) // [1, NaN, NaN]

// what is actually called
// radix 0 means "not set": a string without the 0x prefix is read as a decimal number
console.log(parseInt('1', 0)) // 1
// radix 1 is invalid: parseInt accepts radixes from 2 to 36
console.log(parseInt('2', 1)) // NaN
// there is no digit 3 in binary
console.log(parseInt('3', 2)) // NaN

// === how to fix it ===
// Number uses only its first argument
// it is stricter than parseInt: Number('12px') is NaN, while parseInt('12px', 10) is 12
console.log(['1', '2', '3'].map(Number)) // [1, 2, 3]
// bring the "point" back and pass the radix explicitly
console.log(['1', '2', '3'].map((str) => parseInt(str, 10))) // [1, 2, 3]
// R.map passes only the element to its callback
console.log(R.map(parseInt, ['1', '2', '3'])) // [1, 2, 3]
// R.unary keeps one argument of a function and drops the rest
console.log(['1', '2', '3'].map(R.unary(parseInt))) // [1, 2, 3]`}},{type:"text",ru:"Так же ведут себя forEach, filter и другие методы массивов. С методами объектов ловушка другая: arr.map(obj.method) вызовет метод без объекта, и this внутри него будет не тем. Есть и отложенный вариант: если функция, которую передают в map без обёртки, позже получит необязательный второй параметр, в него молча начнёт приходить индекс.",en:"forEach, filter and other array methods behave the same way. With object methods the trap is different: arr.map(obj.method) calls the method without its object, and this inside it will be wrong. There is also a delayed version: if a function passed to map without a wrapper later gains an optional second parameter, the index will silently start arriving in it."},{type:"heading",ru:"Читаемость и отладка",en:"Readability and debugging"},{type:"text",ru:"Бесточечная запись короче, но не всегда понятнее: чтобы её прочитать, нужно помнить сигнатуру каждой функции. R.lte(18) — это функция age => 18 <= age, а R.gt(18) — age => 18 > age. Поэтому R.filter(R.gt(18)) оставляет тех, кто младше 18, хотя читается как «больше 18».",en:'Point-free code is shorter but not always clearer: to read it you have to remember the signature of every function. R.lte(18) is the function age => 18 <= age, and R.gt(18) is age => 18 > age. So R.filter(R.gt(18)) keeps those younger than 18, even though it reads as "greater than 18".'},{type:"code",code:{ru:`const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// бесточечно: нужно знать, что R.lte(18) — это age => 18 <= age
// isAdultOnline :: Object -> Boolean
const isAdultOnline = R.both(R.propSatisfies(R.lte(18), 'age'), R.propEq('online', 'status'))

// с точкой: условие видно сразу
// isAdultOnlineP :: Object -> Boolean
const isAdultOnlineP = (user) => user.age >= 18 && user.status === 'online'

console.log(users.filter(isAdultOnline).length) // 1
console.log(users.filter(isAdultOnlineP).length) // 1

// R.gt(18) читается как «больше 18», а означает age => 18 > age
// ages :: [Number]
const ages = [10, 18, 20, 30]
console.log(R.filter(R.gt(18), ages).join(', ')) // 10
// с явным аргументом не ошибёшься
console.log(ages.filter((age) => age > 18).join(', ')) // 20, 30`,en:`const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// point-free: you need to know that R.lte(18) is age => 18 <= age
// isAdultOnline :: Object -> Boolean
const isAdultOnline = R.both(R.propSatisfies(R.lte(18), 'age'), R.propEq('online', 'status'))

// with a point: the condition is visible at once
// isAdultOnlineP :: Object -> Boolean
const isAdultOnlineP = (user) => user.age >= 18 && user.status === 'online'

console.log(users.filter(isAdultOnline).length) // 1
console.log(users.filter(isAdultOnlineP).length) // 1

// R.gt(18) reads as "greater than 18", but it means age => 18 > age
// ages :: [Number]
const ages = [10, 18, 20, 30]
console.log(R.filter(R.gt(18), ages).join(', ')) // 10
// with a named argument you can't get it wrong
console.log(ages.filter((age) => age > 18).join(', ')) // 20, 30`}},{type:"text",ru:"Вторая цена — отладка. У бесточечной функции нет тела, в него не поставить точку останова или console.log. Сам console.log в конвейер вставлять нельзя: он возвращает undefined, и следующий шаг получит его вместо данных. Выручает tap: она вызывает переданную функцию ради побочного эффекта и возвращает аргумент без изменений. Подробнее о ней — в уроке «Side effects (побочные эффекты) в композиции функций», а в Ramda есть готовая R.tap.",en:`The second cost is debugging. A point-free function has no body to put a breakpoint or a console.log in. You can't put console.log itself into the pipeline either: it returns undefined, and the next step receives that instead of the data. tap helps here: it calls the given function for its side effect and returns the argument unchanged. There is more about it in the "Side effects in function composition" lesson, and Ramda has a ready-made R.tap.`},{type:"code",code:{ru:`const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// tap :: (a -> *) -> a -> a
// вызывает fn ради побочного эффекта и возвращает x без изменений
const tap = (fn) => (x) => {
  fn(x)
  return x
}

// log :: String -> a -> a
const log = (label) => tap((value) => console.log(label + ': ' + JSON.stringify(value)))

// onlineNames :: [Object] -> String
const onlineNames = R.pipe(
  R.filter(R.propEq('online', 'status')),
  log('после filter'), // печатает промежуточный результат
  R.map(R.prop('name')),
  log('после map'),
  R.join(', '),
)

console.log(onlineNames(users))
// после filter: [{"name":"John","status":"online","age":25},{"name":"Angel","status":"online","age":16}]
// после map: ["John","Angel"]
// John, Angel`,en:`const users = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 30 },
  { name: 'Angel', status: 'online', age: 16 },
]

// tap :: (a -> *) -> a -> a
// calls fn for its side effect and returns x unchanged
const tap = (fn) => (x) => {
  fn(x)
  return x
}

// log :: String -> a -> a
const log = (label) => tap((value) => console.log(label + ': ' + JSON.stringify(value)))

// onlineNames :: [Object] -> String
const onlineNames = R.pipe(
  R.filter(R.propEq('online', 'status')),
  log('after filter'), // prints the intermediate result
  R.map(R.prop('name')),
  log('after map'),
  R.join(', '),
)

console.log(onlineNames(users))
// after filter: [{"name":"John","status":"online","age":25},{"name":"Angel","status":"online","age":16}]
// after map: ["John","Angel"]
// John, Angel`}},{type:"heading",ru:"Когда стиль не нужен",en:"When not to use it"},{type:"text",ru:"Бесточечный стиль — инструмент, а не цель. Он хорош там, где конвейер читается как перечень шагов: «оставить тех, кто в сети, взять имена». Явный аргумент лучше в таких случаях:",en:'Point-free style is a tool, not a goal. It works well where a pipeline reads as a list of steps: "keep those who are online, take their names". A named argument is better in these cases:'},{type:"list",ordered:!1,items:[{ru:"аргумент нужен в нескольких местах: (user) => user.firstName + ' ' + user.lastName проще, чем та же функция через R.converge;",en:"the argument is needed in several places: (user) => user.firstName + ' ' + user.lastName is simpler than the same function built with R.converge;"},{ru:"для бесточечной записи приходится переставлять аргументы через R.flip или заполнитель R.__;",en:"a point-free version requires reordering arguments with R.flip or the R.__ placeholder;"},{ru:"функция, которую вы передаёте без обёртки, принимает необязательные параметры или зависит от this, как parseInt и методы объектов;",en:"the function you pass without a wrapper takes optional parameters or depends on this, like parseInt and object methods;"},{ru:"имя аргумента объясняет читателю, с какими данными работает функция.",en:"the argument's name tells the reader what data the function works with."}]},{type:"text",ru:"Практическое правило: собирайте конвейер из готовых функций без «точек», а если для этого понадобились flip, converge или заполнители, назовите аргумент.",en:'A practical rule: build a pipeline out of ready-made functions without "points", and if that takes flip, converge or placeholders, name the argument.'}],summary:[{ru:"Бесточечный стиль определяет функцию без упоминания её аргументов: она собирается из других функций через композицию и каррирование, например R.pipe(R.filter(isOnline), R.map(R.prop('name'))).",en:"Point-free style defines a function without mentioning its arguments: it is assembled from other functions through composition and currying, for example R.pipe(R.filter(isOnline), R.map(R.prop('name')))."},{ru:"Обёртку (x) => f(x) можно заменить на f, только если f не примет лишних аргументов: ['1', '2', '3'].map(parseInt) даёт [1, NaN, NaN], потому что map передаёт ещё индекс и массив.",en:"The wrapper (x) => f(x) can be replaced with f only if f won't take extra arguments: ['1', '2', '3'].map(parseInt) gives [1, NaN, NaN] because map also passes the index and the array."},{ru:"Ловушку обходят через Number, явную стрелку с основанием, R.map, который передаёт только элемент, или R.unary.",en:"The trap is avoided with Number, an explicit arrow function with a radix, R.map, which passes only the element, or R.unary."},{ru:"Бесточечный конвейер отлаживают через tap: она выполняет побочный эффект и возвращает аргумент без изменений.",en:"A point-free pipeline is debugged with tap: it performs a side effect and returns the argument unchanged."},{ru:"Если для бесточечной записи нужны flip, converge или заполнители либо имя аргумента что-то объясняет, явный аргумент читается лучше.",en:"If a point-free version needs flip, converge or placeholders, or the argument's name explains something, a named argument reads better."}],exercises:[{task:{ru:"Перепишите функции getTitleP, isInStockP, toUpperP и availableTitlesP в бесточечном стиле: getTitle, isInStock, toUpper и availableTitles не должны упоминать свои аргументы. Пригодятся R.prop, R.propEq (сначала значение, потом ключ), R.toUpper, R.filter, R.map и R.pipe. Выведите результат обеих версий и убедитесь, что он совпадает.",en:"Rewrite getTitleP, isInStockP, toUpperP and availableTitlesP in point-free style: getTitle, isInStock, toUpper and availableTitles must not mention their arguments. R.prop, R.propEq (value first, then key), R.toUpper, R.filter, R.map and R.pipe will come in handy. Print the result of both versions and make sure it is the same."},starter:{ru:`const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// версии с «точками»
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// ваш код: getTitle, isInStock, toUpper, availableTitles

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`,en:`const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// versions with "points"
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// your code: getTitle, isInStock, toUpper, availableTitles

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`},solution:{ru:`const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// версии с «точками»
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// getTitle :: Object -> String
const getTitle = R.prop('title')
// isInStock :: Object -> Boolean
const isInStock = R.propEq(true, 'inStock')
// метод строки без обёртки не передать: у Ramda есть функция-аналог
// toUpper :: String -> String
const toUpper = R.toUpper
// availableTitles :: [Object] -> [String]
// для каждого товара два шага подряд — это тоже конвейер
const availableTitles = R.pipe(R.filter(isInStock), R.map(R.pipe(getTitle, toUpper)))

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`,en:`const products = [
  { title: 'Book', price: 400, inStock: true },
  { title: 'Pen', price: 50, inStock: false },
  { title: 'Lamp', price: 1200, inStock: true },
  { title: 'Mug', price: 300, inStock: true },
]

// versions with "points"
// getTitleP :: Object -> String
const getTitleP = (product) => product.title
// isInStockP :: Object -> Boolean
const isInStockP = (product) => product.inStock === true
// toUpperP :: String -> String
const toUpperP = (str) => str.toUpperCase()
// availableTitlesP :: [Object] -> [String]
const availableTitlesP = (list) => list.filter((product) => isInStockP(product)).map((product) => toUpperP(getTitleP(product)))

// getTitle :: Object -> String
const getTitle = R.prop('title')
// isInStock :: Object -> Boolean
const isInStock = R.propEq(true, 'inStock')
// a string method can't be passed without a wrapper: Ramda has a matching function
// toUpper :: String -> String
const toUpper = R.toUpper
// availableTitles :: [Object] -> [String]
// two steps in a row for each product are a pipeline too
const availableTitles = R.pipe(R.filter(isInStock), R.map(R.pipe(getTitle, toUpper)))

console.log(availableTitlesP(products).join(', '))
console.log(availableTitles(products).join(', '))`},expected:{ru:`BOOK, LAMP, MUG
BOOK, LAMP, MUG`,en:`BOOK, LAMP, MUG
BOOK, LAMP, MUG`}},{task:{ru:"Функция sumCsv должна складывать числа из строки '10,20,30' и печатать 60, а печатает NaN. В заготовке есть tap и логгер log. Соберите отладочную версию sumCsvDebug: тот же конвейер с log после каждого шага. Найдите шаг, на котором портятся данные, объясните причину и исправьте sumCsv так, чтобы она осталась бесточечной. Выведите результат sumCsvDebug('10,20,30'), затем исправленной sumCsv.",en:"sumCsv should add up the numbers in the string '10,20,30' and print 60, but it prints NaN. The starter has tap and a log helper. Build a debug version sumCsvDebug: the same pipeline with log after each step. Find the step where the data goes wrong, explain why, and fix sumCsv so that it stays point-free. Print the result of sumCsvDebug('10,20,30'), then that of the fixed sumCsv."},starter:{ru:`// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString показывает NaN, а JSON.stringify превратил бы его в null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map в духе урока «Каррирование»: передаёт fn в метод массива как есть
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(parseInt), sum)

// ваш код: sumCsvDebug и исправленная sumCsv

console.log(sumCsv('10,20,30'))`,en:`// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString shows NaN, while JSON.stringify would turn it into null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map in the spirit of the "Currying" lesson: passes fn to the array method as is
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(parseInt), sum)

// your code: sumCsvDebug and the fixed sumCsv

console.log(sumCsv('10,20,30'))`},solution:{ru:`// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString показывает NaN, а JSON.stringify превратил бы его в null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map в духе урока «Каррирование»: передаёт fn в метод массива как есть
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// отладочная версия: тот же конвейер, после каждого шага log
const sumCsvDebug = R.pipe(split(','), log('split'), map(parseInt), log('map'), sum)
console.log(sumCsvDebug('10,20,30'))

// после map данные испорчены: метод массива передаёт parseInt ещё и индекс,
// он становится основанием: parseInt('20', 1) и parseInt('30', 2) дают NaN
// Number использует только первый аргумент, и конвейер остаётся бесточечным
// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(Number), sum)

console.log(sumCsv('10,20,30'))`,en:`// tap :: (a -> *) -> a -> a
const tap = (fn) => (x) => {
  fn(x)
  return x
}
// log :: String -> a -> a
// R.toString shows NaN, while JSON.stringify would turn it into null
const log = (label) => tap((value) => console.log(label + ': ' + R.toString(value)))

// map in the spirit of the "Currying" lesson: passes fn to the array method as is
// map :: (a -> b) -> [a] -> [b]
const map = (fn) => (arr) => arr.map(fn)
// split :: String -> String -> [String]
const split = (separator) => (str) => str.split(separator)
// sum :: [Number] -> Number
const sum = (arr) => arr.reduce((acc, n) => acc + n, 0)

// the debug version: the same pipeline with log after each step
const sumCsvDebug = R.pipe(split(','), log('split'), map(parseInt), log('map'), sum)
console.log(sumCsvDebug('10,20,30'))

// the data breaks after map: the array method also passes the index to parseInt,
// and it becomes the radix: parseInt('20', 1) and parseInt('30', 2) give NaN
// Number uses only its first argument, and the pipeline stays point-free
// sumCsv :: String -> Number
const sumCsv = R.pipe(split(','), map(Number), sum)

console.log(sumCsv('10,20,30'))`},expected:{ru:`split: ["10", "20", "30"]
map: [10, NaN, NaN]
NaN
60`,en:`split: ["10", "20", "30"]
map: [10, NaN, NaN]
NaN
60`}}]},g={slug:"recursion",title:{ru:"Рекурсия",en:"Recursion"},description:{ru:"Базовый и рекурсивный случай в JavaScript, переполнение стека при глубокой рекурсии, почему на хвостовые вызовы не рассчитывают и чем помогает трамплин.",en:"Base and recursive cases in JavaScript, stack overflow in deep recursion, why not to rely on tail calls, and how a trampoline keeps the stack from growing."},goal:{ru:"Научиться писать рекурсивные функции с базовым и рекурсивным случаем и понять, почему глубокая рекурсия в JS переполняет стек и как этого избежать с помощью трамплина.",en:"Learn to write recursive functions with a base case and a recursive case, and understand why deep recursion in JS overflows the stack and how a trampoline avoids it."},blocks:[{type:"text",ru:"Рекурсия — это способность функции вызывать саму себя.",en:"Recursion is the ability of a function to call itself."},{type:"text",ru:"Рекурсия должна отвечать двум основным требованиям, чтобы она корректно работала.",en:"Recursion must meet two basic requirements in order to work correctly."},{type:"list",ordered:!0,items:[{ru:"Базовый случай. Это логика, при которой рекурсия должна прекращаться. Базовое условие, которое прекращает вызов функцией самой себя.",en:"The base case. This is the logic at which the recursion must stop — the base condition that stops the function from calling itself."},{ru:"Рекурсивный случай. Это логика, при которой функция вызывает саму себя, обычно с небольшими изменениями в аргументах.",en:"The recursive case. This is the logic in which the function calls itself, usually with small changes to the arguments."}]},{type:"text",ru:"Рекурсия часто используется в функциональном программировании.",en:"Recursion is frequently used in functional programming."},{type:"code",code:{ru:`// наша цель получить средний возраст пользователей

// ================================
// декларативный стиль без рекурсии

// список пользователей
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// pipe из урока «Композиция функций»: передаёт результат каждой функции следующей
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

// getAgeAverage :: [a] -> Number
const getAgeAverage = (users) => pipe (
  (users) => [
    users.reduce ((init, { age }) => init + age, 0),
    users.length
    ], // получаем общий возраст и количество пользователей
  ([allAges, quantity]) => Math.round (allAges / quantity), // вычисляем средний возраст
  console.log // логируем результат
) (users)

fetchAllUsers().then(getAgeAverage)
// ================================

// Рекурсивный пример
// ================================
// эта рекурсивная функция написана с хвостовым вызовом:
// сумма копится в аргументах, и в базовом случае функция
// сразу возвращает результат, без вычислений на обратном пути
// но про это мы поговорим еще позже

// а теперь то же самое сделаем с помощью рекурсии
// recurAgeAverage :: ([a], Number, Number) -> Number
const recurAgeAverage = (
    users, // массив данных пользователей
    sumAges = 0, // сумма возрастов пользователей
    quantityUsers = users.length // первичное количество пользователей
  ) => {

  // базовый случай, условие выхода
  // когда массив уже пуст
  if (!users.length) {
    // сумму всех лет пользователей делим на количество пользователей
    // чтобы посчитать средний возраст пользователей
    return sumAges / quantityUsers
  }

  // рекурсивный случай, чтобы вызывать самого себя
  // пока в массиве есть элементы
  return recurAgeAverage (
      users.slice(1), // возвращаем массив без первого элемента
      sumAges = sumAges + users[0]?.age, // собираем возраст каждого пользователя
      quantityUsers // передаем ранее сохраненное значение количество пользователей
    )
}
// ================================

// Давайте нашу функцию перепишем в одну строку и вызовем
const recurAgeAverageF = (users, sumAges = 0, quantityUsers = users.length) =>
                          !users.length
                              ? sumAges / quantityUsers
                              : recurAgeAverageF (
                                  users.slice(1),
                                  sumAges = sumAges + users[0]?.age,
                                  quantityUsers
                                )

// точка с запятой перед скобкой обязательна: без неё JS склеит
// эту скобку с выражением выше и попробует вызвать его результат
;( async () => {
  const users = await fetchAllUsers () // получаем список пользователей
  const averageAge = recurAgeAverageF (users) // получаем средний возраст рекурсивно
  console.log (averageAge) // логируем результат 25.25
}
)()`,en:`// our goal is to get the average age of the users

// ================================
// declarative style without recursion

// list of users
const fetchAllUsers = () => new Promise(resolve => resolve([
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]))

// pipe from the "Function composition" lesson: passes each function's result to the next one
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

// getAgeAverage :: [a] -> Number
const getAgeAverage = (users) => pipe (
  (users) => [
    users.reduce ((init, { age }) => init + age, 0),
    users.length
    ], // get the total age and the number of users
  ([allAges, quantity]) => Math.round (allAges / quantity), // compute the average age
  console.log // log the result
) (users)

fetchAllUsers().then(getAgeAverage)
// ================================

// Recursive example
// ================================
// this recursive function is written with a tail call:
// the sum accumulates in the arguments, and in the base case the function
// returns the result right away, with no computation on the way back
// but we'll talk about that later

// now let's do the same thing with recursion
// recurAgeAverage :: ([a], Number, Number) -> Number
const recurAgeAverage = (
    users, // array of user data
    sumAges = 0, // sum of the users' ages
    quantityUsers = users.length // initial number of users
  ) => {

  // base case, the exit condition:
  // the array is already empty
  if (!users.length) {
    // divide the sum of all ages by the number of users
    // to get the average age of the users
    return sumAges / quantityUsers
  }

  // recursive case: the function calls itself
  // while the array still has elements
  return recurAgeAverage (
      users.slice(1), // the array without its first element
      sumAges = sumAges + users[0]?.age, // add up each user's age
      quantityUsers // pass along the previously saved number of users
    )
}
// ================================

// Let's rewrite our function as a one-liner and call it
const recurAgeAverageF = (users, sumAges = 0, quantityUsers = users.length) =>
                          !users.length
                              ? sumAges / quantityUsers
                              : recurAgeAverageF (
                                  users.slice(1),
                                  sumAges = sumAges + users[0]?.age,
                                  quantityUsers
                                )

// the semicolon before the parenthesis is required: without it JS joins
// this parenthesis to the expression above and tries to call its result
;( async () => {
  const users = await fetchAllUsers () // get the list of users
  const averageAge = recurAgeAverageF (users) // get the average age recursively
  console.log (averageAge) // log the result: 25.25
}
)()`}},{type:"text",ru:"Пример выше с рекурсией, возможно, для некоторых не прост. Поэтому мы напишем пример проще и визуализируем вызовы. Главное, не волнуйтесь, если сразу вам что-то непонятно.",en:"The example above with recursion may not be simple for some. So we will write a simpler example and visualize the calls. The main thing is, don't worry if something isn't clear right away."},{type:"code",code:{ru:`// Наша цель собрать общий рейтинг пользователей
// То есть сумму рейтингов

const users = [
  { name: 'John', rating: 4.5 },
  { name: 'Angel', rating: 4 },
  { name: 'Michel', rating: 3 },
  { name: 'Anna', rating: 5 },
]

// sumRating :: [a] -> Number
const sumRating = (users) => {
  // базовый случай, условие выхода когда массив пуст
  if (!users.length) {
    return 0
  }

  // рекурсивный случай
  // рейтинг первого элемента складывается
  // с вызовом самой же функции для массива без этого элемента
  return users[0].rating + sumRating (users.slice(1))
}

// давайте сократим синтаксис
const rateSum = (users) =>
                      !users.length
                        ? 0
                        :  users[0] + rateSum (users.slice(1))

// визуализируем вызовы
// и для понимания представим массив чисел вместо ключа rating
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + rateSum ([4, 3, 5])
rateSum ([4, 3, 5]) // возвращает 4 + rateSum ([3, 5])
rateSum ([3, 5]) // возвращает 3 + rateSum ([5])
rateSum ([5]) // возвращает 5 + rateSum ([])
rateSum ([]) // возвращает 0 достигли базового случая

// и тут самое главное идут возвраты от вызовов в стеке
rateSum ([5]) // возвращает 5 + 0
rateSum ([3, 5]) // возвращает 3 + 5
rateSum ([4, 3, 5]) // возвращает 4 + 8
rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + 12
// итоговый результат 16.5`,en:`// Our goal is to get the total rating of the users,
// that is, the sum of their ratings

const users = [
  { name: 'John', rating: 4.5 },
  { name: 'Angel', rating: 4 },
  { name: 'Michel', rating: 3 },
  { name: 'Anna', rating: 5 },
]

// sumRating :: [a] -> Number
const sumRating = (users) => {
  // base case, the exit condition: the array is empty
  if (!users.length) {
    return 0
  }

  // recursive case:
  // the rating of the first element is added
  // to the call of the same function on the array without that element
  return users[0].rating + sumRating (users.slice(1))
}

// let's shorten the syntax
const rateSum = (users) =>
                      !users.length
                        ? 0
                        :  users[0] + rateSum (users.slice(1))

// let's visualize the calls
// to keep it simple, use an array of numbers instead of the rating key
rateSum ([4.5, 4, 3, 5]) // returns 4.5 + rateSum ([4, 3, 5])
rateSum ([4, 3, 5]) // returns 4 + rateSum ([3, 5])
rateSum ([3, 5]) // returns 3 + rateSum ([5])
rateSum ([5]) // returns 5 + rateSum ([])
rateSum ([]) // returns 0: we reached the base case

// and here comes the key part: the calls on the stack return one by one
rateSum ([5]) // returns 5 + 0
rateSum ([3, 5]) // returns 3 + 5
rateSum ([4, 3, 5]) // returns 4 + 8
rateSum ([4.5, 4, 3, 5]) // returns 4.5 + 12
// final result: 16.5`}},{type:"text",ru:'В примере выше у функции "rateSum" есть один существенный недостаток: каждый вызов ждёт результат следующего, чтобы прибавить к нему своё число. Поэтому глубина стека вызовов растёт вместе с длиной массива. Посмотрим, что здесь меняет хвостовая рекурсия.',en:`The "rateSum" function in the example above has one significant drawback: each call waits for the result of the next one so it can add its own number to it. So the depth of the call stack grows with the length of the array. Let's see what tail recursion changes here.`},{type:"text",ru:"Зачем нам это нужно. Пока вызов не завершился, его кадр (аргументы, локальные переменные и место, куда вернуть результат) лежит в стеке вызовов. Размер стека ограничен, поэтому на большом массиве синхронная рекурсия падает с ошибкой переполнения стека (в Chrome и Node.js — RangeError: Maximum call stack size exceeded).",en:"Why do we need this? Until a call finishes, its frame (arguments, local variables and the place to return the result to) stays on the call stack. The stack size is limited, so on a large array synchronous recursion fails with a stack overflow error (in Chrome and Node.js it is RangeError: Maximum call stack size exceeded)."},{type:"code",code:{ru:`// === Оптимизация хвостовой рекурсии ====
// Перепишем функцию так, чтобы рекурсивный вызов стал хвостовым
const rateSum = (users, result = 0) => {
  // базовый случай условие выхода когда массив пуст
  // возвращаем второй аргумент где аккумулируем
  // результаты всех вызовов
  if (!users.length) {
    return result
  }

  // рекурсивный случай пока в массиве элементы
  // при каждом вызове результат складываем во второй аргумент
  // и вызываем дальше, а в базовом случае возвращаем результат
  // вызов стоит в хвостовой позиции: после него функции больше нечего делать
  return rateSum (users.slice(1), result = result + users[0])
}

// давайте все перепишем в одну строку
const sum = (users, result = 0) => !users.length
                                ? result
                                : sum (users.slice(1), result = result + users[0])

// визуализируем вызовы
// и для понимания представим массив чисел вместо ключа rating
sum ([4.5, 4, 3, 5], 0) // возвращает sum ([4, 3, 5], 0 + 4.5)
sum ([4, 3, 5], 4.5) // возвращает sum ([3, 5], 4.5 + 4)
sum ([3, 5], 8.5) // возвращает sum ([5], 8.5 + 3)
sum ([5], 11.5) // возвращает sum ([], 11.5 + 5)
sum ([], 16.5) // возвращает result 16.5
// дальше вызовы прекращаются: результат уже в аккумуляторе,
// и на обратном пути досчитывать нечего
// вызовов столько же, сколько у rateSum без аккумулятора, — пять
// при proper tail calls движок не хранит кадры ожидающих вызовов,
// и глубина стека не растёт; но они работают только в строгом режиме,
// а из браузеров есть только в Safari: в V8 и SpiderMonkey их нет
// этот пример написан без 'use strict', поэтому его стек растёт везде,
// даже в Safari, так же, как без хвостового вызова`,en:`// === Tail recursion optimization ====
// Let's rewrite the function so that the recursive call becomes a tail call
const rateSum = (users, result = 0) => {
  // base case, the exit condition: the array is empty
  // return the second argument, where we accumulate
  // the results of all the calls
  if (!users.length) {
    return result
  }

  // recursive case, while the array has elements:
  // on each call we add to the result in the second argument
  // and keep calling, and in the base case we return the result
  // the call is in tail position: after it the function has nothing left to do
  return rateSum (users.slice(1), result = result + users[0])
}

// let's rewrite it all as a one-liner
const sum = (users, result = 0) => !users.length
                                ? result
                                : sum (users.slice(1), result = result + users[0])

// let's visualize the calls
// to keep it simple, use an array of numbers instead of the rating key
sum ([4.5, 4, 3, 5], 0) // returns sum ([4, 3, 5], 0 + 4.5)
sum ([4, 3, 5], 4.5) // returns sum ([3, 5], 4.5 + 4)
sum ([3, 5], 8.5) // returns sum ([5], 8.5 + 3)
sum ([5], 11.5) // returns sum ([], 11.5 + 5)
sum ([], 16.5) // returns result 16.5
// the calls stop here: the result is already in the accumulator,
// and there is nothing left to compute on the way back
// there are as many calls as in rateSum without the accumulator: five
// with proper tail calls the engine keeps no frames of waiting calls,
// and the stack depth does not grow; but they only work in strict mode,
// and among browsers only Safari has them: V8 and SpiderMonkey don't
// this example is written without 'use strict', so its stack grows everywhere,
// even in Safari, just as it does without a tail call`}},{type:"text",ru:"Хвостовой вызов не уменьшает число вызовов. Он позволяет движку не хранить кадр вызывающей функции: стандарт ES2015 требует этого в строгом режиме (proper tail calls), и тогда глубина стека не растёт. Из браузерных движков это реализовано только в JavaScriptCore (Safari); в V8 (Chrome, Node.js) поддержка была за флагом и удалена, в SpiderMonkey (Firefox) её нет. Поэтому в JS для глубокой рекурсии нужен трамплин. В продакшен-коде не рассчитывайте на хвостовую рекурсию, если не знаете точно, сколько будет вызовов.",en:"A tail call does not reduce the number of calls. It lets the engine drop the caller's stack frame: ES2015 requires this in strict mode (proper tail calls), and then the stack depth does not grow. Among browser engines, only JavaScriptCore (Safari) implements it; V8 (Chrome, Node.js) had it behind a flag and removed it, and SpiderMonkey (Firefox) does not have it. That is why deep recursion in JS needs a trampoline. In production code, don't rely on tail recursion unless you know exactly how many calls there will be."},{type:"text",ru:"Далее в разделе рекурсии мы будем использовать приёмы, при помощи которых можно безопасно использовать рекурсию в продакшен-коде без подсчёта количества вызовов.",en:"Further on in the recursion section we will use techniques that let you safely use recursion in production code without counting the number of calls."},{type:"text",ru:"Так как же нам освободить стек вызовов без его переполнения в продакшен-коде?",en:"So how do we free up the call stack without overflowing it in production code?"},{type:"list",ordered:!0,items:[{ru:"Сделать код асинхронным, не блокировать поток и освобождать стек",en:"Make the code asynchronous, avoid blocking the thread, and free up the stack"},{ru:"Использовать трамплин. Thunk («санка») — функция без аргументов, которая откладывает вычисление; трамплин — цикл, который вызывает thunk'и, пока результат — функция. Рекурсивные вызовы превращаются в цикл, и стек не растёт.",en:"Use a trampoline. A thunk is a function with no arguments that defers a computation; a trampoline is a loop that keeps calling thunks while the result is a function. The recursive calls turn into a loop, so the stack does not grow."}]},{type:"code",code:{ru:`// === 1. Асинхронный вызов рекурсии ====

// обратите внимание, что рекурсивный случай оборачивается в таймер
// sumD :: ([Number], Number, (Number -> *)) -> Undefined
const sumD = (users, result = 0, callback) => {

  // базовый случай условие выхода
  // когда массив уже пустой то результат пробрасываем в колбек
  if (!users.length) {
    callback (result)
    return
  }

  // рекурсивный случай вызываем асинхронно
  // через таймер чтобы стек не переполнялся
  setTimeout (
    () => sumD (users.slice(1), result = result + users[0], callback),
    0
  )
}

// давайте сократим запись
const sum = (users, result = 0, callback) =>
  !users.length
    ? callback (result)
    : setTimeout (
        () => sum (users.slice(1), result = result + users[0], callback),
        0
      )

// попробуем вызвать
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // 16.5

// визуализируем вызовы
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // запланирует через таймер sum ([4, 3, 5], 0 + 4.5, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([4, 3, 5], 4.5, (total) => console.log(total)) // запланирует через таймер sum ([3, 5], 4.5 + 4, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([3, 5], 8.5, (total) => console.log(total)) // запланирует через таймер sum ([5], 8.5 + 3, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([5], 11.5, (total) => console.log(total)) // запланирует через таймер sum ([], 11.5 + 5, callback)
// стек вызовов свободен: между шагами выполняются микрозадачи (промисы) и другие макрозадачи
// отсутствует блокировка потока
// отсутствует переполнение стека
sum ([], 16.5, (total) => console.log(total)) // вызовет callback с result

// Минусы этого подхода
// Скорость выполнения (производительность) низкая
// Если вам нужны длительные синхронные вычисления,
// то лучше вынести их в веб-воркер, чтобы не блокировать основной поток;
// на многоядерном процессоре расчёт к тому же пойдёт параллельно`,en:`// === 1. Asynchronous recursive call ====

// note that the recursive case is wrapped in a timer
// sumD :: ([Number], Number, (Number -> *)) -> Undefined
const sumD = (users, result = 0, callback) => {

  // base case, the exit condition:
  // once the array is empty, pass the result to the callback
  if (!users.length) {
    callback (result)
    return
  }

  // the recursive case is called asynchronously,
  // through a timer, so that the stack does not overflow
  setTimeout (
    () => sumD (users.slice(1), result = result + users[0], callback),
    0
  )
}

// let's shorten it
const sum = (users, result = 0, callback) =>
  !users.length
    ? callback (result)
    : setTimeout (
        () => sum (users.slice(1), result = result + users[0], callback),
        0
      )

// let's try calling it
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // 16.5

// let's visualize the calls
sum ([4.5, 4, 3, 5], 0, (total) => console.log(total)) // schedules sum ([4, 3, 5], 0 + 4.5, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([4, 3, 5], 4.5, (total) => console.log(total)) // schedules sum ([3, 5], 4.5 + 4, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([3, 5], 8.5, (total) => console.log(total)) // schedules sum ([5], 8.5 + 3, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([5], 11.5, (total) => console.log(total)) // schedules sum ([], 11.5 + 5, callback) via a timer
// the call stack is free: microtasks (promises) and other macrotasks run between the steps
// the thread is not blocked
// the stack does not overflow
sum ([], 16.5, (total) => console.log(total)) // calls callback with result

// Downsides of this approach
// Execution speed (performance) is low
// If you need long-running synchronous computations,
// it's better to move them to a web worker so they don't block the main thread;
// on a multi-core CPU the computation will also run in parallel`}},{type:"text",ru:"Разберём логику использования трамплина, чтобы избежать переполнения стека. Трамплин работает синхронно, в отличие от вызова через таймер.",en:"Let's examine the logic of using a trampoline to avoid stack overflow. The trampoline works synchronously, unlike a call through a timer."},{type:"text",ru:"Рассмотрим основные принципы трамплина.",en:"Let's look at the main principles of the trampoline."},{type:"list",ordered:!0,items:[{ru:"Трамплин — это функция-обёртка, которая придаёт нашей основной функции особенное поведение.",en:"A trampoline is a wrapper function that gives our main function special behavior."},{ru:"Функция-трамплин возвращает другую функцию, которая принимает аргументы.",en:"The trampoline function returns another function that accepts arguments."},{ru:"Внутри она один раз вызывает основную функцию с этими аргументами.",en:"Inside, it calls the main function once with these arguments."},{ru:"Пока возвращаемое значение — функция, трамплин в цикле вызывает её. Как только результат не функция, цикл останавливается и трамплин возвращает результат.",en:"While the returned value is a function, the trampoline calls it in a loop. As soon as the result is not a function, the loop stops and the trampoline returns the result."},{ru:"Основная функция в базовом случае должна возвращать результат.",en:"In the base case the main function must return a result."},{ru:"Основная функция в рекурсивном случае должна обязательно возвращать функцию без аргументов (thunk), которая делает следующий шаг.",en:"In the recursive case the main function must return a function with no arguments (a thunk) that performs the next step."}]},{type:"code",code:{ru:`// === Рекурсия через трамплин ====

// обратите внимание: первым вызовом передаём функцию,
// а вторым — её аргументы, и тогда запускается вычисление
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  // запускаем функцию с переданными аргументами
  let result = fn(...args)

  // крутим цикл, пока функция
  // возвращает другую функцию
  while (typeof result == 'function') {
    // результат вызова сохраняем в переменную
    // и проверяем что оно вернуло
    // result() *** запомните эту метку, дальше покажем, что это за функция
    result = result()
  }

  // как только результат вызова функции
  // не функция то возвращаем его
  return result
}

// давайте сократим запись
// sumD :: ([Number], Number) -> (Number | (() -> *))
const sumD = (users, result = 0) => {

  // если массив пустой то возвращаем результат
  if (!users.length) {
    return result
  }

  // внимание: тут обязательно возвращаем функцию без аргументов (thunk)
  // метка *** именно её трамплин вызывает внутри цикла
  return () => sumD (users.slice(1), result = result + users[0])
}

// давайте перепишем в одну строку функцию
// sum :: ([Number], Number) -> (Number | (() -> *))
const sum = (users, result = 0) =>
      !users.length
       ? result
       : () => sum (users.slice(1), result = result + users[0])

// протестируем код

// пропускаем нашу функцию через трамплин
const sumTrampoline = trampoline (sum)

// теперь на самом деле в цикле будут запускаться функции
console.log (sumTrampoline ([4.5, 4, 3, 5], 0)) // 16.5`,en:`// === Recursion via a trampoline ====

// note: the first call takes the function,
// and the second takes its arguments, which starts the computation
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  // run the function with the given arguments
  let result = fn(...args)

  // keep looping while the function
  // returns another function
  while (typeof result == 'function') {
    // store the result of the call in the variable
    // and check what it returned
    // result() *** remember this mark, we'll show later what this function is
    result = result()
  }

  // as soon as the result of the call
  // is not a function, return it
  return result
}

// let's shorten the notation
// sumD :: ([Number], Number) -> (Number | (() -> *))
const sumD = (users, result = 0) => {

  // if the array is empty, return the result
  if (!users.length) {
    return result
  }

  // note: here we must return a function with no arguments (a thunk)
  // mark *** this is the function the trampoline calls inside the loop
  return () => sumD (users.slice(1), result = result + users[0])
}

// let's rewrite the function as a one-liner
// sum :: ([Number], Number) -> (Number | (() -> *))
const sum = (users, result = 0) =>
      !users.length
       ? result
       : () => sum (users.slice(1), result = result + users[0])

// let's test the code

// pass our function through the trampoline
const sumTrampoline = trampoline (sum)

// now the functions will actually run in a loop
console.log (sumTrampoline ([4.5, 4, 3, 5], 0)) // 16.5`}},{type:"code",pseudo:!0,code:{ru:`// давайте теперь визуализируем вызовы
// логика внутри трамплина для sumTrampoline ([4.5, 4, 3, 5], 0)

//  === первый вызов, до цикла =====
let result = sum ([4.5, 4, 3, 5], 0)
// вернет в result () => sum ([4, 3, 5], 0 + 4.5)
// =======================

//  === цикл while: каждая итерация вызывает одну функцию =====
result = result () // вызывает sum ([4, 3, 5], 4.5)
// вернет в result () => sum ([3, 5], 4.5 + 4)

result = result () // вызывает sum ([3, 5], 8.5)
// вернет в result () => sum ([5], 8.5 + 3)

result = result () // вызывает sum ([5], 11.5)
// вернет в result () => sum ([], 11.5 + 5)

result = result () // вызывает sum ([], 16.5)
// вернет в result 16.5, это уже не функция, и цикл завершается
// =======================

//  === выход из трамплина =====
return result // 16.5
// =======================


// визуализация через схему
// это как связный список функций, который заранее не готов,
// а формируется в процессе: следующий элемент появляется,
// когда вызывают предыдущий
[
  sum ([4.5, 4, 3, 5], 0), // первый вызов let result = fn(...args)
  () => sum ([4, 3, 5], 4.5), // result = result() внутри цикла
  () => sum ([3, 5], 8.5), // result = result() внутри цикла
  () => sum ([5], 11.5), // result = result() внутри цикла
  () => sum ([], 16.5), // result = result() внутри цикла
  16.5 // цикл завершается return result
]`,en:`// now let's visualize the calls
// the logic inside the trampoline for sumTrampoline ([4.5, 4, 3, 5], 0)

//  === first call, before the loop =====
let result = sum ([4.5, 4, 3, 5], 0)
// puts () => sum ([4, 3, 5], 0 + 4.5) into result
// =======================

//  === while loop: each iteration calls one function =====
result = result () // calls sum ([4, 3, 5], 4.5)
// puts () => sum ([3, 5], 4.5 + 4) into result

result = result () // calls sum ([3, 5], 8.5)
// puts () => sum ([5], 8.5 + 3) into result

result = result () // calls sum ([5], 11.5)
// puts () => sum ([], 11.5 + 5) into result

result = result () // calls sum ([], 16.5)
// puts 16.5 into result: it is no longer a function, so the loop ends
// =======================

//  === leaving the trampoline =====
return result // 16.5
// =======================


// visualized as a diagram
// it's like a linked list of functions that isn't built in advance
// but grows as we go: the next element appears
// when the previous one is called
[
  sum ([4.5, 4, 3, 5], 0), // first call: let result = fn(...args)
  () => sum ([4, 3, 5], 4.5), // result = result() inside the loop
  () => sum ([3, 5], 8.5), // result = result() inside the loop
  () => sum ([5], 11.5), // result = result() inside the loop
  () => sum ([], 16.5), // result = result() inside the loop
  16.5 // the loop ends: return result
]`}}],summary:[{ru:"У рекурсии два обязательных случая: базовый прекращает вызовы, а рекурсивный вызывает функцию снова, обычно с небольшими изменениями в аргументах.",en:"Recursion needs two cases: the base case stops the calls, and the recursive case calls the function again, usually with small changes to the arguments."},{ru:"Пока вызов не завершился, его кадр лежит в стеке вызовов. Размер стека ограничен, поэтому на большом массиве синхронная рекурсия падает с переполнением стека.",en:"Until a call finishes, its frame stays on the call stack. The stack size is limited, so on a large array synchronous recursion fails with a stack overflow."},{ru:"Хвостовой вызов не уменьшает число вызовов. Стандарт ES2015 требует, чтобы движок не хранил кадр вызывающей функции, только в строгом режиме (proper tail calls), а из браузерных движков это реализовано только в JavaScriptCore (Safari). Поэтому в продакшен-коде на хвостовую рекурсию не рассчитывают, если не знают точно, сколько будет вызовов.",en:"A tail call does not reduce the number of calls. ES2015 requires the engine to drop the caller's stack frame only in strict mode (proper tail calls), and among browser engines only JavaScriptCore (Safari) implements it. So production code should not rely on tail recursion unless you know exactly how many calls there will be."},{ru:"Стек можно освобождать, вызывая рекурсивный шаг асинхронно через таймер: поток не блокируется, но такой код работает медленно.",en:"You can free the stack by running the recursive step asynchronously through a timer: the thread is not blocked, but such code is slow."},{ru:"Трамплин работает синхронно: в рекурсивном случае функция возвращает thunk — функцию без аргументов со следующим шагом, а трамплин вызывает такие функции в цикле, пока результат — функция. Стек при этом не растёт.",en:"A trampoline works synchronously: in the recursive case the function returns a thunk, a function with no arguments holding the next step, and the trampoline calls these functions in a loop while the result is a function. The stack does not grow."}],exercises:[{task:{ru:"Напишите рекурсивную функцию flatten, которая превращает массив с вложенными массивами любой глубины в плоский массив, не используя встроенный метод flat. Сначала определите базовый случай, затем рекурсивный: что делать, если первый элемент сам массив, и что — если нет.",en:"Write a recursive function flatten that turns an array with nested arrays of any depth into a flat array, without using the built-in flat method. Define the base case first, then the recursive case: what to do when the first element is itself an array, and what to do when it is not."},starter:{ru:`// flatten :: [*] -> [*]
const flatten = (arr) => {
  // ваш код
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`,en:`// flatten :: [*] -> [*]
const flatten = (arr) => {
  // your code
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`},solution:{ru:`// flatten :: [*] -> [*]
const flatten = (arr) => {
  // базовый случай: пустой массив разворачивать нечего
  if (!arr.length) {
    return []
  }

  const [head, ...tail] = arr

  // рекурсивный случай: вложенный массив разворачиваем той же функцией,
  // обычное значение оставляем как есть, а хвост обрабатываем дальше
  return Array.isArray(head)
    ? [...flatten(head), ...flatten(tail)]
    : [head, ...flatten(tail)]
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`,en:`// flatten :: [*] -> [*]
const flatten = (arr) => {
  // base case: an empty array has nothing to flatten
  if (!arr.length) {
    return []
  }

  const [head, ...tail] = arr

  // recursive case: flatten a nested array with the same function,
  // keep a plain value as is, and go on with the tail
  return Array.isArray(head)
    ? [...flatten(head), ...flatten(tail)]
    : [head, ...flatten(tail)]
}

console.log(flatten([1, [2, [3, [4]], 5], [[6]]]))
console.log(flatten([]))`},expected:{ru:`[
  1,
  2,
  3,
  4,
  5,
  6
]
[]`,en:`[
  1,
  2,
  3,
  4,
  5,
  6
]
[]`}},{task:{ru:"Функция sumTo складывает числа от 1 до n обычной рекурсией, и sumTo(100000) в Chrome и Node.js падает с RangeError: Maximum call stack size exceeded. Перепишите её для трамплина из урока: сумму копите в аккумуляторе, а в рекурсивном случае возвращайте thunk со следующим шагом. Проверьте результат на 10 и на 100 000.",en:"The sumTo function adds up the numbers from 1 to n with plain recursion, and sumTo(100000) fails in Chrome and Node.js with RangeError: Maximum call stack size exceeded. Rewrite it for the trampoline from the lesson: keep the sum in an accumulator, and in the recursive case return a thunk with the next step. Check the result for 10 and for 100,000."},starter:{ru:`// трамплин из урока
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// обычная рекурсия: каждый вызов ждёт результат следующего
// sumTo :: Number -> Number
const sumTo = (n) => n === 0 ? 0 : n + sumTo(n - 1)

// sumToStep возвращает либо сумму, либо thunk со следующим шагом
// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) => {
  // ваш код
}

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`,en:`// the trampoline from the lesson
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// plain recursion: each call waits for the result of the next one
// sumTo :: Number -> Number
const sumTo = (n) => n === 0 ? 0 : n + sumTo(n - 1)

// sumToStep returns either the sum or a thunk with the next step
// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) => {
  // your code
}

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`},solution:{ru:`// трамплин из урока
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) =>
  n === 0
    ? acc // базовый случай: сумма уже в аккумуляторе
    : () => sumToStep(n - 1, acc + n) // рекурсивный случай: thunk со следующим шагом

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`,en:`// the trampoline from the lesson
// trampoline :: ((...args -> *) -> (...args -> *))
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// sumToStep :: (Number, Number) -> (Number | (() -> *))
const sumToStep = (n, acc = 0) =>
  n === 0
    ? acc // base case: the sum is already in the accumulator
    : () => sumToStep(n - 1, acc + n) // recursive case: a thunk with the next step

// sumToSafe :: Number -> Number
const sumToSafe = trampoline(sumToStep)

console.log(sumToSafe(10))
console.log(sumToSafe(100000))`},expected:{ru:`55
5000050000`,en:`55
5000050000`}}]},b={slug:"performance",title:{ru:"Производительность (Performance — Перфоманс)",en:"Performance"},description:{ru:"Откуда разница в производительности между функциональным JavaScript и циклом for, почему один замер ничего не доказывает и когда нужен императивный код.",en:"Where the performance gap between functional JavaScript and a for loop comes from, why one measurement proves nothing, and when imperative code is worth it."},goal:{ru:"Понять, откуда берётся разница в скорости между функциональным и императивным кодом, почему один замер ничего не доказывает и когда стоит переходить на низкоуровневые императивные инструменты.",en:"Understand where the speed difference between functional and imperative code comes from, why a single measurement proves nothing, and when it is worth switching to low-level imperative tools."},blocks:[{type:"text",ru:"Следует отметить, что в микробенчмарках императивный цикл бывает в разы быстрее, но в абсолютных числах разница обычно незначительна. Иногда функциональный код может показывать даже те же или лучшие результаты благодаря оптимизациям движка JavaScript. Если на одной чаше весов удобство сопровождения кода, надёжность кода, правильная архитектура, то безусловно лучше выбирать функциональный код.",en:"It is worth noting that in microbenchmarks an imperative loop can be several times faster, but in absolute terms the difference is usually negligible. Sometimes functional code can even show the same or better results thanks to optimizations in the JavaScript engine. If maintainability, reliability, and a sound architecture are on one side of the scales, then functional code is undoubtedly the better choice."},{type:"text",ru:"За улучшение скорости работы функционального кода в первую очередь отвечают разработчики движков JavaScript. То есть разработчики движков проводят улучшения, оптимизации компилятора, сборщика мусора.",en:"Improving the speed of functional code is primarily the responsibility of the developers of JavaScript engines. That is, engine developers carry out improvements and optimizations of the compiler and the garbage collector."},{type:"text",ru:"Каждая абстракция создаёт дополнительный небольшой расход ресурсов, зачастую он не критичен.",en:"Every abstraction introduces a small additional resource cost, which is often not critical."},{type:"text",ru:"В проектах, где критически важна скорость и количество элементов достигает нескольких десятков тысяч и даже сотен тысяч при синхронном выполнении кода, и мы не можем создать отдельный поток в силу отсутствия мощностей железа, а именно свободного ядра процессора, мы можем прибегнуть к низкоуровневым императивным инструментам.",en:"In projects where speed is critical and the number of elements reaches several tens of thousands or even hundreds of thousands during synchronous execution, and we cannot spawn a separate thread due to a lack of hardware resources — namely a free CPU core — we can resort to low-level imperative tools."},{type:"text",ru:"В 98% задач скорость работы вашего приложения скорее определяется правильной логикой построения программы, а не лишней абстракцией.",en:"In 98% of cases the performance of your application is determined more by the correct logic of how the program is built than by an extra abstraction."},{type:"code",code:{ru:`// Произведем небольшие замеры
// ===============================
// функция, которая генерирует массив чисел от 1 до числа n включительно
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// функция которая декларативно складывает числа в массиве
// sumD :: [Number] -> Number
const sumD = (arr) => arr.reduce((acc, curr) => acc + curr)

// функция которая императивно складывает числа в массиве
const sumN = (arr) => {
  let result = 0
  const length = arr.length

  for (let i = 0; i < length; i += 1) {
    result = result + arr[i]
  }

  return result
}
// ===============================

// начнем тестировать
// ===============================
// создаем данные массив из 100 000 чисел
const dataNumber = createNumberArray (100000)

// замер времени декларативного кода
// ===============================
const startT = performance.now() // стартовое время
const resultD = sumD (dataNumber) // выполняемый код
const endT = performance.now() // конечное время

// вычисление дельты и логирование
console.log('Время выполнения декларативного кода ' + (endT - startT) + ' миллисекунд. Результат: ' + resultD)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// это тестирование не особо точное
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.4274640000000005миллисекунд. Результат: 5000050000
// ===============================

// второй замер лучше запускать отдельно, а не сразу после первого

// замер времени императивного кода
// ===============================
const startI = performance.now() // стартовое время
const resultI = sumN (dataNumber) // выполняемый код
const endI = performance.now() // конечное время

// вычисление дельты и логирование
console.log('Время выполнения императивного кода ' + (endI - startI) + ' миллисекунд. Результат: ' + resultI)
// время выполнения конечно же зависит от вашего устройства и прогрева железа
// тут главное нам уловить разницу в императивном и декларативном коде
// 2.2674640000000005миллисекунд. Результат: 5000050000
// 2.380783000000008миллисекунд. Результат: 5000050000
// 2.600783000000008миллисекунд. Результат: 5000050000
// ===============================

// Времена получились близкими, и от запуска к запуску
// впереди может оказаться любой из вариантов
// В одиночном замере движок ещё не успел прогреться и оптимизировать код,
// а на время влияют сборщик мусора и фоновые задачи
// Поэтому по одному замеру выводы делать нельзя: нужны повторы`,en:`// Let's take a few small measurements
// ===============================
// a function that generates an array of numbers from 1 to n inclusive
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// a function that sums the numbers in an array declaratively
// sumD :: [Number] -> Number
const sumD = (arr) => arr.reduce((acc, curr) => acc + curr)

// a function that sums the numbers in an array imperatively
const sumN = (arr) => {
  let result = 0
  const length = arr.length

  for (let i = 0; i < length; i += 1) {
    result = result + arr[i]
  }

  return result
}
// ===============================

// let's start testing
// ===============================
// create the data: an array of 100,000 numbers
const dataNumber = createNumberArray (100000)

// timing the declarative code
// ===============================
const startT = performance.now() // start time
const resultD = sumD (dataNumber) // the code being measured
const endT = performance.now() // end time

// compute the delta and log it
console.log('Declarative code run time: ' + (endT - startT) + ' milliseconds. Result: ' + resultD)
// the run time of course depends on your device and on how warmed up the hardware is
// this test is not very precise
// the main thing here is to catch the difference between imperative and declarative code
// 2.4274640000000005 milliseconds. Result: 5000050000
// ===============================

// it's better to run the second measurement separately, not right after the first one

// timing the imperative code
// ===============================
const startI = performance.now() // start time
const resultI = sumN (dataNumber) // the code being measured
const endI = performance.now() // end time

// compute the delta and log it
console.log('Imperative code run time: ' + (endI - startI) + ' milliseconds. Result: ' + resultI)
// the run time of course depends on your device and on how warmed up the hardware is
// the main thing here is to catch the difference between imperative and declarative code
// 2.2674640000000005 milliseconds. Result: 5000050000
// 2.380783000000008 milliseconds. Result: 5000050000
// 2.600783000000008 milliseconds. Result: 5000050000
// ===============================

// The times came out close, and from run to run
// either version may come out ahead
// In a single measurement the engine hasn't warmed up and optimized the code yet,
// and the garbage collector and background tasks affect the time
// So you can't draw conclusions from one measurement: you need repetitions`}},{type:"text",ru:"Из одного такого замера вывод сделать нельзя: разница в пределах погрешности. Чтобы сравнение было честнее, функцию нужно вызвать много раз и усреднить время.",en:"A single measurement like this proves nothing: the difference is within the margin of error. For a fairer comparison, call the function many times and average the time."},{type:"text",ru:"А давайте напишем небольшую утилиту для замеров. И проведём тесты скорости выполнения.",en:"Let's write a small utility for measurements and run some execution-speed tests."},{type:"code",noRun:"previous-block",code:{ru:`// Утилита замера скорости
// createNumberArray, sumN и sumD — из предыдущего блока,
// поэтому запускайте этот блок вместе с ним
// ===============================
const benchmark = (fn) => (n = 100) => (msg = '') => {
  // итоговый средний результат
  let total = 0

  // количество итераций вызова нашей функции
  for (let i = 0; i < n; i++) {
    // стартовый замер перед началом вызова функции
    const start = performance.now()

    // вызов функции
    fn()

    // аккумулируем результат дельты конечного и стартового результата
    total += performance.now() - start
  }

  console.log(msg) // текст лога

  // далее итоговое время делим на количество вызовов
  // функции и выводим среднее арифметическое
  return total / n
}

// создаем две функции
// для работы с массивом чисел
// подготовка данных
// ======================
// массив чисел 1 - 100 000
const dataNumbers = createNumberArray (100000)

// обертка для императивной функции
// и декларативной функции
// sumWrap :: ([Number] -> Number) -> [Number] -> (() -> Number)
const sumWrap = (fn) => (arr) => () => fn(arr)

// императивная функция складывания
const sumImperative = sumWrap (sumN) (dataNumbers)

// декларативная функция складывания
const sumDeclarative = sumWrap (sumD) (dataNumbers)

// Внимание одновременно обе функции сразу не прогоняйте
// в начале запустите одну, а потом через какое-то время вторую

// замер императивной функции
const resultImperative = benchmark (sumImperative) (1000) ('замер завершён')
console.log (resultImperative) // 0.15482687300000053
// замер декларативной функции
const resultDeclarative = benchmark (sumDeclarative) (1000) ('замер завершён')
console.log (resultDeclarative) // 1.2971963320000012

// в этом замере императивный цикл оказался в несколько раз быстрее reduce
// причина в накладных расходах: reduce на каждом элементе вызывает функцию-колбэк,
// а в цикле for на каждом шаге только сравнение и сложение,
// которые движок превращает в компактный машинный код
// движки умеют частично убирать такие расходы, поэтому разница зависит
// от движка, его версии и данных: микробенчмарк — ориентир, а не закон
// в абсолютных числах в замере выше это около миллисекунды на 100 000 элементов:
// заметно в горячем коде, который выполняется много раз, а в остальном обычно нет`,en:`// Speed measurement utility
// createNumberArray, sumN and sumD come from the previous block,
// so run this block together with it
// ===============================
const benchmark = (fn) => (n = 100) => (msg = '') => {
  // running total of the measured time
  let total = 0

  // number of times we call our function
  for (let i = 0; i < n; i++) {
    // take the start time before the call
    const start = performance.now()

    // call the function
    fn()

    // add the difference between the end and start times
    total += performance.now() - start
  }

  console.log(msg) // log message

  // then divide the total time by the number of calls
  // and return the arithmetic mean
  return total / n
}

// let's create two functions
// for working with an array of numbers
// preparing the data
// ======================
// array of numbers 1 - 100,000
const dataNumbers = createNumberArray (100000)

// a wrapper for the imperative function
// and the declarative function
// sumWrap :: ([Number] -> Number) -> [Number] -> (() -> Number)
const sumWrap = (fn) => (arr) => () => fn(arr)

// imperative summing function
const sumImperative = sumWrap (sumN) (dataNumbers)

// declarative summing function
const sumDeclarative = sumWrap (sumD) (dataNumbers)

// Note: don't run both functions at the same time
// run one first, and then the second one some time later

// measuring the imperative function
const resultImperative = benchmark (sumImperative) (1000) ('measurement finished')
console.log (resultImperative) // 0.15482687300000053
// measuring the declarative function
const resultDeclarative = benchmark (sumDeclarative) (1000) ('measurement finished')
console.log (resultDeclarative) // 1.2971963320000012

// in this measurement the imperative loop turned out several times faster than reduce
// the reason is overhead: reduce calls a callback function for every element,
// while each step of the for loop is just a comparison and an addition,
// which the engine turns into compact machine code
// engines can partly remove this overhead, so the difference depends
// on the engine, its version and the data: a microbenchmark is a guide, not a law
// in absolute terms, in the measurement above it's about a millisecond per 100,000 elements:
// noticeable in hot code that runs many times, but usually not elsewhere`}}],summary:[{ru:"В микробенчмарках императивный цикл бывает в разы быстрее, но в абсолютных числах разница обычно незначительна.",en:"In microbenchmarks an imperative loop can be several times faster, but in absolute terms the difference is usually negligible."},{ru:"Каждая абстракция добавляет небольшой расход ресурсов: например, reduce на каждом элементе вызывает функцию-колбэк, а цикл for только сравнивает и складывает.",en:"Every abstraction adds a small resource cost: for example, reduce calls a callback function for every element, while a for loop only compares and adds."},{ru:"По одному замеру выводы делать нельзя: функцию нужно вызвать много раз и усреднить время.",en:"You can't draw conclusions from a single measurement: call the function many times and average the time."},{ru:"В 98% задач скорость приложения определяется скорее правильной логикой построения программы, чем лишней абстракцией.",en:"In 98% of cases the speed of an application depends more on the correct logic of how the program is built than on an extra abstraction."},{ru:"К низкоуровневым императивным инструментам прибегают, когда скорость критична, элементов десятки и сотни тысяч, а вынести расчёт в отдельный поток нельзя.",en:"Low-level imperative tools are for cases where speed is critical, there are tens or hundreds of thousands of elements, and the computation cannot be moved to a separate thread."}],exercises:[{task:{ru:"Не измеряя время, посмотрите, откуда берутся накладные расходы абстракций. В заготовке сумма квадратов чётных чисел от 1 до 1000 считается цепочкой filter, map и reduce, а обёртка counter считает вызовы колбэков. Посчитайте то же одним reduce, тоже через counter, и сравните результат и число вызовов.",en:"Without measuring time, see where the overhead of abstractions comes from. In the starter, the sum of the squares of the even numbers from 1 to 1000 is computed with a chain of filter, map and reduce, and the counter wrapper counts the callback calls. Compute the same thing with a single reduce, also through counter, and compare the result and the number of calls."},starter:{ru:`// counter считает вызовы функций, обёрнутых через wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray из урока: числа от 1 до n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

const numbers = createNumberArray(1000)

// цепочка: три прохода и два промежуточных массива
const chain = counter()
const chainResult = numbers
  .filter(chain.wrap((n) => n % 2 === 0))
  .map(chain.wrap((n) => n * n))
  .reduce(chain.wrap((acc, n) => acc + n), 0)

console.log('цепочка: ' + chainResult + ', вызовов: ' + chain.calls())

// один проход
const single = counter()
// ваш код: та же сумма одним reduce, колбэк обёрнут в single.wrap
const singleResult = 0

console.log('один reduce: ' + singleResult + ', вызовов: ' + single.calls())`,en:`// counter counts the calls of the functions wrapped with wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray from the lesson: the numbers from 1 to n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

const numbers = createNumberArray(1000)

// the chain: three passes and two intermediate arrays
const chain = counter()
const chainResult = numbers
  .filter(chain.wrap((n) => n % 2 === 0))
  .map(chain.wrap((n) => n * n))
  .reduce(chain.wrap((acc, n) => acc + n), 0)

console.log('chain: ' + chainResult + ', calls: ' + chain.calls())

// a single pass
const single = counter()
// your code: the same sum with a single reduce, its callback wrapped in single.wrap
const singleResult = 0

console.log('single reduce: ' + singleResult + ', calls: ' + single.calls())`},solution:{ru:`// counter считает вызовы функций, обёрнутых через wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray из урока: числа от 1 до n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

const numbers = createNumberArray(1000)

// цепочка: три прохода и два промежуточных массива
const chain = counter()
const chainResult = numbers
  .filter(chain.wrap((n) => n % 2 === 0))
  .map(chain.wrap((n) => n * n))
  .reduce(chain.wrap((acc, n) => acc + n), 0)

console.log('цепочка: ' + chainResult + ', вызовов: ' + chain.calls())

// один проход: проверка, квадрат и сложение в одном колбэке
const single = counter()
const singleResult = numbers.reduce(
  single.wrap((acc, n) => (n % 2 === 0 ? acc + n * n : acc)),
  0,
)

console.log('один reduce: ' + singleResult + ', вызовов: ' + single.calls())

// результат тот же, вызовов вдвое меньше и нет промежуточных массивов,
// зато цепочка читается проще; на 1000 элементах разница незаметна,
// склеивать шаги в один reduce имеет смысл в горячем коде`,en:`// counter counts the calls of the functions wrapped with wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray from the lesson: the numbers from 1 to n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

const numbers = createNumberArray(1000)

// the chain: three passes and two intermediate arrays
const chain = counter()
const chainResult = numbers
  .filter(chain.wrap((n) => n % 2 === 0))
  .map(chain.wrap((n) => n * n))
  .reduce(chain.wrap((acc, n) => acc + n), 0)

console.log('chain: ' + chainResult + ', calls: ' + chain.calls())

// a single pass: the check, the square and the addition in one callback
const single = counter()
const singleResult = numbers.reduce(
  single.wrap((acc, n) => (n % 2 === 0 ? acc + n * n : acc)),
  0,
)

console.log('single reduce: ' + singleResult + ', calls: ' + single.calls())

// the result is the same, with half the calls and no intermediate arrays,
// but the chain is easier to read; on 1000 elements the difference is invisible,
// and merging the steps into one reduce makes sense in hot code`},expected:{ru:`цепочка: 167167000, вызовов: 2000
один reduce: 167167000, вызовов: 1000`,en:`chain: 167167000, calls: 2000
single reduce: 167167000, calls: 1000`}},{task:{ru:"В уроке сказано, что скорость чаще определяет логика программы, а не лишняя абстракция. В заготовке имя покупателя для каждого из 1000 заказов ищется через users.find: для каждого заказа массив пользователей перебирается заново. Перепишите так, чтобы пользователи один раз собирались через reduce в объект по id, а имя бралось из него. Сравните число вызовов колбэков и проверьте, что результат тот же.",en:"The lesson says that speed depends more often on the program's logic than on an extra abstraction. In the starter, the customer name for each of 1000 orders is looked up with users.find, which scans the users array again for every order. Rewrite it so that the users are collected once with reduce into an object keyed by id, and the name is taken from that object. Compare the number of callback calls and check that the result is the same."},starter:{ru:`// counter считает вызовы функций, обёрнутых через wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray из урока: числа от 1 до n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// 1000 пользователей и 1000 заказов: заказ 1 сделал пользователь 1000 и так далее
const users = createNumberArray(1000).map((id) => ({ id, name: 'user' + id }))
const orders = createNumberArray(1000).map((id) => ({ id, userId: 1001 - id }))

// перебор: для каждого заказа find заново идёт по массиву пользователей
const scan = counter()
const withNamesScan = orders.map(
  scan.wrap((order) => ({
    ...order,
    userName: users.find(scan.wrap((user) => user.id === order.userId)).name,
  })),
)

console.log('перебор: ' + scan.calls() + ' вызовов')

// индекс
const index = counter()
// ваш код: usersById через reduce, затем withNamesIndex через map,
// колбэки обёрнуты в index.wrap
const withNamesIndex = []

console.log('индекс: ' + index.calls() + ' вызовов')
console.log('результаты совпадают: ' + (JSON.stringify(withNamesScan) === JSON.stringify(withNamesIndex)))`,en:`// counter counts the calls of the functions wrapped with wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray from the lesson: the numbers from 1 to n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// 1000 users and 1000 orders: order 1 was placed by user 1000, and so on
const users = createNumberArray(1000).map((id) => ({ id, name: 'user' + id }))
const orders = createNumberArray(1000).map((id) => ({ id, userId: 1001 - id }))

// scanning: for every order find walks the users array again
const scan = counter()
const withNamesScan = orders.map(
  scan.wrap((order) => ({
    ...order,
    userName: users.find(scan.wrap((user) => user.id === order.userId)).name,
  })),
)

console.log('scan: ' + scan.calls() + ' calls')

// an index
const index = counter()
// your code: usersById with reduce, then withNamesIndex with map,
// the callbacks wrapped in index.wrap
const withNamesIndex = []

console.log('index: ' + index.calls() + ' calls')
console.log('same result: ' + (JSON.stringify(withNamesScan) === JSON.stringify(withNamesIndex)))`},solution:{ru:`// counter считает вызовы функций, обёрнутых через wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray из урока: числа от 1 до n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// 1000 пользователей и 1000 заказов: заказ 1 сделал пользователь 1000 и так далее
const users = createNumberArray(1000).map((id) => ({ id, name: 'user' + id }))
const orders = createNumberArray(1000).map((id) => ({ id, userId: 1001 - id }))

// перебор: для каждого заказа find заново идёт по массиву пользователей
const scan = counter()
const withNamesScan = orders.map(
  scan.wrap((order) => ({
    ...order,
    userName: users.find(scan.wrap((user) => user.id === order.userId)).name,
  })),
)

console.log('перебор: ' + scan.calls() + ' вызовов')

// индекс: один проход reduce собирает объект, где ключ — id пользователя
const index = counter()
const usersById = users.reduce(
  index.wrap((acc, user) => {
    acc[user.id] = user
    return acc
  }),
  {},
)
const withNamesIndex = orders.map(
  index.wrap((order) => ({ ...order, userName: usersById[order.userId].name })),
)

console.log('индекс: ' + index.calls() + ' вызовов')
console.log('результаты совпадают: ' + (JSON.stringify(withNamesScan) === JSON.stringify(withNamesIndex)))

// оба варианта декларативные: разницу дала логика,
// один проход вместо перебора на каждый заказ, а не отказ от абстракций`,en:`// counter counts the calls of the functions wrapped with wrap
// counter :: () -> Object
const counter = () => {
  let calls = 0
  return {
    wrap: (fn) => (...args) => {
      calls += 1
      return fn(...args)
    },
    calls: () => calls,
  }
}

// createNumberArray from the lesson: the numbers from 1 to n
// createNumberArray :: Number -> [Number]
const createNumberArray = (n) => new Array(n).fill(1).map((_, i) => i + 1)

// 1000 users and 1000 orders: order 1 was placed by user 1000, and so on
const users = createNumberArray(1000).map((id) => ({ id, name: 'user' + id }))
const orders = createNumberArray(1000).map((id) => ({ id, userId: 1001 - id }))

// scanning: for every order find walks the users array again
const scan = counter()
const withNamesScan = orders.map(
  scan.wrap((order) => ({
    ...order,
    userName: users.find(scan.wrap((user) => user.id === order.userId)).name,
  })),
)

console.log('scan: ' + scan.calls() + ' calls')

// an index: a single reduce pass builds an object keyed by user id
const index = counter()
const usersById = users.reduce(
  index.wrap((acc, user) => {
    acc[user.id] = user
    return acc
  }),
  {},
)
const withNamesIndex = orders.map(
  index.wrap((order) => ({ ...order, userName: usersById[order.userId].name })),
)

console.log('index: ' + index.calls() + ' calls')
console.log('same result: ' + (JSON.stringify(withNamesScan) === JSON.stringify(withNamesIndex)))

// both versions are declarative: the difference comes from the logic,
// one pass instead of a scan for every order, not from dropping abstractions`},expected:{ru:`перебор: 501500 вызовов
индекс: 2000 вызовов
результаты совпадают: true`,en:`scan: 501500 calls
index: 2000 calls
same result: true`}}]},y={slug:"memoization",title:{ru:"Мемоизация",en:"Memoization"},description:{ru:"Мемоизация в JavaScript: кэш результатов чистой функции в замыкании, ключ кэша, R.memoizeWith из Ramda, числа Фибоначчи, цена памяти и инвалидация кэша.",en:"Memoization in JavaScript: caching pure function results in a closure, cache keys, Ramda's R.memoizeWith, recursive Fibonacci, memory cost and invalidation."},goal:{ru:"Понять, как мемоизация кэширует результаты чистой функции, научиться писать свою memoize и пользоваться R.memoizeWith, выбирать ключ кэша, ускорять рекурсию и учитывать цену памяти и инвалидацию.",en:"Understand how memoization caches the results of a pure function, learn to write your own memoize and use R.memoizeWith, choose a cache key, speed up recursion, and account for memory cost and invalidation."},blocks:[{type:"text",ru:"Мемоизация — это кэширование результатов функции по её аргументам. При первом вызове функция считает результат и запоминает его, а при повторном вызове с теми же аргументами возвращает сохранённое значение и не считает заново. Термин ввёл британский исследователь Дональд Мичи в 1968 году.",en:"Memoization is caching a function's results by its arguments. On the first call the function computes the result and remembers it, and on a repeated call with the same arguments it returns the stored value without computing it again. The term was coined by the British researcher Donald Michie in 1968."},{type:"text",ru:"Кэш живёт в замыкании: функция memoize возвращает обёртку, и хранилище результатов доступно только этой обёртке. Для кэша удобен Map: ключом в нём может быть любое значение, а ключи сравниваются почти как через ===, только NaN считается равным NaN.",en:"The cache lives in a closure: memoize returns a wrapper, and only that wrapper can reach the stored results. A Map is a convenient cache: any value can be a key, and keys are compared almost as with ===, except that NaN is considered equal to NaN."},{type:"code",code:{ru:`// memoize :: (a -> b) -> (a -> b)
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
console.log('вычислений: ' + calls) // вычислений: 2`,en:`// memoize :: (a -> b) -> (a -> b)
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
console.log('computations: ' + calls) // computations: 2`}},{type:"text",ru:"Мемоизировать можно только чистые функции. Кэш подменяет вызов сохранённым результатом, а это безопасно, только когда функция при одних и тех же аргументах всегда возвращает одно и то же и ничего не меняет снаружи. Если результат зависит от внешней переменной, кэш вернёт устаревшее значение. Если функция что-то записывает или отправляет, при повторных вызовах этого просто не произойдёт.",en:"Only pure functions can be memoized. The cache replaces a call with the stored result, and that is safe only when the function always returns the same thing for the same arguments and changes nothing outside. If the result depends on an outside variable, the cache returns a stale value. If the function writes or sends something, repeated calls simply won't do it."},{type:"heading",ru:"Ключ кэша",en:"The cache key"},{type:"text",ru:"Ключ решает, какие вызовы считать одинаковыми. Для одного аргумента-примитива ключом служит сам аргумент. Объекты Map сравнивает по ссылке: объект с тем же содержимым, но созданный заново, кэш не найдёт, а объект, изменённый на месте, найдёт вместе с устаревшим результатом. Поэтому мемоизация хорошо сочетается с иммутабельными данными из урока «Иммутабельность»: новое значение — новый объект и новый ключ.",en:`The key decides which calls count as the same. For a single primitive argument the argument itself is the key. A Map compares objects by reference: an object with the same contents but created anew won't be found, while an object changed in place will be found together with a stale result. That is why memoization goes well with the immutable data from the "Immutability" lesson: a new value means a new object and a new key.`},{type:"code",code:{ru:`// memoize из предыдущего примера
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
console.log(nameLength(john)) // 4, хотя в имени уже 6 букв`,en:`// memoize from the previous example
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
console.log(nameLength(john)) // 4, although the name now has 6 letters`}},{type:"text",ru:"В Ramda есть R.memoizeWith(keyFn, fn): первая функция строит ключ из аргументов, вторая считает результат. Кэш внутри — обычный объект, поэтому ключ должен быть строкой. Всё остальное приводится к строке, и любой объект превращается в один и тот же ключ «[object Object]». Если аргументов несколько, ключ собирают с разделителем: без него вызовы (1, 23) и (12, 3) дали бы одну строку «123».",en:'Ramda has R.memoizeWith(keyFn, fn): the first function builds a key from the arguments, the second computes the result. The cache inside is a plain object, so the key must be a string. Anything else is converted to a string, and every object turns into the same key "[object Object]". With several arguments, the key is built with a separator: without it the calls (1, 23) and (12, 3) would give the same string "123".'},{type:"code",code:{ru:`let calls = 0
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
console.log(getNameById({ id: 2, name: 'Anna' })) // Anna`,en:`let calls = 0
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
console.log(getNameById({ id: 2, name: 'Anna' })) // Anna`}},{type:"heading",ru:"Рекурсия: числа Фибоначчи",en:"Recursion: Fibonacci numbers"},{type:"text",ru:"Больше всего мемоизация даёт там, где функция много раз вызывается с одними и теми же аргументами. Классический пример — числа Фибоначчи: fib(n) = fib(n - 1) + fib(n - 2). Наивная рекурсия считает одни и те же значения снова и снова, и число вызовов растёт экспоненциально: для fib(20) их 21 891, для fib(30) — уже 2 692 537.",en:"Memoization pays off most where a function is called many times with the same arguments. The classic example is Fibonacci numbers: fib(n) = fib(n - 1) + fib(n - 2). Naive recursion computes the same values again and again, and the number of calls grows exponentially: 21,891 for fib(20) and already 2,692,537 for fib(30)."},{type:"text",ru:"Чтобы мемоизация сработала, рекурсивные вызовы должны идти через мемоизированную версию. Если обернуть готовую функцию снаружи, в кэш попадёт только верхний вызов, а рекурсия внутри пойдёт мимо него.",en:"For memoization to work, the recursive calls must go through the memoized version. If you wrap a finished function from the outside, only the top call gets into the cache, and the recursion inside bypasses it."},{type:"code",code:{ru:`// memoize :: (a -> b) -> (a -> b)
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
console.log('вычислений: ' + memoCalls) // вычислений: 31`,en:`// memoize :: (a -> b) -> (a -> b)
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
console.log('computations: ' + memoCalls) // computations: 31`}},{type:"heading",ru:"Цена памяти и инвалидация",en:"Memory cost and invalidation"},{type:"text",ru:"Кэш занимает память и сам не очищается. Если аргументы почти не повторяются, например это идентификаторы запросов или текст, который вводит пользователь, кэш растёт с каждым вызовом и ничего не экономит. У R.memoizeWith кэш спрятан в замыкании: ни ограничить, ни очистить его нельзя, можно только создать новую мемоизированную функцию.",en:"A cache takes memory and does not clean itself up. If the arguments hardly ever repeat, for example request IDs or text the user types, the cache grows with every call and saves nothing. R.memoizeWith hides its cache in a closure: you can neither limit nor clear it, you can only create a new memoized function."},{type:"text",ru:"Отсюда два приёма. Первый — ограничить размер. Map помнит порядок вставки, поэтому при переполнении можно удалять первую запись, а запись, к которой обратились, переставлять в конец. Получается кэш LRU (least recently used): он вытесняет то, к чему дольше всего не обращались. Второй — инвалидация. Если результат зависит от данных, которые меняются, их версию включают в ключ или сбрасывают кэш целиком. Для ключей-объектов есть WeakMap: запись в нём не мешает сборщику мусора удалить объект, когда на него больше нет других ссылок.",en:"Hence two techniques. The first is to limit the size. A Map remembers insertion order, so when it overflows you can delete the first entry, and move an entry to the end whenever it is accessed. This gives an LRU (least recently used) cache: it evicts whatever was accessed longest ago. The second is invalidation. If the result depends on data that changes, put the data version into the key or drop the whole cache. For object keys there is WeakMap: an entry in it doesn't stop the garbage collector from removing the object once nothing else refers to it."},{type:"code",code:{ru:`// memoizeLimited :: Number -> (a -> b) -> (a -> b)
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
console.log('вычислений: ' + calls + ', в кэше: ' + squareMemo.size()) // вычислений: 5, в кэше: 1`,en:`// memoizeLimited :: Number -> (a -> b) -> (a -> b)
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
console.log('computations: ' + calls + ', cached: ' + squareMemo.size()) // computations: 5, cached: 1`}},{type:"text",ru:"Мемоизация окупается, когда функция чистая, считает заметно дольше, чем строится ключ и ищется запись, и вызывается с повторяющимися аргументами. Типичные случаи — рекурсия с перекрывающимися подзадачами, разбор и форматирование одних и тех же строк, вычисление производных данных из состояния. Для дешёвых функций вроде сложения кэш только добавит работы и памяти. Как и в уроке «Производительность», выгоду проверяйте измерением, а не по одному запуску: счётчиком вычислений и попаданий в кэш или повторными замерами времени.",en:'Memoization pays off when the function is pure, takes noticeably longer than building a key and looking up an entry, and is called with repeating arguments. Typical cases are recursion with overlapping subproblems, parsing and formatting the same strings, and computing derived data from state. For cheap functions like addition a cache only adds work and memory. As in the "Performance" lesson, check the gain by measuring rather than by a single run: count computations and cache hits, or repeat time measurements.'}],summary:[{ru:"Мемоизация запоминает результат функции по её аргументам и при повторном вызове с теми же аргументами возвращает его из кэша, который живёт в замыкании.",en:"Memoization remembers a function's result by its arguments and, on a repeated call with the same arguments, returns it from a cache that lives in a closure."},{ru:"Мемоизировать можно только чистые функции: иначе кэш вернёт устаревший результат или пропустит побочный эффект.",en:"Only pure functions can be memoized: otherwise the cache returns a stale result or skips a side effect."},{ru:"Ключ кэша решает, какие вызовы одинаковы: Map сравнивает объекты по ссылке, R.memoizeWith(keyFn, fn) ждёт ключ-строку, а для нескольких аргументов ключ собирают с разделителем.",en:"The cache key decides which calls are the same: a Map compares objects by reference, R.memoizeWith(keyFn, fn) expects a string key, and for several arguments the key is built with a separator."},{ru:"В рекурсии вызовы должны идти через мемоизированную функцию: fib(20) без кэша делает 21 891 вызов, а с кэшем считает 21 значение.",en:"In recursion the calls must go through the memoized function: fib(20) without a cache makes 21,891 calls, and with a cache it computes 21 values."},{ru:"Кэш стоит памяти и сам не очищается: размер ограничивают вытеснением старых записей, а при изменении внешних данных кэш сбрасывают или включают версию данных в ключ.",en:"A cache costs memory and doesn't clean itself up: its size is limited by evicting old entries, and when outside data changes the cache is dropped or the data version is put into the key."}],exercises:[{task:{ru:"Функция paths(rows, cols) считает, сколькими путями можно пройти из левого верхнего угла сетки в правый нижний, если двигаться только вправо или вниз. Наивная рекурсия для сетки 10 на 10 делает сотни тысяч вызовов. Напишите pathsMemo через R.memoizeWith: рекурсивные вызовы должны идти через кэш, а ключ — различать пары аргументов. Сравните число вызовов и вычислений.",en:"paths(rows, cols) counts how many paths lead from the top-left corner of a grid to the bottom-right one if you can only move right or down. Naive recursion makes hundreds of thousands of calls for a 10 by 10 grid. Write pathsMemo with R.memoizeWith: the recursive calls must go through the cache, and the key must tell pairs of arguments apart. Compare the number of calls and computations."},starter:{ru:`let naiveCalls = 0
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
console.log('с кэшем, вычислений: ' + memoCalls)`,en:`let naiveCalls = 0
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
console.log('with a cache, computations: ' + memoCalls)`},solution:{ru:`let naiveCalls = 0
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
console.log('с кэшем, вычислений: ' + memoCalls)`,en:`let naiveCalls = 0
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
console.log('with a cache, computations: ' + memoCalls)`},expected:{ru:`184756
без кэша, вызовов: 369511
184756
с кэшем, вычислений: 120`,en:`184756
without a cache, calls: 369511
184756
with a cache, computations: 120`}},{task:{ru:"Функция priceWithTax берёт ставку налога в процентах из внешней переменной taxPercent, поэтому мемоизированная версия после смены ставки возвращает старые цены. Сделайте функцию чистой: ставка должна приходить аргументом. Мемоизируйте её через R.memoizeWith так, чтобы ставка входила в ключ. Вызовите priceMemo для цены 100 дважды при ставке 20% и один раз при 10%, выведите все три цены, а затем число вычислений: его считает calls из заготовки.",en:"priceWithTax takes the tax rate in percent from the outside variable taxPercent, so the memoized version returns old prices after the rate changes. Make the function pure: the rate must come in as an argument. Memoize it with R.memoizeWith so that the rate is part of the key. Call priceMemo for the price 100 twice at a 20% rate and once at 10%, print all three prices and then the number of computations, which the calls counter from the starter keeps."},starter:{ru:`// memoize для функций одного аргумента
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

// ваш код`,en:`// memoize for functions of one argument
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

// your code`},solution:{ru:`// счётчик показывает, сколько раз функция действительно считала;
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
console.log('вычислений: ' + calls)`,en:`// the counter shows how many times the function actually computed;
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
console.log('computations: ' + calls)`},expected:{ru:`120
120
110
вычислений: 2`,en:`120
120
110
computations: 2`}}]},w={slug:"transducers",title:{ru:"Трансдьюсеры",en:"Transducers"},description:{ru:"Трансдьюсеры в JavaScript: цепочка map и filter без промежуточных массивов, редьюсер и его трансформер, порядок шагов в R.compose, R.transduce и R.into.",en:"Transducers in JavaScript: map and filter without intermediate arrays, reducers and reducer transformers, step order in R.compose, R.transduce and R.into."},goal:{ru:"Понять, почему цепочка map и filter создаёт промежуточные массивы, научиться писать трансдьюсеры как трансформеры редьюсера, композировать их через compose, пользоваться R.transduce и R.into и оценивать, когда это окупается.",en:"Understand why a map and filter chain creates intermediate arrays, learn to write transducers as reducer transformers, compose them with compose, use R.transduce and R.into, and judge when it pays off."},blocks:[{type:"text",ru:"Цепочка map и filter читается хорошо, но у неё есть цена. Каждый шаг проходит весь массив и создаёт новый. В filter(isEven), map(square), filter(isBig) три прохода и три новых массива, причём два из них промежуточные: они нужны только как вход для следующего шага. В уроке «Производительность» мы уже считали такие накладные расходы вызовами колбэков, теперь посчитаем и массивы.",en:`A map and filter chain reads well, but it has a cost. Each step walks the whole array and creates a new one. filter(isEven), map(square), filter(isBig) means three passes and three new arrays, two of them intermediate: they are needed only as input for the next step. In the "Performance" lesson we already counted this overhead in callback calls; now let's count the arrays too.`},{type:"code",code:{ru:`// счётчики: сколько массивов создано и сколько раз вызваны шаги
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
console.log('массивов: ' + stats.arrays + ', вызовов: ' + stats.calls) // массивов: 3, вызовов: 2000`,en:`// counters: how many arrays were created and how many times the steps were called
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
console.log('arrays: ' + stats.arrays + ', calls: ' + stats.calls) // arrays: 3, calls: 2000`}},{type:"text",ru:"Можно склеить все шаги в один reduce, как в упражнении урока «Производительность», но тогда они сольются в один колбэк и перестанут быть отдельными функциями. Трансдьюсеры дают и то и другое: шаги остаются отдельными и композируемыми, а данные проходят через них за один проход, без промежуточных массивов. Идея пришла из языка Clojure, где трансдьюсеры предложил Рич Хикки в 2014 году.",en:'You could merge all the steps into a single reduce, as in the exercise of the "Performance" lesson, but then they would fuse into one callback and stop being separate functions. Transducers give you both: the steps stay separate and composable, and the data goes through them in a single pass, with no intermediate arrays. The idea comes from Clojure, where Rich Hickey proposed transducers in 2014.'},{type:"heading",ru:"Редьюсер и трансформер редьюсера",en:"A reducer and a reducer transformer"},{type:"text",ru:"Редьюсер — функция, которую принимает reduce: (acc, x) => newAcc. Она получает накопленное значение и очередной элемент и возвращает новое накопленное значение. Сумма — редьюсер, добавление элемента в конец массива — тоже редьюсер.",en:"A reducer is the function that reduce takes: (acc, x) => newAcc. It receives the accumulated value and the next element and returns the new accumulated value. Summing is a reducer, and so is appending an element to an array."},{type:"text",ru:"Трансдьюсер — это трансформер редьюсера: функция, которая принимает редьюсер и возвращает новый редьюсер. mapping(f) делает из редьюсера такой, который сначала применяет f к элементу, а filtering(pred) — такой, который пропускает к исходному редьюсеру только подходящие элементы. Ни один из них не знает, что делает редьюсер: копит массив, считает сумму или собирает строку.",en:"A transducer is a reducer transformer: a function that takes a reducer and returns a new reducer. mapping(f) turns a reducer into one that applies f to the element first, and filtering(pred) turns it into one that lets only matching elements through to the original reducer. Neither of them knows what the reducer does: collects an array, computes a sum or builds a string."},{type:"code",code:{ru:`// === редьюсеры: (acc, x) -> acc ===
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
console.log([1, 2, 3, 4, 5, 6].reduce(evenSquaresSum, 0)) // 56`,en:`// === reducers: (acc, x) -> acc ===
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
console.log([1, 2, 3, 4, 5, 6].reduce(evenSquaresSum, 0)) // 56`}},{type:"heading",ru:"Композиция трансдьюсеров",en:"Composing transducers"},{type:"text",ru:"Трансдьюсер — функция одного аргумента, поэтому трансдьюсеры композируются через compose. Порядок записи здесь непривычный: в compose(filtering(isEven), mapping(square)) элементы сначала фильтруются и только потом возводятся в квадрат. Шаги выполняются слева направо, как в pipe.",en:"A transducer is a function of one argument, so transducers compose with compose. The order of writing is unusual here: in compose(filtering(isEven), mapping(square)) the elements are filtered first and only then squared. The steps run left to right, as in pipe."},{type:"text",ru:"Почему так. compose действительно применяет функции справа налево, но применяет их к редьюсеру, а не к данным. Сначала mapping(square) оборачивает конечный редьюсер, затем filtering(isEven) оборачивает то, что получилось. Самая левая обёртка оказывается внешней, и каждый элемент первым попадает именно в неё. Обёртки строятся справа налево, а данные проходят через них слева направо.",en:"Here is why. compose does apply functions right to left, but it applies them to the reducer, not to the data. First mapping(square) wraps the final reducer, then filtering(isEven) wraps the result. The leftmost wrapper ends up outermost, and every element reaches it first. The wrappers are built right to left, and the data goes through them left to right."},{type:"code",code:{ru:`// compose :: ((y -> z), ..., (a -> b)) -> a -> z
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
console.log('массивов: ' + stats.arrays + ', вызовов: ' + stats.calls) // массивов: 1, вызовов: 2000`,en:`// compose :: ((y -> z), ..., (a -> b)) -> a -> z
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
console.log('arrays: ' + stats.arrays + ', calls: ' + stats.calls) // arrays: 1, calls: 2000`}},{type:"heading",ru:"Трансдьюсеры в Ramda",en:"Transducers in Ramda"},{type:"text",ru:"В Ramda map, filter, take и ряд других функций списков работают как трансдьюсеры, если вызвать их без данных и передать результат в R.transduce или R.into. R.transduce(xform, reducer, init, list) — свёртка, как наша transduce: редьюсер и начальное значение задаёте вы. R.into(acc, xform, list) выбирает редьюсер по первому аргументу: в массив элементы добавляются, к строке приписываются, а в объект копируются их свойства или пары [ключ, значение]. При этом в Ramda 0.32 от первого аргумента берётся только тип, а его содержимое в результат не попадает: R.into([1, 2], R.map(R.inc), [3]) вернёт [4], а не [1, 2, 4]. Поэтому передавайте пустое значение: [], '' или {}. В документации Ramda трансформером называют объект с методами @@transducer/init, @@transducer/step и @@transducer/result, а трансдьюсером — функцию, которая принимает такой трансформер и возвращает новый. Идея та же, только вместо функции-редьюсера объект.",en:"In Ramda, map, filter, take and a number of other list functions work as transducers if you call them without data and pass the result to R.transduce or R.into. R.transduce(xform, reducer, init, list) is a fold like our transduce: you supply the reducer and the initial value. R.into(acc, xform, list) picks the reducer from its first argument: elements are appended to an array, concatenated to a string, or have their properties or [key, value] pairs copied into an object. Note that in Ramda 0.32 only the type of the first argument is used, and its contents do not make it into the result: R.into([1, 2], R.map(R.inc), [3]) returns [4], not [1, 2, 4]. So pass an empty value: [], '' or {}. The Ramda docs call an object with the @@transducer/init, @@transducer/step and @@transducer/result methods a transformer, and a function that takes such a transformer and returns a new one a transducer. The idea is the same, just with an object instead of a reducer function."},{type:"code",code:{ru:`// isEven :: Number -> Boolean
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
console.log(R.into([], firstThree, R.range(1, 1001)).join(', ') + ', вызовов map: ' + xformCalls) // 121, 144, 169, вызовов map: 13`,en:`// isEven :: Number -> Boolean
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
console.log(R.into([], firstThree, R.range(1, 1001)).join(', ') + ', map calls: ' + xformCalls) // 121, 144, 169, map calls: 13`}},{type:"heading",ru:"Когда это окупается",en:"When it pays off"},{type:"text",ru:"При полном проходе трансдьюсеры не уменьшают число вызовов шагов: каждый элемент проходит через каждый шаг, до которого дошёл, как и в цепочке. Выигрыш в другом. Нет промежуточных массивов и лишних проходов. Свёртку можно остановить раньше, как с R.take. Один и тот же трансформ работает с любым редьюсером и с любым источником, который понимает свёртка Ramda: массивом, итерируемым объектом вроде Set или генератора, объектом с методом reduce.",en:"On a full pass transducers don't reduce the number of step calls: every element goes through every step it reaches, just as in the chain. The gain is elsewhere. There are no intermediate arrays and no extra passes. The fold can stop early, as with R.take. The same transformation works with any reducer and any source Ramda's fold understands: an array, an iterable such as a Set or a generator, or an object with a reduce method."},{type:"text",ru:"Это заметно на больших коллекциях, длинных цепочках и при ранней остановке. Для массива из сотни элементов и двух шагов цепочка map и filter проще читается и работает достаточно быстро. В ES2025 у итераторов появились свои ленивые методы map, filter и take: они тоже обрабатывают элементы по одному, без промежуточных массивов. Трансдьюсеры отличаются тем, что отделяют преобразование и от источника данных, и от способа собрать результат. Выгоду, как и в уроке «Производительность», проверяйте измерением: счётчиком массивов и вызовов или повторными замерами, а не одним запуском.",en:'This shows on large collections, long chains and early stopping. For an array of a hundred elements and two steps, a map and filter chain is easier to read and fast enough. ES2025 gave iterators their own lazy map, filter and take methods: they also handle elements one by one, with no intermediate arrays. Transducers differ in that they separate the transformation both from the data source and from the way the result is collected. As in the "Performance" lesson, check the gain by measuring: count arrays and calls, or repeat time measurements, rather than relying on a single run.'}],summary:[{ru:"Каждый шаг цепочки map и filter проходит массив целиком и создаёт новый массив; промежуточные массивы нужны только как вход для следующего шага.",en:"Each step of a map and filter chain walks the whole array and creates a new one; the intermediate arrays are needed only as input for the next step."},{ru:"Редьюсер — функция (acc, x) => acc, а трансдьюсер — трансформер редьюсера: он принимает редьюсер и возвращает новый, не зная, что тот собирает.",en:"A reducer is a function (acc, x) => acc, and a transducer is a reducer transformer: it takes a reducer and returns a new one without knowing what that reducer collects."},{ru:"compose применяет трансдьюсеры к редьюсеру справа налево, поэтому самая левая обёртка оказывается внешней и данные проходят шаги слева направо.",en:"compose applies transducers to the reducer right to left, so the leftmost wrapper ends up outermost and the data goes through the steps left to right."},{ru:"В Ramda map, filter и take без данных работают как трансдьюсеры: R.transduce сворачивает с вашим редьюсером, R.into собирает результат в массив, строку или объект.",en:"In Ramda, map, filter and take without data work as transducers: R.transduce folds with your reducer, and R.into collects the result into an array, a string or an object."},{ru:"Трансдьюсеры убирают промежуточные массивы и лишние проходы и умеют останавливаться раньше; на маленьких массивах и коротких цепочках обычная цепочка проще.",en:"Transducers remove intermediate arrays and extra passes and can stop early; on small arrays and short chains a plain chain is simpler."}],exercises:[{task:{ru:"Напишите трансдьюсеры mapping и filtering и соберите из них через compose трансдьюсер paidTotals: оставить оплаченные заказы, взять их сумму total, оставить суммы от 1000. Примените его к двум редьюсерам из заготовки: с pushTo получится массив сумм, с sum — их итог. Подумайте, в каком порядке записать шаги в compose.",en:"Write the mapping and filtering transducers and use compose to build the paidTotals transducer from them: keep the paid orders, take their total, keep the totals of 1000 and more. Apply it to the two reducers from the starter: with pushTo you get an array of totals, with sum their grand total. Think about the order in which to write the steps in compose."},starter:{ru:`const orders = [
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
console.log(orders.reduce(paidTotals(sum), 0))`,en:`const orders = [
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
console.log(orders.reduce(paidTotals(sum), 0))`},solution:{ru:`const orders = [
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
console.log(orders.reduce(paidTotals(sum), 0))`,en:`const orders = [
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
console.log(orders.reduce(paidTotals(sum), 0))`},expected:{ru:`1200, 4500
5700`,en:`1200, 4500
5700`}},{task:{ru:"В заготовке имена первых трёх активных пользователей ищутся цепочкой filter, map и slice по списку из 1000 пользователей, а счётчик показывает, сколько раз вызывался предикат. Перепишите поиск через R.into, R.compose, R.filter, R.map и R.take, используя предикат isActive, и сравните число вызовов.",en:"In the starter, the names of the first three active users are found with a chain of filter, map and slice over a list of 1000 users, and a counter shows how many times the predicate was called. Rewrite the search with R.into, R.compose, R.filter, R.map and R.take using the isActive predicate, and compare the number of calls."},starter:{ru:`// 1000 пользователей, активен каждый седьмой
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

console.log('трансдьюсер: ' + xformResult.join(', ') + ', вызовов: ' + xformCalls)`,en:`// 1000 users, every seventh one is active
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

console.log('transducer: ' + xformResult.join(', ') + ', calls: ' + xformCalls)`},solution:{ru:`// 1000 пользователей, активен каждый седьмой
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
console.log('трансдьюсер: ' + xformResult.join(', ') + ', вызовов: ' + xformCalls)`,en:`// 1000 users, every seventh one is active
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
console.log('transducer: ' + xformResult.join(', ') + ', calls: ' + xformCalls)`},expected:{ru:`цепочка: user7, user14, user21, вызовов: 1000
трансдьюсер: user7, user14, user21, вызовов: 21`,en:`chain: user7, user14, user21, calls: 1000
transducer: user7, user14, user21, calls: 21`}}]},v={slug:"neural-networks",title:{ru:"Нейронные сети и теория категорий",en:"Neural networks and category theory"},description:{ru:"Нейросеть прямого распространения как композиция функций на JavaScript: нейрон, слой, ReLU, зачем нелинейность и что здесь описывает теория категорий.",en:"A feedforward neural network as JavaScript function composition: neurons, layers, ReLU, why nonlinearity matters, and what category theory describes here."},goal:{ru:"Понять, как нейросеть прямого распространения складывается из функций — нейрон, слой и сеть как композиция слоёв, — и какую часть этой картины описывает теория категорий.",en:"Understand how a feedforward neural network is built from functions, with neurons, layers and the network as a composition of layers, and which part of this picture category theory describes."},blocks:[{type:"text",ru:"Давайте с вами посмотрим на нейронные сети глазами функционального программиста — как на композицию функций — и свяжем это с теорией категорий. Для этого вначале повторим, что такое категория: мы говорили о ней в предыдущих главах.",en:"Let's look at neural networks the way a functional programmer would — as a composition of functions — and connect this to category theory. First, let's recall what a category is: we discussed it in previous chapters."},{type:"text",ru:"Категория — это объекты, морфизмы (стрелки между объектами) и композиция морфизмов, для которой выполняются два закона: тождество (у каждого объекта есть тождественный морфизм, и композиция с ним ничего не меняет) и ассоциативность (неважно, как расставить скобки в цепочке композиций). В программировании в роли объектов обычно выступают типы, а в роли морфизмов — функции между ними.",en:"A category consists of objects, morphisms (arrows between objects) and a composition of morphisms that obeys two laws: identity (every object has an identity morphism, and composing with it changes nothing) and associativity (it doesn't matter where you put the parentheses in a chain of compositions). In programming, types usually play the role of objects, and functions between them play the role of morphisms."},{type:"text",ru:"Теперь о том, как устроена нейросеть. Искусственный нейрон умножает каждый вход на свой вес, складывает результаты, прибавляет смещение (bias) и пропускает получившееся число через нелинейную функцию активации, например ReLU: max(0, z).",en:"Now let's see how a neural network is built. An artificial neuron multiplies each input by its own weight, adds up the results, adds a bias and passes the resulting number through a nonlinear activation function, for example ReLU: max(0, z)."},{type:"text",ru:"Слой — это несколько нейронов, которые получают одни и те же входы. Слой целиком — функция: на входе вектор чисел, на выходе вектор чисел, по одному от каждого нейрона. В сети прямого распространения (feedforward) — базовой архитектуре — слои идут цепочкой: выход одного слоя становится входом следующего. Значит, сеть — это композиция функций-слоёв: f(x) = f3(f2(f1(x))).",en:"A layer is several neurons that receive the same inputs. A layer as a whole is a function: a vector of numbers in, a vector of numbers out, one number per neuron. In a feedforward network, the basic architecture, layers form a chain: the output of one layer becomes the input of the next. So the network is a composition of layer functions: f(x) = f3(f2(f1(x)))."},{type:"text",ru:"Нелинейность в скрытых слоях обязательна. Без функции активации каждый слой — линейная функция (точнее, аффинная: умножение на веса плюс смещение), а композиция аффинных функций снова аффинна. Сколько таких слоёв ни ставь, сеть сведётся к одному слою и не сможет, например, решить задачу XOR из примера ниже. Выходной слой при этом может быть и линейным, как в том же примере.",en:"Nonlinearity in the hidden layers is essential. Without an activation function each layer is a linear function (more precisely, affine: multiplying by weights plus a bias), and a composition of affine functions is affine again. No matter how many such layers you stack, the network collapses into a single layer and cannot, for example, solve the XOR task from the example below. The output layer, however, may be linear, as in that same example."},{type:"text",ru:"Архитектуру — сколько слоёв, сколько в них нейронов, какие функции активации — выбирает создатель сети. А веса и смещения — обучаемые параметры: их не передают при вызове, их подбирает алгоритм обучения, после чего они фиксируются. Вычисление обученной сети с зафиксированными параметрами — чистая функция от входа: одинаковые входы дают одинаковый выход.",en:"The architecture — how many layers, how many neurons in each, which activation functions — is chosen by the designer of the network. Weights and biases, on the other hand, are trainable parameters: they are not passed in when the network is called; a training algorithm finds them, and after that they are fixed. Running a trained network with fixed parameters is a pure function of its input: the same inputs give the same output."},{type:"text",ru:"Коротко об обучении. В самом частом случае (обучение с учителем) есть примеры с правильными ответами. Функция потерь (loss) выдаёт число: насколько ответы сети отличаются от правильных. Градиентный спуск много раз понемногу сдвигает каждый параметр в ту сторону, в которой потери уменьшаются. Куда и насколько сдвигать каждый параметр, показывает градиент функции потерь, а вычисляет его сразу для всех параметров обратное распространение ошибки (backpropagation): правило дифференцирования сложной функции, применённое к композиции слоёв от выхода к входу.",en:"A few words about training. In the most common case (supervised learning) there are examples with correct answers. A loss function returns a number that shows how far the network's answers are from the correct ones. Gradient descent repeatedly nudges every parameter a little in the direction in which the loss decreases. Which way and how much to move each parameter is given by the gradient of the loss, and backpropagation computes it for all parameters at once: the chain rule for differentiating composite functions, applied to the composition of layers from the output back to the input."},{type:"text",ru:"Теперь то же на языке категорий. Объекты — пространства векторов нужной длины (в примере ниже: 2 числа на входе, 2 в скрытом слое, 1 на выходе), морфизмы — функции между такими пространствами; каждый слой — морфизм, и сеть целиком, композиция слоёв, — тоже морфизм. По закону ассоциативности неважно, как группировать слои: pipe(pipe(a, b), c) и pipe(a, pipe(b, c)) — одна и та же функция. Тождественный морфизм — функция, которая возвращает вход без изменений: если добавить её в цепочку, сеть не изменится.",en:"Now the same in the language of categories. The objects are spaces of vectors of a given length (in the example below: 2 numbers at the input, 2 in the hidden layer, 1 at the output), and the morphisms are functions between such spaces; each layer is a morphism, and the whole network, being a composition of layers, is a morphism too. By associativity it doesn't matter how you group the layers: pipe(pipe(a, b), c) and pipe(a, pipe(b, c)) are the same function. The identity morphism is a function that returns its input unchanged: add it to the chain and the network stays the same."},{type:"text",ru:"Важно не переоценивать эту связь: теория категорий здесь описывает, как слои стыкуются между собой, но не объясняет, почему сеть учится. Описать на этом языке и обучение тоже пытаются, но это уже исследовательская тема (например, статья «Backprop as Functor», Fong, Spivak, Tuyéras, 2019), и в курсе мы её не трогаем.",en:`It's important not to overstate this connection: here category theory describes how layers fit together, but it does not explain why a network learns. There are attempts to describe training in this language as well, but that is a research topic (for example, the paper "Backprop as Functor" by Fong, Spivak and Tuyéras, 2019), and this course does not cover it.`},{type:"text",ru:"Соберём всё вместе. Ниже — схема небольшой сети и та же сеть в коде: нейрон и слой — функции, а сеть — их композиция через pipe.",en:"Let's put it all together. Below is a diagram of a small network and the same network in code: a neuron and a layer are functions, and the network is their composition via pipe."},{type:"code",pseudo:!0,code:{ru:`// ==== Схема сети из примера ниже ====

           вход x: 2 числа
                 |
                 v
+-------------------------------------+
| скрытый слой: 2 нейрона             |
| нейрон = relu(сумма(вес * вход)     |
|               + смещение)           |
+-------------------------------------+
                 |  2 числа
                 v
+-------------------------------------+
| выходной слой: 1 нейрон             |
| нейрон = сумма(вес * вход)          |
|          + смещение                 |
+-------------------------------------+
                 |
                 v
           выход y: 1 число

веса и смещения — обучаемые параметры
сеть — композиция слоёв: y = output(hidden(x))`,en:`// ==== Diagram of the network from the example below ====

           input x: 2 numbers
                 |
                 v
+-------------------------------------+
| hidden layer: 2 neurons             |
| neuron = relu(sum(weight * input)   |
|               + bias)               |
+-------------------------------------+
                 |  2 numbers
                 v
+-------------------------------------+
| output layer: 1 neuron              |
| neuron = sum(weight * input)        |
|          + bias                     |
+-------------------------------------+
                 |
                 v
           output y: 1 number

weights and biases are trainable parameters
the network is a composition of layers: y = output(hidden(x))`}},{type:"code",code:{ru:`// ==== Та же сеть в коде ====
// параметры уже подобраны: это решение задачи XOR из учебника
// Goodfellow, Bengio, Courville «Deep Learning», раздел 6.1
// там их задали вручную, в реальной сети их находит обучение

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// функции активации
// relu :: Number -> Number
const relu = (z) => Math.max(0, z)
// identity :: a -> a
const identity = (z) => z

// взвешенная сумма: каждый вход умножаем на свой вес и складываем
// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// нейрон: взвешенная сумма входов плюс смещение,
// результат проходит через функцию активации
// веса, смещение и активация задаются при создании нейрона,
// при вызове он получает только входы
// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// слой: несколько нейронов получают одни и те же входы,
// на выходе по числу от каждого нейрона
// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// скрытый слой: 2 числа -> 2 числа, активация relu
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// выходной слой: 2 числа -> 1 число, без нелинейности, как в учебнике
// output :: [Number] -> [Number]
const output = layer([
  neuron([1, -2], 0, identity),
])

// сеть — композиция слоёв
// network :: [Number] -> [Number]
const network = pipe(hidden, output)

// ответ сети одним числом
// getAnswer :: [Number] -> Number
const getAnswer = pipe(network, ([y]) => y)

for (const x of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
  console.log(\`\${x[0]} XOR \${x[1]} = \${getAnswer(x)}\`)
}
// 0 XOR 0 = 0
// 0 XOR 1 = 1
// 1 XOR 0 = 1
// 1 XOR 1 = 0`,en:`// ==== The same network in code ====
// the parameters are already chosen: this is the XOR solution from the textbook
// Goodfellow, Bengio, Courville "Deep Learning", section 6.1
// there they are set by hand; in a real network training finds them

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// activation functions
// relu :: Number -> Number
const relu = (z) => Math.max(0, z)
// identity :: a -> a
const identity = (z) => z

// weighted sum: multiply each input by its weight and add them up
// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron: the weighted sum of the inputs plus a bias,
// passed through the activation function
// weights, bias and activation are set when the neuron is created;
// when called, it receives only the inputs
// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer: several neurons receive the same inputs,
// and the output has one number per neuron
// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// hidden layer: 2 numbers -> 2 numbers, relu activation
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// output layer: 2 numbers -> 1 number, no nonlinearity, as in the textbook
// output :: [Number] -> [Number]
const output = layer([
  neuron([1, -2], 0, identity),
])

// the network is a composition of layers
// network :: [Number] -> [Number]
const network = pipe(hidden, output)

// the network's answer as a single number
// getAnswer :: [Number] -> Number
const getAnswer = pipe(network, ([y]) => y)

for (const x of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
  console.log(\`\${x[0]} XOR \${x[1]} = \${getAnswer(x)}\`)
}
// 0 XOR 0 = 0
// 0 XOR 1 = 1
// 1 XOR 0 = 1
// 1 XOR 1 = 0`}}],summary:[{ru:"Нейрон умножает каждый вход на свой вес, складывает результаты, прибавляет смещение и пропускает число через нелинейную функцию активации, например ReLU: max(0, z).",en:"A neuron multiplies each input by its own weight, adds up the results, adds a bias and passes the number through a nonlinear activation function, for example ReLU: max(0, z)."},{ru:"Слой — функция из вектора чисел в вектор чисел, а сеть прямого распространения — композиция функций-слоёв: f(x) = f3(f2(f1(x))).",en:"A layer is a function from a vector of numbers to a vector of numbers, and a feedforward network is a composition of layer functions: f(x) = f3(f2(f1(x)))."},{ru:"Без нелинейности в скрытых слоях композиция аффинных слоёв снова аффинна: сеть сводится к одному слою и не может, например, решить задачу XOR.",en:"Without nonlinearity in the hidden layers, a composition of affine layers is affine again: the network collapses into a single layer and cannot, for example, solve the XOR task."},{ru:"Веса и смещения подбирает алгоритм обучения, после чего они фиксируются; обученная сеть с зафиксированными параметрами — чистая функция от входа.",en:"Weights and biases are found by a training algorithm and then fixed; a trained network with fixed parameters is a pure function of its input."},{ru:"Теория категорий описывает, как слои стыкуются между собой, но не объясняет, почему сеть учится.",en:"Category theory describes how layers fit together, but it does not explain why a network learns."}],exercises:[{task:{ru:"Возьмите скрытый слой hidden из урока и не меняйте его. Подберите веса и смещение выходного нейрона (активация identity) так, чтобы сеть вычисляла OR, а затем AND, и выведите таблицы истинности. Подсказка: сначала посчитайте, что hidden выдаёт на входах [0, 0], [0, 1], [1, 0] и [1, 1].",en:"Take the hidden layer from the lesson and leave it unchanged. Pick the weights and bias of the output neuron (identity activation) so that the network computes OR and then AND, and print the truth tables. Hint: first work out what hidden outputs for the inputs [0, 0], [0, 1], [1, 0] and [1, 1]."},starter:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// скрытый слой из урока
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// сеть: скрытый слой, затем один выходной нейрон
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// ваш код: подберите веса и смещение
const or = gate([0, 0], 0)
const and = gate([0, 0], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// the hidden layer from the lesson
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// the network: the hidden layer, then one output neuron
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// your code: pick the weights and the bias
const or = gate([0, 0], 0)
const and = gate([0, 0], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`},solution:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// скрытый слой из урока
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// сеть: скрытый слой, затем один выходной нейрон
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// hidden на входах [0, 0], [0, 1], [1, 0], [1, 1]
// выдаёт [0, 0], [1, 0], [1, 0], [2, 1]

// OR: первый выход минус второй даёт 0, 1, 1, 1
const or = gate([1, -1], 0)
// AND: второй выход как есть даёт 0, 0, 0, 1
const and = gate([0, 1], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// the hidden layer from the lesson
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// the network: the hidden layer, then one output neuron
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// for the inputs [0, 0], [0, 1], [1, 0], [1, 1]
// hidden outputs [0, 0], [1, 0], [1, 0], [2, 1]

// OR: the first output minus the second gives 0, 1, 1, 1
const or = gate([1, -1], 0)
// AND: the second output as is gives 0, 0, 0, 1
const and = gate([0, 1], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`},expected:{ru:`0 OR 0 = 0
0 OR 1 = 1
1 OR 0 = 1
1 OR 1 = 1
0 AND 0 = 0
0 AND 1 = 0
1 AND 0 = 0
1 AND 1 = 1`,en:`0 OR 0 = 0
0 OR 1 = 1
1 OR 0 = 1
1 OR 1 = 1
0 AND 0 = 0
0 AND 1 = 0
1 AND 0 = 0
1 AND 1 = 1`}},{task:{ru:"Проверьте в коде, что без нелинейности два слоя сводятся к одному. Сеть deep состоит из двух слоёв с активацией identity. В скрытом слое два нейрона: с весами [1, 2] и смещением 1 и с весами [3, -1] и смещением 0. В выходном слое один нейрон с весами [2, 1] и смещением -4. Соберите эти слои функцией deepWith, которая получает активацию скрытого слоя аргументом, и найдите веса и смещение одного нейрона single, который даёт тот же ответ. Заготовка сравнивает обе сети на входах [0, 0], [1, 0], [0, 1] и [2, 3], а затем ставит в скрытый слой relu вместо identity и сравнивает сети ещё раз на входе [0, 1].",en:"Check in code that without nonlinearity two layers collapse into one. The deep network consists of two layers with identity activation. The hidden layer has two neurons: one with weights [1, 2] and bias 1, and one with weights [3, -1] and bias 0. The output layer has one neuron with weights [2, 1] and bias -4. Build these layers with a deepWith function that takes the hidden layer's activation as an argument, and find the weights and bias of a single neuron that gives the same answer. The starter compares both networks on the inputs [0, 0], [1, 0], [0, 1] and [2, 3], then puts relu instead of identity into the hidden layer and compares the networks again on the input [0, 1]."},starter:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// два слоя; активацию скрытого слоя передаём параметром
// deepWith :: (Number -> Number) -> [Number] -> Number
// ваш код

// deep :: [Number] -> Number
const deep = deepWith(identity)

// один нейрон с тем же ответом, что у deep
// single :: [Number] -> Number
// ваш код

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// relu в скрытом слое вместо identity
console.log(\`с relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// two layers; the hidden layer's activation is a parameter
// deepWith :: (Number -> Number) -> [Number] -> Number
// your code

// deep :: [Number] -> Number
const deep = deepWith(identity)

// one neuron with the same answer as deep
// single :: [Number] -> Number
// your code

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// relu instead of identity in the hidden layer
console.log(\`with relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`},solution:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// два слоя; активацию скрытого слоя передаём параметром
// deepWith :: (Number -> Number) -> [Number] -> Number
const deepWith = (activation) => pipe(
  layer([
    neuron([1, 2], 1, activation),
    neuron([3, -1], 0, activation),
  ]),
  layer([neuron([2, 1], -4, identity)]),
  ([y]) => y,
)

// deep :: [Number] -> Number
const deep = deepWith(identity)

// подставляем скрытый слой в выходной нейрон:
// 2 * (x1 + 2 * x2 + 1) + (3 * x1 - x2) - 4 = 5 * x1 + 3 * x2 - 2
// single :: [Number] -> Number
const single = pipe(layer([neuron([5, 3], -2, identity)]), ([y]) => y)

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// с relu второй скрытый нейрон на входе [0, 1] выдаёт не -1, а 0,
// и ответы расходятся: формула одного нейрона больше не подходит
console.log(\`с relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// two layers; the hidden layer's activation is a parameter
// deepWith :: (Number -> Number) -> [Number] -> Number
const deepWith = (activation) => pipe(
  layer([
    neuron([1, 2], 1, activation),
    neuron([3, -1], 0, activation),
  ]),
  layer([neuron([2, 1], -4, identity)]),
  ([y]) => y,
)

// deep :: [Number] -> Number
const deep = deepWith(identity)

// substitute the hidden layer into the output neuron:
// 2 * (x1 + 2 * x2 + 1) + (3 * x1 - x2) - 4 = 5 * x1 + 3 * x2 - 2
// single :: [Number] -> Number
const single = pipe(layer([neuron([5, 3], -2, identity)]), ([y]) => y)

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// with relu the second hidden neuron outputs 0 instead of -1 for the input [0, 1],
// and the answers diverge: the single-neuron formula no longer fits
console.log(\`with relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`},expected:{ru:`[0,0]: deep = -2, single = -2
[1,0]: deep = 3, single = 3
[0,1]: deep = 1, single = 1
[2,3]: deep = 17, single = 17
с relu, [0,1]: deep = 2, single = 1`,en:`[0,0]: deep = -2, single = -2
[1,0]: deep = 3, single = 3
[0,1]: deep = 1, single = 1
[2,3]: deep = 17, single = 17
with relu, [0,1]: deep = 2, single = 1`}}]},S={slug:"fp-in-typescript-and-effect",title:{ru:"ФП в TypeScript и Effect",en:"FP in TypeScript and Effect"},description:{ru:"От JavaScript к TypeScript и Effect 4: pipe и Option вместо Maybe, Result вместо Either, ошибки в типе Effect, Schema и где Effect окупается.",en:"From JavaScript to TypeScript and Effect 4: pipe and Option instead of Maybe, Result instead of Either, typed errors, Schema, and where Effect pays off."},goal:{ru:"Увидеть, как идеи курса — композиция через pipe, Maybe и Either, эффекты как значения — выглядят в TypeScript на Effect 4, научиться читать тип Effect<A, E, R> и решать, когда переход на Effect окупается.",en:"See how the ideas of the course (composition with pipe, Maybe and Either, effects as values) look in TypeScript with Effect 4, learn to read the Effect<A, E, R> type and decide when moving to Effect pays off."},blocks:[{type:"text",ru:"Этот урок — мост от курса к продакшен-коду. Сквозной пример из урока «Функциональное программирование» — взять пользователей онлайн старше 20 лет и получить имя первого — здесь переписан на TypeScript с библиотекой Effect 4. Задача та же, и ответ тот же — John, а по шагам видно, что добавляет каждый слой: типы, Option вместо Maybe, проверку входящих данных и ошибки в типе программы.",en:'This lesson is a bridge from the course to production code. The running example from the "Functional programming" lesson (take the users who are online and older than 20 and get the name of the first one) is rewritten here in TypeScript with the Effect 4 library. The task and the answer stay the same (John), and step by step you can see what each layer adds: types, Option instead of Maybe, checking the incoming data, and errors in the type of the program.'},{type:"text",ru:"Курс написан на JavaScript, потому что идеи функционального программирования не зависят от системы типов, а на JS они видны без лишнего синтаксиса. В продакшене их часто пишут на TypeScript: там отсутствие значения и возможные ошибки становятся частью сигнатуры, и их обработку проверяет компилятор. Примеры на TypeScript в этом уроке только для чтения, песочница их не запускает. Оба упражнения в конце урока — на чистом JavaScript, их можно запустить в песочнице, как обычно.",en:"The course is written in JavaScript because the ideas of functional programming do not depend on a type system, and in JS they are visible without extra syntax. In production they are often written in TypeScript: there a missing value and possible errors become part of the signature, and the compiler checks how the code handles them. The TypeScript examples in this lesson are for reading only, the playground does not run them. Both exercises at the end of the lesson are in plain JavaScript and run in the playground as usual."},{type:"heading",ru:"Как читать TypeScript",en:"How to read TypeScript"},{type:"text",ru:"TypeScript — это JavaScript с аннотациями типов: компилятор их проверяет, а перед запуском стирает. Аннотация пишется через двоеточие: name: string — строка, age: number — число. Union-тип 'online' | 'offline' разрешает только одно из перечисленных значений. Дженерик <A> — параметр типа, та же переменная a из урока «Нотация типов Хиндли–Милнера», только с большой буквы: сигнатура head :: [a] -> Maybe a в TypeScript записывается как <A>(self: ReadonlyArray<A>) => Option<A>. ReadonlyArray — массив, который функция обещает не менять.",en:`TypeScript is JavaScript with type annotations: the compiler checks them and strips them before running. An annotation is written after a colon: name: string is a string, age: number is a number. The union type 'online' | 'offline' allows only one of the listed values. The generic <A> is a type parameter, the same variable a from the "Hindley–Milner type notation" lesson, only capitalized: the signature head :: [a] -> Maybe a is written in TypeScript as <A>(self: ReadonlyArray<A>) => Option<A>. ReadonlyArray is an array that the function promises not to change.`},{type:"code",lang:"ts",code:{ru:`import { Option } from 'effect'

// Union-тип: статус может быть только одной из двух строк
type Status = 'online' | 'offline'

// Форма пользователя: имена полей и их типы
interface User {
  readonly name: string
  readonly status: Status
  readonly age: number
}

// Хиндли–Милнер: head :: [a] -> Maybe a
// TypeScript:    <A>(self: ReadonlyArray<A>) => Option<A>
// <A> — параметр типа, та же переменная a, только с большой буквы
// Option.Option<A> — тип Option из модуля Option
const head = <A>(self: ReadonlyArray<A>): Option.Option<A> =>
  self.length > 0 ? Option.some(self[0]) : Option.none()

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
]

console.log(Option.isSome(head(users))) // true
console.log(Option.isNone(head([]))) // true

// head(42) не скомпилируется: число не массив
// { name: 'Bob', status: 'away', age: 30 } тоже: 'away' не входит в Status`,en:`import { Option } from 'effect'

// Union type: the status can only be one of the two strings
type Status = 'online' | 'offline'

// The shape of a user: field names and their types
interface User {
  readonly name: string
  readonly status: Status
  readonly age: number
}

// Hindley–Milner: head :: [a] -> Maybe a
// TypeScript:     <A>(self: ReadonlyArray<A>) => Option<A>
// <A> is a type parameter, the same variable a, only capitalized
// Option.Option<A> is the Option type from the Option module
const head = <A>(self: ReadonlyArray<A>): Option.Option<A> =>
  self.length > 0 ? Option.some(self[0]) : Option.none()

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
]

console.log(Option.isSome(head(users))) // true
console.log(Option.isNone(head([]))) // true

// head(42) will not compile: a number is not an array
// { name: 'Bob', status: 'away', age: 30 } won't compile either:
// 'away' is not a Status`}},{type:"heading",ru:"pipe и Option вместо S.pipe и Maybe",en:"pipe and Option instead of S.pipe and Maybe"},{type:"text",ru:"Теперь чистая часть примера. Функция pipe из effect принимает сначала значение, а затем шаги конвейера: pipe(x, f, g) делает то же, что S.pipe([f, g])(x) в Sanctuary. Если значения ещё нет и нужна сама функция-конвейер, её собирает flow(f, g). Модуль Array из effect даёт filter и head, а head возвращает Option — аналог Maybe: Some со значением или None.",en:"Now the pure part of the example. The pipe function from effect takes the value first and then the steps of the pipeline: pipe(x, f, g) does the same as S.pipe([f, g])(x) in Sanctuary. If there is no value yet and you need the pipeline function itself, flow(f, g) builds it. The Array module from effect provides filter and head, and head returns an Option, the counterpart of Maybe: Some with a value or None."},{type:"code",lang:"ts",code:{ru:`// Array из effect назван Arr, чтобы не закрыть встроенный Array
import { Array as Arr, Option, pipe } from 'effect'

interface User {
  readonly name: string
  readonly status: 'online' | 'offline'
  readonly age: number
}

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 18 },
  { name: 'Angel', status: 'online', age: 18 },
]

const isOnline = (user: User): boolean => user.status === 'online'
const olderThan = (age: number) => (user: User): boolean => user.age > age

// searchOnlineUser :: [User] -> String
const searchOnlineUser = (list: ReadonlyArray<User>): string =>
  pipe(
    list, // в pipe из effect первым идёт значение, а не массив функций
    Arr.filter(isOnline), // только пользователи онлайн
    Arr.filter(olderThan(20)), // только старше 20 лет
    Arr.head, // Option<User>: Some(пользователь) или None для пустого списка
    Option.map((user) => user.name), // имя внутри Option
    Option.getOrElse(() => ''), // достаём имя, для None будет ''
  )

console.log(searchOnlineUser(users)) // 'John'
console.log(searchOnlineUser([]) === '') // true`,en:`// Array from effect is renamed Arr so as not to shadow the built-in Array
import { Array as Arr, Option, pipe } from 'effect'

interface User {
  readonly name: string
  readonly status: 'online' | 'offline'
  readonly age: number
}

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 18 },
  { name: 'Angel', status: 'online', age: 18 },
]

const isOnline = (user: User): boolean => user.status === 'online'
const olderThan = (age: number) => (user: User): boolean => user.age > age

// searchOnlineUser :: [User] -> String
const searchOnlineUser = (list: ReadonlyArray<User>): string =>
  pipe(
    list, // in effect's pipe the value comes first, not an array of functions
    Arr.filter(isOnline), // only the users who are online
    Arr.filter(olderThan(20)), // only those older than 20
    Arr.head, // Option<User>: Some(user), or None for an empty list
    Option.map((user) => user.name), // the name inside the Option
    Option.getOrElse(() => ''), // take the name out, '' for None
  )

console.log(searchOnlineUser(users)) // 'John'
console.log(searchOnlineUser([]) === '') // true`}},{type:"text",ru:"Ответ тот же — John. Одно отличие легко пропустить: Option.getOrElse принимает функцию, которая вернёт запасное значение, а S.fromMaybe — само значение. Остальное соответствует почти один к одному, как показывает таблица. В Effect 3 модуль Result назывался Either, с вариантами Right и Left, поэтому в статьях и примерах, написанных до версии 4, встречается Either.",en:"The answer is the same: John. One difference is easy to miss: Option.getOrElse takes a function that returns the fallback, while S.fromMaybe takes the value itself. The rest maps almost one to one, as the table shows. In Effect 3 the Result module was called Either, with the variants Right and Left, so articles and examples written before version 4 use Either."},{type:"table",caption:{ru:"Sanctuary и Effect 4: что чему соответствует",en:"Sanctuary and Effect 4: what maps to what"},columns:[{ru:"Sanctuary",en:"Sanctuary"},{ru:"Effect 4",en:"Effect 4"},{ru:"Смысл",en:"Meaning"}],rows:[[{ru:"Maybe a",en:"Maybe a"},{ru:"Option<A>",en:"Option<A>"},{ru:"значения может не быть",en:"the value may be missing"}],[{ru:"Just (x), Nothing",en:"Just (x), Nothing"},{ru:"Some и None: Option.some(x), Option.none()",en:"Some and None: Option.some(x), Option.none()"},{ru:"значение есть или его нет",en:"there is a value or there is none"}],[{ru:"Either a b",en:"Either a b"},{ru:"Result<A, E>",en:"Result<A, E>"},{ru:"результат или ошибка; в Result сначала тип успеха, затем тип ошибки",en:"a result or an error; Result lists the success type first, then the error type"}],[{ru:"Right (x), Left (e)",en:"Right (x), Left (e)"},{ru:"Success и Failure: Result.succeed(x), Result.fail(e)",en:"Success and Failure: Result.succeed(x), Result.fail(e)"},{ru:"успех или ошибка с причиной",en:"a success or an error with a reason"}],[{ru:"S.map(f)",en:"S.map(f)"},{ru:"Option.map(f)",en:"Option.map(f)"},{ru:"применить f к значению внутри",en:"apply f to the value inside"}],[{ru:"S.chain(f)",en:"S.chain(f)"},{ru:"Option.flatMap(f)",en:"Option.flatMap(f)"},{ru:"f сама возвращает Option: применить и снять лишний слой",en:"f returns an Option itself: apply it and remove the extra layer"}],[{ru:"S.fromMaybe(x)",en:"S.fromMaybe(x)"},{ru:"Option.getOrElse(() => x)",en:"Option.getOrElse(() => x)"},{ru:"достать значение с запасным; в Effect запасное — функция",en:"take the value out with a fallback; in Effect the fallback is a function"}],[{ru:"S.either(f)(g)",en:"S.either(f)(g)"},{ru:"Result.match({ onFailure: f, onSuccess: g })",en:"Result.match({ onFailure: f, onSuccess: g })"},{ru:"обработать оба случая на выходе",en:"handle both cases at the exit"}],[{ru:"S.pipe([f, g])(x)",en:"S.pipe([f, g])(x)"},{ru:"pipe(x, f, g)",en:"pipe(x, f, g)"},{ru:"конвейер; в Effect значение идёт первым",en:"a pipeline; in Effect the value comes first"}]]},{type:"heading",ru:"Effect<A, E, R>",en:"Effect<A, E, R>"},{type:"text",ru:"В уроке «Каррирование и Асинхронность (Эволюция)» запросы были промисами, а ошибка любого шага попадала в один catch. Промис начинает работу в момент создания, и по его типу не видно, что попадёт в catch. Effect устроен иначе: это ленивое описание работы, значение, которое можно хранить, передавать и собирать из частей. Ничего не выполняется, пока описание не передадут в Effect.runPromise или Effect.runSync. У типа Effect<A, E, R> три параметра: A — тип результата, E — ошибки, которые могут случиться, R — сервисы, нужные для запуска. Если ошибок или сервисов нет, на их месте стоит never — тип без единого значения; незаписанные E и R тоже равны never, поэтому Effect<string> — это Effect<string, never, never>. Возможная ошибка видна в сигнатуре так же, как возможное отсутствие значения видно в Maybe a.",en:'In the "Currying and asynchrony (evolution)" lesson the requests were promises, and an error at any step ended up in a single catch. A promise starts working the moment it is created, and its type does not show what may end up in catch. Effect works differently: it is a lazy description of the work, a value that can be stored, passed around and assembled from parts. Nothing runs until the description is passed to Effect.runPromise or Effect.runSync. The Effect<A, E, R> type has three parameters: A is the type of the result, E is the errors that may happen, R is the services needed to run it. When there are no errors or services, their place is taken by never, a type with no values; omitted E and R are never as well, so Effect<string> is Effect<string, never, never>. A possible error is visible in the signature just as a possible missing value is visible in Maybe a.'},{type:"heading",ru:"Schema: проверка данных на границе",en:"Schema: checking data at the boundary"},{type:"text",ru:"Типы TypeScript проверяются только при компиляции, а ответ сервера приходит во время выполнения, и его они не проверят. Об этом предупреждал комментарий в примере урока «Функциональное программирование». Schema описывает данные один раз, и из этого описания получаются и тип, и проверка во время выполнения. Schema.decodeUnknownResult(схема) даёт функцию проверки, а она возвращает Result: Success с проверенными данными или Failure с описанием того, что не так.",en:'TypeScript types are checked only at compile time, while a server response arrives at run time, and the types will not check it. The comment in the example from the "Functional programming" lesson warned about this. Schema describes the data once, and that description gives both the type and a check at run time. Schema.decodeUnknownResult(schema) gives a checking function, and it returns a Result: Success with the checked data or Failure describing what is wrong.'},{type:"code",lang:"ts",code:{ru:`import { Result, Schema } from 'effect'

// Схема описывает данные один раз: из неё получаются и тип, и проверка
const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// Тип выводится из схемы, interface руками писать не нужно
type User = typeof User.Type

const Users = Schema.Array(User)

// Проверка возвращает Result: Success с данными или Failure с ошибкой
const check = (data: unknown): string =>
  Result.match(Schema.decodeUnknownResult(Users)(data), {
    onSuccess: (users: ReadonlyArray<User>) => 'пользователей: ' + users.length,
    onFailure: () => 'данные не прошли проверку',
  })

// Ответы «сервера»: во втором возраст пришёл строкой
console.log(check([{ name: 'John', status: 'online', age: 25 }]))
// 'пользователей: 1'
console.log(check([{ name: 'Alex', status: 'offline', age: '18' }]))
// 'данные не прошли проверку'`,en:`import { Result, Schema } from 'effect'

// A schema describes the data once: it gives both the type and the check
const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// The type is derived from the schema, no need to write an interface by hand
type User = typeof User.Type

const Users = Schema.Array(User)

// The check returns a Result: Success with the data or Failure with an error
const check = (data: unknown): string =>
  Result.match(Schema.decodeUnknownResult(Users)(data), {
    onSuccess: (users: ReadonlyArray<User>) => 'users: ' + users.length,
    onFailure: () => 'data failed the check',
  })

// Responses from the "server": in the second one the age came as a string
console.log(check([{ name: 'John', status: 'online', age: 25 }]))
// 'users: 1'
console.log(check([{ name: 'Alex', status: 'offline', age: '18' }]))
// 'data failed the check'`}},{type:"heading",ru:"Программа целиком",en:"The whole program"},{type:"text",ru:"Осталось собрать всё в одну программу. Effect.gen читается как async/await: вместо await пишется yield*, а ошибки не уходят в общий catch, а копятся в типе. Ошибки с тегом объявляются через Data.TaggedError: поле _tag отличает одну ошибку от другой, а Effect.catchTag обрабатывает ошибку по её тегу. Option в версии 4 — не эффект, поэтому его переводят в эффект через Effect.fromOption и указывают, какой ошибкой станет None.",en:"What remains is to assemble everything into one program. Effect.gen reads like async/await: yield* is written instead of await, and errors do not go to a shared catch but accumulate in the type. Tagged errors are declared with Data.TaggedError: the _tag field tells one error from another, and Effect.catchTag handles an error by its tag. In version 4 an Option is not an effect, so it is turned into one with Effect.fromOption, which also states the error that None becomes."},{type:"code",lang:"ts",code:{ru:`import { Array as Arr, Data, Effect, pipe, Schema } from 'effect'

const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// Ошибки с тегом: поле _tag отличает одну ошибку от другой
class FetchError extends Data.TaggedError('FetchError')<{
  readonly reason: string
}> {}
class UserNotFound extends Data.TaggedError('UserNotFound')<{}> {}

// «Сервер»: эффект, который может упасть с FetchError
// fetchAllUsers :: Effect<unknown, FetchError>
const fetchAllUsers = Effect.tryPromise({
  try: (): Promise<unknown> => Promise.resolve([
    { name: 'John', status: 'online', age: 25 },
    { name: 'Alex', status: 'offline', age: 18 },
    { name: 'Angel', status: 'online', age: 18 },
  ]),
  catch: (cause) => new FetchError({ reason: String(cause) }),
})

// Effect.gen читается как async/await: yield* вместо await
// program :: Effect<string, FetchError | SchemaError | UserNotFound>
const program = Effect.gen(function* () {
  const data = yield* fetchAllUsers
  const users = yield* Schema.decodeUnknownEffect(Schema.Array(User))(data)
  const first = pipe(
    users,
    Arr.filter((user) => user.status === 'online' && user.age > 20),
    Arr.head,
  )
  // Option не эффект: переводим его в эффект со своей ошибкой
  const user = yield* Effect.fromOption(first, () => new UserNotFound())
  return user.name
})

// Пока ничего не выполнено: program — только описание работы.
// Обработанные ошибки уходят из типа, в конце Effect<string, never>
const safe = program.pipe(
  Effect.catchTag('UserNotFound', () => Effect.succeed('')),
  Effect.catch(() => Effect.succeed('сервис недоступен')),
)

Effect.runPromise(safe).then(console.log) // 'John'`,en:`import { Array as Arr, Data, Effect, pipe, Schema } from 'effect'

const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// Tagged errors: the _tag field tells one error from another
class FetchError extends Data.TaggedError('FetchError')<{
  readonly reason: string
}> {}
class UserNotFound extends Data.TaggedError('UserNotFound')<{}> {}

// The "server": an effect that may fail with FetchError
// fetchAllUsers :: Effect<unknown, FetchError>
const fetchAllUsers = Effect.tryPromise({
  try: (): Promise<unknown> => Promise.resolve([
    { name: 'John', status: 'online', age: 25 },
    { name: 'Alex', status: 'offline', age: 18 },
    { name: 'Angel', status: 'online', age: 18 },
  ]),
  catch: (cause) => new FetchError({ reason: String(cause) }),
})

// Effect.gen reads like async/await: yield* instead of await
// program :: Effect<string, FetchError | SchemaError | UserNotFound>
const program = Effect.gen(function* () {
  const data = yield* fetchAllUsers
  const users = yield* Schema.decodeUnknownEffect(Schema.Array(User))(data)
  const first = pipe(
    users,
    Arr.filter((user) => user.status === 'online' && user.age > 20),
    Arr.head,
  )
  // Option is not an effect: turn it into an effect with its own error
  const user = yield* Effect.fromOption(first, () => new UserNotFound())
  return user.name
})

// Nothing has run yet: program is only a description of the work.
// Handled errors leave the type, at the end it is Effect<string, never>
const safe = program.pipe(
  Effect.catchTag('UserNotFound', () => Effect.succeed('')),
  Effect.catch(() => Effect.succeed('service unavailable')),
)

Effect.runPromise(safe).then(console.log) // 'John'`}},{type:"text",ru:"Тип program говорит, что программа вернёт строку или завершится одной из трёх ошибок: FetchError, SchemaError или UserNotFound. Effect.catchTag убирает из типа UserNotFound, Effect.catch обрабатывает все оставшиеся, и в конце остаётся Effect<string, never>: компилятор знает, что необработанных ошибок нет. Без обработки ошибки остались бы в типе, а Effect.runPromise при ошибке вернул бы отклонённый промис.",en:"The type of program says that it returns a string or ends with one of three errors: FetchError, SchemaError or UserNotFound. Effect.catchTag removes UserNotFound from the type, Effect.catch handles all the rest, and what is left is Effect<string, never>: the compiler knows there are no unhandled errors. Without the handlers the errors would stay in the type, and Effect.runPromise would return a rejected promise on an error."},{type:"text",ru:"Третий параметр, R, в примере пуст. В настоящем коде через него проходят зависимости: база данных, HTTP-клиент, конфигурация. Сервис объявляется через Context, реализация подставляется через Layer, а Effect.runPromise принимает только эффект с R = never, поэтому забытую зависимость покажет компилятор. В тестах тот же сервис подменяется другим Layer. Кроме того, в библиотеку встроены конкурентность, повторы и тайм-ауты: Effect.all с параметром concurrency, Effect.retry и Effect.timeout. Это темы для отдельного разговора, здесь достаточно знать, что они есть.",en:"The third parameter, R, is empty in the example. In real code dependencies go through it: a database, an HTTP client, configuration. A service is declared with Context, an implementation is provided with Layer, and Effect.runPromise accepts only an effect with R = never, so the compiler points out a forgotten dependency. In tests the same service is replaced with a different Layer. Concurrency, retries and timeouts are built into the library as well: Effect.all with the concurrency option, Effect.retry and Effect.timeout. These are topics for a separate discussion; here it is enough to know they exist."},{type:"heading",ru:"Где Effect окупается",en:"Where Effect pays off"},{type:"list",ordered:!1,items:[{ru:"Бэкенд и интеграции с несколькими точками отказа — сеть, база данных, очереди: ошибки видны в типе, а повторы, тайм-ауты и отмена встроены в библиотеку.",en:"Backends and integrations with several points of failure (the network, a database, queues): errors are visible in the type, and retries, timeouts and cancellation are built into the library."},{ru:"Долгоживущий код, который правят многие люди: компилятор показывает необработанные ошибки и незакрытые зависимости.",en:"Long-lived code that many people change: the compiler points out unhandled errors and missing dependencies."},{ru:"Внешние данные: Schema даёт и тип, и проверку из одного описания.",en:"External data: Schema gives both the type and the check from one description."},{ru:"Конкурентные задачи, где нужно ограничить число параллельных операций и уметь их отменять.",en:"Concurrent tasks where the number of parallel operations has to be limited and the operations can be cancelled."},{ru:"Тесты, в которых сервисы подменяются через Layer.",en:"Tests in which services are replaced through Layer."}]},{type:"heading",ru:"Где Effect не окупается",en:"Where Effect does not pay off"},{type:"list",ordered:!1,items:[{ru:"Скрипты, прототипы и простой CRUD-фронтенд: ошибка там стоит дёшево, а освоение библиотеки — дорого.",en:"Scripts, prototypes and a simple CRUD front end: an error there is cheap, and learning the library is expensive."},{ru:"Команда без TypeScript, без времени на обучение или с частой сменой людей: каждому новичку придётся осваивать модель эффектов.",en:"A team without TypeScript, without time to learn, or with frequent turnover: every newcomer has to learn the effect model."},{ru:"Клиентская страница, где важен каждый килобайт: размер бандла стоит измерить на своём проекте до решения.",en:"A client page where every kilobyte counts: measure the bundle size on your own project before deciding."}]},{type:"heading",ru:"Версии, fp-ts и что дальше",en:"Versions, fp-ts and what's next"},{type:"text",ru:"Примеры написаны для Effect 4: Effect 4.0.0 вышел 1 октября 2026 года, а ветка 3.x ещё получает исправления. Предшественник Effect в TypeScript — библиотека fp-ts. Проект fp-ts объявил о слиянии с экосистемой Effect, и по README fp-ts, Effect можно считать преемником fp-ts v2. Последний релиз fp-ts, 2.16.11, вышел 18 августа 2025 года. Для нового кода разумный выбор — Effect, а fp-ts остаётся там, где он уже используется. Версии и даты приведены по данным реестра npm на октябрь 2026 года.",en:"The examples are written for Effect 4: Effect 4.0.0 came out on October 1, 2026, and the 3.x line still receives fixes. The predecessor of Effect in TypeScript is the fp-ts library. The fp-ts project has announced that it is merging with the Effect ecosystem, and according to the fp-ts README, Effect can be regarded as the successor to fp-ts v2. The latest fp-ts release, 2.16.11, came out on August 18, 2025. For new code Effect is the sensible choice, while fp-ts stays where it is already in use. Versions and dates are given according to the npm registry as of October 2026."},{type:"text",ru:"Дальше — урок «Как выбрать библиотеку для ФП»: в нём Effect сравнивается с Vanilla JS, Lodash, Ramda, Sanctuary и fp-ts по бюджету, этапу проекта и команде. Документация Effect: effect.website.",en:'Next comes the "How to choose an FP library" lesson: it compares Effect with Vanilla JS, Lodash, Ramda, Sanctuary and fp-ts by budget, project stage and team. The Effect documentation: effect.website.'}],summary:[{ru:"pipe из effect принимает сначала значение, затем шаги: pipe(x, f, g). Option с вариантами Some и None соответствует Maybe, Result с Success и Failure — Either, а Option.getOrElse принимает функцию, а не значение.",en:"pipe from effect takes the value first and then the steps: pipe(x, f, g). Option with Some and None corresponds to Maybe, Result with Success and Failure to Either, and Option.getOrElse takes a function, not a value."},{ru:"Effect<A, E, R> — ленивое описание работы: A — результат, E — возможные ошибки, R — нужные сервисы. Ничего не выполняется до Effect.runPromise или Effect.runSync.",en:"Effect<A, E, R> is a lazy description of the work: A is the result, E the possible errors, R the required services. Nothing runs before Effect.runPromise or Effect.runSync."},{ru:"Ошибки с тегом объявляются через Data.TaggedError, Effect.catchTag обрабатывает их по тегу и убирает из типа. Effect.gen читается как async/await, только вместо await пишется yield*.",en:"Tagged errors are declared with Data.TaggedError, and Effect.catchTag handles them by tag and removes them from the type. Effect.gen reads like async/await, only yield* is written instead of await."},{ru:"Schema описывает данные один раз и даёт из этого описания и тип, и проверку во время выполнения: типы TypeScript сами по себе внешние данные не проверяют.",en:"Schema describes the data once and gives both the type and a run-time check from that description: TypeScript types on their own do not check external data."},{ru:"Effect окупается там, где у ошибки высокая цена: бэкенд, интеграции, долгоживущий код, внешние данные. В скриптах, прототипах и простом фронтенде цена освоения обычно выше пользы.",en:"Effect pays off where an error is costly: backends, integrations, long-lived code, external data. In scripts, prototypes and a simple front end the cost of learning it usually outweighs the benefit."}],exercises:[{task:{ru:"Эффект — описание работы, а не сама работа. Повторите эту идею на чистом JavaScript, без библиотек, с именами как в Effect. sync(thunk) возвращает описание { run: thunk } и ничего не вызывает. map(f)(effect) возвращает новое описание: при запуске оно запустит effect и применит f к результату. runSync(effect) запускает описание и возвращает результат. Счётчик calls показывает, сколько раз «запрос» выполнился на самом деле. Сравните с промисом: что покажет счётчик сразу после new Promise?",en:'An effect is a description of the work, not the work itself. Repeat this idea in plain JavaScript, without libraries, using the names from Effect. sync(thunk) returns a description { run: thunk } and calls nothing. map(f)(effect) returns a new description: when run, it runs effect and applies f to the result. runSync(effect) runs a description and returns the result. The calls counter shows how many times the "request" has actually run. Compare with a promise: what does the counter show right after new Promise?'},starter:{ru:`let calls = 0

// fetchName :: () -> String, «запрос», который считает свои вызовы
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// map :: (a -> b) -> Effect a -> Effect b
// runSync :: Effect a -> a
// ваш код

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`после сборки: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`после двух запусков: \${calls}\`)

new Promise((resolve) => resolve(fetchName()))
console.log(\`сразу после new Promise: \${calls}\`)`,en:`let calls = 0

// fetchName :: () -> String, a "request" that counts its calls
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// map :: (a -> b) -> Effect a -> Effect b
// runSync :: Effect a -> a
// your code

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`after building: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`after two runs: \${calls}\`)

new Promise((resolve) => resolve(fetchName()))
console.log(\`right after new Promise: \${calls}\`)`},solution:{ru:`let calls = 0

// fetchName :: () -> String, «запрос», который считает свои вызовы
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// описание — объект с функцией run, которую пока никто не вызвал
const sync = (thunk) => ({ run: thunk })

// map :: (a -> b) -> Effect a -> Effect b
// новое описание: при запуске запустит effect и применит f, а сейчас ничего не делает
const map = (f) => (effect) => ({ run: () => f(effect.run()) })

// runSync :: Effect a -> a
// единственное место, где работа выполняется
const runSync = (effect) => effect.run()

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`после сборки: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`после двух запусков: \${calls}\`)

// промис начинает работу в момент создания, без всякого запуска
new Promise((resolve) => resolve(fetchName()))
console.log(\`сразу после new Promise: \${calls}\`)`,en:`let calls = 0

// fetchName :: () -> String, a "request" that counts its calls
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// a description is an object with a run function that nobody has called yet
const sync = (thunk) => ({ run: thunk })

// map :: (a -> b) -> Effect a -> Effect b
// a new description: when run, it runs effect and applies f; right now it does nothing
const map = (f) => (effect) => ({ run: () => f(effect.run()) })

// runSync :: Effect a -> a
// the only place where the work is done
const runSync = (effect) => effect.run()

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`after building: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`after two runs: \${calls}\`)

// a promise starts working the moment it is created, with no run at all
new Promise((resolve) => resolve(fetchName()))
console.log(\`right after new Promise: \${calls}\`)`},expected:{ru:`после сборки: 0
JOHN
JOHN
после двух запусков: 2
сразу после new Promise: 3`,en:`after building: 0
JOHN
JOHN
after two runs: 2
right after new Promise: 3`}},{task:{ru:"Ошибки с тегом без библиотеки. Результат — объект { _tag: 'Success', value } или { _tag: 'Failure', error }, и у каждой ошибки тоже есть поле _tag. Напишите findOnline(id): если пользователя с таким id нет, верните Failure с ошибкой { _tag: 'UserNotFound', id }; если он не в сети — Failure с { _tag: 'UserOffline', id }; иначе Success с его именем. Затем напишите catchTag(tag, handler): функцию от результата, которая превращает Failure с ошибкой этого тега в Success со значением handler(error), а любой другой результат возвращает без изменений. Так работает Effect.catchTag: обработанная ошибка исчезает, остальные проходят дальше. Только в Effect обработчик возвращает эффект, например Effect.succeed('гость'), а здесь для простоты — само значение.",en:"Tagged errors without a library. A result is an object { _tag: 'Success', value } or { _tag: 'Failure', error }, and every error has a _tag field too. Write findOnline(id): if there is no user with that id, return a Failure with the error { _tag: 'UserNotFound', id }; if the user is offline, a Failure with { _tag: 'UserOffline', id }; otherwise a Success with the user's name. Then write catchTag(tag, handler): a function of a result that turns a Failure with an error of that tag into a Success with the value handler(error) and returns any other result unchanged. This is how Effect.catchTag works: the handled error disappears, the others pass through. In Effect, though, the handler returns an effect, for example Effect.succeed('guest'); here it returns the value itself for simplicity."},starter:{ru:`const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, разбор по _tag результата и ошибки
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
// catchTag(tag, handler) :: Result -> Result
// ваш код

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'гость')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})`,en:`const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, matching on the _tag of the result and of the error
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
// catchTag(tag, handler) :: Result -> Result
// your code

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'guest')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})`},solution:{ru:`const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, разбор по _tag результата и ошибки
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
const findOnline = (id) => {
  const user = users.find((u) => u.id === id)
  if (user === undefined) return fail({ _tag: 'UserNotFound', id })
  if (user.status !== 'online') return fail({ _tag: 'UserOffline', id })
  return succeed(user.name)
}

// catchTag(tag, handler) :: Result -> Result
// ошибка с этим тегом становится Success, всё остальное проходит без изменений
const catchTag = (tag, handler) => (result) =>
  result._tag === 'Failure' && result.error._tag === tag ? succeed(handler(result.error)) : result

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'гость')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})

// UserOffline никто не обработал: ошибка осталась в результате,
// как в Effect она осталась бы в типе E`,en:`const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, matching on the _tag of the result and of the error
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
const findOnline = (id) => {
  const user = users.find((u) => u.id === id)
  if (user === undefined) return fail({ _tag: 'UserNotFound', id })
  if (user.status !== 'online') return fail({ _tag: 'UserOffline', id })
  return succeed(user.name)
}

// catchTag(tag, handler) :: Result -> Result
// an error with this tag becomes a Success, everything else passes unchanged
const catchTag = (tag, handler) => (result) =>
  result._tag === 'Failure' && result.error._tag === tag ? succeed(handler(result.error)) : result

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'guest')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})

// nobody handled UserOffline: the error stayed in the result,
// just as in Effect it would stay in the E type`},expected:{ru:`1: Success (John)
2: Failure (UserOffline)
3: Success (гость)`,en:`1: Success (John)
2: Failure (UserOffline)
3: Success (guest)`}}]},N={slug:"function-map-filter-reduce",title:{ru:"Функции map, filter, reduce",en:"The map, filter, and reduce functions"},description:{ru:"Что делают map, filter и reduce в JavaScript, как через reduce выразить map и filter и как написать все три самому: циклом, декларативно и через трамплин.",en:"What map, filter and reduce do in JavaScript, how reduce emulates the other two, and how to write all three with a loop, declaratively and via a trampoline."},goal:{ru:"Понять, что делают map, filter и reduce, и научиться реализовывать их самостоятельно: декларативно, императивно и рекурсивно через трамплин.",en:"Understand what map, filter and reduce do, and learn to implement them yourself: declaratively, imperatively and recursively with a trampoline."},blocks:[{type:"text",ru:"Наиболее часто используемыми функциями в функциональном программировании и продакшен коде являются map, filter, reduce.",en:"The most frequently used functions in functional programming and production code are map, filter, and reduce."},{type:"text",ru:"Эти функции обеспечивают мощный функционал работы с данными.",en:"These functions provide powerful capabilities for working with data."},{type:"heading",ru:"map",en:"map"},{type:"text",ru:"Функция map возвращает новый объект того же типа данных, пропуская каждый элемент, если тип итерируемый, через функцию, которую получает в качестве аргумента. Если тип не итерируемый, то просто содержимое с данными пропускается через функцию.",en:"The map function returns a new object of the same data type, passing each element through the function it receives as an argument when the type is iterable. If the type is not iterable, the contained data is simply passed through the function."},{type:"text",ru:"Давайте реализуем функцию map различными способами.",en:"Let's implement the map function in several different ways."},{type:"code",code:{ru:`// каррирование и данные последним аргументом нужны,
// чтобы функции было удобно использовать в композиции
// в бесточечном стиле, не называя данные:
// pipe (mapD (f), filterD (g))

// ==== реализация декларативная ====
// mapD :: (a -> b) -> [a] -> [b]
const mapD = (fn) => (arr) => arr.map(fn)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// mapI :: (a -> b) -> [a] -> [b]
const mapI = (fn) => (arr) => {
  // массив результирующий
  // который будем возвращать
  let result = []

  for (const item of arr) {
    // каждый элемент пропускаем через
    // переданную функцию
    result.push(fn(item)) // или result = [ ...result, fn (item) ]
  }

  return result
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// mapIq :: ((a, Number, [a]) -> b) -> [a] -> [b]
const mapIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    result.push(fn(arr[i], i, arr)) // или result = [ ...result, fn (arr[i], i, arr) ]
  }

  return result
}
// ===================================

// ==== реализация рекурсивная ====
// через трамплин, чтобы стек не переполнился
// надеюсь, вы прочитали раздел про рекурсию

// trampoline :: ((...args -> *) -> (...args -> *))
// вызывает функцию и, пока результат — функция (thunk),
// вызывает его снова: шаги идут в цикле, стек не растёт
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// mapR возвращает либо готовый массив,
// либо функцию без аргументов (thunk) со следующим шагом
const mapR = (fn) => (arr, i = 0, acc = []) => {

  // базовый случай
  // когда элементы закончились возвращаем аккумулятор
  if (i === arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трамплина
  // в аккумулятор кладем результат который пропустили через функцию
  // и переходим к следующему элементу
  // индекс вместо arr.slice(1) и push вместо [...acc, x]:
  // копирование массива на каждом шаге дало бы O(n²),
  // а acc создаётся заново при каждом запуске и снаружи не виден
  return () => {
    acc.push(fn (arr[i]))
    return mapR (fn) (arr, i + 1, acc)
  }
}

// mapTrampoline :: (a -> b) -> [a] -> [b]
// снаружи передаём только массив: индекс и аккумулятор внутренние
const mapTrampoline = (fn) => (arr) => trampoline (mapR (fn)) (arr)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = mapD (v => v * 2) (data)

console.log (result) // [2, 4, 6, 8, 10]
// ===================================`,en:`// currying and taking the data as the last argument
// make these functions easy to use in composition
// in point-free style, without naming the data:
// pipe (mapD (f), filterD (g))

// ==== declarative implementation ====
// mapD :: (a -> b) -> [a] -> [b]
const mapD = (fn) => (arr) => arr.map(fn)
// ===================================

// ==== imperative implementation ====
// without the iteration index and context
// mapI :: (a -> b) -> [a] -> [b]
const mapI = (fn) => (arr) => {
  // the resulting array
  // that we will return
  let result = []

  for (const item of arr) {
    // pass each element through
    // the given function
    result.push(fn(item)) // or result = [ ...result, fn (item) ]
  }

  return result
}
 // ===================================

// ==== imperative implementation ====
// with the iteration index and context
// mapIq :: ((a, Number, [a]) -> b) -> [a] -> [b]
const mapIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    result.push(fn(arr[i], i, arr)) // or result = [ ...result, fn (arr[i], i, arr) ]
  }

  return result
}
// ===================================

// ==== recursive implementation ====
// through a trampoline, so the stack does not overflow
// I hope you have read the lesson on recursion

// trampoline :: ((...args -> *) -> (...args -> *))
// calls the function and, while the result is a function (a thunk),
// calls it again: the steps run in a loop, the stack does not grow
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// mapR returns either the finished array
// or a function with no arguments (a thunk) holding the next step
const mapR = (fn) => (arr, i = 0, acc = []) => {

  // base case
  // when the elements run out, return the accumulator
  if (i === arr.length) {
    return acc
  }

  // recursive case
  // return a function for the trampoline
  // put the result of passing the element through the function into the accumulator
  // and move on to the next element
  // an index instead of arr.slice(1) and push instead of [...acc, x]:
  // copying the array on every step would make it O(n²),
  // and acc is created anew on every run and is not visible outside
  return () => {
    acc.push(fn (arr[i]))
    return mapR (fn) (arr, i + 1, acc)
  }
}

// mapTrampoline :: (a -> b) -> [a] -> [b]
// from the outside we pass only the array: the index and the accumulator are internal
const mapTrampoline = (fn) => (arr) => trampoline (mapR (fn)) (arr)
// ===================================

// ==== run ====
const data = [1, 2, 3, 4, 5]

const result = mapD (v => v * 2) (data)

console.log (result) // [2, 4, 6, 8, 10]
// ===================================`}},{type:"heading",ru:"filter",en:"filter"},{type:"text",ru:"Функция filter возвращает новый объект того же типа данных, пропуская каждый элемент через функцию-предикат и оставляя только те элементы, для которых предикат вернул true (тип итерируемый).",en:"The filter function returns a new object of the same data type, passing each element through a predicate function and keeping only the elements for which the predicate returned true (the type is iterable)."},{type:"text",ru:"Функция-предикат — это функция, которая возвращает true или false. Обычно её передают аргументом в функцию высшего порядка, такую как filter: в JavaScript функции — значения первого класса, их можно передавать, как любые другие значения.",en:"A predicate is a function that returns true or false. It is usually passed as an argument to a higher-order function such as filter: in JavaScript functions are first-class values, so they can be passed around like any other value."},{type:"text",ru:"Давайте реализуем функцию filter различными способами.",en:"Let's implement the filter function in several different ways."},{type:"code",code:{ru:`// каррирование и данные последним аргументом нужны,
// чтобы функции было удобно использовать в композиции
// в бесточечном стиле, не называя данные:
// pipe (mapD (f), filterD (g))

// ==== реализация декларативная ====
// filterD :: (a -> Boolean) -> [a] -> [a]
const filterD = (fn) => (arr) => arr.filter(fn)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// filterI :: (a -> Boolean) -> [a] -> [a]
const filterI = (fn) => (arr) => {
  // массив результирующий
  // который будем возвращать
  let result = []

  for (const item of arr) {
    // каждый элемент пропускаем через
    // функцию-предикат
    // если она вернет true кладем элемент
    // в результирующий массив
    if (fn(item)) {
      result.push(item) // или result = [ ...result, item ]
    }
  }

  return result
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// filterIq :: ((a, Number, [a]) -> Boolean) -> [a] -> [a]
const filterIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    const value = arr[i]

    if (fn(value, i, arr)) {
      result.push(value) // или result = [ ...result, value ]
    }

  }

  return result
}
// ===================================

// ==== реализация рекурсивная ====
// через трамплин, чтобы стек не переполнился
// надеюсь, вы прочитали раздел про рекурсию

// trampoline :: ((...args -> *) -> (...args -> *))
// вызывает функцию и, пока результат — функция (thunk),
// вызывает его снова: шаги идут в цикле, стек не растёт
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// filterR возвращает либо готовый массив,
// либо функцию без аргументов (thunk) со следующим шагом
const filterR = (fn) => (arr, i = 0, acc = []) => {

  // базовый случай
  // когда элементы закончились возвращаем аккумулятор
  if (i === arr.length) {
    return acc
  }

  // рекурсивный случай
  // возвращаем функцию для трамплина
  return () => {
     // текущий элемент
     const head = arr[i]

     // в аккумулятор кладем элемент
     // если функция-предикат вернула true
     // иначе аккумулятор остаётся прежним
     if (fn (head)) {
       acc.push(head)
     }

     // переходим к следующему элементу
     // индекс и push вместо [head, ...tail] и [...acc, head]:
     // копирование массива на каждом шаге дало бы O(n²)
     return filterR (fn) (arr, i + 1, acc)
  }
}

// filterTrampoline :: (a -> Boolean) -> [a] -> [a]
// снаружи передаём только массив: индекс и аккумулятор внутренние
const filterTrampoline = (fn) => (arr) => trampoline (filterR (fn)) (arr)
// ===================================

// ==== запуск ====
const data = [1, 2, 3, 4, 5]

const result = filterD (v => v > 3) (data)

console.log (result) // [4, 5]
// ===================================`,en:`// currying and taking the data as the last argument
// make these functions easy to use in composition
// in point-free style, without naming the data:
// pipe (mapD (f), filterD (g))

// ==== declarative implementation ====
// filterD :: (a -> Boolean) -> [a] -> [a]
const filterD = (fn) => (arr) => arr.filter(fn)
// ===================================

// ==== imperative implementation ====
// without the iteration index and context
// filterI :: (a -> Boolean) -> [a] -> [a]
const filterI = (fn) => (arr) => {
  // the resulting array
  // that we will return
  let result = []

  for (const item of arr) {
    // pass each element through
    // the predicate function
    // if it returns true, put the element
    // into the resulting array
    if (fn(item)) {
      result.push(item) // or result = [ ...result, item ]
    }
  }

  return result
}
 // ===================================

// ==== imperative implementation ====
// with the iteration index and context
// filterIq :: ((a, Number, [a]) -> Boolean) -> [a] -> [a]
const filterIq = (fn) => (arr) => {
  let result = []

  for (let i = 0; i < arr.length; i++ ) {
    const value = arr[i]

    if (fn(value, i, arr)) {
      result.push(value) // or result = [ ...result, value ]
    }

  }

  return result
}
// ===================================

// ==== recursive implementation ====
// through a trampoline, so the stack does not overflow
// I hope you have read the lesson on recursion

// trampoline :: ((...args -> *) -> (...args -> *))
// calls the function and, while the result is a function (a thunk),
// calls it again: the steps run in a loop, the stack does not grow
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// filterR returns either the finished array
// or a function with no arguments (a thunk) holding the next step
const filterR = (fn) => (arr, i = 0, acc = []) => {

  // base case
  // when the elements run out, return the accumulator
  if (i === arr.length) {
    return acc
  }

  // recursive case
  // return a function for the trampoline
  return () => {
     // the current element
     const head = arr[i]

     // put the element into the accumulator
     // if the predicate function returned true,
     // otherwise the accumulator stays the same
     if (fn (head)) {
       acc.push(head)
     }

     // move on to the next element
     // an index and push instead of [head, ...tail] and [...acc, head]:
     // copying the array on every step would make it O(n²)
     return filterR (fn) (arr, i + 1, acc)
  }
}

// filterTrampoline :: (a -> Boolean) -> [a] -> [a]
// from the outside we pass only the array: the index and the accumulator are internal
const filterTrampoline = (fn) => (arr) => trampoline (filterR (fn)) (arr)
// ===================================

// ==== run ====
const data = [1, 2, 3, 4, 5]

const result = filterD (v => v > 3) (data)

console.log (result) // [4, 5]
// ===================================`}},{type:"heading",ru:"reduce",en:"reduce"},{type:"text",ru:"Функция reduce возвращает любой тип данных, она в качестве аргументов принимает функцию и аккумулятор.",en:"The reduce function can return any data type; it takes a function and an accumulator as its arguments."},{type:"text",ru:"Функция в качестве аргумента принимает аккумулятор (инициализации или последующих вызовов) и текущий элемент, пропускает через логику функции эти данные и возвращает новый аккумулятор или вносит в текущий аккумулятор изменения.",en:"As arguments, the function takes the accumulator (from the initial value or from subsequent calls) and the current element, passes this data through the function's logic, and returns a new accumulator or applies changes to the current accumulator."},{type:"text",ru:"Аккумулятором (значением при инициализации) может быть любое значение.",en:"The accumulator (the initial value) can be any value."},{type:"text",ru:"Функцией reduce можно сымитировать любое кастомное поведение, а также поведение map и filter. Но обычно её используют для сбора конкретно каких-то данных по определенной логике из итерируемого типа объекта.",en:"With reduce you can emulate any custom behavior, as well as the behavior of map and filter. But it is usually used to collect specific data according to a particular logic from an iterable object type."},{type:"code",code:{ru:`// каррирование и данные последним аргументом нужны,
// чтобы функции было удобно использовать в композиции
// в бесточечном стиле, не называя данные:
// pipe (mapD (f), filterD (g))

// ==== реализация декларативная ====
// reduceD :: ((a, b) -> a) -> a -> [b] -> a
const reduceD = (fn) => (init) => (arr) => arr.reduce(fn, init)
// ===================================

// ==== реализация императивная ====
// без индекса итерации и контекста
// reduceI :: ((a, b) -> a) -> a -> [b] -> a
const reduceI = (fn) => (init) => (arr) => {

  // значение которое будем возвращать
  // устанавливаем ему инициализационное значение
  let accumulator = init

  for (const item of arr) {
    // вызываем функцию
    // с первым аргументом аккумулятором
    // вторым аргументом текущим элементом массива
    // результат вызова кладем в аккумулятор
    // чтобы при след вызове результат предыдущего сохранялся
    accumulator = fn (accumulator, item)
  }

  return accumulator
}
 // ===================================

// ==== реализация императивная ====
// с индексом итерации и контекстом
// reduceIq :: ((a, b, Number, [b]) -> a) -> a -> [b] -> a
const reduceIq = (fn) => (init) => (arr) => {

  let accumulator = init

  for (let i = 0; i < arr.length; i++ ) {
    accumulator = fn (accumulator, arr[i], i, arr)
  }

  return accumulator
}
// ===================================

// ==== реализация рекурсивная ====
// через трамплин, чтобы стек не переполнился
// надеюсь, вы прочитали раздел про рекурсию

// trampoline :: ((...args -> *) -> (...args -> *))
// вызывает функцию и, пока результат — функция (thunk),
// вызывает его снова: шаги идут в цикле, стек не растёт
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// reduceR возвращает либо итоговое значение,
// либо функцию без аргументов (thunk) со следующим шагом
const reduceR = (fn) => (init) => (arr, i = 0) => {

  // базовый случай
  // когда элементы закончились возвращаем аккумулятор
  if (i === arr.length) {
    return init
  }

  // рекурсивный случай
  // возвращаем функцию для трамплина
  return () => {
     // аккумулятор который будем возвращать
     // пропускаем через функцию
     // старый аккумулятор и текущее значение
     const nextInit = fn (init, arr[i])

     // вызываем заново функцию
     // с той же функцией
     // новым аккумулятором пропущенным через функцию
     // и следующим индексом: индекс вместо [head, ...tail],
     // чтобы не копировать массив на каждом шаге
     return reduceR (fn) (nextInit) (arr, i + 1)
  }
}

// reduceTrampoline :: ((a, b) -> a) -> a -> [b] -> a
// снаружи передаём только массив: индекс внутренний
// ограничение трамплина: если итоговое значение само функция,
// трамплин примет его за следующий шаг и вызовет
const reduceTrampoline = (fn) => (init) => (arr) => trampoline (reduceR (fn) (init)) (arr)
// ===================================

// ==== запуск ====
const data = [1, 2, 3]

const result = reduceD ((a, b) => a + b) (0) (data)

console.log (result) // 6
// ===================================`,en:`// currying and taking the data as the last argument
// make these functions easy to use in composition
// in point-free style, without naming the data:
// pipe (mapD (f), filterD (g))

// ==== declarative implementation ====
// reduceD :: ((a, b) -> a) -> a -> [b] -> a
const reduceD = (fn) => (init) => (arr) => arr.reduce(fn, init)
// ===================================

// ==== imperative implementation ====
// without the iteration index and context
// reduceI :: ((a, b) -> a) -> a -> [b] -> a
const reduceI = (fn) => (init) => (arr) => {

  // the value we will return
  // starts with the initial value
  let accumulator = init

  for (const item of arr) {
    // call the function
    // with the accumulator as the first argument
    // and the current array element as the second
    // store the result in the accumulator
    // so the next call builds on the previous result
    accumulator = fn (accumulator, item)
  }

  return accumulator
}
 // ===================================

// ==== imperative implementation ====
// with the iteration index and context
// reduceIq :: ((a, b, Number, [b]) -> a) -> a -> [b] -> a
const reduceIq = (fn) => (init) => (arr) => {

  let accumulator = init

  for (let i = 0; i < arr.length; i++ ) {
    accumulator = fn (accumulator, arr[i], i, arr)
  }

  return accumulator
}
// ===================================

// ==== recursive implementation ====
// through a trampoline, so the stack does not overflow
// I hope you have read the lesson on recursion

// trampoline :: ((...args -> *) -> (...args -> *))
// calls the function and, while the result is a function (a thunk),
// calls it again: the steps run in a loop, the stack does not grow
const trampoline = (fn) => (...args) => {
  let result = fn(...args)

  while (typeof result === 'function') {
    result = result()
  }

  return result
}

// reduceR returns either the final value
// or a function with no arguments (a thunk) holding the next step
const reduceR = (fn) => (init) => (arr, i = 0) => {

  // base case
  // when the elements run out, return the accumulator
  if (i === arr.length) {
    return init
  }

  // recursive case
  // return a function for the trampoline
  return () => {
     // the accumulator we will return:
     // pass the old accumulator and the current value
     // through the function
     const nextInit = fn (init, arr[i])

     // call the function again
     // with the same function,
     // the new accumulator
     // and the next index: an index instead of [head, ...tail],
     // so the array is not copied on every step
     return reduceR (fn) (nextInit) (arr, i + 1)
  }
}

// reduceTrampoline :: ((a, b) -> a) -> a -> [b] -> a
// from the outside we pass only the array: the index is internal
// a limitation of the trampoline: if the final value is itself a function,
// the trampoline takes it for the next step and calls it
const reduceTrampoline = (fn) => (init) => (arr) => trampoline (reduceR (fn) (init)) (arr)
// ===================================

// ==== run ====
const data = [1, 2, 3]

const result = reduceD ((a, b) => a + b) (0) (data)

console.log (result) // 6
// ===================================`}}],summary:[{ru:"map возвращает новый объект того же типа данных, пропуская каждый элемент через переданную функцию.",en:"map returns a new object of the same data type, passing each element through the given function."},{ru:"filter возвращает новый объект того же типа данных и оставляет только те элементы, для которых функция-предикат вернула true.",en:"filter returns a new object of the same data type and keeps only the elements for which the predicate returned true."},{ru:"reduce принимает функцию и аккумулятор и может вернуть данные любого типа; с её помощью можно сымитировать и map, и filter.",en:"reduce takes a function and an accumulator and can return any data type; with it you can emulate both map and filter."},{ru:"Каррирование и данные последним аргументом позволяют использовать эти функции в композиции в бесточечном стиле, не называя данные.",en:"Currying and taking the data as the last argument let you use these functions in composition in point-free style, without naming the data."},{ru:"Рекурсивные версии работают через трамплин и идут по индексу: копирование массива на каждом шаге дало бы O(n²).",en:"The recursive versions run through a trampoline and walk the array by index: copying the array on every step would make them O(n²)."}],exercises:[{task:{ru:"В уроке сказано, что через reduce можно сымитировать map и filter. Напишите каррированные функции mapVia и filterVia с данными последним аргументом, внутри которых работает только reduce. Затем соберите из них через pipe функцию onlineNames, которая возвращает имена пользователей в сети.",en:"The lesson says that reduce can emulate map and filter. Write curried functions mapVia and filterVia that take the data as the last argument and use only reduce inside. Then use pipe to build an onlineNames function from them that returns the names of the users who are online."},starter:{ru:`// pipe из урока «Композиция функций»
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// mapVia :: (a -> b) -> [a] -> [b]
const mapVia = (fn) => (arr) => {
  // ваш код
}

// filterVia :: (a -> Boolean) -> [a] -> [a]
const filterVia = (fn) => (arr) => {
  // ваш код
}

// onlineNames :: [Object] -> [String]
const onlineNames = pipe(
  // ваш код: filterVia и mapVia
)

console.log(onlineNames(users))
console.log(mapVia((n) => n * 2)([1, 2, 3]))`,en:`// pipe from the "Function composition" lesson
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// mapVia :: (a -> b) -> [a] -> [b]
const mapVia = (fn) => (arr) => {
  // your code
}

// filterVia :: (a -> Boolean) -> [a] -> [a]
const filterVia = (fn) => (arr) => {
  // your code
}

// onlineNames :: [Object] -> [String]
const onlineNames = pipe(
  // your code: filterVia and mapVia
)

console.log(onlineNames(users))
console.log(mapVia((n) => n * 2)([1, 2, 3]))`},solution:{ru:`// pipe из урока «Композиция функций»
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// аккумулятор [] создаётся заново при каждом вызове и снаружи не виден,
// поэтому push в него не меняет ничьих данных

// mapVia :: (a -> b) -> [a] -> [b]
// каждый элемент пропускаем через fn и кладём результат в аккумулятор
const mapVia = (fn) => (arr) =>
  arr.reduce((acc, item) => {
    acc.push(fn(item))
    return acc
  }, [])

// filterVia :: (a -> Boolean) -> [a] -> [a]
// в аккумулятор попадают только элементы, для которых предикат вернул true
const filterVia = (fn) => (arr) =>
  arr.reduce((acc, item) => {
    if (fn(item)) {
      acc.push(item)
    }
    return acc
  }, [])

// onlineNames :: [Object] -> [String]
// бесточечный стиль: данные не называем, они придут в pipe последними
const onlineNames = pipe(
  filterVia((user) => user.status === 'online'),
  mapVia((user) => user.name),
)

console.log(onlineNames(users))
console.log(mapVia((n) => n * 2)([1, 2, 3]))`,en:`// pipe from the "Function composition" lesson
const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x)

const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// the [] accumulator is created anew on every call and is not visible outside,
// so pushing into it changes nobody's data

// mapVia :: (a -> b) -> [a] -> [b]
// pass each element through fn and put the result into the accumulator
const mapVia = (fn) => (arr) =>
  arr.reduce((acc, item) => {
    acc.push(fn(item))
    return acc
  }, [])

// filterVia :: (a -> Boolean) -> [a] -> [a]
// only the elements for which the predicate returned true get into the accumulator
const filterVia = (fn) => (arr) =>
  arr.reduce((acc, item) => {
    if (fn(item)) {
      acc.push(item)
    }
    return acc
  }, [])

// onlineNames :: [Object] -> [String]
// point-free style: we don't name the data, it comes into pipe last
const onlineNames = pipe(
  filterVia((user) => user.status === 'online'),
  mapVia((user) => user.name),
)

console.log(onlineNames(users))
console.log(mapVia((n) => n * 2)([1, 2, 3]))`},expected:{ru:`[
  "John",
  "Angel"
]
[
  2,
  4,
  6
]`,en:`[
  "John",
  "Angel"
]
[
  2,
  4,
  6
]`}},{task:{ru:"reduce может вернуть данные любого типа, например объект. Напишите каррированную функцию countBy: первым аргументом она принимает функцию, которая возвращает ключ элемента, вторым — массив, и через reduce возвращает объект, где у каждого ключа указано, у скольких элементов он получился. Посчитайте пользователей по статусу, а числа от 1 до 5 — по чётности.",en:"reduce can return any data type, an object for example. Write a curried function countBy: its first argument is a function that returns an element's key, its second is an array, and it uses reduce to return an object that shows, for each key, how many elements produced it. Count the users by status, and the numbers from 1 to 5 by parity."},starter:{ru:`const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// countBy :: (a -> String) -> [a] -> Object
const countBy = (fn) => (arr) => {
  // ваш код
}

console.log(countBy((user) => user.status)(users))
console.log(countBy((n) => (n % 2 === 0 ? 'even' : 'odd'))([1, 2, 3, 4, 5]))`,en:`const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// countBy :: (a -> String) -> [a] -> Object
const countBy = (fn) => (arr) => {
  // your code
}

console.log(countBy((user) => user.status)(users))
console.log(countBy((n) => (n % 2 === 0 ? 'even' : 'odd'))([1, 2, 3, 4, 5]))`},solution:{ru:`const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// countBy :: (a -> String) -> [a] -> Object
// аккумулятор — объект {}, он создаётся заново при каждом вызове
const countBy = (fn) => (arr) =>
  arr.reduce((acc, item) => {
    // ключ текущего элемента
    const key = fn(item)
    // первый раз ключ получает 1, дальше счётчик растёт на единицу
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

console.log(countBy((user) => user.status)(users))
console.log(countBy((n) => (n % 2 === 0 ? 'even' : 'odd'))([1, 2, 3, 4, 5]))`,en:`const users = [
  { name: 'John', status: 'online', age: 28 },
  { name: 'Angel', status: 'online', age: 35 },
  { name: 'Michel', status: 'offline', age: 18 },
  { name: 'Anna', status: 'offline', age: 20 },
]

// countBy :: (a -> String) -> [a] -> Object
// the accumulator is a {} object, created anew on every call
const countBy = (fn) => (arr) =>
  arr.reduce((acc, item) => {
    // the key of the current element
    const key = fn(item)
    // a key gets 1 the first time, then its counter grows by one
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, {})

console.log(countBy((user) => user.status)(users))
console.log(countBy((n) => (n % 2 === 0 ? 'even' : 'odd'))([1, 2, 3, 4, 5]))`},expected:{ru:`{
  "online": 2,
  "offline": 2
}
{
  "odd": 3,
  "even": 2
}`,en:`{
  "online": 2,
  "offline": 2
}
{
  "odd": 3,
  "even": 2
}`}}]},x={slug:"first-class-and-higher-order-functions",title:{ru:"Функции первого класса и высшего порядка",en:"First-class and higher-order functions"},description:{ru:"Функции первого класса как свойство JavaScript и функции высшего порядка, которые принимают или возвращают функции: map, HOC в React и слоты во Vue.",en:"First-class functions as a property of JavaScript, and higher-order functions that take or return functions: map, React HOCs and Vue slots."},goal:{ru:"Понять разницу между функциями первого класса — свойством языка — и функциями высшего порядка, которые принимают или возвращают функции, и научиться писать свои функции высшего порядка.",en:"Understand the difference between first-class functions, a property of the language, and higher-order functions, which take or return functions, and learn to write your own higher-order functions."},blocks:[{type:"text",ru:"Функции в JavaScript — первого класса, и благодаря этому в нем можно писать функции высшего порядка.",en:"Functions in JavaScript are first-class, and that is what makes higher-order functions possible."},{type:"text",ru:"Функции первого класса — это свойство языка: функции в нем такие же значения, как числа или строки. Функцию можно присвоить переменной, передать аргументом в другую функцию и вернуть из функции.",en:"First-class functions are a property of the language: in it, functions are values just like numbers or strings. A function can be assigned to a variable, passed as an argument to another function, and returned from a function."},{type:"text",ru:"Функциями высшего порядка принято называть функции, которые принимают другие функции в качестве аргумента или возвращают функцию.",en:"Higher-order functions is the term commonly used for functions that accept other functions as arguments or return a function."},{type:"code",code:{ru:`// Простой пример
// ===============================
const data = [1, 2, 3, 4]

// multiply можно передать аргументом в другую функцию,
// потому что функции в JavaScript первого класса:
// это такие же значения, как числа или строки
// multiply :: Number -> Number
const multiply = (v) => v * 2

// функция map — это функция
// высшего порядка,
// потому что принимает другую функцию
// в качестве аргумента
const result = data.map(multiply)

console.log (result) // [2, 4, 6, 8]`,en:`// A simple example
// ===============================
const data = [1, 2, 3, 4]

// multiply can be passed as an argument to another function,
// because functions in JavaScript are first-class:
// they are values just like numbers or strings
// multiply :: Number -> Number
const multiply = (v) => v * 2

// map is a
// higher-order function,
// because it takes another function
// as an argument
const result = data.map(multiply)

console.log (result) // [2, 4, 6, 8]`}},{type:"text",ru:"Если коротко, функция, которая принимает или возвращает функцию, — это функция высшего порядка. А «первого класса» — это не роль функции в вызове, а свойство языка: в JavaScript любую функцию можно передать или вернуть, как обычное значение.",en:'In short, a function that takes or returns a function is a higher-order function. "First-class", on the other hand, is not the role a function plays in a call but a property of the language: in JavaScript any function can be passed or returned like an ordinary value.'},{type:"text",ru:"В React компонент — это значение (функция или класс), поэтому его можно передать в функцию: компонент высшего порядка (HOC) — это функция, которая принимает компонент и возвращает новый компонент. Во Vue компонент обычно описывается объектом опций, а не функцией (обычной функцией бывает только функциональный компонент), но идея та же: компоненты и слоты передаются как значения, а слоты в render-функциях — это функции, которые получают данные и возвращают виртуальные узлы (vnodes).",en:"In React a component is a value (a function or a class), so it can be passed to a function: a higher-order component (HOC) is a function that takes a component and returns a new component. In Vue a component is usually described by an options object rather than a function (only a functional component is a plain function), but the idea is the same: components and slots are passed around as values, and in render functions slots are functions that receive data and return virtual nodes (vnodes)."},{type:"code",code:{ru:`// Простой пример
// ===============================

// hof :: (* -> *) -> * -> *
const hof = (fc) => (...args) => fc (...args)

// функция hof — это функция высшего порядка:
// она принимает функцию fc и возвращает новую функцию

// fc можно передать в hof, потому что функции
// в JavaScript первого класса

// Пример в духе слотов Vue (и render props в React)
// MyComponent — функция высшего порядка: она принимает функции-слоты
// и вызывает их, передавая им данные, как scoped slot
// Это не компонент высшего порядка (HOC): HOC принимает компонент и возвращает новый компонент
// Упрощенная модель: настоящий Vue возвращает не строки, а виртуальные узлы
function MyComponent({ main, default: def } = {}) {
  const greetingMessage = 'hello'

  if (main) {
    return \`<div>main - \${ main (greetingMessage)}</div>\`
  }

  if (def) {
    return \`default - \${def(greetingMessage)}\`
  }

  return 'нет компонентов'
}

// вызов функции высшего порядка: передаем ей функции-слоты
const templateMain = MyComponent({
  main: (text) => \`XXX\${text}XXX\`
})

const templateDefault = MyComponent({
  default: (text) => \`\${text}\`
})

console.log(templateMain)    // <div>main - XXXhelloXXX</div>
console.log(templateDefault) // default - hello`,en:`// A simple example
// ===============================

// hof :: (* -> *) -> * -> *
const hof = (fc) => (...args) => fc (...args)

// hof is a higher-order function:
// it takes the function fc and returns a new function

// fc can be passed to hof because functions
// in JavaScript are first-class

// An example in the spirit of Vue slots (and render props in React)
// MyComponent is a higher-order function: it takes slot functions
// and calls them, passing data to them, like a scoped slot
// This is not a higher-order component (HOC): a HOC takes a component and returns a new component
// A simplified model: real Vue returns virtual nodes, not strings
function MyComponent({ main, default: def } = {}) {
  const greetingMessage = 'hello'

  if (main) {
    return \`<div>main - \${ main (greetingMessage)}</div>\`
  }

  if (def) {
    return \`default - \${def(greetingMessage)}\`
  }

  return 'no components'
}

// calling the higher-order function: we pass slot functions to it
const templateMain = MyComponent({
  main: (text) => \`XXX\${text}XXX\`
})

const templateDefault = MyComponent({
  default: (text) => \`\${text}\`
})

console.log(templateMain)    // <div>main - XXXhelloXXX</div>
console.log(templateDefault) // default - hello`}}],summary:[{ru:"Функции первого класса — свойство языка: в JavaScript функции такие же значения, как числа или строки. Функцию можно присвоить переменной, передать аргументом в другую функцию и вернуть из функции.",en:"First-class functions are a property of the language: in JavaScript, functions are values just like numbers or strings. A function can be assigned to a variable, passed as an argument to another function, and returned from a function."},{ru:"Функция высшего порядка принимает другую функцию в качестве аргумента или возвращает функцию. map — функция высшего порядка, потому что принимает другую функцию.",en:"A higher-order function takes another function as an argument or returns a function. map is a higher-order function because it takes another function."},{ru:"«Первого класса» — это не роль функции в вызове, а свойство языка. Именно благодаря ему в JavaScript можно писать функции высшего порядка.",en:'"First-class" is not the role a function plays in a call but a property of the language. It is what makes higher-order functions possible in JavaScript.'},{ru:"Компонент высшего порядка (HOC) в React — функция, которая принимает компонент и возвращает новый компонент. Во Vue слоты в render-функциях — это функции, которые получают данные и возвращают виртуальные узлы.",en:"A higher-order component (HOC) in React is a function that takes a component and returns a new component. In Vue render functions, slots are functions that receive data and return virtual nodes."}],exercises:[{task:{ru:"Напишите функцию высшего порядка twice: она принимает функцию fn и возвращает новую функцию, которая применяет fn к значению дважды. Проверьте ее на add3 и double, а затем передайте в twice результат самой twice.",en:"Write a higher-order function twice: it takes a function fn and returns a new function that applies fn to a value twice. Check it with add3 and double, then pass the result of twice back into twice."},starter:{ru:`// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// ваш код

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice вернула функцию, ее можно снова передать в twice`,en:`// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// your code

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice returned a function, so it can be passed to twice again`},solution:{ru:`// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// принимает функцию fn и возвращает новую функцию
const twice = (fn) => (x) => fn(fn(x))

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice вернула функцию, ее можно снова передать в twice`,en:`// add3 :: Number -> Number
const add3 = (x) => x + 3

// double :: Number -> Number
const double = (x) => x * 2

// twice :: (a -> a) -> a -> a
// takes the function fn and returns a new function
const twice = (fn) => (x) => fn(fn(x))

console.log(twice(add3)(10))
console.log(twice(double)(5))
console.log(twice(twice(double))(3)) // twice returned a function, so it can be passed to twice again`},expected:{ru:`16
20
48`,en:`16
20
48`}},{task:{ru:"Напишите функцию высшего порядка withLog: она принимает имя, затем функцию и возвращает новую функцию, которая возвращает тот же результат, что и исходная, и печатает строку вида «double(1) = 2». Передайте обернутую функцию в map, как multiply в уроке.",en:'Write a higher-order function withLog: it takes a name, then a function, and returns a new function that returns the same result as the original one and prints a line like "double(1) = 2". Pass the wrapped function to map, as multiply is passed in the lesson.'},starter:{ru:`// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// ваш код

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`,en:`// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// your code

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`},solution:{ru:`// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// withLog(name) принимает функцию fn и возвращает новую: тот же результат плюс строка в консоли
const withLog = (name) => (fn) => (x) => {
  const value = fn(x)
  console.log(\`\${name}(\${x}) = \${value}\`)
  return value
}

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`,en:`// double :: Number -> Number
const double = (x) => x * 2

// withLog :: String -> (Number -> Number) -> Number -> Number
// withLog(name) takes the function fn and returns a new one: the same result plus a line in the console
const withLog = (name) => (fn) => (x) => {
  const value = fn(x)
  console.log(\`\${name}(\${x}) = \${value}\`)
  return value
}

const loggedDouble = withLog('double')(double)

const doubled = [1, 2, 3].map(loggedDouble)

console.log(doubled)`},expected:{ru:`double(1) = 2
double(2) = 4
double(3) = 6
[
  2,
  4,
  6
]`,en:`double(1) = 2
double(2) = 4
double(3) = 6
[
  2,
  4,
  6
]`}}]},k={slug:"closures",title:{ru:"Замыкания",en:"Closures"},description:{ru:"Замыкания в JavaScript: как функция помнит переменные места создания, фабрики функций, приватное состояние, ловушка var в цикле и утечки памяти.",en:"Closures in JavaScript: how a function remembers variables from where it was created, function factories, private state, the var loop trap and memory leaks."},goal:{ru:"Понять, как функция запоминает переменные того места, где она создана, и научиться применять замыкания для фабрик функций и приватного состояния, не попадая в ловушку var в цикле.",en:"Understand how a function remembers the variables of the place where it was created, and learn to use closures for function factories and private state without falling into the var-in-a-loop trap."},blocks:[{type:"text",ru:"Замыкание — это функция вместе с переменными того места, где она была создана. В уроке «Функции первого класса и высшего порядка» функции возвращали другие функции. Возвращённая функция продолжает пользоваться переменными внешней функции, даже когда та уже завершилась: она их «помнит». В JavaScript замыкание получает каждая функция в момент создания, специального синтаксиса для него нет.",en:'A closure is a function together with the variables of the place where it was created. In the "First-class and higher-order functions" lesson, functions returned other functions. The returned function keeps using the variables of the outer function even after that function has finished: it "remembers" them. In JavaScript every function gets a closure at the moment it is created; there is no special syntax for it.'},{type:"heading",ru:"Лексическое окружение",en:"The lexical environment"},{type:"text",ru:"Каждый вызов функции, а также каждый блок с объявлениями let и const, создаёт лексическое окружение — запись с локальными переменными и ссылкой на внешнее окружение. Функция при создании сохраняет ссылку на окружение, в котором её написали: в спецификации это внутреннее поле [[Environment]]. Когда функции нужна переменная, движок ищет её в собственном окружении функции, затем во внешнем и так далее до глобального. «Лексическое» значит, что цепочку определяет место функции в тексте программы, а не место её вызова.",en:`Every function call, as well as every block with let and const declarations, creates a lexical environment: a record of local variables plus a reference to the outer environment. When a function is created, it stores a reference to the environment in which it was written; the specification calls this internal slot [[Environment]]. When the function needs a variable, the engine looks for it in the function's own environment, then in the outer one, and so on up to the global one. "Lexical" means that the chain is determined by where the function appears in the program text, not by where it is called.`},{type:"code",code:{ru:`// Область видимости определяется местом, где функция написана
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
console.log(readCount()) // 5: функция видит текущее значение count`,en:`// Scope is determined by the place where the function is written
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
console.log(readCount()) // 5: the function sees the current value of count`}},{type:"text",ru:"Обратите внимание на последний пример: замыкание хранит не снимок значений, а ссылку на сами переменные. Если переменную изменить после создания функции, функция увидит новое значение. На этом построены и полезные приёмы, и самая известная ловушка с замыканиями, о ней ниже.",en:"Note the last example: a closure keeps not a snapshot of values but a reference to the variables themselves. If a variable changes after the function was created, the function sees the new value. Both useful techniques and the best-known closure trap are built on this; the trap is covered below."},{type:"heading",ru:"Фабрики функций",en:"Function factories"},{type:"text",ru:"Фабрика функций — это функция, которая создаёт и возвращает новые функции, настроенные её аргументами. Каждый вызов фабрики создаёт новое окружение, поэтому полученные функции независимы: у каждой свои значения переменных.",en:"A function factory is a function that creates and returns new functions configured by its arguments. Every call of the factory creates a new environment, so the resulting functions are independent: each one has its own values of the variables."},{type:"code",code:{ru:`// Фабрика функций
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
console.log(inEuros(15)) // 15 EUR`,en:`// A function factory
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
console.log(inEuros(15)) // 15 EUR`}},{type:"heading",ru:"Приватное состояние",en:"Private state"},{type:"text",ru:"Переменные внешней функции недоступны снаружи: прочитать или изменить их можно только через функции, которые она вернула. Так в JavaScript получают приватное состояние без классов. У классов для этого с ES2022 есть поля с решёткой (#count), но замыкания по-прежнему встречаются повсюду: в модулях, обработчиках событий, хуках React и композаблах Vue.",en:"The variables of the outer function cannot be reached from outside: they can be read or changed only through the functions it returned. This is how JavaScript gets private state without classes. Since ES2022 classes have hash-prefixed fields for this (#count), but closures are still everywhere: in modules, event handlers, React hooks and Vue composables."},{type:"code",code:{ru:`// Счётчик с приватным состоянием
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
console.log(first.value()) // 0`,en:`// A counter with private state
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
console.log(first.value()) // 0`}},{type:"text",ru:"Такие функции не чистые: increment() без аргументов каждый раз возвращает новое число. Это допустимо, когда состояние спрятано в небольшом модуле и меняется только через его функции, — подробнее об этом в уроке «Чистые функции». Но чем больше функций разделяют одно изменяемое состояние, тем труднее понять, кто и когда его поменял.",en:'Functions like these are not pure: increment() with no arguments returns a new number every time. This is acceptable when the state is hidden inside a small module and changes only through its functions; the "Pure functions" lesson says more about this. But the more functions share one piece of mutable state, the harder it is to tell who changed it and when.'},{type:"heading",ru:"Замыкания в каррировании и частичном применении",en:"Closures in currying and partial application"},{type:"text",ru:"Каррирование и частичное применение целиком держатся на замыканиях. Каррированная функция получает аргументы по частям и, пока их не хватает, возвращает новую функцию, которая помнит уже полученные. Частичное применение заранее фиксирует часть аргументов, и они хранятся в замыкании до последнего вызова. Подробно оба приёма разобраны в уроках «Каррирование» и «Частичное применение», а здесь важно увидеть, где именно хранятся аргументы.",en:'Currying and partial application rest entirely on closures. A curried function takes its arguments in parts and, while some are missing, returns a new function that remembers the ones already received. Partial application fixes some of the arguments in advance, and they are kept in a closure until the final call. Both techniques are covered in detail in the "Currying" and "Partial application" lessons; here the point is to see where exactly the arguments are stored.'},{type:"code",code:{ru:`// Каррирование: a хранится в замыкании, пока не придёт b
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
console.log(sayHello('Олег')) // Привет, Олег!`,en:`// Currying: a is kept in the closure until b arrives
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
console.log(sayHello('Oleg')) // Hello, Oleg!`}},{type:"heading",ru:"Ловушка: var в цикле",en:"The trap: var in a loop"},{type:"text",ru:"Классическая ошибка с замыканиями — колбэки, созданные в цикле с var. Область видимости var — вся функция, поэтому на весь цикл приходится одна переменная i. Все три колбэка замыкают одну и ту же переменную, а setTimeout вызывает их, когда цикл уже закончился и i равна 3. С let в заголовке цикла for на каждой итерации создаётся новая переменная со значением с предыдущего шага, и каждый колбэк получает свою.",en:"The classic closure mistake is callbacks created in a loop with var. The scope of a var is the whole function, so the entire loop has a single variable i. All three callbacks close over the same variable, and setTimeout calls them after the loop has finished and i equals 3. With let in the header of a for loop, every iteration gets a new variable holding the value from the previous step, so each callback gets its own."},{type:"code",code:{ru:`// var: одна переменная i на весь цикл
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
// let: 2`,en:`// var: a single variable i for the whole loop
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
// let: 2`}},{type:"text",ru:"До появления let в ES2015 ошибку исправляли функцией: колбэк создавали внутри другой функции, которой передавали текущее значение i, — сразу вызванной (IIFE) или фабрики. Каждый вызов такой функции создавал новое окружение, и колбэк запоминал своё значение. Этот способ вы опробуете в упражнении.",en:"Before let arrived in ES2015, the mistake was fixed with a function: the callback was created inside another function that received the current value of i, either an immediately invoked one (IIFE) or a factory. Every call of that function created a new environment, and the callback remembered its own value. You will try this approach in the exercise."},{type:"heading",ru:"Замыкания и память",en:"Closures and memory"},{type:"text",ru:"Пока функция достижима, её окружение тоже остаётся в памяти: сборщик мусора не может освободить переменные, которые она может прочитать. Само по себе это не утечка: когда на функцию не остаётся ссылок, освобождается и окружение. Утечка начинается, когда функция живёт дольше, чем нужно, и держит большие данные: обработчик события, который забыли снять, setInterval без clearInterval, массив колбэков в модуле, который только растёт.",en:"As long as a function is reachable, its environment stays in memory too: the garbage collector cannot free variables the function might read. That alone is not a leak: once nothing references the function, its environment is freed as well. A leak starts when a function lives longer than needed and holds on to large data: an event handler nobody removed, a setInterval without clearInterval, an array of callbacks in a module that only grows."},{type:"text",ru:"Чтобы замыкание не держало лишнего, снимайте обработчики и таймеры, когда они больше не нужны, и не захватывайте большие объекты целиком: возьмите из них нужные значения до создания функции. Движки помогают, но не во всём. V8, например, сохраняет только переменные, которые использует хотя бы одна вложенная функция, но эти переменные общие для всех функций, созданных при одном вызове внешней. Если одна из них читает большой массив, массив останется в памяти, пока жива хоть одна функция из того же вызова, даже та, что его не читает.",en:"To keep a closure from holding on to too much, remove handlers and timers once they are no longer needed, and do not capture large objects whole: take the values you need out of them before creating the function. Engines help, but not with everything. V8, for example, keeps only the variables that at least one inner function uses, but those variables are shared by all the functions created during one call of the outer function. If one of them reads a large array, the array stays in memory while any function from that call is alive, even one that never reads it."}],summary:[{ru:"Замыкание — функция вместе с переменными места, где она создана. Функция помнит их и после того, как внешняя функция завершилась.",en:"A closure is a function together with the variables of the place where it was created. The function remembers them even after the outer function has finished."},{ru:"Область видимости лексическая: переменная ищется там, где функция написана, а не там, где её вызвали. Замыкание хранит ссылку на переменную, а не копию значения.",en:"Scope is lexical: a variable is looked up where the function is written, not where it is called. A closure keeps a reference to the variable, not a copy of its value."},{ru:"Каждый вызов внешней функции создаёт новое окружение, поэтому фабрики функций выдают независимые функции, а состояние в замыкании недоступно снаружи. На том же механизме держатся каррирование и частичное применение.",en:"Every call of the outer function creates a new environment, so function factories produce independent functions, and state in a closure cannot be reached from outside. Currying and partial application rest on the same mechanism."},{ru:"var в цикле — одна переменная на все итерации, поэтому колбэки setTimeout видят последнее значение; let создаёт новую переменную на каждой итерации.",en:"A var in a loop is one variable for all iterations, so setTimeout callbacks see the last value; let creates a new variable on every iteration."},{ru:"Замыкание держит окружение в памяти, пока функция достижима: снимайте обработчики и таймеры и не захватывайте большие объекты целиком.",en:"A closure keeps its environment in memory as long as the function is reachable: remove handlers and timers, and do not capture large objects whole."}],exercises:[{task:{ru:"Напишите функцию высшего порядка once: она принимает функцию fn и возвращает новую функцию, которая вызывает fn только в первый раз, а при следующих вызовах возвращает запомненный результат. Признак «уже вызывали» и результат храните в замыкании.",en:'Write a higher-order function once: it takes a function fn and returns a new function that calls fn only the first time and returns the remembered result on later calls. Keep the "already called" flag and the result in a closure.'},starter:{ru:`// once :: (a -> b) -> (a -> b)
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
console.log(\`loadSettings вызвана: \${calls}\`)`,en:`// once :: (a -> b) -> (a -> b)
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
console.log(\`loadSettings called: \${calls}\`)`},solution:{ru:`// once :: (a -> b) -> (a -> b)
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
console.log(\`loadSettings вызвана: \${calls}\`)`,en:`// once :: (a -> b) -> (a -> b)
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
console.log(\`loadSettings called: \${calls}\`)`},expected:{ru:`настройки app
настройки app
loadSettings вызвана: 1`,en:`settings for app
settings for app
loadSettings called: 1`}},{task:{ru:"Цикл должен напечатать «задача 1», «задача 2» и «задача 3», а печатает «задача 4» трижды. Не меняя var на let, исправьте его: напишите фабрику makeTask(n), которая возвращает колбэк для setTimeout, и передавайте в setTimeout makeTask(i). Строка после цикла показывает, чему равна i, когда колбэки ещё не запускались.",en:'The loop should print "task 1", "task 2" and "task 3", but it prints "task 4" three times. Without changing var to let, fix it: write a factory makeTask(n) that returns a callback for setTimeout, and pass makeTask(i) to setTimeout. The line after the loop shows what i equals before any callback has run.'},starter:{ru:`// makeTask :: Number -> (() -> undefined)
// ваш код

// сейчас все колбэки видят одну и ту же i и печатают «задача 4»
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(\`задача \${i}\`), 0)
}

console.log(\`цикл закончился, i = \${i}\`)`,en:`// makeTask :: Number -> (() -> undefined)
// your code

// right now every callback sees the same i and prints "task 4"
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(\`task \${i}\`), 0)
}

console.log(\`the loop has finished, i = \${i}\`)`},solution:{ru:`// makeTask :: Number -> (() -> undefined)
// каждый вызов makeTask создаёт новое окружение со своим n
const makeTask = (n) => () => console.log(\`задача \${n}\`)

for (var i = 1; i <= 3; i++) {
  setTimeout(makeTask(i), 0)
}

console.log(\`цикл закончился, i = \${i}\`)`,en:`// makeTask :: Number -> (() -> undefined)
// every call of makeTask creates a new environment with its own n
const makeTask = (n) => () => console.log(\`task \${n}\`)

for (var i = 1; i <= 3; i++) {
  setTimeout(makeTask(i), 0)
}

console.log(\`the loop has finished, i = \${i}\`)`},expected:{ru:`цикл закончился, i = 4
задача 1
задача 2
задача 3`,en:`the loop has finished, i = 4
task 1
task 2
task 3`}}]},R={slug:"lenses",title:{ru:"Линзы",en:"Lenses"},description:{ru:"Как линзы в JavaScript читают и меняют вложенные данные без мутации: view, set и over из Ramda и своя линза из пары функций getter и setter.",en:"How JavaScript lenses read and update nested data without mutation: view, set and over from Ramda, and your own lens built from a getter and a setter."},goal:{ru:"Научиться читать и менять вложенные данные через линзы (view, set, over), не изменяя исходный объект, и понять, как устроена простая линза из пары функций getter и setter.",en:"Learn to read and update nested data with lenses (view, set, over) without changing the original object, and understand how a simple lens built from a getter and a setter works."},blocks:[{type:"text",ru:"Линзы — это инструмент (паттерн), который используется в функциональном программировании при работе с данными, обеспечивая иммутабельность данных и чистоту функции.",en:"Lenses are a tool (a pattern) used in functional programming when working with data, providing data immutability and function purity."},{type:"text",ru:"Иммутабельность (неизменяемость) — это когда данные после создания не меняются: вместо изменения создаётся новая копия с нужными правками.",en:"Immutability means that data does not change after it is created: instead of modifying it, you create a new copy with the changes applied."},{type:"text",ru:"Давайте возьмем пример из официальной документации библиотеки Ramda JS.",en:"Let's take an example from the official documentation of the Ramda JS library."},{type:"code",code:{ru:`// Lens s a = Functor f => (a -> f a) -> s -> f s
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
console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}`,en:`// Lens s a = Functor f => (a -> f a) -> s -> f s
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
console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}`}},{type:"text",ru:"В примерах выше мы с вами увидели, как пользоваться линзами.",en:"In the examples above, we saw how to use lenses."},{type:"text",ru:"А теперь попробуем реализовать свою кастомную линзу. В продакшен коде используйте готовые решения, например линзы из Ramda JS (в Sanctuary JS линз нет).",en:"And now let's try to implement our own custom lens. In production code, use ready-made solutions such as the lenses in Ramda JS (Sanctuary JS has no lenses)."},{type:"code",code:{ru:`// упрощённая линза: пара функций getter и setter,
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
console.log(resultOver) // {x: [{y: 5, z: 3}, {y: 4, z: 5}]}`,en:`// a simplified lens: a pair of getter and setter functions
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
console.log(resultOver) // {x: [{y: 5, z: 3}, {y: 4, z: 5}]}`}}],summary:[{ru:"Линзы — паттерн для работы с данными, который обеспечивает иммутабельность данных и чистоту функций.",en:"Lenses are a pattern for working with data that keeps the data immutable and the functions pure."},{ru:"Иммутабельность означает, что данные после создания не меняются: вместо изменения создаётся новая копия с нужными правками.",en:"Immutability means that data does not change after it is created: instead of modifying it, you create a new copy with the changes applied."},{ru:"view читает значение по пути линзы, set записывает новое значение и возвращает новый объект, over делает то же, что set, но принимает функцию от текущего значения. Исходные данные при этом не меняются.",en:"view reads the value at the lens path, set writes a new value and returns a new object, and over works like set but takes a function of the current value. The original data stays unchanged."},{ru:"Простую линзу можно собрать из пары функций getter и setter, замкнутых на путь к данным; при копировании узла массив нужно копировать как массив.",en:"A simple lens can be built from a pair of getter and setter functions closed over the path to the data; when a node is copied, an array has to be copied as an array."},{ru:"В продакшен-коде используйте готовые линзы, например из Ramda; в Sanctuary линз нет.",en:"In production code, use ready-made lenses such as the ones in Ramda; Sanctuary has no lenses."}],exercises:[{task:{ru:"В состоянии приложения лежат настройки пользователя и корзина. С помощью R.lensPath, R.view, R.set и R.over получите новое состояние, где тема оформления — dark, а количество первого товара в корзине на единицу больше. Соберите оба изменения в одну функцию update через pipe и убедитесь, что исходное состояние не изменилось.",en:"The application state holds the user's settings and a cart. Using R.lensPath, R.view, R.set and R.over, get a new state where the theme is dark and the quantity of the first item in the cart has gone up by one. Combine both changes into a single update function with pipe and make sure the original state has not changed."},starter:{ru:`// pipe берём из Ramda, как в уроке «Каррирование»
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
console.log('исходное: тема ' + R.view(themeLens, state) + ', количество ' + R.view(firstQtyLens, state))`,en:`// pipe comes from Ramda, as in the "Currying" lesson
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
console.log('original: theme ' + R.view(themeLens, state) + ', quantity ' + R.view(firstQtyLens, state))`},solution:{ru:`// pipe берём из Ramda, как в уроке «Каррирование»
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
console.log('исходное: тема ' + R.view(themeLens, state) + ', количество ' + R.view(firstQtyLens, state))`,en:`// pipe comes from Ramda, as in the "Currying" lesson
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
console.log('original: theme ' + R.view(themeLens, state) + ', quantity ' + R.view(firstQtyLens, state))`},expected:{ru:`новое: тема dark, количество 2
исходное: тема light, количество 1`,en:`new: theme dark, quantity 2
original: theme light, quantity 1`}},{task:{ru:"В самописной линзе из урока set не может записать функцию как значение: setter принимает любую функцию за преобразование. Напишите линзу lensKey(key) для одного ключа объекта, у которой setter всегда принимает функцию, и функции view, over и set. set постройте через over, как в Ramda, и проверьте, что функция записывается как обычное значение, а исходный объект не меняется.",en:"In the hand-written lens from the lesson, set cannot store a function as a value: the setter treats any function as a transformation. Write a lens lensKey(key) for a single object key whose setter always takes a function, plus view, over and set. Build set on top of over, as Ramda does, and check that a function is stored as a plain value and the original object does not change."},starter:{ru:`// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
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
console.log(user)`,en:`// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
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
console.log(user)`},solution:{ru:`// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
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
console.log(user)`,en:`// Lens s a = { getter :: s -> a, setter :: (a -> a) -> s -> s }
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
console.log(user)`},expected:{ru:`Kate
function
ANNA
{
  "name": "Anna",
  "greet": null
}`,en:`Kate
function
ANNA
{
  "name": "Anna",
  "greet": null
}`}}]},A={slug:"side-effects-in-composition-functions",title:{ru:"Side effects (побочные эффекты) в композиции функций",en:"Side effects in function composition"},description:{ru:"Как добавить побочный эффект в композицию функций JavaScript, не ломая цепочку: tap для логирования шагов pipe и для действий по логике программы.",en:"How to add a side effect to a JavaScript function composition without breaking the chain: tap for logging pipe steps and for actions the program needs."},goal:{ru:"Научиться добавлять в композицию функций побочные эффекты — логирование для отладки и действия по логике программы — так, чтобы данные шли дальше по цепочке без изменений.",en:"Learn to add side effects to a function composition, such as logging for debugging or actions the program logic requires, so that the data keeps flowing down the chain unchanged."},blocks:[{type:"text",ru:"Исходя из принципов функционального программирования можно подумать, что создавать побочные эффекты в композиции функций нельзя. Но на самом деле любая программа и в особенности веб разработка в любом случае создаст какой-нибудь побочный эффект (операции с DOM, операции ввода и вывода, логирование и тому подобное ...).",en:"Based on the principles of functional programming, one might think that creating side effects within function composition is forbidden. But in reality, any program, and especially web development, will create some side effect no matter what (DOM operations, input/output operations, logging, and so on ...)."},{type:"text",ru:"В реальных кейсах побочные эффекты в композиции функций нам могут пригодиться в основном в двух ситуациях:",en:"In real-world cases, side effects within function composition can be useful to us mainly in two situations:"},{type:"list",ordered:!0,items:[{ru:"Отладка композиции и её логирование, в случае ошибок или вообще, чтобы понимать поток выполнения и изменения входных данных в композиции функции.",en:"Debugging the composition and logging it, in case of errors or simply to understand the execution flow and how the input data changes within the function composition."},{ru:"Создание побочного эффекта в рамках программы согласно её логике и продолжение выполнения композиции функций.",en:"Creating a side effect within the program according to its logic and continuing the execution of the function composition."}]},{type:"text",ru:"Попробуем с вами проверить промежуточные результаты в композиции функций, создав побочный эффект в виде лога данных.",en:"Let's try to inspect the intermediate results within a function composition by creating a side effect in the form of logging the data."},{type:"code",code:{ru:`// Программа, которая берет деньги
// пользователя и сравнивает с ценой товара
// сообщает хватает ли ему денег на покупку товара
// ===============================
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) =>
                              fns
                                .reduce((init, fn) => fn(init), data)

// пользователь тестовый с 10 000$
const dataUser = {
  name: 'John',
  money: 10000,
}

// товар с ценой 8 000$
const product = {
  name: 'car',
  model: 'toyota',
  price: 8000
}

// prop :: String -> Record -> a
const prop = (prop) => (data) => data[prop]

// lte :: Number -> Number -> Boolean
const lte = (a) => (b) => a <= b

const pipeline = pipe(
  prop ('money'), // получаем деньги пользователя
  lte (prop ('price') (product)), // проверяем, что цена товара не больше денег пользователя
  (success) => success ? 'the product can be purchased' : "you don't have enough money"
  // сообщаем может ли купить товар или не хватает денег
)

// запускаем композицию
const resultMsg = pipeline (dataUser)

console.log(resultMsg) // the product can be purchased`,en:`// A program that takes the user's money,
// compares it with the product price
// and reports whether the user can afford the product
// ===============================
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) =>
                              fns
                                .reduce((init, fn) => fn(init), data)

// a test user with $10,000
const dataUser = {
  name: 'John',
  money: 10000,
}

// a product priced at $8,000
const product = {
  name: 'car',
  model: 'toyota',
  price: 8000
}

// prop :: String -> Record -> a
const prop = (prop) => (data) => data[prop]

// lte :: Number -> Number -> Boolean
const lte = (a) => (b) => a <= b

const pipeline = pipe(
  prop ('money'), // get the user's money
  lte (prop ('price') (product)), // check that the product price is not greater than the user's money
  (success) => success ? 'the product can be purchased' : "you don't have enough money"
  // report whether the user can buy the product or lacks the money
)

// run the composition
const resultMsg = pipeline (dataUser)

console.log(resultMsg) // the product can be purchased`}},{type:"text",ru:"Но как же нам получить результаты вызовов каждой функции в pipeline (prop ('money') ...), если даже не будет ошибок в композиции, мы просто хотим отладить код.",en:"But how do we obtain the results of each function call in pipeline (prop ('money') ...), if there won't even be any errors in the composition and we simply want to debug the code."},{type:"text",ru:"Давайте напишем универсальную утилиту для любого кейса в цепочке вызовов композиции.",en:"Let's write a universal utility for any case in the chain of composition calls."},{type:"code",noRun:"previous-block",code:{ru:`// Утилита которая вызовет функцию в аргументе
// и прокинет аргумент дальше по композиции
// ===============================
// tapD :: (a -> *) -> a -> a
const tapD = (fn) => (arg) => {

  // делаем проверку
  // действительно ли первый аргумент функция
  if (typeof fn === 'function') {
    // вызываем функцию с аргументом
    fn (arg)
  }

  // не забываем дальше прокинуть аргумент
  // для вызова в композиции функций
  return arg
}

// можно сократить в одну строку
// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn (arg), arg)

// а теперь давайте подготовим утилиту
// для логирования данных
// после каждого вызова в композиции

// стандартный вывод в консоль
const log = console.log

// создаем логгер
const logger = tap (log)

// вводим логгер в цепочку вызовов функций
// сразу запустим цепочку
pipe(
  prop ('money'),
  logger, // 10000
  lte (prop ('price') (product)),
  logger, // true
  (success) => success ? 'the product can be purchased' : "you don't have enough money",
  logger, // 'the product can be purchased'
) (dataUser)`,en:`// A utility that calls the function it was given
// and passes the argument further down the composition
// ===============================
// tapD :: (a -> *) -> a -> a
const tapD = (fn) => (arg) => {

  // check that the first argument
  // really is a function
  if (typeof fn === 'function') {
    // call the function with the argument
    fn (arg)
  }

  // don't forget to pass the argument on
  // to the next call in the composition
  return arg
}

// it can be shortened to one line
// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn (arg), arg)

// now let's prepare a utility
// that logs the data
// after each call in the composition

// standard console output
const log = console.log

// create the logger
const logger = tap (log)

// put the logger into the chain of function calls
// and run the chain right away
pipe(
  prop ('money'),
  logger, // 10000
  lte (prop ('price') (product)),
  logger, // true
  (success) => success ? 'the product can be purchased' : "you don't have enough money",
  logger, // 'the product can be purchased'
) (dataUser)`}}],summary:[{ru:"Любая программа, и особенно веб-разработка, создаёт побочные эффекты: операции с DOM, ввод и вывод, логирование.",en:"Any program, and especially web development, creates side effects: DOM operations, input and output, logging."},{ru:"В композиции функций побочные эффекты нужны в основном в двух случаях: для отладки и логирования и для действий, которых требует логика программы, после чего композиция продолжает выполняться.",en:"In function composition, side effects are needed mainly in two cases: for debugging and logging, and for actions the program logic requires, after which the composition keeps running."},{ru:"Утилита tap :: (a -> *) -> a -> a вызывает переданную функцию с аргументом и возвращает тот же аргумент, поэтому следующая функция в композиции получает данные без изменений.",en:"The tap :: (a -> *) -> a -> a utility calls the given function with the argument and returns that same argument, so the next function in the composition receives the data unchanged."},{ru:"Логгер tap (console.log), вставленный между шагами pipe, печатает промежуточный результат после каждого вызова.",en:"A logger built as tap (console.log) and placed between the steps of pipe prints the intermediate result after each call."}],exercises:[{task:{ru:"Чтобы отладить конвейер total, в него вставили console.log прямо между шагами, и конвейер сломался: console.log возвращает undefined, и следующий шаг получает его вместо данных. Напишите tap и логгер с подписью tapLog :: String -> a -> a: он печатает строку «подпись: значение» (значение через JSON.stringify) и возвращает аргумент без изменений. Поставьте tapLog после каждого шага total вместо console.log, с подписями «позиции», «сумма» и «со скидкой».",en:'To debug the total pipeline, someone put console.log straight between its steps, and the pipeline broke: console.log returns undefined, and the next step receives it instead of the data. Write tap and a labelled logger tapLog :: String -> a -> a that prints the line "label: value" (the value via JSON.stringify) and returns its argument unchanged. Put tapLog after each step of total instead of console.log, with the labels "items", "sum" and "discounted".'},starter:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// корзина: цена и количество каждой позиции
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// ваш код: tap и tapLog

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // стоимость каждой позиции
  console.log, // отладка: печатает, но возвращает undefined
  (sums) => sums.reduce((sum, x) => sum + x, 0), // общая сумма
  (sum) => (sum > 100 ? sum - 10 : sum), // скидка 10, если сумма больше 100
)

console.log(total(cart))`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// the cart: price and quantity of each item
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// your code: tap and tapLog

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // the cost of each item
  console.log, // debugging: prints, but returns undefined
  (sums) => sums.reduce((sum, x) => sum + x, 0), // the total sum
  (sum) => (sum > 100 ? sum - 10 : sum), // a discount of 10 if the sum is over 100
)

console.log(total(cart))`},solution:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// корзина: цена и количество каждой позиции
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// логгер с подписью: печатает значение и возвращает его без изменений
// tapLog :: String -> a -> a
const tapLog = (label) => tap((value) => console.log(\`\${label}: \${JSON.stringify(value)}\`))

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // стоимость каждой позиции
  tapLog('позиции'),
  (sums) => sums.reduce((sum, x) => sum + x, 0), // общая сумма
  tapLog('сумма'),
  (sum) => (sum > 100 ? sum - 10 : sum), // скидка 10, если сумма больше 100
  tapLog('со скидкой'),
)

console.log(total(cart))`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// the cart: price and quantity of each item
const cart = [
  { name: 'book', price: 20, qty: 2 },
  { name: 'pen', price: 5, qty: 4 },
  { name: 'bag', price: 50, qty: 1 },
]

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// a labelled logger: prints the value and returns it unchanged
// tapLog :: String -> a -> a
const tapLog = (label) => tap((value) => console.log(\`\${label}: \${JSON.stringify(value)}\`))

// total :: [Object] -> Number
const total = pipe(
  (items) => items.map((item) => item.price * item.qty), // the cost of each item
  tapLog('items'),
  (sums) => sums.reduce((sum, x) => sum + x, 0), // the total sum
  tapLog('sum'),
  (sum) => (sum > 100 ? sum - 10 : sum), // a discount of 10 if the sum is over 100
  tapLog('discounted'),
)

console.log(total(cart))`},expected:{ru:`позиции: [40,20,50]
сумма: 110
со скидкой: 100
100`,en:`items: [40,20,50]
sum: 110
discounted: 100
100`}},{task:{ru:"Второй случай — побочный эффект по логике программы. Напишите tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a: она вызывает функцию-эффект, только если предикат вернул true, и в любом случае возвращает аргумент. С её помощью добавьте в начало конвейера checkout запись имени пользователя в журнал declined, если денег не хватает на товар. Композиция при этом должна дойти до конца и вернуть сообщение.",en:"The second case is a side effect the program logic requires. Write tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a: it calls the effect function only if the predicate returned true, and returns the argument in any case. Use it at the start of the checkout pipeline to add the user's name to the declined log when they don't have enough money for the product. The composition must still run to the end and return a message."},starter:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// ваш код: tapWhen

// товар
const product = { name: 'car', price: 8000 }

// журнал: кому не хватило денег
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  // ваш код: запись в журнал declined
  (user) => user.money >= product.price, // хватает ли денег
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`не хватило денег: \${declined.join(', ')}\`)`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// your code: tapWhen

// the product
const product = { name: 'car', price: 8000 }

// the log: who didn't have enough money
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  // your code: add to the declined log
  (user) => user.money >= product.price, // is there enough money
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`not enough money: \${declined.join(', ')}\`)`},solution:{ru:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// эффект срабатывает только по условию, аргумент идёт дальше всегда
// tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a
const tapWhen = (pred) => (fn) => tap((arg) => {
  if (pred(arg)) fn(arg)
})

// товар
const product = { name: 'car', price: 8000 }

// журнал: кому не хватило денег
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  tapWhen((user) => user.money < product.price)((user) => declined.push(user.name)),
  (user) => user.money >= product.price, // хватает ли денег
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`не хватило денег: \${declined.join(', ')}\`)`,en:`// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (data) => fns.reduce((acc, fn) => fn(acc), data)

// tap :: (a -> *) -> a -> a
const tap = (fn) => (arg) => (fn(arg), arg)

// the effect fires only on the condition; the argument always moves on
// tapWhen :: (a -> Boolean) -> (a -> *) -> a -> a
const tapWhen = (pred) => (fn) => tap((arg) => {
  if (pred(arg)) fn(arg)
})

// the product
const product = { name: 'car', price: 8000 }

// the log: who didn't have enough money
const declined = []

// checkout :: Object -> String
const checkout = pipe(
  tapWhen((user) => user.money < product.price)((user) => declined.push(user.name)),
  (user) => user.money >= product.price, // is there enough money
  (success) => (success ? 'the product can be purchased' : "you don't have enough money"),
)

const users = [
  { name: 'John', money: 10000 },
  { name: 'Anna', money: 5000 },
  { name: 'Mike', money: 8000 },
]

users.map(checkout).forEach((message) => console.log(message))
console.log(\`not enough money: \${declined.join(', ')}\`)`},expected:{ru:`the product can be purchased
you don't have enough money
the product can be purchased
не хватило денег: Anna`,en:`the product can be purchased
you don't have enough money
the product can be purchased
not enough money: Anna`}}]},T={slug:"selecting-library",title:{ru:"Как выбрать библиотеку для ФП",en:"How to choose an FP library"},description:{ru:"Как выбрать библиотеку для ФП в JavaScript и TypeScript: Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts или Effect — по бюджету, этапу, команде и качеству.",en:"How to choose a library for FP in JavaScript and TypeScript: Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts or Effect, by budget, stage, team and quality."},goal:{ru:"Научиться выбирать между Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts и Effect по критериям проекта и команды — бюджету, этапу, команде, качеству, производительности и парадигме, — а не по вкусу и моде.",en:"Learn to choose between Vanilla JS, Lodash, Ramda, Sanctuary, fp-ts and Effect by the criteria of the project and the team (budget, stage, team, quality, performance and paradigm) rather than by taste or fashion."},blocks:[{type:"text",ru:"Когда перед вами стоит выбор, что выбрать из библиотек, описанных в курсе и ниже, или ванильного решения, не стоит опираться на следующие принципы, которые я часто встречал в своей практике при коммерческой разработке. Не стоит придерживаться следующего:",en:"When you face the choice of which of the libraries described in the course and below, or a vanilla solution, to pick, you should not rely on the following principles, which I have often encountered in my own commercial development practice. You should not stick to the following:"},{type:"list",ordered:!0,items:[{ru:"Мне нравится эта библиотека (хотелки).",en:"I like this library (personal wishes)."},{ru:"Это сейчас модно (хотелки).",en:"It's trendy right now (personal wishes)."},{ru:"Я главный, я решаю и я так хочу (хотелки).",en:"I'm in charge, I decide, and that's what I want (personal wishes)."}]},{type:"text",ru:"Все выше описанное это не профессиональный подход.",en:"Everything described above is not a professional approach."},{type:"text",ru:"На что следует обратить внимание. Какие критерии важны при выборе:",en:"What you should pay attention to. Which criteria matter when choosing:"},{type:"list",ordered:!0,items:[{ru:"Бюджет. Очень важно понять платежеспособность инвестора (клиента) и его планы на будущее. Это очень важный пункт и можно сказать один из основных.",en:"Budget. It is very important to understand the financial capacity of the investor (client) and their plans for the future. This is a very important point and, you could say, one of the main ones."},{ru:"Насколько % проект завершён или он находится в начале. Аналогично: если проект написан и все работает корректно, не нужно его переписывать.",en:"How far along the project is, percentage-wise, or whether it is just at the beginning. Likewise: if the project is already written and everything works correctly, there is no need to rewrite it."},{ru:"Кто работает с тобой в команде и сколько вас человек. Нужно понимать процесс онбординга нового разработчика в команду, знаком ли он с данной библиотекой и твоими архитектурными решениями.",en:"Who works with you on the team and how many of you there are. You need to understand the onboarding process for a new developer joining the team, whether they are familiar with this library and with your architectural decisions."},{ru:"Качество продукта. Чем выше сложность, тем зачастую качество будет расти.",en:"Product quality. The higher the complexity, the more the quality tends to grow."},{ru:"Перфоманс. Это не самый важный фактор, так как зачастую ошибка в логике приложения даст просадку, а не какая-либо библиотека.",en:"Performance. This is not the most important factor, since often it is a flaw in the application's logic that causes a slowdown rather than any particular library."},{ru:"Парадигма функционального программирования.",en:"The functional programming paradigm."}]},{type:"heading",ru:"Vanilla JS",en:"Vanilla JS"},{type:"list",ordered:!0,items:[{ru:"Бюджет. Бюджет небольшой или средний.",en:"Budget. The budget is small or medium."},{ru:"Насколько % проект завершён или он находится в начале. Когда проект уже ранее был начат на JS и вышел за горизонт и финишную прямую.",en:"How far along the project is, percentage-wise, or whether it is just at the beginning. When the project was already started earlier in JS and has passed the horizon and the home stretch."},{ru:"Кто работает с тобой в команде и сколько вас человек. Для малых команд с глубокими знаниями JS. Порой такая команда работает эффективнее большой, где язык знают поверхностно. Глубокое знание JS нужно и в проектах на TypeScript: типы проверяются при компиляции и сами по себе не защищают от ошибок в данных, которые приходят во время выполнения.",en:"Who works with you on the team and how many of you there are. For small teams with deep knowledge of JS. At times such a team works more effectively than a large one where the language is known only superficially. Deep knowledge of JS matters in TypeScript projects too: types are checked at compile time and on their own do not protect against errors in data that arrives at runtime."},{ru:"Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое.",en:"Product quality. Depends on the team, deadlines, and budget; often not high."},{ru:"Перфоманс. Будет самый высокий при аналогичном коде относительно библиотек.",en:"Performance. It will be the highest given equivalent code compared to the libraries."},{ru:"Парадигма функционального программирования. Полная свобода: процедурный, ООП, ФП и т.п. И каждый как хочет.",en:"The functional programming paradigm. Complete freedom: procedural, OOP, FP, and so on. And everyone does as they please."}]},{type:"heading",ru:"Lodash",en:"Lodash"},{type:"list",ordered:!0,items:[{ru:"Бюджет. Подходит для проектов любого масштаба, но лучше использовать на средних проектах.",en:"Budget. Suitable for projects of any scale, but it is best used on medium-sized projects."},{ru:"Насколько % проект завершён или он находится в начале. Только если проект не достиг горизонта, а находится на начальном этапе.",en:"How far along the project is, percentage-wise, or whether it is just at the beginning. Only if the project has not reached the horizon but is at an early stage."},{ru:"Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно знакомых с функциональным программированием, которые хотят упростить рутину.",en:"Who works with you on the team and how many of you there are. For teams of any size who are superficially familiar with functional programming and want to simplify their routine."},{ru:"Качество продукта. Зависит от команды, сроков и бюджета, зачастую невысокое.",en:"Product quality. Depends on the team, deadlines, and budget; often not high."},{ru:"Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки оптимизирован по размеру.",en:"Performance. It will be lower than vanilla given equivalent code. The library's bundle is optimized for size."},{ru:"Парадигма функционального программирования. Не совсем функциональна: проблемы с иммутабельностью и передачей аргументов в композиции функций, когда на первом месте функции принимают данные, а потом уже функцию. Эти проблемы снимает модуль lodash/fp: в нем функции каррированы, не мутируют данные и принимают их последним аргументом. Для тех, кто только трогает функциональное программирование.",en:"The functional programming paradigm. Not entirely functional: there are problems with immutability and with passing arguments in function composition, where the functions take the data first and only then the function. The lodash/fp module removes these problems: its functions are curried, do not mutate the data, and take it as the last argument. For those who are only just touching functional programming."}]},{type:"heading",ru:"Ramda",en:"Ramda"},{type:"list",ordered:!0,items:[{ru:"Бюджет. Подходит для проектов любого масштаба.",en:"Budget. Suitable for projects of any scale."},{ru:"Насколько % проект завершён или он находится в начале. На любом этапе, кроме ситуаций, когда проект уже завершается или уже присутствует другая библиотека для работы с данными.",en:"How far along the project is, percentage-wise, or whether it is just at the beginning. At any stage, except for situations when the project is already wrapping up or another data-handling library is already present."},{ru:"Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, поверхностно или профессионально использующих функциональное программирование, которые хотят упростить рутину.",en:"Who works with you on the team and how many of you there are. For teams of any size who use functional programming either superficially or professionally and who want to simplify their routine."},{ru:"Качество продукта. Качество продукта, как правило, высокое.",en:"Product quality. The product quality is, as a rule, high."},{ru:"Перфоманс. Будет ниже ванилы при аналогичном коде. Бандл библиотеки необходимо оптимизировать, если планируется использование только небольшой части 5-10% функций.",en:"Performance. It will be lower than vanilla given equivalent code. The library's bundle needs to be optimized if you plan to use only a small part, 5-10%, of its functions."},{ru:"Парадигма функционального программирования. Используется полноценное функциональное программирование. Покрывает до 98% кейсов при работе с данными и подойдет для всех проектов. Своя философия в рамках функционального программирования. Проще для новичков в функциональном программировании и задает правильный тон. Нет болячек Lodash.",en:"The functional programming paradigm. Full-fledged functional programming is used. It covers up to 98% of cases when working with data and is suitable for all projects. It has its own philosophy within functional programming. It is easier for newcomers to functional programming and sets the right tone. It does not have Lodash's ailments."}]},{type:"heading",ru:"Sanctuary",en:"Sanctuary"},{type:"list",ordered:!0,items:[{ru:"Бюджет. Подходит для масштабных проектов с бюджетом выше среднего.",en:"Budget. Suitable for large-scale projects with an above-average budget."},{ru:"Насколько % проект завершён или он находится в начале. Желательно использовать на начальном этапе.",en:"How far along the project is, percentage-wise, or whether it is just at the beginning. It is preferable to use it at the early stage."},{ru:"Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, профессионально использующих функциональное программирование и понимающих, что они пишут.",en:"Who works with you on the team and how many of you there are. For teams of any size who use functional programming professionally and understand what they are writing."},{ru:"Качество продукта. Качество продукта, как правило, высокое.",en:"Product quality. The product quality is, as a rule, high."},{ru:"Перфоманс. Будет ниже ванилы при аналогичном коде.",en:"Performance. It will be lower than vanilla given equivalent code."},{ru:"Парадигма функционального программирования. Используется полноценное функциональное программирование со своей философией, которая строже придерживается принципов ФП. Полноценное использование монад и прочих абстрактных типов. Высокий порог входа. Для тех, кто действительно в теме функционального программирования. Своя архитектура мышления. Учтите, что последний релиз Sanctuary, 3.1.0, вышел 9 августа 2020 года (по данным реестра npm на октябрь 2026 года).",en:"The functional programming paradigm. Full-fledged functional programming is used, with its own philosophy that adheres more strictly to FP principles. Full-fledged use of monads and other abstract types. A high barrier to entry. For those who are truly into functional programming. Its own architecture of thinking. Keep in mind that the latest Sanctuary release, 3.1.0, came out on August 9, 2020 (according to the npm registry as of October 2026)."}]},{type:"text",ru:"Следующие две библиотеки рассчитаны на TypeScript. Из JavaScript их тоже можно вызывать, но основную пользу они дают вместе с проверкой типов: отсутствие значения и возможные ошибки видны в типах, и компилятор проверяет, как код с ними обращается.",en:"The next two libraries are designed for TypeScript. They can be called from JavaScript as well, but most of their value comes with type checking: a missing value and possible errors show up in the types, and the compiler checks how the code deals with them."},{type:"heading",ru:"fp-ts",en:"fp-ts"},{type:"list",ordered:!0,items:[{ru:"Бюджет. Подходит для проектов среднего и крупного масштаба с бюджетом не ниже среднего: команде нужно время на обучение.",en:"Budget. Suitable for medium and large projects with at least an average budget: the team needs time to learn it."},{ru:"Насколько % проект завершён или он находится в начале. Прежде всего для проектов, где fp-ts уже используется. Новым пользователям README fp-ts предлагает смотреть на Effect как на преемника fp-ts v2.",en:"How far along the project is, percentage-wise, or whether it is just at the beginning. Above all for projects that already use fp-ts. For new users, the fp-ts README points to Effect as the successor to fp-ts v2."},{ru:"Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, которые пишут на TypeScript и профессионально используют функциональное программирование: нужно понимать Option, Either, Task и классы типов, например функтор и монаду.",en:"Who works with you on the team and how many of you there are. For teams of any size who write TypeScript and use functional programming professionally: you need to understand Option, Either, Task and type classes such as functor and monad."},{ru:"Качество продукта. Качество продукта, как правило, высокое: отсутствие значения и ошибки видны в типах Option и Either, и компилятор напоминает обработать оба случая.",en:"Product quality. The product quality is, as a rule, high: a missing value and errors show up in the Option and Either types, and the compiler reminds you to handle both cases."},{ru:"Перфоманс. Будет ниже ванилы при аналогичном коде: значения заворачиваются в Option и Either, а шаги pipe — это дополнительные вызовы функций. Модули подключаются по отдельности (fp-ts/Option, fp-ts/Either), всю библиотеку тянуть не нужно.",en:"Performance. It will be lower than vanilla given equivalent code: values are wrapped in Option and Either, and the steps of pipe are extra function calls. Modules are imported one by one (fp-ts/Option, fp-ts/Either), so there is no need to pull in the whole library."},{ru:"Парадигма функционального программирования. Полноценное и строгое типизированное функциональное программирование по образцу Haskell, PureScript и Scala: классы типов и эмуляция типов высших родов (higher-kinded types), которые TypeScript сам не поддерживает. Высокий порог входа. Проект fp-ts объявил о слиянии с экосистемой Effect, а его автор, Джулио Канти, присоединился к организации Effect. Учтите, что последний релиз fp-ts, 2.16.11, вышел 18 августа 2025 года (по данным реестра npm на октябрь 2026 года).",en:"The functional programming paradigm. Full-fledged and strict typed functional programming modelled on Haskell, PureScript and Scala: type classes and an emulation of higher-kinded types, which TypeScript does not support natively. A high barrier to entry. The fp-ts project has announced that it is merging with the Effect ecosystem, and its author, Giulio Canti, has joined the Effect organization. Keep in mind that the latest fp-ts release, 2.16.11, came out on August 18, 2025 (according to the npm registry as of October 2026)."}]},{type:"heading",ru:"Effect",en:"Effect"},{type:"list",ordered:!0,items:[{ru:"Бюджет. Подходит для проектов среднего и крупного масштаба, где цена ошибки высока и есть время на обучение команды.",en:"Budget. Suitable for medium and large projects where the cost of an error is high and there is time to train the team."},{ru:"Насколько % проект завершён или он находится в начале. Лучше всего на начальном этапе. В готовый проект Effect можно вводить постепенно: Effect.runPromise возвращает обычный Promise, поэтому новый код уживается со старым.",en:"How far along the project is, percentage-wise, or whether it is just at the beginning. Best at the early stage. Effect can be brought into an existing project gradually: Effect.runPromise returns an ordinary Promise, so the new code gets along with the old."},{ru:"Кто работает с тобой в команде и сколько вас человек. Для команд любого размера, которые пишут на TypeScript и готовы освоить новую модель: тип Effect<A, E, R>, генераторы Effect.gen, сервисы и слои (Layer). Теорию категорий знать не обязательно: код в Effect.gen читается последовательно, почти как async/await.",en:"Who works with you on the team and how many of you there are. For teams of any size who write TypeScript and are ready to learn a new model: the Effect<A, E, R> type, Effect.gen generators, services and layers (Layer). Category theory is not required: code inside Effect.gen reads sequentially, much like async/await."},{ru:"Качество продукта. Качество продукта, как правило, высокое: возможные ошибки и нужные зависимости видны в типе Effect<A, E, R>, а повторы, тайм-ауты, отмена и конкурентность встроены в библиотеку.",en:"Product quality. The product quality is, as a rule, high: possible errors and required dependencies show up in the Effect<A, E, R> type, and retries, timeouts, cancellation and concurrency are built into the library."},{ru:"Перфоманс. Будет ниже ванилы при аналогичном коде: программы выполняет собственный рантайм Effect на файберах. Неиспользуемые модули отсекаются при сборке (tree shaking), а в версии 4 рантайм переписан, чтобы расходовать меньше памяти и работать быстрее.",en:"Performance. It will be lower than vanilla given equivalent code: programs are run by Effect's own fiber-based runtime. Unused modules are dropped at build time (tree shaking), and version 4 rewrote the runtime to use less memory and run faster."},{ru:"Парадигма функционального программирования. Полноценное и строгое типизированное функциональное программирование, нацеленное на продакшен. Эффекты — это значения: Effect только описывает работу и ничего не делает, пока его не запустит рантайм, а возможные ошибки и нужные зависимости записаны в типе Effect<A, E, R>. Кроме того, в библиотеку входят конкурентность на файберах и Schema для проверки данных во время выполнения. Высокий порог входа, но другого рода, чем у fp-ts: осваивать нужно не классы типов, а модель эффектов и большой API. По README fp-ts, Effect можно считать преемником fp-ts v2. Текущая мажорная версия — 4: Effect 4.0.0 вышел 1 октября 2026 года, а ветка 3.x ещё получает исправления (по данным реестра npm на октябрь 2026 года).",en:"The functional programming paradigm. Full-fledged and strict typed functional programming aimed at production. Effects are values: an Effect only describes the work and does nothing until the runtime runs it, and possible errors and required dependencies are recorded in the Effect<A, E, R> type. On top of that come fiber-based concurrency and Schema for validating data at runtime. A high barrier to entry, but of a different kind than with fp-ts: you learn the effect model and a large API rather than type classes. According to the fp-ts README, Effect can be regarded as the successor to fp-ts v2. The current major version is 4: Effect 4.0.0 came out on October 1, 2026, and the 3.x line still receives fixes (according to the npm registry as of October 2026)."}]},{type:"text",ru:"Можно себе представить приверженность к функциональному программированию.",en:"One can picture the degree of commitment to functional programming."},{type:"text",ru:"Vanilla JS (присутствует) -> Lodash (не полноценное) -> Ramda (полноценное) -> Sanctuary (полноценное и строгое)",en:"Vanilla JS (present) -> Lodash (not full-fledged) -> Ramda (full-fledged) -> Sanctuary (full-fledged and strict)"},{type:"text",ru:"В TypeScript рядом с ними стоят fp-ts (полноценное и строгое, на классах типов) и Effect (полноценное и строгое, с эффектами и ошибками в типах).",en:"In TypeScript they are joined by fp-ts (full-fledged and strict, built on type classes) and Effect (full-fledged and strict, with effects and errors in the types)."},{type:"table",caption:{ru:"Сравнительная таблица",en:"Comparison table"},columns:[{ru:"Критерий",en:"Criterion"},{ru:"Vanilla JS",en:"Vanilla JS"},{ru:"Lodash",en:"Lodash"},{ru:"Ramda",en:"Ramda"},{ru:"Sanctuary",en:"Sanctuary"},{ru:"fp-ts",en:"fp-ts"},{ru:"Effect",en:"Effect"}],rows:[[{ru:"Бюджет",en:"Budget"},{ru:"Малый / Средний",en:"Small / Medium"},{ru:"Любой",en:"Any"},{ru:"Любой",en:"Any"},{ru:"Средний / Высокий",en:"Medium / High"},{ru:"Средний / Высокий",en:"Medium / High"},{ru:"Средний / Высокий",en:"Medium / High"}],[{ru:"Этап проекта",en:"Project stage"},{ru:"Любой",en:"Any"},{ru:"Начальный",en:"Early"},{ru:"Любой",en:"Any"},{ru:"Начальный",en:"Early"},{ru:"Если fp-ts уже в проекте",en:"If fp-ts is already in use"},{ru:"Начальный или любой (постепенно)",en:"Early, or any (gradually)"}],[{ru:"Размер команды",en:"Team size"},{ru:"Малая",en:"Small"},{ru:"Любая",en:"Any"},{ru:"Любая",en:"Any"},{ru:"Любая (профи)",en:"Any (pros)"},{ru:"Любая (профи, TS)",en:"Any (pros, TS)"},{ru:"Любая (TS)",en:"Any (TS)"}],[{ru:"Качество",en:"Quality"},{ru:"Среднее",en:"Medium"},{ru:"Среднее",en:"Medium"},{ru:"Высокое",en:"High"},{ru:"Высокое",en:"High"},{ru:"Высокое",en:"High"},{ru:"Высокое",en:"High"}],[{ru:"Производительность",en:"Performance"},{ru:"4 из 5",en:"4 out of 5"},{ru:"3 из 5",en:"3 out of 5"},{ru:"2 из 5",en:"2 out of 5"},{ru:"2 из 5",en:"2 out of 5"},{ru:"2 из 5",en:"2 out of 5"},{ru:"2 из 5",en:"2 out of 5"}],[{ru:"Строгость ФП",en:"FP strictness"},{ru:"1 из 5",en:"1 out of 5"},{ru:"2 из 5",en:"2 out of 5"},{ru:"3 из 5",en:"3 out of 5"},{ru:"4 из 5",en:"4 out of 5"},{ru:"4 из 5",en:"4 out of 5"},{ru:"4 из 5",en:"4 out of 5"}],[{ru:"Порог входа",en:"Barrier to entry"},{ru:"Низкий",en:"Low"},{ru:"Низкий",en:"Low"},{ru:"Средний",en:"Medium"},{ru:"Высокий",en:"High"},{ru:"Высокий",en:"High"},{ru:"Высокий",en:"High"}],[{ru:"Философия",en:"Philosophy"},{ru:"Свобода выбора",en:"Freedom of choice"},{ru:"Утилитарность",en:"Utility"},{ru:"Практичное ФП",en:"Practical FP"},{ru:"Академичное ФП",en:"Academic FP"},{ru:"ФП в духе Haskell",en:"Haskell-style FP"},{ru:"ФП для продакшена",en:"FP for production"}]]}],summary:[{ru:"Выбирать библиотеку по принципам «мне нравится», «это модно» и «я главный, я так хочу» — непрофессиональный подход.",en:`Choosing a library because "I like it", "it's trendy" or "I'm in charge and that's what I want" is not a professional approach.`},{ru:"Критерии выбора: бюджет, этап проекта, команда и онбординг новых разработчиков, качество продукта, производительность и парадигма функционального программирования.",en:"The criteria are the budget, the project stage, the team and the onboarding of new developers, product quality, performance and the functional programming paradigm."},{ru:"Производительность — не самый важный фактор: просадку чаще даёт ошибка в логике приложения, а не библиотека.",en:"Performance is not the most important factor: a slowdown more often comes from a flaw in the application's logic than from a library."},{ru:"Lodash не совсем функциональна: есть проблемы с иммутабельностью, а функции принимают сначала данные и только потом функцию, что мешает композиции. Эти проблемы снимает модуль lodash/fp: в нём функции каррированы, не мутируют данные и принимают их последним аргументом.",en:"Lodash is not entirely functional: there are problems with immutability, and its functions take the data first and only then the function, which gets in the way of composition. The lodash/fp module removes these problems: its functions are curried, do not mutate the data and take it as the last argument."},{ru:"По приверженности к функциональному программированию варианты выстраиваются так: Vanilla JS (присутствует) -> Lodash (не полноценное) -> Ramda (полноценное) -> Sanctuary (полноценное и строгое). В TypeScript к ним добавляются fp-ts и Effect, а README fp-ts предлагает считать Effect преемником fp-ts v2.",en:"By commitment to functional programming the options line up like this: Vanilla JS (present) -> Lodash (not full-fledged) -> Ramda (full-fledged) -> Sanctuary (full-fledged and strict). In TypeScript they are joined by fp-ts and Effect, and according to the fp-ts README, Effect can be regarded as the successor to fp-ts v2."}],exercises:[{task:{ru:"Из списка заказов получите строку с названиями оплаченных заказов дороже 100 — через запятую, в алфавитном порядке. Решите задачу трижды: на Vanilla JS методами массива, на Ramda (R.pipe, R.filter, R.map и другие) и на Sanctuary (S.pipe со списком функций, S.filter, S.map, S.prop, S.sort, S.joinWith). Сравните, как в каждом варианте передаются данные и как собирается композиция.",en:"From the list of orders, get a string with the titles of the paid orders over 100, comma-separated and in alphabetical order. Solve it three times: in Vanilla JS with array methods, in Ramda (R.pipe, R.filter, R.map and others) and in Sanctuary (S.pipe with a list of functions, S.filter, S.map, S.prop, S.sort, S.joinWith). Compare how each version passes the data along and how it builds the composition."},starter:{ru:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// ваш код: withVanilla, withRamda и withSanctuary :: [Object] -> String

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`,en:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// your code: withVanilla, withRamda and withSanctuary :: [Object] -> String

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`},solution:{ru:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// Vanilla JS: цепочка методов, данные — сам массив
// withVanilla :: [Object] -> String
const withVanilla = (list) =>
  list
    .filter((order) => order.paid && order.total > 100)
    .map((order) => order.title)
    .sort()
    .join(', ')

// Ramda: функции каррированы и принимают данные последним аргументом
// withRamda :: [Object] -> String
const withRamda = R.pipe(
  R.filter(R.prop('paid')),
  R.filter(R.pipe(R.prop('total'), R.lt(100))), // R.lt(100)(total) — это 100 < total
  R.map(R.prop('title')),
  R.sortBy(R.identity),
  R.join(', '),
)

// Sanctuary: S.pipe принимает массив функций, данные тоже идут последним аргументом
// withSanctuary :: [Object] -> String
const withSanctuary = S.pipe([
  S.filter(S.prop('paid')),
  S.filter(S.pipe([S.prop('total'), S.gt(100)])), // S.gt(100)(total) — это total > 100
  S.map(S.prop('title')),
  S.sort,
  S.joinWith(', '),
])

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`,en:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// Vanilla JS: a chain of methods, the data is the array itself
// withVanilla :: [Object] -> String
const withVanilla = (list) =>
  list
    .filter((order) => order.paid && order.total > 100)
    .map((order) => order.title)
    .sort()
    .join(', ')

// Ramda: functions are curried and take the data as the last argument
// withRamda :: [Object] -> String
const withRamda = R.pipe(
  R.filter(R.prop('paid')),
  R.filter(R.pipe(R.prop('total'), R.lt(100))), // R.lt(100)(total) means 100 < total
  R.map(R.prop('title')),
  R.sortBy(R.identity),
  R.join(', '),
)

// Sanctuary: S.pipe takes an array of functions, the data also comes last
// withSanctuary :: [Object] -> String
const withSanctuary = S.pipe([
  S.filter(S.prop('paid')),
  S.filter(S.pipe([S.prop('total'), S.gt(100)])), // S.gt(100)(total) means total > 100
  S.map(S.prop('title')),
  S.sort,
  S.joinWith(', '),
])

console.log(\`Vanilla JS: \${withVanilla(orders)}\`)
console.log(\`Ramda: \${withRamda(orders)}\`)
console.log(\`Sanctuary: \${withSanctuary(orders)}\`)`},expected:{ru:`Vanilla JS: keyboard, laptop
Ramda: keyboard, laptop
Sanctuary: keyboard, laptop`,en:`Vanilla JS: keyboard, laptop
Ramda: keyboard, laptop
Sanctuary: keyboard, laptop`}},{task:{ru:"Найдите название первого оплаченного заказа дороже заданной суммы, а если такого нет, верните «нет». Сделайте это на Ramda через R.find и на Sanctuary через S.find, S.map и S.fromMaybe, проверьте на суммах 500 и 1000. Затем выведите, что возвращают сами R.find и S.find, когда подходящего заказа нет. Чем ответ Sanctuary надёжнее?",en:'Find the title of the first paid order over a given amount, and if there is none, return "none". Do it in Ramda with R.find and in Sanctuary with S.find, S.map and S.fromMaybe, and check it with the amounts 500 and 1000. Then print what R.find and S.find themselves return when there is no matching order. Why is the Sanctuary answer more reliable?'},starter:{ru:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// ваш код: titleWithRamda и titleWithSanctuary :: Number -> [Object] -> String

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)`,en:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// your code: titleWithRamda and titleWithSanctuary :: Number -> [Object] -> String

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)`},solution:{ru:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// Ramda: R.find возвращает заказ или undefined, пустоту проверяем сами
// titleWithRamda :: Number -> [Object] -> String
const titleWithRamda = (limit) => R.pipe(
  R.find(isPaidOver(limit)),
  (order) => (order === undefined ? 'нет' : order.title),
)

// Sanctuary: S.find возвращает Maybe — Just (заказ) или Nothing,
// S.map и S.fromMaybe обрабатывают оба случая
// titleWithSanctuary :: Number -> [Object] -> String
const titleWithSanctuary = (limit) => S.pipe([
  S.find(isPaidOver(limit)),
  S.map(S.prop('title')),
  S.fromMaybe('нет'),
])

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)

// заказа дороже 1000 нет: Ramda возвращает undefined, Sanctuary — Nothing
console.log(R.find(isPaidOver(1000))(orders))
console.log(S.find(isPaidOver(1000))(orders))

// undefined легко пропустить: забытая проверка уронит код дальше,
// например на чтении order.title. Maybe прямо говорит, что результата
// может не быть, и S.map и S.fromMaybe обрабатывают оба случая`,en:`const orders = [
  { title: 'keyboard', total: 120, paid: true },
  { title: 'mouse', total: 40, paid: true },
  { title: 'monitor', total: 300, paid: false },
  { title: 'laptop', total: 900, paid: true },
  { title: 'cable', total: 15, paid: false },
]

// isPaidOver :: Number -> Object -> Boolean
const isPaidOver = (limit) => (order) => order.paid && order.total > limit

// Ramda: R.find returns the order or undefined, we check for emptiness ourselves
// titleWithRamda :: Number -> [Object] -> String
const titleWithRamda = (limit) => R.pipe(
  R.find(isPaidOver(limit)),
  (order) => (order === undefined ? 'none' : order.title),
)

// Sanctuary: S.find returns a Maybe, either Just (order) or Nothing,
// and S.map and S.fromMaybe handle both cases
// titleWithSanctuary :: Number -> [Object] -> String
const titleWithSanctuary = (limit) => S.pipe([
  S.find(isPaidOver(limit)),
  S.map(S.prop('title')),
  S.fromMaybe('none'),
])

console.log(\`Ramda, 500: \${titleWithRamda(500)(orders)}\`)
console.log(\`Ramda, 1000: \${titleWithRamda(1000)(orders)}\`)
console.log(\`Sanctuary, 500: \${titleWithSanctuary(500)(orders)}\`)
console.log(\`Sanctuary, 1000: \${titleWithSanctuary(1000)(orders)}\`)

// there is no order over 1000: Ramda returns undefined, Sanctuary returns Nothing
console.log(R.find(isPaidOver(1000))(orders))
console.log(S.find(isPaidOver(1000))(orders))

// undefined is easy to miss: a forgotten check will crash the code later,
// for example when reading order.title. A Maybe states outright that there
// may be no result, and S.map and S.fromMaybe handle both cases`},expected:{ru:`Ramda, 500: laptop
Ramda, 1000: нет
Sanctuary, 500: laptop
Sanctuary, 1000: нет
undefined
Nothing`,en:`Ramda, 500: laptop
Ramda, 1000: none
Sanctuary, 500: laptop
Sanctuary, 1000: none
undefined
Nothing`}}]},O=[e,t],E=[n,a,x,k,r,o,s,h,m,d,f,p,g,N,b,y,w,R,A,i,c,l,u,v,S,T];export{O as introSections,E as lessons};
