<template>
	<div>
		<v-card>
			<!--		ПОИСК-->
			<v-text-field
					append-icon="mdi-magnify"
					hide-details
					label="Поиск"
					single-line
					v-model="search"
			></v-text-field>
			<!--		ТАБЛИЦА-->
			<v-data-table
					:headers="headers"
					:items="PRODUCTS"
					:search="search"
					class="elevation-1"
					item-key="id"
					v-model="selected"
			>
				<template
						style="height:190px;"
						v-slot:item.arrayImages="{ item }">

					<img
							:src="(item.arrayImages[0])" alt=""
							style="max-width: 100px; max-height: 100px; margin: 5px"
							v-if="item.arrayImages"
					>
				</template>

				<template v-slot:item.price="{ item }">
					<v-chip :color="getColor(item.price)" dark>{{ item.price }}</v-chip>
				</template>

				<template v-slot:item.clothingSize="{ item }">
					<v-chip :color="getColor2(item.clothingSize)" dark>{{ item.clothingSize }}</v-chip>
				</template>

				<template v-slot:item.description="{ item }">
					<span v-html="item.description"/>
				</template>

				<template v-slot:item.actions="{ item }">
					<v-icon
							@click="editItem(item)"
							class="mr-2"
							small
					>
						mdi-pencil
					</v-icon>
					<v-icon
							@click="deleteLocation(item)"
							small
					>
						mdi-delete
					</v-icon>
				</template>

			</v-data-table>
		</v-card>
		<div>
			<!--		КНОПКА +-->
			<v-btn
					@click="dialog = !dialog"
					bottom
					color="pink"
					dark
					fab
					fixed
					right
			>
				<v-icon>mdi-plus</v-icon>
			</v-btn>
			<!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->

			<v-dialog
					style="z-index: 100"
					v-model="dialog"
					width="800px"
			>
				<form>
					<v-card>
						<v-card-title>
							<span class="headline">{{ formTitle }}</span>
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
												v-model="editedItem.name"
										></v-text-field>
									</v-row>
								</v-col>
								<!--						ОПИСАНИЕ ТОВАРА-->
								<v-col cols="12">
									<tiptap-vuetify
											:extensions="extensions"
											placeholder="Описание товара"
											prepend-icon="edit"
											v-model="editedItem.description"
									/>
								</v-col>
								<!--						АРТИКЛЬ-->
								<v-col cols="6">
									<v-text-field
											placeholder="article"
											prepend-icon="local_offer"
											required
											v-model="editedItem.article"
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
											v-model="editedItem.price"
									></v-text-field>
								</v-col>
								<!--						Размер-->
								<v-col cols="12">
									<v-text-field
											label="Размер одежды"
											placeholder="36-60"
											prepend-icon="done_outline"
											v-model="editedItem.clothingSize"
									></v-text-field>


								</v-col>
								<!--						Бренд-->
								<v-col cols="12">
									<v-text-field
											label="Брэнд"
											placeholder="Пьер Кардэн"
											prepend-icon="done_outline"
											v-model="editedItem.BrandName"
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
											v-model="editedItem.promotionalPrice"
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
											v-model="editedItem.discount"
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
											v-model="editedItem.category"
									></v-select>
								</v-col>
								<!--							ПРОИЗВОДИТЕЛЬ-->
								<v-col cols="6">
									<v-select
											:items="itemsclothingManufacturer"
											label="Выберите производителя"
											placeholder="Производитель"
											prepend-icon="face"
											v-model="editedItem.clothingManufacturer"
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
											v-model="editedItem.newClothes"
									></v-checkbox>

									<v-checkbox
											label="Товар со скидкой"
											v-model="editedItem.stokProduct"
									></v-checkbox>
								</div>
								<!--ФОТО-->
								<v-col  cols="12">
									<v-file-input
											:rules2="rules"
											counter
											accept="image/png, image/jpeg, image/bmp"
											v-model="editedItem.File"
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

							</v-row>
						</v-container>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" text @click="close">Отмена</v-btn>
							<v-btn
									color="blue darken-1"
									text
									type="submit"
									@click="save"
							>
								{{ loadingPopup ? 'Загрузка...' : 'Сохранить' }}
							</v-btn>
						</v-card-actions>
					</v-card>
				</form>
			</v-dialog>
		</div>
	</div>

</template>

