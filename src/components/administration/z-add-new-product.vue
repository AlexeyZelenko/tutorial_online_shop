<template>
	<div>
		<!--		КНОПКА +-->
<!--		<v-btn-->
<!--				@click="dialog = !dialog"-->
<!--				bottom-->
<!--				color="pink"-->
<!--				dark-->
<!--				fab-->
<!--				fixed-->
<!--				right-->
<!--		>-->
<!--			<v-icon>mdi-plus</v-icon>-->
<!--		</v-btn>-->
		<!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->
		<v-dialog
				style="z-index: 100"
				v-model="dialog"
				width="800px"
		>
			<form
					@submit="addLocation(article, available, category, name, price, BrandName, newClothes, clothingManufacturer, clothingSize, discount, promotionalPrice, stokProduct, FotoClothes, VideoClothings)">
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
									<!--								НАЗВАНИЕ-->
									<v-text-field
											:rules="[rules.counter]"
											label="Наименование одежды"
											placeholder="Name"
											prepend-icon="check_circle"
											v-model="name"
									></v-text-field>
								</v-row>
							</v-col>
							<!--						ОПИСАНИЕ ТОВАРА-->
							<v-col cols="12">
								<tiptap-vuetify
										:extensions="extensions"
										placeholder="Описание товара"
										prepend-icon="edit"
										v-model="description"
								/>
							</v-col>
							<!--						АРТИКЛЬ-->
							<v-col cols="6">
								<v-text-field
										placeholder="article"
										prepend-icon="local_offer"
										required
										v-model="article"
								></v-text-field>
							</v-col>
							<!--						ЦЕНА-->
							<v-col cols="6">
								<v-text-field
										:rules="[v => (v !== Number.NaN) || 'Введите число!']"
										label="Цена товара"
										placeholder="ОБЯЗАТЕЛЬНО"
										prepend-icon="monetization_on"
										required
										type="Number"
										v-model="price"
								></v-text-field>
							</v-col>
							<!--						Размер-->
							<v-col cols="12">
								<v-text-field
										label="Размер одежды"
										placeholder="36-60"
										prepend-icon="done_outline"
										v-model="clothingSize"
								></v-text-field>
							</v-col>
							<!--Акционная ценна-->
							<v-col cols="12">
								<v-text-field
										:rules="[v => (v !== Number.NaN) || 'Введите число!']"
										label="Ценна по акции"
										placeholder="2000"
										prepend-icon="info"
										type="Number"
										v-model="promotionalPrice"
								></v-text-field>
							</v-col>
							<!--СКИДКА-->
							<v-col cols="12">
								<v-text-field
										:rules="[v => (v !== Number.NaN) || 'Введите число!']"
										label="Скидка на товар"
										placeholder="150"
										prepend-icon="info"
										type="Number"
										v-model="discount"
								></v-text-field>
							</v-col>
							<!--						КАТЕГОРИИ-->
							<v-col cols="6">
								<v-select
										:items="itemsCategories"
										:rules="[v => !!v || 'Пункт требуется']"
										label="Выберите категорию"
										placeholder="Категория"
										prepend-icon="rule"
										v-model="category"
								></v-select>
							</v-col>
							<!--							ПРОИЗВОДИТЕЛЬ-->
							<v-col cols="6">
								<v-select
										:items="itemsclothingManufacturer"
										label="Выберите производителя"
										placeholder="Производитель"
										prepend-icon="face"
										v-model="clothingManufacturer"
								></v-select>
							</v-col>
							<!--						ОТОБРАЖЕНИЕ-->
							<div class="check_box">
								<v-checkbox
										label="Отображать в каталоге"
										v-model="available"
								></v-checkbox>
								<v-checkbox
										label="Новинка"
										v-model="newClothes"
								></v-checkbox>

								<v-checkbox
										label="Товар со скидкой"
										v-model="stokProduct"
								></v-checkbox>
							</div>
	<!--ФОТО-->
							<v-col  cols="12">
								<v-file-input
										:rules2="rules"
										counter
										accept="image/png, image/jpeg, image/bmp"
										v-model="File"
										color="deep-purple accent-4"
										placeholder="Выберите фото"
										label="Загрузка фотографий"
										multiple
										prepend-icon="mdi-camera"

								>
									<template v-slot:selection="{ index, text }">
										<v-chip
												v-if="index < 1"
												color="deep-purple accent-4"
												dark
												label
												small
										>
											{{ text }}
										</v-chip>
										<span
												v-else-if="index === 1"
												class="overline grey--text text--darken-3 mx-2"
										>
											+{{ File.length - 1 }} Фото
										</span>

									</template>
								</v-file-input>
							</v-col>
	<!--ВИДЕО-->
							<!--						<v-file-input multiple label="File input"></v-file-input>-->

						</v-row>
					</v-container>
					<v-card-actions>
						<v-btn
								@click="dialog = false"
								color="primary"
								text
						>
							Отмена
						</v-btn>
						<v-btn
								text
								type="submit"
						>
							{{ loadingPopup ? 'Загрузка...' : 'Сохранить' }}
						</v-btn>
					</v-card-actions>
				</v-card>
			</form>
		</v-dialog>
	</div>
