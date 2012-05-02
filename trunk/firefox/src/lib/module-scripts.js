/*
 * Auto Login Extension or ALEx, allows you to easily log in on websites
 * with tiresome security systems, such as banks.  
 * Copyright (C) 2012 Bruno Macherel, Pierre-Marie Dhaussy, Aurélie Gandour
 * <auto-login-extension@googlegroups.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  See LICENSE.txt or <http://www.gnu.org/licenses/  >.
 */

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
