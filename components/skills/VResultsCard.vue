<template>
  <article :class="[$style.resultsCard, modClass]">
    <h3 :class="$style.title">
      {{ title }}
    </h3>
    <p :class="$style.description">
      {{ description }}
    </p>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VResultsCard',

  props: {
    title: {
      type: String as PropType<String>,
      required: true,
    },

    description: {
      type: String as PropType<String>,
      required: true,
    },

    modClass: {
      type: [String, Array] as PropType<Array<String | [] | object>>,
      required: false,
      default: '',
    },
  },
});
</script>

<style lang="scss" module>
.resultsCard {
  width: 33%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border-right: 1px solid $green;
  padding: 0 10.6rem;

  .title {
    font-weight: 600;
    font-size: 4.8rem;
    line-height: 4.8rem;
    color: $green;
  }

  .description {
    font-size: 2.8rem;
    line-height: 2.8rem;
    color: var(--text-color);
  }

  &:last-child {
    border-right: none;
  }

  &:first-child {
    padding-left: 0;
  }

  @include respond-to(tablet) {
    width: 75%;
    border-bottom: 1px solid $green;
    border-right: none;
    flex-direction: row;
    padding: 2rem 0;
    align-items: center;

    .description {
      text-align: end;
    }
  }
}
</style>
