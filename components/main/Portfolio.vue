<template>
  <section ref="portfolio" :class="['container', $style.portfolio]">
    <!-- Slider main container -->

    <div :class="$style.leftSection">
      <VInfo
        label="Портфолио"
        title="В каких <span>проектах</span> участвовал?"
        description="Я выбрал и упомянул здесь некоторые из моих последних проектов, чтобы поделиться с вами"
        button-name="Связаться со мной"
        :class="$style.info"
      />
    </div>
    <div :class="['portfolio', $style.swiperWrap]">
      <!-- Additional required wrapper -->
      <div v-if="Boolean(slides.length)" class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="slide in slides"
          :key="slide.id"
          :class="['swiper-slide', $style.sliderItem]"
          @click.stop="() => showCertificate(slide)"
        >
          <VImageLazy :src="slide.path" object-fit="cover" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VInfo from '@/components/VInfo.vue';
import VImageLazy from '@/components/VImageLazy.vue';
import { ISlide } from '@/components/main/Сertificates.vue';
import { IDevice } from '~/layouts/default.vue';
import CertificatesModal from '@/components/modals/CertificatesModal.vue';

let idx = 0;

export default defineComponent({
  name: 'PortfolioPage',

  components: {
    VInfo,
    VImageLazy,
  },

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },

  data() {
    return {
      swiper: {},

      show: false,

      slides: [
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/amenu.png',
        },
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/4D.png',
        },
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/brusnika.png',
        },
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/krost.png',
        },
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/lesart.png',
        },
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/scrile.png',
        },
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/vatutinki.png',
        },
        {
          id: `portfolio${idx++}`,
          path: '/images/portfolio/zki.png',
        },
      ] as Array<ISlide>,
    };
  },

  mounted() {
    this.initSlider();

    if (!this.$refs.portfolio) {
      return;
    }
    // set ref current component in Header
    this.$nuxt.$emit('setRefPortfolio', this.$refs.portfolio);
  },

  beforeDestroy() {
    this.swiper = {};
  },

  methods: {
    initSlider() {
      this.swiper = new this.$Swiper('.portfolio', {
        // Optional parameters
        // direction: 'gorizontal',
        loop: false,

        slidesPerView: 1,

        autoplay: {
          delay: 6000,
        },
        speed: 2000,
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
        spaceBetween: 10,
      });
    },
    showCertificate(certificate: ISlide): void {
      this.$modal.open(CertificatesModal, { src: certificate.path });
    },
  },
});
</script>

<style lang="scss" module>
.portfolio {
  position: relative;
  margin-top: 18.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* overflow: hidden; */

  .leftSection {
    width: 40%;
    height: 100%;
  }

  .swiperWrap {
    /* border: 1px solid black; */
    width: 60%;
    height: 100%;
    min-height: 35rem;
    transition: all 1s;
    overflow: hidden;
    position: relative;

    .sliderItem {
      /* width: 30rem; */
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4rem;
      flex-wrap: wrap;
      height: 100%;
    }

    :global(.swiper-pagination) {
      top: 95%;
      width: 100%;
      /* left: 50%; */

      @include respond-to(tablet) {
        top: 70%;
      }
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
        animation: progress 8s infinite linear;
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

  @include respond-to(tablet) {
    margin-top: 3rem;
    flex-direction: column;

    .leftSection {
      width: 100%;

      .info {
        margin: 0 auto;
      }
    }

    .swiperWrap {
      margin-top: 1rem;
    }
  }

  @include respond-to(mobile) {
    .leftSection {
      .info {
        margin: 0 1rem;
      }
    }

    .swiperWrap {
      width: 100%;
      padding: 0 1rem;
    }
  }
}
</style>
