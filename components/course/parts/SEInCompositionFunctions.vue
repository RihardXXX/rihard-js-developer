<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { S_E_IN_COMPOSITION_FUNCTIONS } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'SEInCompositionFunctions',
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
      S_E_IN_COMPOSITION_FUNCTIONS,
    }
  }
});
</script>

<template>
  <section :id="S_E_IN_COMPOSITION_FUNCTIONS">
      <Subtitle>Side effects (сайд-побочные эффекты)  в композиции функций</Subtitle>
      <Description>
        <p>
          Исходя из принципов функционального программирования можно подумать,
          что создавать <strong>сайд-побочные эффекты в композиции функций</strong> нельзя.
          Но на самом деле любая программа и в особенности веб разработка в
          любом случае создаст, какой-нибудь побочный эффект (операции с DOM, операции ввода и вывода,
           логирование и тому подобное ...).
        </p>
        <p>
          В реальных кейсах побочные эффекты в композиции функций нам могут пригодится
          в основном в двух ситуациях:
        </p>
        <p>
          1. Дебагинг композиции и её логирование, в случае ошибок или вообще, чтобы понимать
          поток выполнения и изменения входных данных в композиции функции.
        </p>
        <p>
          2. Создание побочного эффекта в рамках программы согласно её логике и продолжение
          выполнения композиции функций.
        </p>
        <p>
          Попробуем с вами проверить промежуточные результаты в композиции функций, создав
          побочный эффект в виде лога данных.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Программа, которая берет деньги
    // пользователя и сравнивает с ценой товара
    // сообщает хватает ли ему денег на покупку товара
    // ===============================
    // pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
    const pipe = (...fns) => (data) =>
                                  fns
                                    .reduce((init, fn) => fn(init), data)

    // пользователь тестовый с 10 000$
    const dataUser = {
      name: 'John',
      money: 10000,
    }

    // товар с ценной 8 000$
    const product = {
      name: 'car',
      model: 'toyota',
      price: 8000
    }

    // prop :: String -> Record -> a
    const prop = (prop) => (data) => data[prop]

    // lt :: Number -> Number -> Boolean
    const lt = (a) => (b) => a < b

    const pipeline = pipe(
      prop ('money'), // получаем деньги пользователя
      lt (prop ('price') (product)), // сравниваем цену товара и деньги пользователя
      (success) => success ? 'the product can be purchased' : "you don't have enough money"
      // сообщаем может ли купить товар или не хватает денег
    )

    // запускаем композицию
    const resultMsg = pipeline (dataUser)

    console.log(resultMsg) // the product can be purchased

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Программа, которая берет деньги
            // пользователя и сравнивает с ценой товара
            // сообщает хватает ли ему денег на покупку товара
            // ===============================
            // pipe :: ((a -> b), (b -> c), ..., (y -> z)) -> a -> z
            const pipe = (...fns) => (data) =>
                                          fns
                                            .reduce((init, fn) => fn(init), data)

            // пользователь тестовый с 10 000$
            const dataUser = {
              name: 'John',
              money: 10000,
            }

            // товар с ценной 8 000$
            const product = {
              name: 'car',
              model: 'toyota',
              price: 8000
            }

            // prop :: String -> Record -> a
            const prop = (prop) => (data) => data[prop]

            // lt :: Number -> Number -> Boolean
            const lt = (a) => (b) => a < b

            const pipeline = pipe(
              prop ('money'), // получаем деньги пользователя
              lt (prop ('price') (product)), // сравниваем цену товара и деньги пользователя
              (success) => success ? 'the product can be purchased' : "you don't have enough money"
              // сообщаем может ли купить товар или не хватает денег
            )

            // запускаем композицию
            const resultMsg = pipeline (dataUser)

            console.log(resultMsg) // the product can be purchased

          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          Но как же нам получить результаты вызовов каждой функции в
          pipeline (prop ('money') ...), если даже не будет ошибок в композиции, мы просто хотим,
          отладить код.
        </p>
        <p>
          Давайте напишем универсальную утилиту для любого кейса
          в цепочке вызовов композиции.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Утилита которая вызовет функцию в аргументе
    // и прокинет аргумент дальше по композиции
    // ===============================
    // tapD :: (a → *) → a → a
    const tapD = (fn) => (arg) => {

      // делаем проверку
      // действительно ли первый аргумент функция
      if (typeof fn === 'function') {
        // вызываем функцию с аргументом
        fn (arg)
      }

      // не забываем дальше прокинут аргумент
      // для вызова в композиции функций
      return arg
    }

    // можно сократить в одну строку
    // tap :: (a → *) → a → a
    const tap = (fn) => (arg) => (fn (arg), arg)

    // а теперь давайте подготовим утилиту
    // для логирования данных
    // после каждого вызова в композиции

    // стандартный вывод в консоль
    const log = console.log

    // создаем логгер
    const logger = tap (log)

    // 😎 вводим логгер в цепочку вызовов функций
    // сразу запустим цепочку
    pipe(
      prop ('money'),
      logger, // 10000
      lt (prop ('price') (product)),
      logger, // true
      (success) => success ? 'the product can be purchased' : 'you don"t have enough money',
      logger, // 'the product can be purchased'
    ) (dataUser)

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Утилита которая вызовет функцию в аргументе
            // и прокинет аргумент дальше по композиции
            // ===============================
            // tapD :: (a → *) → a → a
            const tapD = (fn) => (arg) => {

              // делаем проверку
              // действительно ли первый аргумент функция
              if (typeof fn === 'function') {
                // вызываем функцию с аргументом
                fn (arg)
              }

              // не забываем дальше прокинут аргумент
              // для вызова в композиции функций
              return arg
            }

            // можно сократить в одну строку
            // tap :: (a → *) → a → a
            const tap = (fn) => (arg) => (fn (arg), arg)

            // а теперь давайте подготовим утилиту
            // для логирования данных
            // после каждого вызова в композиции

            // стандартный вывод в консоль
            const log = console.log

            // создаем логгер
            const logger = tap (log)

            // 😎 вводим логгер в цепочку вызовов функций
            // сразу запустим цепочку
            pipe(
              prop ('money'),
              logger, // 10000
              lt (prop ('price') (product)),
              logger, // true
              (success) => success ? 'the product can be purchased' : 'you don"t have enough money',
              logger, // 'the product can be purchased'
            ) (dataUser)

          </code>
        </template>
      </CodeBlock>
    </section>
</template>
