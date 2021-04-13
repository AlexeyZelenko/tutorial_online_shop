<template>
	<v-app id="inspire">
		<div>
			<template>
				<div class="vld-parent">
					<loading
							:active.sync="isLoading"
							:can-cancel="true"
							:is-full-page="fullPage"
							:on-cancel="onCancel"
					>

					</loading>

					<label><input type="checkbox" v-model="fullPage">Full page?</label>
					<button @click.prevent="doAjax">fetch Data</button>
				</div>
			</template>
			<!--ВЕРХНЯЯ ПАНЕЛЬ-->
			<div>
				<v-card>
					<v-app-bar
							app
							color="green darken-3"
							dark
							flat
					>
						<!--НАЗАД К КАТАЛОГУ-->
						<v-toolbar-title class="ml-0">
							<div>
								<v-btn :to="{name: 'catalog'}" icon>
									<i class="material-icons">reply</i>
								</v-btn>
							</div>
						</v-toolbar-title>
						<v-spacer></v-spacer>


						<!--правое МЕНЮ-->
						<template v-slot:extension>
							<v-tabs
									fixed-tabs
									slider-color="white"
									v-model="currentItem"
							>
								<v-tab
										:href="'#tab-' + item"
										:key="item"
										v-for="item in items"
								>
									{{ item }}
								</v-tab>

								<v-menu
										bottom
										left
										v-if="more.length"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-btn
												class="align-self-center mr-4"
												text
												v-bind="attrs"
												v-on="on"
										>
											Больше
											<v-icon right>mdi-menu-down</v-icon>
										</v-btn>
									</template>

									<v-list class="grey lighten-3">
										<v-list-item
												:key="item"
												@click="addItem(item)"
												v-for="item in more"
										>
											{{ item }}
										</v-list-item>
									</v-list>
								</v-menu>
							</v-tabs>
						</template>
					</v-app-bar>
				</v-card>
			</div>

			<!--			МЕНЮ-->
			<v-tabs-items v-model="currentItem">
				<v-tab-item
						:key="item"
						:value="'tab-' + item"
						v-for="item in items.concat(more)"
				>
					<v-card flat>
						<v-card-text>
							<h2>{{ item }}</h2>
							<div v-if="item === 'Товары'">
								<v-card>
									<!--Pagination-->
									<template>
										<v-card flat>
											<v-container fluid>
												<v-row class="child-flex">
													<div>
														<v-toolbar dark>
															<v-pagination
																	:length="pageCount"
																	v-model="page"
															></v-pagination>
														</v-toolbar>
													</div>
													<div style="flex-basis: 20%">
														<v-toolbar dark>
															<v-text-field
																	:value="itemsPerPage"
																	@input="itemsPerPage = parseInt($event, 10)"
																	label="Товаров на странице"
																	max="15"
																	min="-1"
																	style="margin-top: 25px"
																	type="number"
															></v-text-field>
														</v-toolbar>
													</div>
												</v-row>
											</v-container>
										</v-card>
									</template>

									<!--		ПОИСК-->
									<v-text-field
											append-icon="mdi-magnify"
											hide-details
											label="Поиск"
											single-line
											style="margin: 10px 0 5px 0"
											v-model="search"
									></v-text-field>
									<v-row align="center">
										<v-col cols="12">
											<v-select
													:items="Brand"
													label="Выбери Бренд"
													v-model="search"
											></v-select>
										</v-col>
									</v-row>
									<!--		ТАБЛИЦА-->
									<v-data-table
											:headers="headers"
											:items="PRODUCTS"
											:items-per-page="itemsPerPage"
											:page.sync="page"
											:search="search"
											@page-count="pageCount = $event"
											class="elevation-1"
											disable-sort
											hide-default-footer
											item-key="id"
									>
										<template
												style="height:190px;"
												v-slot:item.arrayImages1="{ item }">

											<img
													:src="(item.arrayImages1[0])"
													alt=""
													loading="lazy"
													style="max-width: 100px; max-height: 100px; margin: 5px"
													v-if="item.arrayImages1"
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
											<v-row justify="space-around">

												<v-avatar color="indigo" size="48">
													<v-icon
															@click="editItem(item)"
													>
														mdi-pencil
													</v-icon>
												</v-avatar>

												<v-avatar
														color="teal"
														size="48"
														style="margin-left: 10px"
												>
													<v-icon
															@click="deleteLocation(item)"
													>
														mdi-delete
													</v-icon>
												</v-avatar>
											</v-row>
										</template>

									</v-data-table>
								</v-card>
							</div>
						</v-card-text>
					</v-card>
<!--					<template v-if="item === 'Клиенты'">-->
<!--						<z-users/>-->
<!--					</template>-->
					<template v-if="item === 'Заказы'">
						<z-orders/>
					</template>
          <template v-if="item === 'Аналитика'">
            <z-size/>
          </template>
				</v-tab-item>
			</v-tabs-items>

			<!--		ВСПЛЫВАЮЩАЯ ПАНЕЛЬ-->
			<div>
				<v-dialog
						style="z-index: 100"
						v-model="dialog"
						width="400px"
				>
					<template v-slot:activator="{ on, attrs }">
						<!--		КНОПКА +-->
						<v-btn
								@click="dialog = !dialog"
								bottom
								color="pink"
								dark
								fab
								fixed
								right
								v-bind="attrs"
								v-on="on"
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
													label="Наименование товара"
													placeholder="Name"
													prepend-icon="create"
                          required
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

