/**
 * Created by zhangliming on 14-7-16.
 */
var constants = require('./constants.js');

var bid_obj = {
    "id": "",
    "seatbid": [{
        "bid": [{
            "iurl":constants.cdn.host+'/logo.gif' ,//cdn地址
            "cid": "afhjk234",//广告id
            "crid": "ajfwep420",//创意id
            "price": 24.0,
            "adid": "adfo3btnt",//广告id
            "adomain": "http://www.mopubbidder.com",//广告主的域名
            "adm": "",//
            "impid": "eigu203f",//
            "nurl":constants.host+'/mopub/win/${AUCTION_ID}/${AUCTION_BID_ID}/${AUCTION_IMP_ID}/${AUCTION_SEAT_ID}/${AUCTION_AD_ID}/${AUCTION_PRICE}/'

        }]
    }],
    "cur": "USD"
};



exports.bid=function(runtimeObj){
    var bidreq=runtimeObj.bidReqJSON;
    bid_obj.id=bidreq.id;




    runtimeObj.bidResJSON=JSON.stringify(bid_obj);
};