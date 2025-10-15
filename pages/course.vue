<script lang="ts">
import { defineComponent, PropType } from 'vue';

import ForWhom from '~/components/course/parts/ForWhom.vue';
import NotForWhom from '~/components/course/parts/NotForWhom.vue';
import ImperativeVsDeclarative from '~/components/course/parts/ImperativeVsDeclarative.vue';
import FunctionalProgramming from '~/components/course/parts/FunctionalProgramming.vue';
import PureFunctions from '~/components/course/parts/PureFunctions.vue';
import HindleyMilnerTypeNotation from '~/components/course/parts/HindleyMilnerTypeNotation.vue';
import CategoryTheory from '~/components/course/parts/СategoryTheory.vue'
import FantasyLand from '~/components/course/parts/FantasyLand.vue';
import CompositionFunctions from '~/components/course/parts/CompositionFunctions.vue';
import Currying from '~/components/course/parts/Currying.vue';
import CurryingAndAsynchrony from '~/components/course/parts/CurryingAndAsynchrony.vue';
import PartialApplication from '~/components/course/parts/PartialApplication.vue';
import RecursionFP from '~/components/course/parts/RecursionFP.vue';

import VCourseDone from '~/components/VCourseDone.vue';

import { IDevice } from '~/layouts/course.vue';

import {
  COURSE,
  FOR_WHOM,
  NOT_FOR_WHOM,
  IMPERATIVE_VS_DECLARATIVE,
  FUNCTIONAL_PROGRAMMING,
  PURE_FUNCTIONS,
  HINDLEY_MILNER_TYPE_NOTATION,
  CATEGORY_THEORY,
  FANTASY_LAND,
  COMPOSITION,
  CURRYING,
  CURRYING_AND_ASYNCHRONY,
  PARTIAL_APPLICATION,
  RECURSION,
} from '~/utils/course/constants';

export default defineComponent({
  name: 'Course',

  components: {
    ForWhom,
    NotForWhom,
    ImperativeVsDeclarative,
    FunctionalProgramming,
    PureFunctions,
    HindleyMilnerTypeNotation,
    CategoryTheory,
    FantasyLand,
    CompositionFunctions,
    Currying,
    CurryingAndAsynchrony,
    PartialApplication,
    RecursionFP,
    VCourseDone,
  },

  layout: 'course',

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },

  data() {
    return {
      COURSE,
      FOR_WHOM,
      NOT_FOR_WHOM,
      IMPERATIVE_VS_DECLARATIVE,
      FUNCTIONAL_PROGRAMMING,
      PURE_FUNCTIONS,
      HINDLEY_MILNER_TYPE_NOTATION,
      CATEGORY_THEORY,
      FANTASY_LAND,
      COMPOSITION,
      CURRYING,
      CURRYING_AND_ASYNCHRONY,
      PARTIAL_APPLICATION,
      RECURSION,
    }
  }
});

</script>

<template>
  <div class="container">
    <br />
    <br />

    <!-- Оглавление с якорными ссылками -->
    <ol :class="$style.contentList">
      <li>
        <nuxt-link :to="`${COURSE}${FOR_WHOM}`">Для кого этот курс</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${NOT_FOR_WHOM}`">Кому не подойдёт</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${IMPERATIVE_VS_DECLARATIVE}`">Императивность и декларативность</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${FUNCTIONAL_PROGRAMMING}`">Функциональное программирование</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${PURE_FUNCTIONS}`">Чистые функции</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${HINDLEY_MILNER_TYPE_NOTATION}`">Нотация типов Хиндли–Милнера</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${CATEGORY_THEORY}`">Теория категорий</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${FANTASY_LAND}`">Fantasy-land (Страна фантазий)</nuxt-link>

      </li>
      <li>
        <nuxt-link :to="`${COURSE}${COMPOSITION}`">Композиция функций</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${CURRYING}`">Каррирование</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${CURRYING_AND_ASYNCHRONY}`">Каррирование и Асинхронность (Эволюция)</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${PARTIAL_APPLICATION}`">Частичное применение</nuxt-link>
        <VCourseDone />
      </li>
      <li>
        <nuxt-link :to="`${COURSE}${RECURSION}`">Рекурсия</nuxt-link>
        <VCourseDone />
      </li>
    </ol>

    <ForWhom :device="device" />
    <NotForWhom :device="device" />
    <ImperativeVsDeclarative :device="device" />
    <FunctionalProgramming :device="device" />
    <PureFunctions :device="device" />
    <HindleyMilnerTypeNotation :device="device" />
    <CategoryTheory :device="device" />
    <FantasyLand :device="device" />
    <CompositionFunctions :device="device" />
    <Currying :device="device" />
    <CurryingAndAsynchrony :device="device" />
    <PartialApplication :device="device" />
    <RecursionFP :device="device" />

  </div>
</template>

<style lang="scss" module>
.contentList {
  text-align: left;
  margin: 0 0 2rem 1rem;
  font-weight: 500;
  font-size: 2rem;
  transition: all 0.5s;
  color: var(--text-color);
  padding: 0 1rem;

  li {
    margin: 1rem 0;
    list-style-type: circle;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a {
    color: inherit;
    /* text-decoration: none; */
    transition: color 0.2s;

    &:hover {
      color: var(--accent-color, #007acc);
      text-decoration: underline;
    }
  }

  @include respond-to(mobile) {
    margin-bottom: 1.4rem;
    font-size: 1.8rem;
  }
}

.checkBox {

}
</style>
