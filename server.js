var connect = require('connect');
var http = require('http');

var app = connect()
  .use(connect.logger('dev'))
  .use(connect.bodyParser())
  .use( connect.static(__dirname))

http.createServer(app).listen(8080);
