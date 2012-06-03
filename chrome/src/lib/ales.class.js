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

/**
 * Auto Login Extention Service for Chrome
 */
var ChromeAles = (function() {
	/**
	 * Constructor
	 */
	function Class(alex, config) {
		this.alex = alex;
		this.config = config;
		this.listeners = {};
		this.i18n = new I18n(alex.getLocales(), chrome.extension.getURL);
		this.notification = new Notification(this.i18n);
	}
	
	/**
	 * Send a notification
	 */
	Class.prototype.notify = function(state) {
		this.notification.notify(state, this.config);
	}

	/**
	 * Initialize the instance (inject script in the page)
	 */
	Class.prototype.init = function() {
		injectScripts(this);
	}

	/**
	 * Fill the form in the page
	 * @param credential The credential that will be used to fill the form
	 */
	Class.prototype.fillForm = function(credential) {
		callFunction(this, "fillForm", [credential], "fillForm");
	}

	/**
	 * Validate the form in the page
	 */
	Class.prototype.validate = function() {
		callFunction(this, "validate", undefined, "validate");
	}

	/**
	 * Register a new Listener
	 */
	Class.prototype.addEventListener = function(eventType, listener) {
		var listeners = this.listeners[eventType];
		if(!listeners) {
			listeners = [];
			this.listeners[eventType] = listeners;
		}
		listeners.push(listener);
	}

	/**
	 * Call a function in the bootstrap of the content script
	 * @param functionName the name of the function to call
	 * @param args Arguments to send
	 * @param eventType The event that must be fired after the call ("error" event can be fired if an error occurs)
	 */
	function callFunction(instance, functionName, args, eventType) {
		chrome.tabs.sendRequest(instance.config.tabId, { functionName: functionName, args: args, url:instance.config.url }, function(response) {
			if(!response) fireEvent("error", instance);
			else if(!!response.error) fireEvent("error", instance);
			else fireEvent(eventType, instance);
		});
	}

	/**
	 * Call listener corresponding to the event
	 * @param eventType The event that appened
	 * @param instance The ALEx instance of listeners 
	 */
	function fireEvent(eventType, instance) {
		var listeners = instance.listeners[eventType];
		if(!!listeners) {
			for(var i=0; i<listeners.length; i++) {
				listeners[i].apply(instance.alex, []);
			}
		}
	}

	/**
	 * Inject all needed script in the page
	 */
	function injectScripts(instance) {
		var config = instance.config;
		var tabId = config.tabId;
		// chrome hack
		chrome.tabs.executeScript(tabId, {allFrames: true, file: "data/hack_gc.js"});
		chrome.tabs.executeScript(tabId, {allFrames: true, file: "scripts/commons.js"});
		// Inject library scripts
		for(var i in config.libs) {
			chrome.tabs.executeScript(tabId, {allFrames: true, file: "scripts/" + config.libs[i]});
		}
		// Inject others specifics scripts
		for(var i in config.files) {
			chrome.tabs.executeScript(tabId, {allFrames: true, file: "scripts/" + config.id + "/" + config.files[i]});
		}
		// Inject the main script and launch it
		chrome.tabs.executeScript(tabId, {allFrames: true, file: "scripts/" + config.id + "/script.js"});
		chrome.tabs.executeScript(tabId, {allFrames: true, file: "data/bootstrap.js"}, function() {
			fireEvent("init", instance);
		});
	}

	return Class;
})();

