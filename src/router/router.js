import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/catalog/v-catalog'
import vCart from '../components/cart/v-cart'
import zAdmin from '../components/administration/z-admin'
import vAdminChat from '../components/administration/v-admin-chat'
import zProductInformation from '../components/catalog/z-product-information'
import loginAdmin from '../components/login'


Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component:  vCatalog
        },
        {
            path: '/cart',
            name: 'cart',
            component: vCart,
            props: true
        },
        {
            path: '/product',
            name: 'product',
            component: zProductInformation,
            props: true
        },
        {
            path: '/admin',
            name: 'admin',
            component: zAdmin,
            props: true
        },
        {
            path: '/chat',
            name: 'chat',
            component: vAdminChat,
            props: true
        },
        {
            path: '/login',
            name: 'login',
            component: loginAdmin,
            props: true
        },
    ]
})

export default router