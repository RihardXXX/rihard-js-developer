<template>
  <div :class="$style.default">
    <TheHeader />
    <main :class="$style.main">
      <Nuxt />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '~/components/layouts/TheHeader.vue';

export default defineComponent({
  name: 'Default',

  components: {
    TheHeader,
  },
});
</script>

<style lang="scss" module>
.default {
  height: 100%;
}

.main {
  min-height: calc(100vh - $header-height);
}
</style>
