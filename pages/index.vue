<template>
  <div :class="$style.mainPage">
    <h3>main page</h3>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'IndexPage',
  // asyncData({ app }) {
  //   console.log(112);
  //   console.log(app.$apiPaths);
  // },
});
</script>

<style lang="scss" module>
.mainPage {
  height: 100%;
}
</style>
