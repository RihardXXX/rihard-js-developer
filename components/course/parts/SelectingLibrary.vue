<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Subtitle from '~/components/course/Subtitle.vue';
import Description from '~/components/course/Description.vue';
import CodeBlock from '~/components/course/CodeBlock.vue';

import { SELECTING_LIBRARY } from '~/utils/course/constants';

import { IDevice } from '~/layouts/course.vue';

export default defineComponent({
  name: 'SelectingLibrary',
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
      SELECTING_LIBRARY,
    }
  }
});
</script>

<template>
  <section :id="SELECTING_LIBRARY">
      <Subtitle>Vanilla JS, Lodash, Ramda, Sanctuary -> что выбрать</Subtitle>
      <Description>
        <p>
          Когда перед вами стоит выбор, что выбрать из выше описанных библиотек или
          ванильного решения не стоит опираться на следующие принципы, которые я часто
          встречал в своей практике при коммерческой разработке.
          <br>
          &emsp;<strong>Не стоит придерживаться следующего:</strong>
        </p>
        <ul style="margin-left: 2rem;">
          <li>
            1. Мне нравится эта библиотека; (хотелки)
          </li>
          <li>
            2. Это сейчас модно ))); (хотелки)
          </li>
          <li>
            3. Я главный, я решаю и я так хочу; (хотелки)
          </li>
        </ul>
         &emsp;Все выше описанное это не профессиональный подход.
      </Description>
      <Description>
        <p>
          На что следует обратить внимание.
        </p>
        <p>
          <strong>Какие критерии важны при выборе:</strong>
        </p>
        <ul style="margin-left: 2rem;">
          <li>
            1. Бюджет. Очень важно понять платежеспособность инвестора (клиента) и его планы на будущее.
            Это очень важный пункт и можно сказать один из основных.
          </li>
          <li>
            2. Насколько % проект завершён или он находится в начале. Аналогично
            Если проект написан и все работает корректно не нужно его переписывать.
          </li>
          <li>
            3. Кто работает с тобой в команде и сколько Вас человек. Нужно понимать
            процесс онбординга нового разраба в команду, знаком ли он с данной либой
            и твоими архитектурными решениями.
          </li>
          <li>
            4. Качество продукта. Чем выше сложность, тем зачастую качество будет расти.
          </li>
          <li>
            5. Перфоманс. Это не самый важный фактор, так как зачастую ошибка
            в логике приложения даст просадку а не какая либо либа.
          </li>
          <li>
            6. Парадигма функционального программирования.
          </li>
        </ul>
      </Description>
      <Description>
        <p>
          |&emsp;<strong>Vanilla JS</strong>&emsp;|
          <br>
          &emsp;----------------
        </p>
        <ul>
          <li style="margin: 10px 0;">
            1. Бюджет.
          <br>
          <br>
            Бюджет небольшой или средний.
          </li>
          --------------------
          <li style="margin: 10px 0;">
            2. Насколько % проект завершён или он находится в начале.
          <br>
          <br>
           Когда уже ранее проект начат был на JS и
           вышел за горизонт и финишную прямую.
          </li>
          --------------------
          <li style="margin: 10px 0;">
           3. Кто работает с тобой в команде и сколько Вас человек.
          <br>
          <br>
           Для малых команд
           с глубокими знаниями в JS. Порой это будет эффективнее чем большие команды
           с поверхностными знаниями в JS, но пишущие якобы без ошибок на TS.
          </li>
          --------------------
          <li style="margin: 10px 0;">
           4. Качество продукта.
          <br>
          <br>
           Зависит от команды, сроков и бюджета, зачастую невысокий.
          </li>
          --------------------
          <li style="margin: 10px 0;">
           5. Перфоманс.
          <br>
          <br>
           Будет самый высокий, при аналогичном коде относительно библиотек.
          </li>
          --------------------
          <li style="margin: 10px 0;">
           6. Парадигма функционального программирования.
          <br>
          <br>
           Полная свобода, процедурный, ООП, ФП и тп. И каждый как хочет.
          </li>
        </ul>
      </Description>
    </section>
</template>
