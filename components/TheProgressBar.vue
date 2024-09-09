<script setup lang="ts">
import { onMounted, ref } from 'vue'

const progressElem = ref<HTMLElement | null>(null)

function throttle(func: Function, limit: number) {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return function(this: any, ...args: any[]) {
    const context = this;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function() {
        if ((Date.now() - lastRan) >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

const scrollHandler = ():void => {
  // сколько проскроленно
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop
  // дельта между высотой документа и вьюпортом
  const heightWithoutClient = document.documentElement.scrollHeight - document.documentElement.clientHeight
  // сравниваем остаток дельту с количеством проскролленого
  const scrolled = (winScroll / heightWithoutClient) * 100

  if (progressElem.value) {
    progressElem.value.style.width = scrolled + 'vw'
  }
}

const throttledScrollHandler = throttle(scrollHandler, 50)

onMounted(() => {
  window.addEventListener('scroll', throttledScrollHandler)
})

</script>

<template>

  <div ref="progressElem"
       :class="$style.progressWrap">
  </div>

</template>

<style lang="scss" module>
.progressWrap {
  position: fixed;
  top: 0;
  left: 0;
  height: .8rem;
  width: 0;
  background: $green;
  z-index: 111;
}
</style>
