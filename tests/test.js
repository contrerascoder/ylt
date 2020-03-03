require(`../utilities/connect-to-db`)(init, error)
const {getUnit} = require('../models/units')
const {model} = require('../models/blocks')
const {model: pagesModel} = require('../models/pages/')

// pageId -> 5e564d7b853e683af819424f

async function init() {
    console.log(`se conecto a la bse de datos`)
    // await normalizeUnits()
    //await normalizePages()
    /*const data = await getUnit("5e564849e63afc32be97d8d2")
    console.log(data);
    console.log(data.blocks['5e564d7b853e683af819424f'][0]);*/

    const {pageAllBlocks} = require('../backup.json')
    const blocks = await model.find({})
    
    for (let index = 0; index < blocks.length; index++) {
        const block = blocks[index];
        await model.findByIdAndUpdate(block._id, {
            $set: {page: pageAllBlocks}
        })
    }
    
    process.exit(0)
}

function error(err) {
    console.log(err)
    process.exit(1)
}

async function normalizeUnits() {
    const units = await require('../models/units').model.find()
    for (let index = 0; index < units.length; index++) {
        const unit = units[index];
        const pages = await require('../models/pages').model.find({unit})

        for (let index = 0; index < pages.length; index++) {
            const page = pages[index];
            const update = await require('../models/units').model.update({_id: unit._id}, {
                $push: {pages: page}
            })
            console.log(update);
            
        }
    }
}

async function normalizePages() {
    const pages = await require('../models/pages').model.find()
    for (let index = 0; index < pages.length; index++) {
        const page = pages[index];
        const blocks = await require('../models/blocks').model.find({page})
        
        for (let index = 0; index < blocks.length; index++) {
            const block = blocks[index];
            const update = await require('../models/pages').model.updateMany({_id: page._id}, {
                $push: {blocks: block}
            })
            console.log(update);
            
        }
        
    }
}