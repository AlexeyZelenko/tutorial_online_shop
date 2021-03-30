<template>
  <v-card class="my-2">
    <h5 class="py-2">Вам может понравиться:</h5>
    <v-container fluid>
      <v-row>
        <v-col
            v-for="item in RANDOM_PRODUCTS"
            :key="item.id"
            cols="12"
            md="2"
        >
          <p style="color: darkcyan">{{item.name}}</p>
          <div class="text-center">
            <v-btn
                :to="{name: 'product', query: {'product': id}, params: { product2: this.product }}"
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
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "RandomProducts",
  methods: {
    ...mapActions([]),
    // productClick(id) {
    //   window.scrollTo({ top: 50, behavior: 'smooth' })
    //   this.$router.push({name: 'product', query: {'product': id}}).catch(()=>{})
    // }
  },
  computed: {
    ...mapGetters([
      'GET_PRODUCTS'
    ]),
    RANDOM_PRODUCTS() {
      const a = this.GET_PRODUCTS.filter((obj, idx, arr) => (
          arr.findIndex((o) => o.name === obj.name) === idx
      ))

      return a.sort(() => Math.random() - 0.5)
    }
  }
}

</script>

<style scoped>

</style>