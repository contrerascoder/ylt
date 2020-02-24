const express = require(`express`)
const router = new express.Router()

const authedUser = require(`../../middlewares/authed-user`)

const controller = require(`./controller`)

router.get(`/info/:email`, authedUser, controller.getInfo)
router.post(`/avatar/:id`, authedUser, require(`./multer-middleware`), controller.updateAvatar)

module.exports = router
