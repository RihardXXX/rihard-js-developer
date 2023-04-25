<template>
  <section ref="aboutMe" :class="['container', $style.aboutMe]">
    <div
      ref="left"
      :class="[
        $style.left,
        {
          [$style.active]: device.laptop || device.large ? showLeft : undefined,
        },
      ]"
    >
      <VInfo
        label="добро пожаловать"
        title="Я <span>фронтенд</span> разработчик"
        description="Меня зовут Рихард, я люблю писать код. Уже 3 года я помогаю бизнесу
        решать их проблемы с помощью моего кода."
        button-name="Связаться со мной"
        :class="$style.info"
      />
    </div>

    <div
      :class="[
        $style.right,
        {
          [$style.active]: device.laptop || device.large ? showLeft : undefined,
        },
      ]"
      :inline="true"
    >
      <div :class="$style.emptySquare"></div>
      <div :class="$style.greenSquare"></div>
      <div :class="$style.imgContainer">
        <img src="images/rihard.png" alt="" />
      </div>
    </div>

    <Dot
      v-for="dot in dots"
      :key="dot.id"
      :size="dot.size"
      :color="dot.color"
      :position="dot.position"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import Dot from '@/components/Dot.vue';
import { IDots } from '@/components/layouts/TheHeader.vue';
import VInfo from '@/components/VInfo.vue';
import { intersectionObserver } from '@/assets/utils';
import { IDevice } from '~/layouts/default.vue';

let idx = 0;

export default defineComponent({
  name: 'AboutMe',

  components: { Dot, VInfo },

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },

  data() {
    return {
      showLeft: false,

      dots: [
        {
          id: `about${idx++}`,
          size: 'small',
          color: 'blue',
          position: { top: '1.6', left: '30.2' },
        },
        {
          id: `about${idx++}`,
          size: 'medium',
          color: 'green',
          position: { top: '8.6', left: '3' },
        },
        {
          id: `about${idx++}`,
          size: 'big',
          color: 'red',
          position: { top: '20.2', left: '59.6' },
        },
        {
          id: `about${idx++}`,
          size: 'small',
          color: 'red',
          position: { top: '4.9', left: '44.7' },
        },
      ] as Array<IDots>,
    };
  },

  mounted() {
    intersectionObserver(this.$refs?.left as Element, (isIntersecting) => {
      if (isIntersecting) {
        this.showLeft = true;
      }
    });

    if (!this.$refs.aboutMe) {
      return;
    }
    // set ref current component in Header
    this.$nuxt.$emit('setRefAboutMe', this.$refs?.aboutMe);
  },
});
</script>

<style lang="scss" module>
.aboutMe {
  position: relative;
  padding-top: 7.6rem;
  height: 61.7rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @include respond-to(tablet) {
    width: 100%;
    flex-direction: column;
    height: 103.7rem;
  }

  @include respond-to(mobile) {
    padding-top: 1.6rem;
    height: 95.7rem;
  }

  .left {
    position: relative;
    width: 54.5rem;
    left: -30%;
    opacity: 0;
    transition: all 2s;

    &.active {
      left: 0;
      opacity: 1;
    }

    @include respond-to(tablet) {
      left: 0;
      opacity: 1;
    }

    @include respond-to(mobile) {
      width: 100%;

      .info {
        margin: 0 1rem;
      }
    }
  }

  .right {
    position: relative;
    width: 46.1rem;
    height: 100%;
    /* border: 1px dotted gray; */
    border-radius: 0.5rem;
    right: -30%;
    opacity: 0;
    transition: all 2s;

    @include respond-to(tablet) {
      width: 52rem;
      pointer-events: none;
    }

    &.active {
      right: 0;
      opacity: 1;
    }

    @include respond-to(tablet) {
      right: 0;
      opacity: 1;
    }

    @include respond-to(mobile) {
      width: 100%;
    }

    .emptySquare {
      position: absolute;
      width: 40.1rem;
      height: 40.1rem;
      left: 0;
      bottom: 0;
      border: 0.5rem solid $black;
      border-radius: 0.2rem;

      @include respond-to(tablet) {
        bottom: 10.5rem;
      }

      @include respond-to(mobile) {
        bottom: 22.5rem;
        height: 31.1rem;
      }
    }

    .greenSquare {
      position: absolute;
      width: 42rem;
      height: 42rem;
      right: 0;
      top: 8rem;
      background: $green;

      @include respond-to(mobile) {
        width: 100%;
      }
    }

    .imgContainer {
      position: absolute;
      width: 42rem;
      height: 50rem;
      top: 0;
      right: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      @include respond-to(mobile) {
        width: 100%;
      }
    }

    &:hover {
      transform: perspective(600px) rotateY(-20deg);
      box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem $gray;
      transition: all 1s;

      /* .emptySquare {
        transition: all 1s;
        width: 100%;
        height: 100%;
        z-index: 1;
      } */

      /* .greenSquare {
        transition: all 1s;
        width: 100%;
        height: 100%;
        top: 0;
      }

      .imgContainer {
        width: 100%;
        height: 100%;
      } */
    }
  }
}
</style>
