import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
import info from './info'
import 'firebase/firestore'
import 'firebase/auth'
import getters from './getters/getters'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
import {db} from '@/main.js'
import Swal from "sweetalert2";
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
        listUsers: [1],
        orderUser: [],
        Users: [],
        ordersUSERS: []
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
        LIST_ORDER_USER: (state, result) => {
            state.ordersUSERS = result;
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
        userbindLocationsRef: firestoreAction(context => {
            return context.bindFirestoreRef('Users', db.collection('users'))
        }),
        async LIST_ORDERS_USERS({commit, dispatch}) {
            const result = await dispatch('userbindLocationsRef')
            const listOrderInfoUsers = result.filter(item => item.orderInfo)
            const listOrderInfoUsersMap = listOrderInfoUsers.map(item => item.orderInfo)
            commit('LIST_ORDER_USER', listOrderInfoUsersMap)
        },
        async ORDER_USER({dispatch}, promises) {
            const uid = await dispatch('getUid')
            await db.collection('users')
                .doc(uid)
                .update({
                    orderInfo: [...promises]
                })
                .then(() => {
                    Swal.fire('В ближайшее время Вам перезвонит менеджер, чтоб уточнить способ оплаты')
                })
        },
        async list_Users({commit, dispatch}) {
            const nameGoogle = await dispatch('displayName')
            const avatarGoogleUser = await dispatch('getProfilePicUrl')
            const userGoogleData = {nameGoogle, avatarGoogleUser}
            commit('LIST_USERS', userGoogleData)
        },
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
                .doc(uid)
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
                .update({
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

