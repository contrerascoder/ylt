const path = require(`path`)

const ENV = process.env.NODE_ENV || `development`
const IS_PROD = ENV === `production`
!IS_PROD && require(`dotenv`).config({
    path: path.resolve(__dirname, `../environment/${ENV}.env`),
})

module.exports = {
    IS_PROD: IS_PROD,
    NODE_ENV: ENV,
    PORT: process.env.PORT,
    URI_DB: process.env.URI_DB,
    API_EMAIL_KEY: process.env.API_EMAIL_KEY,
    API_SECRET_EMAIL_KEY: process.env.API_SECRET_EMAIL_KEY,
    SECRET_COOKIE: process.env.SECRET_COOKIE,
    SECRET_KEY: process.env.SECRET_KEY,
    SALTS: Number(process.env.SALTS),
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET_KEY: process.env.CLOUDINARY_API_SECRET_KEY,
}
