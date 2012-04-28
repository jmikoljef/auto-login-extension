SELF = require("self");
DATA = SELF.data;
XHR = require('xhr');
PATH = '../data/';

exports.load = function(libPath, libFunction) {
	var url = DATA.url(PATH + libPath);
	eval(_get(url) + ';');
	eval('return ' + libFunction + ';');
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
