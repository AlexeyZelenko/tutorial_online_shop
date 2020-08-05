import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/firestore'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import commonActions from './actions/actions'
// Подключение нескольких actions
// import apiRequests from './actions/api-requests'

const actions = {...commonActions/*, ...apiRequests*/}

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
        locale: 'ru-RU'
    },
    getters,
    mutations,
    actions



});

export default store;

