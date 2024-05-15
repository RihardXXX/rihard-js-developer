<template>
  <section ref="certificates" :class="['container', $style.certificatesWrap]">
    <h3 :class="$style.title">Сертификаты обучения</h3>
    <div :class="['certificates', $style.slidesSection]">
      <div v-if="Boolean(getSlides.length)" class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="(slide, index) in getSlides"
          :key="`certificate${index + 1}}`"
          :class="['swiper-slide', $style.sliderItem]"
          @click.stop="() => showCertificate(slide)"
        >
          <VImageLazy :src="slide.path" object-fit="contain" />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VImageLazy from '@/components/VImageLazy.vue';
import CertificatesModal from '@/components/modals/CertificatesModal.vue';
import { IDevice } from '~/layouts/default.vue';

// TODO: внимание когда подключишь бэк сохранишь картинки на сервере
// TODO: сохранить картинки можно в папке экспресса или ссылка на яндекс диск генерировать

export interface ISlide {
  id: string;
  path: string;
}

export default defineComponent({
  name: 'CertificatesPage',

  components: {
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
      modalOpen: false,
      swiper: {},
      desktopSlides: [
        {
          path: 'images/certificates/git-udemy.webp',
        },
        {
          path: 'images/certificates/js_advantages_ivan.webp',
        },
        {
          path: 'images/certificates/js_mih_nepom.webp',
        },
        {
          path: 'images/certificates/JS_OOP_Itgidinfo.webp',
        },
        {
          path: 'images/certificates/js_react_ivan.webp',
        },
        {
          path: 'images/certificates/JS_React_Redux_23.webp',
        },
        {
          path: 'images/certificates/js_tools.webp',
        },
        {
          path: 'images/certificates/js_vladilen.webp',
        },
        {
          path: 'images/certificates/js_vue_mecheriak.webp',
        },
        {
          path: 'images/certificates/js_mih_nepom.webp',
        },
        {
          path: 'images/certificates/js2itgidinfo.webp',
        },
        {
          path: 'images/certificates/JSYouraAllahverdov.webp',
        },
        {
          path: 'images/certificates/lodash_kochergin.webp',
        },
        {
          path: 'images/certificates/nestJSKochergin.webp',
        },
        {
          path: 'images/certificates/nuxtAcademind.webp',
        },
        {
          path: 'images/certificates/php_intuit.webp',
        },
        {
          path: 'images/certificates/react_hooks_kochergin.webp',
        },
        {
          path: 'images/certificates/react_redux_bura.webp',
        },
        {
          path: 'images/certificates/react_redux_vesel.webp',
        },
        {
          path: 'images/certificates/stepic_ssh.webp',
        },
        {
          path: 'images/certificates/stepik_python_base.webp',
        },
        {
          path: 'images/certificates/stepik_python.webp',
        },
        {
          path: 'images/certificates/vueFirebase_kokorin.webp',
        },
        {
          path: 'images/certificates/vuejs_kochergin.webp',
        },
        {
          path: 'images/certificates/vueMaximilan.webp',
        },
        {
          path: 'images/certificates/webdeveloper2021.webp',
        },
        {
          path: 'images/certificates/docker_kochergin.webp',
        },
        {
          path: 'images/certificates/geek_base_programming.webp',
        },
        {
          path: '/images/certificates/java_intuit.webp',
        },
        {
          path: '/images/certificates/javarush33.webp',
        },
      ],
      mobileSlides: [
        {
          path: 'images/certificates/mobile/git-udemy-425.webp',
        },
        {
          path: 'images/certificates/mobile/js_advantages_ivan-425.webp',
        },
        {
          path: 'images/certificates/mobile/js_mih_nepom-425.webp',
        },
        {
          path: 'images/certificates/mobile/JS_OOP_Itgidinfo-425.webp',
        },
        {
          path: 'images/certificates/mobile/js_react_ivan-425.webp',
        },
        {
          path: 'images/certificates/mobile/JS_React_Redux_23-425.webp',
        },
        {
          path: 'images/certificates/mobile/js_tools-425.webp',
        },
        {
          path: 'images/certificates/mobile/js_vladilen-425.webp',
        },
        {
          path: 'images/certificates/mobile/js_vue_mecheriak-425.webp',
        },
        {
          path: 'images/certificates/mobile/js_mih_nepom-425.webp',
        },
        {
          path: 'images/certificates/mobile/js2itgidinfo-425.webp',
        },
        {
          path: 'images/certificates/mobile/JSYouraAllahverdov-425.webp',
        },
        {
          path: 'images/certificates/mobile/lodash_kochergin-425.webp',
        },
        {
          path: 'images/certificates/mobile/nestJSKochergin-425.webp',
        },
        {
          path: 'images/certificates/mobile/nuxtAcademind-425.webp',
        },
        {
          path: 'images/certificates/mobile/php_intuit-425.webp',
        },
        {
          path: 'images/certificates/mobile/react_hooks_kochergin-425.webp',
        },
        {
          path: 'images/certificates/mobile/react_redux_bura-425.webp',
        },
        {
          path: 'images/certificates/mobile/react_redux_vesel-425.webp',
        },
        {
          path: 'images/certificates/mobile/stepic_ssh-425.webp',
        },
        {
          path: 'images/certificates/mobile/stepik_python_base-425.webp',
        },
        {
          path: 'images/certificates/mobile/stepik_python-425.webp',
        },
        {
          path: 'images/certificates/mobile/vueFirebase_kokorin-425.webp',
        },
        {
          path: 'images/certificates/mobile/vuejs_kochergin-425.webp',
        },
        {
          path: 'images/certificates/mobile/vueMaximilan-425.webp',
        },
        {
          path: 'images/certificates/mobile/webdeveloper2021-425.webp',
        },
        {
          path: 'images/certificates/mobile/docker_kochergin-425.webp',
        },
        {
          path: 'images/certificates/mobile/geek_base_programming-425.webp',
        },
        {
          path: '/images/certificates/mobile/java_intuit-425.webp',
        },
        {
          path: '/images/certificates/mobile/javarush33-425.webp',
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
    if (!this.$refs.certificates) {
      return;
    }
    // set ref current component in Header
    this.$nuxt.$emit('setRefCertificates', this.$refs.certificates);

    this.$nextTick(() => {
      this.initSlider();
    });
  },

  beforeDestroy() {
    this.swiper = {};
  },

  methods: {
    initSlider(): void {
      let slidesPerView = 3;

      if (this.device.tablet) {
        slidesPerView = 2;
      }

      if (this.device.mobile) {
        slidesPerView = 1;
      }

      this.swiper = new this.$Swiper('.certificates', {
        // Optional parameters
        // direction: 'gorizontal',
        loop: false,
        autoplay: {
          delay: 3000,
        },
        speed: 2000,

        slidesPerView,
        // slidesOffsetAfter: 0,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          // clickable: true,
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

    showCertificate(certificate: { path: string }): void {
      this.$modal.open(CertificatesModal, { src: certificate.path });
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

    @include respond-to(mobile) {
      font-size: 3rem;
    }
  }
  .slidesSection {
    margin-top: 1rem;
    /* height: 54.7rem; */
    height: 30.7rem;
    position: relative;

    .sliderItem {
      /* width: 32.5rem; */
      height: 100%;
      cursor: pointer;
      /* border: 1px solid black; */

      .imageCertificate {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  :global(.swiper-pagination) {
    position: absolute;
    top: 0;
    width: 50%;
    left: 25%;
    max-height: 30%;
    /* transform: translate(50%, -50%); */

    @include respond-to(tablet) {
      width: 100%;
      left: 0;
    }

    @include respond-to(mobile) {
      top: 65%;
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

  @include respond-to(tablet) {
    margin-top: 3rem;
  }
}
</style>
