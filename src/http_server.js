/**
 * Created by mor on 14-7-10.
 */
var http = require('http');
var url=require('url');


paths={
    'bid':function(req,res,logger){
        //not post
        if(req.method!='POST'){
            res_bid.no_bid(res);
            return;
        }
        //post
        var post='';
        req.on('data',function(chunk){
            post+=chunk;
        });

        req.on('end',function(){
            var bid_data=JSON.parse(post);
            logger.info(bid_data.id);
            var bid_json='hello';
            res_bid.bid(res,bid_json);
        });
    },
    'win':function(req,res,logger){

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

        var pathname = url.parse(req.url).pathname;
        pathname=pathname.split('/')[2];
        logger.info('pathname=>'+pathname);
        try{
            paths[pathname].apply(this, [req, res,logger]);
        }catch(err) {
            res_bid.no_bid(res);
        }

    });
};