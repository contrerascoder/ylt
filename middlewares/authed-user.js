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
        if (req.cookies.token) {
            req.user = await decodeUserByToken(req.cookies.token)
            next()
        } else {
            res.redirect(`/`)
        }
    } catch (error) {
        res.status(statusHttp.BAD_REQUEST).json({message: error.message})
    }
}
