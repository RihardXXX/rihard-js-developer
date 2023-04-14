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
            @click="() => selectSection(menuItem)"
          >
            {{ menuItem.name }}
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Dot, { size, color, IPosition } from '@/components/Dot.vue';
import { intersectionObserver } from '@/assets/utils';
// import { IAPIPaths, apiPaths } from '~/config/apiPaths';

let idx: number = 1;

interface MenuItem {
  id: number;
  name: string;
  ref: Element | undefined;
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
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Навыки',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Сертификаты',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Отзывы',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Портфолио',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Контакты',
          ref: undefined,
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

  created() {
    this.$nuxt.$on('setRefAboutMe', (aboutMe: Element) => {
      this.menu = this.menu.map((m: MenuItem) => m.name === 'Обо мне' ? { ...m, ref: aboutMe } : { ...m });
    });
    this.$nuxt.$on('setRefSkills', (skills: Element) => {
      this.menu = this.menu.map((m: MenuItem) => m.name === 'Навыки' ? { ...m, ref: skills } : { ...m });
    });
    this.$nuxt.$on('setRefCertificates', (certificates: Element) => {
      this.menu = this.menu.map((m: MenuItem) => m.name === 'Сертификаты' ? { ...m, ref: certificates } : { ...m });
    });
  },

  mounted(): void {
    const refHeader = this.$refs?.header as Element;

    if (!refHeader) {
      return;
    }

    intersectionObserver(refHeader, (isIntersecting) => {
      this.$emit('showHeader', isIntersecting);
    });

    this.$emit('setHeaderRef', refHeader);
  },


  methods: {
    selectSection(m: MenuItem): void {
      m.ref?.scrollIntoView({ behavior: 'smooth' });
    },
  }
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
        cursor: pointer;

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
