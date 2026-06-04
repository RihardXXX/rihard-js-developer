<script setup lang="ts">
import { projects, repos } from '~/data/projects'

const { t } = useI18n()
</script>

<template>
  <AppSection id="projects">
    <SectionHeader
      :eyebrow="t('projects.eyebrow')"
      :title="t('projects.title')"
      :subtitle="t('projects.subtitle')"
    />

    <div class="grid">
      <a
        v-for="p in projects"
        :key="p.slug"
        :href="p.url"
        class="project"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="project__media">
          <picture>
            <source
              media="(max-width: 767px)"
              :srcset="`/images/portfolio/mobile/${p.image}-425.webp`"
            />
            <img
              class="project__img"
              :src="`/images/portfolio/${p.image}.webp`"
              :alt="p.name"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <span class="project__sector">{{ t(p.sectorKey) }}</span>
        </div>
        <div class="project__body">
          <h3 class="project__name">{{ p.name }}</h3>
          <p class="project__desc">{{ t(p.descKey) }}</p>
          <span class="project__link">
            {{ t('projects.viewLive') }}
            <span aria-hidden="true">↗</span>
          </span>
        </div>
      </a>
    </div>

    <h3 class="repos-title">{{ t('projects.reposTitle') }}</h3>
    <div class="repos">
      <a
        v-for="r in repos"
        :key="r.name"
        :href="r.url"
        class="repo"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div class="repo__head">
          <svg class="repo__icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05A9.36 9.36 0 0 1 12 6.84c.85 0 1.71.12 2.51.34 1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.93-2.34 4.79-4.57 5.05.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"
            />
          </svg>
          <span class="repo__tag">{{ r.tag }}</span>
        </div>
        <h4 class="repo__name">{{ r.name }}</h4>
        <p class="repo__desc">{{ t(r.descKey) }}</p>
      </a>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(34rem, 1fr));
  gap: 2.4rem;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.project {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  overflow: hidden;
  background-color: var(--surface);
  transition:
    transform $transition,
    border-color $transition,
    box-shadow $transition;

  &:hover {
    transform: translateY(-4px);
    border-color: var(--accent);
    box-shadow: 0 24px 48px -32px rgba(0, 0, 0, 0.5);

    .project__img {
      transform: scale(1.04);
    }

    .project__link {
      color: var(--accent);
    }
  }

  &__media {
    position: relative;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background-color: var(--bg);
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top center;
    transition: transform 0.5s $apple-cubic;
  }

  &__sector {
    position: absolute;
    top: 1.2rem;
    left: 1.2rem;
    padding: 0.5rem 1rem;
    border-radius: 10rem;
    font-size: 1.2rem;
    font-weight: 600;
    color: $white;
    background-color: color-mix(in srgb, #000 55%, transparent);
    backdrop-filter: blur(6px);
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    padding: 2rem;
    flex: 1;
  }

  &__name {
    font-size: 1.9rem;
    font-weight: 700;
    color: var(--text-color);
  }

  &__desc {
    font-size: 1.45rem;
    line-height: 1.55;
    color: var(--text-muted);
    flex: 1;
  }

  &__link {
    margin-top: 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-color);
    transition: color $transition;
  }
}

.repos-title {
  margin-top: 6.4rem;
  margin-bottom: 2.4rem;
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-color);
}

.repos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr));
  gap: 2rem;

  @include respond-to(mobile) {
    grid-template-columns: 1fr;
  }
}

.repo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.4rem;
  border: 1px solid var(--border);
  border-radius: 1.4rem;
  background-color: var(--surface);
  transition:
    transform $transition,
    border-color $transition;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);
  }

  &__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__icon {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--text-color);
  }

  &__tag {
    font-size: 1.2rem;
    font-weight: 600;
    color: var(--accent);
  }

  &__name {
    font-size: 1.7rem;
    font-weight: 700;
    color: var(--text-color);
    font-family: $mono-font;
  }

  &__desc {
    font-size: 1.45rem;
    line-height: 1.55;
    color: var(--text-muted);
  }
}
</style>
