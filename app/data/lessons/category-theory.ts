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
      ru: "Категория в рамках программирования — это совокупность объектов (типы данных: Array, Object, Number, String ...) и морфизмов между ними (стрелок, то есть функций). Морфизмы f :: a -> b и g :: b -> c можно скомпоновать в g . f :: a -> c (читается «g после f»: сначала f, затем g). Для композиции выполняются два закона. Тождество: у каждого объекта есть тождественный морфизм id :: a -> a, и композиция с ним ничего не меняет (f . id = f, id . f = f). Ассоциативность: h . (g . f) = (h . g) . f, то есть неважно, как расставить скобки.",
      en: "A category, in the context of programming, is a collection of objects (data types: Array, Object, Number, String, ...) and morphisms between them (arrows, that is, functions). Morphisms f :: a -> b and g :: b -> c can be composed into g . f :: a -> c (read as \"g after f\": first f, then g). Composition obeys two laws. Identity: every object has an identity morphism id :: a -> a, and composing with it changes nothing (f . id = f, id . f = f). Associativity: h . (g . f) = (h . g) . f, so it does not matter where the parentheses go.",
    },
    {
      type: 'code',
      code: {
        ru: `//  Пример
// f :: a -> b
// g :: b -> c
// g . f :: a -> c

// a, b, c — это объекты (типы)
// f, g — морфизмы (стрелки), то есть функции
// g . f — композиция: сначала f, затем g

// Практический пример

// concatX :: Number -> String
const concatX = num => \`\${num} X\`

// toArray:: a -> [a]
const toArray = word => [word]

// compose :: (b -> c, a -> b) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // строку превращаем в массив
  concatX // добавляем X и превращаем в строку
  )

// start
pipeline(5) // ['5 X'] результат

// Что же тут произошло
// входной аргумент 5 — это "a", тип Number
// конкатенировали букву X и получили '5 X' — это "b", тип String
// добавили в массив и получили ['5 X'] — это "c", тип Array
// concatX :: Number -> String — морфизм f :: a -> b
// toArray :: String -> [String] — морфизм g :: b -> c
// pipeline = compose(toArray, concatX) :: Number -> [String] — композиция g . f :: a -> c`,
        en: `//  Example
// f :: a -> b
// g :: b -> c
// g . f :: a -> c

// a, b, c are objects (types)
// f, g are morphisms (arrows), that is, functions
// g . f is composition: first f, then g

// A practical example

// concatX :: Number -> String
const concatX = num => \`\${num} X\`

// toArray:: a -> [a]
const toArray = word => [word]

// compose :: (b -> c, a -> b) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // turn the string into an array
  concatX // append X and turn it into a string
  )

// start
pipeline(5) // ['5 X'] is the result

// So what happened here
// the input argument 5 is "a", of type Number
// we concatenated the letter X and got '5 X', which is "b", of type String
// we put it into an array and got ['5 X'], which is "c", of type Array
// concatX :: Number -> String is the morphism f :: a -> b
// toArray :: String -> [String] is the morphism g :: b -> c
// pipeline = compose(toArray, concatX) :: Number -> [String] is the composition g . f :: a -> c`,
      },
    },
    {
      type: 'text',
      ru: "А давайте мы с вами пофантазируем, чтобы глубже понять теорию категорий. Используем аналогии из окружающего нас мира.",
      en: "Let's use our imagination to understand category theory more deeply. We will draw analogies from the world around us.",
    },
    {
      type: 'text',
      ru: "Мы используем природу и напишем псевдокод, иллюстрирующий идеи теории категорий.",
      en: "We will use nature and write pseudocode that illustrates the ideas of category theory.",
    },
    {
      type: 'code',
      pseudo: true,
      code: {
        ru: `//  Пример
твердое -> жидкое -> газообразное
лёд -> вода -> пар

лёд, вода, пар // это объекты
-> // морфизмы: процессы над ними (нагрев и т. п.)
превратитьВПар . превратитьВВоду :: лёд -> пар // композиция процессов

// Практический пример

// превратитьВВоду :: лёд -> вода
const превратитьВВоду = лёд => (держим в комнатной температуре, вода)

// превратитьВПар:: вода -> пар
const превратитьВПар = вода=> (производим сильный нагрев, пар)

// композицияПроцессов :: (b -> c, a -> b) -> a -> c
const композицияПроцессов = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = композицияПроцессов(
  превратитьВПар,
  превратитьВВоду
  )

// start
pipeline(лёд) // пар результат`,
        en: `//  Example
solid -> liquid -> gas
ice -> water -> steam

ice, water, steam // these are objects
-> // morphisms: processes applied to them (heating and so on)
turnIntoSteam . turnIntoWater :: ice -> steam // composition of processes

// A practical example

// turnIntoWater :: ice -> water
const turnIntoWater = ice => (keep at room temperature, water)

// turnIntoSteam:: water -> steam
const turnIntoSteam = water=> (apply strong heat, steam)

// composeProcesses :: (b -> c, a -> b) -> a -> c
const composeProcesses = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = composeProcesses(
  turnIntoSteam,
  turnIntoWater
  )

// start
pipeline(ice) // steam is the result`,
      },
    },
  ],
}

export default lesson
