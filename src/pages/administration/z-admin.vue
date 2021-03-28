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
													:items="categories"
													label="Выбери категорию"
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
											item-key="article"
									>
										<template
												style="height:190px;"
												v-slot:item.arrayImages="{ item }">

											<img
													:src="(item.arrayImages[0])"
													alt=""
													loading="lazy"
													style="max-width: 100px; max-height: 100px; margin: 5px"
													v-if="item.arrayImages"
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
					<template v-if="item === 'Клиенты'">
						<z-users/>
					</template>
					<template v-if="item === 'Заказы'">
						<z-orders/>
					</template>
					<template v-if="item === 'Размеры'">
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
								left
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

									<!--						АРТИКЛЬ-->
<!--									<v-col cols="12">-->
<!--										<v-text-field-->
<!--												placeholder="article"-->
<!--												prepend-icon="local_offer"-->
<!--												required-->
<!--												v-model="editedItem.article"-->
<!--										></v-text-field>-->
<!--									</v-col>-->

									<!--						ЦЕНА-->
									<v-col cols="12">
										<v-text-field
												:rules="[v => (v !== Number.NaN) || 'Введите число!']"
												label="Цена товара"
												placeholder="ОБЯЗАТЕЛЬНО"
												prepend-icon="monetization_on"
												required
												type="Number"
												v-model="editedItem.price"
										></v-text-field>
									</v-col>

                  <!--						ЦЕНА Завышенная-->
                  <v-col cols="12">
                    <v-text-field
                        :rules="[v => (v !== Number.NaN) || 'Введите число!']"
                        label="Предыдущая цена товара"
                        placeholder="ОБЯЗАТЕЛЬНО"
                        prepend-icon="monetization_on"
                        required
                        type="Number"
                        v-model="editedItem.price2"
                    ></v-text-field>
                  </v-col>

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
                        v-model="editedItem.category"
                    ></v-select>

                  </v-col>

									<!--						КАТЕГОРИИ-->
<!--									<v-col cols="12">-->
<!--										<v-select-->
<!--												:items="itemsCategories[item]"-->
<!--												:rules="[v => !!v || 'Пункт требуется']"-->
<!--												label="Выберите категорию"-->
<!--												placeholder="категория"-->
<!--												prepend-icon="create"-->
<!--												v-model="editedItem.category"-->
<!--										></v-select>-->
<!--									</v-col>-->

<!--                  Модель-->
                  <template>
                    <v-container fluid>
                      <v-select
                          v-model="editedItem.arrayModel"
                          :items="fruits"
                          label="Выберите модели"
                          multiple
                      >
                        <template v-slot:prepend-item>
                          <v-list-item
                              ripple
                              @click="toggle"
                          >
                            <v-list-item-action>
                              <v-icon :color="editedItem.arrayModel.length > 0 ? 'indigo darken-4' : ''">
                                {{ icon }}
                              </v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                              <v-list-item-title>
                                Выбрать все
                              </v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-divider class="mt-2"></v-divider>
                        </template>
                        <template v-slot:append-item>
                          <v-divider class="mb-2"></v-divider>
                          <v-list-item disabled>
                            <v-list-item-avatar color="grey lighten-3">
                              <v-icon>
                                mdi-food-apple
                              </v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content v-if="likesAllFruit">
                              <v-list-item-title>
                                Вы выбрали все модели!
                              </v-list-item-title>
                            </v-list-item-content>

                            <v-list-item-content v-else-if="likesSomeFruit">
                              <v-list-item-title>
                                Кол-во моделей
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ editedItem.arrayModel.length }}
                              </v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-content v-else>
                              <v-list-item-title>
                                Выберите модели для телефона
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Давай, сделай выбор выше!
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                      </v-select>
                    </v-container>
                  </template>

