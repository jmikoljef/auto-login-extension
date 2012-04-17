const DEBUG_ENABLED = true;

exports.debug = function() {
	if(DEBUG_ENABLED) {
		console.debug.apply(console, arguments);
	}
}

exports.log = function() {
	console.log.apply(console, arguments);
}

exports.info = exports.log;


exports.warn = function() {
	console.warn.apply(console, arguments);
}

exports.warning = exports.warn;

exports.error = function() {
	console.error.apply(console, arguments);
}

exports.exception = function() {
	console.exception.apply(console, arguments);
}