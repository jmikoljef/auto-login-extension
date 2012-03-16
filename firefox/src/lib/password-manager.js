const PASSWORDS = require("passwords");

function _get(credential, callback) {
    PASSWORDS.search({
        url: credential.url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(callback);
        }
    });
};

function _getFirst(credential, callback) {
    var found = false;
    PASSWORDS.search({
        url: credential.url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(function (credential){
                if (!found) {
                    found = true;
                    callback(credential);
                }
            });
        }
    });
}

function _set(credential) {
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
};

function _remove(credential) {
    PASSWORDS.search({
        url: credential.url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(PASSWORDS.remove);
        }
    });
};

exports.get = _get;
exports.set = _set;
exports.remove = _remove;
