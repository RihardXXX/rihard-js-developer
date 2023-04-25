<template>
  <h2 :class="$style.title" v-html="title" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PropType } from 'vue/types/v3-component-props';

export default defineComponent({
  name: 'VTitle',

  props: {
    title: {
      type: String as PropType<String>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.title {
  font-weight: 600;
  font-size: 5.8rem;
  line-height: 7rem;
  color: $green;
  margin-top: 1rem;

  span {
    color: $black-100;
  }

  @include respond-to(mobile) {
    font-size: 4rem;
    line-height: 5rem;
  }
}
</style>
