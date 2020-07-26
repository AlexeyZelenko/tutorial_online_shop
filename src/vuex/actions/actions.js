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
    ADD_TO_CART({commit}, product) {
        commit('SET_CART', product)
    },
    LOCALIZE_RU({commit}) {
        commit('CHANGE_LOCALE_RU')
    },
    LOCALIZE_EN({commit}) {
        commit('CHANGE_LOCALE_EN')
    },
    FIREBASE({commit}, message) {
        commit('FIREBASE_MUTATIONS', message)
        console.log(message)
    }
}




