<template>
	<div class="v-catalog" :class="GET_NAME_Brand_Product">
		<div
        class="v-catalog__list"
    >
			<vCatalogItem
					:index="index"
          v-for="(product, index) in filteredProducts"
					:key="product.id"
					:observer="observer"
					:product_data="product"
					@addToCart="addToCart"
					@productClick="productClick"
			/>
		</div>
	</div>
</template>

<script>
    const vCatalogItem = () => ({
        component: import("../../components/catalog/v-catalog-item"),
    })
    import {mapActions, mapGetters} from 'vuex'
    import firebase from 'firebase/app'

    export default {
        name: "v-catalog",
        components: {
            vCatalogItem,
        },
        data() {
            return {
                bgColour: 'black',
                observer: null,
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
                        target.src = this.filteredProducts[i].arrayImages1[0]

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
            productClick(id) {
                this.$router.push({name: 'product', query: {'product': id}})
            },
            addToCart(data) {
                this.ADD_TO_CART(data)
                    .then(() => {
                        this.VIEW_CART_USER()
                    })
            },
        },
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
                'GET_SORTED_PRODUCTS',
                'GET_CART_USER',
                'User_Entrance',
                'USER_ID',
                'GET_ADMIN_ENTRANCE',
                'GET_NAME_Brand_Product'
            ]),
            getUserName() {
                return firebase.auth().currentUser.displayName;
            },
            getProfilePicUrl() {
                return firebase.auth().currentUser.photoURL || '@/assets/images/profile_placeholder.png';
            },
            filteredProducts() {
              return this.GET_SORTED_PRODUCTS
            }
        },
        watch: {    // отслеживание свойства автоматически реагирует на любое его изменение
        colorBg(newValue) {
            this.document.body.style.backgroundColor = newValue;
          }
        },
        mounted() {
            this.VIEW_CART_USER()
            this.USER_ID_ACTIONS()
        }
    }
</script>

<style lang="scss">
.Samsung {
  background-color: blue;
  background-image: url('https://firebasestorage.googleapis.com/v0/b/online-shop-34af2.appspot.com/o/assets%2Fimages%2Fouterspace-58.gif?alt=media&token=a84f98ef-0b93-4547-831c-d4e3fd7ec3b8');
  background-size: cover;
  background-position: 0 0;
  background-repeat: no-repeat;
}

.Google {
  background-image: url('https://firebasestorage.googleapis.com/v0/b/online-shop-34af2.appspot.com/o/assets%2Fimages%2F96fcf270f6dd86f1ab74174488c9a927.gif?alt=media&token=7fe91c5c-f18e-446f-9a1f-278ffec9dfb7');
  background-size: cover;
  background-position: 0 0;
  background-repeat: no-repeat;
}

.Xiaomi {
  background-color: green;
}
.Apple {
  background-color: black;
}
	.v-catalog {
		&__list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-evenly;
      //background-color: #0e0e0e;

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