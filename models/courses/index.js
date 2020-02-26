const objectId = require(`mongoose`).Types.ObjectId
const modelName = `courses`

const model = require(`..`)(modelName, {
    title: {type: String},
    abbr: {type: String},
    color: {type: String},
    user: {
        ref: require(`../user`).modelName,
        type: objectId,
    },
})

module.exports = {
    modelName: modelName,
    model: model,
    async createCourse({title, abbr, color}, user) {
        const unit = await model.findOne({title: title})
        if (unit !== null) {
            throw new Error(`Ya existe un curso con el mismo titulo`)
        }
        return await model.create({title, abbr, color, user})
    },
    async getCourses(user) {
        return await model.find({user})
    },
    async updateCourse({title, abbr, color}, courseId) {
        const data = {title, abbr, color}
        await model.findByIdAndUpdate(courseId, {$set: data})
        return model.findById(courseId)
    },
}
