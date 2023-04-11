<template>
  <div :class="$style.default">
    <TheHeader @showHeader="showHeader" />
    <main :class="$style.main">
      <Nuxt />
    </main>
    <TheModal />
    <robot-help
      :class="[
        $style.robot,
        {
          [$style.active]: isShowRobot,
        },
      ]"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '~/components/layouts/TheHeader.vue';
import TheModal from '~/components/layouts/TheModal.vue';
import RobotHelp from '~/components/Robot.vue';

export default defineComponent({
  name: 'Default',

  components: {
    TheHeader,
    TheModal,
    RobotHelp,
  },

  data() {
    return {
      isShowRobot: false,
    };
  },

  methods: {
    showHeader(status: boolean): void {
      this.isShowRobot = Boolean(!status);
    },
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

.robot {
  opacity: 0;
  pointer-events: none;
  transition: all 1s;

  &.active {
    opacity: 1;
    pointer-events: all;
  }
}
</style>
