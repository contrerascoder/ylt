const bcrypt = require(`bcrypt`)
const {SALTS, SECRET_KEY} = require(`../../config/vars`)
const jsonwebtoken = require(`jsonwebtoken`)
const modelName = `credentials`

const model = require(`..`)(modelName, {
    email: {type: String},
    password: {type: String},
})

module.exports = {
    modelName: modelName,
    async register({name, surname, password, email}) {
        const user = await searchUserByEmail(email)
        if (user) {
            throw new Error(`El email ya está registrado`)
        }
        const credentials = await model.create({
            email: email,
            password: await hashPassword(password),
        })
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
        return await recoverUserByCredentials(credentials)
    },
    async createToken(payload) {
        return jsonwebtoken.sign(Object.assign({}, payload), SECRET_KEY)
    },
    async decodeUserByToken(token) {
        const payload = jsonwebtoken.verify(token, SECRET_KEY)
        return await require(`../user/`).model.findById(payload._doc._id).populate(`credentials`)
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
