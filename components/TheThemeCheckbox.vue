<script setup lang="ts">
import { ref, onMounted } from 'vue'

import SvgDay from '~/components/ui/SvgDay.vue'
import SvgNight from '~/components/ui/SvgNight.vue'

const themeKey = 'theme'
type themeName = 'dark-theme' | 'light-theme'

const checked = ref<themeName>('light-theme')

const changeTheme = ():void => {

  checked.value = checked.value === 'light-theme'
    ? 'dark-theme'
    : 'light-theme'

  document.body.className = checked.value
  localStorage.setItem(themeKey, checked.value)
}


const setThemeFromStorage = ():void => {
  const currentTheme = localStorage.getItem(themeKey) as themeName | null

  if (!currentTheme) {
    return
  }

  if (['dark-theme', 'light-theme'].includes(currentTheme)) {
    document.body.className = currentTheme
    checked.value = currentTheme
  }

}

onMounted(() => {
  setThemeFromStorage()
})

</script>

<template>
  <div class="wrap">
    <div :class="['check', {
        'checked': checked === 'dark-theme'
      }]"
          @click="changeTheme"
    >
      <SvgDay v-if="checked === 'dark-theme'"
              class="day"
      />
      <SvgNight v-else
                class="night"
      />
    </div>
  </div>
</template>

<style scoped>

.wrap {
  position: fixed;
  top: 0;
  right: 0;
  padding: 10px;
  z-index: 111;
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
  width: 90px;
  height: 32px;
  background-color: #272121;
  cursor: pointer;
  border-radius: 5px;
  transition: all .5s;
  border: 1px solid black;

  &.checked {
    background-color: #fff;
    color: #fff;
  }
}

.check::after {
  content: var(--theme-text);
  position: absolute;
  width: 45px;
  height: 26px;
  top: 2px;
  left: 2px;
  background-color: #fff;
  border-radius: 5px;
  transition: all .5s;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

.checked::after {
  background-color: black;
  transform: translateX(40px);
}

.day {
  fill: black;
  height: 100%;
  padding: 2px;
  transform: translateX(2px);
}

.night {
  height: 100%;
  padding: 2px;
  transform: translateX(60px);
}

</style>
