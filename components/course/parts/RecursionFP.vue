<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { RECURSION } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'RecursionFP',
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
      RECURSION
    }
  }
});
</script>

<template>
  <section :id="RECURSION">
      <Subtitle>Рекурсия</Subtitle>
      <Description>
        <p>
          <strong>Рекурсия</strong>
          - это способность функции вызывать саму себя.
        </p>
        <p>
          <strong>Рекурсия</strong> должна отвечать двум основным требованиям,
          чтобы она корректно работала.
        </p>
        <p>
          1. Базовый случай. Это логика при которой рекурсия должна прекращаться.
          Базовое условие, которое прекращает вызов функции саму себя.
        </p>
        <p>
          2. Рекурсивный случай. Это логика при которой функция вызывает саму себя,
          обычно с небольшими изменениями в аргументах.
        </p>
        <p>
          <strong>Рекурсия</strong> часто используется в функциональном программировании.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // наша цель получить средний возраст пользователей

    // ================================
    // декларативный стиль без рекурсии

    // список пользователей
    const fetchAllUsers = () => new Promise(resolve => resolve([
      { name: 'John', status: 'online', age: 28 },
      { name: 'Angel', status: 'online', age: 35 },
      { name: 'Michel', status: 'offline', age: 18 },
      { name: 'Anna', status: 'offline', age: 20 },
    ]))

    // getAgeAverage :: [a] -> Number
    const getAgeAverage = (users) => pipe (
      (users) => [
        users.reduce ((init, { age }) => init + age, 0),
        users.length
        ], // получаем общий возраст и количество пользователей
      ([allAges, quantity]) => Math.round (allAges / quantity), // вычисляем средний возраст
      console.log // логируем результат
    ) (users)

    fetchAllUsers().then(getAgeAverage)
    // ================================

    // Рекурсивный пример
    // ================================
    // эта функций рекурсивная оптимизирована
    // она не делает 2 * вызовов
    // потому что по достижению базового случая она
    // сразу возвращает результат
    // но про это мы поговорим еще позже

    // а теперь тоже самое сделаем с помощью рекурсии
    // recurAgeAverage :: [a] -> Number -> Number -> Number
    const recurAgeAverage = (
        users, // массив данных пользователей
        sumAges = 0, // сумма возрастов пользователей
        quantityUsers = users.length // первичное количество пользователей
      ) => {

      // базовый случай, условие выхода
      // когда массив уже пуст
      if (!users.length) {
        // сумму всех лет пользователей делим на количество пользователей
        // чтобы посчитать средний возраст пользователей
        return sumAges / quantityUsers
      }

      // рекурсивный случай, чтобы вызывать самого себя
      // пока в массиве есть элементы
      return recurAgeAverage (
          users.slice(1), // возвращаем массив без первого элемента
          sumAges = sumAges + users[0]?.age, // собираем возраст каждого пользователя
          quantityUsers // передаем ранее сохраненное значение количество пользователей
        )
    }
    // ================================

    // Давайте нашу функцию перепишем в одну строку и вызовем
    const recurAgeAverageF = (users, sumAges = 0, quantityUsers)
                              => !users.length
                                  ? sumAges / quantityUsers
                                  : recurAgeAverageF (
                                      users.slice(1),
                                      sumAges = sumAges + users[0]?.age,
                                      quantityUsers
                                    )

    ( async () => {
      const users = await fetchAllUsers () // получаем список пользователей
      const averageAge = recurAgeAverageF (users) // получаем средний возраст рекурсивно
      console.log (averageAge) // логируем результат 25.25
    }
    )()

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // наша цель получить средний возраст пользователей

            // ================================
            // декларативный стиль без рекурсии

            // список пользователей
            const fetchAllUsers = () => new Promise(resolve => resolve([
              { name: 'John', status: 'online', age: 28 },
              { name: 'Angel', status: 'online', age: 35 },
              { name: 'Michel', status: 'offline', age: 18 },
              { name: 'Anna', status: 'offline', age: 20 },
            ]))

            // getAgeAverage :: [a] -> Number
            const getAgeAverage = (users) => pipe (
              (users) => [
                users.reduce ((init, { age }) => init + age, 0),
                users.length
                ], // получаем общий возраст и количество пользователей
              ([allAges, quantity]) => Math.round (allAges / quantity), // вычисляем средний возраст
              console.log // логируем результат
            ) (users)

            fetchAllUsers().then(getAgeAverage)
            // ================================

            // Рекурсивный пример
            // ================================
            // эта функций рекурсивная оптимизирована
            // она не делает 2 * вызовов
            // потому что по достижению базового случая она
            // сразу возвращает результат
            // но про это мы поговорим еще позже

            // а теперь тоже самое сделаем с помощью рекурсии
            // recurAgeAverage :: [a] -> Number -> Number -> Number
            const recurAgeAverage = (
                users, // массив данных пользователей
                sumAges = 0, // сумма возрастов пользователей
                quantityUsers = users.length // первичное количество пользователей
              ) => {

              // базовый случай, условие выхода
              // когда массив уже пуст
              if (!users.length) {
                // сумму всех лет пользователей делим на количество пользователей
                // чтобы посчитать средний возраст пользователей
                return sumAges / quantityUsers
              }

              // рекурсивный случай, чтобы вызывать самого себя
              // пока в массиве есть элементы
              return recurAgeAverage (
                  users.slice(1), // возвращаем массив без первого элемента
                  sumAges = sumAges + users[0]?.age, // собираем возраст каждого пользователя
                  quantityUsers // передаем ранее сохраненное значение количество пользователей
                )
            }
            // ================================

            // Давайте нашу функцию перепишем в одну строку и вызовем
            const recurAgeAverageF = (users, sumAges = 0, quantityUsers)
                                      => !users.length
                                          ? sumAges / quantityUsers
                                          : recurAgeAverageF (
                                              users.slice(1),
                                              sumAges = sumAges + users[0]?.age,
                                              quantityUsers
                                            )

            ( async () => {
              const users = await fetchAllUsers () // получаем список пользователей
              const averageAge = recurAgeAverageF (users) // получаем средний возраст рекурсивно
              console.log (averageAge) // логируем результат 25.25
            }
            )()

          </code>
        </template>
      </CodeBlock>
      <Description>
        <p>
          Пример выше с <strong>рекурсия</strong> возможно для некоторых не простой.
          Поэтому мы напишем пример проще и визуализируем вызова. Главное не волнуйтесь,
          если сразу вам что-то непонятно.
        </p>
      </Description>
      <CodeBlock v-if="device.mobile">
        <template #default>
          <code>

    // Наша цель собрать общий рейтинг пользователей
    // То есть сумму  рейтингов

    const users = [
      { name: 'John', rating: 4.5 },
      { name: 'Angel', rating: 4 },
      { name: 'Michel', rating: 3 },
      { name: 'Anna', rating: 5 },
    ]

    // sumRating : [a] -> Number
    const sumRating = (users) => {
      // базовый случай, условие выхода когда массив пуст
      if (!users.length) {
        return 0
      }

      // рекурсивный случай
      // рейтинг первого элемента складывается
      // с вызовом самой же функции с вырезанным эти элементом
      return users[0].rating + sumRating (users.slice(1))
    }

    // давайте сократим синтасис
    const rateSum = (users) =>
                          !users.length
                            ? 0
                            :  users[0] + rateSum (users.slice(1))

    // визуализируем вызовы
    // и для понимания представим массив числе вместо ключа rating
    rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + rateSum ([4, 3, 5])
    rateSum ([4, 3, 5]) // возвращает 4 + rateSum ([3, 5])
    rateSum ([3, 5]) // возвращает 3 + rateSum ([5])
    rateSum ([5]) // возвращает 5 + rateSum ([])
    rateSum ([]) // возвращает 0 достигли базового случая

    // и тут самое главное идут возвраты от вызовов в стэке
    rateSum ([5]) // возвращает 5 + 0
    rateSum ([3, 5]) // возвращает 3 + 5
    rateSum ([4, 3, 5]) // возвращает 4 + 8
    rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + 12
    // итоговый результат 16.5

          </code>
        </template>
      </CodeBlock>
      <CodeBlock v-else>
        <template #default>
          <code>

            // Наша цель собрать общий рейтинг пользователей
            // То есть сумму  рейтингов

            const users = [
              { name: 'John', rating: 4.5 },
              { name: 'Angel', rating: 4 },
              { name: 'Michel', rating: 3 },
              { name: 'Anna', rating: 5 },
            ]

            // sumRating : [a] -> Number
            const sumRating = (users) => {
              // базовый случай, условие выхода когда массив пуст
              if (!users.length) {
                return 0
              }

              // рекурсивный случай
              // рейтинг первого элемента складывается
              // с вызовом самой же функции с вырезанным эти элементом
              return users[0].rating + sumRating (users.slice(1))
            }

            // давайте сократим синтасис
            const rateSum = (users) =>
                                  !users.length
                                    ? 0
                                    :  users[0] + rateSum (users.slice(1))

            // визуализируем вызовы
            // и для понимания представим массив числе вместо ключа rating
            rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + rateSum ([4, 3, 5])
            rateSum ([4, 3, 5]) // возвращает 4 + rateSum ([3, 5])
            rateSum ([3, 5]) // возвращает 3 + rateSum ([5])
            rateSum ([5]) // возвращает 5 + rateSum ([])
            rateSum ([]) // возвращает 0 достигли базового случая

            // и тут самое главное идут возвраты от вызовов в стэке
            rateSum ([5]) // возвращает 5 + 0
            rateSum ([3, 5]) // возвращает 3 + 5
            rateSum ([4, 3, 5]) // возвращает 4 + 8
            rateSum ([4.5, 4, 3, 5]) // возвращает 4.5 + 12
            // итоговый результат 16.5

          </code>
        </template>
      </CodeBlock>

    </section>
</template>
