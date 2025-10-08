<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { CURRYING } from '~/utils/course/constants';

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
      CURRYING
    }
  }
});
</script>

<template>
  <section :id="CURRYING">
      <Subtitle>Каррирование</Subtitle>
      <Description>
        <p>
          <strong>Каррирование</strong>
          - это один из приемов используемых в функциональном программировании,
          при котором происходит вычислении функции только при полном
          получении всех аргументов, а при частичном получении аргументов возвращается функция
           возвращает новую функцию новая функция.
        </p>
        <p>
          <strong>Каррирование</strong> может быть использовано
          1. В композиции функции, когда
          функция в последовательности вызовов, ожидает два и более аргумента.
          2. Когда мы можем создавать специализированные функции на основе базовой функции меняя значение
          аргумента в замыкании
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    //  Пример
    // Каррирование
    // sum :: Number -> Number -> Number -> Number
    const sum  = (a) => (b) => (c) => a + b + c

    // функция вычисляется только когда получает все аргументы
    // иначе возвращает новая функция
    const result = sum (1) (2) (1)

    console.log(result) // 4

    // Неполные вызовы каррированной функции

    // add : Number -> Number -> Number
    const add = (a) => (b) => a + b

    // в замыкании хранится 10 и ждёт второго аргумента
    // возвращается функция
    const add10 = add(10)
    // после получения второго аргумента
    // происходит полное вычисление функции
    const resultAdded = add10(5) // 15

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

          //  Пример
          // Каррирование
          // sum :: Number -> Number -> Number -> Number
          const sum  = (a) => (b) => (c) => a + b + c

          // функция вычисляется только когда получает все аргументы
          // иначе возвращает новая функция
          const result = sum (1) (2) (1)

          console.log(result) // 4

          // Неполные вызовы каррированной функции

          // add : Number -> Number -> Number
          const add = (a) => (b) => a + b

          // в замыкании хранится 10 и ждёт второго аргумента
          // возвращается функция
          const add10 = add(10)
          // после получения второго аргумента
          // происходит полное вычисление функции
          const resultAdded = add10(5) // 15

          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          Как же нам каррировать любую функцию с n количеством параметров,
          значение которых мы не знаем. Например 5 параметров и более у функции.
        </p>
        <p>
          Можно использовать автоматическое каррирование любой функции и
          вызывать ее в любом порядке
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Например мы хотим каррировать функцию sum
    // sum :: Number -> Number -> Number -> Number
    const sum  = (a, b, c) => a + b + c

    // функция которая каррирует любую функцию
    // curry :: (* -> *) -> * -> (* -> *)
    const curry = (fn) => {
      // количество параметров функции
      const lengthFn = fn.length

      // внутренняя функция, которая будет вызываться рекурсивно
      const curried = (...argsFirst) => {
        // если количество входящих аргументов больше или равно
        // количество аргументов функции то мы немедленно вызываем её
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

    // теперь можем вызывать ее как угодно
    console.log( sumCurry (1) (1) (1) ) // 3
    console.log( sumCurry (1, 1) (1) ) // 3
    console.log( sumCurry (1) (1, 1) ) // 3
    console.log( sumCurry (1, 1, 1) ) // 3

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

          // Например мы хотим каррировать функцию sum
          // sum :: Number -> Number -> Number -> Number
          const sum  = (a, b, c) => a + b + c

          // функция которая каррирует любую функцию
          // curry :: (* -> *) -> * -> (* -> *)
          const curry = (fn) => {
            // количество параметров функции
            const lengthFn = fn.length

            // внутренняя функция, которая будет вызываться рекурсивно
            const curried = (...argsFirst) => {
              // если количество входящих аргументов больше или равно
              // количество аргументов функции то мы немедленно вызываем её
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

          // теперь можем вызывать ее как угодно
          console.log( sumCurry (1) (1) (1) ) // 3
          console.log( sumCurry (1, 1) (1) ) // 3
          console.log( sumCurry (1) (1, 1) ) // 3
          console.log( sumCurry (1, 1, 1) ) // 3
          </code>
        </template>
      </CodeBlock>
    </section>
</template>
