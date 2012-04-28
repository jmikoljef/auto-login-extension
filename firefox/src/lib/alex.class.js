MODULE_NOTIFICATIONS = require('module-notifications');
PASSWORD_MANAGER = require("password-manager");
SIMPLE_STORAGE = require("simple-storage");
STORAGE = SIMPLE_STORAGE.storage;

// TODO export it
Logger = require('logger');

//Alex constructor
exports.Alex = function (script, worker) {
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
	this.worker.port.on('problem', function (data) {
		instance.onProblem(data);
	});
	this.worker.port.on('filled', function (data) {
		instance.onFilled(data);
	});
	this.worker.port.on('validated', function (data) {
		instance.onValidated(data);
	});
}

Alex.prototype.fillForm = function() {
	Logger.debug('alex.class.js', 'fillForm');
	var theWorker = this.worker;
    PASSWORD_MANAGER.getFirst({
	    url : this.script.site
    }, function(credential) {
    	theWorker.port.emit('fillForm', credential);
    });
}

Alex.prototype.validate = function() {
	Logger.debug('alex.class.js', 'validate');
	this.worker.port.emit('validate');
}

Alex.prototype.onFilled = function() {
	Logger.debug('alex.class.js', 'onFilled');
    this.filled = true;
    var instance = this;
    MODULE_NOTIFICATIONS.notify({
        pageWorker : instance.worker,
        state : 'filled',
        site : instance.script.site
    });

    var modeAuto = true;
    if(!!STORAGE[this.script.id]) {
    	modeAuto = (STORAGE[this.script.id].mode == 'auto');
    }
    
    if(modeAuto) {
        this.validate();
    }
}

Alex.prototype.onValidated = function() {
	Logger.debug('alex.class.js', 'onValidated');
    this.validated = true;
    var instance = this;
    MODULE_NOTIFICATIONS.notify({
        pageWorker : instance.worker,
        state : 'validated',
        site : instance.script.site
    });
}

Alex.prototype.onProblem = function(message) {
	Logger.debug('alex.class.js', 'onProblem', message);
    var instance = this;
    MODULE_NOTIFICATIONS.notify({
        pageWorker : instance.worker,
        state : 'error',
        message : message,
        site : instance.script.site
    });
}
