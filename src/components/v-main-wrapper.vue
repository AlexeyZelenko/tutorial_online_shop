<template>
	<div class="v-main-wrapper">
		<button
				class="localize"
				@click="changeLocale('ua-Ua')"
		>
			ua
		</button>
		<button
				class="localize"
				@click="changeLocale('ru-RU')"
		>
			ru
		</button>
		<button
				class="localize"
				@click="changeLocale('en-US')"
		>
			eng
		</button>
		<keep-alive>
			<router-view></router-view>
		</keep-alive>
	</div>
</template>

<script>
    import {mapActions} from 'vuex'
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
        computed: {},
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