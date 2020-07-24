import Vue from 'vue'
import Vuex from 'vuex'
import 'firebase/firestore'
import commonActions from './actions/actions'
import getters from './getters/getters'
import mutations from './mutations/mutations'
import apiRequests from './actions/api-requests'

const actions = {...commonActions, ...apiRequests}

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: [],
    },
    getters,
    mutations,
    actions



});

export default store;

