/**
 * This is the entry point of all the modules in the API.
 * Each module will execute its corresponding code and interface with several
 * controllers.
 *
 * Each module should be an ExpressJS middleware function. This means it can
 * only take the following input paramters (request, response, next).
 * Next is a callback function that tells ExpressJS to go to the next middleware
 * in the route chain.
 *
 * @type {Object}
 */
module.exports = {
    response: require('./response'),
    verify: require('./verify'),
    authenticate: require('./authenticate'),
    data: require('./data')
}
