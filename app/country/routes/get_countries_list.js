let router = require('koa-router')();
let Country = require('../../country/model')
let auth = require('../../../middlewares/auth')


/**
 * @api {get} /countries Get Countries List
 * @apiVersion 1.0.0
 * @apiGroup Country
 * @apiName GetCountriesList
 * @apiHeader {String} token user token
 * @apiSampleRequest /countries
 */
router.get('/countries', auth, getCountriesList)

async function getCountriesList(ctx, next){
    let countries = await Country.getList()
    ctx.body = countries
}

module.exports = router