const EventEmitter = require(`events`)
module.exports = {
    event: new EventEmitter(),
    LAST_MESSAGES: `message`,
    NEW_MESSAGE: `new_message`,
}
