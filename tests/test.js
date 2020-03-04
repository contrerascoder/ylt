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

    /*const pageData = {
        number: 2,
        title: 'Se ha metido la pagina número 2'
    }
    const newPage = await addPage(pageData, "5e564849e63afc32be97d8d2")
    console.log(newPage);*/

    const pages = await pagesModel.find({}).sort('number')
    console.table(pages.map(page => ({
        title: page.title,
        number: page.number,
        id: page._id
    })));
    

    process.exit(0)
}

async function addPage(page, unitId) {
    const pages = await pagesModel.updateMany({
        number: {$gte: page.number},
        unit: unitId
    }, {
        $inc: {number: 1}
    })

    return await pagesModel.create({...page, unit: unitId})
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