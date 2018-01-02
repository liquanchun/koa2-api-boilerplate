const router = require('koa-router')();
const User = require('../../models/user')
const jwt = require('../../libraries/jwt')

const { BadRequest, Unauthorized } = require('../../libraries/error')
const _ = require('lodash')
const string = require('../../libraries/string')


/**
 * @api {post} /login User Login
 * @apiVersion 1.0.0
 * @apiGroup Auth
 * @apiName UserLogin
 * @apiParam {String{1,255}} email user email
 * @apiParam {String{1,20}} password user password
 * @apiSampleRequest /login
 */
router.post('/login', async (ctx) => {
  ctx.checkBody('email').notEmpty('Email field is required').len(4, 50, 'Email length must be between 4 and 50 characters')
  ctx.checkBody('password').notEmpty('Password field is required').len(4, 20, 'Password length must be between 4 and 20 characters')

  if (ctx.errors) throw new BadRequest(ctx.errors)

  let user = await User.findOne({
    email: ctx.request.body.email,
    password: string.generatePasswordHash(ctx.request.body.password)
  })

  if (user) {
    user.token = jwt.encode(user)
  }
  else {
    throw new Unauthorized('Invalid Credentials')
  }

  ctx.body = _.pick(user, [
    'id',
    'first_name',
    'last_name',
    'email',
    'user_name',
    'country_id',
    'token'
  ])
})

module.exports = router
