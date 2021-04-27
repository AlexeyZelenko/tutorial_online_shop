<template>
	<div class="z-product-information">

		<template>
			<v-btn
          class="main-color-btn"
					:to="{name: 'catalog'}"
					block
					style="background-color: black; color: #ecfcf0"
			>
				<v-icon dark left>mdi-arrow-left</v-icon>Каталог товаров
			</v-btn>
		</template>

    <v-card>
      <v-toolbar
          max-height="100"
          flat
          class="mdl-color--blue-grey-50"
      >


        <v-card-title left>
          <p class="name_card_title">{{product.name}} {{nameColorChange}} {{model}}</p>
        </v-card-title>

        <template
            v-slot:extension
        >
          <v-tabs
              left
              v-model="tabs"
          >
            <v-tab
                v-for="n in arrayTabs"
                :key="n.id"
            >
              <p class="nameTab">{{ n.name }}</p>
            </v-tab>
          </v-tabs>
        </template>

      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <!--          Все про товар-->
        <v-tab-item>
          <v-card
              class="main-color"
              flat
          >
            <v-card-text>
              <v-row align-start>
                <v-col
                    cols="12"
                    md="6"
                >
                  <CarouselProduct
                      :arrayImagesViews="arrayImagesViews"
                  />

                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                  <v-container
                      class="mx-auto"
                  >
                    <v-row align-start>
                      <v-col
                          cols="12"
                          md="6"
                      >
                        <!--Цвета-->
                        <v-list-item>
                          <v-container
                              class="d-flex justify-start"
                              v-if="product.arrayColor && product.arrayColor.length > 0"
                          >
                            <v-item-group>
                              <v-container>
                                <span>Цвет : </span><span style="color: grey">{{nameColorChange}}</span>
                                <v-row class="py-3">
                                  <v-col
                                      v-for="(n, index) in product.arrayColor"
                                      :key="index"
                                      cols="3"
                                      class="px-2"
                                  >
                                    <v-item
                                        class="mr-3"
                                        v-slot="{ active, toggle }"
                                    >
                                      <v-container left>
                                        <v-btn
                                            @click="selectColor(index, n); toggle()"
                                            :color="n"
                                            class="mx-12"
                                            dark
                                            icon
                                        >
                                          <v-scroll-y-transition>
                                            <div
                                                v-if="active"
                                                class="display-1 flex-grow-1 text-center"
                                            >
                                              <v-icon
                                                  v-if="nameBrand === 'Apple'"
                                                  style="color: darkgreen; padding: 0 25px 40px 0px; transform: rotateY(180deg)"
                                              >
                                                {{ active ? 'mdi-leaf' : '' }}
                                              </v-icon>
                                              <v-icon
                                                  v-else
                                                  style="color: darkgreen; padding: 0 25px 40px 0px; transform: rotateY(180deg)"
                                              >
                                                {{ active ? 'mdi-check' : '' }}
                                              </v-icon>
                                            </div>
                                          </v-scroll-y-transition>
                                          <v-icon
                                              v-if="nameBrand === 'Apple'"
                                              style="text-shadow: 1px 2px 10px #373434"
                                              size="36px"
                                          >
                                            mdi-apple
                                          </v-icon>
                                          <v-icon
                                              v-else-if="nameBrand === 'Google'"
                                              style="text-shadow: 1px 2px 10px #373434"
                                              size="36px"
                                          >
                                            mdi-google
                                          </v-icon>
                                          <v-icon
                                              v-else
                                              style="text-shadow: 1px 2px 10px #373434"
                                              size="36px"
                                          >
                                            mdi-opacity
                                          </v-icon>
                                        </v-btn>
                                      </v-container>

                                    </v-item>
                                  </v-col>
                                </v-row >
                              </v-container>
                            </v-item-group>
                          </v-container>
                        </v-list-item>
                      </v-col>
                      <v-col
                          cols="12"
                          md="6"
                      >
                        <!--Модель-->
                        <v-container
                            v-if="product.arrayModel && product.arrayModel.length > 0"
                            class="d-flex justify-start"
                        >
                          <v-item-group mandatory>
                            <v-container>
                              <v-list
                                  class="main-color"
                                  dense
                              >
                                <v-subheader><strong>МОДЕЛЬ :</strong></v-subheader>
                                <v-list-item-group
                                    v-model="selectedItem"
                                    color="primary"
                                >
                                  <v-list-item
                                      v-for="(n, index) in product.arrayModel"
                                      :key="index"
                                  >
                                    <v-list-item-icon v-if="selectedItem === index">
                                      <v-icon color="green">mdi-check</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content @click="selectModel(index, n)">
                                      <v-list-item-title>
                                        {{n}}
                                      </v-list-item-title>
                                    </v-list-item-content>
                                  </v-list-item>
                                </v-list-item-group>
                              </v-list>
                            </v-container>
                          </v-item-group>
                        </v-container>
                      </v-col>
                    </v-row>
                    <v-list
                        class="transparent" >


                      <!--                      Наличие товара-->
                      <v-list-item>
                        <v-container
                            class="d-flex align-stretch"
                        >
                          <v-btn
                              v-if="product.presence"
                              class="ma-2"
                              small
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
                              small
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
                        </v-container>
                      </v-list-item>

                    </v-list>

                    <v-list-item>
                      <v-list-item-content>
                        <v-card
                            outlined
                            class="main-color"
                        >
                          <h4
                              v-if="price2"
                              style="text-decoration: line-through; color: orangered"
                          >
                            {{price2.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}} грн
                          </h4>
                          <h3>{{price.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}} грн</h3>
                        </v-card>

                      </v-list-item-content>
                    </v-list-item>

                    <img
                        v-if="nameBrand === 'Apple'"
                        style="height: 50px"
                        src="@/assets/images/authorised.png"
                        alt=""
                    >

