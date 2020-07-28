import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import { firestorePlugin } from 'vuefire'
import 'material-design-icons-iconfont'
import 'materialize-css/dist/js/materialize.min'
import localizeFilter from '@/filters/localize.filter'


Vue.config.productionTip = false

// export const db = firebase.initializeApp({ projectId: 'online-shop' }).firestore()

export const db = firebase.initializeApp({
    apiKey: "AIzaSyBMnm2m-5DVxNkJYghP8Jo41V9m3fvf0Tc",
    authDomain: "online-shop-34af2.firebaseapp.com",
    databaseURL: "https://online-shop-34af2.firebaseio.com",
    projectId: "online-shop-34af2",
    storageBucket: "online-shop-34af2.appspot.com",
    messagingSenderId: "206555332095",
    appId: "1:206555332095:web:9eead21cb681b196f73bca",
    measurementId: "G-QSTP059LSZ"
}).firestore()


Vue.use(firestorePlugin)
Vue.filter('localize', localizeFilter)



new Vue({
  render: h => h(App),
    store,
    router
}).$mount('#app')

