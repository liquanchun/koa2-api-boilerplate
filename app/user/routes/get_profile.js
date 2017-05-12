const router = require('koa-router')();
const User = require('../model')
const validator = require('../../../libraries/validator')
const BadRequest = require('../../../libraries/error').BadRequest
let _ = require('lodash')

async function validate(ctx, next){
    // checking parameters type
    await validator({
        properties: {
            id: { 
                type: 'number',
                format: 'user_id'
            }
        },
        required: ['id'],
    }, { id: parseInt(ctx.params.id) } )

    await next();
}

async function getProfile(ctx, next){
    let user = await User.findById({ id: ctx.params.id })
    
    ctx.body = _.pick(user, [
        'id',
        'first_name',
        'last_name',
        'email'
    ])
}

router.get('/user/:id', validate, getProfile)

module.exports = router