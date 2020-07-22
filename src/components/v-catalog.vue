<template>
  <div class="v-catalog">
    <h1>Catalog</h1>

    <vCatalogItem
      v-for="product in PRODUCTS"
      :key="product.article"
      :product_data="product"
      @sendArticle="showChildArticleInConsole"
    />
  </div>
</template>

<script>
    import vCatalogItem from './v-catalog-item'
    import {mapActions, mapGetters} from 'vuex'


    export default {
        name: "v-catalog",
        components: {
            vCatalogItem
        },
        props: {},
        data() {
            return {

            }
        },
        methods: {
            ...mapActions([
                'GET_PRODUCTS_FROM_API'
            ]),
            showChildArticleInConsole(data) {
                console.log(data)
            },
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ]),
        },
        mounted() {
            this.GET_PRODUCTS_FROM_API()
            .then((response) => {
                if (response.data) {
                    console.log('Data arrived!')
                }
            })
        }
    }
</script>

<style lang="scss">
  .v-catalog {
    &__list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
    }
  }
</style>