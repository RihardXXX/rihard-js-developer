<template>
  <section ref="reviews" :class="['container', $style.reviewsWrap]">
    <div :class="$style.head">
      <VLabel label="Отзывы" />
      <VTitle
        title="<span>Что говорят компании партнеры о моей</span> работе"
      />
    </div>
    <div :class="$style.body">
      <div :class="['reviews', $style.slidesSection]">
        <div v-if="Boolean(getSlides.length)" class="swiper-wrapper">
          <ReviewCard
            v-for="card in getSlides"
            :key="card.id"
            :name="card.name"
            :position="card.position"
            :profile-image="card.profileImage"
            :rating="card.rating"
            :review-text="card.reviewText"
            :class="['swiper-slide', $style.sliderItem]"
          />
        </div>
        <div class="swiper-pagination"></div>

        <!-- If we need navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>

        <!-- If we need scrollbar -->
        <!-- <div class="swiper-scrollbar"></div> -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VLabel from '@/components/VLabel.vue';
import VTitle from '@/components/VTitle.vue';
import ReviewCard from '@/components/ReviewCard.vue';
import { IDevice } from '~/layouts/default.vue';
import { EventPayloadRefInterface } from '~/components/layouts/TheHeader.vue';

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
  },

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },

  data() {
    return {
      reviewCardsDesktop: [
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'Работа была выполнена в указанные сроки',
          position: 'Руководитель отдела развития GetMO',
          name: 'Александра Иванова',
          profileImage: 'images/reviews/Aleksandra_Ivanova.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText:
            'Проект был написан со строгим соблюдением технического задания. Рекомендую',
          position: 'Зам. директор DoubleBe',
          name: 'Игорь Таранов',
          profileImage: 'images/reviews/Igor_taranov.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'Архитектура написания кода понравилась',
          position: 'Senior Fronted-developer Avito Tech',
          name: 'Иван Петров',
          profileImage: 'images/reviews/Ivan_Petrov.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText:
            'Решила расширить функционал своего текущего веб приложения. Работой довольна, спасибо',
          position: 'ИП Завьялова',
          name: 'Любовь Завьялова',
          profileImage: 'images/reviews/Luba_Zavialova.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'Успешная работа в команде, быстро вошел в проект',
          position: 'Team Lead Tinkoff Business',
          name: 'Валерий Кондрашов',
          profileImage: 'images/reviews/Murad_Gasanov.webp',
        },
      ] as Array<ICardReview>,
      reviewCardsMobile: [
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'Работа была выполнена в указанные сроки',
          position: 'Руководитель отдела развития GetMO',
          name: 'Александра Иванова',
          profileImage: 'images/reviews/mobile/Aleksandra_Ivanova-425.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText:
            'Проект был написан со строгим соблюдением технического задания. Рекомендую',
          position: 'Зам. директор DoubleBe',
          name: 'Игорь Таранов',
          profileImage: 'images/reviews/mobile/Igor_taranov-425.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'Архитектура написания кода понравилась',
          position: 'Senior Fronted-developer Avito Tech',
          name: 'Иван Петров',
          profileImage: 'images/reviews/mobile/Ivan_Petrov-425.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText:
            'Решила расширить функционал своего текущего веб приложения. Работой довольна, спасибо',
          position: 'ИП Завьялова',
          name: 'Любовь Завьялова',
          profileImage: 'images/reviews/mobile/Luba_Zavialova-425.webp',
        },
        {
          id: `cardId${idx++}`,
          rating: 5,
          reviewText: 'Успешная работа в команде, быстро вошел в проект',
          position: 'Team Lead Tinkoff Business',
          name: 'Валерий Кондрашов',
          profileImage: 'images/reviews/mobile/Murad_Gasanov-425.webp',
        },
      ] as Array<ICardReview>,
      swiper: {},
    };
  },

  computed: {
    getSlides(): Array<ICardReview> {
      return this.device.tablet || this.device.mobile
        ? this.reviewCardsMobile
        : this.reviewCardsDesktop;
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.initSlider();
    });

    if (!this.$refs.reviews) {
      return;
    }
    // set ref current component in Header
    this.$nuxt.$emit('addRef', {
      element: this.$refs.reviews,
      eventName: 'reviews',
    } as EventPayloadRefInterface);
  },

  beforeDestroy() {
    this.swiper = {};
  },

  methods: {
    initSlider(): void {
      let slidesPerView: number = 3;

      if (this.device.tablet) {
        slidesPerView = 2;
      }

      if (this.device.mobile) {
        slidesPerView = 1;
      }

      this.swiper = new this.$Swiper('.reviews', {
        loop: false,
        // autoplay: {
        //   delay: 3000,
        // },
        // speed: 2000,

        slidesPerView,
        // slidesOffsetAfter: 0,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        // And if we need scrollbar
        scrollbar: {
          el: '.swiper-scrollbar',
        },
        spaceBetween: 15,
      });
    },
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
    max-width: 70%;
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
    overflow: hidden;

    .slidesSection {
      /* margin-top: 1rem; */
      /* height: 54.7rem; */
      /* height: 30.7rem; */
      position: relative;
      width: 100%;

      .sliderItem {
        width: 32.5rem;
        height: 100%;
        /* cursor: pointer; */
        /* border: 1px solid black; */

        /* .imageCertificate {
                  width: 100%;
                  height: 100%;
                  object-fit: contain;
                } */
      }
    }

    :global(.swiper-pagination) {
      position: absolute;
      top: 0;
      width: 50%;
      left: 25%;
      /* transform: translate(50%, -50%); */
    }

    :global(.swiper-pagination-bullet) {
      width: 5rem;
      height: 0.8rem;
      background: $gray-100;
      border-radius: 0.3rem;
      margin: 0 1rem;
      overflow: hidden;
      cursor: pointer;
    }

    :global(.swiper-pagination-bullet-active) {
      transition: all 0.7s;
      transform: scale(1.2);
      opacity: 0.7;
    }

    :global(.swiper-button-next) {
      color: $black-200;
      font-weight: 900;
    }

    :global(.swiper-button-prev) {
      color: $black-200;
      font-weight: 900;
    }
  }

  @include respond-to(tablet) {
    margin-top: 3rem;

    .head {
      margin: 0 auto;
      max-width: 90%;
      text-align: center;
    }

    .body {
      margin-top: 1rem;
    }
  }
}
</style>
