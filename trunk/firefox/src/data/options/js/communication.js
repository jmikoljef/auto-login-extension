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

////////////////////////////////////////////////////////////////////////////////
// Must be redefined for each browser
////////////////////////////////////////////////////////////////////////////////
Settings.prototype._load = function(name, callback) {
	// console.log('communication.js', '_load', name);
	var data = {
		functionName: 'loadSettings',
		name:name
	};
	//FIXME call the callback
	error to fix...
	window.postMessage(JSON.stringify(data), '*');
};
Settings.prototype._store = function store(value, name) {
	// console.log('communication.js', 'storeOptions', value, name);
	var data = {
		functionName: 'storeSettings',
		name:name,
		value:value
	};
	window.postMessage(JSON.stringify(data), '*');
}

////////////////////////////////////////////////////////////////////////////////
// browser specifics
////////////////////////////////////////////////////////////////////////////////
window.addEventListener('message', onMessage, false);

function onMessage(event) {
	var data = JSON.parse(event.data);
	// console.log('communication.js', 'onMessage', data.functionName, data.id, data.options);
	if(data.functionName == 'loadSettings') {
		settings.loadSettings(data.options, data.id);
	}
}
