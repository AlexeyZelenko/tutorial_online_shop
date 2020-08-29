<template>
	<div class="v-catalog-item" @click="productClick" >

<!--		НОВИНКА-->
		<v-chip
				v-if="product_data.newClothes" class="v_catalog_item_new"
				style="background-color: goldenrod; color:white"
				text-color="white"
		>
			{{ "NEW" | localize}}!
		</v-chip>

<!--		СКИДКА-->
		<v-chip
				v-if="product_data.promotionalPrice" class="v_catalog_item_new"
				style="background-color: #da207d; color:white"
				text-color="white"
		>
			{{"Promotional Price" | localize}}!
		</v-chip>
		<div
				v-if="product_data.arrayImages"
				class="v-catalog-item_image2">
			<img
					class="v-catalog-item_image"
					:src="product_data.arrayImages[0]"
					alt="">
		</div>
		<p
				v-else
				class="emptyImage"
		>
			<span v-html="product_data.description" />
		</p>
<!--		<p class="v_catalog_item_name">{{product_data.article}}</p>-->
		<p class="v_catalog_item_price">{{'Price' | localize }}: {{product_data.price}} грн</p>
		<div class="v-catalog-item_button" style="margin-bottom: 1%;">
			<button
					class="v-catalog-item_show-info"
					@click.self="productClick"
			>
				{{'Show info' | localize}}
			</button>
			<button
					class="v-catalog_item_add_cart_btn btn"
					@click.stop="addToCart"
			>
				{{'Add to cart' | localize}}
			</button>
		</div>
	</div>
</template>

<script>

    export default {
        name: "v-catalog-item",
        data() {
            return {
                isInfoPopupVisible: false
            }
        },
        props: {
            product_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            productClick() {
                this.$emit('productClick', this.product_data.article)
            },
            addToCart() {
                this.$emit('addToCart', this.product_data);
            }
        },
    }
</script>

<style lang="scss">
	.emptyImage {
		width: 100px;
		height: 300px;
	}

	.v-catalog-item {
		flex-basis: 25%;
		box-shadow: 0 0 8px 0 #e0e0e0;
		padding: $padding*2;
		margin-bottom: $margin*2;
		z-index: 1;
		margin-left: 1px;

		&_image {
			width: 100px;
			justify-content: center;
		}

		&_image2 {
			height: 200px;
		}

		&_show-info {
			padding: 8px 16px;
			margin-bottom: 5px;
			background: darkseagreen;
			color: whitesmoke;
			border: 0;
			border-radius: 4px;
			outline: none;
			cursor: pointer;
		}

		&_button {
			margin-bottom: 10px;
		}

		.v_catalog_item_new {
			margin-top: -35px;
			position: relative;
			text-align: center;
			z-index: 12;
			top: 45%;
			width: 95%;
			display: flex;
			justify-content: space-between;
			align-items: end;
		}
	}
</style>