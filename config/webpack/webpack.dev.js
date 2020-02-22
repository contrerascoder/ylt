const merge = require(`webpack-merge`)
const WebpackBar = require(`webpackbar`)

module.exports = merge(require(`./webpack.common`), {
    mode: `development`,
    plugins: [
        new WebpackBar(),
    ],
})
