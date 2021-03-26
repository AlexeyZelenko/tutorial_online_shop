<template>
	<div class="z-product-information">

		<template>
			<v-btn
          class="main-color-btn"
					:to="{name: 'catalog'}"
					block
					style="background-color: black; color: #ecfcf0; margin-bottom: 19px"
			>
				<v-icon dark left>mdi-arrow-left</v-icon>Каталог товаров
			</v-btn>
      <span >{{product.category}} > {{product.name}} > {{this.selectcolor}} > {{this.selectmodel}}</span>
		</template>

    <template>

      <v-card>
        <v-fab-transition>
          <v-btn
              :key="activeFab.icon"
              :color="activeFab.color"
              fab
              large
              dark
              top
              right
              absolute
              class="v-btn--example"
              @click="goToCard"
          >
            <v-icon>{{ activeFab.icon }}</v-icon>
          </v-btn>
        </v-fab-transition>
        <v-toolbar
            color="purple"
            dark
            flat
        >
          <h3>{{product.name}}</h3>
          <template
              v-slot:extension
          >

            <v-tabs
                v-model="tabs"
                centered
            >
              <v-tab
                  v-for="n in arrayTabs"
                  :key="n.id"
              >
                {{ n.name }}
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="tabs">
<!--          Все про товар-->
          <v-tab-item>
            <v-card
                flat
                class="my-4"
            >
              <v-card-text>
                <v-row align="center">
                  <v-col
                      class="display-3"
                      cols="12"
                      md="6"
                  >
                    <v-carousel
                        :carousel_data="arrayImagesViews"
                    />
<!--                    <v-carousel-->
<!--                        v-if="product.arrayImages2"-->
<!--                        :carousel_data="product.arrayImages2"-->
<!--                    />-->
                  </v-col>
                  <v-col
                      cols="12"
                      md="6"
                  >
                    <div>

                      <v-list
                          class="transparent"
                      >
                        <v-list-item>
                          <v-list-item-title>
                            <!--Цвета-->
                            <v-card
                                style="background-color: whitesmoke; margin: 10px"
                            >
                              <p>Доступные цвета:</p>
                              <v-item-group mandatory>
                                <v-container>
                                  <v-row>
                                    <v-col
                                        v-for="(n, index) in product.arrayColor"
                                        :key="index"
                                        cols="6"
                                        md="2"
                                    >
                                      <div
                                      >
                                        <p>{{product.nameColor}}</p>
                                      </div>
                                      <v-item v-slot="{ active, toggle }">
                                        <v-card
                                            :color="n"
                                            class="d-flex align-center"
                                            height="30"
                                            width="30"
                                            @click="selectColor(index); toggle()"
                                        >

                                          <v-scroll-y-transition>
                                            <div
                                                v-if="active"
                                                class="display-3 flex-grow-1 text-center"
                                            >
                                              <v-icon style="color: darkgreen">
                                                {{ active ? 'mdi-check' : '' }}
                                              </v-icon>
                                            </div>
                                          </v-scroll-y-transition>
                                        </v-card>
                                      </v-item>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-item-group>
                            </v-card>
                          </v-list-item-title>

                          <v-list-item-subtitle>
                            <!--Модель-->
                            <v-card
                                style="background-color: whitesmoke; margin: 10px"
                            >
                              <p>Модель:</p>
                              <v-item-group mandatory>
                                <v-container>
                                  <v-row>
                                    <v-col
                                        v-for="n in product.arrayModel"
                                        :key="n"
                                        cols="6"
                                        md="4"
                                    >
                                      <v-item v-slot="{ active, toggle }">
                                        <v-card
                                            :color="active ? 'primary' : ''"
                                            class="d-flex text-center"
                                            height="30"
                                            width="50"
                                            @click="selectModel(n); toggle()"
                                        >
                                          <v-scroll-y-transition>
                                            <div
                                                class="display-1 flex-grow-1 text-center ma-2"
                                            >
                                              <p
                                                  style="font-size: 14px"
                                              >{{n}}</p>
                                            </div>

                                          </v-scroll-y-transition>
                                        </v-card>
                                      </v-item>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-item-group>
                            </v-card>
                          </v-list-item-subtitle>
                        </v-list-item>
                      </v-list>

                      <h4
                          style="text-decoration: line-through; color: orangered"
                      >
                        {{product.price2}} грн
                      </h4>
                      <h3>{{product.price}} грн</h3>

                      <img
                          style="height: 50px"
                          src="@/assets/images/authorised.png"
                          alt=""
                      >

