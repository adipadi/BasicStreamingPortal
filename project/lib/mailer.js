const Promise = require('promise');
const config = require('../config');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const logger = require('./logger');
const _ = require('underscore');
const emailTemplates = require('./templates/email');

// setup e-mail data with unicode symbols
const transporter = nodemailer.createTransport(smtpTransport({
  host: config.postmaster.host,
  port: config.postmaster.port,
  auth: {
    user: config.postmaster.auth.user,
    pass: config.postmaster.auth.pass
  }
}));


const replaceTemplateVars = function(string, values) {
  let newString = string;
  _.each(Object.keys(values), (key) => {
    /* eslint-disable prefer-template */
    while (newString.indexOf('${' + key + '}') > 0) {
      newString = newString.replace('${' + key + '}', values[key]);
    }
  });
  return newString;
};


exports.sendMail = function(recipients, template, values) {
  const mailOptions = {
    from: config.postmaster.from.asString(),
    to: recipients, // list of receivers
    subject: replaceTemplateVars(template.subject, values),
    text: replaceTemplateVars(template.text, values),
    html: replaceTemplateVars(template.html, values)
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error('Unable to send email', error, mailOptions);
        reject({ error, message: 'Unable to send email' });
      } else {
        resolve({ message: 'Email successfully sent.' });
      }
    });
  });
};


exports.sendConfirmationMail = function(recipients, values) {
  const valuesToSend = Object.assign({}, values, { author: config.emailAuthor || 'Vimond' });
  const template = config.emailTemplate
    ? emailTemplates[config.emailTemplate][config.language].emailConfirmation
    : emailTemplates['default'][config.language].emailConfirmation;

  return this.sendMail(recipients, template, valuesToSend);
};


exports.sendPasswordResetMail = function(recipients, values) {
  const valuesToSend = Object.assign({}, values, { author: config.emailAuthor || 'Vimond' });
  const template = config.emailTemplate
    ? emailTemplates[config.emailTemplate][config.language].passwordReset
    : emailTemplates['default'][config.language].passwordReset;

  return this.sendMail(recipients, template, valuesToSend);
};
