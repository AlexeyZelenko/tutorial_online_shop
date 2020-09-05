<template>
	<div class="">
		<v-card flat>
			<v-card-text>
				<div v-if="item === 'Клиенты'">
					<v-card>
						<p>{{GET_LIST_USERS}}</p>
					</v-card>
				</div>
			</v-card-text>
		</v-card>
		<v-card
				class="mx-auto"
				width="256"
				tile
		>
			<v-navigation-drawer permanent>
				<v-system-bar></v-system-bar>
				<v-list>
					<v-list-item>
						<v-list-item-avatar>
							<v-img src="https://cdn.vuetifyjs.com/images/john.png"></v-img>
						</v-list-item-avatar>
					</v-list-item>

					<v-list-item link>
						<v-list-item-content>
							<v-list-item-title class="title">John Leider</v-list-item-title>
							<v-list-item-subtitle>john@vuetifyjs.com</v-list-item-subtitle>
						</v-list-item-content>

						<v-list-item-action>
							<v-icon>mdi-menu-down</v-icon>
						</v-list-item-action>
					</v-list-item>
				</v-list>
				<v-divider></v-divider>
				<v-list
						nav
						dense
				>
					<v-list-item-group v-model="item" color="primary">
						<v-list-item
								v-for="(item, i) in items"
								:key="i"
						>
							<v-list-item-icon>
								<v-icon v-text="item.icon"></v-icon>
							</v-list-item-icon>

							<v-list-item-content>
								<v-list-item-title v-text="item.text"></v-list-item-title>
							</v-list-item-content>
						</v-list-item>
					</v-list-item-group>
				</v-list>
			</v-navigation-drawer>
		</v-card>
	</div>
</template>

<script>
  export default {
    name: "zUsers",
    data: () => ({
        item: 0,
        items: [
            { text: 'Товары', icon: 'mdi-cart' },
            { text: 'Общая сумма', icon: 'mdi-cash-multiple' },
            { text: 'Телефон', icon: 'mdi-phone' },
            { text: '№ Отделения Новой Почты', icon: 'mdi-account-check' },
            { text: 'Ф.И.О', icon: 'mdi-account-circle' },
        ],
    }),
    // components: {},
    methods: {},
    computed: {},
    watch: {},
    props: {},
  }
</script>

<style scoped>

</style>