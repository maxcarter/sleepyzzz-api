const log = require('winston')
const express = require('express')
var config = require('../config.js')

module.exports = (app) => {
    // Initialize the ExpressJS router
    var router = express.Router()
    let version = config.api.version;

    // 400 Error handling
    app.use((req, res, next) => {
        req.chunks = ''
        req.setEncoding('utf8')

        req.on('data', (chunk) => {
            req.chunks += chunk
        })

        req.on('end', () => {
            if (!req.chunks) {
                next()
                return
            }
            // Log raw data
            log.info(req.chunks)
            try {
                req.body = JSON.parse(req.chunks)
                next()
            } catch (error) {
                log.error(error)
                let code = 400
                res.status(code)
                res.json({
                    code: code,
                    message: 'Bad Request: Error parsing JSON.'
                })
                return
            }
        })
    })

    // Inclue the routes
    require(`./${version}/routes`)(router)

    // Prefix the routes with /api/v1
    app.use(`/api/${version}`, router)

    // 404 Error handling
    app.use((req, res, next) => {
        let code = 404
        res.status(code)
        let response = {
            code: code,
            message: 'Not found'
        }
        res.json(response)
        return
    })
}
