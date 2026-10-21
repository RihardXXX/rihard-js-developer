export interface CourseTextBlock {
  type: 'text'
  ru: string
  en: string
}

export interface CourseCodeBlock {
  type: 'code'
  /** illustration, not runnable JS; the syntax test skips it */
  pseudo?: true
  /** JavaScript snippet per locale: same code, only comments and explanatory strings differ */
  code: { ru: string; en: string }
}

export type CourseBlock = CourseTextBlock | CourseCodeBlock

export interface Lesson {
  /** anchor slug, e.g. "pure-functions" */
  slug: string
  title: { ru: string; en: string }
  blocks: CourseBlock[]
}
