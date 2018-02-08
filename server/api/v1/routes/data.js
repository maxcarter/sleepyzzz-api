const log = require('winston')
var modules = require('../modules')

/**
 * Routes for /data endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route POST /data')
    router.post('/data',
        modules.verify.token,
        modules.verify.body,
        modules.data.save,
        modules.response)
}
