<template>
  <div id="navbar">
    <template>
      <v-card>
        <v-tabs
            v-model="tab"
            background-color="black accent-2"
            centered
            dark
            icons-and-text
        >
          <v-menu

              bottom
              left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  dark
                  icon
                  v-bind="attrs"
                  v-on="on"
              >
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                  v-for="(item, i) in items"
                  :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-tabs-slider></v-tabs-slider>

          <v-tab
              href="#tab-1"
          >
            <img
                @click="1"
                src="@/assets/icons/ос-mac-60.png"
                alt=""
                style="height: 36px"
            >
          </v-tab>

          <v-tab href="#tab-2">
            <img
                @click="1"
                src="@/assets/icons/huawei-logo-64.png"
                alt=""
                style="height: 36px">
          </v-tab>

          <v-tab
              href="#tab-3"
          >
            <img
                @click="1"
                src="@/assets/icons/mi-48.png"
                alt=""
                style="height: 36px">
          </v-tab>

          <v-tab href="#tab-4">
            <img
                @click="1"
                src="@/assets/icons/samsung-512.png"
                alt=""
                class="btn_admin"
                style="height: 36px">
          </v-tab>
          <v-spacer></v-spacer>
          <v-tab>
            <!--		ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
            <div
                class="text-center"
            >
              <v-btn
                  @click="signInWithGoogle"
                  icon
                  class="btn_admin"
                  v-if="!User_Entrance"
              >
                <i
                    v-if="!User_Entrance"
                    class="material-icons btn_admin"
                    @click="signInWithGoogle"
                >account_circle</i>
              </v-btn>
              <v-btn
                  class="mx-2"
                  @click="logout"
                  v-if="User_Entrance"
              >
                Выйти
              </v-btn>
            </div>
            <!--Кабинет пользователя и корзина-->
            <div
                style="justify-content: center;"
                v-if="User_Entrance"
            >
              <template>
                <div
                    style="justify-content: center;"
                >
                  <v-card
                      flat
                  >
                    <v-btn
                        @click="adminPlusLogin"
                        class="ma-2"
                        fab
                        outlined
                        small
                        v-if="GET_ADMIN_ENTRANCE">
                      <v-icon>mdi-format-list-bulleted-square</v-icon>
                    </v-btn>
                    <v-btn
                        :to="{name: 'cabinetUser'}"
                        class="my-2"
                        tile
                    >
                      <v-icon
                          :to="{name: 'cabinetUser'}"
                          left
                      >
                        mdi-account-circle
                      </v-icon>
                      Кабинет
                    </v-btn>
                    <v-btn
                        :to="{name: 'cart'}"
                        class="ma-2"
                        tile
                    >
                      <v-chip
                          close-icon="mdi-heart"
                      >
                        <v-avatar
                            class="darken-4"
                            left
                            style="background-color: #0a4506;"
                        >
                          {{GET_CART_USER.length}}
                        </v-avatar>
                        {{'Cart'|localize}}
                      </v-chip>
                    </v-btn>
                  </v-card>
                </div>
              </template>

              <v-spacer></v-spacer>
              <!--          <div-->
              <!--              class="v-carousel-item"-->
              <!--              v-if="this.User_Entrance">-->
              <!--            <slot>-->
              <!--              <img-->
              <!--                  :src="(getProfilePicUrl)"-->
              <!--                  alt=""-->
              <!--                  id="user-pic"-->
              <!--              >-->
              <!--            </slot>-->
              <!--          </div>-->
              <!--          <div-->
              <!--              id="user-name"-->
              <!--              v-if="this.User_Entrance"-->
              <!--          >{{getUserName}}-->
              <!--          </div>-->
            </div>
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="tab">
          <v-tab-item
              v-for="item in IconMenu"
              :key="item.id"
              :value="'tab-' + item.id"
          >
            <v-card
                flat
                dark
            >
              <template>
                <v-sheet
                    class="mx-auto"
                    max-width="800"
                >
                  <v-slide-group
                      v-model="model"
                      class="pa-2"
                      show-arrows
                  >
                    <v-slide-item
                        v-for="item2 in item.arrayArray"
                        :key="item2.id"
                        v-slot="{ active, toggle }"
                    >
                      <v-card
                          :color="active ? 'teal accent-4' : 'dark'"
                          class="ma-2"
                          height="30"
                          width="100"
                          @click="toggle(); sortProduct(item2.text)"
                      >
                        <v-scale-transition>
                          <p>{{item2.text}}</p>
                        </v-scale-transition>
                      </v-card>
                    </v-slide-item>
                  </v-slide-group>

