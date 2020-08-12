<template>
	<v-card>
		<v-text-field
				append-icon="mdi-magnify"
				hide-details
				label="Поиск"
				single-line
				v-model="search"
		></v-text-field>
		<div class="z-table-button">
			<v-btn
					:to="{name: 'edit', params: {selected: selected}}"
					@click="editLocation(selected)"
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
				item-key="id"
				show-select
				v-model="selected"
		>
			<template
					style="height:190px;"
					v-slot:item.arrayImages="{ item }">
<!--				{{ item.arrayImages[0] }}-->

				<img
						:src="(item.arrayImages[0])" alt=""
						style="max-width: 100px; max-height: 100px; margin: 5px"
						v-if="item.arrayImages"
				>
			</template>

			<template v-slot:item.price="{ item }">
				<v-chip :color="getColor(item.price)" dark>{{ item.price }}</v-chip>
			</template>

			<template v-slot:item.description="{ item }">
				<span v-html="item.description" />
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
    // import {storage} from '@/main.js'
    import Swal from 'sweetalert2'
    import firebase from 'firebase/app'


    export default {
        name: "zTable",
        data: () => ({
            File: {},
            search: '',
            delete: '',
            singleSelect: true,
            selected: [],
            products: [],
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
            UploadFiles(File) {
                File = this.File
                // Points to the root reference
                const storageRef = firebase.storage().ref();

// Points to 'images'
                const imagesRef = storageRef.child('images');

// Points to 'images/space.jpg'
// Обратите внимание, что вы можете использовать переменные для создания дочерних значений
                const fileName = 'blouse2-1.jpg';
                const spaceRef = imagesRef.child(fileName);

// File path is 'images/space.jpg'
                const path = spaceRef.fullPath
                console.log(path)

// File name is 'space.jpg'
                const name = spaceRef.name
                console.log(name)

// File or Blob named mountains.jpg
//                 const obj = {hello: 'world'};
//                 const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
                let file = File

// Создайте метаданные файла
                let metadata = {
                    contentType: 'image/jpeg'
                };

// Загрузить файл и метаданные в объект 'images/mountains.jpg'
                var uploadTask = storageRef.child('assets/images/' + file.name).put(file, metadata);

// Следите за изменениями состояния, ошибками и завершением загрузки.
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
                    function (snapshot) {
                        // Получите информацию о ходе выполнения задачи,
                        // включая количество загруженных байтов и общее количество байтов, которые должны быть отправлены
                        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case firebase.storage.TaskState.PAUSED: // or 'paused'
                                console.log('Upload is paused');
                                break;
                            case firebase.storage.TaskState.RUNNING: // or 'running'
                                console.log('Upload is running');
                                break;
                        }
                    }, function (error) {

                        // Полный список кодов ошибок доступен на
                        // https://firebase.google.com/docs/storage/web/handle-errors
                        switch (error.code) {
                            case 'storage/unauthorized':
                                // У пользователя нет разрешения на доступ к объекту
                                break;

                            case 'storage/canceled':
                                // Пользователь отменил загрузку
                                break;


                            case 'storage/unknown':
                                // Произошла неизвестная ошибка, проверьте error.serverResponse
                                break;
                        }
                    }, function () {
                        // Загрузка завершена успешно, теперь мы можем получить URL для загрузки
                        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                            console.log('Файл доступен', downloadURL);
                        });
                    });
            },

            getColor(price) {
                if (price < 500) return 'red'
                else if (price > 500) return 'orange'
                else if (price > 1000) return 'cyan'
                else if (price > 2000) return 'yellow'
                else if (price > 3000) return 'grey'
                else return 'green'
            },
            editLocation(item) {
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
			display: flex
			align-items: center
			align-content: normal
			min-height: 100px
			background-size: auto
			background-color: #c8bb9d
			font-size: 1rem


</style>