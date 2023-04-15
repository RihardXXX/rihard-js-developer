<template>
  <div :class="$style.label">{{ label }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue/types/v3-component-props';

export default defineComponent({
  name: 'VLabel',

  props: {
    label: {
      type: String as PropType<String>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.label {
  /* width: 9.9rem; */
  height: 6rem;
  border: 0.05rem solid $green;
  border-radius: 100%;
  color: $green;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 2rem;
  padding: 1rem;
}
</style>
