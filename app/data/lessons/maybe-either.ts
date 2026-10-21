import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'maybe-either',
  title: {
    ru: "Maybe и Either",
    en: "Maybe and Either",
  },
  description: {
    ru: "Maybe и Either в JavaScript на Sanctuary: безопасное чтение вложенных данных, ошибки с причиной вместо исключений и разница между map и chain.",
    en: "Maybe and Either in JavaScript with Sanctuary: reading nested data safely, errors with a reason instead of exceptions, and when to use map or chain.",
  },
  goal: {
    ru: "Научиться обходиться без null-проверок и try/catch в конвейере: Maybe из Sanctuary — для значения, которого может не быть, Either — для ошибки с причиной; понять, когда шагу нужен map, а когда chain.",
    en: "Learn to do without null checks and try/catch in a pipeline: Maybe from Sanctuary for a value that may be missing, Either for an error with a reason; and understand when a step needs map and when it needs chain.",
  },
  blocks: [
    {
      type: 'text',
      ru: "В JS отсутствие значения обычно выражают через null и undefined, а ошибку — через исключение. Оба способа плохо сочетаются с конвейером из урока «Композиция функций»: обращение к свойству undefined бросает TypeError, а исключение выходит из середины цепочки и пропускает остальные шаги. По сигнатуре cityOf :: Object -> String не видно, что функция может упасть.",
      en: "In JS a missing value is usually expressed with null and undefined, and an error with an exception. Both fit poorly into the pipeline from the \"Function composition\" lesson: reading a property of undefined throws a TypeError, and an exception leaves the middle of the chain and skips the remaining steps. The signature cityOf :: Object -> String does not show that the function can crash.",
    },
    {
      type: 'code',
      code: {
        ru: `// Проблема: значения может не быть
const users = [
  { name: 'Ann', address: { city: 'Riga' } },
  { name: 'Bob' }, // адреса нет
]

// cityOf :: Object -> String
const cityOf = (user) => user.address.city

console.log(cityOf(users[0])) // Riga

try {
  cityOf(users[1]) // у Bob нет address: читаем city у undefined
} catch (error) {
  console.log(error.name) // TypeError
}

// ?. спасает от падения здесь, но undefined уходит дальше
const city = users[1].address?.city
console.log(city) // undefined

try {
  city.toUpperCase() // и программа падает уже в другом месте
} catch (error) {
  console.log(error.name) // TypeError
}

// исключение по сигнатуре тоже не видно: JSON.parse бросает на некорректной строке
try {
  JSON.parse('{ name: Ann }')
} catch (error) {
  console.log(error.name) // SyntaxError
}`,
        en: `// The problem: the value may be missing
const users = [
  { name: 'Ann', address: { city: 'Riga' } },
  { name: 'Bob' }, // no address
]

// cityOf :: Object -> String
const cityOf = (user) => user.address.city

console.log(cityOf(users[0])) // Riga

try {
  cityOf(users[1]) // Bob has no address: we read city of undefined
} catch (error) {
  console.log(error.name) // TypeError
}

// ?. prevents the crash here, but undefined travels further
const city = users[1].address?.city
console.log(city) // undefined

try {
  city.toUpperCase() // and the program crashes somewhere else
} catch (error) {
  console.log(error.name) // TypeError
}

// an exception is not visible in the signature either: JSON.parse throws on an invalid string
try {
  JSON.parse('{ name: Ann }')
} catch (error) {
  console.log(error.name) // SyntaxError
}`,
      },
    },
    {
      type: 'text',
      ru: "Опциональная цепочка ?. спасает от падения в одном месте, но undefined уходит дальше и ломает программу там, где его не ждут. Проверки вида if (user && user.address) работают, но расползаются по коду, и одну из них легко забыть. Нужен способ сделать отсутствие значения и ошибку частью результата, чтобы о них было трудно забыть.",
      en: "Optional chaining ?. prevents the crash in one place, but undefined travels further and breaks the program where nobody expects it. Checks like if (user && user.address) work, but they spread across the code and one of them is easy to forget. We need a way to make a missing value and an error part of the result, so that they are hard to forget.",
    },
    {
      type: 'text',
      ru: "Maybe делает отсутствие значения частью типа: значение Maybe a — это либо Just (значение), либо Nothing. Вы его уже встречали: в уроке «Функциональное программирование» S.head вернул Maybe, а в уроке «Функтор и его законы» мы написали Maybe-подобный контейнер сами. В Sanctuary есть готовый: S.Just, S.Nothing и функции для работы с ними. Maybe — функтор: S.map применяет функцию только к Just, а Nothing проходит дальше без изменений.",
      en: "Maybe makes a missing value part of the type: a value of Maybe a is either Just (value) or Nothing. You have met it already: in the \"Functional programming\" lesson S.head returned a Maybe, and in the \"Functors and their laws\" lesson we wrote a Maybe-like container ourselves. Sanctuary has a ready-made one: S.Just, S.Nothing and functions to work with them. Maybe is a functor: S.map applies the function only to Just, and Nothing passes through unchanged.",
    },
    {
      type: 'code',
      code: {
        ru: `// Maybe a: Just (значение) или Nothing
// Sanctuary в песочнице подключена как S

console.log(S.Just(42)) // Just (42)
console.log(S.Nothing) // Nothing

// head :: [a] -> Maybe a — первого элемента может не быть
console.log(S.head(['Riga', 'Oslo'])) // Just ("Riga")
console.log(S.head([])) // Nothing

// map :: (a -> b) -> Maybe a -> Maybe b
// функция применяется только к Just
const shout = (text) => text.toUpperCase()
console.log(S.map(shout)(S.head(['Riga']))) // Just ("RIGA")
console.log(S.map(shout)(S.head([]))) // Nothing, shout не вызывалась

// значение достают один раз, на выходе
// fromMaybe :: a -> Maybe a -> a
console.log(S.fromMaybe('нет города')(S.head([]))) // нет города
// maybe :: b -> (a -> b) -> Maybe a -> b — map и fromMaybe за один шаг
console.log(S.maybe('нет города')(shout)(S.head(['Oslo']))) // OSLO`,
        en: `// Maybe a: Just (value) or Nothing
// Sanctuary is available in the playground as S

console.log(S.Just(42)) // Just (42)
console.log(S.Nothing) // Nothing

// head :: [a] -> Maybe a, there may be no first element
console.log(S.head(['Riga', 'Oslo'])) // Just ("Riga")
console.log(S.head([])) // Nothing

// map :: (a -> b) -> Maybe a -> Maybe b
// the function is applied only to Just
const shout = (text) => text.toUpperCase()
console.log(S.map(shout)(S.head(['Riga']))) // Just ("RIGA")
console.log(S.map(shout)(S.head([]))) // Nothing, shout was not called

// the value is taken out once, at the exit
// fromMaybe :: a -> Maybe a -> a
console.log(S.fromMaybe('no city')(S.head([]))) // no city
// maybe :: b -> (a -> b) -> Maybe a -> b, map and fromMaybe in one step
console.log(S.maybe('no city')(shout)(S.head(['Oslo']))) // OSLO`,
      },
    },
    {
      type: 'text',
      ru: "Достают значение из Maybe один раз, на выходе из конвейера: S.fromMaybe подставляет запасное значение для Nothing, а S.maybe ещё и применяет функцию к значению из Just — это map и fromMaybe за один шаг. Внутри конвейера значение остаётся в Maybe, и каждый шаг пишется так, будто оно точно есть.",
      en: "The value is taken out of a Maybe once, at the exit of the pipeline: S.fromMaybe substitutes a fallback for Nothing, and S.maybe also applies a function to the value in Just, which is map and fromMaybe in one step. Inside the pipeline the value stays in the Maybe, and every step is written as if the value is definitely there.",
    },
    {
      type: 'heading',
      ru: "map и chain",
      en: "map and chain",
    },
    {
      type: 'text',
      ru: "Если функция возвращает обычное значение, нужен map. Если она сама возвращает Maybe, как S.head или S.get, map даст Maybe внутри Maybe: Just (Just (\"Riga\")). Для таких функций есть chain :: (a -> Maybe b) -> Maybe a -> Maybe b: он применяет функцию и снимает лишний слой, а для Nothing ничего не делает. Правило простое: функция возвращает значение — map, возвращает Maybe — chain.",
      en: "If the function returns an ordinary value, you need map. If it returns a Maybe itself, like S.head or S.get, map gives a Maybe inside a Maybe: Just (Just (\"Riga\")). For such functions there is chain :: (a -> Maybe b) -> Maybe a -> Maybe b: it applies the function and removes the extra layer, and does nothing for Nothing. The rule is simple: the function returns a value, use map; it returns a Maybe, use chain.",
    },
    {
      type: 'code',
      code: {
        ru: `// Безопасное чтение вложенных данных

// isObject :: * -> Boolean
const isObject = (x) => typeof x === 'object' && x !== null
// isString :: * -> Boolean
const isString = (x) => typeof x === 'string'

// get :: (* -> Boolean) -> String -> a -> Maybe b
// Just, если свойство есть и его значение проходит предикат, иначе Nothing
const getAddress = S.get(isObject)('address')
const getCity = S.get(isString)('city')

const ann = { name: 'Ann', address: { city: 'Riga' } }
const bob = { name: 'Bob' }

// map: getCity возвращает Maybe, и получается Maybe внутри Maybe
console.log(S.map(getCity)(getAddress(ann))) // Just (Just ("Riga"))
// chain :: (a -> Maybe b) -> Maybe a -> Maybe b — применяет и снимает лишний слой
console.log(S.chain(getCity)(getAddress(ann))) // Just ("Riga")
console.log(S.chain(getCity)(getAddress(bob))) // Nothing

// cityName :: a -> String
const cityName = S.pipe([
  getAddress, // Maybe Object
  S.chain(getCity), // getCity возвращает Maybe — chain
  S.map((city) => city.toUpperCase()), // toUpperCase возвращает строку — map
  S.fromMaybe('город не указан'),
])

console.log(cityName(ann)) // RIGA
console.log(cityName(bob)) // город не указан
console.log(cityName({ address: { city: null } })) // город не указан
console.log(cityName(null)) // город не указан

// для пути целиком есть S.gets
console.log(S.gets(isString)(['address', 'city'])(ann)) // Just ("Riga")

// осторожно: S.prop — для объектов, у которых свойство точно есть
try {
  S.prop('address')(bob)
} catch (error) {
  console.log(error.name) // TypeError: свойства нет
}

// и предикат в S.get — не формальность: S.get находит и свойства прототипа
console.log(S.isJust(S.get(() => true)('toString')(bob))) // true
console.log(S.get(isString)('toString')(bob)) // Nothing`,
        en: `// Reading nested data safely

// isObject :: * -> Boolean
const isObject = (x) => typeof x === 'object' && x !== null
// isString :: * -> Boolean
const isString = (x) => typeof x === 'string'

// get :: (* -> Boolean) -> String -> a -> Maybe b
// Just if the property exists and its value passes the predicate, Nothing otherwise
const getAddress = S.get(isObject)('address')
const getCity = S.get(isString)('city')

const ann = { name: 'Ann', address: { city: 'Riga' } }
const bob = { name: 'Bob' }

// map: getCity returns a Maybe, so we get a Maybe inside a Maybe
console.log(S.map(getCity)(getAddress(ann))) // Just (Just ("Riga"))
// chain :: (a -> Maybe b) -> Maybe a -> Maybe b, applies and removes the extra layer
console.log(S.chain(getCity)(getAddress(ann))) // Just ("Riga")
console.log(S.chain(getCity)(getAddress(bob))) // Nothing

// cityName :: a -> String
const cityName = S.pipe([
  getAddress, // Maybe Object
  S.chain(getCity), // getCity returns a Maybe: chain
  S.map((city) => city.toUpperCase()), // toUpperCase returns a string: map
  S.fromMaybe('no city given'),
])

console.log(cityName(ann)) // RIGA
console.log(cityName(bob)) // no city given
console.log(cityName({ address: { city: null } })) // no city given
console.log(cityName(null)) // no city given

// for a whole path there is S.gets
console.log(S.gets(isString)(['address', 'city'])(ann)) // Just ("Riga")

// careful: S.prop is for objects that definitely have the property
try {
  S.prop('address')(bob)
} catch (error) {
  console.log(error.name) // TypeError: the property is missing
}

// and the predicate in S.get is not a formality: S.get also finds properties of the prototype
console.log(S.isJust(S.get(() => true)('toString')(bob))) // true
console.log(S.get(isString)('toString')(bob)) // Nothing`,
      },
    },
    {
      type: 'text',
      ru: "S.get принимает предикат, имя свойства и объект и возвращает Just, только если свойство есть и значение проходит предикат. Предикат — не формальность: S.get находит и свойства прототипа, и значение null, поэтому проверяйте тип значения. S.prop возвращает значение без Maybe и бросает TypeError, если свойства нет: он подходит для объектов, у которых свойство точно есть.",
      en: "S.get takes a predicate, a property name and an object, and returns Just only if the property exists and the value passes the predicate. The predicate is not a formality: S.get also finds properties of the prototype and the value null, so check the type of the value. S.prop returns the value without a Maybe and throws a TypeError if the property is missing: it suits objects that definitely have the property.",
    },
    {
      type: 'text',
      ru: "Тип, у которого есть chain и of и которые выполняют свои законы, называют монадой; of кладёт значение в контейнер, у Maybe это S.Just. Maybe — монада, та самая, в которую урок «Функциональное программирование» советовал обернуть данные, чтобы композиция не падала. На схеме из урока «Fantasy-land» Monad стоит под Applicative и Chain.",
      en: "A type that has chain and of, obeying their laws, is called a monad; of puts a value into the container, and for Maybe it is S.Just. Maybe is a monad, the very kind the \"Functional programming\" lesson suggested wrapping the data in so that the composition does not crash. On the diagram from the \"Fantasy-land\" lesson, Monad sits below Applicative and Chain.",
    },
    {
      type: 'heading',
      ru: "Either: ошибка с причиной",
      en: "Either: an error with a reason",
    },
    {
      type: 'text',
      ru: "Maybe говорит, что значения нет, но не говорит почему. Either a b хранит либо Left с причиной ошибки, либо Right с результатом (right — «правильный»). S.map и S.chain работают с Right, а Left проходит мимо них без изменений, как Nothing. На выходе S.either принимает две функции — для Left и для Right.",
      en: "Maybe says that there is no value but not why. Either a b holds either a Left with the reason for the error or a Right with the result (\"right\" as in correct). S.map and S.chain work with Right, while Left passes them by unchanged, like Nothing. At the exit S.either takes two functions, one for Left and one for Right.",
    },
    {
      type: 'text',
      ru: "S.encase превращает функцию, которая бросает исключение, в функцию, которая возвращает Either: Right с результатом или Left с пойманной ошибкой. S.maybeToEither даёт отсутствию причину: Nothing становится Left с переданным значением, Just — Right. S.mapLeft меняет причину ошибки и не трогает Right.",
      en: "S.encase turns a function that throws into a function that returns an Either: a Right with the result or a Left with the caught error. S.maybeToEither gives a reason to absence: Nothing becomes a Left holding the value passed in, and Just becomes a Right. S.mapLeft changes the reason for the error and leaves Right alone.",
    },
    {
      type: 'code',
      code: {
        ru: `// Either a b: Left (причина ошибки) или Right (результат)
// Разбор ввода: строка -> JSON -> поле age -> проверка диапазона

// isNumber :: * -> Boolean
const isNumber = (x) => typeof x === 'number'

// encase :: (a -> b) -> a -> Either e b — e: то, что бросила функция
// mapLeft :: (e -> c) -> Either e b -> Either c b
// текст ошибки JSON.parse в разных браузерах разный, поэтому берём только имя
// parseJson :: String -> Either String *
const parseJson = (text) =>
  S.mapLeft((error) => \`не JSON: \${error.name}\`)(S.encase(JSON.parse)(text))

// maybeToEither :: a -> Maybe b -> Either a b
// getAge :: * -> Either String Number
const getAge = (data) => S.maybeToEither('нет числового поля age')(S.get(isNumber)('age')(data))

// checkRange :: Number -> Either String Number
const checkRange = (age) =>
  age >= 0 && age <= 150 ? S.Right(age) : S.Left(\`возраст вне диапазона: \${age}\`)

// readAge :: String -> Either String Number
const readAge = S.pipe([
  parseJson,
  S.chain(getAge), // каждый шаг возвращает Either — chain
  S.chain(checkRange),
])

console.log(readAge('{"age": 30}')) // Right (30)
console.log(readAge('{"age": 200}')) // Left ("возраст вне диапазона: 200")

// either :: (a -> c) -> (b -> c) -> Either a b -> c
// report :: Either String Number -> String
const report = S.either((reason) => \`Неверный ввод — \${reason}\`)((age) => \`Возраст: \${age}\`)

const inputs = ['{"age": 30}', '{ age: 30 }', '{"name": "Ann"}', '{"age": 200}', 'null']
inputs.forEach((input) => console.log(report(readAge(input))))
// Возраст: 30
// Неверный ввод — не JSON: SyntaxError
// Неверный ввод — нет числового поля age
// Неверный ввод — возраст вне диапазона: 200
// Неверный ввод — нет числового поля age`,
        en: `// Either a b: Left (the reason for the error) or Right (the result)
// Parsing input: string -> JSON -> the age field -> range check

// isNumber :: * -> Boolean
const isNumber = (x) => typeof x === 'number'

// encase :: (a -> b) -> a -> Either e b, where e is what the function threw
// mapLeft :: (e -> c) -> Either e b -> Either c b
// the text of a JSON.parse error differs between browsers, so we take only the name
// parseJson :: String -> Either String *
const parseJson = (text) =>
  S.mapLeft((error) => \`not JSON: \${error.name}\`)(S.encase(JSON.parse)(text))

// maybeToEither :: a -> Maybe b -> Either a b
// getAge :: * -> Either String Number
const getAge = (data) => S.maybeToEither('no numeric age field')(S.get(isNumber)('age')(data))

// checkRange :: Number -> Either String Number
const checkRange = (age) =>
  age >= 0 && age <= 150 ? S.Right(age) : S.Left(\`age out of range: \${age}\`)

// readAge :: String -> Either String Number
const readAge = S.pipe([
  parseJson,
  S.chain(getAge), // every step returns an Either: chain
  S.chain(checkRange),
])

console.log(readAge('{"age": 30}')) // Right (30)
console.log(readAge('{"age": 200}')) // Left ("age out of range: 200")

// either :: (a -> c) -> (b -> c) -> Either a b -> c
// report :: Either String Number -> String
const report = S.either((reason) => \`Invalid input — \${reason}\`)((age) => \`Age: \${age}\`)

const inputs = ['{"age": 30}', '{ age: 30 }', '{"name": "Ann"}', '{"age": 200}', 'null']
inputs.forEach((input) => console.log(report(readAge(input))))
// Age: 30
// Invalid input — not JSON: SyntaxError
// Invalid input — no numeric age field
// Invalid input — age out of range: 200
// Invalid input — no numeric age field`,
      },
    },
    {
      type: 'text',
      ru: "Когда что выбирать. Maybe — когда отсутствие значения нормально и причина очевидна: поиск, первый элемент, необязательное поле. Either — когда вызывающему коду нужно знать, что пошло не так: разбор и проверка ввода, бизнес-правила, сообщения пользователю. В обоих случаях отсутствие и ошибка становятся обычными значениями: их видно в сигнатуре, их можно передать дальше и показать, а не ловить через try/catch где-то выше по стеку.",
      en: "When to choose which. Maybe is for when a missing value is normal and the reason is obvious: a search, the first element, an optional field. Either is for when the calling code needs to know what went wrong: parsing and validating input, business rules, messages to the user. In both cases absence and errors become ordinary values: they are visible in the signature, they can be passed on and shown, instead of being caught with try/catch somewhere up the stack.",
    },
  ],
  summary: [
    {
      ru: "Maybe a — Just (значение) или Nothing. Отсутствие значения становится частью типа вместо null и undefined, а значение достают один раз на выходе через S.fromMaybe или S.maybe.",
      en: "Maybe a is Just (value) or Nothing. A missing value becomes part of the type instead of null and undefined, and the value is taken out once at the exit with S.fromMaybe or S.maybe.",
    },
    {
      ru: "Функция возвращает обычное значение — S.map, возвращает Maybe или Either — S.chain: он применяет функцию и снимает лишний слой.",
      en: "If the function returns an ordinary value, use S.map; if it returns a Maybe or an Either, use S.chain: it applies the function and removes the extra layer.",
    },
    {
      ru: "S.get(предикат)(имя)(объект) читает свойство безопасно и проверяет тип значения, а S.prop бросает TypeError, если свойства нет.",
      en: "S.get(predicate)(name)(object) reads a property safely and checks the type of the value, while S.prop throws a TypeError if the property is missing.",
    },
    {
      ru: "Either a b — Left (причина ошибки) или Right (результат). S.encase превращает исключение в Left, S.maybeToEither даёт причину отсутствию, S.either обрабатывает оба случая на выходе.",
      en: "Either a b is Left (the reason for the error) or Right (the result). S.encase turns an exception into a Left, S.maybeToEither gives a reason to absence, and S.either handles both cases at the exit.",
    },
    {
      ru: "Maybe — когда причина отсутствия очевидна, Either — когда вызывающему коду нужно знать, что пошло не так.",
      en: "Maybe is for when the reason for absence is obvious, Either for when the calling code needs to know what went wrong.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Напишите firstTag: она возвращает первый тег первой статьи автора с решёткой впереди, а если статей или тегов нет — строку «без тегов». Поле posts может отсутствовать, массивы posts и tags могут быть пустыми. Соберите конвейер из S.get, S.head, S.chain, S.map и S.fromMaybe и решите для каждого шага, нужен ли ему map или chain.",
        en: "Write firstTag: it returns the first tag of the author's first post with a hash in front, or the string \"no tags\" if there are no posts or no tags. The posts field may be missing, and the posts and tags arrays may be empty. Build a pipeline from S.get, S.head, S.chain, S.map and S.fromMaybe, and decide for each step whether it needs map or chain.",
      },
      starter: {
        ru: `const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
// ваш код

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`,
        en: `const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
// your code

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`,
      },
      solution: {
        ru: `const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
const firstTag = S.pipe([
  S.get(isArray)('posts'), // Maybe [Object]
  S.chain(S.head), // S.head возвращает Maybe — chain
  S.chain(S.get(isArray)('tags')), // S.get тоже возвращает Maybe — chain
  S.chain(S.head), // Maybe String
  S.map((tag) => \`#\${tag}\`), // обычная функция — map
  S.fromMaybe('без тегов'),
])

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`,
        en: `const authors = [
  { name: 'Ann', posts: [{ title: 'Functors', tags: ['fp', 'js'] }] },
  { name: 'Bob', posts: [] },
  { name: 'Eve' },
  { name: 'Max', posts: [{ title: 'Draft', tags: [] }] },
]

// isArray :: * -> Boolean
const isArray = (x) => Array.isArray(x)

// firstTag :: Object -> String
const firstTag = S.pipe([
  S.get(isArray)('posts'), // Maybe [Object]
  S.chain(S.head), // S.head returns a Maybe: chain
  S.chain(S.get(isArray)('tags')), // S.get returns a Maybe too: chain
  S.chain(S.head), // Maybe String
  S.map((tag) => \`#\${tag}\`), // an ordinary function: map
  S.fromMaybe('no tags'),
])

authors.forEach((author) => console.log(\`\${author.name}: \${firstTag(author)}\`))`,
      },
      expected: {
        ru: "Ann: #fp\nBob: без тегов\nEve: без тегов\nMax: без тегов",
        en: "Ann: #fp\nBob: no tags\nEve: no tags\nMax: no tags",
      },
    },
    {
      task: {
        ru: "Порт в форме настроек приходит строкой. Напишите parsePort :: String -> Either String Number: если строка не целое число, верните Left с причиной «не целое число», если число вне диапазона 1–65535 — Left с причиной «вне диапазона 1–65535», иначе Right (порт). S.parseInt(10)(text) возвращает Just (целое число) или Nothing. Используйте S.maybeToEither и S.chain, а строку для каждого ввода соберите в describe через S.either.",
        en: "A port in a settings form arrives as a string. Write parsePort :: String -> Either String Number: if the string is not an integer, return a Left with the reason \"not an integer\"; if the number is outside the range 1–65535, a Left with the reason \"outside 1–65535\"; otherwise a Right (port). S.parseInt(10)(text) returns Just (an integer) or Nothing. Use S.maybeToEither and S.chain, and build the line for each input in describe with S.either.",
      },
      starter: {
        ru: `// parsePort :: String -> Either String Number
// ваш код

// describe :: Either String Number -> String
// ваш код

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`,
        en: `// parsePort :: String -> Either String Number
// your code

// describe :: Either String Number -> String
// your code

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`,
      },
      solution: {
        ru: `// checkRange :: Number -> Either String Number
const checkRange = (port) =>
  port >= 1 && port <= 65535 ? S.Right(port) : S.Left('вне диапазона 1–65535')

// parsePort :: String -> Either String Number
const parsePort = S.pipe([
  S.parseInt(10), // Maybe Number
  S.maybeToEither('не целое число'), // Nothing становится Left с причиной
  S.chain(checkRange), // checkRange возвращает Either — chain
])

// describe :: Either String Number -> String
const describe = S.either((reason) => \`ошибка — \${reason}\`)((port) => \`порт \${port}\`)

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`,
        en: `// checkRange :: Number -> Either String Number
const checkRange = (port) =>
  port >= 1 && port <= 65535 ? S.Right(port) : S.Left('outside 1–65535')

// parsePort :: String -> Either String Number
const parsePort = S.pipe([
  S.parseInt(10), // Maybe Number
  S.maybeToEither('not an integer'), // Nothing becomes a Left with the reason
  S.chain(checkRange), // checkRange returns an Either: chain
])

// describe :: Either String Number -> String
const describe = S.either((reason) => \`invalid — \${reason}\`)((port) => \`port \${port}\`)

const inputs = ['8080', 'http', '70000', '443']
inputs.forEach((input) => console.log(\`\${input}: \${describe(parsePort(input))}\`))`,
      },
      expected: {
        ru: "8080: порт 8080\nhttp: ошибка — не целое число\n70000: ошибка — вне диапазона 1–65535\n443: порт 443",
        en: "8080: port 8080\nhttp: invalid — not an integer\n70000: invalid — outside 1–65535\n443: port 443",
      },
    },
  ],
}

export default lesson
