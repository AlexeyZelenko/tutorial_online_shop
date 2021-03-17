<template>
  <v-app id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </v-app>
</template>

<script>
    import MainLayout from '@/layouts/MainLayout'
    import EmptyLayout from '@/layouts/EmptyLayout'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
          MainLayout,
          EmptyLayout
        },
        computed: {
            ...mapGetters([
                'LOCALE_CHANGE',
            ]),
          layout() {
            return (this.$route.meta.layout || 'empty') + '-layout'
          }
        },
        methods: {
            ...mapActions([
                'LOCALIZE',
                'bindLocationsRef',
								'userbindLocationsRef'
            ]),
            changeLocale(loc) {
                this.LOCALIZE(loc)
            },
        },
        created() {
            this.bindLocationsRef()
            this.userbindLocationsRef()
        }
    }
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
    background: $main-color;
	}
	.logo {
		max-width: 300px;
		max-height: 30%;
		padding-bottom: 10px
	}
</style>
