var redis = require("redis");
var constants = require('./constants.js');
var async = require("async");

var default_port = constants.redis.port,
	default_host = constants.redis.host,
	client = redis.createClient(default_port, default_host);

client.on("error", function(err) {
	console.log("Error " + err);
});

function getAllAds2(deviceid, performance, country, category, func) {
	async.waterfall([

		function(callback) {
			client.sinter(
				constants.redis.keyPrefixs.country_ads + country,
				constants.redis.keyPrefixs.category_ads + category,
				function(err, data) {
					callback(null, deviceid, performance, data);
				});
		},
		function(deviceid, performance, adids, callback) {
			console.log("adids:" + adids);
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
				callback(null, deviceid, performance, adkeys);
			});
		},
		function(deviceid, performance, adids, callback) {
			var adbidKeys = [];
			for (var i = 0; i < adids.length; i++) {
				adbidKeys[adbidKeys.length] = constants.redis.keyPrefixs.ad + adids[i];
			}
			client.mget(adbidKeys, function(err, replies) {
				callback(null, deviceid, performance, adids, replies);
			});
		},
		function(deviceid, performance, adids, ads, callback) {
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

				callback(null, performance, adkeys, resultads);
			});
		},
		function(performance, adids, ads, callback) {
			client.hgetall(constants.redis.keyPrefixs["performance"] + performance, function(err, perf) {

				callback(null, adids, ads, perf);
			});
		}
	], function(err, adids, ads, perf) {

		console.log("end:" + err);
		console.log("end:" + adids);
		console.log("end:" + ads);
		console.log("end:" + perf);

		if (!!func) {
			func(err, adids, ads, perf);
		}

	});
}

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
		if(!!func){
			func(err, adids, ads, perf);
		}
	});
}



function decrbyBudgets(adid, price, func) {
	var keyOfAdid = constants.redis.keyPrefixs.ad_budget_left + adid;
	client.decrby(keyOfAdid, price, function(err, reply) {
		if(!!func){
			func(err, reply);
		}
	});
}

function incrCounter(deviceid, adid,func) {
	var keyOfAdid = constants.redis.keyPrefixs.ad + adid;
	var keyOfCounter = constants.redis.keyPrefixs.ad_counter + [deviceid, adid].join("_");

	multi = client.multi();
	multi.incr(keyOfCounter);
	multi.get(keyOfAdid);
	multi.exec(function(err, replies) {
		console.log(replies);
		var ttl =parseInt(replies[1].split('|')[3]);
		client.ttl(keyOfCounter, function(err, reply) {
			//如果未设置过期时间
			if (reply == -1) {
				console.log(keyOfCounter);
				client.expire(keyOfCounter, ttl,function(err,reply){
					if(!!func){
						func(err);
					}
				});				
			} else {
				if(!!func){
					func(err);
				}
			}			
		});	
		
	})
}

exports.getAllAds = getAllAds;
exports.getAllAds2 = getAllAds2;
exports.decrbyBudgets = decrbyBudgets;
exports.incrCounter = incrCounter;



