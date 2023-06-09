import { plugins } from './config/plugins';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Страница Рихарда',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // глобальный файл стилей
  css: ['@/assets/scss/bundle.scss'],

  // импорт миксинов и переменных стилей без импорта в каждый файл
  styleResources: {
    scss: '@/assets/scss/shared/*.scss',
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins,

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',

    // в билд включаем, чтобы миксины и переменные стилей видны были
    '@nuxtjs/style-resources',
    // чтобы svg подхватывать с папки
    '@nuxtjs/svg-sprite',
  ],

  svgSprite: {
    input: '~/assets/svg/',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'nuxt-lazy-load',
      {
        // These are the default values
        // images: true,
        // videos: true,
        // audios: true,
        // iframes: true,
        // native: false,
        // directiveOnly: false,
        directiveOnly: true,

        // // Default image must be in the static folder
        // defaultImage: '/images/default-image.jpg',

        // // To remove class set value to false
        // loadingClass: 'isLoading',
        // loadedClass: 'isLoaded',
        // appendClass: 'lazyLoad',

        // observerConfig: {
        //   // See IntersectionObserver documentation
        // }
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'ru',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // mode: 'universal',

  target: 'static' /* or 'server' */,

  router: {
    base: '/rihard-js-developer/'
  }
};
