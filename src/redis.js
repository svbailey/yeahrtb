var redis = require("redis");
var constants = require('./constants.js');

var default_port = constants.redis.port,
	default_host = constants.redis.host,
	client = redis.createClient(default_port, default_host);

client.on("error", function(err) {
	console.log("Error " + err);
});

function getAllAds(deviceid, performance, country, category, func) {
	client.sinter(
		constants.redis.keyPrefixs.country_ads + country,
		constants.redis.keyPrefixs.category_ads + category,
		function(err, data) {

			//console.log("getAllAds:" + data);
			getBudgetLeft(deviceid, performance, data, func);
		});
};

function getBudgetLeft(devceid, performance, adids, func) {
	var budgetleftsKeys = [];
	for (var i = 0; i < adids.length; i++) {
		budgetleftsKeys[budgetleftsKeys.length] = constants.redis.keyPrefixs.ad_budget_left + adids[i];
	}

	client.mget(budgetleftsKeys, function(err, replies) {

		var adkeys = [];
		for (var i = 0; i < replies.length; i++) {
			if (replies[i] && replies[i] > 0) {
				adkeys[adkeys.length] =
					adids[i];
			}
		}
		//console.log("getBudgetLeft:" + adkeys);
		getAdbid(devceid, performance, adkeys, func);

	});
}

function getAdbid(devceid, performance, adids, func) {
	var adbidKeys = [];
	for (var i = 0; i < adids.length; i++) {
		adbidKeys[adbidKeys.length] = constants.redis.keyPrefixs.ad + adids[i];
	}

	client.mget(adbidKeys, function(err, replies) {
		//console.log("getAdbid:" + replies);
		getDeviceCounter(devceid, performance, adids, replies, func);

	});
}

function getDeviceCounter(deviceid, performance, adids, ads, func) {
	var counterKeys = []
	for (var i = 0; i < adids.length; i++) {
		counterKeys[counterKeys.length] =
			constants.redis.keyPrefixs.ad_counter + [deviceid, adids[i]].join("_");
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

		getPerformance(performance, adkeys, resultads, func);
	});
}

function getPerformance(performance, adids, ads, func) {

	client.hgetall(constants.redis.keyPrefixs["performance"] + performance, function(err, perf) {

		func(err, adids, ads, perf);
	});
}

function decrbyBudgets(adid, price, func) {
	var keyOfAdid = constants.redis.keyPrefixs.ad_budget_left + adid;
	client.decrby(keyOfAdid, price, function(err, reply) {
		func(err, reply);
	});
}

function incrCounter(deviceid,adid){
	//todo:需要做个判断，如果存在则+1，如果不存在则创建key并根据ad的period来expire，初始化为1
	var keyOfCounter = constants.redis.keyPrefixs.ad_counter + [deviceid, adid].join("_");
	client.incr(keyOfCounter);
}

exports.getAllAds = getAllAds;
exports.decrBudgets = decrBudgets;
exports.incrCounter = incrCounter;



