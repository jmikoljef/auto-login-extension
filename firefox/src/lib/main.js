// Includes
const PASSWORDS = require("passwords");
const PAGE_MOD = require("page-mod");
const WIDGET = require("widget");
const SELF = require("self");
const TABS = require("tabs");
const DATA = SELF.data;
/*
const PANEL = require("panel");
*/

// Consts
const FREEMOBILE_URL = "https://mobile.free.fr";
const FREEMOBILE_LOGIN_PAGE_URL = "https://mobile.free.fr/moncompte/*";

const CAISSEEPARGNE_URL = "https://www.caisse-epargne.fr";
const CAISSEEPARGNE_LOGIN_PAGE_URL = "https://www.caisse-epargne.fr/ind_pauthpopup.aspx?srcurl=accueil";

const BANQUEPOSTALE_URL = "https://www.labanquepostale.fr";
const BANQUEPOSTALE_LOGIN_PAGE_URL = "https://voscomptesenligne.labanquepostale.fr/wsost/OstBrokerWeb/loginform?TAM_OP=login&ERROR_CODE=0x00000000&URL=%2Fvoscomptes%2FcanalXHTML%2Fidentif.ea%3Forigin%3Dparticuliers";

var settingsTabs = undefined;

function execute(url, worker) {
    var sent = false;
    PASSWORDS.search({
        url: url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(function (credential){
                if (!sent) {
                    sent = true;
                    worker.port.emit('execute', credential);
                }
            });
        }
    });
}

function changeCredential(credential) {
    PASSWORDS.search({
        url: credential.url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(PASSWORDS.remove);
            PASSWORDS.store({
                url: credential.url,
                formSubmitURL: credential.url,
                username: credential.username,
                password: credential.password
            });
        }
    });
}

// Main
exports.main = function(options, callbacks) {
    /*
     * Branche le script adéquat sur la page de test
     */
    /*let testPage = PAGE_MOD.PageMod({
        include: '*',
        contentScriptWhen : 'end',
        contentScriptFile: [DATA.url('scripts/test0.js'), DATA.url('scripts/test1.js')],
        onAttach: function(worker) {
			worker.port.emit('execute', null);
        }
    });*/

    /*
     * Branche le script adéquat sur la page de login freemobile
     */
    let freeMobilePage = PAGE_MOD.PageMod({
        include: FREEMOBILE_LOGIN_PAGE_URL,
        contentScriptWhen : 'end',
        contentScriptFile: DATA.url("scripts/freemobile.js"),
        onAttach: function(worker) {
            execute(FREEMOBILE_URL, worker);
        }
    });

    /*
     * Branche le script adéquat sur la page de login caisseepargne
     */
    let caisseEpargnePage = PAGE_MOD.PageMod({
        include: CAISSEEPARGNE_LOGIN_PAGE_URL,
        contentScriptWhen : 'end',
        contentScriptFile: DATA.url("scripts/caisseepargne.js"),
        onAttach: function(worker) {
            execute(CAISSEEPARGNE_URL, worker);
        }
    });

    /*
     * Branche le script adéquat sur la page de login banquepostal
     */
    let banquePostalePage = PAGE_MOD.PageMod({
        include: BANQUEPOSTALE_LOGIN_PAGE_URL,
        contentScriptWhen : 'end',
        contentScriptFile: DATA.url("scripts/banquepostale.js"),
        onAttach: function(worker) {
            execute(BANQUEPOSTALE_URL, worker);
        }
    });

    /*
     * Settings
     */

    let settingsPage = PAGE_MOD.PageMod({
        include: DATA.url('ui/settings.html'),
        contentScriptFile: DATA.url("ui/settings.js"),
        onAttach: function(worker) {
            worker.port.on('changeCredential', changeCredential);
        }
    });
    
    let settingsWidget = WIDGET.Widget({
        label: "Sites Login Helper Settings",
        id: 'settings',
        content: '<span style="font-weight:lighter">Sites Login Helper<img src="' + DATA.url('ui/icon.ico') + '" /><span>',
        width: 170,
        onClick: function() {
            if(!!settingsTabs) {
                settingsTabs.activate();
            } else {
                TABS.open({
                    url: DATA.url('ui/settings.html'),
                    onOpen: function onOpen(tab) {
                        settingsTabs = tab;
                    },
                    onClose: function onOpen(tab) {
                        settingsTabs = undefined;
                    }
                });
            }
        }
    });
}

exports.onUnload = function (reason) {
    if(!!settingsTabs) {
        settingsTabs.close();
    }
}
