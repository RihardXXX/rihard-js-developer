<template>
  <div :class="$style.default">
    <TheHeader
      :device="device"
      @setHeaderRef="setHeaderRef"
      @showHeader="showHeader"
    />
    <main :class="$style.main">
      <NuxtChild :device="device" />
    </main>
    <TheModal />
    <robot-help
      :class="[
        $style.robot,
        {
          [$style.active]: isShowRobot,
        },
      ]"
      @click.native="upToHeader"
    />
    <TheFooter :device="device" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheHeader from '~/components/layouts/TheHeader.vue';
import TheModal from '~/components/layouts/TheModal.vue';
import RobotHelp from '~/components/Robot.vue';
import TheFooter from '~/components/layouts/TheFooter.vue';

export interface IDevice {
  mobile: boolean;
  tablet: boolean;
  laptop: boolean;
  large: boolean;
}

export default defineComponent({
  name: 'Default',

  components: {
    TheHeader,
    TheModal,
    RobotHelp,
    TheFooter,
  },

  data() {
    return {
      isShowRobot: false,
      refHeader: undefined as Element | undefined,
    };
  },

  computed: {
    device(): IDevice {
      const mq: string = this.$mq as string;
      return {
        mobile: mq === 'mobile',
        tablet: mq === 'tablet',
        laptop: mq === 'laptop',
        large: mq === 'large',
      };
    },
  },

  methods: {
    showHeader(status: boolean): void {
      this.isShowRobot = Boolean(!status);
    },

    setHeaderRef(refHeader: Element | undefined) {
      if (refHeader) {
        this.refHeader = refHeader;
      }
    },

    upToHeader() {
      if (!this.refHeader) {
        return;
      }

      this.refHeader.scrollIntoView({ behavior: 'smooth' });
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
