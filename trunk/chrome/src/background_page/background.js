/**
 * Inject all needed script in the page
 */
function injectScripts(tabId, script_config, config) {
  var credential = config.credential;

  // Inject library scripts
  for(var i in script_config.libs) {
    chrome.tabs.executeScript(tabId, {file: "scripts/" + script_config.libs[i]});
  }
  // Inject others specifics scripts
  for(var i in script_config.files) {
    chrome.tabs.executeScript(tabId, {file: "scripts/" + script_config.id + "/" + script_config.files[i]});
  }
  // Inject the main script and launch it
  chrome.tabs.executeScript(tabId, {file: "scripts/" + script_config.id + "/script.js"}, function() {
    chrome.tabs.executeScript(tabId, {code: "execute("+JSON.stringify(credential)+")"});
  });
}

// Add a listener on tabs for injecting scripts if needed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(!!changeInfo && changeInfo.status=="complete") {
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
        if(tab.url.match(page)) {
          injectScripts(tabId, script_config, config);
        }
      }
    }
  }
});

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
	});

function _addImage(base64) {
	var images = getOption("freemobile.images");
	if(!images) images = {};
	if(!images[base64]) {
		images[base64] = undefined;
		setOpion("freemobile.images", images);
	}
}

function _getImages() {
	var images = getOption("freemobile.images");
	if(!images) images = {};
	return images;
}

