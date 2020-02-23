const express = require(`express`)
const controller = require(`./controller`)
const authedUser = require(`../../middlewares/authed-user`)
const router = new express.Router()

router.get(`/`, (req, res, next) => {
    console.log(`inchat`)
    next()
})

router.get(`/`, authedUser, controller.getChatApp)
router.post(`/`, authedUser, controller.postMessage)

module.exports = router
