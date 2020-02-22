const express = require(`express`)
const routes = require(`../routes`)

const app = express()

app.use(require(`../middlewares/index.js`))
for (const path in routes) {
    if (routes.hasOwnProperty(path)) {
        const route = routes[path]
        app.use(path, route)
    }
}

module.exports = app
