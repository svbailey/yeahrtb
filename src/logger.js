/**
 * Created by mor on 14-7-10.
 */

var log4js = require('log4js');

var logFileConf= {
    "type": "dateFile",
    "filename": "../logs/app.log",
    "pattern": ".yyyy-MM-dd",
    "alwaysIncludePattern": true
};

exports.logger=function(tag){

    log4js.configure({
        appenders: [
            {
                type: "multiprocess",
                mode: "worker",
                appender:logFileConf
            },{
                type:'console'
            }

        ],
        replaceConsole: true
    });
    var log = log4js.getLogger(tag);
    log.setLevel('INFO');

    return log;
};

exports.master_logger=function(tag){

    log4js.configure({
        appenders: [
            {
                type: "multiprocess",
                mode: "master",
                appender:logFileConf
            },{
                type:'console'
            }
        ],
        replaceConsole: true
    });
    var log = log4js.getLogger(tag);
    log.setLevel('INFO');

    return log;
};