/*
 * Auto Login Extension or ALEx, allows you to easily log in on websites
 * with tiresome security systems, such as banks.  
 * Copyright (C) 2012 Bruno Macherel, Pierre-Marie Dhaussy, Aurélie Gandour
 * <auto-login-extension@googlegroups.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  See LICENSE.txt or <http://www.gnu.org/licenses/  >.
 */

var I18n = (function() {

	function Class(locales, resolveUrl) {
		console.debug('i18n.js', 'i18n', locales, resolveUrl);
		this.locale = undefined;
		for(var i = 0; i<locales.length && !this.locale; i++) {
			this.locale = this.getLocale(locales[i], resolveUrl);
		}
	}

	Class.prototype.getLocale = function(locale, resolveUrl) {
		console.debug('i18n.js', 'i18n.prototype.getLocale', locale, resolveUrl);
		var result = undefined;
		var language = undefined;
		var country = undefined;
		var regexp = /^(\w{2})([_-](\w{2}))?$/;
		var match = regexp.exec(locale);
		if(!!match) {
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
		} else {
			console.debug('i18n.js', 'i18n.prototype.getLocale', 'the locale [' + locale + '] don\'t match format.');
		}
		console.debug('i18n.js', 'i18n.prototype.getLocale', 'result: ' + result);
		return result;
	}
	Class.prototype.getLocaleFromFile = function(url, resolveUrl) {
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

	Class.prototype.getMessage = function(message) {
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

	return Class;
})();

