PageMod = require("page-mod");
require("tabs");
Data = require("self").data;
Alex = require('alex.class').Alex;
Scripts = require('third-libs-loader').load('SCRIPTS_CONFIG', [{path:'manifest.js'}]);

/*
 * Load module
 */
exports.load = function() {
	for(var s in Scripts) {
		var script = Scripts[s];
        _plugScript(script);
	}
}

/*
 * Unload module
 */
exports.unload = function() {
	//
}

/*
 * Inject content-script in page
 */
function _plugScript(script) {
	PageMod.PageMod({
	    include: script.pages,
	    contentScriptWhen : 'end',
	    contentScriptFile: _contentScriptFiles(script),
	    onAttach: function(worker) {
	    	script.icon = worker.tab.favicon;
	    	var alex = Alex(script, worker);
	    	alex.fillForm();
	    }
	});
}

/*
 * Extract optionnal scripts path, and add mandatory scripts path
 */
function _contentScriptFiles(script) {
	var urls = new Array();
	if(!!script.libs) {
		for(var i in script.files) {
			urls.push(Data.url('scripts/' + script.libs[i]));
		}
	}
	if(!!script.files) {
		for(var i in script.files) {
			urls.push(Data.url('scripts/' + script.id + '/' + script.files[i]));
		}
	}
	urls.push(Data.url('scripts/' + script.id + '/script.js'));
	urls.push(Data.url('scripts/utils.js'));
	urls.push(Data.url('scripts/bootstrap.js'));
	return urls;
}
