const express = require(`express`)
const authedUser = require(`../../middlewares/authed-user`)
const controller = require(`./controller`)

const {courseCreation} = require(`../validators`)

const router = new express.Router()
router.use(authedUser)

router.get(`/`, controller.getUnits)
router.post(`/`, courseCreation, controller.postUnit)
router.put(`/:id`, courseCreation, controller.putUnit)

module.exports = router
