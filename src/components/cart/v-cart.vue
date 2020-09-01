<template>
	<div class="v-cart">
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link_to_cart">{{'Back to catalog' | localize }}</div>
		</router-link>
		<h1>{{'Cart' | localize }}</h1>
		<p v-if="!GET_CART_USER.length">{{'There are no products in cart...' | localize }}</p>
		<v-cart-item
				:cart_item_data="item"
				:key="item.article"
				@decrement="decrement(index)"
				@deleteFromCart="deleteFromCart(index)"
				@increment="increment(index)"
				v-for="(item, index) in newGetCartUser"
		/>
		<div class="v-cart__total">
				<p class="total__name">{{'Total:' | localize }}  {{cartTotalCost}} грн</p>
		</div>
	</div>
</template>

<script>
    import VCartItem from './v-cart-item'
    import {mapActions, mapGetters} from 'vuex'

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
            ...mapGetters([
                'PRODUCTS',
                'GET_CART_USER'
            ]),
						newGetCartUser() {
               return  [...new Set(this.GET_CART_USER)]
						},
            cartTotalCost() {
                console.log('this.GET_CART_USER', this.GET_CART_USER)
                return this.GET_CART_USER.reduce((res, item) => res + +item.price, 0)
            },
        },
        created() {
            this.VIEW_CART_USER()
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_CART',
                'INCREMENT_CART_ITEM',
                'DECREMENT_CART_ITEM',
                'VIEW_CART_USER'
            ]),
            increment(index) {
                this.INCREMENT_CART_ITEM(index)
            },
            decrement(index) {
                this.DECREMENT_CART_ITEM(index)
            },
            deleteFromCart(index) {
                this.DELETE_FROM_CART(index)
            .then(() => {
                    this.VIEW_CART_USER()
                })
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