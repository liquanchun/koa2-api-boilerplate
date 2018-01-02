const router = require('koa-router')();
const auth = require('../../middlewares/auth')
const _ = require('lodash')

const Country = require('../../models/country')

router.get('/me/profile', auth, async (ctx) => {
  let user = ctx.currentUser
  user.country = await Country.findOne({ id: user.country_id })

  ctx.body = _.pick(user, [
    'id',
    'first_name',
    'last_name',
    'email',
    'password',
    'user_name',
    'country'
  ])
})

module.exports = router
