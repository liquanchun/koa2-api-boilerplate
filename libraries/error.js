const ExtendableError = require('es6-error');

exports.BadRequest = class BadRequest extends ExtendableError {
    constructor(validationErrors) {
        super('Bad Request');
        this.body = {
            errors: validationErrors,
        }
        this.status = 500
    }
}

exports.Unauthorized = class Unauthorized extends ExtendableError{
    constructor(message) {
        super(message)
        this.body = {
            errors: [{
                message: message
            }]
        }
        this.status = 403
    }
}

exports.ModelError = class ModelError extends ExtendableError {
    constructor(message) {
        super('Internal Server Error')
        this.body = {
            errors: [{
                message: message,
                stack: this.stack
            }]
        }
        this.status = 500
    }
}