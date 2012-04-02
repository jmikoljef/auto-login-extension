/**
 * Inject all needed script in the page
 */
function injectScripts(tabId, script_config) {
  var config = eval("("+window.localStorage.getItem(script_config.id)+")");
  if(!config) return;
  if(!config.enabled) return;
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
      var pages = script_config.pages;
      // loop on each page that can match
      for(var n in pages) {
        var page = pages[n];
        page = page.replace(/\?/, "\\?");
        page = page.replace(/\*/, ".*");
        // Does the current URL match with this config ?
        if(tab.url.match(page)) {
          injectScripts(tabId, script_config);
        }
      }
    }
  }
});

