export default  {
    CART(state) {
        return state.cart
    },
    PRODUCTS(state) {
        return state.products;
    },
    LOCALE_CHANGE(state) {
        return state.locale;
    },
    locale: s => s.locale
}



