Data = require("self").data;
Notifications = require("notifications");
Storage = require("simple-storage").storage;
Tabs = require("tabs");

const WORKERS = new Array();

var _ = require("module-localization").get; 
var template  = require("third-libs-loader").get('notifications/alex.html');

/*
 * Load module
 */
exports.load = function() {
	console.debug('module-notifications.js', 'exports.load');
	var userstyles = require("userstyles");
	userstyles.load(Data.url('notifications/toaster-top-right-down.css'));
	userstyles.load(Data.url('notifications/alex.css'));

	/*
	 * We attach notification script, even notification.mode is not in browser
	 * mode, in case of user change of minds
	 */
	Tabs.on('ready', function(tab) {
		console.debug('module-notifications.js', 'exports.load', 'Tabs.on(ready)');
		var worker = tab.attach({
		    contentScriptFile : Data.url('notifications/toaster.js'),
		    contentScript : 'self.port.on("notify", toastIt);'
		});
		WORKERS[tab.index] = worker;
	});
	Tabs.on('close', function(tab) {
		console.debug('module-notifications.js', 'exports.load', 'Tabs.on(close)');
		delete WORKERS[tab.index];
	});
}

exports.notify = function(options) {
	console.debug('module-notifications.js', 'exports.notify', options);
	var mode = 'browser';
	if (!!Storage.main) {
		mode = Storage.main.notification;
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
	Notifications.notify({
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
