const {check, validationResult} = require(`express-validator`)
const statusHttp = require(`http-status`)
const express = require(`express`) // eslint-disable-line
const validators = {
    user: {
        nameIsPresent: check(`name`).notEmpty().withMessage(`El nombre es requerido`),
        surnameIsPresent: check(`surname`).notEmpty().withMessage(`Los apellidos son requeridos`),
        emailIsPresent: check(`email`).notEmpty().withMessage(`El correo electrónico es requerido`),
        passwordIsPresent: check(`password`).notEmpty().withMessage(`La contraseña es requerida`),

        nameIsValid: check(`name`).isLength({min: 3}).withMessage(`El nombre no es valido`),
        surnameIsValid: check(`surname`).isLength({min: 6}).withMessage(`Los apellidos no son validos`),
        emailIsValid: check(`email`).isEmail().withMessage(`El correo electrónico no es valido`),
        passwordIsValid: check(`password`).isLength({min: 6}).withMessage(`Esa contraseña no es valida`),
    },
}

module.exports = {
    signup: createValidator([
        validators.user.nameIsPresent,
        validators.user.nameIsValid,

        validators.user.surnameIsPresent,
        validators.user.surnameIsValid,

        validators.user.emailIsPresent,
        validators.user.emailIsValid,

        validators.user.passwordIsPresent,
        validators.user.passwordIsValid,
    ]),
    login: createValidator([
        validators.user.emailIsPresent,
        validators.user.emailIsValid,

        validators.user.passwordIsPresent,
        validators.user.passwordIsValid,
    ]),
}

function createValidator(rules) {
    return [...rules, validate]
}

/**
 * Middleware para validar los datos
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {void}
 */
function validate(req, res, next) {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(422).json({
                errors: errors.array(),
                message: `Algunos datos no son válidos`,
            })
        }
        next()
    } catch (error) {
        res.status(statusHttp.INTERNAL_SERVER_ERROR).end(`Hubo un error interno`)
    }
}
