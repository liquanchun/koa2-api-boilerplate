let knex = require('../../libraries/knex')
let string = require('../../libraries/string')
let ModelError = require('../../libraries/error').ModelError

exports.login = (data = {}) => {
    if(!data.email) throw new ModelError('Email must be provided on login operation.')
    if(!data.password) throw new ModelError('Password must be provided on login operation.')

    return knex('tb_user').select('tb_user.*').where('email', data.email).where('password', string.generatePasswordHash(data.password)).first()
}

exports.findByEmail = (data = {}) => {
    if(!data.email) throw new ModelError('Email must be provided on find by email operation.')

    return knex('tb_user').select('tb_user.*').where('email', data.email).first()
}

exports.findById = (data = {}) => {
    if(!data.id) throw new ModelError('Id must be provided on find by id operation')
    return knex('tb_user').select('tb_user.*').where('id', data.id).first()
}

exports.findProfileById = (data = {}) => {
    if(!data.id) throw new ModelError('Id must be profided on find by id operation')
    return knex('tb_user')
        .select('tb_user.*', knex.raw('row_to_json(tb_country) as country'))
        .leftJoin('tb_country', 'tb_country.id', '=', 'tb_user.country_id')
        .where('tb_user.id', data.id)
        .first()
}

exports.getList = (data = {}) => {
    return knex('tb_user').select('tb_user.*')
}

exports.count = (data = {}) => {
    return knex('tb_user').count().first()
}