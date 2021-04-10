<template>
  <figure
    v-lazyload
    class="image__wrapper"
  >
    <imageSpiner
      class="image__spinner"
    />
    <img
      class="image__item"
      :data-url="source"
      alt="random image"
    >

  </figure>
</template>

<script>

  import LazyLoadDirective from "../directives/LazyLoadDirective.js"
  import imageSpiner from '../components/imageSpiner.vue'
  export default {
    name: "imageItem",
    directives: {
      lazyload: LazyLoadDirective
    },
    components: {
      imageSpiner,
    },
    props: {
      source: {
        type: String,
        required: true
      },
    }
  };
</script>

<style scoped lang="scss">
  .image {
    &__wrapper {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
      margin-bottom: 20px;

      &.loaded {
        .image {
          &__item {
            visibility: visible;
            opacity: 1;
            border: 0;
            height: 100%;
            width: 300px
          }

          &__spinner {
            display: none;
            width: 100%;
          }
        }
      }
    }
    &__item {
      min-height: 150px;
      width: 100%;
      border-radius: 4px;
      transition: all 0.4s ease-in-out;
      opacity: 0;
      visibility: hidden;
    }
  }
</style>
