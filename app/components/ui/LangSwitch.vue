<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const open = ref(false)
const root = ref<HTMLElement | null>(null)

const options = computed(() => locales.value as LocaleObject[])
const current = computed(
  () => options.value.find((l) => l.code === locale.value) ?? options.value[0],
)

const close = () => {
  open.value = false
}

onClickOutside(root, close)
</script>

<template>
  <div ref="root" class="lang">
    <button
      class="lang__trigger"
      type="button"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="open = !open"
    >
      <span class="lang__code">{{ current?.code?.toUpperCase() }}</span>
      <span class="lang__name">{{ current?.name }}</span>
      <svg class="lang__chevron" :class="{ 'lang__chevron--open': open }" viewBox="0 0 12 8" aria-hidden="true">
        <path d="M1 1.5 6 6.5l5-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>

    <Transition name="lang-pop">
      <ul v-if="open" class="lang__menu" role="listbox">
        <li v-for="l in options" :key="l.code" role="option" :aria-selected="l.code === locale">
          <NuxtLink
            :to="switchLocalePath(l.code)"
            class="lang__item"
            :class="{ 'lang__item--active': l.code === locale }"
            :hreflang="l.code"
            @click="close"
          >
            <span class="lang__item-code">{{ l.code.toUpperCase() }}</span>
            <span class="lang__item-name">{{ l.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.lang {
  position: relative;

  &__trigger {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.6rem 1rem;
    border-radius: 0.8rem;
    border: 1px solid var(--border);
    background-color: var(--surface);
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-color);
    transition:
      border-color $transition,
      background-color $transition;

    &:hover {
      border-color: var(--accent);
    }
  }

  &__code {
    color: var(--accent);
    font-family: $mono-font;
  }

  &__name {
    color: var(--text-muted);

    @include respond-to(mobile) {
      display: none;
    }
  }

  &__chevron {
    width: 1.1rem;
    height: 0.8rem;
    color: var(--text-muted);
    transition: transform $transition;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__menu {
    position: absolute;
    top: calc(100% + 0.6rem);
    right: 0;
    z-index: 50;
    min-width: 17rem;
    padding: 0.6rem;
    border-radius: 1rem;
    border: 1px solid var(--border);
    background-color: var(--surface);
    box-shadow: 0 24px 48px -24px rgba(0, 0, 0, 0.4);
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 1rem;
    border-radius: 0.7rem;
    font-size: 1.45rem;
    color: var(--text-muted);
    transition:
      background-color $transition,
      color $transition;

    &:hover {
      background-color: var(--bg);
      color: var(--text-color);
    }

    &--active {
      color: var(--accent);
      background-color: color-mix(in srgb, #{$green} 10%, transparent);
    }
  }

  &__item-code {
    font-family: $mono-font;
    font-size: 1.25rem;
    font-weight: 700;
    width: 2.6rem;
  }
}

.lang-pop-enter-active,
.lang-pop-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}
.lang-pop-enter-from,
.lang-pop-leave-to {
  opacity: 0;
  transform: translateY(-0.4rem);
}
</style>
