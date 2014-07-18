var filterchains = {
	"device":["",""],
	"type":["",""],
	"dimension":["",""],
	"app":["",""],
	"geo":["",""],
	"category":["",""]
}

function filter(device, type, dimension, app, geo) {
	if (
		filterchains["device"].indexOf(device) > -1 
		&& filterchains["type"].indexOf(type) > -1 
		&& filterchains["dimension"].indexOf(dimension) > -1 
		&& filterchains["app"].indexOf(app) > -1 
		&& filterchains["geo"].indexOf(geo) > -1
		&& filterchains["category"].indexOf(category) > -1 ) {
		return true;
	}
	return false;
}

exports.filter=filter;