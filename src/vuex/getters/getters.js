export default  {
    GET_RANDOM_PRODUCTS: s => (s.Products[Math.floor(Math.random() * s.Products.length)]),
    GET_CART_USER(state) {
        return state.cartUser;
    },
    GET_PRODUCT_FROM_DB(state) {
        return state.Products;
    },
    GET_SORTED_PRODUCTS: state => {
      return state.sortedProducts
    },
    GET_PRODUCTS: state => {
      return state.Products
    },
    PRODUCTS: state => {
      return state.Products
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
    GET_LIST_USERS(state) {
        return state.listUsers;
    },
    GET_ORDER_USERS(state) {
        return state.listAdminUser;
    },
    GET_LIST_ORDER_USERS(state) {
        return state.ordersUSERS;
    },
    GET_ADMIN_ENTRANCE(state) {
        return state.adminEntrance;
    },
    GET_InfoUser(state) {
        return state.InfoUser;
    },
    locale: s => s.locale,
    error: s => s.error
}



