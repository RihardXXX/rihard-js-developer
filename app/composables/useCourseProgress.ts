import { PROGRESS_KEY, emptyProgress, parseProgress, withLast, withRead } from '~/utils/course-progress'
import type { CourseProgress } from '~/utils/course-progress'

// Reading progress in localStorage. The value is read when the first caller mounts (initOnMounted):
// during hydration the state is empty, as on the server, and the progress components render
// nothing before mount anyway. No key, garbage or another version read as no progress; reset
// removes the key. Other tabs pick changes up through the storage event.
const courseProgress = () => {
  const stored = useLocalStorage<CourseProgress | null>(PROGRESS_KEY, null, {
    initOnMounted: true,
    serializer: { read: parseProgress, write: (value) => JSON.stringify(value) },
  })
  const progress = computed(() => stored.value ?? emptyProgress())

  const isRead = (slug: string) => Object.hasOwn(progress.value.read, slug)
  const setRead = (slug: string, read: boolean) => {
    stored.value = withRead(progress.value, slug, read ? new Date().toISOString() : null)
  }
  const visit = (slug: string) => {
    if (progress.value.last !== slug) stored.value = withLast(progress.value, slug)
  }
  const reset = () => {
    stored.value = null
  }

  return { progress, isRead, setRead, visit, reset }
}

// One state per document, so the summary, badges and toggles agree. Shared on the client only:
// on the server every call gets its own state and requests never see each other's progress.
export const useCourseProgress = import.meta.client ? createSharedComposable(courseProgress) : courseProgress
