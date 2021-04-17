<template>
	<div
			:data-index="index"
			class="v-catalog-item my-4 mx-2"
	>
    <v-card-subtitle
        style="color: #00BFA5"
        class="py-4"
    >
      {{product_data.name}}
    </v-card-subtitle>
    <v-img v-if="product_data.arrayImages1">
      <imageItem
          class="brighten"
          v-if="product_data.arrayImages1"
          v-show="product_data.seen"
          style="margin: 0 auto"
          :source="product_data.arrayImages1[0]"
          :newProduct="product_data.newProduct"
      />
      <div>
        <p>
          <!--		НОВИНКА-->
          <v-chip
              v-if="product_data.newProduct"
              class="v-catalog-item_new"
              style="background-color: goldenrod; color:white; max-width: 150px"
              text-color="white"
          >
            {{ "NEW" | localize}}!
          </v-chip>
        </p>
      </div>
    </v-img>

    <v-card-subtitle
        style="color: white"
        class="pb-0"
    >
      {{product_data.price[0]}} грн
    </v-card-subtitle>
    <v-card-subtitle
        style="color: #00BFA5"
        class="pb-0"
    >
      {{product_data.name}}
    </v-card-subtitle>

    <v-card-actions
        class="mx-auto"
    >
      <div
          style="color: white"
          class="button2"
          @click="productClick"
          v-show="product_data.seen"
      >
        <span
        >{{'Show info' | localize}}</span>
      </div>

    </v-card-actions>
	</div>
</template>

<script>
import {mapGetters} from "vuex";

const imageItem = () => ({
  component: import("../../components/imageItem.vue"),
})
export default {
    name: "v-catalog-item",
    components: {
      imageItem
    },
    data() {
        return {
            isInfoPopupVisible: false,
            placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
        }
    },
    props: {
        product_data: {
            type: Object,
            default() {
                return {}
            }
        },
        observer: {
            type: IntersectionObserver,
            default() {
                return {}
            }
        },
        index: {
            type: Number,
            default() {
                return null
            }
        },
    },
  computed: {
    ...mapGetters([
      'GET_NAME_Brand_Product'
    ]),
  },
    methods: {
        productClick() {
            this.$emit('productClick', this.product_data.id)
        },
    },
    mounted() {
        this.observer.observe(this.$el);
    }
}
</script>

<style lang="scss">
.brighten {
  opacity: 0.8;
}

.brighten:hover {
  opacity: 1;
}
.emptyImage {
		width: 100px;
		height: 300px;
	}

.v-catalog-item {
		flex-basis: 25%;
		box-shadow: 0 0 8px 0 #574f4f;
		padding: $padding*2;
		margin-bottom: $margin*2;
		z-index: 1;
		margin-left: 1px;
    //color: #00BFA5;
    background: rgba(0, 0, 0, 0.8);
    max-width: 350px;
    &_new {
      margin-bottom: 5px;
    }
    @media (min-width: 570px) {
      flex-basis: 100%;
    }
	}

.button2,
.button2::before,
.button2::after,
.button2 span,
.button2 span::before,
.button2 span::after
{
  transition: all ease .5s;
}

.button2{
  position: relative;
  display: inline-block;
  padding: 0.3em;
  margin: 1em;
  border: solid 1px;
  text-transform: uppercase;
  cursor: pointer;
}

.button2:hover
{
  box-shadow: 0 0 5em .5em rgba(50,50,150,0.5);
}

.button2 span
{
  display: inline-block;
  width: 100%;
  padding: 0.6em 2em;
}

.button2:hover span
{
  background-color: #fff;
  color: #112;
}

.button2::before,
.button2::after,
.button2 span::before,
.button2 span::after
{
  content: '';
  position: absolute;
  border: 1px;
}

.button2::before,
.button2 span::before
{
  border-style: solid none;
}

.button2::before,
.button2 span::after{
  left: 0;
  top: -0.4em;
  width: 100%;
  height: calc(100% + 0.8em);
}

.button2::after,
.button2 span::after
{
  border-style: none solid;
}

.button2::after,
.button2 span::before
{
  top: 0;
  left: -0.4em;
  height: 100%;
  width: calc(100% + 0.8em);
}

.button2:hover::after,
.button2:hover span::after
{
  transform: scaleY(0);
}

.button2:hover::before,
.button2:hover span::before
{
  transform: scaleX(0);
}

.button2:hover span::after,
.button2:hover span::before
{
  opacity: 0;
}
</style>