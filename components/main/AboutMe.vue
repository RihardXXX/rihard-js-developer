<template>
  <section :class="['container', $style.aboutMe]">
    <div :class="$style.left">
      <div :class="$style.welcome">добро пожаловать</div>
      <h2 :class="$style.developerMe">Я <span>фронтенд</span> разработчик</h2>
      <div :class="$style.descriptionMe">
        Меня зовут Рихард, я люблю писать код. Уже 3 года я помогаю бизнесу
        решать их проблемы с помощью моего кода.
      </div>
      <VButton color="green" :class="$style.btnMe"> Связаться со мной </VButton>
    </div>

    <div :class="$style.right" :inline="true">
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
import { defineComponent } from 'vue';
import VButton from '@/components/VButton.vue';
import Dot from '@/components/Dot.vue';
import { IDots } from '@/components/layouts/TheHeader.vue';

let idx = 0;

export default defineComponent({
  name: 'AboutMe',
  components: { VButton, Dot },

  data() {
    return {
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

  .left {
    width: 54.5rem;
    /* height: 36rem; */
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 1.5rem;
    border-radius: 0.5rem;
    transition: all 1s;

    .welcome {
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

    .developerMe {
      font-weight: 600;
      font-size: 5.8rem;
      line-height: 7rem;
      color: $green;
      margin-top: 1rem;

      span {
        color: $black-100;
      }
    }

    .descriptionMe {
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

  .right {
    position: relative;
    width: 46.1rem;
    height: 100%;
    /* border: 1px dotted gray; */
    border-radius: 0.5rem;
    transition: all 1s;

    .emptySquare {
      position: absolute;
      width: 40.1rem;
      height: 40.1rem;
      left: 0;
      bottom: 0;
      border: 0.5rem solid $black;
      border-radius: 0.2rem;
    }

    .greenSquare {
      position: absolute;
      width: 42rem;
      height: 42rem;
      right: 0;
      top: 8rem;
      background: $green;
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
    }

    &:hover {
      transform: perspective(600px) rotateY(-20deg);
      box-shadow: 0.1rem 0.1rem 0.5rem 0.1rem $gray;

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
