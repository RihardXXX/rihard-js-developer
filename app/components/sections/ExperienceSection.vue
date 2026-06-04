<script setup lang="ts">
import { jobs } from '~/data/experience'

const { t, tm, rt } = useI18n()
</script>

<template>
  <AppSection id="experience">
    <SectionHeader :eyebrow="t('experience.eyebrow')" :title="t('experience.title')" />

    <ol class="timeline">
      <li v-for="job in jobs" :key="job.key" class="job">
        <div class="job__marker" aria-hidden="true" />
        <div class="job__card">
          <div class="job__head">
            <h3 class="job__role">
              {{ t(`experience.jobs.${job.key}.role`) }}
              <span class="job__company">· {{ job.company }}</span>
            </h3>
            <span class="job__period">{{ job.period }}</span>
          </div>

          <ul class="job__points">
            <li v-for="(point, i) in tm(`experience.jobs.${job.key}.points`)" :key="i">
              {{ rt(point) }}
            </li>
          </ul>

          <ul class="job__stack">
            <li v-for="tech in job.stack" :key="tech" class="job__tech">{{ tech }}</li>
          </ul>
        </div>
      </li>
    </ol>
  </AppSection>
</template>

<style scoped lang="scss">
.timeline {
  display: grid;
  gap: 2.4rem;
}

.job {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2.4rem;

  &__marker {
    position: relative;
    width: 1.6rem;
    height: 1.6rem;
    margin-top: 2.6rem;
    border-radius: 50%;
    background-color: var(--accent);
    flex-shrink: 0;

    &::after {
      content: '';
      position: absolute;
      top: 2.4rem;
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: calc(100% + 2.4rem);
      background-color: var(--border);
    }
  }

  &:last-child &__marker::after {
    display: none;
  }

  &__card {
    padding: 2.4rem 2.8rem;
    border: 1px solid var(--border);
    border-radius: 1.6rem;
    background-color: var(--surface);
  }

  &__head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.8rem 1.6rem;
    margin-bottom: 1.6rem;
  }

  &__role {
    font-size: 1.9rem;
    font-weight: 700;
    color: var(--text-color);
  }

  &__company {
    color: var(--accent);
    font-weight: 600;
  }

  &__period {
    font-size: 1.4rem;
    font-weight: 600;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  &__points {
    display: grid;
    gap: 0.8rem;
    margin-bottom: 2rem;
    padding-left: 1.8rem;
    list-style: disc;

    li {
      font-size: 1.5rem;
      line-height: 1.6;
      color: var(--text-muted);
    }
  }

  &__stack {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  &__tech {
    padding: 0.5rem 1.1rem;
    border-radius: 0.8rem;
    font-size: 1.3rem;
    font-weight: 500;
    color: var(--text-color);
    background-color: var(--bg);
    border: 1px solid var(--border);
  }
}
</style>
