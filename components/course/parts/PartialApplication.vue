<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { PARTIAL_APPLICATION } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'PartialApplication',
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
      PARTIAL_APPLICATION
    }
  }
});
</script>

<template>
  <section :id="PARTIAL_APPLICATION">
      <Subtitle>Частичное применение</Subtitle>
      <Description>
        <p>
          <strong>Частичное применение</strong>
          - это один из приемов используемых в функциональном программировании,
          при котором происходит вычислении функции только при полном
          получении всех аргументов.
        </p>
        <p>
          <strong>Частичное применение</strong> очень похоже на каррирование, но есть
          отличия.
        </p>
        <p>
          1. При частичном применении количество отложенных вызовов обычно не больше двух.
        </p>
        <p>
          2. Количество аргументов передаваемых в функцию при
          частичном применении может быть несколько,
          а в классическом каррировании обычно одно.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    //  пример функции с частичным применением
    // partialSumA :: Number -> Number -> Number -> Number
    const partialSumA = (a) => (b, c) => a + b + c
    // partialSumB :: Number -> Number -> Number -> Number
    const partialSumB = (a, b) => (c) => a + b + c

    // давайте теперь вызовем эти функции
    console.log ( partialSumA (1) (1, 1) ) // 3
    console.log ( partialSumB (1, 1) (1) ) // 3

    // А давайте напишем функцию, которая применяет
    // частичное применение к любой обычной функции

    // ((a, b, c, …, n) → x) → [a, b, c, …] → ((d, e, f, …, n) → x)
    // partial:: (a -> b) -> (a ->b)
    const partial = (fn) => {

      // количество аргументов у вызываемой функции
      const lengthArgs = fn.length

      // возвращаемая функция
      const innerPartial = (...firstArgs) => {
        // если количество входящих аргументов
        // больше или равно чем у функции вызывающей
        // значит сразу можно ее вызвать
        if (firstArgs.length >= lengthArgs) {
          return fn (...firstArgs)
        }

        // иначе мы вторым вызовом
        // запускаем функцию в любом случае
        return (...secondArgs) => fn (...firstArgs, ...secondArgs)
      }

      return innerPartial
    }

    // можем применить нашу функцию
    // которая применяет частичное применение
    // к любой функции

    // sum :: Number -> Number -> Number -> Number
    const sum = (a, b, c) => a + b + c

    // возвращаем функцию с супер способностями )
    const sumPartial = partial (sum)

    // теперь мы можем вызывать возвращенную функцию
    console.log ( sumPartial (1) (1, 1) ) // 3
    console.log ( sumPartial (1, 1) (1) ) // 3

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            //  пример функции с частичным применением
            // partialSumA :: Number -> Number -> Number -> Number
            const partialSumA = (a) => (b, c) => a + b + c
            // partialSumB :: Number -> Number -> Number -> Number
            const partialSumB = (a, b) => (c) => a + b + c

            // давайте теперь вызовем эти функции
            console.log ( partialSumA (1) (1, 1) ) // 3
            console.log ( partialSumB (1, 1) (1) ) // 3

            // А давайте напишем функцию, которая применяет
            // частичное применение к любой обычной функции

            // ((a, b, c, …, n) → x) → [a, b, c, …] → ((d, e, f, …, n) → x)
            // partial:: (a -> b) -> (a ->b)
            const partial = (fn) => {

              // количество аргументов у вызываемой функции
              const lengthArgs = fn.length

              // возвращаемая функция
              const innerPartial = (...firstArgs) => {
                // если количество входящих аргументов
                // больше или равно чем у функции вызывающей
                // значит сразу можно ее вызвать
                if (firstArgs.length >= lengthArgs) {
                  return fn (...firstArgs)
                }

                // иначе мы вторым вызовом
                // запускаем функцию в любом случае
                return (...secondArgs) => fn (...firstArgs, ...secondArgs)
              }

              return innerPartial
            }

            // можем применить нашу функцию
            // которая применяет частичное применение
            // к любой функции

            // sum :: Number -> Number -> Number -> Number
            const sum = (a, b, c) => a + b + c

            // возвращаем функцию с супер способностями )
            const sumPartial = partial (sum)

            // теперь мы можем вызывать возвращенную функцию
            console.log ( sumPartial (1) (1, 1) ) // 3
            console.log ( sumPartial (1, 1) (1) ) // 3

          </code>
        </template>
      </CodeBlock>

    </section>
</template>
