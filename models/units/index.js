const objectId = require(`mongoose`).Types.ObjectId
const modelName = `units`
const pagesModel = require(`../pages`).model

const model = require(`..`)(modelName, {
    title: {type: String},
    pages: [{
        ref: `pages`,
        type: objectId,
    }],
    subject: {
        ref: require(`../subjects`).modelName,
        type: objectId,
    },
})

module.exports = {
    modelName: modelName,
    model: model,
    async createUnit({title, abbr, color}, subject) {
        const unit = await model.findOne({subject: subject, title: title})
        if (unit !== null) {
            throw new Error(`Ya existe una unidad con el mismo titulo`)
        }
        return await model.create({title, abbr, color, subject})
    },
    async getUnits(subject) {
        return await model.find({subject: subject})
    },
    async updateUnit({title, abbr, color}, unitId) {
        const data = {title, abbr, color}
        await model.findByIdAndUpdate(unitId, {$set: data})
        return model.findById(unitId)
    },
    async getUnit(id) {
        const unit = await model.findById(id)
        const pages = await pagesModel.find({unit})
        const blocks = {}
        for (let index = 0; index < pages.length; index++) {
            const pagee = pages[index]
            blocks[pagee._id] = await require(`../blocks/`).model.find({page: pagee})
        }
        return {unit, pages, blocks}
    },
}
