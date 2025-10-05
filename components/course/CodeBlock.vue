<template>
  <div style="position: relative;">
    <button :class="$style.copyBtn" @click="copyCode">
      {{ copied ? 'Скопировано!' : 'Скопировать' }}
    </button>
    <pre :class="$style.codeBlock">
      <code ref="codeEl" class="hljs language-javascript">
        <slot />
      </code>
    </pre>
  </div>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

hljs.registerLanguage('javascript', javascript);

const codeEl = ref(null);
const copied = ref(false)

onMounted(async () => {
  await nextTick();
  if (codeEl.value) {
    hljs.highlightElement(codeEl.value);
  }
});

const copyCode = async () => {
  const codeText = codeEl.value?.innerText?.trim()
  if (!codeText) return

  try {
    await navigator.clipboard.writeText(codeText)
    copied.value = true
    setTimeout(() => (copied.value = false), 2000)
  } catch (err) {
    console.error('Ошибка копирования:', err)
  }
}
</script>

<style lang="scss" module>

.copyBtn {
  position: absolute;
  top: 0;
  right: 1rem;
  color: var(--text-color);
  border: 1px solid var(--text-color);
  border-radius: 6px;
  font-size: 1.2rem;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.codeBlock {
  background-color: var(--background-color, #ffffff); /* белый фон */
  color: var(--text-color, #24292e); /* тёмный текст */
  padding: 1rem 1.2rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', 'Consolas', 'Courier New', monospace;
  font-size: 1.8rem;
  line-height: 1.4;
  margin: 0 1rem 2.4rem 1rem;
  border: 1px solid var(--text-color);
  border-radius: 6px;

  @include respond-to(mobile) {
    padding: 0.8rem;
    font-size: 1.4rem;
    margin-bottom: 2.2rem;
  }
}

:global(.hljs-keyword) {
  color: #d73a49; /* if, const, return и т.д. */
}

:global(.hljs-string) {
  color: #032f62; /* строки */
}

:global(.hljs-number) {
  color: #005cc5; /* числа */
}

:global(.hljs-comment) {
  color: #6a737d;
  font-style: italic;
}

:global(.hljs-function),
:global(.hljs-title) {
  color: #6f42c1; /* имена функций */
}

:global(.hljs-attr),
:global(.hljs-property) {
  color: #24292e; /* или #005cc5 — на ваш вкус */
}
</style>
