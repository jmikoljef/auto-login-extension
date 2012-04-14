const MODULE_NOTIFICATIONS = require('module-notifications');
const PASSWORD_MANAGER = require("password-manager");
const PAGE_MOD = require("page-mod");
const SELF = require("self");
const DATA = SELF.data;
const MANIFEST = require("manifest");
const SCRIPTS = MANIFEST.SCRIPTS;

/*
 * Load module
 */
exports.load = function() {
	for(var s in SCRIPTS) {
		var script = SCRIPTS[s];
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
	/*
	 * Script defined pages
	 */
	let pageMod = PAGE_MOD.PageMod({
	    include: script.pages,
	    contentScriptWhen : 'end',
	    contentScriptFile: _contentScriptFiles(script),
	    onAttach: function(worker) {
	    	worker.port.on('error', function(message) {
	    		MODULE_NOTIFICATIONS.notify({
	    			pageWorker: worker,
	        		state: 'error',
	        		message: message,
	        		site: script.site
	        	});	    		
	    	});
	    	worker.port.on('filled', function() {
	    		MODULE_NOTIFICATIONS.notify({
	    			pageWorker: worker,
	        		state: 'filled',
	        		site: script.site
	        	});	    		
	    	});
	    	worker.port.on('logged', function() {
	    		MODULE_NOTIFICATIONS.notify({
	    			pageWorker: worker,
	        		state: 'loggued',
	        		site: script.site
	        	});	    		
	    	});  	
	    	PASSWORD_MANAGER.getFirst(
	    		{
	    			url:script.site
    			},
    			function(credential) {
    				worker.port.emit('execute', credential);
				}
			);
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
			urls.push(DATA.url('scripts/' + script.libs[i]));
		}
	}
	if(!!script.files) {
		for(var i in script.files) {
			urls.push(DATA.url('scripts/' + script.id + '/' + script.files[i]));
		}
	}
	urls.push(DATA.url('scripts/' + script.id + '/script.js'));
	urls.push(DATA.url('scripts/bootstrap.js'));
	return urls;
}