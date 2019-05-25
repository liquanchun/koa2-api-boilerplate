const ExtendableError = require('es6-error');
const logger = require('./log4');
const user = require('../models/user');

module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err instanceof ExtendableError) {
      ctx.status = err.status;
      ctx.body = err.body;
    } else {
      ctx.status = 500;
      ctx.body = "服务器发生错误。";
      // ctx.body = {
      //   errors: [{
      //     message: err.message,
      //     // stack: err.stack, // remove in production
      //   }],
      // };
      logger.error(err);
    }

    await user.addData('sys_log', {
      method: 'error',
      ip: ctx.request.ip,
      url: ctx.url,
      user: ctx.headers.user,
      msg: JSON.stringify(err),
    });

    ctx.app.emit('error', err, ctx);
  }
};
