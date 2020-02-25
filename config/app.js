const express = require(`express`)
const routers = require(`../routes`)

const app = express()

app.use((req, res, next) => {
    next()
})

app.use(require(`../middlewares/index.js`))
app.use(`/api`, routers)

module.exports = app
