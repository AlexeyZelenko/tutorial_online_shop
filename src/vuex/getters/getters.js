export default  {
    TODOS(state) {
        return state.locations;
    },
    CART(state) {
        return state.cart
    },
    PRODUCTS(state) {
        return state.products;
    },
    LOCALE_CHANGE(state) {
        return state.locale;
    },
    locale: s => s.locale,
    error: s => s.error
}



