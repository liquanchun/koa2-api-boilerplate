const router = require('koa-router')();
const User = require('../model')
const validator = require('../../../libraries/validator')
const jwt = require('../../../libraries/jwt')
const Unauthorized = require('../../../libraries/error').Unauthorized
let _ = require('lodash')


/**
 * @api {post} /login User Login
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName UserLogin
 * @apiParam {String{1,255}} email user email
 * @apiParam {String{1,20}} password user password
 * @apiSampleRequest /login
 */
router.post('/login', validate, login)


async function validate(ctx, next){
    await validator({
        type: 'object',
        properties: {
            email: { type: 'string'},
            password: { type: 'string'},
        },
        required: ['email', 'password']
    }, ctx.request.body)

    await next(ctx, next);
}

async function login(ctx, next){
    let user = await User.login({
        email: ctx.request.body.email
        
    })

    if(user){
        user.token = jwt.encode(user)
    }
    else{
        throw new Unauthorized('Invalid Credentials')
    }

    ctx.body = _.pick(user, [
        'id',
        'first_name',
        'last_name',
        'email',
        'user_name',
        'country_id'
    ])
}

module.exports = router