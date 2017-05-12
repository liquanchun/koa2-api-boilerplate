const router = require('koa-router')();
const User = require('../model')
let validator = require('../../../libraries/validator')
let auth = require('../../../middlewares/auth')

async function getMyProfile(ctx, next){
    let user = await User.findById({
        id: ctx.currentUser.id
    })

    ctx.body = user
}

router.get('/me/profile', auth, getMyProfile)

module.exports = router