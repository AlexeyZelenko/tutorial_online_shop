<template>
	<v-card>

		<div class="z-table-button">

			<v-btn
					:to="{name: 'edit', params: {selected: selected}}"
					@click="editLocation()"
					class="ma-2"
					outlined
					style="background-color: #23af23; color: white">
				<v-icon
						left
				>
					mdi-pencil
				</v-icon>
				Редагувати вибране
			</v-btn>


		</div>

		<v-data-table
				:headers="headers"
				:items="PRODUCTS"
				:search="search"
				:single-select="singleSelect"
				class="elevation-1"
				item-key="article"
				show-select

				v-model="selected"
		>
			<template v-slot:item.image="{ item }" style="min-height: 100px">
				<v-chip :color="getColor(item.image)" dark>{{ item.image }}</v-chip>
				<img
						v-if="item.image"
						:src="require('@/assets/images/' + item.image)"
						style="max-width: 50px; max-height: 100px; margin: 5px"
				>
			</template>

			<template v-slot:item.price="{ item }">
				<v-chip :color="getColor(item.price)" dark>{{ item.price }}</v-chip>
			</template>

			<template v-slot:item.actions="{ item }">
<!--				<v-icon-->
<!--						@click="editLocation(item)"-->
<!--						class="mr-2"-->
<!--						small-->
<!--				>-->
<!--					mdi-pencil-->
<!--				</v-icon>-->


				<v-icon
						@click="deleteLocation(item)"
						small
				>
					mdi-delete
				</v-icon>
			</template>

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
                // {
                //     text: 'Название',
                //     value: 'name',
                // },
                {
                    text: 'Артикль',
                    value: 'article',
                    align: 'start',
                    sortable: false,
                },
                {text: 'Фото одежды', value: 'image'},
                // {text: 'Категория', value: 'category'},
                {text: 'Описание', value: 'description'},
                // {text: 'id', value: 'id'},
                // {text: 'опубликовано', value: 'available'},
                // {text: 'Бренд', value: 'BrandName'},
                // {text: 'Новинка', value: 'newClothes'},
                // {text: 'Производитель', value: 'clothingManufacturer'},
                // {text: 'Размер', value: 'clothingSize'},
                // {text: 'Скидка', value: 'discount'},
                // {text: 'Акционная цена', value: 'promotionalPrice'},
                // {text: 'Скидка', value: 'stokProduct'},
                // {text: 'Редактировать', value: 'editThisProduct'},

                {text: 'Цена', value: 'price'},
                // {text: 'Видео одежды', value: 'VideoClothings'},
                {text: 'Удалить', value: 'actions', sortable: false},
            ],
            locations: []
        }),
        methods: {
            getColor(price) {
                if (price < 875) return 'red'
                else if (price > 875) return 'orange'
                else return 'green'
            },
            editLocation(item) {
                // console.log(this.selected)
                // console.log(item.id)
                // console.log(this.selected[0])
                console.log(item)

                // this.$router.push('/edit')
                // this.$emit('editClick', this.selected)
            },
            deleteLocation(item) {
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
                        let id = item.id
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
    }
</script>

<style lang="sass">
	.z-table-button
		position: fixed
		right: 10%
		top: 85%
		width: 90%
		display: block
		z-index: 10

	.v-data-table__mobile-row
		height: 100px
		$data-table-regular-header-height: 100px

</style>