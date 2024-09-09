<template>
  <div :class="$style.default">

    <TheProgressBar />

    <TheThemeCheckbox />

    <TheHeader
      :device="device"
      @setHeaderRef="setHeaderRef"
      @showHeader="showHeader"
    />

    <main :class="$style.main">
      <NuxtChild :device="device" />
    </main>

    <LazyTheModal />

    <lazy-robot-help
      :class="[
        $style.robot,
        {
          [$style.active]: isShowRobot,
        },
      ]"
      @click.native="upToHeader"
    />

    <LazyTheFooter :device="device" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheHeader from '~/components/layouts/TheHeader.vue'
import TheThemeCheckbox from '~/components/TheThemeCheckbox.vue'
import TheProgressBar from '~/components/TheProgressBar.vue'
import VIcon from "~/components/ui/VIcon.vue";


export interface IDevice {
  mobile: boolean;
  tablet: boolean;
  laptop: boolean;
  large: boolean;
}

export default defineComponent({
  name: 'Default',

  components: {
    VIcon,
    TheHeader,
    LazyTheModal: () => import('~/components/layouts/TheModal.vue'),
    LazyRobotHelp: () => import('~/components/Robot.vue'),
    LazyTheFooter: () => import('~/components/layouts/TheFooter.vue'),
    TheThemeCheckbox,
    TheProgressBar,
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

    @include respond-to(mobile) {
      opacity: 0.9;
    }
  }

  @include respond-to(tablet) {
    right: 1rem;
  }

  @include respond-to(mobile) {
    right: 0;
  }
}
</style>
