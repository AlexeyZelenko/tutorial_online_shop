<template>
  <div>
    <div
        class="v-catalog-item my-4 mx-2"
    >
      <v-card-subtitle
          style="color: #00BFA5"
          class="py-4"
      >
        {{product_data.name}}
      </v-card-subtitle>

      <v-img v-if="product_data.arrayImages1">
        <imageItem
            v-if="product_data.arrayImages1"
            style="margin: 0 auto"
            :source="product_data.arrayImages1[0]"
            :newProduct="product_data.newProduct"
        />
      </v-img>

      <v-card-subtitle
          style="color: white"
          class="pb-0"
      >
        {{product_data.price[0]}} грн
      </v-card-subtitle>
      <v-card-subtitle
          style="color: #00BFA5"
          class="pb-0"
      >
        {{product_data.name}}
      </v-card-subtitle>

      <div class="quantity2">
        <div
            class="text-center"
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

    </div>
    <p>Продуктов в корзине: {{GET_CART_USER.length}}</p>
    <p>К оплате: {{cartTotalCost}} грн</p>
  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Swal from "sweetalert2";

const imageItem = () => ({
  component: import("../../components/imageItem.vue"),
})

export default {
  name: "product-modal-cart",
  components: {
    imageItem
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
    quantity() {

      let promises = 0
      for(let i = 0; i < this.GET_CART_USER.length; i++) {
        if(this.product_data.id === this.GET_CART_USER[i].id) {
          promises++
        }
      }
      return  promises
    },
    newGetCartUser() {
      // Удаляем одинаковые значения из массива
      // Вариант 1
      // return Array.from(new Set(this.GET_CART_USER))
      // Вариант2
      // return [...new Set(this.GET_CART_USER)]

      // Удаляем одинаковые объекты из массива
      // Вариант1
      // return this.GET_CART_USER.reduce((acc, cur) => [
      //   ...acc.filter((obj) => obj.arrayImagesViews !== cur.arrayImagesViews), cur
      // ], []);

      // Вариант2
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
    deleteFromCart(item) {
      this.DELETE_FROM_CART(item)
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