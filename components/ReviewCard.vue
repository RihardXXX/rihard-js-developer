<template>
  <article :class="$style.card">
    <div :class="$style.profile">
      <div v-show="profileImage" :class="$style.imageWrap">
        <VImageLazy
          :src="profileImage"
          object-fit="cover"
          :alt="`profile: ${profileImage?.split('/')[2].split('.')[0]}`"
        />
      </div>
      <div :class="$style.info">
        <h6 v-show="name" :class="$style.name">
          {{ name }}
        </h6>
        <p v-show="position" :class="$style.position">
          {{ position }}
        </p>
      </div>
    </div>

    <div v-show="rating" :class="$style.rating">
      <VImageLazy
        v-for="star in rating"
        :key="`star${star}`"
        src="icon/star.svg"
        :alt="`star-rating`"
        :class="$style.star"
      />
    </div>
    <p v-show="reviewText" :class="$style.description">
      {{ reviewText }}
    </p>
  </article>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VImageLazy from '@/components/VImageLazy.vue';

export default defineComponent({
  name: 'ReviewCard',

  components: { VImageLazy },

  props: {
    rating: {
      type: Number as PropType<Number>,
      required: true,
    },

    reviewText: {
      type: String as PropType<String>,
      required: true,
    },

    profileImage: {
      type: String as PropType<String>,
      required: true,
    },

    name: {
      type: String as PropType<String>,
      required: true,
    },

    position: {
      type: String as PropType<String>,
      required: true,
    },
  },
});
</script>

<style lang="scss" module>
.card {
  width: 48rem;
  min-height: 22.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  background: $white;
  box-shadow: 0px 3rem 11.6rem -1.6rem rgba(211, 211, 211, 0.2);
  border-radius: 0.8rem;
  padding: 3.2rem;
  gap: 1rem;

  @include respond-to(mobile) {
    width: 100vw;
  }

  .rating {
    /* width: 100%; */
    position: absolute;
    bottom: 1rem;
    left: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    .star {
      width: 3rem;
    }
  }

  .description {
    /* margin-top: 2rem; */
    font-size: 1.6rem;
    line-height: 120%;
    color: $black-200;
  }

  .profile {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 8rem;
    width: 100%;
    /* margin-top: 2.4rem; */

    .imageWrap {
      width: 4rem;
      height: 4rem;
      border-radius: 50%;
      overflow: hidden;
    }

    .info {
      margin-left: 1.6rem;

      .name {
        font-weight: 600;
        font-size: 1.6rem;
        line-height: 120%;
        letter-spacing: 0.005em;
        color: $black-100;
      }

      .position {
        margin-top: 0.4rem;
        font-weight: 500;
        font-size: 1.4rem;
        line-height: 130%;
        letter-spacing: 0.008em;
        color: $black-200;
      }
    }
  }
}
</style>
