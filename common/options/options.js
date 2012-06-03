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

var Menu = (function() {
	function Class(id, label, image, checkbox) {
		this.id = id;
		this.label = label;
		this.image = image;
		this.checkbox = checkbox;
		this.children = [];
	}

	Class.prototype.addSubMenu = function(submenu) {
		this.children.push(submenu);
	}
	return Class;
})();

function init() {
	var menus = document.getElementsByName("menu");
	for(var i=0; i<menus.length; i++) {
		menus[i].addEventListener("click", clickMenuItem, false);
	}
	switchPanel("main");
}

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

function clickMenuItem(event) {
	var menu = undefined;
	var tmp = event.target;
	while(!!tmp && !menu) {
		if(tmp.getAttribute("name")=="menu") menu = tmp;
		tmp = tmp.parentElement;
	}
	if(!menu) return;
	var id = menu.id.substring(5);
	switchPanel(id);
}

function switchPanel(id) {
	var tags = document.getElementsByClassName('menu-item-l1');
	for(var i=0; i<tags.length; i++) {
		var menu = tags[i];
		if(menu.id == 'menu-' + id) {
			menu.className = 'menu-item-l1 menu-enabled';
		} else {
			menu.className = 'menu-item-l1 menu-disabled';
		}
	}
	tags = document.getElementsByClassName('menu-item-l2');
	for (var i=0; i<tags.length; i++) {
		var menu = tags[i];
		if(menu.id == 'menu-' + id) {
			menu.className = 'menu-item-l2 menu-enabled';
		} else {
			menu.className = 'menu-item-l2 menu-disabled';
		}
	}
	tags = document.getElementsByClassName('panel');
	for (var i=0; i<tags.length; i++) {
		var pane = tags[i];
		if(pane.id == 'panel-' + id) {
			pane.style.display = 'block';
		} else {
			pane.style.display = 'none';
		}
	}
}

const PREFS = {};

function saveOptions(id) {
	var prefs = getOptionsFromPage("_alo_", id+".");
	storeOptions(id, prefs[id]);
	fillObject(PREFS, id, prefs[id]);
	setStatus("Pr&eacute;ferences sauvegard&eacute;es.");
}

function loadOption(option, id) {
	if(option instanceof Object) {
		for(var key in option) {
		        var tmp = id;
			if(!tmp) {
				tmp = key;
			} else {
				tmp += "." + key;
			}
			loadOption(option[key], tmp);
		}
	} else {
		if(!id) {
			console.error("Can't load option : id is not defined.");
			return;
		}
		fillObject(PREFS, id, option);
		setElementValue(id, option);
	}
}

function updateOption(id) {
	var value = getOptionsFromPage("_alo_", id);
	fillObject(PREFS, id, getValue(value, id));
	id = id.split(".")[0];
	storeOptions(id, PREFS[id]);
}

function restoreOptions(options, id) {
	var prefs = {};
	if(!!id) prefs[id] = options;
	else prefs = options;
	loadOption(prefs, id);
}

window.addEventListener("load", init, false);

