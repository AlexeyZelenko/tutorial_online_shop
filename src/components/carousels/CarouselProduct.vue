<template>
  <v-list
      class="transparent"
  >
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
              class="main-color"
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
            <v-row
                align="center"
                class="fill-height main-color"
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
              class="main-color"
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
 .carousel_vertical {
   background-color: $main-color;
   display: block;
 }
 .carousel_horizontal {
   background-color: $main-color;
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
