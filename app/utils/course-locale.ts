// Course data for one locale. Plain erasable TS with no `~` imports:
// scripts/course-locale.test.mjs imports this file straight into Node.

export type CourseLocale = 'ru' | 'en'

interface Localized {
  ru: string
  en: string
}

const isLocalized = (value: object): value is Localized =>
  typeof (value as { ru?: unknown }).ru === 'string' && typeof (value as { en?: unknown }).en === 'string'

// A deep copy where the other locale's string of every { ru, en } pair is `other(pair)`.
const mapOther = (value: unknown, locale: CourseLocale, other: (pair: Localized) => string): unknown => {
  if (Array.isArray(value)) return value.map((item: unknown) => mapOther(item, locale, other))
  if (typeof value !== 'object' || value === null) return value
  const copy: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(value)) copy[key] = mapOther(item, locale, other)
  if (isLocalized(value)) copy[locale === 'ru' ? 'en' : 'ru'] = other(value)
  return copy
}

// A copy where every { ru, en } pair keeps only `locale`; the other string becomes ''.
// The page payload then carries one language, while types and `isEn ? x.en : x.ru` stay as they are.
export const pickLocale = <T>(value: T, locale: CourseLocale): T => mapOther(value, locale, () => '') as T

// A copy where the other string of every pair repeats `locale`: while the language switches, the
// old page renders in the new locale for a moment and shows its own texts instead of empty ones.
export const fillLocale = <T>(value: T, locale: CourseLocale): T => mapOther(value, locale, (pair) => pair[locale]) as T