<!--МОДЕЛЬ + ЦЕНА-->
                  <v-card>
                    <v-app-bar
                        dark
                        color="#385F73"
                    >
                      <v-toolbar-title>Модель  + цена</v-toolbar-title>

                      <v-spacer></v-spacer>

                    </v-app-bar>
                    <v-expansion-panels>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 1
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите  модель
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.arrayModel[0] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Модель1-->
                          <v-container
                              class="py-2"
                              style="background-color: #dedddd"
                          >
                            <p>Блок 1</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-combobox
                                    v-model="editedItem.arrayModel[0]"
                                    :items="fruits"
                                    label="МОДЕЛЬ #1"
                                    chips
                                ></v-combobox>
                              </v-row>
                            </v-row>

                            <v-container fluid>
                              <v-row>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder="ОБЯЗАТЕЛЬНО"
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price[0]"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder=""
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price2[0]"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>

                          </v-container>

                          <v-divider class="mx-2"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 2
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите  модель
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.arrayModel[1] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Модель2-->
                          <v-container
                              class="py-2"
                              style="background-color: #dedddd"
                          >
                            <p>Блок 2</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-combobox
                                    v-model="editedItem.arrayModel[1]"
                                    :items="fruits"
                                    label="МОДЕЛЬ #1"
                                    chips
                                ></v-combobox>
                              </v-row>
                            </v-row>

                            <v-container fluid>
                              <v-row>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder="ОБЯЗАТЕЛЬНО"
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price[1]"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder=""
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price2[1]"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>

                          </v-container>

                          <v-divider class="mx-2"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 3
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите  модель
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.arrayModel[2] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Модель3-->
                          <v-container
                              class="py-2"
                              style="background-color: #dedddd"
                          >
                            <p>Блок 3</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-combobox
                                    v-model="editedItem.arrayModel[2]"
                                    :items="fruits"
                                    label="МОДЕЛЬ #1"
                                    chips
                                ></v-combobox>
                              </v-row>
                            </v-row>

                            <v-container fluid>
                              <v-row>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder="ОБЯЗАТЕЛЬНО"
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price[2]"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder=""
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price2[2]"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>

                          </v-container>

                          <v-divider class="mx-2"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 4
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите  модель
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.arrayModel[3] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Модель4-->
                          <v-container
                              class="py-2"
                              style="background-color: #dedddd"
                          >
                            <p>Блок 4</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-combobox
                                    v-model="editedItem.arrayModel[3]"
                                    :items="fruits"
                                    label="МОДЕЛЬ #1"
                                    chips
                                ></v-combobox>
                              </v-row>
                            </v-row>

                            <v-container fluid>
                              <v-row>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder="ОБЯЗАТЕЛЬНО"
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price[3]"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                                      label="Цена товара"
                                      placeholder=""
                                      prepend-icon="monetization_on"
                                      required
                                      type="Number"
                                      v-model="editedItem.price2[3]"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                            </v-container>

                          </v-container>

                          <v-divider class="mx-2"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                    </v-expansion-panels>
                  </v-card>

                  <!--							БРЭНД-->
                  <v-col
                      cols="12"
                  >
                    <v-select
                        :items="itemsCategories"
                        label="Выберите бренд"
                        placeholder="Бренд"
                        prepend-icon="create"
                        item-text="name"
                        return-object
                        v-model="editedItem.BrandName"
                    ></v-select>

                    <v-select
                        :items="editedItem.BrandName.arrayCategory"
                        :rules="[v => !!v || 'Пункт требуется']"
                        label="Выберите категорию"
                        placeholder="категория"
                        prepend-icon="create"
                        item-text="name"
                        v-model="editedItem.category"
                    ></v-select>

                  </v-col>

<!--															ОТОБРАЖЕНИЕ-->
									<div
                      class="check_box py-4"
                  >
										<v-checkbox
												color="success"
												hide-details
												label="Отображать в каталоге"
												v-model="editedItem.available"
										></v-checkbox>
										<v-checkbox
												color="orange"
												hide-details
												label="Новинка"
												v-model="editedItem.newProduct"
										></v-checkbox>
                    <v-checkbox
                        color="success"
                        hide-details
                        label="Наличие на складе"
                        v-model="editedItem.presence"
                    ></v-checkbox>


									</div>

