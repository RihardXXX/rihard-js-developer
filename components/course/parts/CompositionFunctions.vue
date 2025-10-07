<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { COMPOSITION } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'CompositionFunctions',
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
      COMPOSITION
    }
  }
});
</script>

<template>
  <section :id="COMPOSITION">
      <Subtitle>Композиция функций</Subtitle>
      <Description>
        <p>
          <strong>Композиция функций</strong> - это способность функций вызываться последовательно,
          где результат одной функции передаётся следующей.
        </p>
        <p>
          <strong>Композиция функций</strong> это одно из фундаментальных понятий,
          на которых основана теория категорий.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // === композиция из 3 функций ===
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

    // ===============================
          </code>

        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // === композиция из 3 функций ===
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

            // ===============================
          </code>

        </template>
      </CodeBlock>
      <Description>
        <p>
          Если вы заметили в примере выше, порядок выполнения функций
          был справа налево, с точки зрения математики это ок.
          Но часто читателю удобнее читать код слева направо.
        </p>
        <p>
         Поэтому код выше мы можем переписать.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // === композиция из 3 функций в человеко читаемом формате ===
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

    // ===============================
          </code>

        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // === композиция из 3 функций в человеко читаемом формате ===
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

            // ===============================
          </code>

        </template>
      </CodeBlock>
      <Description>
        <p>
          А теперь представим ситуацию когда количество функций более 3.
        </p>
        <p>
         В реальных проектах используйте compose или pipe с готовых библиотек.
         Мы попробуем создать compose несколькими способами <strong>
          (Императивно) (Декларативно) (Рекурсивно)
         </strong>
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // === композиция функций в нестрого заданном количестве функций ===

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

    // ===============================
          </code>

        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // === композиция функций в нестрого заданном количестве функций ===

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

            // ===============================
          </code>

        </template>
      </CodeBlock>
      <Description>
        <p>
          А теперь давайте реализуем в <strong>функциональном стиле декларативно</strong>.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>
    // === композиция функций в нестрого заданном количестве функций ===

    // === Способ императивный ===
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

    // ===============================
          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>
          // === композиция функций в нестрого заданном количестве функций ===

          // === Способ императивный ===
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

          // ===============================
          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          Мы также можем реализовать <strong>композицию функций</strong> рекурсивно.
          Сразу сделаем оптимизацию
          хвостовой рекурсии и сократим количество вызовов вдвое.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>
    // === композиция функций в нестрого заданном количестве функций ===

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

    // ===============================
          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>
          // === композиция функций в нестрого заданном количестве функций ===

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

          // ===============================
          </code>
        </template>
      </CodeBlock>
    </section>
</template>
