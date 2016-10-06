const winston = require('winston');
const config = require('../config');

const loggerConfig = {
  transports: [
    new (winston.transports.Console)({
      json: config.environment === 'production',
      colorize: config.environment !== 'production',
      stringify: true
    })
  ],
  level: config.logger.level
};

const logger = new (winston.Logger)(loggerConfig);
logger.config = loggerConfig;
module.exports = logger;
