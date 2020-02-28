const express = require(`express`)

const router = new express.Router()

router.use((req, res, next) => {
    next()
})

router.use(`/`, require(`./welcome`))
router.use(`/auth`, require(`./auth`))
// router.use(`/chat`, require(`./chat`))
router.use(`/user`, require(`./user`))
router.use(`/courses`, require(`./courses`))
router.use(`/subjects`, require(`./subjects`))
router.use(`/units`, require(`./units`))

module.exports = router
