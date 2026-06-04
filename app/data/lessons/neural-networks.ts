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
      code: `// ==== Визуализация данных ====

-------------------
|   Ваш вопрос     |
-------------------
        ||
        ▼
-------------------
|  Слой математики |
-------------------
        ||
        ▼
-------------------
|  Слой анализа    |
-------------------
        ||
        ▼
-------------------
|  Слой вывода     |
-------------------

-------------------

// можно представить и как композицию функций

const mathModule = pipe (
  Math.sin, // совокупность функций
  Math.cos,
  ...
)

// logicModule :: Number :: String
const logicModule = (x) => x > 0 ? 'Положительное' : 'Отрицательное'

// langModule :: Number -> String
const langModule = (x) => \`Ответ: \${x}\`

// answer :: String -> String
const getAnswer = pipe (
  logicModule, // модуль логики
  mathModule, // модуль математики
  langModule, // модуль языковой
)

// вопрос пользователя
const question = prompt('Отвечу на вопросы по математике')

// получаем ответ для пользователя
const answer = getAnswer(question)

console.log (answer) // ответ на вопрос`,
    },
  ],
}

export default lesson