<!--                      Наличие товара-->
                      <div>
                        <v-btn
                            v-if="product.presence"
                            class="ma-2"
                            x-small
                            color="teal"
                            rounded
                            dark
                        >
                          В наличии
                          <v-icon
                              dark
                              right
                          >
                            mdi-checkbox-marked-circle
                          </v-icon>
                        </v-btn>

                        <v-btn
                            v-if="!product.presence"
                            class="ma-2"
                            color="red"
                            x-small
                            rounded
                            dark
                        >
                          Отсутствует
                          <v-icon
                              dark
                              right
                          >
                            mdi-cancel
                          </v-icon>
                        </v-btn>
                      </div>


                      <p>{{"Descriptions" | localize}}:</p>
                      <p v-html="product.description"></p>

                      <p>Артикль товара: {{product.article}}</p>
                      <div class="text-center">
                        <v-chip
                            class="ma-2"
                            style="background-color: goldenrod; color:white"
                            text-color="white"
                            v-if="product.newProduct"
                        >
                          НОВИНКА!
                          <v-icon right style="color: white">mdi-star</v-icon>
                        </v-chip>
                        <!--					СКИДКА-->
                        <v-chip
                            class="v_catalog_item_new" style="background-color: #da207d; color:white"
                            text-color="white"
                            v-if="product.promotionalPrice"
                        >
                          {{"Promotional Price" | localize}} !!!
                        </v-chip>
                      </div>

                      <button
                          @click="addToCart"
                          class="v-catalog_item_add_cart_btn btn"
                          style="margin-top: 20px"
                      >
                        {{'Add to cart' | localize}}
                      </button>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-tab-item>


<!--          Фото-->
          <v-tab-item>
            <v-card flat>
              <v-card-title class="headline">
                {{product.name}}
              </v-card-title>
              <v-carousel
                  :carousel_data="product.arrayImages"
              />
            </v-card>
          </v-tab-item>


<!--          Задать вопрос-->
          <v-tab-item>
            <v-card
                max-width="375"
                class="mx-auto"
            >
              <v-card-title>
                <div class="display-1 pl-12 pt-12">
                  Наши контакты:
                </div>
              </v-card-title>

              <v-list two-line>
                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-phone
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>+38 063 69 10 177</v-list-item-title>
                    <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-icon>
                    <v-icon>mdi-message-text</v-icon>
                  </v-list-item-icon>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-email
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>aliconnors@example.com</v-list-item-title>
                    <v-list-item-subtitle>Администратор</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-divider inset></v-divider>

                <v-list-item>
                  <v-list-item-icon>
                    <v-icon color="indigo">
                      mdi-telegram
                    </v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>Timoxa</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-tab-item>

        </v-tabs-items>

      </v-card>
    </template>

    <RandomProducts/>

	</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    const vCarousel = () => import('@/components/v-carousel')
    const RandomProducts = () => import('@/components/RandomProducts')

    export default {
        name: "zProductInformation",
        data: () => ({
          arrayImagesViews: [],
          fab: false,
          hidden: false,
          selectmodel: '',
          selectcolor: '',
          arrayTabs: [
            {
              id: 1,
              name: 'Все о товаре',
            },
            {
              id: 2,
              name: 'Фото',
            },
            {
              id: 3,
              name: 'Задать вопрос',
            }
          ],
          tabs: null,
        }),
        components: {
            vCarousel,
            RandomProducts
        },
        methods: {
            ...mapActions([
                'ADD_TO_CART',
                'bindLocationsRef'
            ]),
            goToCard () {
              this.$router.push({name: 'cart'})
            },
            async selectColor(index) {

              if (index === 0) {
                this.arrayImagesViews = this.product.arrayImages;
              }
              else if (index === 1) {
                this.arrayImagesViews = this.product.arrayImages2;
              }
              else if (index === 2) {
                this.arrayImagesViews = this.product.arrayImages3;
              }
              else if (index === 3) {
                this.arrayImagesViews = this.product.arrayImages4;
              } else {
               this.arrayImagesViews = await this.product.arrayImages;
              }
                this.selectcolor = index
            },
            selectModel(n) {
              console.log(n)
              this.selectmodel = n
            },
            addToCart() {
                this.ADD_TO_CART(this.product)
            },
        },
        computed: {
            ...mapGetters([
                'GET_PRODUCT_FROM_DB'
            ]),
            activeFab () {
              switch (this.tabs) {
                case 0: return { color: 'success', icon: 'mdi-cart' }
                case 1: return { color: 'indigo', icon: 'mdi-cart' }
                case 2: return { color: 'primary', icon: 'mdi-share-variant' }
                default: return {
                  color: 'success', icon: 'mdi-share-variant'
                }
              }
            },
            product() {
                let result = {}
                this.GET_PRODUCT_FROM_DB.map((item) =>  {
                    if (+item.article === +this.$route.query.product) {
                        result = item;
                    }
                })
                return result;
            },
        },
        mounted() {
          const index = 0;
          this.selectColor(index)
        }
    }
</script>

<style lang="scss">
#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
.z-product-information {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: $padding*2;
  margin-bottom: $margin*2;
}
</style>