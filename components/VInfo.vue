<template>
  <div :class="$style.info">
    <div v-show="label" :class="$style.label">{{ label }}</div>

    <h2 v-show="title" :class="$style.title" v-html="title" />
    <div v-show="description" :class="$style.description">
      {{ description }}
    </div>
    <VButton color="green" :class="$style.btnMe"> {{ buttonName }} </VButton>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VInfo',

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
  },
});
</script>

<style lang="scss" module>
.info {
  width: 54.5rem;
  height: 100%;
  /* height: 36rem; */
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  transition: all 1s;

  .label {
    /* width: 9.9rem; */
    height: 6rem;
    border: 0.05rem solid $green;
    border-radius: 100%;
    color: $green;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    font-size: 2rem;
    padding: 1rem;
  }

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
  }

  .btnMe {
    margin-top: 4rem;
  }

  &:hover {
    transform: perspective(600px) rotateY(20deg);
    box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem $gray;
  }
}
</style>