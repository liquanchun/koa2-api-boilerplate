const ExtendableError = require('es6-error');

exports.BadRequest = class BadRequest extends ExtendableError {
  constructor(validationErrors) {
    super('Bad Request');

    let includedKeys = []
    let formattedErrors = []

    for(let i=0; i<validationErrors.length; i++){
      let error = {
        field: Object.keys(validationErrors[i])[0], 
        message: validationErrors[i][Object.keys(validationErrors[i])[0]]
      }

      if(!includedKeys.includes(error.field)){
        formattedErrors.push(error)
      }

      includedKeys.push(error.field)
    }

    this.body = {
        errors: formattedErrors
    };
    this.status = 400
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