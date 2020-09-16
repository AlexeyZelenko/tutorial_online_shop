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
			<div class="text-center">
			</div>
		</div>

		<!--		КОЛИЧЕСТВО-->
		<div class="v-cart-item__quantity">
			<p>{{'Qty:' | localize}}</p>
			<div class="text-center">
				<div>{{quantity}}</div>
			</div>
		</div>

<!--		МОДАЛЬНОЕ ОКНО-->
		<div data-app>
			<template>
				<v-row justify="center">
					<v-dialog
							v-model="dialog"
							fullscreen
							hide-overlay
							transition="dialog-bottom-transition"
					>
						<template v-slot:activator="{ on, attrs }">

							<v-avatar color="indigo" size="48">
								<v-icon
										color="primary"
										v-bind="attrs"
										v-on="on"
								>
									mdi-format-list-bulleted
								</v-icon>
							</v-avatar>
						</template>
						<v-card>
							<v-toolbar
									@click="dialog = false"
									style="background-color: #0a4506;"
							>
								<v-btn icon dark @click="dialog = false">
									<v-icon>mdi-close</v-icon>
								</v-btn>

								<v-spacer></v-spacer>
								<v-toolbar-items >
									<v-btn
											style="color: whitesmoke"
											text
											@click="dialog = false"
									>
										Закрыть
									</v-btn>
								</v-toolbar-items>
							</v-toolbar>
							<v-list three-line subheader>
								<v-list-item>
									<v-list-item-content>
										<v-carousel
												:carousel_data="cart_order_data.arrayImages"
										/>
										<div class="v-cart-item__info">
											<p>{{cart_order_data.name}}</p>
											<p>{{'Цена'}} : {{cart_order_data.price}}</p>
											<p>{{'Размер'}} :{{cart_order_data.clothingSize}}</p>
											<p>{{'Артикль'}}: {{cart_order_data.article}}</p>
											<div class="v-cart-item__quantity">
												<p>{{'Qty:' | localize}} {{quantity}}</p>
											</div>
											<p>{{this.quantity}} * {{+this.cart_order_data.price}} грн = {{cartTotalCost}} грн</p>
											<div class="text-center">
												<v-btn
														@click="dialog = false"
														style="background-color: #31c375; color: whitesmoke"
												>
													Закрыть
												</v-btn>
											</div>
										</div>
									</v-list-item-content>
								</v-list-item>
							</v-list>
							<v-divider></v-divider>
						</v-card>
					</v-dialog>
				</v-row>
			</template>
		</div>

	</div>
</template>
<script>
    import vCarousel from '@/components/v-carousel'

    export default {
        name: "z-order-description-item",
        components: {
            vCarousel
        },
        data () {
            return {
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,
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
            cartTotalCost() {
                return this.quantity * +this.cart_order_data.price
            },
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
	.z-product-information {
		flex-basis: 25%;
		box-shadow: 0 0 8px 0 #e0e0e0;
		padding: $padding*2;
		margin-bottom: $margin*2;

		&_image {
			width: 300px;
		}
	}
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