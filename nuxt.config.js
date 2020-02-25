const env = process.env.NODE_ENV
const config = require(`./nuxt.${env}.config`)
module.exports = config
