import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

let store = new Vuex.Store({
    state: {
        products: [],
        cart: []
    },
    mutations: {
        SET_CART: (state, product) => {
            state.cart.push(product)
        },
        SET_PRODUCTS_TO_STATE: (state, products) => {
            state.products = products;
        }
    },
    actions: {
       ADD_TO_CART({commit}, product) {
            commit('SET_CART', product)
       },
       GET_PRODUCTS_FROM_API({commit}) {
           return axios('http://localhost:3000/products', {
            method: "GET"
           })
               .then((products) => {
               commit('SET_PRODUCTS_TO_STATE', products.data)
                   return products;
           })
               .catch((error) => {
                   console.log(error)
                   return error;
               })
       }
    },
    getters: {
        CART(state) {
            return state.cart
        },
        PRODUCTS(state) {
            return state.products;
        }
    }
});

export default  store;

