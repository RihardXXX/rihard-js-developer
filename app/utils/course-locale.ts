// Course data for one locale. Plain erasable TS with no `~` imports:
// scripts/course-locale.test.mjs imports this file straight into Node.

export type CourseLocale = 'ru' | 'en'

const isLocalized = (value: object): value is { ru: string; en: string } =>
  typeof (value as { ru?: unknown }).ru === 'string' && typeof (value as { en?: unknown }).en === 'string'

const pick = (value: unknown, locale: CourseLocale): unknown => {
  if (Array.isArray(value)) return value.map((item: unknown) => pick(item, locale))
  if (typeof value !== 'object' || value === null) return value
  const copy: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(value)) copy[key] = pick(item, locale)
  if (isLocalized(value)) copy[locale === 'ru' ? 'en' : 'ru'] = ''
  return copy
}

// A copy where every { ru, en } pair keeps only `locale`; the other string becomes ''.
// The page payload then carries one language, while types and `isEn ? x.en : x.ru` stay as they are.
export const pickLocale = <T>(value: T, locale: CourseLocale): T => pick(value, locale) as T
