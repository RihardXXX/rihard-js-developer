<script setup lang="ts">
import type { Lesson, LessonLink, LocalizedText } from '~/data/course-types'
import { fillLocale, pickLocale } from '~/utils/course-locale'

interface LessonPage {
  lesson: Lesson
  number: number
  prev: LessonLink | null
  next: LessonLink | null
}

const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')
const tr = (text: LocalizedText) => (isEn.value ? text.en : text.ru)

// One lesson and the titles of its neighbours come in the page payload, in the page's locale only:
// the texts of other lessons stay out of this page. The key is fixed: another lesson or locale
// mounts its own page with its own payload.
const lang = isEn.value ? 'en' : 'ru'
const slug = String(route.params.slug)
const { data: page, error } = await useAsyncData(`course-${lang}-${slug}`, async (): Promise<LessonPage | null> => {
  const { lessons } = await import('~/data/course')
  const i = lessons.findIndex((lesson) => lesson.slug === slug)
  const lesson = lessons[i]
  if (!lesson) return null
  const link = (to: Lesson | undefined): LessonLink | null => (to ? { slug: to.slug, title: to.title } : null)
  return pickLocale({ lesson, number: i + 1, prev: link(lessons[i - 1]), next: link(lessons[i + 1]) }, lang)
})
// Broken lesson data fails generate instead of shipping an empty lesson with 200.
if (error.value) {
  throw createError({ statusCode: 500, statusMessage: 'course data failed to load', fatal: true })
}
// Prerendering only follows links to real lessons; an unknown slug comes from a typed address.
if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'lesson not found', fatal: true })
}
// i18n switches the locale before the new page's payload arrives; meanwhile this page shows its own texts.
const { lesson, number, prev, next } = fillLocale(page.value, lang)

const listPath = localePath('/course/')
const lessonPath = (to: LessonLink) => localePath(`/course/${to.slug}/`)

useSeoMeta({
  title: () => tr(lesson.title),
  description: () => tr(lesson.description),
})

// Absolute URLs with the trailing slash: from a bare path the resolver makes "/" the origin without it.
const absolute = (path: string) => withSiteUrl(path).value
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: [
      { name: t('course.home'), item: absolute(localePath('/')) },
      { name: t('nav.course'), item: absolute(listPath) },
      { name: tr(lesson.title), item: absolute(lessonPath(lesson)) },
    ],
  }),
])
</script>

<template>
  <AppSection>
    <nav class="crumbs" :aria-label="t('course.breadcrumbs')">
      <ol class="crumbs__list">
        <li class="crumbs__item">
          <NuxtLink :to="localePath('/')" class="crumbs__link">{{ t('course.home') }}</NuxtLink>
        </li>
        <li class="crumbs__item">
          <NuxtLink :to="listPath" class="crumbs__link">{{ t('nav.course') }}</NuxtLink>
        </li>
        <li class="crumbs__item">
          <span class="crumbs__current" aria-current="page">{{ tr(lesson.title) }}</span>
        </li>
      </ol>
    </nav>

    <CourseLesson :lesson="lesson" :index="number" />

    <section class="lesson-playground">
      <h2 class="block-title">{{ t('course.playgroundTitle') }}</h2>
      <p class="block-desc">{{ t('course.playgroundDesc') }}</p>
      <CoursePlayground />
    </section>

    <nav class="lesson-nav" :aria-label="t('course.lessonNav')">
      <NuxtLink v-if="prev" :to="lessonPath(prev)" class="lesson-nav__prev">
        <span aria-hidden="true">←</span> {{ t('course.prevLesson', { title: tr(prev.title) }) }}
      </NuxtLink>
      <NuxtLink :to="`${listPath}#course-toc`" class="lesson-nav__toc">
        <span aria-hidden="true">↑</span> {{ t('course.backToToc') }}
      </NuxtLink>
      <NuxtLink v-if="next" :to="lessonPath(next)" class="lesson-nav__next">
        {{ t('course.nextLesson', { title: tr(next.title) }) }} <span aria-hidden="true">→</span>
      </NuxtLink>
    </nav>
  </AppSection>
</template>

<style scoped lang="scss">
.crumbs {
  margin-bottom: 3.2rem;
  font-size: 1.5rem;

  &__list {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
  }

  &__item + &__item::before {
    content: '/';
    // the separator is decoration: screen readers skip it where the alt text is supported
    content: '/' / '';
    margin-inline: 0.8rem;
    color: var(--text-muted);
  }

  &__link {
    font-weight: 600;
    color: var(--text-muted);
    transition: color $transition;

    &:hover {
      color: var(--accent);
    }

    // a finger-sized target on touch screens
    @media (pointer: coarse) {
      display: inline-block;
      padding: 1rem 0;
    }
  }

  &__current {
    color: var(--text-color);
  }
}

.block-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 0.8rem;
}

.block-desc {
  font-size: 1.6rem;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

.lesson-playground {
  margin-top: 6.4rem;
}

.lesson-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1.2rem 2.4rem;
  margin-top: 6.4rem;
  padding-top: 3.2rem;
  border-top: 1px solid var(--border);

  &__prev,
  &__toc,
  &__next {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-muted);
    transition: color $transition;

    &:hover {
      color: var(--accent);
    }

    // a finger-sized target on touch screens
    @media (pointer: coarse) {
      display: inline-block;
      padding: 1rem 0;
    }
  }

  // stays on the right when there is no previous lesson
  &__next {
    margin-left: auto;
    color: var(--accent);
  }
}
</style>
