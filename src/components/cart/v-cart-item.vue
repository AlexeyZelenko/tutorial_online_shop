<template>
  <v-card class="mx-auto my-12"
          max-width="900"
  >
    <div class="v-cart-item">
      <img
          v-if="cart_item_data.arrayImagesViews"
          :src="(cart_item_data.arrayImagesViews)"
          alt=""
          class="v-cart-item__image"
      >
      <div class="v-cart-item__info">

        <p>{{cart_item_data.name}}</p>
        <p>{{'Модель'}} : {{cart_item_data.model}}</p>
        <p>{{'Цвет'}} : {{cart_item_data.nameColorChange}}</p>
        <p>{{'Цена'}} : {{cart_item_data.price}} грн.</p>


        <p>{{'Артикль'}}: {{cart_item_data.article}}</p>
      </div>

      <!--		КОЛИЧЕСТВО-->
      <div class="v-cart-item__quantity">
        <p>{{'Qty:' | localize}}</p>
        <div class="text-center">
          <v-btn
              @click.stop="decrementItem"
              :loading="loading5"
              :disabled="loading5"
              class="mx-2"
              fab
              small
              style="color: black; background-color: palegreen"
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          <div>{{quantity}}</div>
          <v-btn
              @click.prevent="incrementItem"
              :loading="loading4"
              :disabled="loading4"
              class="mx-2"
              fab
              small
              style="color: black; background-color: palegreen"
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>


      </div>
      <v-btn
          depressed
          @click="deleteFromCart"
          :loading="loading"
          :disabled="loading"
          style="color: mediumvioletred;"
      >
        <v-icon dark>mdi mdi-delete-forever</v-icon>
      </v-btn>
    </div>
  </v-card>

</template>
<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "v-cart-item",
        data () {
            return {
                loader: null,
                loading: false,
                loading4: false,
                loading5: false,
            }
        },
        props: {
            cart_item_data: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
				computed: {
            ...mapGetters([
                'GET_CART_USER'
            ]),
            quantity() {
                let promises = 0
                for(let i = 0; i < this.GET_CART_USER.length; i++) {
                    if(this.cart_item_data.arrayImagesViews === this.GET_CART_USER[i].arrayImagesViews) {
                        promises++
										}
                }
                return  promises
						}
				},
        methods: {
            ...mapActions([
                'VIEW_CART_USER',
            ]),
            decrementItem() {
                this.$emit('decrement')
                this.loader = 'loading5'
            },
            incrementItem() {
                this.$emit('increment')
                this.loader = 'loading4'
            },
            deleteFromCart() {
                this.$emit('deleteFromCart')
                this.loader = 'loading'
            }
        },
        watch: {
            loader () {
                const l = this.loader
                this[l] = !this[l]

                setTimeout(() => (this[l] = false), 1000)

                this.loader = null
            },
        },
        created() {
            this.VIEW_CART_USER()
        }
    }
</script>

<style lang="scss">
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