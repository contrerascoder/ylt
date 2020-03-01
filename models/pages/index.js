const objectId = require(`mongoose`).Types.ObjectId
const modelName = `pages`
const blockModel = require(`../blocks`).model

const model = require(`..`)(modelName, {
    title: {type: String},
    number: {type: Number},
    blocks: {
        ref: `blocks`,
        type: objectId,
    },
    unit: {
        ref: `pages`,
        type: objectId,
    },
})

module.exports = {
    modelName: modelName,
    model: model,
    async createPage({title, number}, unit) {
        return await model.create({title, number, unit})
    },
    async getPages(unit) {
        return await model.find({unit: unit})
    },
    async updatePage({title}, idPage, blocks) {
        const page = await model.findByIdAndUpdate(idPage, {$set: {title}})
        page.blocks = []
        await blockModel.deleteMany({
            page: page,
        })
        for (let index = 0; index < blocks.length; index++) {
            const block = blocks[index]
            page.blocks.push(await blockModel.create({
                ...block,
                page: page,
            }))
        }
        page.title = title
        return page
    },
}
