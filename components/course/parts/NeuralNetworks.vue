<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { NEURAL_NETWORKS } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'NeuralNetworks',
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
      NEURAL_NETWORKS
    }
  }
});
</script>

<template>
  <section :id="NEURAL_NETWORKS">
      <Subtitle>Нейронные сети и теория категорий</Subtitle>
      <Description>
        <p>
          Давайте с Вами попробуем рассмотреть работу <strong>нейронных сетей</strong>
          в рамках теории категорий. Для этого мы вначале повторим понятие
          <strong>теории категорий</strong> о которой мы говорили в предыдущих главах.
        </p>
        <p>
          <strong>Теория категорий</strong> - это совокупность абстрактных объектов
          (любых) и их морфизмов (стрелок их отношений), а также законов по которым они работают.
        </p>
        <p>
          <strong>Теория категорий в рамках нейронных сетей</strong> -
          это совокупность абстрактных объектов (нейронов или слоев с нейронами)
          и их морфизмов (стрелок то есть порядок вызова нейронов или взаимодействия слоев с нейронами),
          а также законов по которым они работают (композиция).
        </p>
        <p>
          Представим себе, что нейрон в нейросети это чистая функция и она вызывает другие функции
          в определенном порядке. Тоже самое можно представить когда определенные слои взаимодействуют
          в нейронной сети. Слой - это совокупность нейронов.
        </p>
        <p>
          Порядок построения (архитектура) местонахождение слоев  между собой и каких нейронов в каких
          слоях определяется создателем нейросети.
        </p>
        <p>
          То есть по сути
          <br>
           - слои это совокупность функций (модули с функциями)
          <br>
          - нейроны это функции
          <br>
          - морфизмы это порядок вызова функций одних другими.
          <br>
          - Веса в нейронной сети это по сути аргументы, которые мы прокидываем
          при вызове нейрона, то есть функции.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // ==== Визуализация данных ====

    -------------------
    |   Ваш вопрос     |
    -------------------
            ||
            ▼
    -------------------
    |  Слой математики |
    -------------------
            ||
            ▼
    -------------------
    |  Слой анализа    |
    -------------------
            ||
            ▼
    -------------------
    |  Слой вывода     |
    -------------------

    -------------------

    // можно представить и как композицию функций

    const mathModule = pipe (
      Math.sin, // совокупность функций
      Math.cos,
      ...
    )

    // logicModule :: Number :: String
    const logicModule = (x) => x > 0 ? 'Положительное' : 'Отрицательное'

    // langModule :: Number -> String
    const langModule = (x) => `Ответ: ${x}`

    // answer :: String -> String
    const getAnswer = pipe (
      logicModule, // модуль логики
      mathModule, // модуль математики
      langModule, // модуль языковой
    )

    // вопрос пользователя
    const question = prompt('Отвечу на вопросы по математике')

    // получаем ответ для пользователя
    const answer = getAnswer(question)

    console.log (answer) // ответ на вопрос

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // ==== Визуализация данных ====

            -------------------
            |   Ваш вопрос     |
            -------------------
                    ||
                    ▼
            -------------------
            |  Слой математики |
            -------------------
                    ||
                    ▼
            -------------------
            |  Слой анализа    |
            -------------------
                    ||
                    ▼
            -------------------
            |  Слой вывода     |
            -------------------

            -------------------

            // можно представить и как композицию функций

            const mathModule = pipe (
              Math.sin, // совокупность функций
              Math.cos,
              ...
            )

            // logicModule :: Number :: String
            const logicModule = (x) => x > 0 ? 'Положительное' : 'Отрицательное'

            // langModule :: Number -> String
            const langModule = (x) => `Ответ: ${x}`

            // answer :: String -> String
            const getAnswer = pipe (
              logicModule, // модуль логики
              mathModule, // модуль математики
              langModule, // модуль языковой
            )

            // вопрос пользователя
            const question = prompt('Отвечу на вопросы по математике')

            // получаем ответ для пользователя
            const answer = getAnswer(question)

            console.log (answer) // ответ на вопрос
          </code>
        </template>
      </CodeBlock>

    </section>
</template>
