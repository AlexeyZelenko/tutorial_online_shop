<template>
	<div class="">
		{{selected.name}}
		<button @click="qaz">123</button>
		<!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->
		<form
				@submit="addLocation(selected)">
			<v-card>
				<v-card-title class="grey darken-2">
					{{'Create product' | localize}}
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
										label="Наименование одежды"
										v-model="name"
										:rules="[rules.counter]"
										:placeholder="[selected.name]"
								></v-text-field>
							</v-row>
						</v-col>
						<!--						ОПИСАНИЕ ТОВАРА-->
						<v-col cols="12">
							<v-text-field
									:placeholder="selected.description"
									:rules="[rules.counter, rules.counter2]"
									v-model="selected.description"
							></v-text-field>
						</v-col>
						<!--						АРТИКЛЬ-->
						<v-col cols="6">
							<v-text-field
									prepend-icon="mdi-account-card-details-outline"
									:placeholder="selected.article"
									v-model="selected.article"
							></v-text-field>
						</v-col>
						<!--						ЦЕНА-->
						<v-col cols="6">
							<v-text-field
									type="Number"
									prepend-icon=""
									label="Цена товара"
									:placeholder="selected[0].price"
									v-model="selected[0].price"
									:rules="[v => (v === Number.NaN) || 'Введите число!']"
									required
							></v-text-field>
						</v-col>
						<!--						Размер-->
						<v-col cols="12">
							<v-text-field
									type="Number"
									prepend-icon=""
									label="Размер одежды"
									:placeholder="selected.clothingSize"
									v-model="selected.clothingSize"
									:rules="[v => (v === Number.NaN) || 'Введите число!']"
							></v-text-field>
						</v-col>
						<!--Акционная ценна-->
						<v-col cols="12">
							<v-text-field
									type="Number"
									prepend-icon=""
									label="Ценна по акции"
									:placeholder="selected.promotionalPrice"
									v-model="selected.promotionalPrice"
									:rules="[v => (v === Number.NaN) || 'Введите число!']"
							></v-text-field>
						</v-col>
						<!--СКИДКА-->
						<v-col cols="12">
							<v-text-field
									type="Number"
									prepend-icon=""
									label="Скидка на товар"
									:placeholder="selected.discount"
									v-model="selected.discount"
									:rules="[v => (v === Number.NaN) || 'Введите число!']"
							></v-text-field>
						</v-col>
						<!--						КАТЕГОРИИ-->
						<v-col cols="6">
							<v-select
									prepend-icon=""
									:placeholder="[selected.category]"
									v-model="selected.category"
									:items="itemsCategories"
									:rules="[v => !!v || 'Пункт требуется']"
									label="Выберите категорию"
							></v-select>
						</v-col>
						<!--							ПРОИЗВОДИТЕЛЬ-->
						<v-col cols="6">
							<v-select
									prepend-icon=""
									:placeholder="[selected.clothingManufacturer]"
									v-model="selected.clothingManufacturer"
									:items="itemsclothingManufacturer"
									:rules="[v => !!v || 'Пункт требуется']"
									label="Выберите производителя"
							></v-select>
						</v-col>
						<!--						ОТОБРАЖЕНИЕ-->
						<div class="check_box">
							<v-checkbox
									label="Отображать в каталоге"
									v-model="selected.available"
							></v-checkbox>
							<v-checkbox
									label="Новинка"
									v-model="selected.newClothes"
							></v-checkbox>

							<v-checkbox
									label="Товар со скидкой"
									v-model="selected.stokProduct"
							></v-checkbox>
						</div>
						<!--ФОТО-->
						<v-col cols="12">
							<v-file-input
									label="Вибрати фото"
									filled
									prepend-icon="mdi-camera"
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
					>
						Сохранить
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
            selected: [],
            id: '',
            createdAt: '',
            name: '',
            article: '',
            description: '',
            available: null,
            category: '',
            image: '',
            price: null,
            discount: null,
            clothingSize: null,
            promotionalPrice: null,
            clothingManufacturer: '',
            VideoClothings: false,
            BrandName: '',
            FotoClothes: '',
            stokProduct: null,
            newClothes: true,
            drawer: null,
            select: null,
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
        // components: {},
        methods: {
            addLocation(selected) {
                this.selected = selected
                db.collection('products').add(this.selected).doc('id')
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