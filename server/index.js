const express = require('express')
const path = require('path')
const morgan = require('morgan')
const log = require('winston')
const firebase = require('firebase')

var config = require('./config')
var app = express()

let mode = 'dev'
let server = config.dev

log.add(log.transports.File, {
    filename: config.log
})

if (config.mode === 'prod') {
    log.remove(log.transports.Console);
    mode = 'tiny';
    server = config.prod;
}

firebase.initializeApp({
    serviceAccount: server.database.serviceAccount,
    databaseURL: server.database.url
})

app.use(morgan(mode))

require('./api')(app);

app.listen(server.port, server.host, () => {
    log.info(`Server listening on port: ${server.port}`)
})
