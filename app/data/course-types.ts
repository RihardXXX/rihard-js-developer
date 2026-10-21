export interface LocalizedText {
  ru: string
  en: string
}

export interface CourseTextBlock {
  type: 'text'
  ru: string
  en: string
}

/** subheading inside a lesson, rendered as h4 */
export interface CourseHeadingBlock {
  type: 'heading'
  ru: string
  en: string
}

export interface CourseListBlock {
  type: 'list'
  ordered: boolean
  items: LocalizedText[]
}

export interface CourseTableBlock {
  type: 'table'
  /** <caption>, also the accessible name of the table */
  caption: LocalizedText
  /** <th scope="col">; the first one heads the column of row names */
  columns: LocalizedText[]
  /** [0] is <th scope="row">, the rest are <td>; length equals columns.length */
  rows: LocalizedText[][]
}

/** why valid JS cannot run in the playground as is */
export type CourseNoRunReason = 'dom' | 'network' | 'previous-block'

export interface CourseCodeBlock {
  type: 'code'
  /** illustration, not runnable JS; the syntax test skips it */
  pseudo?: true
  /** needs the DOM, the network or names from a previous example: no "Open in playground" */
  noRun?: CourseNoRunReason
  /** JavaScript snippet per locale: same code, only comments and explanatory strings differ */
  code: { ru: string; en: string }
}

export type CourseBlock =
  | CourseTextBlock
  | CourseHeadingBlock
  | CourseListBlock
  | CourseTableBlock
  | CourseCodeBlock

export interface CourseExercise {
  task: LocalizedText
  /** starter code, opens in the playground */
  starter?: LocalizedText
  /** solution code, run by the test */
  solution: LocalizedText
  /** playground output of the solution, lines joined with \n */
  expected: LocalizedText
}

/** intro section: no number, goal, key points or exercises */
export interface CourseSection {
  /** anchor slug, e.g. "pure-functions" */
  slug: string
  title: { ru: string; en: string }
  blocks: CourseBlock[]
}

export interface Lesson extends CourseSection {
  /** meta description and the line under the title in the contents: up to 160 chars, unique */
  description: LocalizedText
  /** 1–2 sentences */
  goal: LocalizedText
  /** key points, 2–5 items */
  summary: LocalizedText[]
  /** 1–2 exercises */
  exercises: CourseExercise[]
}

/** a lesson in the contents: no blocks, so the payload of the list stays small */
export type LessonEntry = Pick<Lesson, 'slug' | 'title' | 'description'>

/** a neighbour on the lesson page */
export type LessonLink = Pick<Lesson, 'slug' | 'title'>
