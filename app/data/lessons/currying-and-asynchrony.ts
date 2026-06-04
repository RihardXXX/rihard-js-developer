import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'currying-and-asynchrony',
  title: { ru: "Каррирование и Асинхронность (Эволюция)", en: "Currying and asynchrony (evolution)" },
  blocks: [
    {
      type: 'text',
      ru: "Каррирование можно эффективно использовать в асинхронном программировании.",
      en: "Currying can be used effectively in asynchronous programming.",
    },
    {
      type: 'text',
      ru: "1. Создание специализированных функций",
      en: "1. Creating specialized functions",
    },
    {
      type: 'text',
      ru: "2. Победим \"ад колбеков\" без промисов",
      en: "2. We will defeat \"callback hell\" without promises",
    },
    {
      type: 'code',
      code: `//  Давайте создадим базовую функцию для запросов
// baseFetch :: String -> String -> a -> Promise
const baseFetch = (baseUrl)
                    => (params)
                    => (config = {}) =>
                      fetch(\`\${baseUrl}/\${params}\`, config)


const BASE_URL = 'https://example.com'
// для работы с базовым url
const useFetch = baseFetch (BASE_URL)

// создадим две специализированные функции
// получение списка всех пользователей
const getAllUser = useFetch ('all-users')
// получения списка всех книг
const getAllBooks = useFetch ('all-books')

// дальше можем вызывать функции и получать данные
( async () => console.log( await getAllUser () )) ()
( async () => console.log( await getAllBooks () )) ()

// вы можете добавить авторизационные токены
// в отдельном замыкании если это необходимо
// xFetch :: String -> b -> String -> a -> Promise
const xFetch = (baseUrl)
          => (headers)
          => (params)
          => (config = {}) =>
            fetch(\`\${baseUrl}/\${params}\`, {
              ...headers,
              ...config,
            })

const token = 'xxx'
// для работы с базовым url и установка заголовком сразу
const useXFetch = xFetch (BASE_URL) ({
  headers: {
      'Content-Type': 'application/json',
      'authorization': \`Bearer \${token}\`,
    }
})

// создадим две специализированные функции
// получение списка всех пользователей
const getAllUserX = useXFetch ('all-users')
// получения списка всех книг
const getAllBooksX = useXFetch ('all-books')`,
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
      code: `//  код который "плохо пахнет"

// создадим функцию для запросов на основе XMLHttpRequest
// он на событиях без промисов
// можно конечно обернуть в промисы, но сейчас у нас тема каррирование))

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

// текс который покажем
var textReview = ''

// используем делегирование на всем контейнере с кнопками
document.getElementById('users-wrapper')
  .addEventListener('click', (e) => {
    // получаем элемент
    const el = e.target

    // если кнопка не с пользователем но игнорим клик
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
    fetchXML('https://example.com/reviews/' + slugUser, (data) => {
      // получаем список пользователей
      const reviews = data.reviews

      // получаем слаг последнего отзыва
      const slugFirstReview = reviews[0].slug

      // делаем запрос и получаем подробную информацию по отзыву
      fetchXML('https://example.com/review/' + slugFirstReview, (data) => {
        const review = data.review

        textReview = review
      })
    })
  })`,
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
      code: `//  декларативный код
// ==== ВНИМАНИЕ многие функции хелперы уже
// ==== существуют в готовых библиотеках
// ==== тут мы это часто показываем в учебных целях

// создадим функцию для запросов на основе XMLHttpRequest
// он на событиях без промисов
// можно конечно обернуть в промисы, но сейчас у нас тема каррирование))

// fetchXML :: String -> String -> String -> (a -> b) -> c
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

// теперь создадим хелпер для сообщения клик
// чтобы вызывать в композиции функций
// clickElement :: a -> (a -> *) -> *
const clickElement = (element) =>
                      (callback) =>
                        element.addEventListener('click', callback)

// Чего мы хотим
// 1. При клике на кнопку подробнее
// у определенного пользователя мы получим его слаг из дата атрибута
// 2. По слагу сделаем запрос и получим список отзывов,
// 3. Берем слаг последнего отзыва (первый в списке) и делаем запрос
// 4. Получаем подробную информацию об отзыве, берем оттуда текст

// head :: [a] -> a
const head = (arr) => arr[0]

// prop :: String -> a -> b
const prop = (prop) => (obj) => obj[prop]

// текс который покажем
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
    },
    {
      type: 'text',
      ru: "Признаюсь вам ))) запах плохого кода не пропал.",
      en: "I'll admit to you ))) the smell of bad code hasn't gone away.",
    },
    {
      type: 'text',
      ru: "А что если мы добавим мощь промисов в код выше и преобразим его.",
      en: "What if we add the power of promises to the code above and transform it.",
    },
    {
      type: 'code',
      code: `//  А теперь возьмемся за дело
// перепишем нашу функцию получения данных
// которая сама возвращает промис

// fetchClassic :: String -> String -> String -> Promise
const fetchClassic = (baseUrl) =>
                        (params) =>
                        (id) =>
                        fetch (\`\${baseUrl}/\${params}/\${id}\`)
                          .then (res => res.json())

const BASE_URL = 'https://example.com'
const REVIEWS = 'reviews'
const REVIEW_INFO = 'review-info'

// получения списка отзывов
const getReviews = fetchClassic (BASE_URL) (REVIEWS)
const getReviewInfo = fetchClassic (BASE_URL) (REVIEW_INFO)


// У нас будет супер пайп, который под капотом
// будет проверять промисы ))
// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipeAsync = (...fns) => (x) => fns.reduce((v, f) => {
  return v instanceof Promise
    ? v.then(f)
    : f(v)
}, x)

// запускаем улучшенный вариант
// pipeAsync отрабатывает промисы под капотом
clickElement (btnWrapper) (pipeAsync(
  (e) => e?.target, // получаем элемент
  (el) => el?.dataset?.slug, // получаем дата атрибут
  getReviews, // делаем запрос на получение всех отзывов
  head, // берем первый отзыв
  prop('slug'), // оттуда слаг
  getReviewInfo, // по слагу делаем запрос на получение инфы отзыва
  prop('text'), // берем поле text
  (text) => textReview = text, // устанавливаем значением в глоб переменную
))`,
    },
  ],
}

export default lesson
