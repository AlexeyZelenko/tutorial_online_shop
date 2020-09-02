export default  {
    GET_CART_USER(state) {
        return state.cartUser;
    },
    GET_PRODUCT_FROM_DB(state) {
        return state.Products;
    },
    PRODUCTS(state) {
        return state.Products;
    },
    LOCALE_CHANGE(state) {
        return state.locale;
    },
    locale: s => s.locale,
    error: s => s.error
}



