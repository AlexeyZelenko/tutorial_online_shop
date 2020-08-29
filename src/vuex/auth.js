import firebase from 'firebase/app'
import {db} from '@/main.js'

export default {
    actions: {
        async signInWithGoogle({commit, dispatch}) {
            try {
                let provider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(provider)
                const uid = await dispatch('getUid')


                // Получить корзину для ткущего пользователя
                const a = await db.collection('users').doc(`${uid}`).get('cartInfo')
                console.log(a)

                // Если корзины нет
                if(!a) {
                    // Создать корзину
                    await db.collection('users').doc(`${uid}`).set({
                        cartInfo: []
                    })
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
        async logout({commit}) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}