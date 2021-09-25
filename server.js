var connect = require('connect');
var http = require('http');
var logger = require('morgan');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

var app = connect()
  .use(logger("combined"))
  .use(bodyParser())
  .use(serveStatic(__dirname))

http.createServer(app).listen(80);
