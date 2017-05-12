let User = require('../app/user/model')
let jwt = require('jsonwebtoken')
let config = require('../env').jwt
let Unauthorized = require('../libraries/error').Unauthorized

module.exports = async(ctx, next) => {
    var token = ctx.headers.token;

    if (token) {
        try{
            decoded = jwt.verify(token, config.secret)
            let user = await User.find({
                id: decoded.id
            })
            
            if(user && user.id){
                ctx.currentUser = user
                next()
            }
            else{
                throw new Unauthorized('Missing User')
            }
        }
        catch(err){
            if(err.name == 'TokenExpiredError'){
                throw new Unauthorized('Token Expired')
            }
            else{
                throw new Unauthorized('Unauthorized Request')
            }
        }
    }
    else {
        throw new Unauthorized('Missing Auth Token')
    }
}