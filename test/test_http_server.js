/**
 * Created by zhangliming on 14-7-16.
 */

var httpServer = require('../src/http_server.js');
var mylogger=require('../src/logger');

var logger=mylogger.logger('worker','master');
httpServer.http_server(logger).listen(8000);