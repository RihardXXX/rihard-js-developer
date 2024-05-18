<template>
  <section ref="contact" :class="['container', $style.contactWrap]">
    <VInfo
      label="контакты"
      title="Вы можете <span>связаться</span> со мной"
      description="Давайте сделаем что-то новое, отличное и более значимое или сделаем что-то более наглядным или концептуальным."
      button-name="написать на электронную почту"
      is-mail
      :class="$style.info"
    />
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import VInfo from '@/components/VInfo.vue';
import { IDevice } from '~/layouts/default.vue';
import { EventPayloadRefInterface } from '~/components/layouts/TheHeader.vue';

export default defineComponent({
  name: 'ContactPage',

  components: {
    VInfo,
  },

  props: {
    device: {
      type: Object as PropType<IDevice>,
      required: true,
    },
  },

  data() {
    return {
      refContact: undefined,
    };
  },

  mounted() {
    if (!this.$refs.contact) {
      return;
    }
    // set ref current component in Header
    this.$nuxt.$emit('addRef', {
      element: this.$refs.contact,
      eventName: 'contact',
    } as EventPayloadRefInterface);
  },
});
</script>

<style lang="scss" module>
.contactWrap {
  //
  margin-top: 18.8rem;
  margin-bottom: 12rem;

  .info {
    margin: 0 auto;
    align-items: center;
    text-align: center;
  }

  @include respond-to(tablet) {
    margin-top: 3rem;
    margin-bottom: 2rem;
  }

  @include respond-to(mobile) {
    .info {
      margin: 0 1rem;
    }
  }
}
</style>
