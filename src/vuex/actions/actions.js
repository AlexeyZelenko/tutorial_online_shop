
export default  {

    INCREMENT_CART_ITEM({commit}, index) {
        commit('INCREMENT', index)
    },
    DECREMENT_CART_ITEM({commit}, index) {
        commit('DECREMENT', index)
    },
    DELETE_FROM_CART({commit}, index) {
        commit('REMOVE_FROM_CART', index)
    },
    // ADD_TO_CART({commit}, product) {
    //     commit('SET_CART', product)
    // },
    LOCALIZE({commit}, loc) {
        commit('CHANGE_LOCALE', loc)
    },
    FIREBASE({commit}, message) {
        commit('FIREBASE_MUTATIONS', message)
    },
    VIEW_CART_USER({commit}, user) {
        commit('CART_USER', user)
    }
}




