<script setup lang="ts">
import { ref, onMounted } from 'vue';

import SvgAtWork from '~/components/ui/SvgAtWork.vue';
import SvgPassed from '~/components/ui/SvgPassed.vue';

const AT_WORK = 'at-work'
const PASSED = 'passed'

type statusType = 'at-work' | 'passed';

const status = ref<statusType>(AT_WORK);

const changeStatus = (): void => {
  status.value =
    status.value === AT_WORK ? PASSED : AT_WORK;

  // document.body.className = checked.value;
  // localStorage.setItem(themeKey, checked.value);
};

// const setThemeFromStorage = (): void => {
//   const currentTheme = localStorage.getItem(themeKey) as themeName | null;

//   if (!currentTheme) {
//     return;
//   }

//   if (['dark-theme', 'light-theme'].includes(currentTheme)) {
//     document.body.className = currentTheme;
//     checked.value = currentTheme;
//   }
// };

onMounted(() => {
  // setThemeFromStorage();
});
</script>

<template>
  <div class="wrap">
    <div
      :class="[
        'check',
        {
          checked: status === PASSED,
        },
      ]"
      @click="changeStatus"
    >
      <SvgAtWork v-if="status === AT_WORK" class="atWork" />
      <SvgPassed v-if="status === PASSED" class="passed" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrap {
  position: relative;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 110;
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
  width: 140px;
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
  content: 'в работе';
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
  content: 'пройдено';
  background-color: var(--background-color);
  transform: translateX(40px);
}

.atWork {
  fill: var(--text-color);
  padding: 2px;
  transform: translateX(100px);
}

.passed {
  fill: var(--text-color);
  padding: 2px;
}
</style>
