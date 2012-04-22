function getOption(name) {
	return eval("("+window.localStorage.getItem(name)+")");
}

/**
 * Inject all needed script in the page
 */
function injectScripts(details, script_config, config) {
	var credential = config.credential;

	// chrome hack
	chrome.tabs.executeScript(details.tabId, {allFrames: true, file: "hack_gc.js"});
	chrome.tabs.executeScript(details.tabId, {allFrames: true, file: "scripts/commons.js"});
	// Inject library scripts
	for(var i in script_config.libs) {
		chrome.tabs.executeScript(details.tabId, {allFrames: true, file: "scripts/" + script_config.libs[i]});
	}
	// Inject others specifics scripts
	for(var i in script_config.files) {
		chrome.tabs.executeScript(details.tabId, {allFrames: true, file: "scripts/" + script_config.id + "/" + script_config.files[i]});
	}
	// Inject the main script and launch it
	var code = "";
	code += "if(window.location.href==\""+details.url+"\") {";
	code += 	"var result;";
	code += 	"try {";
	code += 		"if(fillForm("+JSON.stringify(credential)+")) result = 'form_filled';";
	if(config.mode=="auto") {
	code += 		"if(validate()) result = 'authentication_in_progress';";
	}
	code += 	"} catch(e) {";
	code += 		"result = e;";
	code += 	"}";
	code += 	"callBackground('handleScriptResponse', [result, "+details.tabId+", "+JSON.stringify(script_config)+"]);";
	code += "}";
	chrome.tabs.executeScript(details.tabId, {allFrames: true, file: "scripts/" + script_config.id + "/script.js"}, function() {
		chrome.tabs.executeScript(
			details.tabId, 
			{
				allFrames: true,
				code: code
			}
		);
	});
}

// Add a listener on tabs for injecting scripts if needed
chrome.webNavigation.onCompleted.addListener(
	// Callback
	function(details) {
		for(var i in SCRIPTS_CONFIG) {
			var script_config = SCRIPTS_CONFIG[i];
			var config = getOption(script_config.id);
			if(!config) continue;
			if(!config.enabled) continue;
			var pages = script_config.pages;
			// loop on each page that can match
			for(var n in pages) {
				var page = pages[n];
				if(typeof page == "string") {
					page = page.replace(/\?/, "\\?");
					page = page.replace(/\*/, ".*");
					page = "^"+page+"$";
				}
				// Does the current URL match with this config ?
				if(details.url.match(page)) {
					injectScripts(details, script_config, config);
				}
			}
		}
	},
	// Filter
	{
		urls: ["<all_urls>"],
		types: ["main_frame", "sub_frame"]
	},
	// opt_extraInfoSpec
	[]
);

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		var _function = eval("_"+request.functionName);
		var response = _function.apply(this, request.params)
		sendResponse(response);
	}
);

var locale_i18n = new i18n(getLocale(), chrome.extension.getURL);

function _handleScriptResponse(response, tabId, script_config) {
	if(response==undefined) return;
	var notification;
	if(typeof response == "string") {
		var msg = locale_i18n.getMessage(response);
		notification = { type: "filled", title:script_config.label, msg: msg };
	} else {
		var msg;
		if(!!response.i18n_message) msg = locale_i18n.getMessage(response.i18n_message);
		else msg = chrome.i18n.getMessage(response.message);
		notification = { type: "error", title:script_config.label, msg: msg };
	}
	var mode = getOption("main").notification;
	sendNotification(notification, mode, tabId);
}

function sendNotification(notification, mode, tabId) {
	var timeout = 5000;
	switch(mode) {
		case "desktop":
			chrome.tabs.get(tabId, function(tab) {
				var notif = webkitNotifications.createNotification(
					tab.favIconUrl,
					notification.title, 
					notification.msg
				);
				notif.ondisplay = function() {
					if(timeout>=0) {
						setTimeout(function() { notif.cancel(); }, timeout);
					}
				};
				notif.show();
			});
			break;
		case "browser":
			chrome.windows.getAll({populate: true}, function(windows) {
				for(var i=0; i<windows.length; i++) {
					var win = windows[i];
					for(var j=0; j<win.tabs.length; j++) {
						insertNotificationToPage(win.tabs[j].id, notification.msg, timeout);
					}
				}
			});
			break;
		case "page":
			insertNotificationToPage(tabId, notification.msg, timeout);
			break;
		default:
			// none
			break;
	}
}

function insertNotificationToPage(tabId, message, timeout) {
	chrome.tabs.insertCSS(tabId, {file: "notifications/toaster-top-right-down.css"});
	chrome.tabs.executeScript(tabId, {file: "notifications/toaster.js"}, function() {
		chrome.tabs.executeScript(tabId, { code: 
			"toastIt({"+
				"content: '"+message+"', "+
				"displayTime: "+timeout+
			"});"
		});
	});
}

function getLocale() {
	return window.navigator.language;
}
