const express = require(`express`) // eslint-disable-line
const logger = require(`../../utilities/logger`)
const {getUnits, createUnit, updateUnit, getUnit} = require(`../../models/units`)
module.exports = {
    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async getUnits(req, res) {
        try {
            const units = await getUnits(req.query.subject)
            res.status(200).json({units: units})
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async postUnit(req, res) {
        try {
            const unit = await createUnit(req.body, req.query.subject)
            res.status(200).json(unit)
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
            res.status(400).end(error.message)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async putUnit(req, res) {
        try {
            const subject = await updateUnit(req.body, req.params.id)
            res.status(200).json(subject)
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
            res.status(400).end(error.message)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async getUnit(req, res) {
        try {
            const units = await getUnit(req.params.id)
            res.status(200).json({units: units})
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },

}
