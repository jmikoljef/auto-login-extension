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

Passwords = require("passwords");

function _getAll(credential, callback) {
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(callback);
		}
	});
};

function _getFirst(credential, callback) {
	var found = false;
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(function(foundCredential) {
				if (!found) {
					found = true;
					callback(foundCredential);
				}
			});
		}
	});
}

function _set(credential) {
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(Passwords.remove);
			Passwords.store({
				url : credential.url,
				formSubmitURL : credential.url,
				username : credential.username,
				password : credential.password
			});
		}
	});
};

function _remove(credential) {
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(Passwords.remove);
		}
	});
};

exports.getAll = _getAll;
exports.getFirst = _getFirst;
exports.set = _set;
exports.remove = _remove;
