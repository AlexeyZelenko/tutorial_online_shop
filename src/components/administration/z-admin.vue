<template>
	<div >
		<router-link :to="{name: 'catalog'}">
			<div
					style="height: 45px"
					class="v-catalog__link_to_admin">
				{{'Back to catalog' | localize }}
			</div>
		</router-link>

		<z-add-new-product/>

		</div>
</template>

<script>
    import 'material-design-icons-iconfont'
    import 'materialize-css/dist/js/materialize.min'
    import zAddNewProduct from './z-add-new-product'

    export default {
        name: "zAdmin",
				components: {
					zAddNewProduct
				},
        data() {
            return {
                message: [],
                location2: [],
            }
        },
        computed: {},
    }
</script>

<styles>

</styles>