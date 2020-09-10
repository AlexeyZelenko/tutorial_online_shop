<template>
	<div class="">
		<v-btn
				color="primary"
				dark
				@click="reloadWindow"
		>
			Обновить список заказов
		</v-btn>

		<!--		ПОИСК-->
		<v-text-field
				append-icon="mdi-magnify"
				hide-details
				label="Поиск"
				single-line
				v-model="search"
				style="margin: 10px 0 5px 0"
		></v-text-field>
		<template>
			<v-data-table
					:headers="headers"
					:sort-by="['createdAt']"
					:sort-desc="[false, true]"
					multi-sort
					:items="GET_LIST_ORDER_USERS"
					:search="search"
					:items-per-page="5"
					class="elevation-1"
			>
				<template v-slot:item.description="{ item }">
					<v-chip
					>
						<div class="text-center">
							<v-btn
									:to="{name: 'order-description', params: { products: item.CART }}"
									rounded color="primary"
									dark
							>
								Показать
							</v-btn>
						</div>
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
            search: '',
            headers: [
                { text: 'Дата создания', value: 'createdAt' },
                {
                    text: 'Номер заказа',
                    align: 'start',
                    sortable: false,
                    value: 'ID',
                },
                { text: 'Имя (Покупателя)', value: 'name' },
                { text: 'Телефон', value: 'telephone' },
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
				components: {
				},
        methods: {
            ...mapActions([
                'LIST_ORDERS_USERS',
            ]),
            reloadWindow() {
                this.LIST_ORDERS_USERS()
						},
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
        },
				mounted() {
            this.LIST_ORDERS_USERS()
        },
    }
</script>

<style scoped>

</style>