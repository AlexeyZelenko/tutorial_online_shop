<template>
  <v-carousel
      cycle
      height="700"
      hide-delimiter-background
      show-arrows-on-hover
      style="margin-top: 80px"
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
        v-for="(slide, i) in slides"
        :key="i"
    >
      <v-sheet
          :color="colors[i]"
          height="100%"
      >
        <v-row
            align="center"
            class="fill-height"
            justify="center"
        >
          <div class="display-3 ">
            <span>{{ slide }}</span>
            <div class="text-center">
              <v-btn
                  color="primary"
                  text
              >
                Подробнее >>
              </v-btn>
            </div>
            <div class="text-center">
              <v-btn
                  color="primary"
                  dark
                  rounded
              >
                Купить
              </v-btn>
            </div>

            <img alt="" src="@/assets/products/11-iphone.png">
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'iPhone 11',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
}
</script>



