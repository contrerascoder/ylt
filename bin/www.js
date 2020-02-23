const http = require(`http`)
const {PORT, URI_DB} = require(`../config/vars`)
const logger = require(`../utilities/logger.js`)
const configureSocket = require(`../sockets/`)
const app = require(`../config/app`)

require(`../utilities/connect-to-db`)(setupApp, handleError)

function setupApp() {
    logger.info(`Se pudo conectar correctamente a la base de datos: ${URI_DB}`)
    try {
        const server = http.createServer(app)
        const io = require(`socket.io`)(server)
        configureSocket(io)

        server.listen(PORT, () => {
            logger.info(`Escuchando por el puerto ${PORT}`)
        })
    } catch (error) {
        logger.info(`Hubo un error configurando la aplicacion - ${error.message}`)
    }
}

function handleError(err) {
    logger.error(`Hubo un error conectandose a la base de datos ${err.message}`)
}
