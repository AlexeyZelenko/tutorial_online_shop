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
                {text: 'Артикль', value: 'article'},
                {text: 'Категория', value: 'category'},
                {text: 'Описание', value: 'description'},
                {text: 'Цена', value: 'price'},
                {text: 'id', value: 'id'},
                {text: 'опубликовано', value: 'available'},
                {text: 'Бренд', value: 'BrandName'},
                {text: 'Новинка', value: 'newClothes'},
                {text: 'Производитель', value: 'clothingManufacturer'},
                {text: 'Размер', value: 'clothingSize'},
                {text: 'Скидка', value: 'discount'},
                {text: 'Акционная цена', value: 'promotionalPrice'},
                {text: 'Скидка', value: 'stokProduct'},
                {text: 'Фото одежды', value: 'FotoClothes'},
                {text: 'Видео одежды', value: 'VideoClothings'},
                {text: 'Удалить', value: 'DeleteClothings'},
            ],
        }),
        methods: {

            deleteLocation(id) {   // <-- новый метод
                db.collection('message').doc(id).delete()
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ]),
        },
        watch: {},
        props: {},
    }
</script>

<style scoped>

</style>