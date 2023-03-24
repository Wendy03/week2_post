const headers = require('../service/headers');

const http = {
  cors(res, req) {
    res.writeHead('200', headers);
    res.end();
  },
  notFound(res, req) {
    res.writeHead('404', headers);
    res.write(
      JSON.stringify({
        status: 'false',
        message: '無此網站路由',
      })
    );
    res.end();
  },
};

module.exports = http;
