<template>
	<div
			:data-index="index"
			class="v-catalog-item my-4 mx-2"
	>
    <v-card-subtitle class="py-4">
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


<!--    <div v-else>-->
<!--      <p-->
<!--          class="emptyImage"-->
<!--      >-->
<!--        <span-->
<!--            v-show="product_data.seen"-->
<!--            v-html="product_data.description"-->
<!--        />-->
<!--      </p>-->
<!--    </div>-->
    <v-card-subtitle class="pb-0">
      {{product_data.name}}
    </v-card-subtitle>

    <v-card-actions class="mx-auto">
      <v-btn
          class="mx-auto ma-2"
          bottom
          small
          outlined
          color="indigo"
          v-show="product_data.seen"
          @click="productClick"
      >
        {{'Show info' | localize}}
      </v-btn>
    </v-card-actions>
	</div>
</template>

<script>
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
    color: #00BFA5;
    background: rgba(0, 0, 0, 0.8);
    max-width: 350px;
    &_new {
      margin-bottom: 5px;
    }
    @media (min-width: 570px) {
      flex-basis: 100%;
    }
	}
</style>