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

var Alex = (function() {
	/**
	 * Constructor
	 * @param ales   the "Auto Login Extention" Service used to control the page
	 * @param config the script config with preferences
	 */
	function Class(AlesClass, config) {
		this.config = config;
		this.ales = new AlesClass(this, config);
		this.ales.addEventListener("fillForm", this.onFillForm);
		this.ales.addEventListener("validate", this.onValidate);
		this.ales.addEventListener("error", this.onError);
		this.ales.addEventListener("init", this.onInit);
		this.ales.init();
	}

	Class.prototype.getLocales = function() {
		var locales = [];
		locales.push(window.navigator.language);
		locales.push("en"); // Add default locale
		return ["fr"]; // TODO: return the correct value for futur release
	}

	/**
	 * This method is used to fill form
	 */
	Class.prototype.fillForm = function() {
		if(!this.config.prefs.enabled) return;
		this.ales.fillForm(this.config.prefs.credential);
	}

	/**
	 * this method is used to validate form
	 */
	Class.prototype.validate = function() {
		if(!this.config.prefs.enabled) return;
		this.ales.validate();
	}

	/**
	 * Listener called when the form is filled
	 */
	Class.prototype.onFillForm = function() {
		if(this.config.prefs.mode=="auto") {
			this.validate();
		} else {
			this.ales.notify("filled");
		}
	}

	/**
	 * Listener called when the form is validated
	 */
	Class.prototype.onValidate = function() {
		this.ales.notify("validated");
	}

	/**
	 * Listener called when an error occurs
	  */
	Class.prototype.onError = function() {
		this.ales.notify("error");
	}

	/**
	 * Listener called when ales is initialized
	  */
	Class.prototype.onInit = function() {
		this.fillForm();
	}

	return Class;
})();