</template>
<script>
    import {db} from '@/main.js'
    import Swal from 'sweetalert2'
    import firebase from 'firebase/app'
    // import the-component and the necessary extensions
    import {
        TiptapVuetify,
        Heading,
        Bold,
        Italic,
        Strike,
        Underline,
        Code,
        Paragraph,
        BulletList,
        OrderedList,
        ListItem,
        Link,
        Blockquote,
        HardBreak,
        HorizontalRule,
        History
    } from 'tiptap-vuetify'

    // eslint-disable-next-line no-unused-vars
    const formDefault = {
        File: [],
        name: '',
        article: +new Date(),
        description: '',
        available: null,
        category: '',
        price: '',
        discount: null,
        clothingSize: 42,
        promotionalPrice: null,
        clothingManufacturer: '',
        VideoClothings: false,
        BrandName: '',
        FotoClothes: '',
        stokProduct: null,
        newClothes: true,
    }
    // const formTest = {
    //     File: [],
    //     name: 'gfdgfd',
    //     article: +new Date(),
    //     description: 'gfdgdf',
    //     available: null,
    //     category: '',
    //     price: '1000',
    //     discount: null,
    //     clothingSize: 44,
    //     promotionalPrice: null,
    //     clothingManufacturer: '',
    //     VideoClothings: false,
    //     BrandName: '',
    //     FotoClothes: '',
    //     stokProduct: null,
    //     newClothes: true,
    // }

    export default {
        name: "zAddNewProduct",
        components: {TiptapVuetify},
        props: {
            source: String,
        },
        data: () => ({
            loadingPopup: false,
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
                        levels: [1, 2, 3]
                    }
                }],
                Bold,
                Code,
                HorizontalRule,
                Paragraph,
                HardBreak
            ],
            ...formDefault, // ...formTest или ...formDefault
            rules2: [
                value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!',
            ],
            dialog: false,
            drawer: null,
            select: null,
            arrayImages: [],
						File: [],
            rules: {
                required: value => !!value || 'Обязательно.',
                counter: value => value.length >= 5 || 'Min 5 знаков',
                counter2: value => value.length <= 400 || 'Max 400 знаков',
            },
            itemsCategories: [
                'Куртки',
                'Ветровки',
                'Пальто',
                'Плащи',
                'Джинсы',
                'Брюки',
                'Кофты',
                'Футболки',
                'Рубашки',
                'Блузки',
                'Платья',
                'Костюмы',
            ],
            itemsclothingManufacturer: [
                'Турция',
                'Италия',
                'Китай',
                '',
            ],

        }),
        methods: {
            async addLocation(arrayImages, File, article, available, category, name, promotionalPrice, stokProduct,  newClothes, BrandName, discount, clothingSize, clothingManufacturer, price, description) {
                const createdAt = new Date()
                File = this.File
                BrandName = this.BrandName
                article = this.article
                discount = this.discount
                available = this.available
                category = this.category
                name = this.name
                price = this.price
                stokProduct = this.stokProduct
                promotionalPrice = this.promotionalPrice
                clothingSize = this.clothingSize
                newClothes = this.newClothes
                description = this.description
                clothingManufacturer = this.clothingManufacturer
                arrayImages = this.arrayImages
// ЗАГРУЗКА ФОТО
                const promises = []

                for (let i = 0; i < File.length; i++) {

                    const storageRef = firebase.storage().ref();
                    // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                    // Создайте метаданные файла
                    let metadata = {
                        contentType: 'image/jpeg',
												name: +new Date(),
                    };
                    // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                    const uploadTask = storageRef.child('assets/images/' + File[i].name).put(File[i], metadata);

                    promises.push(
											uploadTask
													.then(snapshot =>
															snapshot.ref.getDownloadURL()
													)
										)
                }

                this.loadingPopup = true

								const URLs = await Promise.all(promises)

								await db.collection('products').add({
										article,
										available,
										BrandName,
										discount,
										newClothes,
										clothingManufacturer,
										clothingSize,
										promotionalPrice,
										stokProduct,
										createdAt,
										category,
										arrayImages: URLs,
										name,
										price,
										description,
								})

                this.loadingPopup = false

                Swal.fire({
										position: 'top-end',
										icon: 'success',
										showConfirmButton: false,
										timer: 1500
								})
								arrayImages.length=0;
								this.dialog = false
            },
        },
    }
</script>

<style>
	.check_box {
		display: flex;
		justify-content: space-around;;
	}
</style>
