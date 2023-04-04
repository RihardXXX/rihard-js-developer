<template>
  <section ref="skills" :class="['container', $style.skills]">
    <!-- Slider main container -->

    <div :class="[$style.leftSection, { [$style.active]: show }]">
      <VInfo
        label="Мои навыки"
        title="<span>Почему вы</span> выберете меня ?"
        description="Я middle frontend-developer. Моя страсть — разработка интерфейсов развивающих бизнес проекты  компании."
        button-name="Связаться со мной"
      />
    </div>
    <div :class="['swiper', $style.swiperWrap, { [$style.active]: show }]">
      <!-- Additional required wrapper -->
      <div v-if="Boolean(slides.length)" class="swiper-wrapper">
        <!-- Slides -->
        <div
          v-for="slide in slides"
          :key="slide.id"
          :class="['swiper-slide', $style.sliderItem]"
        >
          <VCardSkills
            v-for="card in slide.cards"
            :key="card.id"
            :svg-name="card.svgName"
            :title="card.title"
            :description="card.description"
          />
        </div>
      </div>

      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <!-- <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div> -->

      <!-- If we need scrollbar -->
      <!-- <div class="swiper-scrollbar"></div> -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VInfo from '@/components/VInfo.vue';
import VCardSkills from '@/components/skills/VCardSkills.vue';
import { intersectionObserver } from '@/assets/utils';

let idx = 0;

interface ICardSkill {
  id: string;
  svgName: string;
  title: string;
  description: string;
}

interface ISlideSkill {
  id: string;
  cards: Array<ICardSkill>;
}

export default defineComponent({
  name: 'SkillsPage',

  components: {
    VInfo,
    VCardSkills,
  },

  data() {
    return {
      swiper: {},

      show: false,

      slides: [
        {
          id: `slideItem${idx++}`,
          cards: [
            {
              id: `cardItem${idx++}`,
              svgName: 'js',
              title: 'Javascript',
              description: 'Разработка высоко-нагруженных приложений на JS',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'ts',
              title: 'TypeScript',
              description:
                'Обеспечу строгую типизацию и надежность приложений на TS',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'npm',
              title: 'NPM',
              description:
                'Использую в работе самый популярный пакетный менеджер',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'webpack',
              title: 'Webpack',
              description: 'Использую один из лучших сборщиков',
            },
          ],
        },
        {
          id: `slideItem${idx++}`,
          cards: [
            {
              id: `cardItem${idx++}`,
              svgName: 'html5',
              title: 'HTML5',
              description: 'В верстке применяю тэги из HTML5',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'css3',
              title: 'CSS3',
              description: 'Применяю стили с использованием CSS3',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'sass-original',
              title: 'SASS-SCSS',
              description: 'В работе использую только препроцессоры',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'js',
              title: 'Javascript',
              description: 'Разработка высоко-нагруженных приложений на JS',
            },
          ],
        },
        {
          id: `slideItem${idx++}`,
          cards: [
            {
              id: `cardItem${idx++}`,
              svgName: 'js',
              title: 'Javascript',
              description: 'Разработка высоко-нагруженных приложений на JS',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'js',
              title: 'Javascript',
              description: 'Разработка высоко-нагруженных приложений на JS',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'js',
              title: 'Javascript',
              description: 'Разработка высоко-нагруженных приложений на JS',
            },
            {
              id: `cardItem${idx++}`,
              svgName: 'js',
              title: 'Javascript',
              description: 'Разработка высоко-нагруженных приложений на JS',
            },
          ],
        },
      ] as Array<ISlideSkill>,
    };
  },

  mounted() {
    intersectionObserver(this.$refs?.skills as Element, () => {
      this.show = true;
    });

    this.initSlider();
  },

  beforeDestroy() {
    this.swiper = {};
  },

  methods: {
    initSlider() {
      this.swiper = new this.$Swiper('.swiper', {
        // Optional parameters
        // direction: 'gorizontal',
        loop: true,
        // autoplay: {
        //   delay: 5000,
        // },
        // speed: 2000,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
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
      });
    },
  },
});
</script>

<style lang="scss" module>
.skills {
  position: relative;
  margin-top: 18.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* overflow: hidden; */

  .leftSection {
    width: 50%;
    height: 100%;
    position: relative;
    left: -50%;
    opacity: 0;

    &.active {
      transition: all 2s;
      left: 0;
      opacity: 1;
    }
  }

  .swiperWrap {
    /* border: 1px solid black; */
    width: 50%;
    height: 100%;
    min-height: 35rem;
    transition: all 1s;
    position: relative;
    right: -50%;
    opacity: 0;

    &.active {
      transition: all 1s;
      right: 0;
      opacity: 1;
    }

    .sliderItem {
      width: 30rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4rem;
      flex-wrap: wrap;
      height: 100%;
    }

    :global(.swiper-pagination) {
      top: 90%;
      left: 50%;
    }

    :global(.swiper-pagination-bullet) {
      width: 5rem;
      height: 0.8rem;
      background: $gray-100;
      border-radius: 0.3rem;
      margin: 0 1rem;
      overflow: hidden;

      &:before {
        position: absolute;
        content: '';
        background: $green;
        width: 0rem;
        height: 100%;
        top: 0;
        left: 0;
      }
    }

    :global(.swiper-pagination-bullet-active) {
      transition: all 0.7s;
      transform: scale(1.4);
      opacity: 0.7;

      &:before {
        animation: progress 7s infinite linear;
      }
    }

    @keyframes progress {
      0% {
        width: 0%;
      }
      100% {
        width: 100%;
      }
    }
  }
}
</style>
