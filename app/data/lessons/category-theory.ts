import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'category-theory',
  title: {
    ru: "Теория категорий",
    en: "Category theory",
  },
  blocks: [
    {
      type: 'text',
      ru: "Существует тесная связь между функциональным программированием и теорией категорий. В функциональном программировании многие абстракции, законы и принципы взяты из теории категорий.",
      en: "There is a close connection between functional programming and category theory. In functional programming many abstractions, laws and principles are taken from category theory.",
    },
    {
      type: 'text',
      ru: "Что же мы знаем о теории категорий. Мы не будем углубляться в основы и академические термины. Мы постараемся объяснить всё это без академических терминов.",
      en: "So what do we know about category theory? We will not dive into the fundamentals and academic terms. We will try to explain all of this without academic terminology.",
    },
    {
      type: 'text',
      ru: "Теория категорий в рамках программирования — это совокупность абстрактных объектов (любые типы данных Array, Object, Number, String ...) и их морфизмов (стрелок, их отношений, то есть функций), а также законов, по которым они работают (композиция и т. п.).",
      en: "Category theory in the context of programming is a collection of abstract objects (any data types: Array, Object, Number, String, ...) and their morphisms (arrows, the relations between them — that is, functions), as well as the laws by which they operate (composition and so on).",
    },
    {
      type: 'code',
      code: `//  Пример
a -> b -> c

a, b, c // это объекты
-> // это их отношения и процессы над ними
a ... c // процесс композиции

// Практический пример

// concatX :: Number -> String
const concatX = num => \`\${num} X\`

// toArray:: a -> [a]
const toArray = word => [word]

// compose :: (* -> *) -> (* -> *) -> * -> *
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // строку превращаем в массив
  concatX // добавляем X и превращаем в строку
  )

// start
pipeline(5) // ['5 X'] результат

// Что же тут произошло
// мы входной аргумент 5 это "a" тип Number
// конкатенировали букву X и получили '5 X' это "b" тип String
// добавили в массив и получили ['5 X'] это "с" тип Array
// и все это сделали законом композиции
// 5 -> '5 X' -> ['5 X'] это абстрактные объекты (Number, String, Array) их отношение объектов(вызовы функций -> ) по законом композиции
// a -> b -> c`,
    },
    {
      type: 'text',
      ru: "А давайте мы с вами пофантазируем, чтобы глубже понять теорию категорий. Используем аналогии из окружающего нас мира.",
      en: "Let's use our imagination to understand category theory more deeply. We will draw analogies from the world around us.",
    },
    {
      type: 'text',
      ru: "Мы используем природу и напишем псевдокод, реализующий теорию категорий.",
      en: "We will use nature and write pseudocode that implements category theory.",
    },
    {
      type: 'code',
      code: `//  Пример
a -> b -> c
твердое -> жидкое -> газообразное
лёд -> вода -> пар

лёд, вода, пар // это объекты
-> // процессы над ними (нагрев и тп)
a ... c // процесс композиции (упорядоченная совокупность процессов)

// Практический пример

// превратитьВВоду :: лёд -> вода
const превратитьВВоду = лёд => (держим в комнатной температуре, вода)

// превратитьВПар:: вода -> пар
const превратитьВПар = вода=> (производим сильный нагрев, пар)

// композицияПроцессов :: (* -> *) -> (* -> *) -> * -> *
const композицияПроцессов = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = композицияПроцессов(
  превратитьВПар,
  превратитьВВоду
  )

// start
pipeline(лёд) // пар результат`,
    },
  ],
}

export default lesson
