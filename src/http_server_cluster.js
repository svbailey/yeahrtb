/**
 * Created by zhangliming on 14-7-12.
 */

var  cluster = require('cluster')
    , numCPUs = require('os').cpus().length
    , mylogger=require('./logger')
    , httpServer = require('./http_server.js');



if (cluster.isMaster) {

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    mylogger.logger('master','master').info('start server.');


} else {

    var logger=mylogger.logger('worker');
    httpServer.http_server(logger).listen(8000);
    logger.info("Worker %d start.", process.pid);
}