<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { y } = useWindowScroll()

const scrolled = computed(() => y.value > 24)
const menuOpen = ref(false)

const nav = [
  { id: 'about', key: 'nav.about' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'experience', key: 'nav.experience' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'certificates', key: 'nav.certificates' },
  { id: 'course', key: 'nav.course' },
  { id: 'contact', key: 'nav.contact' },
] as const

const close = () => {
  menuOpen.value = false
}
</script>

<template>
  <header class="header" :class="{ 'header--scrolled': scrolled }">
    <div class="header__inner">
      <NuxtLink :to="localePath('/')" class="logo" aria-label="Rihard Alikhanov" @click="close">
        <span class="logo__mark">RA</span>
        <span class="logo__name">{{ t('brand.name') }}</span>
      </NuxtLink>

      <nav class="nav" :class="{ 'nav--open': menuOpen }" :aria-label="t('nav.label')">
        <ul class="nav__list">
          <li v-for="item in nav" :key="item.id">
            <a class="nav__link" :href="`#${item.id}`" @click="close">{{ t(item.key) }}</a>
          </li>
        </ul>
      </nav>

      <div class="header__actions">
        <LangSwitch />
        <ThemeToggle />
        <button
          class="burger"
          type="button"
          :aria-expanded="menuOpen"
          :aria-label="t('a11y.toggleMenu')"
          @click="menuOpen = !menuOpen"
        >
          <span :class="{ 'burger__bar--top': menuOpen }" class="burger__bar" />
          <span :class="{ 'burger__bar--mid': menuOpen }" class="burger__bar" />
          <span :class="{ 'burger__bar--bot': menuOpen }" class="burger__bar" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  transition:
    background-color $transition,
    border-color $transition,
    backdrop-filter $transition;
  border-bottom: 1px solid transparent;

  &--scrolled {
    background-color: color-mix(in srgb, var(--bg) 80%, transparent);
    backdrop-filter: blur(12px);
    border-bottom-color: var(--border);
  }

  &__inner {
    @include container($container-wide);
    height: $header-height;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-weight: 800;

  &__mark {
    display: grid;
    place-items: center;
    width: 4rem;
    height: 4rem;
    border-radius: 1rem;
    font-size: 1.6rem;
    color: $white;
    background: linear-gradient(135deg, $green, $green-bright);
  }

  &__name {
    font-size: 1.7rem;
    color: var(--text-color);

    @include respond-to(tablet) {
      display: none;
    }
  }
}

.nav {
  &__list {
    display: flex;
    align-items: center;
    gap: 2.8rem;
  }

  &__link {
    position: relative;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: color $transition;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -0.6rem;
      width: 100%;
      height: 2px;
      background: var(--accent);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform $transition;
    }

    &:hover {
      color: var(--text-color);

      &::after {
        transform: scaleX(1);
      }
    }
  }

  @include respond-to(laptop) {
    position: fixed;
    inset: $header-height 0 auto 0;
    background-color: var(--bg);
    border-bottom: 1px solid var(--border);
    padding: 2.4rem;
    transform: translateY(-120%);
    transition: transform 0.35s $apple-cubic;

    &--open {
      transform: translateY(0);
    }

    &__list {
      flex-direction: column;
      align-items: flex-start;
      gap: 2rem;
    }

    &__link {
      font-size: 2rem;
    }
  }
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 4rem;
  height: 4rem;

  &__bar {
    width: 2.2rem;
    height: 2px;
    background: var(--text-color);
    border-radius: 2px;
    transition: transform $transition, opacity $transition;

    &--top {
      transform: translateY(0.7rem) rotate(45deg);
    }
    &--mid {
      opacity: 0;
    }
    &--bot {
      transform: translateY(-0.7rem) rotate(-45deg);
    }
  }

  @include respond-to(laptop) {
    display: flex;
  }
}
</style>
