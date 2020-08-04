<template>
	<div class="z-product-information">
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link_to_cart">{{'Back to catalog' | localize }}</div>
		</router-link>
		<img v-if="product.image" class="z-product-information_image" :src="require('@/assets/images/' + product.image)">
		<p>{{"Price" | localize}}: {{product.price}}</p>
		<p>{{"Descriptions" | localize}}: {{product.description}}</p>
		<p>{{"Manufacturer country" | localize}} : {{product.clothingManufacturer}}</p>
		<p>{{"Brand name" | localize}}: {{product.BrandName}}</p>
		<p>{{"Clothing size" | localize}}: {{product.clothingSize}}</p>
		<div class="text-center" v-show="product.newClothes">
			<v-chip
					class="ma-2"
					style="background-color: goldenrod; color:white"
					text-color="white"
			>
				NEW!
				<v-icon right style="color: white">mdi-star</v-icon>
			</v-chip>
			<!--		СКИДКА-->
			<v-chip
					v-show="product.promotionalPrice != null" class="v_catalog_item_new"
					style="background-color: #da207d; color:white"
					text-color="white"
			>
				{{"Promotional Price" | localize}} {{product.promotionalPrice}} !!!
			</v-chip>
			<!--		СКИДКА-->
			<v-chip
					v-show="product.discount != null" class="v_catalog_item_new"
					style="background-color: #202cda; color:white"
					text-color="white"
			>
				{{"Discount" | localize}} {{product.discount}} %
			</v-chip>
		</div>
		<button
				style="margin-top: 20px"
				class="v-catalog_item_add_cart_btn btn"
				@click="addToCart"
		>
			{{'Add to cart' | localize}}
		</button>
	</div>
</template>

<script>
    import {db} from '@/main.js'
    import {mapGetters, mapActions} from 'vuex'
    import Swal from 'sweetalert2'

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
                'FIREBASE',
                'ADD_TO_CART'
            ]),
            firebasePush() {
                this.FIREBASE(this.message)
            },
            addToCart() {
                this.ADD_TO_CART(this.product)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Товар доданий у кошик',
                    showConfirmButton: false,
                    timer: 1500
                })
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
        mounted() {
            this.firebasePush()
        }
    }
</script>

<style lang="scss">
	.z-product-information {
		flex-basis: 25%;
		box-shadow: 0 0 8px 0 #e0e0e0;
		padding: $padding*2;
		margin-bottom: $margin*2;

		&_image {
		width: 300px;
		}
	}
</style>