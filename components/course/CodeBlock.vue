<template>
  <pre :class="$style.codeBlock">
    <code ref="codeEl" class="hljs language-javascript">
      <slot />
    </code>
  </pre>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const codeEl = ref(null);

onMounted(async () => {
  await nextTick();
  if (codeEl.value) {
    hljs.highlightElement(codeEl.value);
  }
});
</script>

<style lang="scss" module>
.codeBlock {
  background-color: var(--background-color, #1e1e1e);
  color: var(--text-color, #d4d4d4);
  padding: 1rem 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', 'Courier New', monospace;
  font-size: 1.8rem;
  line-height: 1.5;
  margin: 0 1rem 2.4rem 1rem;
  border: 1px solid var(--text-color);
  padding: 0.2rem 0.4rem !important;
  border-radius: 3px;

  @include respond-to(mobile) {
    padding: 0.1rem 0.2rem !important;
    font-size: 1.4rem;
    margin-bottom: 2.2rem;
  }
}

:global(.hljs-keyword) {
  color: #569cd6;
}
:global(.hljs-string) {
  color: #ce9178;
}
:global(.hljs-number) {
  color: #b5cea8;
}
:global(.hljs-comment) {
  color: #6a9955;
  font-style: italic;
}
:global(.hljs-function),
:global(.hljs-title) {
  color: #dcdcaa;
}
:global(.hljs-attr) {
  color: #9cdcfe;
}
</style>
