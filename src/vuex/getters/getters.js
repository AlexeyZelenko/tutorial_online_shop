export default  {
    GET_PRODUCT_FROM_DB(state) {
        return state.Products;
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



