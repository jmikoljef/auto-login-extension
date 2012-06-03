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

var File = (function() {
	function Class(url, resolveUrl) {
		this.content;
		this.json;
		this.url;

		if(resolveUrl==undefined) {
			this.url = url;
		} else {
			this.url = resolveUrl(url);
		}
	}
	Class.prototype.open = function() {
		this.close();
		var xhr = new XMLHttpRequest();
		xhr.open("GET", this.url, false);
		try {
			xhr.send();
			if(xhr.readyState != 4) return false;
			this.content = xhr.responseText;
		} catch(e) {
			return false;
		}
		return true;
	};
	Class.prototype.close = function() {
		this.content = undefined;
		this.json = undefined
	};
	Class.prototype.getContent = function() {
		return this.content;
	};
	Class.prototype.getJsonContent = function() {
		if(this.json==undefined) {
			this.json = JSON.parse(this.content);
		}
		return this.json;
	};

	return Class;
})();

