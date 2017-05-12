const router = require('koa-router')();
const User = require('../model')
const validator = require('../../../libraries/validator')
const BadRequest = require('../../../libraries/error').BadRequest
let _ = require('lodash')


/**
 * @api {get} /user/:user_id Get User Profile
 * @apiVersion 1.0.0
 * @apiGroup User
 * @apiName GetUserProfile
 * @apiSampleRequest /user/:user_id
 */
router.get('/user/:user_id', validate, getProfile)


async function validate(ctx, next){
    // checking parameters type
    await validator({
        properties: {
            user_id: { 
                type: 'number',
                format: 'user_id'
            }
        },
        required: ['user_id'],
    }, { user_id: parseInt(ctx.params.user_id) } )

    await next();
}

async function getProfile(ctx, next){
    let user = await User.findProfileById({ id: ctx.params.user_id })

    console.log(user)
    
    ctx.body = _.pick(user, [
        'id',
        'first_name',
        'last_name',
        'email',
        'user_name',
        'country'
    ])
}

module.exports = router