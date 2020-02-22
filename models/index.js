const mongoose = require(`mongoose`)
const uuid = require(`uuid/v4`)


/**
 * Crear un modelo
 * @param {*} name Nombre del modelo
 * @param {*} schemaData Datos del modelo
 * @return {mongoose.Model}
 */
function createModel(name, schemaData) {
    const schema = new mongoose.Schema({
        ...schemaData,
        uuid: {type: String, default: uuid},
        createdAt: {type: Date, default: Date.now},
    })
    return mongoose.model(name, schema)
}

module.exports = createModel
