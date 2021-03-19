<template>
	<div class="z-product-information">
		<div>
		</div>
		<template>
			<v-btn
					:to="{name: 'catalog'}"
					block
					style="background-color: green; color: whitesmoke; margin-bottom: 19px"
			>
				<v-icon dark left>mdi-arrow-left</v-icon>Каталог товаров
			</v-btn>
		</template>
    <h3>{{product.name}}</h3>
		<v-carousel
				:carousel_data="product.arrayImages"
		/>

		<p>{{"Price" | localize}}: {{product.price}} грн</p>
		<p>{{"Descriptions" | localize}}:</p>
		<p v-html="product.description"></p>
		<p v-if="product.clothingManufacturer !== '' ">{{"Manufacturer country" | localize}} :
			{{product.clothingManufacturer}}</p>
		<p v-if="product.BrandName !== '' ">{{"Brand name" | localize}}: {{product.BrandName}}</p>

<!--		<button-->
<!--				@click.stop="dialog = true"-->
<!--				class="v-catalog_item_add_cart_btn btn"-->
<!--		>-->
<!--			Выбрать размер-->
<!--		</button>-->
<!--		<p>{{'Европа : '}}{{this.select.state}}</p>-->
<!--		<p>{{'Международная система : '}}{{this.select.abbr}}</p>-->

<!--		<p>{{"Clothing size" | localize}}: {{product.clothingSize}}</p>-->


		<p>Артикль товара: {{product.article}}</p>
		<div class="text-center">
			<v-chip
					class="ma-2"
					style="background-color: goldenrod; color:white"
					text-color="white"
					v-if="product.newClothes"
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
<!--		<div data-app >-->
<!--			<template >-->
<!--				<v-row justify="center">-->

<!--					<v-dialog-->
<!--							v-model="dialog"-->
<!--							max-width="290"-->
<!--					>-->
<!--						<v-card>-->
<!--							<v-card-title class="headline">Выберите размер</v-card-title>-->

<!--&lt;!&ndash;							<v-card-text>&ndash;&gt;-->
<!--&lt;!&ndash;								Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.&ndash;&gt;-->
<!--&lt;!&ndash;							</v-card-text>&ndash;&gt;-->

<!--							<template>-->
<!--								<v-container fluid>-->
<!--									<v-row align="center">-->

<!--										<v-col cols="12">-->
<!--											<v-select-->
<!--													v-model="select"-->
<!--													:hint="`${select.state}, ${select.abbr}`"-->
<!--													:items="items"-->
<!--													item-text="state"-->
<!--													item-value="abbr"-->
<!--													label="Выберите размер одежды"-->
<!--													persistent-hint-->
<!--													return-object-->
<!--													single-line-->
<!--											></v-select>-->
<!--										</v-col>-->
<!--									</v-row>-->
<!--								</v-container>-->
<!--							</template>-->

<!--							<v-card-actions>-->
<!--								<v-spacer></v-spacer>-->

<!--								<v-btn-->
<!--										color="green darken-1"-->
<!--										text-->
<!--										@click.stop="dialog = false"-->
<!--								>-->
<!--									Закрыть-->
<!--								</v-btn>-->

<!--								<v-btn-->
<!--										style="margin-top: 20px"-->
<!--										text-->
<!--										@click.stop="dialog = false"-->
<!--								>-->
<!--									Ок-->
<!--								</v-btn>-->
<!--							</v-card-actions>-->
<!--						</v-card>-->
<!--					</v-dialog>-->
<!--				</v-row>-->
<!--			</template>-->
<!--		</div>-->

		<button
				@click="addToCart"
				class="v-catalog_item_add_cart_btn btn"
				style="margin-top: 20px"
		>
			{{'Add to cart' | localize}}
		</button>
	</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    const vCarousel = () => import('@/components/v-carousel')

    export default {
        name: "zProductInformation",
        data: () => ({
            // select: { state: '36-38', abbr: 'S' },
            // items: [
            //     { state: '36-38', abbr: 'S' },
            //     { state: '38-42', abbr: 'M' },
            //     { state: '44-46', abbr: 'L' },
            //     { state: '48-52', abbr: 'XL' },
            // ],
            // dialog: false,
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
                    if (+item.article === +this.$route.query.product) {
                        result = item;
                    }
                })
                return result;
            },
        },
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