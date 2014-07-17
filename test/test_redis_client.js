var redis_client = require('../src/redis.js');

redis_client.getAdbid("1000",function(err,data){
	console.log("getAdbid data :" + data);
	console.log("getAdbid ad_cpa_bid :" + data["ad_cpa_bid"]);
	console.log("getAdbid ad_cpc_bid :" + data["ad_cpc_bid"]);
});

redis_client.getAdbudgetLeft("1000",function(err,data){
	console.log("getAdbudgetLeft data :" + data); 
});

redis_client.getAdcounter("qwer","1000",function(err,data){
	console.log("getAdcounter data :" + data); 
});

redis_client.getCountryads("usa",function(err,data){
	console.log("getCountryads data :" + data); 
});