module.exports = {
    css: {
        loaderOptions: {
            scss: {
                additionalData : `@import "@/assets/styles/styles.scss";`
            },
        },
    },
    configureWebpack:{
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    }
};