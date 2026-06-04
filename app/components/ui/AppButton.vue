<script setup lang="ts">
interface Props {
  to?: string
  href?: string
  variant?: 'primary' | 'ghost'
}

const props = withDefaults(defineProps<Props>(), { variant: 'primary' })

const tag = computed(() => {
  if (props.to) return resolveComponent('NuxtLink')
  if (props.href) return 'a'
  return 'button'
})
</script>

<template>
  <component
    :is="tag"
    :to="to"
    :href="href"
    class="btn"
    :class="`btn--${variant}`"
  >
    <slot />
  </component>
</template>

<style scoped lang="scss">
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 1.3rem 2.6rem;
  border-radius: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  transition:
    transform $transition,
    background-color $transition,
    border-color $transition,
    color $transition;

  &:hover {
    transform: translateY(-2px);
  }

  &--primary {
    color: $white;
    background: linear-gradient(135deg, $green, $green-bright);
    box-shadow: 0 8px 24px -10px color-mix(in srgb, #{$green} 70%, transparent);
  }

  &--ghost {
    color: var(--text-color);
    border: 1px solid var(--border);
    background-color: transparent;

    &:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
  }
}
</style>
