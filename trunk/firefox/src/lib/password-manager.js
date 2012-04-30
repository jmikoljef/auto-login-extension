Passwords = require("passwords");

function _getAll(credential, callback) {
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(callback);
		}
	});
};

function _getFirst(credential, callback) {
	var found = false;
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(function(foundCredential) {
				if (!found) {
					found = true;
					callback(foundCredential);
				}
			});
		}
	});
}

function _set(credential) {
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(Passwords.remove);
			Passwords.store({
				url : credential.url,
				formSubmitURL : credential.url,
				username : credential.username,
				password : credential.password
			});
		}
	});
};

function _remove(credential) {
	Passwords.search({
		url : credential.url,
		onComplete : function onComplete(credentials) {
			credentials.forEach(Passwords.remove);
		}
	});
};

exports.getAll = _getAll;
exports.getFirst = _getFirst;
exports.set = _set;
exports.remove = _remove;
