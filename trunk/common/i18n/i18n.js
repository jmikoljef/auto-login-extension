function i18n(locales, resolveUrl) {
	console.debug('i18n.js', 'i18n', locales, resolveUrl);
	this.locale = undefined;
	if(!(locales instanceof Array)) {
		locales = [ locales ];
	}
	for(var i = 0; i<locales.length; i++) {
		var locale = this.getLocale(locales[i], resolveUrl);
		if(locale != undefined) {
			this.locale = locale;
		}
	}
}

i18n.prototype.getLocale = function(locale, resolveUrl) {
	console.debug('i18n.js', 'i18n.prototype.getLocale', locale, resolveUrl);
	var result = undefined;
	var url = "locale/"+locale+".json";
	var language = undefined;
	var country = undefined;
	var regexp = /^(\w{2})([_-](\w{2}))?$/;
	var match = regexp.exec(locale);
	if(match != null) {
		language = match[1];
		country = match[3];
		result = this.getLocaleFromFile("locale/"+language+".json", resolveUrl);
		if(!!result) console.log("Using "+language+" locale.");
		if(!!country) {
			var tmp = this.getLocaleFromFile("locale/"+language+"-"+country+".json", resolveUrl);
			if(!!tmp) console.log("Using "+language+"-"+country+" locale.");

			if(!result) {
				result = tmp;
			} else if(!!tmp) {
				for(i in tmp) {
					result[i] = tmp[i];
				}
			}
		}
	}
	console.log(result);
	return result;
}
i18n.prototype.getLocaleFromFile = function(url, resolveUrl) {
	console.debug('i18n.js', 'i18n.prototype.getLocaleFromFile', url, resolveUrl);
	var result = undefined;
	var file = new File(url, resolveUrl);
	var opened = file.open();
	if(opened) {
		result = file.getJsonContent();
		file.close();
	}
	return result;
}

i18n.prototype.getMessage = function(message) {
	console.debug('i18n.js', 'i18n.prototype.getMessage', message);
	var locale = this.locale;
	var msg = undefined;
	if(locale != undefined) {
		msg = locale[message];
		if(msg==undefined) {
			console.warn("No translation found for \"" + message + "\"");
			msg = message;
		}
	}
	for(var i=1; i<arguments.length; i++) {
		msg = msg.replace(new RegExp("%"+i+"%","g"), arguments[i]);
	}
	return msg;
};

