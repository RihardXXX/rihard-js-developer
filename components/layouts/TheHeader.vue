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
      <nav :class="$style.nav">
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
import { defineComponent, PropType } from 'vue';
import Dot, { size, color, IPosition } from '@/components/Dot.vue';
import { intersectionObserver } from '@/assets/utils';
import { IDevice } from '~/layouts/default.vue';

let idx: number = 1;

export type eventNameRef =
  | 'aboutMe'
  | 'skills'
  | 'certificates'
  | 'reviews'
  | 'portfolio'
  | 'contact';

interface MenuItem {
  id: number;
  name: string;
  eventName: eventNameRef;
  ref: Element | undefined;
}

export interface IDots {
  id: number | string;
  size: size;
  color: color;
  position: IPosition;
}

export interface EventPayloadRefInterface {
  element: Element;
  eventName: eventNameRef;
}

export default defineComponent({
  name: 'TheHeader',

  components: {
    Dot,
  },

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },

  data() {
    return {
      menu: [
        {
          id: idx++,
          name: 'Обо мне',
          eventName: 'aboutMe',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Навыки',
          eventName: 'skills',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Сертификаты',
          eventName: 'certificates',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Отзывы',
          eventName: 'reviews',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Портфолио',
          eventName: 'portfolio',
          ref: undefined,
        },
        {
          id: idx++,
          name: 'Контакты',
          eventName: 'contact',
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
          position: { top: '2.2', left: '35' },
        },
        {
          id: idx++,
          size: 'small',
          color: 'gray',
          position: { top: '4.9', left: '30.7' },
        },
      ] as Array<IDots>,
    };
  },

  created() {
    this.$nuxt.$on(
      'addRef',
      ({ element, eventName }: EventPayloadRefInterface) => {
        this.menu = this.menu.map((menuItem: MenuItem) => {
          if (menuItem.eventName === eventName) {
            return {
              ...menuItem,
              ref: element,
            };
          }
          return menuItem;
        });
      }
    );
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
  },
});
</script>

<style lang="scss" module>
.headerWrap {
  width: 100%;
  height: 9.6rem;
  position: relative;

  @include respond-to(tablet) {
    height: auto;
  }

  .main {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-top: 4rem;

    @include respond-to(tablet) {
      flex-direction: column;
      width: 100%;
    }

    .logo {
      position: relative;
      color: $green;

      @include respond-to(tablet) {
        margin-bottom: 2rem;
      }

      @include respond-to(mobile) {
        margin-bottom: 1rem;
      }

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
        font-weight: 600;
        font-size: 1.8rem;
        line-height: 145%;
        margin-left: 4rem;
        transition: all 0.5s;
        cursor: pointer;
        color: var(--text-color);

        &:first-child {
          margin-left: 0;
        }

        &:hover {
          color: $green;
          transform: scale(1.2);
        }
      }
    }

    .nav {
      @include respond-to(mobile) {
        margin: 0 1rem;

        .navList {
          flex-wrap: wrap;
          width: 100%;
          justify-content: space-between;

          .navItem {
            width: 30%;
            margin-left: 0;
            margin: 1.5rem 0;
            font-weight: 600;
            font-size: 1.8rem;

            &:hover {
              color: $black;
              transform: scale(1);
            }
          }
        }
      }
    }
  }
}
</style>
