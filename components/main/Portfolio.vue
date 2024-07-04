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
      <div v-if="Boolean(getSlides.length)" class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="(slide, index) in getSlides"
          :key="`portfolio${index + 1}`"
          :class="['swiper-slide', $style.sliderItem]"
          @click.stop="() => showCertificate(slide)"
        >
          <VImageLazy
            :src="slide.path"
            object-fit="cover"
            :alt="`portfolio: ${slide.path?.split('/')[2].split('.')[0]}`"
          />
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
import { IDevice } from '~/layouts/default.vue';
import { EventPayloadRefInterface } from '~/components/layouts/TheHeader.vue';

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

      desktopSlides: [
        {
          path: 'images/portfolio/amenu.webp',
        },
        {
          path: 'images/portfolio/4D.webp',
        },
        {
          path: 'images/portfolio/brusnika.webp',
        },
        {
          path: 'images/portfolio/krost.webp',
        },
        {
          path: 'images/portfolio/lesart.webp',
        },
        {
          path: 'images/portfolio/scrile.webp',
        },
        {
          path: 'images/portfolio/vatutinki.webp',
        },
        {
          path: 'images/portfolio/zki.webp',
        },
      ],
      mobileSlides: [
        {
          path: 'images/portfolio/mobile/amenu-425.webp',
        },
        {
          path: 'images/portfolio/mobile/4D-425.webp',
        },
        {
          path: 'images/portfolio/mobile/brusnika-425.webp',
        },
        {
          path: 'images/portfolio/mobile/krost-425.webp',
        },
        {
          path: 'images/portfolio/mobile/lesart-425.webp',
        },
        {
          path: 'images/portfolio/mobile/scrile-425.webp',
        },
        {
          path: 'images/portfolio/mobile/vatutinki-425.webp',
        },
        {
          path: 'images/portfolio/mobile/zki-425.webp',
        },
      ],
    };
  },

  computed: {
    getSlides(): { path: string }[] {
      return this.device.tablet || this.device.mobile
        ? this.mobileSlides
        : this.desktopSlides;
    },
  },

  mounted() {
    this.initSlider();

    if (!this.$refs.portfolio) {
      return;
    }
    // set ref current component in Header
    this.$nuxt.$emit('addRef', {
      element: this.$refs.portfolio,
      eventName: 'portfolio',
    } as EventPayloadRefInterface);
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
    async showCertificate(certificate: { path: string }) {
      const { default: CertificatesModal } = await import('@/components/modals/CertificatesModal.vue');
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
