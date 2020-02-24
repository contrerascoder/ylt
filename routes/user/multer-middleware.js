const multer = require(`multer`)

const uploader = multer({
    dest: `/tmp`,
})

module.exports = uploader.single(`avatar`)
