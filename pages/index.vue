<template>
  <div :class="$style.mainPage">
    <Dot
      v-for="dot in dots"
      :key="dot.id"
      :color="dot.color"
      :size="dot.size"
      :position="dot.position"
    />
    <AboutMe :device="device" />
    <Results :device="device" />
    <Skills :device="device" />
    <Certificates :device="device" />
    <Reviews :device="device" />
    <Portfolio :device="device" />
    <Contact :device="device" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import AboutMe from '~/components/main/AboutMe.vue';
import Results from '~/components/main/Results.vue';
import Skills from '~/components/main/Skills.vue';
import Certificates from '~/components/main/Сertificates.vue';
import Reviews from '~/components/main/Reviews.vue';
import Portfolio from '~/components/main/Portfolio.vue';
import Contact from '~/components/main/Contact.vue';
import Dot from '~/components/Dot.vue';
import { IDots } from '~/components/layouts/TheHeader.vue';
import { IDevice } from '~/layouts/default.vue';

let idx = 1;

export default defineComponent({
  name: 'MainPage',

  components: {
    AboutMe,
    Results,
    Dot,
    Skills,
    Certificates,
    Reviews,
    Portfolio,
    Contact,
  },

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
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
  overflow: hidden;
}
</style>
