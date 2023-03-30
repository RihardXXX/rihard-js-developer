import Swiper, {
  Navigation,
  Pagination,
  Thumbs,
  Mousewheel,
  Autoplay,
  Grid,
  Controller,
  FreeMode,
  EffectCreative,
  EffectFade,
  Lazy,
  Parallax,
} from 'swiper';
import 'swiper/swiper-bundle.css';
import { Plugin } from '@nuxt/types';

declare module 'vue/types/vue' {
  // this.$Swiper inside Vue components
  interface Vue {
    $Swiper: any;
  }
}

const swiperPlugin: Plugin = (_, inject) => {
  Swiper.use([
    Navigation,
    Pagination,
    Thumbs,
    Mousewheel,
    Autoplay,
    Grid,
    Controller,
    FreeMode,
    EffectCreative,
    EffectFade,
    Lazy,
    Parallax,
  ]);

  inject('Swiper', Swiper);
};

export default swiperPlugin;
