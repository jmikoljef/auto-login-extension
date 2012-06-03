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

function _init() {
	var parent = document.getElementById("menu");
	var level = 1;
	createMenu(parent, level, menus);
	createPanels();
	var button = document.getElementById("main.save");
	button.addEventListener("click", function() { saveOptions("main"); }, false);
}

window.addEventListener("load", _init, false);

var menus = [
	{
		id: "main",
		label: "G\u00E9n\u00E9rales",
		image: "main.png",
		checkbox: false
	},
	{
		id: "scripts",
		label: "Scripts",
		image: "extension.png",
		checkbox: false,
		submenu: [
			{
				id: "freemobile",
				label: "Free Mobile",
				image: "advanced.png",
				checkbox: true
			},
			{
				id: "caisseepargne",
				label: "La Caisse d'Epargne",
				image: "advanced.png",
				checkbox: true
			},
			{
				id: "banquepoostale",
				label: "La Banque Postale",
				image: "advanced.png",
				checkbox: true
			},
			{
				id: "creditagricole",
				label: "Cr\u00E9dit Agricole",
				image: "advanced.png",
				checkbox: true
			}
		]
	},
];

function createMenu(parent, level, menuItems) {
	if(!menuItems) return;
	for(var i=0; i<menuItems.length; i++) {
		var menuItem = menuItems[i];
		createMenuItem(parent, level, menuItem);
		createMenu(parent, level+1, menuItem.submenu);
	}
}

function createMenuItem(parent, level, menuItem) {
	var div = document.createElement("div");
	div.setAttribute("id", "menu-"+menuItem.id);
	div.setAttribute("name", "menu");
	div.setAttribute("class", "menu-item-l"+level);
	var a = document.createElement("a");
	a.setAttribute("href", "#"+menuItem.id);
	var img = document.createElement("img");
	img.setAttribute("src", menuItem.image);
	a.appendChild(img);
	var span = document.createElement("span");
	var text = document.createTextNode(menuItem.label);
	span.appendChild(text);
	a.appendChild(span);
	div.appendChild(a);
	if(menuItem.checkbox) {
		var checkbox = document.createElement("input");
		checkbox.setAttribute("type", "checkbox");
		checkbox.setAttribute("name", menuItem.id+".enabled");
		checkbox.setAttribute("id", menuItem.id+".enabled");
		checkbox.setAttribute("class", "_alo_");
		checkbox.addEventListener(
			"click",
			function() {
				updateOption(menuItem.id+".enabled");
			},
			false
		);
		div.appendChild(checkbox);
	}
	parent.appendChild(div);	
}

var panels = [
	{
		id: "freemobile",
		label: "Free Mobile",
	},
	{
		id: "caisseepargne",
		label: "La Caisse d'Epargne",
	},
	{
		id: "banquepoostale",
		label: "La Banque Postale",
	},
	{
		id: "creditagricole",
		label: "Cr\u00E9dit Agricole",
	}
];

var i = 0;
function createPanels() {
	var parent = document.getElementById("body");
	for(var i=0; i<panels.length; i++) {
		var panel = panels[i];
		var div = document.createElement("div");
		div.setAttribute("id", "panel-"+panel.id);
		div.setAttribute("class", "panel");
		var h2 = document.createElement("h2");
		var title = document.createTextNode(panel.label);
		h2.appendChild(title);
		div.appendChild(h2);
		var divElement = document.createElement("div");
		var fieldsetMode = document.createElement("fieldSet");
		var legendMode = document.createElement("legend");
		legendMode.appendChild(document.createTextNode("Mode"));
		fieldsetMode.appendChild(legendMode);
		var radioManual = document.createElement("input");
		radioManual.setAttribute("type", "radio");
		radioManual.setAttribute("name", panel.id+".mode");
		radioManual.setAttribute("id", panel.id+".mode.manual");
		radioManual.setAttribute("value", "manual");
		radioManual.setAttribute("class", "_alo_ left");
		fieldsetMode.appendChild(radioManual);
		var labelManual = document.createElement("label");
		labelManual.setAttribute("for", panel.id+".mode.manual");
		labelManual.setAttribute("class", "right");
		labelManual.appendChild(document.createTextNode("Manuel"));
		fieldsetMode.appendChild(labelManual);
		var radioAuto = document.createElement("input");
		radioAuto.setAttribute("type", "radio");
		radioAuto.setAttribute("name", panel.id+".mode");
		radioAuto.setAttribute("id", panel.id+".mode.auto");
		radioAuto.setAttribute("value", "auto");
		radioAuto.setAttribute("class", "_alo_ left");
		fieldsetMode.appendChild(radioAuto);
		var labelAuto = document.createElement("label");
		labelAuto.setAttribute("for", panel.id+".mode.auto");
		labelAuto.setAttribute("class", "right");
		labelAuto.appendChild(document.createTextNode("Automatique"));
		fieldsetMode.appendChild(labelAuto);
		divElement.appendChild(fieldsetMode);
		var fieldsetCredential = document.createElement("fieldSet");
		var legendCredential = document.createElement("legend");
		legendCredential.appendChild(document.createTextNode("Identifiant / Mot de passe"));
		fieldsetCredential.appendChild(legendCredential);
		var labelUser = document.createElement("label");
		labelUser.setAttribute("for", panel.id+".credential.username");
		labelUser.setAttribute("class", "left");
		labelUser.appendChild(document.createTextNode("Identifiant : "));
		fieldsetCredential.appendChild(labelUser);
		var username = document.createElement("input");
		username.setAttribute("type", "text");
		username.setAttribute("name", panel.id+".credential.username");
		username.setAttribute("id", panel.id+".credential.username");
		username.setAttribute("required", "required");
		username.setAttribute("class", "_alo_ right");
		fieldsetCredential.appendChild(username);
		var labelPassword = document.createElement("label");
		labelPassword.setAttribute("for", panel.id+".credential.password");
		labelPassword.setAttribute("class", "left");
		labelPassword.appendChild(document.createTextNode("Mot de passe : "));
		fieldsetCredential.appendChild(labelPassword);
		var password = document.createElement("input");
		password.setAttribute("type", "password");
		password.setAttribute("name", panel.id+".credential.password");
		password.setAttribute("id", panel.id+".credential.password");
		password.setAttribute("required", "required");
		password.setAttribute("class", "_alo_ right");
		fieldsetCredential.appendChild(password);
		divElement.appendChild(fieldsetCredential);
		div.appendChild(divElement);
		var divButton = document.createElement("div");
		divButton.setAttribute("class", "button");
		var button = document.createElement("input");
		button.setAttribute("name", "button");
		button.setAttribute("type", "button");
		button.setAttribute("value", "Enregistrer");
		var f = function(e) {
				var id = e.target.parentElement.parentElement.id.substring(6);
				saveOptions(id);
		}
		button.addEventListener("click", f, false);
		divButton.appendChild(button);
		div.appendChild(divButton);
		parent.appendChild(div);
	}
}

