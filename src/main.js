import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'
import router from './router/router'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/messaging'
import 'firebase/performance'
import 'firebase/analytics'
import vuetify from '@/plugins/vuetify'
import { firestorePlugin } from 'vuefire'
import { rtdbPlugin } from 'vuefire'
import 'material-design-icons-iconfont'
import 'materialize-css/dist/js/materialize.min'
import localizeFilter from '@/filters/localize.filter'
import '@/plugins/tiptap-vuetify'
import Vuelidate from 'vuelidate'
import AsyncComputed from 'vue-async-computed'

// const AsyncComputed = () => import('vue-async-computed')
// import('@/filters/localize.filter').then(localizeFilter => {'@/main.js'});




Vue.config.productionTip = false


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

export const storage = firebase.storage();
export const analytics = firebase.analytics();





Vue.use(firestorePlugin)
Vue.use(rtdbPlugin)
Vue.use(AsyncComputed)


Vue.filter('localize', localizeFilter)
Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.replace(/(\d)(?=(\d{3})+$)/g, '$1 ')
})
Vue.use(Vuelidate)


let app

firebase.auth().onAuthStateChanged(() => {
    if (!app) {
        app = new Vue({
            render: h => h(App),
            vuetify,
            store,
            router,
        }).$mount('#app')
    }
})


