const path = require(`path`)
const {IS_PROD} = require(`../config/vars`)

module.exports = [
    require(`express`).static(path.resolve(__dirname, `../app/dist/`)),
    !IS_PROD && require(`cors`)(),
    // require(`express`).static(path.resolve(__dirname, `../dist/`)),
    require(`body-parser`).json(),
].filter((m) => typeof m === `function`)
