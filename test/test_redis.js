
var redis = require("redis"),
	constants = require('../src/constants.js'),
	default_port = constants.redis.port,
	default_host = constants.redis.host,
	client = redis.createClient(default_port,default_host)
	;

client.on("error",function(err){
	console.log("Error " + err);
});

//client.flushdb();



//string

client.set(constants.redis.keyPrefixs.ad_budget_left + "1000", "999");
client.set(constants.redis.keyPrefixs.ad_budget_left + "1001", "999");

/*client.get(constants.redis.keyPrefixs.ad_budget_left + "1000",function (err, replies) {
    console.log(constants.redis.keyPrefixs.ad_budget_left + "1000:" + replies);
    client.quit();
});
*/

client.set(constants.redis.keyPrefixs.ad_counter + ['qwer',1000].join("_"), "3");

/*client.get(constants.redis.keyPrefixs.ad_counter + ['qwer',1000].join("_"),function (err, replies) {
    console.log(constants.redis.keyPrefixs.ad_counter + ['qwer',1000].join("_") +":" + replies);
    client.quit();
});*/

/*client.mget(constants.redis.keyPrefixs.ad_budget_left + "1000",
	constants.redis.keyPrefixs.ad_counter + ['qwer', 1000].join("_"),
	function(err, replies) {
		console.log("mget 0:" + replies[0]);
		console.log("mget 1:" + replies[1]);
		client.quit();
	});
*/


//cpa,cpc,counter
client.set(constants.redis.keyPrefixs.ad + "1000", "5|1|3");

client.set(constants.redis.keyPrefixs.ad + "1001", "4|2|10");



/*client.hgetall(constants.redis.keyPrefixs.ad + "1000",function(err,data){

	console.log("getAdbid data :" + data);
	console.log("getAdbid ad_cpa_bid :" + data["cpa"]);
	console.log("getAdbid ad_cpc_bid :" + data["cpc"]);

	client.quit();
});
*/

//set 

client.sadd(constants.redis.keyPrefixs.country_ads + "usa", "1000");
client.sadd(constants.redis.keyPrefixs.country_ads + "usa", "1001");
client.sadd(constants.redis.keyPrefixs.country_ads + "usa", "1002");
client.sadd(constants.redis.keyPrefixs.country_ads + "usa", "1003");

/*client.smembers(constants.redis.keyPrefixs.country_ads  + "usa",function(err,data){

	console.log("country_ads_usa data :" + data);
 
	client.quit();
});
*/

client.sadd(constants.redis.keyPrefixs.category_ads + "game", "1000");
client.sadd(constants.redis.keyPrefixs.category_ads + "game", "1001");
client.sadd(constants.redis.keyPrefixs.category_ads + "game", "1004");
client.sadd(constants.redis.keyPrefixs.category_ads + "game", "1005");

/*client.smembers(constants.redis.keyPrefixs.category_ads  + "game",function(err,data){

	console.log("category_ads_game data :" + data);
 
	client.quit();
});


client.sinter(
	constants.redis.keyPrefixs.country_ads + "usa",
	constants.redis.keyPrefixs.category_ads + "game",
	function(err, data) {

		console.log("country_ads_usa&category_ads_game data :" + data);

		client.quit();
	});*/




//multi

 // constants.redis.keyPrefixs.ad_budget_left)	 
/*client.multi()
	.sinter(
		constants.redis.keyPrefixs.country_ads + "usa",
		constants.redis.keyPrefixs.category_ads + "game",
		function(err, data) {
			var budgetlefts=[];
			for(var i =0;i<data.length;i++){
 budgetlefts[budgetlefts.length]=constants.redis.keyPrefixs.ad_budget_left +data[i];
			}
console.log(budgetlefts);
			client.get("today_budget_left_1000",function (err,replies) {
				
				console.log(replies);
			})
		




		}
		).exec();*/




