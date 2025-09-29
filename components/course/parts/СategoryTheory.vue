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
        <!-- <p>
          Функциональное программирование - это высокоуровневая декларативная разработка на основе
          чистых функций.
        </p>
        <p>
          Чистые функции - это функции, которые при и одних и тех же аргументах возвращают
          одинаковый результат и не создают побочных (сайд) эффектов.
        </p> -->
      </Description>
      <CodeBlock>
        <template #default>
          <code>

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
