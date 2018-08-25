const router = require('koa-router')();
const Dbview = require('../../models/dbview');

/**
 * @api {get} /api/data/:view_name Get Data List
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetDataList
 * @apiSampleRequest /api/data/:view_name
 */
router.get('/api/data/:view_name', async (ctx) => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.getDataList(ctx.params.view_name),
  };
});

module.exports = router;
