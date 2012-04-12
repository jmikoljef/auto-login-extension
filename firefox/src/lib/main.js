// SDK libs
const PASSWORDS = require("passwords");
const PAGE_MOD = require("page-mod");
const WIDGET = require("widget");
const SELF = require("self");
const TABS = require("tabs");
const DATA = SELF.data;
// personnal libs
const PASSWORD_MANAGER = require("password-manager");
const MANIFEST = require("manifest");
// Scripts
const SCRIPTS = MANIFEST.SCRIPTS;

var settingsTabs = undefined;

/*
 * Extract optionnal scripts path, and add mandatory scripts path
 */
function _contentScriptFiles(script) {
	var urls = new Array();
	if(!!script.libs) {
		for(var i in script.files) {
			urls.push(DATA.url('scripts/' + script.libs[i]));
		}
	}
	if(!!script.files) {
		for(var i in script.files) {
			urls.push(DATA.url('scripts/' + script.id + '/' + script.files[i]));
		}
	}
	urls.push(DATA.url('scripts/' + script.id + '/script.js'));
	urls.push(DATA.url('scripts/bootstrap.js'));
	return urls;
}

function _plugScript(script) {
	let pageMod = PAGE_MOD.PageMod({
	    include: script.pages,
	    contentScriptWhen : 'end',
	    contentScriptFile: _contentScriptFiles(script),
	    onAttach: function(worker) {
	    	PASSWORD_MANAGER.getFirst(
	    		{
	    			url:script.site
    			},
    			function(credential) {
    				worker.port.emit('execute', credential);
			}
		);
	    }
	});
}

// Main
exports.main = function(options, callbacks) {
	/*
	 * Plug scripts in pages
	 */
	for(var i in SCRIPTS) {
		var script = SCRIPTS[i];
        _plugScript(script);
	}

    /*
     * Settings page
     */
/*
    let settingsPage = PAGE_MOD.PageMod({
        include: DATA.url('ui/settings.html'),
        contentScriptFile: DATA.url("ui/settings.js"),
        onAttach: function(worker) {
            worker.port.on('changeCredential', PASSWORD_MANAGER.set);
            worker.port.emit('main', SCRIPTS);
        }
    });
*/

    /*
     * Widget
     */    
    let settingsWidget = WIDGET.Widget({
        label: "Auto-Login configuration",
        id: 'settings',
        contentURL: DATA.url('ui/widget.html'),
        width: 100,
        onClick: function() {
            if(!!settingsTabs) {
                settingsTabs.activate();
            } else {
                TABS.open({
                    url: DATA.url('options/options.html'),
                    onOpen: function(tab) {
                        settingsTabs = tab;
                    },
                    onClose: function(tab) {
                        settingsTabs = undefined;
                    }
                });
            }
        }
    });
    
    var storage = require("simple-storage").storage;
    try {
	    console.log("storage.main.notification : " + storage["main.notification"]);
    } catch(e) {
    	console.exception(e);
    }
    try {
	    console.log("window.localStorage.getItem(main.notification) : " + window.localStorage.getItem(main.notification));
    } catch(e) {
    	console.exception(e);
    }
}

// Unload
exports.onUnload = function(reason) {
    if(!!settingsTabs) {
        settingsTabs.close();
    }
}
