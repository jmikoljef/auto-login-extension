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

USERNAME_INPUT_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_txnuabbd';
USERNAME_LINK_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_btnValider';
PASSWORD_INPUT_ID = 'codconf';
PASSWORD_LINK_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_ctl05_CC_identparticuliers_btnValider';

function _get(id) {
	return document.getElementById(id);
}

function _set(id, value) {
	return document.getElementById(id).value = value;
}

function fillForm(credential) {
	if (!!_get(USERNAME_LINK_ID)) {
		_set(USERNAME_INPUT_ID, credential.username);
		_get(USERNAME_LINK_ID).click();
		return false;
	} else if (!!_get(PASSWORD_LINK_ID)) {
		_set(PASSWORD_INPUT_ID, credential.password);
		return true;
	}
	throw new IncorrectLoginError();
}

function validate() {
	if (!!_get(USERNAME_LINK_ID)) {
		return false;
	} else if (!!_get(PASSWORD_LINK_ID)) {
		_get(PASSWORD_LINK_ID).click();
		return true;
	}
	throw new IncorrectLoginError();
}
