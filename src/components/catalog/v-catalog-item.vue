<template>
    <div class="v-catalog-item">
      <img class="v-catalog-item_image" :src="require('@/assets/images/' + product_data.image)" alt="">
      <p class="v_catalog_item_name">{{product_data.name}}</p>
      <p class="v_catalog_item_price">Price: {{product_data.price}} $</p>
      <button
          class="v-catalog_item_add_cart_btn btn"
          @click="addToCart"
      >Add to cart
      </button>
    </div>
</template>

<script>
    export default {
        name: "v-catalog-item",
        props: {
           product_data: {
               type: Object,
               default() {
                   return {}
               }
           }
        },
        methods: {
            addToCart() {
                this.$emit('addToCart', this.product_data);
            }
        }
    }
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #0e0e0e;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &_image {
      width: 100px;
    }
  }
</style>