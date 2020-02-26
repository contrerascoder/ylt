const objectId = require(`mongoose`).Types.ObjectId
const modelName = `exams`

const model = require(`..`)(modelName, {
    note: {type: String},
    content: {type: String},
    unit: {
        ref: require(`../units`).modelName,
        type: objectId,
    },
})

module.exports = {
    modelName: modelName,
    model: model,
    async createPage({note, content}, unit) {
        return await model.create({note, content, unit})
    },
}
