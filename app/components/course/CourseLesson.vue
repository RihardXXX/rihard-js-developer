<script setup lang="ts">
import type { CourseSection, Lesson, LocalizedText } from '~/data/course-types'

const props = defineProps<{ lesson: Lesson | CourseSection; index?: number; next?: CourseSection }>()
const { t, locale } = useI18n()
// Lesson content exists in RU and EN only; every non-Russian locale shows English.
const isEn = computed(() => locale.value !== 'ru')
const tr = (text: LocalizedText) => (isEn.value ? text.en : text.ru)
// Intro sections come without index: h2 without a number, their subheadings one level up.
const intro = computed(() => props.index === undefined)

// Code blocks are numbered within the lesson from 1, pseudo ones included: id "<slug>-code-<n>", "Example n".
const codeNumber = (i: number) => props.lesson.blocks.slice(0, i + 1).filter((b) => b.type === 'code').length
const exampleLabel = (i: number) =>
  t('course.exampleLabel', { n: codeNumber(i), lesson: isEn.value ? props.lesson.title.en : props.lesson.title.ru })
</script>

<template>
  <section :id="lesson.slug" class="lesson">
    <component :is="intro ? 'h2' : 'h3'" class="lesson__title">
      <span v-if="!intro" class="lesson__num">{{ String(index).padStart(2, '0') }}</span>
      {{ isEn ? lesson.title.en : lesson.title.ru }}
    </component>

    <template v-for="(block, i) in lesson.blocks" :key="i">
      <CourseCodeBlock
        v-if="block.type === 'code'"
        :id="`${lesson.slug}-code-${codeNumber(i)}`"
        :code="isEn ? block.code.en : block.code.ru"
        :label="exampleLabel(i)"
        :playground="!block.pseudo && !block.noRun"
        :pseudo="block.pseudo"
      />
      <component :is="intro ? 'h3' : 'h4'" v-else-if="block.type === 'heading'" class="lesson__heading">
        {{ tr(block) }}
      </component>
      <component
        :is="block.ordered ? 'ol' : 'ul'"
        v-else-if="block.type === 'list'"
        :class="['lesson__list', { 'lesson__list--ordered': block.ordered }]"
      >
        <li v-for="(item, j) in block.items" :key="j">{{ tr(item) }}</li>
      </component>
      <div
        v-else-if="block.type === 'table'"
        class="lesson__table"
        tabindex="0"
        role="region"
        :aria-labelledby="`${lesson.slug}-table-${i}`"
      >
        <table>
          <caption :id="`${lesson.slug}-table-${i}`">{{ tr(block.caption) }}</caption>
          <thead>
            <tr>
              <th v-for="(column, j) in block.columns" :key="j" scope="col">{{ tr(column) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, r) in block.rows" :key="r">
              <template v-for="(cell, c) in row" :key="c">
                <th v-if="c === 0" scope="row">{{ tr(cell) }}</th>
                <td v-else>{{ tr(cell) }}</td>
              </template>
            </tr>
          </tbody>
        </table>
      </div>
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

  &__heading {
    margin: 3.2rem 0 1.2rem;
    font-size: 2rem;
    color: var(--text-color);
  }

  &__list {
    max-width: 72ch;
    margin-bottom: 1.6rem;
    padding-left: 2.4rem;
    list-style: disc;
    font-size: 1.7rem;
    line-height: 1.7;
    color: var(--text-muted);

    &--ordered {
      list-style: decimal;
    }

    li + li {
      margin-top: 0.8rem;
    }

    li::marker {
      color: var(--accent);
    }
  }

  &__table {
    margin: 2rem 0;
    overflow-x: auto;
    border: 1px solid var(--border);
    border-radius: 1rem;
    background-color: var(--surface);

    table {
      width: 100%;
      min-width: 56rem;
      border-collapse: collapse;
      font-size: 1.5rem;
      line-height: 1.5;
    }

    caption {
      padding: 1.2rem 1.6rem;
      text-align: left;
      font-weight: 700;
      color: var(--text-color);
    }

    th,
    td {
      padding: 1rem 1.6rem;
      border-top: 1px solid var(--border);
      text-align: left;
      vertical-align: top;
    }

    th {
      font-weight: 600;
      color: var(--text-color);
    }

    thead th {
      font-family: $mono-font;
      font-size: 1.3rem;
      color: var(--accent);
    }

    td {
      color: var(--text-muted);
    }
  }
}
</style>
