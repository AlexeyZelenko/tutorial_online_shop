<template>
	<div class="z-edit-product">
		<form
				@submit="editThisProduct(...selected[0])">
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
<!--							<v-text-field-->
<!--									prepend-icon="edit"-->
<!--									:placeholder="selected[0].description"-->
<!--									:rules="[rules.counter, rules.counter2]"-->
<!--									v-model="selected[0].description"-->
<!--							></v-text-field>-->
							<tiptap-vuetify
									prepend-icon="edit"
									:placeholder="selected[0].description"
									v-model="selected[0].description"
									:extensions="extensions"
							/>
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
						<!--						<v-col cols="12">-->
						<!--							<v-file-input-->
						<!--									label="Вибрати фото"-->
						<!--									filled-->
						<!--									prepend-icon="add_a_photo"-->
						<!--							></v-file-input>-->
						<!--						</v-col>-->
					</v-row>
				</v-container>
				<v-card-actions>

					<v-btn
							:to="{name: 'admin'}"
							text
							style="background-color: darkolivegreen; margin: 0 3px; color: whitesmoke"
					>
						Отмена
					</v-btn>

					<v-btn
							:to="{name: 'admin'}"
							text
							style="background-color: darkolivegreen; color: whitesmoke"
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
    import Swal from 'sweetalert2'
    // import the-component and the necessary extensions
    import { TiptapVuetify, Heading, Bold, Italic, Strike, Underline, Code, Paragraph, BulletList, OrderedList, ListItem, Link, Blockquote, HardBreak, HorizontalRule, History } from 'tiptap-vuetify'

    export default {
        name: "zEditProduct",
        components: { TiptapVuetify  },
        data: () => ({
            // declare extensions you want to use
            extensions: [
                History,
                Blockquote,
                Link,
                Underline,
                Strike,
                Italic,
                ListItem,
                BulletList,
                OrderedList,
                [Heading, {
                    options: {
                        levels: [4, 5, 6]
                    }
                }],
                Bold,
                Code,
                HorizontalRule,
                Paragraph,
                HardBreak
            ],
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
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Ваша работа была сохранена',
                            showConfirmButton: false,
                            timer: 1500
                        })
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