import { test } from 'node:test'
import assert from 'node:assert/strict'
import module from 'node:module'
import { fillLocale, pickLocale } from '../app/utils/course-locale.ts'

// Уроки лежат в app/data/lessons/*.ts, в course.ts импорты без расширения: дописываем .ts.
// Типы Node стирает сам.
module.registerHooks({
  resolve: (specifier, context, next) =>
    next(/^\.\.?\//.test(specifier) && !/\.\w+$/.test(specifier) ? `${specifier}.ts` : specifier, context),
})
const course = await import('../app/data/course.ts')
// Разделы страницы курса: вводные без номера и нумерованные уроки.
const sections = [...(course.introSections ?? []), ...course.lessons]

// Все виды блоков и полей урока: данные курса могут ещё не содержать списков, таблиц и упражнений.
const SAMPLE = [
  {
    slug: 'sample',
    title: { ru: 'Пример', en: 'Sample' },
    blocks: [
      { type: 'text', ru: 'абзац', en: 'paragraph' },
      { type: 'heading', ru: 'подзаголовок', en: 'subheading' },
      { type: 'list', ordered: true, items: [{ ru: 'раз', en: 'one' }, { ru: 'два', en: 'two' }] },
      {
        type: 'table',
        caption: { ru: 'Таблица', en: 'Table' },
        columns: [{ ru: 'Критерий', en: 'Criterion' }, { ru: 'Значение', en: 'Value' }],
        rows: [[{ ru: 'Бюджет', en: 'Budget' }, { ru: 'мал', en: 'small' }]],
      },
      { type: 'code', code: { ru: '// код', en: '// code' } },
      { type: 'code', pseudo: true, code: { ru: 'a -> b', en: 'a -> b' } },
      { type: 'code', noRun: 'dom', code: { ru: 'document // дом', en: 'document // dom' } },
    ],
    goal: { ru: 'Понять', en: 'Understand' },
    summary: [{ ru: 'главное', en: 'key point' }],
    exercises: [
      {
        task: { ru: 'условие', en: 'task' },
        starter: { ru: '// ваш код', en: '// your code' },
        solution: { ru: 'console.log(1) // решение', en: 'console.log(1) // solution' },
        expected: { ru: '1', en: '1' },
      },
    ],
  },
]

const isPair = (value) => typeof value.ru === 'string' && typeof value.en === 'string'

// Обходит исходник и результат параллельно: у пары ru/en строка своей локали та же, чужая равна
// otherOf(пара) (пустая для pickLocale), остальное (type, slug, pseudo, noRun, ordered, длины массивов)
// совпадает. Возвращает список расхождений.
const diff = (source, picked, locale, otherOf = () => '', path = '') => {
  const other = locale === 'ru' ? 'en' : 'ru'
  if (Array.isArray(source)) {
    if (!Array.isArray(picked) || picked.length !== source.length) return [`${path}: длина массива изменилась`]
    return source.flatMap((item, i) => diff(item, picked[i], locale, otherOf, `${path}[${i}]`))
  }
  if (typeof source !== 'object' || source === null) {
    return Object.is(source, picked) ? [] : [`${path}: ${JSON.stringify(picked)} вместо ${JSON.stringify(source)}`]
  }
  if (typeof picked !== 'object' || picked === null) return [`${path}: объект пропал`]
  const keys = Object.keys(source).sort()
  if (JSON.stringify(Object.keys(picked).sort()) !== JSON.stringify(keys)) return [`${path}: набор полей изменился`]
  if (isPair(source)) {
    return [
      ...(picked[locale] === source[locale] ? [] : [`${path}.${locale}: текст своей локали изменился`]),
      ...(picked[other] === otherOf(source) ? [] : [`${path}.${other}: ${JSON.stringify(picked[other])} вместо ${JSON.stringify(otherOf(source))}`]),
      ...keys
        .filter((k) => k !== 'ru' && k !== 'en')
        .flatMap((k) => diff(source[k], picked[k], locale, otherOf, `${path}.${k}`)),
    ]
  }
  return keys.flatMap((k) => diff(source[k], picked[k], locale, otherOf, `${path}.${k}`))
}

const countPairs = (value) =>
  Array.isArray(value)
    ? value.reduce((sum, item) => sum + countPairs(item), 0)
    : typeof value === 'object' && value !== null
      ? (isPair(value) ? 1 : 0) + Object.values(value).reduce((sum, item) => sum + countPairs(item), 0)
      : 0

test('в данных курса есть пары ru/en (иначе проверки ниже ничего не значат)', () => {
  assert.ok(sections.length > 0, 'в course.ts нет разделов')
  assert.ok(countPairs(sections) > sections.length, 'в разделах курса не нашлось текстов ru/en')
})

for (const [name, data] of [
  ['разделы курса', sections],
  ['образец со всеми видами блоков', SAMPLE],
]) {
  for (const locale of ['ru', 'en']) {
    test(`pickLocale(${name}, '${locale}'): чужая локаль пустая, своя и остальное как было`, () => {
      assert.deepEqual(diff(data, pickLocale(data, locale), locale), [])
    })

    test(`pickLocale(${name}, '${locale}'): исходные данные не меняются`, () => {
      const before = structuredClone(data)
      pickLocale(data, locale)
      assert.deepEqual(data, before, 'pickLocale испортил данные, из которых собирается страница другой локали')
    })

    // Пока язык переключается, старая страница на миг рисуется в новой локали: там должны быть её тексты, а не пустота.
    test(`fillLocale(pickLocale(${name}, '${locale}')): чужая локаль повторяет свою, остальное как было`, () => {
      const picked = pickLocale(data, locale)
      const before = structuredClone(picked)
      assert.deepEqual(diff(data, fillLocale(picked, locale), locale, (pair) => pair[locale]), [])
      assert.deepEqual(picked, before, 'fillLocale испортил данные из payload')
    })
  }
}
