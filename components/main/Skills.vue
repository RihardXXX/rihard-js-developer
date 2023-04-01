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
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div :class="['swiper-slide', $style.sliderItem]">
          <article :class="$style.card">
            <div :class="$style.head">
              <SvgIcon name="js" size="big10" />
            </div>
            <div :class="$style.body">description</div>
          </article>
          <!-- <article :class="$style.card">card1</article>
          <article :class="$style.card">card1</article>
          <article :class="$style.card">card1</article> -->
        </div>
      </div>
      <!-- If we need pagination -->
      <div class="swiper-pagination"></div>

      <!-- If we need navigation buttons -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>

      <!-- If we need scrollbar -->
      <div class="swiper-scrollbar"></div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SvgIcon from '@/components/ui/VIcon.vue';
import VInfo from '@/components/VInfo.vue';

export default defineComponent({
  name: 'SkillsPage',

  components: {
    VInfo,
    SvgIcon,
  },

  data() {
    return {
      swiper: {},
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
    border: 1px solid black;
    width: 50%;
    height: 100%;
    min-height: 35rem;

    .sliderItem {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 4rem;
      flex-wrap: wrap;

      .card {
        width: 25.5rem;
        height: 16rem;
        border: 1px solid royalblue;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .head {
          display: flex;
          align-items: center;
          justify-content: space-between;

          /* .test {
            width: 2rem;
          } */
        }
      }
    }
  }
}
</style>
