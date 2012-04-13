// Hack for having usefull function on String object
String.prototype.startsWith = function(str) {return (this.match("^"+str)==str)};
String.prototype.endsWith = function(str) {return (this.match(str+"$")==str)};
String.prototype.trim = function() {return (this.replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, ""))};
// End hack

function init() {
	switchPanel("main");
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

