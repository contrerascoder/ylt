const express = require(`express`)
const controller = require(`./controller`)

const router = new express.Router()

router.get(`/`, require(`../../middlewares/authed-user`), controller.getChatApp)
router.post(`/`, require(`../../middlewares/authed-user`), controller.postMessage)

module.exports = router
