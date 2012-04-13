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

function saveOptions(id) {
	var prefs = getOptionsFromPage("_alo_", id+".");
	storeOptions(prefs[id], id);
}

function loadOption(option, id) {
	if(options instanceof Object) {
		for(var key in options) {
			if(!id) {
				id = key;
			} else {
				id += "." + key;
			}
			loadOption(option[key], id);
		}
	} else {
		if(!id) {
			console.error("Can't load option : id is not defined.");
			return;
		}
		setElementValue(id, option);
	}
}

window.addEventListener("load", init, false);

