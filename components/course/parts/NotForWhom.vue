<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';

import { NOT_FOR_WHOM } from '~/utils/course/constants';

export default defineComponent({
  name: 'NotForWhom',
  components: {
    Subtitle,
    Description,
  },
  data() {
    return {
      NOT_FOR_WHOM,
    }
  }
});
</script>

<template>
  <section :id="NOT_FOR_WHOM">
      <Subtitle>Кому этот курс не подойдет</Subtitle>
      <Description>
        <p>
          Этот курс не подойдет начинающим разработчикам, которые только постигают азы
          разработки на JS.
        </p>
      </Description>
    </section>
</template>
