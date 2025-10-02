<script lang="ts">
import { defineComponent } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { PURE_FUNCTIONS } from '~/utils/course/constants';

export default defineComponent({
  name: 'PureFunctions',
  components: {
    Subtitle,
    Description,
    CodeBlock,
  },
  data() {
    return {
      PURE_FUNCTIONS
    }
  }
});
</script>

<template>
  <section :id="PURE_FUNCTIONS">
      <Subtitle>Чистые функции</Subtitle>
      <Description>
        <p>
          Чистые функции крайне важны, они идемпотентны. Если вам нужны сайд эффекты
          то группируйте их в отдельные функции и разделяйте от чистых функций. Любая программа
          особенно в вебе нуждается в сайд эффектах (изменение Dom дерева (tree), запросы к серверу (fetch), чтение из файла (readFile) и тп)
        </p>
      </Description>
      <CodeBlock>
        <template #default>
          <code>

            // НЕчистая функция
            // ===============================
            let user = { name: 'John', age: 25 }

            const changeAge = () => user.age = 30

            // мы мутируем внешнюю переменную и создаем сайд эффекты
            // программа будет везти себя непредсказуемо так как с этой
            // переменной могут работать несколько функций  и отловить ошибку будет сложнее
            changeAge()
            console.log(user) // { name: 'John', age: 30 }
            // ===============================


            // Такой код допустим, если мы создаем независимые модули с собственным замыканием
            // ===============================
            // useChangeUser :: Object -> Object
            const useChangeUser = (user) => {

              let userBase = structuredClone(user) // обязательно клонируем

              const changeAge = (newAge) => userBase.age = newAge

              // для работы снаружи с данными
              return {
                userBase,
                changeAge
              }
            }

            // Но даже в этом случае лучше делать так
            // useChangeUser :: Object -> Object
            const useChangeUser = (user) => {

              let userBase = structuredClone(user) // обязательно клонируем

              const changeAge = (newAge) => userBase = ({
                ...userBase, // или structuredClone(userBase) или JSON.parse(JSON.stringify(user))
                age: newAge
              })

              // для работы снаружи с данными
              return {
                userBase,
                changeAge
              }
            }
            // ===============================


            // А теперь давайте поправим пример выше
            // ===============================
            let user = { name: 'John', age: 25 }

            // Чистая функция
            // changeAge :: Number -> Object -> Object
            const changeAge = (newAge, user) => ({
              ...user,
              age: newAge
            })

            //  улучшим
            // или если требуется глубокое клонирование и каррирование

            // changeAge :: Number -> Object -> Object
            const changeAge = (newAge) => (user) => ({
              ...structuredClone(user), // или JSON.parse(JSON.stringify(user))
              age: newAge
            })

            // тут мы проверим все
            const changedUser = changeAge (30) (user)

            console.log(user) // { name: John, age: 25 } сохранил первоначальное состояние
            console.log(changedUser) // { name: John, age: 30 } получили нового пользователя без сайд эффектов
            // ===============================
          </code>

        </template>
      </CodeBlock>
    </section>
</template>
