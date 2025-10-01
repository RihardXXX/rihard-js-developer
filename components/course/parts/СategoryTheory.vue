<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { CATEGORY_THEORY } from '~/utils/course/constants';

export default defineComponent({
  name: 'CategoryTheory',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  data() {
    return {
      CATEGORY_THEORY
    }
  }
});
</script>

<template>
  <section :id="CATEGORY_THEORY">
      <Subtitle>Теория категорий</Subtitle>
      <Description>
        <p>
          Существует тесная связь между функциональным программированием
          и теорией категорией.
          В функциональном программировании многие абстракции, законы, принципы, взяты из теории категорий.
        </p>
        <p>
          Что же мы знаем о теории категорий. Мы не будем углубляться в основы и академические термины.
          Мы постараемся объяснить все это без академических терминов.
        </p>
        <p>
          Теория категорий в рамках программирования - это совокупность абстрактных объектов (любые типы данных Array, Object, Number, String ...) и их морфизмов (стрелок их отношения то есть функции), а также законов
          по которым они работают (композиция и тп).
        </p>
      </Description>
      <CodeBlock>
        <template #default>
          <code>
          //  Пример
          a -> b -> c

          a, b, c // это объекты
          -> // это их отношение
          a ... c // процесс композиции

          // Практический пример

          // concatX :: Number -> String
          const concatX = num => `${num} X`

          // toArray:: a -> [a]
          const toArray = word => [word]

          // compose :: (* -> *) -> (* -> *) -> * -> *
          const compose = (f2, f1) => (...args) => f2(f1(...args))

          const pipeline = compose(
            toArray, // строку превращаем в массив
            concatX // добавляем X и превращаем в строку
            )

          // start
          pipeline(5) // ['5 X'] результат

          // Что же тут произошло
          // мы входной аргумент 5 это "a" тип Number
          // конкатенировали букву X и получили '5 X' это "b" тип String
          // добавили в массив и получили ['5 X'] это "с" тип Array
          // и все это сделали законом композиции
          // 5 -> '5 X' -> ['5 X'] это абстрактные объекты (Number, String, Array) их отношение объектов(вызовы функций -> ) по законом композиции
          // a -> b -> c


          </code>
        </template>
      </CodeBlock>
    </section>
</template>
