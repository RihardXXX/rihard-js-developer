import type { CourseSection } from '~/data/course-types'

const lesson: CourseSection = {
  slug: 'not-for-whom',
  title: { ru: "Кому этот курс не подойдет", en: "Who this course is not for" },
  blocks: [
    {
      type: 'text',
      ru: "Этот курс не подойдет начинающим разработчикам, которые только постигают азы разработки на JS.",
      en: "This course is not suitable for beginner developers who are only just learning the basics of JS development.",
    },
  ],
}

export default lesson
