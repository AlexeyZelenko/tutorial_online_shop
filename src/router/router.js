import Vue from 'vue'
import Router from 'vue-router'

import vCatalog from '../components/catalog/v-catalog'
import vCart from '../components/cart/v-cart'
import zAdmin from '../components/administration/z-admin'


Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            name: 'catalog',
            component:  vCatalog
        },
        {
            path: '/',
            name: 'cart',
            component: vCart,
            props: true
        },
        {
            path: '/',
            name: 'admin',
            component: zAdmin,
            props: true
        }
    ]
})

export default router