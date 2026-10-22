<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()
const localePath = useLocalePath()
// app.vue is not rendered on the error page, so the theme state is synced here.
const { init } = useTheme()
onMounted(init)

const notFound = computed(() => props.error.status === 404)
const title = computed(() => t(notFound.value ? 'error.notFoundTitle' : 'error.failedTitle'))
const text = computed(() => t(notFound.value ? 'error.notFoundText' : 'error.failedText'))

// The titleTemplate of app.vue does not apply here either: the brand is appended the same way.
useHead({ title: () => `${title.value} · ${t('brand.name')}` })
// On an unknown route the error is set before mount: the head render it starts misses this page
// and then marks the head clean, so the title above never reaches the DOM. Render the head again.
const head = injectHead()
onNuxtReady(() => head.invalidate())
</script>

<template>
  <NuxtLayout>
    <AppSection>
      <div class="error">
        <h1 class="error__title">{{ title }}</h1>
        <p class="error__text">{{ text }}</p>
        <div class="error__actions">
          <AppButton :to="localePath('/')">{{ t('error.home') }}</AppButton>
          <AppButton v-if="notFound" :to="localePath('/course/')" variant="ghost">{{ t('error.course') }}</AppButton>
        </div>
      </div>
    </AppSection>
  </NuxtLayout>
</template>

<style scoped lang="scss">
.error {
  max-width: 64rem;

  &__title {
    font-size: clamp(2.6rem, 3.5vw, 3.6rem);
    font-weight: 800;
    color: var(--text-color);
  }

  &__text {
    margin-top: 1.6rem;
    font-size: 1.7rem;
    line-height: 1.65;
    color: var(--text-muted);
  }

  &__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1.2rem;
    margin-top: 3.2rem;
  }
}
</style>
