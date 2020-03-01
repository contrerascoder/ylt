const express = require(`express`)
const authedUser = require(`../../middlewares/authed-user`)
const controller = require(`./controller`)

const router = new express.Router()
router.use(authedUser)

router.get(`/`, controller.getUnits)
router.post(`/`, controller.postUnit)
router.get(`/:id`, controller.getUnit)
router.put(`/:id`, controller.putUnit)

module.exports = router
