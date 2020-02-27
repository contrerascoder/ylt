const objectId = require(`mongoose`).Types.ObjectId
const modelName = `subjects`

const model = require(`..`)(modelName, {
    title: {type: String},
    abbr: {type: String},
    color: {type: String},
    course: {
        ref: require(`../courses`).modelName,
        type: objectId,
    },
})

module.exports = {
    modelName: modelName,
    model: model,
    async createSubject({title, abbr, color}, course) {
        const unit = await model.findOne({title: title})
        if (unit !== null) {
            throw new Error(`Ya existe una asignatura con el mismo titulo`)
        }

        return await model.create({title, abbr, color, course})
    },
    async getSubjects(course) {
        return await model.find({course: course})
    },
    async updateSubject({title, abbr, color}, unitId) {
        const data = {title, abbr, color}
        await model.findByIdAndUpdate(unitId, {$set: data})
        return model.findById(unitId)
    },
}
