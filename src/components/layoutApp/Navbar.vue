<template>
  <div id="navbar">
    <v-card dark>
      <v-card-title class="white--text">
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
        <v-icon
            class="px-4 material-icons btn_admin"
            @click="1"
        >mdi-apple</v-icon>
        <a href="#home">Home</a>
        <a href="#news">News</a>
        <a href="#contact">Contact</a>

        <v-spacer></v-spacer>

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
      </v-card-title>
    </v-card>
  </div>
</template>


<script>
 import {mapActions, mapGetters} from 'vuex'
 import firebase from "firebase";

  export default {
    data: () => ({
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
        'USER_ID_ACTIONS'
      ]),
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
/* Style the navbar */
#navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999999;
  opacity: 0.9;
}

/* Navbar links */
#navbar a {
  font-size: 14px;
  float: left;
  display: block;
  color: $main-color;
  text-align: center;
  padding: 14px;
  text-decoration: none;
}

/* Page content */
.content {
  padding: 16px;
}

.btn_admin {
  color: $main-color;
}

</style>
