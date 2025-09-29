<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';

import { FOR_WHOM } from '~/utils/course/constants';

export default defineComponent({
  name: 'ForWhom',
  components: {
    Subtitle,
    Description,
  },
  data() {
    return {
      FOR_WHOM,
    }
  }
});
</script>

<template>
    <section :id="FOR_WHOM">
      <Subtitle>Для кого этот курс</Subtitle>
      <Description>
        <p>
          Этот курс в первую очередь написан для разработчиков с опытом разработки в JS, которые
          хотят расширить свой кругозор и писать более надежный, декларативный и сопровождаемый код
          в функциональном стиле.
        </p>
      </Description>
    </section>
</template>
