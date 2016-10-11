'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('../../config.js');
const request = require('../../lib/request');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static('public'));

// Healthcheck
app.get('/ping', (req, res) => {
  res.send('pong').status(200).end();
});

app.get('/api*', (req, res) => {
  const url = `http://vimond-rest-api.ha.expo-first.vimondtv.com/${req.originalUrl}`;
  request.get(url, { accept: 'application/json;v=2', headers: { 'x-vimond-tenant': 'workshop' } })
  .then(result => {
    res.send(result.body).status(result.statusCode);
  }, error => {
    res.send(error).status(error.statusCode || 500);
  });
});

app.get('*', (req, res) => {
  res.render('index', { title: 'Cinema' });
});

app.set('port', process.env.PORT || config.port);

require('./socketIo').setup(app.listen(app.get('port')));

console.info(`UiB cinema is running on ${app.get('port')}`);

module.exports = app;
