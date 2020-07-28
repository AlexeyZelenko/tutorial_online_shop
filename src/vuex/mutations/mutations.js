export default  {
    INCREMENT: (state, index) => {
        state.cart[index].quantity++
    } ,
    DECREMENT: (state, index) => {
        if(state.cart[index].quantity > 1) {
            state.cart[index].quantity--
        }
    },
    REMOVE_FROM_CART: (state, index) => {
        state.cart.splice(index, 1)
    },
    SET_CART: (state, product) => {
        let isProductExist = false
        state.cart.map(function (item) {
            if (item.article === product.article) {
                isProductExist = true
                item.quantity++
            }
        })
        isProductExist || state.cart.push({ ...product, quantity: 1 })
    },
    CHANGE_LOCALE: (state, loc) => {
        state.locale = loc;
    },
    FIREBASE_MUTATIONS: (state, message) => {
        state.products = message
    }
}


