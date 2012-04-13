////////////////////////////////////////////////////////////////////////////////
// Must be redefined for each browser
////////////////////////////////////////////////////////////////////////////////
function storeOptions(options, id) {
	setOption(id, prefs[id]);
}

function restoreOptions(options, id) {
	var prefs = {};
	if(!!id) prefs[id] = options;
	else prefs = options;
	loadOption(prefs, id);
}

////////////////////////////////////////////////////////////////////////////////
// brwser specific
////////////////////////////////////////////////////////////////////////////////
function getOption(name) {
	return eval("("+window.localStorage.getItem(name)+")");
}

function setOption(name, value) {
	window.localStorage.setItem(name, JSON.stringify(value));
}

function init_gc() {
	var prefs = {};
	// Build preferences from localStorage
	for(var i=0; i<localStorage.length; i++) {
		var key = localStorage.key(i);
		prefs[key] = getOption(key);
	}
	restoreOptions(prefs);
}

window.addEventListener("load", init_gc, false);

