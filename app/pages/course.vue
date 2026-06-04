<script setup lang="ts">
import { lessons } from '~/data/course'

const { t, locale } = useI18n()
const localePath = useLocalePath()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')

useSeoMeta({
  title: () => t('course.title'),
  description: () => t('course.desc'),
})
</script>

<template>
  <AppSection id="course-top">
    <NuxtLink :to="localePath('/')" class="back">← {{ t('course.back') }}</NuxtLink>

    <SectionHeader
      :eyebrow="t('course.eyebrow')"
      :title="t('course.title')"
      :subtitle="t('course.desc')"
    />

    <div class="playground-wrap">
      <h2 class="block-title">{{ t('course.playgroundTitle') }}</h2>
      <p class="block-desc">{{ t('course.playgroundDesc') }}</p>
      <ClientOnly>
        <CoursePlayground />
        <template #fallback>
          <div class="playground-skeleton" />
        </template>
      </ClientOnly>
    </div>

    <nav class="toc" :aria-label="t('course.tocTitle')">
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

    <div class="lessons">
      <CourseLesson
        v-for="(lesson, i) in lessons"
        :key="lesson.slug"
        :lesson="lesson"
        :index="i + 1"
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
  margin-bottom: 6.4rem;
}

.playground-skeleton {
  height: 42vh;
  min-height: 32rem;
  border: 1px solid var(--code-border);
  border-radius: 1.4rem;
  background-color: var(--surface);
}

.toc {
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

.lessons {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 4rem;
}
</style>
