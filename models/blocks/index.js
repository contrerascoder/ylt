const objectId = require(`mongoose`).Types.ObjectId
const modelName = `blocks`

const modelPageName = `pages`

const model = require(`..`)(modelName, {
    number: {type: Number},
    type: {type: String},
    content: {type: String},
    page: {
        ref: modelPageName,
        type: objectId,
    },
})

module.exports = {
    modelName: modelName,
    model: model,
}
