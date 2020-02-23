const express = require(`express`) // eslint-disable-line
const statusHttp = require(`http-status`)
const {sendMessage, getLast20Message} = require(`../../models/message`)
const {event, NEW_MESSAGE} = require(`../../sockets/actions`)

module.exports = {
    /** GET /chat
    * Rutas para el chat
    * @param {express.request} req
    * @param {express.response} res
    */
    async getChatApp(req, res) {
        try {
            console.log(`getting messages`)

            res.status(200).json({messages: await getLast20Message()})
        } catch (error) {
            res.status(statusHttp.BAD_REQUEST).json({message: error.message})
        }
    },

    /** POST /chat
     * Ruta para crear un mensaje
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    async postMessage(req, res, next) {
        try {
            const message = await sendMessage(req.user, req.body.message)
            event.emit(NEW_MESSAGE, message)
            res.status(statusHttp.OK).json({message})
        } catch (error) {
            res.status(statusHttp.BAD_REQUEST).json({error: error.message})
        } finally {
            next()
        }
    },
}
