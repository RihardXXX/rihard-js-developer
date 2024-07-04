import { plugins } from './config/plugins';

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Страница Рихарда Алиханова',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Рихард Алиханов программист, frontend-developer с опытом работы на разных высоко нагруженных проектах',
      },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
    ],
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
    '@nuxt/image',
    '@nuxtjs/google-fonts',
  ],

  googleFonts: {
    families: {
      // Roboto: true,
      // Inter: [400, 700],
      Inter: {
        wght: [400, 500, 600, 700],
      },
    },
    display: 'swap',
    download: true,
    prefetch: true,
    preload: true,
    useStylesheet: true,
  },

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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/component-cache',
  ],

  sitemap: {
    hostname: 'https://rihard-developer.ru/',
  },

  robots: {
    UserAgent: '*',
    Allow: '/'
  },

  // Настройки для component-cache
  componentCache: {
    maxAge: 1000 * 60 * 60, // Кэшировать на 1 час
    // можете настроить дополнительные параметры, если нужно
  },

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
  build: {
    modern: true,
    extractCSS: true,
    optimizeCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
  },

  // mode: 'universal',

  target: 'static' /* or 'server' */,

  router: {
    // base: '/rihard-js-developer/'
    base: '/',
  },

  render: {
    resourceHints: false,
    http2: {
      push: true,
      pushAssets: (req, res, publicPath, preloadFiles) =>
        preloadFiles
          .filter(f => f.asType === 'script' && f.file === 'runtime.js')
          .map(f => `<${publicPath}${f.file}>; rel=preload; as=${f.asType}`),
    },
  },

  generate: {
    fallback: '404.html',
  },

};
