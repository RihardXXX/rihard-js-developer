// Reading progress of the course, kept in the reader's browser under PROGRESS_KEY. Plain erasable
// TS with no `~` imports: scripts/course-progress.test.mjs imports this file straight into Node.

export const PROGRESS_KEY = 'course-progress'

export interface CourseProgress {
  v: 1
  /** slug -> ISO date when the lesson was marked as read */
  read: Record<string, string>
  /** the lesson opened last */
  last?: string
}

/** where "Continue" leads; null when there is nothing left to read */
export type Resume = { kind: 'start' | 'continue'; slug: string } | null

export const emptyProgress = (): CourseProgress => ({ v: 1, read: {} })

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const isRead = (p: CourseProgress, slug: string) => Object.hasOwn(p.read, slug)

// The stored string comes from the browser and may be anything: not JSON, another version or
// another shape counts as no progress, a mark whose date is not a string is dropped.
export const parseProgress = (raw: string | null): CourseProgress => {
  let value: unknown
  try {
    value = JSON.parse(raw ?? '')
  } catch {
    return emptyProgress()
  }
  if (!isRecord(value) || value.v !== 1 || !isRecord(value.read)) return emptyProgress()
  // fromEntries defines own keys: a "__proto__" slug cannot replace the prototype
  const read = Object.fromEntries(
    Object.entries(value.read).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
  )
  return typeof value.last === 'string' ? { v: 1, read, last: value.last } : { v: 1, read }
}

/** a copy with the lesson marked as read at `at`, or unmarked when `at` is null */
export const withRead = (p: CourseProgress, slug: string, at: string | null): CourseProgress => ({
  ...p,
  read:
    at === null
      ? Object.fromEntries(Object.entries(p.read).filter(([key]) => key !== slug))
      : { ...p.read, [slug]: at },
})

/** a copy with the lesson remembered as opened last */
export const withLast = (p: CourseProgress, slug: string): CourseProgress => ({ ...p, last: slug })

/** read lessons of the course: marks of removed or unknown slugs do not count */
export const readCount = (p: CourseProgress, slugs: readonly string[]): number =>
  slugs.filter((slug) => isRead(p, slug)).length

/**
 * Where to go on reading, in the order of `slugs`:
 * - nothing of the course read and no known last lesson: start with the first one;
 * - the last opened lesson is not read: back to it;
 * - otherwise the first unread lesson after the last one, then from the beginning;
 * - every lesson read: null.
 */
export const resumeFrom = (p: CourseProgress, slugs: readonly string[]): Resume => {
  const unread = slugs.filter((slug) => !isRead(p, slug))
  const first = unread[0]
  if (first === undefined) return null
  const last = p.last === undefined ? -1 : slugs.indexOf(p.last)
  if (last === -1) return { kind: unread.length === slugs.length ? 'start' : 'continue', slug: first }
  return { kind: 'continue', slug: slugs.slice(last).find((slug) => !isRead(p, slug)) ?? first }
}
