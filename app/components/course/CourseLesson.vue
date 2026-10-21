<script setup lang="ts">
import type { CourseSection, Lesson } from '~/data/course-types'

const props = defineProps<{ lesson: Lesson | CourseSection; index?: number; next?: CourseSection }>()
const { t, locale } = useI18n()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')

// Code blocks are numbered within the lesson from 1, pseudo ones included: id "<slug>-code-<n>", "Example n".
const codeNumber = (i: number) => props.lesson.blocks.slice(0, i + 1).filter((b) => b.type === 'code').length
const exampleLabel = (i: number) =>
  t('course.exampleLabel', { n: codeNumber(i), lesson: isEn.value ? props.lesson.title.en : props.lesson.title.ru })
</script>

<template>
  <section :id="lesson.slug" class="lesson">
    <h3 class="lesson__title">
      <span class="lesson__num">{{ String(index).padStart(2, '0') }}</span>
      {{ isEn ? lesson.title.en : lesson.title.ru }}
    </h3>

    <template v-for="(block, i) in lesson.blocks" :key="i">
      <CourseCodeBlock
        v-if="block.type === 'code'"
        :id="`${lesson.slug}-code-${codeNumber(i)}`"
        :code="isEn ? block.code.en : block.code.ru"
        :label="exampleLabel(i)"
        :playground="!block.pseudo && !block.noRun"
        :pseudo="block.pseudo"
      />
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
