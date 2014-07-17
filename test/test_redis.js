var redis = require("redis"),
	default_port = 6379,
	default_host = "127.0.0.1",
	client = redis.createClient(default_port,default_host)
	;

client.on("error",function(err){
	console.log("Error " + err);
});


//string

client.set("ad_budget_left_1000", "999");

client.get("ad_budget_left_1000",function (err, replies) {
    console.log("ad_budget_left_1000:" + replies);
    client.quit();
});

client.set("ad_counter_" + ['qwer',1000].join("_"), "3");

client.get("ad_counter_" + ['qwer',1000].join("_"),function (err, replies) {
    console.log("ad_counter_" + ['qwer',1000].join("_") +":" + replies);
    client.quit();
});

client.mget("ad_budget_left_1000","ad_counter_" + ['qwer',1000].join("_"),function (err, replies) {
    console.log("mget 0:" + replies[0]);
    console.log("mget 1:" + replies[1]);
    client.quit();
});


//hash
client.hset("ad_1000", "ad_cpa_bid", "5");
client.hset(["ad_1000", "ad_cpc_bid", "1"],redis.print);


client.hgetall("ad_1000",function(err,data){

	console.log("getAdbid data :" + data);
	console.log("getAdbid ad_cpa_bid :" + data["ad_cpa_bid"]);
	console.log("getAdbid ad_cpc_bid :" + data["ad_cpc_bid"]);

	client.quit();
});


//set 

client.sadd("country_ads_usa", "1000");
client.sadd("country_ads_usa", "1001");
client.sadd("country_ads_usa", "1002");
client.sadd("country_ads_usa", "1003");

client.smembers("country_ads_usa",function(err,data){

	console.log("country_ads_usa data :" + data);
 
	client.quit();
});


client.sadd("category_ads_game", "1000");
client.sadd("category_ads_game", "1001");
client.sadd("category_ads_game", "1004");
client.sadd("category_ads_game", "1005");

client.smembers("category_ads_game",function(err,data){

	console.log("category_ads_game data :" + data);
 
	client.quit();
});


client.sinter("country_ads_usa","category_ads_game",function(err,data){

	console.log("country_ads_usa&category_ads_game data :" + data);
 
	client.quit();
});
 