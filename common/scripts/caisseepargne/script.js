const USERNAME_INPUT_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_txnuabbd';
const USERNAME_LINK_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_btnValider';
const PASSWORD_INPUT_ID = 'codconf';
const PASSWORD_LINK_ID = 'ctl01_CC_ind_pauthpopup_ctl01_CC_ind_ident_ctl01_CC_ind_inputuserid_sup_ctl05_CC_identparticuliers_btnValider';
const LOAD_SLEEP = 1000;

function _get(id) {
    return document.getElementById(id);
}

// getElementById(id).value = value
function _set(id, value) {
    return document.getElementById(id).value = value;
}

var loaded = false;

function checkLoading() {
    console.trace();
    if(!!_get(USERNAME_INPUT_ID) && !!_get(USERNAME_LINK_ID)) {
        loaded = true;
    } else if(!!_get(PASSWORD_INPUT_ID) && !!_get(PASSWORD_LINK_ID)) {
        loaded = true;
    }
}

function authenticate(credential) {
    console.trace();
    if(!!_get(USERNAME_LINK_ID)) {
        _set(USERNAME_INPUT_ID, credential.username);
        _get(USERNAME_LINK_ID).click();
        loaded = false;
    } else {
        _set(PASSWORD_INPUT_ID, credential.password);
        _get(PASSWORD_LINK_ID).click();
    }
}

function execute(credential) {
    console.trace();
    while (loaded) {
        setTimeout(checkLoading, LOAD_SLEEP);        
    }
    authenticate(credential);
}

self.port.on('execute', execute);
