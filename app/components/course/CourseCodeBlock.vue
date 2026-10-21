<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

const props = defineProps<{
  code: string
  id: string
  /** accessible name of the example, also the suffix of its button names */
  label: string
  /** show "Open in playground" */
  playground: boolean
  pseudo?: boolean
}>()
const { t } = useI18n()
const { open } = usePlaygroundBridge()

// Pseudocode is a scheme, not JavaScript: it is shown as plain text.
const highlighted = computed(() =>
  props.pseudo ? '' : hljs.highlight(props.code, { language: 'javascript' }).value,
)

const copyState = ref<'idle' | 'copied' | 'failed'>('idle')
const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copyState.value = 'copied'
  } catch {
    // clipboard blocked by the browser: say so instead of staying silent
    copyState.value = 'failed'
  }
  setTimeout(() => (copyState.value = 'idle'), 2000)
}
const copyText = computed(() =>
  copyState.value === 'copied'
    ? t('course.copied')
    : copyState.value === 'failed'
      ? t('course.copyFailed')
      : t('course.copy'),
)
</script>

<template>
  <div :id="id" class="cb">
    <!-- Names start with the visible text and end with the example's label: 44 "Copy" buttons stay distinct. -->
    <div class="cb__bar">
      <button
        v-if="playground"
        class="cb__open"
        type="button"
        :aria-label="`${t('course.openInPlayground')}: ${label}`"
        @click="open(code, id)"
      >
        {{ t('course.openInPlayground') }}
      </button>
      <button
        class="cb__copy"
        type="button"
        :aria-label="`${copyText}: ${label}`"
        @click="copy"
      >
        {{ copyText }}
      </button>
    </div>
    <pre
      class="cb__pre"
      tabindex="0"
      role="group"
      :aria-label="label"
    ><code v-if="pseudo">{{ code }}</code><code v-else class="hljs language-javascript" v-html="highlighted" /></pre>
    <span class="cb__status" role="status" aria-live="polite">{{ copyState === 'idle' ? '' : copyText }}</span>
  </div>
</template>

<style scoped lang="scss">
.cb {
  position: relative;
  min-width: 0;
  margin: 2rem 0;
  // "Back to the example" lands below the fixed header
  scroll-margin-top: $header-height;

  &__bar {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 0.8rem;
    margin-bottom: 0.8rem;
  }

  &__open,
  &__copy {
    padding: 0.4rem 0.9rem;
    border-radius: 0.6rem;
    border: 1px solid var(--code-border);
    font-size: 1.2rem;
    color: var(--code-text);
    background-color: var(--code-bg);
    transition: border-color $transition;

    &:hover {
      border-color: var(--accent);
    }

    // a finger-sized target on touch screens
    @media (pointer: coarse) {
      min-height: 4.4rem;
      padding: 0.8rem 1.4rem;
      font-size: 1.4rem;
    }
  }

  &__pre {
    margin: 0;
    padding: 1.8rem;
    border: 1px solid var(--code-border);
    border-radius: 1rem;
    background-color: var(--code-bg);
    overflow-x: auto;
    scrollbar-color: var(--code-border) var(--code-bg);
    font-family: $mono-font;
    font-size: 1.4rem;
    line-height: 1.6;
    color: var(--code-text);
  }

  &__status {
    @include visually-hidden;
  }
}

// highlight.js token colors mapped to theme tokens
.cb__pre :deep(.hljs-keyword),
.cb__pre :deep(.hljs-built_in) {
  color: var(--code-keyword);
}
.cb__pre :deep(.hljs-string) {
  color: var(--code-string);
}
.cb__pre :deep(.hljs-number) {
  color: var(--code-number);
}
.cb__pre :deep(.hljs-comment) {
  color: var(--code-comment);
  font-style: italic;
}
.cb__pre :deep(.hljs-title),
.cb__pre :deep(.hljs-function),
.cb__pre :deep(.hljs-title.function_) {
  color: var(--code-function);
}
.cb__pre :deep(.hljs-attr),
.cb__pre :deep(.hljs-property) {
  color: var(--code-number);
}
</style>
