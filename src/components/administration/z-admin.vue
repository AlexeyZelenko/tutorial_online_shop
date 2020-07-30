<template>
	<div >
		<router-link :to="{name: 'catalog'}">
			<div
					style="height: 45px"
					class="v-catalog__link_to_admin">
				{{'Back to catalog' | localize }}
			</div>
		</router-link>
		<zTable/>
		<z-add-new-product/>
		</div>
</template>

<script>
    import 'material-design-icons-iconfont'
    import 'materialize-css/dist/js/materialize.min'
    import zAddNewProduct from './z-add-new-product'
    import zTable from './table/z-table'
    // import zAdminChat from './v-admin-chat'
    import {mapGetters} from 'vuex'

    export default {
        name: "zAdmin",
				components: {
					zAddNewProduct,
						zTable,
            // zAdminChat
				},
        data() {
            return {
                message: [],
                location2: [],
            }
        },
        computed: {
            ...mapGetters([
                'PRODUCTS'
            ])
        },
    }
</script>

