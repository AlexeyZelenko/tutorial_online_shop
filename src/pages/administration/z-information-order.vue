<template>
	<div class="z-product-information">
		<div>
		</div>
		<template>
			<v-btn
					:to="{name: 'admin'}"
					block
					style="background-color: green; color: whitesmoke"
			>
				Назад к заказу
			</v-btn>
		</template>
		<v-carousel
				:carousel_data="product.arrayImages1"
		/>

		<p>{{"Price" | localize}}: {{product.price}} грн</p>
		<p>{{"Descriptions" | localize}}:</p>
		<p v-html="product.description"></p>
		<p v-if="product.clothingManufacturer !== '' ">{{"Manufacturer country" | localize}} :
			{{product.clothingManufacturer}}</p>
		<p v-if="product.BrandName !== '' ">{{"Brand name" | localize}}: {{product.BrandName}}</p>
		<p>{{"Clothing size" | localize}}: {{product.clothingSize}}</p>
		<p v-html="product.article"></p>
		<div class="text-center">
			<v-chip
					class="ma-2"
					style="background-color: goldenrod; color:white"
					text-color="white"
					v-if="product.newProduct"
			>
				НОВИНКА!
				<v-icon right style="color: white">mdi-star</v-icon>
			</v-chip>
			<!--					СКИДКА-->
			<v-chip
					class="v_catalog_item_new" style="background-color: #da207d; color:white"
					text-color="white"
					v-if="product.promotionalPrice"
			>
				{{"Promotional Price" | localize}} !!!
			</v-chip>
		</div>
	</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    const vCarousel = () => import('@/components/v-carousel')

    export default {
        name: "zinformationOrder",
        data: () => ({
        }),
        components: {
            vCarousel
        },
        methods: {
            ...mapActions([
                'ADD_TO_CART',
                'bindLocationsRef'
            ]),
            addToCart() {
                this.ADD_TO_CART(this.product)
            },
        },
        computed: {
            ...mapGetters([
                'GET_PRODUCT_FROM_DB'
            ]),
            product() {
                let result = {}
                this.GET_PRODUCT_FROM_DB.map((item) =>  {
                    if (item.article === +this.$route.query.product) {
                        result = item;
                    }
                })
                return result;
            },
        },
        mounted() {
            this.bindLocationsRef()
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