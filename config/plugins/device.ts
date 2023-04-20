// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: {
    // default breakpoints - customize this
    mobile: 451,
    tablet: 769,
    laptop: 1025,
    large: Infinity,
  },
  defaultBreakpoint: 'large', // customize this for SSR
});

declare module 'vue/types/vue' {
  interface Vue {
    $mq: String;
  }
}
