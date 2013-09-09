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

const NUMBER_CELLS = document.evaluate('//table[@id="pave-saisie-code"]//td[@onclick!=""]', document, null, XPathResult.ANY_TYPE, null);
const USERNAME_INPUT = _getX('//input[@name="CCPTE"]');
const PASSWORD_INPUT = _getX('//input[@name="CCCRYC"]');
const BUTTON_INPUT = _getX('//a[@tabindex="28"]');

const VAL_POS = new Array();

function _getX(xpath) {
	return document.evaluate(xpath, document, null, XPathResult.ANY_TYPE, null).iterateNext();
}

function extractNumbers(texte) {
	return texte.replace(/[^0-9]*([0-9]+)[^0-9]*/, '$1');
}

function parseNumbers() {
	var td = undefined;
	while(td = NUMBER_CELLS.iterateNext()) {
		var number = extractNumbers(td.firstChild.textContent);
		VAL_POS[number]=td;
	}
}

function clickOnNumbers(password) {
	if(VAL_POS.length == 10) {
		for(var i = 0 ; i < password.length ; i++) {
			var v = password.charAt(i);
			VAL_POS[v].click();
		}
	} else {
		console.error("Discovering incomplete");
	}
}

function fillForm(credential) {
	parseNumbers();
	if(!!USERNAME_INPUT) {
		USERNAME_INPUT.value = credential.username;
		clickOnNumbers(credential.password);
	}
	return true;
}

function validate() {
	if(!!USERNAME_INPUT) {
		BUTTON_INPUT.click();
	}
	return true;
}

