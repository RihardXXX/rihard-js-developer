<template>
  <div :class="$style.description"><slot></slot></div>
</template>

<style lang="scss" module>
.description {
  font-size: 1.8rem;
  line-height: 150%;
  color: var(--text-color);
  margin: 0 1rem 2.4rem 1rem;
  border: 1px solid var(--text-color);
  padding: 0.6rem 0.8rem;
  border-radius: 3px;

  p {
    text-indent: 2rem; // или margin-left: 2rem;
  }

  @include respond-to(mobile) {
    padding: 0.4rem 0.6rem;
    font-size: 1.6rem;
    margin-bottom: 2.2rem;
  }
}
</style>
