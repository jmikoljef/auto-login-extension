MODULE_NOTIFICATIONS = require('module-notifications');
PASSWORD_MANAGER = require("password-manager");
Logger = require('logger');

function AlexClass(scriptUrl, scriptWorker) {
	Logger.debug('alex.class.js', 'Alex()');
	this.url = scriptUrl;
	this.worker = scriptWorker;
    this.filled = false;
    this.validated = false;

    this.fillForm = function () {
    	Logger.debug('alex.class.js', 'fillForm');
    	var theWorker = this.worker;
	    PASSWORD_MANAGER.getFirst({
		    url : this.url
	    }, function(credential) {
	    	theWorker.port.emit('fillForm', credential);
	    });
    }

    this.validate = function validate() {
    	Logger.debug('alex.class.js', 'validate');
    	this.worker.port.emit('validate');
    }

    this.onFilled = function () {
    	Logger.debug('alex.class.js', 'onFilled');
	    this.filled = true;
	    MODULE_NOTIFICATIONS.notify({
	        pageWorker : this.worker,
	        state : 'filled',
	        site : this.url
	    });
	    // TODO check mode
	    this.validate();
    }

    this.onValidated = function () {
    	Logger.debug('alex.class.js', 'onValidated');
	    this.validated = true;
	    MODULE_NOTIFICATIONS.notify({
	        pageWorker : this.worker,
	        state : 'validated',
	        site : this.url
	    });
    }

    this.onProblem = function (message) {
    	console.trace();
    	Logger.debug('alex.class.js', 'onProblem');
	    MODULE_NOTIFICATIONS.notify({
	        pageWorker : this.worker,
	        state : 'error',
	        message : message,
	        site : this.url
	    });
    }
    

    this.worker.port.on('problem', this.onProblem);
    this.worker.port.on('filled', this.onFilled);
    this.worker.port.on('validated', this.onValidated);
}

// Widget constructor
exports.Alex = function (script, worker) {
	Logger.debug('alex.class.js', 'exports.Alex');
	return new AlexClass(script, worker);
}
