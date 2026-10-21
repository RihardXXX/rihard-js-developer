import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'currying-and-asynchrony',
  title: { ru: "Каррирование и Асинхронность (Эволюция)", en: "Currying and asynchrony (evolution)" },
  goal: {
    ru: "Научиться применять каррирование в асинхронном коде: создавать специализированные функции запросов и собирать асинхронные шаги в конвейер, который сам дожидается промисов.",
    en: "Learn to apply currying to asynchronous code: build specialized request functions and chain asynchronous steps into a pipeline that waits for promises by itself.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Каррирование можно эффективно использовать в асинхронном программировании.",
      en: "Currying can be used effectively in asynchronous programming.",
    },
    {
      type: 'list',
      ordered: true,
      items: [
        {
          ru: "Создание специализированных функций",
          en: "Creating specialized functions",
        },
        {
          ru: "Победим \"ад колбеков\" без промисов",
          en: "We will defeat \"callback hell\" without promises",
        },
      ],
    },
    {
      type: 'code',
      noRun: 'network',
      code: {
        ru: `//  Давайте создадим базовую функцию для запросов
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
const getAllBooksX = useXFetch ('all-books')`,
        en: `//  Let's create a base function for requests
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
const getAllBooksX = useXFetch ('all-books')`,
      },
    },
    {
      type: 'text',
      ru: "А теперь внизу мы покажем два примера.",
      en: "Now below we will show two examples.",
    },
    {
      type: 'text',
      ru: "Первый код будет императивный на колбеках, а второй будет использовать каррирование и замыкание без промисов.",
      en: "The first piece of code will be imperative and callback-based, while the second will use currying and closures without promises.",
    },
    {
      type: 'code',
      noRun: 'dom',
      code: {
        ru: `//  код который "плохо пахнет"

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
  })`,
        en: `//  code that "smells bad"

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
  })`,
      },
    },
    {
      type: 'text',
      ru: "Мы используем каррирование без промисов и победим \"ад колбеков\".",
      en: "We will use currying without promises and defeat \"callback hell\".",
    },
    {
      type: 'text',
      ru: "Отрефакторим наш код.",
      en: "Let's refactor our code.",
    },
    {
      type: 'code',
      noRun: 'dom',
      code: {
        ru: `//  декларативный код
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
))`,
        en: `//  declarative code
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
))`,
      },
    },
    {
      type: 'text',
      ru: "Признаюсь: запах плохого кода не пропал. Вдобавок эта версия потеряла проверки из первой: что клик был по кнопке пользователя и что у кнопки есть слаг. Поэтому клик мимо кнопки отправит запрос на /reviews/undefined, а ошибки здесь никак не обрабатываются. Оба недостатка исправим в следующей версии.",
      en: "I'll admit it: the smell of bad code hasn't gone away. On top of that, this version lost the checks from the first one: that the click was on a user button and that the button has a slug. So a click outside a button sends a request to /reviews/undefined, and errors aren't handled here at all. We'll fix both shortcomings in the next version.",
    },
    {
      type: 'text',
      ru: "А что, если мы добавим в код выше мощь промисов и преобразим его?",
      en: "What if we add the power of promises to the code above and transform it?",
    },
    {
      type: 'code',
      noRun: 'dom',
      code: {
        ru: `//  А теперь возьмемся за дело
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
))`,
        en: `//  Now let's get down to business
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
))`,
      },
    },
  ],
  summary: [
    {
      ru: "Каррированная базовая функция запросов baseFetch хранит в замыканиях базовый URL и путь, а из неё вызовами получаются специализированные функции вроде getAllUser и getAllBooks. Заголовки с токеном можно хранить в отдельном замыкании, как в xFetch, из которой получаются getAllUserX и getAllBooksX.",
      en: "The curried base request function baseFetch keeps the base URL and the path in closures, and specialized functions such as getAllUser and getAllBooks are built from it through calls. Headers with a token can be kept in a separate closure, as in xFetch, from which getAllUserX and getAllBooksX are built.",
    },
    {
      ru: "Каррирование и pipe без промисов делают код на колбеках декларативным, но запах плохого кода не пропадает: ошибки в такой версии никак не обрабатываются.",
      en: "Currying and pipe without promises make callback-based code declarative, but the smell of bad code doesn't go away: errors aren't handled in that version at all.",
    },
    {
      ru: "pipeAsync сам дожидается промисов: если шаг вернул промис, следующие шаги идут через then, и на выходе тоже промис.",
      en: "pipeAsync waits for promises by itself: once a step returns a promise, the next steps go through then, and the result is a promise too.",
    },
    {
      ru: "В конвейере на промисах ошибка любого шага — сеть, статус ответа, пустой список — попадает в один catch.",
      en: "In a promise-based pipeline, an error at any step — the network, the response status, an empty list — ends up in a single catch.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "В заготовке fakeFetch имитирует запрос: через 5 мс он отдаёт ответ из DB по адресу или отклоняет промис, если такого адреса нет. Напишите каррированную базовую функцию createRequest :: String -> String -> Number -> Promise Object, которая принимает базовый URL, ресурс и id. Зафиксируйте в ней базовый URL https://example.com и получите специализированные функции getUser и getBook. Выведите имя пользователя 1 и название книги 7.",
        en: "In the starter, fakeFetch simulates a request: after 5 ms it returns the response stored in DB under the URL, or rejects the promise if there is no such URL. Write a curried base function createRequest :: String -> String -> Number -> Promise Object that takes a base URL, a resource and an id. Fix the base URL https://example.com in it and derive the specialized functions getUser and getBook. Print the name of user 1 and the title of book 7.",
      },
      starter: {
        ru: `// данные фейкового сервера: адрес -> ответ
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

// ваш код`,
        en: `// fake server data: URL -> response
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

// your code`,
      },
      solution: {
        ru: `// данные фейкового сервера: адрес -> ответ
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
getBook(7).then((book) => console.log(book.title))`,
        en: `// fake server data: URL -> response
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
getBook(7).then((book) => console.log(book.title))`,
      },
      expected: {
        ru: "John\nStructure and Interpretation of Computer Programs",
        en: "John\nStructure and Interpretation of Computer Programs",
      },
    },
    {
      task: {
        ru: "В заготовке уже есть getUser и getBook из первого упражнения. Напишите pipeAsync — pipe, который сам дожидается промисов, — и соберите из него loadFavoriteBook :: Number -> Promise String: по id запросить пользователя, взять поле favoriteBook, запросить эту книгу и вернуть её название. Вывод уже есть в заготовке: showFavoriteBook выводит название любимой книги пользователя 2, затем пробует пользователя 5, которого нет в DB, и перехватывает ошибку в catch.",
        en: "The starter already has getUser and getBook from the first exercise. Write pipeAsync, a pipe that waits for promises by itself, and use it to build loadFavoriteBook :: Number -> Promise String: request the user by id, take the favoriteBook field, request that book and return its title. The output is already in the starter: showFavoriteBook prints the title of user 2's favorite book, then tries user 5, who is not in DB, and handles the error with catch.",
      },
      starter: {
        ru: `// данные фейкового сервера: адрес -> ответ
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
showFavoriteBook(2).then(() => showFavoriteBook(5))`,
        en: `// fake server data: URL -> response
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
showFavoriteBook(2).then(() => showFavoriteBook(5))`,
      },
      solution: {
        ru: `// данные фейкового сервера: адрес -> ответ
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
showFavoriteBook(2).then(() => showFavoriteBook(5))`,
        en: `// fake server data: URL -> response
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
showFavoriteBook(2).then(() => showFavoriteBook(5))`,
      },
      expected: {
        ru: "Functional-Light JavaScript\nЗапрос не удался: 404 https://example.com/users/5",
        en: "Functional-Light JavaScript\nRequest failed: 404 https://example.com/users/5",
      },
    },
  ],
}

export default lesson
