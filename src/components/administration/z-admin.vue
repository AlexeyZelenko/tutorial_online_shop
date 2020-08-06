<template>
	<v-app id="inspire">
		<!--		ВЕРХНЯЯ ПАНЕЛЬ-->
		<v-app-bar
				:clipped-left="$vuetify.breakpoint.lgAndUp"
				app
				color="green darken-3"
				dark
		>
<!--						<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>-->
			<!--НАЗАД К КАТАЛОГУ-->
			<v-toolbar-title class="ml-0 pl-4">
				<router-link :to="{name: 'catalog'}">
					<div>
						<v-btn icon>
							<i class="material-icons">reply</i>
						</v-btn>
						<!--					{{'Back to catalog' | localize }}-->
					</div>
				</router-link>
			</v-toolbar-title>

			<!--			ПАНЕЛЬ АДМИНИСТРАТОРА-->
			<v-toolbar-title
					style="width: 300px"
					class="ml-0 pl-5"
			>
				<span class="hidden-sm-and-down">{{ 'Admin panel' | localize}}</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<!--КНОПКА-КОЛОКОЛЬЧИК-->
			<v-btn icon>
				<v-icon>mdi-bell</v-icon>
			</v-btn>
		</v-app-bar>
		<div>
			<!--		<router-link :to="{name: 'catalog'}">-->
			<!--			<div-->
			<!--					style="height: 45px"-->
			<!--					class="v-catalog__link_to_admin">-->
			<!--				{{'Back to catalog' | localize }}-->
			<!--			</div>-->
			<!--		</router-link>-->
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
            ])
        },
    }
</script>

