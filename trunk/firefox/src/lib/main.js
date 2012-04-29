//Modules
LocalizationModule = require("module-localization");
NotificationModule = require("module-notifications");
SettingsModule = require("module-settings");
ScriptsModule = require("module-scripts");

// Main
exports.main = function(options, callbacks) {
	LocalizationModule.load();
	NotificationModule.load();
	SettingsModule.load();
	ScriptsModule.load();
}

// Unload
exports.onUnload = function(reason) {
	LocalizationModule.unload();
	ScriptsModule.unload();
	SettingsModule.unload();
	NotificationModule.unload();
}
