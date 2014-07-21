/**
 * Created by zhangliming on 14-7-18.
 */
module.exports = {
	host: 'http://ec2-54-86-9-66.compute-1.amazonaws.com:8000',
    cdn:{
        host:'http://ec2-54-86-9-66.compute-1.amazonaws.com:8000'
    },
	redis: {
		host: '172.20.0.44',
		port: 6378,
		keyPrefixs: {
			ad: "adbid_",
			ad_budget_left: "today_budget_left_",
			ad_counter: "ad_counter_",

			country_ads: "target_country_",
			category_ads: "target_category_",

			performance: "performance_"
		}
	}
};