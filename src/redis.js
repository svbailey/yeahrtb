var redis = require("redis");

var default_port = 6379,
	default_host = "127.0.0.1",
	client = redis.createClient(default_port, default_host);

client.on("error", function(err) {
	console.log("Error " + err);
});

var keyPrefixs = {
	ad: "ad_",
	ad_budget_left: "ad_budget_left_",
	ad_counter: "ad_counter_",

	country_ads: "country_ads_",
	category_ads: "category_ads_",
	device_ads: "device_ads_",

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

exports.getAdbid = getAdbid;
exports.getAdbudgetLeft = getAdbudgetLeft;
exports.getAdcounter = getAdcounter;
exports.getCountryads = getCountryads;
exports.getCategoryads = getCategoryads;
exports.getPerfomance = getPerfomance;



