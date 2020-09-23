import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'catalog',
            component: () => import('@/components/catalog/v-catalog'),
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('@/components/cart/v-cart'),
            props: true
        },
        {
            path: '/product',
            name: 'product',
            component: () => import('@/components/catalog/z-product-information'),
            props: true
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('@/components/administration/z-admin'),
            meta: { requiresAuth: true },
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/login'),
            props: true
        },
        {
            path: '/registration',
            name: 'registration',
            component: () => import('@/components/registration'),
            props: true
        },
        {
            path: '/information-order',
            name: 'information-order',
            component: () => import('@/components/administration/z-information-order'),
            props: true
        },
        {
            path: '/order-description',
            name: 'order-description',
            component: () => import('@/components/administration/z-order-description'),
            props: true
        },
        {
            path: '/cabinetUser',
            name: 'cabinetUser',
            component: () => import('@/components/catalog/cabinetUser'),
            props: true
        },
    ]
})

export default router