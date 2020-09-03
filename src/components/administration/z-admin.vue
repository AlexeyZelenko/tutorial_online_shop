<template>
	<v-app id="inspire">
		<!--		ВЕРХНЯЯ ПАНЕЛЬ-->
		<v-app-bar
				:clipped-left="$vuetify.breakpoint.lgAndUp"
				app
				color="green darken-3"
				dark
		>
			<!--НАЗАД К КАТАЛОГУ-->
			<v-toolbar-title class="ml-0 pl-4">
					<div>
						<v-btn icon :to="{name: 'catalog'}">
							<i class="material-icons">reply</i>
						</v-btn>
					</div>
			</v-toolbar-title>
		</v-app-bar>
		<div>
			<zTable/>
			<z-add-new-product/>
		</div>
	</v-app>
</template>

<script>
    import 'material-design-icons-iconfont'
    import 'materialize-css/dist/js/materialize.min'
    import zAddNewProduct from './z-add-new-product'
    import zTable from './table/z-table'
    import {mapGetters} from 'vuex'

    export default {
        name: "zAdmin",
        components: {
            zAddNewProduct,
            zTable,
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
            ]),
				},
    }
</script>

<style>
	#user-pic {
		top: -3px;
		position: relative;
		display: inline-block;
		background-repeat: no-repeat;
		width: 40px;
		height: 40px;
		background-size: 40px;
		border-radius: 20px;
	}
	#user-name {
		font-size: 15px;
		line-height: normal;
		padding-right: 5px;
		padding-left: 5px;
	}
</style>

