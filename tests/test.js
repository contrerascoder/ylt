require(`../utilities/connect-to-db`)(init, error)

async function init() {
    console.log(`se conecto a la bse de datos`)
    // await normalizeUnits()
    //await normalizePages()
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