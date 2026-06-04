<script setup lang="ts">
const { t } = useI18n()

const stats = [
  { value: '5+', key: 'about.stats.years' },
  { value: '3', key: 'about.stats.companies' },
  { value: '8+', key: 'about.stats.projects' },
] as const

const strengths = [
  'about.strengths.effect',
  'about.strengths.frontend',
  'about.strengths.fullstack',
  'about.strengths.migrate',
  'about.strengths.perf',
] as const
</script>

<template>
  <AppSection id="about">
    <div class="about">
      <div class="about__main">
        <SectionHeader :eyebrow="t('about.eyebrow')" :title="t('about.title')" />
        <p class="about__lead">{{ t('about.lead') }}</p>

        <ul class="about__strengths">
          <li v-for="s in strengths" :key="s" class="about__strength">
            <span class="about__check" aria-hidden="true">✓</span>
            {{ t(s) }}
          </li>
        </ul>
      </div>

      <aside class="about__stats">
        <div v-for="s in stats" :key="s.key" class="stat">
          <span class="stat__value">{{ s.value }}</span>
          <span class="stat__label">{{ t(s.key) }}</span>
        </div>
      </aside>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.about {
  display: grid;
  grid-template-columns: 1.4fr 0.6fr;
  gap: 6rem;
  align-items: start;

  @include respond-to(laptop) {
    grid-template-columns: 1fr;
    gap: 4rem;
  }

  &__lead {
    font-size: 1.9rem;
    line-height: 1.7;
    color: var(--text-muted);
    max-width: 64ch;
  }

  &__strengths {
    margin-top: 3.2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.6rem;

    @include respond-to(mobile) {
      grid-template-columns: 1fr;
    }
  }

  &__strength {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    font-size: 1.6rem;
    color: var(--text-color);
  }

  &__check {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 2.4rem;
    height: 2.4rem;
    border-radius: 50%;
    font-size: 1.3rem;
    color: var(--accent);
    background-color: color-mix(in srgb, #{$green} 14%, transparent);
  }

  &__stats {
    display: grid;
    gap: 1.6rem;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 2.4rem;
  border: 1px solid var(--border);
  border-radius: 1.6rem;
  background-color: var(--surface);

  &__value {
    font-size: 3.6rem;
    font-weight: 800;
    color: var(--accent);
    line-height: 1;
  }

  &__label {
    font-size: 1.5rem;
    color: var(--text-muted);
  }
}
</style>
