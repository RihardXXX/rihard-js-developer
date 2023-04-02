<template>
  <section :class="['container', $style.skills]">
    <!-- Slider main container -->

    <div :class="$style.leftSection">
      <VInfo
        label="Мои навыки"
        title="<span>Почему вы</span> выберете меня ?"
        description="Я middle frontend-developer. Моя страсть — разработка интерфейсов развивающих бизнес проекты  компании."
        button-name="Связаться со мной"
      />
    </div>
    <div :class="['swiper', $style.swiperWrap]">
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
    this.swiper = new this.$Swiper('.swiper', {
      // Optional parameters
      // direction: 'gorizontal',
      loop: true,
      // autoplay: true,
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
});
</script>

<style lang="scss" module>
.skills {
  //
  margin-top: 18.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* min-height: 35rem; */

  .leftSection {
    width: 50%;
    height: 100%;
  }

  .swiperWrap {
    /* border: 1px solid black; */
    width: 50%;
    height: 100%;
    min-height: 35rem;
    transition: all 1s;

    .sliderItem {
      width: 30rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4rem;
      flex-wrap: wrap;
      height: 100%;
    }

    /* &:hover {
      transform: perspective(600px) rotateY(-20deg);
      box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem $gray;
    } */
  }
}
</style>
