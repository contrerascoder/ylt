const express = require(`express`) // eslint-disable-line
const logger = require(`../../utilities/logger`)
const {getCourses, createCourse, updateCourse} = require(`../../models/courses`)
module.exports = {
    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async getCourses(req, res) {
        try {
            const courses = await getCourses(req.user)
            res.status(200).json({courses})
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async postCourse(req, res) {
        try {
            const course = await createCourse(req.body, req.user)
            res.status(200).json(course)
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },

    /**
    * @param {express.request} req
    * @param {express.response} res
    */
    async updateCourse(req, res) {
        try {
            const course = await updateCourse(req.body, req.params.id)
            res.status(200).json(course)
        } catch (error) {
            logger.log(error)
            logger.info(`Sucedio un error inesperado ${error.message}`)
        }
    },
}
