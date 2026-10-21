<script setup lang="ts">
const props = defineProps<{ slug: string }>()
const { t } = useI18n()
// Progress lives in this browser only: nothing in the prerendered HTML, so hydration matches.
const mounted = useMounted()
const { isRead, setRead, visit } = useCourseProgress()
// The button's name is the same in both states: the state is aria-pressed and the box, the hint
// (title) tells what a click does.
const read = computed(() => isRead(props.slug))

onMounted(() => visit(props.slug))

// A mark taken off by hand stays off until the reader leaves the page.
let unmarkedByHand = false
const toggle = () => {
  if (read.value) unmarkedByHand = true
  setRead(props.slug, !read.value)
}

// The toggle stands at the end of the lesson: the lesson counts as read once the reader has
// scrolled down to it and it has stayed on screen for a second; a smooth scroll of the page
// passes it faster. scrollY > 0 keeps a short lesson on a tall screen unmarked on arrival. The
// reader's own wheel, touch, key or pointer on this page keeps "Next lesson" from marking the new
// lesson: it mounts at the previous page's scroll position, often with its end on screen, and only
// then scrolls smoothly to the top. A jump the page makes itself ("Open in playground", "Back to
// example" and other #anchors) takes that back: what comes on screen after it is not the reader's.
const button = useTemplateRef<HTMLButtonElement>('button')
const onScreen = shallowRef(false)
const scrolledByReader = shallowRef(false)
useIntersectionObserver(button, ([entry]) => {
  onScreen.value = entry?.isIntersecting ?? false
})
const onReader = () => {
  if (mounted.value) scrolledByReader.value = true
}
useEventListener(['wheel', 'touchmove', 'keydown', 'pointerdown'], onReader, { passive: true })
const onJump = () => {
  scrolledByReader.value = false
}
useEventListener('hashchange', onJump)
watch(usePlaygroundBridge().request, onJump)
const { start, stop } = useTimeoutFn(
  () => {
    if (window.scrollY > 0 && !unmarkedByHand && !read.value) setRead(props.slug, true)
  },
  1000,
  { immediate: false },
)
watch(
  () => onScreen.value && scrolledByReader.value,
  (reached) => (reached ? start() : stop()),
)
</script>

<template>
  <button
    v-if="mounted"
    ref="button"
    type="button"
    class="read-toggle"
    :aria-pressed="read"
    :title="read ? t('course.unmarkRead') : t('course.markRead')"
    @click="toggle"
  >
    <span class="read-toggle__box" aria-hidden="true">
      <svg
        v-if="read"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    </span>
    {{ t('course.read') }}
  </button>
</template>

<style scoped lang="scss">
.read-toggle {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  max-width: 100%;
  padding: 1rem 1.8rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background-color: var(--surface);
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
  text-align: left;
  color: var(--text-color);
  transition:
    border-color $transition,
    background-color $transition;

  &:hover {
    border-color: var(--accent);
  }

  &[aria-pressed='true'] {
    border-color: var(--accent);
    background-color: color-mix(in srgb, var(--accent) 10%, var(--surface));
  }

  // a finger-sized target on touch screens
  @media (pointer: coarse) {
    min-height: 4.4rem;
  }

  &__box {
    display: grid;
    place-items: center;
    flex: none;
    width: 2rem;
    height: 2rem;
    border: 2px solid var(--text-muted);
    border-radius: 0.5rem;
    color: $white;
    transition:
      border-color $transition,
      background-color $transition;

    svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  }

  &[aria-pressed='true'] &__box {
    border-color: var(--accent);
    background-color: var(--accent);
  }
}
</style>
