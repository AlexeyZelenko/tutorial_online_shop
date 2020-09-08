import firebase from 'firebase/app'
import {db} from '@/main.js'
import Swal from 'sweetalert2'
import router from '@/router/router'
import 'firebase/auth'

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
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Ой...',
                    text: `Вы не можете добавить товар в корзину. Для добавления товара в корзину войдите через Google Аккаунт!`,
                    footer: '<a href="https://accounts.google.com/signup/v2/webcreateaccount?service=orkut&continue=https%3A%2F%2Faccounts.google.com%2FManageAccount%3Fnc%3D1&hl=ru&flowName=GlifWebSignIn&flowEntry=SignUp">Как создать аккаунт Google?</a>',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Войти!',
                    cancelButtonText: 'Отмена'
                }).then((result) => {
                    if (result.value) {
                        dispatch('signInWithGoogle')
                    }
                })
            }


        },

        async signInWithGoogle({commit, dispatch}) {
            try {
                let provider = new firebase.auth.GoogleAuthProvider();
                await firebase.auth().signInWithPopup(provider)
                const uid = await dispatch('getUid')
                const getUserName = firebase.auth().currentUser.displayName
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: `Вы вошли как ${getUserName}`,
                    showConfirmButton: false,
                    timer: 2000
                })

                // Получить корзину для ткущего пользователя
                const a = await db.collection('users')
                    .doc(`${uid}`)
                    .get()
                    .then(snapshot => {
                        const document = snapshot.data()
                        // do something with document
                        return document.cartInfo
                    })
                // Если корзины нет
                if(!a) {
                    // Создать корзину
                    await db.collection('users').doc(uid).set({
                        ...uid,
                        cartInfo: [...uid.cartInfo]
                    })
                    console.log('Новый пользователь создан!')
                } else {
                    if(['wH7hb4Zdh9Xqt2RZRMAnJa3Nko23', 'hng6vLzPtTYo5xgiuYyjYpOnijB2', 'HInmvosDanObSDnC2csXiV3iR0A2'].some(elem => elem === `${uid}`)) {
                        console.log('Администратор вошел!')
                        router.push('/admin')
                    }else{
                        console.log('Пользователь вошел!')
                    }
                    const userEntrance = !!firebase.auth().currentUser
                    commit('USER_ENTRANCE', userEntrance)
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
        displayName() {
            return firebase.auth().currentUser.displayName
        },
        getProfilePicUrl() {
            return firebase.auth().currentUser.photoURL || '@/assets/images/profile-pic-placeholder.png';
        },
        userEntrance({commit}) {
            const userEntrance =  !!firebase.auth().currentUser
            commit('USER_ENTRANCE', userEntrance)
        },
        async USER_ID_ACTIONS({commit}) {
            const user = firebase.auth().currentUser
            const userID = user ? user.uid : null
                if(userID) {
                    commit('USER_ID_ENTRANCE', userID)
                }else{
                    console.log('error')
                }
        },
        async logout({commit}) {
            await firebase.auth().signOut()
                .then(() => {
                    const userEntrance = !!firebase.auth().currentUser
                    commit('USER_ENTRANCE', userEntrance)
                })
        }
    }
}