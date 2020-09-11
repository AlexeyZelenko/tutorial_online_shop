<template>
	<div class="v-catalog">

<!--		<v-notification-->
<!--				:messages='messages'-->
<!--				:timeout="3000"-->
<!--		/>-->

		<!--		ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
		<div>
			<template>
				<div
						class="text-center"
				>
					<v-btn
							v-if="!User_Entrance"
							@click="signInWithGoogle"
							color="primary" dark
							rounded
					>
						<i class="material-icons">account_circle</i> Войти через Google
					</v-btn>
					<v-btn
							v-if="User_Entrance"
							@click="logout"
					>
						Выйти
					</v-btn>
				</div>
			</template>
		</div>

		<div style="justify-content: center;">
			<router-link :to="{name: 'cart'}">
				<div class="v-catalog__link_to_cart">
					<v-btn >
						<v-chip
								class="ma-2"
								close-icon="mdi-heart"
								close
								style="background-color: #3e9538; color: white; cursor: pointer"
						>
							<v-avatar left class="darken-4" style="background-color: #0a4506;">
								{{GET_CART_USER.length}}
							</v-avatar>
							{{'Cart'|localize}}
						</v-chip>
					</v-btn>
				</div>
			</router-link>

			<v-spacer></v-spacer>
			<div
					v-if="this.User_Entrance"
					class="v-carousel-item">
				<slot>
					<img
							id="user-pic"
							:src="(getProfilePicUrl)"
							alt=""
					>
				</slot>
			</div>
			<div
					v-if="this.User_Entrance"
					id="user-name"
			>{{getUserName}}
			</div>
			<v-spacer></v-spacer>
			<div
					v-if="GET_ADMIN_ENTRANCE"
					class="v-catalog__link_to_admin"			>
						<v-btn
								class="ma-2"
								outlined
								fab
								@click="adminPlusLogin"
								style="color: #3e9538">
							<v-icon>mdi-format-list-bulleted-square</v-icon>
						</v-btn>
			</div>
		</div>
		<img
				style="max-width: 300px; max-height: 30%; padding-bottom: 10px"
				:src="require('@/assets/images/logo.png')"
				alt="">
		<v-row class="Change_categories">
				<v-select
						style="z-index: 3"
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
    // import vNotification from '../notifications/v-notification'
    import vSelect from '../v-select'
    import  firebase from 'firebase/app'

    export default {
        name: "v-catalog",
        components: {
            // vNotification,
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
            ...mapActions([
                'ADD_TO_CART',
                'VIEW_CART_USER',
                'userEntrance',
                'USER_ID_ACTIONS'
            ]),
            adminPlusLogin() {
                if(this.GET_ADMIN_ENTRANCE) {
                    this.$router.push('/admin')
								}else{
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
                    .then(() => {
                        location.reload()
                    })
            },
            productClick(article) {
                this.$router.push({name: 'product', query: {'product': article } })
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
                        // let timeStamp = Date.now().toLocaleString();
                        // this.messages.unshift(
                        //     {name: `Товар добавлен в корзину`, id: timeStamp, icon: 'check_circle'}
                        // )
                        this.VIEW_CART_USER()
                    })
            },
        },
        asyncComputed: {
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
                return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
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
						this.userEntrance()
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