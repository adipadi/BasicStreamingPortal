function getMessage(message, response) {
  if (message != null) {
    return message;
  }
  if (response !== null && response.body != null) {
    return response.body;
  }
  return 'An unknown error occurred';
}

function getStatusCode(statusCode, response) {
  if (statusCode != null) {
    return statusCode;
  }
  if (response != null) {
    return response.response.statusCode;
  }
  return 500;
}

function getData (data, message, response) {
  return { error: (response ? response.error : null), message, data };
}

module.exports = function(response, _statusCode, _message, _data) {
  const message = getMessage(_message, response);
  const statusCode = getStatusCode(_statusCode, response);
  const data = getData(_data, message, response);
  const err = new Error(message);
  const displayError = `Error: ${JSON.stringify(err)}`;

  err.status = statusCode;
  err.data = data;
  return displayError;
};
