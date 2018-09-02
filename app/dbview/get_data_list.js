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

/**
 * @api {post} /api/datalist/:view_name get data list
 * @apiVersion 1.0.0
 * @apiName DataBase
 * @apiGroup DataBase
 * @apiParam {String{1,50}} OrderId 订单Id
 * @apiParam {String{1,50}} Status 状态
 * @apiSampleRequest /api/datalist/:view_name
 */
router.post('/api/datalist/:view_name', async (ctx) => {
  ctx.checkParams('view_name').notEmpty('view_name is required');

  console.log(ctx.request.body);
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.getDataList(ctx.params.view_name),
  };
});

/**
 * @api {get} /api/data/:view_name/:keyname/:keyvalue Get Data List by ID
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetDataListById
 * @apiSampleRequest /api/data/:view_name/:keyname/:keyvalue
 */
router.get('/api/data/:view_name/:keyname/:keyvalue', async (ctx) => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  ctx.checkParams('keyname').notEmpty('keyname is required');
  ctx.checkParams('keyvalue').notEmpty('keyvalue is required');
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.getDataListById(ctx.params.view_name, ctx.params.keyname, ctx.params.keyvalue),
  };
});

/**
 * @api {get} /api/data/:view_name/:keyvalue Get Data by ID
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetDataById
 * @apiSampleRequest /api/data/:view_name/:keyvalue
 */
router.get('/api/data/:view_name/:keyvalue', async (ctx) => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  ctx.checkParams('keyvalue').notEmpty('keyvalue is required');
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.getDataById(ctx.params.view_name, ctx.params.keyvalue),
  };
});

module.exports = router;
