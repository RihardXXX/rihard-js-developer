<template>
  <section ref="certificates" :class="['container', $style.certificatesWrap]">
    <h3 :class="$style.title">Сертификаты обучения</h3>
    <div :class="['certificates', $style.slidesSection]">
      <div v-if="Boolean(slides.length)" class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="slide in slides"
          :key="slide.id"
          :class="['swiper-slide', $style.sliderItem]"
          @click.stop="() => showCertificate(slide)"
        >
          <VImageLazy :src="slide.path" object-fit="contain" />
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
import VImageLazy from '@/components/VImageLazy.vue';
import CertificatesModal from '@/components/modals/CertificatesModal.vue';

// TODO: внимание когда подключишь бэк сохранишь картинки на сервере
// TODO: сохранить картинки можно в папке экспресса или ссылка на яндекс диск генерировать

interface ISlide {
  id: string;
  path: string;
}

let idx = 0;

export default defineComponent({
  name: 'CertificatesPage',

  components: {
    VImageLazy,
  },

  data() {
    return {
      modalOpen: false,
      slides: [
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/git-udemy.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js_advantages_ivan.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js_mih_nepom.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/JS_OOP_Itgidinfo.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js_react_ivan.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/JS_React_Redux_23.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js_tools.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js_vladilen.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js_vue_mecheriak.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js_mih_nepom.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/js2itgidinfo.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/JSYouraAllahverdov.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/lodash_kochergin.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/nestJSKochergin.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/nuxtAcademind.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/php_intuit.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/react_hooks_kochergin.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/react_redux_bura.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/react_redux_vesel.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/stepic_ssh.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/stepik_python_base.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/stepik_python.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/vueFirebase_kokorin.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/vuejs_kochergin.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/vueMaximilan.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/webdeveloper2021.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/docker_kochergin.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/geek_base_programming.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/java_intuit.png',
        },
        {
          id: `certificates${idx++}`,
          path: '/images/certificates/javarush33.png',
        },
      ] as Array<ISlide>,
      swiper: {},
    };
  },

  mounted() {
    // intersectionObserver(this.$refs?.skills as Element, () => {
    //   this.show = true;
    // });

    this.initSlider();

    if (!this.$refs.certificates) {
      return;
    }
    // set ref current component in Header
    this.$nuxt.$emit('setRefCertificates', this.$refs.certificates);
  },

  beforeDestroy() {
    this.swiper = {};
  },

  methods: {
    initSlider(): void {
      this.swiper = new this.$Swiper('.certificates', {
        // Optional parameters
        // direction: 'gorizontal',
        loop: false,
        autoplay: {
          delay: 3000,
        },
        speed: 2000,

        slidesPerView: 3,
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

    showCertificate(certificate: ISlide): void {
      this.$modal.open(CertificatesModal, { src: certificate.path });
    },
  },
});
</script>

<style lang="scss" module>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}

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
