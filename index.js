const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const errorHandler = require('./libraries/error_handler');
const cors = require('koa-cors');
const config = require('./env');

const logger = require('./libraries/log4');
const user = require('./models/user');

const app = new Koa();

// enable cors
app.use(cors());

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  logger.info(`${ctx.method} ${ctx.request.ip} ${ctx.url} - ${ms}ms`);
  if (ctx.request.body) {
    logger.info(`request body:${JSON.stringify(ctx.request.body)}`);
  }
  await user.addData('sys_log', {
    method: ctx.method,
    ip: ctx.request.ip,
    url: ctx.url,
    user: ctx.headers.user,
    msg: JSON.stringify(ctx.request.body),
  });
});

// static files
app.use(require('koa-static')('./public'));

// request parameters parser
app.use(require('koa-body')({
  formidable: {
    uploadDir: `${__dirname}/public/uploads`, // This is where the files will be uploaded
    keepExtensions: true,
  },
  multipart: true,
  urlencoded: true,
}));

// error handler
app.use(errorHandler);

// validator
require('koa-validate')(app);

// set routes
fs.readdirSync('./app').filter(file => fs.statSync(path.join('./app', file)).isDirectory()).map((moduleName) => {
  fs.readdirSync(`./app/${moduleName}`).filter(file => fs.statSync(path.join(`./app/${moduleName}`, file)).isFile()).map((route) => {
    app.use(require(`./app/${moduleName}/${route}`).routes());
  });
});

app.listen(config.server.port, () => {
  console.log(`API listening on port ${config.server.port}`)
});
