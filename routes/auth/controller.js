const express = require(`express`) // eslint-disable-line
const statusHttp = require(`http-status`)
const logger = require(`../../utilities/logger.js`)
const {register, login, createToken} = require(`../../models/credentials/`)

module.exports = {
    /** POST /auth/signup
    * Ruta para registrar a los usuarios
    * @param {express.request} req
    * @param {express.response} res
    */
    async signUp(req, res) {
        try {
            const user = await register(req.body)
            return res.status(statusHttp.CREATED).json({
                message: `Te has registrado correctamente`,
                user: user,
            })
        } catch (error) {
            logger.info(error.message)
            res.status(statusHttp.BAD_REQUEST).json({message: error.message})
        }
    },

    /** POST /auth/login
    * Acceso de usuarios al sistema
    * @param {express.request} req
    * @param {express.response} res
    */
    async signin(req, res) {
        try {
            const access = await login(req.body.email, req.body.password)
            const token = await createToken(access)
            res.status(statusHttp.OK).json({message: `Has accedido correctamente`, token: token})
        } catch (error) {
            res.status(statusHttp.BAD_REQUEST).json({message: error.message})
        }
    },
}
