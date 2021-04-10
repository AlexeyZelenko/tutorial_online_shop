<template>
  <div>
    <v-card
        dark
        class="ma-2"
        max-width="400"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title
              style="color: #00BFA5"
              class="headline"
          >
            {{product_data.name}}
          </v-list-item-title>
          <v-list-item-subtitle>{{product_data.nameColorChange}}   {{product_data.model}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col
              class="display-1"
              cols="6"
          >
            {{price}} грн
          </v-col>
          <v-col cols="6">
            <v-img
                :src="product_data.arrayImagesViews"
                alt=""
                width="150"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <div class="quantity2">
        <div
            class="text-center mx-2 px-2"
        >
          <span>
            <v-btn
                @click.stop="decrement"
                :loading="loading5"
                :disabled="loading5"
                fab
                x-small
            >
            <v-icon dark>mdi-minus</v-icon>
          </v-btn>
          </span>
          <span
              style="color: white"
              class="px-4"
          >
            {{quantity}}
          </span>
          <span>
            <v-btn
                @click.prevent="increment"
                :loading="loading4"
                :disabled="loading4"
                fab
                x-small
            >
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
          </span>
        </div>

      </div>

      <v-divider></v-divider>

      <v-card-actions >
        <v-btn
            class="mx-auto"
            small
            depressed
            @click="deleteFromCart"
            :loading="loading"
            :disabled="loading"
            style="color: mediumvioletred;"
        >
          <v-icon  left dark>
            mdi mdi-delete-forever
          </v-icon>
          Удалить
        </v-btn>
      </v-card-actions>
    </v-card>

    <p>Продуктов в корзине: {{GET_CART_USER.length}}</p>
    <p>К оплате: {{cartTotalCost}} грн</p>

  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Swal from "sweetalert2";


export default {
  name: "product-modal-cart",
  components: {
  },
  data() {
    return {
      loader: null,
      loading: false,
      loading4: false,
      loading5: false,
      isInfoPopupVisible: true,
    }
  },
  props: {
    product_data: {
      type: Object,
      default() {
        return {}
      }
    },
  },
  computed: {
    ...mapGetters([
      'GET_CART_USER'
    ]),
    price () {
      if (this.product_data.price) {
        return this.product_data.price.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
      } else {
        return 0
      }
    },
    quantity() {
      let promises = 0
      for(let i = 0; i < this.GET_CART_USER.length; i++) {
        if(this.product_data.id === this.GET_CART_USER[i].id && this.product_data.nameColorChange === this.GET_CART_USER[i].nameColorChange && this.product_data.model === this.GET_CART_USER[i].model) {
          promises++
        }
      }
      return  promises
    },
    newGetCartUser() {
      return this.GET_CART_USER.filter((obj, idx, arr) => (
          arr.findIndex((o) => o.arrayImagesViews === obj.arrayImagesViews) === idx
      ))

    },
    cartTotalCost() {
      return this.GET_CART_USER.reduce((res, item) => res + +item.price, 0)
    },
  },
  methods: {
    ...mapActions([
      'DELETE_FROM_CART',
      'INCREMENT_CART_ITEM',
      'DECREMENT_CART_ITEM',
      'VIEW_CART_USER',
      'ORDER_USER'
    ]),
    async userOrder() {
      Swal.mixin({
        cancelButtonText: 'Отмена',
        input: 'text',
        confirmButtonText: 'Дальше',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4', '5']
      }).queue([
        {
          title: 'Имя:',
          text: 'Ваше имя',
          input: 'text',
        },
        {
          title: 'Телефон:',
          text: 'Чтобы отправить товары нам нужен номер Вашего телефона',
          input: 'text',
        },
        {
          title: 'Адресс',
          text: 'Адресс - Область, Населенный пункт'
        },
        {
          title: '№ отделения',
          text: '№ отделения Новой Почты'
        },
        {
          title: 'Дополнительно...',
          text: 'Дополнительная информация',
          input: 'textarea',
        },
      ]).then((result) => {
        if (result.value) {
          Swal.fire({
            title: 'Все сделано!',
            html: `
															Ваши данные:<br />
															Имя: ${result.value[0]}<br />
															Телефон: ${result.value[1]}<br />
															Адресс: ${result.value[2]}<br />
															№ Новой Почты: ${result.value[3]}<br />
															Дополнительно: ${result.value[4]}<br />
														`,
            confirmButtonText: 'Заказать!'
          })
              .then(() => {
                let ObjectUserData = {}
                ObjectUserData.name = result.value[0]
                ObjectUserData.telephone = result.value[1]
                ObjectUserData.adress = result.value[2]
                ObjectUserData.newPost = result.value[3]
                ObjectUserData.Addition = result.value[4]
                ObjectUserData.ID = Date.now()
                ObjectUserData.createdAt = new Date().toLocaleString()
                ObjectUserData.CART = this.GET_CART_USER
                ObjectUserData.cartTotalCost = this.cartTotalCost

                let promises = [ObjectUserData]
                this.ORDER_USER(promises)
              })
        }
      })
    },
    increment() {
      this.loader = 'loading4'
      this.INCREMENT_CART_ITEM(this.product_data)
          .then(() => {
            this.VIEW_CART_USER()
          })
    },
    decrement() {
      this.loader = 'loading5'
      this.DECREMENT_CART_ITEM(this.product_data)
          .then(() => {
            this.VIEW_CART_USER()
          })
    },
    deleteFromCart() {
      this.DELETE_FROM_CART(this.product_data)
          .then(() => {
            this.VIEW_CART_USER()
          })
    }
  },
  created() {
    this.VIEW_CART_USER()
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      setTimeout(() => (this[l] = false), 1000)

      this.loader = null
    },
  },
}
</script>

<style lang="scss">
.v-catalog-item {
  box-shadow: 0 0 8px 0 #574f4f;
  padding: $padding*2;
  margin-bottom: $margin*2;
  //color: #00BFA5;
  background: rgba(0, 0, 0, 0.8);
}
.quantity2 {
    position: relative;
    text-align: center;
    margin: 5px;
    display: block;

  }

.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}

@media (max-width: 560px) {
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