<script setup lang="ts">
import { skillGroups } from '~/data/skills'

const { t } = useI18n()
</script>

<template>
  <AppSection id="skills" surface>
    <SectionHeader
      :eyebrow="t('skills.eyebrow')"
      :title="t('skills.title')"
      :subtitle="t('skills.subtitle')"
    />

    <div class="spotlight">
      <span class="spotlight__badge" aria-hidden="true">λ</span>
      <p class="spotlight__text">
        <strong class="spotlight__name">Effect-TS</strong>
        <span class="spotlight__tag">{{ t('skills.specialty') }}</span>
        {{ t('skills.effectPitch') }}
      </p>
    </div>

    <div class="skills">
      <div v-for="group in skillGroups" :key="group.titleKey" class="skills__group">
        <h3 class="skills__title">{{ t(group.titleKey) }}</h3>
        <ul class="skills__items">
          <li
            v-for="item in group.items"
            :key="item.label"
            class="skill"
            :class="{ 'skill--featured': item.featured }"
          >
            <img
              v-if="item.icon"
              class="skill__icon"
              :src="`/icons/tech/${item.icon}`"
              :alt="item.label"
              width="26"
              height="26"
              loading="lazy"
              decoding="async"
            />
            <span v-else class="skill__icon skill__icon--mono" aria-hidden="true">λ</span>
            <span class="skill__label">{{ item.label }}</span>
          </li>
        </ul>
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.spotlight {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 4.8rem;
  padding: 2.4rem 2.8rem;
  border-radius: 1.6rem;
  border: 1px solid color-mix(in srgb, #{$green} 40%, var(--border));
  background:
    radial-gradient(40rem 20rem at 0% 0%, color-mix(in srgb, #{$green} 14%, transparent), transparent 70%),
    var(--surface);
  box-shadow: 0 24px 48px -36px color-mix(in srgb, #{$green} 70%, transparent);

  @include respond-to(mobile) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.4rem;
    padding: 2rem;
  }

  &__badge {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 5.6rem;
    height: 5.6rem;
    border-radius: 1.4rem;
    font-size: 3rem;
    font-weight: 700;
    color: $white;
    background: linear-gradient(135deg, $green, $green-bright);
  }

  &__text {
    font-size: 1.7rem;
    line-height: 1.6;
    color: var(--text-muted);
  }

  &__name {
    color: var(--text-color);
    font-weight: 800;
  }

  &__tag {
    display: inline-block;
    margin: 0 0.8rem;
    padding: 0.3rem 0.9rem;
    border-radius: 10rem;
    font-size: 1.2rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent);
    background-color: color-mix(in srgb, #{$green} 14%, transparent);
  }
}

.skills {
  display: grid;
  gap: 4rem;

  &__group {
    display: grid;
    grid-template-columns: 20rem 1fr;
    gap: 2.4rem;
    align-items: start;

    @include respond-to(tablet) {
      grid-template-columns: 1fr;
      gap: 1.6rem;
    }

    & + & {
      padding-top: 4rem;
      border-top: 1px solid var(--border);
    }
  }

  &__title {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-color);
  }

  &__items {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}

.skill {
  display: inline-flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem 1.6rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background-color: var(--bg);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--text-color);
  transition:
    transform $transition,
    border-color $transition;

  &:hover {
    transform: translateY(-2px);
    border-color: var(--accent);
  }

  &__icon {
    width: 2.6rem;
    height: 2.6rem;
    object-fit: contain;

    &--mono {
      display: grid;
      place-items: center;
      border-radius: 0.6rem;
      font-size: 1.6rem;
      font-weight: 700;
      color: $white;
      background: linear-gradient(135deg, $green, $green-bright);
    }
  }

  &--featured {
    border-color: var(--accent);
    background: color-mix(in srgb, #{$green} 8%, var(--bg));
  }
}
</style>
