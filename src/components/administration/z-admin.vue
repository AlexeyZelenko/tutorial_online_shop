<template>
	<div class="">
		<router-link :to="{name: 'catalog'}">
			<div class="v-catalog__link_to_admin">{{'Back to catalog' | localize }}</div>
		</router-link>

		<z-add-new-product/>

		<div>
			<h5
				style="color: darkcyan"
			>
				Добавить карточку с товаром
			</h5>
		</div>

		<form
				@submit="addLocation(name, article, available, category, image, name, price)">
			<div class="form-group">
        <textarea
					placeholder="Название"
					v-model="name">
        </textarea>
				<textarea
						placeholder="Добавить артикль товара"
						v-model="article">
          </textarea>
			</div>
			<div class="modal-footer">
				<button
						class="btn btn-info"
						type="submit">
					Создать
				</button>
			</div>
		</form>
		</div>

</template>

<script>
    import 'material-design-icons-iconfont'
    import 'materialize-css/dist/js/materialize.min'
    import zAddNewProduct from './z-add-new-product'
    import {db} from '@/main.js'

    export default {
        name: "zAdmin",
				components: {
					zAddNewProduct
				},
        data() {
            return {
                openMessage: true,
                message: [],
                location2: [],
                name: '',
                article: '',
                available: true,
                category: '',
                image: '',
                price: 0,
            }
        },
        computed: {},
        methods: {
            addLocation(article, available, category, image, name, price) {      // <-- новый метод
                const createdAt = new Date()
                db.collection('products').add({article, available, createdAt, category, image, name, price})
            },
            deleteLocation(id) {   // <-- новый метод
                db.collection('message').doc(id).delete()
            }
        }
    }
</script>

<styles>

</styles>