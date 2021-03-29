// import firebase from 'firebase/app'
import {db} from '@/main.js'
import Swal from 'sweetalert2'
// import router from '@/router/router'
import 'firebase/auth'

export default {
    actions: {
        async ADD_TO_CART({dispatch}, payload) {
          console.log('payload', payload)
          console.log('Пуск добавления в корзину');
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
                        cartInfo: [...user.cartInfo, {
                          article: payload.article,
                          nameColorChange: payload.nameColorChange,
                          model: payload.model,
                          price: payload.price,
                          name: payload.name,
                          arrayImagesViews: payload.arrayImagesViews
                        }]
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
        async DELETE_FROM_CART({dispatch, commit}, itemDelete) {
          console.log('itemDelete', itemDelete)
            const uid = await dispatch('getUid')

            const cartUser = await db.collection('users')
                .doc(uid)
                .get()
                .then(snapshot => {
                    const document = snapshot.data()
                    // do something with document
                    return document.cartInfo
                })

            const newcartInfo = cartUser.filter(item => item.arrayImagesViews !== itemDelete.arrayImagesViews)
            const user = { ...this.user }

            user.cartInfo = newcartInfo

            db.collection('users')
                .doc(uid)
                .update(user)
                .then(() => {
                })

            commit('CART_USER', cartUser)
        },
        async VIEW_CART_USER({dispatch, commit}) {
            const uid = await dispatch('getUid')
            if(uid) {
                const cartUser = await db.collection('users')
                    .doc(uid)
                    .get()
                    .then(snapshot => {
                        const document = snapshot.data()
                        return document.cartInfo
                    })
                const products = await db.collection('products2')
                    .get()
                    .then(querySnapshot => {
                        const product = querySnapshot.docs.map(doc => doc.data())
                        // do something with documents
                        return product
                    })

                const promises = []
                for(let i = 0; i < cartUser.length; i++) {
                    let result = products.filter(item => item.article === cartUser[i].article)
                    promises.push(result[0])
                }
                // const result2 = await Promise.all(promises)

                // commit('CART_USER', result2)
                commit('CART_USER', cartUser)
            }

        },
        async INCREMENT_CART_ITEM({dispatch}, item) {
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
                    cartInfo: [...user.cartInfo, item]
                })
                .then(() => {
                    console.log('cart updated!')
                })
        },
        async DECREMENT_CART_ITEM({dispatch}, item) {
            const uid = await dispatch('getUid')
            const cartUser = await db.collection('users')
                .doc(`${uid}`)
                .get()
                .then(snapshot => {
                    const document = snapshot.data()

                    // do something with document
                  const index = document.cartInfo.findIndex(n => n.arrayImagesViews === item.arrayImagesViews);
                  if (index !== -1) {
                    document.cartInfo.splice(index, 1);
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
    }
}