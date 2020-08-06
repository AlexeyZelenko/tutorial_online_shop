<template>
	<div class="">
		<!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->
		<form
				@submit="editThisProduct(selected[0].article, selected[0].available, selected[0].category, selected[0].image, selected[0].name, selected[0].price, selected[0].BrandName, selected[0].newClothes, selected[0].clothingManufacturer, selected[0].clothingSize, selected[0].discount, selected[0].promotionalPrice, selected[0].stokProduct, selected[0].FotoClothes, selected[0].VideoClothings)">
			<v-card>
				<v-card-title class="grey darken-2">
					Редактировать товар
				</v-card-title>
				<v-container>
					<v-row class="mx-2">
						<v-col
								class="align-center justify-space-between"
								cols="12"
						>
							<v-row
									align="center"
									class="mr-0"
							>
								<v-avatar
										size="40px"
										class="mx-3"
								>
									<img
											src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
											alt=""
									>
								</v-avatar>
								<!--								НАЗВАНИЕ-->
								<v-text-field
										prepend-icon="filter_1"
										label="Наименование одежды"
										v-model="selected[0].name"
										:rules="[rules.counter]"
										:placeholder="selected[0].name"
								></v-text-field>
							</v-row>
						</v-col>
						<!--						ОПИСАНИЕ ТОВАРА-->
						<v-col cols="12">
							<v-text-field
									prepend-icon="edit"
									:placeholder="selected[0].description"
									:rules="[rules.counter, rules.counter2]"
									v-model="selected[0].description"
							></v-text-field>
						</v-col>
						<!--						АРТИКЛЬ-->
						<v-col cols="6">
							<v-text-field
									prepend-icon="local_offer"
									:placeholder="selected[0].article"
									v-model="selected[0].article"
							></v-text-field>
						</v-col>
						<!--						ЦЕНА-->
						<v-col cols="6">
							<v-text-field
									prepend-icon="monetization_on"
									label="Цена товара"
									:placeholder="selected[0].price"
									v-model="selected[0].price"
							></v-text-field>
						</v-col>
						<!--						Размер-->
						<v-col cols="12">
							<v-text-field
									type="Number"
									prepend-icon=""
									label="Размер одежды"
									:placeholder="selected[0].clothingSize"
									v-model="selected[0].clothingSize"
									:rules="[v => (v === Number.NaN) || 'Введите число!']"
							></v-text-field>
						</v-col>
						<!--Акционная ценна-->
						<v-col cols="12">
							<v-text-field
									type="Number"
									prepend-icon="insert_emoticon"
									label="Ценна по акции"
									:placeholder="selected[0].promotionalPrice"
									v-model="selected[0].promotionalPrice"
									:rules="[v => (v === Number.NaN) || 'Введите число!']"
							></v-text-field>
						</v-col>
						<!--СКИДКА-->
						<v-col cols="12">
							<v-text-field
									type="Number"
									prepend-icon=""
									label="Скидка на товар"
									:placeholder="selected[0].discount"
									v-model="selected[0].discount"
									:rules="[v => (v === Number.NaN) || 'Введите число!']"
							></v-text-field>
						</v-col>
						<!--						КАТЕГОРИИ-->
						<v-col cols="6">
							<v-select
									prepend-icon=""
									:placeholder="selected[0].category"
									v-model="selected[0].category"
									:items="itemsCategories"
									:rules="[v => !!v || 'Пункт требуется']"
									label="Выберите категорию"
							></v-select>
						</v-col>
						<!--							ПРОИЗВОДИТЕЛЬ-->
						<v-col cols="6">
							<v-select
									prepend-icon=""
									:placeholder="selected[0].clothingManufacturer"
									v-model="selected[0].clothingManufacturer"
									:items="itemsclothingManufacturer"
									:rules="[v => !!v || 'Пункт требуется']"
									label="Выберите производителя"
							></v-select>
						</v-col>
						<!--						ОТОБРАЖЕНИЕ-->
						<div class="check_box">
							<v-checkbox
									label="Отображать в каталоге"
									v-model="selected[0].available"
							></v-checkbox>
							<v-checkbox
									label="Новинка"
									v-model="selected[0].newClothes"
							></v-checkbox>

							<v-checkbox
									label="Товар со скидкой"
									v-model="selected[0].stokProduct"
							></v-checkbox>
						</div>
						<!--ФОТО-->
						<v-col cols="12">
							<v-file-input
									label="Вибрати фото"
									filled
									prepend-icon="add_a_photo"
							></v-file-input>
						</v-col>
					</v-row>
				</v-container>
				<v-card-actions>
					<router-link :to="{name: 'catalog'}">
						<v-btn
								text
								color="primary"
						>
							Отмена
						</v-btn>
					</router-link>
					<v-btn
							text
							type="submit"
							@click="editThisProduct"
					>
						Сохранить изменения
					</v-btn>
				</v-card-actions>
			</v-card>
		</form>
	</div>
</template>

<script>
    import {db} from '@/main.js'

    export default {
        name: "zEditProduct",
        data: () => ({
            rules: {
                required: value => !!value || 'Обязательно.',
                counter: value => value.length >= 5 || 'Min 5 знаков',
                counter2: value => value.length <= 400 || 'Max 400 знаков',
            },
            itemsCategories: [
                'Куртка',
                'Ветровка',
                'Пальто',
                'Плащ',
                'Джинсы',
                'Брюки',
                'Кофта',
                'Футболка',
                'Рубашка',
                'Блузка',
                'Платье',
                'Костюмы',
            ],
            itemsclothingManufacturer: [
                'Турция',
                'Италия',
                'Китай'
            ],
        }),
        methods: {
            editThisProduct() {
                db.collection('products')
                    .doc(this.selected[0].id)
                    .update({
                        createdAt: this.selected[0].createdAt,
                        BrandName: this.selected[0].BrandName,
                        article: this.selected[0].article,
                        discount: this.selected[0].discount,
                        price: this.selected[0].price,
                        stokProduct: this.selected[0].stokProduct,
                        promotionalPrice: this.selected[0].promotionalPrice,
                        clothingSize: this.selected[0].clothingSize,
                        FotoClothes: this.selected[0].FotoClothes,
                        newClothes: this.selected[0].newClothes,
                        description: this.selected[0].description,
                        clothingManufacturer: this.selected[0].clothingManufacturer,
                    })
                    .then(() => {
                        console.log('user updated!')
                    })
            },
        },
        computed: {},
        watch: {},
        props: {
            selected: {
                type: Array,
                default() {
                    return []
                }
            }
        },
    }
</script>

<style scoped>

</style>