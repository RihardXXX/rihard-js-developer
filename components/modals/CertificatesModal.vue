<template>
  <div :class="$style.certificatesModal">
    <h2 :class="$style.close" @click="close">закрыть X</h2>
    <VImageLazy :src="src" object-fit="contain" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VImageLazy from '@/components/VImageLazy.vue';

export default defineComponent({
  name: 'CertificatesModal',

  components: {
    VImageLazy,
  },

  props: {
    src: {
      type: String as PropType<string>,
      required: true,
    },
  },

  methods: {
    close() {
      this.$modal.close();
    },
  },
});
</script>

<style lang="scss" module>
.certificatesModal {
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  height: 55%;
  z-index: 111;
  border-radius: 0.4rem;

  .close {
    position: absolute;
    right: -7rem;
    top: 0;
    cursor: pointer;
    padding: 1rem;
    color: $green;
    background: $white;
    border-radius: 0.4rem;
  }
}
</style>
