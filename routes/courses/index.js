const express = require(`express`)
const authedUser = require(`../../middlewares/authed-user`)
const controller = require(`./controller`)

const router = new express.Router()
router.use(authedUser)

router.get(`/`, controller.getCourses)

module.exports = router
