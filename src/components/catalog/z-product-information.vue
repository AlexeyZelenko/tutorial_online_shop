<template>
	<div class="z-product-information">
		<router-link :to="{name: 'catalog'}">
			<img v-if="product.image" class="v-catalog-item_image" :src="require('@/assets/images/' + product.image)" alt="">
			<div class="v-catalog__link_to_cart">{{'Back to catalog' | localize }}</div>
		</router-link>
		<p>{{ "Product name" | localize}}: {{product.name}}</p>
		<p>Article: {{product.article}}</p>
		<p>Price: {{product.price}}</p>
		<p>Descriptions: {{product.description}}</p>
		<p>Manufacturer country : {{product.clothingManufacturer}}</p>
		<p>Brand name: {{product.BrandName}}</p>
		<p>Clothing size: {{product.clothingSize}}</p>
			<div class="text-center" v-show="product.newClothes">
				<v-chip
						class="ma-2"
						style="background-color: goldenrod; color:white"
						text-color="white"
				>
					NEW!
					<v-icon right style="color: white">mdi-star</v-icon>
				</v-chip>
			</div>
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
            close () {
                alert('Chip close clicked')
            },
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