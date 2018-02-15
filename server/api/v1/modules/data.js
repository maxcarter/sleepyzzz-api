const log = require('winston')
var ctrls = require('../controllers')
var config = require('../../../config')

module.exports = {
    save: (req, res, next) => {
        log.info('Module [data] Function [save]')
        if (!req.auth.baby) {
            log.info('Internal Server Error: Token did not contain the required information.')
            let err = new Error('Internal Server Error: Could not identify baby.')
            err.status = 500
            next(err)
            return
        }

        let timestamp = Date.now()

        if (req.body.heartrate && req.body.heartrate.length > 0) {
            let collection = 'heartrate/' + req.auth.baby
            for (let i = 0; i < req.body.heartrate.length; i++) {
                try {
                    let obj = {
                        bpm: req.body.heartrate[i],
                        timestamp: timestamp + config.sampling.interval * (i - req.body.heartrate.length - 1)
                    }
                    ctrls.database.insert(collection, obj)
                } catch (error) {
                    log.error('Error occured while attempting to insert data for [heartrate]: ' + req.body.heartrate[i])
                    log.error(error)
                }
            }
        }

        if (req.body.movement && req.body.movement.length > 0) {
            let collection = 'movement/' + req.auth.baby
            for (let i = 0; i < req.body.movement.length; i++) {
                try {
                    let obj = {
                        x: req.body.movement[i].x,
                        y: req.body.movement[i].y,
                        z: req.body.movement[i].z,
                        fall: req.body.movement[i].fall,
                        timestamp: timestamp + config.sampling.interval * (i - req.body.heartrate.length - 1)
                    }
                    ctrls.database.insert(collection, obj)
                } catch (error) {
                    log.error('Error occured while attempting to insert data for [movement]', req.body.movement[i])
                    log.error(error)
                }
            }
        }

        if (req.body.temperature && req.body.temperature.length > 0) {
            let collection = 'temperature/' + req.auth.baby
            for (let i = 0; i < req.body.temperature.length; i++) {
                try {
                    let obj = {
                        temperature: req.body.temperature[i],
                        timestamp: timestamp + config.sampling.interval * (i - req.body.heartrate.length - 1)
                    }
                    ctrls.database.insert(collection, obj)
                } catch (error) {
                    log.error('Error occured while attempting to insert data for [temperature]: ' + req.body.temperature[i])
                    log.error(error)
                }
            }
        }
        res.locals = {
            accepted: true
        }
        next()
    }
}
