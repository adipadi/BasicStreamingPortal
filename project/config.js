'use strict';

/**
* Global configuration file for vimond-cms.
*
* This file will read known environemnt variables and add them as properties on
* the returned object.
*
* To add a new configuration, add the property to the object and assign it by
* calling `env('MY_ENV_VAR')`.
*
* The `env()` method takes two additional arguments:
*
* * defaultValue: If the environment variable isn't found, use this.
* * parseEnv: (boolean) parse the environemnt variable as JSON.
*
* A note on required environemnt variables:
*
* If a variable is required, set the default value to either `undefined` or an
* empty string.
*
* If the variable is not required and you don't want to provide a default value,
* set the default value to `null`.
*/
const process = require('process');

function isValid(value) {
  return value !== undefined && value !== '';
}

function byKey(key) {
  const value = process.env[key];
  if (value !== undefined && value !== '') {
    return value;
  }
  return undefined;
}

function env(key, defaultValue, parseEnv) {
  let envConfig = byKey(key);
  if (parseEnv && envConfig) {
    envConfig = envConfig.replace(/'/g, '"');
    envConfig = JSON.parse(envConfig);
  }
  const value = envConfig || defaultValue;

  if (!isValid(value)
    && !(process.env.NODE_ENV === 'development'
      || process.env.NODE_ENV === 'test'
      || process.env.NODE_ENV === 'migrate')) {
    console.error(`The configuration key '${key}' is missing!`);
    console.error('Please set it as an environment variable and restart.');
    process.exit(-1);
  }

  return value;
}

module.exports = {
  environment: process.env.NODE_ENV || 'development',
  vimondCMSExternal: env('CMS_VIMOND_CMS_URL_EXTERNAL', 'http://vimond-cms.ha.dev.vops.io/'),
  port: env('CMS_PORT', 10014),
  api: env('CMS_API_URL', 'https://vimond-rest-api.ha.dev.vops.io/api/'),
};
