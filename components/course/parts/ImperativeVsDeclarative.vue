<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { IMPERATIVE_VS_DECLARATIVE } from '~/utils/course/constants';

export default defineComponent({
  name: 'ImperativeVsDeclarative',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  data() {
    return {
      IMPERATIVE_VS_DECLARATIVE
    }
  }
});
</script>

<template>
<section :id="IMPERATIVE_VS_DECLARATIVE">
  <Subtitle>Императивность и декларативность</Subtitle>
      <Description>
        <p>
          <strong>Императивный код</strong> говорит вам "как вы это делаете". То есть Вам надо вникать в сам код.
        </p>
        <p>
          <strong>Декларативный</strong> код Вам говорит, что делает ваш код, он чаще модульный, и вам не нужно. вникать в
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
            // isGt3 :: Number -> Boolean
            const isGt3 = number => number > 3

            const result = numbers.filter(isGt3) // мы не вникаем в реализацию а просто читаем название

            console.log(result) // 4, 5 тот же результат более декларативен
            // =========

            // Мы можем повысить слои абстракции (и тут Остапа понесло))) )
            // =========
            // не пугайтесь если сразу непонятно, поймете дальше

            // filter :: (* -> Boolean) -> [a] -> [a]
             const filter = (predicat, arr) => arr.filter(predicat)

             // filterBy :: (* -> Boolean) -> [a] -> [a]
            const filterBy = (predicat) => (arr) => filter(predicat, arr)

            // gt :: Number -> (Number -> Boolean) -> Boolean
            const gt = pointer => number => number > pointer

            // теперь мы создаем любые функции предикаты
            // для фильтрации
            // gt2 :: Number -> (Number -> Boolean)
            const gt2 = gt(2) // предикат для фильтрации чисел больше 2
            const gt3 = gt(3) // предикат для фильтрации чисел больше 3

            // а вот теперь мы можем фильтровать массив по любым предикатам
            const arr = [1, 2, 3, 4, 5]

            const more2 = filterBy (gt2) (arr) // получаем числа больше 2
            const more3 = filterBy (gt3) (arr) // получаем числа больше 3

            // мы можем также главную функцию фильтрации подготовить для конвееров
            // не вызывая сразу ее
            // filterByGt2 :: [a] -> [a]
            const filterByGt2 = filterBy (gt2) // ожидает массива

            // filterByGt2 (arr) из названия мы уже понимаем что идет фильтрация чисел больше 2
            const result = filterByGt2 (arr) // получаем готовый результат числа больше 2
            // ======

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
