const log = require('winston')
const firebase = require('firebase')
const q = require('q')
const config = require('../../../config')
var db = config[config.mode].database.node

module.exports = {
    /**
     * Inserts into database
     * @param  {String} collection Name of collection
     * @param  {Object} data       Data to be inserted
     * @return {Promise}           JavaScript Promise
     */
    insert: (collection, data) => {
        log.info('Controller [database] Function [insert]')
        log.info(`Inserting data into Firebase [${collection}]`)

        let deferred = q.defer()
        let ref = firebase.database().ref(db)
        let collectionRef = ref.child(collection).push()
        collectionRef.set(data).then(() => {
            log.info(`Successfully inserted data into Firebase [${collection}]`)
            deferred.resolve()
        }).catch((error) => {
            log.error(`Failed inserting data into Firebase [${collection}]`, error)
            deferred.reject(error)
        })

        return deferred.promise
    },
    /**
     * Reads from database
     * @param  {String} collection Name of collection
     * @param  {String} value      Name of value to read
     * @return {Promise}           JavaScript Promise
     */
    read: (collection, key) => {
        log.info('Controller [database] Function [read]')
        log.info(`Reading Firebase [${collection}]`)

        let deferred = q.defer()
        let ref = firebase.database().ref(db)
        let collectionRef = ref.child(collection).child(key)
        collectionRef.once('value').then((snapshot) => {
            log.info(`Successfully read data from Firebase [${collection}]`)
            deferred.resolve(snapshot.val())
        }).catch((error) => {
            log.error(`Failed reading data from Firebase [${collection}]`, error)
            deferred.reject(error)
        })
        return deferred.promise
    }
}
