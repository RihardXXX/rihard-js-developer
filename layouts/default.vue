<template>
  <div :class="$style.default">
    <TheHeader />
    <main :class="$style.main">
      <Nuxt />
    </main>
    <TheModal />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '~/components/layouts/TheHeader.vue';
import TheModal from '~/components/layouts/TheModal.vue';

export default defineComponent({
  name: 'Default',

  components: {
    TheHeader,
    TheModal,
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
