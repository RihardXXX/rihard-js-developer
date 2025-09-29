<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { HINDLEY_MILNER_TYPE_NOTATION } from '~/utils/course/constants';

export default defineComponent({
  name: 'HindleyMilnerTypeNotation',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  data() {
    return {
      HINDLEY_MILNER_TYPE_NOTATION
    }
  }
});
</script>

<template>
  <section :id="HINDLEY_MILNER_TYPE_NOTATION">
      <Subtitle>Нотация типов Хиндли–Милнера</Subtitle>
      <Description>
        <p>
          Нотация типов Хиндли–Милнера вы уже встречали в коде.
          Над функциями в блоке комментариев.
        </p>
        <p>
          Эта нотация типов используется в Haskell и других языках с функциональным уклоном.
          В JS она помогает нам писать более абстрактный код, а также помогает
          сопровождать этот код.
        </p>
        <p>
          Дает объяснение какие типы аргументов принимает функция
          и что возвращает.
        </p>
      </Description>
      <CodeBlock>
        <template #default>
          <code>
            // без нотации
            const foo = (a, b) => a + b

            // в функции выше мы не можем понять, это функция по сложению или конкатенации
            //  конечно мы можем назвать правильно функцию foo

            // конечно мы можем написать функцию вот так
            const concat = (a, b) => a + b // конкатенация
            const add = (a, b) => a + b // сложение

            // с нотацией
            // Название функции :: Первый аргумент -> Второй аргумент -> Возвращаемое значение

            // add :: Number -> Number -> Number
            const add = (a, b) => a + b // сложение

            // map :: (a -> b) -> [a] -> [b]
            const map = (mappable) => (arr) => arr.map(mappable)

            // тоже самое но более классический подход в рамках теории категории
            // и Спецификации Fantasy-land не пугаемся об этом поговорим позже
            // Тип Функтор => Принимает функцию (a значение превращает в b) -> Функтор a аргумент -> Функтор b возвращает
            // Спойлер )) функтор это любой тип, который реализовал интерфейс map
            // Functor f => (a → b) → f a → f b
            const map = (mappable) => (arr) => arr.map(mappable)

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
