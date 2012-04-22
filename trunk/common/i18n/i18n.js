function i18n(locale, resolveUrl) {
	this.locale;

	var url = "locale/"+locale+".json";
	var file = new File(url, resolveUrl);
	var opened = file.open();
	if(opened) {
		console.info("Using locale "+locale);
		this.locale = file.getJsonContent();
		file.close();
	} else {
		var i = locale.indexOf("_");
		if(i != -1) {
			var newLocale = locale.substring(0, i);
			console.warn("File not found for " + locale + ", trying with " + newLocale + ".");
			this.constructor(newLocale, resolveUrl);
		} else {
			console.warn("Locale not found, default messages will be used");
		}
	}
}
i18n.prototype.getMessage = function(message) {
	var msg = undefined;
	if(this.locale != undefined) {
		msg = this.locale[message];
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

