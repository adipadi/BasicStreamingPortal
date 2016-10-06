'use strict';

const socketIo = require('socket.io');

let io;

exports.setup = (http) => {
  io = socketIo.listen(http);

  io.sockets.on('connection', (socket) => {
  });
};

exports.emit = (message, data) => {
  io.emit(message, data);
};
