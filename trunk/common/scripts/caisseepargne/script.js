const USERNAME_INPUT_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_txnuabbd';
const USERNAME_LINK_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_btnValider';
const PASSWORD_INPUT_ID = 'codconf';
const PASSWORD_LINK_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_ctl05_CC_identparticuliers_btnValider';

function _get(id) {
    return document.getElementById(id);
}

function _set(id, value) {
    return document.getElementById(id).value = value;
}

function authenticate(credential) {
    if(!!_get(USERNAME_LINK_ID)) {
        _set(USERNAME_INPUT_ID, credential.username);
        _get(USERNAME_LINK_ID).click();
    } else if(!!_get(PASSWORD_LINK_ID)) {
        _set(PASSWORD_INPUT_ID, credential.password);
        _get(PASSWORD_LINK_ID).click();
    }
}

function execute(credential) {
    authenticate(credential);
}

