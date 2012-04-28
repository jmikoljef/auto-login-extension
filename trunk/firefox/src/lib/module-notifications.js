SIMPLE_STORAGE = require("simple-storage");
NOTIFICATIONS = require("notifications");
STORAGE = SIMPLE_STORAGE.storage;
TABS = require("tabs");
SELF = require("self");
DATA = SELF.data;
WORKERS = new Array();

var _ = require("module-localization").get; 

var template  = '${title} - ${image} - ${content}';

/*
 * Load module
 */
exports.load = function() {
	console.debug('module-notifications.js', 'exports.load');
	var userstyles = require("userstyles");
	var url = DATA.url('notifications/toaster-top-right-down.css');
	userstyles.load(url);

	/*
	 * We attach notification script, even notification.mode is not in browser
	 * mode, in case of user change of minds
	 */
	TABS.on('ready', function(tab) {
		console.debug('module-notifications.js', 'exports.load', 'TABS.on(ready)');
		var worker = tab.attach({
		    contentScriptFile : DATA.url('notifications/toaster.js'),
		    contentScript : 'self.port.on("notify", toastIt);'
		});
		WORKERS[tab.index] = worker;
	});
	TABS.on('close', function(tab) {
		console.debug('module-notifications.js', 'exports.load', 'TABS.on(close)');
		delete WORKERS[tab.index];
	});
}

exports.notify = function(options) {
	console.debug('module-notifications.js', 'exports.notify', options);
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
			_notifySystem(settings);
		break;
		
		case 'none':
		default:
			// No notification
	}
}

function _notifyPage(settings) {
	console.debug('module-notifications.js', '_notifyPage', settings);
	options.pageWorker.port.emit('notify', settings);
}

function _notifyBrowser(settings) {
	console.debug('module-notifications.js', '_notifyBrowser', settings);
	for ( var w in WORKERS) {
		var worker = WORKERS[w];
		worker.port.emit('notify', settings);
	}
}

function _notifySystem(settings) {
	console.debug('module-notifications.js', '_notifySystem', settings);
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
	console.debug('module-notifications.js', '_settings', options);
	var settings = {};
	settings.displayTime = options.displayTime;
	settings.content = template.replace(/\$\{title\}/g, options.site);
	switch (options.state) {
		case 'filled':
			settings.content = settings.content.replace(/\$\{content\}/g, _('form_filled'));
		break;

		case 'validated':
			settings.content = settings.content.replace(/\$\{content\}/g, _('authentication_in_progress'));
		break;

		case 'error':
		default:
			settings.content = settings.content.replace(/\$\{content\}/g, _('authentication_error'));
	}
	return settings;
}

/*
 * Unload module
 */
exports.unload = function() {
	console.debug('module-notifications.js', 'unload');
}
