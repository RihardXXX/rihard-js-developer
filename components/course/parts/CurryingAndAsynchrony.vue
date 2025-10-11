<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { CURRYING_AND_ASYNCHRONY } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'CurryingBlock',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },
  data() {
    return {
      CURRYING_AND_ASYNCHRONY
    }
  }
});
</script>

<template>
  <section :id="CURRYING_AND_ASYNCHRONY">
      <Subtitle>Каррирование и Асинхронность (Эволюция)</Subtitle>
      <Description>
        <p>
          <strong>Каррирование</strong>
          можно эффективно использовать в асинхронном программировании.
        </p>
        <p>
          1. Создание специализированных функций
        </p>
        <p>
          2. Победим "Ад колбеков" без промисов
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    //  Давайте создадим базовую функцию для запросов
    // baseFetch :: String -> String -> a -> Promise
    const baseFetch = (baseUrl)
                        => (params)
                        => (config = {}) =>
                          fetch(`${baseUrl}/${params}`, config)


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
                fetch(`${baseUrl}/${params}`, {
                  ...headers,
                  ...config,
                })

    const token = 'xxx'
    // для работы с базовым url и установка заголовком сразу
    const useXFetch = xFetch (BASE_URL) ({
      headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`,
        }
    })

    // создадим две специализированные функции
    // получение списка всех пользователей
    const getAllUserX = useXFetch ('all-users')
    // получения списка всех книг
    const getAllBooksX = useXFetch ('all-books')


          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

          //  Давайте создадим базовую функцию для запросов
          // baseFetch :: String -> String -> a -> Promise
          const baseFetch = (baseUrl)
                              => (params)
                              => (config = {}) =>
                                fetch(`${baseUrl}/${params}`, config)


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
                      fetch(`${baseUrl}/${params}`, {
                        ...headers,
                        ...config,
                      })

          const token = 'xxx'
          // для работы с базовым url и установка заголовком сразу
          const useXFetch = xFetch (BASE_URL) ({
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`,
              }
          })

          // создадим две специализированные функции
          // получение списка всех пользователей
          const getAllUserX = useXFetch ('all-users')
          // получения списка всех книг
          const getAllBooksX = useXFetch ('all-books')

          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          А теперь внизу мы покажем два примера.
        </p>
        <p>
          Первый код будет императивный на колбеках, а второй будет использовать
          <strong>каррирование</strong> и замыкание без промисов.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    //  код который "плохо пахнет"

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
      })


          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

          //  код который "плохо пахнет"

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
            })


          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          Мы используем <strong>каррирование</strong>
          без промисов и победим "ад колбеком"
        </p>
        <p>
          Отрефакторим наш код.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    //  декларативный код
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
      req.open('GET', `${baseUrl}/${params}/${id}`)
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
    ))

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

          //  декларативный код
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
            req.open('GET', `${baseUrl}/${params}/${id}`)
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
          ))

          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          Я Вам признаюсь ))) запах плохо кода не пропал.
        </p>
        <p>
          А что если мы добавим мощь Промисов в код выше и преобразим его.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    //  А теперь возьмемся за дело
    // перепишем нашу функцию получения данных
    // которая сама возвращает промис

    // fetchClassic :: String -> String -> String -> Promise
    const fetchClassic = (baseUrl) =>
                            (params) =>
                            (id) =>
                            fetch (`${baseUrl}/${params}/${id}`)
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
    ))

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

          //  А теперь возьмемся за дело
          // перепишем нашу функцию получения данных
          // которая сама возвращает промис

          // fetchClassic :: String -> String -> String -> Promise
          const fetchClassic = (baseUrl) =>
                                  (params) =>
                                  (id) =>
                                  fetch (`${baseUrl}/${params}/${id}`)
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
          ))

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
