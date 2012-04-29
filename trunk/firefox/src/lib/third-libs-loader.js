SELF = require("self");
DATA = SELF.data;
XHR = require('xhr');

exports.load = function (refName, dependencies) {
	for(var d in dependencies) {
		var dep = dependencies[d];
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
