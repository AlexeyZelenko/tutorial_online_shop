<template>
	<div class="v-cart">
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link_to_cart">{{'Back to catalog' | localize }}</div>
		</router-link>
		<h1>{{'Cart' | localize }}</h1>
		<p v-if="!cart_data.length">{{'There are no products in cart...' | localize }}</p>
		<v-cart-item
				:cart_item_data="item"
				:key="item.article"
				@decrement="decrement(index)"
				@deleteFromCart="deleteFromCart(index)"
				@increment="increment(index)"
				v-for="(item, index) in cart_data"
		/>
		<div class="v-cart__total">
			<p class="total__name">{{'Total:' | localize }}</p>
			<p>{{cartTotalCost}} грн</p>
		</div>
	</div>
</template>

<script>
    import VCartItem from './v-cart-item'
    import {mapActions} from 'vuex'

    export default {
        name: "v-cart.vue",
        components: {
            VCartItem
        },
        props: {
            cart_data: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        computed: {
            cartTotalCost() {
                return this.cart_data.reduce((res, item) => res + item.price * item.quantity, 0)
            }
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_CART',
                'INCREMENT_CART_ITEM',
                'DECREMENT_CART_ITEM'
            ]),
            increment(index) {
                this.INCREMENT_CART_ITEM(index)
            },
            decrement(index) {
                this.DECREMENT_CART_ITEM(index)
            },
            deleteFromCart(index) {
                this.DELETE_FROM_CART(index)
            }
        }
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