const headers = require('./headers');

const errorHandler = (res, message) => {
  res.writeHead('404', headers);
  res.write(
    JSON.stringify({
      status: 'false',
      message: message,
    })
  );
  res.end();
};

module.exports = errorHandler;
