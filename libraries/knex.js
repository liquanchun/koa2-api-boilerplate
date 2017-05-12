let config = require('../env').knex
let connection = require('knex')(config)

module.exports = connection