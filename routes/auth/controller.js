const express = require(`express`) // eslint-disable-line
const statusHttp = require(`http-status`)
const logger = require(`../../utilities/logger.js`)
const {register, login, createToken, activateAccount} = require(`../../models/credentials/`)


module.exports = {
    /** POST /auth/signup
    * Ruta para registrar a los usuarios
    * @param {express.request} req
    * @param {express.response} res
    */
    async activate(req, res) {
        try {
            console.log(req.params)

            await activateAccount(req.params.id)
            return res.redirect(`/`)
        } catch (error) {
            console.log(error)
            res.status(statusHttp.BAD_REQUEST).end(error.message)
        }
    },
    /** POST /auth/signup
    * Ruta para registrar a los usuarios
    * @param {express.request} req
    * @param {express.response} res
    */
    async signUp(req, res) {
        try {
            const user = await register(req.body, req)
            return res.status(statusHttp.CREATED).json({
                message: `Te has registrado correctamente`,
                user: user,
            })
        } catch (error) {
            console.log(error)

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
