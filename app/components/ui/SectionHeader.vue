<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title: string
  subtitle?: string
  center?: boolean
}>()
</script>

<template>
  <header class="section-header" :class="{ 'section-header--center': center }">
    <p v-if="eyebrow" class="section-header__eyebrow">{{ eyebrow }}</p>
    <h2 class="section-header__title">{{ title }}</h2>
    <p v-if="subtitle" class="section-header__subtitle">{{ subtitle }}</p>
  </header>
</template>

<style scoped lang="scss">
.section-header {
  max-width: 64rem;
  margin-bottom: 4.8rem;

  &--center {
    margin-inline: auto;
    text-align: center;
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
    font-size: clamp(2.8rem, 4vw, 4rem);
    font-weight: 800;
    letter-spacing: -0.01em;
    color: var(--text-color);
  }

  &__subtitle {
    margin-top: 1.6rem;
    font-size: 1.7rem;
    color: var(--text-muted);
  }
}
</style>
