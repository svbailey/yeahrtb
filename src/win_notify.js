/**
 * Created by zhangliming on 14-7-16.
 * 遵循文档里的格式
 * http://adserver.com/mopub/win/${AUCTION_ID}/${AUCTION_BID_ID}/$
 {AUCTION_IMP_ID}/${AUCTION_SEAT_ID}/${AUCTION_AD_ID}/${AUCTION_PRICE}/0.999
 */



exports.winNotify=function(runtimeObj){
    try{
        var notify=runtimeObj.req.url.split('/');
        var adid=notify[7];
        var price=notify[8];
        runtimeObj.logger.info('adid=>',adid,'price=>',price);

        var keyOfAdid='ad_budget_left_'+adid;
        var multi=runtimeObj.redis.multi();
        multi.get(keyOfAdid,function(err,res){
            runtimeObj.logger.info('decr before =>',res);
        });
        multi.decrby(keyOfAdid,price,function(err,res){
            runtimeObj.logger.info('decr after =>',res);
        });
        multi.exec();


    }catch(err){
        runtimeObj.logger.error('win_notify=>',runtimeObj.req.url,err);
    }finally{
        runtimeObj.logger.info('win_notify=>',runtimeObj.req.url);
        runtimeObj.res.writeHead(200, {'Content-Length':0,
            'Connection': 'keep-alive'});
        runtimeObj.res.end();
    }

};