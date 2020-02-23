const path = require(`path`)
const {NODE_ENV} = require(`../config/vars`)

module.exports = [
    NODE_ENV !== `production` && require(`cors`)(),
    require(`express`).static(path.resolve(__dirname, `../dist/`)),
    require(`body-parser`).json(),
].filter((m) => typeof m === `function`)
