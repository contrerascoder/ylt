const logger = require(`../../utilities/logger`)
const express = require(`express`) // eslint-disable-line
const uploadAvatar = require(`./upload-avatar`)
const {setAvatar, model} = require(`../../models/user/`)

module.exports = {
    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async updateAvatar(req, res) {
        try {
            const result = await uploadAvatar(req.params.id, req.file)
            await setAvatar(req.params.id, result.url)
            res.status(200).end(result.url)
        } catch (error) {
            logger.info(`error ${error.message}`)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async  getInfo(req, res) {
        try {
            const user = await model.findOne({email: req.params.email})
            res.status(200).json(user)
        } catch (error) {
            logger.info(`error ${error.message}`)
        }
    },
}


