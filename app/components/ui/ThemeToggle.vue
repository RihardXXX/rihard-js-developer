<script setup lang="ts">
const { theme, toggle } = useTheme()
const { t } = useI18n()
</script>

<template>
  <button
    class="theme-toggle"
    type="button"
    :aria-label="t('a11y.toggleTheme')"
    @click="toggle"
  >
    <ClientOnly>
      <svg
        v-if="theme === 'dark'"
        class="theme-toggle__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path
          d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"
        />
      </svg>
      <svg
        v-else
        class="theme-toggle__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
      <template #fallback>
        <span class="theme-toggle__icon" />
      </template>
    </ClientOnly>
  </button>
</template>

<style scoped lang="scss">
.theme-toggle {
  display: inline-grid;
  place-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  color: var(--text-color);
  transition:
    background-color $transition,
    color $transition;

  &:hover {
    background-color: color-mix(in srgb, var(--text-color) 8%, transparent);
    color: var(--accent);
  }

  &__icon {
    width: 2rem;
    height: 2rem;
  }
}
</style>
