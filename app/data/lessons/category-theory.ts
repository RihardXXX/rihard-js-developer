import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'category-theory',
  title: {
    ru: "Теория категорий",
    en: "Category theory",
  },
  description: {
    ru: "Основы теории категорий для JavaScript-разработчика: типы как объекты, функции как морфизмы и два закона композиции — тождество и ассоциативность.",
    en: "Category theory basics for JavaScript developers: types as objects, functions as morphisms, and the composition laws of identity and associativity.",
  },
  goal: {
    ru: "Понять, что такое категория в программировании — типы как объекты и функции как морфизмы — и какие два закона выполняет их композиция.",
    en: "Understand what a category is in programming, with types as objects and functions as morphisms, and which two laws their composition obeys.",
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

// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // строку превращаем в массив
  concatX // добавляем X и превращаем в строку
  )

// start
pipeline(5) // ['5 X'] результат

// Что же тут произошло
// входной аргумент 5 — значение типа "a" (Number)
// конкатенировали букву X и получили '5 X' — значение типа "b" (String)
// добавили в массив и получили ['5 X'] — значение типа "c" (Array)
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

// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

const pipeline = compose(
  toArray, // turn the string into an array
  concatX // append X and turn it into a string
  )

// start
pipeline(5) // ['5 X'] is the result

// So what happened here
// the input argument 5 is a value of type "a" (Number)
// we concatenated the letter X and got '5 X', a value of type "b" (String)
// we put it into an array and got ['5 X'], a value of type "c" (Array)
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

// композицияПроцессов :: ((b -> c), (a -> b)) -> a -> c
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

