<template>
  <section
    v-if="resultList.length"
    ref="result"
    :class="['container', $style.results, {
      [$style.activeTablet]: device.tablet && show,
    }]"
  >
    <v-results-card-vue
      v-for="(result, i) in resultList"
      :key="result.id"
      :title="result.title"
      :description="result.description"
      :mod-class="[
        $style.card,
        {
          [$style[`active_${Number(i + 1)}`]]:
            device.large || device.laptop ? show : undefined,
        },
      ]"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VResultsCardVue from '@/components/skills/VResultsCard.vue';
import { intersectionObserver } from '@/assets/utils';
import { IDevice } from '~/layouts/default.vue';

let idx = 0;

export default defineComponent({
  name: 'ResultsPage',

  components: {
    VResultsCardVue,
  },

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },

  data() {
    return {
      show: false,

      resultList: [
        {
          id: `resultCard${idx++}`,
          title: '25+',
          description: 'довольных клиентов',
        },
        {
          id: `resultCard${idx++}`,
          title: '77+',
          description: 'выполненных проектов',
        },
        {
          id: `resultCard${idx++}`,
          title: '50+',
          description: 'отзывов о работе',
        },
      ],
    };
  },

  mounted() {
    intersectionObserver(this.$refs?.result as Element, (isIntersecting) => {
      if (isIntersecting) {
        this.show = true;
      }
    });
  },
});
</script>

<style lang="scss" module>
.results {
  position: relative;
  margin-top: 18.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include respond-to(tablet) {
    margin-top: 0;
    flex-direction: column;
    left: -100%;
    opacity: 0;
    transition: all 2s;

    &.activeTablet {
      left: 0;
      opacity: 1;
    }
  }

  .card {
    position: relative;
    top: 40rem;
    /* top: 150%; */
    /* left: 0; */
    opacity: 0;

    &.active_1 {
      top: 0;
      opacity: 1;
      transition: all 1s;
    }

    &.active_2 {
      top: 0;
      opacity: 1;
      transition: all 2s;
    }

    &.active_3 {
      top: 0;
      opacity: 1;
      transition: all 3s;
    }

    @include respond-to(tablet) {
      position: static;
      opacity: 1;
    }
  }
}
</style>
