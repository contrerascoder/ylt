const mongoose = require(`mongoose`)
const modelName = `message`

const model = require(`../`)(modelName, {
    message: {type: String},
    dateAdded: {type: Number, default: Date.now},
    from: {
        ref: require(`../user/`).modelName,
        type: mongoose.Types.ObjectId,
    },
})
module.exports = {
    modelName: modelName,
    async sendMessage(user, text) {
        return await model.create({
            message: text,
            from: user,
        })
    },
    async getLast20Message() {
        return await model.find({}).sort({dateAdded: -1}).limit(20).populate(`from`)
    },
}
