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
	code += 	"var result; ";
	code += 	"try {";
	code += 		"result = execute("+JSON.stringify(credential)+");";
	code += 		"result = {exception: false, object: result};";
	code += 	"} catch(e) {";
	code += 		"result = {exception: true, object: e};";
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

function _handleScriptResponse(response, tabId, script_config) {
	var notification;
	if(response.exception) notification = { type: "error", msg: "Authentification on "+script_config.label+" fails." };
	else notification = { type: "filled", msg: "Authentification on "+script_config.label+" succeed." };
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
					'Auto Login Extension', 
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
			console.error("Unknown notification mode");
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
