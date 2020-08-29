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


			<v-spacer></v-spacer>
			<div
					v-if="isUserSignedIn"
					class="v-carousel-item">
				<slot>
					<img
							id="user-pic"
							:src="(getProfilePicUrl)"
							alt=""
					>
				</slot>
			</div>
			<div
					id="user-name"
			>{{getUserName}}
			</div>
			<v-btn
					:to="{name: 'catalog'}">
				Выйти
			</v-btn>
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
		import  firebase from 'firebase/app'

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
            isUserSignedIn() {
                return !!firebase.auth().currentUser;
            },
            getUserName() {
                return firebase.auth().currentUser.displayName;
						},
            getProfilePicUrl() {
								return firebase.auth().currentUser.photoURL || '/images/profile_placeholder.png';
						}
				}
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

