<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { HOF_AND_FC } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'HigherOrderFunctions',
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
      HOF_AND_FC
    }
  }
});
</script>

<template>
  <section :id="HOF_AND_FC">
      <Subtitle>Функции первого класса и высшего порядка</Subtitle>
      <Description>
        <p>
          <strong>Функции в JavaScript</strong> могут быть как
          <strong>функциями первого класса</strong>, так и
          <strong>функциями высшего порядка</strong>.
        </p>
        <p>
          <strong>Функциями первого класса</strong> принято называть
          функции, которые выступают
          в качестве аргумента для другой функции.
        </p>
        <p>
          <strong>Функциями высшего порядка</strong> принято называть
          функции, которые принимают другие функции в качестве аргумента.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Простой пример
    // ===============================
    const data = [1, 2, 3, 4]

    // эта функция первого класса
    // потому что она выступает в качестве
    // аргумента для другой функции
    // multiply :: Number -> Number
    const multiply = (v) => v * 2

    // функция map это функция
    // высшего порядка
    // потому что принимает другую функцию
    // в качестве аргумента
    const result = data.map(multiply)

    console.log (result) // [2, 4, 6, 8]

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Простой пример
            // ===============================
            const data = [1, 2, 3, 4]

            // эта функция первого класса
            // потому что она выступает в качестве
            // аргумента для другой функции
            // multiply :: Number -> Number
            const multiply = (v) => v * 2

            // функция map это функция
            // высшего порядка
            // потому что принимает другую функцию
            // в качестве аргумента
            const result = data.map(multiply)

            console.log (result) // [2, 4, 6, 8]

          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          Если коротко принимающая функция это <strong>функция высшего порядка</strong>,
          а функция которая попадает при вызове функции это <strong>функция первого класса</strong>.
        </p>
        <p>
          Во Vue JS and React JS компоненты сами могут выступать как
          <strong>функциями высшего порядка</strong>,
          так и <strong>функциями первого класса</strong>, так как компоненты это и есть функции.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Простой пример
    // ===============================

    // hof :: (* -> *) -> * -> *
    const hof = (fc) => (...args) => fc (...args)

    // функция hof - это функция высшего порядка
    // так как в качестве первого аргумента принимает
    // функцию первого класса

    // функция fc - функция первого класса
    // так как она способна выступать в качестве
    // аргумента для функции

    // Пример из Vue JS
    // HOF (HOC)
    // Higher Order Function (Higher Order Component)
    // Функция высшего порядка (Компонент высшего порядка)
    // принимает в слот другой компонент
    // под капотом
    function MyComponent({ main, default: def } = {}) {
      const greetingMessage = 'hello'

      if (main) {
        return `<div>main - ${ main (greetingMessage)}</div>`
      }

      if (def) {
        return `default - ${def(greetingMessage)}`
      }

      return 'нет компонентов'
    }

    // вызов hof
    const templateMain = MyComponent({
      main: (text) => `XXX${text}XXX`
    })

    const templateDefault = MyComponent({
      default: (text) => `${text}`
    })

    console.log(templateMain)    // main - XXXhelloXXX
    console.log(templateDefault) // default - hello


          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Простой пример
            // ===============================

            // hof :: (* -> *) -> * -> *
            const hof = (fc) => (...args) => fc (...args)

            // функция hof - это функция высшего порядка
            // так как в качестве первого аргумента принимает
            // функцию первого класса

            // функция fc - функция первого класса
            // так как она способна выступать в качестве
            // аргумента для функции

            // Пример из Vue JS
            // HOF (HOC)
            // Higher Order Function (Higher Order Component)
            // Функция высшего порядка (Компонент высшего порядка)
            // принимает в слот другой компонент
            // под капотом
            function MyComponent({ main, default: def } = {}) {
              const greetingMessage = 'hello'

              if (main) {
                return `<div>main - ${ main (greetingMessage)}</div>`
              }

              if (def) {
                return `default - ${def(greetingMessage)}`
              }

              return 'нет компонентов'
            }

            // вызов hof
            const templateMain = MyComponent({
              main: (text) => `XXX${text}XXX`
            })

            const templateDefault = MyComponent({
              default: (text) => `${text}`
            })

            console.log(templateMain)    // main - XXXhelloXXX
            console.log(templateDefault) // default - hello

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
