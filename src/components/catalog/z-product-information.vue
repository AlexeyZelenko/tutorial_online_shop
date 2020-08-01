<template>
	<div class="z-product-information">
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link_to_cart">{{'Back to catalog' | localize }}</div>
		</router-link>
		<p>Product name: {{product.name}}</p>
	</div>
</template>

<script>
    import {db} from '@/main.js'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "zProductInformation",
        data: () => ({
            message: [],
        }),
        // components: {},
        firestore() {
            return {
                message: db.collection('products'),
            }
        },
        methods: {
            ...mapActions([
                'FIREBASE'
            ]),
            firebasePush() {
                this.FIREBASE(this.message)
            },
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ]),
            product() {
                let result = {}
                let vm = this;
                this.PRODUCTS.map(function (item) {
                    if (item.article === vm.$route.query.product) {
                        result = item;
                    }
                })
                return result;
            }
        },
        watch: {},
        props: {},
				mounted() {
            console.log(this.FIREBASE)
            this.firebasePush()
        }
    }
</script>

<style>

</style>