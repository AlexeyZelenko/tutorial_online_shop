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
		<button @click="firebasePush">{{123}}</button>
<!--		<p>{{message}}</p>-->
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
                message: []
            }
        },
        computed: {
            // newMessage() {
            //     console.log(this.message)
            //     return this.message
            // }
        },
        firestore() {
            return {
                message: db.collection('products')
            }
        },
        methods: {
            ...mapActions([
                'LOCALIZE_RU',
                'LOCALIZE_EN',
                'FIREBASE'
            ]),
            firebasePush() {
                this.FIREBASE(this.message)
                console.log(this.message)
            },
            changeLocaleRu() {
                this.LOCALIZE_RU()
            },
            changeLocaleEn() {
                this.LOCALIZE_EN()
            },


        },
        watch: {},
        created() {
            this.firebasePush()
        }
    }
</script>

<style>
	.v-main-wrapper {
		max-width: 900px;
		margin: 0 auto;
	}
</style>