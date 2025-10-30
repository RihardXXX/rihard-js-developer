<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { LENSES } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'LensesFP',
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
      LENSES,
    }
  }
});
</script>

<template>
  <section :id="LENSES">
      <Subtitle>Линзы</Subtitle>
      <Description>
        <p>
          <strong>Линзы</strong> это инструмент (паттерн), который используется в функциональном
          программировании при работе с данными, обеспечивая иммутабельность данных и чистоту функции.
        </p>
        <p>
          Иммутабельность - это способность не изменять данные.
        </p>
        <p>
          Давайте возьмем пример из официальной документации библиотеки Ramda JS.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Lens s a = Functor f => (a → f a) → s → f s
    // ===============================
    // создаем линзу
    // путь к данными
    const xHeadYLens = R.lensPath(['x', 0, 'y']);

    // запускаем линзу в разных функциях

    // тестируемые данные
    const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

    // функция view получает данные согласно пути линзы
    // не меняя ничего в первоначальном объекте
    const resultView = R.view(xHeadYLens, data);

    // функция set устанавливает новые данные
    // по пути линзы не меняя исходные данные  в объекте
    // а возвращая новый объект с измененными данными
    const resultSet = R.set(xHeadYLens, 1, data);

    // over работает с линзой как set
    // но вместо данных принимает функцию
    // которая примет в качестве аргумента
    // данные по пути линзы
    const resultOver = R.over(xHeadYLens, R.negate, data);

    console.log(resultView) // 2
    console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
    console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Lens s a = Functor f => (a → f a) → s → f s
            // ===============================
            // создаем линзу
            // путь к данными
            const xHeadYLens = R.lensPath(['x', 0, 'y']);

            // запускаем линзу в разных функциях

            // тестируемые данные
            const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

            // функция view получает данные согласно пути линзы
            // не меняя ничего в первоначальном объекте
            const resultView = R.view(xHeadYLens, data);

            // функция set устанавливает новые данные
            // по пути линзы не меняя исходные данные  в объекте
            // а возвращая новый объект с измененными данными
            const resultSet = R.set(xHeadYLens, 1, data);

            // over работает с линзой как set
            // но вместо данных принимает функцию
            // которая примет в качестве аргумента
            // данные по пути линзы
            const resultOver = R.over(xHeadYLens, R.negate, data);

            console.log(resultView) // 2
            console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
            console.log(resultOver) // {x: [{y: -2, z: 3}, {y: 4, z: 5}]}

          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          В примерах выше, мы с вами увидели как пользоваться
          <strong>линзами</strong>.
        </p>
        <p>
          А теперь попробуем реализовать кастомную свою линзу.
          В продакшен коде используйте готовые решения с библиотек
          Ramda JS or Sanctuary JS.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Lens s a = Functor f => (a → f a) → s → f s
    // ===============================
    // создаем линзу
    // lens :: [String] -> Lens s a
    const lens = (path) => {

      // getter :: [a] -> [b] -> b
      const getter = (path) => (data) => {
        // если в линзу не прокинут путь
        // то возвращаем данные
        if (!path.length) {
          return data
        }

        // первый элемент пути и остальной путь
        const [head, ...tail] = path

        // когда в пути остается один элемент
        // хвост отсутствует
        // вызывается базовый случай
        // и возвращаются данные
        if (!tail.length) {
          return data[head]
        }

        // рекурсивный случай
        // срезанный путь бросаем в качестве первого аргумента
        // в качестве данные бросаем вложенность
        return getter (tail) (data[head])
      }

      // setter :: [a] -> b | (* -> *) -> [b] -> [c]
      const setter = (path) => (v) => (data) => {
        // если в линзу не прокинут путь
        // то возвращаем данные
        if (!path.length) {
          return data
        }

        // первый элемент пути и остальной путь
        const [head, ...tail] = path

        // когда в пути остается один элемент
        // хвост отсутствует
        // вызывается базовый случай
        // и возвращаются данные
        // подменив значение ключа
        if (!tail.length) {

          // проверка чтобы понять
          // вызывается как over или set
          // чисто функция или значение
          // отправлено в качестве аргумента
          const isFunction = typeof v === 'function'

          return {
            ...data,
            [head]: isFunction
                        ? v (data[head])
                        : v
          }
        }

        // рекурсивный случай
        // срезанный путь бросаем в качестве первого аргумента
        // аргумент изменения оставляем такой же
        // в качестве данные бросаем вложенность
        return {
          ...data,
          [head]: setter (tail) (v) (data[head])
        }
      }


      // возвращает геттер  и сеттер
      // сохраняя в замыкании путь к данным
      return {
        getter: getter (path),
        setter: setter (path),
      }
    }

    // линза готова
    //  осталось реализовать view set over

    // мы просто вызываем геттер у линзы
    // и бросаем туда данные для обработки
    // view :: [a] -> [b] -> b
    const view = (lens) => (data) => lens.getter (data)

    // мы просто вызываем сеттер у линзы
    // и бросаем туда данные для обработки
    // set :: [a] -> c -> [b] -> b
    const set = (lens) => (v) => (data) => lens.setter (v) (data)

    // аналогичен в реализации set
    // over :: [a] -> c -> [b] -> b
    const over = (lens) => (fn) => (data) => lens.setter (fn) (data)

    // тестируем код
    // =============
    // создаем линзу
    const xLens = lens(['x', 0, 'y']);

    // тестируемые данные
    const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

    const resultView = view (xLens) (data)
    const resultSet = set (xLens) (1) (data)
    // ((a) => (b) => a + b) (3) создается каррированая функция
    // которая сразу вызывается и возвращает
    // (b) => 3 + b
    const resultOver = over (xLens) ( ((a) => (b) => a + b) (3) ) (data)

    console.log(resultView) // 2
    console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
    console.log(resultOver) // {x: [{y: 5, z: 3}, {y: 4, z: 5}]}

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Lens s a = Functor f => (a → f a) → s → f s
            // ===============================
            // создаем линзу
            // lens :: [String] -> Lens s a
            const lens = (path) => {

              // getter :: [a] -> [b] -> b
              const getter = (path) => (data) => {
                // если в линзу не прокинут путь
                // то возвращаем данные
                if (!path.length) {
                  return data
                }

                // первый элемент пути и остальной путь
                const [head, ...tail] = path

                // когда в пути остается один элемент
                // хвост отсутствует
                // вызывается базовый случай
                // и возвращаются данные
                if (!tail.length) {
                  return data[head]
                }

                // рекурсивный случай
                // срезанный путь бросаем в качестве первого аргумента
                // в качестве данные бросаем вложенность
                return getter (tail) (data[head])
              }

              // setter :: [a] -> b | (* -> *) -> [b] -> [c]
              const setter = (path) => (v) => (data) => {
                // если в линзу не прокинут путь
                // то возвращаем данные
                if (!path.length) {
                  return data
                }

                // первый элемент пути и остальной путь
                const [head, ...tail] = path

                // когда в пути остается один элемент
                // хвост отсутствует
                // вызывается базовый случай
                // и возвращаются данные
                // подменив значение ключа
                if (!tail.length) {

                  // проверка чтобы понять
                  // вызывается как over или set
                  // чисто функция или значение
                  // отправлено в качестве аргумента
                  const isFunction = typeof v === 'function'

                  return {
                    ...data,
                    [head]: isFunction
                                ? v (data[head])
                                : v
                  }
                }

                // рекурсивный случай
                // срезанный путь бросаем в качестве первого аргумента
                // аргумент изменения оставляем такой же
                // в качестве данные бросаем вложенность
                return {
                  ...data,
                  [head]: setter (tail) (v) (data[head])
                }
              }


              // возвращает геттер  и сеттер
              // сохраняя в замыкании путь к данным
              return {
                getter: getter (path),
                setter: setter (path),
              }
            }

            // линза готова
            //  осталось реализовать view set over

            // мы просто вызываем геттер у линзы
            // и бросаем туда данные для обработки
            // view :: [a] -> [b] -> b
            const view = (lens) => (data) => lens.getter (data)

            // мы просто вызываем сеттер у линзы
            // и бросаем туда данные для обработки
            // set :: [a] -> c -> [b] -> b
            const set = (lens) => (v) => (data) => lens.setter (v) (data)

            // аналогичен в реализации set
            // over :: [a] -> c -> [b] -> b
            const over = (lens) => (fn) => (data) => lens.setter (fn) (data)

            // тестируем код
            // =============
            // создаем линзу
            const xLens = lens(['x', 0, 'y']);

            // тестируемые данные
            const data = { x: [ { y: 2, z: 3 }, { y: 4, z: 5 } ] }

            const resultView = view (xLens) (data)
            const resultSet = set (xLens) (1) (data)
            // ((a) => (b) => a + b) (3) создается каррированая функция
            // которая сразу вызывается и возвращает
            // (b) => 3 + b
            const resultOver = over (xLens) ( ((a) => (b) => a + b) (3) ) (data)

            console.log(resultView) // 2
            console.log(resultSet) // {x: [{y: 1, z: 3}, {y: 4, z: 5}]}
            console.log(resultOver) // {x: [{y: 5, z: 3}, {y: 4, z: 5}]}

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
