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

Logger.level = Logger.ALL;

(function Background() {
	
	function handleRepository(repository, details) {
		var url = repository.url;
		var resolveUrl = undefined;
		if(repository.id=="local") {
			url = "repository";
			resolveUrl = chrome.extension.getURL;
		}
		var file = new File(url + "/manifest.json", resolveUrl);
		file.open();
		var manifest = file.getJsonContent();
		for(var i in manifest.scripts_config) {
			var script_config = manifest.scripts_config[i];
			var config = OptionManager.getOption(repository.id + "#" + script_config.id);
			if(!config) continue;
			if(!config.enabled) continue;
			var pages = script_config.pages;
			// loop on each page that can match
			for(var n in pages) {
				var page = new RegExp(pages[n]);
				// Does the current URL match with this config ?
				if(details.url.match(page)) {
					script_config.tabId = details.tabId;
					script_config.prefs = config;
					script_config.url = details.url;
					script_config.repository = repository;
					var alex = new Alex(ChromeAles, script_config);
				}
			}
		}
	}
	
	// Add a listener on tabs for injecting scripts if needed
	chrome.webRequest.onCompleted.addListener(
		// Callback
		function(details) {
			var repositories = OptionManager.getOption("scripts").repositories;
			for(var key in repositories) {
				handleRepository(repositories[key], details)
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
	Logger.debug("test");
})();
