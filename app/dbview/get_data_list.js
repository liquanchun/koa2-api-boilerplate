const router = require('koa-router')();
const Dbview = require('../../models/dbview');
const _ = require('lodash');
/**
 * @api {get} /api/data/:view_name Get Data List
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetDataList
 * @apiSampleRequest /api/data/:view_name
 */
router.get('/api/data/:view_name', async ctx => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.getDataList(ctx.params.view_name)
  };
});

/**
 * @api {post} /api/datalist/:view_name get data list
 * @apiVersion 1.0.0
 * @apiName DataBase
 * @apiGroup DataBase
 * @apiParam {String{1,50}} InDate-1 入库起始日期
 * @apiParam {String{1,50}} InDate-2 入库截止日期
 * @apiParam {String{1,50}} Status 状态
 * @apiSampleRequest /api/datalist/:view_name
 */
router.post('/api/datalist/:view_name', async ctx => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  const keys = _.keys(ctx.request.body);
  const keyword = [];
  const keysql = [];
  const values = [];
  let Vinno = '';
  let CarTypeCode = '';
  let CustName = '';
  let dipan = '';
  keys.forEach(k => {
    if (k == '19_新车信息_底盘号') {
      dipan = ctx.request.body[k];
    } else if (k == 'Vinno') {
      Vinno = ctx.request.body[k];
    } else if (k == 'CarTypeCode') {
      CarTypeCode = ctx.request.body[k];
    } else if (k == 'CustName') {
      CustName = ctx.request.body[k];
    } else if (ctx.request.body[k] != null && ctx.request.body[k] != '') {
      if (k.includes('-1') || k.includes('-2') || k.includes('_1') || k.includes('_2')) {
        const kw = `\`${k
          .replace(/-1/, '')
          .replace(/-2/, '')
          .replace(/_1/, '')
          .replace(/_2/, '')}\``;
        if (keyword.includes(kw)) {
          keysql.push(`${kw} <= ?`);
        } else {
          keysql.push(`${kw} >= ?`);
        }
        keyword.push(kw);
      } else {
        keyword.push(k);
        keysql.push(`${k} = ?`);
      }
      values.push(ctx.request.body[k]);
    }
  });
  const raw = _.join(keysql, ' and ');

  if (dipan) {
    ctx.body = {
      ViewName: ctx.params.view_name,
      Data: await Dbview.getDataListByWhereDipan(ctx.params.view_name, raw, values, dipan)
    };
  } else if (Vinno) {
    ctx.body = {
      ViewName: ctx.params.view_name,
      Data: await Dbview.getDataListByWhereVinno(ctx.params.view_name, raw, values, Vinno)
    };
  } else if (CarTypeCode) {
    ctx.body = {
      ViewName: ctx.params.view_name,
      Data: await Dbview.getDataListByWhereType(ctx.params.view_name, raw, values, CarTypeCode)
    };
  } else if (CustName) {
    ctx.body = {
      ViewName: ctx.params.view_name,
      Data: await Dbview.getDataListByWhereCustName(ctx.params.view_name, raw, values, CustName)
    };
  } else {
    let dataList = [];
    if (ctx.params.view_name == 'vw_car_salebook') {
      dataList = await Dbview.getDataListByWhereLimit(ctx.params.view_name, raw, values);
    } else {
      dataList = await Dbview.getDataListByWhere(ctx.params.view_name, raw, values);
    }
    ctx.body = {
      ViewName: ctx.params.view_name,
      Data: dataList
    };
  }
});

/**
 *
 */
router.post('/api/sp/:sp_name', async ctx => {
  const values = _.values(ctx.request.body);
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.callsp(ctx.params.sp_name, values)
  };
});
/**
 * @api {get} /api/data/:view_name/:keyname/:keyvalue Get Data List by ID
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetDataListById
 * @apiSampleRequest /api/data/:view_name/:keyname/:keyvalue
 */
router.get('/api/data/:view_name/:keyname/:keyvalue', async ctx => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  ctx.checkParams('keyname').notEmpty('keyname is required');
  ctx.checkParams('keyvalue').notEmpty('keyvalue is required');
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.getDataListById(ctx.params.view_name, ctx.params.keyname, ctx.params.keyvalue)
  };
});

/**
 * @api {get} /api/data/:view_name/:keyvalue Get Data by ID
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetDataById
 * @apiSampleRequest /api/data/:view_name/:keyvalue
 */
router.get('/api/data/:view_name/:keyvalue', async ctx => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  ctx.checkParams('keyvalue').notEmpty('keyvalue is required');
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: await Dbview.getDataById(ctx.params.view_name, ctx.params.keyvalue)
  };
});

/**
 * @api {get} /api/datacount/:view_name Get Data count
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetDataCount
 * @apiSampleRequest /api/datacount/:view_name
 */
router.get('/api/datacount/:view_name', async ctx => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  const datacnt = await Dbview.dataCount(ctx.params.view_name);
  console.log(datacnt[0].a);
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: datacnt[0].a
  };
});

/**
 * @api {get} /api/maxid/:view_name Get Data count
 * @apiVersion 1.0.0
 * @apiGroup DataBase
 * @apiName GetMaxid
 * @apiSampleRequest /api/maxid/:view_name
 */
router.get('/api/maxid/:view_name', async ctx => {
  ctx.checkParams('view_name').notEmpty('view_name is required');
  const datacnt = await Dbview.maxid(ctx.params.view_name);
  ctx.body = {
    ViewName: ctx.params.view_name,
    Data: datacnt[0].a
  };
});

module.exports = router;
