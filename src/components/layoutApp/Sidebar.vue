<template>
  <v-carousel
      cycle
      height="700"
      hide-delimiter-background
      hide-delimiters
      show-arrows-on-hover
      class="v-carousel"
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
        v-for="item in RANDOM_PRODUCTS"
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
            <span
                class="name_item_sidebar"
            >
              {{ item.name }}
            </span>
            <div class="text-center">

              <div id="container">
                <button class="learn-more">
                    <span class="circle" aria-hidden="true">
                      <span class="icon arrow"></span>
                    </span>
                  <span
                      class="button-text"
                      @click="productClick(item.id)"
                  >
                    Подробнее
                  </span>
                </button>
              </div>

            </div>

            <imageItem
                v-if="item.arrayImages1"
                style="margin: 0 auto; max-height: 400px"
                :source="item.arrayImages1[0]"
            />

            <div class="text-center">
              <span
                  class="name_item_price"
              >
              {{ item.price[0] }} грн
            </span>
            </div>
          </div>

        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
const imageItem = () => ({
  component: import("../../components/imageItem.vue"),
})

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
  components: {
    imageItem
  },
  methods: {
    ...mapActions([
    ]),
    productClick(id) {
      this.$router.push({name: 'product', query: {'product': id}})
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

<style lang="scss">
.v-carousel {
  margin-top: 140px
}
.name_item_sidebar {
  padding: 10px;
  color: black
}
.name_item_price {
  color: grey;
  font-size: 36px;
}
@media (max-width: 570px) {
  .v-carousel {margin-top: 40px}
  .name_item_sidebar {
    font-size: 36px;
  }
  .name_item_price {
    font-size: 24px;
  }
}


//Кнопка
@import url('https://fonts.googleapis.com/css?family=Mukta:700');

* {
  box-sizing: border-box;
  &::before, &::after {
    box-sizing: border-box;
  }
}

button {
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  &.learn-more {
    width: 12rem;
    height: auto;
    .circle {
      @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
      position: relative;
      display: block;
      margin: 0;
      width: 3rem;
      height: 3rem;
      background: $black;
      border-radius: 1.625rem;
      .icon {
        @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background: $white;
        &.arrow {
          @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
          left: 0.625rem;
          width: 1.125rem;
          height: 0.125rem;
          background: none;
          &::before {
            position: absolute;
            content: '';
            top: -0.25rem;
            right: 0.0625rem;
            width: 0.625rem;
            height: 0.625rem;
            border-top: 0.125rem solid #fff;
            border-right: 0.125rem solid #fff;
            transform: rotate(45deg);
          }
        }
      }
    }
    .button-text {
      @include transition(all, 0.45s, cubic-bezier(0.65,0,.076,1));
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 0.75rem 0;
      margin: 0 0 0 1.85rem;
      color: $black;
      font-weight: 700;
      font-size: 16px;
      line-height: 1.6;
      text-align: center;
      text-transform: uppercase;
    }
  }
  &:hover {
    .circle {
      width: 100%;
      .icon {
        &.arrow {
          background: $white;
          transform: translate(1rem, 0);
        }
      }
    }
    .button-text {
      color: $white;
    }
  }
}

@supports (display: grid) {
  #container {
    grid-area: main;
    align-self: center;
    justify-self: center;
  }
}
</style>



