<template>
	<div>
		<v-card>
			<div class="text-center pt-2">
				<v-pagination v-model="page" :length="pageCount"></v-pagination>
				<v-text-field
						:value="itemsPerPage"
						label="Товаров на странице"
						type="number"
						min="-1"
						max="15"
						@input="itemsPerPage = parseInt($event, 10)"
				></v-text-field>
			</div>
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
					:page.sync="page"
					:items-per-page="itemsPerPage"
					hide-default-footer
					@page-count="pageCount = $event"
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

			<!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->

			<v-dialog
					style="z-index: 100"
					v-model="dialog"
					width="400px"
			>
				<template v-slot:activator="{ on, attrs }">
					<!--		КНОПКА +-->
					<v-btn
							@click="dialog = !dialog"
							v-bind="attrs"
							v-on="on"
							bottom
							color="pink"
							dark
							fab
							fixed
							left
					>
						<v-icon>mdi-plus</v-icon>
					</v-btn>
				</template>
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
												prepend-icon="create"
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
								<v-col cols="12">
									<v-text-field
											placeholder="article"
											prepend-icon="local_offer"
											required
											v-model="editedItem.article"
									></v-text-field>
								</v-col>
								<!--						ЦЕНА-->
								<v-col cols="12">
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
											prepend-icon="create"
											v-model="editedItem.clothingSize"
									></v-text-field>


								</v-col>
								<!--						Бренд-->
								<v-col cols="12">
									<v-text-field
											label="Брэнд"
											placeholder="Пьер Кардэн"
											prepend-icon="create"
											v-model="editedItem.BrandName"
									></v-text-field>
								</v-col>
								<!--						КАТЕГОРИИ-->
								<v-col cols="12">
									<v-select
											:items="itemsCategories"
											:rules="[v => !!v || 'Пункт требуется']"
											label="Выберите категорию"
											placeholder="Категория"
											prepend-icon="create"
											v-model="editedItem.category"
									></v-select>
								</v-col>
								<!--							ПРОИЗВОДИТЕЛЬ-->
								<v-col cols="12">
									<v-select
											:items="itemsclothingManufacturer"
											label="Выберите производителя"
											placeholder="Производитель"
											prepend-icon="create"
											v-model="editedItem.clothingManufacturer"
									></v-select>
								</v-col>
								<!--						ОТОБРАЖЕНИЕ-->
								<div class="check_box">
									<v-checkbox
											label="Отображать в каталоге"
											color="success"
											v-model="available"
											hide-details
									></v-checkbox>
									<v-checkbox
											label="Новинка"
											v-model="editedItem.newClothes"
											color="orange"
											hide-details
									></v-checkbox>
									<v-checkbox
											label="Товар со скидкой"
											v-model="editedItem.promotionalPrice"
											color="indigo darken-3"
											hide-details
									></v-checkbox>
								</div>
								<!--ФОТО-->
								<template v-if="editedItem.arrayImages.length > 0">
									<v-carousel>
										<v-carousel-item
												:key="id"
												:src="(item)"
												style="max-width: 400px; max-height: 600px"
												reverse-transition="fade-transition"
												transition="fade-transition"
												v-for="(item,id) in editedItem.arrayImages"
										>
											<v-btn
													@click="deleteFoto(editedItem, item)"
													class="mx-2"
													color="pink"
													dark
													fab
													small
													style="float: right; top: 1em;"
											>
												<v-icon dark>mdi-delete</v-icon>
											</v-btn>
										</v-carousel-item>
									</v-carousel>
								</template>
								<v-col cols="12">
									<v-file-input
											:rules2="rules"
											accept="image/png, image/jpeg, image/bmp"
											color="deep-purple accent-4"
											counter
											label="Загрузка фотографий"
											multiple
											placeholder="Выберите фото"
											prepend-icon="mdi-camera"
											v-model="editedItem.File"

									>
										<template>
											<v-file-input
													counter
													label="File input"
													multiple
													show-size
											></v-file-input>
										</template>

									</v-file-input>
								</v-col>

							</v-row>
						</v-container>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn @click="close" color="blue darken-1" text>Отмена</v-btn>
							<v-btn
									@click="save"
									color="blue darken-1"
									text
									type="submit"
							>
								Сохранить
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

    const formDefault = {
        NameImages: [],
        File: [],
        name: '',
        article: +new Date(),
        description: '',
        available: null,
        category: '',
        price: '',
        clothingSize: 42,
        promotionalPrice: false,
        clothingManufacturer: '',
        VideoClothings: false,
        BrandName: '',
        FotoClothes: '',
        newClothes: true,
    }

    export default {
        name: "zTable",
        components: {TiptapVuetify},
        data: () => ({
            page: 1,
            pageCount: 0,
            itemsPerPage: 1,
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
            rules: {
                required: value => !!value || 'Обязательно.',
                counter: value => value.length >= 5 || 'Min 5 знаков',
                counter2: value => value.length <= 400 || 'Max 400 знаков',
            },
            rules2: [
                value => !value || value.size < 5000000 || 'Avatar size should be less than 5 MB!',
            ],
            search: '',
            delete: '',
            products: [],
            dialog: false,
            drawer: null,
            arrayImages: [],
            editedIndex: -1,
            editedItem: {
                NameImages: [],
                File: [],
                name: '',
                article: +new Date(),
                description: '',
                available: null,
                category: '',
                price: 0,
                clothingSize: 42,
                promotionalPrice: false,
                clothingManufacturer: '',
                VideoClothings: false,
                BrandName: '',
                FotoClothes: '',
                newClothes: true,
                arrayImages: []
            },
            defaultItem: {
                NameImages: [],
                File: [],
                name: '',
                article: +new Date(),
                description: '',
                available: null,
                category: '',
                price: 0,
                clothingSize: 42,
                promotionalPrice: false,
                clothingManufacturer: '',
                VideoClothings: false,
                BrandName: '',
                FotoClothes: '',
                newClothes: true,
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
                {text: '', value: ''},
                {text: '', value: ''},
                {text: 'Категория', value: 'category'},
                {text: '', value: ''},
                {text: 'Описание', value: 'description'},
                // {text: 'id', value: 'id'},
                // {text: 'опубликовано', value: 'available'},
                // {text: 'Новинка', value: 'newClothes'},
                // {text: 'Акционная цена', value: 'promotionalPrice'},
                // {text: 'Редактировать', value: 'editThisProduct'},
                {text: '', value: ''},
                {text: 'Цена', value: 'price'},
                {text: 'Размер', value: 'clothingSize'},
                {text: 'Бренд', value: 'BrandName'},
                {text: 'Производитель', value: 'clothingManufacturer'},
                // {text: 'Видео одежды', value: 'VideoClothings'},
                {text: 'Редактировать/Удалить', value: 'actions', sortable: false},
                {text: '===============================', value: ''},
            ],
            locations: []
        }),
        methods: {
            deleteFoto(editedItem, item) {
                console.log(editedItem)
                console.log(item)


                const array = editedItem.arrayImages
                const arrayName = editedItem.NameImages

                const index = array.indexOf(item);
                if (index > -1) {
                    array.splice(index, 1);
                    arrayName.splice(index, 1);
                }

                editedItem.arrayImages = array
                editedItem.NameImages = arrayName


            },
            initialize() {
                this.products = this.PRODUCTS
            },
            save() {
                if (this.editedIndex > -1) {
                    const editProduct = Object.assign(this.products[this.editedIndex], this.editedItem)
                    this.editThisProduct(editProduct)
                } else {
                    const addProduct = this.editedItem
                    this.addLocation(addProduct)
                }
                this.close()
            },
            close() {
                this.dialog = false
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
										// if(this.defaultItem) {
                    //     // window.location.reload()
                    //     console.log(1)
										// }

                })
            },
            editItem(item) {
                this.editedIndex = this.products.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            async editThisProduct(editProduct) {

                const File = editProduct.File
                const promises = []
								if (File) {
                    for (let i = 0; i < File.length; i++) {

                        const storageRef = firebase.storage().ref();
                        // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                        // Создайте метаданные файла
                        let metadata = {
                            contentType: 'image/jpeg',
                        };
                        let nameTime = +new Date()
                        // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                        const uploadTask = storageRef.child('assets/images/' + nameTime + '.jpg').put(File[i], metadata);

                        promises.push(
                            uploadTask
                                .then(snapshot =>
                                    snapshot.ref.getDownloadURL()
                                )
                        )
                    }
								}
                const URLs = await Promise.all(promises)
                const ArrayOld = editProduct.arrayImages
                const ArrayFile = [...URLs, ...ArrayOld]
                let id = editProduct.id

                db.collection('products')
                    .doc(id)
                    .update({
                        arrayImages: ArrayFile,
                        category: editProduct.category,
                        createdAt: editProduct.createdAt,
                        BrandName: editProduct.BrandName,
                        article: editProduct.article,
                        price: editProduct.price,
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
            async addLocation(addProduct, arrayImages, File, article, available, category, name, promotionalPrice, newClothes, BrandName, clothingSize, clothingManufacturer, price, description) {
                const createdAt = new Date()
                File = addProduct.File
                BrandName = addProduct.BrandName
                article = addProduct.article
                available = addProduct.available
                category = addProduct.category
                name = addProduct.name
                price = addProduct.price
                promotionalPrice = addProduct.promotionalPrice
                clothingSize = addProduct.clothingSize
                newClothes = addProduct.newClothes
                description = addProduct.description
                clothingManufacturer = addProduct.clothingManufacturer
                arrayImages = addProduct.arrayImages
// ЗАГРУЗКА ФОТО
                const promises = []
                const promisesName = []

								if(File) {
                    for (let i = 0; i < File.length; i++) {

                        const storageRef = firebase.storage().ref();
                        // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                        // Создайте метаданные файла
                        let metadata = {
                            contentType: 'image/jpeg',
                        };
                        const nameTime = +new Date() + '.jpg'
                        console.log(nameTime)
                        // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                        const uploadTask = storageRef.child('assets/images/' + nameTime).put(File[i], metadata);

                        promises.push(
                            uploadTask
                                .then(snapshot =>
                                    snapshot.ref.getDownloadURL()
                                )
                        )
                        promisesName.push(
                            nameTime
                        )
                    }
								}

                const URLs = await Promise.all(promises)
                const NameImages = await Promise.all(promisesName)

                await db.collection('products').add({
                    NameImages: NameImages,
                    article,
                    available,
                    BrandName,
                    newClothes,
                    clothingManufacturer,
                    clothingSize,
                    promotionalPrice,
                    createdAt,
                    category,
                    arrayImages: URLs,
                    name,
                    price,
                    description,
                })

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Ваша работа была сохранена',
                    showConfirmButton: false,
                    timer: 2000
                })
                arrayImages = [];
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
                else if (clothingSize > 36 - 40) return 'orange'
                else if (clothingSize > 42 - 44) return 'cyan'
                else if (clothingSize > 45 - 46) return 'yellow'
                else if (clothingSize > 47 - 50) return 'grey'
                else return 'green'
            },
            async deleteLocation(item) {
                Swal.fire({
                    title: 'Ти впевнений?',
                    text: "Ви не зможете відновити це!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Так, видаліть його!'
                })
										.then((result) => {
                    if (result.value) {
                        const File = item.arrayImages


                        for (let i = 0; i < File.length; i++) {
                            let storageRef = firebase.storage().ref()
                            let nameTime = item.NameImages[i]
                            const Ref = storageRef.child('assets/images/' + nameTime)
                            Ref.delete().then(function () {
                                console.log('Фото удаленно!')
                            }).catch(function (error) {
                                console.log('удаление фото с всем объявлением' + error)
                            })
                        }

                        let id = item.id
                        db.collection('products').doc(id).delete()
                        Swal.fire(
                            'Удаленно!',
                            'Ваш продукт удален.',
                            'success'
                        )
                    }
                })

            }
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ]),
            formTitle() {
                return this.editedIndex === -1 ? 'Создание нового продукта' : 'Форма редактирования'
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