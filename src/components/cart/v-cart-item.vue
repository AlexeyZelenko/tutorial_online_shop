<template>
	<div class="v-cart-item">
		<img
				:src="(cart_item_data.arrayImages)" alt="" class="v-cart-item__image">
		<div class="v-cart-item__info">
			<p>{{cart_item_data.name}}</p>
			<p>{{'Цена'}} : {{cart_item_data.price}}</p>
			<p>{{'Размер'}} :{{cart_item_data.clothingSize}}</p>
			<p>{{'Артикль'}}: {{cart_item_data.article}}</p>
			<p>{{'тел.: 097 788 95 80'}}</p>
		</div>
		<div class="v-cart-item__quantity">
			<p>{{'Qty:' | localize}}</p>
			<span class="quantity__tools">
        <span @click="decrementItem" class="quantity__btn">-</span>
        {{cart_item_data.quantity}}
        <span @click="incrementItem" class="quantity__btn">+</span>
      </span>
		</div>
		<v-btn
				depressed
				@click="deleteFromCart"
		>
			<span
					class="mdi mdi-delete-forever"
					@click="deleteFromCart"
					style="color: mediumvioletred"
			></span>
<!--			{{'Delete' | localize}}-->
		</v-btn>
	</div>
</template>
<script>

    export default {
        name: "v-cart-item",
        props: {
            cart_item_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        methods: {
            decrementItem() {
                this.$emit('decrement')
            },
            incrementItem() {
                this.$emit('increment')
            },
            deleteFromCart() {
                this.$emit('deleteFromCart')
            }
        },
        mounted() {

        }
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

		.quantity__btn {
			cursor: pointer;

		}

		.quantity__tools {
			user-select: none;
		}
	}
</style>