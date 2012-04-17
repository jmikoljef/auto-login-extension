//Modules
MODULE_NOTIFICATION = require("module-notifications");
MODULE_SETTINGS = require("module-settings");
MODULE_SCRIPTS = require("module-scripts");

// Main
exports.main = function(options, callbacks) {
	MODULE_NOTIFICATION.load();
	MODULE_SETTINGS.load();
	MODULE_SCRIPTS.load();
}

// Unload
exports.onUnload = function(reason) {
	MODULE_SCRIPTS.unload();
	MODULE_SETTINGS.unload();
	MODULE_NOTIFICATION.unload();
}
