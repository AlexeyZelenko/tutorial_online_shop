<template>
	<div class="">
		<template>
			<v-data-table
					:headers="headers"
					:items="sortListOrder"
					:items-per-page="5"
					class="elevation-1"
					disable-sort
			>
				<template v-slot:item.description="{ item }">
					<v-chip
							v-for="i in item.CART"
							:key="i.id"
							@click="productClick(i.article)"
					>
						<v-badge
								color="green"
								content="1"
								overlap
								style="padding-left: 10px"
						>
							{{i.article}}
						</v-badge>

					</v-chip>
				</template>
				<template v-slot:item.cartTotalCost="{ item }">
					<v-chip
							:color="getColor(item.cartTotalCost)"
							dark
					>
						{{ item.cartTotalCost }}
					</v-chip>
				</template>
			</v-data-table>
		</template>
	</div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: "zOrders",
        data: () => ({
            headers: [
                {
                    text: 'Имя (Покупателя)',
                    align: 'start',
                    sortable: false,
                    value: 'name',
                },
                { text: 'Телефон', value: 'telephon' },
                { text: '', value: '' },
                { text: 'Адресс', value: 'adress' },
                { text: '', value: '' },
                { text: '№ отделения Новой Почты', value: 'newPost' },
                { text: '', value: '' },
                { text: 'Список товаров',	value: `description`},
                { text: '', value: '' },
                { text: 'Общая сумма', value: 'cartTotalCost'},
                { text: '====================', value: '' },
            ],
        }),
        methods: {
            ...mapActions([
                'LIST_ORDERS_USERS',
            ]),
            // newGetOrderUser(item) {
            //     console.log(item)
            //     const a = [...new Set(item.article)]
            //     console.log(a)
						// 		return a
            // },
            productClick(article) {
                this.$router.push({name: 'information-order', query: {'product': article } })
            },
            getColor(cartTotalCost) {
                if (cartTotalCost < 500) return 'red'
                else if (cartTotalCost > 500) return 'orange'
                else if (cartTotalCost > 1000) return 'cyan'
                else if (cartTotalCost > 2000) return 'yellow'
                else if (cartTotalCost > 3000) return 'grey'
                else return 'green'
            },
				},
        computed: {
            ...mapGetters([
								'GET_LIST_ORDER_USERS'
            ]),
            // quantity() {
            //     let promises = 0
            //     for(let i = 0; i < this.GET_CART_USER.length; i++) {
            //         if(this.cart_item_data.article === this.GET_CART_USER[i].article) {
            //             promises++
            //         }
            //     }
            //     return  promises
            // },
						sortListOrder() {
                return this.GET_LIST_ORDER_USERS.map(item => item[0])
						}
        },
				mounted() {
            this.LIST_ORDERS_USERS()
        },
        watch: {},
        props: {},
    }
</script>

<style scoped>

</style>