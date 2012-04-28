SELF = require("self");
DATA = SELF.data;
XHR = require('xhr');
PATH = '../data/';

/*
 * Load module
 */
exports.load = function() {
	// TODO A supprimer dès que lib() fonctionnera
	_load('file');
	exports.File = File

	_load('i18n');
	exports.i18n = i18n;
	// TODO fin todo
}

/*
 * Unload module
 */
exports.unload = function() {
	//
}

export.lib = lib;

function lib(libName) {
	_load(libName);
	
	/*
	 * Ici je voudrais retourner le pointeur de la lib (libName), comment est-ce que je peux faire ?
	 * Ca marche ça : eval('return libName'); ?
	 */
}

function _load(libName) {
	var url = DATA.url(PATH + '/' + libName + '/' + libName + '.js');
	eval("(" + get(url) + ")");
}

function _get(url) {
	var xhr = new XHR.XMLHttpRequest();
	xhr.open("GET", url, false);
	try {
		xhr.send();
		if (xhr.readyState != 4) {
			return undefined;
		}
		return xhr.responseText;
	} catch (e) {
		return undefined;
	}
}
