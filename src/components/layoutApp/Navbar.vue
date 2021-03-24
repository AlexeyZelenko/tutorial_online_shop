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
        Отзывы
      </span>

    </div>


    <template>
      <v-toolbar
          color="black"
          dark
          dense
          flat
      >
        <!-- Кнопка для мобильника -->
        <span
            class="menu1"
            style="font-size:24px; cursor:pointer; color: #847e7e; margin-right: 10px"
            @click="openNav"
        >
      ☰
    </span>
      </v-toolbar>

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
            Отзывы
          </v-btn>
        </v-tab>

        <v-spacer></v-spacer>
        <v-tab href="#tab-6">
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
          <v-btn
              v-if="GET_ADMIN_ENTRANCE"
              @click="adminPlusLogin"
              class="ma-2"
              fab
              outlined
              small
          >
            <v-icon>mdi-format-list-bulleted-square</v-icon>
          </v-btn>
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
                      <v-scale-transition>
                        <v-btn
                            text
                            :color="active ? 'teal accent-4' : 'white'"
                            class="ma-2"
                            @click="toggle(); sortProduct(item2.text)"
                        >
                          {{item2.text}}
                        </v-btn>
                      </v-scale-transition>
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
          <!--        <v-tab-items-->
          <!--            v-model="tab"-->
          <!--            v-if="User_Entrance"-->
          <!--        >-->
          <!--Кабинет пользователя и корзина-->
          <!--          <div-->
          <!--              style="justify-content: center;"-->
          <!--              v-if="User_Entrance"-->
          <!--          >-->
          <!--            <template>-->
          <!--              <div-->
          <!--                  style="justify-content: center;"-->
          <!--              >-->
          <!--                <v-card-->
          <!--                    flat-->
          <!--                >-->
          <!--                  <v-btn-->
          <!--                      @click="adminPlusLogin"-->
          <!--                      class="ma-2"-->
          <!--                      fab-->
          <!--                      outlined-->
          <!--                      small-->
          <!--                      v-if="GET_ADMIN_ENTRANCE">-->
          <!--                    <v-icon>mdi-format-list-bulleted-square</v-icon>-->
          <!--                  </v-btn>-->
          <!--&lt;!&ndash;                  <v-btn&ndash;&gt;-->
          <!--&lt;!&ndash;                      :to="{name: 'cabinetUser'}"&ndash;&gt;-->
          <!--&lt;!&ndash;                      class="my-2"&ndash;&gt;-->
          <!--&lt;!&ndash;                      tile&ndash;&gt;-->
          <!--&lt;!&ndash;                  >&ndash;&gt;-->
          <!--&lt;!&ndash;                    <v-icon&ndash;&gt;-->
          <!--&lt;!&ndash;                        :to="{name: 'cabinetUser'}"&ndash;&gt;-->
          <!--&lt;!&ndash;                        left&ndash;&gt;-->
          <!--&lt;!&ndash;                    >&ndash;&gt;-->
          <!--&lt;!&ndash;                      mdi-account-circle&ndash;&gt;-->
          <!--&lt;!&ndash;                    </v-icon>&ndash;&gt;-->
          <!--&lt;!&ndash;                    Кабинет&ndash;&gt;-->
          <!--&lt;!&ndash;                  </v-btn>&ndash;&gt;-->
          <!--&lt;!&ndash;                  <v-btn&ndash;&gt;-->
          <!--&lt;!&ndash;                      :to="{name: 'cart'}"&ndash;&gt;-->
          <!--&lt;!&ndash;                      class="ma-2"&ndash;&gt;-->
          <!--&lt;!&ndash;                      tile&ndash;&gt;-->
          <!--&lt;!&ndash;                  >&ndash;&gt;-->
          <!--&lt;!&ndash;                    <v-chip&ndash;&gt;-->
          <!--&lt;!&ndash;                        close-icon="mdi-heart"&ndash;&gt;-->
          <!--&lt;!&ndash;                    >&ndash;&gt;-->
          <!--&lt;!&ndash;                      <v-avatar&ndash;&gt;-->
          <!--&lt;!&ndash;                          class="darken-4"&ndash;&gt;-->
          <!--&lt;!&ndash;                          left&ndash;&gt;-->
          <!--&lt;!&ndash;                          style="background-color: #0a4506;"&ndash;&gt;-->
          <!--&lt;!&ndash;                      >&ndash;&gt;-->
          <!--&lt;!&ndash;                        {{GET_CART_USER.length}}&ndash;&gt;-->
          <!--&lt;!&ndash;                      </v-avatar>&ndash;&gt;-->
          <!--&lt;!&ndash;                      {{'Cart'|localize}}&ndash;&gt;-->
          <!--&lt;!&ndash;                    </v-chip>&ndash;&gt;-->
          <!--&lt;!&ndash;                  </v-btn>&ndash;&gt;-->
          <!--                </v-card>-->
          <!--              </div>-->
          <!--            </template>-->

          <!--            <v-spacer></v-spacer>-->
          <!--            &lt;!&ndash;          <div&ndash;&gt;-->
          <!--            &lt;!&ndash;              class="v-carousel-item"&ndash;&gt;-->
          <!--            &lt;!&ndash;              v-if="this.User_Entrance">&ndash;&gt;-->
          <!--            &lt;!&ndash;            <slot>&ndash;&gt;-->
          <!--            &lt;!&ndash;              <img&ndash;&gt;-->
          <!--            &lt;!&ndash;                  :src="(getProfilePicUrl)"&ndash;&gt;-->
          <!--            &lt;!&ndash;                  alt=""&ndash;&gt;-->
          <!--            &lt;!&ndash;                  id="user-pic"&ndash;&gt;-->
          <!--            &lt;!&ndash;              >&ndash;&gt;-->
          <!--            &lt;!&ndash;            </slot>&ndash;&gt;-->
          <!--            &lt;!&ndash;          </div>&ndash;&gt;-->
          <!--            &lt;!&ndash;          <div&ndash;&gt;-->
          <!--            &lt;!&ndash;              id="user-name"&ndash;&gt;-->
          <!--            &lt;!&ndash;              v-if="this.User_Entrance"&ndash;&gt;-->
          <!--            &lt;!&ndash;          >{{getUserName}}&ndash;&gt;-->
          <!--            &lt;!&ndash;          </div>&ndash;&gt;-->
          <!--          </div>-->
          <!--        </v-tab-items>-->
        </v-tabs-items>
      </div>

    </template>
    <!--  Кнопка корзина-->
    <div
        v-if="User_Entrance"
        @click="goToCard"
        type="button"
        class="callback-bt"
    >
      <div class="text-call">
        <v-icon color="white">
          mdi-cart
        </v-icon>
        <p style="color: white">{{GET_CART_USER.length}}</p>
      </div>
    </div>
  </div>
