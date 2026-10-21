import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'neural-networks',
  title: { ru: "Нейронные сети и теория категорий", en: "Neural networks and category theory" },
  blocks: [
    {
      type: 'text',
      ru: "Давайте с вами посмотрим на нейронные сети глазами функционального программиста — как на композицию функций — и свяжем это с теорией категорий. Для этого вначале повторим, что такое категория: мы говорили о ней в предыдущих главах.",
      en: "Let's look at neural networks the way a functional programmer would — as a composition of functions — and connect this to category theory. First, let's recall what a category is: we discussed it in previous chapters.",
    },
    {
      type: 'text',
      ru: "Категория — это объекты, морфизмы (стрелки между объектами) и композиция морфизмов, для которой выполняются два закона: тождество (у каждого объекта есть тождественный морфизм, и композиция с ним ничего не меняет) и ассоциативность (неважно, как расставить скобки в цепочке композиций). В программировании в роли объектов обычно выступают типы, а в роли морфизмов — функции между ними.",
      en: "A category consists of objects, morphisms (arrows between objects) and a composition of morphisms that obeys two laws: identity (every object has an identity morphism, and composing with it changes nothing) and associativity (it doesn't matter where you put the parentheses in a chain of compositions). In programming, types usually play the role of objects, and functions between them play the role of morphisms.",
    },
    {
      type: 'text',
      ru: "Теперь о том, как устроена нейросеть. Искусственный нейрон умножает каждый вход на свой вес, складывает результаты, прибавляет смещение (bias) и пропускает получившееся число через нелинейную функцию активации, например ReLU: max(0, z).",
      en: "Now let's see how a neural network is built. An artificial neuron multiplies each input by its own weight, adds up the results, adds a bias and passes the resulting number through a nonlinear activation function, for example ReLU: max(0, z).",
    },
    {
      type: 'text',
      ru: "Слой — это несколько нейронов, которые получают одни и те же входы. Слой целиком — функция: на входе вектор чисел, на выходе вектор чисел, по одному от каждого нейрона. В сети прямого распространения (feedforward) — базовой архитектуре — слои идут цепочкой: выход одного слоя становится входом следующего. Значит, сеть — это композиция функций-слоёв: f(x) = f3(f2(f1(x))).",
      en: "A layer is several neurons that receive the same inputs. A layer as a whole is a function: a vector of numbers in, a vector of numbers out, one number per neuron. In a feedforward network, the basic architecture, layers form a chain: the output of one layer becomes the input of the next. So the network is a composition of layer functions: f(x) = f3(f2(f1(x))).",
    },
    {
      type: 'text',
      ru: "Нелинейность в скрытых слоях обязательна. Без функции активации каждый слой — линейная функция (точнее, аффинная: умножение на веса плюс смещение), а композиция линейных функций снова линейна. Сколько таких слоёв ни ставь, сеть сведётся к одному слою и не сможет, например, решить задачу XOR из примера ниже. Выходной слой при этом может быть и линейным, как в том же примере.",
      en: "Nonlinearity in the hidden layers is essential. Without an activation function each layer is a linear function (more precisely, affine: multiplying by weights plus a bias), and a composition of linear functions is linear again. No matter how many such layers you stack, the network collapses into a single layer and cannot, for example, solve the XOR task from the example below. The output layer, however, may be linear, as in that same example.",
    },
    {
      type: 'text',
      ru: "Архитектуру — сколько слоёв, сколько в них нейронов, какие функции активации — выбирает создатель сети. А веса и смещения — обучаемые параметры: их не передают при вызове, их подбирает алгоритм обучения, после чего они фиксируются. Вычисление обученной сети с зафиксированными параметрами — чистая функция от входа: одинаковые входы дают одинаковый выход.",
      en: "The architecture — how many layers, how many neurons in each, which activation functions — is chosen by the designer of the network. Weights and biases, on the other hand, are trainable parameters: they are not passed in when the network is called; a training algorithm finds them, and after that they are fixed. Running a trained network with fixed parameters is a pure function of its input: the same inputs give the same output.",
    },
    {
      type: 'text',
      ru: "Коротко об обучении. В самом частом случае (обучение с учителем) есть примеры с правильными ответами. Функция потерь (loss) выдаёт число: насколько ответы сети отличаются от правильных. Градиентный спуск много раз понемногу сдвигает каждый параметр в ту сторону, в которой потери уменьшаются. Куда и насколько сдвигать каждый параметр, показывает градиент функции потерь, а вычисляет его сразу для всех параметров обратное распространение ошибки (backpropagation): правило дифференцирования сложной функции, применённое к композиции слоёв от выхода к входу.",
      en: "A few words about training. In the most common case (supervised learning) there are examples with correct answers. A loss function returns a number that shows how far the network's answers are from the correct ones. Gradient descent repeatedly nudges every parameter a little in the direction in which the loss decreases. Which way and how much to move each parameter is given by the gradient of the loss, and backpropagation computes it for all parameters at once: the chain rule for differentiating composite functions, applied to the composition of layers from the output back to the input.",
    },
    {
      type: 'text',
      ru: "Теперь то же на языке категорий. Объекты — пространства векторов нужной длины (в примере ниже: 2 числа на входе, 2 в скрытом слое, 1 на выходе), морфизмы — слои, то есть функции между такими пространствами. Сеть прямого распространения — композиция морфизмов. По закону ассоциативности неважно, как группировать слои: pipe(pipe(a, b), c) и pipe(a, pipe(b, c)) — одна и та же функция. Тождественный морфизм — функция, которая возвращает вход без изменений: если добавить её в цепочку, сеть не изменится.",
      en: "Now the same in the language of categories. The objects are spaces of vectors of a given length (in the example below: 2 numbers at the input, 2 in the hidden layer, 1 at the output), and the morphisms are layers, that is, functions between such spaces. A feedforward network is a composition of morphisms. By associativity it doesn't matter how you group the layers: pipe(pipe(a, b), c) and pipe(a, pipe(b, c)) are the same function. The identity morphism is a function that returns its input unchanged: add it to the chain and the network stays the same.",
    },
    {
      type: 'text',
      ru: "Важно не переоценивать эту связь: теория категорий здесь описывает, как слои стыкуются между собой, но не объясняет, почему сеть учится. Описать на этом языке и обучение тоже пытаются, но это уже исследовательская тема (например, статья «Backprop as Functor»), и в курсе мы её не трогаем.",
      en: "It's important not to overstate this connection: here category theory describes how layers fit together, but it does not explain why a network learns. There are attempts to describe training in this language as well, but that is a research topic (for example, the paper \"Backprop as Functor\"), and this course does not cover it.",
    },
    {
      type: 'text',
      ru: "Соберём всё вместе. Ниже — схема небольшой сети и та же сеть в коде: нейрон и слой — функции, а сеть — их композиция через pipe.",
      en: "Let's put it all together. Below is a diagram of a small network and the same network in code: a neuron and a layer are functions, and the network is their composition via pipe.",
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
