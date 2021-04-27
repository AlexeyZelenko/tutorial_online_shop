<template>
  <v-list
      class="transparent"
  >
    <v-container
        class="mx-auto main-color"
    >
      <v-carousel
          v-model="model"
          height="550"
          show-arrows-on-hover
          hide-delimiter-background
          hide-delimiters
      >
        <v-carousel-item
            v-for="item in arrayImagesViews"
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
                <img
                    alt=""
                    :src="item"
                    style="max-height: 500px"
                >
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>

    </v-container>
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

<style lang="scss">
.main-color {
  background-color: $main-color
}
</style>