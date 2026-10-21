<script setup lang="ts">
import type { LessonLink } from '~/data/course-types'
import { readCount, resumeFrom } from '~/utils/course-progress'

const props = defineProps<{ lessons: LessonLink[] }>()
const { t, locale } = useI18n()
const localePath = useLocalePath()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')
// Progress lives in this browser only: nothing in the prerendered HTML, so hydration matches.
const mounted = useMounted()
const { progress, reset } = useCourseProgress()

const slugs = computed(() => props.lessons.map((lesson) => lesson.slug))
const done = computed(() => readCount(progress.value, slugs.value))
const resume = computed(() => resumeFrom(progress.value, slugs.value))
// undefined when every lesson is read
const resumeLesson = computed(() => props.lessons.find((lesson) => lesson.slug === resume.value?.slug))
// "start" means no lesson read and none opened: there is nothing to reset.
const started = computed(() => resume.value?.kind !== 'start')

const confirmReset = () => {
  if (window.confirm(t('course.progressResetConfirm'))) reset()
}
</script>

<template>
  <div v-if="mounted" class="progress">
    <div class="progress__head">
      <p class="progress__count">{{ t('course.progressCount', { done, total: lessons.length }) }}</p>
      <div class="progress__bar" aria-hidden="true">
        <span class="progress__fill" :style="{ width: `${(done / lessons.length) * 100}%` }" />
      </div>
    </div>
    <div class="progress__actions">
      <NuxtLink
        v-if="resumeLesson"
        :to="localePath(`/course/${resumeLesson.slug}/`)"
        prefetch-on="interaction"
        class="progress__resume"
      >
        {{
          started
            ? t('course.progressContinue', { title: isEn ? resumeLesson.title.en : resumeLesson.title.ru })
            : t('course.progressStart')
        }}
        <span aria-hidden="true">→</span>
      </NuxtLink>
      <button v-if="started" type="button" class="progress__reset" @click="confirmReset">
        {{ t('course.progressReset') }}
      </button>
    </div>
    <p class="progress__note">{{ t('course.progressNote') }}</p>
  </div>
</template>

<style scoped lang="scss">
.progress {
  display: grid;
  gap: 1.2rem;
  padding: 1.6rem 2rem;
  border: 1px solid var(--border);
  border-radius: 1.2rem;
  background-color: var(--bg);

  @include respond-to(mobile) {
    padding: 1.4rem 1.6rem;
  }

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.8rem 1.6rem;
  }

  &__count {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--text-color);
  }

  &__bar {
    flex: 1 1 16rem;
    height: 0.6rem;
    border-radius: 99rem;
    overflow: hidden;
    background-color: var(--border);
  }

  &__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, $green, $green-bright);
    transition: width $transition;
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem 2.4rem;
  }

  &__resume {
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--accent);

    &:hover {
      text-decoration: underline;
      text-underline-offset: 0.3em;
    }

    // a finger-sized target on touch screens
    @media (pointer: coarse) {
      display: inline-block;
      padding: 1rem 0;
    }
  }

  &__reset {
    font-size: 1.4rem;
    color: var(--text-muted);
    text-decoration: underline;
    text-underline-offset: 0.3em;
    transition: color $transition;

    &:hover {
      color: var(--text-color);
    }

    @media (pointer: coarse) {
      min-height: 4.4rem;
    }
  }

  &__note {
    font-size: 1.3rem;
    line-height: 1.5;
    color: var(--text-muted);
  }
}
</style>
