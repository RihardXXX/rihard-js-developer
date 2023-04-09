<template>
  <transition name="fade">
    <div v-show="component" :key="key" :class="$style.TheModal">
      <component :is="component" :key="key" v-bind="attrs" @close="close" />
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Vue from 'vue/types/umd';

type key = string | undefined | number;

export default defineComponent({
  name: 'TheModal',

  data() {
    return {
      component: undefined as Vue.AsyncComponent | undefined,
      attrs: null as object | null,
      onClose: null as any,
      key: undefined as key,
    };
  },

  beforeMount() {
    this.$modal.event.$on('open', this.open);
    this.$modal.event.$on('close', this.close);
  },

  beforeDestroy() {
    this.$modal.event.$off('open', this.open);
    this.$modal.event.$off('close', this.close);
  },

  methods: {
    open(component: Vue.AsyncComponent, attrs: object, onClose: () => void) {
      if (component) {
        this.component = component;
      }
      this.attrs = attrs;
      this.onClose = onClose;
      this.key = Math.random();
      document.body.style.overflow = 'hidden';
    },

    close() {
      if (this.onClose) {
        this.onClose();
      }

      this.component = undefined;
      this.attrs = null;
      this.onClose = null;
      this.key = undefined;
      document.body.style.overflow = 'auto';
    },
  },
});
</script>

<style lang="scss" module>
.TheModal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: $gray;
  z-index: 10;
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
}
</style>
