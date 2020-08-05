<template>
	<v-card>
		<v-card-title>
			<v-spacer></v-spacer>
			<v-text-field
					v-model="search"
					label="Пошук"
					append-icon="mdi-magnify"
					single-line
					hide-details
					loading loading-text="Завантаження... Будь ласка, зачекайте"
			></v-text-field>
		</v-card-title>
		<router-link :to="{name: 'edit', params: {selected: selected}}">
				<button
						style="margin: 10px"
						class="v-catalog_item_add_cart_btn btn"
						@click="editLocation(selected)">
					Редагувати вибране
				</button>
		</router-link>

		<button
				class="v-catalog_item_add_cart_btn btn"
				@click="deleteLocation">
			Видалити вибране
		</button>
		<v-data-table
				v-model="selected"
				:headers="headers"
				:items="PRODUCTS"
				:single-select="singleSelect"
				item-key="article"
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
		>
		</v-data-table>
	</v-card>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {db} from '@/main.js'
    import Swal from 'sweetalert2'


    export default {
        name: "zTable",
        data: () => ({
            search: '',
            delete: '',
            singleSelect: true,
            selected: [],
            products: [],
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
                // {text: 'id', value: 'id'},
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
            ],
            locations: []
        }),
        methods: {
            editLocation() {
                this.$emit('editClick', this.selected)
            },
            deleteLocation() {
                Swal.fire({
                    title: 'Ти впевнений?',
                    text: "Ви не зможете відновити це!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Так, видаліть його!'
                }).then((result) => {
                    if (result.value) {
                        let id = this.selected[0].id
                        db.collection('products').doc(id).delete()
                        Swal.fire(
                            'Видалено!',
                            'Ваш файл видалено.',
                            'success'
                        )
                    }
                })
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

<style>

</style>