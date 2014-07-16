/**
 * Created by zhangliming on 14-7-12.
 */

var  cluster = require('cluster')
    , numCPUs = require('os').cpus().length
    , log4js=require('./logger')
    , httpServer = require('./http_server.js');



if (cluster.isMaster) {

    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    log4js.logger('master').getLogger('master').info('start server.');

} else {
    var logger=log4js.logger('worker').getLogger('worker');
    httpServer.http_server(logger).listen(8000);
    logger.info("Worker %d start.", process.pid);
}