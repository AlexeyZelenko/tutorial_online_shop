<template>
  <v-carousel
      cycle
      height="700"
      hide-delimiter-background
      show-arrows-on-hover
      style="margin-top: 140px"
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
        v-for="(item, i) in RANDOM_PRODUCTS"
        :key="i"
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
              class="display-3 "
          >
            <span style="color: black">{{ item.name }}</span>
            <div class="text-center">
              <v-btn
                  @click="productClick(item.article)"
                  color="primary"
                  text
              >
                Подробнее >>
              </v-btn>
            </div>
<!--            <div class="text-center">-->
<!--              <v-btn-->
<!--                  color="primary"-->
<!--                  dark-->
<!--                  rounded-->
<!--              >-->
<!--                Купить-->
<!--              </v-btn>-->
<!--            </div>-->

            <img
                alt=""
                :src="item.arrayImages[0]"
                style="max-height: 400px"
            >
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
    productClick(article) {
      console.log('article', article)
      this.$router.push({name: 'product', query: {'product': article}})
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



