<script setup lang="ts">
const { t } = useI18n()
const year = 2026

const socials = [
  { label: 'GitHub', href: 'https://github.com/RihardXXX' },
  { label: 'Telegram', href: 'https://t.me/FrontendDeveloper05' },
  { label: 'VKontakte', href: 'https://vk.com/github05' },
]
</script>

<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__brand">
        <span class="footer__mark">RA</span>
        <p class="footer__tagline">{{ t('footer.tagline') }}</p>
      </div>

      <nav class="footer__socials" :aria-label="t('footer.socials')">
        <a
          v-for="s in socials"
          :key="s.label"
          :href="s.href"
          class="footer__social"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ s.label }}
        </a>
      </nav>

      <div class="footer__meta">
        <a class="footer__mail" href="mailto:yusupa.akaeva@yandex.ru">yusupa.akaeva@yandex.ru</a>
        <p class="footer__copy">© {{ year }} Rihard Alikhanov · {{ t('footer.built') }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  border-top: 1px solid var(--border);
  background-color: var(--surface);

  &__inner {
    @include container($container-wide);
    padding-block: 4rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 2.4rem;
  }

  &__brand {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  &__mark {
    display: grid;
    place-items: center;
    width: 3.6rem;
    height: 3.6rem;
    border-radius: 0.9rem;
    font-size: 1.4rem;
    font-weight: 800;
    color: $white;
    background: linear-gradient(135deg, $green, $green-bright);
  }

  &__tagline {
    font-size: 1.4rem;
    color: var(--text-muted);
    max-width: 28rem;
  }

  &__socials {
    display: flex;
    gap: 2rem;
  }

  &__social {
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--text-muted);
    transition: color $transition;

    &:hover {
      color: var(--accent);
    }
  }

  &__meta {
    text-align: right;

    @include respond-to(mobile) {
      text-align: left;
    }
  }

  &__mail {
    font-size: 1.5rem;
    color: var(--text-color);
    transition: color $transition;

    &:hover {
      color: var(--accent);
    }
  }

  &__copy {
    margin-top: 0.6rem;
    font-size: 1.3rem;
    color: var(--text-muted);
  }
}
</style>
