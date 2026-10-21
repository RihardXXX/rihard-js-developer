import type { Lesson } from '~/data/course-types'

const lesson: Lesson = {
  slug: 'neural-networks',
  title: { ru: "Нейронные сети и теория категорий", en: "Neural networks and category theory" },
  description: {
    ru: "Нейросеть прямого распространения как композиция функций на JavaScript: нейрон, слой, ReLU, зачем нелинейность и что здесь описывает теория категорий.",
    en: "A feedforward neural network as JavaScript function composition: neurons, layers, ReLU, why nonlinearity matters, and what category theory describes here.",
  },
  goal: {
    ru: "Понять, как нейросеть прямого распространения складывается из функций — нейрон, слой и сеть как композиция слоёв, — и какую часть этой картины описывает теория категорий.",
    en: "Understand how a feedforward neural network is built from functions, with neurons, layers and the network as a composition of layers, and which part of this picture category theory describes.",
  },
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
      ru: "Нелинейность в скрытых слоях обязательна. Без функции активации каждый слой — линейная функция (точнее, аффинная: умножение на веса плюс смещение), а композиция аффинных функций снова аффинна. Сколько таких слоёв ни ставь, сеть сведётся к одному слою и не сможет, например, решить задачу XOR из примера ниже. Выходной слой при этом может быть и линейным, как в том же примере.",
      en: "Nonlinearity in the hidden layers is essential. Without an activation function each layer is a linear function (more precisely, affine: multiplying by weights plus a bias), and a composition of affine functions is affine again. No matter how many such layers you stack, the network collapses into a single layer and cannot, for example, solve the XOR task from the example below. The output layer, however, may be linear, as in that same example.",
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
      ru: "Теперь то же на языке категорий. Объекты — пространства векторов нужной длины (в примере ниже: 2 числа на входе, 2 в скрытом слое, 1 на выходе), морфизмы — функции между такими пространствами; каждый слой — морфизм, и сеть целиком, композиция слоёв, — тоже морфизм. По закону ассоциативности неважно, как группировать слои: pipe(pipe(a, b), c) и pipe(a, pipe(b, c)) — одна и та же функция. Тождественный морфизм — функция, которая возвращает вход без изменений: если добавить её в цепочку, сеть не изменится.",
      en: "Now the same in the language of categories. The objects are spaces of vectors of a given length (in the example below: 2 numbers at the input, 2 in the hidden layer, 1 at the output), and the morphisms are functions between such spaces; each layer is a morphism, and the whole network, being a composition of layers, is a morphism too. By associativity it doesn't matter how you group the layers: pipe(pipe(a, b), c) and pipe(a, pipe(b, c)) are the same function. The identity morphism is a function that returns its input unchanged: add it to the chain and the network stays the same.",
    },
    {
      type: 'text',
      ru: "Важно не переоценивать эту связь: теория категорий здесь описывает, как слои стыкуются между собой, но не объясняет, почему сеть учится. Описать на этом языке и обучение тоже пытаются, но это уже исследовательская тема (например, статья «Backprop as Functor», Fong, Spivak, Tuyéras, 2019), и в курсе мы её не трогаем.",
      en: "It's important not to overstate this connection: here category theory describes how layers fit together, but it does not explain why a network learns. There are attempts to describe training in this language as well, but that is a research topic (for example, the paper \"Backprop as Functor\" by Fong, Spivak and Tuyéras, 2019), and this course does not cover it.",
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
        en: `// ==== Diagram of the network from the example below ====

           input x: 2 numbers
                 |
                 v
+-------------------------------------+
| hidden layer: 2 neurons             |
| neuron = relu(sum(weight * input)   |
|               + bias)               |
+-------------------------------------+
                 |  2 numbers
                 v
+-------------------------------------+
| output layer: 1 neuron              |
| neuron = sum(weight * input)        |
|          + bias                     |
+-------------------------------------+
                 |
                 v
           output y: 1 number

weights and biases are trainable parameters
the network is a composition of layers: y = output(hidden(x))`,
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
        en: `// ==== The same network in code ====
// the parameters are already chosen: this is the XOR solution from the textbook
// Goodfellow, Bengio, Courville "Deep Learning", section 6.1
// there they are set by hand; in a real network training finds them

// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// activation functions
// relu :: Number -> Number
const relu = (z) => Math.max(0, z)
// identity :: a -> a
const identity = (z) => z

// weighted sum: multiply each input by its weight and add them up
// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron: the weighted sum of the inputs plus a bias,
// passed through the activation function
// weights, bias and activation are set when the neuron is created;
// when called, it receives only the inputs
// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer: several neurons receive the same inputs,
// and the output has one number per neuron
// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// hidden layer: 2 numbers -> 2 numbers, relu activation
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// output layer: 2 numbers -> 1 number, no nonlinearity, as in the textbook
// output :: [Number] -> [Number]
const output = layer([
  neuron([1, -2], 0, identity),
])

// the network is a composition of layers
// network :: [Number] -> [Number]
const network = pipe(hidden, output)

// the network's answer as a single number
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
  summary: [
    {
      ru: "Нейрон умножает каждый вход на свой вес, складывает результаты, прибавляет смещение и пропускает число через нелинейную функцию активации, например ReLU: max(0, z).",
      en: "A neuron multiplies each input by its own weight, adds up the results, adds a bias and passes the number through a nonlinear activation function, for example ReLU: max(0, z).",
    },
    {
      ru: "Слой — функция из вектора чисел в вектор чисел, а сеть прямого распространения — композиция функций-слоёв: f(x) = f3(f2(f1(x))).",
      en: "A layer is a function from a vector of numbers to a vector of numbers, and a feedforward network is a composition of layer functions: f(x) = f3(f2(f1(x))).",
    },
    {
      ru: "Без нелинейности в скрытых слоях композиция аффинных слоёв снова аффинна: сеть сводится к одному слою и не может, например, решить задачу XOR.",
      en: "Without nonlinearity in the hidden layers, a composition of affine layers is affine again: the network collapses into a single layer and cannot, for example, solve the XOR task.",
    },
    {
      ru: "Веса и смещения подбирает алгоритм обучения, после чего они фиксируются; обученная сеть с зафиксированными параметрами — чистая функция от входа.",
      en: "Weights and biases are found by a training algorithm and then fixed; a trained network with fixed parameters is a pure function of its input.",
    },
    {
      ru: "Теория категорий описывает, как слои стыкуются между собой, но не объясняет, почему сеть учится.",
      en: "Category theory describes how layers fit together, but it does not explain why a network learns.",
    },
  ],
  exercises: [
    {
      task: {
        ru: "Возьмите скрытый слой hidden из урока и не меняйте его. Подберите веса и смещение выходного нейрона (активация identity) так, чтобы сеть вычисляла OR, а затем AND, и выведите таблицы истинности. Подсказка: сначала посчитайте, что hidden выдаёт на входах [0, 0], [0, 1], [1, 0] и [1, 1].",
        en: "Take the hidden layer from the lesson and leave it unchanged. Pick the weights and bias of the output neuron (identity activation) so that the network computes OR and then AND, and print the truth tables. Hint: first work out what hidden outputs for the inputs [0, 0], [0, 1], [1, 0] and [1, 1].",
      },
      starter: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// скрытый слой из урока
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// сеть: скрытый слой, затем один выходной нейрон
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// ваш код: подберите веса и смещение
const or = gate([0, 0], 0)
const and = gate([0, 0], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// the hidden layer from the lesson
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// the network: the hidden layer, then one output neuron
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// your code: pick the weights and the bias
const or = gate([0, 0], 0)
const and = gate([0, 0], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`,
      },
      solution: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// скрытый слой из урока
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// сеть: скрытый слой, затем один выходной нейрон
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// hidden на входах [0, 0], [0, 1], [1, 0], [1, 1]
// выдаёт [0, 0], [1, 0], [1, 0], [2, 1]

