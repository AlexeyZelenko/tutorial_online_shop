import firebase from 'firebase/app'
import {db} from '@/main.js'
import Swal from 'sweetalert2'

export default {
    actions: {
        async ADD_TO_CART({dispatch}, product) {
            const uid = await dispatch('getUid')
            if(uid) {
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
                        cartInfo: [...user.cartInfo, product.article]
                    })
                    .then(() => {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Товар добавлен в корзину',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }

        },

        async signInWithGoogle({commit, dispatch}) {
            try {
                let provider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(provider)
                const uid = await dispatch('getUid')

                // Получить корзину для ткущего пользователя
                const a = await db.collection('users')
                    .doc(`${uid}`)
                    .get()
                    .then(snapshot => {
                        const document = snapshot.data()
                        // do something with document
                        return document
                    })
                // Если корзины нет
                if(!a) {
                    // Создать корзину
                    await db.collection('users').doc(`${uid}`).set({
                        cartInfo: []
                    })
                    console.log('Новый пользователь создан!')
                } else {
                    console.log('Пользователь вошел!')
                }

            } catch (e) {
                commit('setError', e)
                throw e
            }
        },

        async login({commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const uid = await dispatch('getUid')
                await firebase.database().ref(`/users/${uid}/info`).set({
                    name
                })
                await db.collection('users').doc(`${uid}`).set({
                    cartInfo: []
                })
                console.log('Пользователь создан!')
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        getUid() {
            const user = firebase.auth().currentUser
            return user ? user.uid : null
        },
        async logout() {
            await firebase.auth().signOut()
        }
    }
}