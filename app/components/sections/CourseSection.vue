<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const bullets = ['course.b1', 'course.b2', 'course.b3', 'course.b4'] as const
</script>

<template>
  <AppSection id="course">
    <div class="course">
      <div class="course__content">
        <p class="course__eyebrow">{{ t('course.eyebrow') }}</p>
        <h2 class="course__title">{{ t('course.title') }}</h2>
        <p class="course__desc">{{ t('course.desc') }}</p>

        <ul class="course__bullets">
          <li v-for="b in bullets" :key="b" class="course__bullet">
            <span class="course__dot" aria-hidden="true" />
            {{ t(b) }}
          </li>
        </ul>

        <AppButton :to="localePath('/course')" variant="primary">
          {{ t('course.cta') }}
        </AppButton>
      </div>

      <div class="course__visual" aria-hidden="true">
        <div class="editor">
          <div class="editor__bar">
            <span class="editor__dot" />
            <span class="editor__dot" />
            <span class="editor__dot" />
            <span class="editor__name">interpreter.js</span>
          </div>
          <pre class="editor__code"><span class="c-comment">// чистые функции + композиция</span>
<span class="c-key">import</span> { add, multiply, pipe } <span class="c-key">from</span> <span class="c-str">'ramda'</span>

<span class="c-key">const</span> calc = <span class="c-fn">pipe</span>(
  <span class="c-fn">add</span>(<span class="c-num">10</span>),
  <span class="c-fn">multiply</span>(<span class="c-num">3</span>),
)

<span class="c-fn">calc</span>(<span class="c-num">5</span>) <span class="c-comment">// → 45</span></pre>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.course {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 5rem;
  align-items: center;
  padding: 4.8rem;
  border-radius: 2.4rem;
  border: 1px solid var(--border);
  background:
    radial-gradient(40rem 30rem at 100% 0%, color-mix(in srgb, #{$green} 14%, transparent), transparent 70%),
    var(--surface);

  @include respond-to(laptop) {
    grid-template-columns: minmax(0, 1fr);
    gap: 3.2rem;
    padding: 3.2rem;
  }

  @include respond-to(mobile) {
    padding: 2.4rem;
  }

  &__content,
  &__visual {
    min-width: 0;
  }

  &__eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.28em;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 1.2rem;
  }

  &__title {
    font-size: clamp(2.6rem, 3.5vw, 3.6rem);
    font-weight: 800;
    color: var(--text-color);
  }

  &__desc {
    margin-top: 1.6rem;
    font-size: 1.7rem;
    line-height: 1.65;
    color: var(--text-muted);
  }

  &__bullets {
    margin: 2.4rem 0 3.2rem;
    display: grid;
    gap: 1.2rem;
  }

  &__bullet {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.55rem;
    color: var(--text-color);
  }

  &__dot {
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background-color: var(--accent);
  }
}

.editor {
  border-radius: 1.4rem;
  overflow: hidden;
  border: 1px solid var(--code-border);
  background-color: var(--code-bg);
  box-shadow: 0 30px 60px -40px rgba(0, 0, 0, 0.6);

  &__bar {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 1.2rem 1.6rem;
    border-bottom: 1px solid var(--code-border);
  }

  &__dot {
    width: 1.1rem;
    height: 1.1rem;
    border-radius: 50%;
    background-color: var(--code-border);

    &:nth-child(1) {
      background-color: #ff5f57;
    }
    &:nth-child(2) {
      background-color: #febc2e;
    }
    &:nth-child(3) {
      background-color: #28c840;
    }
  }

  &__name {
    margin-left: 0.8rem;
    font-size: 1.3rem;
    font-family: $mono-font;
    color: var(--code-comment);
  }

  &__code {
    margin: 0;
    padding: 2rem;
    font-family: $mono-font;
    font-size: 1.4rem;
    line-height: 1.7;
    color: var(--code-text);
    overflow-x: auto;
  }
}

.c-comment {
  color: var(--code-comment);
}
.c-key {
  color: var(--code-keyword);
}
.c-str {
  color: var(--code-string);
}
.c-num {
  color: var(--code-number);
}
.c-fn {
  color: var(--code-function);
}
</style>
