/**
 * Created by mor on 14-7-10.
 */
var http = require('http');
var logger = require('./logger').logger('http_server');


http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    logger.info("hello");
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');