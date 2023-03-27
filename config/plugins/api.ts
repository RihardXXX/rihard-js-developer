import { Plugin } from '@nuxt/types';
import { apiPaths, IAPIPaths } from '../apiPaths';

declare module 'vue/types/vue' {
  // this.$apiPaths inside Vue components
  interface Vue {
    $apiPaths: IAPIPaths;
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$apiPaths inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $apiPaths: IAPIPaths;
  }
}

const apiPlugin: Plugin = (_, inject) => {
  inject('apiPaths', apiPaths);
};

export default apiPlugin;
