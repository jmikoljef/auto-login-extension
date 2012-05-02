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

PasswordManager = require("password-manager");
PAGE_MOD = require("page-mod");
Storage = require("simple-storage").storage;
Widget = require("widget");
Tabs = require("tabs");
Data = require("self").data;

const THIRD = require('third-libs-loader');
const SCRIPTS = THIRD.load('SCRIPTS_CONFIG', [{path:'manifest.js'}]);

var settingsTabs = undefined;

/*
 * Load module
 */
exports.load = function(scripts) {
	/*
	 * Settings page
	 */
	settingsPage = PAGE_MOD.PageMod({
	    include : Data.url('options/options.html'),
	    contentScriptFile : Data.url("options/bootstrap.js"),
	    onAttach : function(worker) {
		    worker.port.on('saveOptions', function(datas) {
			    console.debug('module-settings.js', 'exports.load', ' worker.port.on(saveOptions)', datas);
			    _saveOptions(datas.id, datas.options);
		    });
		    _loadOptions(worker);
	    }
	});

	/*
	 * Widget
	 */
	settingsWidget = Widget.Widget({
	    label : "Auto-Login configuration",
	    id : 'settings',
	    contentURL : Data.url('widget.html'),
	    width : 100,
	    onClick : function() {
		    if (!!settingsTabs) {
			    settingsTabs.activate();
		    } else {
			    Tabs.open({
			        url : Data.url('options/options.html'),
			        onOpen : function(tab) {
				        settingsTabs = tab;
			        },
			        onClose : function(tab) {
				        settingsTabs = undefined;
			        }
			    });
		    }
	    }
	});
}

/*
 * Unload module
 */
exports.unload = function() {
	console.debug('module-settings.js', 'exports.unload');
	if (!!settingsTabs) {
		settingsTabs.close();
	}
}

/*
 * Send options to settings page
 */
function _loadOptions(worker) {
	console.debug('module-settings.js', '_loadOptions', worker);
	worker.port.emit('loadOptions', {
	    id : 'main',
	    options : Storage['main']
	});
	for ( var s in SCRIPTS) {
		var script = SCRIPTS[s];
		_loadOption(worker, script);
	}
}

function _loadOption(worker, script) {
	console.debug('module-settings.js', '_loadOption', worker, script);
	var id = script.id;
	var options = Storage[id];
	if (!!options) {
		worker.port.emit('loadOptions', {
		    id : id,
		    options : options
		});
	}
	if (id != 'main') {
		_loadCredential(worker, script);
	}
}

function _loadCredential(worker, script) {
	console.debug('module-settings.js', '_loadCredential', worker, script);
	PasswordManager.getFirst({
		url : script.site
	}, function(credential) {
		var options = {};
		options.credential = credential;
		worker.port.emit('loadOptions', {
		    id : script.id,
		    options : options
		});
	});
}

function _saveOptions(id, options) {
	console.debug('module-settings.js', '_saveOptions', id, options);
	if (!!options.credential) {
		_saveCredential(id, options.credential);
		delete options.credential;
	}
	Storage[id] = options;
}

function _saveCredential(id, credential) {
	console.debug('module-settings.js', '_saveCredential', id, credential);
	credential.url = _getUrl(id);
	if (!!credential.username && !!credential.password) {
		PasswordManager.set(credential);
	} else {
		PasswordManager.remove(credential);
	}
}

function _getUrl(id) {
	console.debug('module-settings.js', '_getUrl', id);
	for ( var s in SCRIPTS) {
		var script = SCRIPTS[s];
		if (id == script.id) {
			return script.site;
		}
	}
	return undefined;
}
