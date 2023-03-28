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

    <div :class="$style.right" :inline="true">right</div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VButton from '@/components/VButton.vue';

export default defineComponent({
  name: 'AboutMe',
  components: { VButton },
});
</script>

<style lang="scss" module>
.aboutMe {
  padding-top: 7.6rem;
  height: 54.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .left {
    width: 54.5rem;
    height: 36rem;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

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
  }

  .right {
    width: 46.1rem;
    height: 100%;
    border: 1px dotted gray;
  }
}
</style>
