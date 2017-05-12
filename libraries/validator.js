const ZSchema = require('z-schema')
let knex = require('./knex')

const BadRequest = require('./error').BadRequest

ZSchema.registerFormat("user_id", function (userId, callback) {
    knex('tb_user').select('id').where('id', userId).then(function (rows) {
        callback(!!rows.length)
    });
});

module.exports = function(rules, data){
    var validator = new ZSchema();
    return new Promise((resolve, reject) => {
        validator.validate(data, rules, function (err, valid) {
            if(valid){
                resolve()
            }
            else{
                let errors = err.map(e => {
                    let paramPath = e.path.replace('#/', '').replace('/', '.')
                    return {
                        field: paramPath ? paramPath : e.params[0],
                        message: e.message
                    }
                });
                reject(errors)
            }
        });
    }).catch((err) => {
        throw new BadRequest(err)
    })
}