import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
// import 'firebase/firestore'
import getters from './getters/getters'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '@/main.js'
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
    },
    getters,
    mutations: {
        ...vuexfireMutations,
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
        async DELETE_FROM_CART({dispatch, commit}, article) {
            const uid = await dispatch('getUid')
            const cartUser = await db.collection('users')
                .doc(`${uid}`)
                .get()
                .then(snapshot => {
                    const document = snapshot.data()
                    // do something with document
                    return document.cartInfo
                })

            const newcartInfo = cartUser.filter(item => item !== article)
            const user = { ...this.user }
            user.cartInfo = newcartInfo

            db.collection('users')
                .doc(`${uid}`)
                .set(user)
                .then(() => {
                })

            commit('CART_USER', cartUser)
        },
        async VIEW_CART_USER({dispatch, commit}) {
            const uid = await dispatch('getUid')
            if(uid) {
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
            }

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

            await db.collection('users')
                .doc(`${uid}`)
                .set({
                    ...user,
                    cartInfo: [...user.cartInfo]
                })
        },
        LOCALIZE({commit}, loc) {
            commit('CHANGE_LOCALE', loc)
        },
        FIREBASE({commit}, message) {
            commit('FIREBASE_MUTATIONS', message)
        },
    },
    modules: {
        auth, info,
    }
});

export default store;

