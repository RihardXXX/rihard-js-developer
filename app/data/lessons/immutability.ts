import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'immutability',
  title: { ru: "Иммутабельность", en: "Immutability" },
  description: {
    ru: "Иммутабельность в JavaScript: почему мутации ломают код, spread и structuredClone, Object.freeze, немутирующие методы массивов, R.evolve и цена копий.",
    en: "Immutability in JavaScript: why mutation breaks code, spread and structuredClone, Object.freeze, non-mutating array methods, R.evolve and the cost of copies.",
  },
  goal: {
    ru: "Научиться обновлять объекты и массивы без мутаций — копированием через spread и structuredClone, немутирующими методами массивов и функциями Ramda — и понимать, где копия поверхностная и чего она стоит.",
    en: "Learn to update objects and arrays without mutation, by copying with spread and structuredClone, with non-mutating array methods and with Ramda functions, and understand where a copy is shallow and what it costs.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Иммутабельные данные не меняются после создания: чтобы «изменить» объект, создают новый, а прежний остаётся как был. В уроке «Чистые функции» так уже делали: changeAge возвращала нового пользователя через spread. Здесь разберём, зачем это нужно, где копия получается поверхностной, как защититься от случайной мутации и во что обходятся копии.",
      en: "Immutable data does not change after it is created: to \"change\" an object, you create a new one, and the previous one stays as it was. The \"Pure functions\" lesson already did this: changeAge returned a new user via spread. Here we look at why this is needed, where a copy turns out shallow, how to guard against accidental mutation, and what copies cost.",
    },
    {
      type: 'heading',
      ru: "Почему мутации ломают предсказуемость",
      en: "Why mutation breaks predictability",
    },
    {
      type: 'text',
      ru: "Переменная с объектом или массивом хранит ссылку на него, и при присваивании или передаче в функцию копируется ссылка, а не сам объект. Поэтому переменная, аргумент функции и поле другого объекта могут указывать на один и тот же объект. Если одна часть программы его меняет, изменение видят все остальные, и ошибка проявляется далеко от места мутации: чтобы её найти, нужно выяснить, у кого ещё есть ссылка на этот объект.",
      en: "A variable holding an object or an array holds a reference to it, and assignment or passing it to a function copies the reference, not the object itself. So a variable, a function argument and a field of another object can all point to the same object. If one part of the program changes it, every other part sees the change, and the bug shows up far from where the mutation happened: to find it, you have to work out who else holds a reference to that object.",
    },
    {
      type: 'code',
      code: {
        ru: `// Мутация аргумента
// ===============================
// bestScoreImpure :: [Number] -> Number
// НЕчистая: sort сортирует сам переданный массив
const bestScoreImpure = (scores) => scores.sort((a, b) => b - a)[0]

const scores = [40, 95, 70]
console.log(bestScoreImpure(scores)) // 95
console.log(scores) // [95, 70, 40]: исходный порядок потерян

// Общий объект
// ===============================
const defaults = { theme: 'light', fontSize: 14 }

const userSettings = defaults // копируется ссылка, а не объект
userSettings.theme = 'dark'

console.log(defaults.theme) // dark: значения по умолчанию тоже изменились

// Без мутаций
// ===============================
const baseSettings = { theme: 'light', fontSize: 14 }
const darkSettings = { ...baseSettings, theme: 'dark' } // новый объект

console.log(\`\${baseSettings.theme} -> \${darkSettings.theme}\`) // light -> dark`,
        en: `// Mutating an argument
// ===============================
// bestScoreImpure :: [Number] -> Number
// IMpure: sort sorts the array that was passed in
const bestScoreImpure = (scores) => scores.sort((a, b) => b - a)[0]

const scores = [40, 95, 70]
console.log(bestScoreImpure(scores)) // 95
console.log(scores) // [95, 70, 40]: the original order is lost

// A shared object
// ===============================
const defaults = { theme: 'light', fontSize: 14 }

const userSettings = defaults // the reference is copied, not the object
userSettings.theme = 'dark'

console.log(defaults.theme) // dark: the defaults have changed too

// Without mutation
// ===============================
const baseSettings = { theme: 'light', fontSize: 14 }
const darkSettings = { ...baseSettings, theme: 'dark' } // a new object

console.log(\`\${baseSettings.theme} -> \${darkSettings.theme}\`) // light -> dark`,
      },
    },
    {
      type: 'text',
      ru: "const здесь не помогает: он запрещает присвоить переменной другое значение, но не мешает менять объект, на который она ссылается. Объявление const defaults не делает объект неизменяемым — для этого нужна копия или Object.freeze.",
      en: "const does not help here: it forbids assigning another value to the variable but does not prevent changing the object it points to. Declaring const defaults does not make the object immutable; that takes a copy or Object.freeze.",
    },
    {
      type: 'heading',
      ru: "Поверхностная и глубокая копия",
      en: "Shallow and deep copies",
    },
    {
      type: 'text',
      ru: "Spread создаёт новый объект ({ ...obj }) или массив ([...arr]), но копирует только верхний уровень: вложенные объекты и массивы остаются общими с оригиналом. То же верно для Object.assign({}, obj), arr.slice() и Array.from(arr). Чтобы безопасно изменить вложенное поле, копируют каждый уровень на пути к нему, а остальные ветки берут как есть. Это называют структурным разделением: новый объект делит с прежним всё, что не менялось.",
      en: "Spread creates a new object ({ ...obj }) or array ([...arr]) but copies only the top level: nested objects and arrays stay shared with the original. The same is true of Object.assign({}, obj), arr.slice() and Array.from(arr). To change a nested field safely, you copy every level on the path to it and take the other branches as they are. This is called structural sharing: the new object shares with the old one everything that has not changed.",
    },
    {
      type: 'code',
      code: {
        ru: `// Поверхностная копия
// ===============================
const user = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const shallow = { ...user }
shallow.name = 'Olga' // верхний уровень скопирован: у user имя прежнее
shallow.address.city = 'Kazan' // address общий: город меняется и у user

console.log(user.name) // Anna
console.log(user.address.city) // Kazan

// Копия каждого уровня на пути к изменению
// ===============================
const original = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const moved = {
  ...original,
  address: { ...original.address, city: 'Kazan' },
}

console.log(original.address.city) // Moscow
console.log(moved.address.city) // Kazan
console.log(moved.tags === original.tags) // true: неизменная ветка общая

// Глубокая копия
// ===============================
const deep = structuredClone(original)
deep.tags.push('fp')

console.log(original.tags) // ["js"]
console.log(deep.tags) // ["js", "fp"]`,
        en: `// A shallow copy
// ===============================
const user = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const shallow = { ...user }
shallow.name = 'Olga' // the top level was copied: user keeps its name
shallow.address.city = 'Kazan' // address is shared: the city changes for user too

console.log(user.name) // Anna
console.log(user.address.city) // Kazan

// Copying every level on the path to the change
// ===============================
const original = { name: 'Anna', address: { city: 'Moscow' }, tags: ['js'] }

const moved = {
  ...original,
  address: { ...original.address, city: 'Kazan' },
}

console.log(original.address.city) // Moscow
console.log(moved.address.city) // Kazan
console.log(moved.tags === original.tags) // true: the unchanged branch is shared

// A deep copy
// ===============================
const deep = structuredClone(original)
deep.tags.push('fp')

console.log(original.tags) // ["js"]
console.log(deep.tags) // ["js", "fp"]`,
      },
    },
    {
      type: 'text',
      ru: "structuredClone копирует структуру целиком, на любую глубину: вложенные объекты и массивы, Date, Map, Set и даже циклические ссылки. Функции он копировать не умеет и бросает DataCloneError, а экземпляр класса превращается в обычный объект: прототип и методы класса теряются. JSON.parse(JSON.stringify(obj)) теряет больше: Date становится строкой, Map и Set — пустыми объектами, поля со значением undefined и функциями пропадают, NaN превращается в null. structuredClone есть во всех основных браузерах с 2022 года и в Node.js с версии 17.",
      en: "structuredClone copies the whole structure to any depth: nested objects and arrays, Date, Map, Set and even circular references. It cannot copy functions and throws a DataCloneError, and a class instance turns into a plain object: the class prototype and methods are lost. JSON.parse(JSON.stringify(obj)) loses more: a Date becomes a string, Map and Set become empty objects, fields holding undefined or functions disappear, and NaN turns into null. structuredClone is available in all major browsers since 2022 and in Node.js since version 17.",
    },
    {
      type: 'heading',
      ru: "Object.freeze",
      en: "Object.freeze",
    },
    {
      type: 'text',
      ru: "Object.freeze запрещает добавлять, удалять и менять свойства объекта и возвращает тот же объект. Заморозка поверхностная: вложенные объекты остаются изменяемыми, их замораживают отдельно. Что произойдёт при попытке записи, зависит от режима: в нестрогом режиме присваивание молча игнорируется, в строгом бросается TypeError. Код в песочнице курса исполняется в нестрогом режиме, а код ES-модулей (файлов с import и export) и тел классов всегда строгий: там та же запись бросит TypeError.",
      en: "Object.freeze forbids adding, deleting and changing an object's properties and returns the same object. Freezing is shallow: nested objects stay mutable and are frozen separately. What happens on an attempt to write depends on the mode: in sloppy (non-strict) mode the assignment is silently ignored, in strict mode a TypeError is thrown. Code in the course playground runs in non-strict mode, while the code of ES modules (files with import and export) and of class bodies is always strict: there the same write throws a TypeError.",
    },
    {
      type: 'code',
      code: {
        ru: `// Object.freeze
// ===============================
const config = Object.freeze({ mode: 'prod', limits: { requests: 100 } })

// нестрогий режим: присваивание молча игнорируется
config.mode = 'dev'
console.log(config.mode) // prod

// строгий режим: та же запись бросает TypeError
const setModeStrict = () => {
  'use strict'
  config.mode = 'dev'
}

try {
  setModeStrict()
} catch (error) {
  console.log(\`строгий режим: \${error.name}\`) // строгий режим: TypeError
}

// методы массива бросают TypeError в любом режиме
const frozenList = Object.freeze([1, 2])

try {
  frozenList.push(3)
} catch (error) {
  console.log(\`push: \${error.name}\`) // push: TypeError
}

// заморозка поверхностная: вложенный объект можно менять
config.limits.requests = 1
console.log(config.limits.requests) // 1
console.log(\`config: \${Object.isFrozen(config)}, limits: \${Object.isFrozen(config.limits)}\`) // config: true, limits: false`,
        en: `// Object.freeze
// ===============================
const config = Object.freeze({ mode: 'prod', limits: { requests: 100 } })

// non-strict mode: the assignment is silently ignored
config.mode = 'dev'
console.log(config.mode) // prod

// strict mode: the same write throws a TypeError
const setModeStrict = () => {
  'use strict'
  config.mode = 'dev'
}

try {
  setModeStrict()
} catch (error) {
  console.log(\`strict mode: \${error.name}\`) // strict mode: TypeError
}

// array methods throw a TypeError in any mode
const frozenList = Object.freeze([1, 2])

try {
  frozenList.push(3)
} catch (error) {
  console.log(\`push: \${error.name}\`) // push: TypeError
}

// freezing is shallow: the nested object can still be changed
config.limits.requests = 1
console.log(config.limits.requests) // 1
console.log(\`config: \${Object.isFrozen(config)}, limits: \${Object.isFrozen(config.limits)}\`) // config: true, limits: false`,
      },
    },
    {
      type: 'text',
      ru: "Исключение из правила нестрогого режима — встроенные методы: push, sort и другие мутирующие методы на замороженном массиве бросают TypeError всегда, потому что спецификация требует от них ошибки, если запись не удалась. Object.freeze помогает поймать случайную мутацию, но копий не делает: новое значение по-прежнему создаётся через spread или structuredClone.",
      en: "The exception to the non-strict rule is built-in methods: push, sort and other mutating methods on a frozen array always throw a TypeError, because the specification requires them to fail when a write does not succeed. Object.freeze helps catch accidental mutation, but it makes no copies: a new value is still created with spread or structuredClone.",
    },
    {
      type: 'heading',
      ru: "Немутирующие методы массивов",
      en: "Non-mutating array methods",
    },
    {
      type: 'text',
      ru: "Часть методов массива меняет сам массив: push, pop, shift, unshift, splice, sort, reverse, fill и copyWithin. Другие возвращают новый массив и исходный не трогают: map, filter, concat, slice. В ES2023 появились немутирующие версии сортировки, разворота, splice и замены элемента.",
      en: "Some array methods change the array itself: push, pop, shift, unshift, splice, sort, reverse, fill and copyWithin. Others return a new array and leave the original alone: map, filter, concat, slice. ES2023 added non-mutating versions of sorting, reversing, splice and replacing an element.",
    },
    {
      type: 'table',
      caption: {
        ru: "Мутирующие методы массива и их замены без мутации",
        en: "Mutating array methods and their non-mutating replacements",
      },
      columns: [
        { ru: "Задача", en: "Task" },
        { ru: "Меняет массив", en: "Changes the array" },
        { ru: "Возвращает новый массив", en: "Returns a new array" },
      ],
      rows: [
        [
          { ru: "Добавить в конец", en: "Append" },
          { ru: "push(x)", en: "push(x)" },
          { ru: "concat(x) или [...arr, x]", en: "concat(x) or [...arr, x]" },
        ],
        [
          { ru: "Отсортировать", en: "Sort" },
          { ru: "sort(fn)", en: "sort(fn)" },
          { ru: "toSorted(fn) или [...arr].sort(fn)", en: "toSorted(fn) or [...arr].sort(fn)" },
        ],
        [
          { ru: "Развернуть", en: "Reverse" },
          { ru: "reverse()", en: "reverse()" },
          { ru: "toReversed() или [...arr].reverse()", en: "toReversed() or [...arr].reverse()" },
        ],
        [
          { ru: "Удалить или вставить элементы", en: "Remove or insert elements" },
          { ru: "splice(start, count, ...items)", en: "splice(start, count, ...items)" },
          { ru: "toSpliced(start, count, ...items) или slice и spread", en: "toSpliced(start, count, ...items) or slice and spread" },
        ],
        [
          { ru: "Заменить элемент", en: "Replace an element" },
          { ru: "arr[i] = x", en: "arr[i] = x" },
          { ru: "with(i, x) или map", en: "with(i, x) or map" },
        ],
      ],
    },
    {
      type: 'text',
      ru: "toSorted, toReversed, toSpliced и with вошли в стандарт ES2023. Их поддерживают Chrome и Edge с версии 110, Firefox со 115, Safari с 16 и Node.js с 20. Если проект должен работать в браузерах старше, копируйте массив и вызывайте мутирующий метод на копии ([...arr].sort(fn)) или подключите полифил.",
      en: "toSorted, toReversed, toSpliced and with became part of the ES2023 standard. They are supported by Chrome and Edge from version 110, Firefox from 115, Safari from 16 and Node.js from 20. If a project has to run in older browsers, copy the array and call the mutating method on the copy ([...arr].sort(fn)), or add a polyfill.",
    },
    {
      type: 'code',
      code: {
        ru: `// Немутирующие методы массивов
// ===============================
const scores = [40, 95, 70]

// bestScore :: [Number] -> Number
// toSorted из ES2023 сортирует копию; без ES2023 то же: [...list].sort((a, b) => b - a)[0]
const bestScore = (list) => list.toSorted((a, b) => b - a)[0]

console.log(bestScore(scores)) // 95

const added = scores.concat(60) // вместо push
const replaced = scores.with(1, 90) // вместо scores[1] = 90
const withoutFirst = scores.toSpliced(0, 1) // вместо splice(0, 1)
const reversed = scores.toReversed() // вместо reverse()

console.log(added) // [40, 95, 70, 60]
console.log(replaced) // [40, 90, 70]
console.log(withoutFirst) // [95, 70]
console.log(reversed) // [70, 95, 40]
console.log(scores) // [40, 95, 70]: исходный массив не изменился`,
        en: `// Non-mutating array methods
// ===============================
const scores = [40, 95, 70]

// bestScore :: [Number] -> Number
// toSorted from ES2023 sorts a copy; without ES2023 the same is [...list].sort((a, b) => b - a)[0]
const bestScore = (list) => list.toSorted((a, b) => b - a)[0]

console.log(bestScore(scores)) // 95

const added = scores.concat(60) // instead of push
const replaced = scores.with(1, 90) // instead of scores[1] = 90
const withoutFirst = scores.toSpliced(0, 1) // instead of splice(0, 1)
const reversed = scores.toReversed() // instead of reverse()

console.log(added) // [40, 95, 70, 60]
console.log(replaced) // [40, 90, 70]
console.log(withoutFirst) // [95, 70]
console.log(reversed) // [70, 95, 40]
console.log(scores) // [40, 95, 70]: the original array has not changed`,
      },
    },
    {
      type: 'heading',
      ru: "Ramda: assoc, assocPath и evolve",
      en: "Ramda: assoc, assocPath and evolve",
    },
    {
      type: 'text',
      ru: "Функции Ramda не меняют свои аргументы. R.assoc(key, value, obj) возвращает копию объекта с новым значением ключа, R.assocPath(path, value, obj) делает то же по вложенному пути, а R.evolve(transformations, obj) применяет функции к перечисленным ключам, в том числе вложенным, и оставляет остальные как есть. Копируются только объекты на пути к изменению, остальные ветки общие с исходным объектом, как при spread вручную. Обобщение этой идеи — линзы, им посвящён урок «Линзы».",
      en: "Ramda functions do not change their arguments. R.assoc(key, value, obj) returns a copy of the object with the key set to a new value, R.assocPath(path, value, obj) does the same along a nested path, and R.evolve(transformations, obj) applies functions to the listed keys, nested ones included, and leaves the rest as they are. Only the objects on the path to the change are copied; the other branches are shared with the original object, just as with spread by hand. Lenses generalize this idea; they have a lesson of their own, \"Lenses\".",
    },
    {
      type: 'code',
      code: {
        ru: `// assoc, assocPath и evolve берём из Ramda: в песочнице курса она доступна как R
// ===============================
const post = {
  title: 'Immutability',
  author: { name: 'Anna', city: 'Moscow' },
  stats: { views: 10, likes: 2 },
  tags: ['js'],
}

// R.assoc: копия с новым значением ключа
const renamed = R.assoc('title', 'Immutable data', post)

// R.assocPath: копия с новым значением по вложенному пути
const moved = R.assocPath(['author', 'city'], 'Kazan', post)

// R.evolve: функции для нужных ключей, остальные ключи без изменений
const viewed = R.evolve({ stats: { views: R.inc }, tags: R.append('fp') }, post)

console.log(renamed.title) // Immutable data
console.log(moved.author.city) // Kazan
console.log(viewed.stats.views) // 11
console.log(viewed.tags) // ["js", "fp"]

// исходный пост не изменился
console.log(\`\${post.title}, \${post.author.city}, \${post.stats.views}, \${post.tags.length}\`) // Immutability, Moscow, 10, 1

// неизменные ветки общие с исходным постом
console.log(moved.stats === post.stats) // true
console.log(viewed.author === post.author) // true`,
        en: `// assoc, assocPath and evolve come from Ramda: the course playground exposes it as R
// ===============================
const post = {
  title: 'Immutability',
  author: { name: 'Anna', city: 'Moscow' },
  stats: { views: 10, likes: 2 },
  tags: ['js'],
}

// R.assoc: a copy with a new value for the key
const renamed = R.assoc('title', 'Immutable data', post)

// R.assocPath: a copy with a new value along a nested path
const moved = R.assocPath(['author', 'city'], 'Kazan', post)

// R.evolve: functions for the keys you need, the other keys stay as they are
const viewed = R.evolve({ stats: { views: R.inc }, tags: R.append('fp') }, post)

console.log(renamed.title) // Immutable data
console.log(moved.author.city) // Kazan
console.log(viewed.stats.views) // 11
console.log(viewed.tags) // ["js", "fp"]

// the original post has not changed
console.log(\`\${post.title}, \${post.author.city}, \${post.stats.views}, \${post.tags.length}\`) // Immutability, Moscow, 10, 1

// the unchanged branches are shared with the original post
console.log(moved.stats === post.stats) // true
console.log(viewed.author === post.author) // true`,
      },
    },
    {
      type: 'heading',
      ru: "Цена копирования",
      en: "The cost of copying",
    },
    {
      type: 'text',
      ru: "Копия не бесплатна: spread проходит по всем ключам или элементам верхнего уровня, structuredClone — по всей структуре. Для одного обновления это незаметно, но в цикле копии складываются. Частая ловушка — reduce с аккумулятором [...acc, x]: на каждом шаге копируется весь накопленный массив, и для n элементов набирается около n²/2 копирований элементов. Для 1000 элементов это 499 500 копирований, для 10 000 — почти 50 миллионов.",
      en: "A copy is not free: spread walks over every key or element of the top level, and structuredClone over the whole structure. For a single update this goes unnoticed, but in a loop the copies add up. A common trap is reduce with the accumulator [...acc, x]: every step copies the whole accumulated array, so n elements add up to about n²/2 element copies. For 1,000 elements that is 499,500 copies, for 10,000 it is almost 50 million.",
    },
    {
      type: 'text',
      ru: "Иммутабельность важна на границах — там, где данные видит кто-то ещё. Массив, который функция создала сама и ещё никому не отдала, можно спокойно наполнять через push: снаружи этого не видно, и функция остаётся чистой. Для больших коллекций, которые часто обновляются, есть библиотеки со структурным разделением: Immutable.js с постоянными (persistent) структурами данных и Immer, в котором пишут обычный «мутирующий» код для черновика, а получают новый объект.",
      en: "Immutability matters at the boundaries, where someone else can see the data. An array that a function created itself and has not handed to anyone yet can safely be filled with push: nobody outside can see it, and the function stays pure. For large, frequently updated collections there are libraries built on structural sharing: Immutable.js with persistent data structures, and Immer, where you write ordinary \"mutating\" code against a draft and get a new object back.",
    },
  ],
  summary: [
    {
      ru: "При присваивании и передаче в функцию копируется ссылка на объект, а не сам объект: мутация в одном месте видна везде, где есть ссылка на тот же объект. const запрещает переприсваивание, но не изменение объекта.",
      en: "Assignment and passing to a function copy the reference to an object, not the object itself: a mutation in one place is visible wherever there is a reference to the same object. const forbids reassignment, not changing the object.",
    },
    {
      ru: "Spread, Object.assign и slice копируют только верхний уровень. Для вложенного изменения копируют каждый уровень на пути к нему, для полной копии есть structuredClone.",
      en: "Spread, Object.assign and slice copy only the top level. For a nested change, copy every level on the path to it; for a full copy there is structuredClone.",
    },
    {
      ru: "Object.freeze поверхностный: в нестрогом режиме запись в замороженное свойство молча игнорируется, в строгом бросается TypeError.",
      en: "Object.freeze is shallow: in non-strict mode a write to a frozen property is silently ignored, in strict mode it throws a TypeError.",
    },
    {
      ru: "Вместо push, sort, reverse и splice берите concat, slice и spread или методы ES2023 toSorted, toReversed, toSpliced и with. R.assoc, R.assocPath и R.evolve обновляют объекты без мутаций.",
      en: "Instead of push, sort, reverse and splice, use concat, slice and spread, or the ES2023 methods toSorted, toReversed, toSpliced and with. R.assoc, R.assocPath and R.evolve update objects without mutation.",
    },
    {
      ru: "Копии стоят времени и памяти: [...acc, x] в reduce даёт квадратичную сложность. Локальный массив, который ещё никто не видит, можно наполнять через push.",
      en: "Copies cost time and memory: [...acc, x] in reduce leads to quadratic complexity. A local array that nobody else can see yet may be filled with push.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Функции addScoreImpure и topThreeImpure меняют массив, который им передали. Напишите чистые addScore и topThree: первая возвращает новый массив с добавленным результатом, вторая — три лучших результата по убыванию. Исходный массив scores должен остаться прежним.",
        en: "The addScoreImpure and topThreeImpure functions change the array passed to them. Write pure addScore and topThree: the first returns a new array with the score added, the second returns the three best scores in descending order. The original scores array must stay the same.",
      },
      starter: {
        ru: `// addScoreImpure :: ([Number], Number) -> [Number]
// НЕчистая: push меняет переданный массив
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// НЕчистая: sort сортирует переданный массив
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// topThree :: [Number] -> [Number]
// ваш код

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`лучшие три: \${topThree(updated).join(', ')}\`)
console.log(\`исходный массив: \${scores.join(', ')}\`)
console.log(\`новый массив: \${updated.join(', ')}\`)`,
        en: `// addScoreImpure :: ([Number], Number) -> [Number]
// IMpure: push changes the array passed in
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// IMpure: sort sorts the array passed in
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// topThree :: [Number] -> [Number]
// your code

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`top three: \${topThree(updated).join(', ')}\`)
console.log(\`original array: \${scores.join(', ')}\`)
console.log(\`new array: \${updated.join(', ')}\`)`,
      },
      solution: {
        ru: `// addScoreImpure :: ([Number], Number) -> [Number]
// НЕчистая: push меняет переданный массив
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// НЕчистая: sort сортирует переданный массив
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// новый массив вместо push
const addScore = (scores, score) => [...scores, score]

// topThree :: [Number] -> [Number]
// сортируем копию; в ES2023 то же самое делает scores.toSorted((a, b) => b - a)
const topThree = (scores) => [...scores].sort((a, b) => b - a).slice(0, 3)

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`лучшие три: \${topThree(updated).join(', ')}\`)
console.log(\`исходный массив: \${scores.join(', ')}\`)
console.log(\`новый массив: \${updated.join(', ')}\`)`,
        en: `// addScoreImpure :: ([Number], Number) -> [Number]
// IMpure: push changes the array passed in
const addScoreImpure = (scores, score) => {
  scores.push(score)
  return scores
}

// topThreeImpure :: [Number] -> [Number]
// IMpure: sort sorts the array passed in
const topThreeImpure = (scores) => scores.sort((a, b) => b - a).slice(0, 3)

// addScore :: ([Number], Number) -> [Number]
// a new array instead of push
const addScore = (scores, score) => [...scores, score]

// topThree :: [Number] -> [Number]
// we sort a copy; in ES2023 scores.toSorted((a, b) => b - a) does the same
const topThree = (scores) => [...scores].sort((a, b) => b - a).slice(0, 3)

const scores = [40, 95, 70, 85]
const updated = addScore(scores, 60)

console.log(\`top three: \${topThree(updated).join(', ')}\`)
console.log(\`original array: \${scores.join(', ')}\`)
console.log(\`new array: \${updated.join(', ')}\`)`,
      },
      expected: {
        ru: "лучшие три: 95, 85, 70\nисходный массив: 40, 95, 70, 85\nновый массив: 40, 95, 70, 85, 60",
        en: "top three: 95, 85, 70\noriginal array: 40, 95, 70, 85\nnew array: 40, 95, 70, 85, 60",
      },
    },
    {
      task: {
        ru: "Функция moveToImpure меняет город прямо в переданном состоянии. Напишите чистую moveTo(city, state): скопируйте через spread каждый уровень на пути state.user.address. Затем напишите moveToRamda с тем же результатом через R.assocPath. Проверьте, что исходное состояние не изменилось, объект user новый, а ветка cart, которую вы не трогали, осталась общей.",
        en: "The moveToImpure function changes the city right inside the state passed to it. Write a pure moveTo(city, state): use spread to copy every level on the path state.user.address. Then write moveToRamda with the same result using R.assocPath. Check that the original state has not changed, the user object is new, and the cart branch you did not touch is still shared.",
      },
      starter: {
        ru: `const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// НЕчистая: меняет переданное состояние
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// moveToRamda :: (String, Object) -> Object
// ваш код: moveTo через spread, moveToRamda через R.assocPath

const next = moveTo('Kazan', state)

console.log(\`было: \${state.user.address.city}, стало: \${next.user.address.city}\`)
console.log(\`user новый: \${next.user !== state.user}\`)
console.log(\`cart общий: \${next.cart === state.cart}\`)
console.log(\`R.assocPath даёт то же: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`,
        en: `const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// IMpure: it changes the state passed in
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// moveToRamda :: (String, Object) -> Object
// your code: moveTo with spread, moveToRamda with R.assocPath

const next = moveTo('Kazan', state)

console.log(\`before: \${state.user.address.city}, after: \${next.user.address.city}\`)
console.log(\`new user: \${next.user !== state.user}\`)
console.log(\`shared cart: \${next.cart === state.cart}\`)
console.log(\`R.assocPath gives the same: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`,
      },
      solution: {
        ru: `const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// НЕчистая: меняет переданное состояние
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// новые объекты только на пути state -> user -> address, cart берём как есть
const moveTo = (city, state) => ({
  ...state,
  user: {
    ...state.user,
    address: { ...state.user.address, city },
  },
})

// moveToRamda :: (String, Object) -> Object
const moveToRamda = (city, state) => R.assocPath(['user', 'address', 'city'], city, state)

const next = moveTo('Kazan', state)

console.log(\`было: \${state.user.address.city}, стало: \${next.user.address.city}\`)
console.log(\`user новый: \${next.user !== state.user}\`)
console.log(\`cart общий: \${next.cart === state.cart}\`)
console.log(\`R.assocPath даёт то же: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`,
        en: `const state = {
  user: { name: 'Anna', address: { city: 'Moscow', zip: '101000' } },
  cart: [{ title: 'book', qty: 1 }],
}

// moveToImpure :: (String, Object) -> Object
// IMpure: it changes the state passed in
const moveToImpure = (city, state) => {
  state.user.address.city = city
  return state
}

// moveTo :: (String, Object) -> Object
// new objects only on the path state -> user -> address, cart is taken as it is
const moveTo = (city, state) => ({
  ...state,
  user: {
    ...state.user,
    address: { ...state.user.address, city },
  },
})

// moveToRamda :: (String, Object) -> Object
const moveToRamda = (city, state) => R.assocPath(['user', 'address', 'city'], city, state)

const next = moveTo('Kazan', state)

console.log(\`before: \${state.user.address.city}, after: \${next.user.address.city}\`)
console.log(\`new user: \${next.user !== state.user}\`)
console.log(\`shared cart: \${next.cart === state.cart}\`)
console.log(\`R.assocPath gives the same: \${JSON.stringify(moveToRamda('Kazan', state)) === JSON.stringify(next)}\`)`,
      },
      expected: {
        ru: "было: Moscow, стало: Kazan\nuser новый: true\ncart общий: true\nR.assocPath даёт то же: true",
        en: "before: Moscow, after: Kazan\nnew user: true\nshared cart: true\nR.assocPath gives the same: true",
      },
    },
  ],
}

export default lesson
