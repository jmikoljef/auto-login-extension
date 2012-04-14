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
	chrome.tabs.executeScript(details.tabId, {allFrames: true, file: "scripts/" + script_config.id + "/script.js"}, function() {
		chrome.tabs.executeScript(
			details.tabId, 
			{
				allFrames: true,
				code: 
					"if(window.location.href==\""+details.url+"\") {"+
						"var result = execute("+JSON.stringify(credential)+");"+
						"callBackground('handleScriptResponse', [result, "+JSON.stringify(script_config)+"]);"+
					"}"
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
			var config = eval("("+window.localStorage.getItem(script_config.id)+")");
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

function _handleScriptResponse(response, script_config) {
	var msg;
	if(!response) msg = "Authentification on "+script_config.label+" succeed.";
	else msg = "Authentification on "+script_config.label+" fail.";
	var tabId = undefined;
	chrome.tabs.insertCSS(tabId, {file: "notifications/toaster-top-right-down.css"});
	chrome.tabs.executeScript(tabId, {file: "notifications/toaster.js"}, function() {
		chrome.tabs.executeScript(tabId, { code: "toastIt({content: '"+msg+"'});" });
	});
}
