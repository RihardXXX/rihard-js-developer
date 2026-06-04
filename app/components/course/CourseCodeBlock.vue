<script setup lang="ts">
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'

hljs.registerLanguage('javascript', javascript)

const props = defineProps<{ code: string }>()
const { t } = useI18n()

const highlighted = computed(
  () => hljs.highlight(props.code, { language: 'javascript' }).value,
)

const copied = ref(false)
const copy = async () => {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    /* clipboard unavailable */
  }
}
</script>

<template>
  <div class="cb">
    <button class="cb__copy" type="button" @click="copy">
      {{ copied ? t('course.copied') : t('course.copy') }}
    </button>
    <pre class="cb__pre"><code class="hljs language-javascript" v-html="highlighted" /></pre>
  </div>
</template>

<style scoped lang="scss">
.cb {
  position: relative;
  min-width: 0;
  margin: 2rem 0;

  &__copy {
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1;
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
  }

  &__pre {
    margin: 0;
    padding: 1.8rem;
    border: 1px solid var(--code-border);
    border-radius: 1rem;
    background-color: var(--code-bg);
    overflow-x: auto;
    font-family: $mono-font;
    font-size: 1.4rem;
    line-height: 1.6;
    color: var(--code-text);
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
