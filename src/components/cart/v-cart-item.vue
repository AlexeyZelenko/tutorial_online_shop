<template>
  <v-card class="mx-auto"
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

        <p style="color: #6d1cb9"><strong>{{cart_item_data.name}} - {{cart_item_data.model}}</strong></p>

        <p>{{'Цвет'}} : {{cart_item_data.nameColorChange}}</p>

        <p>{{'Артикль'}}: {{cart_item_data.article}}</p>

        <div class="v-cart-item__quantity2">
          <!--        <p>{{'Qty:' | localize}}</p>-->
          <div
              class="text-center"
          >
          <span><v-btn
              @click.stop="decrementItem"
              :loading="loading5"
              :disabled="loading5"
              fab
              x-small
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn></span>
            <span class="px-4">{{quantity}}</span>
            <span><v-btn
                @click.prevent="incrementItem"
                :loading="loading4"
                :disabled="loading4"
                fab
                x-small
            >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn></span>

          </div>


        </div>
      </div>

      <!--		КОЛИЧЕСТВО-->
      <div class="v-cart-item__quantity">
<!--        <p>{{'Qty:' | localize}}</p>-->
        <div
            class="text-center"
        >
          <span><v-btn
              @click.stop="decrementItem"
              :loading="loading5"
              :disabled="loading5"
              fab
              x-small
          >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn></span>
          <span class="px-4">{{quantity}}</span>
          <span><v-btn
              @click.prevent="incrementItem"
              :loading="loading4"
              :disabled="loading4"
              fab
              x-small
          >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn></span>

        </div>


      </div>

      <h5>{{cart_item_data.price}} грн.</h5>

      <v-btn
          fab
          small
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
			max-width: 100px;
		}
    &__quantity {
      position: relative;
      text-align: center;
      border: .0625rem solid rgb(238 238 238);
      border-radius: 1.875rem;
      margin: 5px;
      display: block;
    }
    &__quantity2 {
      position: relative;
      text-align: center;
      margin: 5px;
      display: none;
    }
	}
	.custom-loader {
		animation: loader 1s infinite;
		display: flex;
	}

  @media (max-width: 560px) {
    .v-cart-item__quantity{
      display: none
    }
    .v-cart-item__quantity2{
      display: block
    }
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