import Vue from 'vue'
import Vuex from 'vuex'
import  auth from './modules/auth'
import  cart from './modules/cart'
import  orders from './modules/orders'
import info from './info'
import 'firebase/firestore'
import 'firebase/auth'
import getters from './getters/getters'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '@/main.js'
import firebase from 'firebase/app'
// import Swal from "sweetalert2"
// Подключение нескольких actions
// import apiRequests from './actions/api-requests'

// const actions = {...commonActions/*, ...apiRequests*/}


Vue.use(Vuex);

let store = new Vuex.Store({
state: {
    locale: 'ru-RU',
    error: null,
    Products: [],
    cartUser: [],
    userEntrance: false,
    userId: null,
    listUsers: [],
    orderUser: [],
    Users: [],
    ordersUSERS: [],
    adminEntrance: false,
    InfoUser: [],
    sortedProducts: [],
    Orders: [],
    nameBrandProduct: ''
},

getters,

mutations: {
      ...vuexfireMutations,
      DECREMENT_CART: async (state, item ) => {
        console.log('-1')
        const index = await state.cartUser.findIndex(n => n.arrayImagesViews === item.arrayImagesViews);
        if (index !== -1) {
          await state.cartUser.splice(index, 1);
        }
      },
      INCREMENT_CART: (state, item ) => {
        state.cartUser = [...state.cartUser, item]
      },
     BRAND_PRODUCT: (state, nameBrand) => {
          state.nameBrandProduct = nameBrand
      },
     DELETE_CART: (state, itemDelete ) => {
       const newcartInfo = state.cartUser.filter(item => item.arrayImagesViews !== itemDelete.arrayImagesViews)
       state.cartUser = newcartInfo
     },
     SET_CART: (state, product ) => {
       state.cartUser.push(product)
     },
    CHANGE_LOCALE: (state, loc) => {
        state.locale = loc;
    },
    FIREBASE_MUTATIONS: (state, message) => {
        state.products = message
    },
    setError(state, error) {
        state.error = error
    },
    CART_USER: (state, cartUser) => {
        state.cartUser = cartUser;
    },
    USER_ENTRANCE: (state, userEntrance) => {
        state.userEntrance = userEntrance;
    },
    USER_ID_ENTRANCE: (state, userID) => {
        state.userId = userID;
    },
    LIST_USERS: (state, listUsers) => {
        state.listUsers = listUsers;
    },
    ORDER_USER: (state, orderUser) => {
        state.orderUser = orderUser;
    },
    LIST_ORDER_USER: (state, result3) => {
        state.ordersUSERS = result3;
    },
    ADMIN_ENTRANCE: (state, adminEntrance) => {
        state.adminEntrance = adminEntrance;
    },
    USER_INFO: (state, info) => {
        state.InfoUser = info;
    },
    SORT_PRODUCTS: (state, sortedProducts) => {
    state.sortedProducts = sortedProducts;
  },
},

actions: {
  // Получение инфо о товарах
    bindLocationsRef: firestoreAction(context => {
        // context contains all original properties like commit, state, etc
        // and adds `bindFirestoreRef` and `unbindFirestoreRef`
        // we return the promise returned by `bindFirestoreRef` that will
        // resolve once data is ready
        return context.bindFirestoreRef('Products', db.collection('products2'))
    }),

  // Получение инфо о зарегестрированых пользователях
    userbindLocationsRef: firestoreAction(context => {
        return context.bindFirestoreRef('Users', db.collection('users'))
    }),

  // Получение инфо о заказах
    ordersBindLocationsRef: firestoreAction(context => {
      return context.bindFirestoreRef('Orders', db.collection('orders'))
    }),
   async createNewReview (commit, payload) {
    const newText = payload
    await fetch('https://online-shop-34af2.firebaseio.com/reviews.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newText)
    })
  },
    async list_Users({commit}) {
        const user = firebase.auth().currentUser;
        const userOnlain = user.providerData[0]
        commit('LIST_USERS', userOnlain)
    },
    LOCALIZE({commit}, loc) {
        commit('CHANGE_LOCALE', loc)
    },
    FIREBASE({commit}, message) {
        commit('FIREBASE_MUTATIONS', message)
    },
    async sortByCategories({commit, state}, product) {
      const sortedProducts = [];
      state.Products.map((item) => {
        if (item.category === product.text) {
          sortedProducts.push(item)
        }
      })
      const nameBrand = product.nameBrand
      commit('SORT_PRODUCTS', sortedProducts)
      commit('BRAND_PRODUCT', nameBrand)
    },
},
modules: {
    info,
},
})

store.registerModule('auth', auth)
store.registerModule('cart', cart)
store.registerModule('orders', orders)

export default store;

