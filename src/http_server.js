/**
 * Created by mor on 14-7-10.
 */
var http = require('http');
var url=require('url');


exports.http_server = function(){
    return http.createServer(function (req, res) {

        var pathname = url.parse(req.url).pathname;
        console.log('pathname='+pathname);
        //只处理post的请求
        if(req.method=='POST'){
            var post='';
            req.on('data',function(chunk){
                post+=chunk;
            });

            req.on('end',function(){
                var bid_data=JSON.parse(post);
                console.log(bid_data.id);
                var bid_json='hello';
                bid(res,bid_json);
            });

        }else if(req.method=='GET'){



        }
        else{
            no_bid(res);
        }

    });
};


//出价的时候的http信息返回
function bid(res,content){
    res.writeHead(200, {'Content-Type': 'application/json',
        'Content-Length':content.length,
        'Connection': 'keep-alive'});

    res.end(content);
}
//不出价的时候的http信息返回
function no_bid(res){
    res.writeHead(204, {'Content-Length':0,
        'Connection': 'keep-alive'});
    res.end();
}

