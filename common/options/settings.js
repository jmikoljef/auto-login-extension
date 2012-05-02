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
 * Return options having a specific classname and having a name that stats whith prefix (optional)
 */
function getOptionsFromPage(classname, prefix) {
	var prefs = {};
	var elements = document.getElementsByClassName(classname);
	for(var i=0; i<elements.length; i++) {
		var element = elements[i];
		var name = element.name;
		// if there was a prefix, we check that the name starts with
		if(!prefix || name.startsWith(prefix)) {
			var value = getElementValue(name);
			fillObject(prefs, name, value);
		}
	}
	return prefs;
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

