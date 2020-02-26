const mongoose = require(`mongoose`)
const {URI_DB} = require(`../config/vars`)

mongoose.set(`useFindAndModify`, false)

module.exports = (cb, cbErr) => mongoose.connect(URI_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(cb).catch(cbErr)
