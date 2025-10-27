<script lang="ts">
import { defineComponent } from 'vue';
import TheThemeCheckbox from '~/components/TheThemeCheckbox.vue';
import TheProgressBar from '~/components/TheProgressBar.vue';
import { intersectionObserver } from '@/assets/utils';
import VONInterpreter from '~/components/VONInterpreter.vue';
import VInterpreter from '~/components/VInterpreter.vue';

export interface IDevice {
  mobile: boolean;
  tablet: boolean;
  laptop: boolean;
  large: boolean;
}

export default defineComponent({
  components: {
    LazyRobotHelp: () => import('~/components/Robot.vue'),
    TheThemeCheckbox,
    TheProgressBar,
    VONInterpreter,
    VInterpreter,
  },

  data() {
    return {
      isShowRobot: false,
      refTitle: undefined as Element | undefined,
      statusRunCodeModal: 'stop',
    };
  },

  head() {
      const title = 'Курс по функциональному программированию на JavaScript';
      const description =
        'Подробный курс по функциональному программированию на JavaScript. Изучи декларативный стиль, чистые функции, композицию и теорию категорий.';

      return {
        title,
        meta: [
          { hid: 'description', name: 'description', content: description },
          { hid: 'keywords', name: 'keywords', content: 'функциональное программирование, JavaScript, чистые функции, декларативный стиль, композиция, монады, курсы JS' },
          { hid: 'og:title', property: 'og:title', content: title },
          { hid: 'og:description', property: 'og:description', content: description },
        ],
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

  mounted(): void {
    const refTitle = this.$refs?.title as Element;

    if (!refTitle) {
      return;
    }

    intersectionObserver(refTitle, (isIntersecting) => {
      this.setShowRobot(isIntersecting);
    });

    this.setTitleRef(refTitle);
  },

  methods: {
    setShowRobot(status: boolean | undefined): void {
      this.isShowRobot = Boolean(!status);
    },

    setTitleRef(refHeader: Element | undefined) {
      if (refHeader) {
        this.refTitle = refHeader;
      }
    },

    upToTitle() {
      if (!this.refTitle) {
        return;
      }

      this.refTitle.scrollIntoView({ behavior: 'smooth', block: 'end' });
      // если есть якоры то сносим их
      if (this.$route.hash) {

        const newPath = this.$route.fullPath?.split('#')?.[0]
        this.$router.replace({ path: newPath })
      }
    },
    changeRunCodeModal(status: 'start' | 'stop') {
      this.statusRunCodeModal = status
    }
  },
});
</script>

<template>
  <div :class="$style.default">
    <TheProgressBar />

    <VONInterpreter
      :device="device"
      @change="changeRunCodeModal"
      />

    <transition name="fade">
      <ClientOnly>
        <VInterpreter v-if="statusRunCodeModal === 'start'" :device="device" />
      </ClientOnly>
    </transition>


    <TheThemeCheckbox />

    <h1 ref="title" :class="$style.titleMain">Курс по функциональному программированию на JS</h1>

    <main :class="$style.main">
      <NuxtChild :device="device" />
    </main>

    <lazy-robot-help
      :class="[
        $style.robot,
        {
          [$style.active]: isShowRobot,
          [$style.mini]: device.mobile,
        },
      ]"
      @click.native="upToTitle"
    />
  </div>
</template>

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
  transform: scale(0.7);

  &.active {
    opacity: 1;
    pointer-events: all;

    @include respond-to(mobile) {
      opacity: 0.9;
    }
  }

  &.mini {
    transform: scale(0.5);
    right: 0;
    bottom: 0;
  }

  @include respond-to(tablet) {
    right: 1rem;
  }

  @include respond-to(mobile) {
    right: 0;
  }
}

.titleMain {
  text-align: center;
  margin-top: 4rem;
  font-weight: 600;
  font-size: 2.2rem;
  line-height: 145%;

  transition: all 0.5s;
  color: var(--text-color);

  &:hover {
    color: $green;
    transform: scale(1.2);
  }
}

</style>
