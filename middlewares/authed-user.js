const express = require(`express`) // eslint-disable-line
const statusHttp = require(`http-status`)
const {decodeUserByToken} = require(`../models/credentials/`)

/**
* Middleware para ver si el usuario esta logueado
* @param {express.request} req
* @param {express.response} res
* @param {express.NextFunction} next
* @return {void}
*/
module.exports = async function authedUser(req, res, next) {
    try {
        if (req.headers.authorization) {
            req.user = await decodeUserByToken(req.headers.authorization)
            next()
        } else {
            res.status(statusHttp.FORBIDDEN).end(`Neceistas autenticarte`)
        }
    } catch (error) {
        res.status(statusHttp.BAD_REQUEST).json({message: error.message})
    }
}
