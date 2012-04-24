function i18n(locales, resolveUrl) {
	this.locales = [];
	if(!(locales instanceof Array)) {
		locales = [ locales ];
	}
	for(var i = 0; i<locales.length; i++) {
		var locale = this.getLocale(locales[i], resolveUrl);
		if(locale != undefined) {
			this.locales.push(locale);
		}
	}
}

i18n.prototype.getLocale = function(locale, resolveUrl) {
	var result = undefined;
	var url = "locale/"+locale+".json";
	var file = new File(url, resolveUrl);
	var opened = file.open();
	if(opened) {
		console.info("Using locale "+locale);
		result = file.getJsonContent();
		file.close();
	} else {
		var i = locale.indexOf("_");
		if(i != -1) {
			var newLocale = locale.substring(0, i);
			console.warn("File not found for " + locale + ", trying with " + newLocale + ".");
			result = this.getLocale(newLocale, resolveUrl);
		} else {
			console.warn("Locale not found, default messages will be used");
		}
	}
	return result;
}

i18n.prototype.getMessage = function(message) {
	var locale = this.locales[0];
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

