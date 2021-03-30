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
        <v-icon color="white">
          mdi-cart
        </v-icon>
        <p style="color: white">{{GET_CART_USER.length}}</p>
      </div>
    </div>
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
        computed: {
            ...mapGetters([
                'LOCALE_CHANGE',
                'GET_CART_USER'
            ]),
          layout() {
            return (this.$route.meta.layout || 'empty') + '-layout'
          }
        },
        methods: {
            ...mapActions([
                'LOCALIZE',
                'bindLocationsRef',
								'userbindLocationsRef',
                'ordersBindLocationsRef'
            ]),
            goToCard () {
              this.$router.push({name: 'cart'})
            },
            changeLocale(loc) {
                this.LOCALIZE(loc)
            },
        },
        created() {
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
</style>
