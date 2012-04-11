/**
 * Inject all needed script in the page
 */
function injectScripts(details, script_config, config) {
	var credential = config.credential;

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
		chrome.tabs.executeScript(details.tabId, {allFrames: true, code: "if(window.location.href==\""+details.url+"\") { execute("+JSON.stringify(credential)+"); }"});
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
				page = page.replace(/\?/, "\\?");
				page = page.replace(/\*/, ".*");
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

function getOption(name) {
	return eval("("+window.localStorage.getItem(name)+")");
}
function setOption(name, value) {
	window.localStorage.setItem(name, JSON.stringify(value));
}

chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		var _function = eval("_"+request.function);
		var response = _function.apply(this, request.params)
		sendResponse(response);
	}
);

