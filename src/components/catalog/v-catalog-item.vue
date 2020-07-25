<template>
    <div class="v-catalog-item">

      <v-popup
          v-if="isInfoPopupVisible"
          rightBtnTitle="Add to cart"
          @closePopup="closeInfoPopup"
          @rightBtnActions="addToCart"
          :popupTitle="product_data.name"
      >
        <img class="v-catalog-item_image" :src="require('@/assets/images/' + product_data.image)" alt="">
        <div>
          <p class="v_catalog_item_name">{{product_data.name}}</p>
          <p class="v_catalog_item_price">Price: {{product_data.price}} $</p>
          <p class="v_catalog_item_price">{{product_data.category}}</p>
        </div>

      </v-popup>

      <img class="v-catalog-item_image" :src="require('@/assets/images/' + product_data.image)" alt="">
      <p class="v_catalog_item_name">{{product_data.name}}</p>
      <p class="v_catalog_item_price">Price: {{product_data.price}} $</p>
      <button
          class="v-catalog-item_show-info"
          @click="showPopupInfo"
      >
        Show info
      </button>
      <button
          class="v-catalog_item_add_cart_btn btn"
          @click="addToCart"
      >Add to cart
      </button>
    </div>
</template>

<script>
  import vPopup from '../popup/v-popup'

    export default {
        name: "v-catalog-item",
        components: {
          vPopup
        },
        data() {
            return {
                isInfoPopupVisible: false
            }
         },
        props: {
           product_data: {
               type: Object,
               default() {
                   return {}
               }
           }
        },
        methods: {
            closeInfoPopup() {
              this.isInfoPopupVisible = false
            },
            showPopupInfo() {
              this.isInfoPopupVisible = true;
            },
            addToCart() {
                this.$emit('addToCart', this.product_data);
            }
        }
    }
</script>

<style lang="scss">
  .v-catalog-item {
    flex-basis: 25%;
    box-shadow: 0 0 8px 0 #e0e0e0;
    padding: $padding*2;
    margin-bottom: $margin*2;
    &_image {
      width: 100px;
    }
  }
</style>