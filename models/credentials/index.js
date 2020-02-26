const bcrypt = require(`bcrypt`)
const {SALTS, SECRET_KEY, IS_PROD} = require(`../../config/vars`)
const jsonwebtoken = require(`jsonwebtoken`)
const modelName = `credentials`
const sendMail = require(`../../utilities/send-mail`)
const {PORT} = require(`../../config/vars`)

const model = require(`..`)(modelName, {
    email: {type: String},
    password: {type: String},
    activated: {type: Boolean, default: false},
})

module.exports = {
    modelName: modelName,
    async activateAccount(uuid) {
        await model.findOneAndUpdate({uuid: uuid}, {activated: true})
    },
    async register({name, surname, password, email}, {hostname} = {}) {
        const user = await searchUserByEmail(email)
        if (user) {
            throw new Error(`El email ya está registrado`)
        }
        const credentials = await model.create({
            email: email,
            password: await hashPassword(password),
        })
        if (hostname) {
            const html = `Para activar tu cuenta tienes que hacer click <a href="http://${hostname}:${PORT}/api/auth/activate/${credentials.uuid}">aqui</a>`
            await sendMail(credentials.email, `Activa tu cuenta`, html)
        }
        return await require(`../user/`).model.create({
            name: name,
            surname: surname,
            credentials: credentials,
        })
    },
    async login(email, password) {
        const credentials = await searchUserByEmail(email)
        if (!credentials) {
            throw new Error(`credenciales incorrectas`)
        }
        if ( !(await comparePassword(password, credentials.password)) ) {
            throw new Error(`credenciales incorrectas`)
        }
        if (IS_PROD && !credentials.activated) {
            throw new Error(`Tienes que activar tu usuario`)
        }
        return await recoverUserByCredentials(credentials)
    },
    async createToken(payload) {
        return jsonwebtoken.sign(Object.assign({}, payload), SECRET_KEY)
    },
    async decodeUserByToken(token) {
        const payload = jsonwebtoken.verify(token, SECRET_KEY)
        return await require(`../user/`).model.findById(payload._doc._id).populate(`credentials`)
    },
    async recoverUserFromEmail(email) {
        const credentials = await model.findOne({email: email})
        return await require(`../user/`).model.findOne({credentials: credentials})
    },
}

async function searchUserByEmail(email) {
    return await model.findOne({email: email})
}

async function recoverUserByCredentials(credentials) {
    return await require(`../user/`).model.findOne({credentials: credentials})
}

async function hashPassword(input) {
    const salts = await bcrypt.genSalt(SALTS)
    return await bcrypt.hash(input, salts)
}
async function comparePassword(input, hash) {
    return await bcrypt.compare(input, hash)
}
