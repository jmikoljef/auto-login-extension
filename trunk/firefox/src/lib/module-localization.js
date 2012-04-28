LOCALE = require("api-utils/l10n/locale");
SELF = require("self");
DATA = SELF.data;
I18N = require('third-libs-loader').load('i18n', [{code:'var XMLHttpRequest = require(\'xhr\').XMLHttpRequest;'}, {path:'file/file.js'}, {path:'i18n/i18n.js'}]);

var i18n = undefined;
//var i18n = new I18N(LOCALE.getPreferedLocales(), DATA.url);
//var i18n = new I18N(['fr'], DATA.url);

exports.get = function(message) {
	console.debug('module-localization.js', 'exports.get');
	return i18n.getMessage(message);
}

/*
 * Load module
 */
exports.load = function() {
	console.debug('module-localization.js', 'exports.load');
	var locales = ['fr'].concat(LOCALE.getPreferedLocales());
	console.debug('module-localization.js', 'exports.load', locales);
	i18n = new I18N(locales, DATA.url);
}

/*
 * Unload module
 */
exports.unload = function() {
	console.debug('module-localization.js', 'exports.unload');
	//
}