<!--                    Иконки-->
<!--                    <v-row>-->
<!--                      <v-col-->
<!--                          align-center-->
<!--                          cols="6"-->
<!--                          sm="3"-->
<!--                          md="3"-->
<!--                          xs="3"-->
<!--                          v-for="item in arrayIcon"-->
<!--                          :key="item.id"-->
<!--                      >-->
<!--                        <v-list-item>-->
<!--                          <v-list-item-content justify-center>-->
<!--                            <v-img-->
<!--                                class="mx-auto"-->
<!--                                style="max-width: 150px"-->
<!--                                :src="require(`@/assets/icons/group1/${item.id}.png`)"-->
<!--                                alt=""-->
<!--                            ></v-img>-->
<!--                          </v-list-item-content>-->

<!--                        </v-list-item>-->
<!--                      </v-col>-->
<!--                    </v-row>-->


                    <v-list-item>
                      <v-list-item-content>
                        <v-card
                            class="py-2 main-color"
                        >

                          <span>Цвет : </span>
                          <v-btn
                              v-if="selectcolor2"
                              class="mx-2"
                              fab
                              x-small
                              :color="selectcolor2"
                          ></v-btn>
                          <span
                              :color="selectcolor2"
                          >
                              {{nameColorChange}}
                            </span>


                          <p v-html="product.description"></p>


                          <div class="text-center">
                            <!--                      Новинка-->
                            <v-chip
                                class="ma-2"
                                style="background-color: goldenrod; color:white; max-width: 150px"
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
                        </v-card>

                      </v-list-item-content>
                    </v-list-item>

                    <button
                        @click="addToCart"
                        class="v-catalog_item_add_cart_btn btn"
                        style="margin-top: 20px"
                    >
                      {{'Add to cart' | localize}}
                    </button>
                  </v-container>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>


        <!--          Фото-->
        <v-tab-item>
          <CarouselProductDetails
              :arrayImagesViews="arrayImagesViews"
          />
        </v-tab-item>


        <!--          Задать вопрос-->
        <v-tab-item class="py-4">
          <v-card
              class="mdl-color--blue-grey-50 mx-auto"
              max-width="375"
          >
            <v-card-title>
              <div class="display-1 pl-12 pt-12" v-text="Our_contacts"></div>
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

    <!--    Диалог-вы добавили в корзину-->
    <template>
      <v-row justify="center">

        <v-dialog
            v-model="dialog"
            max-width="350"
            persistent
        >
          <v-card>
            <v-card-title class="headline">
              Вы добавили  в корзину:
            </v-card-title>

            <ProductModal
                :product_data="product_modal"
                :key="product_modal.id"
                :observer="true"
            />

            <v-card-actions>
              <v-btn
                  small
                  outlined
                  color="indigo"
                  @click="dialogFalse"
              >
                продолжить покупки
              </v-btn>

              <v-btn
                  small
                  outlined
                  color="teal"
                  @click="goToCard()"
              >
                корзина
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>

    <RandomProducts/>

    <v-snackbar
        v-model="snackbar"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
        v-model="snackbar2"
    >
      {{ text2 }}

      <template v-slot:action="{ attrs }">
        <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="snackbar2 = false"
        >
          Закрыть
        </v-btn>
      </template>
    </v-snackbar>


	</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    // const vCarousel = () => import('@/components/v-carousel')
    const CarouselProduct = () => import('@/components/carousels/CarouselProduct')
    const CarouselProductDetails = () => import('@/components/carousels/CarouselProductDetails')
    const RandomProducts = () => import('@/components/RandomProducts')
    const ProductModal = () => ({
      component: import("../../components/catalog/product-modal-cart"),
    })

    export default {
        name: "zProductInformation",
        data: () => ({
          product_modal: {},
          selectedItem: 0,
          dialog: false,
          Our_contacts: 'Контакты:',
          loading: false,
          snackbar: false,
          snackbar2: false,
          text: `Выберите модель.`,
          text2: `Выберите цвет.`,
          arrayPriceViews: [],
          fab: false,
          hidden: false,
          selectmodel: '',
          selectcolor: '',
          selectcolor2: '',
          arrayIcon: [
              {
                id: 1,
                title: 'Только оригинальные модели из США'
              },
              {
                id: 2,
                title: ''
              },
              {
                id: 3,
                title: ''
              },
              {
                id: 4,
                title: ''
              },
          ],
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
          indexColor: 0,
          indexModel: 0
        }),
        components: {
            // vCarousel,
            RandomProducts,
            CarouselProduct,
            CarouselProductDetails,
            ProductModal
        },
        methods: {
            ...mapActions([
                'ADD_TO_CART',
                'bindLocationsRef',
                'VIEW_CART_USER'
            ]),
            dialogFalse () {
                this.product_modal = {}
                this.dialog = false
            },
            goToCard () {
              this.dialog = false
              this.$router.push({name: 'cart'})
            },

            async selectColor(index, n) {
              this.indexColor = index
              this.selectcolor = index
              this.selectcolor2 = n
            },

            async selectModel(index) {
              this.indexModel = index
              this.selectmodel = index
          },

          async addToCart() {
              if (!this.model) {
                return this.snackbar = true
              }
              if (!this.nameColorChange){
                return this.snackbar2 = true
              }
              else {
                const payload = {
                  id: await this.product.id,
                  name: this.product.name,
                  nameColorChange: this.nameColorChange,
                  model: this.model,
                  article: this.product.article,
                  price: this.price,
                  arrayImagesViews: this.arrayImagesViews[0]
                }
                this.product_modal = payload
                // this.product_modal = payload
                await this.ADD_TO_CART(payload)
              }
              await this.VIEW_CART_USER()
              this.dialog = true
            },
        },
        computed: {
            ...mapGetters([
                'GET_PRODUCT_FROM_DB',
            ]),
            nameBrand() {
                return this.product?.BrandName?.name
            },
            model() {
              if (this.indexModel === 0) {
                return  this.product?.arrayModel && this.product?.arrayModel.length > 0 ? this.product?.arrayModel[0] : ''
              }
              else if (this.indexModel === 1) {
                return this.product.arrayModel[1]
              }
              else if (this.indexModel === 2) {
                return this.product.arrayModel[2]
              }
              else if (this.indexModel === 3) {
                return this.product.arrayModel[3]
              } else {
                return this.product.arrayModel[0];
              }
            },
            price() {
              if (this.indexModel === 0) {
                return  this.product.price && this.product.price.length > 0 ? this.product?.price[0] : ''
              }
              else if (this.indexModel === 1) {
                return this.product.price[1]
              }
              else if (this.indexModel === 2) {
                return this.product.price[2]
              }
              else if (this.indexModel === 3) {
                return this.product.price[3]
              } else {
                return this.product.price[0];
              }
            },
            price2() {
              if (this.indexModel === 0) {
                return  this.product.price && this.product.price.length > 0 ? this.product?.price2[0] : ''
              }
              else if (this.indexModel === 1) {
                return this.product.price2[1]
              }
              else if (this.indexModel === 2) {
                return this.product.price2[2]
              }
              else if (this.indexModel === 3) {
                return this.product.price2[3]
              } else {
                return this.product.price2[0];
              }
            },
            nameColorChange () {
              if (this.indexColor === 0) {
                return  this.product.nameColor && this.product.nameColor.length > 0 ? this.product.nameColor[0] : ''
              }
              else if (this.indexColor === 1) {
                return this.product.nameColor[1]
              }
              else if (this.indexColor === 2) {
                return this.product.nameColor[2]
              }
              else if (this.indexColor === 3) {
                return this.product.nameColor[3]
              } else {
                return this.product?.nameColor[0]
              }
            },
            arrayImagesViews () {
              if (this.indexColor === 0) {
                return  this.product.arrayImages1 && this.product.arrayImages1.length > 0 ? this.product.arrayImages1 : []
              }
              else if (this.indexColor === 1) {
                return this.product.arrayImages2
              }
              else if (this.indexColor === 2) {
                return this.product.arrayImages3
              }
              else if (this.indexColor === 3) {
                return this.product.arrayImages4
              } else {
                return this.product.arrayImages1;
              }
            },
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
                    if (item.id === this.$route.query.product) {
                        result = item;
                    }
                })
                return result;
            },
        },
    }
