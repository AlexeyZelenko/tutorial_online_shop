<template>
  <v-card
      dark
      class="my-2"
  >
    <h5
        class="py-2"
    >
      Вам может понравиться:
    </h5>
    <v-sheet
        dark
        class="mx-auto"
        elevation="8"
    >
      <v-slide-group
          v-model="model"
          class="pa-2"
          center-active
      >
        <v-slide-item
            v-for="item in RANDOM_PRODUCTS"
            :key="item.id"
            v-slot="{ active, toggle }"
        >
          <v-card
              :color="active ? 'darkcyan' : 'black'"
              class="ma-2"
              height="250"
              width="150"
              @click="toggle"
          >
            <p style="color: darkcyan">{{item.name}}</p>
            <div class="text-center">
              <v-btn
                  @click="productClick(item.id)"
                  color="primary"
                  text
                  small
              >
                Подробнее >>
              </v-btn>
            </div>
            <v-img
                :src="item.arrayImages1[0]"
                aspect-ratio="1"
            ></v-img>
          </v-card>
        </v-slide-item>
      </v-slide-group>
    </v-sheet>
  </v-card>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  name: "RandomProducts",
  data: () => ({
    model: null,
  }),
  methods: {
    ...mapActions([]),
    productClick(id) {
      window.scrollTo({ top: 50, behavior: 'smooth' })
      this.$router.push({path: 'product', query: {'product': id}}).catch(()=>{})
    }
  },
  computed: {
    ...mapGetters([
      'GET_PRODUCTS',
      'GET_NAME_Brand_Product'
    ]),
    RANDOM_PRODUCTS() {
      const a = this.GET_PRODUCTS.filter((obj, idx, arr) => (
          arr.findIndex((o) => o.name === obj.name) === idx
      ))
      if (this.GET_NAME_Brand_Product) {
        const b = a.filter(item => item.BrandName.name === this.GET_NAME_Brand_Product)
        return b.sort(() => Math.random() - 0.5)
      }
      return a.sort(() => Math.random() - 0.5)
    }
  }
}

</script>

<style scoped>
</style>