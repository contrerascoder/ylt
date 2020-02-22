const express = require(`express`) // eslint-disable-line
const statusHttp = require(`http-status`)

module.exports = {
    /** GET /
    * Ruta de bienvenida a la aplicacion
    * @param {express.request} req
    * @param {express.response} res
    */
    welcomeUser(req, res) {
        try {
            res.render(`pages/home/index`, {
                title: `Accede al sistema`,
            })
        } catch (error) {
            res.status(statusHttp.INTERNAL_SERVER_ERROR).end(`Hubo un error interno`)
        }
    },
}
