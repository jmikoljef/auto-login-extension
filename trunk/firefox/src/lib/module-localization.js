Locale = require("api-utils/l10n/locale");
Data = require("self").data;
I18n = require('third-libs-loader').load('I18n', [{code:'var XMLHttpRequest = require(\'xhr\').XMLHttpRequest;'}, {path:'file/file.class.js'}, {path:'i18n/i18n.class.js'}]);
var i18n = new I18n(Locale.getPreferedLocales(), Data.url);

exports.get = function(message) {
	console.debug('module-localization.js', 'exports.get');
	return i18n.getMessage(message);
}

/*
 * Load module
 */
exports.load = function() {
	//
}

/*
 * Unload module
 */
exports.unload = function() {
	//
}
