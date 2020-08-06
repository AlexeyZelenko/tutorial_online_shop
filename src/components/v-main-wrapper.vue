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

		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import {db} from '@/main.js'

    export default {
        name: 'v-main-wrapper',
        props: {},
        data() {
            return {
                title: 'Main wrapper',
                message: [],
            }
        },
        computed: {
					...mapGetters([
						'LOCALE_CHANGE',
					]),
        },
        firestore() {
            return {
                message: db.collection('products'),
            }
        },
        methods: {
            ...mapActions([
                'LOCALIZE',
                'FIREBASE'
            ]),
            firebasePush() {
                this.FIREBASE(this.message)
            },
            changeLocale(loc) {
                this.LOCALIZE(loc)
            },
        },
        watch: {},
        created() {
            this.firebasePush()
            console.log('Data arrived!')
        }
    }
</script>

<style>
	.v-main-wrapper {
		max-width: 900px;
		margin: 0 auto;
	}
</style>