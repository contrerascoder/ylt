const {directory} = require(`./helpers`)
const isDev = process.env.NODE_ENV === `development`
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`)
const VueLoaderPlugin = require(`vue-loader/lib/plugin`)
module.exports = {
    target: `web`,
    entry: {
        global: directory(`./src/js/global.js`),
        home: directory(`./src/js/home/index.js`),
        chat: directory(`./src/js/chat/index.js`),
    },
    resolve: {
        extensions: [`.js`, `.vue`],
        alias: {
            'vue$': isDev ? `vue/dist/vue.esm` : `vue/dist/vue.runtime.min.js`,
            '@': directory(`./src/js`),
        },
    },
    /* optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: `vendor`,
                    chunks: `all`,
                },
            },
        },
    },*/
    output: {
        filename: `[name].js`,
        path: directory(`dist/js`),
    },
    plugins: [new CleanWebpackPlugin(), new VueLoaderPlugin()],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: `vue-loader`,
            },
            {
                test: /\.js$/,
                loader: `babel-loader`,
            },
            {
                test: /\.css$/,
                use: [
                    `vue-style-loader`,
                    {loader: `css-loader`, options: {sourceMap: isDev}},
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    `vue-style-loader`,
                    {loader: `css-loader`, options: {sourceMap: isDev}},
                    {loader: `sass-loader`, options: {sourceMap: isDev}},
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    `vue-style-loader`,
                    {loader: `css-loader`, options: {sourceMap: isDev}},
                    {loader: `sass-loader`, options: {sourceMap: isDev}},
                ],
            },
        ],
    },
}
