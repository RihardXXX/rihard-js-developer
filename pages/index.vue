<template>
  <div :class="$style.mainPage">
    <Dot
      v-for="dot in dots"
      :key="dot.id"
      :color="dot.color"
      :size="dot.size"
      :position="dot.position"
    />
    <AboutMe />
    <Skills />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AboutMe from '~/components/main/AboutMe.vue';
import Skills from '~/components/main/Skills.vue';
import Dot from '~/components/Dot.vue';
import { IDots } from '~/components/layouts/TheHeader.vue';

let idx = 1;

export default defineComponent({
  name: 'MainPage',

  components: {
    AboutMe,
    Dot,
    Skills,
  },

  data() {
    return {
      dots: [
        {
          id: `x${idx++}`,
          size: 'medium',
          color: 'blue',
          position: { top: '1.6', left: '12.6' },
        },
        {
          id: `x${idx++}`,
          size: 'medium',
          color: 'green',
          position: { top: '1.7', left: '47' },
        },
      ] as Array<IDots>,
    };
  },
});
</script>

<style lang="scss" module>
.mainPage {
  height: 100%;
  position: relative;
  /* overflow: auto; */
}
</style>
