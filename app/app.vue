<script setup lang="ts">
const { t } = useI18n()
const { init } = useTheme()
onMounted(init)

// i18n SEO head: localized <html lang>, dir, and hreflang alternate links.
const localeHead = useLocaleHead()
useHead({
  htmlAttrs: () => localeHead.value.htmlAttrs ?? {},
  link: () => localeHead.value.link ?? [],
  meta: () => localeHead.value.meta ?? [],
  // Append brand to page titles, but avoid duplication when it's already there.
  titleTemplate: (title?: string) => {
    const brand = t('brand.name')
    if (!title) return t('seo.title')
    return title.includes(brand) ? title : `${title} · ${brand}`
  },
})

// Default social card (per-page title/description set in each page).
useSeoMeta({
  ogType: 'website',
  ogImage: 'https://rihard-developer.ru/images/rihard.png',
  twitterCard: 'summary_large_image',
})

// JSON-LD structured data: identify the site owner as a Person.
useSchemaOrg([
  definePerson({
    name: 'Рихард Алиханов',
    alternateName: 'Rihard Alikhanov',
    jobTitle: 'Fullstack JavaScript Developer',
    url: 'https://rihard-developer.ru',
    image: 'https://rihard-developer.ru/images/rihard.png',
    email: 'yusupa.akaeva@yandex.ru',
    sameAs: [
      'https://github.com/RihardXXX',
      'https://t.me/FrontendDeveloper05',
      'https://vk.com/github05',
    ],
    knowsAbout: [
      'Effect-TS',
      'Functional Programming',
      'Vue.js',
      'Nuxt',
      'React',
      'Node.js',
      'TypeScript',
      'JavaScript',
      'GraphQL',
      'SSR',
    ],
  }),
  defineWebSite({ name: t('seo.title') }),
  defineWebPage(),
])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
