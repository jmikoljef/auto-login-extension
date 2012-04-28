SELF = require("self");
DATA = SELF.data;
XHR = require('xhr');

exports.load = function(refName, dependancies) {
	for(var d in dependancies) {
		var dep = dependancies[d];
		try {
			if (!!dep.lib) {
				require(dep.lib);
			}
			if (!!dep.code) {
				eval(dep.code);
			}
			if (!!dep.path) {
				var url = DATA.url(dep.path);
				eval(_get(url));
			}
		} catch (e) {
			throw new Error('An error occur during the loading of [' + dep + ']');
		}
	}
	eval('var ref = ' + refName + ';');
	return ref;
}

function _get(url) {
	var xhr = new XHR.XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();
	if (xhr.readyState != 4) {
		throw new Error('Error occur during the loading of the lib');
	}
	return xhr.responseText;
}
