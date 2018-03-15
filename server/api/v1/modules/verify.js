const log = require('winston')
const jwt = require('jsonwebtoken')
var config = require('../../../config')

module.exports = {
    /**
     * Verifies request body exists
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    body: (req, res, next) => {
        if (!req.body || (Object.keys(req.body).length === 0 && req.body.constructor === Object)) {
            let err = new Error('Bad Request: Empty or invalid payload!')
            err.status = 400
            next(err)
            return
        }
        next()
    },
    /**
     * Verifies request path params exists
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    params: (req, res, next) => {
        if (!req.params || (Object.keys(req.params).length === 0 && req.params.constructor === Object)) {
            let err = new Error('Bad Request: Empty or invalid parameters in path!')
            err.status = 400
            next(err)
            return
        }
        next()
    },
    /**
     * Verifies request query params exists
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    query: (req, res, next) => {
        if (!req.query || (Object.keys(req.query).length === 0 && req.query.constructor === Object)) {
            let err = new Error('Bad Request: Empty or invalid query parameters in path!')
            err.status = 400
            next(err)
            return
        }
        next()
    },
    /**
     * Verifies JWT
     * @param  {object}   req  Request object
     * @param  {object}   res  Response object
     * @param  {Function} next Callback function to move on to the next middleware
     */
    token: (req, res, next) => {
        // check for token in various locations
        var token = req.body.token || req.query.token || req.headers['token']

        if (!token) {
            log.error('Missing JWT')
            let err = new Error('Forbidden: Missing authentication token')
            err.status = 403
            next(err)
            return
        }

        // verifies secret and checks if token is valid
        jwt.verify(token, config.token.secret, function(err, decoded) {
            if (err) {
                log.error('JWT check failed!')
                let err = new Error('Forbidden: Invalid Token for authentication')
                err.status = 403
                next(err)
                return
            }

            if (!('b' in decoded) || !('d' in decoded)) {
                log.error('Invalid Token')
                let err = new Error('Forbidden: Invalid Token for authentication')
                err.status = 403
                next(err)
                return
            }

            req.auth = {
                baby: decoded.b,
                device: decoded.d,
                iat: decoded.iat
            }
            next()
        })
    }
}
