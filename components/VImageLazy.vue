<template>
  <img
    v-lazy-load
    data-src="~/assets/images/certificates/JS_React_Redux_23.png"
    alt=""
    title=""
    :class="$style.image"
    :styleValue="{ objectFit: objectFit }"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

type objectFit = 'cover' | 'contain' | 'fill' | '';

export default defineComponent({
  name: 'VImageLazy',

  props: {
    alt: {
      type: String as PropType<string | undefined>,
      required: false,
      default: '',
    },
    src: {
      type: String as PropType<String>,
      required: true,
    },

    objectFit: {
      type: String as PropType<objectFit>,
      required: false,
      default: '',
    },
  },
});
</script>

<style lang="scss" module>
.image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
