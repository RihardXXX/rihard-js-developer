import { fileURLToPath } from 'node:url'

// Absolute path so Sass `additionalData` resolves reliably across entries.
const sharedScss = fileURLToPath(
  new URL('./app/assets/scss/shared/_index.scss', import.meta.url),
)

// Browser shim so Sanctuary (used in the FP-course playground) can initialise
// without Node's `util` (Vite externalises it for the browser).
const utilShim = fileURLToPath(new URL('./app/shims/util.ts', import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2026-06-01',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n', '@nuxtjs/seo', '@vueuse/nuxt'],

  // Name components by filename only (TheHeader, HeroSection, ...) regardless of subfolder.
  components: [{ path: '~/components', pathPrefix: false }],

  css: ['~/assets/scss/main.scss'],

  vite: {
    resolve: {
      alias: { util: utilShim },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // Auto-inject SCSS variables + mixins into every component style block.
          additionalData: `@use "${sharedScss}" as *;\n`,
        },
      },
    },
  },

  site: {
    url: 'https://rihard-developer.ru',
    name: 'Rihard Alikhanov — Fullstack JavaScript Engineer',
    defaultLocale: 'en',
    // GitHub Pages serves every page as directory/index.html and 301-redirects
    // the slashless URL, so all generated URLs (sitemap, canonical, hreflang)
    // must carry the trailing slash to avoid redirect chains for crawlers.
    trailingSlash: true,
  },

  // Static OG image instead of dynamic rendering (avoids native deps, lighter build).
  ogImage: { enabled: false },

  i18n: {
    baseUrl: 'https://rihard-developer.ru',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    trailingSlash: true,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
      { code: 'de', language: 'de-DE', name: 'Deutsch', file: 'de.json' },
      { code: 'fr', language: 'fr-FR', name: 'Français', file: 'fr.json' },
      { code: 'kk', language: 'kk-KZ', name: 'Қазақша', file: 'kk.json' },
      { code: 'ka', language: 'ka-GE', name: 'ქართული', file: 'ka.json' },
      { code: 'hy', language: 'hy-AM', name: 'Հայերեն', file: 'hy.json' },
    ],
    bundle: { optimizeTranslationDirective: false },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
      redirectOn: 'root',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        // Search engine ownership verification
        { name: 'yandex-verification', content: 'd543f835f31c40fb' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap',
        },
      ],
      script: [
        {
          // No-FOUC: apply persisted/preferred theme before first paint.
          innerHTML:
            "(()=>{try{var t=localStorage.getItem('theme');var d=t?t==='dark':matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d)}catch(e){}})()",
          tagPosition: 'head',
        },
      ],
    },
  },
})
