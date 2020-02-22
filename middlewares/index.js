const path = require(`path`)
module.exports = [
    require(`express`).static(path.resolve(__dirname, `../dist/`)),
    require(`body-parser`).json(),
]
