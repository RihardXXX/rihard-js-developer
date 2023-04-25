<template>
  <div :class="$style.info">
    <VLabel :label="label" />

    <VTitle :title="title" />

    <div v-show="description" :class="$style.description">
      {{ description }}
    </div>
    <a
      v-if="isMail"
      ref="email"
      href="mailto:yusupa.akaeva@yandex.ru"
      :class="$style.link"
    >
      yusupa.akaeva@yandex.ru
    </a>
    <VButton color="green" :class="$style.btnMe" @click="connect">
      {{ buttonName }}
    </VButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VLabel from '@/components/VLabel.vue';
import VTitle from '@/components/VTitle.vue';

export default defineComponent({
  name: 'VInfo',

  components: {
    VLabel,
    VTitle,
  },

  props: {
    label: {
      type: String as PropType<String>,
      required: false,
      default: '',
    },
    title: {
      type: String as PropType<String>,
      required: false,
      default: '',
    },
    description: {
      type: String as PropType<String>,
      required: false,
      default: '',
    },
    buttonName: {
      type: String as PropType<String>,
      required: false,
      default: '',
    },
    isMail: {
      type: Boolean as PropType<Boolean>,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      element: undefined as Element | undefined,
    };
  },

  created() {
    this.$nuxt.$on('setRefContact', (element: Element) => {
      this.element = element;
    });
  },

  methods: {
    connect() {
      if (this.isMail && this.$refs.email) {
        const link = this.$refs.email as HTMLElement;
        link.click();
      } else {
        this.element?.scrollIntoView({ behavior: 'smooth' });
      }
    },
  },
});
</script>

<style lang="scss" module>
.info {
  max-width: 54.5rem;
  height: 100%;
  /* height: 36rem; */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 1s;

  .title {
    font-weight: 600;
    font-size: 5.8rem;
    line-height: 7rem;
    color: $green;
    margin-top: 1rem;

    span {
      color: $black-100;
    }
  }

  .description {
    font-size: 1.6rem;
    line-height: 150%;
    margin-top: 2.4rem;
    color: $gray;

    @include respond-to(mobile) {
      margin-top: 1.4rem;
    }
  }

  .btnMe {
    margin-top: 4rem;

    @include respond-to(mobile) {
      margin-top: 2rem;
    }
  }

  @include respond-to(large-desktop) {
    &:hover {
      transform: perspective(600px) rotateY(20deg);
      box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem $gray;
    }
  }

  @include respond-to(desktop) {
    &:hover {
      transform: perspective(600px) rotateY(20deg);
      box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem $gray;
    }
  }

  @include respond-to(laptop) {
    &:hover {
      transform: perspective(600px) rotateY(20deg);
    }
  }

  @include respond-to(tablet) {
    box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem $gray;
    &:hover {
      transform: none;
    }
  }

  .link {
    color: $green;
    font-weight: 700;
    margin-top: 1rem;
  }
}
</style>
