<template>

	<div class="wrapper">
    <v-list class="transparent">
      <v-list-item>
        <v-card style="width: 70px">
          <v-tabs
              vertical
          >
            <v-tab
                v-for="(item, i) in carousel_data"
                :key="item.article"
            >
              <img
                  style="width: 50px; padding: 10px"
                  :src=item
                  alt=""
                  @click="selectSlide(i)"
              >
            </v-tab>
          </v-tabs>
        </v-card>

        <v-list-item-subtitle>
          <div>
            <div class="v-carouselImage" :style="{ 'margin-left': '-' + (115 * currentSlideIndex) + '%' }">
              <v-carousel-item
                  v-for="item in carousel_data"
                  :key="item.article"
                  :item_data="item"
                  :width="300"
              >
              </v-carousel-item>
            </div>
            <div class="text-center" style="margin: 5px">
              <v-btn
                  class="ma-2"
                  tile
                  outlined
                  style="color: green"
                  @click="prevSlide">
                <v-icon left>mdi-chevron-left</v-icon> Назад
              </v-btn>
              <v-btn
                  class="ma-2"
                  tile
                  outlined
                  style="color: green"
                  @click="nextSlide">
                <v-icon left>mdi-chevron-right</v-icon> Вперед
              </v-btn>
            </div>
          </div>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
	</div>
</template>

<script>
    const vCarouselItem = () => import('@/components/v-carousel-item')

    export default {
        name: "vCarousel",
        data: () => ({
          labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
          time: 0,
          forecast: [
            { day: 'Tuesday', icon: 'mdi-white-balance-sunny', temp: '24\xB0/12\xB0' },
            { day: 'Wednesday', icon: 'mdi-white-balance-sunny', temp: '22\xB0/14\xB0' },
            { day: 'Thursday', icon: 'mdi-cloud', temp: '25\xB0/15\xB0' },
          ],
        currentSlideIndex: 0
        }),
        components: {
            vCarouselItem
        },
        methods: {
            selectSlide(index) {
              this.currentSlideIndex = index
            },
            prevSlide() {
                if(this.currentSlideIndex > 0) {
                    this.currentSlideIndex--
                }
            },
            nextSlide() {
                if(this.currentSlideIndex >= this.carousel_data.length - 1) {
                    this.currentSlideIndex = 0
                } else
							this.currentSlideIndex++
            }
        },
        props: {
            carousel_data: {
                type: Array,
                default: () => []
            }
        },
    }
</script>

<style lang="scss">
	.wrapper {
		margin: 0 auto;
		max-width: 370px;
		overflow: hidden;
	}
	.v-carouselImage {
		display: flex;
		transition: all ease .5s;
	}
</style>