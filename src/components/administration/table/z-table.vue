<template>
	<v-data-table
			v-model="selected"
			:headers="headers"
			:items="PRODUCTS"
			:single-select="singleSelect"
			item-key="name"
			show-select
			class="elevation-1"
	>
		<template v-slot:top>
			<v-switch v-model="singleSelect" label="Single select" class="pa-3"></v-switch>
		</template>
	</v-data-table>
</template>

<script>
	import {mapGetters} from 'vuex'
  import {db} from '@/main.js'

  export default {
    name: "zTable",
    data: () => ({
        singleSelect: false,
        selected: [],
        headers: [
            {
                text: 'Название',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            { text: 'Артикль', value: 'article' },
            { text: 'Категория', value: 'category' },
            { text: 'Описание', value: 'description' },
            { text: 'Цена', value: 'price' },
            { text: 'id', value: 'id' },
            { text: 'опубликовано', value: 'available' },
        ],
    }),
    // components: {},
    methods: {
        addLocation(article, available, category, image, name, price) {      // <-- новый метод
                const createdAt = new Date()
                db.collection('products').add({article, available, createdAt, category, image, name, price})
            },
            deleteLocation(id) {   // <-- новый метод
                db.collection('message').doc(id).delete()
            }
    },
    computed: {
        ...mapGetters([
            'PRODUCTS'
        ]),
        products() {
            return {
                products: db.collection('products'),
            }
        },
    },
    watch: {},
    props: {},
  }
</script>

<style scoped>

</style>