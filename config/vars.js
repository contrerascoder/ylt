const path = require(`path`)
const ENV = process.env.NODE_ENV || `development`

ENV !== `production` && require(`dotenv`).config({
    path: path.resolve(__dirname, `../environment/${ENV}.env`),
})

const {PORT, URI_DB, SALTS, SECRET_KEY, SECRET_COOKIE} = process.env

module.exports = {NODE_ENV: ENV, PORT, URI_DB, SECRET_COOKIE, SECRET_KEY, SALTS: Number(SALTS)}
