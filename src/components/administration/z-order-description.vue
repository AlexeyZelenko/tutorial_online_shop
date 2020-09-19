<template>
	<div class="">
		<div class="text-center">
			<v-btn
					:to="{name: 'admin'}"
					class="ma-2"
					outlined
					style="background-color: #31c375; margin: 10px; color: whitesmoke"
			>
				Назад к заказам
			</v-btn>
		</div>
		<z-order-description-item
				v-for="item in newGetOrderUser"
				:key="item.article"
				:cart_order_data="item"
				:productItem="products"
				@productClick="productClick"
		/>
		<div class="v-cart__total">
			<p class="total__name">{{'Total:' | localize }}  {{cartTotalCost}} грн</p>
		</div>
	</div>
</template>

<script>
	const zOrderDescriptionItem = () => import('@/components/administration/z-order-description-item')

  export default {
    name: "zOrderDescription",
    data: () => ({
    }),
    components: {
        zOrderDescriptionItem
		},
		props: {
				products: {
						type: Array,
						default() {
								return []
						}
				}
		},
    methods: {
        productClick(article) {
            this.$router.push({name: 'information-order', query: {'product': article } })
        },
		},
    computed: {
        newGetOrderUser() {
            const uniqArray = this.products.filter((obj, idx, arr) => (
                arr.findIndex((o) => o.article === obj.article) === idx
            ))
            return uniqArray
        },
        cartTotalCost() {
            return this.products.reduce((res, item) => res + +item.price, 0)
        },
		},
  }
</script>

<style lang="scss">
	.v-cart {
		margin-bottom: 100px;

		&__total {
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			padding: $padding*2 $padding*3;
			display: flex;
			justify-content: center;
			background: $green-bg;
			color: #ffffff;
			font-size: 20px;
		}

		.total__name {
			margin-right: $margin*2;
		}
	}
</style>