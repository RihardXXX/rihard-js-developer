<script setup lang="ts">
const { t } = useI18n()

const facts = [
  { key: 'hero.facts.experience' },
  { key: 'hero.facts.format' },
  { key: 'hero.facts.stack' },
] as const
</script>

<template>
  <section class="hero">
    <div class="hero__bg" aria-hidden="true" />
    <div class="hero__inner">
      <div class="hero__content">
        <p class="hero__eyebrow">{{ t('hero.welcome') }}</p>
        <h1 class="hero__name">{{ t('brand.name') }}</h1>
        <p class="hero__role">
          <span class="hero__accent">{{ t('hero.roleAccent') }}</span>
          {{ t('hero.roleRest') }}
        </p>
        <p class="hero__tagline">{{ t('hero.tagline') }}</p>

        <ul class="hero__facts">
          <li v-for="f in facts" :key="f.key" class="hero__chip">{{ t(f.key) }}</li>
        </ul>

        <div class="hero__cta">
          <AppButton href="#contact" variant="primary">{{ t('hero.ctaContact') }}</AppButton>
          <AppButton href="#projects" variant="ghost">{{ t('hero.ctaProjects') }}</AppButton>
        </div>
      </div>

      <div class="hero__photo">
        <picture>
          <source media="(max-width: 767px)" srcset="/images/mobile/rihard-425.webp" />
          <img
            class="hero__img"
            src="/images/rihard.webp"
            :alt="t('brand.name')"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </picture>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.hero {
  position: relative;
  overflow: hidden;

  &__bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    background:
      radial-gradient(
        60rem 40rem at 75% 10%,
        color-mix(in srgb, #{$green} 16%, transparent),
        transparent 70%
      ),
      radial-gradient(
        50rem 40rem at 10% 90%,
        color-mix(in srgb, #{$blue} 10%, transparent),
        transparent 70%
      );
    mask-image: linear-gradient(to bottom, #000 70%, transparent);
  }

  &__inner {
    @include container($container-wide);
    position: relative;
    z-index: 1;
    min-height: calc(100vh - #{$header-height});
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 6rem;
    padding-block: 6rem;

    @include respond-to(laptop) {
      grid-template-columns: 1fr;
      gap: 4rem;
      text-align: center;
    }
  }

  &__eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.32em;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 1.6rem;
  }

  &__name {
    font-size: clamp(3.6rem, 6vw, 6.4rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    color: var(--text-color);
  }

  &__role {
    margin-top: 0.8rem;
    font-size: clamp(2rem, 3vw, 3.2rem);
    font-weight: 700;
    color: var(--text-muted);
  }

  &__accent {
    color: var(--accent);
  }

  &__tagline {
    margin-top: 2.4rem;
    max-width: 52ch;
    font-size: 1.8rem;
    color: var(--text-muted);

    @include respond-to(laptop) {
      margin-inline: auto;
    }
  }

  &__facts {
    margin-top: 2.8rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;

    @include respond-to(laptop) {
      justify-content: center;
    }
  }

  &__chip {
    padding: 0.8rem 1.4rem;
    border-radius: 10rem;
    border: 1px solid var(--border);
    background-color: var(--surface);
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--text-color);
  }

  &__cta {
    margin-top: 3.2rem;
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;

    @include respond-to(laptop) {
      justify-content: center;
    }
  }

  &__photo {
    position: relative;
    justify-self: center;
    width: min(40rem, 100%);
    aspect-ratio: 4 / 5;
    border-radius: 2.4rem;
    padding: 1rem;
    background: linear-gradient(
      160deg,
      color-mix(in srgb, #{$green} 40%, transparent),
      color-mix(in srgb, #{$blue} 30%, transparent)
    );

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      box-shadow: 0 40px 80px -40px color-mix(in srgb, #{$green} 60%, transparent);
      z-index: -1;
    }

    picture {
      display: contents;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    border-radius: 1.8rem;
  }
}
</style>
