<script setup lang="ts">
import { certificates } from '~/data/certificates'

const { t } = useI18n()
const active = ref<string | null>(null)

const open = (name: string) => {
  active.value = name
}
const close = () => {
  active.value = null
}
</script>

<template>
  <AppSection id="certificates" surface>
    <SectionHeader
      :eyebrow="t('certificates.eyebrow')"
      :title="t('certificates.title')"
      :subtitle="t('certificates.subtitle', { count: certificates.length })"
    />

    <ul class="certs">
      <li v-for="cert in certificates" :key="cert">
        <button class="cert" type="button" @click="open(cert)">
          <picture>
            <source
              media="(max-width: 767px)"
              :srcset="`/images/certificates/mobile/${cert}-425.webp`"
            />
            <img
              class="cert__img"
              :src="`/images/certificates/${cert}.webp`"
              :alt="t('certificates.alt')"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </button>
      </li>
    </ul>

    <ClientOnly>
      <Teleport to="body">
        <Transition name="lb">
          <div v-if="active" class="lightbox" role="dialog" aria-modal="true" @click="close">
            <img
              class="lightbox__img"
              :src="`/images/certificates/${active}.webp`"
              :alt="t('certificates.alt')"
            />
            <button class="lightbox__close" type="button" :aria-label="t('a11y.close')" @click="close">
              ×
            </button>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </AppSection>
</template>

<style scoped lang="scss">
.certs {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  gap: 1.6rem;

  @include respond-to(mobile) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
}

.cert {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 1rem;
  overflow: hidden;
  border: 1px solid var(--border);
  background-color: var(--bg);
  cursor: zoom-in;
  transition:
    transform $transition,
    border-color $transition;

  &:hover {
    transform: translateY(-3px);
    border-color: var(--accent);

    .cert__img {
      transform: scale(1.05);
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s $apple-cubic;
  }
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 4rem;
  background-color: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(4px);
  cursor: zoom-out;

  &__img {
    max-width: min(92vw, 110rem);
    max-height: 88vh;
    object-fit: contain;
    border-radius: 0.8rem;
    box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.8);
  }

  &__close {
    position: fixed;
    top: 2rem;
    right: 2.4rem;
    width: 4.8rem;
    height: 4.8rem;
    font-size: 3.2rem;
    line-height: 1;
    color: $white;
    border-radius: 50%;
    transition: background-color $transition;

    &:hover {
      background-color: rgba(255, 255, 255, 0.12);
    }
  }
}

.lb-enter-active,
.lb-leave-active {
  transition: opacity 0.25s ease;
}
.lb-enter-from,
.lb-leave-to {
  opacity: 0;
}
</style>
