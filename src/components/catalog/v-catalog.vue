<template>
	<div class="v-catalog">

		<v-notification
				:messages='messages'
				:timeout="4000"
		/>
		<router-link :to="{name: 'cart', params: {cart_data: CART}}">
			<div class="v-catalog__link_to_cart">
				<div><i class="material-icons" >redeem</i></div>
				<p>{{CART.length}}</p>
			</div>
		</router-link>

		<router-link :to="{name: 'admin', params: {cart_data: CART}}">
			<div class="v-catalog__link_to_admin">
				<span class="material-icons">
					line_weight
				</span>
			</div>
		</router-link>

		<h1>{{'Catalog' | localize}}</h1>
		<v-select
				:selected="selected"
				:options="categories"
				@select="sortByCategories"
		/>
		<div class="v-catalog__list">
			<vCatalogItem
					v-for="product in filteredProducts"
					:key="product.article"
					:product_data="product"
					@addToCart="addToCart"
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
        props: {},
        data() {
            return {
                categories: [
                    {name: 'ALL', value: 'all'},
                    {name: 'Man', value: 'м'},
                    {name: 'Woman', value: 'ж'},
                ],
                selected: 'Categories',
                sortedProducts: [],
                minPrice: 0,
                maxPrice: 1000,
                messages: []
            }
        },
        methods: {
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
            ]),
            addToCart(data) {
                this.ADD_TO_CART(data)
                    .then(() => {
                        let timeStamp = Date.now().toLocaleString();
                        this.messages.unshift(
                            {name: `Product added to cart`, id: timeStamp, icon: 'check_circle'}
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
        watch: {},
    }
</script>

<style lang="scss">
	.v-catalog {
		&__list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
			align-items: center;
		}

		&__link_to_cart {
			position: absolute;
			top: 10px;
			right: 10px;
			padding: $padding*2;
			border: thick double #4bbd2c;
		}

		&__link_to_admin {
			position: absolute;
			top: 10px;
			left: 10px;
			padding: $padding*2;
			border: thick #0a4506;
		}
	}
</style>