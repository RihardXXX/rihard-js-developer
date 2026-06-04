import type { Lesson } from './course-types'
import forWhom from './lessons/for-whom'
import notForWhom from './lessons/not-for-whom'
import imperativeVsDeclarative from './lessons/imperative-vs-declarative'
import functionalProgramming from './lessons/functional-programming'
import pureFunctions from './lessons/pure-functions'
import hindleyMilner from './lessons/hindley-milner-type-notation'
import categoryTheory from './lessons/category-theory'
import fantasyLand from './lessons/fantasy-land'
import composition from './lessons/composition'
import currying from './lessons/currying'
import curryingAndAsynchrony from './lessons/currying-and-asynchrony'
import partialApplication from './lessons/partial-application'
import recursion from './lessons/recursion'
import performance from './lessons/performance'
import neuralNetworks from './lessons/neural-networks'
import functionMapFilterReduce from './lessons/function-map-filter-reduce'
import higherOrderFunctions from './lessons/first-class-and-higher-order-functions'
import lenses from './lessons/lenses'
import sideEffects from './lessons/side-effects-in-composition-functions'
import selectingLibrary from './lessons/selecting-library'

export const lessons: Lesson[] = [
  forWhom,
  notForWhom,
  imperativeVsDeclarative,
  functionalProgramming,
  pureFunctions,
  hindleyMilner,
  categoryTheory,
  fantasyLand,
  composition,
  currying,
  curryingAndAsynchrony,
  partialApplication,
  recursion,
  performance,
  neuralNetworks,
  functionMapFilterReduce,
  higherOrderFunctions,
  lenses,
  sideEffects,
  selectingLibrary,
]
