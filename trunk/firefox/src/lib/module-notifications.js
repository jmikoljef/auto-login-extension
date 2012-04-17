SIMPLE_STORAGE = require("simple-storage");
NOTIFICATIONS = require("notifications");
STORAGE = SIMPLE_STORAGE.storage;
TABS = require("tabs");
SELF = require("self");
DATA = SELF.data;
WORKERS = new Array();

/*
 * Load module
 */
exports.load = function() {
	var userstyles = require("userstyles");
	var url = DATA.url('notifications/toaster-top-right-down.css');
	userstyles.load(url);

	/*
	 * We attach notification script, even notification.mode is not in browser
	 * mode, in case of user change of minds
	 */
	TABS.on('ready', function(tab) {
		var worker = tab.attach({
		    contentScriptFile : DATA.url('notifications/toaster.js'),
		    contentScript : 'self.port.on("notify", toastIt);'
		});
		WORKERS[tab.index] = worker;
	});
	TABS.on('close', function(tab) {
		delete WORKERS[tab.index];
	});
}

exports.notify = function(options) {
	var mode = 'browser';
	if (!!STORAGE.main) {
		mode = STORAGE.main.notification;
	}

	var settings = _settings(options);

	switch (mode) {
		case 'page':
			_notifyPage(settings);
		break;

		case 'browser':
			_notifyBrowser(settings);
		break;

		case 'system':
		default:
			_notifySystem(settings);
	}
}

function _notifyPage(settings) {
	console.log('module-notifications', '_notifyPage', settings);
	options.pageWorker.port.emit('notify', settings);
}

function _notifyBrowser(settings) {
	console.log('module-notifications', '_notifyBrowser', settings);
	for ( var w in WORKERS) {
		var worker = WORKERS[w];
		worker.port.emit('notify', settings);
	}
}

function _notifySystem(settings) {
	console.log('module-notifications', '_notifySystem', settings);
	NOTIFICATIONS.notify({
	    title : 'Auto Login Extension',
	    data : settings.content,
	    onClick : function(data) {
		    if (!!options.pageWorker.tab) {
			    options.pageWorker.tab.activate();
		    }
	    }
	});
}

function _settings(options) {
	var settings = {};
	settings.displayTime = options.displayTime;
	switch (options.state) {
		case 'filled':
			settings.content = '<span>Field are completed for ' + options.site + '.</span>';
		break;

		case 'logged':
			settings.content = '<span>Notification !</span>';
		break;

		case 'error':
		default:
//			settings.content = '<span>An error occured during auto-login process. ' + !!options.message ? options.message : '' + '</span>';
			settings.content = '<span>An error occured during auto-login process.</span>';
	}
	return settings;
}

/*
 * Unload module
 */
exports.unload = function() {
	//
}
