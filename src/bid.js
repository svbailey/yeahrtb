/**
 * Created by zhangliming on 14-7-16.
 */

var bid_obj = {"units": 0, "id": "", "seatbid": [
    {
        "bid": [
            {
                "iurl": "http://www.mopubbidderimageurl.com",
                "cid": "afhjk234",
                "crid": "ajfwep420",
                "price": 24.0,
                "adid": "adfo3btnt",
                "adomain": "http://www.mopubbidder.com",
                "adm": "<html><b>hiii</b></html>",
                "impid": "eigu203f"
            }
        ]
    }
], "cur": "USD", "bidid": "dv09gn3k"}



exports.bid=function(runtimeObj){
    var bidreq=runtimeObj.bidReqJSON;
    bid_obj.id=bidreq.id;


    runtimeObj.bidResJSON=JSON.stringify(bid_obj);
};