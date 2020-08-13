import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

let router = new Router({
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
            props: true
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import('@/components/administration/v-admin-chat'),
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/components/login'),
            props: true
        },
        {
            path: '/zEditProduct',
            name: 'zEditProduct',
            component: () => import('@/components/administration/table/z-edit-product'),
            props: true
        },
    ]
})

export default router