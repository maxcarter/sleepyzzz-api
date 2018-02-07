const express = require('express')
var config = require('../config.js')

module.exports = (app) => {
    // Initialize the ExpressJS router
    var router = express.Router()
    let version = config.api.version;

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
