const router = require("koa-router")();
const Dbview = require("../../models/dbview");
const _ = require("lodash");
/**
 * @api {post} /api/data/:view_name Add data
 * @apiVersion 1.0.0
 * @apiName DataBase
 * @apiGroup DataBase
 * @apiSampleRequest /api/data/:view_name
 */
router.post("/api/partscombo", async ctx => {
  ctx.checkParams("view_name").notEmpty("view_name is required");
  const ids = ctx.request.body.selectedPartsIds;
  delete ctx.request.body.selectedPartsIds;
  if(ctx.request.body.partslinkid){
    delete ctx.request.body.partslinkid;
  }
  if(ctx.request.body.partslistno){
    delete ctx.request.body.partslistno;
  }
  if(ctx.request.body.partslistname){
    delete ctx.request.body.partslistname;
  }
  if(ctx.request.body.partslistid){
    delete ctx.request.body.partslistid;
  }
  if (!ctx.request.body.Id) {
    const result = await Dbview.addData("set_parts_combo", ctx.request.body);

    let idsArr = _.split(ids, ",");
    for (let i = 0; i < idsArr.length; i++) {
      await Dbview.addData("set_parts_link", { parts_combo_id: result[0], parts_id: idsArr[i] });
    }
    ctx.body = result;
  } else {
    const oldData = await Dbview.firstData("set_parts_combo", ctx.request.body.Id);
    if (!oldData) {
      const result = await Dbview.addData("set_parts_combo", ctx.request.body);
      let idsArr = _.split(ids, ",");
      for (let i = 0; i < idsArr.length; i++) {
        await Dbview.addData("set_parts_link", { parts_combo_id: result[0], parts_id: idsArr[i] });
      }
      ctx.body = result;
    } else {
      const result = await Dbview.updateData("set_parts_combo", ctx.request.body);

      await Dbview.deletePartsData(ctx.request.body.Id);
      let idsArr = _.split(ids, ",");
      for (let i = 0; i < idsArr.length; i++) {
        await Dbview.addData("set_parts_link", { parts_combo_id: ctx.request.body.Id, parts_id: idsArr[i] });
      }
      ctx.body = result;
    }
  }
});

/**
 * @api {post} /api/data/:view_name Add data
 * @apiVersion 1.0.0
 * @apiName DataBase
 * @apiGroup DataBase
 * @apiSampleRequest /api/data/:view_name
 */
router.post("/api/data/:view_name", async ctx => {
  ctx.checkParams("view_name").notEmpty("view_name is required");

  if (!ctx.request.body.Id) {
    ctx.body = await Dbview.addData(ctx.params.view_name, ctx.request.body);
  } else {
    const oldData = await Dbview.firstData(ctx.params.view_name, ctx.request.body.Id);
    if (!oldData) {
      ctx.body = await Dbview.addData(ctx.params.view_name, ctx.request.body);
    } else {
      ctx.body = await Dbview.updateData(ctx.params.view_name, ctx.request.body);
    }
  }
});

/**
 * @api {post} /api/delete/:view_name Delete Data
 * @apiVersion 1.0.0
 * @apiName DeleteData
 * @apiGroup DataBase
 * @apiParam {Int{11}} Id 主键Id
 * @apiSampleRequest /api/delete/:view_name
 */
router.post("/api/delete/:view_name/:id", async ctx => {
  ctx.checkParams("view_name").notEmpty("view_name is required");
  ctx.checkParams("id").notEmpty("id is required");
  ctx.body = await Dbview.deleteData(ctx.params.view_name, ctx.params.id);
});

/**
 * @api {delete} /api/delete/:view_name Delete Data
 * @apiVersion 1.0.0
 * @apiName DeleteData
 * @apiGroup DataBase
 * @apiParam {Int{11}} Id 主键Id
 * @apiSampleRequest /api/delete/:view_name
 */
router.del("/api/delete/:view_name/:id", async ctx => {
  ctx.checkParams("view_name").notEmpty("view_name is required");
  ctx.checkParams("id").notEmpty("id is required");
  ctx.body = await Dbview.deleteData(ctx.params.view_name, ctx.params.id);
});

/**
 * @api {delete} /api/delete2/:view_name Delete2 Data
 * @apiVersion 1.0.0
 * @apiName Delete2 Data
 * @apiGroup DataBase
 * @apiParam {Int{11}} Id 主键Id
 * @apiSampleRequest /api/delete2/:view_name
 */
router.del("/api/delete2/:view_name/:id", async ctx => {
  ctx.checkParams("view_name").notEmpty("view_name is required");
  ctx.checkParams("id").notEmpty("id is required");
  ctx.body = await Dbview.delete2Data(ctx.params.view_name, ctx.params.id);
});
/**
 * @api {delete} /api/deleteser/:view_name Delete2 Data
 * @apiVersion 1.0.0
 * @apiName Delete2 Data
 * @apiGroup DataBase
 * @apiParam {Int{11}} Id 主键Id
 * @apiSampleRequest /api/deleteser/:view_name
 */
router.del("/api/deleteser/:view_name/:id", async ctx => {
  ctx.checkParams("view_name").notEmpty("view_name is required");
  ctx.checkParams("id").notEmpty("id is required");
  ctx.body = await Dbview.deleteser(ctx.params.view_name, ctx.params.id);
});

/**
 * @api {post} /api/data/:view_name Add data
 * @apiVersion 1.0.0
 * @apiName DataBase
 * @apiGroup DataBase
 * @apiSampleRequest /api/data/:view_name
 */
router.post("/api/dataarray/:view_name", async ctx => {
  ctx.checkParams("view_name").notEmpty("view_name is required");
  ctx.body = await Dbview.addDataArr(ctx.params.view_name, ctx.request.body);
});

module.exports = router;