</template>

<script>
 import {mapActions, mapGetters} from 'vuex'
 import firebase from "firebase";

  export default {
    data: () => ({
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
          name: 'google',
          link: "google-100",
          style: "36",
          text: '2',
          dropdown: false,
          arrayArray: [
            {
              text: 'Google Pixel'
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
          name: 'samsung',
          link: "samsung-512",
          style: "36",
          text: '4',
          dropdown: false,
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
        },
        {
          id: 5,
          name: 'Отзывы',
          link: "reviews",
          style: "36",
          dropdown: false,
        }
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
        document.getElementById('mySidenavMain').style.width = '250px'
      },
      closeNav () {
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
  padding-top: 60px;
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
  z-index: 999999;
}

/*кнопка корзины*/

.callback-bt {
  background:#38a3fd;
  border:2px solid #38a3fd;
  border-radius:50%;
  box-shadow:0 8px 10px rgba(56,163,253,0.3);
  cursor:pointer;
  height:68px;
  text-align:center;
  width:68px;
  position: fixed;
  left: 5%;
  bottom: 5%;
  z-index:999;
  transition:.5s;
  -webkit-animation:hoverWave linear 1s infinite;
  animation:hoverWave linear 1s infinite;
}

.callback-bt .text-call{
  height:68px;
  width:68px;
  border-radius:50%;
  position:relative;
  overflow:hidden;
}

.callback-bt .text-call span {
  text-align: center;
  color:#38a3fd;
  opacity: 0;
  font-size: 0;
  position:absolute;
  right: 4px;
  top: 22px;
  line-height: 14px;
  font-weight: 600;
  text-transform: uppercase;
  transition: opacity .3s linear;
  font-family: 'montserrat', Arial, Helvetica, sans-serif;
}

.callback-bt .text-call:hover span {
  opacity: 1;
  font-size: 11px;
}

.callback-bt:hover {
  z-index:1;
  background: #1d7575;
  color:transparent;
  transition:.3s;
}


@-webkit-keyframes hoverWave {
  0% {
    box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 0 rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
  }
  40% {
    box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 15px rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
  }
  80% {
    box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 26.7px rgba(56,163,253,0.067)
  }
  100% {
    box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 40px rgba(56,163,253,0.0)
  }
}@keyframes hoverWave {
   0% {
     box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 0 rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
   }
   40% {
     box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 15px rgba(56,163,253,0.2),0 0 0 0 rgba(56,163,253,0.2)
   }
   80% {
     box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 26.7px rgba(56,163,253,0.067)
   }
   100% {
     box-shadow:0 8px 10px rgba(56,163,253,0.3),0 0 0 30px rgba(56,163,253,0),0 0 0 40px rgba(56,163,253,0.0)
   }
 }

/* animations icon */

@keyframes shake {
  0% {
    transform: rotateZ(0deg);
    -ms-transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
  }
  10% {
    transform: rotateZ(-30deg);
    -ms-transform: rotateZ(-30deg);
    -webkit-transform: rotateZ(-30deg);
  }
  20% {
    transform: rotateZ(15deg);
    -ms-transform: rotateZ(15deg);
    -webkit-transform: rotateZ(15deg);
  }
  30% {
    transform: rotateZ(-10deg);
    -ms-transform: rotateZ(-10deg);
    -webkit-transform: rotateZ(-10deg);
  }
  40% {
    transform: rotateZ(7.5deg);
    -ms-transform: rotateZ(7.5deg);
    -webkit-transform: rotateZ(7.5deg);
  }
  50% {
    transform: rotateZ(-6deg);
    -ms-transform: rotateZ(-6deg);
    -webkit-transform: rotateZ(-6deg);
  }
  60% {
    transform: rotateZ(5deg);
    -ms-transform: rotateZ(5deg);
    -webkit-transform: rotateZ(5deg);
  }
  70% {
    transform: rotateZ(-4.28571deg);
    -ms-transform: rotateZ(-4.28571deg);
    -webkit-transform: rotateZ(-4.28571deg);
  }
  80% {
    transform: rotateZ(3.75deg);
    -ms-transform: rotateZ(3.75deg);
    -webkit-transform: rotateZ(3.75deg);
  }
  90% {
    transform: rotateZ(-3.33333deg);
    -ms-transform: rotateZ(-3.33333deg);
    -webkit-transform: rotateZ(-3.33333deg);
  }
  100% {
    transform: rotateZ(0deg);
    -ms-transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
  }
}

@-webkit-keyframes shake {
  0% {
    transform: rotateZ(0deg);
    -ms-transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
  }
  10% {
    transform: rotateZ(-30deg);
    -ms-transform: rotateZ(-30deg);
    -webkit-transform: rotateZ(-30deg);
  }
  20% {
    transform: rotateZ(15deg);
    -ms-transform: rotateZ(15deg);
    -webkit-transform: rotateZ(15deg);
  }
  30% {
    transform: rotateZ(-10deg);
    -ms-transform: rotateZ(-10deg);
    -webkit-transform: rotateZ(-10deg);
  }
  40% {
    transform: rotateZ(7.5deg);
    -ms-transform: rotateZ(7.5deg);
    -webkit-transform: rotateZ(7.5deg);
  }
  50% {
    transform: rotateZ(-6deg);
    -ms-transform: rotateZ(-6deg);
    -webkit-transform: rotateZ(-6deg);
  }
  60% {
    transform: rotateZ(5deg);
    -ms-transform: rotateZ(5deg);
    -webkit-transform: rotateZ(5deg);
  }
  70% {
    transform: rotateZ(-4.28571deg);
    -ms-transform: rotateZ(-4.28571deg);
    -webkit-transform: rotateZ(-4.28571deg);
  }
  80% {
    transform: rotateZ(3.75deg);
    -ms-transform: rotateZ(3.75deg);
    -webkit-transform: rotateZ(3.75deg);
  }
  90% {
    transform: rotateZ(-3.33333deg);
    -ms-transform: rotateZ(-3.33333deg);
    -webkit-transform: rotateZ(-3.33333deg);
  }
  100% {
    transform: rotateZ(0deg);
    -ms-transform: rotateZ(0deg);
    -webkit-transform: rotateZ(0deg);
  }
}
/* конец кнопки звонка */
.fixedbut {
  position: fixed;
  bottom: 20px;
  left: 20px;
  display: block;
  background: #2db700;
  color: #fff;
  text-decoration: none;
  padding: 6px 23px;
  font-size: 17px;
}
.fixedbut:hover { background: #222; }
.div1{
  width: 100%;
  height: 100px;
  font-family: 'Oswald', sans-serif;
  background-color:#212;
  position: relative;
}

</style>
