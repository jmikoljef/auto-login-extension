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

// Only a singleton instance is created, so the class is not returned
(function() {
	function Class() {
		var instance = this;
		chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
			if(request.url == window.location.href) {
				var _instance = instance;
				var _function = eval("_instance."+request.functionName);
				try {
					var response = _function.apply(_instance, request.args)
					sendResponse({response: response});
				} catch (e) {
					sendResponse({error: e});
				}
			}
		});
	}

	Class.prototype.getCurrentLocationUrl = function() {
		return window.location.href;
	}

	Class.prototype.fillForm = function(credential) {
		fillForm(credential);
	}
	Class.prototype.validate = function() {
		validate();
	}
	
	new Class();
})();

