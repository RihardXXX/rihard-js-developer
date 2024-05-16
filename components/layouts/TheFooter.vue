<template>
  <footer :class="['container', $style.footer]">
    <div :class="$style.item">
      @ {{ new Date().getFullYear() }} г. Все права защищены
    </div>
    <div :class="$style.item">Разработка Рихарда</div>
    <a :class="$style.item" target="_blank" href="https://vk.com/github05"
      >VKontakte</a
    >
    <a :class="$style.item" target="_blank" href="https://github.com/RihardXXX"
      >Github</a
    >
    <a
      :class="$style.item"
      target="_blank"
      href="https://t.me/FrontendDeveloper05"
      >Telegram</a
    >
  </footer>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IDevice } from '~/layouts/default.vue';

export default defineComponent({
  name: 'TheFooter',

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4rem 0;
  border-top: 0.1rem solid #bec0bf;

  .item {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 1.6rem;
    color: $black;

    &:nth-child(3) {
      color: $green;
      transition: all 1s;

      &:hover {
        color: $black-200;
      }
    }
    &:nth-child(4) {
      color: $green;
      transition: all 1s;

      &:hover {
        color: $black-200;
      }
    }
    &:nth-child(5) {
      color: $green;
      transition: all 1s;

      &:hover {
        color: $black-200;
      }
    }
  }

  @include respond-to(tablet) {
    padding: 3rem 2rem;

    .item {
      font-size: 1.8rem;
    }
  }

  @include respond-to(mobile) {
    padding: 1rem 0;
    flex-direction: column-reverse;

    .item {
      font-size: 1.6rem;
      margin-bottom: 2.5rem;
    }
  }
}
</style>
