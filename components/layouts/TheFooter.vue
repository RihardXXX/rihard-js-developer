<template>
  <footer :class="['container', $style.footer]">
    <div :class="$style.item">
      @ {{ new Date().getFullYear() }} г. Все права защищены
    </div>
    <div :class="$style.item">Разработка Рихарда</div>
    <a :class="$style.item" target="_blank" href="https://vk.com/github05"
      >VKontakte</a
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
  }
}
</style>
