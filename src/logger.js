/**
 * Created by mor on 14-7-10.
 */

var log4js = require('log4js');

exports.logger=function(appenderType){

    appenderType=appenderType||'worker';

    log4js.configure({
        appenders:[
            {
                type: 'multiprocess',
                mode: appenderType,
                appender:{
                    "type": "dateFile",
                    "filename": "../logs/app.log",
                    "pattern": ".yyyy-MM-dd",
                    "alwaysIncludePattern": true
                }

            },{
                type:'console'
            }

        ],
        replaceConsole: true
    });
    log4js.setGlobalLogLevel('INFO');
    return log4js;
};