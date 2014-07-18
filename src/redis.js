var redis = require("redis");

var default_port = 6379,
	default_host = "127.0.0.1",
	client = redis.createClient(default_port, default_host);

client.on("error", function(err) {
	console.log("Error " + err);
});

var keyPrefixs = {
	ad: "adbid_",
	ad_budget_left: "today_budget_left_",
	ad_counter: "ad_counter_",

	country_ads: "target_country_",
	category_ads: "target_category_",

	performance: "performance_"
};

function getAdbid (adid,func) {
 	client.hgetall(keyPrefixs["ad"] + adid,func);
};

function getAdbudgetLeft (adid,func) {
 	client.get(keyPrefixs["ad_budget_left"] + adid,func);
};

function getAdcounter(deviceid,adid,func){
	client.get(keyPrefixs["ad_counter"] +[deviceid,adid].join("_") ,func);
};

function getCountryads(country,func){
	client.smembers(keyPrefixs["country_ads"] + country,func);
};

function getCategoryads(country,func){
	client.smembers(keyPrefixs["category_ads"] + country,func);
};

function getPerfomance(appid,width,height,os,func){
	client.hgetall(keyPrefixs["performance"] + [appid,width,height,os].join("_") ,func);
};

function getPerfomance2(adid,appid,width,height,os,func){
	client.hgetall(keyPrefixs["performance"] + [adid,appid,width,height,os].join("_") ,func);
};



function getAllAds(deviceid, performance,country, category, func) {
	client.sinter(
		keyPrefixs.country_ads + country,
		keyPrefixs.category_ads + category,
		function(err,data){

			//console.log("getAllAds:" + data);
			getBudgetLeft(deviceid,performance,data,func);
		});
};

function getBudgetLeft(devceid,performance,adids,func){
	var budgetleftsKeys = [];
		for (var i = 0; i < adids.length; i++) {
			budgetleftsKeys[budgetleftsKeys.length] = keyPrefixs.ad_budget_left + adids[i];
		}

		client.mget(budgetleftsKeys,function(err, replies){

			var adkeys = [];
			for (var i = 0; i < replies.length; i++) {
				if (replies[i] && replies[i] > 0) {
					adkeys[adkeys.length] =
						adids[i];
				}
			}
			//console.log("getBudgetLeft:" + adkeys);
			getAdbid(devceid,performance,adkeys,func);

	});
}

function getAdbid(devceid,performance,adids,func){
	var adbidKeys = [];
		for (var i = 0; i < adids.length; i++) {
			adbidKeys[adbidKeys.length] = keyPrefixs.ad + adids[i];
		}

	client.mget(adbidKeys,function(err, replies){
			//console.log("getAdbid:" + replies);
			getDeviceCounter(devceid,performance,adids,replies,func);

	});
}




function getDeviceCounter(deviceid,performance, adids,ads, func) {
	var counterKeys = []
	for (var i = 0; i < adids.length; i++) {
		counterKeys[counterKeys.length] =
			keyPrefixs.ad_counter + [deviceid, adids[i]].join("_");
	}

	client.mget(counterKeys, function(err, replies) {
		var adkeys = [];
		var resultads = [];
		for (var i = 0; i < replies.length; i++) {
			var counter = ads[i].split(',')[2];
			if (!(replies[i] && replies[i] >= counter)) {
				adkeys[adkeys.length] = adids[i];
				resultads[resultads.length] = ads[i];
			}
		}

		getPerformance(performance,adkeys,resultads,func);
	});
}


function getPerformance( performance,adids,ads,func){

	client.hgetall(keyPrefixs["performance"] +performance ,function(err,perf){

		func(err,adids,ads,perf);
	});
}



/*exports.getAdbid = getAdbid;
exports.getAdbudgetLeft = getAdbudgetLeft;
exports.getAdcounter = getAdcounter;
exports.getCountryads = getCountryads;
exports.getCategoryads = getCategoryads;
exports.getPerfomance = getPerfomance;
exports.getPerfomance2 = getPerfomance2;*/

exports.getAllAds = getAllAds;



