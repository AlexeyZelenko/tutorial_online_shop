<template>
  <v-list class="transparent">
    <v-list-item>
<!--      <div-->
<!--          style="width: 60px"-->
<!--      >-->
<!--        <v-tabs-->
<!--            vertical-->
<!--        >-->
<!--          <v-tab-->
<!--              v-for="(item, i) in arrayImagesViews"-->
<!--              :key="i"-->
<!--          >-->
<!--            <img-->
<!--                style="width: 50px; padding: 10px"-->
<!--                :src=item-->
<!--                alt=""-->
<!--                @click="selectSlide(i)"-->
<!--            >-->
<!--          </v-tab>-->
<!--        </v-tabs>-->
<!--      </div>-->

      <v-container
          class="mx-auto"
      >
<!--        <v-row justify="space-around">-->
<!--          <v-icon @click="model&#45;&#45;">-->
<!--            mdi-minus-->
<!--          </v-icon>-->
<!--          {{ model }}-->
<!--          <v-icon @click="model++">-->
<!--            mdi-plus-->
<!--          </v-icon>-->
<!--        </v-row>-->
        <v-carousel
            v-model="model"
            height="700"
            show-arrows-on-hover
            hide-delimiter-background
        >
          <v-carousel-item
              v-for="item in arrayImagesViews"
              :key="item.id"
          >
            <v-sheet
                :color="colors[11]"
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
                  <img
                      alt=""
                      :src="item"
                      style="max-height: 600px"
                  >
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>

      </v-container>
    </v-list-item>
  </v-list>

</template>

<script>
export default {
  name: "CarouselProductDetails",
  props: {
    arrayImagesViews: {
      type: Array,
      default() {
        return {}
      }
    }
  },
  data: () => ({
    model: 0,
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
      '#ecfcf0',
      'white'
    ]
  }),
  methods: {
    selectSlide(index) {
      this.model = index
    },
  }
}
</script>

<style scoped>

</style>