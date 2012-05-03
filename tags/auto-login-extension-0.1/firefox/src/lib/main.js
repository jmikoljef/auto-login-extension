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
