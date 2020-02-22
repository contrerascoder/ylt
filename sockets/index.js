const logger = require(`../utilities/logger`)
const chatListeners = require(`./chat`)
const {event, NEW_MESSAGE} = require(`./actions`)

module.exports = function configureSocket(io) {
    logger.debug(`Hubo una conexion`)
    io.on(`connection`, (socket) => {
        event.on(NEW_MESSAGE, (message) => chatListeners.sendNewMessage(message, socket))
    })
}
