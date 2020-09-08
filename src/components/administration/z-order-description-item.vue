<template>
	<div class="v-cart-item">
		<img
				:src="(cart_order_data.arrayImages)" alt="" class="v-cart-item__image">
		<div class="v-cart-item__info">
			<p>{{cart_order_data.name}}</p>
			<p>{{'Цена'}} : {{cart_order_data.price}}</p>
			<p>{{'Размер'}} :{{cart_order_data.clothingSize}}</p>
			<p>{{'Артикль'}}: {{cart_order_data.article}}</p>
			<p>{{'тел.: 097 788 95 80'}}</p>
<!--			<div class="text-center">-->
<!--				<v-btn-->
<!--						@click="productClick"-->
<!--						class="ma-2"-->
<!--						outlined color="indigo"-->
<!--				>-->
<!--					Подробнее...-->
<!--				</v-btn>-->
<!--			</div>-->
		</div>

		<!--		КОЛИЧЕСТВО-->
		<div class="v-cart-item__quantity">
			<p>{{'Qty:' | localize}}</p>
			<div class="text-center">
				<div>{{quantity}}</div>
			</div>


		</div>
	</div>
</template>
<script>

    export default {
        name: "z-order-description-item",
        data () {
            return {
            }
        },
        props: {
            cart_order_data: {
                type: Object,
                default() {
                    return {}
                }
            },
            productItem: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        computed: {
            quantity() {
                let promises = 0
                for(let i = 0; i < this.productItem.length; i++) {
                    if(this.cart_order_data.article === this.productItem[i].article) {
                        promises++
                    }
                }
                return  promises
            }
        },
        methods: {
            productClick() {
                this.$emit('productClick', this.cart_order_data.article)
            },
        },
    }
</script>

<style lang="scss">
	.v-cart-item {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 8px 0 #0e0e0e;
		padding: $padding*2;
		margin-bottom: $margin*2;

		&__image {
			max-width: 50px;
		}
	}
	.custom-loader {
		animation: loader 1s infinite;
		display: flex;
	}
	@-moz-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@-o-keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes loader {
		from {
			transform: rotate(0);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>