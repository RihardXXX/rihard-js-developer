<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { FUNCTION_MAP_FILTER_REDUCE } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'FunctionMapFilterReduce',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },
  data() {
    return {
      FUNCTION_MAP_FILTER_REDUCE
    }
  }
});
</script>

<template>
  <section :id="FUNCTION_MAP_FILTER_REDUCE">
      <Subtitle>Функции map, filter, reduce</Subtitle>
      <Description>
        <p>
          Наиболее часто используемыми функциями в функциональном программировании
          и продакшен коде являются <strong>map, filter, reduce</strong>.
        </p>
        <p>
          Эти функции обеспечивают мощный функционал работы с данными.
        </p>
      </Description>
      <Description>
        <p>
          <strong>map</strong>
          <br>
          --------------------
        </p>
        <p>
          Функция <strong>map</strong> возвращает новый объект того же типа данных,
          пропуская каждый элемент, если тип итерируемый через функцию,
          которая получает в качестве аргумента. Если тип не итерируемый, то
          просто содержимое с данными пропускается через функцию.
        </p>
        <p>
          Давайте реализуем функцию <strong>map</strong> различными способами.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // каррирование используется, чтобы
    // нам было удобно вызывать и в композиции
    // также же используется классический
    // бесточечный стиль

    // ==== реализация декларативная ====
    // mapD :: (a -> b) -> [a] -> [b]
    const mapD = (fn) => (arr) => arr.map(fn)
    // ===================================

    // ==== реализация императивная ====
    // без индекса итерации и контекста
    // mapI :: (a -> b) -> [a] -> [b]
    const mapI = (fn) => (arr) => {
      // массив результирующий
      // который будем возвращать
      let result = []

      for (const item of arr) {
        // каждый элемент пропускаем через
        // функцию первого класса
        result.push(fn(item)) // или result = [ ...result, fn (item) ]
      }

      return result
    }
      // ===================================

    // ==== реализация императивная ====
    // с индексом итерации и контекстом
    // mapIq :: (a -> b) -> [a] -> [b]
    const mapIq = (fn) => (arr) => {
      let result = []

      for (let i = 0; i < arr.length; i++ ) {
        result.push(fn(arr[i], i, arr)) // или result = [ ...result, fn (arr[i], i, arr) ]
      }

      return result
    }
    // ===================================

    // ==== реализация рекурсивная ====
    // с трамплина чтобы стэк не переполнился
    // надеюсь вы прочитали раздел про рекурсию
    // mapR :: (a -> b) -> [a] -> [b]
    const mapR = (fn) => (arr, acc = []) => {

      // базовый случай
      // когда массив пуст возвращаем аккумулятор
      if (!arr.length) {
        return acc
      }

      // рекурсивный случай
      // возвращаем функцию для трапмплина
      // вырезаем первый элемент массива
      // в аккумулятор кладем результат который пропустили через функцию
      return () => mapR (fn)
                        (
                          arr.slice(1),
                          acc = [...acc, fn (arr[0]) ]
                        )
    }

    const mapTrampoline = trampoline(mapR)
    // ===================================

    // ==== запуск ====
    const data = [1, 2, 3, 4, 5]

    const result = mapD (v => v * 2) (data)

    console.log (result) // [2, 4, 6, 8, 10]
    // ===================================

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // каррирование используется, чтобы
            // нам было удобно вызывать и в композиции
            // также же используется классический
            // бесточечный стиль

            // ==== реализация декларативная ====
            // mapD :: (a -> b) -> [a] -> [b]
            const mapD = (fn) => (arr) => arr.map(fn)
            // ===================================

            // ==== реализация императивная ====
            // без индекса итерации и контекста
            // mapI :: (a -> b) -> [a] -> [b]
            const mapI = (fn) => (arr) => {
              // массив результирующий
              // который будем возвращать
              let result = []

              for (const item of arr) {
                // каждый элемент пропускаем через
                // функцию первого класса
                result.push(fn(item)) // или result = [ ...result, fn (item) ]
              }

              return result
            }
             // ===================================

            // ==== реализация императивная ====
            // с индексом итерации и контекстом
            // mapIq :: (a -> b) -> [a] -> [b]
            const mapIq = (fn) => (arr) => {
              let result = []

              for (let i = 0; i < arr.length; i++ ) {
                result.push(fn(arr[i], i, arr)) // или result = [ ...result, fn (arr[i], i, arr) ]
              }

              return result
            }
            // ===================================

            // ==== реализация рекурсивная ====
            // с трамплина чтобы стэк не переполнился
            // надеюсь вы прочитали раздел про рекурсию
            // mapR :: (a -> b) -> [a] -> [b]
            const mapR = (fn) => (arr, acc = []) => {

              // базовый случай
              // когда массив пуст возвращаем аккумулятор
              if (!arr.length) {
                return acc
              }

              // рекурсивный случай
              // возвращаем функцию для трапмплина
              // вырезаем первый элемент массива
              // в аккумулятор кладем результат который пропустили через функцию
              return () => mapR (fn)
                                (
                                  arr.slice(1),
                                  acc = [...acc, fn (arr[0])]
                                )
            }

            const mapTrampoline = trampoline(mapR)
            // ===================================

            // ==== запуск ====
            const data = [1, 2, 3, 4, 5]

            const result = mapD (v => v * 2) (data)

            console.log (result) // [2, 4, 6, 8, 10]
            // ===================================


          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          <strong>filter</strong>
          <br>
          --------------------
        </p>
        <p>
          Функция <strong>filter</strong> возвращает новый объект того же типа данных,
          пропуская каждый элемент через функцию предикат, которая вернет элемент в объект,
          если предикат вернет true (тип итерируемый).
        </p>
        <p>
          Функция предикат - это функция, которая возвращает true или false.
          Она обычно используется как функция первого класса, то есть кладется
          в другую функцию высшего порядка как <strong>filter</strong>.
        </p>
        <p>
          Давайте реализуем функцию <strong>filter</strong> различными способами.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // каррирование используется, чтобы
    // нам было удобно вызывать и в композиции
    // также же используется классический
    // бесточечный стиль

    // ==== реализация декларативная ====
    // filterD :: (a -> Boolean) -> [a] -> [a]
    const filterD = (fn) => (arr) => arr.filter(fn)
    // ===================================

    // ==== реализация императивная ====
    // без индекса итерации и контекста
    // filterI :: (a -> Boolean) -> [a] -> [a]
    const filterI = (fn) => (arr) => {
      // массив результирующий
      // который будем возвращать
      let result = []

      for (const item of arr) {
        // каждый элемент пропускаем через
        // функцию предикат
        // если она вернет true кладем ее
        // в результирующий массив
        if (fn(item)) {
          result.push(item) // или result = [ ...result, item ]
        }
      }

      return result
    }
      // ===================================

    // ==== реализация императивная ====
    // с индексом итерации и контекстом
    // filterIq :: (a -> Boolean) -> [a] -> [a]
    const filterIq = (fn) => (arr) => {
      let result = []

      for (let i = 0; i < arr.length; i++ ) {
        const value = arr[i]

        if (fn(value, i, arr)) {
          result.push(value) // или result = [ ...result, value ]
        }

      }

      return result
    }
    // ===================================

    // ==== реализация рекурсивная ====
    // с трамплина чтобы стэк не переполнился
    // надеюсь вы прочитали раздел про рекурсию
    // filterR :: (a -> Boolean) -> [a] -> [a]
    const filterR = (fn) => (arr, acc = []) => {

      // базовый случай
      // когда массив пуст возвращаем аккумулятор
      if (!arr.length) {
        return acc
      }

      // рекурсивный случай
      // возвращаем функцию для трапмплина
      return () => {
          // первый элемент и остальные
          const [head, ...tail] = arr

          // в аккумулятор кладем элемент
          // если функцию предикат вернула true
          // иначе возвращаем текущий аккумулятор
          // без добавления значения
          const nextAcc = fn (head)
                                ? [...acc, head]
                                : [...acc]

          return filterR (fn)(tail, nextAcc)
      }
    }

    const filterTrampoline = trampoline(filterR)
    // ===================================

    // ==== запуск ====
    const data = [1, 2, 3, 4, 5]

    const result = filterD (v => v > 3) (data)

    console.log (result) // [4, 5]
    // ===================================

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // каррирование используется, чтобы
            // нам было удобно вызывать и в композиции
            // также же используется классический
            // бесточечный стиль

            // ==== реализация декларативная ====
            // filterD :: (a -> Boolean) -> [a] -> [a]
            const filterD = (fn) => (arr) => arr.filter(fn)
            // ===================================

            // ==== реализация императивная ====
            // без индекса итерации и контекста
            // filterI :: (a -> Boolean) -> [a] -> [a]
            const filterI = (fn) => (arr) => {
              // массив результирующий
              // который будем возвращать
              let result = []

              for (const item of arr) {
                // каждый элемент пропускаем через
                // функцию предикат
                // если она вернет true кладем ее
                // в результирующий массив
                if (fn(item)) {
                  result.push(item) // или result = [ ...result, item ]
                }
              }

              return result
            }
             // ===================================

            // ==== реализация императивная ====
            // с индексом итерации и контекстом
            // filterIq :: (a -> Boolean) -> [a] -> [a]
            const filterIq = (fn) => (arr) => {
              let result = []

              for (let i = 0; i < arr.length; i++ ) {
                const value = arr[i]

                if (fn(value, i, arr)) {
                  result.push(value) // или result = [ ...result, value ]
                }

              }

              return result
            }
            // ===================================

            // ==== реализация рекурсивная ====
            // с трамплина чтобы стэк не переполнился
            // надеюсь вы прочитали раздел про рекурсию
            // filterR :: (a -> Boolean) -> [a] -> [a]
            const filterR = (fn) => (arr, acc = []) => {

              // базовый случай
              // когда массив пуст возвращаем аккумулятор
              if (!arr.length) {
                return acc
              }

              // рекурсивный случай
              // возвращаем функцию для трапмплина
              return () => {
                 // первый элемент и остальные
                 const [head, ...tail] = arr

                 // в аккумулятор кладем элемент
                 // если функцию предикат вернула true
                 // иначе возвращаем текущий аккумулятор
                 // без добавления значения
                 const nextAcc = fn (head)
                                        ? [...acc, head]
                                        : [...acc]

                 return filterR (fn)(tail, nextAcc)
              }
            }

            const filterTrampoline = trampoline(filterR)
            // ===================================

            // ==== запуск ====
            const data = [1, 2, 3, 4, 5]

            const result = filterD (v => v > 3) (data)

            console.log (result) // [4, 5]
            // ===================================


          </code>
        </template>
      </CodeBlock>

    </section>
</template>
