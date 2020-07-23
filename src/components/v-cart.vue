<template>
  <div class="v-cart">
    <h1>Cart</h1>
    <v-cart-item
      v-for="(item, index) in cart_data"
      :key="item.article"
      :cart_item_data="item"
      @deleteFromCart="deleteFromCart(index)"
    />
  </div>
</template>

<script>
    import  VCartItem from './v-cart-item'
    import {mapActions} from 'vuex'

    export default {
        name: "v-cart.vue",
        components: {
            VCartItem
        },
        props: {
           cart_data: {
               type: Array,
               default() {
                   return [];
               }
           }
        },
        methods: {
            ...mapActions([
                'DELETE_FROM_CART'
            ]),
            deleteFromCart(index) {
                this.DELETE_FROM_CART(index)
            }
        }
    }
</script>

<style>

</style>