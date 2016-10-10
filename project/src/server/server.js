'use strict';

if (process.env.NEW_RELIC_LICENSE_KEY) {
  /* eslint no-unused-vars: 0 */
  /* eslint global-require: 0 */
  const newrelic = require('newrelic');
}
const express = require('express');

const path = require('path');
// const favicon = require('serve-favicon'); // Uncommented until we get an icon. See below.
// const logger = require('morgan'); //Un-uncomment this when you have something to log
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../../config.js');
const request = require('../../lib/request');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger(config.logger));
// Set this parameter considering the no of images and size of each of them (in Base64 format).
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static('public'));

// Healthcheck
app.get('/ping', (req, res) => {
  res.send('pong').status(200).end();
});

app.get('/api*', (req, res) => {
  const url = `http://vimond-rest-api.ha.expo-first.vimondtv.com/${req.originalUrl}`;
  request.get(url, { accept: 'application/json;v=2', headers: {'x-vimond-tenant': 'workshop'}})
  .then(result => {
    res.send(result.body).status(result.statusCode);
  }, error => {
    res.send(result.body).status(result.statusCode);
  });
});


app.get('*', (req, res) => {
  res.render('index', { title: 'Cinema' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// production error handler
// no stacktraces leaked to user
app.use((err, req, res /* , next */) => {
  res.status(err.status || 500).send(err.data);
});



app.set('port', process.env.PORT || config.port);

// app.listen(app.get('port'));
// app.listen(app.get('port'));
require('./socketIo').setup(app.listen(app.get('port')));


console.info(`UiB cinema is running on ${app.get('port')}`);

module.exports = app;
