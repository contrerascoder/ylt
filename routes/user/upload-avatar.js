const {CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET_KEY} = require(`../../config/vars`)
const cloudinary = require(`cloudinary`).v2

cloudinary.config({
    cloud_name: `dqscsxfcv`,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET_KEY,
})

function uploadAvatar(id, file) {
    return new Promise(function(resolve, reject) {
        cloudinary.uploader.upload(file.path, {public_id: id}, function(error, result) {
            if (error) {
                return reject(error)
            }
            resolve(result)
        })
    })
}

module.exports = uploadAvatar
