const express = require(`express`)
const controller = require(`./controller`)
const guestUser = require(`../../middlewares/guest-user`)

const router = new express.Router()

router.get(`/`, guestUser, controller.welcomeUser)

module.exports = router
