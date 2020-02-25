const path = require(`path`)
const {NODE_ENV, IS_PROD} = require(`../config/vars`)

console.log(IS_PROD)

module.exports = [
    require(`express`).static(path.resolve(__dirname, `../app/dist/`)),
    !IS_PROD && require(`cors`)(),
    // require(`express`).static(path.resolve(__dirname, `../dist/`)),
    require(`body-parser`).json(),
].filter((m) => typeof m === `function`)

console.log(module.exports)
