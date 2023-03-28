<template>
  <button
    :class="[
      $style.button,
      {
        [$style[`${color}`]]: color,
      },
    ]"
    @click="$emit('emit')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { color } from '@/components/Dot.vue';

export default defineComponent({
  name: 'VButton',

  props: {
    color: {
      type: String as PropType<color>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.button {
  padding: 1.6rem 2.4rem;
  border-radius: 1.2rem;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 150%;
  color: $white;
  cursor: pointer;

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
}
</style>
