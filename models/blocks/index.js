const objectId = require(`mongoose`).Types.ObjectId
const modelName = `blocks`

const modelPageName = `pages`

const model = require(`..`)(modelName, {
    type: {type: String},
    data: {type: Object},
    page: {
        ref: modelPageName,
        type: objectId,
    },
})

module.exports = {
    modelName: modelName,
    model: model,
}
