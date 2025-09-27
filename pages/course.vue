<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

export default defineComponent({
  name: 'Course',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  layout: 'course',
});
</script>

<template>
  <div class="container">
    <br />
    <br />

    <!-- Оглавление с якорными ссылками -->
    <ol :class="$style.contentList">
      <li><a href="course#for-whom">Для кого этот курс</a></li>
      <li><a href="course#not-for-whom">Кому не подойдёт</a></li>
      <li><a href="course#imperative-vs-declarative">Императивность и декларативность</a></li>
      <li><a href="course#functional programming">Функциональное программирование</a></li>
      <li><a href="course#pure-functions">Чистые функции</a></li>
      <!-- Добавьте остальные пункты по мере наполнения -->
    </ol>

    <!-- Раздел 1 -->
    <section id="for-whom">
      <Subtitle>для кого этот курс</Subtitle>
      <Description>
        <p>
          Этот курс в первую очередь написан для разработчиков с опытом разработки в JS, которые
          хотят расширить свой кругозор и писать более надежный, декларативный и сопровождаемый код
          в функциональном стиле.
        </p>
      </Description>
    </section>

    <!-- Раздел 2 -->
    <section id="not-for-whom">
      <Subtitle>кому этот курс не подойдет</Subtitle>
      <Description>
        <p>
          Этот курс не подойдет начинающим разработчикам, которые только постигают азы
          разработки на JS.
        </p>
      </Description>
    </section>

    <!-- Раздел 3 -->
    <section id="imperative-vs-declarative">
      <Subtitle>Императивность и декларативность</Subtitle>
      <Description>
        <p>
          Императивный код говорит вам "как вы это делаете". То есть Вам надо вникать в сам код.
        </p>
        <p>
          Декларативный код Вам говорит, что делает ваш код, он чаще модульный, и вам не нужно. вникать в
          весь код. Если требуются изменения, вы вносите изменений в определенный участок кода модульно.
        </p>
      </Description>
      <CodeBlock>
        <template #default>
          <code>
            // например получить все числа больше 3 из текущего массива

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
            // gt3 :: Number -> Boolean
            const gt3 = number => number > 3

            const result = numbers.filter(gt3) // мы не вникаем в реализацию а просто читаем название

            console.log(result) // 4, 5 тот же результат более декларативен
            // =========

            // Мы можем повысить слои абстракции (и тут Остапа понесло))) )
            // =========
            // не пугайтесь если сразу непонятно, поймете дальше

            // filter :: (* -> Boolean) -> Array A -> Array B
             const filter = (predicat, arr) => arr.filter(predicat)

             // filterBy :: (* -> Boolean) -> Array A -> Array B
            const filterBy = (predicat) => (arr) => filter(predicat, arr)

            // gt :: Number -> (Number -> Boolean) -> Boolean
            const gt = pointer => number => number > pointer

            // теперь мы создаем любые функции предикаты
            // для фильтрации
            // gt2 :: Number -> (Number -> Boolean)
            const gt2 = gt(2) // предикат для фильтрации чисел больше 2
            const gt3 = gt(3) // предикат для фильтрации чисел больше 3

            // а вот теперь мы можем фильтровать массив по любым предикатам

            const more2 = filterBy (gt2) (arr) // получаем числа больше 2
            const more3 = filterBy (gt3) (arr) // получаем числа больше 3

            // мы можем также главную функцию фильтрации подготовить для конвееров
            // не вызывая сразу ее
            // filterByGt2 :: Array A -> Array B
            const filterByGt2 = filterBy (gt2) // ожидает массива

            // filterByGt2 (arr) из названия мы уже понимаем что идет фильтрация чисел больше 2
            const result = filterByGt2 (arr) // получаем готовый результат числа больше 2
            // ======

          </code>
        </template>
      </CodeBlock>
    </section>

    <section id="functional programming">
      <Subtitle>функциональное программирование</Subtitle>
      <Description>
        <p>
          Функциональное программирование - это высокоуровневая декларативная разработка на основе
          чистых функций.
        </p>
        <p>
          Чистые функции - это функции, которые при и одних и тех же аргументах возвращают
          одинаковый результат и не создают побочных (сайд) эффектов.
        </p>
      </Description>
      <CodeBlock>
        <template #default>
          <code>
            // ==== Внимание ===
            // Эти примеры Вам пока могут казаться крайне запутанными и непонятными
            // Не пугайтесь и читайте дальше

            // Пример функционального кода

            const allUsers = [
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
            ]

            // наша цель
            // 1. Получить пользователей со статусом онлайн
            // 2. Старше 20 лет
            // 3. Первого пользователя из списка

            // isStatus :: String -> Object -> Boolean
            const isStatus = status => pipe([
              prop('status'), // берем содержимое поля статус у пользователя
              equals(status), // сравниваем поле юзера со статусом установленным выше
            ])

            // moreAge :: Number -> Object -> Boolean
            const moreAge = age => pipe([
              prop('age'), // берем содержимое поля возраст
              gt(age), // поле юзера было больше age
            ])

            // searchOnlineUsers :: Array Object A -> Array Object B
            const searchOnlineUsers= pipe([
              filter(isStatus('online')), // получаем только пользователей онлайн
              filter(moreAge(20)), // получаем пользователей старше 20 лет
              head, // получаем первого пользователя из списка
            ])

            // start
            const onlineUsersByAge = searchOnlineUsers(allUsers)
          </code>
        </template>
      </CodeBlock>
    </section>

    <section id="pure-functions">
      <Subtitle>Чистые функции</Subtitle>
      <Description>
        <p>
          Чистые функции крайне важны, они идемпотентны. Если вам нужны сайд эффекты
          то группируйте их в отдельные функции и разделяйте от чистых функций. Любая программа
          особенно в вебе нуждается в сайд эффектах (изменение Dom дерева (tree), запросы к серверу (fetch), чтение из файла (readFile) и тп)
        </p>
      </Description>
      <CodeBlock>
        <template #default>
          <code>

            // НЕчистая функция
            // ===============================
            let user = { name: John, age: 25 }

            const changeAge = () => user.age = 30

            // мы мутируем внешнюю переменную и создаем сайд эффекты
            // программа будет везти себя непредсказуемо так как с этой
            // переменной могут работать несколько функций  и отловить ошибку будет сложнее
            changeAge()
            console.log(user) // { name: John, age: 30 }
            // ===============================


            // Такой код допустим, если мы создаем независимые модули с собственным замыканием
            // ===============================
            // useChangeUser :: Object -> Object
            const useChangeUser = (user) => {

              const userBase = structuredClone(user) // обязательно клонируем

              const changeAge = (newAge) => userBase.age = newAge

              // для работы снаружи с данными
              return {
                userBase,
                changeAge
              }
            }

            // Но даже в этом случае лучше делать так
            // useChangeUser :: Object -> Object
            const useChangeUser = (user) => {

              const userBase = structuredClone(user) // обязательно клонируем

              const changeAge = (newAge) => userBase = ({
                ...userBase, // или structuredClone(userBase)
                age: newAge
              })

              // для работы снаружи с данными
              return {
                userBase,
                changeAge
              }
            }
            // ===============================


            // А теперь давайте поправим пример выше
            // ===============================
            // Чистая функция
            let user = { name: John, age: 25 }

            // changeAge :: Number -> Object -> Object
            const changeAge = (newAge, user) => ({
              ...user,
              age: newAge
            })

            //  улучшим
            // или если требуется глубокое клонирование и отсрочка вызова

            // changeAge :: Number -> Object -> Object
            const changeAge = (newAge) => (user) => ({
              ...structuredClone(user),
              age: newAge
            })

            // тут мы проверим все
            const changedUser = changeAge (30) (user)

            console.log(user) // { name: John, age: 25 } сохранил первоначальное состояние
            console.log(changedUser) // { name: John, age: 30 } получили нового пользователя без сайд эффектов
            // ===============================
          </code>

        </template>
      </CodeBlock>
    </section>

    <CodeBlock>
      <template #default>
        <code>const greet = (name) => `Hello, ${name}!`</code>
      </template>
    </CodeBlock>
  </div>
</template>

<style lang="scss" module>
.contentList {
  text-align: left;
  margin: 0 0 2rem 1rem;
  font-weight: 500;
  font-size: 2rem;
  transition: all 0.5s;
  color: var(--text-color);
  padding: 0 1rem;

  li {
    margin: 1rem 0;
    list-style-type: circle;
  }

  a {
    color: inherit;
    /* text-decoration: none; */
    transition: color 0.2s;

    &:hover {
      color: var(--accent-color, #007acc);
      text-decoration: underline;
    }
  }

  @include respond-to(mobile) {
    margin-bottom: 1.4rem;
    font-size: 1.8rem;
  }
}
</style>
