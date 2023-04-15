<template>
  <section ref="reviews" :class="['container', $style.reviewsWrap]">
    <div :class="$style.head">
      <VLabel label="Отзывы" />
      <VTitle title="<span>Что говорят клиенты о моей</span> работе" />
    </div>
    <div :class="$style.body">
      <div :class="$style.nav">
        <VImageLazy src="/icon/arrow_right.svg" :class="$style.arrow" />
        <VImageLazy src="/icon/arrow_right.svg" :class="$style.arrow" />
      </div>
      <template v-if="reviewCards.length">
        <ReviewCard
          v-for="card in reviewCards"
          :key="card.id"
          :name="card.name"
          :position="card.position"
          :profile-image="card.profileImage"
          :rating="card.rating"
          :review-text="card.reviewText"
        />
      </template>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VLabel from '@/components/VLabel.vue';
import VTitle from '@/components/VTitle.vue';
import ReviewCard from '@/components/ReviewCard.vue';
import VImageLazy from '@/components/VImageLazy.vue';

let idx = 0;

interface ICardReview {
  id: string | number;
  rating: 1 | 2 | 3 | 4 | 5;
  reviewText: string;
  position: string;
  name: string;
  profileImage: string;
}

export default defineComponent({
  name: 'ReviewsPage',

  components: {
    VLabel,
    VTitle,
    ReviewCard,
    VImageLazy,
  },

  data() {
    return {
      reviewCards: [
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'test',
          position: 'director',
          name: 'Ivan',
          profileImage: 'images/rihard.png',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'test',
          position: 'director',
          name: 'Ivan',
          profileImage: 'images/rihard.png',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'test',
          position: 'director',
          name: 'Ivan',
          profileImage: 'images/rihard.png',
        },
      ] as Array<ICardReview>,
    };
  },
});
</script>

<style lang="scss" module>
.reviewsWrap {
  margin-top: 18.8rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .head {
    min-height: 14.9rem;
    max-width: 60%;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-between;
  }

  .body {
    margin-top: 4rem;
    height: 22.2rem;
    width: 100%;
    display: flex;
    position: relative;

    .nav {
      position: absolute;
      top: 0;
      right: 0;
      .arrow {
        width: 3.1rem;
        height: 2.4rem;
        cursor: pointer;

        &:first-child {
          transform: rotate(180deg);
        }
      }
    }
  }
}
</style>
