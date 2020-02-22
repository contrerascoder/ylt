const objectId = require(`mongoose`).Types.ObjectId
const modelName = `user`

const model = require(`..`)(modelName, {
    name: {type: String},
    surname: {type: String},
    credentials: {
        ref: require(`../credentials/`).modelName,
        type: objectId,
    },
})

module.exports = {modelName, model}
