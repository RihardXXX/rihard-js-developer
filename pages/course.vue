<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { romanize } from 'romans'

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
import PerformanceFP from '~/components/course/parts/PerformanceFP.vue';

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
  PERFORMANCE,
} from '~/utils/course/constants';

interface ListItem {
  id: number;
  name: string;
  route: string;
  status: 'at-work' | 'passed';
}

const listKey = 'list-key'


let id = 1

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
    PerformanceFP,
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
      list: [
        {
          id: id++,
          name: 'Для кого этот курс',
          route: `${COURSE}${FOR_WHOM}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Кому не подойдёт',
          route: `${COURSE}${NOT_FOR_WHOM}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Императивность и декларативность',
          route: `${COURSE}${IMPERATIVE_VS_DECLARATIVE}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Функциональное программирование',
          route: `${COURSE}${FUNCTIONAL_PROGRAMMING}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Чистые функции',
          route: `${COURSE}${PURE_FUNCTIONS}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Нотация типов Хиндли–Милнера',
          route: `${COURSE}${HINDLEY_MILNER_TYPE_NOTATION}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Теория категорий',
          route: `${COURSE}${CATEGORY_THEORY}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Fantasy-land (Страна фантазий)',
          route: `${COURSE}${FANTASY_LAND}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Композиция функций',
          route: `${COURSE}${COMPOSITION}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Каррирование',
          route: `${COURSE}${CURRYING}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Каррирование и Асинхронность (Эволюция)',
          route: `${COURSE}${CURRYING_AND_ASYNCHRONY}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Частичное применение',
          route: `${COURSE}${PARTIAL_APPLICATION}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Рекурсия',
          route: `${COURSE}${RECURSION}`,
          status: 'at-work',
        },
        {
          id: id++,
          name: 'Производительность (Performance - Перфоманс)',
          route: `${COURSE}${PERFORMANCE}`,
          status: 'at-work',
        },
      ] as Array<ListItem>
    }
  },

  mounted() {
    this.initialStatus()
  },

  methods: {
    changeStatus(newStatus: 'at-work' | 'passed', item: ListItem) {

      this.list = this.list
        .map((itemList: ListItem) => itemList.id === item.id ? {
          ...itemList,
          status: newStatus
        } : itemList)

      localStorage.setItem(listKey, JSON.stringify(this.list))
    },
    initialStatus() {
      const list = localStorage.getItem(listKey)

      if (!list) {
        return
      }

      const lsSave = JSON.parse(list)

      this.list = this.list.map((item: ListItem) => {

        const isFindItem = lsSave.find((l: ListItem) => l.id === item.id)

        if (isFindItem) {
          return {
            ...item,
            status: isFindItem.status
          }
        }
        return item
      })
    },
    getRomeNumber(n: number) {
      return romanize(n)
    }
  },
});

</script>

<template>
  <div class="container">
    <br />
    <br />

    <!-- Оглавление с якорными ссылками -->
    <ol
        :class="$style.contentList"
        >
        <li
          v-for="(listItem, i) in list"
          :key="listItem.id"
          :title="listItem.name"
          >
            <div :class="$style.number">
              {{ getRomeNumber(Number(i) + 1) }}
            </div>
            <nuxt-link :to="listItem.route">
              -> {{ listItem.name }}
            </nuxt-link>
            <VCourseDone
                :status-outer="listItem.status"
                @change="(status) => changeStatus(status, listItem)"
                />
          <hr :class="$style.hrItem" />
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
    <PerformanceFP :device="device" />

  </div>
</template>

<style lang="scss" module>
.contentList {
  text-align: left;
  /* margin: 0 0 2rem 2rem; */
  font-weight: 500;
  font-size: 2rem;
  transition: all 0.5s;
  color: var(--text-color);
  padding: 0 1rem 0 4rem;
  font-family: 'Sansation';

  li {
    position: relative;
    margin: 1rem 0;
    list-style-type: circle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    padding-left: 5px;

    .hrItem {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: $gray-100;
      border: none;
    }

    .number {
      position: absolute;
      left: -2rem;
      top: 50%;
      transform: translate(-50%, -70%);
      font-family: 'Sansation';
      border: 1px solid var(--text-color);
      padding: 3px;
    }
  }

  a {
    color: inherit;
    transition: all 0.2s;

    &:hover {
      color: var(--accent-color, #007acc);
      text-decoration: underline;
      text-underline-offset: 5px;
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