</script>

<style lang="scss" scoped>
.main-color {
  background-color: $main-color
}

#lateral .v-btn--example {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
.name_card_title {
  margin: $padding*2;
  font-size: 36px
}
.z-product-information {
  flex-basis: 25%;
  box-shadow: 0 0 8px 0 #e0e0e0;
  padding: 0 $padding*2 0 $padding*2;
  //margin-bottom: $margin*2;
}

//Кнопка
.btn-wrapper {
  display: flex;
  margin: 50px 0;
}

.btn {
  position: relative;
  height: 40px;
  line-height: 40px;
  padding: 0 30px 0 40px;
  margin: 0 20px;
  background: linear-gradient(-135deg, #066d52, #040404);
  box-shadow: 0 15px 35px #22265b;
  border-width: 0;
  border-radius: 50px;
  font-family: 'Montserrat Alternates', sans-serif;
  font-size: 14px;
  color: white;
  outline: none;
  cursor: pointer;
}

.btn:before {
  content: url("https://firebasestorage.googleapis.com/v0/b/online-shop-34af2.appspot.com/o/assets%2Fimages%2Fplus-thick%20(1).png?alt=media&token=a3abda39-b5f5-483b-b495-1cb623099d00");
  position: absolute;
  left: 5px;
  top: 5px;
  font-family: 'Montserrat Alternates', sans-serif;
  color: white;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 50%;
  background: transparent;
  transition: .3s ease-in-out;
}

.btn:hover:before {
  background: white;
  color: #24D8F7;
  content: url("https://firebasestorage.googleapis.com/v0/b/online-shop-34af2.appspot.com/o/assets%2Fimages%2Fcart-outline%20(1).png?alt=media&token=828ae469-0924-4403-a29b-df9f43650e1b");

}

@media (max-width: 767px) {
  .btn-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    margin-bottom: 30px;
  }
}

@media (min-width: 768px) {
  .btn-wrapper {
    justify-content: center;
  }
}


@media(max-width: 720px) {
  .nameTab {
    font-size: 10px
  }
  .name_card_title {
    margin: $padding*2;
    font-size: 18px
  }
  .z-product-information {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: 0;
    //margin-bottom: $margin*2;
  }
}
</style>