<!--ВЫБОР ЦВЕТА_АККАРДЕОН + ФОТО-->
                  <v-card>
                    <v-app-bar
                        dark
                        color="#385F73"
                    >
                      <v-toolbar-title>Цвет + фото</v-toolbar-title>

                      <v-spacer></v-spacer>

                    </v-app-bar>
                    <v-expansion-panels>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 1
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите цвет модели
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.nameColor[0] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Цвет1-->
                          <v-container
                              class="py-2"
                              style="background-color: #dedddd"
                          >
                            <p>Блок 1</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-color-picker
                                    show-swatches
                                    :mode.sync="mode"
                                ></v-color-picker>
                              </v-row>
                            </v-row>

                            <v-container fluid>
                              <v-row>
                                <v-col
                                    class="py-6"
                                    cols="12"
                                >
                                  <v-text-field
                                      v-model="editedItem.nameColor[0]"
                                      label="НАЗВАНИЕ ЦВЕТА #1"
                                      placeholder="Введите название цвета #1"
                                      outlined
                                      dense
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                  <v-combobox
                                      v-model="editedItem.arrayColor[0]"
                                      :items="fruitsColors"
                                      label="ЦВЕТ #1"
                                      chips
                                  >
                                    <template v-slot:selection="data">
                                      <v-chip
                                          class="accent white--text"
                                          :key="JSON.stringify(data.item)"
                                          v-bind="data.attrs"
                                          :input-value="data.selected"
                                          :disabled="data.disabled"
                                          @click:close="data.parent.selectItem(data.item)"
                                      >
                                        <v-avatar
                                            :style="`background-color: ${data.item}`"
                                            class="white--text"
                                            left
                                        ></v-avatar>
                                        {{ data.item }}
                                      </v-chip>
                                    </template>
                                  </v-combobox>
                                </v-col>
                              </v-row>
                            </v-container>


                            <!--ФОТО1-->
                            <template
                                v-if="editedItem.arrayImages1 && editedItem.arrayImages1.length > 0"
                            >
                              <v-carousel>
                                <v-carousel-item
                                    :key="index"
                                    :src="(item)"
                                    reverse-transition="fade-transition"
                                    style="max-width: 400px; max-height: 600px"
                                    transition="fade-transition"
                                    v-for="(item, index) in editedItem.arrayImages1"
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

                                  <!--    Переместить фото в начало массива-->
                                  <template>
                                    <div class="text-center">
                                      <v-btn
                                          @click="FirstFoto(editedItem, item)"
                                          style="float: right; top: 1em;"
                                          rounded
                                          color="teal"
                                          dark
                                      >
                                        Сделать главной
                                      </v-btn>
                                    </div>
                                  </template>

                                </v-carousel-item>
                              </v-carousel>
                            </template>
                            <v-col cols="12">
                              <v-file-input
                                  :rules2="rules"
                                  accept="image/png, image/jpeg, image/bmp"
                                  color="deep-purple accent-4"
                                  counter
                                  label="Загрузка фотографий #1"
                                  multiple
                                  placeholder="Выберите фото"
                                  prepend-icon="mdi-camera"
                                  v-model="editedItem.File1"

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

                          </v-container>

                          <v-divider class="mx-2"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 2
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите цвет модели
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.nameColor[1] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Цвет2-->
                          <v-container
                              class="py-2"
                              style="background-color: #C8E6C9FF"
                          >
                            <p>Блок 2</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-color-picker
                                    show-swatches
                                    :mode.sync="mode"
                                ></v-color-picker>

                              </v-row>
                            </v-row>

                            <template>
                              <v-container fluid>
                                <v-row>
                                  <v-col
                                      class="py-6"
                                      cols="12"
                                  >
                                    <v-text-field
                                        v-model="editedItem.nameColor[1]"
                                        label="НАЗВАНИЕ ЦВЕТА #2"
                                        placeholder="Введите название цвета #2"
                                        outlined
                                        dense
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-combobox
                                        v-model="editedItem.arrayColor[1]"
                                        :items="fruitsColors"
                                        label="Выберите цвета"
                                        chips
                                    >
                                      <template #selection="data">
                                        <v-chip
                                            class="accent white--text"
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            :disabled="data.disabled"
                                            @click:close="data.parent.selectItem(data.item)"
                                        >
                                          <v-avatar
                                              :style="`background-color: ${data.item}`"
                                              class="white--text"
                                              left
                                          ></v-avatar>
                                          {{ data.item }}
                                        </v-chip>
                                      </template>
                                    </v-combobox>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </template>


                            <!--ФОТО2-->
                            <template v-if="editedItem.arrayImages2 && editedItem.arrayImages2.length > 0">
                              <v-carousel>
                                <v-carousel-item
                                    :key="article"
                                    :src="(item)"
                                    reverse-transition="fade-transition"
                                    style="max-width: 400px; max-height: 600px"
                                    transition="fade-transition"
                                    v-for="(item,article) in editedItem.arrayImages2"
                                >
                                  <v-btn
                                      @click="deleteFoto2(editedItem, item)"
                                      class="mx-2"
                                      color="pink"
                                      dark
                                      fab
                                      small
                                      style="float: right; top: 1em;"
                                  >
                                    <v-icon dark>mdi-delete</v-icon>
                                  </v-btn>

                                  <!--    Переместить фото в начало массива-->
                                  <template>
                                    <div class="text-center">
                                      <v-btn
                                          @click="FirstFoto2(editedItem, item)"
                                          style="float: right; top: 1em;"
                                          rounded
                                          color="teal"
                                          dark
                                      >
                                        Сделать главной
                                      </v-btn>
                                    </div>
                                  </template>

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
                                  v-model="editedItem.File2"

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
                          </v-container>

                          <v-divider class="mx-4"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 3
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите цвет модели
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.nameColor[2] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Цвет3-->
                          <v-container
                              class="py-2"
                              style="background-color: #E3F2FDFF"
                          >
                            <p>Блок 3</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-color-picker
                                    show-swatches
                                    :mode.sync="mode"
                                ></v-color-picker>

                              </v-row>
                            </v-row>

                            <template>
                              <v-container fluid>
                                <v-row>
                                  <v-col
                                      class="py-6"
                                      cols="12"
                                  >
                                    <v-text-field
                                        v-model="editedItem.nameColor[2]"
                                        label="НАЗВАНИЕ ЦВЕТА #3"
                                        placeholder="Введите название цвета #3"
                                        outlined
                                        dense
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-combobox
                                        v-model="editedItem.arrayColor[2]"
                                        :items="fruitsColors"
                                        label="Выберите цвета"
                                        chips
                                    >
                                      <template v-slot:selection="data">
                                        <v-chip
                                            class="accent white--text"
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            :disabled="data.disabled"
                                            @click:close="data.parent.selectItem(data.item)"
                                        >
                                          <v-avatar
                                              :style="`background-color: ${data.item}`"
                                              class="white--text"
                                              left
                                          ></v-avatar>
                                          {{ data.item }}
                                        </v-chip>
                                      </template>
                                    </v-combobox>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </template>

                            <!--ФОТО3-->
                            <template v-if="editedItem.arrayImages3 && editedItem.arrayImages3.length > 0">
                              <v-carousel>
                                <v-carousel-item
                                    :key="article"
                                    :src="(item)"
                                    reverse-transition="fade-transition"
                                    style="max-width: 400px; max-height: 600px"
                                    transition="fade-transition"
                                    v-for="(item,article) in editedItem.arrayImages3"
                                >
                                  <v-btn
                                      @click="deleteFoto3(editedItem, item)"
                                      class="mx-2"
                                      color="pink"
                                      dark
                                      fab
                                      small
                                      style="float: right; top: 1em;"
                                  >
                                    <v-icon dark>mdi-delete</v-icon>
                                  </v-btn>

                                  <!--    Переместить фото в начало массива-->
                                  <template>
                                    <div class="text-center">
                                      <v-btn
                                          @click="FirstFoto3(editedItem, item)"
                                          style="float: right; top: 1em;"
                                          rounded
                                          color="teal"
                                          dark
                                      >
                                        Сделать главной
                                      </v-btn>
                                    </div>
                                  </template>

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
                                  v-model="editedItem.File3"

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
                          </v-container>

                          <v-divider class="mx-4"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                      <v-expansion-panel>
                        <v-expansion-panel-header>
                          <template v-slot:default="{ open }">
                            <v-row no-gutters>
                              <v-col cols="4">
                                Блок 4
                              </v-col>
                              <v-col
                                  cols="8"
                                  class="text--secondary"
                              >
                                <v-fade-transition leave-absolute>
                                  <span
                                      v-if="open"
                                      key="0"
                                  >
                                    Выберите цвет модели
                                  </span>
                                  <span
                                      v-else
                                      key="1"
                                  >
                                    {{ editedItem.nameColor[3] }}
                                  </span>
                                </v-fade-transition>
                              </v-col>
                            </v-row>
                          </template>
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
                          <!--                  Цвет4-->
                          <v-container
                              class="py-2"
                              style="background-color: #FFCCBCFF"
                          >
                            <p>Блок 4</p>
                            <v-row
                                class="ma-2"
                                style="flex: 0 0 auto"
                            >
                              <v-row justify="space-around">
                                <v-color-picker
                                    show-swatches
                                    :mode.sync="mode"
                                ></v-color-picker>

                              </v-row>
                            </v-row>

                            <template>
                              <v-container fluid>
                                <v-row>
                                  <v-col
                                      class="py-6"
                                      cols="12"
                                  >
                                    <v-text-field
                                        v-model="editedItem.nameColor[3]"
                                        label="НАЗВАНИЕ ЦВЕТА #4"
                                        placeholder="Введите название цвета #4"
                                        outlined
                                        dense
                                    ></v-text-field>
                                  </v-col>
                                  <v-col cols="12">
                                    <v-combobox
                                        v-model="editedItem.arrayColor[3]"
                                        :items="fruitsColors"
                                        label="Выберите цвета"
                                        chips
                                    >
                                      <template v-slot:selection="data">
                                        <v-chip
                                            class="accent white--text"
                                            :key="JSON.stringify(data.item)"
                                            v-bind="data.attrs"
                                            :input-value="data.selected"
                                            :disabled="data.disabled"
                                            @click:close="data.parent.selectItem(data.item)"
                                        >
                                          <v-avatar
                                              :style="`background-color: ${data.item}`"
                                              class="white--text"
                                              left
                                          ></v-avatar>
                                          {{ data.item }}
                                        </v-chip>
                                      </template>
                                    </v-combobox>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </template>

                            <!--ФОТО4-->
                            <template v-if="editedItem.arrayImages4 && editedItem.arrayImages4.length > 0">
                              <v-carousel>
                                <v-carousel-item
                                    :key="article"
                                    :src="(item)"
                                    reverse-transition="fade-transition"
                                    style="max-width: 400px; max-height: 600px"
                                    transition="fade-transition"
                                    v-for="(item,article) in editedItem.arrayImages4"
                                >
                                  <v-btn
                                      @click="deleteFoto4(editedItem, item)"
                                      class="mx-2"
                                      color="pink"
                                      dark
                                      fab
                                      small
                                      style="float: right; top: 1em;"
                                  >
                                    <v-icon dark>mdi-delete</v-icon>
                                  </v-btn>

                                  <!--    Переместить фото в начало массива-->
                                  <template>
                                    <div class="text-center">
                                      <v-btn
                                          @click="FirstFoto4(editedItem, item)"
                                          style="float: right; top: 1em;"
                                          rounded
                                          color="teal"
                                          dark
                                      >
                                        Сделать главной
                                      </v-btn>
                                    </div>
                                  </template>

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
                                  v-model="editedItem.File4"

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
                          </v-container>

                          <v-divider class="mx-4"></v-divider>
                        </v-expansion-panel-content>
                      </v-expansion-panel>

                    </v-expansion-panels>
                  </v-card>

								</v-row>
							</v-container>

							<v-card-actions class="py-2">
								<v-spacer></v-spacer>
								<v-btn
										@click="close"
										color="blue darken-1"
										text
								>
									Отмена
								</v-btn>
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
	</v-app>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import { db } from '@/main'
    import Swal from 'sweetalert2'
    import firebase from 'firebase/app'
    import 'vue-loading-overlay/dist/vue-loading.css'
    import {
        Blockquote,
        Bold,
        BulletList,
        Code,
        HardBreak,
        Heading,
        History,
        HorizontalRule,
        Italic,
        Link,
        ListItem,
        OrderedList,
        Paragraph,
        Strike,
        TiptapVuetify,
        Underline
    } from 'tiptap-vuetify'

    // const zUsers = () => import('@/components/administration/z-users')
    const zSize = () => import('@/components/administration/z-size')
    const zOrders = () => import('@/components/administration/z-orders')
    const Loading = () => import('vue-loading-overlay')

    export default {
        name: "zAdmin",
        components: {
            Loading,
            TiptapVuetify,
            // zUsers,
            zOrders,
            zSize
        },
        data: () => ({
          trip: {
            name: '',
            location: null,
            start: null,
            end: null,
          },
          items2: [
            {
              action: 'mdi-ticket',
              color: 'blue',
              items: [
                  {
                    title: 'Модель №1 + цена',
                    id: 0,
                    background: '#dedddd'
                  },
                  {
                    title: 'Модель №2 + цена',
                    id: 1,
                    background: '#c6c695'
                  },
                  {
                    title: 'Модель №3 + цена',
                    id: 2,
                    background: '#E8F5E9'
                  },
                  {
                    title: 'Модель №4 + цена',
                    id: 3,
                    background: '#FFD180'
                  }
                  ],
              title: '"Модели" + "Цена"',
            },
          ],
          selectColors: [],
            mode: 'hexa',
            picker: null,
            isLoading: false,
            fullPage: true,
            currentItem: 'tab-Web',
            items: [
                'Товары', 'Заказы'
            ],
            more: [
                // 'Клиенты',
              'Аналитика',
            ],
            page: 1,
            pageCount: 0,
            itemsPerPage: 15,
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
            rules: {
                required: value => !!value || 'Обязательно.',
                counter: value => value.length >= 5 || 'Min 5 знаков',
                counter2: value => value.length <= 400 || 'Max 400 знаков',
            },
            rules2: [
                value => !value || value.size < 3000000 || 'Avatar size should be less than 5 MB!',
            ],
            categories: [],
            search: '',
            delete: '',
            products: [],
            dialog: false,
            drawer: null,
            arrayImages1: [],
            arrayImages2: [],
            arrayImages3: [],
            arrayImages4: [],
            editedIndex: -1,
            editedItem: {
                arrayModel: [],
                selectedFruits: [],
                nameColor: [],
                arrayColor: [],
                NameImages1: [],
                NameImages2: [],
                NameImages3: [],
                NameImages4: [],
                File1: [],
                File2: [],
                File3: [],
                File4: [],
                name: '',
                article: +new Date(),
                description: '',
                available: true,
                presence: true,
                category: '',
                price: [],
                price2: [],
                promotionalPrice: false,
                clothingManufacturer: '',
                VideoClothings: false,
                BrandName: '',
                FotoClothes: '',
                newProduct: false,
                arrayImages1: [],
                arrayImages2: [],
                arrayImages3: [],
                arrayImages4: [],
                seen: false
            },
            defaultItem: {
                seen: false,
                selectedFruits: [],
                arrayColor: [],
                nameColor: [],
                nameColor2: null,
                nameColor3: null,
                nameColor4: null,
                arrayModel: [],
                NameImages1: [],
                NameImages2: [],
                NameImages3: [],
                NameImages4: [],
                File1: [],
                File2: [],
                File3: [],
                File4: [],
                name: '',
                article: +new Date(),
                description: '',
                available: true,
                presence: true,
                category: '',
                price: [],
                price2: [],
                promotionalPrice: false,
                clothingManufacturer: '',
                VideoClothings: false,
                BrandName: '',
                FotoClothes: '',
                newProduct: false,
                arrayImages2: [],
                arrayImages3: [],
                arrayImages4: []
            },
            Brand: [
            'Apple', 'Google','Xiaomi', 'Samsung'
          ],
            itemsCategories: [
              {
                name: 'Apple',
                arrayCategory: ['Iphone', 'AirPods', 'IPad', 'Watch', 'MacBook']
              },
              {
                name: 'Google',
                arrayCategory: ['Google Pixel']
              },
              {
                name: 'Xiaomi',
                arrayCategory: ['phone', 'AirDots', 'SmartBand', 'Аксессуары_Xiaomi']
              },
              {
                name: 'Samsung',
                arrayCategory: ['Phone', 'Наушники', 'watch', 'Аксессуары_Samsung']
              },

            ],
            fruits: [
                '',
                '32',
                '64',
                '128',
                '256',
                '512'
            ],
            fruitsColors: [
                'black',
                'yellow',
                'cyan',
                'green',
                'white',
                'red',
                'grey',
                ''
            ],
            headers: [
                {
                    text: 'Название',
                    value: 'name',
                    align: 'start',
                    sortable: false,
                },
                {text: '', value: '1'},
                {text: 'Фото', value: 'arrayImages1'},
                {text: '', value: '2'},
                {text: '', value: '3'},
                {text: 'Бренд', value: 'BrandName.name'},
                {text: 'Категория', value: 'category'},
                {text: '', value: '4'},
                {text: 'Описание', value: 'description'},
                {text: '', value: '5'},
                // {text: 'Цена', value: 'price'},
                {text: 'Редактировать/Удалить', value: 'actions', sortable: false},
                {text: '===========================', value: ''},
            ],
            locations: []
        }),
        methods: {
            ...mapActions([
                'list_Users',
            ]),
            change (a) {
              console.log(a)
            },
            doAjax() {
                this.isLoading = true;
                // simulate AJAX
                setTimeout(() => {
                    this.isLoading = false
                }, 5000)
            },
            onCancel() {
                console.log('Пользователь отменил загрузчик.')
            },
            addItem(item) {
                const removed = this.items.splice(0, 1)
                this.items.push(
                    ...this.more.splice(this.more.indexOf(item), 1)
                )
                this.more.push(...removed)
                this.$nextTick(() => {
                    this.currentItem = 'tab-' + item
                })
            },
            deleteFoto(editedItem, item) {
                const array = editedItem.arrayImages1
                const arrayName = editedItem.NameImages1

                const index = array.indexOf(item);
                if (index > -1) {
                    array.splice(index, 1);
                    arrayName.splice(index, 1);
                }
                editedItem.arrayImages1 = array
                editedItem.NameImages1 = arrayName
            },
            FirstFoto(editedItem, item) {
            const array = editedItem.arrayImages1
            const arrayName = editedItem.NameImages1

            const index = array.indexOf(item);
            if (index > -1) {
              array.unshift(...array.splice(index,1));
              arrayName.unshift(...arrayName.splice(index,1));
            }
            editedItem.arrayImages1 = array
            editedItem.NameImages1 = arrayName
          },
            deleteFoto2(editedItem, item) {
              const array = editedItem.arrayImages2
              const arrayName = editedItem.NameImages2

              const index = array.indexOf(item);
              if (index > -1) {
                array.splice(index, 1);
                arrayName.splice(index, 1);
              }
              editedItem.arrayImages2 = array
              editedItem.NameImages2 = arrayName
            },
            FirstFoto2(editedItem, item) {
              const array = editedItem.arrayImages2
              const arrayName = editedItem.NameImages2

              const index = array.indexOf(item);
              if (index > -1) {
                array.unshift(...array.splice(index,1));
                arrayName.unshift(...arrayName.splice(index,1));
              }
              editedItem.arrayImages2 = array
              editedItem.NameImages2 = arrayName
            },
            deleteFoto3(editedItem, item) {
              const array = editedItem.arrayImages3
              const arrayName = editedItem.NameImages3

              const index = array.indexOf(item);
              if (index > -1) {
                array.splice(index, 1);
                arrayName.splice(index, 1);
              }
              editedItem.arrayImages3 = array
              editedItem.NameImages3 = arrayName
            },
            FirstFoto3(editedItem, item) {
              const array = editedItem.arrayImages3
              const arrayName = editedItem.NameImages3

              const index = array.indexOf(item);
              if (index > -1) {
                array.unshift(...array.splice(index,1));
                arrayName.unshift(...arrayName.splice(index,1));
              }
              editedItem.arrayImages3 = array
              editedItem.NameImages3 = arrayName
            },
            deleteFoto4(editedItem, item) {
              const array = editedItem.arrayImages4
              const arrayName = editedItem.NameImages4

              const index = array.indexOf(item);
              if (index > -1) {
                array.splice(index, 1);
                arrayName.splice(index, 1);
              }
              editedItem.arrayImages4 = array
              editedItem.NameImages4 = arrayName
            },
            FirstFoto4(editedItem, item) {
            const array = editedItem.arrayImages4
            const arrayName = editedItem.NameImages4

            const index = array.indexOf(item);
            if (index > -1) {
              array.unshift(...array.splice(index,1));
              arrayName.unshift(...arrayName.splice(index,1));
            }
            editedItem.arrayImages4 = array
            editedItem.NameImages4 = arrayName
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
            async close() {
                this.dialog = false
                await this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                    // window.location.reload()
                })
            },
            editItem(item) {
                this.editedIndex = this.products.indexOf(item)
                this.editedItem = Object.assign({}, item)
                this.dialog = true
            },
            async editThisProduct(editProduct) {

                this.isLoading = true

                const File1 = editProduct.File1
                const File2 = editProduct.File2
                const File3 = editProduct.File3
                const File4 = editProduct.File4

                const promises1 = []
                const promisesName1 = []

                const name = editProduct.name

                if (File1) {
                    for (let i = 0; i < File1.length; i++) {

                        const storageRef = await firebase.storage().ref();
                        // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                        // Создайте метаданные файла
                        let metadata = {
                            contentType: 'image/png',
                        };
                      console.log('name', name)
                        let nameTime = await +new Date() + i + name + '.png'
                        // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                        const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File1[i], metadata);


                        await promises1.push(
                              uploadTask
                                  .then(snapshot =>
                                      snapshot.ref.getDownloadURL()
                                  )
                          )
                        await promisesName1.push(
                            nameTime
                        )
                    }
                }

                const URLs = await Promise.all(promises1)
                const ArrayOld = editProduct.arrayImages1

                const NameImages1 = await Promise.all(promisesName1)
                const NameArrayOld1 = editProduct.NameImages1


                const ArrayFile1 = [...URLs, ...ArrayOld]
                const ArrayName1 = [...NameImages1, ...NameArrayOld1]

                const promises2 = []
                const promisesName2 = []
                if (File2) {
                  for (let i = 0; i < File2.length; i++) {

                    const storageRef = firebase.storage().ref();
                    // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                    // Создайте метаданные файла
                    let metadata = {
                      contentType: 'image/png',
                    };
                    let nameTime = +new Date() + i + name + '.png'
                    // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                    const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File2[i], metadata);


                    promises2.push(
                        uploadTask
                            .then(snapshot =>
                                snapshot.ref.getDownloadURL()
                            )
                    )
                    promisesName2.push(
                        nameTime
                    )
                  }
                }

              const NameImages2 = await Promise.all(promisesName2)
              const NameArrayOld2 = editProduct.NameImages2
              const ArrayName2 = [...NameImages2, ...NameArrayOld2]

                const URLs2 = await Promise.all(promises2)
                const ArrayOld2 = editProduct.arrayImages2
                const ArrayFile2 = [...URLs2, ...ArrayOld2]


                const promises3 = []
                const promisesName3 = []
                if (File3) {
                  console.log(File3.length)
                  for (let i = 0; i < File3.length; i++) {

                    const storageRef = firebase.storage().ref();
                    // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                    // Создайте метаданные файла
                    let metadata = {
                      contentType: 'image/png',
                    };
                    let nameTime = +new Date() + i + name + '.png'
                    // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                    const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File3[i], metadata);


                    promises3.push(
                        uploadTask
                            .then(snapshot =>
                                snapshot.ref.getDownloadURL()
                            )
                    )
                    promisesName3.push(
                        nameTime
                    )
                  }
                }

              const NameImages3 = await Promise.all(promisesName3)
              const NameArrayOld3 = editProduct.NameImages3
              const ArrayName3 = [...NameImages3, ...NameArrayOld3]

                const URLs3 = await Promise.all(promises3)
                const ArrayOld3 = editProduct.arrayImages3
                const ArrayFile3 = [...URLs3, ...ArrayOld3]


                const promises4 = []
                const promisesName4 = []
                if (File4) {
                  console.log(File4.length)
                  for (let i = 0; i < File4.length; i++) {

                    const storageRef = await firebase.storage().ref();
                    // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                    // Создайте метаданные файла
                    let metadata = {
                      contentType: 'image/png',
                    };
                    let nameTime = +new Date() + i + name + '.png'
                    // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                    const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File4[i], metadata);


                    promises4.push(
                        uploadTask
                            .then(snapshot =>
                                snapshot.ref.getDownloadURL()
                            )
                    )
                    await promisesName4.push(
                        nameTime
                    )
                  }
                }

              const NameImages4 = await Promise.all(promisesName4)
              const NameArrayOld4 = editProduct.NameImages4
              const ArrayName4 = [...NameImages4, ...NameArrayOld4]

                const URLs4 = await Promise.all(promises4)
                const ArrayOld4 = editProduct.arrayImages4
                const ArrayFile4 = [...URLs4, ...ArrayOld4]

                let id = editProduct.id

              // console.log('Запуск');

                const updateData = {
                  NameImages1: ArrayName1,
                  NameImages2: ArrayName2,
                  NameImages3: ArrayName3,
                  NameImages4: ArrayName4,
                  seen: editProduct.seen,
                  arrayImages1: ArrayFile1,
                  arrayImages2: ArrayFile2,
                  arrayImages3: ArrayFile3,
                  arrayImages4: ArrayFile4,
                  nameColor: editProduct.nameColor,
                  arrayModel: editProduct.arrayModel,
                  arrayColor: editProduct.arrayColor,
                  category: editProduct.category,
                  createdAt: editProduct.createdAt,
                  BrandName: editProduct.BrandName,
                  article: editProduct.article,
                  price: editProduct.price,
                  price2: editProduct.price2,
                  newProduct: editProduct.newProduct,
                  description: editProduct.description,
                }

              // console.log('updateData', updateData);

              await db.collection('products2')
                    .doc(id)
                    .update(updateData)
                    .then(() => {

                      this.isLoading = false
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Ваша работа была сохранена',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })

                    this.close()
            },
            async addLocation(addProduct) {

              // console.log('addProduct', addProduct)

              this.isLoading = true

              const createdAt = Date.now()
              const seen = false
              const File1 = addProduct.File1
              const File2 = addProduct.File2
              const File3 = addProduct.File3
              const File4 = addProduct.File4
              const BrandName = addProduct.BrandName
              const article = addProduct.article
              const available = addProduct.available
              const presence = addProduct.presence
              const category = addProduct.category
              const name = addProduct.name
              const price = addProduct.price
              const price2 = addProduct.price2
              const promotionalPrice = addProduct.promotionalPrice
              const newProduct = addProduct.newProduct
              const description = addProduct.description
              const arrayColor = addProduct.arrayColor
              const nameColor = addProduct.nameColor
              const arrayModel = addProduct.arrayModel

// ЗАГРУЗКА ФОТО1
                const promises = []
                const promisesName = []

                if (File1) {
                    for (let i = 0; i < File1.length; i++) {

                        const storageRef = await firebase.storage().ref();
                        // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                        // Создайте метаданные файла
                        let metadata = {
                            contentType: 'image/png',
                        };
                        const nameTime = +new Date() + i + name + '.png'
                      console.log(nameTime)
                        // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                        const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File1[i], metadata);

                        await promises.push(
                            uploadTask
                                .then(snapshot =>
                                    snapshot.ref.getDownloadURL()
                                )
                        )
                        await promisesName.push(
                            nameTime
                        )
                    }
                }

                const URLs = await Promise.all(promises)
                const NameImages1 = await Promise.all(promisesName)


              // ЗАГРУЗКА ФОТО2
              const promises2 = []
              const promisesName2 = []

              if (File2) {
                for (let i = 0; i < File2.length; i++) {

                  const storageRef = await firebase.storage().ref();
                  // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                  // Создайте метаданные файла
                  let metadata = {
                    contentType: 'image/png',
                  };
                  const nameTime = +new Date() + i + name + '.png'
                  console.log(nameTime)
                  // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                  const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File2[i], metadata);

                  await promises2.push(
                      uploadTask
                          .then(snapshot =>
                              snapshot.ref.getDownloadURL()
                          )
                  )
                  await promisesName2.push(
                      nameTime
                  )
                }
              }

              const URLs2 = await Promise.all(promises2)
              const NameImages2 = await Promise.all(promisesName2)

              // ЗАГРУЗКА ФОТО3
              const promises3 = []
              const promisesName3 = []

              if (File3) {
                for (let i = 0; i < File3.length; i++) {

                  const storageRef = await firebase.storage().ref();
                  // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                  // Создайте метаданные файла
                  let metadata = {
                    contentType: 'image/png',
                  };
                  const nameTime = +new Date() + i + name + '.png'
                  console.log(nameTime)
                  // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                  const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File3[i], metadata);

                  await promises3.push(
                      uploadTask
                          .then(snapshot =>
                              snapshot.ref.getDownloadURL()
                          )
                  )
                  await promisesName3.push(
                      nameTime
                  )
                }
              }

              const URLs3 = await Promise.all(promises3)
              const NameImages3 = await Promise.all(promisesName3)

              // ЗАГРУЗКА ФОТО4
              const promises4 = []
              const promisesName4 = []

              if (File4) {
                for (let i = 0; i < File4.length; i++) {

                  const storageRef = await firebase.storage().ref();
                  // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                  // Создайте метаданные файла
                  let metadata = {
                    contentType: 'image/png',
                  };
                  const nameTime = +new Date() + i + name + '.png'
                  console.log(nameTime)
                  // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                  const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File4[i], metadata);

                  await promises4.push(
                      uploadTask
                          .then(snapshot =>
                              snapshot.ref.getDownloadURL()
                          )
                  )
                  await promisesName4.push(
                      nameTime
                  )
                }
              }

              const URLs4 = await Promise.all(promises4)
              const NameImages4 = await Promise.all(promisesName4)


              let docRef = await db.collection('products2').add({
                NameImages1: NameImages1,
                NameImages2: NameImages2,
                NameImages3: NameImages3,
                NameImages4: NameImages4,
                nameColor,
                arrayColor,
                arrayModel: arrayModel,
                presence,
                seen,
                article,
                available,
                BrandName,
                newProduct,
                promotionalPrice,
                createdAt,
                category: category,
                arrayImages1: URLs,
                arrayImages2: URLs2,
                arrayImages3: URLs3,
                arrayImages4: URLs4,
                name,
                price,
                price2,
                description,
              });
              try {
                const docAdded = await docRef;
                await db.collection('products2').doc(docAdded.id).update({id: `${docAdded.id}`});
              } catch (err) {
                return err;
              }

              this.isLoading = false

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Ваша работа была сохранена',
                    showConfirmButton: false,
                    timer: 2000
                })

// Очистка полей
                // this.dialog = false
                  this.close()

            },
            getColor(price) {
                if (price < 500) return 'red'
                else if (price > 500) return 'orange'
                else if (price > 1000) return 'cyan'
                else if (price > 2000) return 'yellow'
                else if (price > 3000) return 'grey'
                else return 'green'
            },
            async deleteLocation(item) {
                Swal.fire({
                    title: 'Вы уверенны?',
                    text: "Вы не сможете восстановить это!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Да, удалить это!'
                })
                    .then((result) => {
                        if (result.value) {
                            this.isLoading = true
                            const File1 = item.arrayImages1
                            const File2 = item.arrayImages2
                            const File3 = item.arrayImages3
                            const File4 = item.arrayImages4

                            if (File1) {
                                for (let i = 0; i < File1.length; i++) {
                                    let storageRef = firebase.storage().ref()
                                    let nameTime = item.NameImages1[i]
                                    const Ref = storageRef.child(`assets/images/${item.name}/` + nameTime)
                                    Ref.delete().then(function () {
                                    }).catch(function (error) {
                                        console.log('удаление фото с всем объявлением' + error)
                                    })
                                }
                            }

                          if (File2) {
                            for (let i = 0; i < File2.length; i++) {
                              let storageRef = firebase.storage().ref()
                              let nameTime = item.NameImages2[i]
                              const Ref = storageRef.child(`assets/images/${item.name}/` + nameTime)
                              Ref.delete().then(function () {
                              }).catch(function (error) {
                                console.log('удаление фото с всем объявлением' + error)
                              })
                            }
                          }

                          if (File3) {
                            for (let i = 0; i < File3.length; i++) {
                              let storageRef = firebase.storage().ref()
                              let nameTime = item.NameImages3[i]
                              const Ref = storageRef.child(`assets/images/${item.name}/` + nameTime)
                              Ref.delete().then(function () {
                              }).catch(function (error) {
                                console.log('удаление фото с всем объявлением' + error)
                              })
                            }
                          }

                          if (File4) {
                            for (let i = 0; i < File4.length; i++) {
                              let storageRef = firebase.storage().ref()
                              let nameTime = item.NameImages4[i]
                              const Ref = storageRef.child(`assets/images/${item.name}/` + nameTime)
                              Ref.delete().then(function () {
                              }).catch(function (error) {
                                console.log('удаление фото с всем объявлением' + error)
                              })
                            }
                          }

                            let id = item.id
                            db.collection('products2').doc(id).delete()
                            this.isLoading = false
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
                'PRODUCTS',
                'GET_LIST_USERS'
            ]),
        formTitle() {
            return this.editedIndex === -1 ? 'Создание товара' : 'Форма редактирования'
        },
        },
        props: {
            source: String,
        },
        created() {
            this.initialize()
            this.list_Users()
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


