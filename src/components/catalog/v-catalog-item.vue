<template>
	<div class="v-catalog-item" @click="productClick">
		<v-popup
				v-if="isInfoPopupVisible"
				rightBtnTitle="Add to cart"
				@closePopup="closeInfoPopup"
				@rightBtnActions="addToCart"
				:popupTitle="product_data.name"
		>

			<div>
				<img class="v-catalog-item_image" :src="require('@/assets/images/' + product_data.image)">
				<p class="v_catalog_item_name">{{product_data.name}}</p>
				<p class="v_catalog_item_price">{{ "Price" | localize }} : {{product_data.price}} грн.</p>
				<p class="v_catalog_item_price">{{product_data.category}}</p>
			</div>
		</v-popup>
<!--		НОВИНКА-->
		<v-chip
				v-show="product_data.newClothes" class="v_catalog_item_new"
				style="background-color: goldenrod; color:white"
				text-color="white"
		>
			{{ "NEW" | localize}}!
		</v-chip>
<!--		СКИДКА-->
		<v-chip
				v-show="product_data.promotionalPrice != null" class="v_catalog_item_new"
				style="background-color: #da207d; color:white"
				text-color="white"
		>
			{{"Promotional Price" | localize}}! {{product_data.promotionalPrice}}
		</v-chip>
<!--		СКИДКА-->
		<v-chip
				v-show="product_data.discount != null" class="v_catalog_item_new"
				style="background-color: #202cda; color:white"
				text-color="white"
		>
			{{"Discount" | localize}} {{product_data.discount}} %
		</v-chip>
		<img v-if="product_data.image" class="v-catalog-item_image" :src="require('@/assets/images/' + product_data.image)" alt="">
		<p v-else class="emptyImage">{{product_data.description}}</p>
		<p class="v_catalog_item_name">{{product_data.name}}</p>
		<p class="v_catalog_item_price">{{'Price' | localize }}: {{product_data.price}} грн</p>
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
</template>

<script>
    import vPopup from '../popup/v-popup'

    export default {
        name: "v-catalog-item",
        components: {
            vPopup
        },
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
            closeInfoPopup() {
                this.isInfoPopupVisible = false
            },
            // showPopupInfo() {
            //   this.isInfoPopupVisible = true;
            // },
            addToCart() {
                this.$emit('addToCart', this.product_data);
            }
        },
    }
</script>

<style lang="scss">
	.emptyImage {
		width: 100px;
		height: 200px;
	}

	.v-catalog-item {
		flex-basis: 25%;
		box-shadow: 0 0 8px 0 #e0e0e0;
		padding: $padding*2;
		margin-bottom: $margin*2;

		&_image {
			width: 100px;
		}

		.v_catalog_item_new {
			position: relative;
			text-align: center;
			z-index: 999;
			top: 190px;
			display: flex;
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
	}
</style>