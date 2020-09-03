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
    USER_ID(state) {
        return state.userId;
    },
    LOCALE_CHANGE(state) {
        return state.locale;
    },
    User_Entrance(state) {
        return state.userEntrance;
    },
    locale: s => s.locale,
    error: s => s.error
}



