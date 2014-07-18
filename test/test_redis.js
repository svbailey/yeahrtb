var redis = require("redis"),
	default_port = 6379,
	default_host = "127.0.0.1",
	client = redis.createClient(default_port,default_host),
	client2 = redis.createClient(default_port,default_host)
	;

client.on("error",function(err){
	console.log("Error " + err);
});

client.flushdb();

var keyPrefixs = {
	ad: "adbid_",
	ad_budget_left: "today_budget_left_",
	ad_counter: "ad_counter_",

	country_ads: "target_country_",
	category_ads: "target_category_",

	performance: "performance_"
};


//string

client.set(keyPrefixs.ad_budget_left + "1000", "999");
client.set(keyPrefixs.ad_budget_left + "1001", "999");

/*client.get(keyPrefixs.ad_budget_left + "1000",function (err, replies) {
    console.log(keyPrefixs.ad_budget_left + "1000:" + replies);
    client.quit();
});
*/

client.set(keyPrefixs.ad_counter + ['qwer',1000].join("_"), "3");

/*client.get(keyPrefixs.ad_counter + ['qwer',1000].join("_"),function (err, replies) {
    console.log(keyPrefixs.ad_counter + ['qwer',1000].join("_") +":" + replies);
    client.quit();
});*/

/*client.mget(keyPrefixs.ad_budget_left + "1000",
	keyPrefixs.ad_counter + ['qwer', 1000].join("_"),
	function(err, replies) {
		console.log("mget 0:" + replies[0]);
		console.log("mget 1:" + replies[1]);
		client.quit();
	});
*/


//cpa,cpc,counter
client.set(keyPrefixs.ad + "1000", "5|1|3");

client.set(keyPrefixs.ad + "1001", "4|2|10");



/*client.hgetall(keyPrefixs.ad + "1000",function(err,data){

	console.log("getAdbid data :" + data);
	console.log("getAdbid ad_cpa_bid :" + data["cpa"]);
	console.log("getAdbid ad_cpc_bid :" + data["cpc"]);

	client.quit();
});
*/

//set 

client.sadd(keyPrefixs.country_ads + "usa", "1000");
client.sadd(keyPrefixs.country_ads + "usa", "1001");
client.sadd(keyPrefixs.country_ads + "usa", "1002");
client.sadd(keyPrefixs.country_ads + "usa", "1003");

/*client.smembers(keyPrefixs.country_ads  + "usa",function(err,data){

	console.log("country_ads_usa data :" + data);
 
	client.quit();
});
*/

client.sadd(keyPrefixs.category_ads + "game", "1000");
client.sadd(keyPrefixs.category_ads + "game", "1001");
client.sadd(keyPrefixs.category_ads + "game", "1004");
client.sadd(keyPrefixs.category_ads + "game", "1005");

/*client.smembers(keyPrefixs.category_ads  + "game",function(err,data){

	console.log("category_ads_game data :" + data);
 
	client.quit();
});


client.sinter(
	keyPrefixs.country_ads + "usa",
	keyPrefixs.category_ads + "game",
	function(err, data) {

		console.log("country_ads_usa&category_ads_game data :" + data);

		client.quit();
	});*/




//multi

 // keyPrefixs.ad_budget_left)	 
/*client.multi()
	.sinter(
		keyPrefixs.country_ads + "usa",
		keyPrefixs.category_ads + "game",
		function(err, data) {
			var budgetlefts=[];
			for(var i =0;i<data.length;i++){
 budgetlefts[budgetlefts.length]=keyPrefixs.ad_budget_left +data[i];
			}
console.log(budgetlefts);
			client.get("today_budget_left_1000",function (err,replies) {
				
				console.log(replies);
			})
		




		}
		).exec();*/




