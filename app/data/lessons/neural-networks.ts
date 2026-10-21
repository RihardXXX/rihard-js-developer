import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'neural-networks',
  title: { ru: "Нейронные сети и теория категорий", en: "Neural networks and category theory" },
  blocks: [
    {
      type: 'text',
      ru: "Давайте с вами попробуем рассмотреть работу нейронных сетей в рамках теории категорий. Для этого мы вначале повторим понятие теории категорий, о которой мы говорили в предыдущих главах.",
      en: "Let's try to look at how neural networks work through the lens of category theory. To do that, we will first recap the notion of category theory that we discussed in previous chapters.",
    },
    {
      type: 'text',
      ru: "Теория категорий — это совокупность абстрактных объектов (любых) и их морфизмов (стрелок их отношений), а также законов, по которым они работают.",
      en: "Category theory is a collection of abstract objects (any objects) and their morphisms (the arrows of their relationships), as well as the laws by which they operate.",
    },
    {
      type: 'text',
      ru: "Теория категорий в рамках нейронных сетей — это совокупность абстрактных объектов (нейронов или слоёв с нейронами) и их морфизмов (стрелок, то есть порядка вызова нейронов или взаимодействия слоёв с нейронами), а также законов, по которым они работают (композиция).",
      en: "Category theory applied to neural networks is a collection of abstract objects (neurons or layers of neurons) and their morphisms (arrows, that is, the order in which neurons are called or how layers of neurons interact), as well as the laws by which they operate (composition).",
    },
    {
      type: 'text',
      ru: "Представим себе, что нейрон в нейросети — это чистая функция, и она вызывает другие функции в определённом порядке. То же самое можно представить, когда определённые слои взаимодействуют в нейронной сети. Слой — это совокупность нейронов.",
      en: "Imagine that a neuron in a neural network is a pure function that calls other functions in a certain order. The same can be pictured when particular layers interact within a neural network. A layer is a collection of neurons.",
    },
    {
      type: 'text',
      ru: "Порядок построения (архитектура), расположение слоёв между собой и того, какие нейроны находятся в каких слоях, определяется создателем нейросети.",
      en: "The order of construction (the architecture) — the arrangement of layers relative to each other and which neurons belong to which layers — is determined by the creator of the neural network.",
    },
    {
      type: 'text',
      ru: "То есть по сути: — слои это совокупность функций (модули с функциями); — нейроны это функции; — морфизмы это порядок вызова одних функций другими; — веса в нейронной сети это по сути аргументы, которые мы прокидываем при вызове нейрона, то есть функции.",
      en: "So in essence: — layers are collections of functions (modules of functions); — neurons are functions; — morphisms are the order in which some functions call others; — the weights in a neural network are essentially the arguments we pass when calling a neuron, that is, a function.",
    },
    {
      type: 'code',
      pseudo: true,
      code: {
        ru: `// ==== Схема сети из примера ниже ====

           вход x: 2 числа
                 |
                 v
+-------------------------------------+
| скрытый слой: 2 нейрона             |
| нейрон = relu(сумма(вес * вход)     |
|               + смещение)           |
+-------------------------------------+
                 |  2 числа
                 v
+-------------------------------------+
| выходной слой: 1 нейрон             |
| нейрон = сумма(вес * вход)          |
|          + смещение                 |
+-------------------------------------+
                 |
                 v
           выход y: 1 число

веса и смещения — обучаемые параметры
сеть — композиция слоёв: y = output(hidden(x))`,
        en: `// ==== Схема сети из примера ниже ====

           вход x: 2 числа
                 |
                 v
+-------------------------------------+
| скрытый слой: 2 нейрона             |
| нейрон = relu(сумма(вес * вход)     |
|               + смещение)           |
+-------------------------------------+
                 |  2 числа
                 v
+-------------------------------------+
| выходной слой: 1 нейрон             |
| нейрон = сумма(вес * вход)          |
|          + смещение                 |
+-------------------------------------+
                 |
                 v
           выход y: 1 число

веса и смещения — обучаемые параметры
сеть — композиция слоёв: y = output(hidden(x))`,
      },
    },
    {
      type: 'code',
      code: {
        ru: `// ==== Та же сеть в коде ====
// параметры уже подобраны: это решение задачи XOR из учебника
// Goodfellow, Bengio, Courville «Deep Learning», раздел 6.1
// там их задали вручную, в реальной сети их находит обучение

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// функции активации
// relu :: Number -> Number
const relu = (z) => Math.max(0, z)
// identity :: a -> a
const identity = (z) => z

// взвешенная сумма: каждый вход умножаем на свой вес и складываем
// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// нейрон: взвешенная сумма входов плюс смещение,
// результат проходит через функцию активации
// веса, смещение и активация задаются при создании нейрона,
// при вызове он получает только входы
// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// слой: несколько нейронов получают одни и те же входы,
// на выходе по числу от каждого нейрона
// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// скрытый слой: 2 числа -> 2 числа, активация relu
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// выходной слой: 2 числа -> 1 число, без нелинейности, как в учебнике
// output :: [Number] -> [Number]
const output = layer([
  neuron([1, -2], 0, identity),
])

// сеть — композиция слоёв
// network :: [Number] -> [Number]
const network = pipe(hidden, output)

// ответ сети одним числом
// getAnswer :: [Number] -> Number
const getAnswer = pipe(network, ([y]) => y)

for (const x of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
  console.log(\`\${x[0]} XOR \${x[1]} = \${getAnswer(x)}\`)
}
// 0 XOR 0 = 0
// 0 XOR 1 = 1
// 1 XOR 0 = 1
// 1 XOR 1 = 0`,
        en: `// ==== Та же сеть в коде ====
// параметры уже подобраны: это решение задачи XOR из учебника
// Goodfellow, Bengio, Courville «Deep Learning», раздел 6.1
// там их задали вручную, в реальной сети их находит обучение

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// функции активации
// relu :: Number -> Number
const relu = (z) => Math.max(0, z)
// identity :: a -> a
const identity = (z) => z

// взвешенная сумма: каждый вход умножаем на свой вес и складываем
// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// нейрон: взвешенная сумма входов плюс смещение,
// результат проходит через функцию активации
// веса, смещение и активация задаются при создании нейрона,
// при вызове он получает только входы
// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// слой: несколько нейронов получают одни и те же входы,
// на выходе по числу от каждого нейрона
// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// скрытый слой: 2 числа -> 2 числа, активация relu
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// выходной слой: 2 числа -> 1 число, без нелинейности, как в учебнике
// output :: [Number] -> [Number]
const output = layer([
  neuron([1, -2], 0, identity),
])

// сеть — композиция слоёв
// network :: [Number] -> [Number]
const network = pipe(hidden, output)

// ответ сети одним числом
// getAnswer :: [Number] -> Number
const getAnswer = pipe(network, ([y]) => y)

for (const x of [[0, 0], [0, 1], [1, 0], [1, 1]]) {
  console.log(\`\${x[0]} XOR \${x[1]} = \${getAnswer(x)}\`)
}
// 0 XOR 0 = 0
// 0 XOR 1 = 1
// 1 XOR 0 = 1
// 1 XOR 1 = 0`,
      },
    },
  ],
}

export default lesson
