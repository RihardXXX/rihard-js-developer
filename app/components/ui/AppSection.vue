<script setup lang="ts">
defineProps<{ id?: string; surface?: boolean }>()
</script>

<template>
  <section :id="id" class="section" :class="{ 'section--surface': surface }">
    <div class="section__inner">
      <slot />
    </div>
  </section>
</template>

<style scoped lang="scss">
.section {
  padding-block: 9.6rem;
  scroll-margin-top: $header-height;

  @include respond-to(mobile) {
    padding-block: 6.4rem;
  }

  &--surface {
    background-color: var(--surface);
    border-block: 1px solid var(--border);
  }

  &__inner {
    @include container($container-wide);
  }
}
</style>
