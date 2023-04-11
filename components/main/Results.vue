<template>
  <section
    v-if="resultList.length"
    ref="result"
    :class="['container', $style.results]"
  >
    <v-results-card-vue
      v-for="(result, i) in resultList"
      :key="result.id"
      :title="result.title"
      :description="result.description"
      :mod-class="[
        $style.card,
        {
          [$style[`active_${Number(i + 1)}`]]: show,
        },
      ]"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VResultsCardVue from '@/components/skills/VResultsCard.vue';
import { intersectionObserver } from '@/assets/utils';

let idx = 0;

export default defineComponent({
  name: 'ResultsPage',

  components: {
    VResultsCardVue,
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
  margin-top: 18.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

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
  }
}
</style>
