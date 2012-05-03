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

const DEBUG_ENABLED = true;

exports.debug = function() {
	if(DEBUG_ENABLED) {
		console.debug.apply(console, arguments);
	}
}

exports.log = function() {
	console.log.apply(console, arguments);
}

exports.info = exports.log;


exports.warn = function() {
	console.warn.apply(console, arguments);
}

exports.warning = exports.warn;

exports.error = function() {
	console.error.apply(console, arguments);
}

exports.exception = function() {
	console.exception.apply(console, arguments);
}
