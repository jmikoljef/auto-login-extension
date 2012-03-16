// Includes
const PASSWORDS = require("passwords");
const PAGE_MOD = require("page-mod");
const WIDGET = require("widget");
const SELF = require("self");
const TABS = require("tabs");
const DATA = SELF.data;

var settingsTabs = undefined;

function execute(url, worker) {
    var sent = false;
    PASSWORDS.search({
        url: url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(function (credential){
                if (!sent) {
                    sent = true;
                    worker.port.emit('execute', credential);
                }
            });
        }
    });
}

function changeCredential(credential) {
    PASSWORDS.search({
        url: credential.url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(PASSWORDS.remove);
            PASSWORDS.store({
                url: credential.url,
                formSubmitURL: credential.url,
                username: credential.username,
                password: credential.password
            });
        }
    });
}

function convertURL(id, files) {
	var urls = new Array();
	if(!!files) {
		for(var i in files) {
			urls.push('scripts/' + DATA.url(files[i]));
		}
	}
	urls.push('scripts/' + id + '/script.js');
	urls.push('scripts/bootstrap.js');
	return urls;
}

// Main
exports.main = function(options, callbacks) {

	/*
	 * Plug scripts in pages
	 */
	for(var id in SCRIPTS_CONFIG) {
		var config = SCRIPTS_CONFIG[id];
		// Hack (à cause de BMA !!!!)
		config.id = id;
		// /Hack
		let freeMobilePage = PAGE_MOD.PageMod({
		    include: config.loginPageUrl,
		    contentScriptWhen : 'end',
		    contentScriptFile: convertURL(id, config.files),
		    onAttach: function(worker) {
		        execute(config.url, worker);
		    }
		});
	}

    /*
     * Settings
     */
    let settingsPage = PAGE_MOD.PageMod({
        include: DATA.url('ui/settings.html'),
        contentScriptFile: DATA.url("ui/settings.js"),
        onAttach: function(worker) {
            worker.port.on('changeCredential', changeCredential);
            worker.port.emit('main', SCRIPTS_CONFIG);
        }
    });
    
    let settingsWidget = WIDGET.Widget({
        label: "Sites Login Helper Settings",
        id: 'settings',
        contentURL: DATA.url('ui/widget.html'),
        width: 100,
        onClick: function() {
            if(!!settingsTabs) {
                settingsTabs.activate();
            } else {
                TABS.open({
                    url: DATA.url('ui/settings.html'),
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
}

exports.onUnload = function(reason) {
    if(!!settingsTabs) {
        settingsTabs.close();
    }
}
