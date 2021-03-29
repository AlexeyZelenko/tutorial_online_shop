<template>
  <v-card class="my-2">
    <h5 class="py-2">Вам может понравиться:</h5>
    <v-tabs
        color="deep-purple accent-4"
        right
    >
      <v-tab>назад</v-tab>
      <v-tab>вперед</v-tab>

      <v-tab-item
          v-for="n in 2"
          :key="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
                v-for="item in RANDOM_PRODUCTS"
                :key="item.article"
                cols="12"
                md="2"
            >
              <p style="color: darkcyan">{{item.name}}</p>
              <div class="text-center">
                <v-btn
                    @click="productClick(item.article)"
                    color="primary"
                    text
                >
                  Подробнее >>
                </v-btn>
              </div>
              <v-img
                  :src="item.arrayImages[0]"
                  aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "RandomProducts",
  methods: {
    ...mapActions([]),
    productClick(article) {
      // location.reload()
      window.scrollTo({ top: 150, behavior: 'smooth' })
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
      const b = a.sort(() => Math.random() - 0.5)

      return b.filter((obj, idx, arr) => (
          arr.findIndex((o) => o.name === obj.name) === idx
      ))
    }
  }
}

</script>

<style scoped>

</style>