<script setup lang="ts">
import { fillLocale, pickLocale } from '~/utils/course-locale'

const { t, locale } = useI18n()
const localePath = useLocalePath()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')

// Lessons come in the page payload (/ru/course/_payload.json) with texts of its locale only;
// the client imports the lesson module just when there is no payload (dev, network failure).
// The key is fixed: switching the language mounts the other locale's page with its own payload.
const lang = isEn.value ? 'en' : 'ru'
const { data: course } = await useAsyncData(`course-${lang}`, async () => {
  const { introSections, lessons } = await import('~/data/course')
  return pickLocale({ introSections, lessons }, lang)
})
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
    inLanguage: lang === 'en' ? 'en-US' : 'ru-RU',
  }),
])

// A direct link to /course/#slug stops off the lesson: web fonts load during the smooth
// scroll (main.scss) and move the lesson. Land on it once they are in, unless the reader
// has already scrolled.
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
  // router puts it back after hydration. Fonts that were in by then didn't move the lesson.
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

    <div id="course-playground" class="playground-wrap">
      <h2 class="block-title">{{ t('course.playgroundTitle') }}</h2>
      <p class="block-desc">{{ t('course.playgroundDesc') }}</p>
      <CoursePlayground />
    </div>

    <div class="intro">
      <CourseLesson v-for="section in introSections" :key="section.slug" :lesson="section" />
    </div>

    <nav id="course-toc" class="toc" :aria-label="t('course.tocTitle')">
      <h2 class="block-title">{{ t('course.tocTitle') }}</h2>
      <ol class="toc__list">
        <li v-for="(lesson, i) in lessons" :key="lesson.slug" class="toc__item">
          <a :href="`#${lesson.slug}`" class="toc__link">
            <span class="toc__num">{{ String(i + 1).padStart(2, '0') }}</span>
            {{ isEn ? lesson.title.en : lesson.title.ru }}
          </a>
        </li>
      </ol>
    </nav>

    <h2 class="block-title">{{ t('course.lessonsTitle') }}</h2>
    <div class="lessons">
      <CourseLesson
        v-for="(lesson, i) in lessons"
        :key="lesson.slug"
        :lesson="lesson"
        :index="i + 1"
        :next="lessons[i + 1]"
      />
    </div>
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
  scroll-margin-top: $header-height;
  margin-bottom: 6.4rem;
}

.toc {
  scroll-margin-top: $header-height;
  margin-bottom: 6.4rem;
  padding: 3.2rem;
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  background-color: var(--surface);

  &__list {
    margin-top: 1.6rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.4rem 2.4rem;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
    }
  }

  &__link {
    display: flex;
    align-items: baseline;
    gap: 1rem;
    padding: 0.8rem 0;
    font-size: 1.6rem;
    color: var(--text-muted);
    transition: color $transition;

    &:hover {
      color: var(--accent);
    }
  }

  &__num {
    font-family: $mono-font;
    font-size: 1.3rem;
    color: var(--accent);
  }
}

.intro,
.lessons {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 4rem;
}

.intro {
  margin-bottom: 6.4rem;
}
</style>
