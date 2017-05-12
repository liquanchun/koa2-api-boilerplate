let knex = require('../../libraries/knex')
let string = require('../../libraries/string')
let ModelError = require('../../libraries/error').ModelError

exports.findById = (data = {}) => {
    if(!data.id) throw new ModelError('Id must be provided on find by id operation')
    return knex('tb_country').select('tb_country.*').where('id', data.id).first()
}

exports.getList = (data = {}) => {
    return knex('tb_country').select('tb_country.*')
}