const express = require(`express`)
const authedUser = require(`../../middlewares/authed-user`)
const controller = require(`./controller`)

const {courseCreation} = require(`../validators`)

const router = new express.Router()
router.use(authedUser)

router.get(`/`, controller.getCourses)
router.post(`/`, courseCreation, controller.postCourse)
router.put(`/:id`, courseCreation, controller.updateCourse)

module.exports = router
