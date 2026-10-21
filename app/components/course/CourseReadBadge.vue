<script setup lang="ts">
defineProps<{ slug: string }>()
const { t } = useI18n()
// Progress lives in this browser only: nothing in the prerendered HTML, so hydration matches.
const mounted = useMounted()
const { isRead } = useCourseProgress()
</script>

<template>
  <span v-if="mounted && isRead(slug)" class="read-badge">
    <svg
      class="read-badge__icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
    {{ t('course.read') }}
  </span>
</template>

<style scoped lang="scss">
.read-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.2rem 0.8rem;
  border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  border-radius: 99rem;
  background-color: color-mix(in srgb, var(--accent) 10%, transparent);
  font-family: $base-font;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.5;
  white-space: nowrap;
  color: var(--text-color);

  &__icon {
    width: 1.2rem;
    height: 1.2rem;
    color: var(--accent);
  }
}
</style>
