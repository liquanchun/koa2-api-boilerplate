const router = require('koa-router')();
const Field = require('../../models/field');

/**
 * @api {get} /api/fields Get field List
 * @apiVersion 1.0.0
 * @apiGroup Field
 * @apiName GetFieldList
 * @apiSampleRequest /api/fields
 */
router.get('/api/fields', async (ctx) => {
  ctx.body = { ViewName: 'form_ListField', Data: await Field.getFieldList() };
});

module.exports = router;
