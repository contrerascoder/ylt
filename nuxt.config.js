const env = process.env.NODE_ENV
const config = require(`./nuxt.${env}.config`)
console.log(config)

module.exports = config
