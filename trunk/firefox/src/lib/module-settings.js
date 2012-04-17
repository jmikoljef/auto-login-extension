PASSWORD_MANAGER = require("password-manager");
SIMPLE_STORAGE = require("simple-storage");
PAGE_MOD = require("page-mod");
STORAGE = SIMPLE_STORAGE.storage;
WIDGET = require("widget");
TABS = require("tabs");
SELF = require("self");
DATA = SELF.data;
MANIFEST = require("manifest");
SCRIPTS = MANIFEST.SCRIPTS;

var settingsTabs = undefined;

/*
 * Load module
 */
exports.load = function(scripts) {
	/*
	 * Settings page
	 */
	settingsPage = PAGE_MOD.PageMod({
	    include : DATA.url('options/options.html'),
	    contentScriptFile : DATA.url("options/bootstrap.js"),
	    onAttach : function(worker) {
		    worker.port.on('saveOptions', function(datas) {
			    // console.log('main.js', 'saveOptions', datas.id,
				// datas.options);
			    _saveOptions(datas.id, datas.options);
		    });
		    _loadOptions(worker);
	    }
	});

	/*
	 * Widget
	 */
	settingsWidget = WIDGET.Widget({
	    label : "Auto-Login configuration",
	    id : 'settings',
	    contentURL : DATA.url('widget.html'),
	    width : 100,
	    onClick : function() {
		    if (!!settingsTabs) {
			    settingsTabs.activate();
		    } else {
			    TABS.open({
			        url : DATA.url('options/options.html'),
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
	if (!!settingsTabs) {
		settingsTabs.close();
	}
}

/*
 * Send options to settings page
 */
function _loadOptions(worker) {
	worker.port.emit('loadOptions', {
	    id : 'main',
	    options : STORAGE['main']
	});
	for ( var s in SCRIPTS) {
		var script = SCRIPTS[s];
		_loadOption(worker, script);
	}
}

function _loadOption(worker, script) {
	var id = script.id;
	var options = STORAGE[id];
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
	PASSWORD_MANAGER.getFirst({
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
	if (!!options.credential) {
		_saveCredential(id, options.credential);
		delete options.credential;
	}
	STORAGE[id] = options;
}

function _saveCredential(id, credential) {
	credential.url = _getUrl(id);
	if (!!credential.username) {
		// if(!credential.password) {
		// credential.password = 'not defined';
		// }
		// FIXME si le password est vide le PASSWORD_MANAGER plante
		PASSWORD_MANAGER.set(credential);
	} else {
		PASSWORD_MANAGER.remove(credential);
	}
}

function _getUrl(id) {
	for ( var s in SCRIPTS) {
		var script = SCRIPTS[s];
		if (id == script.id) {
			return script.site;
		}
	}
	return undefined;
}