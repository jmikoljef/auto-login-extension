Data = require("self").data;
Xhr = require('xhr');

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
				eval(exports.get(dep.path));
			}
		} catch (e) {
			throw new Error('An error occur during the loading of [' + dep + ']');
		}
	}
	eval('var ref = ' + refName + ';');
	return ref;
}

exports.get = function(path) {
	var xhr = new Xhr.XMLHttpRequest();
	xhr.open("GET", Data.url(path), false);
	xhr.send();
	if (xhr.readyState != 4) {
		throw new Error('Error occur during the loading of the lib');
	}
	return xhr.responseText;
}
