import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
// import 'firebase/firestore'
import getters from './getters/getters'
// import mutations from './mutations/mutations'
// import commonActions from './actions/actions'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '@/main.js'
import firebase from "firebase";
// Подключение нескольких actions
// import apiRequests from './actions/api-requests'

// const actions = {...commonActions/*, ...apiRequests*/}


Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        cart: [],
        locale: 'ru-RU',
        error: null,
        Products: [],
        cartUser: [],
        info: []
    },
    getters,
    mutations: {
        ...vuexfireMutations,
        REMOVE_FROM_CART: (state, cartUser) => {
            state.cartUser = cartUser
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
        CART_USER: (state, cartUser) => {
            state.cartUser = cartUser;
        },
    },
    actions: {
        bindLocationsRef: firestoreAction(context => {
            // context contains all original properties like commit, state, etc
            // and adds `bindFirestoreRef` and `unbindFirestoreRef`
            // we return the promise returned by `bindFirestoreRef` that will
            // resolve once data is ready
            return context.bindFirestoreRef('Products', db.collection('products'))
        }),
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        },
        async DELETE_FROM_CART({dispatch, commit}, article) {
            const uid = await dispatch('getUid')
            const cartUser = await db.collection('users')
                .doc(`${uid}`)
                .get()
                .then(snapshot => {
                    const document = snapshot.data()
                    // do something with document
                    console.log(document.cartInfo)
                    return document.cartInfo
                })
            console.log(article)
            console.log(cartUser)

            const newcartInfo = cartUser.filter(item => item !== article)
            const user = { ...this.user }
            user.cartInfo = newcartInfo

            db.collection('users')
                .doc(`${uid}`)
                .set(user)
                .then(() => {
                    console.log('product delete from cart!')
                })

            commit('REMOVE_FROM_CART', cartUser)
        },
        async VIEW_CART_USER({dispatch, commit}) {
            const uid = await dispatch('getUid')
            const cartUser = await db.collection('users')
                .doc(`${uid}`)
                .get()
                .then(snapshot => {
                    const document = snapshot.data()
                    // do something with document
                    return document.cartInfo
            })
            const products = await db.collection('products')
                .get()
                .then(querySnapshot => {
                    const product = querySnapshot.docs.map(doc => doc.data())
                    // do something with documents
                    return product
                })
            const promises = []

            for(let i = 0; i < cartUser.length; i++) {
                let result = products.filter(item => item.article === cartUser[i])
                promises.push(result[0])
            }

            const result2 = await Promise.all(promises)

            commit('CART_USER', result2)
        },
        async INCREMENT_CART_ITEM({dispatch}, article) {
            const uid = await dispatch('getUid')
            const user = await db.collection('users')
                .doc(`${uid}`)
                .get()
                .then(snapshot => {
                    const document = snapshot.data()
                    // do something with document
                    return document
                })
            await db.collection('users')
                .doc(`${uid}`)
                .set({
                    ...user,
                    cartInfo: [...user.cartInfo, article]
                })
                .then(() => {
                    console.log('cart updated!')
                })
        },
        async DECREMENT_CART_ITEM({dispatch}, article) {
            const uid = await dispatch('getUid')
            const cartUser = await db.collection('users')
                .doc(`${uid}`)
                .get()
                .then(snapshot => {
                    const document = snapshot.data()
                    // do something with document
                    const i = document.cartInfo.indexOf(article);
                    if(i >= 0) {
                        document.cartInfo.splice(i, 1);
                    }
                    return document.cartInfo
                })

            const user = { ...this.user }
            user.cartInfo = cartUser

            db.collection('users')
                .doc(`${uid}`)
                .set(user)
                .then(() => {
                    console.log('1 product delete from cart!')
                })
        },
        LOCALIZE({commit}, loc) {
            commit('CHANGE_LOCALE', loc)
        },
        FIREBASE({commit}, message) {
            commit('FIREBASE_MUTATIONS', message)
        }
    },
    modules: {
        auth, info,
    }
});

export default store;

