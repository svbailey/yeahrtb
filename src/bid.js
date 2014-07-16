/**
 * Created by zhangliming on 14-7-16.
 */

var bid_obj = {
    "bidid": "",  //optional to DSP
    "cur": "USD",
    "id": "",
    "seatbid": [
        {
            "seat": "",//optional to DSP, required if using multiple seats
            "bid": [
                {
                    "id": "",
                    "adid": "",
                    "adm": "",
                    "adomain": [""],
                    "attr": [4],
                    "cid": "",
                    "crid": "",
                    "crtype": "Image", //recommended
                    "impid": "1",
                    "iurl": "http://adserver.com/pathtosampleimage.jpg",
                    "nurl": "",
                    "price": 0.999,
                    "ext":  //required for certain request types, not always passed
                    {
                        "data": [
                            {
                                "id": "",
                                "name": "",
                                "segment": [
                                    {
                                        "id": "17"
                                    }
                                ]
                            }
                        ]
                    }
                }
            ] }
    ]
};



exports.bid=function(runtimeObj){
    var bidreq=runtimeObj.bidReqJSON;
    bid_obj.id=bidreq.id;


    runtimeObj.bidResJSON=JSON.stringify(bid_obj);
};