<!--                  Выпадающее меню-->
<!--                  <v-expand-transition>-->
<!--                    <v-sheet-->
<!--                        v-if="model != null"-->
<!--                        height="200"-->
<!--                        tile-->
<!--                    >-->
<!--                      <v-row-->
<!--                          class="fill-height"-->
<!--                          align="center"-->
<!--                          justify="center"-->
<!--                      >-->
<!--                        <h3 class="title">-->
<!--                          Selected {{ model }}-->
<!--                        </h3>-->
<!--                      </v-row>-->
<!--                    </v-sheet>-->
<!--                  </v-expand-transition>-->
                </v-sheet>
              </template>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </template>
  </div>
</template>

<script>
 import {mapActions, mapGetters} from 'vuex'
 import firebase from "firebase";

  export default {
    data: () => ({
      model: null,
      tab: null,
      IconMenu: [
        {
          id: 1,
          icon: '@/assets/icons/ос-mac-60.png',
          clickMenu: '',
          text: '1',
          arrayArray: [
            {
              text: 'Iphone'
            },
            {
              text: 'AirPods'
            },
            {
              text: 'IPad'
            },
            {
              text: 'Watch'
            },
            {
              text: 'MacBook'
            }
          ]
        },
        {
          id: 2,
          icon: '@/assets/icons/ос-mac-60.png',
          clickMenu: '',
          text: '2',
          arrayArray: [
            {
              text: 'Аксессуары'
            }
          ]
        },
        {
          id: 3,
          icon: '@/assets/icons/ос-mac-60.png',
          clickMenu: '',
          text: '3',
          arrayArray: [
            {
              text: 'AirDots'
            },
            {
              text: 'SmartBand'
            },
            {
              text: 'Аксессуары'
            }
          ]
        },
        {
          id: 4,
          icon: '@/assets/icons/ос-mac-60.png',
          clickMenu: '',
          text: '4',
          arrayArray: [
            {
              text: 'Phone'
            },
            {
              text: 'Наушники'
            },
            {
              text: 'Watch'
            },
            {
              text: 'Аксессуары'
            },
          ]
        }
      ],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
    }),
    methods: {
      ...mapActions([
        'ADD_TO_CART',
        'VIEW_CART_USER',
        'userEntrance',
        'USER_ID_ACTIONS',
        'sortByCategories'
      ]),
      async sortProduct (product) {
        // this.sortByCategories(product)
        console.log('product', product)
        try {
          await this.$store.dispatch('sortByCategories', product)
        } catch (e) {
          console.log('Ошибка сортировки')
        }
      },
      onElementObserved(entries) {
        entries.forEach(({target, isIntersecting}) => {
          if (!isIntersecting) {
            return;
          }
          this.observer.unobserve(target);

          setTimeout(() => {
            const i = target.getAttribute("data-index");
            this.filteredProducts[i].seen = true;
            target.src = this.filteredProducts[i].arrayImages[0]

            target.onload = () => {
              target.parentNode.classList.remove('loading');
            };
          })
        });
      },
      adminPlusLogin() {
        if (this.GET_ADMIN_ENTRANCE) {
          this.$router.push('/admin')
        } else {
          this.$router.push('/login')
        }
      },
      async signInWithGoogle() {
        try {
          await this.$store.dispatch('signInWithGoogle')
          this.VIEW_CART_USER()
        } catch (e) {
          console.log('Ошибка входа Google')
        }
      },
      async logout() {
        await this.$store.dispatch('logout')
      },
      productClick(article) {
        this.$router.push({name: 'product', query: {'product': article}})
      },
      sortByCategories(category) {
        this.sortedProducts = [];
        this.PRODUCTS.map((item) => {
          if (item.category === category.name) {
            this.sortedProducts.push(item);
          }
        })
        this.selected = category.name
      },
      addToCart(data) {
        this.ADD_TO_CART(data)
            .then(() => {
              this.VIEW_CART_USER()
            })
      },
    },
    created() {
      this.userEntrance()
      this.observer = new IntersectionObserver(
          this.onElementObserved,
          {
            root: this.$el,
            threshold: 0.5,
          }
      );
    },
    beforeDestroy() {
      this.observer.disconnect();
    },
    computed: {
      ...mapGetters([
        'PRODUCTS',
        'GET_CART_USER',
        'User_Entrance',
        'USER_ID',
        'GET_ADMIN_ENTRANCE'
      ]),
      getUserName() {
        return firebase.auth().currentUser.displayName;
      },
      getProfilePicUrl() {
        return firebase.auth().currentUser.photoURL || '@/assets/images/profile_placeholder.png';
      },
      filteredProducts() {
        if (this.sortedProducts.length) {
          return this.sortedProducts
        } else {
          return this.PRODUCTS
        }
      }
    },
    mounted() {
      this.VIEW_CART_USER()
      this.USER_ID_ACTIONS()
    }
  }
</script>

<style lang="scss">
img {
  cursor: pointer;
}
/* Style the navbar */
#navbar {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999999;
}

</style>
