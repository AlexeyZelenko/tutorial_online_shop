<template>
  <v-app id="app">
    <component :is="layout">
      <router-view/>
    </component>
    <!--  Кнопка корзина-->
    <div
        @click="goToCard"
        type="button"
        class="callback-bt"
    >
      <div class="text-call">
        <v-badge
            class="badge"
            :content="GET_CART_USER.length"
            :value="GET_CART_USER.length"
            color="grey darken-3"
            overlap
            large
        >
          <v-icon
              class="icon_badge"
              large
              color="white"
          >
            mdi-cart
          </v-icon>
        </v-badge>
        <p>Перейти в корзину</p>
      </div>
    </div>

    <!--  Кнопка обратной связи-->
    <div
        type="button"
        class="callback-bt2"
    >
      <v-speed-dial
          v-model="fab"
          :direction="direction"
          :open-on-hover="hover"
          :transition="transition"
      >
        <template v-slot:activator>
          <v-btn
              v-model="fab"
              color="blue darken-2"
              dark
              fab
              x-large
          >
            <v-icon v-if="fab">
              mdi-close
            </v-icon>
            <span class="caption"  v-else>Контакты</span>
<!--            <v-icon v-else>-->
<!--              mdi-phone-->
<!--            </v-icon>-->

          </v-btn>
        </template>
        <v-btn
            fab
            dark
            small
            color="green"
            @click.stop="dialog2 = true"
        >
          <v-icon>mdi-phone</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="indigo"
            @click.stop="dialog = true"
        >
          <v-icon>mdi-email-outline</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="red"
            @click.stop="dialog3 = true"
        >
          <v-icon>mdi-telegram</v-icon>
        </v-btn>
        <v-btn
            fab
            dark
            small
            color="red"
        >
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </v-speed-dial>
    </div>

<!--    Диалог-->
    <v-dialog
        v-model="dialog"
        max-width="300"
    >
      <v-card>

        <v-list two-line>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-email
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>aliconnors@example.com</v-list-item-title>
              <v-list-item-subtitle>Администратор</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-email
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>zelenkooleksii75@gmail.com</v-list-item-title>
              <v-list-item-subtitle>Тех.поддержка сайта</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider inset></v-divider>

        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialog2"
        max-width="300"
    >
      <v-card>

        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-phone
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>+38 063 69 10 177</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-divider inset></v-divider>

        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="green darken-1"
              text
              @click="dialog2 = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="dialog3"
        max-width="300"
    >
      <v-card>

        <v-list two-line>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-telegram
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Timoxa</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="green darken-1"
              text
              @click="dialog3 = false"
          >
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>

</template>

<script>
    import MainLayout from '@/layouts/MainLayout'
    import EmptyLayout from '@/layouts/EmptyLayout'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        name: 'App',
        components: {
          MainLayout,
          EmptyLayout
        },
        data () {
          return {
            transition: 'slide-y-reverse-transition',
            direction: 'top',
            fab: false,
            fling: false,
            hover: false,
            dialog: false,
            dialog2: false,
            dialog3: false,
          }
        },
        computed: {
          ...mapGetters([
                'LOCALE_CHANGE',
                'GET_CART_USER'
            ]),
          activeFab () {
            switch (this.tabs) {
              case 'one': return { class: 'purple', icon: 'account_circle' }
              case 'two': return { class: 'red', icon: 'edit' }
              case 'three': return { class: 'green', icon: 'keyboard_arrow_up' }
              default: return {}
            }
          },
          layout() {
            return (this.$route.meta.layout || 'empty') + '-layout'
          }
        },
        methods: {
            ...mapActions([
                'LOCALIZE',
                'bindLocationsRef',
								'userbindLocationsRef',
                'ordersBindLocationsRef',
                'VIEW_CART_USER'
            ]),
            goToCard () {
              this.$router.push({name: 'cart'})
            },
            changeLocale(loc) {
                this.LOCALIZE(loc)
            },
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
        created() {
          this.VIEW_CART_USER()
            this.bindLocationsRef()
            this.userbindLocationsRef()
            this.ordersBindLocationsRef()
        }
    }
</script>

<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
    background: $main-color;
	}


  /*кнопка корзины*/
  .callback-bt2 {
    border-radius:50%;
    box-shadow:0 8px 10px rgba(56,163,253,0.3);
    cursor:pointer;
    height:55px;
    text-align:center;
    width:55px;
    position: fixed;
    right: 25px;
    bottom: 10%;
    z-index:999;
    transition:.5s;
  }
 .caption span {
    font-size: 10px;
  }

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

  .callback-bt .text-call .badge {
    opacity: 1;
    top: 20px;
    right: 4px;
  }
  .callback-bt .text-call .badge .icon_badge{
    opacity: 1;
  }


  .callback-bt .text-call p {
    opacity: 0;
  }
  .callback-bt .text-call:hover p{
    opacity: 1;
    font-size: 10px;
    text-align: center;
    color: #000000;
    position:absolute;
    right: 4px;
    top: 20px;
    line-height: 14px;
    font-weight: 500;
    text-transform: uppercase;
    transition: opacity .3s linear;
    font-family: 'montserrat', Arial, Helvetica, sans-serif;
  }

  .callback-bt .text-call:hover .badge {
    opacity: 0;
  }

  //.callback-bt:hover {
  //  z-index:1;
  //  background: #43cdda;
  //  color:transparent;
  //  transition:.3s;
  //}


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
</style>
