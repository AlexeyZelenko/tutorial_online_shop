<template>
	<div class="v-cart">
		<template>
			<v-btn
					:to="{name: 'catalog'}"
					block
					style="background-color: black; color: whitesmoke"
			>
				<v-icon dark left>mdi-arrow-left</v-icon>Каталог товаров
			</v-btn>
		</template>
		<h1>{{'Cart' | localize }}</h1>
		<div class="text-center">
			<v-btn
					@click="userOrder"
					dark
					rounded
					style="background-color: darkslategrey; margin-bottom: 10px"
			>
				Заказать
			</v-btn>
		</div>
		<p v-if="!GET_CART_USER.length">{{'There are no products in cart...' | localize }}</p>
		<v-cart-item
				:cart_item_data="item"
				v-for="item in newGetCartUser"
				:key="item.id"
				@decrement="decrement(item)"
				@deleteFromCart="deleteFromCart(item)"
				@increment="increment(item)"
		/>
		<div class="v-cart__total">
			<p class="total__name">{{'Total:' | localize }} {{cartTotalCost}} грн</p>
		</div>
	</div>
</template>

<script>
    const VCartItem = () => import('../../components/cart/v-cart-item')
    import {mapActions, mapGetters} from 'vuex'
    import Swal from 'sweetalert2'

    export default {
        name: "v-cart.vue",
        components: {
            VCartItem
        },
        computed: {
            ...mapGetters([
                'GET_CART_USER'
            ]),
            newGetCartUser() {
              // Удаляем одинаковые значения из массива
              // Вариант 1
              // return Array.from(new Set(this.GET_CART_USER))
              // Вариант2
              // return [...new Set(this.GET_CART_USER)]

              // Удаляем одинаковые объекты из массива
              // Вариант1
              // return this.GET_CART_USER.reduce((acc, cur) => [
              //   ...acc.filter((obj) => obj.arrayImagesViews !== cur.arrayImagesViews), cur
              // ], []);

              // Вариант2
              return this.GET_CART_USER.filter((obj, idx, arr) => (
                  arr.findIndex((o) => o.arrayImagesViews === obj.arrayImagesViews) === idx
              ))


            },
            cartTotalCost() {
                return this.GET_CART_USER.reduce((res, item) => res + +item.price, 0)
            },
        },
        created() {
            this.VIEW_CART_USER()
        },
        mounted() {
            setInterval(() => {
                this.date = new Date()
            }, 1000)
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_CART',
                'INCREMENT_CART_ITEM',
                'DECREMENT_CART_ITEM',
                'VIEW_CART_USER',
                'ORDER_USER'
            ]),
            async userOrder() {
                Swal.mixin({
                    cancelButtonText: 'Отмена',
                    input: 'text',
                    confirmButtonText: 'Дальше',
                    showCancelButton: true,
                    progressSteps: ['1', '2', '3', '4', '5']
                }).queue([
                    {
                        title: 'Имя:',
                        text: 'Ваше имя',
                        input: 'text',
                    },
                    {
                        title: 'Телефон:',
                        text: 'Чтобы отправить товары нам нужен номер Вашего телефона',
                        input: 'text',
                    },
                    {
                        title: 'Адресс',
                        text: 'Адресс - Область, Населенный пункт'
                    },
                    {
                        title: '№ отделения',
                        text: '№ отделения Новой Почты'
                    },
                    {
                        title: 'Дополнительно...',
                        text: 'Дополнительная информация',
                        input: 'textarea',
                    },
                ]).then((result) => {
                    if (result.value) {
                        Swal.fire({
                            title: 'Все сделано!',
                            html: `
															Ваши данные:<br />
															Имя: ${result.value[0]}<br />
															Телефон: ${result.value[1]}<br />
															Адресс: ${result.value[2]}<br />
															№ Новой Почты: ${result.value[3]}<br />
															Дополнительно: ${result.value[4]}<br />
														`,
                            confirmButtonText: 'Заказать!'
                        })
                            .then(() => {
                                let ObjectUserData = {}
                                ObjectUserData.name = result.value[0]
                                ObjectUserData.telephone = result.value[1]
                                ObjectUserData.adress = result.value[2]
                                ObjectUserData.newPost = result.value[3]
                                ObjectUserData.Addition = result.value[4]
                                ObjectUserData.ID = Date.now()
                                ObjectUserData.createdAt = new Date().toLocaleString()
                                ObjectUserData.CART = this.GET_CART_USER
                                ObjectUserData.cartTotalCost = this.cartTotalCost

                                let promises = [ObjectUserData]
                                this.ORDER_USER(promises)
                            })
                    }
                })
            },
            increment(item) {
                this.INCREMENT_CART_ITEM(item)
                    .then(() => {
                        this.VIEW_CART_USER()
                    })
            },
            decrement(item) {
                this.DECREMENT_CART_ITEM(item)
                    .then(() => {
                        this.VIEW_CART_USER()
                    })
            },
            deleteFromCart(item) {
                this.DELETE_FROM_CART(item)
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
			background: black;
			color: #ffffff;
			font-size: 20px;
		}

		.total__name {
			margin-right: $margin*2;
		}
	}
</style>