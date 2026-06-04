<script setup lang="ts">
import type { Lesson } from '~/data/course-types'

defineProps<{ lesson: Lesson; index: number }>()
const { locale } = useI18n()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')
</script>

<template>
  <section :id="lesson.slug" class="lesson">
    <h3 class="lesson__title">
      <span class="lesson__num">{{ String(index).padStart(2, '0') }}</span>
      {{ isEn ? lesson.title.en : lesson.title.ru }}
    </h3>

    <template v-for="(block, i) in lesson.blocks" :key="i">
      <CourseCodeBlock v-if="block.type === 'code'" :code="block.code" />
      <p v-else class="lesson__text">{{ isEn ? block.en : block.ru }}</p>
    </template>
  </section>
</template>

<style scoped lang="scss">
.lesson {
  min-width: 0;
  scroll-margin-top: $header-height;
  padding-top: 4rem;
  border-top: 1px solid var(--border);

  &__title {
    display: flex;
    align-items: baseline;
    gap: 1.2rem;
    margin-bottom: 2rem;
    font-size: clamp(2.2rem, 3vw, 2.8rem);
    font-weight: 700;
    color: var(--text-color);
  }

  &__num {
    font-family: $mono-font;
    font-size: 1.6rem;
    color: var(--accent);
  }

  &__text {
    margin-bottom: 1.6rem;
    font-size: 1.7rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 72ch;
  }
}
</style>
