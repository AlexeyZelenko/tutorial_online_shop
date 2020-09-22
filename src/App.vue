<template>
	<div id="app">
		<v-app>
			<!--		ЛОКАЛИЗАЦИЯ-->
<!--			<div>-->
				<!--		ПЕРЕВОДЫ-->
				<!--		<div style="margin-bottom: 10px">-->
				<!--			<v-btn class="ma-2"-->
				<!--				style="color: #26ae68"-->
				<!--				light-->
				<!--				@click="changeLocale('ua-Ua')"-->
				<!--				>UA-->
				<!--					<v-icon-->
				<!--							dark-->
				<!--							right-->
				<!--							v-if="LOCALE_CHANGE ==='ua-Ua'"-->
				<!--					>-->
				<!--						mdi-checkbox-marked-circle-->
				<!--					</v-icon>-->
				<!--			</v-btn>-->
				<!--			<v-btn-->
				<!--					class="ma-2"-->
				<!--					style="color: #26ae68"-->
				<!--					light-->
				<!--					@click="changeLocale('ru-RU')"-->
				<!--			>RU-->
				<!--				<v-icon-->
				<!--						dark-->
				<!--						right-->
				<!--						v-if="LOCALE_CHANGE ==='ru-RU'"-->
				<!--				>-->
				<!--					mdi-checkbox-marked-circle-->
				<!--				</v-icon>-->
				<!--			</v-btn>-->
				<!--			<v-btn-->
				<!--					class="ma-2"-->
				<!--					style="color: #26ae68"-->
				<!--					light-->
				<!--					@click="changeLocale('en-US')"-->
				<!--			>En-->
				<!--				<v-icon-->
				<!--						dark-->
				<!--						right-->
				<!--						v-if="LOCALE_CHANGE ==='en-US'"-->
				<!--				>-->
				<!--					mdi-checkbox-marked-circle-->
				<!--				</v-icon>-->
				<!--			</v-btn>-->
				<!--		</div>-->
				<!--		<router-link :to="{name: 'chat'}">-->
				<!--			<div-->
				<!--					style="height: 45px; padding-left: 100px"-->
				<!--					class="v-catalog__link_to_admin">-->
				<!--				{{'Chat' }}-->
				<!--			</div>-->
				<!--		</router-link>-->
<!--			</div>-->
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
		</v-app>
	</div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
        },
        computed: {
            ...mapGetters([
                'LOCALE_CHANGE',
            ]),
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

<style>
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 10px;
		margin-right: 1%;
		margin-left: 1%;
	}
	.logo {
		max-width: 300px;
		max-height: 30%;
		padding-bottom: 10px
	}
</style>
