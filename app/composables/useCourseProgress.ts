import { PROGRESS_KEY, isOtherVersion, parseProgress, withLast, withRead } from '~/utils/course-progress'
import type { CourseProgress } from '~/utils/course-progress'

// Reading progress in localStorage. The value is read when the first caller mounts (initOnMounted):
// during hydration the state is empty, as on the server, and the progress components render
// nothing before mount anyway. The ref keeps the stored string as is (the default serializer of a
// null default passes it through): useStorage writes what it has read back, and a parsed value
// would replace another version's progress with an empty one. No key, garbage or another version
// read as no progress; another version is never written over; reset removes the key. Other tabs
// pick changes up through the storage event.
const courseProgress = () => {
  const stored = useLocalStorage<string | null>(PROGRESS_KEY, null, { initOnMounted: true })
  const progress = computed(() => parseProgress(stored.value))
  const save = (next: CourseProgress | null) => {
    if (!isOtherVersion(stored.value)) stored.value = next === null ? null : JSON.stringify(next)
  }

  const isRead = (slug: string) => Object.hasOwn(progress.value.read, slug)
  const setRead = (slug: string, read: boolean) => {
    save(withRead(progress.value, slug, read ? new Date().toISOString() : null))
  }
  const visit = (slug: string) => {
    if (progress.value.last !== slug) save(withLast(progress.value, slug))
  }
  const reset = () => {
    save(null)
  }

  return { progress, isRead, setRead, visit, reset }
}

// One state per document, so the summary, badges and toggles agree. Shared on the client only:
// on the server every call gets its own state and requests never see each other's progress.
export const useCourseProgress = import.meta.client ? createSharedComposable(courseProgress) : courseProgress
