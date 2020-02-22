const mongoose = require(`mongoose`)
const {URI_DB} = require(`../config/vars`)

module.exports = (cb, cbErr) => mongoose.connect(URI_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
}).then(cb).catch(cbErr)
