import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'fantasy-land',
  title: {
    ru: "Fantasy-land (Страна фантазий)",
    en: "Fantasy-land",
  },
  blocks: [
    {
      type: 'text',
      ru: "Спецификация Fantasy-land (Страна фантазий) — это набор правил и публичных интерфейсов, описывающих абстракции из теории категорий.",
      en: "The Fantasy Land specification is a set of rules and public interfaces describing abstractions from category theory.",
    },
    {
      type: 'text',
      ru: "Эти правила и законы опираются на алгебраические структуры данных.",
      en: "These rules and laws rest on algebraic data structures.",
    },
    {
      type: 'text',
      ru: "По сути, реализуя эти интерфейсы и законы, мы следуем спецификации Fantasy-land (Страна фантазий).",
      en: "In essence, by implementing these interfaces and laws, we follow the Fantasy Land specification.",
    },
    {
      type: 'code',
      code: `// Вот как она выглядит

Setoid   Semigroupoid  Semigroup   Foldable        Functor      Contravariant  Filterable
(equals)    (compose)    (concat)   (reduce)         (map)        (contramap)    (filter)
    |           |           |           \\         / | | | | \\
    |           |           |            \\       /  | | | |  \\
    |           |           |             \\     /   | | | |   \\
    |           |           |              \\   /    | | | |    \\
    |           |           |               \\ /     | | | |     \\
  Ord      Category     Monoid         Traversable | | | |      \\
  (lte)       (id)       (empty)        (traverse)  / | | \\       \\
                            |                      /  | |  \\       \\
                            |                     /   / \\   \\       \\
                            |             Profunctor /   \\ Bifunctor \\
                            |              (promap) /     \\ (bimap)   \\
                            |                      /       \\           \\
                          Group                   /         \\           \\
                        (invert)               Alt        Apply      Extend
                                              (alt)        (ap)     (extend)
                                                /           / \\           \\
                                              /           /   \\           \\
                                              /           /     \\           \\
                                            /           /       \\           \\
                                            /           /         \\           \\
                                          Plus    Applicative    Chain      Comonad
                                        (zero)       (of)      (chain)    (extract)
                                            \\         / \\         / \\
                                            \\       /   \\       /   \\
                                              \\     /     \\     /     \\
                                              \\   /       \\   /       \\
                                                \\ /         \\ /         \\
                                            Alternative    Monad     ChainRec
                                                                    (chainRec)`,
    },
    {
      type: 'text',
      ru: "Давайте мы попробуем с вами создать Functor (функтор) согласно спецификации Fantasy-land (Страна фантазий).",
      en: "Let's try to create a Functor according to the Fantasy Land specification.",
    },
    {
      type: 'code',
      code: `// Сигнатура
fantasy-land/map :: Functor f => f a ~> (a -> b) -> f b

// Создание функтора
// ==== синтаксис es5 ======

// подготавливаем прототип для функции конструктора
// удалив наследование Object.prototype дефолтная
var prototypeFunctor = Object.create(null)

// Название строки функции и метода согласно спецификации
const FANTASY_LAND_MAP = 'fantasy-land/map'

// создаем функцию конструктор
function Functor(value) {
  this.value = value
}

// создаем правильные связи между прототипом и функций конструктором
Functor.prototype = prototypeFunctor
prototypeFunctor.constructor = Functor

//  а вот теперь самое главное реализовываем интерфейс функтора
prototypeFunctor[FANTASY_LAND_MAP] = function (fn) {
  return new Functor(fn(this.value))
}

// Давайте разделим ключевую логику на части
// return new Functor(fn(this.value))
// 1. Текущей содержимое контейнера мы пропускаем через функцию
fn(this.value)
// 2. Возвращаем новый экземпляр типа функтор уже с новым значением
return new Functor(тут результат инструкции выше)

// Пример
var functorObj = new Functor(5)

var functorResult = functorObj[FANTASY_LAND_MAP](value => value * 2)

// отсутствуют мутации
// реализован интерфейс спецификации
console.log(functorObj.value) // 5
console.log(functorResult.value) // 10

// =========================

// Полифил
// как устроен примерно внутри Object.create(objectProto)
var createObjectProto = function (obj) {
  // для создания экземпляра формируем конструктор
  function XXX() {}

  // устанавливаем правильные ссылки
  XXX.prototype = obj || Object.prototype
  XXX.prototype.constructor = XXX

  // создаем экземпляр и возвращаем
  return new XXX()
}

// ==== синтаксис es6 ======
// тут все гораздо проще
// тут в прототипе мы также можем уничтожить дефолтное наследование Object.prototype
class Functor {
  constructor (value) {
    this.value = value
  }

  // этот метод и так уже будет хранится по дефолту в прототипе
  [FANTASY_LAND_MAP] (fn) {
    return new Functor(fn(this.value))
  }
}

// Пример описанный выше также сработает
const functorObj = new Functor(5)
// =========================


// ==== через чистые функции ======
// Создание функтора без создания экземпляров
// через чистые функции
const functor = value => ({
  value,
  [FANTASY_LAND_MAP]: (fn) => functor(fn(value))
})

// создали объект и вернули его
const objA = functor(10)
const objB = objA[FANTASY_LAND_MAP](value => value - 5)

console.log(objA.value) // 10
console.log(objB.value) // 5

// =========================`,
    },
  ],
}

export default lesson
