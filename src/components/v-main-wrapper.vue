<template>
  <div class="v-main-wrapper">
    <button
        class="localize"
        @click="changeLocaleRu"
    >
      ru
    </button>
    <button
        class="localize"
        @click="changeLocaleEn"
    >
      eng
    </button>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    // import localizeFilter from '@/filters/localize.filter'
    import {mapActions} from 'vuex'

    export default {
        name: 'v-main-wrapper',
        props: {},
        data() {
            return {
                title: 'Main wrapper'
            }
        },
        computed: {},
        methods: {
           ...mapActions([
               'LOCALIZE_RU',
               'LOCALIZE_EN'
           ]) ,
            changeLocaleRu() {
               this.LOCALIZE_RU()
            },
            changeLocaleEn() {
                this.LOCALIZE_EN()
            },


        },
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