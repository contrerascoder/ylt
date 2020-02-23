const express = require(`express`)
const controller = require(`./controller`)
const validators = require(`../validators`)
const guestUser = require(`../../middlewares/guest-user`)

const router = new express.Router()

router.use(guestUser)

router.post(`/signup`, validators.signup, controller.signUp)
router.post(`/signin`, validators.login, controller.signin)
router.get(`/activate/:id`, controller.activate)

module.exports = router
