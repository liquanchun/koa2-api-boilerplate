const router = require('koa-router')();
const User = require('models/user')
const BadRequest = require('libraries/error').BadRequest
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
  ctx.checkParams('user_id').notEmpty('User id is required').isInt('User id must be a number')
  
  if(ctx.errors) throw new BadRequest(ctx.errors);

  let user = await User.findProfileById({ id: ctx.params.user_id })
  if(user) {
    ctx.userProfile = user
  }
  else{
    throw new BadRequest([{
      user_id: 'Invalid user id'
    }])
  }

  await next();
}

async function getProfile(ctx, next){
    ctx.body = _.pick(ctx.userProfile, [
        'id',
        'first_name',
        'last_name',
        'email',
        'user_name',
        'country'
    ])
}

module.exports = router