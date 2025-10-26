<script setup lang="ts">
import { ref } from 'vue';

import SvgStop from '~/components/ui/SvgStop.vue';
import SvgStart from '~/components/ui/SvgStart.vue';

const STOP = 'stop'
const START = 'start'

type statusType = 'stop' | 'start';

const emit = defineEmits<{
  (e: 'change', payload: statusType): void
}>()

const status = ref<statusType>(STOP);

const changeStatus = (): void => {
  status.value = status.value === STOP
                                  ? START
                                  : STOP;

  emit('change', status.value)
};

</script>

<template>
  <div class="wrap">
    <div
      :class="[
        'check',
        {
          checked: status === START,
        },
      ]"
      @click="changeStatus"
    >
      <SvgStop v-if="status === STOP" class="stopInterpreter" />
      <SvgStart v-if="status === START" class="startInterpreter" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  position: fixed;
  top: 10px;
  left: 0;
  padding: 10px;
  z-index: 111;

  &::after {
    content: 'code run';
    display: block;
    position: absolute;
    top: -8px;
    left: 20px;
    color: var(--text-color);
  }
}

.svg {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.check {
  z-index: 11;
  position: relative;
  display: block;
  width: 95px;
  height: 32px;
  background-color: #2049b4;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.5s;
  border: 1px solid black;
  color: var(--text-color);

  &.checked {
    background-color: #088d48;
  }

  @include respond-to(mobile) {
    scale: 0.9;
  }
}

.check::after {
  content: 'stop';
  position: absolute;
  padding: 4px;
  height: 26px;
  top: 2px;
  left: 2px;
  background-color: var(--background-color);
  border-radius: 5px;
  transition: all 0.5s;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

.checked::after {
  content: 'start';
  background-color: var(--background-color);
  transform: translateX(40px);
}

.stopInterpreter {
  fill: var(--text-color);
  padding: 2px;
  transform: translateX(60px);
}

.startInterpreter {
  fill: var(--text-color);
  padding: 2px;
}
</style>
