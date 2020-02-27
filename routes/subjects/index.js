const express = require(`express`)
const authedUser = require(`../../middlewares/authed-user`)
const controller = require(`./controller`)

const {courseCreation} = require(`../validators`)

const router = new express.Router()
router.use(authedUser)

router.get(`/`, controller.getSubjects)
router.post(`/`, courseCreation, controller.postSubject)
router.put(`/:id`, courseCreation, controller.putSubject)

module.exports = router
