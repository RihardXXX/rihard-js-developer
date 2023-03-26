<template>
  <header :class="$style.headerWrap">
    <div :class="['container', $style.main]">
      <div>logo</div>
      <nav>
        <ul v-show="Boolean(menu.length)" :class="$style.navList">
          <li v-for="menuItem in menu" :key="`header${menuItem.id}`">
            <nuxt-link :to="menuItem.to">{{ menuItem.name }}</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

// TODO: Сверстать Хедар // TODO: сделать плагин для путей апи // TODO: внедрить
axios
<script lang="ts">
import { defineComponent } from 'vue';

let idx: number = 1;

interface MenuItem {
  id: number;
  name: string;
  to: string;
}

export default defineComponent({
  name: 'TheHeader',

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
    };
  },
});
</script>

<style lang="scss" module>
.headerWrap {
  width: 100%;
  height: 9.6rem;

  .main {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 5.6rem;
    margin-top: 4rem;

    .navList {
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
}
</style>
