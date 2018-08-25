const router = require('koa-router')();
const Field = require('../../models/field');

/**
 * @api {post} /api/fieldrole Add field role
 * @apiVersion 1.0.0
 * @apiName AddFieldRole
 * @apiGroup Field
 * @apiParam {Int{11}} FieldId 表单字段Id
 * @apiParam {Int{11}} RoleId 角色Id
 * @apiParam {String{1,50}} CanRead 是否可见
 * @apiParam {String{1,50}} CanUpdate 是否可修改
 * @apiSampleRequest /api/fieldrole
 */
router.post('/api/fieldrole', async (ctx) => {
  if (ctx.request.body.FieldIds && ctx.request.body.RoleIds) {
    const fids = ctx.request.body.FieldIds.split(',');
    const rids = ctx.request.body.RoleIds.split(',');
    const canread = ctx.request.body.RoleIds.CanRead == true ? 1 : 0;
    const canupdate = ctx.request.body.RoleIds.CanUpdate == true ? 1 : 0;

    const fieldRoleArr = [];

    for (let i = 0; i < fids.length; i++) {
      for (let j = 0; j < rids.length; j++) {
        fieldRoleArr.push({
          FieldId: fids[i],
          RoleId: rids[j],
          CanRead: canread,
          CanUpdate: canupdate,
        });
      }
    }

    fieldRoleArr.forEach((e) => {
      console.log(e);
    });

    // const oldField = await Field.firstFieldRole({
    //   FieldId: fieldRoleArr[0].FieldId,
    //   RoleId: fieldRoleArr[0].RoleId,
    // });
    // if (!oldField) {
    //   ctx.body = await Field.addFieldRole(ctx.request.body);
    // } else {
    //   ctx.body = await Field.updateFieldRole(ctx.request.body);
    // }

  }

});

module.exports = router;
