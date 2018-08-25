const knex = require('../libraries/knex');

exports.getDataList = viewname => knex(viewname).where('IsValid', 1).select(`${viewname}.*`);

exports.updateData = (viewname, data) => knex(viewname).returning('id')
  .where('Id', data.Id)
  .update(data);

exports.addData = (viewname, data) => knex.returning('id').insert([data], 'id').into(viewname);

exports.deleteData = (viewname, id) => knex(viewname).where('Id', id).update('IsValid', 0);

exports.firstData = (viewname, id) => knex(viewname).where('Id', id).first();
