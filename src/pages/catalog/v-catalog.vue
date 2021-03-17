<template>
	<div class="v-catalog">
<!--		<img-->
<!--				:src="require('@/assets/images/logo2.png')"-->
<!--				alt=""-->
<!--				style="max-width: 300px; max-height: 30%; padding-bottom: 10px">-->
		<v-row class="Change_categories">
			<v-select
					:options="categories"
					:selected="selected"
					@select="sortByCategories"
					style="z-index: 3; margin: 7px 0 7px"
			/>
		</v-row>
		<div class="v-catalog__list">
			<vCatalogItem
					:index="i"
					:key="product.article"
					:observer="observer"
					:product_data="product"
					@addToCart="addToCart"
					@productClick="productClick"
					v-for="(product, i) in filteredProducts"
			/>
		</div>
	</div>
</template>

<script>
    // const vSelect = () => import('../v-select')
    const vCatalogItem = () => ({
        component: import("../../components/catalog/v-catalog-item"),
        // loading: AwesomeSpinner,//после задержки по умолчанию в 200 мс будет показан компонент AwesomeSpinner
        // delay: 500 //настроить задержку AwesomeSpinner
        // error: SadFaceComponent // компонент ошибки
        // timeout: 5000 //если через 5000 миллисекунд компонент не загрузился, будет показан компонент ошибки.
    })
    import {mapActions, mapGetters} from 'vuex'
    import firebase from 'firebase/app'

    export default {
        name: "v-catalog",
        components: {
            vCatalogItem,
            vSelect: () => import('../../components/v-select'),
        },
        data() {
            return {
                placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
                observer: null,
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
            ...mapActions([
                'ADD_TO_CART',
                'VIEW_CART_USER',
                'userEntrance',
                'USER_ID_ACTIONS'
            ]),
            onElementObserved(entries) {
                entries.forEach(({target, isIntersecting}) => {
                    if (!isIntersecting) {
                        return;
                    }
                    this.observer.unobserve(target);

                    setTimeout(() => {
                        const i = target.getAttribute("data-index");
                        this.filteredProducts[i].seen = true;
                        target.src = this.filteredProducts[i].arrayImages[0]

                        target.onload = () => {
                            target.parentNode.classList.remove('loading');
                        };
                    })
                });
            },
            adminPlusLogin() {
                if (this.GET_ADMIN_ENTRANCE) {
                    this.$router.push('/admin')
                } else {
                    this.$router.push('/login')
                }
            },
            async signInWithGoogle() {
                try {
                    await this.$store.dispatch('signInWithGoogle')
                    this.VIEW_CART_USER()
                } catch (e) {
                    console.log('Ошибка входа Google')
                }
            },
            async logout() {
                await this.$store.dispatch('logout')
            },
            productClick(article) {
                this.$router.push({name: 'product', query: {'product': article}})
            },
            sortByCategories(category) {
                this.sortedProducts = [];
                this.PRODUCTS.map((item) => {
                    if (item.category === category.name) {
                        this.sortedProducts.push(item);
                    }
                })
                this.selected = category.name
            },
            addToCart(data) {
                this.ADD_TO_CART(data)
                    .then(() => {
                        this.VIEW_CART_USER()
                    })
            },
        },
        asyncComputed: {},
        created() {
            this.userEntrance()
            this.observer = new IntersectionObserver(
                this.onElementObserved,
                {
                    root: this.$el,
                    threshold: 0.5,
                }
            );
        },
        beforeDestroy() {
            this.observer.disconnect();
        },
        computed: {
            ...mapGetters([
                'PRODUCTS',
                'GET_CART_USER',
                'User_Entrance',
                'USER_ID',
                'GET_ADMIN_ENTRANCE'
            ]),
            getUserName() {
                return firebase.auth().currentUser.displayName;
            },
            getProfilePicUrl() {
                return firebase.auth().currentUser.photoURL || '@/assets/images/profile_placeholder.png';
            },
            filteredProducts() {
                if (this.sortedProducts.length) {
                    return this.sortedProducts
                } else {
                    return this.PRODUCTS
                }
            }
        },
        mounted() {
            this.VIEW_CART_USER()
            this.USER_ID_ACTIONS()
        }
    }
</script>

<style lang="scss">
	.v-catalog {
		&__list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
      background-color: #0e0e0e;
		}

		&__link_to_cart {
			top: 5px;
			right: 3px;
		}

		&__link_to_admin {
			top: 5px;
			left: 3px;
			border: thick #0a4506;
		}
	}

	.Change_categories {
		padding-bottom: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	#user-pic {
		top: -3px;
		position: relative;
		display: inline-block;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
		background-size: 40px;
		border-radius: 20px;
	}

	#user-name {
		font-size: 15px;
		line-height: normal;
		padding-right: 5px;
		padding-left: 5px;
	}
</style>