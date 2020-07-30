<template>
	<v-card>
		<v-card-title>
			<v-spacer></v-spacer>
			<v-text-field
					v-model="search"
					append-icon="mdi-magnify"
					single-line
					hide-details
					loading loading-text="Loading... Please wait"
			></v-text-field>
		</v-card-title>
		<v-data-table
				v-model="selected"
				:headers="headers"
				:items="PRODUCTS"
				:single-select="singleSelect"
				item-key="name"
				show-select
				class="elevation-1"
				:search="search"
				:footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
		></v-data-table>
	</v-card>
</template>

<script>
	import {mapGetters} from 'vuex'
  import {db} from '@/main.js'

  export default {
    name: "zTable",
    data: () => ({
        search: '',
        singleSelect: false,
        selected: [],
        headers: [
            {
                text: 'Название',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Артикль', value: 'article' },
            { text: 'Категория', value: 'category' },
            { text: 'Описание', value: 'description' },
            { text: 'Цена', value: 'price' },
            { text: 'id', value: 'id' },
            { text: 'опубликовано', value: 'available' },
            { text: 'Бренд', value: 'BrandName' },
            { text: 'Новинка', value: 'NewClothes' },
            { text: 'Производитель', value: 'clothingManufacturer' },
            { text: 'Размер', value: 'clothingSize1' },
            { text: 'Скидка', value: 'discount' },
            { text: 'Акционная цена', value: 'promotionalPrice' },
            { text: 'Скидка', value: 'stok' },
            { text: 'Фото одежды', value: 'FotoClothes' },
            { text: 'Видео одежды', value: 'VideoClothings' },
            { text: 'Удалить', value: 'DeleteClothings' },
        ],
    }),
    // components: {},
    methods: {
        addLocation(article, available, category, image, name, price, BrandName, NewClothes, clothingManufacturer, clothingSize1, discount, promotionalPrice, stok, FotoClothes, VideoClothings) {      // <-- новый метод
                const createdAt = new Date()
                db.collection('products').add({article, available, createdAt, category, image, name, price, BrandName, NewClothes, clothingManufacturer, clothingSize1, discount, promotionalPrice, stok, FotoClothes, VideoClothings})
            },
            deleteLocation(id) {   // <-- новый метод
                db.collection('message').doc(id).delete()
            }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS'
        ]),
        products() {
            return {
                products: db.collection('products'),
            }
        },
    },
    watch: {},
    props: {},
  }
</script>

<style scoped>

</style>