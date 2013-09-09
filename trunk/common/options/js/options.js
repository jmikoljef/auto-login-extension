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

// Hack for having usefull function on String object
String.prototype.startsWith = function(str) {return (this.match("^"+str)==str)};
String.prototype.endsWith = function(str) {return (this.match(str+"$")==str)};
String.prototype.trim = function() {return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))};
// End hack

function setStatus(msg) {
	// Update status to let user know options were saved.
	var status = document.getElementById("status");
	if(!!status) {
		status.innerHTML = msg;
		status.className = 'status show';
		setTimeout(
			function() { status.className = 'status hide'; },
			1500
		);
	}
}

var settings = new Settings();
var ui = undefined;
(function() {
	function createRepositoryElement(repository) {
		if(!repository.url) {
			console.warn("repository " + JSON.stringify(repository) + " in ignored");
			return;
		}
		var div = document.createElement("div");
		var input = document.createElement("input");
		input.setAttribute("id", "scripts.repositories."+repository.id+".enabled");
		input.setAttribute("name", "scripts.repositories."+repository.id+".enabled");
		input.setAttribute("type", "checkbox");
		if(repository.enabled) input.setAttribute("checked", "checked");
		input.setAttribute("class", "_alo_");
		div.appendChild(input);
		var inputLabel = document.createElement("input");
		inputLabel.setAttribute("id", "scripts.repositories."+repository.id+".label");
		inputLabel.setAttribute("name", "scripts.repositories."+repository.id+".label");
		inputLabel.setAttribute("type", "text");
		inputLabel.setAttribute("value", repository.label);
		inputLabel.setAttribute("class", "_alo_");
		div.appendChild(inputLabel);
		var inputUrl = document.createElement("input");
		inputUrl.setAttribute("id", "scripts.repositories."+repository.id+".url");
		inputUrl.setAttribute("name", "scripts.repositories."+repository.id+".url");
		inputUrl.setAttribute("type", "text");
		inputUrl.setAttribute("value", repository.url);
		inputUrl.setAttribute("class", "_alo_");
		div.appendChild(inputUrl);
		return div;
	}
	function restoreRepositories() {
		var parent = document.getElementById("scipts.repositories");
		repositories = settings.settings.scripts.repositories;
		for(var key in repositories) {
			repository = repositories[key];
			repository.id = key;
			var repoElement = createRepositoryElement(repository);
			if(repoElement) parent.appendChild(repoElement);
		}
	}
	
	window.addEventListener("load", function onload() {
		var mainButton = document.getElementById("main.save");
		mainButton.addEventListener("click", function() { settings.store("main"); }, false);
		var scriptsButton = document.getElementById("scripts.save");
		scriptsButton.addEventListener("click", function() { settings.store("scripts"); }, false);
		settings.load(onChangeSettings);
		ui = new UI();
		ui.switchPanel(document.location.hash.substring(1));
		restoreRepositories();
		settings.restore();
	}, false);
	window.addEventListener("keydown", function captureKey(e) {
		if (e.ctrlKey && e.which == 83) { // CTRL + S
			settings.store(ui.currentPanelId);
			e.preventDefault();
		} else if (e.ctrlKey && e.which == 65) { // CTRL + A
			e.preventDefault();
//			} else if (e.altKey && e.which == 65) { // ALT + A
		}
	}, false);
	
	function onChangeSettings(settings) {
	
	}
})();

