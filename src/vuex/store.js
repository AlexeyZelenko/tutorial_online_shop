import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
// import 'firebase/firestore'
import getters from './getters/getters'
// import mutations from './mutations/mutations'
// import commonActions from './actions/actions'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '@/main.js'
// Подключение нескольких actions
// import apiRequests from './actions/api-requests'

// const actions = {...commonActions/*, ...apiRequests*/}


Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        locale: 'ru-RU',
        error: null,
        locations: [],
    },
    getters,
    mutations: {
        ...vuexfireMutations,
        INCREMENT: (state, index) => {
            state.cart[index].quantity++
        } ,
        DECREMENT: (state, index) => {
            if(state.cart[index].quantity > 1) {
                state.cart[index].quantity--
            }
        },
        REMOVE_FROM_CART: (state, index) => {
            state.cart.splice(index, 1)
        },
        SET_CART: (state, product) => {
            let isProductExist = false
            state.cart.map(function (item) {
                if (item.article === product.article) {
                    isProductExist = true
                    item.quantity++
                }
            })
            isProductExist || state.cart.push({ ...product, quantity: 1 })
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
    },
    actions: {
        bindLocationsRef: firestoreAction(context => {
            // context contains all original properties like commit, state, etc
            // and adds `bindFirestoreRef` and `unbindFirestoreRef`
            // we return the promise returned by `bindFirestoreRef` that will
            // resolve once data is ready
            return context.bindFirestoreRef('locations', db.collection('locations'))
        }),
        INCREMENT_CART_ITEM({commit}, index) {
            commit('INCREMENT', index)
        },
        DECREMENT_CART_ITEM({commit}, index) {
            commit('DECREMENT', index)
        },
        DELETE_FROM_CART({commit}, index) {
            commit('REMOVE_FROM_CART', index)
        },
        ADD_TO_CART({commit}, product) {
            commit('SET_CART', product)
        },
        LOCALIZE({commit}, loc) {
            commit('CHANGE_LOCALE', loc)
        },
        FIREBASE({commit}, message) {
            commit('FIREBASE_MUTATIONS', message)
        }
    },
    modules: {
        auth,
    }
});

export default store;

