<template>
  <div
    :class="[
      $style.dot,
      {
        [$style[`${color}`]]: color,
        [$style[`${size}`]]: size,
      },
    ]"
    :style="{
      top: `${position?.top}rem`,
      left: `${position?.left}rem`,
      right: `${position?.right}rem`,
      bottom: `${position?.bottom}rem`,
    }"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export type size =
  | 'extra-small'
  | 'small'
  | 'extra-medium'
  | 'medium'
  | 'default'
  | 'big';

export type color =
  | 'green'
  | 'black'
  | 'red'
  | 'white'
  | 'blue'
  | 'orange'
  | 'gray';

export interface IPosition {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export default defineComponent({
  name: 'DotComponent',
  props: {
    size: {
      type: String as PropType<size>,
      required: true,
    },
    color: {
      type: String as PropType<color>,
      required: true,
    },
    position: {
      type: Object as PropType<IPosition>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.dot {
  position: absolute;
  width: 1.4rem;
  height: 1.4rem;
  background: $black;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;

  /* @include respond-to(tablet) {
    opacity: .6;
  } */

  &.extra-small {
    width: 0.8rem;
    height: 0.8rem;
  }

  &.small {
    width: 1rem;
    height: 1rem;
  }
  &.extra-medium {
    width: 1.2rem;
    height: 1.2rem;
  }
  &.medium {
    width: 1.6rem;
    height: 1.6rem;
  }
  &.default {
    width: 1.8rem;
    height: 1.8rem;
  }

  &.big {
    width: 2rem;
    height: 2rem;
  }

  &.red {
    background: $red;
  }

  &.black {
    background: $black;
  }

  &.green {
    background: $green;
  }

  &.white {
    background: $white;
  }

  &.blue {
    background: $blue;
  }

  &.orange {
    background: $orange;
  }

  &.orange {
    background: $gray;
  }

  &:hover {
    animation: beat 0.3s infinite alternate;
  }

  @keyframes beat {
    to {
      transform: scale(1.6);
      opacity: 0.8;
    }
  }
}
</style>
