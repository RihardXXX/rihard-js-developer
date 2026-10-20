import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Absolute path so Sass `additionalData` resolves reliably across entries.
const sharedScss = fileURLToPath(
  new URL('./app/assets/scss/shared/_index.scss', import.meta.url),
)

// Browser shim so Sanctuary (used in the FP-course playground) can initialise
// without Node's `util` (Vite externalises it for the browser).
const utilShim = fileURLToPath(new URL('./app/shims/util.ts', import.meta.url))

// Where `nuxt generate` writes the static site; set by the nitro:init hook below.
let publicDir = ''

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

  sitemap: {
    // Googlebot was spending 48% of its crawl budget fetching the ~60
    // <image:image> entries this added per locale, while HTML got 6%. The
    // images stay discoverable from the pages themselves.
    discoverImages: false,
  },

  // Redirects for the dropped locales live in `public/` as plain HTML: routes
  // fed to the prerenderer get localised by i18n, which produced /ru/de/ and
  // friends instead. GitHub Pages can't do 301s, so meta-refresh + canonical
  // is the available signal.
  nitro: {
    prerender: {
      // The sitemap module turns /sitemap.xml into a redirect page to
      // /sitemap_index.xml and i18n mirrors it under /ru/; GitHub Pages would
      // serve that directory with a 301 and HTML. The real XML is written below.
      ignore: ['/sitemap.xml', '/ru/sitemap.xml'],
    },
  },

  // Yandex Webmaster reads /sitemap.xml, Search Console /sitemap_index.xml:
  // serve the same sitemap index at both.
  hooks: {
    'nitro:init'(nitro) {
      publicDir = nitro.options.output.publicDir
    },
    async 'sitemap:prerender:done'({ sitemaps }) {
      const index = sitemaps.find((sitemap) => sitemap.name === '/sitemap_index.xml')
      if (!index) {
        throw new Error('@nuxtjs/sitemap did not prerender /sitemap_index.xml — multi-sitemap mode (one sitemap per locale) expected')
      }
      if (!publicDir) throw new Error('nitro:init did not run, so the output directory for sitemap.xml is unknown')
      await writeFile(join(publicDir, 'sitemap.xml'), index.content)
    },
  },

  i18n: {
    baseUrl: 'https://rihard-developer.ru',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    trailingSlash: true,
    // Only locales whose content is genuinely translated. The course lessons
    // exist in RU/EN only, so de/fr/kk/ka/hy served a 94% English duplicate of
    // /course/ — Google never indexed them and the crawl budget went to waste.
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru.json' },
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
