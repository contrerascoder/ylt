const express = require(`express`)
const controller = require(`./controller`)

const router = new express.Router()

router.get(`/`, controller.welcomeUser)

module.exports = router
