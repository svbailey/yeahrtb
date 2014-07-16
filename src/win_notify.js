/**
 * Created by zhangliming on 14-7-16.
 * 遵循文档里的格式
 * http://adserver.com/mopub/win/${AUCTION_ID}/${AUCTION_BID_ID}/$
 {AUCTION_IMP_ID}/${AUCTION_SEAT_ID}/${AUCTION_AD_ID}/${AUCTION_PRICE}/0.999
 */


exports.winNotify=function(req,res,logger){
    logger.category='win_notify';
    var notify=req.url.split('/');
    logger.info(notify.slice(3));
    res.writeHead(200, {'Content-Length':0,
        'Connection': 'keep-alive'});
    res.end();

};