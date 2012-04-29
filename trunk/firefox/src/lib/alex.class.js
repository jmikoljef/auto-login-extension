NotificationModule = require('module-notifications');
PasswordManager = require("password-manager");
Storage = require("simple-storage").storage;
Logger = require('logger');

// Alex constructor
exports.Alex = function(script, worker) {
	Logger.debug('alex.class.js', 'exports.Alex', script, worker);
	return new Alex(script, worker);
}

function Alex(script, scriptWorker) {
	Logger.debug('alex.class.js', 'Alex', script, scriptWorker);
	this.script = script;
	this.worker = scriptWorker;
	this.filled = false;
	this.validated = false;
	var instance = this;
	this.worker.port.on('problem', function(data) {
		instance.onProblem(data);
	});
	this.worker.port.on('filled', function(data) {
		instance.onFilled(data);
	});
	this.worker.port.on('validated', function(data) {
		instance.onValidated(data);
	});
}

Alex.prototype.fillForm = function() {
	Logger.debug('alex.class.js', 'fillForm');
	if (!!Storage[this.script.id] && Storage[this.script.id].enabled) {
		var theWorker = this.worker;
		PasswordManager.getFirst({
			url : this.script.site
		}, function(credential) {
			theWorker.port.emit('fillForm', credential);
		});
	}
}

Alex.prototype.validate = function() {
	Logger.debug('alex.class.js', 'validate');
	this.worker.port.emit('validate');
}

Alex.prototype.onFilled = function() {
	Logger.debug('alex.class.js', 'onFilled');
	this.filled = true;
	var instance = this;
	NotificationModule.notify({
	    pageWorker : instance.worker,
	    state : 'filled',
	    site : instance.script.site
	});

	var modeAuto = true;
	if (!!Storage[this.script.id]) {
		modeAuto = (Storage[this.script.id].mode == 'auto');
	}

	if (modeAuto) {
		this.validate();
	}
}

Alex.prototype.onValidated = function() {
	Logger.debug('alex.class.js', 'onValidated');
	this.validated = true;
	var instance = this;
	NotificationModule.notify({
	    pageWorker : instance.worker,
	    state : 'validated',
	    site : instance.script.site
	});
}

Alex.prototype.onProblem = function(message) {
	Logger.debug('alex.class.js', 'onProblem', message);
	var instance = this;
	NotificationModule.notify({
	    pageWorker : instance.worker,
	    state : 'error',
	    message : message,
	    site : instance.script.site
	});
}
