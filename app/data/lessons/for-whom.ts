import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'for-whom',
  title: { ru: "Для кого этот курс", en: "Who this course is for" },
  blocks: [
    {
      type: 'text',
      ru: "Этот курс в первую очередь написан для разработчиков с опытом разработки в JS, которые хотят расширить свой кругозор и писать более надежный, декларативный и сопровождаемый код в функциональном стиле.",
      en: "This course is written primarily for developers with JS experience who want to broaden their horizons and write more reliable, declarative, and maintainable code in a functional style.",
    },
  ],
}

export default lesson
