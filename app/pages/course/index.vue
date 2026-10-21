<script setup lang="ts">
import type { CourseSection, LessonEntry } from '~/data/course-types'
import { fillLocale, pickLocale } from '~/utils/course-locale'

interface CourseContents {
  introSections: CourseSection[]
  lessons: LessonEntry[]
}

const { t, locale, localeProperties } = useI18n()
const localePath = useLocalePath()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')

// The intro and the contents come in the page payload (/ru/course/_payload.json) with texts of its
// locale only; of the lessons just titles and descriptions, their texts live on the lesson pages.
// The client imports the lesson module just when there is no payload (dev, network failure).
// The key is fixed: switching the language mounts the other locale's page with its own payload.
const lang = isEn.value ? 'en' : 'ru'
const { data: course, error } = await useAsyncData(`course-${lang}`, async (): Promise<CourseContents> => {
  const { introSections, lessons } = await import('~/data/course')
  const entries = lessons.map(({ slug, title, description }): LessonEntry => ({ slug, title, description }))
  return pickLocale({ introSections, lessons: entries }, lang)
})
// Broken lesson data fails generate instead of shipping an empty course with 200.
if (error.value) {
  throw createError({ statusCode: 500, statusMessage: 'course data failed to load', fatal: true })
}
// i18n switches the locale before the new page's payload arrives; meanwhile this page shows its own texts.
const sections = computed(() => fillLocale(course.value ?? { introSections: [], lessons: [] }, lang))
const introSections = computed(() => sections.value.introSections)
const lessons = computed(() => sections.value.lessons)

useSeoMeta({
  title: () => t('course.title'),
  description: () => t('course.desc'),
})

// The resolver sets `provider` to the site identity (the Person from app.vue).
useSchemaOrg([
  defineCourse({
    name: t('course.title'),
    description: t('course.desc'),
    inLanguage: localeProperties.value.language,
  }),
])

// The lessons used to live on this page: an old link /course/#slug opens the lesson's own page.
// The router puts the #hash back only after hydration (see below), so it is watched, not read once;
// replace: "Back" leads to where the reader came from, not to the contents.
const route = useRoute()
onMounted(() => {
  watch(
    () => route.hash.slice(1),
    (id) => {
      if (lessons.value.some((lesson) => lesson.slug === id)) navigateTo(localePath(`/course/${id}/`), { replace: true })
    },
    { immediate: true },
  )
})

// A direct link to an intro section or the contents (/course/#for-whom) stops off it: web fonts
// load during the smooth scroll (main.scss) and move it. Land on it once they are in, unless the
// reader has already scrolled.
onMounted(async () => {
  let scrolled = false
  const stop = () => {
    scrolled = true
  }
  const events = ['wheel', 'touchstart', 'keydown', 'mousedown'] as const
  events.forEach((name) => window.addEventListener(name, stop, { passive: true }))
  await nextTick()
  await document.fonts.ready
  // An instant scroll from outside a frame loses to the router's smooth scroll still in flight.
  await new Promise((resolve) => requestAnimationFrame(resolve))
  events.forEach((name) => window.removeEventListener(name, stop))
  // Read only now: a prerendered page hydrates on its payload path without the #hash, and the
  // router puts it back after hydration. Fonts that were in by then didn't move the target.
  const id = location.hash.slice(1)
  if (id && !scrolled) document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
})
</script>

<template>
  <AppSection id="course-top">
    <NuxtLink :to="localePath('/')" class="back">← {{ t('course.back') }}</NuxtLink>

    <SectionHeader
      as="h1"
      :eyebrow="t('course.eyebrow')"
      :title="t('course.title')"
      :subtitle="t('course.desc')"
    />

    <div class="playground-wrap">
      <h2 class="block-title">{{ t('course.playgroundTitle') }}</h2>
      <p class="block-desc">{{ t('course.playgroundDesc') }}</p>
      <CoursePlayground />
    </div>

    <div class="intro">
      <CourseLesson v-for="section in introSections" :key="section.slug" :lesson="section" />
    </div>

    <nav id="course-toc" class="toc" :aria-label="t('course.tocTitle')">
      <h2 class="block-title">{{ t('course.tocTitle') }}</h2>
      <CourseProgressSummary :lessons="lessons" />
      <ol class="toc__list">
        <!-- id="<slug>": without JS an old link /course/#slug still lands next to the lesson's link -->
        <li v-for="(lesson, i) in lessons" :id="lesson.slug" :key="lesson.slug" class="toc__item">
          <!-- On interaction: 26 links on screen would otherwise fetch 26 lesson payloads at once. -->
          <NuxtLink :to="localePath(`/course/${lesson.slug}/`)" prefetch-on="interaction" class="toc__link">
            <span class="toc__num">{{ String(i + 1).padStart(2, '0') }}</span>
            {{ isEn ? lesson.title.en : lesson.title.ru }}
            <CourseReadBadge :slug="lesson.slug" />
          </NuxtLink>
          <p class="toc__desc">{{ isEn ? lesson.description.en : lesson.description.ru }}</p>
        </li>
      </ol>
    </nav>
  </AppSection>
</template>

<style scoped lang="scss">
.back {
  display: inline-block;
  margin-bottom: 2.4rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-muted);
  transition: color $transition;

  &:hover {
    color: var(--accent);
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

.playground-wrap {
  margin-bottom: 6.4rem;
}

.toc {
  scroll-margin-top: $header-height;
  padding: 3.2rem;
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  background-color: var(--surface);

  &__list {
    margin-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem 3.2rem;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__item {
    // an old link /course/#slug lands below the fixed header
    scroll-margin-top: $header-height;
  }

  &__link {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 0.8rem 0 0.4rem;
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--text-color);
    transition: color $transition;

    &:hover {
      color: var(--accent);
    }
  }

  &__num {
    flex: 0 0 2.4rem;
    font-family: $mono-font;
    font-size: 1.3rem;
    color: var(--accent);
  }

  // under the title, past the number
  &__desc {
    padding-left: 3.4rem;
    font-size: 1.5rem;
    line-height: 1.6;
    color: var(--text-muted);
  }
}

.intro {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 4rem;
}

.intro {
  margin-bottom: 6.4rem;
}
</style>
