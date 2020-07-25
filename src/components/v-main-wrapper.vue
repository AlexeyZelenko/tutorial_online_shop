<template>
  <div class="v-main-wrapper">
    <!-- Switch -->
    <div class="switch">
      <label>
        English
        <input type="checkbox">
        <span class="lever"></span>
        Русский
      </label>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    // import localizeFilter from '@/filters/localize.filter'

    export default {
        name: 'v-main-wrapper',
        props: {},
        data() {
            return {
                title: 'Main wrapper'
            }
        },
        computed: {},
        methods: {},
        watch: {},
        mounted() {}
    }
</script>

<style>
  .v-main-wrapper {
    max-width: 900px;
    margin: 0 auto;
  }
</style>