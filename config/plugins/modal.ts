import { Plugin } from '@nuxt/types';
import Vue from 'vue';

interface IModal {
  event: Vue;
  open: (
    component: Vue.Component,
    attrs?: object,
    onclose?: () => void
  ) => void;
  close: () => void;
}

declare module 'vue/types/vue' {
  interface Vue {
    $modal: IModal;
  }
}

const modalPlugin: Plugin = (_, inject) => {
  const modal: IModal = {
    event: new Vue(),

    // Modal methods
    open(component, attrs, onclose) {
      this.event.$emit('open', component, attrs, onclose);
    },

    // Common methods
    close() {
      this.event.$emit('close');
    },
  };

  inject('modal', modal);
};

export default modalPlugin;
