const objectId = require(`mongoose`).Types.ObjectId
const modelName = `units`
const pagesModel = require(`../pages`).model
const blocks = require(`../blocks`).model

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
            if (!blocks[pagee._id]) {
                blocks[pagee._id] = []
            }
            blocks[pagee._id].push(await require(`../blocks/`).model.find({page: pagee}))
        }
        return {unit, pages, blocks}
        /* console.log(unit)

        const pages = await pagesApi.model.find({unit})
        for (let index = 0; index < pages.length; index++) {
            const page = Object.assign({}, pages[index])
            const blocksItems = await blocks.model.find({page: pages[index]})
            pages[index] = Object.assign({}, {
                ...page,
                blocks: blocksItems,
            })
        }
        return {
            ...unit,
        }*/
    },
}
