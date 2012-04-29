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