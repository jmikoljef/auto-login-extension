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

	switch (options.state) {
		case 'filled':
			options.message = _('form_filled');
		break;

		case 'validated':
			options.message = _('authentication_in_progress');
		break;

		case 'error':
		default:
			options.message = _('authentication_error');
	}

	var mode = 'browser';
	if (!!Storage.main) {
		mode = Storage.main.notification;
	}

	switch (mode) {
		case 'page':
			_notifyPage(options);
		break;

		case 'browser':
			_notifyBrowser(options);
		break;

		case 'desktop':
			_notifyDesktop(options);
		break;
		
		case 'none':
		default:
			// No notification
	}
}

function _notifyPage(options) {
	console.debug('module-notifications.js', '_notifyPage', options);
	var settings = _settings(options);
	var index = options.pageWorker.tab.index;
	var worker = WORKERS[index];
	worker.port.emit('notify', settings);
	console.debug('module-notifications.js', '_notifyPage', 'fin');
}

function _notifyBrowser(options) {
	console.debug('module-notifications.js', '_notifyBrowser', options);
	var settings = _settings(options);
	for ( var w in WORKERS) {
		var worker = WORKERS[w];
		worker.port.emit('notify', settings);
	}
}

function _notifyDesktop(options) {
	console.debug('module-notifications.js', '_notifyDesktop', options);
	Notifications.notify({
	    title : 'ALEx - ' + options.script.site,
	    text: options.message,
	    iconURL: options.script.icon,
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
	var content = template;
	content = content.replace(/\$\{title\}/g, options.script.site);
	content = content.replace(/\$\{image\}/g, options.script.icon);
	content = content.replace(/\$\{content\}/g, options.message);
	settings.content = content;
	settings.displayTime = options.displayTime;
	return settings;
}

/*
 * Unload module
 */
exports.unload = function() {
	console.debug('module-notifications.js', 'unload');
}
