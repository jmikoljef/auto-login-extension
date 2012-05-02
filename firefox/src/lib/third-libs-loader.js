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
