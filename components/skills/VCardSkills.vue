<template>
  <article :class="$style.card">
    <div :class="$style.head">
      <VIcon :name="svgName" size="big7" />
      <h3 :class="$style.title">{{ title }}</h3>
    </div>
    <div :class="$style.body">
      {{ description }}
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VIcon from '@/components/ui/VIcon.vue';

export default defineComponent({
  name: 'VCardSkills',

  components: {
    VIcon,
  },

  props: {
    svgName: {
      type: String as PropType<String>,
      required: true,
    },

    title: {
      type: String as PropType<String>,
      required: true,
    },

    description: {
      type: String as PropType<String>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.card {
  width: 25.5rem;
  height: 16rem;
  /* border: 1px solid royalblue; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.1rem 1.8rem;
  overflow: hidden;

  .head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: 6.4rem;

    .title {
      font-weight: 600;
      font-size: 2rem;
      line-height: 2rem;
      color: var(--text-color);
      margin-left: 1.5rem;
    }
  }

  .body {
    margin-top: 1.2rem;
    font-size: 1.4rem;
    line-height: 150%;
    color: $gray-100;
  }

  @include respond-to(mobile) {
    width: 20.5rem;
    height: 16rem;
    padding: 1.8rem 1.4rem;
    justify-content: flex-start;
  }
}
</style>
