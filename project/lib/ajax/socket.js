

const emit = (io, message, data) => {
  const promise = new Promise((resolve, reject) => {
    io.emit(message, data, (response) => {
      if (typeof response === 'object') {
        resolve({ data: response });
      } else {
        reject({ error: response });
      }
    });
  });
  return promise;
};


module.exports = {
  emit
};
