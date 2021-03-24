import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'catalog',
            meta: {layout: 'main'},
            component: () => import('@/pages/catalog/v-catalog'),
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('@/pages/cart/v-cart'),
            props: true
        },
        {
            path: '/product',
            name: 'product',
            component: () => import('@/pages/catalog/z-product-information'),
            props: true
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/pages/administration/z-admin'),
            meta: { requiresAuth: true },
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/pages/login'),
            props: true
        },
        {
            path: '/registration',
            name: 'registration',
            component: () => import('@/pages/registration'),
            props: true
        },
        {
            path: '/information-order',
            name: 'information-order',
            component: () => import('@/pages/administration/z-information-order'),
            props: true
        },
        {
            path: '/order-description',
            name: 'order-description',
            component: () => import('@/pages/administration/z-order-description'),
            props: true
        },
        {
            path: '/cabinetUser',
            name: 'cabinetUser',
            component: () => import('@/pages/catalog/cabinetUser'),
            props: true
        },
        {
          path: '/reviews',
          name: 'reviews',
          component: () => import('@/pages/Reviews'),
          props: true
        },
    ]
})

export default router