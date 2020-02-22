const types = require(`./actions`)
const {getLast20Message} = require(`../models/message/`)

module.exports = {
    async sendLastMessages(socket) {
        socket.emit(types.LAST_MESSAGES, await getLast20Message())
    },
    async sendNewMessage(message, socket) {
        socket.emit(types.NEW_MESSAGE, message)
    },
}
