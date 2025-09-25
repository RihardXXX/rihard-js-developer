<template>
  <h3 :class="$style.subtitle">
    ##
    <slot></slot>
  </h3>
</template>

<style lang="scss" module>
.subtitle {
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 500;
  font-size: 2rem;
  transition: all 0.5s;
  color: var(--text-color);
  padding: 0 1rem;

  @include respond-to(mobile) {
    margin-bottom: 1.4rem;
    font-size: 1.8rem;
  }
}
</style>
