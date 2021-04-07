<template>
  <v-carousel
      cycle
      height="700"
      hide-delimiter-background
      show-arrows-on-hover
      class="v-carousel"
  >
    <template v-slot:prev="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
          color="success"
      >Previous slide
      </v-btn>
    </template>
    <template v-slot:next="{ on, attrs }">
      <v-btn
          v-bind="attrs"
          v-on="on"
          color="info"
      >Next slide
      </v-btn>
    </template>
    <v-carousel-item
        v-for="item in RANDOM_PRODUCTS"
        :key="item.id"
    >
      <v-sheet
          :color="colors[10]"
          height="100%"
      >
        <v-row
            align="center"
            class="fill-height"
            justify="center"
        >
          <div
              class="display-3"
          >
            <span
                class="name_item_sidebar"
            >
              {{ item.name }}
            </span>
            <div class="text-center">
              <v-btn
                  @click="productClick(item.id)"
                  color="primary"
                  rounded
                  dark
              >
                Подробнее
              </v-btn>
            </div>

            <img
                alt=""
                :src="item.arrayImages1[0]"
                style="max-height: 400px"
            >

            <div class="text-center">
              <span
                  class="name_item_price"
              >
              {{ item.price[0] }} грн
            </span>
            </div>
          </div>

        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
        'purple lighten-1',
        'cyan darken-4',
        'light-green darken-3',
        'brown darken-4',
        'deep-orange accent-4',
          '#ecfcf0'
      ]
    }
  },
  methods: {
    ...mapActions([
    ]),
    productClick(id) {
      this.$router.push({name: 'product', query: {'product': id}})
    }
  },
  computed: {
    ...mapGetters([
      'GET_RANDOM_PRODUCTS',
      'GET_PRODUCTS'
    ]),
    RANDOM_PRODUCTS() {
      const a = this.GET_PRODUCTS
      return a.sort(() => Math.random() - 0.5)
    }
  }
}
</script>

<style lang="scss">
.v-carousel {
  margin-top: 140px
}
.name_item_sidebar {
  color: black
}
.name_item_price {
  color: grey;
  font-size: 36px;
}
@media (max-width: 570px) {
  .v-carousel {margin-top: 40px}
  .name_item_sidebar {
    font-size: 36px;
  }
  .name_item_price {
    font-size: 24px;
  }
}

</style>



