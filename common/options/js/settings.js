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

var Settings = (function() {
	function Settings() {
		this.settings = {};
	}

	/**
	 * Restore settings from storage
	 * @param name The name of the settings to load or <code>undefined</code> if all settings have to be loaded.
	 * @param callback function called when settings will be loaded from storage
	 */
	Settings.prototype._load = function(name, callback) {
		alert("Settings.prototype._load must be redefined.")
	};
	/**
	 * Store settings to storage
	 * @param value the settings to store
	 * @param name The name of the settings to store or <code>undefined</code> if all settings are passed
	 */
	Settings.prototype._store = function(value, name) {
		alert("Settings.prototype.store must be redefined.")
	};

	/**
	 * Restore settings from storage
	 * @param name The name of the settings to load or <code>undefined</code> if all settings have to be loaded.
	 * @returns Settings loaded from storage
	 */
	Settings.prototype.load = function(name, callback) {
		var instance = this;
		this._load(
				name,
				function(name, value) {
					if(!name) instance.settings = value;
					else instance.settings[name] = value;
					fillObject(instance.settings, "scripts.repositories.local.url", "Local");
					if(callback) {
						callback(name, value);
					}
				});
	};

	/**
	 * Fetch settings from page and store them to storage
	 * @param classname The class name used to retrieve settings
	 * @param name the name of the settings to store or <code>undefined</code> for all settings
	 */
	Settings.prototype.save = function(name, update) {
		var classname = "_alo_"
		var prefix = (name && !update)?name + ".":name;
		var elements = document.getElementsByClassName(classname);
		for(var i=0; i<elements.length; i++) {
			var element = elements[i];
			// if there was a prefix, we check that the name starts with
			if(!prefix || element.name.startsWith(prefix)) {
				var value = getElementValue(element.name);
				fillObject(this.settings, element.name, value);
			}
		}
		if(name && name.indexOf(".") != -1) name = name.substring(0,name.indexOf("."));
		var value = name?this.settings[name]:this.settings;
	};

	/**
	 * Load settings and update page
	 * @param name The name of the settings to load or <code>undefined</code> if all settings must be loaded
	 */
	Settings.prototype.restore = function(name) {
		restoreSettings(this.settings);
	};

	Settings.prototype.store = function(name, update) {
		this.save(name, update);
		name = name.split(".")[0];
		this._store(this.settings[name], name);
		if(!update) setStatus("Pr&eacute;ferences sauvegard&eacute;es.");
	}
	
	function restoreSettings(settings, id) {
		if(settings instanceof Object) {
			for(var key in settings) {
				var tmp = id;
				if(!tmp) {
					tmp = key;
				} else {
					tmp += "." + key;
				}
				restoreSettings(settings[key], tmp);
			}
		} else {
			if(!id) {
				console.error("Can't restore settings: id is not defined.");
				return;
			}
			setElementValue(id, settings);
		}
	}
	
	/**
	 * Put the value in the json object corresponding to the name
	 * i.e: fillObject({ bar:{ foo: "value" } }, "foo.bar", "value") trasnform the object to { bar:{ foo: "value" }, foo:{ bar: "value" } }
	 */
	function fillObject(object, name, value) {
		var name_parts = name.split(".");
		for(var i in name_parts) {
			name = name_parts[i];
			if(i!=name_parts.length-1) {
				if(!object[name]) object[name] = {};
				object = object[name];
			}
		}
		object[name] = value;
	}

	function getValue(object, name) {
		var name_parts = name.split(".");
		for(var i in name_parts) {
			name = name_parts[i];
			if(object[name]==undefined) return undefined;
			object = object[name];
		}
		return object;
	}

	/**
	 * Return the value of an input element (text, password, radio, checkbox)
	 * If there was many element with this name, the result will be an array
	 */
	function getElementValue(name) {
		var elements = document.getElementsByName(name);
		if(elements.length==0) return undefined;
		if(elements[0].type=="radio") {
			return _getRadioElementValue(elements);
		} else if(elements[0].type=="checkbox") {
			return _getCheckboxElementValue(elements);
		} else {
			return _getDefaultElementValue(elements);
		}
	}
	function _getRadioElementValue(elements) {
		// Find the checked value
		for(var i=0; i<elements.length; i++) {
			if(elements[i].checked) {
				return elements[i].value;
			}
		}
	}
	function _getCheckboxElementValue(elements) {
		if(elements.length==1) {
			return elements[0].checked;
		} else {
			var values = [];
			for(var i=0; i<elements.length; i++) {
				if(elements[i].checked) {
					values.push(elements[i].value);
				}
			}
			return values;
		}
	}

	function _getDefaultElementValue(elements) {
		if(elements.length==1) {
			return elements[0].value;
		} else {
			var values = [];
			for(var i=0; i<elements.length; i++) {
				values.push(elements[i].value);
			}
			return values;
		}
	}

	/**
	 * Set the value to an input element
	 */
	function setElementValue(name, value) {
		var elements = document.getElementsByName(name);
		if(elements.length==0) return;
		if(elements[0].type=="radio") {
			_setRadioElementValue(elements, value)
		} else {
			var values;
			if(value instanceof Array) values = value;
			else values = [ value ];
			if(elements[0].type=="checkbox") {
				_setCheckboxElementValue(elements, values);
			} else {
				_setDefaultElementValue(elements, values);
			}
		}
	}
	function _setRadioElementValue(elements, value) {
		for(var i=0; i<elements.length; i++) {
			elements[i].checked = elements[i].value==value;
		}
	}
	function _setCheckboxElementValue(elements, values) {
		if(elements.length==1 && values.length==1) {
			// if there's one element, it is treated as a boolean
			elements[0].checked = values[0];
		} else {
			for(var i=0; i<elements.length; i++) {
				// We have to check if the checkbox value is included in values
				elements[i].checked = false;
				for(var j=0; j<values.length && !elements[i].checked; j++) {
					elements[i].checked = elements[i].value==values[j];
				}
			}
		}
	}
	function _setDefaultElementValue(elements, values) {
		for(var i=0; i<elements.length; i++) {
			elements[i].value=values[i];
		}
	}

	return Settings;
})();
