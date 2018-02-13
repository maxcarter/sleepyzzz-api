const log = require('winston')
const jwt = require('jsonwebtoken')
const basicAuth = require('basic-auth')
var ctrls = require('../controllers')
var config = require('../../../config')

module.exports = {
    basicAuth: (req, res, next) => {
        log.info('Validating basic auth header')
        let user = basicAuth(req)

        if (!user || !user.name || !user.pass) {
            log.error('Bad Request: Missing Auth Header')
            let err = new Error('Bad Request: Missing Auth Header')
            err.status = 400
            next(err)
            return
        }

        if (user.name !== config[config.mode].apiAuth.username ||
            user.pass != config[config.mode].apiAuth.password) {
            log.error('Unauthorized: Invalid credentials.')
            let err = new Error('Unauthorized: Invalid credentials.')
            err.status = 401
            next(err)
            return
        }

        log.info('Basic Auth accepted!')
        next()
    },
    giveToken: (req, res, next) => {
        if (!req.query.device) {
            log.error('Bad Request: Missing required parameter [device].')
            let err = new Error('Bad Request: Missing required parameter [device].')
            err.status = 400
            next(err)
            return
        }
        ctrls.database.read('devices', req.query.device).then((result) => {
            if (!result) {
                log.error('Authentication failed: Device not found.')
                let err = new Error('Authentication failed: Device not found.')
                err.status = 404
                next(err)
                return
            }
            let token
            try {
                token = jwt.sign({
                    d: req.query.device,
                    b: result.baby
                }, config.token.secret, {
                    expiresIn: config.token.life
                })
            } catch (error) {
                log.error('JWT sign failed!')
                let err = new Error('Internal Server Error')
                err.status = 500
                next(err)
                return
            }

            res.locals = {
                token: token,
                device: req.query.device
            }
            next()
        }).catch((error) => {
            log.error('Internal Server Error: Failed querying database!')
            let err = new Error('Internal Server Error: Failed querying database!')
            err.status = 500
            next(err)
            return
        })
    }
}
