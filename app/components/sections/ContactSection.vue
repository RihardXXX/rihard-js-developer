<script setup lang="ts">
const { t } = useI18n()

const email = 'yusupa.akaeva@yandex.ru'
const socials = [
  { label: 'Telegram', href: 'https://t.me/FrontendDeveloper05' },
  { label: 'GitHub', href: 'https://github.com/RihardXXX' },
  { label: 'VKontakte', href: 'https://vk.com/github05' },
]

const engage = ['contact.engage.fulltime', 'contact.engage.contract', 'contact.engage.freelance'] as const
</script>

<template>
  <AppSection id="contact">
    <div class="contact">
      <p class="contact__eyebrow">{{ t('contact.eyebrow') }}</p>
      <h2 class="contact__title">{{ t('contact.title') }}</h2>
      <p class="contact__text">{{ t('contact.text') }}</p>

      <p class="contact__subhead">{{ t('contact.engageTitle') }}</p>
      <ul class="contact__engage">
        <li v-for="key in engage" :key="key" class="contact__tag">{{ t(key) }}</li>
      </ul>

      <p class="contact__payment">{{ t('contact.payment') }}</p>

      <div class="contact__actions">
        <AppButton :href="`mailto:${email}`" variant="primary">{{ t('contact.writeMe') }}</AppButton>
      </div>

      <ul class="contact__socials">
        <li v-for="s in socials" :key="s.label">
          <a :href="s.href" class="contact__social" target="_blank" rel="noopener noreferrer">
            {{ s.label }}
          </a>
        </li>
      </ul>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.contact {
  max-width: 72rem;
  margin-inline: auto;
  text-align: center;
  padding: 5.6rem 4rem;
  border-radius: 2.4rem;
  border: 1px solid var(--border);
  background:
    radial-gradient(50rem 30rem at 50% 0%, color-mix(in srgb, #{$green} 12%, transparent), transparent 70%),
    var(--surface);

  @include respond-to(mobile) {
    padding: 4rem 2rem;
  }

  &__eyebrow {
    text-transform: uppercase;
    letter-spacing: 0.28em;
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--accent);
    margin-bottom: 1.2rem;
  }

  &__title {
    font-size: clamp(2.8rem, 4vw, 4rem);
    font-weight: 800;
    color: var(--text-color);
  }

  &__text {
    margin: 1.6rem auto 0;
    max-width: 52ch;
    font-size: 1.7rem;
    line-height: 1.6;
    color: var(--text-muted);
  }

  &__subhead {
    margin-top: 3.6rem;
    font-size: 1.3rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: var(--text-muted);
  }

  &__engage {
    margin-top: 1.6rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
  }

  &__tag {
    padding: 0.6rem 1.4rem;
    border-radius: 10rem;
    border: 1px solid var(--border);
    background-color: var(--bg);
    font-size: 1.4rem;
    font-weight: 500;
    color: var(--text-color);
  }

  &__payment {
    margin: 2rem auto 0;
    max-width: 48ch;
    font-size: 1.45rem;
    line-height: 1.5;
    color: var(--text-muted);
  }

  &__actions {
    margin-top: 3.2rem;
  }

  &__socials {
    margin-top: 2.8rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2.4rem;
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
}
</style>
