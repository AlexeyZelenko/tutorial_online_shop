<template>
	<div class="v-main-wrapper">
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
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'v-main-wrapper',
        data() {
            return {
                title: 'Main wrapper',
            }
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
            ]),
            changeLocale(loc) {
                this.LOCALIZE(loc)
            },
        },
        watch: {},
        created() {
            this.bindLocationsRef()
        }
    }
</script>

<style>
	.v-main-wrapper {
		max-width: 900px;
		margin: 0 auto;
	}
</style>