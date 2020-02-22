// import {IS_PROD} from "../config/vars"
const winston = require(`winston`)
const moment = require(`moment`)
const chalk = require(`chalk`)

const formatDated = winston.format.printf((info) => {
    const formattedDate = moment().format(`YYYY-MM-DD HH:mm`)
    return `${chalk.underline(formattedDate)} - ${info.level}: ${chalk.bold(info.message)}`
})

const logger = winston.createLogger({
    level: `info`,

    format: winston.format.json(),
    // defaultMeta: {service: `user-service`},
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({filename: `logs/error.log`, level: `error`}),
        new winston.transports.File({filename: `logs/combined.log`}),
    ],
})

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
logger.add(new winston.transports.Console({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        formatDated,
    ),
}))

module.exports = logger
