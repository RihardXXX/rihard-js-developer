<template>
  <div :class="$style.robotWrap">
    <div :class="$style.upSection">
      <div :class="$style.head">
        <div :class="$style.antenna">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div :class="$style.opticSection">
          <div id="first" :class="$style.opticWrap">
            <div :class="$style.opticMain">
              <div :class="$style.iris"></div>
            </div>
          </div>
          <div id="last" :class="$style.opticWrap">
            <div :class="$style.opticMain">
              <div :class="$style.iris"></div>
            </div>
          </div>
        </div>

        <div :class="$style.mouthWrap">
          <div :class="$style.mouthMain">
            <div :class="$style.language"></div>
          </div>
        </div>
      </div>

      <div :class="$style.neck"></div>
    </div>

    <div :class="$style.downSection">
      <!-- <h3 :class="[$style.message, { [$style.active]: showMessage }]">Не трожь меня сука</h3> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// TODO: научить моргать глазами +
// TODO: вытаскивать язык при наведении +
// TODO: смотреть по сторонам +
// TODO: Добавить роботу анимацию на животе для скролла вверх

export default defineComponent({
  name: 'RobotHelp',

  // data() {
  //   return {
  //     showMessage: false,
  //   };
  // },
});
</script>

<style lang="scss" module>
.robotWrap {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
  width: 10rem;
  height: 20rem;
  z-index: 11;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  /* overflow: hidden; */
  cursor: pointer;

  .upSection {
    height: 10rem;
    width: 100%;
    background: $black-100;
    padding: 1.6rem 1.4rem 0 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 2rem;

    .head {
      position: relative;
      height: 8rem;
      width: 100%;
      background: $green;
      border-radius: 1rem;
      border: 0.1rem solid $gray;
      padding: 1.5rem 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;

      .antenna {
        position: absolute;
        width: 2rem;
        top: -6rem;
        left: 50%;
        transform: translate(-50%, 0);

        div {
          border: 1px solid $gray;
          width: 100%;
          height: 2rem;
          border-radius: 50%;
          background: $green;
          z-index: 2;

          &:nth-child(1) {
            width: 1.2rem;
            height: 1.2rem;
            transform: translate(0.4rem);
          }
          &:nth-child(2) {
            width: 1.4rem;
            height: 1.4rem;
            transform: translate(0.3rem);
          }
          &:nth-child(3) {
            width: 1.8rem;
            height: 1.8rem;
            transform: translate(0.12rem);
          }
          &:nth-child(4) {
            width: 2rem;
            height: 2rem;
          }
        }
      }

      .opticSection {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .opticWrap {
          height: 2rem;
          width: 3rem;
          max-width: 8rem;
          border-radius: 50%;
          overflow: hidden;
          margin: 0 auto 0;
          border-top: 0.3rem inset rgba(0, 0, 0, 0.25);

          animation: blink 2.4s infinite;
          animation-delay: 4s;
          top: -50px;

          .opticMain {
            height: 2rem;
            width: 3rem;
            border-radius: 100%;
            position: relative;
            background: radial-gradient(
              circle at 50%,
              #fcfcfc,
              #efeff1 66%,
              #eecccc 100%
            );

            .iris {
              width: 50%;
              height: 1rem;
              border-radius: 100%;
              position: absolute;
              left: 0;
              top: 0;
              margin: 10% 15%;
              /* animation: move 5s ease-out infinite; */
              background: radial-gradient(circle at 50% 50%, #066 0%, #6cc 90%);
              animation-name: move;
              animation-duration: 8s;
              animation-iteration-count: infinite;
              animation-direction: alternate;

              &::before {
                content: '';
                width: 40%;
                height: 40%;
                border-radius: 100%;
                position: absolute;
                left: 50%;
                top: 50%;
                background: $black-100;
                transform: translate(-50%, -50%);
              }

              &::after {
                content: '';
                width: 30%;
                height: 30%;
                border-radius: 100%;
                position: absolute;
                left: 20%;
                top: 20%;
                background: rgba(255, 255, 255, 0.2);
              }
            }
          }
        }
      }

      .mouthWrap {
        position: relative;
        height: 1rem;
        width: 100%;
        border-radius: 4rem;
        background: $black-100;

        .mouthMain {
          position: absolute;
          height: 0.7rem;
          width: 90%;
          border-radius: 4rem;
          background: $white;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 2s;

          .language {
            position: absolute;
            top: 20%;
            left: 50%;
            transform: translate(-50%, 0);
            width: 80%;
            height: 0;
            border-radius: 0 0 50% 50%;
            background: $red;
            /* animation-name: languageMove;
            animation-duration: 3s;
            animation-duration: 4s;
            animation-iteration-count: infinite;
            animation-direction: alternate;
            animation-delay: 5s; */
          }
        }
      }
    }

    .neck {
      width: 80%;
      background: $green;
      height: 2rem;
    }
  }

  .downSection {
    height: 10rem;
    width: 100%;
    background: $green;
    border: 0.1rem solid $gray;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;

    .message {
      text-align: center;
      color: $white;
      opacity: 0;
      transition: all 2s;

      &.active {
        transition: all 2s;
        opacity: 1;
      }
    }
  }
}

/* .opticMain {
      animation: blink 2.4s infinite;
      animation-delay: 8s;
      top: -50px;
      border-bottom:15px inset #000;
    } */

@keyframes languageMove {
  0% {
    height: 0;
  }

  50% {
    height: 0.5rem;
  }

  100% {
    height: 1rem;
  }
}

@keyframes move {
  0% {
    transform: none;
  }
  20% {
    transform: translateX(0.7rem);
  }
  44% {
    transform: translateY(0.7rem);
  }

  70% {
    transform: translateX(-0.7rem);
  }
  100% {
    transform: translateY(-0.7rem);
  }
}

/* :global(#lid2) {
      animation: blink2 2.4s infinite;
      animation-delay: 8s;
      top: -50px;
    } */

@keyframes blink {
  90% {
    transform: none;
    animation-timing-function: ease-in;
  }
  93% {
    transform: translateY(15px) scaleY(0);
  }
  100% {
    animation-timing-function: ease-out;
  }
}

@keyframes blink {
  90% {
    transform: none;
    animation-timing-function: ease-in;
  }
  93% {
    transform: translateY(15px) scaleY(0);
  }
  100% {
    animation-timing-function: ease-out;
  }
}
</style>
