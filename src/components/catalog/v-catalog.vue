<template>
	<div class="v-catalog">
		<v-notification
				:messages='messages'
				:timeout="4000"
		/>
		<router-link :to="{name: 'cart', params: {cart_data: CART}}">
					<div class="v-catalog__link_to_cart">
						<v-btn >
						<v-chip
								class="ma-2"
								close-icon="mdi-heart"
								close
								style="background-color: #3e9538; color: white; cursor: pointer"
						>
							<v-avatar left class="darken-4" style="background-color: #0a4506;">
								{{CART.length}}
							</v-avatar>
							{{'Cart'|localize}}
						</v-chip>
						</v-btn>
			</div>
		</router-link>
		<router-link :to="{name: 'login', params: {cart_data: CART}}">
			<div class="v-catalog__link_to_admin">
				<v-btn class="ma-2" outlined fab style="color: #3e9538">
					<v-icon>mdi-format-list-bulleted-square</v-icon>
				</v-btn>
			</div>
		</router-link>
		<h1>{{'Catalog' | localize}}</h1>
		<v-row class="Change_categories">
				<v-select
						style="z-index: 100"
						:selected="selected"
						:options="categories"
						@select="sortByCategories"
				/>
		</v-row>
		<div class="v-catalog__list">
			<vCatalogItem
					v-for="product in filteredProducts"
					:key="product.article"
					:product_data="product"
					@addToCart="addToCart"
					@productClick="productClick"
			/>
		</div>
	</div>
</template>

<script>
    import vCatalogItem from './v-catalog-item'
    import {mapActions, mapGetters} from 'vuex'
    import vNotification from '../notifications/v-notification'
    import vSelect from '../v-select'

    export default {
        name: "v-catalog",
        components: {
            vNotification,
            vCatalogItem,
            vSelect
        },
        data() {
            return {
                categories: [
                    {name: 'Все', value: 'All'},
                    {name: 'Ветровки', value: 'Windbreaker'},
                    {name: 'Пальто', value: 'Coat'},
                    {name: 'Плащи', value: 'Raincoats'},
                    {name: 'Джинсы', value: 'Jeans'},
                    {name: 'Брюки', value: 'Pants'},
                    {name: 'Кофты', value: 'Sweatshirts'},
                    {name: 'Футболки', value: 'T-shirts'},
                    {name: 'Рубашки', value: 'Shirts'},
                    {name: 'Блузки', value: 'Blouses'},
                    {name: 'Платья', value: 'Dresses'},
                    {name: 'Костюмы', value: 'Costumes'},
                    {name: 'Куртки', value: 'Jackets'},
                ],
                selected: 'Категории',
                sortedProducts: [],
                minPrice: 0,
                maxPrice: 1000,
                messages: []
            }
        },
        methods: {
            productClick(article) {
                this.$router.push({name: 'product', query: {'product': article } })
            },
            sortByCategories(category) {
                this.sortedProducts = [];
                let vm = this;
                this.PRODUCTS.map(function (item) {
                    if (item.category === category.name) {
                        vm.sortedProducts.push(item);
                    }
                })
                this.selected = category.name
            },
            ...mapActions([
                'ADD_TO_CART',
								'bindLocationsRef'
            ]),
            addToCart(data) {
                this.ADD_TO_CART(data)
                    .then(() => {
                        let timeStamp = Date.now().toLocaleString();
                        this.messages.unshift(
                            {name: `Товар доданий у кошик`, id: timeStamp, icon: 'check_circle'}
                        )
                    })
            },
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'CART',
            ]),
            filteredProducts() {
                if (this.sortedProducts.length) {
                    return this.sortedProducts

                } else {
                    return this.PRODUCTS
                }
            }
        },
				mounted() {
            this.bindLocationsRef()
        }
    }
</script>

<style lang="scss">
	.v-catalog {
		&__list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
		}

		&__link_to_cart {
			position: absolute;
			top: 5px;
			right: 3px;
			padding: $padding;
		}

		&__link_to_admin {
			position: absolute;
			top: 5px;
			left: 3px;
			padding: $padding;
			border: thick #0a4506;
		}
	}
	.Change_categories {
		padding-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>