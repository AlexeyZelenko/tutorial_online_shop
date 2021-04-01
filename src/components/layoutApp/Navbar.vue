<template>
  <div id="navbar">
    <!--    Боковое меню-->
    <div
        id="mySidenavMain"
        class="sidenav"
    >
      <span>
        <a
            href="javascript:void(0)"
            class="closebtn"
            @click="closeNav"
        >
        ×
      </a>
      </span>

      <div
          class="nav-link"
          v-for="item in IconMenu"
          :key="item.name"
          @click="item.dropdown = !item.dropdown"
      >
        <span>
          <img
              :src="require(`@/assets/icons/${item.link}.png`)"
              alt=""
              :style="`height: ${item.style}px`"
          >
        </span>

        <div
            class="dropdown-container"
            v-for="item2 in item.arrayArray"
            :key="item2.id"
        >
        <span
            v-if="item.dropdown"
            @click="sortProduct(item2.text)"
        >
          {{item2.text}}
        </span>
      </div>

      </div>

      <span
          style="color: #ecfcf0; "
          @click="goToReviews()"
      >
        отзывы
      </span>

    </div>

    <template>
      <div class="menu1">
        <v-toolbar
            color="black"
            dark
            dense
            flat
        >
          <!-- Кнопка для мобильника -->
          <span
              style="font-size:24px; cursor:pointer; color: #847e7e; margin-right: 10px"
              @click="openNav"
          >
          ☰
        </span>
          <v-card
              v-if="!openNavIcon"
              class="flex text-center"
              flat
              color="black"
              dark
          >
            <v-card-text class="py-2 white--text text-center">
              <img
                  src="@/assets/icons/ос-mac-60.png"
                  alt=""
                  style="height: 36px"
              >
            </v-card-text>
          </v-card>
        </v-toolbar>
      </div>


      <v-tabs
          class="menu2"
          v-model="tab"
          background-color="black accent-2"
          fixed-tabs
          dark
          next-icon="mdi-arrow-right-bold-box-outline"
          prev-icon="mdi-arrow-left-bold-box-outline"
          show-arrows
      >
        <v-tabs-slider color="#64FFDA"></v-tabs-slider>
        <v-tab
            href="#tab-1"
        >
          <img
              src="@/assets/icons/ос-mac-60.png"
              alt=""
              style="height: 36px"
          >
        </v-tab>

        <v-tab href="#tab-2">
          <img
              @click="1"
              src="@/assets/icons/google-100.png"
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
              style="height: 36px"
          >
        </v-tab>

        <v-tab href="#tab-5">
          <v-btn
              text
              color="white"
              @click="goToReviews"
          >
            отзывы
          </v-btn>
        </v-tab>



        <!--		ВХОД ЧЕРЕЗ ГУГЛ АККАУНТ-->
        <v-spacer></v-spacer>
        <v-tab href="#tab-6">
          <v-speed-dial
              v-model="fab"
              :right="right"
              direction=left
              transition="scale-transition"
          >
            <template
                v-slot:activator
            >
              <v-btn
                  v-model="fab"
                  color="black"
                  dark
                  fab
                  small
              >
                <v-icon v-if="fab">
                  mdi-close
                </v-icon>
                <v-icon v-else>
                  mdi-account
                </v-icon>

              </v-btn>
            </template>
            <v-btn
                @click="signInWithGoogle"
                v-if="!User_Entrance"
                fab
                dark
                small
                color="indigo"
            >
              <v-icon>mdi-account-circle</v-icon>
            </v-btn>
            <v-btn
                v-if="GET_ADMIN_ENTRANCE"
                @click="adminPlusLogin"
                fab
                dark
                small
                color="green"
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                fab
                dark
                small
                color="grey"
                @click="goToCard"
                v-if="User_Entrance"
            >
              <v-icon>mdi-cart-outline</v-icon>
            </v-btn>

            <v-btn
                fab
                dark
                small
                color="red"
                @click="logout"
                v-if="User_Entrance"
            >
              <v-icon>mdi-account-arrow-right</v-icon>
            </v-btn>
          </v-speed-dial>

        </v-tab>

      </v-tabs>

      <div class="menu2">
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
                      <v-scale-transition >
                        <div
                            class="mx-7 my-1"
                            @click="toggle(); sortProduct(item2.text)"
                        >
                          <figure>
                            <p>
                              <img
                                  class="chapternav-icon"
                                  :src="require(`@/assets/menu/${item2.figure}.png`)"
                                  alt=""
                              />
                            </p>
                          </figure>

                          <v-btn
                              text
                              x-small
                              :color="active ? 'teal accent-4' : 'white'"
                          >
                            {{item2.text}}
                          </v-btn>
                        </div>

                      </v-scale-transition>
                    </v-slide-item>
                  </v-slide-group>
                </v-sheet>
              </template>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </div>

    </template>

  </div>
