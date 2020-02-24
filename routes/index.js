const express = require(`express`)

const router = new express.Router()

router.use((req, res, next) => {
    console.log(`En /api`)
    next()
})

router.use(`/`, require(`./welcome`))
router.use(`/auth`, require(`./auth`))
router.use(`/chat`, require(`./chat`))
router.use(`/user`, require(`./user`))

module.exports = router
