////////////////////////////////////////////////////////////////////////////////
// Must be redefined for each browser
////////////////////////////////////////////////////////////////////////////////
function storeOptions(id, options) {
	setOption(id, options);
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
	console.log(PREFS);
}

window.addEventListener("load", init_gc, false);

