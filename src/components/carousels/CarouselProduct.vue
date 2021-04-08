<template>
  <v-list class="transparent">
    <v-list-item>
      <div
          class="carousel_vertical"
          style="width: 70px"
      >
        <v-tabs
            vertical
        >
          <v-tab
              v-for="(item, i) in arrayImagesViews"
              :key="i"
          >
            <img
                style="width: 50px; padding: 10px"
                :src=item
                alt=""
                @click="selectSlide(i)"
            >
          </v-tab>
        </v-tabs>
      </div>

      <v-container
          class="mx-auto"
          style="padding-right: 30px"
          tile
      >
        <v-carousel
            v-model="model"
            height="400"
            hide-delimiter-background
            show-arrows-on-hover
            hide-delimiters
        >
          <!--                    <template v-slot:prev="{ on, attrs }">-->
          <!--                      <v-btn-->
          <!--                          v-bind="attrs"-->
          <!--                          v-on="on"-->
          <!--                          color="success"-->
          <!--                      >-->
          <!--                        предыдущий-->
          <!--                      </v-btn>-->
          <!--                    </template>-->
          <!--                    <template v-slot:next="{ on, attrs }">-->
          <!--                      <v-btn-->
          <!--                          v-bind="attrs"-->
          <!--                          v-on="on"-->
          <!--                          color="info"-->
          <!--                      >-->
          <!--                        следующий-->
          <!--                      </v-btn>-->
          <!--                    </template>-->
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
                      style="max-height: 400px"
                  >
                </div>
              </v-row>
            </v-sheet>
          </v-carousel-item>
        </v-carousel>
      </v-container>

    </v-list-item>

    <v-list-item>
      <v-container
          class="carousel_horizontal"
      >
        <v-tabs
            show-arrows
        >
          <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
          <v-tab
              v-for="(item, i) in arrayImagesViews"
              :key="i"
          >
            <img
                style="width: 40px"
                :src=item
                alt=""
                @click="selectSlide(i)"
            >
          </v-tab>
        </v-tabs>
      </v-container>
    </v-list-item>

  </v-list>

</template>

<script>
export default {
  name: "CarouselProduct",
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

<style>
 .carousel_vertical {
   display: block;
 }
 .carousel_horizontal {
   display: none;
 }

 @media (max-width: 570px) {
   .carousel_vertical {
     display: none;
   }
   .carousel_horizontal {
     display: block;
   }
 }
</style>
