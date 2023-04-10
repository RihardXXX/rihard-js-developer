<template>
  <header ref="header" :class="$style.headerWrap">
    <Dot
      v-for="dot in dots"
      :key="dot.id"
      :size="dot.size"
      :color="dot.color"
      :position="dot.position"
    />
    <div :class="['container', $style.main]">
      <div :class="$style.logo">
        <span :class="$style.firstChar">F</span>
        <span :class="$style.textLogo">rontend developer</span>
      </div>
      <nav>
        <ul v-show="Boolean(menu.length)" :class="$style.navList">
          <li
            v-for="menuItem in menu"
            :key="`header${menuItem.id}`"
            :class="$style.navItem"
          >
            <nuxt-link :to="menuItem.to">{{ menuItem.name }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dot, { size, color, IPosition } from '@/components/Dot.vue';
// import { IAPIPaths, apiPaths } from '~/config/apiPaths';

let idx: number = 1;

interface MenuItem {
  id: number;
  name: string;
  to: string;
}

export interface IDots {
  id: number | string;
  size: size;
  color: color;
  position: IPosition;
}

export default defineComponent({
  name: 'TheHeader',

  components: {
    Dot,
  },
  // asyncData (context) {
  //   context.app.$myInjectedFunction('works in asyncData')
  // },

  data() {
    // '', 'Навыки', 'Портфолио', 'Контакты', 'Блог', 'Соц. сети'
    return {
      menu: [
        {
          id: idx++,
          name: 'Обо мне',
          to: 'me',
        },
        {
          id: idx++,
          name: 'Навыки',
          to: 'skills',
        },
        {
          id: idx++,
          name: 'Портфолио',
          to: 'portfolio',
        },
        {
          id: idx++,
          name: 'Контакты',
          to: 'contacts',
        },
        {
          id: idx++,
          name: 'Блог',
          to: 'blog',
        },
        {
          id: idx++,
          name: 'Соц. сети',
          to: 'social',
        },
      ] as Array<MenuItem>,
      dots: [
        {
          id: idx++,
          size: 'small',
          color: 'blue',
          position: { top: '.6', left: '33.2' },
        },
        {
          id: idx++,
          size: 'medium',
          color: 'green',
          position: { top: '5.6', left: '3' },
        },
        {
          id: idx++,
          size: 'medium',
          color: 'blue',
          position: { top: '2.2', left: '59.6' },
        },
        {
          id: idx++,
          size: 'small',
          color: 'gray',
          position: { top: '4.9', left: '44.7' },
        },
      ] as Array<IDots>,
    };
  },

  mounted(): void {
    // console.log(112);
    // console.log(this.$apiPaths);
  },

  methods: {
    getRefs() {
      if (!this.$refs.header) {
        return;
      }
      return this.$refs?.header;
    },
  },
});
</script>

<style lang="scss" module>
.headerWrap {
  width: 100%;
  height: 9.6rem;
  position: relative;

  .main {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 4rem;

    .logo {
      position: relative;
      color: $green;

      .firstChar {
        position: absolute;
        font-size: 4.4rem;
        font-weight: 700;
        top: 0;
        left: -2.5rem;
        transform: rotate(340deg);
      }

      .textLogo {
        font-weight: 600;
        font-size: 32px;
        line-height: 150%;
      }
    }

    .navList {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      .navItem {
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 145%;
        margin-left: 4rem;
        transition: all 0.5s;

        &:first-child {
          margin-left: 0;
        }

        &:hover {
          color: $green;
          transform: scale(1.2);
        }
      }
    }
  }
}
</style>
