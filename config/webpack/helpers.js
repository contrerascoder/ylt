const path = require(`path`)
const basePath = path.resolve(__dirname, `../../`)
module.exports.directory = (pathFile) => {
    return path.join(basePath, pathFile)
}
