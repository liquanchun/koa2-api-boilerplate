let config = require('../env').jwt
let jwt = require('jsonwebtoken')
let q = require('bluebird')

exports.encode = (user) => {
	return jwt.sign({id:user.id}, config.secret, {
         expiresIn: config.expiresIn
    });
}

exports.decode = (token) => {
	return jwt.decode(token, config.secret);
}