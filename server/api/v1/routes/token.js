const log = require('winston')
var modules = require('../modules')

/**
 * Routes for /token endpoints
 * @param  {object} router ExpressJS Router
 */
module.exports = (router) => {
    log.info('Initializing Route GET /token')
    router.get('/token',
        modules.authenticate.basicAuth,
        modules.verify.query,
        modules.authenticate.giveToken,
        modules.response)
}
