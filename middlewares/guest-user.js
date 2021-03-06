const express = require(`express`) // eslint-disable-line
const statusHttp = require(`http-status`)

/**
* Middleware para ver si el usuario esta logueado
* @param {express.request} req
* @param {express.response} res
* @param {express.NextFunction} next
* @return {void}
*/
module.exports = async function guestUser(req, res, next) {
    try {
        if (req.headers.authorization) {
            res.status(statusHttp.FORBIDDEN).end(`Ya has accedido al sistema`)
        } else {
            next()
        }
    } catch (error) {
        res.status(statusHttp.BAD_REQUEST).json({message: error.message})
    }
}
