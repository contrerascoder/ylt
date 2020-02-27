const express = require(`express`) // eslint-disable-line
const logger = require(`../../utilities/logger`)
const {getSubjects, createSubject, updateSubject} = require(`../../models/subjects`)
module.exports = {
    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async getSubjects(req, res) {
        try {
            const subjects = await getSubjects(req.query.course)
            res.status(200).json({subjects: subjects})
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async postSubject(req, res) {
        try {
            const subject = await createSubject(req.body, req.query.course)
            res.status(200).json(subject)
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async putSubject(req, res) {
        try {
            const subject = await updateSubject(req.body, req.params.id)
            res.status(200).json(subject)
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },
}