</template>

<script>
 import {mapActions, mapGetters} from 'vuex'
 import firebase from "firebase";

  export default {
    data: () => ({
      openNavIcon: false,
      right: true,
      fab: false,
      fling: false,
      tabs: null,
      transition: 'slide-y-reverse-transition',
      showDropdownMenu: false,
      model: null,
      tab: null,
      IconMenu: [
        {
          id: 1,
          name: 'mac',
          link: "ос-mac-60",
          style: "36",
          text: '1',
          dropdown: false,
          arrayArray: [
            {
              text: 'Iphone',
              figure: 'iphone'
            },
            {
              text: 'AirPods',
              figure: 'airpods'
            },
            {
              text: 'IPad',
              figure: 'ipad'
            },
            {
              text: 'Watch',
              figure: 'watch'
            },
            {
              text: 'MacBook',
              figure: 'mac'
            }
          ]
        },
        {
          id: 2,
          name: 'google',
          link: "google-100",
          style: "36",
          text: '2',
          dropdown: false,
          arrayArray: [
            {
              text: 'Google Pixel',
              figure: 'google_pixel'
            }
          ]
        },
        {
          id: 3,
          name: 'mi',
          link: "mi-48",
          style: "36",
          text: '3',
          dropdown: false,
          arrayArray: [
            {
              text: 'AirDots',
              figure: 'AirDots'
            },
            {
              text: 'SmartBand',
              figure: 'smartBand'
            },
            {
              text: 'Аксессуары',
              figure: 'accessories'
            }
          ]
        },
        {
          id: 4,
          name: 'samsung',
          link: "samsung-512",
          style: "36",
          text: '4',
          dropdown: false,
          arrayArray: [
            {
              text: 'Phone',
              figure: 'phone_samsung'
            },
            {
              text: 'Наушники',
              figure: 'airpods_samsung'
            },
            {
              text: 'Watch',
              figure: 'watch_samsung'
            },
            {
              text: 'Аксессуары',
              figure: 'music_accessories'
            },
          ]
        },
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
      openNav () {
        this.openNavIcon = true
        document.getElementById('mySidenavMain').style.width = '250px'
      },
      closeNav () {
        this.openNavIcon = false
        document.getElementById('mySidenavMain').style.width = '0'
      },
      goToReviews () {
        this.$router.push({name: 'reviews'})
      },
      goToCard () {
        this.$router.push({name: 'cart'})
      },
      async sortProduct (product) {
        // this.sortByCategories(product)
        try {
          await this.$store.dispatch('sortByCategories', product)
          window.scrollTo(0, 1000)
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
            target.src = this.filteredProducts[i].arrayImages1[0]

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
      productClick(id) {
        this.$router.push({name: 'product', query: {'product': id}})
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
      activeFab () {
        switch (this.tabs) {
          case 'one': return { class: 'purple', icon: 'account_circle' }
          case 'two': return { class: 'red', icon: 'edit' }
          case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
          default: return {}
        }
      },
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
    watch: {
      top (val) {
        this.bottom = !val
      },
      right (val) {
        this.left = !val
      },
      bottom (val) {
        this.top = !val
      },
      left (val) {
        this.right = !val
      },
    },
    mounted() {
      this.VIEW_CART_USER()
      this.USER_ID_ACTIONS()
    }
  }
</script>

<style lang="scss">
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;

}
.chapternav-icon {
  background: center bottom no-repeat;
  display: block;
  margin: 0 auto 7px;
  height: 54px;
}
.menu1 {
  display: none;
}
.sidenav {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #040303;
  opacity: 0.9;
  overflow-x: hidden;
  transition: 0.5s;
}

.sidenav span {
  padding: 20px 8px 8px 32px;
  text-decoration: none;
  font-size: 24px;
  display: block;
  transition: 0.3s;
}

.sidenav span:hover {
  color: #e2ece9;
  background-color: #21b786;
}

.sidenav .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  text-decoration: none;
}

.dropdown-container {
  background-color: #262626;
  padding-left: 8px;
  color: #00BFA5;
}

@media (max-width: 570px) {
  .menu2 {display: none}
  .menu1 {display: block}
  .sidenav {
    padding-top: 15px;
  }
  .sidenav a {
    font-size: 18px;
    color: #0f6883;
    text-decoration: none;
  }
}
img {
  cursor: pointer;
}
/* Style the navbar */
#navbar {
  overflow: hidden;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
}

.div1{
  width: 100%;
  height: 100px;
  font-family: 'Oswald', sans-serif;
  background-color:#212;
  position: relative;
}

</style>