// composeProcesses :: ((b -> c), (a -> b)) -> a -> c
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
  summary: [
    {
      ru: "В функциональном программировании многие абстракции, законы и принципы взяты из теории категорий.",
      en: "In functional programming many abstractions, laws and principles are taken from category theory.",
    },
    {
      ru: "Категория в программировании — это объекты (типы данных) и морфизмы между ними (стрелки, то есть функции).",
      en: "A category in programming is a collection of objects (data types) and morphisms between them (arrows, that is, functions).",
    },
    {
      ru: "Морфизмы f :: a -> b и g :: b -> c компонуются в g . f :: a -> c — «g после f»: сначала f, затем g.",
      en: "Morphisms f :: a -> b and g :: b -> c compose into g . f :: a -> c, read as \"g after f\": first f, then g.",
    },
    {
      ru: "Композиция выполняет два закона: тождество (f . id = f, id . f = f) и ассоциативность (h . (g . f) = (h . g) . f).",
      en: "Composition obeys two laws: identity (f . id = f, id . f = f) and associativity (h . (g . f) = (h . g) . f).",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Даны три морфизма: words :: String -> [String] разбивает текст на слова, count :: [a] -> Number возвращает длину массива, isLong :: Number -> Boolean проверяет, что число больше трёх. С помощью compose из урока соберите из них морфизм isLongText :: String -> Boolean. Стыкуйте функции по типам: выход каждой функции должна принимать следующая. Помните, что compose(g, f) — это «g после f».",
        en: "There are three morphisms: words :: String -> [String] splits a text into words, count :: [a] -> Number returns the length of an array, and isLong :: Number -> Boolean checks that a number is greater than three. Using compose from the lesson, build the morphism isLongText :: String -> Boolean out of them. Match the functions by type: the output of each function must be accepted by the next one. Remember that compose(g, f) is \"g after f\".",
      },
      starter: {
        ru: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// ваш код: isLongText :: String -> Boolean

console.log(isLongText('map filter reduce'))
console.log(isLongText('pipe compose curry tap lens'))`,
        en: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// your code: isLongText :: String -> Boolean

console.log(isLongText('map filter reduce'))
console.log(isLongText('pipe compose curry tap lens'))`,
      },
      solution: {
        ru: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// String -> [String] -> Number -> Boolean:
// сначала words, затем count, затем isLong
// isLongText :: String -> Boolean
const isLongText = compose(isLong, compose(count, words))

console.log(isLongText('map filter reduce')) // 3 слова
console.log(isLongText('pipe compose curry tap lens')) // 5 слов`,
        en: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')

// count :: [a] -> Number
const count = (list) => list.length

// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// String -> [String] -> Number -> Boolean:
// first words, then count, then isLong
// isLongText :: String -> Boolean
const isLongText = compose(isLong, compose(count, words))

console.log(isLongText('map filter reduce')) // 3 words
console.log(isLongText('pipe compose curry tap lens')) // 5 words`,
      },
      expected: {
        ru: "false\ntrue",
        en: "false\ntrue",
      },
    },
    {
      task: {
        ru: "Проверьте на тех же морфизмах оба закона категории. Напишите тождественный морфизм id :: a -> a и функцию sameOn, которая считает две функции равными, если они дают одинаковый результат на всех строках из списка inputs. Проверки в заготовке сравнивают compose(id, countWords) и compose(countWords, id) с countWords, а затем compose(isLong, compose(count, words)) с compose(compose(isLong, count), words) и выводят по строке на каждую.",
        en: "Check both category laws on the same morphisms. Write the identity morphism id :: a -> a and a function sameOn that treats two functions as equal if they give the same result on every string in the inputs list. The checks in the starter compare compose(id, countWords) and compose(countWords, id) with countWords, and then compose(isLong, compose(count, words)) with compose(compose(isLong, count), words), printing one line per check.",
      },
      starter: {
        ru: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// тождественный морфизм
// id :: a -> a
// ваш код

// входы, на которых сравниваем функции
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// две функции равны, если на всех входах дают одно и то же
// sameOn :: ((a -> b), (a -> b)) -> Boolean
// ваш код

// countWords :: String -> Number
const countWords = compose(count, words)

// тождество: композиция с id ничего не меняет
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// ассоциативность: неважно, как расставить скобки
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`,
        en: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// the identity morphism
// id :: a -> a
// your code

// the inputs on which we compare functions
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// two functions are equal if they give the same result on every input
// sameOn :: ((a -> b), (a -> b)) -> Boolean
// your code

// countWords :: String -> Number
const countWords = compose(count, words)

// identity: composing with id changes nothing
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// associativity: it does not matter where the parentheses go
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`,
      },
      solution: {
        ru: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// тождественный морфизм
// id :: a -> a
const id = (x) => x

// входы, на которых сравниваем функции
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// две функции равны, если на всех входах дают одно и то же
// sameOn :: ((a -> b), (a -> b)) -> Boolean
const sameOn = (f, g) => inputs.every((x) => f(x) === g(x))

// countWords :: String -> Number
const countWords = compose(count, words)

// тождество: композиция с id ничего не меняет
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// ассоциативность: неважно, как расставить скобки
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`,
        en: `// compose :: ((b -> c), (a -> b)) -> a -> c
const compose = (f2, f1) => (...args) => f2(f1(...args))

// words :: String -> [String]
const words = (text) => text.split(' ')
// count :: [a] -> Number
const count = (list) => list.length
// isLong :: Number -> Boolean
const isLong = (n) => n > 3

// the identity morphism
// id :: a -> a
const id = (x) => x

// the inputs on which we compare functions
const inputs = ['map filter reduce', 'pipe compose curry tap lens', 'functor']

// two functions are equal if they give the same result on every input
// sameOn :: ((a -> b), (a -> b)) -> Boolean
const sameOn = (f, g) => inputs.every((x) => f(x) === g(x))

// countWords :: String -> Number
const countWords = compose(count, words)

// identity: composing with id changes nothing
console.log(\`id . countWords = countWords: \${sameOn(compose(id, countWords), countWords)}\`)
console.log(\`countWords . id = countWords: \${sameOn(compose(countWords, id), countWords)}\`)

// associativity: it does not matter where the parentheses go
const left = compose(isLong, compose(count, words))
const right = compose(compose(isLong, count), words)
console.log(\`isLong . (count . words) = (isLong . count) . words: \${sameOn(left, right)}\`)`,
      },
      expected: {
        ru: "id . countWords = countWords: true\ncountWords . id = countWords: true\nisLong . (count . words) = (isLong . count) . words: true",
        en: "id . countWords = countWords: true\ncountWords . id = countWords: true\nisLong . (count . words) = (isLong . count) . words: true",
      },
    },
  ],
}

export default lesson
