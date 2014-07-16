/**
 * Created by zhangliming on 14-7-16.
 * 遵循文档里的格式
 * http://adserver.com/mopub/win/${AUCTION_ID}/${AUCTION_BID_ID}/$
 {AUCTION_IMP_ID}/${AUCTION_SEAT_ID}/${AUCTION_AD_ID}/${AUCTION_PRICE}/0.999
 */

exports.winNotify=function(runtimeObj){
    var notify=runtimeObj.req.url.split('/');
    runtimeObj.logger.info('win_notify=>',notify.slice(3).join(','));
    runtimeObj.res.writeHead(200, {'Content-Length':0,
        'Connection': 'keep-alive'});
    runtimeObj.res.end();
};