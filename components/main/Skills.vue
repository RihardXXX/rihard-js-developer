<template>
  <section :class="['container', $style.skills]">
    <!-- Slider main container -->
    <div :class="['swiper', $style.swiperWrap]">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide">Slide 1</div>
        <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>
        ...
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SkillsPage',

  data() {
    return {
      swiper: {},
    };
  },

  mounted() {
    this.swiper = new this.$Swiper('.swiper', {
      // Optional parameters
      // direction: 'gorizontal',
      loop: true,
      // autoplay: true,
      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },
      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  },
});
</script>

<style lang="scss" module>
.skills {
  //
  margin-top: 18.8rem;
  height: 35rem;
  border: 1px solid black;
}

.swiperWrap {
  width: 100%;
  height: 100%;
}
</style>
