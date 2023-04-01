<template>
  <svg-icon
    :name="name"
    :class="[
      $style.VIcon,
      {
        [$style[`${size}`]]: size,
      },
    ]"
    class="test"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type size =
  | 'xsmall'
  | 'small'
  | 'medium'
  | 'large'
  | 'xlarge'
  | 'xxlarge'
  | 'big1'
  | 'big2'
  | 'big3'
  | 'big4'
  | 'big5'
  | 'big6'
  | 'big7'
  | 'big8'
  | 'big9'
  | 'big10';

// Эту хуйню на ставить в папку components перебивает родной svg-icon и не цепляются классы
// Импортировать локально дабы типы Для тайпскрипта подцепились

export default defineComponent({
  name: 'VIcon',

  props: {
    name: {
      type: String as PropType<String>,
      required: true,
    },

    size: {
      type: String as PropType<size>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.VIcon {
  &.xsmall {
    width: 1.2rem;
    height: 1.2rem;
  }

  &.small {
    width: 1rem;
    height: 1rem;
  }

  &.medium {
    width: 1.6rem;
    height: 1.6rem;
  }

  &.large {
    width: 2rem;
    height: 2rem;
  }

  &.xlarge {
    width: 2.4rem;
    height: 2.4rem;
  }

  &.xxlarge {
    width: 3.2rem;
    height: 3.2rem;
  }

  &.big1 {
    width: 3.6rem;
    height: 3.6rem;
  }

  &.big2 {
    width: 4rem;
    height: 4rem;
  }
  &.big3 {
    width: 4.4rem;
    height: 4.4rem;
  }

  &.big4 {
    width: 4.8rem;
    height: 4.8rem;
  }

  &.big5 {
    width: 5.2rem;
    height: 5.2rem;
  }

  &.big6 {
    width: 5.8rem;
    height: 5.8rem;
  }

  &.big7 {
    width: 6.4rem;
    height: 6.4rem;
  }

  &.big8 {
    width: 6.8rem;
    height: 6.8rem;
  }

  &.big9 {
    width: 7.4rem;
    height: 7.4rem;
  }

  &.big10 {
    width: 8rem;
    height: 8rem;
  }
}
</style>
