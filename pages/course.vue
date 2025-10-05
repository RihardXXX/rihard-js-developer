<script lang="ts">
import { defineComponent } from 'vue';

import ForWhom from '~/components/course/parts/ForWhom.vue';
import NotForWhom from '~/components/course/parts/NotForWhom.vue';
import ImperativeVsDeclarative from '~/components/course/parts/ImperativeVsDeclarative.vue';
import FunctionalProgramming from '~/components/course/parts/FunctionalProgramming.vue';
import PureFunctions from '~/components/course/parts/PureFunctions.vue';
import HindleyMilnerTypeNotation from '~/components/course/parts/HindleyMilnerTypeNotation.vue';
import CategoryTheory from '~/components/course/parts/СategoryTheory.vue'
import FantasyLand from '~/components/course/parts/FantasyLand.vue';
import CompositionFunctions from '~/components/course/parts/CompositionFunctions.vue';

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
  },
  layout: 'course',
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
      COMPOSITION
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
      <li><a :href="`${COURSE}${FOR_WHOM}`">Для кого этот курс</a></li>
      <li><a :href="`${COURSE}${NOT_FOR_WHOM}`">Кому не подойдёт</a></li>
      <li><a :href="`${COURSE}${IMPERATIVE_VS_DECLARATIVE}`">Императивность и декларативность</a></li>
      <li><a :href="`${COURSE}${FUNCTIONAL_PROGRAMMING}`">Функциональное программирование</a></li>
      <li><a :href="`${COURSE}${PURE_FUNCTIONS}`">Чистые функции</a></li>
      <li><a :href="`${COURSE}${HINDLEY_MILNER_TYPE_NOTATION}`">Нотация типов Хиндли–Милнера</a></li>
      <li><a :href="`${COURSE}${CATEGORY_THEORY}`">Теория категорий</a></li>
      <li><a :href="`${COURSE}${FANTASY_LAND}`">Fantasy-land (Страна фантазий)</a></li>
      <li><a :href="`${COURSE}${COMPOSITION}`">Композиция функций</a></li>
    </ol>

    <ForWhom />
    <NotForWhom />
    <ImperativeVsDeclarative />
    <FunctionalProgramming />
    <PureFunctions />
    <HindleyMilnerTypeNotation />
    <CategoryTheory />
    <FantasyLand />
    <CompositionFunctions />

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
</style>
