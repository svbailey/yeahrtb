/**
 * Created by mor on 14-7-10.
 */
var http = require('http');
var runtime= require('./runtime.js');
var bid=require('./bid.js');
var winNotify=require('./win_notify.js');



paths={
    'bid':function(runtimeObj){
        //not post
        if(runtimeObj.req.method!='POST'){
            res_bid.no_bid(runtimeObj.res);
            return;
        }
        //post
        var post='';
        runtimeObj.req.on('data',function(chunk){
            post+=chunk;
        });

        runtimeObj.req.on('end',function(){
            runtimeObj.bidReqJSON=JSON.parse(post);
            bid.bid(runtimeObj);
            res_bid.bid(runtimeObj.res,runtimeObj.bidResJSON);
        });
    },
    'win':function(runtimeObj){
        winNotify.winNotify(runtimeObj);
    }

};


res_bid={
    //出价的时候的http信息返回
    'bid':function(res,content){
    res.writeHead(200, {'Content-Type': 'application/json',
        'Content-Length':content.length,
        'Connection': 'keep-alive'});

    res.end(content);
    },
    //不出价的时候的http信息返回
    'no_bid':function(res){
        res.writeHead(204, {'Content-Length':0,
            'Connection': 'keep-alive'});
        res.end();
    }
};


exports.http_server = function(logger){
    return http.createServer(function (req, res) {


        var pathname=req.url.split('/')[2];
        logger.info('pathname=>'+pathname);

        var runtimeObj=new runtime();
        runtimeObj.logger=logger;
        runtimeObj.req=req;
        runtimeObj.res=res;

        try{
            paths[pathname].apply(this, [runtimeObj]);
        }catch(err) {
            res_bid.no_bid(res);
        }

    });
};