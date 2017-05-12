const error = require('./error')
const ExtendableError = require('es6-error');

module.exports = async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        if(err instanceof ExtendableError){
            ctx.status = err.status
            ctx.body = err.body
        }
        else{
            ctx.status = 500;
            ctx.body = err.stack;  // For production replace with 'Internal Server Error'
        }
        ctx.app.emit('error', err, ctx);
    }
}