<template>
	<div class="v-catalog">

		<v-notification
				:messages='messages'
				:timeout="4000"
		/>
		<router-link :to="{name: 'cart', params: {cart_data: CART}}">
			<div class="v-catalog__link_to_cart">
				<span>{{'Cart' | localize}} : {{CART.length}}</span>
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
                    {name: 'Все', value: 'All'},
                    {name: 'Мужские', value: 'м'},
                    {name: 'Женские', value: 'ж'},
                ],
                selected: 'Все',
                sortedProducts: [],
                minPrice: 0,
                maxPrice: 1000,
                messages: []
            }
        },
        // firestore() {
        //     return {
        //         message: db.collection('/products'),
        //     }
        // },
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
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
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
        mounted() {
            this.GET_PRODUCTS_FROM_API()
                .then((response) => {
                    if (response.data) {
                        console.log('Data arrived!')
                    }
                })
            // this.$set(this.product_data, 'quantity', 1)
        }
    }
</script>

<style lang="scss">
	.v-catalog {
		&__list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
		}

		&__link_to_cart {
			position: absolute;
			top: 10px;
			right: 10px;
			padding: $padding*2;
			border: solid 1px #2c3e50;
		}
	}
</style>