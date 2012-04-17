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
