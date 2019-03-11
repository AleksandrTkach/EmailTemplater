<template>
  <div class="spinner__wrapper" v-if="isShowPreloader">
    <div class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Preloader',
  computed: {
    isShowPreloader () {
      return this.$store.getters.showPreloader
    }
  }
}
</script>

<style lang="scss">
  $bg-color: rgba(0, 0, 0, 0.5);
  $basic-dark-color: #fff;
  $border-width: 4px;
  $basic-spinner-dimensions: 125px;
  $main-spinner-dimensions: $basic-spinner-dimensions - $border-width * 2;
  $small-spinner-dimensions: $main-spinner-dimensions * 0.7;
  $sped-rotation: 1.5s;

  .spinner {
    position: relative;
    width: $basic-spinner-dimensions;
    height: $basic-spinner-dimensions;

    &__wrapper {
      position: absolute;
      display: flex;
      height: 100%;
      width: 100%;
      justify-content: center;
      align-items: center;
      background-color: $bg-color;
      z-index: 99999;
    }

    &:before,
    &:after {
       content: "";
       display: block;
       position: absolute;
       border-width: 4px;
       border-style: solid;
       border-radius: 50%;
    }
  }
  .spinner {

  @keyframes rotate-animation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes anti-rotate-animation {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(-360deg);
    }
  }

  &:before {
     width: $main-spinner-dimensions;
     height: $main-spinner-dimensions;
     border-bottom-color: $basic-dark-color;
     border-right-color: $basic-dark-color;
     border-top-color: rgba($basic-dark-color, 0);
     border-left-color: rgba($basic-dark-color, 0);
     top: 0px;
     left: 0px;
     animation: rotate-animation $sped-rotation linear 0s infinite;
   }

  &:after {
     width: $small-spinner-dimensions;
     height: $small-spinner-dimensions;
     border-bottom-color: $basic-dark-color;
     border-right-color: $basic-dark-color;
     border-top-color: rgba($basic-dark-color, 0);
     border-left-color: rgba($basic-dark-color, 0);
     top: ($main-spinner-dimensions - $small-spinner-dimensions) / 2;
     left: ($main-spinner-dimensions - $small-spinner-dimensions) / 2;
     animation: anti-rotate-animation 0.85s linear 0s infinite;
   }
  }
</style>
