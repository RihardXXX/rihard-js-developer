import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'fp-in-typescript-and-effect',
  title: {
    ru: "ФП в TypeScript и Effect",
    en: "FP in TypeScript and Effect",
  },
  description: {
    ru: "От JavaScript к TypeScript и Effect 4: pipe и Option вместо Maybe, Result вместо Either, ошибки в типе Effect, Schema и где Effect окупается.",
    en: "From JavaScript to TypeScript and Effect 4: pipe and Option instead of Maybe, Result instead of Either, typed errors, Schema, and where Effect pays off.",
  },
  goal: {
    ru: "Увидеть, как идеи курса — композиция через pipe, Maybe и Either, эффекты как значения — выглядят в TypeScript на Effect 4, научиться читать тип Effect<A, E, R> и решать, когда переход на Effect окупается.",
    en: "See how the ideas of the course (composition with pipe, Maybe and Either, effects as values) look in TypeScript with Effect 4, learn to read the Effect<A, E, R> type and decide when moving to Effect pays off.",
  },
  blocks: [
    {
      type: 'text',
      ru: "Этот урок — мост от курса к продакшен-коду. Сквозной пример из урока «Функциональное программирование» — взять пользователей онлайн старше 20 лет и получить имя первого — здесь переписан на TypeScript с библиотекой Effect 4. Задача та же, и ответ тот же — John, а по шагам видно, что добавляет каждый слой: типы, Option вместо Maybe, проверку входящих данных и ошибки в типе программы.",
      en: "This lesson is a bridge from the course to production code. The running example from the \"Functional programming\" lesson (take the users who are online and older than 20 and get the name of the first one) is rewritten here in TypeScript with the Effect 4 library. The task and the answer stay the same (John), and step by step you can see what each layer adds: types, Option instead of Maybe, checking the incoming data, and errors in the type of the program.",
    },
    {
      type: 'text',
      ru: "Курс написан на JavaScript, потому что идеи функционального программирования не зависят от системы типов, а на JS они видны без лишнего синтаксиса. В продакшене их часто пишут на TypeScript: там отсутствие значения и возможные ошибки становятся частью сигнатуры, и их обработку проверяет компилятор. Примеры на TypeScript в этом уроке только для чтения, песочница их не запускает. Оба упражнения в конце урока — на чистом JavaScript, их можно запустить в песочнице, как обычно.",
      en: "The course is written in JavaScript because the ideas of functional programming do not depend on a type system, and in JS they are visible without extra syntax. In production they are often written in TypeScript: there a missing value and possible errors become part of the signature, and the compiler checks how the code handles them. The TypeScript examples in this lesson are for reading only, the playground does not run them. Both exercises at the end of the lesson are in plain JavaScript and run in the playground as usual.",
    },
    {
      type: 'heading',
      ru: "Как читать TypeScript",
      en: "How to read TypeScript",
    },
    {
      type: 'text',
      ru: "TypeScript — это JavaScript с аннотациями типов: компилятор их проверяет, а перед запуском стирает. Аннотация пишется через двоеточие: name: string — строка, age: number — число. Union-тип 'online' | 'offline' разрешает только одно из перечисленных значений. Дженерик <A> — параметр типа, та же переменная a из урока «Нотация типов Хиндли–Милнера», только с большой буквы: сигнатура head :: [a] -> Maybe a в TypeScript записывается как <A>(self: ReadonlyArray<A>) => Option<A>. ReadonlyArray — массив, который функция обещает не менять.",
      en: "TypeScript is JavaScript with type annotations: the compiler checks them and strips them before running. An annotation is written after a colon: name: string is a string, age: number is a number. The union type 'online' | 'offline' allows only one of the listed values. The generic <A> is a type parameter, the same variable a from the \"Hindley–Milner type notation\" lesson, only capitalized: the signature head :: [a] -> Maybe a is written in TypeScript as <A>(self: ReadonlyArray<A>) => Option<A>. ReadonlyArray is an array that the function promises not to change.",
    },
    {
      type: 'code',
      lang: 'ts',
      code: {
        ru: `import { Option } from 'effect'

// Union-тип: статус может быть только одной из двух строк
type Status = 'online' | 'offline'

// Форма пользователя: имена полей и их типы
interface User {
  readonly name: string
  readonly status: Status
  readonly age: number
}

// Хиндли–Милнер: head :: [a] -> Maybe a
// TypeScript:    <A>(self: ReadonlyArray<A>) => Option<A>
// <A> — параметр типа, та же переменная a, только с большой буквы
// Option.Option<A> — тип Option из модуля Option
const head = <A>(self: ReadonlyArray<A>): Option.Option<A> =>
  self.length > 0 ? Option.some(self[0]) : Option.none()

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
]

console.log(Option.isSome(head(users))) // true
console.log(Option.isNone(head([]))) // true

// head(42) не скомпилируется: число не массив
// { name: 'Bob', status: 'away', age: 30 } тоже: 'away' не входит в Status`,
        en: `import { Option } from 'effect'

// Union type: the status can only be one of the two strings
type Status = 'online' | 'offline'

// The shape of a user: field names and their types
interface User {
  readonly name: string
  readonly status: Status
  readonly age: number
}

// Hindley–Milner: head :: [a] -> Maybe a
// TypeScript:     <A>(self: ReadonlyArray<A>) => Option<A>
// <A> is a type parameter, the same variable a, only capitalized
// Option.Option<A> is the Option type from the Option module
const head = <A>(self: ReadonlyArray<A>): Option.Option<A> =>
  self.length > 0 ? Option.some(self[0]) : Option.none()

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
]

console.log(Option.isSome(head(users))) // true
console.log(Option.isNone(head([]))) // true

// head(42) will not compile: a number is not an array
// { name: 'Bob', status: 'away', age: 30 } won't compile either:
// 'away' is not a Status`,
      },
    },
    {
      type: 'heading',
      ru: "pipe и Option вместо S.pipe и Maybe",
      en: "pipe and Option instead of S.pipe and Maybe",
    },
    {
      type: 'text',
      ru: "Теперь чистая часть примера. Функция pipe из effect принимает сначала значение, а затем шаги конвейера: pipe(x, f, g) делает то же, что S.pipe([f, g])(x) в Sanctuary. Если значения ещё нет и нужна сама функция-конвейер, её собирает flow(f, g). Модуль Array из effect даёт filter и head, а head возвращает Option — аналог Maybe: Some со значением или None.",
      en: "Now the pure part of the example. The pipe function from effect takes the value first and then the steps of the pipeline: pipe(x, f, g) does the same as S.pipe([f, g])(x) in Sanctuary. If there is no value yet and you need the pipeline function itself, flow(f, g) builds it. The Array module from effect provides filter and head, and head returns an Option, the counterpart of Maybe: Some with a value or None.",
    },
    {
      type: 'code',
      lang: 'ts',
      code: {
        ru: `// Array из effect назван Arr, чтобы не закрыть встроенный Array
import { Array as Arr, Option, pipe } from 'effect'

interface User {
  readonly name: string
  readonly status: 'online' | 'offline'
  readonly age: number
}

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 18 },
  { name: 'Angel', status: 'online', age: 18 },
]

const isOnline = (user: User): boolean => user.status === 'online'
const olderThan = (age: number) => (user: User): boolean => user.age > age

// searchOnlineUser :: [User] -> String
const searchOnlineUser = (list: ReadonlyArray<User>): string =>
  pipe(
    list, // в pipe из effect первым идёт значение, а не массив функций
    Arr.filter(isOnline), // только пользователи онлайн
    Arr.filter(olderThan(20)), // только старше 20 лет
    Arr.head, // Option<User>: Some(пользователь) или None для пустого списка
    Option.map((user) => user.name), // имя внутри Option
    Option.getOrElse(() => ''), // достаём имя, для None будет ''
  )

console.log(searchOnlineUser(users)) // 'John'
console.log(searchOnlineUser([]) === '') // true`,
        en: `// Array from effect is renamed Arr so as not to shadow the built-in Array
import { Array as Arr, Option, pipe } from 'effect'

interface User {
  readonly name: string
  readonly status: 'online' | 'offline'
  readonly age: number
}

const users: ReadonlyArray<User> = [
  { name: 'John', status: 'online', age: 25 },
  { name: 'Alex', status: 'offline', age: 18 },
  { name: 'Angel', status: 'online', age: 18 },
]

const isOnline = (user: User): boolean => user.status === 'online'
const olderThan = (age: number) => (user: User): boolean => user.age > age

// searchOnlineUser :: [User] -> String
const searchOnlineUser = (list: ReadonlyArray<User>): string =>
  pipe(
    list, // in effect's pipe the value comes first, not an array of functions
    Arr.filter(isOnline), // only the users who are online
    Arr.filter(olderThan(20)), // only those older than 20
    Arr.head, // Option<User>: Some(user), or None for an empty list
    Option.map((user) => user.name), // the name inside the Option
    Option.getOrElse(() => ''), // take the name out, '' for None
  )

console.log(searchOnlineUser(users)) // 'John'
console.log(searchOnlineUser([]) === '') // true`,
      },
    },
    {
      type: 'text',
      ru: "Ответ тот же — John. Одно отличие легко пропустить: Option.getOrElse принимает функцию, которая вернёт запасное значение, а S.fromMaybe — само значение. Остальное соответствует почти один к одному, как показывает таблица. В Effect 3 модуль Result назывался Either, с вариантами Right и Left, поэтому в статьях и примерах, написанных до версии 4, встречается Either.",
      en: "The answer is the same: John. One difference is easy to miss: Option.getOrElse takes a function that returns the fallback, while S.fromMaybe takes the value itself. The rest maps almost one to one, as the table shows. In Effect 3 the Result module was called Either, with the variants Right and Left, so articles and examples written before version 4 use Either.",
    },
    {
      type: 'table',
      caption: { ru: "Sanctuary и Effect 4: что чему соответствует", en: "Sanctuary and Effect 4: what maps to what" },
      columns: [
        { ru: "Sanctuary", en: "Sanctuary" },
        { ru: "Effect 4", en: "Effect 4" },
        { ru: "Смысл", en: "Meaning" },
      ],
      rows: [
        [
          { ru: "Maybe a", en: "Maybe a" },
          { ru: "Option<A>", en: "Option<A>" },
          { ru: "значения может не быть", en: "the value may be missing" },
        ],
        [
          { ru: "Just (x), Nothing", en: "Just (x), Nothing" },
          { ru: "Some и None: Option.some(x), Option.none()", en: "Some and None: Option.some(x), Option.none()" },
          { ru: "значение есть или его нет", en: "there is a value or there is none" },
        ],
        [
          { ru: "Either a b", en: "Either a b" },
          { ru: "Result<A, E>", en: "Result<A, E>" },
          { ru: "результат или ошибка; в Result сначала тип успеха, затем тип ошибки", en: "a result or an error; Result lists the success type first, then the error type" },
        ],
        [
          { ru: "Right (x), Left (e)", en: "Right (x), Left (e)" },
          { ru: "Success и Failure: Result.succeed(x), Result.fail(e)", en: "Success and Failure: Result.succeed(x), Result.fail(e)" },
          { ru: "успех или ошибка с причиной", en: "a success or an error with a reason" },
        ],
        [
          { ru: "S.map(f)", en: "S.map(f)" },
          { ru: "Option.map(f)", en: "Option.map(f)" },
          { ru: "применить f к значению внутри", en: "apply f to the value inside" },
        ],
        [
          { ru: "S.chain(f)", en: "S.chain(f)" },
          { ru: "Option.flatMap(f)", en: "Option.flatMap(f)" },
          { ru: "f сама возвращает Option: применить и снять лишний слой", en: "f returns an Option itself: apply it and remove the extra layer" },
        ],
        [
          { ru: "S.fromMaybe(x)", en: "S.fromMaybe(x)" },
          { ru: "Option.getOrElse(() => x)", en: "Option.getOrElse(() => x)" },
          { ru: "достать значение с запасным; в Effect запасное — функция", en: "take the value out with a fallback; in Effect the fallback is a function" },
        ],
        [
          { ru: "S.either(f)(g)", en: "S.either(f)(g)" },
          { ru: "Result.match({ onFailure: f, onSuccess: g })", en: "Result.match({ onFailure: f, onSuccess: g })" },
          { ru: "обработать оба случая на выходе", en: "handle both cases at the exit" },
        ],
        [
          { ru: "S.pipe([f, g])(x)", en: "S.pipe([f, g])(x)" },
          { ru: "pipe(x, f, g)", en: "pipe(x, f, g)" },
          { ru: "конвейер; в Effect значение идёт первым", en: "a pipeline; in Effect the value comes first" },
        ],
      ],
    },
    {
      type: 'heading',
      ru: "Effect<A, E, R>",
      en: "Effect<A, E, R>",
    },
    {
      type: 'text',
      ru: "В уроке «Каррирование и Асинхронность (Эволюция)» запросы были промисами, а ошибка любого шага попадала в один catch. Промис начинает работу в момент создания, и по его типу не видно, что попадёт в catch. Effect устроен иначе: это ленивое описание работы, значение, которое можно хранить, передавать и собирать из частей. Ничего не выполняется, пока описание не передадут в Effect.runPromise или Effect.runSync. У типа Effect<A, E, R> три параметра: A — тип результата, E — ошибки, которые могут случиться, R — сервисы, нужные для запуска. Если ошибок или сервисов нет, на их месте стоит never — тип без единого значения; незаписанные E и R тоже равны never, поэтому Effect<string> — это Effect<string, never, never>. Возможная ошибка видна в сигнатуре так же, как возможное отсутствие значения видно в Maybe a.",
      en: "In the \"Currying and asynchrony (evolution)\" lesson the requests were promises, and an error at any step ended up in a single catch. A promise starts working the moment it is created, and its type does not show what may end up in catch. Effect works differently: it is a lazy description of the work, a value that can be stored, passed around and assembled from parts. Nothing runs until the description is passed to Effect.runPromise or Effect.runSync. The Effect<A, E, R> type has three parameters: A is the type of the result, E is the errors that may happen, R is the services needed to run it. When there are no errors or services, their place is taken by never, a type with no values; omitted E and R are never as well, so Effect<string> is Effect<string, never, never>. A possible error is visible in the signature just as a possible missing value is visible in Maybe a.",
    },
    {
      type: 'heading',
      ru: "Schema: проверка данных на границе",
      en: "Schema: checking data at the boundary",
    },
    {
      type: 'text',
      ru: "Типы TypeScript проверяются только при компиляции, а ответ сервера приходит во время выполнения, и его они не проверят. Об этом предупреждал комментарий в примере урока «Функциональное программирование». Schema описывает данные один раз, и из этого описания получаются и тип, и проверка во время выполнения. Schema.decodeUnknownResult(схема) даёт функцию проверки, а она возвращает Result: Success с проверенными данными или Failure с описанием того, что не так.",
      en: "TypeScript types are checked only at compile time, while a server response arrives at run time, and the types will not check it. The comment in the example from the \"Functional programming\" lesson warned about this. Schema describes the data once, and that description gives both the type and a check at run time. Schema.decodeUnknownResult(schema) gives a checking function, and it returns a Result: Success with the checked data or Failure describing what is wrong.",
    },
    {
      type: 'code',
      lang: 'ts',
      code: {
        ru: `import { Result, Schema } from 'effect'

// Схема описывает данные один раз: из неё получаются и тип, и проверка
const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// Тип выводится из схемы, interface руками писать не нужно
type User = typeof User.Type

const Users = Schema.Array(User)

// Проверка возвращает Result: Success с данными или Failure с ошибкой
const check = (data: unknown): string =>
  Result.match(Schema.decodeUnknownResult(Users)(data), {
    onSuccess: (users: ReadonlyArray<User>) => 'пользователей: ' + users.length,
    onFailure: () => 'данные не прошли проверку',
  })

// Ответы «сервера»: во втором возраст пришёл строкой
console.log(check([{ name: 'John', status: 'online', age: 25 }]))
// 'пользователей: 1'
console.log(check([{ name: 'Alex', status: 'offline', age: '18' }]))
// 'данные не прошли проверку'`,
        en: `import { Result, Schema } from 'effect'

// A schema describes the data once: it gives both the type and the check
const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// The type is derived from the schema, no need to write an interface by hand
type User = typeof User.Type

const Users = Schema.Array(User)

// The check returns a Result: Success with the data or Failure with an error
const check = (data: unknown): string =>
  Result.match(Schema.decodeUnknownResult(Users)(data), {
    onSuccess: (users: ReadonlyArray<User>) => 'users: ' + users.length,
    onFailure: () => 'data failed the check',
  })

// Responses from the "server": in the second one the age came as a string
console.log(check([{ name: 'John', status: 'online', age: 25 }]))
// 'users: 1'
console.log(check([{ name: 'Alex', status: 'offline', age: '18' }]))
// 'data failed the check'`,
      },
    },
    {
      type: 'heading',
      ru: "Программа целиком",
      en: "The whole program",
    },
    {
      type: 'text',
      ru: "Осталось собрать всё в одну программу. Effect.gen читается как async/await: вместо await пишется yield*, а ошибки не уходят в общий catch, а копятся в типе. Ошибки с тегом объявляются через Data.TaggedError: поле _tag отличает одну ошибку от другой, а Effect.catchTag обрабатывает ошибку по её тегу. Option в версии 4 — не эффект, поэтому его переводят в эффект через Effect.fromOption и указывают, какой ошибкой станет None.",
      en: "What remains is to assemble everything into one program. Effect.gen reads like async/await: yield* is written instead of await, and errors do not go to a shared catch but accumulate in the type. Tagged errors are declared with Data.TaggedError: the _tag field tells one error from another, and Effect.catchTag handles an error by its tag. In version 4 an Option is not an effect, so it is turned into one with Effect.fromOption, which also states the error that None becomes.",
    },
    {
      type: 'code',
      lang: 'ts',
      code: {
        ru: `import { Array as Arr, Data, Effect, pipe, Schema } from 'effect'

const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// Ошибки с тегом: поле _tag отличает одну ошибку от другой
class FetchError extends Data.TaggedError('FetchError')<{
  readonly reason: string
}> {}
class UserNotFound extends Data.TaggedError('UserNotFound')<{}> {}

// «Сервер»: эффект, который может упасть с FetchError
// fetchAllUsers :: Effect<unknown, FetchError>
const fetchAllUsers = Effect.tryPromise({
  try: (): Promise<unknown> => Promise.resolve([
    { name: 'John', status: 'online', age: 25 },
    { name: 'Alex', status: 'offline', age: 18 },
    { name: 'Angel', status: 'online', age: 18 },
  ]),
  catch: (cause) => new FetchError({ reason: String(cause) }),
})

// Effect.gen читается как async/await: yield* вместо await
// program :: Effect<string, FetchError | SchemaError | UserNotFound>
const program = Effect.gen(function* () {
  const data = yield* fetchAllUsers
  const users = yield* Schema.decodeUnknownEffect(Schema.Array(User))(data)
  const first = pipe(
    users,
    Arr.filter((user) => user.status === 'online' && user.age > 20),
    Arr.head,
  )
  // Option не эффект: переводим его в эффект со своей ошибкой
  const user = yield* Effect.fromOption(first, () => new UserNotFound())
  return user.name
})

// Пока ничего не выполнено: program — только описание работы.
// Обработанные ошибки уходят из типа, в конце Effect<string, never>
const safe = program.pipe(
  Effect.catchTag('UserNotFound', () => Effect.succeed('')),
  Effect.catch(() => Effect.succeed('сервис недоступен')),
)

Effect.runPromise(safe).then(console.log) // 'John'`,
        en: `import { Array as Arr, Data, Effect, pipe, Schema } from 'effect'

const User = Schema.Struct({
  name: Schema.String,
  status: Schema.Literals(['online', 'offline']),
  age: Schema.Number,
})

// Tagged errors: the _tag field tells one error from another
class FetchError extends Data.TaggedError('FetchError')<{
  readonly reason: string
}> {}
class UserNotFound extends Data.TaggedError('UserNotFound')<{}> {}

// The "server": an effect that may fail with FetchError
// fetchAllUsers :: Effect<unknown, FetchError>
const fetchAllUsers = Effect.tryPromise({
  try: (): Promise<unknown> => Promise.resolve([
    { name: 'John', status: 'online', age: 25 },
    { name: 'Alex', status: 'offline', age: 18 },
    { name: 'Angel', status: 'online', age: 18 },
  ]),
  catch: (cause) => new FetchError({ reason: String(cause) }),
})

// Effect.gen reads like async/await: yield* instead of await
// program :: Effect<string, FetchError | SchemaError | UserNotFound>
const program = Effect.gen(function* () {
  const data = yield* fetchAllUsers
  const users = yield* Schema.decodeUnknownEffect(Schema.Array(User))(data)
  const first = pipe(
    users,
    Arr.filter((user) => user.status === 'online' && user.age > 20),
    Arr.head,
  )
  // Option is not an effect: turn it into an effect with its own error
  const user = yield* Effect.fromOption(first, () => new UserNotFound())
  return user.name
})

// Nothing has run yet: program is only a description of the work.
// Handled errors leave the type, at the end it is Effect<string, never>
const safe = program.pipe(
  Effect.catchTag('UserNotFound', () => Effect.succeed('')),
  Effect.catch(() => Effect.succeed('service unavailable')),
)

Effect.runPromise(safe).then(console.log) // 'John'`,
      },
    },
    {
      type: 'text',
      ru: "Тип program говорит, что программа вернёт строку или завершится одной из трёх ошибок: FetchError, SchemaError или UserNotFound. Effect.catchTag убирает из типа UserNotFound, Effect.catch обрабатывает все оставшиеся, и в конце остаётся Effect<string, never>: компилятор знает, что необработанных ошибок нет. Без обработки ошибки остались бы в типе, а Effect.runPromise при ошибке вернул бы отклонённый промис.",
      en: "The type of program says that it returns a string or ends with one of three errors: FetchError, SchemaError or UserNotFound. Effect.catchTag removes UserNotFound from the type, Effect.catch handles all the rest, and what is left is Effect<string, never>: the compiler knows there are no unhandled errors. Without the handlers the errors would stay in the type, and Effect.runPromise would return a rejected promise on an error.",
    },
    {
      type: 'text',
      ru: "Третий параметр, R, в примере пуст. В настоящем коде через него проходят зависимости: база данных, HTTP-клиент, конфигурация. Сервис объявляется через Context, реализация подставляется через Layer, а Effect.runPromise принимает только эффект с R = never, поэтому забытую зависимость покажет компилятор. В тестах тот же сервис подменяется другим Layer. Кроме того, в библиотеку встроены конкурентность, повторы и тайм-ауты: Effect.all с параметром concurrency, Effect.retry и Effect.timeout. Это темы для отдельного разговора, здесь достаточно знать, что они есть.",
      en: "The third parameter, R, is empty in the example. In real code dependencies go through it: a database, an HTTP client, configuration. A service is declared with Context, an implementation is provided with Layer, and Effect.runPromise accepts only an effect with R = never, so the compiler points out a forgotten dependency. In tests the same service is replaced with a different Layer. Concurrency, retries and timeouts are built into the library as well: Effect.all with the concurrency option, Effect.retry and Effect.timeout. These are topics for a separate discussion; here it is enough to know they exist.",
    },
    {
      type: 'heading',
      ru: "Где Effect окупается",
      en: "Where Effect pays off",
    },
    {
      type: 'list',
      ordered: false,
      items: [
        {
          ru: "Бэкенд и интеграции с несколькими точками отказа — сеть, база данных, очереди: ошибки видны в типе, а повторы, тайм-ауты и отмена встроены в библиотеку.",
          en: "Backends and integrations with several points of failure (the network, a database, queues): errors are visible in the type, and retries, timeouts and cancellation are built into the library.",
        },
        {
          ru: "Долгоживущий код, который правят многие люди: компилятор показывает необработанные ошибки и незакрытые зависимости.",
          en: "Long-lived code that many people change: the compiler points out unhandled errors and missing dependencies.",
        },
        {
          ru: "Внешние данные: Schema даёт и тип, и проверку из одного описания.",
          en: "External data: Schema gives both the type and the check from one description.",
        },
        {
          ru: "Конкурентные задачи, где нужно ограничить число параллельных операций и уметь их отменять.",
          en: "Concurrent tasks where the number of parallel operations has to be limited and the operations can be cancelled.",
        },
        {
          ru: "Тесты, в которых сервисы подменяются через Layer.",
          en: "Tests in which services are replaced through Layer.",
        },
      ],
    },
    {
      type: 'heading',
      ru: "Где Effect не окупается",
      en: "Where Effect does not pay off",
    },
    {
      type: 'list',
      ordered: false,
      items: [
        {
          ru: "Скрипты, прототипы и простой CRUD-фронтенд: ошибка там стоит дёшево, а освоение библиотеки — дорого.",
          en: "Scripts, prototypes and a simple CRUD front end: an error there is cheap, and learning the library is expensive.",
        },
        {
          ru: "Команда без TypeScript, без времени на обучение или с частой сменой людей: каждому новичку придётся осваивать модель эффектов.",
          en: "A team without TypeScript, without time to learn, or with frequent turnover: every newcomer has to learn the effect model.",
        },
        {
          ru: "Клиентская страница, где важен каждый килобайт: размер бандла стоит измерить на своём проекте до решения.",
          en: "A client page where every kilobyte counts: measure the bundle size on your own project before deciding.",
        },
      ],
    },
    {
      type: 'heading',
      ru: "Версии, fp-ts и что дальше",
      en: "Versions, fp-ts and what's next",
    },
    {
      type: 'text',
      ru: "Примеры написаны для Effect 4: Effect 4.0.0 вышел 1 октября 2026 года, а ветка 3.x ещё получает исправления. Предшественник Effect в TypeScript — библиотека fp-ts. Проект fp-ts объявил о слиянии с экосистемой Effect, и по README fp-ts, Effect можно считать преемником fp-ts v2. Последний релиз fp-ts, 2.16.11, вышел 18 августа 2025 года. Для нового кода разумный выбор — Effect, а fp-ts остаётся там, где он уже используется. Версии и даты приведены по данным реестра npm на октябрь 2026 года.",
      en: "The examples are written for Effect 4: Effect 4.0.0 came out on October 1, 2026, and the 3.x line still receives fixes. The predecessor of Effect in TypeScript is the fp-ts library. The fp-ts project has announced that it is merging with the Effect ecosystem, and according to the fp-ts README, Effect can be regarded as the successor to fp-ts v2. The latest fp-ts release, 2.16.11, came out on August 18, 2025. For new code Effect is the sensible choice, while fp-ts stays where it is already in use. Versions and dates are given according to the npm registry as of October 2026.",
    },
    {
      type: 'text',
      ru: "Дальше — урок «Как выбрать библиотеку для ФП»: в нём Effect сравнивается с Vanilla JS, Lodash, Ramda, Sanctuary и fp-ts по бюджету, этапу проекта и команде. Документация Effect: effect.website.",
      en: "Next comes the \"How to choose an FP library\" lesson: it compares Effect with Vanilla JS, Lodash, Ramda, Sanctuary and fp-ts by budget, project stage and team. The Effect documentation: effect.website.",
    },
  ],
  summary: [
    {
      ru: "pipe из effect принимает сначала значение, затем шаги: pipe(x, f, g). Option с вариантами Some и None соответствует Maybe, Result с Success и Failure — Either, а Option.getOrElse принимает функцию, а не значение.",
      en: "pipe from effect takes the value first and then the steps: pipe(x, f, g). Option with Some and None corresponds to Maybe, Result with Success and Failure to Either, and Option.getOrElse takes a function, not a value.",
    },
    {
      ru: "Effect<A, E, R> — ленивое описание работы: A — результат, E — возможные ошибки, R — нужные сервисы. Ничего не выполняется до Effect.runPromise или Effect.runSync.",
      en: "Effect<A, E, R> is a lazy description of the work: A is the result, E the possible errors, R the required services. Nothing runs before Effect.runPromise or Effect.runSync.",
    },
    {
      ru: "Ошибки с тегом объявляются через Data.TaggedError, Effect.catchTag обрабатывает их по тегу и убирает из типа. Effect.gen читается как async/await, только вместо await пишется yield*.",
      en: "Tagged errors are declared with Data.TaggedError, and Effect.catchTag handles them by tag and removes them from the type. Effect.gen reads like async/await, only yield* is written instead of await.",
    },
    {
      ru: "Schema описывает данные один раз и даёт из этого описания и тип, и проверку во время выполнения: типы TypeScript сами по себе внешние данные не проверяют.",
      en: "Schema describes the data once and gives both the type and a run-time check from that description: TypeScript types on their own do not check external data.",
    },
    {
      ru: "Effect окупается там, где у ошибки высокая цена: бэкенд, интеграции, долгоживущий код, внешние данные. В скриптах, прототипах и простом фронтенде цена освоения обычно выше пользы.",
      en: "Effect pays off where an error is costly: backends, integrations, long-lived code, external data. In scripts, prototypes and a simple front end the cost of learning it usually outweighs the benefit.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Эффект — описание работы, а не сама работа. Повторите эту идею на чистом JavaScript, без библиотек, с именами как в Effect. sync(thunk) возвращает описание { run: thunk } и ничего не вызывает. map(f)(effect) возвращает новое описание: при запуске оно запустит effect и применит f к результату. runSync(effect) запускает описание и возвращает результат. Счётчик calls показывает, сколько раз «запрос» выполнился на самом деле. Сравните с промисом: что покажет счётчик сразу после new Promise?",
        en: "An effect is a description of the work, not the work itself. Repeat this idea in plain JavaScript, without libraries, using the names from Effect. sync(thunk) returns a description { run: thunk } and calls nothing. map(f)(effect) returns a new description: when run, it runs effect and applies f to the result. runSync(effect) runs a description and returns the result. The calls counter shows how many times the \"request\" has actually run. Compare with a promise: what does the counter show right after new Promise?",
      },
      starter: {
        ru: `let calls = 0

// fetchName :: () -> String, «запрос», который считает свои вызовы
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// map :: (a -> b) -> Effect a -> Effect b
// runSync :: Effect a -> a
// ваш код

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`после сборки: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`после двух запусков: \${calls}\`)

new Promise((resolve) => resolve(fetchName()))
console.log(\`сразу после new Promise: \${calls}\`)`,
        en: `let calls = 0

// fetchName :: () -> String, a "request" that counts its calls
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// map :: (a -> b) -> Effect a -> Effect b
// runSync :: Effect a -> a
// your code

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`after building: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`after two runs: \${calls}\`)

new Promise((resolve) => resolve(fetchName()))
console.log(\`right after new Promise: \${calls}\`)`,
      },
      solution: {
        ru: `let calls = 0

// fetchName :: () -> String, «запрос», который считает свои вызовы
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// описание — объект с функцией run, которую пока никто не вызвал
const sync = (thunk) => ({ run: thunk })

// map :: (a -> b) -> Effect a -> Effect b
// новое описание: при запуске запустит effect и применит f, а сейчас ничего не делает
const map = (f) => (effect) => ({ run: () => f(effect.run()) })

// runSync :: Effect a -> a
// единственное место, где работа выполняется
const runSync = (effect) => effect.run()

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`после сборки: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`после двух запусков: \${calls}\`)

// промис начинает работу в момент создания, без всякого запуска
new Promise((resolve) => resolve(fetchName()))
console.log(\`сразу после new Promise: \${calls}\`)`,
        en: `let calls = 0

// fetchName :: () -> String, a "request" that counts its calls
const fetchName = () => {
  calls += 1
  return 'John'
}

// sync :: (() -> a) -> Effect a
// a description is an object with a run function that nobody has called yet
const sync = (thunk) => ({ run: thunk })

// map :: (a -> b) -> Effect a -> Effect b
// a new description: when run, it runs effect and applies f; right now it does nothing
const map = (f) => (effect) => ({ run: () => f(effect.run()) })

// runSync :: Effect a -> a
// the only place where the work is done
const runSync = (effect) => effect.run()

const program = map((name) => name.toUpperCase())(sync(fetchName))
console.log(\`after building: \${calls}\`)
console.log(runSync(program))
console.log(runSync(program))
console.log(\`after two runs: \${calls}\`)

// a promise starts working the moment it is created, with no run at all
new Promise((resolve) => resolve(fetchName()))
console.log(\`right after new Promise: \${calls}\`)`,
      },
      expected: {
        ru: "после сборки: 0\nJOHN\nJOHN\nпосле двух запусков: 2\nсразу после new Promise: 3",
        en: "after building: 0\nJOHN\nJOHN\nafter two runs: 2\nright after new Promise: 3",
      },
    },
    {
      task: {
        ru: "Ошибки с тегом без библиотеки. Результат — объект { _tag: 'Success', value } или { _tag: 'Failure', error }, и у каждой ошибки тоже есть поле _tag. Напишите findOnline(id): если пользователя с таким id нет, верните Failure с ошибкой { _tag: 'UserNotFound', id }; если он не в сети — Failure с { _tag: 'UserOffline', id }; иначе Success с его именем. Затем напишите catchTag(tag, handler): функцию от результата, которая превращает Failure с ошибкой этого тега в Success со значением handler(error), а любой другой результат возвращает без изменений. Так работает Effect.catchTag: обработанная ошибка исчезает, остальные проходят дальше. Только в Effect обработчик возвращает эффект, например Effect.succeed('гость'), а здесь для простоты — само значение.",
        en: "Tagged errors without a library. A result is an object { _tag: 'Success', value } or { _tag: 'Failure', error }, and every error has a _tag field too. Write findOnline(id): if there is no user with that id, return a Failure with the error { _tag: 'UserNotFound', id }; if the user is offline, a Failure with { _tag: 'UserOffline', id }; otherwise a Success with the user's name. Then write catchTag(tag, handler): a function of a result that turns a Failure with an error of that tag into a Success with the value handler(error) and returns any other result unchanged. This is how Effect.catchTag works: the handled error disappears, the others pass through. In Effect, though, the handler returns an effect, for example Effect.succeed('guest'); here it returns the value itself for simplicity.",
      },
      starter: {
        ru: `const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, разбор по _tag результата и ошибки
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
// catchTag(tag, handler) :: Result -> Result
// ваш код

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'гость')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})`,
        en: `const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, matching on the _tag of the result and of the error
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
// catchTag(tag, handler) :: Result -> Result
// your code

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'guest')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})`,
      },
      solution: {
        ru: `const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, разбор по _tag результата и ошибки
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
const findOnline = (id) => {
  const user = users.find((u) => u.id === id)
  if (user === undefined) return fail({ _tag: 'UserNotFound', id })
  if (user.status !== 'online') return fail({ _tag: 'UserOffline', id })
  return succeed(user.name)
}

// catchTag(tag, handler) :: Result -> Result
// ошибка с этим тегом становится Success, всё остальное проходит без изменений
const catchTag = (tag, handler) => (result) =>
  result._tag === 'Failure' && result.error._tag === tag ? succeed(handler(result.error)) : result

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'гость')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})

// UserOffline никто не обработал: ошибка осталась в результате,
// как в Effect она осталась бы в типе E`,
        en: `const succeed = (value) => ({ _tag: 'Success', value })
const fail = (error) => ({ _tag: 'Failure', error })

const users = [
  { id: 1, name: 'John', status: 'online' },
  { id: 2, name: 'Alex', status: 'offline' },
]

// show :: Result -> String, matching on the _tag of the result and of the error
const show = (result) =>
  result._tag === 'Success' ? \`Success (\${result.value})\` : \`Failure (\${result.error._tag})\`

// findOnline :: Number -> Result
const findOnline = (id) => {
  const user = users.find((u) => u.id === id)
  if (user === undefined) return fail({ _tag: 'UserNotFound', id })
  if (user.status !== 'online') return fail({ _tag: 'UserOffline', id })
  return succeed(user.name)
}

// catchTag(tag, handler) :: Result -> Result
// an error with this tag becomes a Success, everything else passes unchanged
const catchTag = (tag, handler) => (result) =>
  result._tag === 'Failure' && result.error._tag === tag ? succeed(handler(result.error)) : result

const ids = [1, 2, 3]
ids.forEach((id) => {
  const result = catchTag('UserNotFound', () => 'guest')(findOnline(id))
  console.log(\`\${id}: \${show(result)}\`)
})

// nobody handled UserOffline: the error stayed in the result,
// just as in Effect it would stay in the E type`,
      },
      expected: {
        ru: "1: Success (John)\n2: Failure (UserOffline)\n3: Success (гость)",
        en: "1: Success (John)\n2: Failure (UserOffline)\n3: Success (guest)",
      },
    },
  ],
}

export default lesson
