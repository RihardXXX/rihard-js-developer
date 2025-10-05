<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { COMPOSITION } from '~/utils/course/constants';

export default defineComponent({
  name: 'CompositionFunctions',
  components: {
    Subtitle,
    Description,
    CodeBlock,
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
      <CodeBlock>
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
          А теперь представим ситуацию когда количество функций более 3.
        </p>
        <p>
         В реальных проектах используйте compose с готовых библиотек.
         Мы попробуем создать compose несколькими способами <strong>
          Императивно, декларативно, рекурсивно
         </strong>
        </p>
      </Description>
    </section>
</template>
