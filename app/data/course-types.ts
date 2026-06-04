export interface CourseTextBlock {
  type: 'text'
  ru: string
  en: string
}

export interface CourseCodeBlock {
  type: 'code'
  /** JavaScript snippet, language-agnostic (not translated) */
  code: string
}

export type CourseBlock = CourseTextBlock | CourseCodeBlock

export interface Lesson {
  /** anchor slug, e.g. "pure-functions" */
  slug: string
  title: { ru: string; en: string }
  blocks: CourseBlock[]
}
