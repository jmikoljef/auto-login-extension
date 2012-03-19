const PASSWORDS = require("passwords");

function _getAll(credential, callback) {
    PASSWORDS.search({
        url: credential.url,
        onComplete: function onComplete(credentials) {
            credentials.forEach(callback);
        }
    });
};

function _getFirst(credential, callback) {
    console.log('url:' + credential.url);
    var found = false;
    PASSWORDS.search({
        url: credential.url,
        onComplete: function onComplete(credentials) {
            console.log('credentials:' +credentials);
            credentials.forEach(function (foundCredential){
                if (!found) {
                    found = true;
                    callback(foundCredential);
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

exports.getAll = _getAll;
exports.getFirst = _getFirst;
exports.set = _set;
exports.remove = _remove;
