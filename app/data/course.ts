import type { CourseSection, Lesson } from './course-types'
import forWhom from './lessons/for-whom'
import notForWhom from './lessons/not-for-whom'
import imperativeVsDeclarative from './lessons/imperative-vs-declarative'
import functionalProgramming from './lessons/functional-programming'
import pureFunctions from './lessons/pure-functions'
import immutability from './lessons/immutability'
import hindleyMilner from './lessons/hindley-milner-type-notation'
import categoryTheory from './lessons/category-theory'
import functors from './lessons/functors'
import fantasyLand from './lessons/fantasy-land'
import maybeEither from './lessons/maybe-either'
import composition from './lessons/composition'
import currying from './lessons/currying'
import curryingAndAsynchrony from './lessons/currying-and-asynchrony'
import partialApplication from './lessons/partial-application'
import pointFree from './lessons/point-free'
import recursion from './lessons/recursion'
import performance from './lessons/performance'
import memoization from './lessons/memoization'
import transducers from './lessons/transducers'
import neuralNetworks from './lessons/neural-networks'
import functionMapFilterReduce from './lessons/function-map-filter-reduce'
import higherOrderFunctions from './lessons/first-class-and-higher-order-functions'
import closures from './lessons/closures'
import lenses from './lessons/lenses'
import sideEffects from './lessons/side-effects-in-composition-functions'
import selectingLibrary from './lessons/selecting-library'

export const introSections: CourseSection[] = [forWhom, notForWhom]

export const lessons: Lesson[] = [
  imperativeVsDeclarative,
  functionalProgramming,
  higherOrderFunctions,
  closures,
  pureFunctions,
  immutability,
  hindleyMilner,
  composition,
  currying,
  partialApplication,
  pointFree,
  curryingAndAsynchrony,
  recursion,
  functionMapFilterReduce,
  performance,
  memoization,
  transducers,
  lenses,
  sideEffects,
  categoryTheory,
  functors,
  fantasyLand,
  maybeEither,
  neuralNetworks,
  selectingLibrary,
]
