<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { LENSES } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'LensesFP',
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
      LENSES,
    }
  }
});
</script>

<template>
  <section :id="LENSES">
      <Subtitle>Линзы</Subtitle>
      <Description>
        <p>
          <strong>Линзы</strong> это инструмент (паттерн), который используется в функциональном
          программировании при работе с данными, обеспечивая иммутабельность данных и чистоту функции.
        </p>
        <p>
          Иммутабельность - это способность не изменять данные.
        </p>
        <p>
          Давайте возьмем пример из официальной документации библиотеки Ramda JS.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Lens s a = Functor f => (a → f a) → s → f s
    // ===============================
    // создаем линзу
    // путь к данными
    const xHeadYLens = R.lensPath(['x', 0, 'y']);

    // запускаем линзу в разных функциях

    // функция view получает данные согласно пути линзы
    // не меняя ничего в первоначальном объекте
    const resultView = R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});

    // функция set устанавливает новые данные
    // по пути линзы не меняя исходные данные  в объекте
    // а возвращая новый объект с измененными данными
    const resultSet = R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});

    // over работает с линзой как set
    // но вместо данных принимает функцию
    // которая примет в качестве аргумента
    // данные по пути линзы
    const resultOver = R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});

    console.log(resultView) // 2
    console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
    console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Lens s a = Functor f => (a → f a) → s → f s
            // ===============================
            // создаем линзу
            // путь к данными
            const xHeadYLens = R.lensPath(['x', 0, 'y']);

            // запускаем линзу в разных функциях

            // функция view получает данные согласно пути линзы
            // не меняя ничего в первоначальном объекте
            const resultView = R.view(xHeadYLens, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});

            // функция set устанавливает новые данные
            // по пути линзы не меняя исходные данные  в объекте
            // а возвращая новый объект с измененными данными
            const resultSet = R.set(xHeadYLens, 1, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});

            // over работает с линзой как set
            // но вместо данных принимает функцию
            // которая примет в качестве аргумента
            // данные по пути линзы
            const resultOver = R.over(xHeadYLens, R.negate, {x: [{y: 2, z: 3}, {y: 4, z: 5}]});

            console.log(resultView) // 2
            console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
            console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
