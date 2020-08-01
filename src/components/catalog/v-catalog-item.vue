<template>
	<div class="v-catalog-item" @click="productClick">
		<v-popup
				v-if="isInfoPopupVisible"
				rightBtnTitle="Add to cart"
				@closePopup="closeInfoPopup"
				@rightBtnActions="addToCart"
				:popupTitle="product_data.name"
		>
			<div style="flex: ">
				<div class="text-center" v-show="product_data.newClothes">
					<v-chip
							class="ma-2"
							style="background-color: goldenrod; color:white"
							text-color="white"
					>
						NEW!
					</v-chip>
				</div>
				<img class="v-catalog-item_image" :src="require('@/assets/images/' + product_data.image)" style="z-index: 10">
			</div>

			<div>
				<p class="v_catalog_item_name">{{product_data.name}}</p>
				<p class="v_catalog_item_price">{{ "Price" | localize }} : {{product_data.price}} грн.</p>
				<p class="v_catalog_item_price">{{product_data.category}}</p>
			</div>

		</v-popup>

		<div class="text-center" v-show="product_data.newClothes">
			<v-chip
					class="ma-2"
					style="background-color: goldenrod; color:white"
					text-color="white"
			>
				NEW!
			</v-chip>
		</div>
		<img v-if="product_data.image" class="v-catalog-item_image" :src="require('@/assets/images/' + product_data.image)"  alt="">
		<p v-else class="emptyImage">{{product_data.description}}</p>
		<p class="v_catalog_item_name">{{product_data.name}}</p>
		<p class="v_catalog_item_price">{{'Price' | localize }}: {{product_data.price}} грн</p>
		<button
				class="v-catalog-item_show-info"
				@click="productClick"
		>
			{{'Show info' | localize}}
		</button>
		<button
				class="v-catalog_item_add_cart_btn btn"
				@click="addToCart"
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