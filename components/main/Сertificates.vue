<template>
  <section :class="['container', $style.certificatesWrap]">
    <h3 :class="$style.title">Сертификаты обучения</h3>
    <div :class="['certificates', $style.slidesSection]">
      <div v-if="Boolean(slides.length)" class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="slide in slides"
          :key="`test${slide}`"
          :class="['swiper-slide', $style.sliderItem]"
        >
          {{ slide }}
        </div>
      </div>
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <!-- <div class="swiper-button-prev"></div>
<div class="swiper-button-next"></div> -->

      <!-- If we need scrollbar -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CertificatesPage',

  data() {
    return {
      slides: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as Array<number>,
      swiper: {},
    };
  },

  mounted() {
    // intersectionObserver(this.$refs?.skills as Element, () => {
    //   this.show = true;
    // });

    this.initSlider();
  },

  beforeDestroy() {
    this.swiper = {};
  },

  methods: {
    initSlider() {
      this.swiper = new this.$Swiper('.certificates', {
        // Optional parameters
        // direction: 'gorizontal',
        loop: true,
        autoplay: {
          delay: 3000,
        },
        speed: 2000,

        slidesPerView: 4,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
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
        spaceBetween: 15,
      });
    },
  },
});
</script>

<style lang="scss" module>
.certificatesWrap {
  margin-top: 18.8rem;
  overflow: hidden;

  .title {
    font-weight: 600;
    font-size: 4rem;
    line-height: 5.4rem;
    color: $black-100;
    text-align: center;
  }
  .slidesSection {
    margin-top: 1rem;
    height: 54.7rem;

    .sliderItem {
      /* width: 32.5rem; */
      height: 100%;
      border: 1px solid black;
    }
  }

  :global(.swiper-pagination) {
    position: absolute;
    top: 98%;
    /* width: 100%; */
    left: 20%;
    /* transform: translate(50%, -50%); */
  }

  :global(.swiper-pagination-bullet) {
    width: 5rem;
    height: 0.8rem;
    background: $gray-100;
    border-radius: 0.3rem;
    margin: 0 1rem;
    overflow: hidden;
    cursor: pointer;

    &:before {
      position: absolute;
      content: '';
      background: $green;
      width: 0rem;
      height: 100%;
      top: 0;
      left: 0;
    }
  }

  :global(.swiper-pagination-bullet-active) {
    transition: all 0.7s;
    transform: scale(1.2);
    opacity: 0.7;

    &:before {
      animation: progress 5s infinite linear;
    }
  }

  @keyframes progress {
    0% {
      width: 0%;
    }
    100% {
      width: 100%;
    }
  }
}
</style>
