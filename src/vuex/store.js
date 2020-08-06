import Vue from 'vue'
import Vuex from 'vuex'
import auth from './auth'
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
        locale: 'ru-RU',
        error: null
    },
    getters,
    mutations,
    actions,
    modules: {
        auth,
    }
});

export default store;

