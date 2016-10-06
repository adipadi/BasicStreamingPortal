const _ = require('lodash');
const validate = require('validate.js');
const ErrorModel = require('./error-model');
const moment = require('moment');

validate.extend(validate.validators.datetime, {
  parse: (value, options) => (
    +moment.utc(value)
  ),
  format: (value, options) => {
    const format = options.dateOnly ? 'YYYY-MM-DD' : 'YYYY-MM-DD hh:mm:ss';
    return moment.utc(value).format(format);
  }
});
module.exports = {

  // {
  //   user: {
  //     target: {name: 'asd', phone: 'xyz'},
  //     constraints: [Login, UserProfile]
  //   }
  //   company: {
  //     target: Object,
  //     constraints: []
  //   }
  // }


  // response:
  // errors:{
  //   user: {
  //     errors: {name: 'name is to short', phone: 'phone is not valid'},
  //     length: 2
  //   },
  //   company: {
  //     ...
  //   }
  // }

  validateAll(validationDescriptor) {
    const allErrors = new ErrorModel();

    const keys = Object.keys(validationDescriptor);

    _.each(keys, (key) => {
      const target = validationDescriptor[key].target;
      const constraints = validationDescriptor[key].constraints;
      const errors = this.validate(target, constraints);
      if (errors.length() > 0) {
        allErrors[key] = _.assign({}, allErrors[key], errors);
      }
    });

    return allErrors;
  },


  validate(object, constraints, options) {
    let allErrors = new ErrorModel();
    if (Array.isArray(constraints)) {
      _.each(constraints, (constraint) => {
        const errors = this.doValidate(object, constraint, options);
        if (errors.length() > 0) {
          allErrors = _.assign({}, allErrors, errors);
        }
      });
    } else {
      const errors = this.doValidate(object, constraints, options);
      if (errors.length() > 0) {
        allErrors = _.assign({}, allErrors, errors);
      }
    }

    return allErrors;
  },

  validateList(list, constraints, identifier, options) {
    const result = [];
    _.each(list, (item) => {
      const nextValidated = { errors: this.validate(item, constraints, options) };
      nextValidated[identifier] = item[identifier];
      result.push(nextValidated);
    });
    return result;
  },

  doValidate(object, constraints, options) {
    let validConstraints = constraints;
    if (options && options.ignore) {
      validConstraints = _.omit(constraints, options.ignore);
    } else if (options && options.only) {
      validConstraints = _.pick(constraints, options.only);
    }
    const errors = validate(object, validConstraints);

    const errorObj = new ErrorModel();
    if (errors) {
      _.each(Object.keys(errors), (key) => {
        errorObj[key] = {};
        errorObj[key].message = errors[key][0];
        errorObj[key].errors = errors[key];
      });
    }

    // errorObj.length = function() {
    //   return Object.keys(this).length - 1;
    // }
    return errorObj;
  }

};