<script>
    import {mapGetters} from 'vuex'
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
        name: "zTable",
        components: {TiptapVuetify},
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
            // File: {},
            search: '',
            delete: '',
            singleSelect: true,
            selected: [],
            products: [],
            dialog: false,
            drawer: null,
            select: null,
            arrayImages: [],
            editedIndex: -1,
            File: [],
            editedItem: {
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
            },
            defaultItem: {
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
            },
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
            headers: [
                // {text: 'Название', value: 'name',},
                {
                    text: 'Артикль',
                    value: 'article',
                    align: 'start',
                    sortable: false,
                },
                {text: '', value: ''},
                {text: 'Фото одежды', value: 'arrayImages'},
                // {text: 'Категория', value: 'category'},
                {text: '', value: ''},
                {text: '', value: ''},
                {text: 'Описание', value: 'description'},
                // {text: 'id', value: 'id'},
                // {text: 'опубликовано', value: 'available'},
                // {text: 'Новинка', value: 'newClothes'},
                // {text: 'Скидка', value: 'discount'},
                // {text: 'Акционная цена', value: 'promotionalPrice'},
                // {text: 'Скидка', value: 'stokProduct'},
                // {text: 'Редактировать', value: 'editThisProduct'},
                {text: '', value: ''},
                {text: 'Цена', value: 'price'},
                {text: 'Размер', value: 'clothingSize'},
                {text: 'Бренд', value: 'BrandName'},
                {text: 'Производитель', value: 'clothingManufacturer'},
                // {text: 'Видео одежды', value: 'VideoClothings'},
                {text: 'Удалить', value: 'actions', sortable: false},
                {text: '===============================', value: ''},
            ],
            locations: []
        }),
        methods: {
            initialize () {
                this.products = this.PRODUCTS
						},
            save () {
                if (this.editedIndex > -1) {
                    const editProduct = Object.assign(this.products[this.editedIndex], this.editedItem)
                    this.editThisProduct(editProduct)
                } else {
                    const addProduct = this.editedItem
                    this.addLocation(addProduct)
                }
                this.close()
            },
            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },
            editItem (item) {
                this.editedIndex = this.products.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            editThisProduct(editProduct) {
                db.collection('products')
                    .doc(editProduct.id)
                    .update({
                        createdAt: editProduct.createdAt,
                        BrandName: editProduct.BrandName,
                        article: editProduct.article,
                        discount: editProduct.discount,
                        price: editProduct.price,
                        stokProduct: editProduct.stokProduct,
                        promotionalPrice: editProduct.promotionalPrice,
                        clothingSize: editProduct.clothingSize,
                        newClothes: editProduct.newClothes,
                        description: editProduct.description,
                        clothingManufacturer: editProduct.clothingManufacturer,
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
            async addLocation(addProduct, arrayImages, File, article, available, category, name, promotionalPrice, stokProduct,  newClothes, BrandName, discount, clothingSize, clothingManufacturer, price, description) {
                const createdAt = new Date()
                File = addProduct.File
                BrandName = addProduct.BrandName
                article = addProduct.article
                discount = addProduct.discount
                available = addProduct.available
                category = addProduct.category
                name = addProduct.name
                price = addProduct.price
                stokProduct = addProduct.stokProduct
                promotionalPrice = addProduct.promotionalPrice
                clothingSize = addProduct.clothingSize
                newClothes = addProduct.newClothes
                description = addProduct.description
                clothingManufacturer = addProduct.clothingManufacturer
                arrayImages = addProduct.arrayImages
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
            getColor(price) {
                if (price < 500) return 'red'
                else if (price > 500) return 'orange'
                else if (price > 1000) return 'cyan'
                else if (price > 2000) return 'yellow'
                else if (price > 3000) return 'grey'
                else return 'green'
            },
            getColor2(clothingSize) {
                if (clothingSize < 36) return 'red'
                else if (clothingSize > 36-40) return 'orange'
                else if (clothingSize > 42-44) return 'cyan'
                else if (clothingSize > 45-46) return 'yellow'
                else if (clothingSize > 47-50) return 'grey'
                else return 'green'
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
// Удаление фото с FirebaseStorage
//                         // Create a reference to the file to delete
//                         const storageRef = firebase.storage().ref();
//                         const desertRef = storageRef.child('assets/images/' + item.//название фото);
// // Delete the file
//                         desertRef.delete().then(function () {
//                             console.log('Фото удаленно!')
//                             // File deleted successfully
//                         }).catch(function (error) {
//                             console.log(error)
//                             // Uh-oh, an error occurred!
//                         });


                        Swal.fire(
                            'Видалено!',
                            'Ваш файл видалено.',
                            'success'
                        )
                    }
                })
            }
        },
        watch: {
            dialog (val) {
                val || this.close()
            },
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ]),
            formTitle () {
                return this.editedIndex === -1 ? 'Создать новый' : 'Редактировать'
            },
        },
        props: {
            source: String,
        },
				created() {
            this.initialize()
        }
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
			display: flex
			align-items: center
			align-content: normal
			min-height: 100px
			background-size: auto
			background-color: #c8bb9d
			font-size: 1rem


</style>