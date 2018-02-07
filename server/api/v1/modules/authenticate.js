const log = require('winston')
const jwt = require('jsonwebtoken')
var ctrls = require('../controllers')
var config = require('../../../config')

module.exports = {
    giveToken: (req, res, next) => {
        if (!req.query.device) {
            log.info('Bad Request: Missing required parameter [device].');
            let err = new Error('Bad Request: Missing required parameter [device].');
            err.status = 400;
            next(err);
            return;
        }
        ctrls.database.read('devices', req.query.device).then((result) => {
            if (!result) {
                log.info('Authentication failed: Device not found.');
                let err = new Error('Authentication failed: Device not found.');
                err.status = 404;
                next(err);
                return;
            }
            let token
            try {
                token = jwt.sign({
                    'device': req.query.device,
                    'baby': result.baby
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
            log.error('Internal Server Error: Failed querying database!');
            let err = new Error('Internal Server Error: Failed querying database!')
            err.status = 500
            next(err)
            return
        });
    }
}
