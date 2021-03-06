import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'catalog',
      meta: {layout: 'main', auth: false},
      component: () => import('@/pages/catalog/v-catalog'),
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/cart/v-cart'),
      props: true,
      meta: { auth: false }
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('@/pages/catalog/z-product-information'),
      props: true,
      meta: { auth: false }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/pages/administration/z-admin'),
      meta: { auth: true },
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
      props: true,
      meta: { auth: false }
    },
    {
      path: '/registration',
      name: 'registration',
      component: () => import('@/pages/registration'),
      props: true,
      meta: { auth: false }
    },
    {
      path: '/information-order',
      name: 'information-order',
      component: () => import('@/pages/administration/z-information-order'),
      props: true,
      meta: { auth: true },
    },
    {
      path: '/order-description',
      name: 'order-description',
      component: () => import('@/pages/administration/z-order-description'),
      props: true,
      meta: { auth: true },
    },
    {
      path: '/cabinetUser',
      name: 'cabinetUser',
      component: () => import('@/pages/catalog/cabinetUser'),
      props: true,
      meta: { auth: false }
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import('@/pages/Reviews'),
      props: true
    },
  ]
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if (currentUser != null) {
    const uid = currentUser.uid;

    const adminEntrance = ['q77OchyqmyavLxjnlMiQlcxLefw2', "wH7hb4Zdh9Xqt2RZRMAnJa3Nko23"].includes(uid)

    if (requireAuth && !adminEntrance) {
      next('/')
    }
    else  {
      next();
    }
  }
  else {
    if (requireAuth) {
      next('/')
    }
    else {
      next()
    }
  }



})

export default router