// OR: первый выход минус второй даёт 0, 1, 1, 1
const or = gate([1, -1], 0)
// AND: второй выход как есть даёт 0, 0, 0, 1
const and = gate([0, 1], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// the hidden layer from the lesson
// hidden :: [Number] -> [Number]
const hidden = layer([
  neuron([1, 1], 0, relu),
  neuron([1, 1], -1, relu),
])

// the network: the hidden layer, then one output neuron
// gate :: ([Number], Number) -> [Number] -> Number
const gate = (weights, bias) =>
  pipe(hidden, layer([neuron(weights, bias, identity)]), ([y]) => y)

// for the inputs [0, 0], [0, 1], [1, 0], [1, 1]
// hidden outputs [0, 0], [1, 0], [1, 0], [2, 1]

// OR: the first output minus the second gives 0, 1, 1, 1
const or = gate([1, -1], 0)
// AND: the second output as is gives 0, 0, 0, 1
const and = gate([0, 1], 0)

const inputs = [[0, 0], [0, 1], [1, 0], [1, 1]]
for (const [name, net] of [['OR', or], ['AND', and]]) {
  for (const x of inputs) {
    console.log(\`\${x[0]} \${name} \${x[1]} = \${net(x)}\`)
  }
}`,
      },
      expected: {
        ru: "0 OR 0 = 0\n0 OR 1 = 1\n1 OR 0 = 1\n1 OR 1 = 1\n0 AND 0 = 0\n0 AND 1 = 0\n1 AND 0 = 0\n1 AND 1 = 1",
        en: "0 OR 0 = 0\n0 OR 1 = 1\n1 OR 0 = 1\n1 OR 1 = 1\n0 AND 0 = 0\n0 AND 1 = 0\n1 AND 0 = 0\n1 AND 1 = 1",
      },
    },
    {
      task: {
        ru: "Проверьте в коде, что без нелинейности два слоя сводятся к одному. Сеть deep состоит из двух слоёв с активацией identity. В скрытом слое два нейрона: с весами [1, 2] и смещением 1 и с весами [3, -1] и смещением 0. В выходном слое один нейрон с весами [2, 1] и смещением -4. Соберите эти слои функцией deepWith, которая получает активацию скрытого слоя аргументом, и найдите веса и смещение одного нейрона single, который даёт тот же ответ. Заготовка сравнивает обе сети на входах [0, 0], [1, 0], [0, 1] и [2, 3], а затем ставит в скрытый слой relu вместо identity и сравнивает сети ещё раз на входе [0, 1].",
        en: "Check in code that without nonlinearity two layers collapse into one. The deep network consists of two layers with identity activation. The hidden layer has two neurons: one with weights [1, 2] and bias 1, and one with weights [3, -1] and bias 0. The output layer has one neuron with weights [2, 1] and bias -4. Build these layers with a deepWith function that takes the hidden layer's activation as an argument, and find the weights and bias of a single neuron that gives the same answer. The starter compares both networks on the inputs [0, 0], [1, 0], [0, 1] and [2, 3], then puts relu instead of identity into the hidden layer and compares the networks again on the input [0, 1].",
      },
      starter: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// два слоя; активацию скрытого слоя передаём параметром
// deepWith :: (Number -> Number) -> [Number] -> Number
// ваш код

// deep :: [Number] -> Number
const deep = deepWith(identity)

// один нейрон с тем же ответом, что у deep
// single :: [Number] -> Number
// ваш код

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// relu в скрытом слое вместо identity
console.log(\`с relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// two layers; the hidden layer's activation is a parameter
// deepWith :: (Number -> Number) -> [Number] -> Number
// your code

// deep :: [Number] -> Number
const deep = deepWith(identity)

// one neuron with the same answer as deep
// single :: [Number] -> Number
// your code

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// relu instead of identity in the hidden layer
console.log(\`with relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`,
      },
      solution: {
        ru: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, то же, что max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// два слоя; активацию скрытого слоя передаём параметром
// deepWith :: (Number -> Number) -> [Number] -> Number
const deepWith = (activation) => pipe(
  layer([
    neuron([1, 2], 1, activation),
    neuron([3, -1], 0, activation),
  ]),
  layer([neuron([2, 1], -4, identity)]),
  ([y]) => y,
)

// deep :: [Number] -> Number
const deep = deepWith(identity)

// подставляем скрытый слой в выходной нейрон:
// 2 * (x1 + 2 * x2 + 1) + (3 * x1 - x2) - 4 = 5 * x1 + 3 * x2 - 2
// single :: [Number] -> Number
const single = pipe(layer([neuron([5, 3], -2, identity)]), ([y]) => y)

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// с relu второй скрытый нейрон на входе [0, 1] выдаёт не -1, а 0,
// и ответы расходятся: формула одного нейрона больше не подходит
console.log(\`с relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`,
        en: `// pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x)

// relu :: Number -> Number, the same as max(0, z)
const relu = (z) => (z > 0 ? z : 0)
// identity :: a -> a
const identity = (z) => z

// weightedSum :: ([Number], [Number]) -> Number
const weightedSum = (weights, inputs) =>
  inputs.reduce((sum, x, i) => sum + x * weights[i], 0)

// neuron :: ([Number], Number, (Number -> Number)) -> [Number] -> Number
const neuron = (weights, bias, activation) => (inputs) =>
  activation(weightedSum(weights, inputs) + bias)

// layer :: [[Number] -> Number] -> [Number] -> [Number]
const layer = (neurons) => (inputs) => neurons.map((n) => n(inputs))

// two layers; the hidden layer's activation is a parameter
// deepWith :: (Number -> Number) -> [Number] -> Number
const deepWith = (activation) => pipe(
  layer([
    neuron([1, 2], 1, activation),
    neuron([3, -1], 0, activation),
  ]),
  layer([neuron([2, 1], -4, identity)]),
  ([y]) => y,
)

// deep :: [Number] -> Number
const deep = deepWith(identity)

// substitute the hidden layer into the output neuron:
// 2 * (x1 + 2 * x2 + 1) + (3 * x1 - x2) - 4 = 5 * x1 + 3 * x2 - 2
// single :: [Number] -> Number
const single = pipe(layer([neuron([5, 3], -2, identity)]), ([y]) => y)

for (const x of [[0, 0], [1, 0], [0, 1], [2, 3]]) {
  console.log(\`[\${x}]: deep = \${deep(x)}, single = \${single(x)}\`)
}

// with relu the second hidden neuron outputs 0 instead of -1 for the input [0, 1],
// and the answers diverge: the single-neuron formula no longer fits
console.log(\`with relu, [0,1]: deep = \${deepWith(relu)([0, 1])}, single = \${single([0, 1])}\`)`,
      },
      expected: {
        ru: "[0,0]: deep = -2, single = -2\n[1,0]: deep = 3, single = 3\n[0,1]: deep = 1, single = 1\n[2,3]: deep = 17, single = 17\nс relu, [0,1]: deep = 2, single = 1",
        en: "[0,0]: deep = -2, single = -2\n[1,0]: deep = 3, single = 3\n[0,1]: deep = 1, single = 1\n[2,3]: deep = 17, single = 17\nwith relu, [0,1]: deep = 2, single = 1",
      },
    },
  ],
}

export default lesson