<!--															ОТОБРАЖЕНИЕ-->
									<div class="check_box">
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
												color="indigo darken-3"
												hide-details
												label="Товар со скидкой"
												v-model="editedItem.promotionalPrice"
										></v-checkbox>
                    <v-checkbox
                        color="success"
                        hide-details
                        label="Наличие на складе"
                        v-model="editedItem.presence"
                    ></v-checkbox>


									</div>


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
                        v-if="editedItem.arrayImages && editedItem.arrayImages.length > 0"
                    >
                      <v-carousel>
                        <v-carousel-item
                            :key="article"
                            :src="(item)"
                            reverse-transition="fade-transition"
                            style="max-width: 400px; max-height: 600px"
                            transition="fade-transition"
                            v-for="(item,article) in editedItem.arrayImages"
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
                          v-model="editedItem.File"

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
                                v-model="editedItem.arrayColor2"
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
                                v-model="editedItem.arrayColor3"
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
                                v-model="editedItem.arrayColor4"
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



								</v-row>
							</v-container>
							<v-card-actions>
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

    const zUsers = () => import('@/components/administration/z-users')
    const zOrders = () => import('@/components/administration/z-orders')
    const zSize = () => import('@/components/administration/z-size')
    const Loading = () => import('vue-loading-overlay')

    const formDefault = {
        arrayModel: [],
        NameImages: [],
        selectedFruits: [],
        File: [],
        name: '',
        article: +new Date(),
        description: '',
        available: null,
        presence: true,
        category: '',
        price: '',
        price2: '',
        clothingSize: 42,
        promotionalPrice: false,
        clothingManufacturer: '',
        VideoClothings: false,
        BrandName: '',
        FotoClothes: '',
        newProduct: true,
    }

    export default {
        name: "zAdmin",
        components: {
            Loading,
            TiptapVuetify,
            zUsers,
            zOrders,
            zSize
        },
        data: () => ({
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
                'Клиенты', 'Аналитика',
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
            ...formDefault, // ...formTest или ...formDefault
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
            arrayImages: [],
            arrayImages2: [],
            arrayImages3: [],
            arrayImages4: [],
            editedIndex: -1,
            editedItem: {
                arrayModel: [],
                selectedFruits: [],
                nameColor: [],
                // nameColor2: '',
                // nameColor3: '',
                // nameColor4: '',
                arrayColor: [],
                arrayColor2: [],
                arrayColor3: [],
                arrayColor4: [],
                NameImages: [],
                File: [],
                File2: [],
                File3: [],
                File4: [],
                name: '',
                article: +new Date(),
                description: '',
                available: true,
                presence: true,
                category: '',
                price: null,
                price2: null,
                promotionalPrice: false,
                clothingManufacturer: '',
                VideoClothings: false,
                BrandName: '',
                FotoClothes: '',
                newProduct: true,
                arrayImages: [],
                arrayImages2: [],
                arrayImages3: [],
                arrayImages4: [],
                seen: false
            },
            defaultItem: {
                seen: false,
                selectedFruits: [],
                arrayColor: [],
                arrayColor2: [],
                arrayColor3: [],
                arrayColor4: [],
                nameColor: [],
                nameColor2: null,
                nameColor3: null,
                nameColor4: null,
                arrayModel: [],
                NameImages: [],
                File: [],
                File2: [],
                File3: [],
                File4: [],
                name: '',
                article: +new Date(),
                description: '',
                available: true,
                presence: true,
                category: '',
                price: null,
                price2: null,
                promotionalPrice: false,
                clothingManufacturer: '',
                VideoClothings: false,
                BrandName: '',
                FotoClothes: '',
                newProduct: true,
                arrayImages2: [],
                arrayImages3: [],
                arrayImages4: []
            },
            itemsCategories: [
              // 'Iphone', 'airpods', 'ipad', 'watch', 'macbook', 'google pixel', 'airdots', 'smartband','phone', 'наушники', 'watch', 'аксессуары',
              {
                name: 'Apple',
                arrayCategory: ['iphone', 'airpods', 'ipad', 'watch', 'macbook']
              },
              {
                name: 'Google',
                arrayCategory: ['google pixel']
              },
              {
                name: 'Xiaomi',
                arrayCategory: ['airdots', 'smartband', 'аксессуары']
              },
              {
                name: 'Samsung',
                arrayCategory: ['phone', 'наушники', 'watch', 'аксессуары']
              },

            ],
            fruits: [
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
                'grey'
            ],
            arrayModel: null,
            BrandName: [
                'Apple',
                'Google',
                'Xiaomi',
                'Samsung',
            ],
            headers: [
                {
                    text: 'Название',
                    value: 'name',
                    align: 'start',
                    sortable: false,
                },
                {text: '', value: '1'},
                {text: 'Фото', value: 'arrayImages'},
                {text: '', value: '2'},
                {text: '', value: '3'},
                {text: 'Бренд', value: 'BrandName'},
                {text: 'Категория', value: 'category'},
                {text: '', value: '4'},
                {text: 'Описание', value: 'description'},
                {text: '', value: '5'},
                {text: 'Цена', value: 'price'},
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
            toggle () {
              this.$nextTick(() => {
                if (this.likesAllFruit) {
                  this.selectedFruits = []
                } else {
                  this.selectedFruits = this.fruits.slice()
                }
              })
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
                const array = editedItem.arrayImages
                const arrayName = editedItem.NameImages

                const index = array.indexOf(item);
                if (index > -1) {
                    array.splice(index, 1);
                    arrayName.splice(index, 1);
                }
                editedItem.arrayImages = array
                editedItem.NameImages = arrayName
            },
            FirstFoto(editedItem, item) {
            const array = editedItem.arrayImages
            const arrayName = editedItem.NameImages

            const index = array.indexOf(item);
            if (index > -1) {
              array.unshift(...array.splice(index,1));
              arrayName.unshift(...arrayName.splice(index,1));
            }
            editedItem.arrayImages = array
            editedItem.NameImages = arrayName
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
              console.log('editProduct', editProduct)

                this.isLoading = true

                const File = editProduct.File
                const File2 = editProduct.File2
                const File3 = editProduct.File3
                const File4 = editProduct.File4

              console.log('1')
              console.log(File)


                const promises = []
                if (File) {
                  console.log(File.length)
                    for (let i = 0; i < File.length; i++) {

                        const storageRef = firebase.storage().ref();
                        // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                        // Создайте метаданные файла
                        let metadata = {
                            contentType: 'image/png',
                        };
                        let nameTime = +new Date() + i + name + '.png'
                        // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                        const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File[i], metadata);


                        promises.push(
                            uploadTask
                                .then(snapshot =>
                                    snapshot.ref.getDownloadURL()
                                )
                        )
                    }
                }
                const URLs = await Promise.all(promises)
                const ArrayOld = editProduct.arrayImages

              console.log('editProduct.arrayImages', editProduct.arrayImages)

                const ArrayFile = [...URLs, ...ArrayOld]

                const promises2 = []
                if (File2) {
                  console.log(File2.length)
                  for (let i = 0; i < File2.length; i++) {

                    const storageRef = firebase.storage().ref();
                    // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                    // Создайте метаданные файла
                    let metadata = {
                      contentType: 'image/png',
                    };
                    let nameTime = await +new Date() + i + name + '.png'
                    // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                    const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File2[i], metadata);


                    promises2.push(
                        uploadTask
                            .then(snapshot =>
                                snapshot.ref.getDownloadURL()
                            )
                    )
                  }
                }
                const URLs2 = await Promise.all(promises2)
                const ArrayOld2 = editProduct.arrayImages2
                const ArrayFile2 = [...URLs2, ...ArrayOld2]

                const promises3 = []
                if (File3) {
                  console.log(File3.length)
                  for (let i = 0; i < File3.length; i++) {

                    const storageRef = firebase.storage().ref();
                    // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                    // Создайте метаданные файла
                    let metadata = {
                      contentType: 'image/png',
                    };
                    let nameTime = await +new Date() + i + name + '.png'
                    // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                    const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File3[i], metadata);


                    promises3.push(
                        uploadTask
                            .then(snapshot =>
                                snapshot.ref.getDownloadURL()
                            )
                    )
                  }
                }
                const URLs3 = await Promise.all(promises3)
                const ArrayOld3 = editProduct.arrayImages3
                const ArrayFile3 = [...URLs3, ...ArrayOld3]

                const promises4 = []
                if (File4) {
                  console.log(File4.length)
                  for (let i = 0; i < File4.length; i++) {

                    const storageRef = await firebase.storage().ref();
                    // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                    // Создайте метаданные файла
                    let metadata = {
                      contentType: 'image/png',
                    };
                    let nameTime = await +new Date() + i + name + '.png'
                    // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                    const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File4[i], metadata);


                    promises4.push(
                        uploadTask
                            .then(snapshot =>
                                snapshot.ref.getDownloadURL()
                            )
                    )
                  }
                }
                const URLs4 = await Promise.all(promises4)
                const ArrayOld4 = editProduct.arrayImages4
                const ArrayFile4 = [...URLs4, ...ArrayOld4]

              const nameColorAll = editProduct.nameColor // [editProduct.nameColor, editProduct.nameColor2, editProduct.nameColor3, editProduct.nameColor4]


                let id = editProduct.id

              console.log('Запуск');

                const updateData = {
                  seen: editProduct.seen,
                  arrayImages: ArrayFile,
                  arrayImages2: ArrayFile2,
                  arrayImages3: ArrayFile3,
                  arrayImages4: ArrayFile4,
                  nameColor: nameColorAll,
                  arrayModel: editProduct.arrayModel,
                  arrayColor: editProduct.arrayColor,
                  // arrayColor2: editProduct.arrayColor2,
                  // arrayColor3: editProduct.arrayColor3,
                  // arrayColor4: editProduct.arrayColor4,
                  category: editProduct.category,
                  createdAt: editProduct.createdAt,
                  BrandName: editProduct.BrandName,
                  article: editProduct.article,
                  price: editProduct.price,
                  newProduct: editProduct.newProduct,
                  description: editProduct.description,
                }

              console.log('updateData', updateData);

              await db.collection('products2')
                    .doc(id)
                    .update(updateData)
                    .then(() => {
                      console.log('Я не отобразилось, зря только пишите меня');

                      this.isLoading = false
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Ваша работа была сохранена',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            },
            async addLocation(addProduct) {

              console.log('addProduct', addProduct)

              this.isLoading = true

              const createdAt = Date.now()
              const seen = false
              const File = addProduct.File
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
              const arrayColor2 = addProduct.arrayColor2
              const arrayColor3 = addProduct.arrayColor3
              const arrayColor4 = addProduct.arrayColor4
              const nameColor = addProduct.nameColor
              const nameColor2 = addProduct.nameColor2
              const nameColor3 = addProduct.nameColor3
              const nameColor4 = addProduct.nameColor4
              const arrayModel = addProduct.arrayModel

// ЗАГРУЗКА ФОТО1
                const promises = []
                const promisesName = []

                if (File) {
                  console.log('File', File)
                    for (let i = 0; i < File.length; i++) {

                        const storageRef = await firebase.storage().ref();
                        // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                        // Создайте метаданные файла
                        let metadata = {
                            contentType: 'image/png',
                        };
                        const nameTime = await +new Date() + i + name + '.png'
                      console.log(nameTime)
                        // ПРОВЕРКА ЗАГРУЗКИ ФОТО
                        const uploadTask = storageRef.child(`assets/images/${name}/` + nameTime).put(File[i], metadata);

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
                const NameImages = await Promise.all(promisesName)


              // ЗАГРУЗКА ФОТО2
              const promises2 = []
              const promisesName2 = []

              if (File2) {
                console.log('File2', File2)
                for (let i = 0; i < File2.length; i++) {

                  const storageRef = await firebase.storage().ref();
                  // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                  // Создайте метаданные файла
                  let metadata = {
                    contentType: 'image/png',
                  };
                  const nameTime = await +new Date() + i + name + '.png'
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
                console.log('File3', File3)
                for (let i = 0; i < File3.length; i++) {

                  const storageRef = await firebase.storage().ref();
                  // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                  // Создайте метаданные файла
                  let metadata = {
                    contentType: 'image/png',
                  };
                  const nameTime = await +new Date() + i + name + '.png'
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
                console.log('File4', File4)
                for (let i = 0; i < File4.length; i++) {

                  const storageRef = await firebase.storage().ref();
                  // Загрузить файл и метаданные в объект 'assets/images/***.jpg'

                  // Создайте метаданные файла
                  let metadata = {
                    contentType: 'image/png',
                  };
                  const nameTime = await +new Date() + i + name + '.png'
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

              const arrayColorAll = [arrayColor, arrayColor2, arrayColor3, arrayColor4]
              const nameColorAll = [nameColor, nameColor2, nameColor3, nameColor4]

              let docRef = await db.collection('products2').add({
                NameImages: NameImages,
                NameImages2: NameImages2,
                NameImages3: NameImages3,
                NameImages4: NameImages4,
                nameColor: nameColorAll,
                arrayColor: arrayColorAll,
                arrayModel: arrayModel,
                presence,
                seen,
                article,
                available,
                BrandName,
                newProduct,
                promotionalPrice,
                createdAt,
                category,
                arrayImages: URLs,
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

              console.log('this.isLoading', this.isLoading)

                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Ваша работа была сохранена',
                    showConfirmButton: false,
                    timer: 2000
                })
                this.dialog = false

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
                            const File = item.arrayImages
                            const File2 = item.arrayImages2
                            const File3 = item.arrayImages3
                            const File4 = item.arrayImages4

                            if (File) {
                                for (let i = 0; i < File.length; i++) {
                                    let storageRef = firebase.storage().ref()
                                    let nameTime = item.NameImages[i]
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
          likesAllFruit () {
            return this.editedItem.arrayModel.length === this.fruits.length
          },
          likesSomeFruit () {
            return this.editedItem.arrayModel.length > 0 && !this.likesAllFruit
          },
          icon () {
            if (this.likesAllFruit) return 'mdi-close-box'
            if (this.likesSomeFruit) return 'mdi-minus-box'
            return 'mdi-checkbox-blank-outline'
          },
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


